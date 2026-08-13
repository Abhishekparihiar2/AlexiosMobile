const SIZE = 100
const CX = 50
const CY = 50
const R = 40
const STROKE = 12
const CIRCUMFERENCE = 2 * Math.PI * R
const PROGRESS = 4 / 12

export default function ActiveTourCard() {
  const offset = CIRCUMFERENCE * (1 - PROGRESS)
  const capAngle = PROGRESS * 360 - 90
  const capX = CX + R * Math.cos((capAngle * Math.PI) / 180)
  const capY = CY + R * Math.sin((capAngle * Math.PI) / 180)

  return (
    <div
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          padding: "2px",
          overflow: "hidden",
          boxShadow:
            "0 0 40px rgba(58,123,255,0.3), 0 0 80px rgba(0,80,255,0.14), 0 4px 32px rgba(10,20,50,0.55)",
        }}
      >
        {/* Spinning border */}
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
            zIndex: 0,
          }}
        />

        {/* Inner glass card */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: "18px",
            background: "rgba(10,17,32,0.88)",
            backdropFilter: "blur(25px) saturate(140%)",
            WebkitBackdropFilter: "blur(25px) saturate(140%)",
            padding: "14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Left: Progress ring */}
          <div
            style={{
              position: "relative",
              flexShrink: 0,
              filter:
                "drop-shadow(0 0 14px rgba(0,120,255,0.5)) drop-shadow(0 0 6px rgba(0,200,255,0.3))",
            }}
          >
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
              <defs>
                <linearGradient
                  id="tourRingGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#00EAFF" />
                  <stop offset="100%" stopColor="#0055FF" />
                </linearGradient>
                <filter
                  id="tourCapGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Track */}
              <circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="rgba(180,200,255,0.07)"
                strokeWidth={STROKE}
              />

              {/* Progress arc */}
              <circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="url(#tourRingGrad)"
                strokeWidth={STROKE}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${CX} ${CY})`}
              />

              {/* Leading cap */}
              <circle
                cx={capX}
                cy={capY}
                r={STROKE / 2 - 1}
                fill="#00EAFF"
                filter="url(#tourCapGlow)"
              />
            </svg>

            {/* Center text */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: SIZE,
                height: SIZE,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "2px" }}
              >
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  4
                </span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "rgba(180,200,255,0.5)",
                    lineHeight: 1,
                  }}
                >
                  /12
                </span>
              </div>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(130,155,200,0.55)",
                  letterSpacing: "2px",
                }}
              >
                Completed
              </span>
            </div>
          </div>

          {/* Right: Info block */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {/* Location */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "3px",
                }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path
                    d="M6 1C3.79 1 2 2.79 2 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z"
                    fill="rgba(77,217,232,0.7)"
                  />
                  <circle cx="6" cy="5" r="1.5" fill="rgba(10,17,32,0.8)" />
                </svg>
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    color: "rgba(77,217,232,0.7)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Active Post
                </span>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "rgba(220,235,255,0.9)",
                  letterSpacing: "-0.1px",
                }}
              >
                Tower B (Floor 4–22)
              </div>
            </div>

            {/* Next checkpoint */}
            <div
              style={{
                borderLeft: "2px solid rgba(77,217,232,0.4)",
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(130,155,200,0.5)",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Next Checkpoint
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#FFFFFF",
                  letterSpacing: "-0.1px",
                }}
              >
                Loading Dock Door
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: "3px",
                borderRadius: "99px",
                background: "rgba(180,200,255,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "33%",
                  background:
                    "linear-gradient(90deg, #0055FF 0%, #00EAFF 100%)",
                  boxShadow: "0 0 8px rgba(0,180,255,0.6)",
                  borderRadius: "99px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
