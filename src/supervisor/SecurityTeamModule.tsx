import { useState } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const officers = [
  {
    id: 1,
    name: "J. Rivera",
    badge: "S-041",
    role: "Lead Guard",
    zone: "Lobby / L1",
    status: "active",
    scheduled: "06:00",
    clockIn: "06:00",
    avatar: "JR",
  },
  {
    id: 2,
    name: "M. Chen",
    badge: "S-019",
    role: "Patrol",
    zone: "Perimeter",
    status: "active",
    scheduled: "06:00",
    clockIn: "06:02",
    avatar: "MC",
  },
  {
    id: 3,
    name: "T. Williams",
    badge: "S-057",
    role: "Access Ctrl",
    zone: "Gate B",
    status: "late",
    scheduled: "06:00",
    clockIn: "—",
    avatar: "TW",
  },
  {
    id: 4,
    name: "A. Okafor",
    badge: "S-033",
    role: "Patrol",
    zone: "Levels 3–5",
    status: "active",
    scheduled: "06:00",
    clockIn: "05:58",
    avatar: "AO",
  },
  {
    id: 5,
    name: "D. Patel",
    badge: "S-062",
    role: "CCTV Monitor",
    zone: "Control Rm",
    status: "behind",
    scheduled: "06:00",
    clockIn: "06:00",
    avatar: "DP",
  },
  {
    id: 6,
    name: "L. Santos",
    badge: "S-024",
    role: "Patrol",
    zone: "Parking P1",
    status: "active",
    scheduled: "06:00",
    clockIn: "05:58",
    avatar: "LS",
  },
  {
    id: 7,
    name: "K. Park",
    badge: "S-011",
    role: "Patrol",
    zone: "—",
    status: "off",
    scheduled: "—",
    clockIn: "—",
    avatar: "KP",
    nextShift: {
      date: "Today",
      start: "14:00",
      end: "22:00",
      zone: "Perimeter",
    },
  },
  {
    id: 8,
    name: "R. Gomez",
    badge: "S-038",
    role: "Lead Guard",
    zone: "—",
    status: "off",
    scheduled: "—",
    clockIn: "—",
    avatar: "RG",
    nextShift: {
      date: "Tomorrow",
      start: "06:00",
      end: "14:00",
      zone: "Lobby / L1",
    },
  },
  {
    id: 9,
    name: "N. Foster",
    badge: "S-049",
    role: "Access Ctrl",
    zone: "—",
    status: "off",
    scheduled: "—",
    clockIn: "—",
    avatar: "NF",
    nextShift: {
      date: "Tomorrow",
      start: "14:00",
      end: "22:00",
      zone: "Gate A",
    },
  },
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const scheduleData: Record<number, Array<{
  day: number
  start: string
  end: string
  role: string
  status: "confirmed" | "pending" | "off"
}>> = {
  1: [
    {
      day: 0,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    {
      day: 1,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    {
      day: 2,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    {
      day: 3,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    {
      day: 4,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    { day: 5, start: "", end: "", role: "", status: "off" },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
  2: [
    {
      day: 0,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 1,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 2, start: "", end: "", role: "", status: "off" },
    {
      day: 3,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 4,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 5, start: "14:00", end: "22:00", role: "Patrol", status: "pending" },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
  3: [
    {
      day: 0,
      start: "06:00",
      end: "14:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 1,
      start: "06:00",
      end: "14:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 2,
      start: "06:00",
      end: "14:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 3,
      start: "06:00",
      end: "14:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 4,
      start: "06:00",
      end: "14:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    { day: 5, start: "", end: "", role: "", status: "off" },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
  4: [
    {
      day: 0,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 1, start: "", end: "", role: "", status: "off" },
    {
      day: 2,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 3,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 4,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 5, start: "14:00", end: "22:00", role: "Patrol", status: "pending" },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
  5: [
    {
      day: 0,
      start: "06:00",
      end: "14:00",
      role: "CCTV Monitor",
      status: "confirmed",
    },
    {
      day: 1,
      start: "06:00",
      end: "14:00",
      role: "CCTV Monitor",
      status: "confirmed",
    },
    {
      day: 2,
      start: "06:00",
      end: "14:00",
      role: "CCTV Monitor",
      status: "confirmed",
    },
    { day: 3, start: "", end: "", role: "", status: "off" },
    {
      day: 4,
      start: "06:00",
      end: "14:00",
      role: "CCTV Monitor",
      status: "confirmed",
    },
    { day: 5, start: "", end: "", role: "", status: "off" },
    {
      day: 6,
      start: "06:00",
      end: "14:00",
      role: "CCTV Monitor",
      status: "pending",
    },
  ],
  6: [
    {
      day: 0,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 1,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 2, start: "", end: "", role: "", status: "off" },
    {
      day: 3,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 4,
      start: "06:00",
      end: "14:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 5, start: "", end: "", role: "", status: "off" },
    { day: 6, start: "14:00", end: "22:00", role: "Patrol", status: "pending" },
  ],
  7: [
    { day: 0, start: "", end: "", role: "", status: "off" },
    { day: 1, start: "", end: "", role: "", status: "off" },
    {
      day: 2,
      start: "14:00",
      end: "22:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 3,
      start: "14:00",
      end: "22:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 4,
      start: "14:00",
      end: "22:00",
      role: "Patrol",
      status: "confirmed",
    },
    {
      day: 5,
      start: "14:00",
      end: "22:00",
      role: "Patrol",
      status: "confirmed",
    },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
  8: [
    { day: 0, start: "", end: "", role: "", status: "off" },
    {
      day: 1,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    {
      day: 2,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    {
      day: 3,
      start: "06:00",
      end: "14:00",
      role: "Lead Guard",
      status: "confirmed",
    },
    { day: 4, start: "", end: "", role: "", status: "off" },
    { day: 5, start: "", end: "", role: "", status: "off" },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
  9: [
    { day: 0, start: "", end: "", role: "", status: "off" },
    {
      day: 1,
      start: "14:00",
      end: "22:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 2,
      start: "14:00",
      end: "22:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 3,
      start: "14:00",
      end: "22:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    {
      day: 4,
      start: "14:00",
      end: "22:00",
      role: "Access Ctrl",
      status: "confirmed",
    },
    { day: 5, start: "", end: "", role: "", status: "off" },
    { day: 6, start: "", end: "", role: "", status: "off" },
  ],
}

const timesheetData = [
  { id: 1, hours: [8, 8, 8, 8, 8, 0, 0], ot: 0, status: "approved" as const },
  { id: 2, hours: [8, 8, 0, 8, 8, 4, 0], ot: 4, status: "approved" as const },
  { id: 3, hours: [8, 8, 8, 8, 8, 0, 0], ot: 0, status: "pending" as const },
  { id: 4, hours: [8, 0, 8, 8, 8, 4, 0], ot: 4, status: "approved" as const },
  { id: 5, hours: [8, 8, 8, 0, 8, 0, 0], ot: 0, status: "pending" as const },
  { id: 6, hours: [8, 8, 0, 8, 8, 0, 4], ot: 4, status: "approved" as const },
  { id: 7, hours: [0, 0, 8, 8, 8, 8, 0], ot: 0, status: "approved" as const },
  { id: 8, hours: [0, 8, 8, 8, 0, 0, 0], ot: 0, status: "pending" as const },
  { id: 9, hours: [0, 8, 8, 8, 8, 0, 0], ot: 0, status: "approved" as const },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusColor = (s: string) =>
  s === "active"
    ? "#5599FF"
    : s === "late"
      ? "#FFA500"
      : s === "behind"
        ? "#FF4444"
        : "#555566"
const statusLabel = (s: string) =>
  s === "active"
    ? "ON DUTY"
    : s === "late"
      ? "LATE"
      : s === "behind"
        ? "BEHIND"
        : "OFF DUTY"

// ─── Officer Profile Card ─────────────────────────────────────────────────────

function OfficerCard({ o }: { o: typeof officers[0] }) {
  const sc = statusColor(o.status)
  const isOff = o.status === "off"
  const ns = "nextShift" in o ? (o as typeof officers[6]).nextShift : undefined

  return (
    <div
      style={{
        width: "190px",
        flexShrink: 0,
        borderRadius: "14px",
        background: "rgba(14,14,14,0.98)",
        border: `1px solid ${sc}44`,
        boxShadow: `0 0 0 1px ${sc}14, 0 0 18px ${sc}18`,
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            flexShrink: 0,
            background: `${sc}18`,
            border: `1px solid ${sc}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "DM Mono, monospace",
            fontSize: "13px",
            fontWeight: 700,
            color: sc,
          }}
        >
          {o.avatar}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {o.name}
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(200,218,248,0.65)",
              marginTop: "1px",
            }}
          >
            {o.badge}
          </div>
        </div>
      </div>

      {/* Role + zone */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(180,200,230,0.65)",
            fontWeight: 500,
          }}
        >
          {o.role}
        </div>
        {!isOff && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1a3 3 0 1 1 0 6A3 3 0 0 1 5 1Z"
                stroke="rgba(200,218,248,0.6)"
                strokeWidth="1"
              />
              <path
                d="M5 9v.5"
                stroke="rgba(200,218,248,0.6)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.65)",
              }}
            >
              {o.zone}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      />

      {/* Time info */}
      {!isOff ? (
        <div style={{ display: "flex", gap: "6px" }}>
          <div
            style={{
              flex: 1,
              padding: "5px 7px",
              borderRadius: "7px",
              background: "rgba(22,22,22,0.9)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                color: "rgba(200,218,248,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "2px",
              }}
            >
              Sched.
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(220,235,255,0.8)",
              }}
            >
              {o.scheduled}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "5px 7px",
              borderRadius: "7px",
              background: `${sc}0D`,
              border: `1px solid ${sc}30`,
            }}
          >
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                color: `${sc}80`,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "2px",
              }}
            >
              Actual
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
                color: sc,
              }}
            >
              {o.clockIn === "—" ? "—" : o.clockIn}
            </div>
          </div>
        </div>
      ) : ns ? (
        <div
          style={{
            padding: "8px 10px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              color: "rgba(200,218,248,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "5px",
            }}
          >
            Next Shift
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "rgba(220,235,255,0.8)",
              marginBottom: "2px",
            }}
          >
            {ns.date}
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "12px",
              fontWeight: 700,
              color: "rgba(220,235,255,0.95)",
            }}
          >
            {ns.start} – {ns.end}
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(200,218,248,0.65)",
              marginTop: "3px",
            }}
          >
            {ns.zone}
          </div>
        </div>
      ) : null}

      {/* Status pill */}
      <div
        style={{
          alignSelf: "flex-start",
          padding: "2px 8px",
          borderRadius: "20px",
          background: `${sc}14`,
          border: `1px solid ${sc}40`,
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          color: sc,
          letterSpacing: "0.07em",
        }}
      >
        {statusLabel(o.status)}
      </div>
    </div>
  )
}

// ─── Schedule Portal ──────────────────────────────────────────────────────────

function SchedulePortal({ onBack }: { onBack: () => void }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7)
  const weekLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(weekStart.getTime() + 6 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`

  const shiftColor = (status: "confirmed" | "pending" | "off") =>
    status === "confirmed"
      ? {
          bg: "rgba(85,153,255,0.12)",
          border: "rgba(85,153,255,0.3)",
          text: "#5599FF",
        }
      : status === "pending"
        ? {
            bg: "rgba(255,165,0,0.1)",
            border: "rgba(255,165,0,0.3)",
            text: "#FFA500",
          }
        : { bg: "transparent", border: "transparent", text: "transparent" }

  const OFFICER_COL = 160
  const DAY_COL = 130

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sub-header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.5 2L3 6l4.5 4"
              stroke="rgba(180,195,230,0.7)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(200,218,248,0.65)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Schedule
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.2px",
            }}
          >
            Week View
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {/* Legend */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {[
            { label: "Confirmed", color: "#5599FF" },
            { label: "Pending", color: "#FFA500" },
          ].map((l) => (
            <div
              key={l.label}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "2px",
                  background: l.color,
                  opacity: 0.7,
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(180,195,230,0.5)",
                }}
              >
                {l.label}
              </span>
            </div>
          ))}
        </div>
        {/* Week nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setWeekOffset((v) => v - 1)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "7px",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M6 2L3 5l3 3"
                stroke="rgba(180,195,230,0.6)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              color: "rgba(228,240,255,0.88)",
              minWidth: "150px",
              textAlign: "center",
            }}
          >
            {weekLabel}
          </span>
          <button
            onClick={() => setWeekOffset((v) => v + 1)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "7px",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M4 2l3 3-3 3"
                stroke="rgba(180,195,230,0.6)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          style={
            {
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(85,153,255,0.1)",
              border: "1px solid rgba(85,153,255,0.3)",
              color: "#5599FF",
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              letterSpacing: "0.06em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            } as React.CSSProperties
          }
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 1v9M1 5.5h9"
              stroke="#5599FF"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          New Shift
        </button>
      </div>

      {/* Grid */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(10,10,10,0.98)",
        }}
      >
        {/* Day header row */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: `${OFFICER_COL}px`,
              flexShrink: 0,
              padding: "10px 14px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Officer
            </span>
          </div>
          {DAYS.map((d, i) => {
            const dayDate = new Date(weekStart.getTime() + i * 86400000)
            const isToday =
              weekOffset === 0 &&
              dayDate.toDateString() === today.toDateString()
            return (
              <div
                key={d}
                style={{
                  width: `${DAY_COL}px`,
                  flexShrink: 0,
                  padding: "10px 10px",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1px",
                  background: isToday ? "rgba(85,153,255,0.04)" : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    color: isToday ? "#5599FF" : "rgba(200,218,248,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {d}
                </span>
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "10px",
                    color: isToday ? "#5599FF" : "rgba(180,195,230,0.5)",
                    fontWeight: isToday ? 700 : 400,
                  }}
                >
                  {dayDate.getDate()}
                </span>
              </div>
            )
          })}
          <div
            style={{
              flex: 1,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Hrs
            </span>
          </div>
        </div>

        {/* Officer rows */}
        <div style={{ overflowY: "auto", height: "calc(100% - 42px)" }}>
          {officers.map((o) => {
            const shifts = scheduleData[o.id] || []
            const totalHours =
              shifts.filter((s) => s.status !== "off").length * 8
            return (
              <div
                key={o.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  minHeight: "58px",
                }}
              >
                {/* Officer */}
                <div
                  style={{
                    width: `${OFFICER_COL}px`,
                    flexShrink: 0,
                    padding: "8px 14px",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      flexShrink: 0,
                      background: `${statusColor(o.status)}18`,
                      border: `1px solid ${statusColor(o.status)}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: statusColor(o.status),
                    }}
                  >
                    {o.avatar}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {o.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "8px",
                        color: "rgba(200,218,248,0.6)",
                      }}
                    >
                      {o.badge}
                    </div>
                  </div>
                </div>

                {/* Day cells */}
                {shifts.map((s, i) => {
                  const c = shiftColor(s.status)
                  return (
                    <div
                      key={i}
                      style={{
                        width: `${DAY_COL}px`,
                        flexShrink: 0,
                        padding: "6px 8px",
                        borderRight: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "58px",
                      }}
                    >
                      {s.status !== "off" && (
                        <div
                          style={{
                            width: "100%",
                            padding: "5px 8px",
                            borderRadius: "7px",
                            background: c.bg,
                            border: `1px solid ${c.border}`,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "DM Mono, monospace",
                              fontSize: "9px",
                              fontWeight: 600,
                              color: c.text,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {s.start}–{s.end}
                          </div>
                          <div
                            style={{
                              fontSize: "9px",
                              color: `${c.text}99`,
                              marginTop: "1px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {s.role}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Hours total */}
                <div
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                      color:
                        totalHours > 0
                          ? "rgba(220,235,255,0.85)"
                          : "rgba(180,195,230,0.2)",
                    }}
                  >
                    {totalHours}h
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Timesheet Portal ─────────────────────────────────────────────────────────

function TimesheetPortal({ onBack }: { onBack: () => void }) {
  const statusPill = (s: "approved" | "pending" | "rejected") => {
    const map = {
      approved: {
        bg: "rgba(85,153,255,0.1)",
        border: "rgba(85,153,255,0.3)",
        color: "#5599FF",
        label: "Approved",
      },
      pending: {
        bg: "rgba(255,165,0,0.1)",
        border: "rgba(255,165,0,0.3)",
        color: "#FFA500",
        label: "Pending",
      },
      rejected: {
        bg: "rgba(255,68,68,0.1)",
        border: "rgba(255,68,68,0.3)",
        color: "#FF4444",
        label: "Rejected",
      },
    }
    const m = map[s]
    return (
      <div
        style={{
          display: "inline-flex",
          padding: "2px 8px",
          borderRadius: "20px",
          background: m.bg,
          border: `1px solid ${m.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8.5px",
            color: m.color,
            letterSpacing: "0.06em",
          }}
        >
          {m.label}
        </span>
      </div>
    )
  }

  const colTotals = DAYS.map((_, di) =>
    timesheetData.reduce((sum, t) => sum + t.hours[di], 0),
  )
  const totalOT = timesheetData.reduce((sum, t) => sum + t.ot, 0)
  const totalAll = timesheetData.reduce(
    (sum, t) => sum + t.hours.reduce((a, b) => a + b, 0),
    0,
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sub-header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.5 2L3 6l4.5 4"
              stroke="rgba(180,195,230,0.7)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(200,218,248,0.65)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Timesheets
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.2px",
            }}
          >
            Pay Period
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {/* Pay period badge */}
        <div
          style={{
            padding: "5px 14px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              color: "rgba(220,235,255,0.65)",
            }}
          >
            Aug 4 – Aug 10, 2026
          </span>
        </div>
        {/* Summary pills */}
        <div style={{ display: "flex", gap: "6px" }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "7px",
              background: "rgba(85,153,255,0.08)",
              border: "1px solid rgba(85,153,255,0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "#5599FF",
              }}
            >
              {totalAll}h Total
            </span>
          </div>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "7px",
              background: "rgba(255,165,0,0.08)",
              border: "1px solid rgba(255,165,0,0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "#FFA500",
              }}
            >
              {totalOT}h OT
            </span>
          </div>
        </div>
        <button
          style={
            {
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(228,240,255,0.88)",
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              letterSpacing: "0.06em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            } as React.CSSProperties
          }
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 1v6M2 7l3.5 3.5L9 7"
              stroke="rgba(228,240,255,0.82)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(10,10,10,0.98)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "160px",
              flexShrink: 0,
              padding: "10px 14px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Officer
            </span>
          </div>
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                flex: 1,
                padding: "10px 6px",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(200,218,248,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {d}
              </span>
            </div>
          ))}
          <div
            style={{
              width: "60px",
              flexShrink: 0,
              padding: "10px 10px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Total
            </span>
          </div>
          <div
            style={{
              width: "50px",
              flexShrink: 0,
              padding: "10px 8px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(255,165,0,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              OT
            </span>
          </div>
          <div
            style={{
              width: "90px",
              flexShrink: 0,
              padding: "10px 10px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Status
            </span>
          </div>
        </div>

        {/* Rows */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {officers.map((o) => {
            const ts = timesheetData.find((t) => t.id === o.id)!
            const total = ts.hours.reduce((a, b) => a + b, 0)
            return (
              <div
                key={o.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  minHeight: "52px",
                }}
              >
                <div
                  style={{
                    width: "160px",
                    flexShrink: 0,
                    padding: "8px 14px",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "7px",
                      flexShrink: 0,
                      background: `${statusColor(o.status)}18`,
                      border: `1px solid ${statusColor(o.status)}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: statusColor(o.status),
                    }}
                  >
                    {o.avatar}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {o.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "8px",
                        color: "rgba(200,218,248,0.6)",
                      }}
                    >
                      {o.badge}
                    </div>
                  </div>
                </div>
                {ts.hours.map((h, di) => (
                  <div
                    key={di}
                    style={{
                      flex: 1,
                      padding: "8px 6px",
                      borderRight: "1px solid rgba(255,255,255,0.04)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "12px",
                        fontWeight: 600,
                        color:
                          h === 0
                            ? "rgba(180,195,230,0.2)"
                            : h > 8
                              ? "#FFA500"
                              : "rgba(220,235,255,0.8)",
                      }}
                    >
                      {h === 0 ? "—" : `${h}h`}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    width: "60px",
                    flexShrink: 0,
                    padding: "8px 10px",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "rgba(220,235,255,0.95)",
                    }}
                  >
                    {total}h
                  </span>
                </div>
                <div
                  style={{
                    width: "50px",
                    flexShrink: 0,
                    padding: "8px 8px",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "12px",
                      fontWeight: ts.ot > 0 ? 700 : 400,
                      color: ts.ot > 0 ? "#FFA500" : "rgba(180,195,230,0.2)",
                    }}
                  >
                    {ts.ot > 0 ? `${ts.ot}h` : "—"}
                  </span>
                </div>
                <div
                  style={{
                    width: "90px",
                    flexShrink: 0,
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {statusPill(ts.status)}
                </div>
              </div>
            )
          })}
        </div>

        {/* Totals row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(20,20,20,0.9)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "160px",
              flexShrink: 0,
              padding: "10px 14px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(180,195,230,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Totals
            </span>
          </div>
          {colTotals.map((t, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "10px 6px",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(220,235,255,0.9)",
                }}
              >
                {t}h
              </span>
            </div>
          ))}
          <div
            style={{
              width: "60px",
              flexShrink: 0,
              padding: "10px 10px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "12px",
                fontWeight: 700,
                color: "#5599FF",
              }}
            >
              {totalAll}h
            </span>
          </div>
          <div
            style={{
              width: "50px",
              flexShrink: 0,
              padding: "10px 8px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "12px",
                fontWeight: 700,
                color: "#FFA500",
              }}
            >
              {totalOT}h
            </span>
          </div>
          <div style={{ width: "90px", flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SecurityTeamModule({
  onClose,
}: {
  onClose: () => void
}) {
  const [view, setView] = useState<"roster" | "schedule" | "timesheet">(
    "roster",
  )

  const onDuty = officers.filter((o) => o.status === "active").length
  const late = officers.filter((o) => o.status === "late").length
  const behind = officers.filter((o) => o.status === "behind").length
  const offDuty = officers.filter((o) => o.status === "off").length

  const activityFeed = [
    { time: "07:43", text: "J. Rivera clocked in", color: "#5599FF" },
    {
      time: "07:38",
      text: "K. Park shift starting 14:00",
      color: "rgba(200,218,248,0.55)",
    },
    { time: "07:31", text: "T. Williams — late check-in", color: "#FFA500" },
    { time: "07:24", text: "A. Okafor zone reassigned", color: "#5599FF" },
    { time: "07:15", text: "M. Chen patrol started", color: "#5599FF" },
    { time: "07:08", text: "D. Patel CCTV coverage active", color: "#5599FF" },
    { time: "06:58", text: "L. Santos parking sweep begin", color: "#5599FF" },
  ]

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        padding: "10px",
        gap: "10px",
        overflow: "hidden",
      }}
    >
      {/* ── Module header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 14px",
          background: "rgba(14,14,14,0.96)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px",
          flexShrink: 0,
        }}
      >
        {/* Back */}
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M8.5 2L3.5 6.5l5 4.5"
              stroke="rgba(180,195,230,0.6)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Icon + title */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "rgba(74,143,255,0.14)",
            border: "1px solid rgba(74,143,255,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle
              cx="5.5"
              cy="4.5"
              r="2"
              stroke="#4A8FFF"
              strokeWidth="1.2"
            />
            <path
              d="M1 13c0-2.2 2-4 4.5-4S10 10.8 10 13"
              stroke="#4A8FFF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle
              cx="10.5"
              cy="4.5"
              r="1.5"
              stroke="#4A8FFF"
              strokeWidth="1"
            />
            <path
              d="M12.5 12c0-1.6-1.2-2.9-2.8-2.9"
              stroke="#4A8FFF"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              color: "rgba(200,218,248,0.65)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Module
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.2px",
            }}
          >
            Security Team
          </div>
        </div>

        <div
          style={{
            width: "1px",
            height: "28px",
            background: "rgba(180,200,255,0.08)",
            flexShrink: 0,
            marginLeft: "4px",
          }}
        />

        {/* Status legend */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {[
            { label: "On Duty", count: onDuty, color: "#5599FF" },
            { label: "Late", count: late, color: "#FFA500" },
            { label: "Behind", count: behind, color: "#FF4444" },
            { label: "Off Duty", count: offDuty, color: "#555566" },
          ].map((s) => (
            <div
              key={s.label}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: s.color,
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(180,195,230,0.5)",
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(228,240,255,0.88)",
                  fontWeight: 600,
                }}
              >
                {s.count}
              </span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Portal buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setView("schedule")}
            style={
              {
                padding: "7px 16px",
                borderRadius: "9px",
                cursor: "pointer",
                background:
                  view === "schedule"
                    ? "rgba(85,153,255,0.14)"
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  view === "schedule"
                    ? "rgba(85,153,255,0.4)"
                    : "rgba(255,255,255,0.1)"
                }`,
                color:
                  view === "schedule" ? "#5599FF" : "rgba(180,195,230,0.6)",
                fontFamily: "DM Mono, monospace",
                fontSize: "10px",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              } as React.CSSProperties
            }
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="1"
                y="2"
                width="10"
                height="9"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path d="M1 5h10" stroke="currentColor" strokeWidth="1" />
              <path
                d="M4 1v2M8 1v2"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
            Schedules
          </button>
          <button
            onClick={() => setView("timesheet")}
            style={
              {
                padding: "7px 16px",
                borderRadius: "9px",
                cursor: "pointer",
                background:
                  view === "timesheet"
                    ? "rgba(74,143,255,0.14)"
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  view === "timesheet"
                    ? "rgba(74,143,255,0.4)"
                    : "rgba(255,255,255,0.1)"
                }`,
                color:
                  view === "timesheet" ? "#4A8FFF" : "rgba(180,195,230,0.6)",
                fontFamily: "DM Mono, monospace",
                fontSize: "10px",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              } as React.CSSProperties
            }
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="1"
                y="1"
                width="10"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M1 4h10M1 7h10M4 4v7M8 4v7"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            Timesheets
          </button>
        </div>

        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            color: "rgba(200,218,248,0.55)",
          }}
        >
          {officers.length} ASSIGNED
        </span>
      </div>

      {/* ── Content area ── */}
      {view === "roster" ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {/* Horizontal officer cards */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            {officers.map((o) => (
              <OfficerCard key={o.id} o={o} />
            ))}
          </div>

          {/* Lower section */}
          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "10px",
              overflow: "hidden",
            }}
          >
            {/* Team Activity feed */}
            <div
              style={{
                flex: "0 0 55%",
                background: "rgba(14,14,14,0.96)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "10px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#5599FF",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "10px",
                    color: "rgba(180,195,230,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Team Activity
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {activityFeed.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "7px 10px",
                      borderRadius: "9px",
                      background: "rgba(255,255,255,0.03)",
                      borderLeft: `2px solid ${e.color}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "10px",
                        color: "rgba(200,218,248,0.65)",
                        flexShrink: 0,
                        width: "38px",
                      }}
                    >
                      {e.time}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(235,244,255,0.95)",
                        flex: 1,
                        fontWeight: 500,
                      }}
                    >
                      {e.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shift Summary */}
            <div
              style={{
                flex: 1,
                background: "rgba(14,14,14,0.96)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  color: "rgba(180,195,230,0.45)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  flexShrink: 0,
                }}
              >
                Shift Summary
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  flex: 1,
                }}
              >
                {[
                  {
                    label: "On Duty",
                    value: `${onDuty} / ${officers.length}`,
                    color: "#5599FF",
                  },
                  { label: "Hours Logged", value: "42h 15m", color: "#5599FF" },
                  {
                    label: "Next 4h Shifts",
                    value: "2 Starting",
                    color: "rgba(228,240,255,0.88)",
                  },
                  {
                    label: "Upcoming",
                    value: "14:00 Shift",
                    color: "rgba(228,240,255,0.88)",
                  },
                  {
                    label: "Late / Absent",
                    value: `${late + behind}`,
                    color:
                      late + behind > 0 ? "#FFA500" : "rgba(228,240,255,0.88)",
                  },
                  {
                    label: "Off Duty",
                    value: `${offDuty}`,
                    color: "rgba(180,195,230,0.5)",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "rgba(22,22,22,0.9)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "8.5px",
                        color: "rgba(200,218,248,0.6)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: s.color,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : view === "schedule" ? (
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            background: "rgba(14,14,14,0.96)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: "14px",
          }}
        >
          <SchedulePortal onBack={() => setView("roster")} />
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            background: "rgba(14,14,14,0.96)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: "14px",
          }}
        >
          <TimesheetPortal onBack={() => setView("roster")} />
        </div>
      )}
    </div>
  )
}
