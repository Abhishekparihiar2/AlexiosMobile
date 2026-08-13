type Filter = "all" | "access" | "fire"

interface Props {
  activeFloor: number
  activeFilter: Filter
}

// Isometric transform: converts grid coords (u=right-axis, v=depth-axis) to SVG screen coords
// Origin is the "front-left" corner of the floor plate
// Right-axis vector: (0.866, 0.5), Depth-axis (back) vector: (-0.866, 0.5)
function iso(
  originX: number,
  originY: number,
  u: number,
  v: number,
): [number, number] {
  return [originX + u * 0.866 + v * -0.866, originY + u * 0.5 + v * 0.5]
}

// Floor dimensions in isometric units
const FLOOR_W = 150 // right-axis width
const FLOOR_D = 100 // depth-axis depth
const SLAB_H = 30 // screen-pixel height of slab side walls

// Each floor's origin (front-left corner) in screen pixels, from bottom to top
const FLOORS: Record<number, [number, number]> = {
  3: [95, 232],
  4: [95, 178],
  5: [95, 124],
}

// Build parallelogram points for a floor's top face
function topFace(ox: number, oy: number) {
  const fl = [ox, oy]
  const fr = iso(ox, oy, FLOOR_W, 0)
  const br = iso(ox, oy, FLOOR_W, FLOOR_D)
  const bl = iso(ox, oy, 0, FLOOR_D)
  return `${fl[0]},${fl[1]} ${fr[0]},${fr[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]}`
}

// Left face (front-left side wall going down)
function leftFace(ox: number, oy: number) {
  const tl = [ox, oy]
  const bl2 = iso(ox, oy, 0, FLOOR_D)
  return `${tl[0]},${tl[1]} ${bl2[0]},${bl2[1]} ${bl2[0]},${bl2[1] + SLAB_H} ${tl[0]},${tl[1] + SLAB_H}`
}

// Right face (front-right side wall going down)
function rightFace(ox: number, oy: number) {
  const tl = [ox, oy]
  const fr = iso(ox, oy, FLOOR_W, 0)
  return `${tl[0]},${tl[1]} ${fr[0]},${fr[1]} ${fr[0]},${fr[1] + SLAB_H} ${tl[0]},${tl[1] + SLAB_H}`
}

// Asset positions: [u, v] in iso grid units on floor 4
const DOORS = [
  { u: 20, v: 10, label: "Gate A" },
  { u: 90, v: 5, label: "Stairwell" },
  { u: 130, v: 55, label: "Loading Dock" },
]
const FIRES = [
  { u: 50, v: 40, label: "FE-1" },
  { u: 110, v: 80, label: "Alarm" },
]
const ALERT = { u: 130, v: 55 } // overlaps Loading Dock door

// Room lines: pairs of [u,v] points for interior walls on a floor
const ROOM_LINES: Array<[[number, number], [number, number]]> = [
  [
    [0, 50],
    [FLOOR_W, 50],
  ],
  [
    [75, 0],
    [75, 100],
  ],
  [
    [0, 80],
    [75, 80],
  ],
]

interface FloorData {
  floorNum: number
  origin: [number, number]
  active: boolean
}

function FloorSlab({ floorNum, origin: [ox, oy], active }: FloorData) {
  const fillColor = active ? "rgba(77,217,232,0.07)" : "rgba(180,200,255,0.025)"
  const strokeColor = active
    ? "rgba(77,217,232,0.55)"
    : "rgba(180,200,255,0.11)"
  const strokeW = active ? 1.5 : 1
  const leftFill = active ? "rgba(77,217,232,0.05)" : "rgba(10,17,32,0.55)"
  const rightFill = active ? "rgba(77,217,232,0.03)" : "rgba(14,20,36,0.5)"

  // Floor label position
  const labelPt = iso(ox, oy, FLOOR_W / 2, FLOOR_D / 2)

  return (
    <g>
      {/* Side walls */}
      <polygon
        points={leftFace(ox, oy)}
        fill={leftFill}
        stroke="rgba(180,200,255,0.08)"
        strokeWidth="0.8"
      />
      <polygon
        points={rightFace(ox, oy)}
        fill={rightFill}
        stroke="rgba(180,200,255,0.06)"
        strokeWidth="0.8"
      />

      {/* Top face */}
      <polygon
        points={topFace(ox, oy)}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeW}
        filter={active ? "url(#floorGlow)" : undefined}
      />

      {/* Interior grid lines */}
      {ROOM_LINES.map(([[u1, v1], [u2, v2]], i) => {
        const [x1, y1] = iso(ox, oy, u1, v1)
        const [x2, y2] = iso(ox, oy, u2, v2)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={active ? "rgba(77,217,232,0.09)" : "rgba(180,200,255,0.05)"}
            strokeWidth="0.7"
          />
        )
      })}

      {/* Floor number label */}
      <text
        x={labelPt[0]}
        y={labelPt[1]}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="DM Mono, monospace"
        fontSize="9"
        fontWeight={active ? 700 : 400}
        fill={active ? "rgba(77,217,232,0.65)" : "rgba(180,200,255,0.2)"}
        letterSpacing="2"
      >
        FLOOR {floorNum}
      </text>
    </g>
  )
}

