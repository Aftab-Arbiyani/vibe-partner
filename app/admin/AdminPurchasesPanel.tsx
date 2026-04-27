"use client";

import { useState } from "react";
import type { Purchase, Skill } from "@/lib/skills-data";

type SortOrder = "desc" | "asc";

interface Props {
  purchases: Purchase[];
  skillsMap: Record<string, Skill>;
}

export default function AdminPurchasesPanel({ purchases, skillsMap }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [search, setSearch] = useState("");

  const filtered = purchases
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        (skillsMap[p.skillId]?.title ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? -diff : diff;
    });

  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Sales</p>
          <p className="text-3xl font-bold">{purchases.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Revenue</p>
          <p className="text-3xl font-bold">${(totalRevenue / 100).toFixed(2)}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Unique Buyers</p>
          <p className="text-3xl font-bold">{new Set(purchases.map((p) => p.email)).size}</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, email or skill…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors w-64"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="text-xs bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 hover:bg-white/20 transition-colors flex items-center gap-1"
        >
          {sortOrder === "desc" ? "Newest first" : "Oldest first"}
          <span className="text-gray-500">{sortOrder === "desc" ? "↓" : "↑"}</span>
        </button>
        <span className="text-xs text-gray-600 ml-auto">
          {filtered.length} purchase{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
          {search ? "No purchases match your search." : "No purchases yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((purchase) => {
            const skill = skillsMap[purchase.skillId];
            return (
              <div
                key={purchase.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Buyer info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{purchase.name}</p>
                  <a
                    href={`mailto:${purchase.email}`}
                    className="text-indigo-400 text-sm hover:underline"
                  >
                    {purchase.email}
                  </a>
                </div>

                {/* Skill */}
                <div className="flex-1 min-w-0">
                  {skill ? (
                    <div>
                      <p className="text-sm text-white truncate">{skill.title}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full border capitalize ${
                        skill.type === "agent"
                          ? "bg-violet-600/20 border-violet-500/30 text-violet-400"
                          : "bg-sky-600/20 border-sky-500/30 text-sky-400"
                      }`}>
                        {skill.type}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-600">Skill ID: {purchase.skillId}</p>
                  )}
                </div>

                {/* Amount + date */}
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
                  <span className="text-white font-bold">
                    ${(purchase.amount / 100).toFixed(2)}
                  </span>
                  <p className="text-xs text-gray-600" suppressHydrationWarning>
                    {new Date(purchase.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
