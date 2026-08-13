import type { CSSProperties } from "react"

const panel: CSSProperties = {
  flex: 1,
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "14px",
  padding: "14px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}

function Dot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        marginTop: "2px",
        boxShadow: `0 0 5px ${color}88`,
      }}
    />
  )
}

function BulletRow({ icon, text }: { icon: React.ReactNode text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
      {icon}
      <span
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "10px",
          color: "rgba(200,220,255,0.75)",
          lineHeight: 1.45,
        }}
      >
        {text}
      </span>
    </div>
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
        alignSelf: "flex-start",
        padding: "3px 9px",
        borderRadius: "6px",
        background: bg,
        border: `1px solid ${border}`,
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          fontWeight: 700,
          color,
          letterSpacing: "1.2px",
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function TelemetryGrid() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {/* Left: Internal Systems */}
      <div style={panel}>
        <div
          style={{
            borderLeft: "2px solid rgba(77,217,232,0.4)",
            paddingLeft: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              fontWeight: 700,
              color: "rgba(130,155,200,0.5)",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
            }}
          >
            Internal Systems
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <BulletRow
            icon={<Dot color="#3DFFA0" />}
            text="Security Operations: NOMINAL"
          />
          <BulletRow
            icon={<Dot color="#4A8FFF" />}
            text="Shift Logs: 14 Logged Entries"
          />
          <BulletRow
            icon={<Dot color="#3DFFA0" />}
            text="Device Health: Fully Operational"
          />
        </div>

        <Badge
          label="SECURE"
          color="#4DD9E8"
          bg="rgba(77,217,232,0.08)"
          border="rgba(77,217,232,0.22)"
        />
      </div>

      {/* Right: External Feeds */}
      <div style={panel}>
        <div
          style={{
            borderLeft: "2px solid rgba(255,165,0,0.35)",
            paddingLeft: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              fontWeight: 700,
              color: "rgba(130,155,200,0.5)",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
            }}
          >
            External Feeds
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <BulletRow
            icon={
              <svg
                width="8"
                height="7"
                viewBox="0 0 12 10"
                fill="none"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <path
                  d="M1 7.5C1 5.5 2.5 4 4.5 4C4.8 2.3 6.2 1 8 1C10.2 1 12 2.8 12 5C12 7.2 10.2 9 8 9H3C1.9 9 1 8.1 1 7"
                  stroke="rgba(180,200,255,0.6)"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            }
            text="Weather: Heavy Rain / Wind 18mph"
          />
          <BulletRow
            icon={
              <svg
                width="8"
                height="9"
                viewBox="0 0 12 14"
                fill="none"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <path
                  d="M6 1L1 3.5V7.5C1 10.6 3.2 13.5 6 14C8.8 13.5 11 10.6 11 7.5V3.5L6 1Z"
                  stroke="rgba(255,165,0,0.6)"
                  strokeWidth="1.3"
                  fill="none"
                />
                <path
                  d="M4 7L5.5 8.5L8 6"
                  stroke="rgba(255,165,0,0.7)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            text="Threat Feed: Clear / No Alerts"
          />
        </div>

        <Badge
          label="MONITORING"
          color="#FFA500"
          bg="rgba(255,165,0,0.08)"
          border="rgba(255,165,0,0.25)"
        />
      </div>
    </div>
  )
}
