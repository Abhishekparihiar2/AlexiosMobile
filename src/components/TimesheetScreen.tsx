import { useState } from "react"

interface Props {
    onBack: () => void
}

const SHIFT_DATA = [
    {
        id: "mj",
        initials: "MJ",
        name: "Marcus Johnson",
        role: "Armed Security Guard",
        issue: true,
        total: "42.5h",
        ot: "2.5H OT",
        shifts: [
            { day: "Sun 02", val: "--", status: "empty" },
            { day: "Mon 03", val: "7.5h", status: "ok" },
            { day: "Tue 04", val: "7.75h", status: "warn", edited: true },
            { day: "Wed 05", val: "7.5h", status: "ok" },
            { day: "Thu 06", val: "8h", status: "danger" },
            { day: "Fri 07", val: "10h", status: "ok" },
            { day: "Sat 08", val: "--", status: "empty" },
        ]
    },
    {
        id: "sc",
        initials: "SC",
        name: "Sarah Chen",
        role: "Patrol Supervisor",
        issue: false,
        total: "40.0h",
        ot: null,
        shifts: [
            { day: "Sun 02", val: "--", status: "empty" },
            { day: "Mon 03", val: "7h", status: "ok" },
            { day: "Tue 04", val: "7h", status: "ok" },
            { day: "Wed 05", val: "7h", status: "ok" },
            { day: "Thu 06", val: "7h", status: "ok" },
            { day: "Fri 07", val: "7h", status: "ok" },
            { day: "Sat 08", val: "8h", status: "purple" },
        ]
    },
    {
        id: "dw",
        initials: "DW",
        name: "Derek Wilson",
        role: "Static Guard",
        issue: false,
        total: "40.0h",
        locked: true,
        shifts: [
            { day: "Sun 02", val: "7.5h", status: "ok" },
            { day: "Mon 03", val: "7.5h", status: "ok" },
            { day: "Tue 04", val: "7.5h", status: "ok" },
            { day: "Wed 05", val: "7.5h", status: "ok" },
            { day: "Thu 06", val: "7.5h", status: "ok" },
            { day: "Fri 07", val: "--", status: "empty" },
            { day: "Sat 08", val: "--", status: "empty" },
        ]
    },
    {
        id: "mt",
        initials: "MT",
        name: "Mike Torres",
        role: "Response Guard",
        issue: true,
        total: "16.0h",
        ot: null,
        shifts: [
            { day: "Sun 02", val: "--", status: "empty" },
            { day: "Mon 03", val: "0.0h", status: "orange" },
            { day: "Tue 04", val: "7.5h", status: "ok" },
            { day: "Wed 05", val: "--", status: "empty" },
            { day: "Thu 06", val: "7.5h", status: "ok" },
            { day: "Fri 07", val: "--", status: "empty" },
            { day: "Sat 08", val: "--", status: "empty" },
        ]
    },
    {
        id: "jd",
        initials: "JD",
        name: "John Davis",
        role: "Gate Controller",
        issue: false,
        total: "0.0h",
        ot: null,
        shifts: [],
        emptyMsg: "No shifts scheduled"
    }
]

