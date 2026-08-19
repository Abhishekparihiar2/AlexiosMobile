import { useState } from "react"

interface Props {
    onBack: () => void
}

const SKILLS_DATA = [
    {
        id: "s1",
        name: "First Aid / CPR / AED",
        category: "Health & Safety",
        scope: "Global",
        employees: 156,
        positions: 45,
        statusInfo: "Active Priority",
    },
    {
        id: "s2",
        name: "Conflict Resolution & De-escalation",
        category: "Communication",
        scope: "Global",
        employees: 210,
        positions: 60,
        statusInfo: "Standard Requirement",
    },
    {
        id: "s3",
        name: "Advanced Surveillance Tactics",
        category: "Observation",
        scope: "Region-Specific",
        employees: 84,
        positions: 12,
        statusInfo: "Specialized Skill",
    }
]

export default function SkillsScreen({ onBack }: Props) {
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
                        SKILLS DIRECTORY
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
                        EMPLOYEE COMPETENCIES
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            {/* KPI Stats */}
            <div style={{ padding: "8px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* Total Skills */}
                <div style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px"
                }}>
                    <div style={{
                        width: "42px", height: "42px", borderRadius: "10px", background: "rgba(59,130,246,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </div>
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>TOTAL SKILLS</div>
                        <div style={{ color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginTop: "2px" }}>5</div>
                    </div>
                </div>

                {/* Assigned Employees */}
                <div style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px"
                }}>
                    <div style={{
                        width: "42px", height: "42px", borderRadius: "10px", background: "rgba(168,85,247,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>ASSIGNED EMPS</div>
                        <div style={{ color: "white", fontSize: "20px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginTop: "2px" }}>312</div>
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
                        placeholder="Search skills..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            background: "transparent", border: "none", color: "white", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", width: "100%", marginLeft: "8px"
                        }}
                    />
                </div>
                <button style={{
                    width: "44px", height: "44px", borderRadius: "12px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                </button>
            </div>

            {/* List */}
            <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {SKILLS_DATA.map((skill) => (
                    <div key={skill.id} style={{
                        background: "rgba(30,35,50,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px",
                        display: "flex", flexDirection: "column", gap: "12px"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <div style={{ color: "white", fontSize: "16px", fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "-0.2px" }}>
                                    {skill.name}
                                </div>
                                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                                    {skill.category} • {skill.scope}
                                </div>
                            </div>
                            <div style={{
                                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", color: "#60A5FA",
                                padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, fontFamily: "Inter, sans-serif"
                            }}>
                                {skill.statusInfo}
                            </div>
                        </div>

                        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(100,150,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                                </svg>
                                <span style={{ color: "rgba(100,150,255,0.9)", fontSize: "14px", fontWeight: 700, fontFamily: "DM Mono, monospace", marginLeft: "4px" }}>
                                    {skill.employees}
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
                                    {skill.positions}
                                </span>
                                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginLeft: "4px" }}>
                                    POSITIONS
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                <button style={{
                    marginTop: "12px", background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)",
                    border: "1px solid rgba(59,130,246,0.3)", borderRadius: "16px", padding: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    color: "#60A5FA", fontSize: "14px", fontWeight: 600, fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.2s"
                }}>
                    + ADD NEW SKILL
                </button>
            </div>

        </div>
    )
}
