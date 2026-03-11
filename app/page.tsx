"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass"
           style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white btn-blue">FB</div>
              <span className="text-lg font-bold text-white tracking-tight">IDV</span>
            </div>
            <span className="text-xs hidden sm:inline" style={{ color: "var(--text-light)" }}>
              by <a href="https://finalbosstech.com" target="_blank" rel="noopener noreferrer"
                    className="hover:text-white transition-colors" style={{ color: "var(--text-light)" }}>FinalBoss Technology</a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hidden md:inline text-sm hover:text-white transition-colors" style={{ color: "var(--text-light)" }}>How It Works</a>
            <a href="#features" className="hidden md:inline text-sm hover:text-white transition-colors" style={{ color: "var(--text-light)" }}>Features</a>
            <a href="#architecture" className="hidden md:inline text-sm hover:text-white transition-colors" style={{ color: "var(--text-light)" }}>Architecture</a>
            <Link href="/login" className="btn-outline text-sm px-4 py-2 rounded-lg">
              API Login
            </Link>
            <Link href="/dashboard?demo=true"
                  className="btn-primary text-sm px-5 py-2 rounded-lg">
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 md:pt-48 md:pb-36 px-6 text-center relative">
        {/* Subtle radial glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30 pointer-events-none"
             style={{ background: "radial-gradient(ellipse, rgba(43,125,233,0.08) 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto relative">
          <div className="badge badge-blue mb-8 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full pulse-live" style={{ color: "var(--accent-blue)", background: "var(--accent-blue)" }} />
            Enterprise Identity Verification
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 text-white tracking-tight">
            No Receipt,
            <br />
            <span className="gradient-text-red">No Access</span>
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-light)" }}>
            Cryptographic identity verification for banking and regulated industries.
            Every authorization recorded. Every revocation proven. Every chain verified.
          </p>

          <p className="text-xl md:text-2xl font-bold mb-12">
            <span className="gradient-text-red">$10,000+</span>
            <span style={{ color: "var(--text-light)" }}> per KYC violation. Zero tolerance.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard?demo=true"
                  className="btn-primary px-8 py-3.5 rounded-xl text-base">
              Try Live Demo
            </Link>
            <a href="#how-it-works"
               className="btn-outline px-8 py-3.5 rounded-xl text-base">
              How It Works
            </a>
          </div>

          <p className="mt-8 text-xs tracking-wide" style={{ color: "var(--text-light)" }}>
            No login required &middot; Full dashboard in 10 seconds &middot; Zero data collection
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="section-divider" />
      <section className="px-6 py-16 glass-solid">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "<50ms", label: "Permit Issuance" },
            { value: "100%", label: "Chain Integrity" },
            { value: "ML-DSA-65", label: "Post-Quantum Sigs" },
            { value: "Fail-Closed", label: "Zero Fallback" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-black text-white stat-value">{stat.value}</div>
              <div className="text-xs mt-2 uppercase tracking-widest font-medium" style={{ color: "var(--text-light)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-divider" />

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-blue mb-4 mx-auto">Process</div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              How It <span className="gradient-text-red">Works</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Issue Authorization", desc: "Create a cryptographically signed KYC permit with customer ID, scope, and TTL. Every issuance generates an immutable receipt." },
              { step: "02", title: "Chain-Linked Receipts", desc: "Every action — create, verify, revoke — produces a receipt chained to the previous one. Tamper-proof by design." },
              { step: "03", title: "Instant Revocation", desc: "Destroy any permit instantly with a recorded reason. CCPA request, fraud detection, account closure — cryptographic proof." },
              { step: "04", title: "Audit Trail", desc: "Full receipt chain with hash verification. Prove to regulators exactly what happened, when, and why. No gaps." },
            ].map((item) => (
              <div key={item.step} className="glass rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300 group">
                <div className="badge badge-blue mb-5">{item.step}</div>
                <h3 className="font-bold text-lg mb-3 text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 md:py-32 glass-solid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4 mx-auto">Capabilities</div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Built for <span className="gradient-text-red">Regulated Industries</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Banking KYC", desc: "Account opening, wire transfers, loan applications. Every identity check produces a cryptographic receipt that satisfies examiner audits.", badge: "Live", badgeClass: "badge-green" },
              { title: "CCPA / GDPR", desc: "When a customer says delete my data, prove you did. Instant revocation with destruction receipts. No ambiguity.", badge: "Live", badgeClass: "badge-green" },
              { title: "Fraud Response", desc: "Detect fraud? Revoke all active permits in milliseconds. Every revocation recorded with reason codes and timestamps.", badge: "Live", badgeClass: "badge-green" },
              { title: "Post-Quantum Ready", desc: "ML-DSA-65 + ECDSA dual signatures. Your receipts stay tamper-proof even after quantum computers arrive.", badge: "FIPS-Aligned", badgeClass: "badge-blue" },
              { title: "Zero Trust", desc: "No receipt, no access. Fail-closed by design. If the verification system is down, nothing runs. No fallback mode.", badge: "Patent Pending", badgeClass: "badge-red" },
              { title: "Real-Time Dashboard", desc: "Active permits, destruction latency, SLA compliance, chain integrity — all live. Your compliance team sees everything.", badge: "Try Demo", badgeClass: "badge-blue" },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-blue mb-4 mx-auto">Comparison</div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Why <span className="gradient-text-red">FinalBoss</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-7" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
              <h3 className="font-bold text-lg mb-5" style={{ color: "var(--danger)" }}>Everyone Else</h3>
              <ul className="space-y-3.5 text-sm" style={{ color: "var(--text-light)" }}>
                {[
                  "Logs stored in mutable databases",
                  "Deletion claims without proof",
                  "Audit trails with gaps",
                  "Fail-open when service is down",
                  "Third-party identity processors",
                  "No cryptographic chain",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-xs mt-0.5" style={{ color: "var(--danger)" }}>&#10007;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-7 glow-blue" style={{ borderColor: "rgba(43,125,233,0.2)" }}>
              <h3 className="font-bold text-lg mb-5 gradient-text-blue">FinalBoss IDV</h3>
              <ul className="space-y-3.5 text-sm" style={{ color: "var(--text-light)" }}>
                {[
                  "Chain-linked immutable receipts",
                  "Cryptographic proof of destruction",
                  "Zero gaps — every action recorded",
                  "Fail-closed — no fallback mode",
                  "Zero third-party data sharing",
                  "ML-DSA-65 + ECDSA dual signatures",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-xs mt-0.5" style={{ color: "var(--success)" }}>&#10003;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 md:py-32 text-center relative glass-solid">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none"
             style={{ background: "radial-gradient(ellipse, rgba(215,25,32,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-3xl md:text-5xl font-black mb-5 text-white tracking-tight">
            See It <span className="gradient-text-red">Running</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-light)" }}>
            Full operational dashboard. Create permits, revoke access, verify chain integrity.
            No signup, no credit card, no sales call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard?demo=true"
                  className="btn-primary px-8 py-3.5 rounded-xl text-base">
              Try Live Demo
            </Link>
            <a href="mailto:abraham@finalbosstech.com"
               className="btn-outline px-8 py-3.5 rounded-xl text-base">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16">
        <div className="section-divider mb-12" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-black text-white btn-blue">FB</div>
              <span className="font-bold text-white">FinalBoss IDV</span>
            </div>
            <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-light)" }}>
              Cryptographic identity verification for regulated industries.
            </p>
            <a href="mailto:abraham@finalbosstech.com" className="text-sm font-medium" style={{ color: "var(--accent-blue)" }}>
              abraham@finalbosstech.com
            </a>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-widest mb-4 text-white">Product</div>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-light)" }}>
              <li><Link href="/dashboard?demo=true" className="hover:text-white transition-colors">Live Demo</Link></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Architecture</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-widest mb-4 text-white">Portfolio</div>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-light)" }}>
              <li><a href="https://finalbosstech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FinalBoss Technology</a></li>
              <li><a href="https://ccpa.finalbosstech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">CCPA Shield</a></li>
              <li><a href="https://arch.finalbosstech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Archangel</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-widest mb-4 text-white">Legal</div>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-light)" }}>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/do-not-sell" className="hover:text-white transition-colors">Do Not Sell My Info</Link></li>
              <li><span style={{ color: "var(--text-light)" }}>Patent Pending</span></li>
              <li><Link href="/login" className="hover:text-white transition-colors">API Access</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 text-center text-xs" style={{ color: "var(--text-light)" }}>
          <div className="section-divider mb-6" />
          &copy; {new Date().getFullYear()} FinalBoss Technology, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
