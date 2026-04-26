"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold gradient-text">
          VibePartner
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/book"
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm text-gray-400">
          <Link href="/#services" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Services</Link>
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">How It Works</Link>
          <Link href="/#pricing" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/skills" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Skills</Link>
          <Link href="/#faq" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">FAQ</Link>
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-center transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
