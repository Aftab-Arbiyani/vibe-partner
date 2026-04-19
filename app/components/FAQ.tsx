"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What AI tools do you support?",
    answer:
      "We work with all major vibe-coding tools: Cursor, Lovable, Bolt, v0, Replit, and more. If you built it with an AI tool and it's broken, we can fix it.",
  },
  {
    question: "How fast will I get a response?",
    answer:
      "Async requests are typically addressed within 24 hours on the Starter plan, and same-day on Pro. Live sessions are booked directly through our Cal.com calendar.",
  },
  {
    question: "What if my problem is too complex?",
    answer:
      "We'll scope it upfront. If a fix requires more hours than your plan covers, we'll let you know before starting — no surprise charges.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Not at all. We explain everything in plain English. Many of our clients are non-technical founders who built with AI tools and just need someone to unstick them.",
  },
  {
    question: "Can I cancel my monthly plan?",
    answer:
      "Yes, cancel anytime. No lock-in, no cancellation fees. We want you to stay because we're useful, not because of a contract.",
  },
  {
    question: "What's the AI-Guided Build service exactly?",
    answer:
      "You bring a business idea and AI tool access. We act as your co-pilot: scoping what to build, choosing the right tools, crafting the right prompts, and guiding you step by step until you have a working product live.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold">Questions answered</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-white font-medium">{faq.question}</span>
                <span className={`text-indigo-400 text-xl transition-transform ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
