import { useState } from "react"
import { Channel } from "./data"

interface Props {
  channel: Channel
}

export default function TransmissionHub({ channel }: Props) {
  const [transmitting, setTransmitting] = useState(false)

  const isEmergency = !!channel.emergency

  const borderGradient = isEmergency
    ? "conic-gradient(from 0deg, #880000, #FF3333, #FF6644, #FF3333, #660000, #FF3333, #880000)"
    : "conic-gradient(from 0deg, #0033FF, #0088FF, #00CFFF, #0055FF, #0022CC, #0088FF, #0033FF)"

  const glowColor = isEmergency
    ? "rgba(255,60,60,0.3)"
    : "rgba(58,123,255,0.28)"
  const accentColor = isEmergency ? "#FF5555" : "#4DD9E8"
  const btnBorderIdle = isEmergency
    ? "rgba(255,80,80,0.22)"
    : "rgba(180,200,255,0.14)"
  const btnBgIdle = isEmergency
    ? "rgba(255,50,50,0.08)"
    : "rgba(77,143,255,0.1)"
  const btnBorderActive = isEmergency ? "#FF5555" : "rgba(77,217,232,0.6)"
  const btnBgActive = isEmergency
    ? "rgba(255,60,60,0.22)"
    : "rgba(74,143,255,0.22)"
  const btnGlow = isEmergency
    ? "0 0 24px rgba(255,60,60,0.35)"
    : "0 0 24px rgba(77,217,232,0.3)"
  const statusColor = isEmergency ? "#FF6060" : "#3DFFA0"
  const statusGlow = isEmergency
    ? "rgba(255,80,80,0.9)"
    : "rgba(61,255,160,0.9)"
  const statusText = isEmergency ? "⚠ EMERGENCY CHANNEL" : "SESSION ACTIVE"

  return (
    <div style={{ padding: "0 16px" }}>
      {/* Rotating border wrapper */}
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          padding: "2px",
          overflow: "hidden",
          boxShadow: `0 0 40px ${glowColor}, 0 0 80px rgba(0,80,255,0.1), 0 4px 32px rgba(10,20,50,0.55)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100%",
            right: "-100%",
            bottom: "-100%",
            left: "-100%",
            background: borderGradient,
            animation: "border-spin 6s linear infinite",
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
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Status + latency row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: statusColor,
                  boxShadow: `0 0 8px ${statusGlow}`,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: statusColor,
                  letterSpacing: "1.8px",
                }}
              >
                {statusText}
              </span>
            </div>
            <div
              style={{
                padding: "3px 9px",
                borderRadius: "6px",
                background: "rgba(180,200,255,0.06)",
                border: "1px solid rgba(180,200,255,0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(130,155,200,0.6)",
                  letterSpacing: "0.8px",
                }}
              >
                {channel.label}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ height: "1px", background: "rgba(180,200,255,0.07)" }}
          />

          {/* Transmitter row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                flexShrink: 0,
                background: "rgba(77,143,255,0.1)",
                border: "1px solid rgba(180,200,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: accentColor,
                  letterSpacing: "0.5px",
                }}
              >
                DC
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "rgba(220,235,255,0.9)",
                  letterSpacing: "-0.1px",
                }}
              >
                Dispatch Center
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(130,155,200,0.55)",
                  letterSpacing: "0.8px",
                  marginTop: "2px",
                }}
              >
                ACTIVE TRANSMITTER
              </div>
            </div>

            {/* Audio equalizer bars */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "3px",
                height: "20px",
              }}
            >
              {[0.5, 0.9, 1, 0.7, 0.5].map((scale, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: `${scale * 20}px`,
                    borderRadius: "2px",
                    background: `linear-gradient(180deg, ${accentColor} 0%, rgba(74,143,255,0.5) 100%)`,
                    transformOrigin: "bottom",
                    animation: transmitting
                      ? `audio-bar 0.8s ease-in-out ${i * 0.13}s infinite`
                      : "none",
                    transform: transmitting ? "none" : "scaleY(0.25)",
                    opacity: transmitting ? 1 : 0.3,
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ height: "1px", background: "rgba(180,200,255,0.07)" }}
          />

          {/* PTT Button */}
          <button
            onMouseDown={() => setTransmitting(true)}
            onMouseUp={() => setTransmitting(false)}
            onMouseLeave={() => setTransmitting(false)}
            onTouchStart={(e) => {
              e.preventDefault()
              setTransmitting(true)
            }}
            onTouchEnd={() => setTransmitting(false)}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "50px",
              cursor: "pointer",
              border: `1px solid ${
                transmitting ? btnBorderActive : btnBorderIdle
              }`,
              background: transmitting ? btnBgActive : btnBgIdle,
              boxShadow: transmitting ? btnGlow : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "all 0.15s ease",
              userSelect: "none",
            }}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <rect
                x="5"
                y="1"
                width="8"
                height="13"
                rx="4"
                stroke={transmitting ? accentColor : "rgba(180,210,255,0.7)"}
                strokeWidth="1.7"
              />
              <path
                d="M1 10C1 14.97 4.58 18 9 18C13.42 18 17 14.97 17 10"
                stroke={transmitting ? accentColor : "rgba(180,210,255,0.7)"}
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <line
                x1="9"
                y1="18"
                x2="9"
                y2="22"
                stroke={transmitting ? accentColor : "rgba(180,210,255,0.7)"}
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <line
                x1="5.5"
                y1="22"
                x2="12.5"
                y2="22"
                stroke={transmitting ? accentColor : "rgba(180,210,255,0.7)"}
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: transmitting ? accentColor : "rgba(180,210,255,0.75)",
              }}
            >
              {transmitting ? "TRANSMITTING…" : "HOLD TO TRANSMIT"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
