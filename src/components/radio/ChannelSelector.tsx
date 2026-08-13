import { channels, ChannelId } from "./data"

interface Props {
  active: ChannelId
  onChange: (id: ChannelId) => void
}

export default function ChannelSelector({ active, onChange }: Props) {
  return (
    <div style={{ padding: "0 16px", display: "flex", gap: "6px" }}>
      {channels.map((ch) => {
        const isActive = active === ch.id
        const isEmergency = ch.emergency

        return (
          <button
            key={ch.id}
            onClick={() => onChange(ch.id)}
            style={{
              flex: 1,
              height: "38px",
              borderRadius: "10px",
              border: `1px solid ${
                isActive ? ch.color + "66" : "rgba(180,200,255,0.1)"
              }`,
              background: isActive
                ? isEmergency
                  ? "rgba(255,68,68,0.14)"
                  : "rgba(77,143,255,0.12)"
                : "rgba(255,255,255,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              boxShadow:
                isActive && isEmergency
                  ? "0 0 14px rgba(255,60,60,0.2)"
                  : isActive
                    ? "0 0 12px rgba(77,217,232,0.12)"
                    : "none",
              transition: "all 0.18s ease",
              animation:
                isActive && isEmergency
                  ? "pulse-dot 2s ease-in-out infinite"
                  : "none",
            }}
          >
            {isEmergency && (
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path
                  d="M4.5 1L8.5 8H0.5L4.5 1Z"
                  fill={isActive ? "#FF4444" : "rgba(255,80,80,0.45)"}
                />
              </svg>
            )}
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8.5px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? ch.color : "rgba(130,155,200,0.5)",
                letterSpacing: "0.8px",
                whiteSpace: "nowrap",
              }}
            >
              {ch.shortLabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}
