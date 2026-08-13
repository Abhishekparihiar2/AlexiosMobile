import NavBar from "./NavBar"
import { ShiftStatusCard } from "./ShiftStatusCard"

interface Props {
  onStartPatrol: () => void
  onNavigateReports?: () => void
  onNavigateProfile?: () => void
  onNavigateHome?: () => void
  onNavigateOps?: () => void
  onNavigateSearch?: () => void
  onNavigateTasks?: () => void
  onNavigateTours?: () => void
}

export default function WelcomeScreen({
  onStartPatrol,
  onNavigateReports,
  onNavigateProfile,
  onNavigateHome,
  onNavigateOps,
  onNavigateSearch,
  onNavigateTasks,
  onNavigateTours,
}: Props) {
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
        boxShadow: `
          0 0 0 1px rgba(180,200,255,0.08),
          0 0 0 10px rgba(180,200,255,0.06),
          0 50px 100px rgba(0,0,0,0.9)
        `,
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `
          radial-gradient(ellipse at 18% 0%,  rgba(74,143,255,0.13) 0%, transparent 45%),
          radial-gradient(ellipse at 82% 12%, rgba(77,217,232,0.06) 0%, transparent 38%),
          radial-gradient(ellipse at 50% 100%,rgba(58,123,255,0.08) 0%, transparent 48%),
          linear-gradient(175deg, #0D1525 0%, #0B111E 40%, #090E1A 100%)
        `,
        }}
      />
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

      {/* Dynamic Island */}
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

      {/* Status bar */}
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

      {/* ── Content ── */}
      <div
        style={{
          position: "absolute",
          top: "58px",
          left: 0,
          right: 0,
          bottom: "88px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "22px 16px 14px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div style={{ width: "100%", flexShrink: 0 }}>
          <ShiftStatusCard
            shift={{
              officerName: "Officer Michael",
              dateString: "Thursday, Jul 10",
              timeString: "08:00 – 16:00",
              location: "The Ritz-Carlton Residences — Tower B",
              shiftStatus: "ready",
            }}
            onClockIn={onStartPatrol}
          />
        </div>

        {/* ── Active Assignment Card ── */}
        <div
          onClick={onNavigateTasks}
          style={{
            width: "100%",
            marginTop: "12px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(25px) saturate(140%)",
            WebkitBackdropFilter: "blur(25px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "16px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "rgba(180,200,255,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Tonight's Assignment
            </span>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "20px",
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.25)",
                fontSize: "9px",
                color: "#60A5FA",
                fontWeight: 700,
              }}
            >
              ACTIVE
            </span>
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "18px",
                color: "#F0F4FF",
                marginBottom: "2px",
              }}
            >
              Main Lobby Security
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#3B82F6",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              08:00 PM – 06:00 AM
            </div>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              ["Site", "Peachtree Tower, Atlanta GA"],
              ["Position", "Security Officer II"],
              ["Supervisor", "Sgt. Diana Torres"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(180,200,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {k}
                </span>
                <span
                  style={{ fontSize: "11px", color: "rgba(220,235,255,0.9)" }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contextual Primary Action ── */}
        <div
          onClick={onNavigateTours}
          style={{
            width: "100%",
            marginTop: "12px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(25px) saturate(140%)",
            border: "1px solid rgba(59,130,246,0.22)",
            borderRadius: "16px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 0 32px rgba(59,130,246,0.08)",
            cursor: "pointer",
            flexShrink: 0,
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#3B82F6",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Next Tour
            </span>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "20px",
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
                fontSize: "9px",
                color: "#F59E0B",
                fontWeight: 700,
              }}
            >
              IN 12 MIN
            </span>
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "17px",
                color: "#F0F4FF",
                marginBottom: "2px",
              }}
            >
              Lobby & Exterior Patrol
            </div>
            <div style={{ fontSize: "11px", color: "rgba(180,200,255,0.6)" }}>
              9 checkpoints · Est. 45 minutes
            </div>
          </div>

          <button
            style={{
              width: "100%",
              height: "42px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
              border: "1px solid rgba(96,165,250,0.3)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 11l19-9-9 19-2-8-8-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            START TOUR
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <NavBar
          onNavigateHome={onNavigateHome}
          onNavigateReports={onNavigateReports}
          onNavigateOps={onNavigateOps}
          onNavigateSearch={onNavigateSearch}
          onNavigateProfile={onNavigateProfile}
        />
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
