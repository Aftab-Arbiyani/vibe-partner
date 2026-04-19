import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  robots: { index: false, follow: false },
};

export default function BookingCancelledPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[200px] rounded-full bg-red-600/10 blur-3xl" />
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center text-3xl mx-auto mb-6">
                ✕
              </div>
              <h1 className="text-4xl font-bold mb-4">Payment cancelled.</h1>
              <p className="text-gray-400 text-lg mb-4">
                You left before completing payment — nothing was charged.
              </p>
              <p className="text-gray-500 mb-10">
                Your session details have been saved. Click below to go back and
                try again, or email us if you ran into an issue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Try Again →
                </a>
                <a
                  href="mailto:hello@vibepartner.com"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
