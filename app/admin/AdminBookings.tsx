"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BookingStatus } from "@/lib/data";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminBookings({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: BookingStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pendingCancel, setPendingCancel] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");

  async function updateStatus(status: BookingStatus, refund?: string) {
    if (status === currentStatus) return;
    setLoading(true);
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, ...(refund ? { refundAmount: refund } : {}) }),
    });
    setLoading(false);
    setPendingCancel(false);
    setRefundAmount("");
    router.refresh();
  }

  function handleSelect(status: BookingStatus) {
    if (status === "cancelled") {
      setPendingCancel(true);
    } else {
      updateStatus(status);
    }
  }

  if (pendingCancel) {
    return (
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Refund amount (optional, e.g. $99)"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
          disabled={loading}
          className="text-xs bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <div className="flex gap-2">
          <button
            onClick={() => updateStatus("cancelled", refundAmount || undefined)}
            disabled={loading}
            className="text-xs bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            {loading ? "Cancelling…" : "Confirm Cancel"}
          </button>
          <button
            onClick={() => { setPendingCancel(false); setRefundAmount(""); }}
            disabled={loading}
            className="text-xs bg-white/10 border border-white/10 text-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Keep
          </button>
        </div>
      </div>
    );
  }

  return (
    <select
      value={currentStatus}
      onChange={(e) => handleSelect(e.target.value as BookingStatus)}
      disabled={loading}
      className="text-xs bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-gray-300 cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#1a1a1a]">
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
