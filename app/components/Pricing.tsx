const plans = [
  {
    name: "Pay-as-you-go",
    price: "$40–60",
    period: "/ hour",
    description: "No commitment. Perfect for one-off problems.",
    features: [
      "Live sessions or async fixes",
      "Book only when you need it",
      "No monthly contract",
      "Same quality, full attention",
    ],
    cta: "Book a Session",
    href: "/book",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$149",
    period: "/ month",
    description: "For early-stage builders shipping their first product.",
    features: [
      "4 hours async support",
      "1 live pair programming session",
      "Priority replies",
      "Cancel anytime",
    ],
    cta: "Start Starter",
    href: "/book?service=monthly",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/ month",
    description: "For active founders shipping weekly.",
    features: [
      "10 hours async support",
      "3 live pair programming sessions",
      "Same-day response SLA",
      "Priority queue + Teams & WhatsApp",
    ],
    cta: "Go Pro",
    href: "/book?service=pro",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold">Simple, honest pricing</h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            No hidden fees. No scope creep surprises. Pay for what you actually use.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all ${
                plan.highlight
                  ? "bg-indigo-600/10 border-indigo-500/50 glow"
                  : "bg-white/5 border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="text-indigo-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block text-center font-semibold py-3 px-6 rounded-xl transition-colors ${
                  plan.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "border border-white/20 hover:border-white/40 text-gray-300 hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          Not sure which plan? <a href="#contact" className="text-indigo-400 hover:underline">Book a free 30-min intro call</a> and we&apos;ll figure it out together.
        </p>
      </div>
    </section>
  );
}
