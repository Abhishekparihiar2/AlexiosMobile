import { useState } from "react"

export default function CoPilotButton() {
  const [active, setActive] = useState(false)

  return (
    <div style={{ padding: "0 16px" }}>
      {/* Outer glow wrapper */}
      <div
        style={{
          borderRadius: "50px",
          padding: "2px",
          background: active
            ? "linear-gradient(90deg, #3A7BFF 0%, #00E5A0 100%)"
            : "linear-gradient(90deg, rgba(58,123,255,0.8) 0%, rgba(0,229,160,0.8) 100%)",
          boxShadow: active
            ? "0 0 32px rgba(58,123,255,0.55), 0 0 64px rgba(0,229,160,0.35), 0 0 16px rgba(58,123,255,0.4)"
            : "0 0 24px rgba(58,123,255,0.45), 0 0 48px rgba(0,229,160,0.28), 0 0 12px rgba(58,123,255,0.3)",
          transition: "all 0.2s ease",
        }}
      >
        <button
          onClick={() => setActive((prev) => !prev)}
          style={{
            width: "100%",
            padding: "15px 20px",
            borderRadius: "48px",
            border: "none",
            background: active ? "rgba(8,16,32,0.88)" : "rgba(10,18,34,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            transition: "background 0.15s ease",
          }}
        >
          {/* Microphone circle */}
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: active
                ? "linear-gradient(135deg, rgba(58,123,255,0.35) 0%, rgba(0,229,160,0.25) 100%)"
                : "linear-gradient(135deg, rgba(58,123,255,0.2) 0%, rgba(0,229,160,0.15) 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.15s ease",
            }}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#FFFFFF",
                letterSpacing: "-0.1px",
                lineHeight: 1.2,
              }}
            >
              Tactical CoPilot
            </span>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 400,
                fontSize: "11px",
                color: active ? "rgba(0,229,160,0.8)" : "rgba(180,200,255,0.5)",
                letterSpacing: "0.2px",
                transition: "color 0.15s ease",
              }}
            >
              {active ? "Listening · Tap to Stop" : "Tap to Engage"}
            </span>
          </div>

          {/* Right indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {active ? (
              /* Audio wave when active */
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2.5px",
                  height: "18px",
                }}
              >
                {[0.5, 0.9, 1, 0.7, 0.5].map((h, i) => (
                  <div
                    key={i}
                    className="audio-bar"
                    style={{
                      width: "2.5px",
                      height: `${h * 16}px`,
                      borderRadius: "2px",
                      background:
                        "linear-gradient(180deg, #00E5A0 0%, rgba(58,123,255,0.6) 100%)",
                      transformOrigin: "bottom center",
                      animationDelay: `${i * 0.13}s`,
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Subtle arrow at rest */
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="8"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
                <path
                  d="M7 6l3 3-3 3"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
