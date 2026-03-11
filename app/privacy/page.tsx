import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | FinalBoss IDV",
  description: "How FinalBoss IDV collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen grid-bg">
      <nav className="fixed top-0 w-full z-50 glass" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white btn-blue">FB</div>
            <span className="text-lg font-bold text-white tracking-tight">IDV</span>
          </Link>
          <Link href="/" className="text-sm hover:text-white transition-colors" style={{ color: "var(--text-light)" }}>Back to Home</Link>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black mb-2 text-white">Privacy Policy</h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-light)" }}>
            Effective January 1, 2026 &bull; Last updated March 11, 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>
            <section>
              <h2 className="text-lg font-bold text-white mb-2">Who We Are</h2>
              <p>
                FinalBoss IDV is operated by <strong className="text-white">FinalBoss Technology Inc.</strong>, a Delaware corporation.
                Contact: <a href="mailto:abraham@finalbosstech.com" style={{ color: "var(--accent-blue)" }}>abraham@finalbosstech.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Information We Collect</h2>
              <p className="mb-2"><strong className="text-white">This site does not collect personal information in normal use.</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The demo dashboard uses simulated data only — no real identity documents are processed.</li>
                <li>No cookies are set by this site. No Google Analytics, Meta Pixel, or third-party tracking scripts.</li>
                <li>The API login page accepts credentials but does not store them client-side beyond the session.</li>
                <li>Vercel, our hosting provider, may collect standard web server logs (IP address, user agent, timestamps) as part of normal platform operation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Third-Party Services</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-white">Vercel</strong> — hosting and serverless functions</li>
                <li><strong className="text-white">Google Fonts</strong> — font delivery (Inter, JetBrains Mono)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Your California Privacy Rights (CCPA)</h2>
              <p className="mb-2">If you are a California resident, the CCPA (Cal. Civ. Code §§ 1798.100–1798.199) gives you the following rights:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-white">Right to Know</strong> — request what personal information we have collected</li>
                <li><strong className="text-white">Right to Delete</strong> — request deletion of your personal information</li>
                <li><strong className="text-white">Right to Correct</strong> — request correction of inaccurate information</li>
                <li><strong className="text-white">Right to Opt Out</strong> — we do not sell or share your personal information</li>
                <li><strong className="text-white">Right to Non-Discrimination</strong> — we will not discriminate against you for exercising your rights</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, email{" "}
                <a href="mailto:abraham@finalbosstech.com" style={{ color: "var(--accent-blue)" }}>abraham@finalbosstech.com</a>{" "}
                with the subject line &ldquo;CCPA Request.&rdquo; We will acknowledge within 10 business days and respond within 45 calendar days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Do Not Sell or Share</h2>
              <p>
                FinalBoss Technology does not sell or share your personal information as defined under the CCPA.
                See our <Link href="/do-not-sell" style={{ color: "var(--accent-blue)" }}>Do Not Sell</Link> page for details.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Security</h2>
              <p>All data is transmitted over HTTPS with TLS encryption. We enforce strict transport security, content security policies, and frame protection headers.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Contact</h2>
              <p>FinalBoss Technology Inc.<br />Email: <a href="mailto:abraham@finalbosstech.com" style={{ color: "var(--accent-blue)" }}>abraham@finalbosstech.com</a></p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
