import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Build Your Startup Without a Technical Co-Founder",
  description:
    "You have the idea. AI tools give you the power to build. VibePartner fills the gap — pair programming and guided builds for founders who can't code but refuse to quit.",
  alternates: {
    canonical: "http://localhost:9002/for/non-technical-founders",
  },
  openGraph: {
    title:
      "Build Your Startup Without a Technical Co-Founder | VibePartner",
    description:
      "You have the idea. AI tools give you the power to build. VibePartner fills the gap — guided builds for founders who can't code but refuse to quit.",
    url: "http://localhost:9002/for/non-technical-founders",
  },
};

const whatYouCanShip = [
  {
    icon: "⚡",
    title: "SaaS MVPs",
    description:
      "Subscription products with auth, billing, and dashboards. We guide you from first prompt to first paying customer.",
  },
  {
    icon: "🔧",
    title: "Internal Tools & Automations",
    description:
      "Replace spreadsheets and manual workflows with real tools your team actually uses. No code required from you.",
  },
  {
    icon: "🏪",
    title: "Marketplaces & Directories",
    description:
      "Two-sided platforms, listing sites, community tools. We scope it, you vibe-code it, we unstick you when needed.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Products",
    description:
      "Products that use GPT, Claude, or other AI APIs. We help you integrate them cleanly and ship something people pay for.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us your idea",
    description:
      "No technical language needed. Describe it like you'd explain it to a friend. We turn it into a buildable scope.",
  },
  {
    number: "02",
    title: "We guide you through AI tools",
    description:
      "We show you exactly what to prompt in Cursor, Lovable, or Bolt. You're in control — we're your co-pilot.",
  },
  {
    number: "03",
    title: "Unstuck on demand",
    description:
      "Every builder hits walls. When you do, we're there — async or live — to break through and keep you shipping.",
  },
];

const testimonials = [
  {
    quote:
      "I had a full business idea and Cursor access but had no idea how to structure the project. The AI-guided build package was exactly what I needed. We shipped in 2 weeks.",
    name: "Marcus T.",
    role: "Indie hacker, built his first product",
    avatar: "MT",
  },
  {
    quote:
      "I kept being told I needed a technical co-founder. VibePartner proved that wrong. My MVP is live and I have paying users.",
    name: "Aisha B.",
    role: "Non-technical founder, B2B SaaS",
    avatar: "AB",
  },
  {
    quote:
      "The async plan is insane value. I drop a bug into the form, and it's fixed with a full explanation by morning. Like having a senior dev on call without the salary.",
    name: "Priya R.",
    role: "Small business owner automating workflows",
    avatar: "PR",
  },
];

export default function NonTechnicalFoundersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              For Non-Technical Founders
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              You Don&apos;t Need a Technical Co-Founder.{" "}
              <span className="gradient-text">You Need a Technical Partner.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              You have the idea. AI tools give you the power to build. VibePartner
              fills the gap — pair programming and guided builds for founders who
              can&apos;t code but refuse to quit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Tell Us Your Idea →
              </a>
              <a
                href="#contact"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Book a Free Discovery Call
              </a>
            </div>
          </div>
        </section>

        {/* The Real Problem */}
        <section className="py-20 px-6 bg-[#111111]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              The real problem
            </p>
            <h2 className="text-4xl font-bold mb-6">
              It&apos;s not that you can&apos;t code. It&apos;s that you get stuck and have no one to call.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              AI tools like Cursor, Lovable, and Bolt have made building accessible. But they
              haven&apos;t made it frictionless. Every non-technical founder hits the same wall:
              a broken deployment, an error they can&apos;t decode, a feature they can&apos;t figure out
              how to prompt. VibePartner is the human layer that fills that gap.
            </p>
          </div>
        </section>

        {/* What You Can Ship */}
        <section className="py-20 px-6 bg-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
                What&apos;s possible
              </p>
              <h2 className="text-4xl font-bold">What You Can Ship With Our Help</h2>
              <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
                These aren&apos;t theoretical. These are real products non-technical founders
                have shipped using VibePartner.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {whatYouCanShip.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
                The process
              </p>
              <h2 className="text-4xl font-bold">
                How VibePartner Works for Non-Technical Founders
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {steps.map((step) => (
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
        <section className="py-20 px-6 bg-[#0D0D0D]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold">
                Real Founders. Real Products. Shipped.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <p className="text-gray-300 leading-relaxed mb-6">
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
        <section id="contact" className="py-24 px-6 bg-[#111111]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[300px] rounded-full bg-indigo-600/15 blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="text-4xl font-bold mb-4">
                  Your First Session Is Free
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                  Book a free 1-hour session. We look at your idea or your stuck
                  project and tell you exactly what to do next.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                    Get Started →
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  No credit card. No commitment. No jargon.
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
