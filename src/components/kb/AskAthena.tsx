interface Props {
  onOpen: () => void
}

export default function AskAthena({ onOpen }: Props) {
  return (
    <div
      onClick={onOpen}
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "2px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow:
          "0 0 24px rgba(0,100,255,0.18), 0 4px 32px rgba(5,10,20,0.5)",
      }}
    >
      {/* Spinning gradient border */}
      <div
        style={{
          position: "absolute",
          top: "-100%",
          right: "-100%",
          bottom: "-100%",
          left: "-100%",
          background:
            "conic-gradient(from 0deg, #0033FF, #0088FF, #00CFFF, #0055FF, #0022CC, #0088FF, #0033FF)",
          animation: "border-spin 5s linear infinite",
        }}
      />

      {/* Inner panel */}
      <div
        style={{
          position: "relative",
          borderRadius: "14px",
          background: "rgba(8,14,28,0.92)",
          backdropFilter: "blur(25px) saturate(140%)",
          WebkitBackdropFilter: "blur(25px) saturate(140%)",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "13px",
            flexShrink: 0,
            background: "rgba(74,143,255,0.12)",
            border: "1px solid rgba(74,143,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 14px rgba(74,143,255,0.2)",
          }}
        >
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
            <path
              d="M11 1L1 5.5V13C1 18.8 5 23.5 11 25.5C17 23.5 21 18.8 21 13V5.5L11 1Z"
              fill="rgba(74,143,255,0.15)"
              stroke="#4A8FFF"
              strokeWidth="1.5"
            />
            <path
              d="M7.5 13L10 15.5L15 10"
              stroke="#4DD9E8"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "3px",
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: "#FFFFFF",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Ask Athena
            </span>
            <div
              style={{
                padding: "2px 7px",
                borderRadius: "5px",
                background: "rgba(77,217,232,0.1)",
                border: "1px solid rgba(77,217,232,0.25)",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  fontWeight: 500,
                  color: "#4DD9E8",
                  letterSpacing: "1.5px",
                }}
              >
                AI
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "rgba(180,200,255,0.55)",
              lineHeight: 1.4,
            }}
          >
            Ask anything about your site, SOPs, or post orders…
          </span>
        </div>

        {/* Arrow */}
        <div style={{ flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7H13M13 7L8 2M13 7L8 12"
              stroke="rgba(77,217,232,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
