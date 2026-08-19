import type { CSSProperties } from "react"

interface Props {
  onBack: () => void
}

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
}

const iconWrap: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "11px",
  background: "rgba(77,143,255,0.1)",
  border: "1px solid rgba(180,200,255,0.14)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
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

function IconFolder() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M2 5.5C2 4.4 2.9 3.5 4 3.5H8.5L10.5 5.5H18C19.1 5.5 20 6.4 20 7.5V16.5C20 17.6 19.1 18.5 18 18.5H4C2.9 18.5 2 17.6 2 16.5V5.5Z"
        stroke="rgba(77,217,232,0.75)"
        strokeWidth="1.5"
        fill="rgba(77,217,232,0.07)"
      />
      <path
        d="M6 12l2 2 4-4"
        stroke="rgba(77,217,232,0.9)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconBarChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="3"
        y="13"
        width="4"
        height="6"
        rx="1"
        fill="rgba(74,143,255,0.6)"
      />
      <rect
        x="9"
        y="9"
        width="4"
        height="10"
        rx="1"
        fill="rgba(74,143,255,0.8)"
      />
      <rect
        x="15"
        y="5"
        width="4"
        height="14"
        rx="1"
        fill="rgba(74,143,255,0.95)"
      />
      <line
        x1="2"
        y1="19.5"
        x2="20"
        y2="19.5"
        stroke="rgba(180,200,255,0.3)"
        strokeWidth="1"
      />
    </svg>
  )
}

function IconShieldCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M11 2L3 5.5V11C3 15.4 6.5 19.5 11 21C15.5 19.5 19 15.4 19 11V5.5L11 2Z"
        stroke="rgba(61,255,160,0.8)"
        strokeWidth="1.5"
        fill="rgba(61,255,160,0.06)"
      />
      <path
        d="M7.5 11L9.8 13.3L14.5 8.5"
        stroke="rgba(61,255,160,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="4"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke="rgba(180,200,255,0.6)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 4V3a3 3 0 016 0v1"
        stroke="rgba(180,200,255,0.6)"
        strokeWidth="1.4"
      />
      <circle cx="7.5" cy="10" r="1.2" fill="rgba(180,200,255,0.55)" />
      <circle cx="7.5" cy="14.5" r="1.2" fill="rgba(180,200,255,0.35)" />
      <line
        x1="10.5"
        y1="10"
        x2="16"
        y2="10"
        stroke="rgba(180,200,255,0.5)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="10.5"
        y1="14.5"
        x2="14"
        y2="14.5"
        stroke="rgba(180,200,255,0.35)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPerson() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle
        cx="11"
        cy="7"
        r="4"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M3 20C3 16.13 6.58 13 11 13C15.42 13 19 16.13 19 20"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function IconGear() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle
        cx="11"
        cy="11"
        r="3"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M11 2v2M11 18v2M2 11h2M18 11h2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42"
        stroke="rgba(180,200,255,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const gridTiles = [
  {
    icon: <IconFolder />,
    title: "COMPLIANCE DOCS",
    bullets: ["Certifications: Valid", "Next Expiry: Guard Card (42d)"],
    badge: {
      label: "100% VALID",
      color: "#4DD9E8",
      bg: "rgba(77,217,232,0.08)",
      border: "rgba(77,217,232,0.22)",
    },
    iconBg: "rgba(77,217,232,0.08)",
    iconBorder: "rgba(77,217,232,0.2)",
  },
  {
    icon: <IconBarChart />,
    title: "ACTIVITY SESSIONS",
    bullets: ["14 Active Shifts", "148 Hours Logged"],
    badge: {
      label: "NOMINAL",
      color: "#4A8FFF",
      bg: "rgba(74,143,255,0.1)",
      border: "rgba(74,143,255,0.25)",
    },
    iconBg: "rgba(74,143,255,0.1)",
    iconBorder: "rgba(74,143,255,0.2)",
  },
  {
    icon: <IconShieldCheck />,
    title: "DISCIPLINARY STATUS",
    bullets: ["Active Points: 0", "Next Roll-off: 0 Pts Pending"],
    badge: {
      label: "STANDING: EXCELLENT",
      color: "#3DFFA0",
      bg: "rgba(61,255,160,0.08)",
      border: "rgba(61,255,160,0.22)",
    },
    iconBg: "rgba(61,255,160,0.07)",
    iconBorder: "rgba(61,255,160,0.2)",
  },
  {
    icon: <IconClipboard />,
    title: "INCIDENT WRITE-UPS",
    bullets: ["Formal Incidents: 0"],
    badge: {
      label: "CLEAR",
      color: "rgba(130,155,200,0.7)",
      bg: "rgba(180,200,255,0.05)",
      border: "rgba(180,200,255,0.12)",
    },
    iconBg: "rgba(77,143,255,0.07)",
    iconBorder: "rgba(180,200,255,0.14)",
  },
]

