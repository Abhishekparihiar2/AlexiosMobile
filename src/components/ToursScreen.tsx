import { useState } from "react"

interface Props {
  onBack: () => void
}

interface Checkpoint {
  id: string;
  name: string;
  type: "NFC" | "Barcode";
  status: "completed" | "pending" | "overdue";
  time?: string;
}

export default function ToursScreen({ onBack }: Props) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
    { id: "CP-001", name: "Main Entrance Gate", type: "NFC", status: "completed", time: "10:02 AM" },
    { id: "CP-002", name: "North Perimeter Fence", type: "NFC", status: "completed", time: "10:15 AM" },
    { id: "CP-003", name: "Loading Dock Door", type: "Barcode", status: "pending" },
    { id: "CP-004", name: "Server Room B", type: "Barcode", status: "pending" },
    { id: "CP-005", name: "Roof Access Stairwell", type: "NFC", status: "pending" },
  ])

  const [scanModalOpen, setScanModalOpen] = useState(false)
  const nextPending = checkpoints.find(c => c.status === "pending")
  
  const totalCheckpoints = checkpoints.length;
  const completedCheckpoints = checkpoints.filter(c => c.status === "completed").length;
  const progressPercent = Math.round((completedCheckpoints / totalCheckpoints) * 100) || 0;

  const handleScan = () => {
    if (!nextPending) return
    setCheckpoints(prev => prev.map(c => 
      c.id === nextPending.id ? { ...c, status: "completed", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : c
    ))
    setScanModalOpen(false)
  }

  return (
    <>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px 4px",
        }}
      >
          <button
            onClick={onBack}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              flexShrink: 0,
              border: "1px solid var(--muted-border)",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path
                d="M8.5 15.5L1.5 8.5L8.5 1.5"
                stroke="var(--text-white)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "var(--text-white)",
                letterSpacing: "0.15em",
                lineHeight: 1.2,
                textTransform: "uppercase"
              }}
            >
              ACTIVE TOUR: TOWER B
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                color: "var(--text-50)",
                letterSpacing: "0.2em",
                marginTop: "3px",
                textTransform: "uppercase"
              }}
            >
              SECURE SITE MANAGEMENT
            </div>
          </div>

          {/* Spacer */}
          <div style={{ width: "38px", flexShrink: 0 }} />
        </div>

        {/* ── Progress Card ── */}
        <div style={{
          margin: "8px 16px",
          padding: "20px",
          borderRadius: "20px",
          background: "var(--glass-surface)",
          border: "1px solid rgba(14,165,233,0.28)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px" }}>
            <div>
              <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Inter', sans-serif", marginBottom: "4px" }}>Est. Completion</div>
              <div style={{ color: "var(--text-white)", fontSize: "20px", fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>11:30 AM</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Inter', sans-serif", marginBottom: "4px" }}>Elapsed</div>
              <div style={{ color: "var(--text-white)", fontSize: "20px", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>24m</div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--blue-bright)", borderRadius: "3px", boxShadow: "0 0 10px var(--blue-bright)", transition: "width 0.3s ease" }} />
          </div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "12px",
            color: "var(--text-35)",
            letterSpacing: "0.15em",
            marginTop: "12px",
            textAlign: "center",
            fontWeight: 700
          }}>
            {completedCheckpoints} OF {totalCheckpoints} COMPLETED ({progressPercent}%)
          </div>
        </div>

        {/* ── Checkpoint Timeline ── */}
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px", paddingBottom: "120px" }}>
          {checkpoints.map((cp, idx) => (
            <div key={cp.id} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              {/* Timeline graphic */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "24px" }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: cp.status === "completed" ? "rgba(14,165,233,0.2)" : (cp.status === "pending" && cp.id === nextPending?.id ? "rgba(255,165,0,0.2)" : "rgba(255,255,255,0.05)"),
                  border: cp.status === "completed" ? "2px solid var(--blue-bright)" : (cp.status === "pending" && cp.id === nextPending?.id ? "2px solid #FFA500" : "2px solid var(--muted-border)"),
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {cp.status === "completed" && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--blue-bright)", boxShadow: "0 0 8px var(--blue-bright)" }} />}
                  {cp.status === "pending" && cp.id === nextPending?.id && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFA500", boxShadow: "0 0 8px #FFA500" }} />}
                </div>
                {idx < checkpoints.length - 1 && (
                  <div style={{ width: "2px", height: "40px", background: cp.status === "completed" ? "var(--blue-bright)" : "var(--muted-border)", margin: "4px 0" }} />
                )}
              </div>
              {/* Card */}
              <div style={{
                flex: 1, padding: "14px 16px", borderRadius: "16px",
                background: cp.status === "completed" ? "rgba(14,165,233,0.05)" : (cp.status === "pending" && cp.id === nextPending?.id ? "rgba(255,165,0,0.05)" : "var(--glass-surface)"),
                border: cp.status === "completed" ? "1px solid rgba(14,165,233,0.2)" : (cp.status === "pending" && cp.id === nextPending?.id ? "1px solid rgba(255,165,0,0.3)" : "1px solid var(--muted-border)"),
                backdropFilter: cp.status === "pending" ? "blur(12px)" : "none",
                opacity: cp.status === "completed" ? 0.7 : 1
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ color: "var(--text-white)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px" }}>{cp.name}</div>
                  <div style={{ color: "var(--text-50)", fontSize: "11px", fontFamily: "'Inter', sans-serif", border: "1px solid var(--muted-border)", padding: "2px 6px", borderRadius: "8px" }}>{cp.type}</div>
                </div>
                {cp.status === "completed" && (
                  <div style={{ color: "var(--blue-bright)", fontSize: "12px", fontFamily: "'Inter', sans-serif", marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    Scanned at {cp.time}
                  </div>
                )}
                {cp.status === "pending" && cp.id === nextPending?.id && (
                  <div style={{ color: "#FFA500", fontSize: "12px", fontFamily: "'Inter', sans-serif", marginTop: "6px", fontWeight: 600 }}>Next Location</div>
                )}
              </div>
            </div>
          ))}
        </div>

      {/* ── Floating Scan Action ── */}
      {nextPending && (
        <div style={{
          position: "absolute",
          bottom: "100px",
          left: "16px",
          right: "16px",
          zIndex: 50,
          background: "var(--glass-surface)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(14,165,233,0.3)",
          borderRadius: "24px",
          padding: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ color: "var(--text-50)", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "4px" }}>READY TO SCAN</div>
            <div style={{ color: "var(--text-white)", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "16px" }}>{nextPending.name}</div>
          </div>
          <button
            onClick={() => setScanModalOpen(true)}
            style={{
              background: "var(--blue-primary)",
              color: "var(--text-white)",
              border: "none",
              borderRadius: "14px",
              padding: "14px 24px",
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(14,165,233,0.3)"
            }}
          >
            Scan {nextPending.type}
          </button>
        </div>
      )}

      {/* ── Scan Modal Simulation ── */}
      {scanModalOpen && nextPending && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
          background: "var(--navy-700)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
        }}>
          {/* ── Layered Background ── */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 60% at 50% 15%, #0D1E3A 0%, #07101E 45%, #020408 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.8, zIndex: 0 }} />
          
          <div style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "4px solid var(--blue-bright)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse-dot 1s infinite", marginBottom: "24px" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--blue-bright)" strokeWidth="2" strokeLinecap="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/></svg>
            </div>
            <div style={{ color: "var(--text-white)", fontSize: "20px", fontFamily: "'Inter', sans-serif", fontWeight: 700, marginBottom: "8px" }}>Scanning {nextPending.type}...</div>
            <div style={{ color: "var(--text-50)", fontFamily: "'Inter', sans-serif", marginBottom: "32px" }}>Hold device near checkpoint</div>
            <div style={{ display: "flex", gap: "16px" }}>
              <button onClick={() => setScanModalOpen(false)} style={{ padding: "14px 24px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", color: "var(--text-white)", border: "1px solid var(--muted-border)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Cancel</button>
              <button onClick={handleScan} style={{ padding: "14px 24px", borderRadius: "14px", background: "var(--blue-primary)", color: "var(--text-white)", border: "none", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>Simulate Success</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
