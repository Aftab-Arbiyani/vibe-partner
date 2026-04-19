import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Cursor AI Help for Non-Technical Founders",
  description:
    "Your Cursor AI project is stuck. Errors you don't understand, loops that go nowhere. VibePartner's senior devs fix Cursor-generated code fast — async or live screen share.",
  alternates: { canonical: "http://localhost:9002/for/cursor-users" },
  openGraph: {
    title: "Cursor AI Help for Non-Technical Founders | VibePartner",
    description:
      "Your Cursor AI project is stuck. VibePartner's senior devs fix Cursor-generated code fast — async or live screen share.",
    url: "http://localhost:9002/for/cursor-users",
  },
};

const problems = [
  {
    title: "Infinite error loops",
    description:
      "You've tried 10 prompts and the AI keeps generating code that breaks in a new way. We break the loop and explain exactly what went wrong.",
  },
  {
    title: "Broken deployments after Cursor edits",
    description:
      "It ran fine locally. Vercel or Railway is throwing errors you've never seen. We diagnose and fix environment-specific failures fast.",
  },
  {
    title: "Code that runs locally but fails in production",
    description:
      "Environment variables, build config, runtime differences — we know exactly where Cursor-generated code tends to fall apart.",
  },
  {
    title: "Database and auth integrations that don't connect",
    description:
      "Supabase, Prisma, NextAuth — these integrations have sharp edges. We've fixed hundreds of them and get yours working today.",
  },
];

const testimonials = [
  {
    quote:
      "I'd been stuck on the same Cursor deployment error for 3 days. VibePartner fixed it in 45 minutes on a live call. I felt like an idiot for not finding this sooner.",
    name: "Sarah K.",
    role: "Solo founder, SaaS app built with Cursor",
    avatar: "SK",
  },
  {
    quote:
      "I had Cursor access but had no idea how to structure the project. The AI-guided build package was exactly what I needed. We shipped in 2 weeks.",
    name: "Marcus T.",
    role: "Indie hacker, built his first product",
    avatar: "MT",
  },
];

export default function CursorUsersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Cursor AI Support
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Expert Help When{" "}
              <span className="gradient-text">Cursor AI</span> Gets You Stuck
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Cursor is powerful. But when it generates broken code, gives you
              errors you don&apos;t understand, or gets you going in circles —
              you need a human. We&apos;re that human.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Paste Your Cursor Error →
              </a>
              <a
                href="#contact"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Book a 30-Min Cursor Review
              </a>
            </div>
          </div>
        </section>

        {/* Problems We Fix */}
        <section className="py-20 px-6 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Sound familiar?
              </p>
              <h2 className="text-4xl font-bold">
                The Most Common Cursor Problems We Fix
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Fix It */}
        <section className="py-20 px-6 bg-[#0D0D0D]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              The process
            </p>
            <h2 className="text-4xl font-bold mb-14">
              How We Fix Your Cursor Project
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {
                  number: "01",
                  title: "Share your error",
                  description:
                    "Paste your error message, share your repo link, or describe what&apos;s broken. We review within hours.",
                },
                {
                  number: "02",
                  title: "Async fix or live session",
                  description:
                    "Get a written fix delivered same-day, or jump on a screen-share and we solve it together in real time.",
                },
                {
                  number: "03",
                  title: "Ship your feature",
                  description:
                    "Your Cursor project works. You understand what changed and why — so you can keep building.",
                },
              ].map((step) => (
                <div key={step.number} className="flex flex-col gap-4">
                  <span className="text-5xl font-bold text-indigo-600/40">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold">Cursor Users We&apos;ve Helped</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-gray-500 text-sm">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-24 px-6 bg-[#0D0D0D]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[300px] rounded-full bg-indigo-600/15 blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="text-4xl font-bold mb-4">
                  Book a Free Cursor Code Review
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                  30 minutes, no charge. We look at your Cursor project, identify
                  the problem, and tell you exactly how to fix it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                    Get Help →
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  Fix it async from $40 · Live session from $60/hr
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
