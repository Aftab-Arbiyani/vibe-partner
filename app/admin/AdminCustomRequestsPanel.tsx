"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomRequest } from "@/lib/skills-data";

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const STATUS_LABELS: Record<string, string> = {
  pending_payment: "Awaiting Payment",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
};

type RequestStatus = CustomRequest["status"];
const STATUSES: RequestStatus[] = ["pending_payment", "pending", "completed", "cancelled"];

interface Props {
  requests: CustomRequest[];
}

export default function AdminCustomRequestsPanel({ requests }: Props) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: RequestStatus) {
    setUpdatingId(id);
    await fetch(`/api/admin/custom-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
    router.refresh();
  }

  const sorted = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Custom Skill Requests</h2>
        <span className="text-xs text-gray-500">{requests.length} total</span>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
          No custom requests yet.
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((req) => (
            <div
              key={req.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold">{req.name}</p>
                  <a
                    href={`mailto:${req.email}`}
                    className="text-indigo-400 text-sm hover:underline"
                  >
                    {req.email}
                  </a>
                  {req.phone && (
                    <p className="text-gray-500 text-xs mt-0.5">{req.phone}</p>
                  )}
                </div>
                <span
                  className={`text-xs border px-2 py-1 rounded-full whitespace-nowrap ${STATUS_COLORS[req.status] ?? ""}`}
                >
                  {STATUS_LABELS[req.status] ?? req.status}
                </span>
              </div>

              <p className="text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2 mb-3 leading-relaxed">
                {req.requirement}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600" suppressHydrationWarning>
                  {new Date(req.createdAt).toLocaleString()}
                </p>

                <select
                  value={req.status}
                  disabled={updatingId === req.id}
                  onChange={(e) => updateStatus(req.id, e.target.value as RequestStatus)}
                  className="text-xs bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-gray-300 cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-[#1a1a1a]">
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
