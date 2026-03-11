"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE = "https://api.idv.finalbosstech.com";

export default function LoginPage() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Authentication failed (${res.status})`);
      }

      const data = await res.json();
      sessionStorage.setItem("idv_token", data.access_token);
      sessionStorage.setItem("idv_api", API_BASE);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 relative">
      {/* Subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full opacity-30 pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(43,125,233,0.08) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 btn-blue font-black text-lg text-white">
            FB
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">FinalBoss IDV</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-light)" }}>
            API Authentication
          </p>
        </div>

        <div className="text-center mb-6">
          <span className="badge badge-blue">Production API</span>
        </div>

        <form onSubmit={handleLogin} className="glass rounded-2xl p-6">
          <h2 className="text-base font-bold mb-5 text-white">API Credentials</h2>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-light)" }}>
              Client ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg text-sm mono"
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "var(--text)" }}
              placeholder="Enter client ID"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-light)" }}>
              Client Secret
            </label>
            <input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg text-sm mono"
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "var(--text)" }}
              placeholder="Enter client secret"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "var(--danger)", border: "1px solid rgba(239,68,68,0.2)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-blue w-full py-2.5 rounded-lg text-sm"
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>

          <p className="mt-4 text-xs text-center" style={{ color: "var(--text-light)" }}>
            Secured by JWT + HMAC authentication
          </p>
        </form>

        <div className="text-center mt-6 space-y-2">
          <Link href="/dashboard?demo=true" className="block text-sm font-medium" style={{ color: "var(--accent-blue)" }}>
            Try the demo instead
          </Link>
          <Link href="/" className="block text-xs hover:text-white transition-colors" style={{ color: "var(--text-light)" }}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
