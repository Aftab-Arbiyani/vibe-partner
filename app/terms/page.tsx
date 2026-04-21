import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | VibePartner",
  description: "The terms and conditions governing your use of VibePartner services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0D] pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: April 21, 2026</p>

          <div className="space-y-10 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Agreement</h2>
              <p>
                By accessing our website or booking a session with VibePartner (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                you agree to be bound by these Terms of Service. If you do not agree, please do not use
                our services. These terms apply to all visitors, clients, and anyone who purchases or
                uses our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Services</h2>
              <p className="mb-4">
                VibePartner provides human-powered technical support for founders and developers building
                with AI-assisted coding tools such as Cursor, Lovable, Bolt, v0, and Replit. We offer
                four service types:
              </p>
              <ul className="list-disc list-inside space-y-3 pl-2">
                <li>
                  <span className="text-white font-medium">Async Bug Fix</span> — you share your error
                  message, codebase, or repository link, and receive a complete written diagnosis and fix
                  with a plain-English explanation within 24 hours.
                </li>
                <li>
                  <span className="text-white font-medium">Live Pair Programming</span> — a real-time
                  screen-share session via Google Meet with a senior developer who works through your
                  problem alongside you.
                </li>
                <li>
                  <span className="text-white font-medium">Monthly Retainer — Starter</span> — 4 hours
                  of async support plus 1 live session per month, with priority replies. Renews monthly,
                  cancel anytime.
                </li>
                <li>
                  <span className="text-white font-medium">Monthly Retainer — Pro</span> — 10 hours of
                  async support plus 3 live sessions per month, same-day response SLA, priority queue,
                  and dedicated Microsoft Teams and WhatsApp access for ongoing communication.
                </li>
                <li>
                  <span className="text-white font-medium">AI-Guided Build</span> — for founders with a
                  business idea and access to AI coding tools who need a co-pilot to scope, prompt, and
                  guide the build until their product is live.
                </li>
              </ul>
              <p className="mt-4">
                Your first session (up to one hour) is offered free of charge as an introductory session.
                We reserve the right to modify, suspend, or discontinue any service at any time with
                reasonable advance notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Eligibility</h2>
              <p>
                You must be at least 18 years old and capable of entering into a legally binding
                contract to use our services. By using VibePartner, you represent and warrant that you
                meet this requirement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Pricing and Payments</h2>
              <p className="mb-4">
                All prices are listed in USD and processed securely via Stripe. By providing payment
                details, you authorise us to charge the applicable fees.
              </p>
              <ul className="list-disc list-inside space-y-3 pl-2">
                <li>
                  <span className="text-white font-medium">Pay-as-you-go (Async & Live)</span> — billed
                  from $40–$60 per hour depending on complexity. Charged at time of booking.
                </li>
                <li>
                  <span className="text-white font-medium">Monthly Retainer — Starter</span> — $149 per
                  month, billed on a recurring basis from the date of your first payment.
                </li>
                <li>
                  <span className="text-white font-medium">Monthly Retainer — Pro</span> — $299 per
                  month, billed on a recurring basis from the date of your first payment.
                </li>
                <li>
                  <span className="text-white font-medium">AI-Guided Build</span> — priced on a
                  per-project basis, confirmed in writing before work begins.
                </li>
              </ul>
              <p className="mt-4">
                You are responsible for any taxes applicable in your jurisdiction. Prices may change
                with 30 days&apos; written notice to active subscribers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Cancellations and Refunds</h2>
              <ul className="list-disc list-inside space-y-3 pl-2">
                <li>
                  <span className="text-white font-medium">Live Pair Programming sessions</span> —
                  cancellations made more than 24 hours before the scheduled start time are eligible for
                  a full refund or free reschedule. Cancellations within 24 hours of the session are
                  non-refundable.
                </li>
                <li>
                  <span className="text-white font-medium">Async Bug Fix</span> — if work has not yet
                  started, you may request a full refund. Once a developer has begun reviewing your
                  submission, refunds are issued at our discretion based on work completed.
                </li>
                <li>
                  <span className="text-white font-medium">Monthly Retainers (Starter & Pro)</span> —
                  you may cancel at any time before the next billing date. We do not issue pro-rated
                  refunds for the current billing period. Unused async hours and unused live sessions
                  expire at the end of each billing cycle and do not roll over.
                </li>
                <li>
                  <span className="text-white font-medium">AI-Guided Build</span> — cancellation and
                  refund terms will be set out in the written agreement signed before work begins.
                </li>
                <li>
                  <span className="text-white font-medium">Free introductory session</span> — no charge
                  applies to your first session; no refund is applicable.
                </li>
              </ul>
              <p className="mt-4">
                To request a cancellation or refund, contact{" "}
                <a
                  href="mailto:hello@vibepartner.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  hello@vibepartner.com
                </a>{" "}
                with your booking details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Your Responsibilities</h2>
              <p className="mb-4">When using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  Provide accurate and complete information about your project, error, or goals when
                  booking and during sessions.
                </li>
                <li>
                  Own or have the legal right to share any code, repository, credentials, or project
                  materials you provide to us.
                </li>
                <li>
                  Revoke any repository access or credentials granted to us promptly after your session
                  is complete.
                </li>
                <li>Attend or be available for scheduled live sessions at the agreed time.</li>
                <li>Not use our services for any unlawful purpose.</li>
                <li>
                  Not attempt to resell, sublicense, or redistribute fixes or deliverables we provide
                  as a standalone product or service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Deliverables and Intellectual Property</h2>
              <p>
                Code fixes, written explanations, build guidance, and other deliverables we produce
                specifically for your session become your property upon receipt of full payment. We
                retain no ongoing rights to those deliverables. General knowledge, techniques, and
                approaches we use in our work remain ours.
              </p>
              <p className="mt-4">
                VibePartner&apos;s website content, brand, name, and marketing materials are our exclusive
                property and may not be reproduced without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Confidentiality</h2>
              <p>
                We treat all code, error logs, repository access, credentials, business context, and
                project details you share with us as strictly confidential. We will not disclose your
                proprietary information to any third party without your explicit consent, except as
                required by law. This obligation survives the termination of these Terms.
              </p>
              <p className="mt-4">
                We access your repository only to the extent necessary to diagnose and fix the issue you
                have reported. We do not retain copies of your code after your session is delivered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. No Guarantee of Outcome</h2>
              <p>
                While we bring genuine expertise to every session, software problems are complex and
                outcomes can vary. We do not guarantee that every bug will be fully resolved within a
                single session or that our fix will not require iteration. We always aim to leave you
                better off than when we started, and if we cannot resolve your issue, we will tell you
                clearly rather than bill you for time without progress.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Disclaimer of Warranties</h2>
              <p>
                Our services are provided &quot;as is&quot; without warranties of any kind, express or implied.
                We do not warrant that any fix, code, or guidance will be error-free or suitable for
                your specific production environment. You are responsible for testing any changes in a
                safe environment before deploying them to production.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, VibePartner shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising out of or
                related to your use of our services, including but not limited to loss of data, loss of
                revenue, application downtime, or deployment failures. Our total liability to you for any
                claim shall not exceed the total amount you paid for the specific service giving rise to
                the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                jurisdiction in which VibePartner is registered, without regard to conflict of law
                principles. Any disputes shall first be attempted to be resolved by good-faith
                negotiation. If unresolved within 30 days, disputes shall be submitted to binding
                arbitration or the courts of competent jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">13. Changes to These Terms</h2>
              <p>
                We may update these Terms of Service at any time. We will notify active subscribers of
                material changes via email with at least 14 days&apos; notice. For all other users, the
                updated terms take effect when posted. Continued use of our services after changes are
                posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">14. Contact</h2>
              <p>
                If you have questions about these Terms, please contact us at{" "}
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
