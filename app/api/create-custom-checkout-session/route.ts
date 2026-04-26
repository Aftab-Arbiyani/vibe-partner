import { stripe } from "@/lib/stripe";
import { createCustomRequest } from "@/lib/skills-data";

/** Advance payment for a custom skill request (in cents). */
const CUSTOM_SKILL_PRICE_CENTS = 2000; // $20

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, requirement } = body;

  if (!name || !email || !phone || !requirement) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Save the full request to Firestore first — avoids Stripe metadata 500-char limit
  // and lets us store an unlimited requirement length.
  const customRequest = await createCustomRequest({
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 254),
    phone: String(phone).slice(0, 50),
    requirement: String(requirement),
    stripeSessionId: "",
    status: "pending_payment",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customRequest.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: CUSTOM_SKILL_PRICE_CENTS,
          product_data: {
            name: "Custom Skill Request — Advance Payment",
            description: "Advance payment to begin building your custom skill or AI agent workflow.",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "custom_request",
      requestId: customRequest.id,
    },
    success_url: `${baseUrl}/payment-success?type=custom`,
    cancel_url: `${baseUrl}/skills`,
  });

  return Response.json({ url: session.url });
}
