import { useState } from "react"

interface Props {
    onBack: () => void
}

const CERTS_DATA = [
    {
        id: "c1",
        name: "GA 24-Hour Guard Certification",
        category: "Licenses & Permits",
        scope: "Global",
        employees: 42,
        positions: 12,
        expiringMsg: "3 Expiring Soon",
        expiringColor: "rgba(245,158,11,1)", // Amber
    },
    {
        id: "c2",
        name: "Armed Security License (Class G)",
        category: "Licenses & Permits",
        scope: "Region-Specific",
        employees: 24,
        positions: 8,
        expiringMsg: "1 Expiring Soon",
        expiringColor: "rgba(245,158,11,1)", // Amber
    },
    {
        id: "c3",
        name: "X-Ray Scanner Operation Cert",
        category: "Equipment",
        scope: "Site-Specific",
        employees: 14,
        positions: 4,
        expiringMsg: "Up to date",
        expiringColor: "rgba(16,185,129,1)", // Green
    }
]

export default function CertificationsScreen({ onBack }: Props) {
    const [search, setSearch] = useState("")

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingTop: "4px",
                paddingBottom: "104px",
                height: "100%",
                overflowY: "auto",
                msOverflowStyle: "none",
                scrollbarWidth: "none"
            }}
        >
            {/* Header */}
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
                        border: "1px solid rgba(180,200,255,0.14)",
                        background: "rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
                        <path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontWeight: 800,
                            fontSize: "15px",
                            color: "#FFFFFF",
                            letterSpacing: "0.3px",
                            lineHeight: 1.2,
                        }}
                    >
                        CERTIFICATIONS
                    </div>
                    <div
                        style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: "9px",
                            color: "rgba(130,155,200,0.5)",
                            letterSpacing: "2px",
                            marginTop: "3px",
                        }}
                    >
                        LICENSES & PERMITS
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            {/* KPI Stats */}
            <div style={{ padding: "8px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* Active Certs */}
                <div style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px"
                }}>
                    <div style={{
                        width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16,185,129,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>ACTIVE CERTS</div>
                        <div style={{ color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginTop: "2px" }}>4</div>
                    </div>
                </div>

                {/* Expiring Soon */}
                <div style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px"
                }}>
                    <div style={{
                        width: "42px", height: "42px", borderRadius: "10px", background: "rgba(245,158,11,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>EXPIRING SOON</div>
                        <div style={{ color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginTop: "2px" }}>22</div>
                    </div>
                </div>
            </div>

            {/* Control Bar */}
            <div style={{ padding: "0 16px", display: "flex", gap: "10px" }}>
                <div style={{
                    flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px", display: "flex", alignItems: "center", padding: "0 12px", height: "44px"
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        placeholder="Search certifications..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            background: "transparent", border: "none", color: "white", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", width: "100%", marginLeft: "8px"
                        }}
                    />
                </div>
                <button style={{
                    width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                </button>
            </div>

            {/* List */}
            <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {CERTS_DATA.map((cert) => (
                    <div key={cert.id} style={{
                        background: "rgba(30,35,50,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px",
                        display: "flex", flexDirection: "column", gap: "12px"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <div style={{ color: "white", fontSize: "15px", fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "-0.2px" }}>
                                    {cert.name}
                                </div>
                                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                                    {cert.category} • {cert.scope}
                                </div>
                            </div>
                            <div style={{
                                background: cert.expiringColor.replace("1)", "0.1)"), border: `1px solid ${cert.expiringColor.replace("1)", "0.3)")}`, color: cert.expiringColor,
                                padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "4px"
                            }}>
                                {cert.expiringMsg !== "Up to date" && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                )}
                                {cert.expiringMsg}
                            </div>
                        </div>

                        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(100,150,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                                </svg>
                                <span style={{ color: "rgba(100,150,255,0.9)", fontSize: "14px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginLeft: "4px" }}>
                                    {cert.employees}
                                </span>
                                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginLeft: "4px" }}>
                                    EMPLOYEES
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(100,150,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span style={{ color: "rgba(100,150,255,0.9)", fontSize: "14px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginLeft: "4px" }}>
                                    {cert.positions}
                                </span>
                                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginLeft: "4px" }}>
                                    POSITIONS
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                <button style={{
                    marginTop: "12px", background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)",
                    border: "1px solid rgba(16,185,129,0.3)", borderRadius: "16px", padding: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    color: "#10B981", fontSize: "14px", fontWeight: 600, fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.2s"
                }}>
                    + ADD NEW CERTIFICATION
                </button>
            </div>

        </div>
    )
}
