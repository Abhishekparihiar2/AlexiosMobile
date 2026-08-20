
interface Skill {
    id: string
    name: string
    category: string
    scope: string
    statusInfo: string
}

interface Props {
    skill: Skill
    onBack: () => void
}

export default function SkillDetailScreen({ skill, onBack }: Props) {
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
                        SKILL DETAILS
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
                        COMPETENCY INFO
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            {/* Info Card */}
            <div style={{ padding: "8px 16px" }}>
                <div style={{
                    background: "rgba(30,35,50,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px"
                }}>
                    <div style={{ color: "white", fontSize: "20px", fontWeight: 800, fontFamily: "Inter, sans-serif", letterSpacing: "-0.3px" }}>
                        {skill.name}
                    </div>
                    <div style={{ color: "rgba(100,150,255,0.9)", fontSize: "14px", fontFamily: "Inter, sans-serif" }}>
                        {skill.category}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                        <div style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#60A5FA", padding: "4px 10px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                            {skill.statusInfo}
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "4px 10px", borderRadius: "8px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
                            {skill.scope} Focus
                        </div>
                    </div>

                    <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px 0" }} />

                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
                        This skill ensures employees are certified and capable of executing responsibilities related to {skill.name}. Maintaining this competency is required for relevant positions.
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                <button style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)",
                    border: "1px solid rgba(59,130,246,0.4)", borderRadius: "16px", padding: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                    color: "#60A5FA", fontSize: "15px", fontWeight: 700, fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.2s"
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload Skills
                </button>
                <button style={{
                    background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 100%)",
                    border: "1px solid rgba(168,85,247,0.4)", borderRadius: "16px", padding: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                    color: "#A855F7", fontSize: "15px", fontWeight: 700, fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.2s"
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Attempt Skills
                </button>
            </div>

        </div>
    )
}
