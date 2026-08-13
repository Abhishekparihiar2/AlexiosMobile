import type { CSSProperties } from "react"

const tile: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  cursor: "pointer",
}

const iconWrap: CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  background: "rgba(77,143,255,0.1)",
  border: "1px solid rgba(180,200,255,0.14)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

function IconCalendar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="3"
        y="5"
        width="22"
        height="20"
        rx="3"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.8"
      />
      <line
        x1="3"
        y1="11"
        x2="25"
        y2="11"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.5"
      />
      <line
        x1="9"
        y1="3"
        x2="9"
        y2="8"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="19"
        y1="3"
        x2="19"
        y2="8"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="7"
        y="15"
        width="4"
        height="4"
        rx="1"
        fill="rgba(77,217,232,0.5)"
      />
      <rect
        x="14"
        y="15"
        width="4"
        height="4"
        rx="1"
        fill="rgba(77,217,232,0.3)"
      />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 3C10.13 3 7 6.13 7 10c0 5.25 7 15 7 15s7-9.75 7-15c0-3.87-3.13-7-7-7z"
        stroke="rgba(74,143,255,0.85)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="14"
        cy="10"
        r="2.5"
        stroke="rgba(74,143,255,0.85)"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="5"
        y="5"
        width="18"
        height="20"
        rx="2.5"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="1.8"
      />
      <path
        d="M10 5V4a4 4 0 018 0v1"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="1.6"
      />
      <circle cx="9.5" cy="13" r="1.5" fill="rgba(180,200,255,0.6)" />
      <circle cx="9.5" cy="19" r="1.5" fill="rgba(180,200,255,0.4)" />
      <line
        x1="13"
        y1="13"
        x2="20"
        y2="13"
        stroke="rgba(180,200,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="13"
        y1="19"
        x2="18"
        y2="19"
        stroke="rgba(180,200,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconKey() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle
        cx="10"
        cy="11"
        r="5"
        stroke="rgba(255,165,0,0.85)"
        strokeWidth="1.8"
      />
      <path
        d="M14.5 14.5L24 24"
        stroke="rgba(255,165,0,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="21"
        x2="22"
        y2="19"
        stroke="rgba(255,165,0,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="17"
        y1="24"
        x2="19"
        y2="22"
        stroke="rgba(255,165,0,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
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

function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}>
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "9px",
          color: "rgba(77,217,232,0.5)",
          lineHeight: 1.4,
          flexShrink: 0,
        }}
      >
        •
      </span>
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "9px",
          color: "rgba(130,155,200,0.6)",
          lineHeight: 1.4,
          letterSpacing: "0.2px",
        }}
      >
        {text}
      </span>
    </div>
  )
}

const tiles = [
  {
    icon: <IconCalendar />,
    title: "TOUR SCHEDULE",
    bullets: ["3 Scheduled Tours", "Next: Shift Handover"],
    badge: {
      label: "4 ACTIVE Completed",
      color: "#4DD9E8",
      bg: "rgba(77,217,232,0.08)",
      border: "rgba(77,217,232,0.22)",
    },
    border: "1px solid rgba(77,217,232,0.28)",
    boxShadow: "0 0 18px rgba(77,217,232,0.1)",
    iconBg: "rgba(77,217,232,0.08)",
    iconBorder: "rgba(77,217,232,0.2)",
  },
  {
    icon: <IconMapPin />,
    title: "CHECKPOINTS",
    bullets: ["Tower B", "Loading Dock Door"],
    badge: {
      label: "1 PENDING",
      color: "#4A8FFF",
      bg: "rgba(74,143,255,0.1)",
      border: "rgba(74,143,255,0.25)",
    },
    border: "1px solid rgba(74,143,255,0.18)",
    boxShadow: undefined,
    iconBg: "rgba(77,143,255,0.1)",
    iconBorder: "rgba(180,200,255,0.14)",
  },
  {
    icon: <IconClipboard />,
    title: "SITE TASKS & REMINDERS",
    bullets: ["Open/Pending Duties"],
    badge: {
      label: "2 INCOMPLETE",
      color: "#FFA500",
      bg: "rgba(255,165,0,0.08)",
      border: "rgba(255,165,0,0.25)",
    },
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: undefined,
    iconBg: "rgba(77,143,255,0.1)",
    iconBorder: "rgba(180,200,255,0.14)",
  },
  {
    icon: <IconKey />,
    title: "SITE ASSETS",
    bullets: ["Doors & Windows", "Fire Panels & Extinguishers"],
    badge: {
      label: "VIEW INVENTORY",
      color: "#FFA500",
      bg: "rgba(255,165,0,0.08)",
      border: "rgba(255,165,0,0.28)",
    },
    border: "1px solid rgba(255,165,0,0.28)",
    boxShadow: "0 0 16px rgba(255,165,0,0.1)",
    iconBg: "rgba(255,140,0,0.08)",
    iconBorder: "rgba(255,165,0,0.2)",
  },
]

export default function ActionGrid() {
  return (
    <div
      style={{
        padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
      }}
    >
      {tiles.map((t) => (
        <div
          key={t.title}
          style={{ ...tile, border: t.border, boxShadow: t.boxShadow }}
        >
          {/* Icon */}
          <div
            style={{
              ...iconWrap,
              background: t.iconBg,
              border: `1px solid ${t.iconBorder}`,
            }}
          >
            {t.icon}
          </div>

          {/* Title */}
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

          {/* Bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {t.bullets.map((b) => (
              <Bullet key={b} text={b} />
            ))}
          </div>

          {/* Badge */}
          <Badge {...t.badge} />
        </div>
      ))}
    </div>
  )
}
