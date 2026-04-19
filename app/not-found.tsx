import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[200px] rounded-full bg-indigo-600/15 blur-3xl" />
            </div>
            <div className="relative">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
                404
              </p>
              <h1 className="text-5xl font-bold mb-4">Page not found</h1>
              <p className="text-gray-400 text-lg mb-10">
                Looks like this page got vibe-coded into a broken state. Let&apos;s
                get you back to something that works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  href="/#contact"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Get Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
