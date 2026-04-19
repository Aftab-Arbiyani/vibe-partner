const steps = [
  {
    number: "01",
    title: "Share your problem",
    description:
      "Submit your repo link, paste your error, or describe your idea. We review it and confirm scope within hours.",
  },
  {
    number: "02",
    title: "Choose async or live",
    description:
      "Get a written fix delivered async, or jump on a screen-share session for real-time problem solving.",
  },
  {
    number: "03",
    title: "Ship your fix",
    description:
      "Your app works. Your feature is live. You understand what changed and why — so you can keep building.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">The process</p>
          <h2 className="text-4xl md:text-5xl font-bold">Simple. Fast. Human.</h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            No lengthy onboarding. No waiting weeks for a freelancer. Just real help, fast.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-indigo-600/0 via-indigo-600/40 to-indigo-600/0" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number bubble */}
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mb-6 z-10">
                <span className="text-indigo-400 font-bold text-lg">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
