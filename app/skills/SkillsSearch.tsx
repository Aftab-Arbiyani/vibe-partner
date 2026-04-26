"use client";

import { useState, useMemo } from "react";
import type { Skill } from "@/lib/skills-data";
import PurchaseButton from "./PurchaseButton";

interface Props {
  skills: Skill[];
}

type TypeFilter = "all" | "skill" | "agent";

interface ModalState {
  skill: Skill;
  name: string;
  email: string;
  loading: boolean;
  error: string;
}

export default function SkillsSearch({ skills }: Props) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [modal, setModal] = useState<ModalState | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return skills.filter((s) => {
      const matchesType = typeFilter === "all" || (s.type ?? "skill") === typeFilter;
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter, skills]);

  const freeSkills = filtered.filter((s) => !s.isPremium);
  const premiumSkills = filtered.filter((s) => s.isPremium);
  const noResults = filtered.length === 0 && query.trim() !== "";

  function openModal(skill: Skill) {
    setModal({ skill, name: "", email: "", loading: false, error: "" });
  }

  function closeModal() {
    if (modal?.loading) return;
    setModal(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal) return;

    const name = modal.name.trim();
    const email = modal.email.trim();

    if (!name) {
      setModal((m) => m ? { ...m, error: "Please enter your name." } : m);
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setModal((m) => m ? { ...m, error: "Please enter a valid email address." } : m);
      return;
    }

    setModal((m) => m ? { ...m, loading: true, error: "" } : m);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: modal.skill.id, name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setModal((m) => m ? { ...m, loading: false, error: data.error ?? "Something went wrong. Please try again." } : m);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setModal((m) => m ? { ...m, loading: false, error: "Network error. Please try again." } : m);
    }
  }

  return (
    <>
      {/* Search bar + type filter */}
      <div className="max-w-xl mx-auto px-6 mb-14 space-y-3">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills by name, tag, or description…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-colors"
          />
        </div>
        <div className="flex rounded-lg overflow-hidden border border-white/10 text-sm">
          {(["all", "skill", "agent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`flex-1 py-2 capitalize font-medium transition-colors ${
                typeFilter === t
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {t === "all" ? "All" : t === "agent" ? "Agents" : "Skills"}
            </button>
          ))}
        </div>
      </div>

      {noResults && (
        <div className="max-w-6xl mx-auto px-6 pb-20 text-center text-gray-500">
          No skills match &ldquo;{query}&rdquo;.
        </div>
      )}

      {/* Free Skills */}
      {!noResults && (
        <section className="max-w-6xl mx-auto px-6 pb-20" id="free">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold">
              ✓
            </span>
            <h2 className="text-2xl font-bold">Free Skills</h2>
            <span className="bg-emerald-600/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
              No payment required
            </span>
          </div>

          {freeSkills.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-gray-500">
              {query ? "No free skills match your search." : "Free skills coming soon — check back shortly."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {freeSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="card-hover bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${
                        (skill.type ?? "skill") === "agent"
                          ? "bg-violet-600/20 border-violet-500/30 text-violet-400"
                          : "bg-sky-600/20 border-sky-500/30 text-sky-400"
                      }`}>
                        {skill.type ?? "skill"}
                      </span>
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/5 border border-white/10 text-gray-400 text-xs px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  <a
                    href={`/api/skills/download/${skill.id}`}
                    className="flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Free
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Premium Skills */}
      {!noResults && (
        <section
          className="max-w-6xl mx-auto px-6 pb-20 border-t border-white/5 pt-16"
          id="premium"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-sm font-bold">
              ★
            </span>
            <h2 className="text-2xl font-bold">Premium Skills</h2>
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-500/30">
              One-time payment
            </span>
          </div>

          {premiumSkills.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-gray-500">
              {query ? "No premium skills match your search." : "Premium skills launching soon — follow us for updates."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {premiumSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="card-hover bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${
                        (skill.type ?? "skill") === "agent"
                          ? "bg-violet-600/20 border-violet-500/30 text-violet-400"
                          : "bg-sky-600/20 border-sky-500/30 text-sky-400"
                      }`}>
                        {skill.type ?? "skill"}
                      </span>
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/5 border border-white/10 text-gray-400 text-xs px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-bold text-xl">
                      ${(skill.price / 100).toFixed(0)}
                    </span>
                    <span className="text-gray-500 text-xs">one-time</span>
                  </div>
                  <PurchaseButton price={skill.price} onBuyNow={() => openModal(skill)} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Purchase modal — rendered once here, outside the card loop */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl w-full max-w-md p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">One last step</h2>
              <p className="text-gray-400 text-sm">
                Enter your details so we can deliver{" "}
                <span className="text-gray-300 font-medium">{modal.skill.title}</span>{" "}
                to your inbox after payment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={modal.name}
                  onChange={(e) => setModal((m) => m ? { ...m, name: e.target.value } : m)}
                  placeholder="Jane Smith"
                  disabled={modal.loading}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 disabled:opacity-50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={modal.email}
                  onChange={(e) => setModal((m) => m ? { ...m, email: e.target.value } : m)}
                  placeholder="jane@example.com"
                  disabled={modal.loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 disabled:opacity-50 transition-colors"
                />
              </div>

              {modal.error && (
                <p className="text-red-400 text-xs">{modal.error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={modal.loading}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modal.loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  {modal.loading ? "Redirecting…" : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
