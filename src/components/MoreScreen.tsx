interface Props {
  onNavigateReports: () => void
  onNavigateProfile: () => void
}

export default function MoreScreen({
  onNavigateReports,
  onNavigateProfile,
}: Props) {
  return (
    <div style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ color: "white", fontSize: "24px", fontWeight: 800, marginBottom: "8px", fontFamily: "DM Mono, monospace" }}>SETTINGS</div>

      <button 
        onClick={onNavigateProfile}
        style={{
          width: "100%", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", 
          borderRadius: "16px", color: "white", cursor: "pointer", backdropFilter: "blur(20px)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(77,217,232,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4DD9E8" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px" }}>OFFICER PROFILE</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  )
}
