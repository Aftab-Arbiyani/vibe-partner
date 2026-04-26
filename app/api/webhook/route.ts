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
  getSkillById,
  createPurchase,
  getPurchaseBySessionId,
  getCustomRequestById,
  updateCustomRequestStatus,
} from "@/lib/skills-data";
import { generateSignedUrl } from "@/lib/storage";
import {
  sendOwnerNotification,
  sendUserConfirmation,
  sendPaymentFailedOwnerAlert,
  sendDisputeOwnerAlert,
  sendSkillPurchaseEmail,
  sendCustomRequestUserConfirmation,
  sendCustomRequestAdminNotification,
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

  // Log every verified event (uses Stripe event ID as doc ID for deduplication)
  const topLevelObj = event.data.object as unknown as Record<string, unknown>;
  const metaBookingId =
    (topLevelObj?.metadata as Record<string, string> | undefined)?.bookingId ?? null;
  logWebhookEvent(event.id, event.type, metaBookingId, event.created, event.data.object).catch(
    (err) => console.error("Failed to log webhook event:", err)
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const type = session.metadata?.type;

      // ── SKILL PURCHASE ──────────────────────────────────────────────────────
      if (type === "skill_purchase") {
        const skillId = session.metadata?.skillId;
        if (!skillId) {
          console.error("skill_purchase session missing skillId:", session.id);
          break;
        }

        // Idempotency: skip if already processed
        const existing = await getPurchaseBySessionId(session.id);
        if (existing) {
          console.log("Skill purchase already processed, skipping:", session.id);
          break;
        }

        const skill = await getSkillById(skillId);
        if (!skill) {
          console.error("Skill not found for purchase:", skillId);
          break;
        }

        const name = session.metadata?.customerName ?? "";
        const email =
          session.customer_details?.email ??
          session.customer_email ??
          session.metadata?.customerEmail ??
          "";

        if (!email) {
          console.error("No email found in session:", session.id);
          break;
        }

        // Create purchase record
        await createPurchase({
          name,
          email,
          skillId,
          stripeSessionId: session.id,
          amount: session.amount_total ?? 0,
          status: "success",
        });

        // Generate 24-hour signed URL for the email link
        let downloadUrl = "";
        try {
          downloadUrl = await generateSignedUrl(skill.fileUrl, 24 * 60 * 60 * 1000);
        } catch (err) {
          console.error("Failed to generate signed URL:", err);
        }

        if (downloadUrl) {
          try {
            await sendSkillPurchaseEmail(name, email, skill, downloadUrl);
          } catch (err) {
            console.error("Failed to send skill purchase email:", err);
          }
        }

        break;
      }

      // ── CUSTOM SKILL REQUEST ─────────────────────────────────────────────────
      if (type === "custom_request") {
        const requestId = session.metadata?.requestId;
        if (!requestId) {
          console.error("custom_request session missing requestId:", session.id);
          break;
        }

        const customRequest = await getCustomRequestById(requestId);
        if (!customRequest) {
          console.error("CustomRequest not found:", requestId);
          break;
        }

        // Idempotency: skip if already moved past pending_payment
        if (customRequest.status !== "pending_payment") {
          console.log("Custom request already processed, skipping:", requestId);
          break;
        }

        // Activate the request and record the Stripe session ID
        await updateCustomRequestStatus(requestId, "pending", session.id);

        try {
          await Promise.all([
            sendCustomRequestUserConfirmation(
              customRequest.name,
              customRequest.email,
              customRequest.requirement
            ),
            sendCustomRequestAdminNotification(
              customRequest.name,
              customRequest.email,
              customRequest.phone,
              customRequest.requirement
            ),
          ]);
        } catch (err) {
          console.error("Failed to send custom request emails:", err);
        }

        break;
      }

      // ── BOOKING (legacy / default flow) ──────────────────────────────────────
      {
        const bookingId = session.metadata?.bookingId;
        if (!bookingId) {
          console.error(
            "checkout.session.completed: no recognized metadata type and no bookingId. Session:",
            session.id
          );
          break;
        }

        const booking = await activateBooking(bookingId);
        if (!booking) {
          console.error("Booking not found:", bookingId);
          break;
        }

        if (booking.slotId) {
          await markSlotBooked(booking.slotId);
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
          await Promise.all([
            sendOwnerNotification(booking, slotLabel),
            sendUserConfirmation(booking, slotLabel),
          ]);
        } catch (err) {
          console.error("Email send failed:", err);
        }
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const type = session.metadata?.type;

      if (type === "custom_request") {
        // Leave the pending_payment record in Firestore — it's inert.
        // If requestId is available we could mark it cancelled, but it's not worth the noise.
        break;
      }

      // Legacy booking flow cleanup
      const bookingId = session.metadata?.bookingId;
      if (!bookingId) break;

      const booking = await getBookingById(bookingId);
      if (!booking) break;

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
      const charge = event.data.object;
      const paymentIntentId =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;

      if (!paymentIntentId) break;

      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1,
      });

      const bookingId = sessions.data[0]?.metadata?.bookingId;
      if (!bookingId) break;

      const booking = await getBookingById(bookingId);
      if (!booking) break;

      await updateBookingStatus(bookingId, "cancelled");

      if (booking.slotId) {
        await markSlotAvailable(booking.slotId);
      }

      break;
    }
  }

  return Response.json({ received: true });
}
