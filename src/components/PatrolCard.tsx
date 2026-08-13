const TOTAL = 12
const SECURED = 4
const PROGRESS = SECURED / TOTAL

// Ring: outer radius 66, stroke 17 (inner radius 75%)
const R = 66
const STROKE = 17
const CX = 76
const CY = 76
const SIZE = 152
const CIRCUMFERENCE = 2 * Math.PI * R

interface Props {
  onNavigate?: () => void
}

export default function PatrolCard({ onNavigate }: Props) {
  const progressDash = CIRCUMFERENCE * PROGRESS
  const gapDash = CIRCUMFERENCE * (1 - PROGRESS)

  return (
    /* Rotating border wrapper */
    <div
      onClick={onNavigate}
      style={{
        cursor: onNavigate ? "pointer" : undefined,
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: "20px",
        padding: "2px",
        position: "relative",
        overflow: "hidden",
        boxShadow:
          "0 0 40px rgba(58,123,255,0.3), 0 0 80px rgba(0,80,255,0.14), 0 4px 32px rgba(10,20,50,0.55)",
      }}
    >
      {/* Spinning conic gradient */}
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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "18px",
          padding: "18px",
          background: "rgba(10,17,32,0.88)",
          backdropFilter: "blur(25px) saturate(140%)",
          WebkitBackdropFilter: "blur(25px) saturate(140%)",
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            fontWeight: 500,
            color: "rgba(130,155,200,0.55)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Active Tour
        </div>

        {/* Horizontal row: ring left, info right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "0",
          }}
        >
          {/* Progress ring */}
          <div
            style={{
              flexShrink: 0,
              filter:
                "drop-shadow(0 0 14px rgba(0,120,255,0.5)) drop-shadow(0 0 6px rgba(0,200,255,0.3))",
            }}
          >
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              style={{ display: "block" }}
            >
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00EAFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0055FF" stopOpacity="1" />
                </linearGradient>
                <filter
                  id="innerGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feFlood
                    floodColor="#0088FF"
                    floodOpacity="0.35"
                    result="flood"
                  />
                  <feComposite
                    in="flood"
                    in2="SourceGraphic"
                    operator="in"
                    result="shadow"
                  />
                  <feGaussianBlur
                    in="shadow"
                    stdDeviation="4"
                    result="blurredShadow"
                  />
                  <feComposite
                    in="blurredShadow"
                    in2="SourceGraphic"
                    operator="in"
                    result="innerShadow"
                  />
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="1.5"
                    result="ambientBlur"
                  />
                  <feMerge>
                    <feMergeNode in="ambientBlur" />
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode in="innerShadow" />
                  </feMerge>
                </filter>
                <filter
                  id="capGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="2.5"
                    result="blur"
                  />
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

              {/* Tick marks */}
              {Array.from({ length: TOTAL }).map((_, i) => {
                const angle = (i / TOTAL) * 360 - 90
                const rad = (angle * Math.PI) / 180
                const outerR = R + STROKE / 2 + 2
                const innerR = R - STROKE / 2 - 2
                return (
                  <line
                    key={i}
                    x1={CX + Math.cos(rad) * outerR}
                    y1={CY + Math.sin(rad) * outerR}
                    x2={CX + Math.cos(rad) * innerR}
                    y2={CY + Math.sin(rad) * innerR}
                    stroke={
                      i < SECURED
                        ? "rgba(0,234,255,0.45)"
                        : "rgba(180,200,255,0.1)"
                    }
                    strokeWidth="1"
                  />
                )
              })}

              {/* Progress arc */}
              <circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={`${progressDash} ${gapDash}`}
                transform={`rotate(-90 ${CX} ${CY})`}
                filter="url(#innerGlow)"
              />

              {/* Leading cap */}
              {(() => {
                const endAngle = (PROGRESS * 360 - 90) * (Math.PI / 180)
                return (
                  <circle
                    cx={CX + Math.cos(endAngle) * R}
                    cy={CY + Math.sin(endAngle) * R}
                    r={STROKE / 2 - 1}
                    fill="#00EAFF"
                    filter="url(#capGlow)"
                  />
                )
              })()}

              {/* Center text */}
              <text
                x={CX}
                y={CY - 6}
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="800"
                fontSize="26"
                fill="#FFFFFF"
                letterSpacing="-1"
              >
                {SECURED}
              </text>
              <text
                x={CX}
                y={CY + 14}
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="300"
                fontSize="13"
                fill="rgba(180,200,255,0.45)"
              >
                of {TOTAL}
              </text>
              <text
                x={CX}
                y={CY + 30}
                textAnchor="middle"
                fontFamily="DM Mono, monospace"
                fontWeight="400"
                fontSize="8"
                fill="rgba(130,155,200,0.5)"
                letterSpacing="1"
              >
                Completed
              </text>
            </svg>
          </div>

          {/* Right: tour info */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#FFFFFF",
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
              }}
            >
              Tower B<br />
              (Floor 4-22)
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  fontWeight: 500,
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
                  letterSpacing: "-0.2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Loading Dock Door
              </span>
            </div>
            {/* Mini progress bar */}
            <div
              style={{
                height: "3px",
                borderRadius: "99px",
                background: "rgba(180,200,255,0.08)",
                position: "relative",
                overflow: "hidden",
                marginTop: "2px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${PROGRESS * 100}%`,
                  background:
                    "linear-gradient(90deg, #0055FF 0%, #00EAFF 100%)",
                  boxShadow: "0 0 8px rgba(0,180,255,0.6)",
                  borderRadius: "99px",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  color: "rgba(130,155,200,0.4)",
                  letterSpacing: "0.3px",
                }}
              >
                START
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  color: "rgba(0,234,255,0.65)",
                  letterSpacing: "0.3px",
                }}
              >
                {Math.round(PROGRESS * 100)}%
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  color: "rgba(130,155,200,0.4)",
                  letterSpacing: "0.3px",
                }}
              >
                END
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
