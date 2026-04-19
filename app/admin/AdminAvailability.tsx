"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Slot } from "@/lib/data";

export default function AdminAvailability({ slots }: { slots: Slot[] }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  async function addSlot(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAdding(true);

    const res = await fetch("/api/admin/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, startTime, endTime }),
    });

    setAdding(false);
    if (!res.ok) {
      setError("Failed to add slot.");
      return;
    }

    setDate("");
    setStartTime("");
    setEndTime("");
    router.refresh();
  }

  async function removeSlot(id: string) {
    await fetch("/api/admin/availability", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      {/* Add slot form */}
      <form
        onSubmit={addSlot}
        className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3"
      >
        <p className="text-sm font-medium text-gray-400">Add Available Slot</p>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Date</label>
          <input
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start</label>
            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End</label>
            <input
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={adding}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
        >
          {adding ? "Adding..." : "Add Slot"}
        </button>
      </form>

      {/* Slot list */}
      {slots.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-4">
          No slots added yet.
        </p>
      ) : (
        <div className="space-y-2">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm ${
                slot.isBooked
                  ? "border-white/5 bg-white/3 opacity-50"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div>
                <p className="text-white">{slot.date}</p>
                <p className="text-gray-500 text-xs">
                  {slot.startTime}–{slot.endTime}
                  {slot.isBooked && " · Booked"}
                </p>
              </div>
              {!slot.isBooked && (
                <button
                  onClick={() => removeSlot(slot.id)}
                  className="text-red-400 hover:text-red-300 text-xs transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