const utilityRows = [
  {
    icon: <IconPerson />,
    title: "Personal Information",
    sub: "Title, Email, Contact Info, Birthday",
    iconBg: "rgba(77,143,255,0.1)",
    iconBorder: "rgba(180,200,255,0.14)",
  },
  {
    icon: <IconGear />,
    title: "Application Settings",
    sub: "Hardware Links, Audio Tuning, System Alerts",
    iconBg: "rgba(77,143,255,0.1)",
    iconBorder: "rgba(180,200,255,0.14)",
  },
]

export default function ProfileScreen({ onBack }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingTop: "4px",
        paddingBottom: "104px",
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
            flexShrink: 0,
            border: "1px solid rgba(180,200,255,0.14)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path
              d="M8.5 15.5L1.5 8.5L8.5 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
            OFFICER PROFILE
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
            SECURE PERSONNEL HUB
          </div>
        </div>
        <div style={{ width: "38px", flexShrink: 0 }} />
      </div>

      {/* Avatar / Hero */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          padding: "4px 16px 8px",
        }}
      >
        {/* Spinning ring avatar */}
        <div
          style={{
            position: "relative",
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            padding: "3px",
            overflow: "hidden",
            boxShadow:
              "0 0 24px rgba(77,217,232,0.25), 0 0 48px rgba(77,217,232,0.08)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100%",
              right: "-100%",
              bottom: "-100%",
              left: "-100%",
              background:
                "conic-gradient(from 0deg, #00CFFF, #4A8FFF, #00CFFF)",
              animation: "border-spin 6s linear infinite",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "rgba(10,17,32,0.92)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "26px",
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
              }}
            >
              ML
            </span>
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: "#FFFFFF",
            letterSpacing: "-0.3px",
            marginTop: "4px",
          }}
        >
          MICHAEL LAMBROS
        </div>

        {/* Since */}
        <div
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "10px",
            color: "rgba(130,155,200,0.5)",
            letterSpacing: "1px",
          }}
        >
          Security Officer Since:{" "}
          <span style={{ color: "rgba(77,217,232,0.7)" }}>Feb 15, 2026</span>
        </div>

        {/* Active duty pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            borderRadius: "99px",
            background: "rgba(61,255,160,0.07)",
            border: "1px solid rgba(61,255,160,0.22)",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#3DFFA0",
              boxShadow: "0 0 6px rgba(61,255,160,0.8)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              fontWeight: 700,
              color: "#3DFFA0",
              letterSpacing: "1.5px",
            }}
          >
            ACTIVE DUTY
          </span>
        </div>
      </div>

      {/* 2×2 Compliance Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          padding: "0 16px",
        }}
      >
        {gridTiles.map((t) => (
          <div key={t.title} style={tile}>
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
                fontSize: "10px",
                color: "rgba(220,235,255,0.9)",
                letterSpacing: "0.4px",
                lineHeight: 1.2,
                textTransform: "uppercase",
              }}
            >
              {t.title}
            </span>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              {t.bullets.map((b) => (
                <Bullet key={b} text={b} />
              ))}
            </div>
            <Badge {...t.badge} />
          </div>
        ))}
      </div>

      {/* Utility action rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "0 16px",
        }}
      >
        {utilityRows.map((r) => (
          <div
            key={r.title}
            style={{
              ...tile,
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                ...iconWrap,
                background: r.iconBg,
                border: `1px solid ${r.iconBorder}`,
              }}
            >
              {r.icon}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
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
                {r.title}
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  color: "rgba(130,155,200,0.45)",
                  letterSpacing: "0.1px",
                }}
              >
                {r.sub}
              </span>
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
        ))}
      </div>
    </div>
  )
}
