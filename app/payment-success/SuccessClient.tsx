"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type State =
  | { phase: "loading" }
  | { phase: "downloading"; skillTitle: string; downloadUrl: string }
  | { phase: "done"; skillTitle: string }
  | { phase: "email_fallback" }
  | { phase: "custom" };

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const type = searchParams.get("type");

  const [state, setState] = useState<State>(
    type === "custom" ? { phase: "custom" } : { phase: "loading" }
  );

  useEffect(() => {
    if (type === "custom" || !sessionId) return;

    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    async function tryFetch() {
      attempts++;
      try {
        const res = await fetch(
          `/api/get-download-link?session_id=${encodeURIComponent(sessionId!)}`
        );
        const data = await res.json();

        if (res.ok && data.status === "ready") {
          setState({
            phase: "downloading",
            skillTitle: data.skillTitle,
            downloadUrl: data.downloadUrl,
          });

          // Trigger auto-download
          const link = document.createElement("a");
          link.href = data.downloadUrl;
          link.download = "";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Mark as done after a short delay
          setTimeout(() => {
            setState({ phase: "done", skillTitle: data.skillTitle });
          }, 3000);

          return;
        }
      } catch {
        // network error — fall through to retry
      }

      if (attempts < MAX_ATTEMPTS) {
        // Exponential-ish back-off: 1.5s, 2s, 2.5s, 3s
        const delay = 1500 + attempts * 500;
        setTimeout(tryFetch, delay);
      } else {
        setState({ phase: "email_fallback" });
      }
    }

    // Small initial delay to let webhook fire before first attempt
    const timer = setTimeout(tryFetch, 1500);
    return () => clearTimeout(timer);
  }, [sessionId, type]);

  // ── CUSTOM REQUEST SUCCESS ──────────────────────────────────────────────────
  if (state.phase === "custom") {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[200px] rounded-full bg-purple-600/15 blur-3xl" />
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-4xl font-bold mb-4">Request received!</h1>
            <p className="text-gray-400 text-lg mb-4">
              Your advance payment went through. Check your inbox — a
              confirmation email is on its way.
            </p>
            <p className="text-gray-500 mb-10">
              We&apos;ll be in touch within{" "}
              <span className="text-gray-300">24–48 hours</span> to confirm
              scope and timeline before starting work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/skills"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Browse More Skills
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LOADING / POLLING ──────────────────────────────────────────────────────
  if (state.phase === "loading") {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-6 h-6 text-indigo-400 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Payment confirmed!</h1>
        <p className="text-gray-400">
          Preparing your download — this only takes a moment…
        </p>
      </div>
    );
  }

  // ── AUTO-DOWNLOADING ────────────────────────────────────────────────────────
  if (state.phase === "downloading") {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[200px] rounded-full bg-indigo-600/15 blur-3xl" />
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl mx-auto mb-6 animate-bounce">
              ↓
            </div>
            <h1 className="text-4xl font-bold mb-4">Download started!</h1>
            <p className="text-gray-400 text-lg mb-2">
              <span className="text-white font-semibold">{state.skillTitle}</span>{" "}
              is downloading now.
            </p>
            <p className="text-gray-500 mb-8">
              A copy has also been sent to your email.
            </p>
            <a
              href={state.downloadUrl}
              download
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Again
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── DONE (auto-download completed) ──────────────────────────────────────────
  if (state.phase === "done") {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[200px] rounded-full bg-indigo-600/15 blur-3xl" />
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-4xl font-bold mb-4">
              You&apos;ve got{" "}
              <span className="gradient-text">{state.skillTitle}</span>
            </h1>
            <p className="text-gray-400 text-lg mb-3">
              Check your downloads folder — and your email for a backup link.
            </p>
            <p className="text-gray-500 mb-10">
              Didn&apos;t download?{" "}
              <a
                href={`/api/get-download-link?session_id=${sessionId}`}
                className="text-indigo-400 hover:underline"
              >
                Click here to try again.
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/skills"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Browse More Skills
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── EMAIL FALLBACK ──────────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl mx-auto mb-6">
        ✉
      </div>
      <h1 className="text-4xl font-bold mb-4">Check your email</h1>
      <p className="text-gray-400 text-lg mb-4">
        Payment confirmed! Your download link has been sent to your inbox.
      </p>
      <p className="text-gray-500 mb-10">
        It may take a minute to arrive. Check your spam folder if you
        don&apos;t see it.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/skills"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Browse More Skills
        </Link>
      </div>
    </div>
  );
}
