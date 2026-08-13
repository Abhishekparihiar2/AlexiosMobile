import React, { useState, useRef } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACTIVE_TOURS = [
  {
    id: "TOUR-A",
    name: "Tower B — Floors 4–22",
    officer: "J. Rivera",
    badge: "S-041",
    avatar: "JR",
    done: 4,
    total: 12,
    scheduledStart: "06:30",
    scheduledEnd: "08:30",
    elapsed: "1h 13m",
    nextCheckpoint: "Loading Dock Door",
    status: "active" as const,
  },
  {
    id: "TOUR-B",
    name: "Parking Structure P1",
    officer: "L. Santos",
    badge: "S-024",
    avatar: "LS",
    done: 3,
    total: 10,
    scheduledStart: "06:45",
    scheduledEnd: "08:15",
    elapsed: "1h 22m",
    nextCheckpoint: "Level 3 Stairwell",
    status: "behind" as const,
  },
]

const TASKS = [
  {
    severity: "CRITICAL IMMEDIATE NEED",
    color: "#FF4444",
    glow: "rgba(255,68,68,0.5)",
    cardBg: "rgba(255,68,68,0.04)",
    cardBorder: "1px solid rgba(255,68,68,0.18)",
    pulse: true,
    title:
      "Secure and lock East Perimeter Gate 2 immediately. Unscheduled entry attempt logged.",
    footerTime: "OVERDUE (14m)",
    origin: "Athena AI Engine",
  },
  {
    severity: "IMMINENT COMPLIANCE DEADLINE",
    color: "#FFA500",
    glow: "rgba(255,165,0,0.45)",
    cardBg: "rgba(255,165,0,0.03)",
    cardBorder: "1px solid rgba(255,165,0,0.14)",
    pulse: false,
    title:
      "Verify and log backup generator fuel gauges and ambient room temperature values.",
    footerTime: "Due within 30m",
    origin: "Supervisor Order",
  },
  {
    severity: "ROUTINE COMPLIANCE TASK",
    color: "#5599FF",
    glow: "rgba(85,153,255,0.4)",
    cardBg: "rgba(255,255,255,0.025)",
    cardBorder: "1px solid rgba(85,153,255,0.12)",
    pulse: false,
    title:
      "Conduct visual inspection of main lobby fire extinguishers and exit egress paths.",
    footerTime: "Due by 23:00",
    origin: "Daily Recurring",
  },
]

const TASK_FILTERS = [
  "All Tasks",
  "AI Generated",
  "Daily Routine",
  "Supervisor",
  "Client",
]

const REPORT_TYPES = [
  { label: "Hourly Log", desc: "Routine patrol tracking & perimeter updates" },
  {
    label: "Incident Report",
    desc: "Security breaches, medical emergencies, damage",
  },
  {
    label: "Maintenance Log",
    desc: "Facility faults, hardware, or lock failures",
  },
  { label: "Shift Summary", desc: "Handover summaries & pass-down notes" },
]

const ACTIVITY = [
  {
    id: 1,
    time: "07:43",
    label: "Tour A Completed",
    officer: "J. Rivera",
    color: "#5599FF",
  },
  {
    id: 2,
    time: "07:38",
    label: "Incident Report Submitted",
    officer: "M. Chen",
    color: "#FF4444",
  },
  {
    id: 3,
    time: "07:31",
    label: "Access Denied — Gate B",
    officer: "System",
    color: "#FFA500",
  },
  {
    id: 4,
    time: "07:24",
    label: "Task #T-09 Marked Done",
    officer: "A. Okafor",
    color: "#5599FF",
  },
  {
    id: 5,
    time: "07:18",
    label: "Tour B Behind Schedule",
    officer: "L. Santos",
    color: "#FFA500",
  },
  {
    id: 6,
    time: "07:11",
    label: "Motion — Roof Access",
    officer: "System",
    color: "#FF4444",
  },
]

const PERSONNEL = [
  {
    initials: "JR",
    name: "J. Rivera",
    role: "Patrol",
    status: "active" as const,
    badge: "S-041",
    sector: "Tower B",
  },
  {
    initials: "MC",
    name: "M. Chen",
    role: "Patrol",
    status: "active" as const,
    badge: "S-019",
    sector: "Gate C",
  },
  {
    initials: "TW",
    name: "T. Walker",
    role: "Response",
    status: "behind" as const,
    badge: "S-007",
    sector: "P1 Lot",
  },
  {
    initials: "AO",
    name: "A. Okafor",
    role: "Patrol",
    status: "active" as const,
    badge: "S-031",
    sector: "Lobby",
  },
  {
    initials: "DP",
    name: "D. Park",
    role: "Patrol",
    status: "active" as const,
    badge: "S-055",
    sector: "Roof",
  },
  {
    initials: "LS",
    name: "L. Santos",
    role: "Patrol",
    status: "behind" as const,
    badge: "S-024",
    sector: "P1 L3",
  },
]

const DISPATCH_LOG = [
  {
    time: "07:43",
    type: "Tour",
    msg: "Tower B Tour A completed — J. Rivera",
    color: "#5599FF",
  },
  {
    time: "07:38",
    type: "Report",
    msg: "Incident report filed — Gate C maglock",
    color: "#FF4444",
  },
  {
    time: "07:31",
    type: "Access",
    msg: "Access denied: unauth badge @ East Gate 2",
    color: "#FFA500",
  },
  {
    time: "07:24",
    type: "Task",
    msg: "Task #T-09 marked done — A. Okafor",
    color: "#5599FF",
  },
  {
    time: "07:11",
    type: "Motion",
    msg: "Motion detected — Roof access stairwell",
    color: "#FF4444",
  },
  {
    time: "06:59",
    type: "Tour",
    msg: "P1 Tour B started — L. Santos",
    color: "#5599FF",
  },
]

