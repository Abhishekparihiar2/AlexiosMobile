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
        width: "393px",
        height: "852px",
        flexShrink: 0,
        position: "relative",
        borderRadius: "54px",
        overflow: "hidden",
        outline: "9px solid rgba(30,40,60,0.95)",
        outlineOffset: "0px",
        boxShadow:
          "0 0 0 1px rgba(180,200,255,0.08), 0 0 0 10px rgba(180,200,255,0.06), 0 50px 100px rgba(0,0,0,0.9), 0 0 80px rgba(0,100,255,0.07)",
      }}
    >
      {/* Canvas background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `
          radial-gradient(ellipse at 18% 0%,   rgba(74,143,255,0.13) 0%, transparent 45%),
          radial-gradient(ellipse at 82% 12%,  rgba(77,217,232,0.07) 0%, transparent 38%),
          radial-gradient(ellipse at 50% 100%, rgba(58,123,255,0.09) 0%, transparent 48%),
          linear-gradient(175deg, #0D1525 0%, #0B111E 40%, #090E1A 100%)
        `,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `
          linear-gradient(rgba(180,200,255,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,200,255,0.022) 1px, transparent 1px)
        `,
          backgroundSize: "22px 22px",
          pointerEvents: "none",
        }}
      />

      {/* Dynamic Island */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "126px",
          height: "36px",
          background: "#000",
          borderRadius: "20px",
          zIndex: 20,
        }}
      />

      {/* Status bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "58px",
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "0 28px 6px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.2px",
          }}
        >
          9:41
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
              height: "11px",
            }}
          >
            {[5, 7, 9, 11].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: `${h}px`,
                  borderRadius: "1px",
                  background:
                    i < 3 ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path
              d="M7 8.5L7 10.5"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M4.5 7C5.1 6.4 5.9 6 7 6s1.9.4 2.5 1"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M2 4.8C3.5 3.1 5.1 2.2 7 2.2s3.5.9 5 2.6"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            <div
              style={{
                width: "22px",
                height: "11px",
                borderRadius: "3px",
                border: "1px solid rgba(255,255,255,0.45)",
                padding: "2px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "72%",
                  borderRadius: "1px",
                  background: "rgba(255,255,255,0.88)",
                }}
              />
            </div>
            <div
              style={{
                width: "2px",
                height: "5px",
                background: "rgba(255,255,255,0.45)",
                borderRadius: "0 1px 1px 0",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          position: "absolute",
          top: "58px",
          left: 0,
          right: 0,
          bottom: "104px",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingTop: "4px",
          paddingBottom: "12px",
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
                stroke="rgba(180,200,255,0.85)"
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

      {/* NavBar — Profile tab active */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "rgba(14,22,40,0.82)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(180,200,255,0.1)",
            borderRadius: "22px",
            margin: "0 12px",
            padding: "8px 4px",
            display: "flex",
            boxShadow:
              "0 4px 32px rgba(10,20,50,0.55), 0 0 24px rgba(74,143,255,0.1)",
          }}
        >
          {[
            { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", label: "Home" },
            {
              d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
              label: "Reports",
            },
            {
              d: "M3 3h7v7H3zM13 3h7v7h-7zM3 13h7v7H3zM13 13h7v7h-7z",
              label: "Ops",
            },
            {
              d: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
              label: "Search",
            },
            {
              d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
              label: "Profile",
              active: true,
            },
          ].map((item) => {
            const active = !!item.active
            return (
              <button
                key={item.label}
                onClick={
                  item.label === "Home" || item.label === "Ops"
                    ? onBack
                    : undefined
                }
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  background: active ? "rgba(77,217,232,0.08)" : "transparent",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  padding: "7px 2px",
                  position: "relative",
                }}
              >
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#4DD9E8",
                      boxShadow: "0 0 6px rgba(77,217,232,0.9)",
                    }}
                  />
                )}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={active ? "#4DD9E8" : "rgba(180,200,255,0.4)"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.d} />
                </svg>
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    letterSpacing: "0.2px",
                    color: active ? "#4DD9E8" : "rgba(130,155,200,0.45)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
            paddingTop: "5px",
            background: "rgba(9,14,26,0.6)",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "5px",
              borderRadius: "3px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