function AssetMarkers({
  origin: [ox, oy],
  activeFilter,
}: {
  origin: [number, number]
  activeFilter: Filter
}) {
  const showAccess = activeFilter === "all" || activeFilter === "access"
  const showFire = activeFilter === "all" || activeFilter === "fire"

  return (
    <g>
      {/* Door markers */}
      {showAccess &&
        DOORS.map(({ u, v, label }, i) => {
          const [sx, sy] = iso(ox, oy, u, v)
          const isAlert = i === 2
          return (
            <g key={`door-${i}`}>
              {/* Glow ring */}
              <rect
                x={sx - 6}
                y={sy - 6}
                width="12"
                height="12"
                rx="2"
                fill="rgba(77,217,232,0.06)"
                stroke="rgba(77,217,232,0.3)"
                strokeWidth="0.8"
              />
              {/* Core */}
              <rect
                x={sx - 4}
                y={sy - 4}
                width="8"
                height="8"
                rx="1.5"
                fill="rgba(77,217,232,0.85)"
              />
              {/* Label */}
              <text
                x={sx}
                y={sy + 12}
                textAnchor="middle"
                fontFamily="DM Mono, monospace"
                fontSize="7"
                fill="rgba(77,217,232,0.7)"
                letterSpacing="0.3"
              >
                {label}
              </text>
            </g>
          )
        })}

      {/* Fire markers */}
      {showFire &&
        FIRES.map(({ u, v, label }, i) => {
          const [sx, sy] = iso(ox, oy, u, v)
          return (
            <g key={`fire-${i}`}>
              <circle
                cx={sx}
                cy={sy}
                r="7"
                fill="rgba(255,165,0,0.07)"
                stroke="rgba(255,165,0,0.3)"
                strokeWidth="0.8"
              />
              <circle cx={sx} cy={sy} r="4.5" fill="rgba(255,165,0,0.85)" />
              <text
                x={sx}
                y={sy + 14}
                textAnchor="middle"
                fontFamily="DM Mono, monospace"
                fontSize="7"
                fill="rgba(255,165,0,0.7)"
                letterSpacing="0.3"
              >
                {label}
              </text>
            </g>
          )
        })}

      {/* Alert flag at loading dock */}
      {(() => {
        const { u, v } = ALERT
        const [sx, sy] = iso(ox, oy, u, v)
        return (
          <g>
            {/* Pulse ring */}
            <circle
              cx={sx}
              cy={sy - 16}
              r="8"
              fill="rgba(255,68,68,0.08)"
              stroke="rgba(255,68,68,0.45)"
              strokeWidth="0.8"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            {/* Triangle warning */}
            <polygon
              points={`${sx},${sy - 22} ${sx + 6},${sy - 11} ${sx - 6},${sy - 11}`}
              fill="rgba(255,68,68,0.9)"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <text
              x={sx + 2}
              y={sy - 15}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="DM Mono, monospace"
              fontSize="5"
              fill="#fff"
              fontWeight="700"
            >
              !
            </text>
          </g>
        )
      })()}
    </g>
  )
}

export default function ThreeDViewport({ activeFloor, activeFilter }: Props) {
  const activOrigin = FLOORS[activeFloor] ?? FLOORS[4]

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(180,200,255,0.08)",
        borderRadius: "18px",
        overflow: "hidden",
        height: "300px",
      }}
    >
      {/* Blueprint scan line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "30%",
          background:
            "linear-gradient(90deg, transparent, rgba(77,217,232,0.025), transparent)",
          animation: "scan-line 4s linear infinite",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <svg
        width="100%"
        height="300"
        viewBox="0 0 361 300"
        style={{ display: "block" }}
      >
        <defs>
          <filter id="floorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="alertGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render floors bottom to top (painter's algorithm) */}
        {[3, 4, 5].map((f) => {
          const origin = FLOORS[f]
          if (!origin) return null
          return (
            <FloorSlab
              key={f}
              floorNum={f}
              origin={origin}
              active={f === activeFloor}
            />
          )
        })}

        {/* Asset markers on active floor */}
        <AssetMarkers origin={activOrigin} activeFilter={activeFilter} />
      </svg>

      {/* Corner label */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "16px",
          fontFamily: "DM Mono, monospace",
          fontSize: "9px",
          fontWeight: 700,
          color: "rgba(77,217,232,0.5)",
          letterSpacing: "2px",
          pointerEvents: "none",
        }}
      >
        TOWER B
      </div>
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "16px",
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          color: "rgba(130,155,200,0.3)",
          letterSpacing: "1.5px",
          pointerEvents: "none",
        }}
      >
        ISOMETRIC SCHEMATIC
      </div>

      {/* Live indicator */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "64px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "5px",
            height: "5px",
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
            color: "rgba(61,255,160,0.7)",
            letterSpacing: "1px",
          }}
        >
          LIVE
        </span>
      </div>
    </div>
  )
}
