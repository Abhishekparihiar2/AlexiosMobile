import type { CSSProperties } from "react"

interface Props {
  onNavigateKB?: () => void
  onNavigateRadio?: () => void
  onNavigateSiteStatus?: () => void
  onNavigateTasks?: () => void
  onNavigateMap?: () => void
}

const tile: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
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
  flexShrink: 0,
}

function PostOrdersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="4"
        y="3"
        width="20"
        height="22"
        rx="3"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
      />
      <path
        d="M9 9h10M9 14h10M9 19h6"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function RadioIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="5"
        y="10"
        width="18"
        height="14"
        rx="3"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
      />
      <circle
        cx="14"
        cy="17"
        r="3"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.6"
      />
      <path
        d="M10 6.5l4-3 4 3"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="12" r="1.5" fill="rgba(77,217,232,0.9)" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M3 7l8-3.5 8 3.5 8-3.5V22l-8 3.5-8-3.5-8 3.5V7z"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M11 3.5V25M19 7v15"
        stroke="rgba(180,210,255,0.3)"
        strokeWidth="1.2"
        strokeDasharray="2.5 2.5"
      />
    </svg>
  )
}

function TasksIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="4"
        y="3"
        width="20"
        height="22"
        rx="3"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
      />
      <circle cx="8.5" cy="10" r="1.5" fill="rgba(77,217,232,0.8)" />
      <circle cx="8.5" cy="15" r="1.5" fill="rgba(77,217,232,0.8)" />
      <circle cx="8.5" cy="20" r="1.5" fill="rgba(77,217,232,0.4)" />
      <path
        d="M12 10h9M12 15h9M12 20h6"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

const items = [
  {
    icon: <PostOrdersIcon />,
    title: "Post Orders",
    sub: "Site Rules & Standing Orders",
  },
  { icon: <RadioIcon />, title: "Radio", sub: "Site Comms & Live Dispatch" },
  { icon: <MapIcon />, title: "Site Map", sub: "Interactive Layout & Routes" },
  { icon: <TasksIcon />, title: "Tasks", sub: "Open/Pending Duties" },
]

export default function FeatureRows({
  onNavigateKB,
  onNavigateRadio,
  onNavigateSiteStatus,
  onNavigateTasks,
  onNavigateMap,
}: Props) {
  return (
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Full-width alert row */}
      <div
        onClick={onNavigateSiteStatus}
        style={{
          ...tile,
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          borderColor: "rgba(255,165,0,0.2)",
          background: "rgba(255,165,0,0.05)",
          cursor: "pointer",
          padding: "12px 14px",
        }}
      >
        <div
          style={{
            ...iconWrap,
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "rgba(255,165,0,0.1)",
            border: "1px solid rgba(255,165,0,0.2)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect
              x="2"
              y="5"
              width="18"
              height="13"
              rx="2.5"
              stroke="rgba(255,180,50,0.8)"
              strokeWidth="1.5"
            />
            <path
              d="M6 9h5M6 12.5h8"
              stroke="rgba(255,180,50,0.8)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M15 8l2.5 3-2.5 3"
              stroke="rgba(77,217,232,0.7)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "rgba(220,235,255,0.9)",
              letterSpacing: "-0.1px",
            }}
          >
            Site Status & Operations
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1L10 10H1L5.5 1Z"
                stroke="rgba(255,165,0,0.9)"
                strokeWidth="1.2"
                fill="rgba(255,165,0,0.15)"
                strokeLinejoin="round"
              />
              <line
                x1="5.5"
                y1="4.5"
                x2="5.5"
                y2="7"
                stroke="rgba(255,165,0,0.9)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="5.5" cy="8.5" r="0.5" fill="rgba(255,165,0,0.9)" />
            </svg>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "11px",
                color: "rgba(255,165,0,0.8)",
              }}
            >
              UPDATE: Loading dock access code changed.
            </span>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4l4 4-4 4"
            stroke="rgba(180,200,255,0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2×2 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "1fr",
          gap: "8px",
        }}
      >
        {items.map(({ icon, title, sub }) => (
          <div
            key={title}
            style={tile}
            onClick={
              title === "Post Orders"
                ? onNavigateKB
                : title === "Radio"
                  ? onNavigateRadio
                  : title === "Tasks"
                    ? onNavigateTasks
                    : title === "Site Map"
                      ? onNavigateMap
                      : undefined
            }
          >
            <div style={iconWrap}>{icon}</div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "rgba(220,235,255,0.9)",
                  letterSpacing: "-0.1px",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "rgba(180,200,255,0.48)",
                  lineHeight: 1.35,
                }}
              >
                {sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
