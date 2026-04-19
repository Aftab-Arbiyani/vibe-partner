const services = [
  {
    icon: "📨",
    title: "Async Bug Fixes",
    description:
      "Share your repo or paste your error. Get a clear fix delivered same-day or next-day, with an explanation you'll actually understand.",
    tag: "Most Popular",
  },
  {
    icon: "🎙️",
    title: "Live Pair Programming",
    description:
      "Screen-share via Google Meet or Zoom. Real-time problem solving with a senior developer. Walk away with a working app and new skills.",
    tag: null,
  },
  {
    icon: "🔁",
    title: "Monthly Retainer",
    description:
      "Dedicated support hours every month. Perfect for active builders who ship frequently and need a reliable technical partner on standby.",
    tag: "Best Value",
  },
  {
    icon: "🚀",
    title: "AI-Guided Build",
    description:
      "Have a business idea and AI tool access but can't ship alone? We act as your co-pilot — scoping, prompting, guiding — until your product is live.",
    tag: null,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">What we offer</p>
          <h2 className="text-4xl md:text-5xl font-bold">Services built for builders</h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Whether you need a quick fix or a full product build — we&apos;ve got a format that fits.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="card-hover relative bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              {s.tag && (
                <span className="absolute top-6 right-6 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {s.tag}
                </span>
              )}
              <div className="text-4xl mb-5">{s.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
