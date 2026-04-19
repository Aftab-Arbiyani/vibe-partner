import { db } from "./firebase";

export type ServiceType = "async" | "live" | "monthly" | "pro";
export type BookingStatus = "awaiting_payment" | "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  name: string;
  email: string;
  serviceType: ServiceType;
  description: string;
  repoLink: string;
  slotId: string | null;
  country?: string;
  timezone?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Slot {
  id: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:MM
  endTime: string;    // HH:MM
  isBooked: boolean;
}

// Bookings

export async function getBookings(): Promise<Booking[]> {
  const snap = await db.collection("bookings").get();
  return snap.docs.map((doc) => doc.data() as Booking);
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  const doc = await db.collection("bookings").doc(id).get();
  if (!doc.exists) return undefined;
  return doc.data() as Booking;
}

export async function createBooking(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await db.collection("bookings").doc(booking.id).set(booking);
  return booking;
}

// Creates a booking that waits for Stripe payment confirmation
export async function createBookingAwaitingPayment(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id: crypto.randomUUID(),
    status: "awaiting_payment",
    createdAt: new Date().toISOString(),
  };
  await db.collection("bookings").doc(booking.id).set(booking);
  return booking;
}

// Called by the Stripe webhook once payment succeeds — sets status to "pending" and returns the booking
export async function activateBooking(id: string): Promise<Booking | null> {
  const ref = db.collection("bookings").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update({ status: "pending" });
  return { ...(doc.data() as Booking), status: "pending" };
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<boolean> {
  const ref = db.collection("bookings").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.update({ status });
  return true;
}

// Availability Slots

export async function getSlots(): Promise<Slot[]> {
  const snap = await db.collection("slots").get();
  return snap.docs.map((doc) => doc.data() as Slot);
}

export async function getAvailableSlots(): Promise<Slot[]> {
  const today = new Date().toISOString().split("T")[0];
  const snap = await db
    .collection("slots")
    .where("isBooked", "==", false)
    .where("date", ">=", today)
    .get();
  return snap.docs.map((doc) => doc.data() as Slot);
}

export async function createSlot(
  data: Omit<Slot, "id" | "isBooked">
): Promise<Slot> {
  const slot: Slot = { ...data, id: crypto.randomUUID(), isBooked: false };
  await db.collection("slots").doc(slot.id).set(slot);
  return slot;
}

export async function deleteSlot(id: string): Promise<boolean> {
  const ref = db.collection("slots").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}

export async function markSlotBooked(id: string): Promise<boolean> {
  const ref = db.collection("slots").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.update({ isBooked: true });
  return true;
}

export async function markSlotAvailable(id: string): Promise<boolean> {
  const ref = db.collection("slots").doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.update({ isBooked: false });
  return true;
}

// Webhook Logs

export interface WebhookLog {
  id: string;            // Stripe event ID — used as doc ID to deduplicate retries
  type: string;
  bookingId: string | null;
  receivedAt: string;
  stripeCreated: number; // unix timestamp from Stripe
  payload: string;       // JSON-stringified event.data.object
}

export async function logWebhookEvent(
  eventId: string,
  type: string,
  bookingId: string | null,
  stripeCreated: number,
  dataObject: unknown
): Promise<void> {
  const log: WebhookLog = {
    id: eventId,
    type,
    bookingId,
    receivedAt: new Date().toISOString(),
    stripeCreated,
    payload: JSON.stringify(dataObject),
  };
  await db.collection("webhookLogs").doc(log.id).set(log);
}
