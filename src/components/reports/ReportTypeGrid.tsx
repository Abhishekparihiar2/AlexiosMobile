import type { CSSProperties } from "react"

const tile: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  cursor: "pointer",
}

const iconWrap: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "11px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

function Badge({
  label,
  color,
  bg,
  border,
}: {
  label: string
  color: string
  bg: string
  border: string
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        padding: "3px 8px",
        borderRadius: "6px",
        background: bg,
        border: `1px solid ${border}`,
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          fontWeight: 600,
          color,
          letterSpacing: "0.8px",
        }}
      >
        {label}
      </span>
    </div>
  )
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle
        cx="11"
        cy="11"
        r="8.5"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.5"
        fill="rgba(77,217,232,0.06)"
      />
      <path
        d="M11 6.5V11.5L14.5 13.5"
        stroke="rgba(77,217,232,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconShieldAlert() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M11 2L3 5.5V11C3 15.4 6.5 19.4 11 21C15.5 19.4 19 15.4 19 11V5.5L11 2Z"
        stroke="rgba(255,68,68,0.85)"
        strokeWidth="1.5"
        fill="rgba(255,68,68,0.06)"
      />
      <line
        x1="11"
        y1="8"
        x2="11"
        y2="12"
        stroke="rgba(255,68,68,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="11" cy="14.5" r="0.9" fill="rgba(255,68,68,0.9)" />
    </svg>
  )
}

function IconWrench() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M14.5 3.5C13 3.5 11.5 4.2 10.7 5.5L5 11.2L7.5 13.7L13.2 8C14.5 7.2 15.2 5.7 15.2 4.2"
        stroke="rgba(255,165,0,0.85)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7.5 13.7L4 17.2C3.6 17.6 3.6 18.2 4 18.6L4.2 18.8C4.6 19.2 5.2 19.2 5.6 18.8L9.1 15.3"
        stroke="rgba(255,165,0,0.85)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="15.5"
        cy="4.5"
        r="2.5"
        stroke="rgba(255,165,0,0.7)"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}

function IconClipboardList() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="4"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke="rgba(180,200,255,0.65)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 4V3a3 3 0 016 0v1"
        stroke="rgba(180,200,255,0.65)"
        strokeWidth="1.4"
      />
      <line
        x1="7.5"
        y1="10"
        x2="14.5"
        y2="10"
        stroke="rgba(180,200,255,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="7.5"
        y1="13.5"
        x2="14.5"
        y2="13.5"
        stroke="rgba(180,200,255,0.5)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="7.5"
        y1="17"
        x2="11.5"
        y2="17"
        stroke="rgba(180,200,255,0.35)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

const tiles = [
  {
    icon: <IconClock />,
    iconBg: "rgba(77,217,232,0.08)",
    iconBorder: "rgba(77,217,232,0.2)",
    title: "HOURLY LOG",
    desc: "Routine patrol tracking & perimeter status updates.",
    border: "1px solid rgba(77,217,232,0.16)",
    bg: "rgba(255,255,255,0.05)",
    badge: {
      label: "NEW ENTRY",
      color: "#4DD9E8",
      bg: "rgba(77,217,232,0.08)",
      border: "rgba(77,217,232,0.25)",
    },
  },
  {
    icon: <IconShieldAlert />,
    iconBg: "rgba(255,68,68,0.08)",
    iconBorder: "rgba(255,68,68,0.2)",
    title: "INCIDENT REPORT",
    desc: "Log security breaches, medical emergencies, or damage.",
    border: "1px solid rgba(255,68,68,0.25)",
    bg: "rgba(255,68,68,0.03)",
    badge: {
      label: "IMMEDIATE FILING",
      color: "#FF4444",
      bg: "rgba(255,68,68,0.1)",
      border: "rgba(255,68,68,0.3)",
    },
  },
  {
    icon: <IconWrench />,
    iconBg: "rgba(255,165,0,0.08)",
    iconBorder: "rgba(255,165,0,0.2)",
    title: "MAINTENANCE LOG",
    desc: "Report facility faults, broken hardware, or lock failures.",
    border: "1px solid rgba(255,165,0,0.18)",
    bg: "rgba(255,255,255,0.05)",
    badge: {
      label: "DEPLOY LOG",
      color: "#FFA500",
      bg: "rgba(255,165,0,0.08)",
      border: "rgba(255,165,0,0.25)",
    },
  },
  {
    icon: <IconClipboardList />,
    iconBg: "rgba(77,143,255,0.08)",
    iconBorder: "rgba(180,200,255,0.14)",
    title: "SHIFT SUMMARY",
    desc: "Final operational handover summaries & pass-down notes.",
    border: "1px solid rgba(255,255,255,0.09)",
    bg: "rgba(255,255,255,0.05)",
    badge: {
      label: "END SHIFT",
      color: "rgba(130,155,200,0.7)",
      bg: "rgba(180,200,255,0.05)",
      border: "rgba(180,200,255,0.14)",
    },
  },
]

export default function ReportTypeGrid({
  onSelect,
}: {
  onSelect: (type: string) => void
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
        padding: "0 16px",
      }}
    >
      {tiles.map((t) => (
        <div
          key={t.title}
          onClick={() => onSelect(t.title)}
          style={{ ...tile, background: t.bg, border: t.border }}
        >
          <div
            style={{
              ...iconWrap,
              background: t.iconBg,
              border: `1px solid ${t.iconBorder}`,
            }}
          >
            {t.icon}
          </div>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              color: "rgba(220,235,255,0.9)",
              letterSpacing: "0.5px",
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {t.title}
          </span>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(130,155,200,0.55)",
              lineHeight: 1.5,
              letterSpacing: "0.1px",
            }}
          >
            {t.desc}
          </span>
          <Badge {...t.badge} />
        </div>
      ))}
    </div>
  )
}
