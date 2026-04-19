import { createBooking, getSlots, markSlotBooked } from "@/lib/data";
import { sendOwnerNotification, sendUserConfirmation } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, serviceType, description, repoLink, slotId } = body;

  if (!name || !email || !serviceType || !description) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
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
      return Response.json({ error: "This slot has already been booked. Please choose another." }, { status: 409 });
    }
  }

  const booking = await createBooking({
    name,
    email,
    serviceType,
    description,
    repoLink: repoLink ?? "",
    slotId: slotId ?? null,
  });

  // Mark slot as booked
  if (slotId) {
    await markSlotBooked(slotId);
  }

  // Build slot label for emails
  let slotLabel: string | undefined;
  if (slotId) {
    const slots = await getSlots();
    const slot = slots.find((s) => s.id === slotId);
    if (slot) {
      slotLabel = `${slot.date} · ${slot.startTime}–${slot.endTime}`;
    }
  }

  // Send emails (don't block response on failure)
  try {
    await Promise.all([
      sendOwnerNotification(booking, slotLabel),
      sendUserConfirmation(booking, slotLabel),
    ]);
  } catch (err) {
    console.error("Email send failed:", err);
  }

  return Response.json({ success: true, bookingId: booking.id });
}
