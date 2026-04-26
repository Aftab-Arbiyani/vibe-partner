import { stripe } from "@/lib/stripe";
import { getSkillById } from "@/lib/skills-data";

export async function POST(request: Request) {
  const body = await request.json();
  const { skillId, name, email } = body;

  if (!skillId || typeof skillId !== "string") {
    return Response.json({ error: "skillId is required" }, { status: 400 });
  }
  if (!name || typeof name !== "string" || !name.trim()) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return Response.json({ error: "A valid email is required" }, { status: 400 });
  }

  const skill = await getSkillById(skillId);

  if (!skill) {
    return Response.json({ error: "Skill not found" }, { status: 404 });
  }

  if (!skill.isPremium) {
    return Response.json({ error: "This skill is free to download" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email.trim(),
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: skill.price,
          product_data: {
            name: skill.title,
            description: skill.description.slice(0, 200),
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "skill_purchase",
      skillId: skill.id,
      customerName: name.trim(),
      customerEmail: email.trim(),
    },
    success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/skills`,
  });

  return Response.json({ url: session.url });
}
