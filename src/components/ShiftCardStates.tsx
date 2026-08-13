interface CardConfig {
  glow: string
  glowOuter: string
  borderColor: string
  title: string
  titleColor: string
  sub: string
  subColor: string
  badge?: string
  badgeColor?: string
  badgeBg?: string
  label: string
  labelColor: string
  icon: React.ReactNode
}

const states: CardConfig[] = [
  {
    label: "STATE 1",
    labelColor: "rgba(74,143,255,0.7)",
    glow: "0 0 40px rgba(0,100,255,0.55), 0 0 80px rgba(0,60,220,0.28), 0 0 120px rgba(0,40,180,0.14)",
    glowOuter: "rgba(0,100,255,0.2)",
    borderColor: "rgba(80,160,255,0.35)",
    title: "Next Shift",
    titleColor: "#FFFFFF",
    sub: "08:00 — Tower B",
    subColor: "rgba(180,200,240,0.6)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle
          cx="18"
          cy="18"
          r="13"
          stroke="rgba(74,143,255,0.5)"
          strokeWidth="1.5"
        />
        <path
          d="M18 10v8l5 5"
          stroke="#4A8FFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="18" r="2" fill="rgba(74,143,255,0.3)" />
      </svg>
    ),
  },
  {
    label: "STATE 2",
    labelColor: "rgba(40,230,100,0.7)",
    glow: "0 0 40px rgba(0,230,80,0.6), 0 0 80px rgba(0,200,60,0.3), 0 0 120px rgba(0,160,40,0.15)",
    glowOuter: "rgba(0,220,80,0.18)",
    borderColor: "rgba(60,255,130,0.35)",
    title: "CLOCK IN NOW",
    titleColor: "#FFFFFF",
    sub: "Shift window is now open.",
    subColor: "rgba(80,220,130,0.7)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle
          cx="18"
          cy="18"
          r="13"
          stroke="rgba(40,230,100,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M13 18l4 4 7-8"
          stroke="#28E664"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "STATE 3",
    labelColor: "rgba(230,50,50,0.75)",
    glow: "0 0 40px rgba(220,30,30,0.65), 0 0 80px rgba(200,20,20,0.32), 0 0 120px rgba(180,10,10,0.16)",
    glowOuter: "rgba(220,30,30,0.18)",
    borderColor: "rgba(255,80,80,0.35)",
    title: "CLOCK IN NOW",
    titleColor: "#FFFFFF",
    sub: "LATE: 12 MIN",
    subColor: "#FF4444",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle
          cx="18"
          cy="18"
          r="13"
          stroke="rgba(220,50,50,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M18 12v7"
          stroke="#FF4444"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="23.5" r="1.4" fill="#FF4444" />
      </svg>
    ),
  },
]

export default function ShiftCardStates() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#040A14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
        fontFamily: "Space Grotesk, sans-serif",
        position: "relative",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `
          linear-gradient(rgba(180,200,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,200,255,0.03) 1px, transparent 1px)
        `,
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,10,20,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(74,143,255,0.08)",
            border: "1px solid rgba(74,143,255,0.2)",
            borderRadius: "6px",
            padding: "4px 12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#4DD9E8",
              boxShadow: "0 0 6px rgba(77,217,232,0.9)",
            }}
          />
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              fontWeight: 500,
              color: "rgba(77,217,232,0.8)",
              letterSpacing: "2px",
            }}
          >
            ALEXIOS · SHIFT CARD · COMPONENT STATES
          </span>
        </div>
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 300,
            fontSize: "13px",
            color: "rgba(180,200,255,0.4)",
            letterSpacing: "0.3px",
          }}
        >
          Conditional UI logic — 3 contextual states
        </div>
      </div>

      {/* Cards row */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        {states.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* State label */}
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                fontWeight: 500,
                color: s.labelColor,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </span>

            {/* Card */}
            <div
              style={{
                width: "160px",
                borderRadius: "20px",
                padding: "2px",
                background: "transparent",
                boxShadow: s.glow,
                position: "relative",
              }}
            >
              {/* Outer ambient fill */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-12px",
                  bottom: "-12px",
                  left: "-12px",
                  borderRadius: "30px",
                  background: s.glowOuter,
                  filter: "blur(18px)",
                  zIndex: 0,
                }}
              />

              {/* Glass card */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "18px",
                  background: "rgba(12,20,40,0.78)",
                  backdropFilter: "blur(32px) saturate(150%)",
                  WebkitBackdropFilter: "blur(32px) saturate(150%)",
                  border: `1px solid ${s.borderColor}`,
                  padding: "28px 20px 26px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                  textAlign: "center",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${s.borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.icon}
                </div>

                {/* Title + sub */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: s.titleColor,
                      letterSpacing: i === 0 ? "-0.2px" : "0.5px",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    style={{
                      fontFamily:
                        i === 2
                          ? "DM Mono, monospace"
                          : "Space Grotesk, sans-serif",
                      fontWeight: i === 2 ? 600 : 400,
                      fontSize: i === 2 ? "11px" : "12px",
                      color: s.subColor,
                      letterSpacing: i === 2 ? "1.5px" : "0.1px",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.sub}
                  </span>
                </div>

                {/* Bottom status strip */}
                <div
                  style={{
                    width: "100%",
                    paddingTop: "12px",
                    borderTop: `1px solid ${s.borderColor.replace("0.35", "0.15")}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background:
                        i === 0 ? "#4A8FFF" : i === 1 ? "#28E664" : "#FF4444",
                      boxShadow: `0 0 6px ${
                        i === 0
                          ? "rgba(74,143,255,0.9)"
                          : i === 1
                            ? "rgba(40,230,100,0.9)"
                            : "rgba(255,68,68,0.9)"
                      }`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      fontWeight: 500,
                      color:
                        i === 0
                          ? "rgba(74,143,255,0.7)"
                          : i === 1
                            ? "rgba(40,230,100,0.7)"
                            : "rgba(255,68,68,0.7)",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {i === 0 ? "UPCOMING" : i === 1 ? "WINDOW OPEN" : "OVERDUE"}
                  </span>
                </div>
              </div>
            </div>

            {/* State description */}
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                color: "rgba(130,155,200,0.45)",
                letterSpacing: "0.2px",
                textAlign: "center",
                maxWidth: "130px",
                lineHeight: 1.5,
              }}
            >
              {i === 0
                ? "Normal upcoming shift"
                : i === 1
                  ? "Ready to clock in"
                  : "Late shift alert"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

