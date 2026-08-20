import { useState } from "react"
import TimeOffFormScreen from "./TimeOffFormScreen"

interface Props {
    onBack: () => void
}

const PROFILE_USER = {
    initials: "MJ",
    name: "Marcus Johnson",
    role: "Armed Security Guard",
    department: "Patrol Route Alpha",
    location: "Perimeter Sector 4"
}

const LEAVE_REQUESTS = [
    {
        id: "mj_1",
        date: "Aug 15, 2026",
        timeBlock: "06:00 AM - 02:00 PM",
        duration: "8h scheduled",
        totalDuration: "8h 0m",
        type: "SICK",
        statusBadge: "PENDING",
        statusColor: "rgba(245,158,11,1)" // Amber for Pending
    },
    {
        id: "mj_2",
        date: "Aug 20, 2026",
        timeBlock: "09:00 AM - 05:00 PM",
        duration: "8h scheduled",
        totalDuration: "8h 0m",
        type: "PTO",
        statusBadge: "APPROVED",
        statusColor: "rgba(168,85,247,1)" // Purple for PTO
    },
    {
        id: "mj_3",
        date: "Oct 12, 2026",
        timeBlock: "12:00 PM - 08:00 PM",
        duration: "8h scheduled",
        totalDuration: "8h 0m",
        type: "PERSONAL",
        statusBadge: "APPROVED",
        statusColor: "rgba(16,185,129,1)" // Green for Approved
    }
]

export default function TimeOffScreen({ onBack }: Props) {
    const [activeFilter, setActiveFilter] = useState("All Requests")
    const [showForm, setShowForm] = useState(false)

    if (showForm) {
        return <TimeOffFormScreen onBack={() => setShowForm(false)} />
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingTop: "4px",
                paddingBottom: "104px",
                height: "100%",
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
                        TIME OFF
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
                        LEAVE MANAGEMENT
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            {/* Filter Tabs */}
            <div style={{ padding: "8px 16px" }}>
                <div style={{
                    display: "flex",
                    background: "rgba(0,0,0,0.4)",
                    borderRadius: "12px",
                    padding: "4px",
                    border: "1px solid rgba(255,255,255,0.05)"
                }}>
                    {["All Requests", "Approved", "Pending", "History"].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                flex: 1,
                                padding: "8px 0",
                                background: activeFilter === filter ? "rgba(255,255,255,0.1)" : "transparent",
                                borderRadius: "8px",
                                border: "none",
                                color: activeFilter === filter ? "#FFF" : "rgba(255,255,255,0.4)",
                                fontSize: "11px",
                                fontWeight: 600,
                                fontFamily: "Inter, sans-serif",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Data View - Mobile Cards translating the requested tabular row */}
            <div style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Profile User Info Card */}
                <div style={{
                    background: "rgba(30,35,50,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px"
                }}>
                    <div style={{
                        width: "50px", height: "50px", borderRadius: "12px", background: "rgba(255,255,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontSize: "18px", fontWeight: 800, fontFamily: "Inter, sans-serif"
                    }}>
                        {PROFILE_USER.initials}
                    </div>
                    <div>
                        <div style={{ color: "white", fontSize: "16px", fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "-0.2px" }}>
                            {PROFILE_USER.name}
                        </div>
                        <div style={{ color: "rgba(100,150,255,0.9)", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                            {PROFILE_USER.role}
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                            {PROFILE_USER.department} • {PROFILE_USER.location}
                        </div>
                    </div>
                </div>

                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, fontFamily: "Inter, sans-serif", marginTop: "4px" }}>
                    LEAVE REQUESTS
                </div>

                {LEAVE_REQUESTS.map((row) => (
                    <div key={row.id} style={{
                        background: "rgba(30,35,50,0.4)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "16px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    }}>
                        {/* Top Row: Date & Primary Status */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.05)",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <div style={{ color: "white", fontSize: "15px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
                                    {row.date}
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: "6px",
                                background: row.statusColor.replace("1)", "0.15)"), border: `1px solid ${row.statusColor.replace("1)", "0.3)")}`,
                                padding: "6px 10px", borderRadius: "20px"
                            }}>
                                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: row.statusColor, boxShadow: `0 0 8px ${row.statusColor}` }} />
                                <span style={{ color: row.statusColor, fontSize: "10px", fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "0.5px" }}>
                                    {row.statusBadge}
                                </span>
                            </div>
                        </div>

                        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

                        {/* Content Details */}
                        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px" }}>
                                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <div>
                                <div style={{ color: "white", fontSize: "13px", fontWeight: 600, fontFamily: "DM Mono, monospace" }}>
                                    {row.timeBlock}
                                </div>
                                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                                    {row.duration}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Footer / Totals block */}
                        <div style={{
                            background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "10px 12px",
                            display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.02)"
                        }}>
                            <div>
                                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", fontFamily: "Inter, sans-serif", marginRight: "8px" }}>TOTAL DURATION:</span>
                                <span style={{ color: "white", fontSize: "14px", fontWeight: 700, fontFamily: "DM Mono, monospace" }}>{row.totalDuration}</span>
                            </div>
                            <div style={{
                                background: row.statusColor.replace("1)", "0.2)"), color: row.statusColor,
                                padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, fontFamily: "Inter, sans-serif"
                            }}>
                                {row.type}
                            </div>
                        </div>

                    </div>
                ))}

                {/* Floating Add Request Button */}
                <button
                    onClick={() => setShowForm(true)}
                    style={{
                        marginTop: "12px",
                        background: "linear-gradient(135deg, rgba(77,217,232,0.15) 0%, rgba(77,217,232,0.05) 100%)",
                        border: "1px solid rgba(77,217,232,0.3)",
                        borderRadius: "16px", padding: "16px",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                        color: "#4DD9E8", fontSize: "14px", fontWeight: 600, fontFamily: "Inter, sans-serif",
                        cursor: "pointer", transition: "all 0.2s"
                    }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    SUBMIT NEW REQUEST
                </button>

            </div >
        </div >
    )
}
