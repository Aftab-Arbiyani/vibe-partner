export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#0D0D0D]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] rounded-full bg-indigo-600/15 blur-3xl" />
          </div>

          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to stop being stuck?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Book a free 1-hour session. No credit card required. If we don&apos;t
              help you ship something real, you don&apos;t pay.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Book a Free Session →
              </a>
              <a
                href="#pricing"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
