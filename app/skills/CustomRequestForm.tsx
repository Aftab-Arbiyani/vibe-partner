"use client";

import { useState } from "react";

export default function CustomRequestForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone || !form.requirement) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-custom-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">
            Your name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">
          Phone number
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 555 000 0000"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">
          Describe what you need
        </label>
        <textarea
          name="requirement"
          value={form.requirement}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the skill or AI agent workflow you want built — what it should do, what tools it uses, any constraints or preferences..."
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        {loading ? "Redirecting to payment…" : "Submit & Pay $20 Advance →"}
      </button>

      <p className="text-gray-500 text-xs text-center">
        Advance payment secures your spot. We&apos;ll confirm scope and timeline within 24–48 hours.
      </p>
    </form>
  );
}
