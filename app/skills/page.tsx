import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getSkills } from "@/lib/skills-data";
import SkillsSearch from "./SkillsSearch";
import CustomRequestForm from "./CustomRequestForm";

export const metadata: Metadata = {
  title: "Skills — VibePartner",
  description:
    "Download free and premium skill files and AI agent workflows. Or request a custom skill built for your exact stack.",
};

export const revalidate = 3600; // revalidate at most once per hour

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-400 text-sm mb-6">
            Skills &amp; AI Workflows
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Downloadable{" "}
            <span className="gradient-text">Skills &amp; Agent Workflows</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Grab free skill files, buy premium AI agent workflows, or commission
            a custom skill built exactly for your stack.
          </p>
        </section>

        <SkillsSearch skills={skills} />

        {/* Custom Skill Request */}
        <section
          className="max-w-6xl mx-auto px-6 pb-24 border-t border-white/5 pt-16"
          id="custom"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-400 text-sm mb-6">
                Custom Request
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-snug">
                Need something built{" "}
                <span className="gradient-text">just for you?</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Tell us what you need — a Claude skill file, a multi-agent
                workflow, a Cursor rule set, or anything in between. We&apos;ll
                build it for your exact stack and deliver it as a ready-to-use
                file.
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "Custom Claude / Cursor skill files",
                  "Multi-agent AI workflows",
                  "Repo-specific automation scripts",
                  "Delivered within 48–72 hours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-indigo-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-300 text-sm font-semibold mb-1">
                  $20 advance payment
                </p>
                <p className="text-gray-500 text-xs">
                  Secures your spot and covers scoping. We&apos;ll confirm
                  timeline and any balance before starting work.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-white mb-6">
                Request a Custom Skill
              </h3>
              <CustomRequestForm />
            </div>
          </div>
        </section>

        {/* Back to home */}
        <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
