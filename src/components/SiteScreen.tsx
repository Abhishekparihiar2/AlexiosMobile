import { useState } from "react"

interface Props {
  onBack: () => void
}

const emergencyContacts = [
  { role: "Property Manager", name: "Sandra Kim", phone: "+1 (555) 202-0002" },
  { role: "Site Supervisor", name: "James Morrison", phone: "+1 (555) 999-1111" },
  { role: "Local Police Dispatch", name: "LAPD Non-Emergency", phone: "+1 (877) 275-5273" },
]

const postOrders = [
  { id: "PO-1", title: "General Post Orders - Tower B", updated: "Aug 01, 2026", author: "Larry Freeman Jr." },
  { id: "PO-2", title: "After-Hours Access Protocol", updated: "Jul 15, 2026", author: "Sarah Chen" },
  { id: "PO-3", title: "Emergency Evacuation Routes", updated: "Jun 10, 2026", author: "James Morrison" },
]

export default function SiteScreen({ onBack }: Props) {
  const [selectedPostOrder, setSelectedPostOrder] = useState<any>(null)

  return (
    <>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px 16px" }}>
        <button
          onClick={onBack}
          style={{ width: "38px", height: "38px", borderRadius: "12px", border: "1px solid var(--muted-border)", background: "rgba(255,255,255,0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="var(--text-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--text-white)", letterSpacing: "0.2em", textTransform: "uppercase" }}>SITE DETAILS</div>
        </div>
        <div style={{ width: "38px" }} />
      </div>

      {/* ── Scrollable Content ── */}
      <div style={{ paddingBottom: "104px" }}>
        
        {/* Basic Site Details Card */}
        <div style={{ margin: "0 16px 24px", padding: "20px", background: "var(--glass-surface)", backdropFilter: "blur(16px)", borderRadius: "24px", border: "1px solid var(--muted-border)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <div style={{ color: "var(--text-white)", fontSize: "22px", fontFamily: "'Inter', sans-serif", fontWeight: 700, lineHeight: 1.2 }}>Tower B</div>
              <div style={{ color: "var(--text-50)", fontSize: "14px", fontFamily: "'Inter', sans-serif", marginTop: "4px" }}>Westfield Mall Group</div>
            </div>
            <div style={{ padding: "4px 10px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "8px", color: "var(--green-active)", fontSize: "11px", fontWeight: 700, fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              ACTIVE
            </div>
          </div>
          
          <div style={{ height: "1px", background: "var(--muted-border)", margin: "16px 0" }} />
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-50)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--text-35)", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", marginBottom: "2px", fontWeight: 600, textTransform: "uppercase" }}>PRIMARY CONTACT</div>
              <div style={{ color: "var(--text-white)", fontSize: "15px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Sandra Kim</div>
              <div style={{ color: "var(--text-75)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>s.kim@westfield.com</div>
            </div>
            <button style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--blue-primary)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(14,165,233,0.3)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div style={{ margin: "0 16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", padding: "0 4px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red-danger)" strokeWidth="2.5"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            <h2 style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Emergency Contacts</h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {emergencyContacts.map((contact, i) => (
              <div key={i} style={{ background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "var(--red-danger)", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "4px" }}>{contact.role.toUpperCase()}</div>
                  <div style={{ color: "var(--text-white)", fontSize: "15px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{contact.name}</div>
                </div>
                <button style={{ padding: "8px 16px", borderRadius: "12px", background: "rgba(244,63,94,0.15)", color: "var(--red-danger)", border: "1px solid rgba(244,63,94,0.3)", fontWeight: 700, fontFamily: "'Inter', sans-serif", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Post Orders */}
        <div style={{ margin: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", padding: "0 4px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-bright)" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            <h2 style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Post Orders</h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {postOrders.map((po) => (
              <div key={po.id} onClick={() => setSelectedPostOrder(po)} style={{ background: "var(--glass-surface)", backdropFilter: "blur(12px)", border: "1px solid var(--muted-border)", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", transition: "all 0.2s ease" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(14,165,233,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-bright)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--text-white)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: "4px" }}>{po.title}</div>
                  <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>Updated: {po.updated}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-50)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Post Order Viewer Modal */}
      {selectedPostOrder && (
        <div style={{ position: "absolute", inset: 0, zIndex: 100, background: "var(--navy-700)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column" }}>
          {/* ── Layered Background ── */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 60% at 50% 15%, #0D1E3A 0%, #07101E 45%, #020408 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.8, zIndex: 0 }} />
          
          {/* Top Bar */}
          <div style={{ height: "64px", display: "flex", alignItems: "flex-end", padding: "0 16px 12px", background: "var(--glass-surface)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--muted-border)", zIndex: 1 }}>
             <button onClick={() => setSelectedPostOrder(null)} style={{ color: "var(--blue-bright)", background: "none", border: "none", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer" }}>Close</button>
             <div style={{ flex: 1, textAlign: "center", color: "var(--text-white)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "0 16px" }}>{selectedPostOrder.title}</div>
             <div style={{ width: "42px" }} />
          </div>
          
          {/* Document Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", background: "rgba(255,255,255,0.95)", zIndex: 1 }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", minHeight: "100%" }}>
              <h1 style={{ fontSize: "24px", fontFamily: "'Inter', sans-serif", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>{selectedPostOrder.title}</h1>
              <p style={{ color: "#64748b", fontFamily: "'Inter', sans-serif", fontSize: "14px", marginBottom: "32px", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>Author: {selectedPostOrder.author} • Last Updated: {selectedPostOrder.updated}</p>
              
              <div style={{ color: "#334155", fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.6 }}>
                <p style={{ marginBottom: "16px" }}><strong>1. Scope & Purpose</strong><br/>These post orders govern the standard operating procedures for all security personnel assigned to this site. Guard must read and acknowledge before assuming post.</p>
                <p style={{ marginBottom: "16px" }}><strong>2. Access Control</strong><br/>All visitors must present valid government-issued ID. Badges must be visibly worn at all times. Deliveries are restricted to the loading dock between 0800 and 1600 hours.</p>
                <p style={{ marginBottom: "16px" }}><strong>3. Patrol Requirements</strong><br/>A complete perimeter check is required every 2 hours. Guard must scan all NFC tags located at designated checkpoints. Any damaged property must be reported immediately via an Incident Report.</p>
                <p><strong>4. Emergency Procedures</strong><br/>In case of fire, evacuate via the nearest stairwell and assemble at the North Parking Lot. Do not use elevators. Contact the Property Manager immediately after calling 911.</p>
              </div>
            </div>
          </div>
          
          {/* Acknowledge Bar */}
          <div style={{ padding: "16px 24px 32px", background: "var(--glass-surface)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--muted-border)", zIndex: 1 }}>
            <button onClick={() => { setSelectedPostOrder(null); alert("Post Order Acknowledged!") }} style={{ width: "100%", padding: "16px", borderRadius: "14px", background: "var(--blue-primary)", color: "var(--text-white)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>
              Acknowledge & Sign
            </button>
          </div>
        </div>
      )}
    </>
  )
}
