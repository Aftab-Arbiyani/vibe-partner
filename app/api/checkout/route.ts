import { stripe } from "@/lib/stripe";
import { createBookingAwaitingPayment, getSlots } from "@/lib/data";
import type { ServiceType } from "@/lib/data";

const PRICES: Record<ServiceType, number> = {
  async: 4000,    // $40.00
  live: 6000,     // $60.00
  monthly: 14900, // $149.00
  pro: 29900,     // $299.00
};

const SERVICE_LABELS: Record<ServiceType, string> = {
  async: "Async Bug Fix",
  live: "Live Pair Programming Session",
  monthly: "Monthly Retainer — Starter",
  pro: "Monthly Retainer — Pro",
};

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, serviceType, description, repoLink, slotId, country, timezone } = body;

  if (!name || !email || !serviceType || !description) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!(serviceType in PRICES)) {
    return Response.json({ error: "Invalid service type" }, { status: 400 });
  }

  if (serviceType === "live" && !slotId) {
    return Response.json({ error: "A time slot is required for live sessions" }, { status: 400 });
  }

  // Verify slot is still available
  if (slotId) {
    const slots = await getSlots();
    const slot = slots.find((s) => s.id === slotId);
    if (!slot) {
      return Response.json({ error: "Slot not found" }, { status: 400 });
    }
    if (slot.isBooked) {
      return Response.json(
        { error: "This slot has already been booked. Please choose another." },
        { status: 409 }
      );
    }
  }

  // Create booking in Firestore — stays as awaiting_payment until Stripe confirms
  const booking = await createBookingAwaitingPayment({
    name,
    email,
    serviceType,
    description,
    repoLink: repoLink ?? "",
    slotId: slotId ?? null,
    country: country ?? undefined,
    timezone: timezone ?? undefined,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: PRICES[serviceType as ServiceType],
          product_data: {
            name: SERVICE_LABELS[serviceType as ServiceType],
            description: description.slice(0, 200),
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking.id,
    },
    success_url: `${baseUrl}/book/success`,
    cancel_url: `${baseUrl}/book/cancelled`,
  });

  return Response.json({ url: session.url });
}
