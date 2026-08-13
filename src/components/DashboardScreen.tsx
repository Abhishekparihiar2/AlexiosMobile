import { useState, useEffect } from "react"

interface Props {
  onSOS: () => void
  onNavigateSite: () => void
  onNavigateTour: () => void
  onNavigateComms: () => void
  onNavigateKB: () => void
  onNavigateRadio: () => void
  onNavigateSiteStatus: () => void
  onNavigateTasks: () => void
  onNavigateMap: () => void
  onNavigateSchedule: () => void
  onNavigateReports?: () => void
}

export default function DashboardScreen({
  onSOS,
  onNavigateSite,
  onNavigateTour,
  onNavigateComms,
  onNavigateTasks,
  onNavigateSchedule,
  onNavigateReports,
}: Props) {
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [isOnBreak, setIsOnBreak] = useState(false)
  const [showClockOutConfirm, setShowClockOutConfirm] = useState(false)
  const [tourState, setTourState] = useState<"pending" | "active">("pending")
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dayString = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "12px 16px" }}>

      {/* ── Modern Clock In / Status Banner ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "16px",
          borderRadius: "10px",
          background: "var(--glass-surface)",
          backdropFilter: "blur(12px)",
          border: isClockedIn
            ? "1px solid rgba(16, 185, 129, 0.3)"
            : "1px solid var(--muted-border)",
          boxShadow: isClockedIn
            ? "0 10px 40px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflow: "hidden",
        }}
      >
        {/* Glow effect behind */}
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: isClockedIn
            ? "radial-gradient(circle at 50% 0%, rgba(70,220,140,0.1) 0%, transparent 50%)"
            : "radial-gradient(circle at 50% 0%, rgba(77,217,232,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: isClockedIn ? "var(--green-active)" : "var(--red-danger)",
                boxShadow: isClockedIn ? "0 0 16px var(--green-active)" : "0 0 16px var(--red-danger)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{
                color: isClockedIn ? "var(--green-active)" : "var(--red-danger)",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase"
              }}>
                {isClockedIn ? (isOnBreak ? "ON BREAK" : "ACTIVE SHIFT") : "OFF DUTY"}
              </span>
              <span style={{ color: "var(--text-white)", fontSize: "16px", fontWeight: 600, marginTop: "2px", fontFamily: "'Inter', sans-serif" }}>
                {isClockedIn ? (isOnBreak ? "Enjoy your break" : "Officer Michael") : "Start your shift"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ color: "var(--text-75)", fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600 }}>
              {timeString}
            </span>
            <span style={{ color: "var(--text-50)", fontFamily: "'Inter', sans-serif", fontSize: "11px", marginTop: "2px" }}>
              {dayString}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {!isClockedIn ? (
          <button
            onClick={() => setIsClockedIn(true)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #4DD9E8 0%, #3A7BFF 100%)",
              color: "#040A14",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s ease",
              zIndex: 1,
              boxShadow: "0 8px 20px rgba(77,217,232,0.3)"
            }}
          >
            Clock In Now
          </button>
        ) : (
          <div style={{ display: "flex", gap: "12px", width: "100%", zIndex: 1 }}>
            <button
              onClick={() => setIsOnBreak(!isOnBreak)}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: isOnBreak ? "var(--blue-primary)" : "rgba(255, 255, 255, 0.05)",
                color: isOnBreak ? "var(--text-white)" : "var(--text-white)",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {isOnBreak ? "End Break" : "Take Break"}
            </button>
            <button
              onClick={() => setShowClockOutConfirm(true)}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "rgba(244,63,94,0.15)",
                color: "var(--red-danger)",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid rgba(244,63,94,0.3)"
              }}
            >
              Clock Out
            </button>
          </div>
        )}
      </div>

      {/* ── Main Module Grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px"
      }}>
        {/* Today's Tour */}
        <div
          onClick={() => {
            if (tourState === "active") {
              onNavigateTour()
            }
          }}
          style={{
            gridColumn: "span 3",
            padding: "16px",
            borderRadius: "18px",
            background: "var(--glass-surface)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(14,165,233,0.28)",
            boxShadow: "0 8px 32px rgba(14, 165, 233, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            cursor: tourState === "active" ? "pointer" : "default",
          }}
        >
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--text-35)", letterSpacing: "0.15em", marginBottom: "16px", textTransform: "uppercase" }}>
            {tourState === "active" ? "ACTIVE TOUR" : "SCHEDULED TOUR"}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* ── Donut Chart ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
                <svg viewBox="0 0 80 80" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  {/* Tick marks */}
                  <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" strokeDasharray="1 16" />
                  {/* Base Ring */}
                  <circle cx="40" cy="40" r="32" stroke="transparent" strokeWidth="8" fill="none" />
                  {/* Progress Ring */}
                  <circle
                    cx="40" cy="40" r="32"
                    stroke="#0088FF" strokeWidth="8" fill="none"
                    strokeDasharray={`${(tourState === "active" ? 0.5 : 0) * 201.06} 201.06`}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px rgba(0,136,255,0.5))", transition: "stroke-dasharray 0.5s ease" }}
                  />
                  {/* Glowing Dot */}
                  {tourState === "active" && (
                    <circle cx="40" cy="8" r="4" fill="#00E5FF" style={{ transformOrigin: "40px 40px", transform: `rotate(${360 * 0.5}deg)`, filter: "drop-shadow(0 0 6px #00E5FF)" }} />
                  )}
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ color: "var(--text-white)", fontSize: "22px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, lineHeight: 1 }}>{tourState === "active" ? "6" : "0"}</div>
                  <div style={{ color: "var(--text-50)", fontSize: "11px", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>of 12</div>
                </div>
              </div>
              <div style={{ color: "var(--text-35)", fontSize: "10px", letterSpacing: "0.15em", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>Completed</div>
            </div>

            {/* ── Info & Actions ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1.2 }}>Tower B<br />(Floor 4-22)</div>

              <div style={{ color: "var(--text-35)", fontSize: "10px", letterSpacing: "0.15em", marginTop: "8px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                {tourState === "active" ? "NEXT CHECKPOINT" : "FIRST CHECKPOINT"}
              </div>
              <div style={{ color: "var(--text-white)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, marginTop: "2px" }}>
                {tourState === "active" ? "Loading Dock Door" : "Main Entrance Gate"}
              </div>

              {tourState === "active" ? (
                <div style={{ width: "100%", marginTop: "12px" }}>
                  <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", position: "relative" }}>
                    <div style={{ width: "50%", height: "100%", background: "#00E5FF", borderRadius: "2px", boxShadow: "0 0 8px #00E5FF" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "9px", fontFamily: "DM Mono", fontWeight: 500 }}>
                    <span style={{ color: "rgba(255,255,255,0.25)" }}>START</span>
                    <span style={{ color: "#00E5FF" }}>50%</span>
                    <span style={{ color: "rgba(255,255,255,0.25)" }}>END</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTourState("active");
                  }}
                  style={{
                    marginTop: "8px",
                    background: "#00A6FF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 0",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "11px",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,166,255,0.3)",
                    width: "100%"
                  }}
                >
                  START TOUR
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Small Grid Cards */}
        {[
          { label: "Today's Task", val: "3 Pending", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", action: onNavigateTasks },
          { label: "Reports", val: "Create/View", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", action: onNavigateReports },
          { label: "Forms", val: "Standard Ops", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", action: () => { } },
          { label: "Schedule", val: "Upcoming", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", action: onNavigateSchedule },
          { label: "Time Off", val: "Requests", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", action: () => { } },
          { label: "Incidents", val: "Active Logs", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", action: onNavigateComms },
          { label: "Timesheet", val: "Log Hours", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", action: () => { } },
          { label: "Skills", val: "Manage", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", action: () => { } },
          { label: "Certifications", val: "Active", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", action: () => { } },
        ].map((item, i) => (
          <div
            key={i}
            onClick={item.action}
            style={{
              padding: "14px 10px",
              borderRadius: "14px",
              background: "var(--glass-surface)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              aspectRatio: "1" // Perfect square
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "9px",
              background: "rgba(14,165,233,0.10)", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
              border: "1px solid rgba(14,165,233,0.18)"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-bright)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <div style={{ color: "var(--text-white)", fontSize: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, lineHeight: 1.1 }}>{item.label}</div>
              <div style={{ color: "var(--text-50)", fontSize: "10px", fontFamily: "'Inter', sans-serif", marginTop: "4px" }}>{item.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: "100px" }} /> {/* Clear space for global SOS button */}

      {/* ── Clock Out Confirmation Modal ── */}
      {showClockOutConfirm && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}>
          <div style={{
            background: "var(--glass-surface)",
            border: "1px solid var(--red-danger)",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "340px",
            padding: "24px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red-danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
            </div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--text-white)", letterSpacing: "0.05em", marginBottom: "8px" }}>
              CONFIRM CLOCK OUT
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--text-50)", marginBottom: "24px", lineHeight: 1.5 }}>
              Are you sure you want to end your shift? This action will log your departure time.
            </div>

            <div style={{ display: "flex", gap: "12px", width: "100%" }}>
              <button
                onClick={() => setShowClockOutConfirm(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid var(--muted-border)",
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--text-white)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsClockedIn(false)
                  setIsOnBreak(false)
                  setShowClockOutConfirm(false)
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "var(--red-danger)",
                  color: "var(--text-white)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(220,38,38,0.3)"
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
