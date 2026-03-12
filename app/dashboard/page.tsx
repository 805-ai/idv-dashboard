"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface DashboardData {
  active_permits: number;
  total_receipts: number;
  total_destructions: number;
  total_verifications: number;
  avg_destruction_latency_ms: number;
  sla_compliance_pct: number;
  current_epoch: number;
  chain_integrity: boolean;
  uptime_seconds: number;
}

interface Receipt {
  id: string;
  timestamp: string;
  operation: string;
  type: string;
  hash: string;
  entity?: string;
  permit_id?: string;
  latency_ms?: number;
}

const DEMO_DASHBOARD: DashboardData = {
  active_permits: 4,
  total_receipts: 18,
  total_destructions: 6,
  total_verifications: 12,
  avg_destruction_latency_ms: 41,
  sla_compliance_pct: 100,
  current_epoch: 3,
  chain_integrity: true,
  uptime_seconds: 86400,
};

const DEMO_RECEIPTS: Receipt[] = [
  { id: "r-001", timestamp: new Date(Date.now() - 120000).toISOString(), operation: "permit_created", type: "authorization", hash: "a3f8c2e1d4b5a6f7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3", entity: "ACME-CORP-0042", permit_id: "p-0018" },
  { id: "r-002", timestamp: new Date(Date.now() - 300000).toISOString(), operation: "permit_destroyed", type: "revocation", hash: "b4e9d3f2c5a6b7e8d9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4", entity: "GLOBEX-IND-0119", permit_id: "p-0017", latency_ms: 38 },
  { id: "r-003", timestamp: new Date(Date.now() - 600000).toISOString(), operation: "permit_verified", type: "verification", hash: "c5f0e4a3d6b7c8f9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5", entity: "INITECH-0331" },
  { id: "r-004", timestamp: new Date(Date.now() - 900000).toISOString(), operation: "permit_created", type: "authorization", hash: "d6a1f5b4e7c8d9a0f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6", entity: "STARK-ENT-0087", permit_id: "p-0016" },
  { id: "r-005", timestamp: new Date(Date.now() - 1500000).toISOString(), operation: "permit_destroyed", type: "revocation", hash: "e7b2a6c5f8d9e0b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7", entity: "WAYNE-IND-0205", permit_id: "p-0015", latency_ms: 52 },
  { id: "r-006", timestamp: new Date(Date.now() - 2400000).toISOString(), operation: "permit_verified", type: "verification", hash: "f8c3b7d6a9e0f1c2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8", entity: "ACME-CORP-0042" },
];

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-sm" style={{ color: "var(--text-light)" }}>Loading dashboard...</div></div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";

  const [token, setToken] = useState("");
  const [apiBase, setApiBase] = useState("");
  const [dashboard, setDashboard] = useState<DashboardData | null>(isDemo ? DEMO_DASHBOARD : null);
  const [receipts, setReceipts] = useState<Receipt[]>(isDemo ? DEMO_RECEIPTS : []);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(false);

  // Permit creation
  const [customerId, setCustomerId] = useState("CUST-DEMO-001");
  const [scope, setScope] = useState("account_opening");
  const [ttl, setTtl] = useState("3600");
  const [createResult, setCreateResult] = useState<Record<string, unknown> | null>(null);
  const [creating, setCreating] = useState(false);

  // Permit destruction
  const [destroyId, setDestroyId] = useState("");
  const [destroyReason, setDestroyReason] = useState("customer_request");
  const [destroyResult, setDestroyResult] = useState<Record<string, unknown> | null>(null);
  const [destroying, setDestroying] = useState(false);

  // Demo permit counter
  const [demoPermitCount, setDemoPermitCount] = useState(848);

  useEffect(() => {
    if (isDemo) return; // skip auth check in demo mode
    const t = sessionStorage.getItem("idv_token");
    const a = sessionStorage.getItem("idv_api");
    if (!t || !a) {
      router.push("/login");
      return;
    }
    setToken(t);
    setApiBase(a);
  }, [router, isDemo]);

  const apiFetch = useCallback(async (path: string, options?: RequestInit) => {
    const res = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options?.headers || {}),
      },
    });
    if (res.status === 401) {
      sessionStorage.clear();
      router.push("/");
      throw new Error("Session expired");
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || `Request failed (${res.status})`);
    }
    return res.json();
  }, [apiBase, token, router]);

  const loadDashboard = useCallback(async () => {
    if (isDemo) return; // demo data is static
    if (!token || !apiBase) return;
    try {
      const [dash, rec] = await Promise.all([
        apiFetch("/v1/dashboard"),
        apiFetch("/v1/receipts?limit=10"),
      ]);
      setDashboard(dash);
      setReceipts(rec.receipts || []);
      setApiError(false);
      setError("");
    } catch (err) {
      if (err instanceof Error && err.message !== "Session expired") {
        setApiError(true);
        setError(err.message);
      }
    }
  }, [token, apiBase, apiFetch, isDemo]);

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 15000);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateResult(null);

    if (isDemo) {
      await new Promise((r) => setTimeout(r, 600));
      const permitId = `p-${String(demoPermitCount).padStart(4, "0")}`;
      const hash = Array.from({ length: 48 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
      const newReceipt: Receipt = {
        id: `r-demo-${demoPermitCount}`,
        timestamp: new Date().toISOString(),
        operation: "permit_created",
        type: "authorization",
        hash,
        entity: customerId,
        permit_id: permitId,
      };
      setCreateResult({ permit_id: permitId, status: "active", customer_id: customerId, scope, ttl_seconds: parseInt(ttl), receipt_hash: hash });
      setDestroyId(permitId);
      setDemoPermitCount((c) => c + 1);
      setReceipts((prev) => [newReceipt, ...prev].slice(0, 10));
      setDashboard((prev) => prev ? { ...prev, active_permits: prev.active_permits + 1, total_receipts: prev.total_receipts + 1 } : prev);
      setCreating(false);
      return;
    }

    try {
      const data = await apiFetch("/v1/permits", {
        method: "POST",
        body: JSON.stringify({
          customer_id: customerId,
          scope,
          ttl_seconds: parseInt(ttl),
        }),
      });
      setCreateResult(data);
      setDestroyId(data.permit_id || "");
      loadDashboard();
    } catch (err) {
      setCreateResult({ error: err instanceof Error ? err.message : "Failed" });
    } finally {
      setCreating(false);
    }
  }

  async function handleDestroy(e: React.FormEvent) {
    e.preventDefault();
    setDestroying(true);
    setDestroyResult(null);

    if (isDemo) {
      await new Promise((r) => setTimeout(r, 800));
      const hash = Array.from({ length: 48 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
      const newReceipt: Receipt = {
        id: `r-demo-d-${Date.now()}`,
        timestamp: new Date().toISOString(),
        operation: "permit_destroyed",
        type: "revocation",
        hash,
        entity: customerId,
        permit_id: destroyId,
        latency_ms: Math.floor(Math.random() * 40) + 30,
      };
      setDestroyResult({ permit_id: destroyId, status: "destroyed", reason: destroyReason, destruction_receipt: hash, latency_ms: newReceipt.latency_ms });
      setReceipts((prev) => [newReceipt, ...prev].slice(0, 10));
      setDashboard((prev) => prev ? { ...prev, active_permits: Math.max(0, prev.active_permits - 1), total_destructions: prev.total_destructions + 1, total_receipts: prev.total_receipts + 1 } : prev);
      setDestroying(false);
      return;
    }

    try {
      const data = await apiFetch(`/v1/permits/${destroyId}/destroy`, {
        method: "POST",
        body: JSON.stringify({ reason: destroyReason }),
      });
      setDestroyResult(data);
      loadDashboard();
    } catch (err) {
      setDestroyResult({ error: err instanceof Error ? err.message : "Failed" });
    } finally {
      setDestroying(false);
    }
  }

  function handleLogout() {
    sessionStorage.clear();
    router.push("/");
  }

  if (!isDemo && !token) return null;

  return (
    <div className="min-h-screen grid-bg">
      {/* Demo Banner */}
      {isDemo && (
        <div className="px-4 py-2.5 text-center text-sm font-semibold"
             style={{ background: "linear-gradient(90deg, #1a5cb5, #2b7de9)", color: "#fff" }}>
          INTERACTIVE WALKTHROUGH &middot; Sample data &middot;{" "}
          <Link href="/login" className="underline font-bold">Connect API</Link>{" "}
          &middot;{" "}
          <Link href="/" className="underline font-bold">Home</Link>
        </div>
      )}

      {/* API Failure Overlay */}
      {apiError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
             style={{ background: "rgba(6,14,26,0.92)", backdropFilter: "blur(8px)" }}>
          <div className="glass rounded-2xl p-8 text-center max-w-md glow-red" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
            <div className="text-4xl mb-4">&#9888;</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--danger)" }}>
              API Unavailable
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-light)" }}>
              {error || "The IDV backend is not responding. All operations are disabled."}
            </p>
            <p className="text-xs mb-4 font-semibold" style={{ color: "var(--text-light)" }}>
              Fail-closed by design. No fallback mode.
            </p>
            <button onClick={loadDashboard}
                    className="btn-primary px-6 py-2.5 rounded-lg text-sm">
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm text-white btn-blue">FB</div>
          <div>
            <h1 className="font-bold text-white text-sm">FinalBoss IDV</h1>
            <p className="text-xs" style={{ color: "var(--text-light)" }}>
              Enterprise Identity Verification
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge ${apiError ? "badge-red" : "badge-green"}`}>
            <span className="w-1.5 h-1.5 rounded-full pulse-live"
                  style={{ background: apiError ? "var(--danger)" : "var(--success)", color: apiError ? "var(--danger)" : "var(--success)" }} />
            {apiError ? "DISCONNECTED" : "LIVE"}
          </span>
          <span className={`badge ${isDemo ? "badge-red" : "badge-blue"}`}>
            {isDemo ? "DEMO" : "PRODUCTION"}
          </span>
          {isDemo ? (
            <Link href="/login" className="btn-outline text-xs px-3 py-1.5 rounded-lg">
              API Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="btn-outline text-xs px-3 py-1.5 rounded-lg">
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active Permits" value={dashboard?.active_permits ?? "--"} />
          <StatCard label="Audit Receipts" value={dashboard?.total_receipts ?? "--"} />
          <StatCard label="Avg Destruction" value={dashboard ? `${dashboard.avg_destruction_latency_ms}ms` : "--"} />
          <StatCard label="SLA Compliance"
                    value={dashboard ? `${dashboard.sla_compliance_pct}%` : "--"}
                    accent={dashboard?.sla_compliance_pct === 100} />
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Chain Integrity"
                    value={dashboard?.chain_integrity ? "VERIFIED" : "--"}
                    accent={dashboard?.chain_integrity === true} />
          <StatCard label="Signature Mode" value="ML-DSA-65 + ECDSA" small />
          <StatCard label="Verifications" value={dashboard?.total_verifications ?? "--"} />
          <StatCard label="Destructions" value={dashboard?.total_destructions ?? "--"} />
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Create Permit */}
          <div className="glass rounded-2xl">
            <div className="px-5 py-3.5 font-semibold text-sm text-white flex items-center gap-2"
                 style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-blue)" }} />
              Create Authorization
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-3">
              <Field label="Customer ID" value={customerId} onChange={setCustomerId} />
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-light)" }}>Scope</label>
                <select value={scope} onChange={(e) => setScope(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <option value="account_opening">Account Opening KYC</option>
                  <option value="wire_transfer">Wire Transfer Authorization</option>
                  <option value="loan_application">Loan Application</option>
                  <option value="data_access">Customer Data Access</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-light)" }}>TTL</label>
                <select value={ttl} onChange={(e) => setTtl(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <option value="3600">1 Hour</option>
                  <option value="86400">24 Hours</option>
                  <option value="604800">7 Days</option>
                </select>
              </div>
              <button type="submit" disabled={creating || apiError}
                      className="btn-blue w-full py-2.5 rounded-lg text-sm"
                      style={{ opacity: creating || apiError ? 0.5 : 1 }}>
                {creating ? "Creating..." : "Issue Authorization"}
              </button>
              {createResult && <ResultBox data={createResult} />}
            </form>
          </div>

          {/* Destroy Permit */}
          <div className="glass rounded-2xl">
            <div className="px-5 py-3.5 font-semibold text-sm flex items-center gap-2"
                 style={{ borderBottom: "1px solid var(--border)", color: "var(--danger)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--danger)" }} />
              Instant Revocation
            </div>
            <form onSubmit={handleDestroy} className="p-5 space-y-3">
              <Field label="Permit ID" value={destroyId} onChange={setDestroyId}
                     placeholder="Paste permit ID" mono />
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-light)" }}>Reason</label>
                <select value={destroyReason} onChange={(e) => setDestroyReason(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <option value="customer_request">Customer Request (CCPA/GDPR)</option>
                  <option value="fraud_detected">Fraud Detected</option>
                  <option value="account_closed">Account Closed</option>
                  <option value="compliance_action">Compliance Action</option>
                </select>
              </div>
              <button type="submit" disabled={destroying || apiError || !destroyId}
                      className="btn-primary w-full py-2.5 rounded-lg text-sm"
                      style={{ opacity: destroying || apiError || !destroyId ? 0.5 : 1 }}>
                {destroying ? "Destroying..." : "Execute Revocation"}
              </button>
              {destroyResult && <ResultBox data={destroyResult} />}
            </form>
          </div>
        </div>

        {/* Receipt Activity */}
        <div className="glass rounded-2xl">
          <div className="px-5 py-3.5 flex items-center justify-between"
               style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="font-semibold text-sm text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
              Audit Receipt Chain
            </span>
            <button onClick={loadDashboard}
                    className="btn-outline text-xs px-3 py-1.5 rounded-lg">
              Refresh
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {receipts.length === 0 ? (
              <div className="p-4 text-sm text-center" style={{ color: "var(--text-light)" }}>
                {apiError ? "API unavailable — no data" : "No receipts yet"}
              </div>
            ) : (
              receipts.map((r) => (
                <div key={r.id} className="px-4 py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                       style={{
                         background: r.operation.includes("destroy") ? "#1a0000" : "rgba(26,92,181,0.15)",
                         color: r.operation.includes("destroy") ? "var(--danger)" : "var(--accent-blue)",
                       }}>
                    {r.operation.includes("destroy") ? "D" : r.operation.includes("created") ? "C" : "R"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{r.operation.replace(/_/g, " ").toUpperCase()}</div>
                    <div className="text-xs mono truncate" style={{ color: "var(--text-light)" }}>
                      {r.hash.substring(0, 24)}...
                    </div>
                    {r.entity && (
                      <div className="text-xs" style={{ color: "var(--text-light)" }}>
                        Entity: {r.entity}
                      </div>
                    )}
                  </div>
                  <div className="text-xs shrink-0" style={{ color: "var(--text-light)" }}>
                    {new Date(r.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="section-divider mt-4" />
        <p className="text-center text-xs py-6" style={{ color: "var(--text-light)" }}>
          &copy; {new Date().getFullYear()} FinalBoss Technology, Inc. &middot; Cryptographic Identity Verification
        </p>
      </main>
    </div>
  );
}

function StatCard({ label, value, accent, small }: {
  label: string; value: string | number; accent?: boolean; small?: boolean;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-light)" }}>
        {label}
      </div>
      <div className={`font-black stat-value ${small ? "text-sm" : "text-2xl"}`}
           style={{ color: accent ? "var(--success)" : "#fff" }}>
        {value}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, mono }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-light)" }}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
             placeholder={placeholder}
             className={`w-full px-3 py-2 rounded-lg border text-sm ${mono ? "mono" : ""}`}
             style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
    </div>
  );
}

function ResultBox({ data }: { data: Record<string, unknown> }) {
  const isError = "error" in data;
  return (
    <div className="rounded-lg p-3 mt-2 text-xs mono overflow-auto max-h-48"
         style={{
           background: "var(--bg)",
           borderLeft: `3px solid ${isError ? "var(--danger)" : "var(--accent-blue)"}`,
         }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