export default function TimesheetScreen({ onBack }: Props) {
    const [search, setSearch] = useState("")

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingTop: "4px",
                paddingBottom: "104px",
                height: "100%", // ensuring scrolling can happen internally if wanted, or let it flow naturally
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
                        TIMESHEETS
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
                        STAFF HOUR LOGS
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            {/* Control Bar (Filters / Dates) */}
            <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* Search & Actions */}
                <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 12px",
                        height: "40px"
                    }}>
                        <input
                            placeholder="Search by name,"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "13px",
                                fontFamily: "Inter, sans-serif",
                                outline: "none",
                                width: "100%"
                            }}
                        />
                    </div>
                    <button style={{
                        width: "40px", height: "40px", borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                    </button>
                </div>

                {/* Date Navigator */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        padding: "4px 8px",
                        height: "40px"
                    }}>
                        <button style={{ background: "transparent", border: "none", color: "white", padding: "4px" }}>&lt;</button>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "white", fontSize: "12px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>08/02 - 08/08</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", fontFamily: "DM Mono", letterSpacing: "1px" }}>7 DAYS</div>
                        </div>
                        <button style={{ background: "transparent", border: "none", color: "white", padding: "4px" }}>&gt;</button>
                    </div>

                    <button style={{
                        background: "rgba(77,217,232,0.15)", border: "1px solid rgba(77,217,232,0.4)", borderRadius: "10px", height: "40px", padding: "0 12px",
                        display: "flex", alignItems: "center", gap: "6px", color: "#4DD9E8", fontSize: "12px", fontWeight: 600, fontFamily: "Inter, sans-serif"
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Requests <span style={{ background: "#F59E0B", color: "#000", padding: "2px 6px", borderRadius: "10px", fontSize: "10px" }}>3</span>
                    </button>
                </div>
            </div>

            {/* Main Data View - Mobile tailored card layout */}
            <div style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {SHIFT_DATA.map((row) => (
                    <div key={row.id} style={{
                        background: "rgba(30,35,50,0.4)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "16px",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        {/* User row info */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "white", fontSize: "13px", fontWeight: 700, fontFamily: "Inter, sans-serif"
                                }}>
                                    {row.initials}
                                </div>
                                <div>
                                    <div style={{ color: "white", fontSize: "14px", fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                                        {row.name}
                                    </div>
                                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "Inter, sans-serif", marginTop: "2px" }}>
                                        {row.role}
                                    </div>
                                </div>
                            </div>

                            {/* Status / Issue Icon */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {row.issue ? (
                                    <div style={{
                                        background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)",
                                        width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </div>
                                ) : (
                                    <div style={{
                                        width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Shifts Area */}
                        <div style={{
                            background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)",
                            padding: "12px", overflowX: "auto", display: "flex", gap: "8px", msOverflowStyle: "none", scrollbarWidth: "none"
                        }}>
                            {row.shifts.length > 0 ? row.shifts.map((shift, idx) => {
                                let borderColor = "rgba(255,255,255,0.05)"
                                if (shift.status === "ok") borderColor = "rgba(16, 185, 129, 0.4)"
                                if (shift.status === "warn") borderColor = "rgba(245, 158, 11, 0.4)"
                                if (shift.status === "danger") borderColor = "rgba(244, 63, 94, 0.4)"
                                if (shift.status === "orange") borderColor = "rgba(249, 115, 22, 0.4)"
                                if (shift.status === "purple") borderColor = "rgba(168, 85, 247, 0.4)"

                                return (
                                    <div key={idx} style={{
                                        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0, minWidth: "56px"
                                    }}>
                                        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>{shift.day.split(" ")[0]}</span>
                                        <div style={{
                                            height: "32px", width: "100%", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
                                            border: `1px solid ${borderColor}`, background: "rgba(255,255,255,0.02)", color: shift.val === "--" ? "rgba(255,255,255,0.2)" : (shift.status === "warn" ? "#FBBF24" : "rgba(255,255,255,0.8)"),
                                            fontSize: "12px", fontWeight: 600, fontFamily: "DM Mono, monospace", position: "relative"
                                        }}>
                                            {shift.val}
                                            {(shift as any).edited && (
                                                <svg style={{ position: "absolute", top: -6, right: -6 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div style={{ width: "100%", textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.4)", fontStyle: "italic", padding: "8px 0" }}>
                                    {row.emptyMsg}
                                </div>
                            )}
                        </div>

                        {/* Total Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "4px" }}>
                            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "DM Mono, monospace" }}>TOTAL HOURS</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                {row.ot && (
                                    <span style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)", color: "#FBBF24", fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "10px" }}>
                                        {row.ot}
                                    </span>
                                )}
                                {row.locked && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                )}
                                <span style={{ color: "white", fontSize: "16px", fontWeight: 700, fontFamily: "DM Mono, monospace" }}>
                                    {row.total}
                                </span>

                                {row.id === "sc" && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
