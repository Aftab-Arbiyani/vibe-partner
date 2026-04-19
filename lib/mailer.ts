import nodemailer from "nodemailer";
import type { Booking } from "./data";

const port = parseInt(process.env.SMTP_PORT || process.env.GMAIL_PORT || "465", 10);

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST || "smtp.gmail.com",
  port,
  secure: port === 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const SERVICE_LABELS: Record<string, string> = {
  async: "Async Bug Fix",
  live: "Live Pair Programming Session",
  monthly: "Monthly Retainer Plan",
};

export async function sendOwnerNotification(
  booking: Booking,
  slotLabel?: string,
) {
  const service = SERVICE_LABELS[booking.serviceType] ?? booking.serviceType;

  await transporter.sendMail({
    from: `"VibePartner Bookings" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New booking: ${service} from ${booking.name}`,
    html: `
      <h2>New Booking Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Service</td><td style="padding:8px">${service}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Name</td><td style="padding:8px">${booking.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Email</td><td style="padding:8px"><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
        ${slotLabel ? `<tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Requested Slot</td><td style="padding:8px">${slotLabel}</td></tr>` : ""}
        <tr ${slotLabel ? "" : 'style="background:#f9fafb"'}><td style="padding:8px;font-weight:bold;color:#6366f1">Description</td><td style="padding:8px">${booking.description.replace(/\n/g, "<br>")}</td></tr>
        ${booking.repoLink ? `<tr><td style="padding:8px;font-weight:bold;color:#6366f1">Repo / Error</td><td style="padding:8px"><a href="${booking.repoLink}">${booking.repoLink}</a></td></tr>` : ""}
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Booked At</td><td style="padding:8px">${new Date(booking.createdAt).toLocaleString()}</td></tr>
      </table>
      <p style="margin-top:24px">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:9002"}/admin" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">
          View in Admin →
        </a>
      </p>
    `,
  });
}

export async function sendPaymentFailedOwnerAlert(booking: Booking) {
  const service = SERVICE_LABELS[booking.serviceType] ?? booking.serviceType;

  await transporter.sendMail({
    from: `"VibePartner Bookings" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `Payment failed: ${service} from ${booking.name}`,
    html: `
      <h2 style="color:#ef4444">Payment Attempt Failed</h2>
      <p>A payment attempt for the following booking failed. The checkout session is still open — the customer may retry.</p>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Service</td><td style="padding:8px">${service}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Name</td><td style="padding:8px">${booking.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Email</td><td style="padding:8px"><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Booking ID</td><td style="padding:8px">${booking.id}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Status</td><td style="padding:8px">awaiting_payment (no action needed yet)</td></tr>
      </table>
      <p style="margin-top:16px;color:#6b7280;font-size:14px">If the session expires without payment, the booking will be automatically cancelled.</p>
      <p style="margin-top:24px">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:9002"}/admin" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">
          View in Admin →
        </a>
      </p>
    `,
  });
}

export async function sendDisputeOwnerAlert(booking: Booking) {
  const service = SERVICE_LABELS[booking.serviceType] ?? booking.serviceType;

  await transporter.sendMail({
    from: `"VibePartner Bookings" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `URGENT: Dispute filed — ${service} from ${booking.name}`,
    html: `
      <h2 style="color:#ef4444">Chargeback / Dispute Filed</h2>
      <p><strong>A customer has filed a payment dispute.</strong> The booking has been cancelled and the slot has been freed automatically.</p>
      <p style="color:#ef4444;font-weight:bold">Action required: respond to the dispute in your Stripe Dashboard before the deadline.</p>
      <table style="border-collapse:collapse;width:100%;max-width:600px;margin-top:16px">
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Service</td><td style="padding:8px">${service}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Name</td><td style="padding:8px">${booking.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Email</td><td style="padding:8px"><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
        <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#6366f1">Booking ID</td><td style="padding:8px">${booking.id}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#6366f1">Booking Status</td><td style="padding:8px">cancelled</td></tr>
      </table>
      <p style="margin-top:24px;display:flex;gap:12px">
        <a href="https://dashboard.stripe.com/disputes" style="background:#ef4444;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;margin-right:12px">
          Open Stripe Disputes →
        </a>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:9002"}/admin" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">
          View in Admin →
        </a>
      </p>
    `,
  });
}

export async function sendCancellationEmail(
  booking: Booking,
  slotLabel?: string,
  refundAmount?: string,
) {
  const service = SERVICE_LABELS[booking.serviceType] ?? booking.serviceType;

  await transporter.sendMail({
    from: `"VibePartner" <${process.env.GMAIL_USER}>`,
    to: booking.email,
    subject: `Your booking has been cancelled — ${service}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#ef4444">Your booking has been cancelled</h2>
        <p>Hi ${booking.name}, your booking has been cancelled by our team. Here are the details:</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
          ${slotLabel ? `<tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold">Slot</td><td style="padding:8px">${slotLabel}</td></tr>` : ""}
          ${refundAmount ? `<tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold">Refund</td><td style="padding:8px;color:#16a34a;font-weight:bold">${refundAmount} has been refunded to your original payment method. Please allow 5–10 business days for it to appear.</td></tr>` : ""}
        </table>
        <p style="margin-top:24px">If you have any questions, reply to this email and we'll get back to you.</p>
        <p style="color:#9ca3af;font-size:14px">— The VibePartner team</p>
      </div>
    `,
  });
}

export async function sendUserConfirmation(
  booking: Booking,
  slotLabel?: string,
) {
  const service = SERVICE_LABELS[booking.serviceType] ?? booking.serviceType;
  const isLive = booking.serviceType === "live";

  await transporter.sendMail({
    from: `"VibePartner" <${process.env.GMAIL_USER}>`,
    to: booking.email,
    subject: `We got your booking — ${service}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#6366f1">Your booking is confirmed, ${booking.name}!</h2>
        <p>Here's a summary of what you submitted:</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
          ${slotLabel ? `<tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold">Requested Slot</td><td style="padding:8px">${slotLabel}</td></tr>` : ""}
          <tr ${slotLabel ? "" : 'style="background:#f9fafb"'}><td style="padding:8px;font-weight:bold">Your message</td><td style="padding:8px">${booking.description.replace(/\n/g, "<br>")}</td></tr>
        </table>
        <p style="margin-top:24px">
          ${
            isLive
              ? "We'll confirm your session time and send you a Google Meet link shortly."
              : booking.serviceType === "async"
                ? "We'll review your problem and get back to you within 24 hours with a fix."
                : "We'll reach out within a few hours to get you set up on your monthly plan."
          }
        </p>
        <p>In the meantime, reply to this email if you have anything to add.</p>
        <p style="color:#9ca3af;font-size:14px">— The VibePartner team</p>
      </div>
    `,
  });
}
