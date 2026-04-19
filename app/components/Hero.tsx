export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Human support for AI builders
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          When your{" "}
          <span className="gradient-text">vibe-coded</span>
          <br />
          app breaks —{" "}
          <span className="gradient-text">we fix it.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Human-powered pair programming for non-technical founders. Stuck on a Cursor error? Lovable deployment failing?
          We&apos;re your on-demand developer — async or live.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/book"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors glow"
          >
            Book a Free Hour →
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            See How It Works
          </a>
        </div>

        {/* Social proof mini */}
        <p className="mt-10 text-sm text-gray-600">
          Trusted by indie hackers, solo founders &amp; AI builders
        </p>

        {/* Tool logos text */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-gray-600 text-sm font-medium">
          {["Cursor", "Lovable", "Bolt", "v0", "Replit"].map((tool) => (
            <span key={tool} className="border border-white/10 px-3 py-1 rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
