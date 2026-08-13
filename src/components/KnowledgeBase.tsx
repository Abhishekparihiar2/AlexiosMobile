import { useState } from "react"
import { documents, KBDocument } from "./kb/data"
import DocumentModal from "./kb/DocumentModal"
import CopilotOverlay from "./kb/CopilotOverlay"
import SupervisorPanel from "./kb/SupervisorPanel"

interface Props {
  onBack: () => void
  isSupervisor?: boolean
}

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px) saturate(140%)",
  WebkitBackdropFilter: "blur(20px) saturate(140%)",
  border: "1px solid rgba(77,217,232,0.18)",
  borderRadius: "16px",
}

function IconDocument() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect
        x="4"
        y="3"
        width="22"
        height="24"
        rx="3.5"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.8"
      />
      <line
        x1="9"
        y1="10"
        x2="21"
        y2="10"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="15"
        x2="21"
        y2="15"
        stroke="rgba(180,210,255,0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="20"
        x2="16"
        y2="20"
        stroke="rgba(180,210,255,0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPin() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M15 4C11.13 4 8 7.13 8 11c0 5.25 7 15 7 15s7-9.75 7-15c0-3.87-3.13-7-7-7z"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="15"
        cy="11"
        r="2.5"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function IconRadio() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect
        x="5"
        y="13"
        width="20"
        height="13"
        rx="3"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.8"
      />
      <circle
        cx="15"
        cy="19.5"
        r="3"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.6"
      />
      <path
        d="M11 9l4-4 4 4"
        stroke="rgba(77,217,232,0.8)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="15" r="1.5" fill="rgba(77,217,232,0.9)" />
    </svg>
  )
}

