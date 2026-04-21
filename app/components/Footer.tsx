import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <span className="text-xl font-bold gradient-text">VibePartner</span>
          <p className="text-gray-600 text-sm mt-1">Human support for AI builders.</p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
          <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            X / Twitter
          </a>
          <a
            href="mailto:hello@vibepartner.com"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} VibePartner. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
