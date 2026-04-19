const problems = [
  {
    icon: "🔴",
    title: "Cursor gave you an error you don't understand",
    description:
      "The AI generated code that looks right but breaks everything. You've tried 10 prompts and you're going in circles.",
  },
  {
    icon: "🚫",
    title: "Your Lovable app deployed broken",
    description:
      "Works locally, fails in production. The error logs make no sense and you have no one to call.",
  },
  {
    icon: "💡",
    title: "You have the idea but can't ship it alone",
    description:
      "You know exactly what you want to build. You have AI tool access. But the gap between idea and working product feels impossible.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-6 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Sound familiar?</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Every AI builder hits a wall.
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            The tools are amazing — until they aren&apos;t. That&apos;s where VibePartner comes in.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="card-hover bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="text-4xl mb-5">{p.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
