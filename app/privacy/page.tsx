import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | VibePartner",
  description: "How VibePartner collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0D] pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: April 21, 2026</p>

          <div className="space-y-10 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
              <p>
                VibePartner (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides human-powered technical support — including
                async bug fixes, live pair programming, monthly retainers, and AI-guided product builds —
                for founders and developers using AI-assisted coding tools such as Cursor, Lovable, Bolt,
                v0, and Replit. This Privacy Policy explains what personal data we collect when you use
                our website and services, how we use it, and your rights regarding that data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly when booking a session, as well as
                information generated through your use of our services:
              </p>
              <ul className="list-disc list-inside space-y-3 pl-2">
                <li>
                  <span className="text-white font-medium">Identity and contact</span> — your name and
                  email address, provided when booking or contacting us.
                </li>
                <li>
                  <span className="text-white font-medium">Booking details</span> — the service type you
                  select (Async Bug Fix, Live Pair Programming, Monthly Retainer, or AI-Guided Build),
                  your preferred session slot, country, and timezone.
                </li>
                <li>
                  <span className="text-white font-medium">Project information</span> — a description of
                  your error or project, and any repository or code links you voluntarily share with us
                  to help us diagnose or fix your issue.
                </li>
                <li>
                  <span className="text-white font-medium">Payment information</span> — billing details
                  processed securely by Stripe. We never store your card number or CVV.
                </li>
                <li>
                  <span className="text-white font-medium">Communications</span> — emails, messages, or
                  Teams/WhatsApp messages (Pro plan) you send us during or after a session.
                </li>
                <li>
                  <span className="text-white font-medium">Usage data</span> — pages visited, referral
                  source, browser type, and device type, collected via standard web analytics.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>To confirm, schedule, deliver, and follow up on your booked sessions.</li>
                <li>To diagnose bugs, review your repository, and deliver written fixes or guidance.</li>
                <li>To process payments and send receipts via Stripe.</li>
                <li>
                  To communicate with you about your session — including confirmations, reminders, fix
                  delivery, and support queries.
                </li>
                <li>
                  To manage your monthly retainer and track hours used (Starter and Pro plans).
                </li>
                <li>
                  To improve our services based on aggregated, anonymised usage patterns.
                </li>
                <li>To comply with applicable legal obligations.</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal data to third parties, use it for advertising, or share
                your code or project details with anyone outside of the VibePartner team.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
              <p className="mb-4">
                We use a small number of trusted third-party tools to operate and deliver our services:
              </p>
              <ul className="list-disc list-inside space-y-3 pl-2">
                <li>
                  <span className="text-white font-medium">Stripe</span> — payment processing for all
                  one-time sessions and monthly retainers. Your payment data is governed by{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Stripe&apos;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <span className="text-white font-medium">Google Meet</span> — video conferencing for
                  Live Pair Programming sessions. Sessions are subject to{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Google&apos;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <span className="text-white font-medium">Microsoft Teams & WhatsApp</span> — Pro
                  retainer clients receive dedicated Teams and WhatsApp access for ongoing communication.
                  Usage is subject to{" "}
                  <a
                    href="https://privacy.microsoft.com/en-us/privacystatement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Microsoft&apos;s Privacy Statement
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.whatsapp.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    WhatsApp&apos;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <span className="text-white font-medium">GitHub / repository platforms</span> — if you
                  share a repository link or grant us access, we use it solely to diagnose and fix your
                  issue. We do not retain access after your session is complete.
                </li>
                <li>
                  <span className="text-white font-medium">Email provider</span> — for transactional
                  emails including booking confirmations, fix deliveries, and support replies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Code and Repository Access</h2>
              <p>
                When you share a repository link or grant temporary access to your codebase, we treat
                this as strictly confidential. We access only the parts necessary to diagnose and fix
                your reported issue. We will never read, copy, store, or share your code beyond what is
                needed to complete your session. We strongly recommend revoking any access you grant us
                once your session is delivered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
              <p>
                We retain your personal data only as long as necessary to deliver the services you have
                requested and to comply with applicable legal obligations. Booking records and payment
                invoices are typically retained for seven years for accounting purposes. Session notes and
                project descriptions are deleted upon your request. You may request deletion of your data
                at any time (see Section 8).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Cookies</h2>
              <p>
                Our website uses essential cookies required for the booking flow to function (e.g.,
                session state and payment redirect handling). We may also use analytics cookies to
                understand how visitors use the site. You can disable cookies in your browser settings,
                though the booking form may not function correctly as a result.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request deletion of your data (subject to legal retention requirements).</li>
                <li>Object to or restrict certain processing activities.</li>
                <li>Receive your data in a portable format.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:hello@vibepartner.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  hello@vibepartner.com
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Security</h2>
              <p>
                We take reasonable technical and organisational measures to protect your personal data
                against unauthorised access, loss, or disclosure. All data transmitted between your
                browser and our servers is encrypted via TLS. Payment data is handled exclusively by
                Stripe and never touches our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Children&apos;s Privacy</h2>
              <p>
                Our services are intended for adults building software products and are not directed at
                children under the age of 16. We do not knowingly collect personal data from children.
                If you believe a child has provided us with personal data, please contact us and we will
                delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                &quot;Last updated&quot; date at the top of this page. Continued use of our services after changes
                are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Contact</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or how we handle your data,
                please contact us at{" "}
                <a
                  href="mailto:hello@vibepartner.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  hello@vibepartner.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
