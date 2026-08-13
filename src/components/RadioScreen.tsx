import { useState } from "react"
import { channels, ChannelId } from "./radio/data"
import ChannelSelector from "./radio/ChannelSelector"
import TransmissionHub from "./radio/TransmissionHub"
import ChannelGrid from "./radio/ChannelGrid"
import DispatchFeed from "./radio/DispatchFeed"

interface Props {
  onBack: () => void
}

export default function RadioScreen({ onBack }: Props) {
  const [activeChannelId, setActiveChannelId] = useState<ChannelId>("dispatch")
  const activeChannel = channels.find((c) => c.id === activeChannelId)!

  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        flexShrink: 0,
        position: "relative",
        borderRadius: "54px",
        overflow: "hidden",
        outline: "9px solid rgba(30,40,60,0.95)",
        outlineOffset: "0px",
        boxShadow:
          "0 0 0 1px rgba(180,200,255,0.08), 0 0 0 10px rgba(180,200,255,0.06), 0 50px 100px rgba(0,0,0,0.9), 0 0 80px rgba(0,100,255,0.07)",
      }}
    >
      {/* ── Canvas background ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `
          radial-gradient(ellipse at 18% 0%,   rgba(74,143,255,0.13) 0%, transparent 45%),
          radial-gradient(ellipse at 82% 12%,  rgba(77,217,232,0.07) 0%, transparent 38%),
          radial-gradient(ellipse at 50% 100%, rgba(58,123,255,0.09) 0%, transparent 48%),
          linear-gradient(175deg, #0D1525 0%, #0B111E 40%, #090E1A 100%)
        `,
        }}
      />

      {/* ── Grid overlay ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `
          linear-gradient(rgba(180,200,255,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,200,255,0.022) 1px, transparent 1px)
        `,
          backgroundSize: "22px 22px",
          pointerEvents: "none",
        }}
      />

      {/* ── Dynamic Island ── */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "126px",
          height: "36px",
          background: "#000",
          borderRadius: "20px",
          zIndex: 20,
        }}
      />

      {/* ── Status bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "58px",
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "0 28px 6px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.2px",
          }}
        >
          9:41
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
              height: "11px",
            }}
          >
            {[5, 7, 9, 11].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: `${h}px`,
                  borderRadius: "1px",
                  background:
                    i < 3 ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path
              d="M7 8.5L7 10.5"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M4.5 7C5.1 6.4 5.9 6 7 6s1.9.4 2.5 1"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M2 4.8C3.5 3.1 5.1 2.2 7 2.2s3.5.9 5 2.6"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            <div
              style={{
                width: "22px",
                height: "11px",
                borderRadius: "3px",
                border: "1px solid rgba(255,255,255,0.45)",
                padding: "2px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "72%",
                  borderRadius: "1px",
                  background: "rgba(255,255,255,0.88)",
                }}
              />
            </div>
            <div
              style={{
                width: "2px",
                height: "5px",
                background: "rgba(255,255,255,0.45)",
                borderRadius: "0 1px 1px 0",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div
        style={{
          position: "absolute",
          top: "58px",
          left: 0,
          right: 0,
          bottom: "104px",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          paddingTop: "4px",
          paddingBottom: "12px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 16px 4px",
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              flexShrink: 0,
              border: "1px solid rgba(180,200,255,0.14)",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path
                d="M8.5 15.5L1.5 8.5L8.5 1.5"
                stroke="rgba(180,200,255,0.85)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
                letterSpacing: "-0.2px",
              }}
            >
              Radio & Live Dispatch
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(130,155,200,0.5)",
                letterSpacing: "2px",
                marginTop: "2px",
              }}
            >
              SECURE VOICE SESSION
            </div>
          </div>

          {/* Signal badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexShrink: 0,
              padding: "5px 10px",
              borderRadius: "10px",
              border: "1px solid rgba(61,255,160,0.2)",
              background: "rgba(61,255,160,0.06)",
            }}
          >
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
                fontSize: "9px",
                fontWeight: 600,
                color: "#3DFFA0",
                letterSpacing: "0.8px",
              }}
            >
              28ms
            </span>
          </div>
        </div>

        {/* Channel Selector */}
        <ChannelSelector
          active={activeChannelId}
          onChange={setActiveChannelId}
        />

        {/* Live Transmission Hub */}
        <TransmissionHub channel={activeChannel} />

        {/* Channel Grid */}
        <ChannelGrid
          activeChannelId={activeChannelId}
          onChange={setActiveChannelId}
        />

        {/* Dispatch Feed */}
        <DispatchFeed activeChannelId={activeChannelId} />
      </div>

      {/* ── Persistent bottom bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "rgba(14,22,40,0.82)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(180,200,255,0.1)",
            borderRadius: "22px",
            margin: "0 12px",
            padding: "8px 4px",
            display: "flex",
            boxShadow:
              "0 4px 32px rgba(10,20,50,0.55), 0 0 24px rgba(74,143,255,0.1)",
          }}
        >
          {[
            { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", label: "Home" },
            {
              d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
              label: "Reports",
            },
            {
              d: "M3 3h7v7H3zM13 3h7v7h-7zM3 13h7v7H3zM13 13h7v7h-7z",
              label: "Ops",
              active: true,
            },
            {
              d: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
              label: "Search",
            },
            {
              d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
              label: "Profile",
            },
          ].map((item) => {
            const active = !!item.active
            return (
              <button
                key={item.label}
                onClick={
                  item.label === "Home" || item.label === "Ops"
                    ? onBack
                    : undefined
                }
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  background: active ? "rgba(77,217,232,0.08)" : "transparent",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  padding: "7px 2px",
                  position: "relative",
                }}
              >
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#4DD9E8",
                      boxShadow: "0 0 6px rgba(77,217,232,0.9)",
                    }}
                  />
                )}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={active ? "#4DD9E8" : "rgba(180,200,255,0.4)"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.d} />
                </svg>
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    letterSpacing: "0.2px",
                    color: active ? "#4DD9E8" : "rgba(130,155,200,0.45)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Home indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
            paddingTop: "5px",
            background: "rgba(9,14,26,0.6)",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "5px",
              borderRadius: "3px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
