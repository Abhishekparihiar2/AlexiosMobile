interface LogEvent {
  time: string
  message: string
  dotColor: string
  dotGlow: string
  label: string
  labelColor: string
}

const events: LogEvent[] = [
  {
    time: "11:42 AM",
    message: "Gate A BLE Beacon Verified",
    dotColor: "#3DFFA0",
    dotGlow: "rgba(61,255,160,0.6)",
    label: "VERIFIED",
    labelColor: "rgba(61,255,160,0.7)",
  },
  {
    time: "11:15 AM",
    message: "Perimeter Check Complete",
    dotColor: "#B8CCEE",
    dotGlow: "rgba(184,204,238,0.4)",
    label: "COMPLETE",
    labelColor: "rgba(184,204,238,0.6)",
  },
  {
    time: "10:30 AM",
    message: "Shift Started & System Armed",
    dotColor: "#4A8FFF",
    dotGlow: "rgba(74,143,255,0.6)",
    label: "ARMED",
    labelColor: "rgba(74,143,255,0.8)",
  },
]

export default function EventFeed() {
  return (
    <section
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            fontWeight: 500,
            color: "rgba(130,155,200,0.6)",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
          }}
        >
          Real-Time Log Timeline
        </span>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8.5px",
            fontWeight: 400,
            color: "rgba(77,217,232,0.5)",
            letterSpacing: "0.5px",
          }}
        >
          LIVE · <span style={{ color: "rgba(77,217,232,0.8)" }}>3 events</span>
        </span>
      </div>

      {/* Event rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {events.map((evt, i) => (
          <div
            key={i}
            className="glass-panel-subtle"
            style={{
              borderRadius: "14px",
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Left accent line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "20%",
                bottom: "20%",
                width: "2px",
                borderRadius: "1px",
                background: evt.dotColor,
                boxShadow: `0 0 6px ${evt.dotGlow}`,
                opacity: 0.7,
              }}
            />

            {/* Status dot */}
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: evt.dotColor,
                boxShadow: `0 0 10px ${evt.dotGlow}`,
                flexShrink: 0,
                marginLeft: "4px",
              }}
              className={i === 0 ? "pulse-dot" : undefined}
            />

            {/* Text content */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "rgba(130,155,200,0.65)",
                    letterSpacing: "0.3px",
                  }}
                >
                  {evt.time}
                </span>
                <div
                  style={{
                    height: "1px",
                    width: "14px",
                    background: "rgba(180,200,255,0.15)",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(220,235,255,0.88)",
                  letterSpacing: "-0.1px",
                  lineHeight: 1.3,
                }}
              >
                {evt.message}
              </span>
            </div>

            {/* Status badge */}
            <div
              style={{
                padding: "3px 8px",
                borderRadius: "6px",
                background: `${evt.dotColor}14`,
                border: `1px solid ${evt.dotColor}30`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  fontWeight: 500,
                  color: evt.labelColor,
                  letterSpacing: "0.8px",
                }}
              >
                {evt.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
