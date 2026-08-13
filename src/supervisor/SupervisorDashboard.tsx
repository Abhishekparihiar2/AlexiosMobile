import { useState } from "react"
import SecurityOpsModule from "./SecurityOpsModule"
import SecurityTeamModule from "./SecurityTeamModule"
import AdminModule from "./AdminModule"
import CommunicationsModule from "./CommunicationsModule"
import TacticalCommand from "./TacticalCommand"

const SITES = [
  "All Sites",
  "Meridian Tower",
  "Harbor View Plaza",
  "Eastgate Complex",
]

// ─── Mock Data ────────────────────────────────────────────────────────────────

const officers = [
  {
    id: 1,
    name: "J. Rivera",
    badge: "S-041",
    role: "Lead Guard",
    zone: "Lobby / L1",
    status: "active",
    scheduled: "06:00",
    clockIn: "06:00",
    avatar: "JR",
  },
  {
    id: 2,
    name: "M. Chen",
    badge: "S-019",
    role: "Patrol",
    zone: "Perimeter",
    status: "active",
    scheduled: "06:00",
    clockIn: "06:02",
    avatar: "MC",
  },
  {
    id: 3,
    name: "T. Williams",
    badge: "S-057",
    role: "Access Ctrl",
    zone: "Gate B",
    status: "late",
    scheduled: "06:00",
    clockIn: "—",
    avatar: "TW",
  },
  {
    id: 4,
    name: "A. Okafor",
    badge: "S-033",
    role: "Patrol",
    zone: "Levels 3–5",
    status: "active",
    scheduled: "06:00",
    clockIn: "05:58",
    avatar: "AO",
  },
  {
    id: 5,
    name: "D. Patel",
    badge: "S-062",
    role: "CCTV Monitor",
    zone: "Control Rm",
    status: "behind",
    scheduled: "06:00",
    clockIn: "06:00",
    avatar: "DP",
  },
  {
    id: 6,
    name: "L. Santos",
    badge: "S-024",
    role: "Patrol",
    zone: "Parking P1",
    status: "active",
    scheduled: "06:00",
    clockIn: "05:58",
    avatar: "LS",
  },
]

const activityFeed = [
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
    color: "#5599FF",
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
    color: "#4A8FFF",
  },
  {
    id: 5,
    time: "07:18",
    label: "Tour B Started",
    officer: "L. Santos",
    color: "#5599FF",
  },
  {
    id: 6,
    time: "07:11",
    label: "Motion — Roof Access",
    officer: "System",
    color: "#FF4444",
  },
  {
    id: 7,
    time: "07:04",
    label: "Maintenance Note Filed",
    officer: "D. Patel",
    color: "#5599FF",
  },
  {
    id: 8,
    time: "06:55",
    label: "Perimeter Check Logged",
    officer: "M. Chen",
    color: "#4A8FFF",
  },
]

