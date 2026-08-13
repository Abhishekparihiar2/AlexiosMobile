export default function WarningBanner() {
  return (
    <div
      style={{
        background: "rgba(255,165,0,0.07)",
        border: "1px solid rgba(255,165,0,0.25)",
        borderRadius: "14px",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scan-line shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "40%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,165,0,0.06), transparent)",
            animation: "scan-line 3s linear infinite",
          }}
        />
      </div>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            flexShrink: 0,
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        >
          <path
            d="M8 1.5L14.5 14H1.5L8 1.5Z"
            stroke="#FFA500"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="rgba(255,165,0,0.15)"
          />
          <line
            x1="8"
            y1="6"
            x2="8"
            y2="9.5"
            stroke="#FFA500"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="8" cy="11.5" r="0.8" fill="#FFA500" />
        </svg>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "10px",
            fontWeight: 700,
            color: "#FFA500",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Critical Active Warnings
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,165,0,0.15)" }} />

      {/* Bullet */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "10px",
            color: "rgba(255,165,0,0.6)",
            flexShrink: 0,
            lineHeight: 1.5,
          }}
        >
          •
        </span>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "10px",
            color: "rgba(255,165,0,0.8)",
            lineHeight: 1.55,
            letterSpacing: "0.2px",
          }}
        >
          Gate C Maglock Offline — Maintenance Ticket #2041 Pending
        </span>
      </div>
    </div>
  )
}
