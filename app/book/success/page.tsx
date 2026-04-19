import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

export default function BookingSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[200px] rounded-full bg-indigo-600/15 blur-3xl" />
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl mx-auto mb-6">
                ✓
              </div>
              <h1 className="text-4xl font-bold mb-4">You&apos;re booked.</h1>
              <p className="text-gray-400 text-lg mb-4">
                Check your inbox — a confirmation email is on its way.
              </p>
              <p className="text-gray-500 mb-10">
                We&apos;ll review your request and get back to you within{" "}
                <span className="text-gray-300">24 hours</span>. If you booked a live
                session we&apos;ll confirm the time and send a Google Meet link.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Back to Home
                </Link>
                <a
                  href="mailto:hello@vibepartner.com"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Email Us Directly
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