function IconChecklist() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect
        x="4"
        y="3"
        width="22"
        height="24"
        rx="3.5"
        stroke="rgba(180,210,255,0.8)"
        strokeWidth="1.8"
      />
      <circle cx="9.5" cy="11" r="1.8" fill="rgba(77,217,232,0.85)" />
      <circle cx="9.5" cy="17" r="1.8" fill="rgba(77,217,232,0.85)" />
      <circle cx="9.5" cy="23" r="1.8" fill="rgba(77,217,232,0.35)" />
      <line
        x1="14"
        y1="11"
        x2="23"
        y2="11"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="17"
        x2="23"
        y2="17"
        stroke="rgba(180,210,255,0.75)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="23"
        x2="20"
        y2="23"
        stroke="rgba(180,210,255,0.4)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function KnowledgeBase({ onBack, isSupervisor = true }: Props) {
  const [openDoc, setOpenDoc] = useState<KBDocument | null>(null)
  const [docs, setDocs] = useState(documents)
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [supervisorOpen, setSupervisorOpen] = useState(false)

  const urgentDoc = docs.find((d) => d.urgent)

  const handleMarkRead = (id: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, readStatus: "read" as const } : d,
      ),
    )
  }

  const tiles = [
    {
      icon: <IconDocument />,
      title: "General SOPs",
      sub: "Company-wide rules and standing guidelines.",
      glow: "rgba(77,217,232,0.12)",
    },
    {
      icon: <IconPin />,
      title: "Post Orders",
      sub: "Site-specific rules (Filtered by active post).",
      glow: "rgba(77,217,232,0.12)",
      urgent: true,
    },
    {
      icon: <IconRadio />,
      title: "Radio & Comms",
      sub: "Communication channels and live dispatch reference.",
      glow: "rgba(77,217,232,0.12)",
    },
    {
      icon: <IconChecklist />,
      title: "Tasks & Duties",
      sub: "Daily operational tasks and shift checklists.",
      glow: "rgba(77,217,232,0.12)",
    },
  ]

  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        position: "relative",
        overflow: "hidden",
        background: "#0B0F19",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Faint grid overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `
          linear-gradient(rgba(77,217,232,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(77,217,232,0.025) 1px, transparent 1px)
        `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient glow top */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(74,143,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Status bar ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "50px",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 28px 8px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            flex: 1,
            fontWeight: 600,
            fontSize: "13px",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "-0.2px",
          }}
        >
          9:41
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {[5, 7, 9, 11].map((h, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: `${h}px`,
                borderRadius: "1px",
                background:
                  i < 3 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            style={{ marginLeft: "3px" }}
          >
            <path
              d="M1 7.5C3.2 5.3 5.8 4 7.5 4C9.2 4 11.8 5.3 14 7.5"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M3.5 9.5C5 8 6.2 7 7.5 7C8.8 7 10 8 11.5 9.5"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="7.5" cy="10.8" r="1" fill="rgba(255,255,255,0.9)" />
          </svg>
          <div
            style={{
              width: "22px",
              height: "11px",
              border: "1.5px solid rgba(255,255,255,0.5)",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              padding: "1.5px",
              marginLeft: "2px",
            }}
          >
            <div
              style={{
                width: "72%",
                height: "100%",
                borderRadius: "1.5px",
                background: "rgba(255,255,255,0.9)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Header Navigation ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "6px 20px 14px",
        }}
      >
        {/* Back button */}
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

        {/* Title centered */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: "17px",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
            }}
          >
            KNOWLEDGE BASE
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(77,217,232,0.6)",
              letterSpacing: "2px",
              marginTop: "2px",
            }}
          >
            SOP & POST ORDERS LIBRARY
          </div>
        </div>

        {/* Supervisor + button */}
        {isSupervisor ? (
          <button
            onClick={() => setSupervisorOpen(true)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              flexShrink: 0,
              border: "1px solid rgba(77,217,232,0.3)",
              background: "rgba(77,217,232,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="7"
                y1="1.5"
                x2="7"
                y2="12.5"
                stroke="#4DD9E8"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="1.5"
                y1="7"
                x2="12.5"
                y2="7"
                stroke="#4DD9E8"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : (
          <div style={{ width: "38px" }} />
        )}
      </div>

      {/* ── Scrollable content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          padding: "0 16px 16px",
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            ...glass,
            borderRadius: "14px",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            height: "50px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <circle
              cx="7"
              cy="7"
              r="5.5"
              stroke="rgba(77,217,232,0.5)"
              strokeWidth="1.5"
            />
            <line
              x1="11"
              y1="11"
              x2="14.5"
              y2="14.5"
              stroke="rgba(77,217,232,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search SOPs, post orders, and protocols..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "13px",
              color: "#FFFFFF",
              caretColor: "#4DD9E8",
            }}
          />
        </div>

        {/* 2×2 Core Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "10px",
            height: "252px",
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.title}
              style={{
                ...glass,
                background: `rgba(255,255,255,0.04)`,
                boxShadow: `0 0 18px ${tile.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Cyan corner glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(77,217,232,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "rgba(77,143,255,0.1)",
                    border: "1px solid rgba(180,200,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {tile.icon}
                </div>

                {tile.urgent && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background: "rgba(255,165,0,0.12)",
                      border: "1px solid rgba(255,165,0,0.3)",
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#FFA500",
                        boxShadow: "0 0 4px rgba(255,165,0,0.9)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "7.5px",
                        fontWeight: 600,
                        color: "#FFA500",
                        letterSpacing: "1px",
                      }}
                    >
                      URGENT
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#FFFFFF",
                    letterSpacing: "-0.1px",
                    marginBottom: "3px",
                  }}
                >
                  {tile.title}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    color: "rgba(140,165,210,0.6)",
                    lineHeight: 1.4,
                    letterSpacing: "0.2px",
                  }}
                >
                  {tile.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgent Alert Banner */}
        <div
          style={{
            background: "rgba(255,140,0,0.07)",
            border: "1px solid rgba(255,140,0,0.22)",
            borderRadius: "12px",
            padding: "11px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5L14.5 14H1.5L8 1.5Z"
              stroke="#FFA500"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <line
              x1="8"
              y1="6"
              x2="8"
              y2="9.5"
              stroke="#FFA500"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="8" cy="11.5" r="0.75" fill="#FFA500" />
          </svg>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9.5px",
              fontWeight: 600,
              color: "#FFA500",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            1 URGENT DOCUMENT REQUIRES ATTENTION
          </span>
        </div>

        {/* Urgent Document Row */}
        {urgentDoc && (
          <div
            onClick={() => setOpenDoc(urgentDoc)}
            style={{
              ...glass,
              borderColor: "rgba(255,80,80,0.2)",
              background: "rgba(255,40,40,0.04)",
              borderRadius: "14px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                flexShrink: 0,
                background: "rgba(255,50,50,0.1)",
                border: "1px solid rgba(255,80,80,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 2L20 19H2L11 2Z"
                  stroke="rgba(255,80,80,0.9)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1="11"
                  y1="8.5"
                  x2="11"
                  y2="13"
                  stroke="rgba(255,80,80,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="15.5" r="0.9" fill="rgba(255,80,80,0.9)" />
              </svg>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#FFFFFF",
                  letterSpacing: "-0.1px",
                  marginBottom: "4px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {urgentDoc.title}
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(130,155,200,0.55)",
                  letterSpacing: "0.3px",
                }}
              >
                Updated {urgentDoc.updatedAt}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(211,47,47,0.18)",
                  border: "1px solid rgba(211,47,47,0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "8px",
                    fontWeight: 600,
                    color: "#FF6060",
                    letterSpacing: "1px",
                  }}
                >
                  URGENT
                </span>
              </div>
              <span
                style={{
                  fontSize: "18px",
                  color: "rgba(180,200,255,0.35)",
                  lineHeight: 1,
                }}
              >
                ›
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Tactical CoPilot Bar (pinned above NavBar) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "8px 16px 0",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => setCopilotOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "rgba(10,16,30,0.92)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
            border: "1px solid rgba(77,217,232,0.22)",
            borderRadius: "28px",
            padding: "12px 20px 12px 12px",
            cursor: "pointer",
            boxShadow:
              "0 0 20px rgba(74,143,255,0.12), 0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Mic icon circle */}
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              flexShrink: 0,
              background: "rgba(74,143,255,0.15)",
              border: "1px solid rgba(74,143,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(74,143,255,0.3)",
            }}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <rect
                x="5"
                y="1"
                width="8"
                height="13"
                rx="4"
                stroke="#4A8FFF"
                strokeWidth="1.7"
              />
              <path
                d="M1 11C1 15.4183 4.58172 19 9 19C13.4183 19 17 15.4183 17 11"
                stroke="#4DD9E8"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <line
                x1="9"
                y1="19"
                x2="9"
                y2="22"
                stroke="#4DD9E8"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <line
                x1="5.5"
                y1="22"
                x2="12.5"
                y2="22"
                stroke="#4DD9E8"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "14px",
                color: "#FFFFFF",
                letterSpacing: "0.5px",
              }}
            >
              Tactical CoPilot
            </div>
            <div
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(77,217,232,0.65)",
                letterSpacing: "1.5px",
                marginTop: "2px",
              }}
            >
              TAP TO ENGAGE
            </div>
          </div>

          {/* Pulse indicator */}
          <div
            style={{
              position: "relative",
              width: "24px",
              height: "24px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "rgba(77,217,232,0.1)",
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#4DD9E8",
                boxShadow: "0 0 8px rgba(77,217,232,0.9)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom NavBar ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          borderTop: "1px solid rgba(180,200,255,0.06)",
          background: "rgba(9,13,22,0.95)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: "10px",
          paddingBottom: "26px",
        }}
      >
        {[
          {
            path: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
            label: "Home",
            active: false,
          },
          {
            path: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
            label: "Reports",
            active: false,
          },
          {
            path: "M3 3h7v7H3zM13 3h7v7h-7zM3 13h7v7H3zM13 13h7v7h-7z",
            label: "Ops",
            active: false,
          },
          {
            path: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
            label: "Search",
            active: true,
          },
          {
            path: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
            label: "Profile",
            active: false,
          },
        ].map((item) => (
          <button
            key={item.label}
            onClick={
              item.label === "Home" || item.label === "Ops" ? onBack : undefined
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 10px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={item.active ? "#4DD9E8" : "rgba(130,155,200,0.38)"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.path} />
            </svg>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                letterSpacing: "0.8px",
                color: item.active ? "#4DD9E8" : "rgba(130,155,200,0.38)",
              }}
            >
              {item.label.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* ── Overlays ── */}
      {openDoc && (
        <DocumentModal
          doc={openDoc}
          isSupervisor={isSupervisor}
          onClose={() => setOpenDoc(null)}
          onMarkRead={handleMarkRead}
        />
      )}
      {copilotOpen && (
        <CopilotOverlay
          onClose={() => setCopilotOpen(false)}
          onOpenDoc={(doc) => {
            setCopilotOpen(false)
            setOpenDoc(doc)
          }}
        />
      )}
      {supervisorOpen && (
        <SupervisorPanel onClose={() => setSupervisorOpen(false)} />
      )}
    </div>
  )
}