const messages = [
  {
    id: 1,
    from: "J. Rivera",
    preview: "Lobby clear, all access logs nominal.",
    time: "07:41",
    unread: false,
    type: "msg",
    avatar: "JR",
  },
  {
    id: 2,
    from: "DISPATCH",
    preview: "⚠ BOLO: Trespasser last seen near Gate C",
    time: "07:35",
    unread: true,
    type: "emergency",
    avatar: "!",
  },
  {
    id: 3,
    from: "M. Chen",
    preview: "Suspicious vehicle — plate logged in report.",
    time: "07:29",
    unread: true,
    type: "msg",
    avatar: "MC",
  },
  {
    id: 4,
    from: "A. Okafor",
    preview: "Level 4 elevator key box checked & sealed.",
    time: "07:20",
    unread: false,
    type: "msg",
    avatar: "AO",
  },
  {
    id: 5,
    from: "SYSTEM",
    preview: "D. Patel tour checkpoint overdue by 12 min.",
    time: "07:16",
    unread: true,
    type: "system",
    avatar: "SY",
  },
  {
    id: 6,
    from: "L. Santos",
    preview: "Parking P1 sweep complete, no anomalies.",
    time: "07:08",
    unread: false,
    type: "msg",
    avatar: "LS",
  },
]

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV = [
  {
    section: "Security Operations",
    items: [
      { label: "Dashboard", active: true },
      { label: "Scheduling" },
      { label: "Time Clock" },
    ],
  },
  {
    section: "People",
    items: [{ label: "Employees" }, { label: "Clients & Sites" }],
  },
  {
    section: "Field",
    items: [
      { label: "Checkpoints & Tours" },
      { label: "Reports & Incidents" },
      { label: "Forms" },
      { label: "Tasks & Dispatch", badge: 5 },
    ],
  },
  {
    section: "Communication",
    items: [
      { label: "Communications" },
      { label: "Activity Journal" },
      { label: "Manage Tickets" },
    ],
  },
  {
    section: "Resources",
    items: [
      { label: "Skills & Certifications" },
      { label: "Documents & Policies" },
      { label: "Training" },
      { label: "Vehicles" },
    ],
  },
  {
    section: "Administration",
    items: [
      { label: "Automations" },
      { label: "Payroll & Back Office" },
      { label: "Settings" },
      { label: "Groups & Segments" },
      { label: "Help" },
      { label: "Help Desk" },
    ],
  },
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ open }: { open: boolean }) {
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <div
      style={{
        width: open ? "220px" : "0px",
        minWidth: open ? "220px" : "0px",
        overflow: "hidden",
        transition: "width 0.25s ease, min-width 0.25s ease",
        display: "flex",
        flexDirection: "column",
        background: "rgba(6,6,6,0.98)",
        backdropFilter: "blur(20px)",
        borderRight: open ? "1px solid rgba(255,255,255,0.07)" : "none",
        flexShrink: 0,
      }}
    >
      {/* Inner — always 220px wide so content doesn't reflow */}
      <div
        style={{
          width: "220px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Scrollable nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0 4px" }}>
          {NAV.map((group) => (
            <div key={group.section} style={{ marginBottom: "4px" }}>
              {/* Section header */}
              <div
                style={{
                  padding: "10px 16px 4px",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  fontWeight: 600,
                  color: "rgba(200,218,248,0.55)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {group.section}
              </div>

              {/* Items */}
              {group.items.map((item) => {
                const isActive = activeItem === item.label
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveItem(item.label)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 16px 7px 20px",
                      background: isActive
                        ? "rgba(85,153,255,0.08)"
                        : "transparent",
                      border: "none",
                      borderLeft: `2px solid ${
                        isActive ? "#5599FF" : "transparent"
                      }`,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12.5px",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#FFFFFF" : "rgba(210,225,252,0.75)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                    {"badge" in item && item.badge && (
                      <span
                        style={{
                          minWidth: "18px",
                          height: "18px",
                          borderRadius: "9px",
                          background: "rgba(255,68,68,0.2)",
                          border: "1px solid rgba(255,68,68,0.45)",
                          fontFamily: "DM Mono, monospace",
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "#FF7070",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 5px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(180,200,255,0.08)",
            flexShrink: 0,
          }}
        />

        {/* User profile */}
        <div
          style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, rgba(74,143,255,0.3), rgba(85,153,255,0.2))",
              border: "1px solid rgba(74,143,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "DM Mono, monospace",
              fontSize: "12px",
              fontWeight: 700,
              color: "#4A8FFF",
            }}
          >
            JM
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              James Morrison
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,218,248,0.65)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Admin
            </div>
          </div>
          <div style={{ marginLeft: "auto", cursor: "pointer", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="4" r="1.2" fill="rgba(200,218,248,0.6)" />
              <circle cx="7" cy="7" r="1.2" fill="rgba(200,218,248,0.6)" />
              <circle cx="7" cy="10" r="1.2" fill="rgba(200,218,248,0.6)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Circular ring ────────────────────────────────────────────────────────────

function Ring({
  done,
  total,
  label,
  color,
  size = 108,
}: {
  done: number
  total: number
  label: string
  color: string
  size?: number
}) {
  const progress = done / total
  const R = size * 0.38
  const STROKE = size * 0.11
  const CX = size / 2
  const CY = size / 2
  const CIRC = 2 * Math.PI * R
  const progressDash = CIRC * progress
  const gapDash = CIRC * (1 - progress)
  const id = label.toLowerCase().replace(/\s/g, "")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <div
        style={{
          filter: `drop-shadow(0 0 10px ${color}55) drop-shadow(0 0 4px ${color}33)`,
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.55" />
            </linearGradient>
            <filter
              id={`glow-${id}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.5"
                result="blur"
              />
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
            stroke="rgba(180,200,255,0.07)"
            strokeWidth={STROKE}
          />
          {Array.from({ length: total }).map((_, i) => {
            const angle = (i / total) * 360 - 90
            const rad = (angle * Math.PI) / 180
            const outerR = R + STROKE / 2 + 1.5
            const innerR = R - STROKE / 2 - 1.5
            return (
              <line
                key={i}
                x1={CX + Math.cos(rad) * outerR}
                y1={CY + Math.sin(rad) * outerR}
                x2={CX + Math.cos(rad) * innerR}
                y2={CY + Math.sin(rad) * innerR}
                stroke={i < done ? `${color}66` : "rgba(180,200,255,0.08)"}
                strokeWidth="1"
              />
            )
          })}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={`url(#grad-${id})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${progressDash} ${gapDash}`}
            transform={`rotate(-90 ${CX} ${CY})`}
            filter={`url(#glow-${id})`}
          />
          {(() => {
            const endAngle = (progress * 360 - 90) * (Math.PI / 180)
            return (
              <circle
                cx={CX + Math.cos(endAngle) * R}
                cy={CY + Math.sin(endAngle) * R}
                r={STROKE / 2 - 1}
                fill={color}
              />
            )
          })()}
          <text
            x={CX}
            y={CY - 5}
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="800"
            fontSize={size * 0.195}
            fill="#FFFFFF"
            letterSpacing="-0.5"
          >
            {done}
          </text>
          <text
            x={CX}
            y={CY + size * 0.115}
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="300"
            fontSize={size * 0.1}
            fill="rgba(180,200,255,0.4)"
          >
            of {total}
          </text>
        </svg>
      </div>
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "10px",
          color: `${color}BB`,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Panel: Guard Operations ──────────────────────────────────────────────────

function OpsPanel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "4px",
        }}
      >
        <Ring done={7} total={9} label="Tours" color="#5599FF" />
        <Ring done={11} total={17} label="Reports" color="#4A8FFF" />
        <Ring done={18} total={22} label="Tasks" color="#5599FF" />
      </div>
      <div
        style={{
          height: "1px",
          background: "rgba(180,200,255,0.07)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "8px",
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
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              color: "rgba(180,195,230,0.45)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Live Activity
          </span>
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
          {activityFeed.map((e) => (
            <div
              key={e.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 8px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.035)",
                borderLeft: `2px solid ${e.color}`,
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  color: "rgba(200,218,248,0.65)",
                  flexShrink: 0,
                  width: "38px",
                }}
              >
                {e.time}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(235,244,255,0.95)",
                  flex: 1,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {e.label}
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  color: "rgba(200,218,248,0.6)",
                  flexShrink: 0,
                }}
              >
                {e.officer}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Panel: Personnel ─────────────────────────────────────────────────────────

const statusColor = (s: string) =>
  s === "active" ? "#5599FF" : s === "late" ? "#FFA500" : "#FF4444"
const statusLabel = (s: string) =>
  s === "active" ? "ON DUTY" : s === "late" ? "LATE" : "BEHIND"

function PersonnelPanel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "14px" }}>
          {["active", "late", "behind"].map((s) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: statusColor(s),
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(180,195,230,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {statusLabel(s)} (
                {officers.filter((o) => o.status === s).length})
              </span>
            </div>
          ))}
        </div>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            color: "rgba(200,218,248,0.6)",
          }}
        >
          {officers.length} ASSIGNED
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "8px",
          overflow: "hidden",
        }}
      >
        {officers.map((o) => {
          const sc = statusColor(o.status)
          const onTime = o.clockIn !== "—" && o.clockIn <= o.scheduled
          return (
            <div
              key={o.id}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 12px",
                borderRadius: "12px",
                background: "rgba(16,16,16,0.98)",
                border: `1px solid ${sc}55`,
                boxShadow: `0 0 0 1px ${sc}18, 0 0 16px ${sc}22, inset 0 1px 0 ${sc}14`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "9px",
                    flexShrink: 0,
                    background: `${sc}18`,
                    border: `1px solid ${sc}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: sc,
                  }}
                >
                  {o.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {o.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      color: "rgba(200,218,248,0.65)",
                    }}
                  >
                    {o.badge}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(180,200,230,0.6)",
                  marginBottom: "8px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {o.role}
              </div>
              <div style={{ display: "flex", gap: "6px", marginTop: "auto" }}>
                <div
                  style={{
                    flex: 1,
                    padding: "4px 6px",
                    borderRadius: "6px",
                    background: "rgba(28,28,28,0.9)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      color: "rgba(200,218,248,0.6)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "2px",
                    }}
                  >
                    Sched.
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(220,235,255,0.8)",
                    }}
                  >
                    {o.scheduled}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "4px 6px",
                    borderRadius: "6px",
                    background: `${sc}0D`,
                    border: `1px solid ${sc}30`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      color: `${sc}80`,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "2px",
                    }}
                  >
                    Actual
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: sc,
                    }}
                  >
                    {o.clockIn === "—" ? (
                      "—"
                    ) : (
                      <>
                        {o.clockIn}
                        {onTime ? (
                          <span
                            style={{
                              fontSize: "8px",
                              marginLeft: "3px",
                              opacity: 0.7,
                            }}
                          >
                            ✓
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: "8px",
                              marginLeft: "3px",
                              opacity: 0.7,
                            }}
                          >
                            +2m
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "6px",
                  alignSelf: "flex-end",
                  padding: "2px 7px",
                  borderRadius: "20px",
                  background: `${sc}14`,
                  border: `1px solid ${sc}40`,
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  color: sc,
                  letterSpacing: "0.06em",
                }}
              >
                {statusLabel(o.status)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Panel: Communications ────────────────────────────────────────────────────

function CommsPanel() {
  const emergencies = messages.filter((m) => m.type === "emergency")
  const rest = messages.filter((m) => m.type !== "emergency")
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "8px",
      }}
    >
      {emergencies.map((e) => (
        <div
          key={e.id}
          style={{
            padding: "8px 12px",
            borderRadius: "10px",
            background: "rgba(255,68,68,0.1)",
            border: "1px solid rgba(255,68,68,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              flexShrink: 0,
              background: "rgba(255,68,68,0.15)",
              border: "1px solid rgba(255,68,68,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L13 12H1L7 1Z"
                stroke="#FF4444"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M7 5.5V8"
                stroke="#FF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="7" cy="10" r="0.75" fill="#FF4444" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "#FF4444",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "2px",
              }}
            >
              Emergency — {e.from}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(255,200,200,0.9)",
                fontWeight: 500,
              }}
            >
              {e.preview}
            </div>
          </div>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              color: "rgba(255,68,68,0.55)",
              flexShrink: 0,
            }}
          >
            {e.time}
          </span>
        </div>
      ))}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {rest.map((m) => {
          const isSystem = m.type === "system"
          const ac = isSystem ? "#FFA500" : "#5599FF"
          return (
            <div
              key={m.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                background: m.unread
                  ? "rgba(85,153,255,0.06)"
                  : "rgba(22,22,22,0.9)",
                border: `1px solid ${
                  m.unread ? "rgba(85,153,255,0.15)" : "rgba(255,255,255,0.06)"
                }`,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  flexShrink: 0,
                  background: `${ac}14`,
                  border: `1px solid ${ac}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: ac,
                }}
              >
                {m.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: m.unread ? 700 : 500,
                      color: m.unread ? "#FFFFFF" : "rgba(220,232,255,0.75)",
                    }}
                  >
                    {m.from}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(200,218,248,0.6)",
                    }}
                  >
                    {m.time}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: isSystem
                      ? "rgba(255,165,0,0.7)"
                      : "rgba(180,195,230,0.5)",
                    marginTop: "1px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.preview}
                </div>
              </div>
              {m.unread && (
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#5599FF",
                    flexShrink: 0,
                    boxShadow: "0 0 6px #5599FF",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Panel: Administration ────────────────────────────────────────────────────

function AdminPanel() {
  const tiles = [
    {
      label: "Users",
      count: "10",
      sub: "Accounts",
      accent: "#4A8FFF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="5" cy="4.5" r="2.2" stroke="#4A8FFF" strokeWidth="1.2" />
          <path
            d="M1 12c0-2.2 1.8-4 4-4s4 1.8 4 4"
            stroke="#4A8FFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="11" cy="4.5" r="1.6" stroke="#4A8FFF" strokeWidth="1" />
          <path
            d="M13.5 11.5c0-1.7-1.1-3-2.5-3"
            stroke="#4A8FFF"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Sites",
      count: "4",
      sub: "Locations",
      accent: "#5599FF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect
            x="1"
            y="5"
            width="12"
            height="8"
            rx="1.5"
            stroke="#5599FF"
            strokeWidth="1.2"
          />
          <path
            d="M4.5 5V4a2.5 2.5 0 0 1 5 0v1"
            stroke="#5599FF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M7 8v2"
            stroke="#5599FF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Groups",
      count: "6",
      sub: "Teams",
      accent: "#5599FF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="5.5" r="2.2" stroke="#5599FF" strokeWidth="1.2" />
          <path
            d="M1.5 13c0-3 2.5-5.5 5.5-5.5S12.5 10 12.5 13"
            stroke="#5599FF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Automations",
      count: "6",
      sub: "Rules",
      accent: "#FFA500",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M8 1.5L5 7.5h4.5L7 13"
            stroke="#FFA500"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Documents",
      count: "8",
      sub: "Files",
      accent: "#B8CCEE",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 1.5h5.5l4 4V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1Z"
            stroke="#B8CCEE"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 1.5V6H13M4.5 8.5h5M4.5 10.5h3.5"
            stroke="#B8CCEE"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Forms",
      count: "6",
      sub: "Custom",
      accent: "#5599FF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="11"
            height="11"
            rx="2.5"
            stroke="#5599FF"
            strokeWidth="1.2"
          />
          <path
            d="M4 5h6M4 7.5h4M4 10h5"
            stroke="#5599FF"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M10.5 9.5l1.5 1.5"
            stroke="#5599FF"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Quizzes",
      count: "6",
      sub: "Assessments",
      accent: "#5599FF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="11"
            height="11"
            rx="2.5"
            stroke="#5599FF"
            strokeWidth="1.2"
          />
          <path
            d="M5.5 6a1.5 1.5 0 1 1 2 1.4V9M7.5 10.5v1"
            stroke="#5599FF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Settings",
      count: "",
      sub: "Config",
      accent: "#889AAA",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2" stroke="#889AAA" strokeWidth="1.2" />
          <path
            d="M7 1.5v1.5M7 11v1.5M1.5 7H3M11 7h1.5M3.1 3.1l1 1M9.9 9.9l1 1M3.1 10.9l1-1M9.9 4.1l1-1"
            stroke="#889AAA"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "8px",
      }}
    >
      {/* Tap hint */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8.5px",
            color: "rgba(184,204,238,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Admin Portal
        </span>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 8px",
            borderRadius: "20px",
            background: "rgba(184,204,238,0.07)",
            border: "1px solid rgba(184,204,238,0.18)",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#5599FF",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              color: "#5599FF",
              letterSpacing: "0.08em",
            }}
          >
            SECURED
          </span>
        </div>
      </div>
      {/* 4-col grid, 2 rows — 8 tiles */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "5px",
        }}
      >
        {tiles.map((t) => (
          <div
            key={t.label}
            style={{
              padding: "8px 8px 7px",
              borderRadius: "10px",
              background: "rgba(20,20,22,0.98)",
              border: `1px solid rgba(255,255,255,0.07)`,
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  background: `${t.accent}14`,
                  border: `1px solid ${t.accent}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {t.icon}
              </div>
              {t.count && (
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  {t.count}
                </span>
              )}
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "rgba(230,240,255,0.92)",
                  lineHeight: 1.2,
                }}
              >
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "8px",
                  color: `${t.accent}90`,
                  letterSpacing: "0.04em",
                  marginTop: "1px",
                }}
              >
                {t.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quadrant wrapper ─────────────────────────────────────────────────────────

function Quadrant({
  title,
  icon,
  accent = "#5599FF",
  children,
}: {
  title: string
  icon: React.ReactNode
  accent?: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: "rgba(14,14,14,0.96)",
        backdropFilter: "blur(20px) saturate(120%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px 9px",
          borderBottom: "1px solid rgba(180,200,255,0.07)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "7px",
            background: `${accent}14`,
            border: `1px solid ${accent}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "10px",
            color: "rgba(180,195,230,0.5)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          padding: "11px 13px 13px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  )
}

const IconOps = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="#5599FF" strokeWidth="1.3" />
    <path
      d="M6 3v3.2l1.8 1.3"
      stroke="#5599FF"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
)
const IconPersonnel = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="4.5" cy="4" r="1.8" stroke="#4A8FFF" strokeWidth="1.2" />
    <path
      d="M1 10.5c0-1.9 1.6-3.5 3.5-3.5S8 8.6 8 10.5"
      stroke="#4A8FFF"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="9" cy="4" r="1.3" stroke="#4A8FFF" strokeWidth="1" />
    <path
      d="M11 10c0-1.4-1-2.5-2.3-2.5"
      stroke="#4A8FFF"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
)
const IconComms = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M1 2h10a.8.8 0 0 1 .8.8v5a.8.8 0 0 1-.8.8H7l-2.5 2.5V8.6H2a.8.8 0 0 1-.8-.8V2.8A.8.8 0 0 1 1.2 2Z"
      stroke="#5599FF"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
)
const IconAdmin = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect
      x="1.5"
      y="1.5"
      width="9"
      height="9"
      rx="2"
      stroke="#B8CCEE"
      strokeWidth="1.2"
    />
    <path
      d="M4 6h4M4 4h4M4 8h2.5"
      stroke="#B8CCEE"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
)

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SupervisorDashboard({
  onBack,
}: {
  onBack: () => void
}) {
  const now = new Date()
  const [time] = useState(
    now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  )
  const [date] = useState(
    now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [activeModule, setActiveModule] =
    useState<"security-ops" | "security-team" | "admin" | "communications" | null>(
      null,
    )
  const [activeSite, setActiveSite] = useState(0)
  const [siteDropOpen, setSiteDropOpen] = useState(false)
  const [sosAlert, setSosAlert] = useState(false)
  const [tacticalOpen, setTacticalOpen] = useState(false)

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {/* Tactical Command toggle — to the left of SOS */}
      <button
        onClick={() => setTacticalOpen((v) => !v)}
        style={{
          position: "absolute",
          top: "-14px",
          left: "-62px",
          zIndex: 100,
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          cursor: "pointer",
          background: tacticalOpen
            ? "linear-gradient(135deg, rgba(58,123,255,0.35) 0%, rgba(85,153,255,0.25) 100%)"
            : "rgba(255,255,255,0.05)",
          border: `1.5px solid ${
            tacticalOpen ? "rgba(85,153,255,0.6)" : "rgba(255,255,255,0.15)"
          }`,
          boxShadow: tacticalOpen
            ? "0 0 0 2px rgba(85,153,255,0.2), 0 0 20px rgba(58,123,255,0.45)"
            : "0 0 8px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
      >
        <svg width="20" height="22" viewBox="0 0 20 23" fill="none">
          <path
            d="M10 1L1 5V11.5C1 16.85 5 21.6 10 23C15 21.6 19 16.85 19 11.5V5L10 1Z"
            fill={
              tacticalOpen ? "rgba(74,143,255,0.2)" : "rgba(255,255,255,0.05)"
            }
            stroke={tacticalOpen ? "#4A8FFF" : "rgba(180,200,255,0.4)"}
            strokeWidth="1.4"
          />
          <path
            d="M7 11.5L9.2 13.5L13.5 9"
            stroke={tacticalOpen ? "#5599FF" : "rgba(180,200,255,0.35)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* SOS toggle — top-left outer corner of the iPad bezel */}
      <button
        onClick={() => setSosAlert((v) => !v)}
        style={{
          position: "absolute",
          top: "-14px",
          left: "-14px",
          zIndex: 100,
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          cursor: "pointer",
          background: sosAlert ? "#CC0000" : "#990000",
          border: `2px solid ${sosAlert ? "#FF5555" : "#CC2222"}`,
          boxShadow: sosAlert
            ? "0 0 0 3px rgba(255,40,40,0.35), 0 0 24px rgba(255,0,0,0.7)"
            : "0 0 0 2px rgba(180,0,0,0.4), 0 0 12px rgba(180,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          transition: "all 0.2s ease",
          animation: sosAlert ? "pulse-dot 1.1s ease-in-out infinite" : "none",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5l8 14H2l8-14Z"
            fill="rgba(255,255,255,0.15)"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M10 8v4"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="10" cy="14.5" r="1.1" fill="#FFFFFF" />
        </svg>
      </button>

      <div
        style={{
          width: "1194px",
          height: "834px",
          flexShrink: 0,
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          outline: "8px solid rgba(22,32,52,0.97)",
          boxShadow: `
        0 0 0 1px rgba(180,200,255,0.07),
        0 0 0 9px rgba(180,200,255,0.04),
        0 60px 120px rgba(0,0,0,0.9),
        0 0 100px rgba(0,100,255,0.06)
      `,
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(175deg, #111111 0%, #0A0A0A 50%, #050505 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
          linear-gradient(rgba(180,200,255,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,200,255,0.022) 1px, transparent 1px)
        `,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />

        {/* Camera pill */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "18px",
            background: "#000",
            borderRadius: "9px",
            zIndex: 30,
          }}
        />

        {/* ── Header with spinning border ── */}
        {/* Spinning border wrapper — sits at the header position */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "52px",
            zIndex: 20,
            padding: "2px",
            overflow: "hidden",
          }}
        >
          {/* Spinning conic gradient — large square centered on header midpoint */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "2000px",
              height: "2000px",
              marginTop: "-1000px",
              marginLeft: "-1000px",
              background: sosAlert
                ? "conic-gradient(from 0deg, #CC0000, #FF3030, #FF6666, #FF3030, #CC0000, #FF3030, #CC0000)"
                : "conic-gradient(from 0deg, #0033FF, #0088FF, #00CFFF, #0055FF, #0022CC, #0088FF, #0033FF)",
              animation: "border-spin 5s linear infinite",
            }}
          />
          {/* Actual header content — inset 2px to reveal the spinning border */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              borderRadius: "0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 16px",
              background: "rgba(8,8,8,0.97)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(180,200,255,0.07)",
            }}
          >
            {/* LEFT: Hamburger + Search */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: 0,
              }}
            >
              {/* Hamburger */}
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  flexShrink: 0,
                  background: sidebarOpen
                    ? "rgba(85,153,255,0.12)"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    sidebarOpen
                      ? "rgba(85,153,255,0.3)"
                      : "rgba(255,255,255,0.1)"
                  }`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: sidebarOpen && i === 1 ? "0px" : "14px",
                      height: "1.5px",
                      borderRadius: "1px",
                      background: sidebarOpen
                        ? "#5599FF"
                        : "rgba(180,195,230,0.7)",
                      transition: "all 0.2s ease",
                      transformOrigin: "center",
                      transform: sidebarOpen
                        ? i === 0
                          ? "rotate(45deg) translate(2px, 4px)"
                          : i === 2
                            ? "rotate(-45deg) translate(2px, -4px)"
                            : "scaleX(0)"
                        : "none",
                    }}
                  />
                ))}
              </button>

              {/* Search bar */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0 12px",
                  height: "34px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(180,200,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="4.5"
                    stroke="rgba(200,218,248,0.65)"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M10 10l2.5 2.5"
                    stroke="rgba(200,218,248,0.65)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search officers, reports, incidents…"
                  style={
                    {
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "12.5px",
                      color: "#FFFFFF",
                      "::placeholder": { color: "rgba(200,218,248,0.6)" },
                    } as React.CSSProperties
                  }
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 2l8 8M10 2l-8 8"
                        stroke="rgba(200,218,248,0.65)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* CENTER: ALEXIOS COMMAND */}
            <div style={{ flexShrink: 0, padding: "0 20px" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.1em",
                }}
              >
                ALEXIOS COMMAND
              </span>
            </div>

            {/* RIGHT: Site selector, Time, Bell, Back */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              {/* Site selector */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setSiteDropOpen((v) => !v)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 13px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    background: siteDropOpen
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: activeSite === 0 ? "#4A8FFF" : "#5599FF",
                      flexShrink: 0,
                      animation:
                        activeSite !== 0
                          ? "pulse-dot 2s ease-in-out infinite"
                          : undefined,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "rgba(230,242,255,0.92)",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {SITES[activeSite].toUpperCase()}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{
                      transform: siteDropOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M2 3.5L5 6.5L8 3.5"
                      stroke="rgba(200,215,245,0.6)"
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
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 50,
                      background: "rgba(15,15,18,0.99)",
                      border: "1px solid rgba(255,255,255,0.13)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      minWidth: "200px",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
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
                          padding: "10px 16px",
                          cursor: "pointer",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          background:
                            i === activeSite
                              ? "rgba(255,255,255,0.07)"
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
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            background:
                              i === activeSite
                                ? i === 0
                                  ? "#4A8FFF"
                                  : "#5599FF"
                                : "rgba(255,255,255,0.18)",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "13px",
                            fontWeight: i === activeSite ? 600 : 400,
                            color:
                              i === activeSite
                                ? "#FFFFFF"
                                : "rgba(210,225,250,0.7)",
                          }}
                        >
                          {site}
                        </span>
                        {i === activeSite && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            style={{ marginLeft: "auto" }}
                          >
                            <path
                              d="M2 5l2.5 2.5L8 3"
                              stroke="rgba(228,240,255,0.88)"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Time */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {time}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    color: "rgba(180,195,230,0.38)",
                  }}
                >
                  {date}
                </div>
              </div>

              {/* Bell */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  flexShrink: 0,
                  background: "rgba(255,165,0,0.09)",
                  border: "1px solid rgba(255,165,0,0.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M7.5 2a3.8 3.8 0 0 1 3.8 3.8v3L12.5 11h-10l1.2-2.2V5.8A3.8 3.8 0 0 1 7.5 2Z"
                    stroke="#FFA500"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 13.2a1.5 1.5 0 0 0 3 0"
                    stroke="#FFA500"
                    strokeWidth="1.2"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    background: "#FF4444",
                    border: "2px solid #090E1A",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "7px",
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  3
                </div>
              </div>

              {/* Back */}
              <button
                onClick={onBack}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M8.5 2L3.5 6.5l5 4.5"
                    stroke="rgba(180,195,230,0.6)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {/* end right section */}
          </div>
          {/* end inner header content */}
        </div>
        {/* end spinning border wrapper */}

        {/* ── Body: sidebar + grid ── */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Sidebar open={sidebarOpen} />
          {tacticalOpen && <TacticalCommand />}

          {/* Grid or module */}
          {activeModule === "security-ops" ? (
            <SecurityOpsModule onClose={() => setActiveModule(null)} />
          ) : activeModule === "security-team" ? (
            <SecurityTeamModule onClose={() => setActiveModule(null)} />
          ) : activeModule === "admin" ? (
            <AdminModule onClose={() => setActiveModule(null)} />
          ) : activeModule === "communications" ? (
            <CommunicationsModule onClose={() => setActiveModule(null)} />
          ) : (
            <div
              style={{
                flex: 1,
                alignSelf: "stretch",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "8px",
                padding: "8px",
                minWidth: 0,
                minHeight: 0,
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Security Operations — clickable */}
              <div
                onClick={() => setActiveModule("security-ops")}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  height: "100%",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#0A0A0A",
                  boxShadow: sosAlert
                    ? "0 0 50px rgba(255,30,30,0.55), 0 0 100px rgba(255,0,0,0.25)"
                    : "0 0 40px rgba(58,123,255,0.08)",
                }}
              >
                <Quadrant
                  title="Security Operations"
                  icon={<IconOps />}
                  accent={sosAlert ? "#FF3030" : "#5599FF"}
                >
                  <OpsPanel />
                </Quadrant>
                {/* Incident response overlay */}
                {sosAlert && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10,
                      background: "rgba(6,2,2,0.93)",
                      borderRadius: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      padding: "18px 16px",
                      overflowY: "auto",
                    }}
                  >
                    {/* Status header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: "#FF3030",
                          boxShadow: "0 0 10px #FF3030",
                          animation: "pulse-dot 1s ease-in-out infinite",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#FF3030",
                          letterSpacing: "0.12em",
                        }}
                      >
                        INCIDENT RESPONSE UNDERWAY
                      </span>
                    </div>

                    {/* Profile card */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        flexShrink: 0,
                        background: "rgba(255,30,30,0.07)",
                        border: "1px solid rgba(255,40,40,0.3)",
                      }}
                    >
                      {/* Avatar */}
                      <div
                        style={{
                          width: "54px",
                          height: "54px",
                          borderRadius: "14px",
                          flexShrink: 0,
                          background: "rgba(255,40,40,0.12)",
                          border: "2px solid rgba(255,40,40,0.45)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 16px rgba(255,30,30,0.3)",
                        }}
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <circle
                            cx="15"
                            cy="11"
                            r="5.5"
                            stroke="#FF4444"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M4 27c0-6.08 4.92-11 11-11s11 4.92 11 11"
                            stroke="#FF4444"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            fontFamily: "Space Grotesk, sans-serif",
                            lineHeight: 1.1,
                          }}
                        >
                          Officer Rivera
                        </div>
                        <div
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: "10px",
                            color: "rgba(255,120,120,0.85)",
                            letterSpacing: "0.06em",
                            marginTop: "3px",
                          }}
                        >
                          SECURITY OFFICER — MERIDIAN TOWER
                        </div>
                        <div
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: "9px",
                            color: "rgba(185,205,235,0.5)",
                            marginTop: "2px",
                          }}
                        >
                          Badge #4471 · Sector 4 / North Perimeter
                        </div>
                      </div>
                    </div>

                    {/* Action buttons — 3 per row × 2 rows */}
                    {[
                      [
                        {
                          label: "Radio Officer",
                          icon: (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <circle
                                cx="7.5"
                                cy="9"
                                r="3.8"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                              />
                              <path
                                d="M7.5 5V2M5 3.5L3.5 2M10 3.5l1.5-1.5"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                              <circle cx="7.5" cy="9" r="1.3" fill="#FF3030" />
                            </svg>
                          ),
                        },
                        {
                          label: "Listen In",
                          icon: (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <path
                                d="M2 7a5.5 5.5 0 0 1 11 0"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                              <path
                                d="M4.5 7a3 3 0 0 1 6 0"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                              <circle cx="7.5" cy="7" r="1.3" fill="#FF3030" />
                              <path
                                d="M7.5 7v4"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          ),
                        },
                        {
                          label: "Show Location",
                          icon: (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <path
                                d="M7.5 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3.4-4.5 8.5-4.5 8.5S3 9.4 3 6a4.5 4.5 0 0 1 4.5-4.5Z"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                              />
                              <circle cx="7.5" cy="6" r="1.6" fill="#FF3030" />
                            </svg>
                          ),
                        },
                      ],
                      [
                        {
                          label: "Alert Company Leadership",
                          icon: (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <path
                                d="M7.5 1.5l6.5 11.5H1L7.5 1.5Z"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.5 6v3"
                                stroke="#FF3030"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                              <circle cx="7.5" cy="11" r="0.9" fill="#FF3030" />
                            </svg>
                          ),
                        },
                        {
                          label: "Alert Security Team",
                          icon: (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <circle
                                cx="5"
                                cy="5"
                                r="2.2"
                                stroke="#FF3030"
                                strokeWidth="1.3"
                              />
                              <path
                                d="M1 13c0-2.2 1.8-4 4-4s4 1.8 4 4"
                                stroke="#FF3030"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                              />
                              <circle
                                cx="11"
                                cy="5"
                                r="1.6"
                                stroke="#FF3030"
                                strokeWidth="1.2"
                              />
                              <path
                                d="M13.5 12c0-1.7-1.1-3-2.5-3"
                                stroke="#FF3030"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                            </svg>
                          ),
                        },
                        {
                          label: "Acknowledge & Close",
                          icon: (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <path
                                d="M2.5 7.5l3.5 3.5 6.5-7"
                                stroke="#5599FF"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ),
                          green: true,
                        },
                      ],
                    ].map((row, ri) => (
                      <div
                        key={ri}
                        style={{ display: "flex", gap: "8px", flexShrink: 0 }}
                      >
                        {row.map((btn: any) => (
                          <button
                            key={btn.label}
                            onClick={
                              btn.green ? () => setSosAlert(false) : undefined
                            }
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "7px",
                              padding: "12px 6px",
                              borderRadius: "11px",
                              cursor: "pointer",
                              background: btn.green
                                ? "rgba(85,153,255,0.08)"
                                : "rgba(255,40,40,0.07)",
                              border: `1px solid ${
                                btn.green
                                  ? "rgba(85,153,255,0.35)"
                                  : "rgba(255,40,40,0.32)"
                              }`,
                              color: btn.green ? "#5599FF" : "#FF3030",
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "10.5px",
                              fontWeight: 600,
                              lineHeight: 1.2,
                              textAlign: "center",
                            }}
                          >
                            {btn.icon}
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={() => setActiveModule("security-team")}
                style={{
                  cursor: "pointer",
                  borderRadius: "16px",
                  transition: "box-shadow 0.15s ease",
                  boxShadow: "0 0 0 1px rgba(74,143,255,0.12)",
                  minHeight: 0,
                }}
              >
                <Quadrant
                  title="Security Team"
                  icon={<IconPersonnel />}
                  accent="#4A8FFF"
                >
                  <PersonnelPanel />
                </Quadrant>
              </div>
              <div
                onClick={() => setActiveModule("communications")}
                style={{
                  cursor: "pointer",
                  borderRadius: "16px",
                  boxShadow: "0 0 0 1px rgba(85,153,255,0.12)",
                  transition: "box-shadow 0.15s ease",
                  minHeight: 0,
                }}
              >
                <Quadrant
                  title="Communications"
                  icon={<IconComms />}
                  accent="#5599FF"
                >
                  <CommsPanel />
                </Quadrant>
              </div>
              <div
                onClick={() => setActiveModule("admin")}
                style={{
                  cursor: "pointer",
                  borderRadius: "16px",
                  boxShadow: "0 0 0 1px rgba(184,204,238,0.1)",
                  minHeight: 0,
                }}
              >
                <Quadrant
                  title="Administration"
                  icon={<IconAdmin />}
                  accent="#B8CCEE"
                >
                  <AdminPanel />
                </Quadrant>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
