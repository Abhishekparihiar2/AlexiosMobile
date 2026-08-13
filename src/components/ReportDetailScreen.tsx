

export default function ReportDetailScreen({
    reportId,
    onBack,
}: {
    reportId: string
    onBack: () => void
}) {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                background: "rgba(10,14,26,0.95)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                zIndex: 250,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "58px 18px 14px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    flexShrink: 0,
                    background: "rgba(10,14,26,0.8)",
                }}
            >
                <button
                    onClick={onBack}
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18l-6-6 6-6"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontWeight: 700,
                            fontSize: "16px",
                            color: "#FFFFFF",
                            letterSpacing: "0.02em",
                        }}
                    >
                        {reportId}
                    </div>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em"
                        }}
                    >
                        SUBMISSION DETAIL
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px" }}>

                <div
                    style={{
                        borderRadius: "18px",
                        padding: "16px 18px",
                        marginBottom: "14px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                    }}
                >
                    {[
                        ["Report ID", reportId],
                        ["Type", "Incident Report"],
                        ["Status", "SUBMITTED"],
                        ["Submitted By", "Michael Reyes · Guard II"],
                        ["Time", "18:04"],
                        ["Date", "Oct 24, 2026"],
                        ["Location", "Gate C Maglock"],
                    ].map(([k, v], idx) => (
                        <div
                            key={k}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 0",
                                borderBottom:
                                    idx === 6 ? "none" : "1px solid rgba(255,255,255,0.05)",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "11px",
                                    color: "rgba(200,215,255,0.6)",
                                    fontFamily: "DM Mono, monospace",
                                    letterSpacing: "0.06em",
                                    flexShrink: 0,
                                }}
                            >
                                {k?.toUpperCase()}
                            </span>
                            <span
                                style={{
                                    fontSize: "13px",
                                    color:
                                        k === "Status"
                                            ? "#22C55E"
                                            : "rgba(220,235,255,0.8)",
                                    fontFamily:
                                        k === "Report ID"
                                            ? "DM Mono, monospace"
                                            : "Inter, sans-serif",
                                    textAlign: "right",
                                    fontWeight: k === "Status" ? 700 : 400,
                                }}
                            >
                                {v}
                            </span>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        borderRadius: "16px",
                        padding: "14px 16px",
                        marginBottom: "14px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                    }}
                >
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em",
                            marginBottom: "8px",
                        }}
                    >
                        DESCRIPTION
                    </div>
                    <div
                        style={{
                            fontSize: "13px",
                            color: "rgba(220,235,255,0.8)",
                            lineHeight: 1.6,
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        Noted damage on the main gate C magnetic lock mechanism.
                        There appears to be physical tampering on the outer casing and the door doesn't securely latch when closed.
                        Maintenance should be deployed immediately to inspect and repair the latch alignment. No individuals were seen in the direct area.
                    </div>
                </div>

                <div
                    style={{
                        borderRadius: "16px",
                        padding: "14px 16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                    }}
                >
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em",
                            marginBottom: "8px",
                        }}
                    >
                        ATTACHMENTS
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(200,215,255,0.4)", fontStyle: "italic" }}>
                        No attachments
                    </div>
                </div>
            </div>
        </div>
    )
}
