import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Payment Successful — VibePartner",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 py-32">
        <Suspense
          fallback={
            <div className="text-center text-gray-400">
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500/40 border-t-indigo-500 animate-spin mx-auto mb-4" />
              Loading…
            </div>
          }
        >
          <SuccessClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
