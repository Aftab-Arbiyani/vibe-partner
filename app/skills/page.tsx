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

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills card */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl mb-5">
                ⚡
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">What are Skills?</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Skills are <span className="text-gray-200">.md instruction files</span> you drop into your project. Claude Code or Cursor reads them and gains new slash commands — covering tasks like code review, test generation, refactoring, and documentation — without any plugin installs or config.
              </p>
              <ol className="space-y-2 text-sm text-gray-400">
                {[
                  "Download the skill file",
                  "Place it in your repo (e.g. .claude/skills/)",
                  "Invoke it with a slash command in Claude Code or Cursor",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Agents card */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xl mb-5">
                🤖
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">What are AI Agents?</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Agents are <span className="text-gray-200">multi-step AI workflows</span> that chain research, planning, and implementation into a single command. Instead of prompting back and forth, you run the agent and it handles the full cycle — from reading your codebase to opening a PR.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  "Automate repetitive dev cycles end-to-end",
                  "Orchestrate multiple AI calls with shared context",
                  "Run unattended — ship while you sleep",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
