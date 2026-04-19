import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Lovable App Broken? Expert Help for Lovable Builders",
  description:
    "Lovable deployment failing? Supabase integration not working? VibePartner fixes Lovable-built apps fast. Senior dev support — async in 24h or live screen share today.",
  alternates: { canonical: "http://localhost:9002/for/lovable-users" },
  openGraph: {
    title: "Lovable App Broken? Expert Help for Lovable Builders | VibePartner",
    description:
      "Lovable deployment failing? Supabase integration not working? VibePartner fixes Lovable-built apps fast — async or live screen share.",
    url: "http://localhost:9002/for/lovable-users",
  },
};

const problems = [
  {
    title: "Deployment failures (Netlify / Vercel)",
    description:
      "Your Lovable project builds locally but the deployment fails. We diagnose build config, environment variables, and CDN edge cases.",
  },
  {
    title: "Supabase auth and database errors",
    description:
      "Row-level security, auth callbacks, or schema mismatches breaking your app. We know Lovable + Supabase integration deeply.",
  },
  {
    title: "Custom domain configuration",
    description:
      "DNS propagation, SSL certificates, redirect loops — we walk you through the exact steps to get your domain pointing correctly.",
  },
  {
    title: "API integrations that break after edits",
    description:
      "Stripe, Resend, third-party APIs — Lovable edits can silently break working integrations. We find the regression and fix it.",
  },
];

const testimonials = [
  {
    quote:
      "Works locally, failed in production. The error logs made no sense. VibePartner found a Supabase RLS issue in 20 minutes that I'd been staring at for two days.",
    name: "Priya R.",
    role: "Solo founder, marketplace built with Lovable",
    avatar: "PR",
  },
  {
    quote:
      "The async plan is insane value. I drop a Lovable bug into the Notion form, and it's fixed with a full explanation by morning. Like having a senior dev on call.",
    name: "James O.",
    role: "Small business owner, built internal tool with Lovable",
    avatar: "JO",
  },
];

export default function LovableUsersPage() {
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
              Lovable Support
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              When Your{" "}
              <span className="gradient-text">Lovable App</span> Stops Working
              — We Get It Running
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Lovable makes building fast. Debugging it is a different story.
              When your app breaks in production, we fix it — same day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Submit Your Lovable Bug →
              </a>
              <a
                href="#contact"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Book a Live Lovable Session
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
                Lovable Problems We Fix Every Day
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

        {/* Async vs Live */}
        <section className="py-20 px-6 bg-[#0D0D0D]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold">
                Async Fix or Live Session — You Choose
              </h2>
              <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
                Both options get your Lovable app working. Pick whatever fits
                your schedule and urgency.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-3xl mb-4">📨</div>
                <h3 className="text-2xl font-bold mb-3">Async Fix</h3>
                <p className="text-gray-400 mb-6">
                  Share your repo and describe the problem. Get a complete written fix
                  with explanation delivered within 24 hours. No scheduling required.
                </p>
                <p className="text-indigo-400 font-semibold">From $40</p>
              </div>
              <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-8">
                <div className="text-3xl mb-4">🎙️</div>
                <h3 className="text-2xl font-bold mb-3">Live Screen Share</h3>
                <p className="text-gray-400 mb-6">
                  Book a session on our calendar. We screen-share via Google Meet and
                  solve the problem together in real time. Walk away with a working app.
                </p>
                <p className="text-indigo-400 font-semibold">From $60 / hr</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-[#111111]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold">
                What Lovable Founders Say About VibePartner
              </h2>
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
                  Get Your Lovable App Fixed Today
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                  First session is free. If we don&apos;t fix your Lovable problem,
                  you don&apos;t pay.
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
                  Async fix $40 · Live session $60/hr · Monthly plan from $149
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
