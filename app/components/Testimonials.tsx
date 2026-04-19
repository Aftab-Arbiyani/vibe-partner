const testimonials = [
  {
    quote:
      "I'd been stuck on the same deployment error for 3 days. VibePartner fixed it in 45 minutes on a live call. I felt like an idiot for not finding this sooner.",
    name: "Sarah K.",
    role: "Solo founder, SaaS app built with Lovable",
    avatar: "SK",
  },
  {
    quote:
      "I had a full business idea and Cursor access but had no idea how to structure the project. The AI-guided build package was exactly what I needed. We shipped in 2 weeks.",
    name: "Marcus T.",
    role: "Indie hacker, built his first product",
    avatar: "MT",
  },
  {
    quote:
      "The async plan is insane value. I drop a bug into the Notion form, and it's fixed with a full explanation by morning. Like having a senior dev on call without the salary.",
    name: "Priya R.",
    role: "Small business owner automating workflows",
    avatar: "PR",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">What builders say</p>
          <h2 className="text-4xl md:text-5xl font-bold">Real help. Real results.</h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
