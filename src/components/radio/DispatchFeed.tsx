import { mockFeed, channels, ChannelId, DispatchEntry } from "./data"

interface Props {
  activeChannelId: ChannelId
}

const typeStyle: Record<DispatchEntry["type"], {
  color: string
  bg: string
  border: string
  label: string
}> = {
  dispatch: {
    color: "#4DD9E8",
    bg: "rgba(77,217,232,0.08)",
    border: "rgba(77,217,232,0.22)",
    label: "DISPATCH",
  },
  unit: {
    color: "rgba(180,200,255,0.75)",
    bg: "rgba(180,200,255,0.05)",
    border: "rgba(180,200,255,0.15)",
    label: "UNIT",
  },
  alert: {
    color: "#FFA500",
    bg: "rgba(255,165,0,0.08)",
    border: "rgba(255,165,0,0.25)",
    label: "ALERT",
  },
  system: {
    color: "rgba(180,200,255,0.6)",
    bg: "rgba(180,200,255,0.04)",
    border: "rgba(180,200,255,0.12)",
    label: "SYSTEM",
  },
}

export default function DispatchFeed({ activeChannelId }: Props) {
  const activeCh = channels.find((c) => c.id === activeChannelId)!

  return (
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            fontWeight: 500,
            color: "rgba(130,155,200,0.45)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Dispatch Feed — Chronological
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(180,200,255,0.07)",
          }}
        />
        {/* Active channel indicator */}
        <div
          style={{
            padding: "2px 8px",
            borderRadius: "5px",
            flexShrink: 0,
            background: "rgba(77,143,255,0.1)",
            border: "1px solid rgba(180,200,255,0.14)",
          }}
        >
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              fontWeight: 600,
              color: activeCh.color,
              letterSpacing: "1px",
            }}
          >
            {activeCh.shortLabel}
          </span>
        </div>
      </div>

      {mockFeed.map((entry) => {
        const ch = channels.find((c) => c.id === entry.channelId)!
        const ts = typeStyle[entry.type]

        return (
          <div
            key={entry.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "14px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Meta row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  color: "rgba(130,155,200,0.55)",
                  letterSpacing: "0.5px",
                  flexShrink: 0,
                }}
              >
                {entry.timestamp}
              </span>

              {/* Channel pill */}
              <div
                style={{
                  padding: "2px 7px",
                  borderRadius: "5px",
                  background: "rgba(77,143,255,0.1)",
                  border: "1px solid rgba(180,200,255,0.14)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "8px",
                    fontWeight: 600,
                    color: ch.color,
                    letterSpacing: "1px",
                  }}
                >
                  {ch.shortLabel}
                </span>
              </div>

              {/* Type badge */}
              <div
                style={{
                  padding: "2px 7px",
                  borderRadius: "5px",
                  background: ts.bg,
                  border: `1px solid ${ts.border}`,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "8px",
                    fontWeight: 600,
                    color: ts.color,
                    letterSpacing: "1px",
                  }}
                >
                  {ts.label}
                </span>
              </div>

              {/* Sender — right aligned */}
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: "rgba(220,235,255,0.75)",
                  marginLeft: "auto",
                  flexShrink: 0,
                }}
              >
                {entry.sender}
              </span>
            </div>

            {/* Transcription */}
            <p
              style={{
                margin: 0,
                fontFamily: "DM Mono, monospace",
                fontSize: "11px",
                color: "rgba(180,200,255,0.72)",
                lineHeight: 1.65,
                letterSpacing: "0.1px",
              }}
            >
              "{entry.text}"
            </p>
          </div>
        )
      })}
    </div>
  )
}
