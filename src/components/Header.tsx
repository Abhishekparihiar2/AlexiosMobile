export default function Header({ onSOS, onChatClick }: { onSOS?: () => void, onChatClick?: () => void }) {
  return (
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Brand row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: SOS panic button */}
        <button
          onClick={onSOS}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#D32F2F",
            border: "1.5px solid rgba(255,80,80,0.5)",
            boxShadow:
              "0 0 12px rgba(211,47,47,0.55), 0 0 24px rgba(211,47,47,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: "10px",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
            }}
          >
            SOS
          </span>
        </button>

        {/* Center: splash-logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/alexios-latest.png"
              alt="Alexios"
              style={{
                height: "20px",
                mixBlendMode: "screen",
                objectFit: "contain"
              }}
            />
          </div>

          {/* Officer identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                color: "rgba(200,215,255,0.65)",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              Officer Michael
            </span>
            <div
              style={{
                width: "1px",
                height: "9px",
                background: "rgba(180,200,255,0.2)",
              }}
            />
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 400,
                fontSize: "11px",
                color: "rgba(180,200,255,0.42)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Sample Site
            </span>
          </div>
        </div>

        {/* Right: Chat/Message button */}
        <button
          onClick={onChatClick}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="rgba(180,200,255,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(61,255,160,0.06)",
          border: "1px solid rgba(61,255,160,0.16)",
          borderRadius: "8px",
          padding: "7px 12px",
        }}
      >
        {/* ACTIVE pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(61,255,160,0.18)",
            border: "1px solid rgba(61,255,160,0.35)",
            borderRadius: "5px",
            padding: "2px 8px",
            flexShrink: 0,
          }}
        >
          <div
            className="pulse-dot"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#3DFFA0",
              boxShadow: "0 0 6px rgba(61,255,160,0.9)",
            }}
          />
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              fontWeight: 600,
              color: "#3DFFA0",
              letterSpacing: "1px",
            }}
          >
            ACTIVE
          </span>
        </div>

        {/* Animated audio bars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            height: "12px",
            flexShrink: 0,
          }}
        >
          {[0.5, 0.85, 1, 0.7, 0.45].map((h, i) => (
            <div
              key={i}
              className="audio-bar"
              style={{
                width: "2px",
                height: `${h * 11}px`,
                borderRadius: "2px",
                background: "#4DD9E8",
                transformOrigin: "bottom center",
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(180,200,255,0.75)",
            letterSpacing: "0.2px",
          }}
        >
          EarTeam Earpiece (SAVOX) Connected
        </span>
      </div>
    </div>
  )
}
