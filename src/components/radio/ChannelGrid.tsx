import type { CSSProperties } from "react"
import { ChannelId } from "./data"

interface Props {
  activeChannelId: ChannelId
  onChange: (id: ChannelId) => void
}

const tile: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "14px",
  padding: "14px 12px",
  display: "flex",
  flexDirection: "column",
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

function IconUser() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle
        cx="14"
        cy="9.5"
        r="4.5"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 24c0-5.25 4.25-8.5 9.5-8.5s9.5 3.25 9.5 8.5"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 3L4 7.5V14c0 6.1 4.2 11.8 10 13.2C19.8 25.8 24 20.1 24 14V7.5L14 3z"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 14l3 3 5.5-5.5"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMegaphone() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M20.5 9.5C22.2 10.8 23.3 12.3 23.3 14c0 1.7-1.1 3.2-2.8 4.5"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 18H5a2.5 2.5 0 01-2.5-2.5v-3A2.5 2.5 0 015 10h1.5L14 6v16L6.5 18z"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <line
        x1="10.5"
        y1="22"
        x2="10.5"
        y2="26"
        stroke="rgba(180,210,255,0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconAlert() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 3L26 25H2L14 3Z"
        stroke="rgba(255,80,80,0.85)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <line
        x1="14"
        y1="11"
        x2="14"
        y2="17.5"
        stroke="rgba(255,80,80,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="14" cy="20.5" r="1.2" fill="rgba(255,80,80,0.85)" />
    </svg>
  )
}

const channels = [
  {
    id: "dispatch" as ChannelId,
    icon: <IconUser />,
    title: "Call Officer",
    sub: "SGT. MILLER · OFC. DAVIS",
    tag: "2 ACTIVE ON DUTY",
    tagColor: "#4DD9E8",
    tagBg: "rgba(77,217,232,0.08)",
    tagBorder: "rgba(77,217,232,0.22)",
    activeBorder: "rgba(77,217,232,0.35)",
    activeBg: "rgba(77,217,232,0.06)",
    activeGlow: "0 0 18px rgba(77,217,232,0.12)",
    activeIconBg: "rgba(77,217,232,0.1)",
    activeIconBorder: "rgba(77,217,232,0.25)",
  },
  {
    id: "supervisor" as ChannelId,
    icon: <IconShield />,
    title: "Call Supervisor",
    sub: "SGT. WILLIAMS",
    tag: "ESCALATION",
    tagColor: "#4A8FFF",
    tagBg: "rgba(74,143,255,0.1)",
    tagBorder: "rgba(74,143,255,0.25)",
    activeBorder: "rgba(74,143,255,0.35)",
    activeBg: "rgba(74,143,255,0.06)",
    activeGlow: "0 0 16px rgba(74,143,255,0.12)",
    activeIconBg: "rgba(74,143,255,0.12)",
    activeIconBorder: "rgba(74,143,255,0.25)",
  },
  {
    id: "tactical" as ChannelId,
    icon: <IconMegaphone />,
    title: "Call Site Team",
    sub: "ALL UNITS",
    tag: "BROADCAST",
    tagColor: "rgba(180,200,255,0.75)",
    tagBg: "rgba(180,200,255,0.06)",
    tagBorder: "rgba(180,200,255,0.18)",
    activeBorder: "rgba(180,200,255,0.25)",
    activeBg: "rgba(180,200,255,0.04)",
    activeGlow: "none",
    activeIconBg: "rgba(180,200,255,0.08)",
    activeIconBorder: "rgba(180,200,255,0.2)",
  },
  {
    id: "sos" as ChannelId,
    icon: <IconAlert />,
    title: "Emergency SOS",
    sub: "DIRECT TO DISPATCH",
    tag: "PRIORITY OVERRIDE",
    tagColor: "#FF6060",
    tagBg: "rgba(255,50,50,0.1)",
    tagBorder: "rgba(255,60,60,0.28)",
    activeBorder: "rgba(255,60,60,0.45)",
    activeBg: "rgba(255,40,40,0.06)",
    activeGlow: "0 0 18px rgba(255,50,50,0.14)",
    activeIconBg: "rgba(255,50,50,0.1)",
    activeIconBorder: "rgba(255,60,60,0.25)",
    pulse: true,
  },
]

export default function ChannelGrid({ activeChannelId, onChange }: Props) {
  return (
    <div
      style={{
        padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
      }}
    >
      {channels.map((ch) => {
        const isActive = activeChannelId === ch.id
        return (
          <div
            key={ch.id}
            onClick={() => onChange(ch.id)}
            style={{
              ...tile,
              border: `1px solid ${
                isActive ? ch.activeBorder : "rgba(255,255,255,0.09)"
              }`,
              background: isActive ? ch.activeBg : "rgba(255,255,255,0.05)",
              boxShadow:
                isActive && ch.activeGlow !== "none"
                  ? ch.activeGlow
                  : undefined,
              animation:
                ch.pulse && isActive
                  ? "pulse-dot 2.5s ease-in-out infinite"
                  : undefined,
              transition: "border-color 0.2s ease, background 0.2s ease",
            }}
          >
            <div
              style={{
                ...iconWrap,
                background: isActive ? ch.activeIconBg : "rgba(77,143,255,0.1)",
                border: `1px solid ${
                  isActive ? ch.activeIconBorder : "rgba(180,200,255,0.14)"
                }`,
              }}
            >
              {ch.icon}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
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
                {ch.title}
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(130,155,200,0.55)",
                  letterSpacing: "0.3px",
                  lineHeight: 1.3,
                }}
              >
                {ch.sub}
              </span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "2px 7px",
                borderRadius: "5px",
                background: ch.tagBg,
                border: `1px solid ${ch.tagBorder}`,
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  fontWeight: 600,
                  color: ch.tagColor,
                  letterSpacing: "0.8px",
                }}
              >
                {ch.tag}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
