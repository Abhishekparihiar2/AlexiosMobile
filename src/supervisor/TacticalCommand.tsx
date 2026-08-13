import { useState } from "react"

export default function TacticalCommand() {
  const [active, setActive] = useState(false)

  return (
    <div
      style={{
        position: "absolute",
        bottom: "14px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        padding: "1.5px",
        borderRadius: "40px",
        background: active
          ? "linear-gradient(90deg, #3A7BFF 0%, #5599FF 100%)"
          : "linear-gradient(90deg, rgba(58,123,255,0.75) 0%, rgba(85,153,255,0.75) 100%)",
        boxShadow: active
          ? "0 0 28px rgba(58,123,255,0.5), 0 0 56px rgba(85,153,255,0.3)"
          : "0 0 18px rgba(58,123,255,0.35), 0 0 36px rgba(85,153,255,0.2)",
        transition: "all 0.2s ease",
      }}
    >
      <button
        onClick={() => setActive((v) => !v)}
        style={{
          padding: "10px 18px 10px 10px",
          borderRadius: "38px",
          border: "none",
          background: active ? "rgba(8,16,32,0.9)" : "rgba(10,18,34,0.93)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          transition: "background 0.15s ease",
          whiteSpace: "nowrap",
        }}
      >
        {/* Mic circle */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            flexShrink: 0,
            background: active
              ? "linear-gradient(135deg, rgba(58,123,255,0.3) 0%, rgba(85,153,255,0.22) 100%)"
              : "linear-gradient(135deg, rgba(58,123,255,0.18) 0%, rgba(85,153,255,0.12) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
            <rect
              x="5.5"
              y="1"
              width="7"
              height="11"
              rx="3.5"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M2 9.5C2 13.09 5.13 16 9 16C12.87 16 16 13.09 16 9.5"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="9"
              y1="16"
              x2="9"
              y2="19"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="19"
              x2="12"
              y2="19"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Label */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              color: "#FFFFFF",
              lineHeight: 1.25,
            }}
          >
            Tactical Command
          </span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              color: active
                ? "rgba(85,153,255,0.85)"
                : "rgba(180,200,255,0.45)",
              transition: "color 0.15s ease",
            }}
          >
            {active ? "Listening · Tap to stop" : "Tap to engage"}
          </span>
        </div>

        {/* Right indicator */}
        {active ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              height: "14px",
              marginLeft: "4px",
            }}
          >
            {[0.5, 0.9, 1, 0.7, 0.5].map((h, i) => (
              <div
                key={i}
                className="audio-bar"
                style={{
                  width: "2px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(180deg, #5599FF 0%, rgba(58,123,255,0.6) 100%)",
                  transformOrigin: "bottom center",
                  height: `${h * 13}px`,
                  animationDelay: `${i * 0.13}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 18 18"
            fill="none"
            style={{ marginLeft: "2px" }}
          >
            <circle
              cx="9"
              cy="9"
              r="8"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <path
              d="M7 6l3 3-3 3"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
