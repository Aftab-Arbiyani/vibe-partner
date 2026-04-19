import { stripe } from "@/lib/stripe";
import {
  activateBooking,
  markSlotBooked,
  markSlotAvailable,
  updateBookingStatus,
  getBookingById,
  getSlots,
  logWebhookEvent,
} from "@/lib/data";
import {
  sendOwnerNotification,
  sendUserConfirmation,
  sendPaymentFailedOwnerAlert,
  sendDisputeOwnerAlert,
} from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Log every verified event — bookingId extracted from metadata where available
  const topLevelObj = event.data.object as unknown as Record<string, unknown>;
  const metaBookingId =
    (topLevelObj?.metadata as Record<string, string> | undefined)?.bookingId ?? null;
  logWebhookEvent(event.id, event.type, metaBookingId, event.created, event.data.object).catch(
    (err) => console.error("Failed to log webhook event:", err)
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) {
        console.error("No bookingId in session metadata");
        return Response.json({ error: "Missing bookingId" }, { status: 400 });
      }

      // Activate booking (sets status from awaiting_payment → pending)
      const booking = await activateBooking(bookingId);
      if (!booking) {
        console.error("Booking not found:", bookingId);
        return Response.json({ error: "Booking not found" }, { status: 404 });
      }

      // Mark slot as booked
      if (booking.slotId) {
        await markSlotBooked(booking.slotId);
      }

      // Build slot label for emails
      let slotLabel: string | undefined;
      if (booking.slotId) {
        const slots = await getSlots();
        const slot = slots.find((s) => s.id === booking.slotId);
        if (slot) {
          slotLabel = `${slot.date} · ${slot.startTime}–${slot.endTime}`;
        }
      }

      // Send confirmation emails
      try {
        await Promise.all([
          sendOwnerNotification(booking, slotLabel),
          sendUserConfirmation(booking, slotLabel),
        ]);
      } catch (err) {
        console.error("Email send failed:", err);
      }

      break;
    }

    case "checkout.session.expired": {
      // User abandoned checkout — clean up the ghost booking and free the slot
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) break;

      const booking = await getBookingById(bookingId);
      if (!booking) break;

      // Only clean up if still awaiting payment (not already completed)
      if (booking.status === "awaiting_payment") {
        await updateBookingStatus(bookingId, "cancelled");

        if (booking.slotId) {
          await markSlotAvailable(booking.slotId);
        }
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;

      const piSessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });

      const failedBookingId = piSessions.data[0]?.metadata?.bookingId;
      if (!failedBookingId) break;

      const failedBooking = await getBookingById(failedBookingId);
      if (!failedBooking) break;

      // Don't cancel — session is still open, customer can retry.
      // Notify owner so they're aware of the failed attempt.
      try {
        await sendPaymentFailedOwnerAlert(failedBooking);
      } catch (err) {
        console.error("Email send failed:", err);
      }

      break;
    }

    case "charge.dispute.created": {
      const dispute = event.data.object;
      const disputePaymentIntentId =
        typeof dispute.payment_intent === "string"
          ? dispute.payment_intent
          : null;

      if (!disputePaymentIntentId) break;

      const disputeSessions = await stripe.checkout.sessions.list({
        payment_intent: disputePaymentIntentId,
        limit: 1,
      });

      const disputeBookingId = disputeSessions.data[0]?.metadata?.bookingId;
      if (!disputeBookingId) break;

      const disputeBooking = await getBookingById(disputeBookingId);
      if (!disputeBooking) break;

      await updateBookingStatus(disputeBookingId, "cancelled");

      if (disputeBooking.slotId) {
        await markSlotAvailable(disputeBooking.slotId);
      }

      try {
        await sendDisputeOwnerAlert(disputeBooking);
      } catch (err) {
        console.error("Email send failed:", err);
      }

      break;
    }

    case "charge.refunded": {
      // Issued a refund from Stripe dashboard — find the booking and cancel it
      const charge = event.data.object;
      const paymentIntentId =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;

      if (!paymentIntentId) break;

      // Look up the checkout session to retrieve the bookingId from metadata
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1,
      });

      const bookingId = sessions.data[0]?.metadata?.bookingId;
      if (!bookingId) break;

      const booking = await getBookingById(bookingId);
      if (!booking) break;

      await updateBookingStatus(bookingId, "cancelled");

      // Free the slot so it can be rebooked
      if (booking.slotId) {
        await markSlotAvailable(booking.slotId);
      }

      break;
    }
  }

  return Response.json({ received: true });
}
