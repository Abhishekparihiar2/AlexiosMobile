import React from "react"

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="3"
      width="14"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <line
      x1="5"
      y1="1"
      x2="5"
      y2="4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <line
      x1="11"
      y1="1"
      x2="11"
      y2="4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="7"
      x2="15"
      y2="7"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
  </svg>
)

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 4.5v3.5l2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export interface ShiftData {
  officerName: string
  dateString: string
  timeString: string
  location: string
  shiftStatus: "upcoming" | "ready" | "late"
  latenessMinutes?: number
}

export const ShiftStatusCard: React.FC<{
  shift: ShiftData
  onClockIn?: () => void
}> = ({ shift, onClockIn }) => {
  return (
    <div className="w-full flex flex-col items-center justify-start font-sans text-white">
      {/* Logo + greeting */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-20 h-20 mb-3 drop-shadow-[0_0_14px_rgba(58,123,255,0.5)]">
          <img
            src="/splash-logo.png"
            alt="Alexios"
            className="w-full h-full object-contain"
            style={{
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
        <span className="text-[10px] tracking-[0.25em] text-slate-400 font-medium uppercase">
          Welcome Back,
        </span>
        <h1 className="text-2xl font-bold tracking-wide mt-1 uppercase text-white">
          {shift.officerName}
        </h1>
      </div>

      {/* Card — rotating toxic green conic-gradient border, matches login page technique */}
      <div
        style={{
          width: "100%",
          borderRadius: "20px",
          padding: "2px",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 0 18px rgba(57,255,20,0.25), 0 4px 32px rgba(5,15,5,0.6)",
        }}
      >
        {/* Spinning green conic gradient */}
        <div
          style={{
            position: "absolute",
            top: "-100%",
            right: "-100%",
            bottom: "-100%",
            left: "-100%",
            background:
              "conic-gradient(from 0deg, #007700, #39FF14, #00FF88, #AAFF00, #00CC44, #39FF14, #007700)",
            animation: "border-spin 5s linear infinite",
            zIndex: 0,
          }}
        />
        {/* Inner frosted glass card */}
        <div
          className="w-full p-5"
          style={
            {
              position: "relative",
              zIndex: 1,
              borderRadius: "18px",
              background: "rgba(6,14,6,0.92)",
              backdropFilter: "blur(25px) saturate(140%)",
            } as React.CSSProperties
          }
        >
          {/* Label row */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Next Scheduled Shift
            </span>
            {shift.shiftStatus === "late" && shift.latenessMinutes && (
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/30 animate-pulse">
                LATE: {shift.latenessMinutes} MIN
              </span>
            )}
          </div>

          {/* Date + time row */}
          <div className="flex items-center space-x-3 text-slate-200 text-sm mb-4">
            <span className="text-slate-400 flex-shrink-0">
              <IconCalendar />
            </span>
            <span className="font-medium">{shift.dateString}</span>
            <div className="flex items-center space-x-1.5 ml-auto text-cyan-400 font-mono text-xs bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
              <IconClock />
              <span>{shift.timeString}</span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(57,255,20,0.12)",
              marginBottom: "16px",
            }}
          />

          {/* CLOCK IN NOW button — replaces location line */}
          <button
            onClick={onClockIn}
            className="w-full py-3.5 px-4 rounded-xl font-bold tracking-[0.14em] text-sm uppercase transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
            style={{
              background: "rgba(8,20,8,0.85)",
              border: "1px solid rgba(57,255,20,0.3)",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(57,255,20,0.08)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(8,20,8,0.85)"
            }}
          >
            <span style={{ color: "#39FF14" }}>
              <IconClock />
            </span>
            <span>CLOCK IN NOW</span>
          </button>
        </div>
      </div>
    </div>
  )
}
