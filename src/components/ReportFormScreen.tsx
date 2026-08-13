import { useState } from "react"

export default function ReportFormScreen({
    type,
    onBack,
}: {
    type: string
    onBack: () => void
}) {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("Main Lobby — Ground Floor")
    const [desc, setDesc] = useState("")

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
                            textTransform: "uppercase"
                        }}
                    >
                        {type}
                    </div>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em"
                        }}
                    >
                        NEW REPORT
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px" }}>
                {/* Auto-filled meta */}
                <div
                    style={{
                        borderRadius: "16px",
                        padding: "14px 16px",
                        marginBottom: "14px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                    }}
                >
                    {[
                        ["Guard", "Michael Reyes · Guard II"],
                        ["Site", "Grand Meridian Hotel"],
                        ["Date", "Oct 24, 2026"],
                        ["Time", "08:00 PM"],
                    ].map(([k, v], idx) => (
                        <div
                            key={k}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "8px 0",
                                borderBottom:
                                    idx === 3 ? "none" : "1px solid rgba(255,255,255,0.05)",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "11px",
                                    color: "rgba(200,215,255,0.6)",
                                    fontFamily: "DM Mono, monospace",
                                    letterSpacing: "0.06em",
                                }}
                            >
                                {k?.toUpperCase()}
                            </span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    color: "#60A5FA",
                                    fontFamily: "DM Mono, monospace",
                                }}
                            >
                                {v}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Fields */}
                <div style={{ marginBottom: "16px" }}>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em",
                            marginBottom: "6px",
                        }}
                    >
                        REPORT TITLE
                    </div>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Brief subject"
                        style={{
                            width: "100%",
                            height: "46px",
                            borderRadius: "12px",
                            padding: "0 14px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#F0F4FF",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            outline: "none",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em",
                            marginBottom: "6px",
                        }}
                    >
                        LOCATION
                    </div>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                            width: "100%",
                            height: "46px",
                            borderRadius: "12px",
                            padding: "0 14px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            color: "#60A5FA",
                            fontSize: "13px",
                            fontFamily: "DM Mono, monospace",
                            outline: "none",
                        }}
                    />
                    <div
                        style={{
                            fontSize: "10px",
                            color: "#3B82F6",
                            marginTop: "4px",
                            fontFamily: "DM Mono, monospace",
                        }}
                    >
                        📍 GPS autofilled
                    </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.08em",
                            marginBottom: "6px",
                        }}
                    >
                        DESCRIPTION
                    </div>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Detailed description of events..."
                        rows={4}
                        style={{
                            width: "100%",
                            borderRadius: "12px",
                            padding: "12px 14px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#F0F4FF",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            outline: "none",
                            resize: "none",
                        }}
                    />
                </div>

                <button
                    onClick={onBack}
                    style={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "14px",
                        background: "#3B82F6",
                        border: "none",
                        color: "#FFFFFF",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        letterSpacing: "0.5px",
                        cursor: "pointer",
                        marginTop: "12px",
                    }}
                >
                    SUBMIT REPORT
                </button>
            </div>
        </div>
    )
}
