import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information | FinalBoss IDV",
  description: "CCPA opt-out notice for FinalBoss IDV.",
};

export default function DoNotSellPage() {
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
          <h1 className="text-3xl font-black mb-2 text-white">Do Not Sell or Share My Personal Information</h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-light)" }}>CCPA §1798.120 &amp; §1798.135 Disclosure</p>

          <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>
            <section>
              <p>
                FinalBoss Technology Inc. does <strong className="text-white">not sell</strong> and does <strong className="text-white">not share</strong> your
                personal information as those terms are defined under the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">What This Means</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>We do not sell your personal information to third parties for monetary or other valuable consideration.</li>
                <li>We do not share your personal information with third parties for cross-context behavioral advertising.</li>
                <li>This site does not use third-party tracking scripts (no Google Analytics, no Meta Pixel, no ad networks).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-white">Right to Know</strong> what personal information we collect and how we use it</li>
                <li><strong className="text-white">Right to Delete</strong> your personal information</li>
                <li><strong className="text-white">Right to Correct</strong> inaccurate personal information</li>
                <li><strong className="text-white">Right to Non-Discrimination</strong> for exercising your privacy rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">How to Submit a Request</h2>
              <p>
                Email <a href="mailto:abraham@finalbosstech.com" style={{ color: "var(--accent-blue)" }}>abraham@finalbosstech.com</a> with
                the subject line <strong className="text-white">&ldquo;CCPA Request&rdquo;</strong>. We will acknowledge within 10 business days
                and respond within 45 calendar days per §1798.130.
              </p>
            </section>

            <section>
              <p>For full privacy practices, see our <Link href="/privacy" style={{ color: "var(--accent-blue)" }}>Privacy Policy</Link>.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
