export default function AlexiosInsightCard() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "2px",
        overflow: "hidden",
        boxShadow:
          "0 0 40px rgba(77,217,232,0.2), 0 0 80px rgba(130,80,255,0.1), 0 4px 32px rgba(10,20,50,0.55)",
      }}
    >
      {/* Spinning cyan→purple border */}
      <div
        style={{
          position: "absolute",
          top: "-100%",
          right: "-100%",
          bottom: "-100%",
          left: "-100%",
          background:
            "conic-gradient(from 0deg, #00CFFF, #4A8FFF, #8B5CF6, #C084FC, #8B5CF6, #4A8FFF, #00CFFF)",
          animation: "border-spin 8s linear infinite",
        }}
      />

      {/* Inner glass panel */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "18px",
          background: "rgba(10,17,32,0.9)",
          backdropFilter: "blur(25px) saturate(140%)",
          WebkitBackdropFilter: "blur(25px) saturate(140%)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              flexShrink: 0,
              background: "rgba(77,217,232,0.1)",
              border: "1px solid rgba(77,217,232,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(77,217,232,0.2)",
            }}
          >
            <svg width="16" height="18" viewBox="0 0 20 23" fill="none">
              <path
                d="M10 1L1 5V11.5C1 16.85 5 21.6 10 23C15 21.6 19 16.85 19 11.5V5L10 1Z"
                fill="rgba(77,217,232,0.12)"
                stroke="#4DD9E8"
                strokeWidth="1.4"
              />
              <path
                d="M7 11.5L9.2 13.5L13.5 9"
                stroke="#4DD9E8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                fontWeight: 700,
                color: "rgba(77,217,232,0.7)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Alexios Co-Pilot Status Insights
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                color: "rgba(130,155,200,0.4)",
                letterSpacing: "1.5px",
                marginTop: "2px",
              }}
            >
              AI-GENERATED · REAL-TIME
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(180,200,255,0.07)" }} />

        {/* Blockquote */}
        <p
          style={{
            margin: 0,
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(200,220,255,0.85)",
            lineHeight: 1.75,
            letterSpacing: "0.1px",
          }}
        >
          "Site structural perimeter is currently stable. Automated tour cadence
          is running on schedule with 33% completion. No critical security
          incidents reported within the last 12 hours."
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
                fontSize: "8px",
                color: "#3DFFA0",
                letterSpacing: "1px",
              }}
            >
              CONFIDENCE: HIGH
            </span>
          </div>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              color: "rgba(130,155,200,0.4)",
              letterSpacing: "0.8px",
            }}
          >
            Generated · 09:41
          </span>
        </div>
      </div>
    </div>
  )
}

