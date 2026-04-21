"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { COUNTRIES } from "@/data/countries";
import { SERVICE_DISPLAY_PRICE } from "@/lib/prices";

type ServiceType = "async" | "live" | "monthly" | "pro";

interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

const SERVICES = [
  {
    id: "async" as ServiceType,
    icon: "📨",
    title: "Async Bug Fix",
    price: SERVICE_DISPLAY_PRICE.async,
    description:
      "Share your error or repo. Get a complete written fix with explanation within 24 hours.",
  },
  {
    id: "live" as ServiceType,
    icon: "🎙️",
    title: "Live Pair Programming",
    price: SERVICE_DISPLAY_PRICE.live,
    description:
      "Screen-share via Google Meet. Real-time problem solving with a senior developer.",
  },
  {
    id: "monthly" as ServiceType,
    icon: "🔁",
    title: "Monthly Retainer — Starter",
    price: SERVICE_DISPLAY_PRICE.monthly,
    description:
      "4 hours async + 1 live session per month. Priority replies. Cancel anytime.",
  },
  {
    id: "pro" as ServiceType,
    icon: "⚡",
    title: "Monthly Retainer — Pro",
    price: SERVICE_DISPLAY_PRICE.pro,
    description:
      "10 hours async + 3 live sessions. Same-day SLA. Priority queue + Teams & WhatsApp.",
  },
];

function formatSlotLabel(slot: Slot) {
  const date = new Date(slot.date + "T00:00:00");
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `${dateStr} · ${slot.startTime}–${slot.endTime}`;
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState("");
  const [description, setDescription] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service === "async" || service === "live" || service === "monthly" || service === "pro") {
      setServiceType(service);
      setStep(2);
    }
  }, []);

  useEffect(() => {
    if (serviceType === "live") {
      setSlotsLoading(true);
      fetch("/api/availability")
        .then((r) => r.json())
        .then(setSlots)
        .catch(() => setSlots([]))
        .finally(() => setSlotsLoading(false));
    }
  }, [serviceType]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          serviceType,
          description,
          repoLink,
          slotId: slotId || null,
          country: country || undefined,
          timezone: timezone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canProceedStep2 =
    description.trim().length >= 10 &&
    !slotsLoading &&
    (serviceType !== "live" || slots.length === 0 || slotId !== "");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Book Your Session</h1>
            <p className="text-gray-400">
              Secure payment via Stripe. Confirmation email sent instantly.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10 justify-center">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    s === step
                      ? "bg-indigo-600 text-white"
                      : s < step
                      ? "bg-indigo-600/40 text-indigo-300"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-px w-12 transition-colors ${
                      s < step ? "bg-indigo-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 — Pick service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-300">
                What do you need help with?
              </h2>
              <div className="grid gap-4">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setServiceType(s.id); setStep(2); }}
                    className={`w-full text-left p-6 rounded-2xl border transition-all ${
                      serviceType === s.id
                        ? "border-indigo-500 bg-indigo-600/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{s.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-lg">{s.title}</span>
                          <span className="text-indigo-400 text-sm font-medium">{s.price}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{s.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Describe + pick slot */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
              >
                ← Back
              </button>
              <h2 className="text-xl font-semibold mb-6 text-gray-300">
                {serviceType === "monthly" || serviceType === "pro"
                  ? "Tell us about your project"
                  : "Describe the problem"}
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {serviceType === "monthly" || serviceType === "pro"
                      ? "What are you building? What's your goal?"
                      : "What's broken? What have you tried?"}
                    <span className="text-indigo-400 ml-1">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder={
                      serviceType === "monthly" || serviceType === "pro"
                        ? "I'm building a SaaS for X. I have Cursor access and can code a little but need ongoing guidance..."
                        : "My Cursor project breaks when I try to deploy. The error says '...' and I've already tried..."
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                  {description.trim().length > 0 && description.trim().length < 10 && (
                    <p className="text-yellow-500 text-xs mt-1">
                      Please enter at least 10 characters.
                    </p>
                  )}
                </div>

                {serviceType !== "monthly" && serviceType !== "pro" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Repo link or error paste{" "}
                      <span className="text-gray-600">(optional but helpful)</span>
                    </label>
                    <input
                      type="text"
                      value={repoLink}
                      onChange={(e) => setRepoLink(e.target.value)}
                      placeholder="https://github.com/you/your-project  or paste the error here"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                )}

                {(serviceType === "live" || serviceType === "monthly" || serviceType === "pro") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your country <span className="text-gray-600">(optional)</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="" className="bg-gray-900">— Select your country —</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-gray-900">{c}</option>
                      ))}
                    </select>
                    {timezone && (
                      <p className="text-xs text-gray-500 mt-1.5">
                        Detected timezone: <span className="text-gray-400">{timezone}</span>
                      </p>
                    )}
                  </div>
                )}

                {serviceType === "live" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Pick a time slot <span className="text-indigo-400 ml-1">*</span>
                    </label>
                    {slotsLoading ? (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-5 text-gray-500 text-sm text-center animate-pulse">
                        Loading available slots…
                      </div>
                    ) : slots.length === 0 ? (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-5 text-gray-500 text-sm text-center">
                        No slots available right now. Select Async Fix instead, or check back soon.
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {slots.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSlotId(slot.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                              slotId === slot.id
                                ? "border-indigo-500 bg-indigo-600/10 text-white"
                                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
                            }`}
                          >
                            {formatSlotLabel(slot)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => { if (canProceedStep2) setStep(3); }}
                  disabled={!canProceedStep2}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Name + email */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
              >
                ← Back
              </button>
              <h2 className="text-xl font-semibold mb-6 text-gray-300">
                Almost done — who are you?
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your name <span className="text-indigo-400 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email address <span className="text-indigo-400 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Summary */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-400 space-y-1">
                  <p>
                    <span className="text-gray-500">Service:</span>{" "}
                    <span className="text-white">
                      {SERVICES.find((s) => s.id === serviceType)?.title}
                    </span>
                  </p>
                  {slotId && slots.length > 0 && (
                    <p>
                      <span className="text-gray-500">Slot:</span>{" "}
                      <span className="text-white">
                        {formatSlotLabel(slots.find((s) => s.id === slotId)!)}
                      </span>
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !email.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {submitting ? "Redirecting to payment..." : "Pay & Confirm →"}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  You&apos;ll be redirected to Stripe. A confirmation email is sent once payment is complete.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
