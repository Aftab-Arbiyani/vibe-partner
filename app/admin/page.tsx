import type { Metadata } from "next";
import Link from "next/link";
import { getBookings, getSlots } from "@/lib/data";
import AdminBookings from "./AdminBookings";
import AdminAvailability from "./AdminAvailability";
import AdminLogout from "./AdminLogout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — VibePartner",
  robots: { index: false, follow: false },
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const SERVICE_LABELS: Record<string, string> = {
  async: "Async Fix",
  live: "Live Session",
  monthly: "Monthly Plan",
};

export default async function AdminPage() {
  const bookings = (await getBookings())
    .filter((b) => b.status !== "awaiting_payment")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const slots = (await getSlots()).sort((a, b) => a.date.localeCompare(b.date));

  const counts = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/" className="text-xl font-bold gradient-text">VibePartner</Link>
            <p className="text-gray-500 text-sm mt-0.5">Admin Dashboard</p>
          </div>
          <AdminLogout />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{status}</p>
              <p className="text-3xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Bookings table */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Bookings</h2>
            {bookings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
                No bookings yet.
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => {
                  const slot = booking.slotId
                    ? slots.find((s) => s.id === booking.slotId)
                    : null;

                  return (
                    <div
                      key={booking.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-5"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-semibold">{booking.name}</p>
                          <a
                            href={`mailto:${booking.email}`}
                            className="text-indigo-400 text-sm hover:underline"
                          >
                            {booking.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-full">
                            {SERVICE_LABELS[booking.serviceType]}
                          </span>
                          <span
                            className={`text-xs border px-2 py-1 rounded-full capitalize ${STATUS_COLORS[booking.status]}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {slot && (
                        <p className="text-sm text-gray-400 mb-2">
                          📅 {slot.date} · {slot.startTime}–{slot.endTime}
                        </p>
                      )}

                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {booking.description}
                      </p>

                      {booking.repoLink && (
                        <a
                          href={booking.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-400 hover:underline block mb-3 truncate"
                        >
                          {booking.repoLink}
                        </a>
                      )}

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">
                          {new Date(booking.createdAt).toLocaleString()}
                        </p>
                        <AdminBookings bookingId={booking.id} currentStatus={booking.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Availability sidebar */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Live Session Slots</h2>
            <AdminAvailability slots={slots} />
          </div>
        </div>
      </div>
    </main>
  );
}