// ─── Grid types ───────────────────────────────────────────────────────────────

type ModuleKey = "active-tours" | "live-activity" | "field-reporting" | "quick-access" | "tasks" | "live-map" | "personnel" | "dispatch" | "incidents"

interface GridMod {
  id: ModuleKey
  col: number // 0–2
  row: number // 0–1
  colSpan: 1 | 2
  rowSpan: 1 | 2
}

const MODULE_LABELS: Record<ModuleKey, string> = {
  "active-tours": "Active Tours",
  "live-activity": "Live Activity",
  "field-reporting": "Field Reporting",
  "quick-access": "Quick Access",
  tasks: "Tasks",
  "live-map": "Live Map",
  personnel: "Personnel",
  dispatch: "Dispatch Log",
  incidents: "Incident Summary",
}

const INIT_GRID: GridMod[] = [
  { id: "active-tours", col: 0, row: 0, colSpan: 1, rowSpan: 1 },
  { id: "live-activity", col: 1, row: 0, colSpan: 1, rowSpan: 1 },
  { id: "field-reporting", col: 2, row: 0, colSpan: 1, rowSpan: 1 },
  { id: "quick-access", col: 0, row: 1, colSpan: 1, rowSpan: 1 },
  { id: "tasks", col: 1, row: 1, colSpan: 1, rowSpan: 1 },
  { id: "live-map", col: 2, row: 1, colSpan: 1, rowSpan: 1 },
]

const INIT_PALETTE: ModuleKey[] = ["personnel", "dispatch", "incidents"]

// ─── Grid helpers ─────────────────────────────────────────────────────────────

function getOccupied(mods: GridMod[], exclude?: string): Set<string> {
  const s = new Set<string>()
  for (const m of mods) {
    if (m.id === exclude) continue
    for (let r = m.row; r < m.row + m.rowSpan; r++)
      for (let c = m.col; c < m.col + m.colSpan; c++) s.add(`${r}-${c}`)
  }
  return s
}

