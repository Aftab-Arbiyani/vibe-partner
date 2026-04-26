"use client";

import { useState } from "react";
import type { Booking, Slot } from "@/lib/data";
import AdminBookings from "./AdminBookings";
import AdminAvailability from "./AdminAvailability";

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
  pro: "Pro Plan",
};

type SortOrder = "desc" | "asc";
type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "cancelled";

interface Props {
  bookings: Booking[];
  slots: Slot[];
}

export default function AdminBookingsPanel({ bookings, slots }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const filtered = bookings
    .filter((b) => statusFilter === "all" || b.status === statusFilter)
    .sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? -diff : diff;
    });

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Bookings table */}
      <div className="lg:col-span-2">
        {/* Filter + Sort bar */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="text-xs bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="all" className="bg-[#1a1a1a]">All</option>
              <option value="pending" className="bg-[#1a1a1a]">Pending</option>
              <option value="confirmed" className="bg-[#1a1a1a]">Confirmed</option>
              <option value="completed" className="bg-[#1a1a1a]">Completed</option>
              <option value="cancelled" className="bg-[#1a1a1a]">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Sort:</label>
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="text-xs bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 hover:bg-white/20 transition-colors flex items-center gap-1"
            >
              {sortOrder === "desc" ? "Newest first" : "Oldest first"}
              <span className="text-gray-500">{sortOrder === "desc" ? "↓" : "↑"}</span>
            </button>
          </div>

          <span className="text-xs text-gray-600 ml-auto">
            {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
            {statusFilter === "all" ? "No bookings yet." : `No ${statusFilter} bookings.`}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => {
              const slot = booking.slotId ? slots.find((s) => s.id === booking.slotId) : null;
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
                        {SERVICE_LABELS[booking.serviceType] ?? booking.serviceType}
                      </span>
                      <span
                        className={`text-xs border px-2 py-1 rounded-full capitalize ${STATUS_COLORS[booking.status] ?? ""}`}
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
                    <p className="text-xs text-gray-600" suppressHydrationWarning>
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
  );
}
