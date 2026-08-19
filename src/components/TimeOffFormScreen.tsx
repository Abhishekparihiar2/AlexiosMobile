import { useState } from "react"

interface Props {
    onBack: () => void
}

export default function TimeOffFormScreen({ onBack }: Props) {
    const [leaveType, setLeaveType] = useState("PTO")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [hours, setHours] = useState("")
    const [notes, setNotes] = useState("")

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
                        NEW REQUEST
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
                        LEAVE APPLICATION
                    </div>
                </div>
                <div style={{ width: "38px", flexShrink: 0 }} />
            </div>

            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "24px" }}>

                {/* Leave Type Selector */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>
                        TYPE OF LEAVE
                    </label>
                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px"
                    }}>
                        {["PTO", "SICK", "UNPAID", "OTHER"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setLeaveType(type)}
                                style={{
                                    background: leaveType === type ? "rgba(77,217,232,0.15)" : "rgba(255,255,255,0.03)",
                                    border: leaveType === type ? "1px solid rgba(77,217,232,0.5)" : "1px solid rgba(255,255,255,0.1)",
                                    color: leaveType === type ? "#4DD9E8" : "rgba(255,255,255,0.6)",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    fontFamily: "Inter, sans-serif",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Inputs */}
                <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>START DATE</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white",
                                padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontFamily: "DM Mono, monospace", outline: "none"
                            }}
                        />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>END DATE</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white",
                                padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontFamily: "DM Mono, monospace", outline: "none"
                            }}
                        />
                    </div>
                </div>

                {/* Hours Requested */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>TOTAL HOURS REQUESTED</label>
                    <input
                        type="number"
                        placeholder="e.g. 8"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        style={{
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white",
                            padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none"
                        }}
                    />
                </div>

                {/* Notes */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.5px" }}>ADDITIONAL NOTES</label>
                    <textarea
                        placeholder="Provide reasoning or coverage details..."
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white",
                            padding: "12px 14px", borderRadius: "10px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", resize: "none"
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                    <button
                        onClick={onBack}
                        style={{
                            background: "#4DD9E8", border: "none", color: "#000", padding: "16px", borderRadius: "12px",
                            fontSize: "15px", fontWeight: 700, fontFamily: "Inter, sans-serif", cursor: "pointer"
                        }}
                    >
                        SUBMIT LEAVE REQUEST
                    </button>
                    <button
                        onClick={onBack}
                        style={{
                            background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "16px", borderRadius: "12px",
                            fontSize: "14px", fontWeight: 600, fontFamily: "Inter, sans-serif", cursor: "pointer"
                        }}
                    >
                        CANCEL
                    </button>
                </div>

            </div>
        </div>
    )
}