function canFit(
  mods: GridMod[],
  exclude: string,
  row: number,
  col: number,
  rowSpan: number,
  colSpan: number,
): boolean {
  if (col < 0 || row < 0 || col + colSpan > 3 || row + rowSpan > 2) return false
  const occ = getOccupied(mods, exclude)
  for (let r = row; r < row + rowSpan; r++)
    for (let c = col; c < col + colSpan; c++)
      if (occ.has(`${r}-${c}`)) return false
  return true
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: "DM Mono, monospace",
        fontSize: "9px",
        fontWeight: 700,
        color: "rgba(130,155,200,0.45)",
        letterSpacing: "2px",
        textTransform: "uppercase",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

function Panel({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: "rgba(14,14,14,0.96)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Tour ring ────────────────────────────────────────────────────────────────

function TourRing({
  done,
  total,
  color,
  id,
}: {
  done: number
  total: number
  color: string
  id: string
}) {
  const progress = done / total
  const R = 34,
    STROKE = 8,
    CX = 40,
    CY = 40,
    SIZE = 80
  const CIRC = 2 * Math.PI * R
  const endAngle = (progress * 360 - 90) * (Math.PI / 180)
  const gradId = `tg-${id}`,
    glowId = `tcg-${id}`
  return (
    <div style={{ flexShrink: 0, filter: `drop-shadow(0 0 7px ${color}55)` }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        {Array.from({ length: total }).map((_, i) => {
          const a = (i / total) * 360 - 90,
            rad = (a * Math.PI) / 180
          return (
            <line
              key={i}
              x1={CX + Math.cos(rad) * (R + STROKE / 2 + 1)}
              y1={CY + Math.sin(rad) * (R + STROKE / 2 + 1)}
              x2={CX + Math.cos(rad) * (R - STROKE / 2 - 1)}
              y2={CY + Math.sin(rad) * (R - STROKE / 2 - 1)}
              stroke={i < done ? `${color}44` : "rgba(255,255,255,0.05)"}
              strokeWidth="1"
            />
          )
        })}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${CIRC * progress} ${CIRC * (1 - progress)}`}
          transform={`rotate(-90 ${CX} ${CY})`}
        />
        <circle
          cx={CX + Math.cos(endAngle) * R}
          cy={CY + Math.sin(endAngle) * R}
          r={STROKE / 2 - 0.5}
          fill={color}
          filter={`url(#${glowId})`}
        />
        <text
          x={CX}
          y={CY - 3}
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="800"
          fontSize="15"
          fill="#FFFFFF"
          letterSpacing="-0.5"
        >
          {done}
        </text>
        <text
          x={CX}
          y={CY + 10}
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="300"
          fontSize="8"
          fill="rgba(180,200,255,0.35)"
        >
          of {total}
        </text>
        <text
          x={CX}
          y={CY + 21}
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="5.5"
          fill="rgba(130,155,200,0.4)"
          letterSpacing="1"
        >
          Completed
        </text>
      </svg>
    </div>
  )
}

// ─── Tour Card ────────────────────────────────────────────────────────────────

function TourCard({ tour }: { tour: typeof ACTIVE_TOURS[0] }) {
  const isBehind = tour.status === "behind"
  const color = isBehind ? "#FFA500" : "#5599FF"
  const pct = Math.round((tour.done / tour.total) * 100)
  const borderGrad = isBehind
    ? "conic-gradient(from 0deg, #CC5500, #FFA500, #FFD700, #FFA500, #CC5500, #FF8C00, #CC5500)"
    : "conic-gradient(from 0deg, #0033FF, #0088FF, #00CFFF, #0055FF, #0022CC, #0088FF, #0033FF)"
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "13px",
        padding: "2px",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: isBehind
          ? "0 0 24px rgba(255,165,0,0.25)"
          : "0 0 20px rgba(0,120,255,0.18)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-100%",
          background: borderGrad,
          animation: "border-spin 5s linear infinite",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "11px",
          background: "#0D0D0D",
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TourRing
          done={tour.done}
          total={tour.total}
          color={color}
          id={tour.id}
        />
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "7.5px",
                fontWeight: 700,
                color,
                background: `${color}14`,
                border: `1px solid ${color}35`,
                borderRadius: "4px",
                padding: "1px 5px",
              }}
            >
              {tour.id}
            </span>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                color: "#FFFFFF",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {tour.name}
            </span>
            {isBehind && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  background: "rgba(255,165,0,0.12)",
                  border: "1px solid rgba(255,165,0,0.4)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#FFA500",
                    animation: "pulse-dot 1.8s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "7px",
                    fontWeight: 700,
                    color: "#FFA500",
                    letterSpacing: "0.1em",
                  }}
                >
                  BEHIND
                </span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                flexShrink: 0,
                background: `${color}18`,
                border: `1px solid ${color}38`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "DM Mono, monospace",
                fontSize: "6.5px",
                fontWeight: 700,
                color,
              }}
            >
              {tour.avatar}
            </div>
            <span
              style={{
                fontSize: "10.5px",
                color: "rgba(220,235,255,0.75)",
                fontWeight: 500,
              }}
            >
              {tour.officer}
            </span>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                color: "rgba(200,218,248,0.55)",
              }}
            >
              {tour.badge}
            </span>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div
              style={{
                flex: 1,
                padding: "3px 5px",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "6.5px",
                  color: "rgba(200,218,248,0.55)",
                  textTransform: "uppercase",
                }}
              >
                Scheduled
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "rgba(228,240,255,0.88)",
                }}
              >
                {tour.scheduledStart}–{tour.scheduledEnd}
              </div>
            </div>
            <div
              style={{
                padding: "3px 5px",
                borderRadius: "5px",
                background: `${color}0D`,
                border: `1px solid ${color}28`,
              }}
            >
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "6.5px",
                  color: `${color}70`,
                  textTransform: "uppercase",
                }}
              >
                Elapsed
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  color,
                }}
              >
                {tour.elapsed}
              </div>
            </div>
          </div>
          <div
            style={{
              height: "3px",
              borderRadius: "99px",
              background: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                borderRadius: "99px",
                background: `linear-gradient(90deg, ${color}77, ${color})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SITES = [
  "All Sites",
  "Meridian Tower",
  "Harbor View Plaza",
  "Eastgate Complex",
]

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SecurityOpsModule({
  onClose,
}: {
  onClose: () => void
}) {
  const [activeFilter, setActiveFilter] = useState(0)
  const [activeSite, setActiveSite] = useState(0)
  const [siteDropOpen, setSiteDropOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [gridMods, setGridMods] = useState<GridMod[]>(INIT_GRID)
  const [palette, setPalette] = useState<ModuleKey[]>(INIT_PALETTE)
  const draggingRef = useRef<string | null>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)

  function startDrag(id: string) {
    draggingRef.current = id
    setDragging(id)
  }
  function endDrag() {
    draggingRef.current = null
    setDragging(null)
    setDragOver(null)
  }

  function dropOnGrid(row: number, col: number, targetId?: string) {
    const src = draggingRef.current
    if (!src) return
    const srcMod = gridMods.find((m) => m.id === src)
    const isPalette = palette.includes(src as ModuleKey)

    if (srcMod && targetId && targetId !== src) {
      const tgt = gridMods.find((m) => m.id === targetId)!
      setGridMods((prev) =>
        prev.map((m) => {
          if (m.id === src)
            return { ...m, col: tgt.col, row: tgt.row, colSpan: 1, rowSpan: 1 }
          if (m.id === targetId)
            return {
              ...m,
              col: srcMod.col,
              row: srcMod.row,
              colSpan: 1,
              rowSpan: 1,
            }
          return m
        }),
      )
    } else if (srcMod && !targetId) {
      setGridMods((prev) =>
        prev.map((m) =>
          m.id === src ? { ...m, col, row, colSpan: 1, rowSpan: 1 } : m,
        ),
      )
    } else if (isPalette) {
      if (targetId) {
        const tgt = gridMods.find((m) => m.id === targetId)!
        setGridMods((prev) =>
          prev.map((m) =>
            m.id === targetId ? { ...m, id: src as ModuleKey } : m,
          ),
        )
        setPalette((prev) => [
          ...prev.filter((id) => id !== src),
          tgt.id as ModuleKey,
        ])
      } else {
        setGridMods((prev) => [
          ...prev,
          { id: src as ModuleKey, col, row, colSpan: 1, rowSpan: 1 },
        ])
        setPalette((prev) => prev.filter((id) => id !== src))
      }
    }
    endDrag()
  }

  function dropOnPalette() {
    const src = draggingRef.current
    if (!src) return
    if (gridMods.find((m) => m.id === src)) {
      setGridMods((prev) => prev.filter((m) => m.id !== src))
      setPalette((prev) => [...prev, src as ModuleKey])
    }
    endDrag()
  }

  function removeFromGrid(id: string) {
    setGridMods((prev) => prev.filter((m) => m.id !== id))
    setPalette((prev) => [...prev, id as ModuleKey])
  }

  function resize(id: string, dim: "col" | "row", delta: 1 | -1) {
    setGridMods((prev) => {
      const idx = prev.findIndex((m) => m.id === id)
      if (idx < 0) return prev
      const m = prev[idx]
      if (dim === "col") {
        const newSpan = (m.colSpan + delta) as 1 | 2
        if (
          newSpan < 1 ||
          newSpan > 2 ||
          !canFit(prev, id, m.row, m.col, m.rowSpan, newSpan)
        )
          return prev
        return prev.map((mm, i) =>
          i === idx ? { ...mm, colSpan: newSpan } : mm,
        )
      } else {
        const newSpan = (m.rowSpan + delta) as 1 | 2
        if (
          newSpan < 1 ||
          newSpan > 2 ||
          !canFit(prev, id, m.row, m.col, newSpan, m.colSpan)
        )
          return prev
        return prev.map((mm, i) =>
          i === idx ? { ...mm, rowSpan: newSpan } : mm,
        )
      }
    })
  }

  // Compute empty cells
  const occupied = getOccupied(gridMods)
  const emptyCells: { row: number col: number }[] = []
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++)
      if (!occupied.has(`${r}-${c}`)) emptyCells.push({ row: r, col: c })

  // ─── Module content renderers ──────────────────────────────────────────────

  function renderContent(id: ModuleKey): React.ReactNode {
    switch (id) {
      case "active-tours":
        return (
          <>
            <SectionLabel>Active Tours</SectionLabel>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {ACTIVE_TOURS.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </>
        )

      case "live-activity":
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#5599FF",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <SectionLabel>Live Activity</SectionLabel>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {ACTIVITY.map((e) => (
                <div
                  key={e.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.03)",
                    borderLeft: `2px solid ${e.color}`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8.5px",
                      color: "rgba(180,195,230,0.38)",
                      flexShrink: 0,
                      width: "32px",
                    }}
                  >
                    {e.time}
                  </span>
                  <span
                    style={{
                      fontSize: "10.5px",
                      color: "rgba(220,232,255,0.82)",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      color: "rgba(200,218,248,0.45)",
                      flexShrink: 0,
                    }}
                  >
                    {e.officer}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexShrink: 0,
                paddingTop: "6px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                {
                  label: "Assign Task",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="rgba(220,235,255,0.6)"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M10 6v8M6 10h8"
                        stroke="rgba(220,235,255,0.6)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Assign Tour",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2C6.7 2 4 4.7 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z"
                        stroke="rgba(220,235,255,0.6)"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="10"
                        cy="8"
                        r="2.5"
                        stroke="rgba(220,235,255,0.6)"
                        strokeWidth="1.2"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Create Report",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="3"
                        y="2"
                        width="14"
                        height="16"
                        rx="2.5"
                        stroke="rgba(220,235,255,0.6)"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M7 8h6M7 11h6M7 14h4"
                        stroke="rgba(220,235,255,0.6)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
              ].map((btn) => (
                <button
                  key={btn.label}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    padding: "11px 6px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {btn.icon}
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "rgba(220,235,255,0.6)",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        )

      case "field-reporting":
        return (
          <>
            <SectionLabel>Field Reporting Hub</SectionLabel>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 11px",
                borderRadius: "10px",
                cursor: "pointer",
                flexShrink: 0,
                background: "rgba(255,165,0,0.07)",
                border: "1px solid rgba(255,165,0,0.35)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: "rgba(255,165,0,0.1)",
                    border: "1px solid rgba(255,165,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <rect
                      x="1.5"
                      y="1.5"
                      width="11"
                      height="11"
                      rx="2"
                      stroke="#FFA500"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M4 7h6M4 4.5h6M4 9.5h3.5"
                      stroke="#FFA500"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 600,
                      fontSize: "11px",
                      color: "#FFA500",
                    }}
                  >
                    Reports to Approve
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "7.5px",
                      color: "rgba(255,165,0,0.55)",
                      marginTop: "1px",
                    }}
                  >
                    3 pending supervisor review
                  </div>
                </div>
              </div>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.5 2.5L8 6l-3.5 3.5"
                  stroke="rgba(255,165,0,0.55)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {REPORT_TYPES.map((r) => (
                <button
                  key={r.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px 9px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "left",
                    flexShrink: 0,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "rgba(220,235,255,0.85)",
                      }}
                    >
                      {r.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "7.5px",
                        color: "rgba(130,155,200,0.45)",
                        marginTop: "1px",
                      }}
                    >
                      {r.desc}
                    </div>
                  </div>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{ flexShrink: 0, marginLeft: "6px" }}
                  >
                    <path
                      d="M4.5 2.5L8 6l-3.5 3.5"
                      stroke="rgba(200,218,248,0.55)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </>
        )

      case "quick-access":
        return (
          <>
            <SectionLabel>Quick Access</SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
                flex: 1,
                alignContent: "start",
              }}
            >
              {[
                {
                  title: "Location Tracks",
                  sub: "6 officers · live GPS",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="rgba(85,153,255,0.7)"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="7"
                        cy="7"
                        r="2"
                        stroke="rgba(85,153,255,0.7)"
                        strokeWidth="1.1"
                      />
                      <path
                        d="M7 1.5v2M7 10.5v2M1.5 7h2M10.5 7h2"
                        stroke="rgba(85,153,255,0.5)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Site Map",
                  sub: "Meridian Tower · 3D view",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 3l4-1.5 4 1.5 4-1.5V11l-4 1.5-4-1.5-4 1.5V3Z"
                        stroke="rgba(85,153,255,0.7)"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 1.5v10M9 3v10"
                        stroke="rgba(85,153,255,0.4)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Tour Schedule",
                  sub: "3 scheduled",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="1.5"
                        y="2.5"
                        width="11"
                        height="10"
                        rx="1.5"
                        stroke="rgba(180,195,230,0.5)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M4.5 1v3M9.5 1v3M1.5 6h11"
                        stroke="rgba(180,195,230,0.4)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Checkpoints",
                  sub: "Tower B · Loading Dock",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <circle
                        cx="7"
                        cy="6"
                        r="3"
                        stroke="rgba(180,195,230,0.5)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M7 9c-3 0-5.5 1.3-5.5 2.5h11C12.5 10.3 10 9 7 9Z"
                        stroke="rgba(180,195,230,0.4)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Site Tasks",
                  sub: "2 open duties pending",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke="rgba(180,195,230,0.5)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Site Assets",
                  sub: "Doors · Fire · Panels",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="2"
                        y="1.5"
                        width="10"
                        height="11"
                        rx="1.5"
                        stroke="rgba(180,195,230,0.5)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M5 5h4M5 7.5h4M5 10h2"
                        stroke="rgba(180,195,230,0.4)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
              ].map((item) => (
                <button
                  key={item.title}
                  style={{
                    background: "rgba(22,22,22,0.9)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "9px 10px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {item.icon}
                    <div
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 600,
                        fontSize: "9px",
                        color: "rgba(220,235,255,0.85)",
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "7.5px",
                      color: "rgba(130,155,200,0.5)",
                    }}
                  >
                    {item.sub}
                  </div>
                </button>
              ))}
            </div>
          </>
        )

      case "tasks":
        return (
          <>
            <SectionLabel>Tasks</SectionLabel>
            <div
              style={{
                display: "flex",
                gap: "4px",
                flexWrap: "wrap",
                flexShrink: 0,
              }}
            >
              {TASK_FILTERS.map((f, i) => {
                const active = i === activeFilter
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(i)}
                    style={
                      {
                        height: "21px",
                        borderRadius: "99px",
                        padding: "0 8px",
                        cursor: "pointer",
                        background: active
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.03)",
                        border: active
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.07)",
                      } as React.CSSProperties
                    }
                  >
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "7.5px",
                        fontWeight: active ? 700 : 400,
                        color: active
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(130,155,200,0.5)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f}
                    </span>
                  </button>
                )
              })}
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {TASKS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: t.cardBg,
                    border: t.cardBorder,
                    borderRadius: "9px",
                    padding: "8px 9px 8px 0",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "3px",
                      background: t.color,
                      boxShadow: `0 0 7px ${t.glow}`,
                    }}
                  />
                  <div
                    style={{
                      paddingLeft: "12px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {t.pulse && (
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: t.color,
                            animation: "pulse-dot 1.8s ease-in-out infinite",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "7px",
                          fontWeight: 700,
                          color: t.color,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.severity}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 500,
                        fontSize: "10.5px",
                        color: "rgba(220,235,255,0.88)",
                        lineHeight: 1.4,
                      }}
                    >
                      {t.title}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "7.5px",
                          fontWeight: 600,
                          color: t.color,
                        }}
                      >
                        {t.footerTime}
                      </span>
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "7px",
                          color: "rgba(130,155,200,0.38)",
                        }}
                      >
                        {t.origin}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )

      case "live-map":
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <SectionLabel>Live Map</SectionLabel>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#5599FF",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "7.5px",
                    color: "#5599FF",
                    letterSpacing: "0.08em",
                  }}
                >
                  LIVE
                </span>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                background: "rgba(10,14,22,0.95)",
                border: "1px solid rgba(255,255,255,0.07)",
                minHeight: 0,
              }}
            >
              <svg
                width="100%"
                height="100%"
                style={{ position: "absolute", inset: 0 }}
              >
                <defs>
                  <pattern
                    id="mg3"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="rgba(85,153,255,0.06)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mg3)" />
                <rect
                  x="18%"
                  y="12%"
                  width="64%"
                  height="55%"
                  rx="3"
                  fill="rgba(85,153,255,0.04)"
                  stroke="rgba(85,153,255,0.2)"
                  strokeWidth="1"
                />
                <rect
                  x="22%"
                  y="16%"
                  width="26%"
                  height="22%"
                  rx="2"
                  fill="rgba(85,153,255,0.03)"
                  stroke="rgba(85,153,255,0.1)"
                  strokeWidth="0.8"
                />
                <rect
                  x="52%"
                  y="16%"
                  width="26%"
                  height="22%"
                  rx="2"
                  fill="rgba(85,153,255,0.03)"
                  stroke="rgba(85,153,255,0.1)"
                  strokeWidth="0.8"
                />
                <rect
                  x="22%"
                  y="42%"
                  width="56%"
                  height="20%"
                  rx="2"
                  fill="rgba(85,153,255,0.03)"
                  stroke="rgba(85,153,255,0.1)"
                  strokeWidth="0.8"
                />
                <rect
                  x="5%"
                  y="70%"
                  width="90%"
                  height="16%"
                  rx="2"
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                />
                <line
                  x1="0"
                  y1="68%"
                  x2="100%"
                  y2="68%"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="8"
                />
                <line
                  x1="15%"
                  y1="0"
                  x2="15%"
                  y2="100%"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="6"
                />
                <line
                  x1="85%"
                  y1="0"
                  x2="85%"
                  y2="100%"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="6"
                />
                {[
                  { cx: "38%", cy: "24%", color: "#5599FF", label: "JR" },
                  { cx: "62%", cy: "22%", color: "#5599FF", label: "MC" },
                  { cx: "45%", cy: "50%", color: "#FFA500", label: "TW" },
                  { cx: "55%", cy: "48%", color: "#5599FF", label: "AO" },
                  { cx: "30%", cy: "56%", color: "#5599FF", label: "DP" },
                  { cx: "68%", cy: "54%", color: "#5599FF", label: "LS" },
                ].map((o, i) => (
                  <g key={i}>
                    <circle
                      cx={o.cx}
                      cy={o.cy}
                      r="8"
                      fill="none"
                      stroke={o.color}
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    <circle
                      cx={o.cx}
                      cy={o.cy}
                      r="5"
                      fill={o.color}
                      opacity="0.9"
                    />
                    <text
                      x={o.cx}
                      y={o.cy}
                      dy="0.35em"
                      textAnchor="middle"
                      fontFamily="DM Mono, monospace"
                      fontSize="4.5"
                      fontWeight="700"
                      fill="rgba(0,0,0,0.85)"
                    >
                      {o.label}
                    </text>
                  </g>
                ))}
                {[
                  { cx: "15%", cy: "38%", l: "A" },
                  { cx: "85%", cy: "38%", l: "B" },
                  { cx: "50%", cy: "68%", l: "C" },
                ].map((g, i) => (
                  <g key={i}>
                    <rect
                      x={`calc(${g.cx} - 8px)`}
                      y={`calc(${g.cy} - 6px)`}
                      width="16"
                      height="12"
                      rx="2"
                      fill="rgba(180,195,230,0.08)"
                      stroke="rgba(180,195,230,0.25)"
                      strokeWidth="0.8"
                    />
                    <text
                      x={g.cx}
                      y={g.cy}
                      dy="0.35em"
                      textAnchor="middle"
                      fontFamily="DM Mono, monospace"
                      fontSize="5"
                      fontWeight="700"
                      fill="rgba(180,195,230,0.7)"
                    >
                      G{g.l}
                    </text>
                  </g>
                ))}
              </svg>
              <div style={{ position: "absolute", top: "6px", left: "8px" }}>
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "7px",
                    color: "rgba(85,153,255,0.5)",
                    letterSpacing: "0.1em",
                  }}
                >
                  MERIDIAN · FL1
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "7px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                {[
                  ["#5599FF", "On Duty"],
                  ["#FFA500", "Late"],
                ].map(([c, l]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "6.5px",
                        color: "rgba(180,195,230,0.5)",
                      }}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )

      case "personnel":
        return (
          <>
            <SectionLabel>Personnel Status</SectionLabel>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {PERSONNEL.map((p) => {
                const color = p.status === "active" ? "#5599FF" : "#FFA500"
                return (
                  <div
                    key={p.badge}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "5px 7px",
                      borderRadius: "7px",
                      background: "rgba(255,255,255,0.025)",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "5px",
                        flexShrink: 0,
                        background: `${color}14`,
                        border: `1px solid ${color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "DM Mono, monospace",
                        fontSize: "7px",
                        fontWeight: 700,
                        color,
                      }}
                    >
                      {p.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontWeight: 600,
                          fontSize: "10.5px",
                          color: "rgba(220,235,255,0.88)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "7.5px",
                          color: "rgba(130,155,200,0.5)",
                        }}
                      >
                        {p.role} · {p.sector}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: color,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "7px",
                          color,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )

      case "dispatch":
        return (
          <>
            <SectionLabel>Dispatch Log</SectionLabel>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {DISPATCH_LOG.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "7px",
                    padding: "6px 8px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.025)",
                    borderLeft: `2px solid ${d.color}`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      color: "rgba(180,195,230,0.35)",
                      flexShrink: 0,
                      paddingTop: "1px",
                      width: "30px",
                    }}
                  >
                    {d.time}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "7px",
                        fontWeight: 700,
                        color: d.color,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        marginBottom: "1px",
                      }}
                    >
                      {d.type}
                    </div>
                    <div
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "10px",
                        color: "rgba(220,235,255,0.78)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.msg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )

      case "incidents":
        return (
          <>
            <SectionLabel>Incident Summary</SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px",
                flexShrink: 0,
              }}
            >
              {[
                { label: "Open", value: "2", color: "#FF4444" },
                { label: "In Review", value: "3", color: "#FFA500" },
                { label: "Resolved", value: "11", color: "#5599FF" },
                { label: "Escalated", value: "1", color: "#4A8FFF" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "8px",
                    borderRadius: "9px",
                    background: `${s.color}09`,
                    border: `1px solid ${s.color}22`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 800,
                      fontSize: "20px",
                      color: s.color,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "7px",
                      color: `${s.color}80`,
                      marginTop: "3px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {[
                {
                  id: "#I-042",
                  desc: "East Gate unauthorized entry attempt",
                  time: "07:31",
                  color: "#FF4444",
                },
                {
                  id: "#I-041",
                  desc: "Roof access motion alarm triggered",
                  time: "07:11",
                  color: "#FF4444",
                },
                {
                  id: "#I-040",
                  desc: "Gate C maglock failure reported",
                  time: "06:04",
                  color: "#FFA500",
                },
              ].map((inc) => (
                <div
                  key={inc.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 7px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.025)",
                    borderLeft: `2px solid ${inc.color}`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "7.5px",
                      color: inc.color,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {inc.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "10px",
                      color: "rgba(220,235,255,0.78)",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {inc.desc}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "7px",
                      color: "rgba(130,155,200,0.4)",
                      flexShrink: 0,
                    }}
                  >
                    {inc.time}
                  </span>
                </div>
              ))}
            </div>
          </>
        )

      default:
        return null
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "13px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(8,8,8,0.7)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            flexShrink: 0,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M7.5 1.5L3 5.5l4.5 4"
              stroke="rgba(180,195,230,0.6)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              color: "#FFFFFF",
              letterSpacing: "0.3px",
            }}
          >
            SECURITY OPERATIONS
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
            REAL-TIME OPS MANAGEMENT
          </div>
        </div>

        {/* Site selector */}
        <div style={{ position: "relative", marginLeft: "8px" }}>
          <button
            onClick={() => setSiteDropOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              borderRadius: "9px",
              cursor: "pointer",
              background: siteDropOpen
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: activeSite === 0 ? "#4A8FFF" : "#5599FF",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                color: "rgba(220,235,255,0.9)",
                whiteSpace: "nowrap",
              }}
            >
              {SITES[activeSite]}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{
                transform: siteDropOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            >
              <path
                d="M2 3.5L5 6.5L8 3.5"
                stroke="rgba(180,195,230,0.5)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {siteDropOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                zIndex: 50,
                background: "rgba(18,18,18,0.98)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                overflow: "hidden",
                minWidth: "180px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {SITES.map((site, i) => (
                <button
                  key={site}
                  onClick={() => {
                    setActiveSite(i)
                    setSiteDropOpen(false)
                  }}
                  style={{
                    width: "100%",
                    padding: "9px 14px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    background:
                      i === activeSite
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                    border: "none",
                    borderBottom:
                      i < SITES.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background:
                        i === activeSite
                          ? i === 0
                            ? "#4A8FFF"
                            : "#5599FF"
                          : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "12px",
                      fontWeight: i === activeSite ? 600 : 400,
                      color:
                        i === activeSite
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(180,195,230,0.6)",
                    }}
                  >
                    {site}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Progress rings */}
        <div style={{ display: "flex", gap: "20px", marginLeft: "16px" }}>
          {[
            { done: 7, total: 9, label: "Tours", color: "#5599FF" },
            { done: 11, total: 17, label: "Reports", color: "#FFA500" },
            { done: 18, total: 22, label: "Tasks", color: "#4A8FFF" },
          ].map((r) => {
            const pct = Math.round((r.done / r.total) * 100)
            const R = 20,
              circ = 2 * Math.PI * R
            return (
              <div
                key={r.label}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "52px",
                    height: "52px",
                    flexShrink: 0,
                  }}
                >
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle
                      cx="26"
                      cy="26"
                      r={R}
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="4.5"
                    />
                    <circle
                      cx="26"
                      cy="26"
                      r={R}
                      fill="none"
                      stroke={r.color}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeDasharray={`${(circ * r.done) / r.total} ${circ}`}
                      transform="rotate(-90 26 26)"
                    />
                    <text
                      x="26"
                      y="30"
                      textAnchor="middle"
                      fontFamily="Space Grotesk, sans-serif"
                      fontWeight="800"
                      fontSize="13"
                      fill="#FFF"
                    >
                      {r.done}
                    </text>
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      color: "rgba(200,218,248,0.6)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {r.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: r.color,
                      marginTop: "1px",
                    }}
                  >
                    {pct}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Edit toggle */}
        <button
          onClick={() => setEditMode((v) => !v)}
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            borderRadius: "9px",
            cursor: "pointer",
            background: editMode
              ? "rgba(74,143,255,0.12)"
              : "rgba(255,255,255,0.05)",
            border: editMode
              ? "1px solid rgba(74,143,255,0.4)"
              : "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s",
          }}
        >
          {editMode ? (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#4A8FFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#4A8FFF",
                  letterSpacing: "0.08em",
                }}
              >
                DONE
              </span>
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M8.5 1.5a1.414 1.414 0 0 1 2 2L4 10H2v-2L8.5 1.5Z"
                  stroke="rgba(180,195,230,0.55)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "rgba(180,195,230,0.55)",
                  letterSpacing: "0.08em",
                }}
              >
                EDIT
              </span>
            </>
          )}
        </button>
      </div>

      {/* ── 3×2 Drag-and-drop grid ── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "8px",
          padding: "8px",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Empty cell drop zones */}
        {emptyCells.map(({ row, col }) => {
          const key = `${row}-${col}`
          const isOver = dragOver === key && !!dragging
          return (
            <div
              key={`empty-${key}`}
              style={{
                gridColumn: col + 1,
                gridRow: row + 1,
                border: `1.5px dashed ${isOver ? "rgba(74,143,255,0.55)" : "rgba(74,143,255,0.14)"
                  }`,
                borderRadius: "14px",
                background: isOver ? "rgba(74,143,255,0.07)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                setDragOver(key)
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={() => setDragOver((v) => (v === key ? null : v))}
              onDrop={() => dropOnGrid(row, col)}
            >
              {isOver && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    pointerEvents: "none",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="rgba(74,143,255,0.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "7.5px",
                      color: "rgba(74,143,255,0.5)",
                      letterSpacing: "1px",
                    }}
                  >
                    DROP HERE
                  </span>
                </div>
              )}
            </div>
          )
        })}

        {/* Placed modules */}
        {gridMods.map((m) => {
          const isOver = dragOver === m.id && dragging !== m.id
          return (
            <div
              key={m.id}
              style={{
                gridColumn: `${m.col + 1} / span ${m.colSpan}`,
                gridRow: `${m.row + 1} / span ${m.rowSpan}`,
                minHeight: 0,
                minWidth: 0,
                opacity: dragging === m.id ? 0.22 : 1,
                transition: "opacity 0.15s",
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                setDragOver(m.id)
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={() => setDragOver((v) => (v === m.id ? null : v))}
              onDrop={() => dropOnGrid(m.row, m.col, m.id)}
            >
              <Panel
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  boxShadow: isOver
                    ? "inset 0 0 0 2px rgba(74,143,255,0.5)"
                    : "none",
                  transition: "box-shadow 0.15s",
                }}
              >
                {/* Edit mode bar */}
                {editMode && (
                  <div
                    draggable
                    onDragStart={() => startDrag(m.id)}
                    onDragEnd={endDrag}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 10px",
                      borderRadius: "13px 13px 0 0",
                      borderBottom: "1px solid rgba(74,143,255,0.18)",
                      background: "rgba(10,20,44,0.9)",
                      cursor: "grab",
                      flexShrink: 0,
                      userSelect: "none",
                    }}
                  >
                    {/* Drag dots */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 3px)",
                        gap: "2px",
                        flexShrink: 0,
                      }}
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: "3px",
                            height: "3px",
                            borderRadius: "50%",
                            background: "rgba(74,143,255,0.5)",
                          }}
                        />
                      ))}
                    </div>

                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "7.5px",
                        fontWeight: 700,
                        color: "rgba(74,143,255,0.8)",
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        flex: 1,
                      }}
                    >
                      {MODULE_LABELS[m.id]}
                    </span>

                    {/* Span indicators */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        marginRight: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "7px",
                          color: "rgba(74,143,255,0.45)",
                        }}
                      >
                        {m.colSpan}×{m.rowSpan}
                      </span>
                    </div>

                    {/* Width expand/shrink */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resize(m.id, "col", m.colSpan === 1 ? 1 : -1)
                      }}
                      title={m.colSpan === 1 ? "Expand width" : "Shrink width"}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: `1px solid ${m.colSpan === 2
                            ? "rgba(74,143,255,0.55)"
                            : "rgba(74,143,255,0.25)"
                          }`,
                        background:
                          m.colSpan === 2
                            ? "rgba(74,143,255,0.18)"
                            : "rgba(74,143,255,0.07)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {m.colSpan === 1 ? (
                        <svg
                          width="11"
                          height="9"
                          viewBox="0 0 11 9"
                          fill="none"
                        >
                          <path
                            d="M1 4.5h9"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M7.5 2.5l2 2-2 2"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.5 2.5l-2 2 2 2"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="11"
                          height="9"
                          viewBox="0 0 11 9"
                          fill="none"
                        >
                          <path
                            d="M0.5 4.5h3.5M7 4.5h3.5"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4 2.5L2 4.5l2 2"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 2.5l2 2-2 2"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Height expand/shrink */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resize(m.id, "row", m.rowSpan === 1 ? 1 : -1)
                      }}
                      title={
                        m.rowSpan === 1 ? "Expand height" : "Shrink height"
                      }
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: `1px solid ${m.rowSpan === 2
                            ? "rgba(74,143,255,0.55)"
                            : "rgba(74,143,255,0.25)"
                          }`,
                        background:
                          m.rowSpan === 2
                            ? "rgba(74,143,255,0.18)"
                            : "rgba(74,143,255,0.07)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {m.rowSpan === 1 ? (
                        <svg
                          width="9"
                          height="11"
                          viewBox="0 0 9 11"
                          fill="none"
                        >
                          <path
                            d="M4.5 1v9"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.5 7.5l2 2 2-2"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.5 3.5l2-2 2 2"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="9"
                          height="11"
                          viewBox="0 0 9 11"
                          fill="none"
                        >
                          <path
                            d="M4.5 0.5v3.5M4.5 7v3.5"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.5 4l2-1.5 2 1.5"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.5 7l2 1.5 2-1.5"
                            stroke="#4A8FFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromGrid(m.id)
                      }}
                      title="Remove module"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: "1px solid rgba(255,80,80,0.2)",
                        background: "rgba(255,80,80,0.07)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1.5 1.5l5 5M6.5 1.5l-5 5"
                          stroke="rgba(255,100,100,0.65)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    overflow: "hidden",
                    padding: "10px",
                  }}
                >
                  {renderContent(m.id)}
                </div>
              </Panel>
            </div>
          )
        })}
      </div>

      {/* ── Module bank palette (edit mode only) ── */}
      {editMode && (
        <div
          style={{
            flexShrink: 0,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(8,8,8,0.9)",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minHeight: "46px",
          }}
          onDragEnter={(e) => {
            e.preventDefault()
            if (dragging && gridMods.find((m) => m.id === dragging))
              setDragOver("__palette__")
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() =>
            setDragOver((v) => (v === "__palette__" ? null : v))
          }
          onDrop={dropOnPalette}
        >
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "7.5px",
              fontWeight: 700,
              color: "rgba(130,155,200,0.3)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            MODULE BANK
          </span>

          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "6px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {palette.length === 0 ? (
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  color: "rgba(130,155,200,0.22)",
                  fontStyle: "italic",
                }}
              >
                All modules placed on grid
              </span>
            ) : (
              palette.map((id) => (
                <div
                  key={id}
                  draggable
                  onDragStart={() => startDrag(id)}
                  onDragEnd={endDrag}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "7px",
                    cursor: "grab",
                    background:
                      dragging === id
                        ? "rgba(74,143,255,0.2)"
                        : "rgba(74,143,255,0.08)",
                    border: "1px solid rgba(74,143,255,0.3)",
                    transition: "background 0.15s",
                    userSelect: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "rgba(74,143,255,0.9)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {MODULE_LABELS[id]}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Drop-to-remove indicator */}
          {dragOver === "__palette__" &&
            dragging &&
            gridMods.find((m) => m.id === dragging) && (
              <div
                style={{
                  padding: "5px 12px",
                  borderRadius: "7px",
                  border: "1.5px dashed rgba(255,100,100,0.45)",
                  background: "rgba(255,80,80,0.06)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "8px",
                    color: "rgba(255,100,100,0.7)",
                    letterSpacing: "0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  DROP TO REMOVE
                </span>
              </div>
            )}

          {/* Reset to default */}
          <button
            onClick={() => {
              setGridMods(INIT_GRID)
              setPalette(INIT_PALETTE)
            }}
            style={{
              marginLeft: "auto",
              padding: "5px 13px",
              borderRadius: "7px",
              cursor: "pointer",
              flexShrink: 0,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M10 6A4 4 0 1 1 6 2"
                stroke="rgba(200,218,248,0.5)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path d="M6 2l2-2v4L6 2Z" fill="rgba(200,218,248,0.45)" />
            </svg>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                fontWeight: 700,
                color: "rgba(200,218,248,0.5)",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Default View
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
