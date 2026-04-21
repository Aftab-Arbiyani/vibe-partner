import { getBookingById, updateBookingStatus, markSlotAvailable, getSlots } from "@/lib/data";
import { sendCancellationEmail } from "@/lib/mailer";
import { requireAdmin } from "@/lib/admin-auth";
import type { BookingStatus } from "@/lib/data";

const VALID_STATUSES: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const { status, refundAmount } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const booking = await getBookingById(id);
  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  await updateBookingStatus(id, status);

  if (status === "cancelled") {
    if (booking.slotId) {
      await markSlotAvailable(booking.slotId);
    }

    let slotLabel: string | undefined;
    if (booking.slotId) {
      const slots = await getSlots();
      const slot = slots.find((s) => s.id === booking.slotId);
      if (slot) {
        slotLabel = `${slot.date} · ${slot.startTime}–${slot.endTime}`;
      }
    }

    try {
      await sendCancellationEmail(booking, slotLabel, refundAmount ?? undefined);
    } catch (err) {
      console.error("Cancellation email failed:", err);
    }
  }

  return Response.json({ success: true });
}
