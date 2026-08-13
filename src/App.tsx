import { useState } from "react"
import Header from "./components/Header"
import PatrolCard from "./components/PatrolCard"
import FeatureRows from "./components/FeatureRows"
import CoPilotButton from "./components/CoPilotButton"
import NavBar from "./components/NavBar"
import LoginScreen from "./components/LoginScreen"
import SplashScreen from "./components/SplashScreen"
import WelcomeScreen from "./components/WelcomeScreen"
import KnowledgeBase from "./components/KnowledgeBase"
import RadioScreen from "./components/RadioScreen"
import ToursScreen from "./components/ToursScreen"
import SiteStatusScreen from "./components/SiteStatusScreen"
import MapScreen from "./components/MapScreen"
import ProfileScreen from "./components/ProfileScreen"
import ReportsScreen from "./components/ReportsScreen"
import TasksScreen from "./components/TasksScreen"
import CommsScreen from "./components/CommsScreen"
import DashboardScreen from "./components/DashboardScreen"
import MoreScreen from "./components/MoreScreen"
import ScheduleScreen from "./components/ScheduleScreen"
import SiteScreen from "./components/SiteScreen"
export default function App() {
  const [screen, setScreen] =
    useState<
      | "splash"
      | "login"
      | "welcome"
      | "main"
      | "kb"
      | "radio"
      | "sitestatus"
      | "map"
      | "profile"
      | "reports"
      | "tasks"
    >("splash")
  const [activeTab, setActiveTab] = useState<"home" | "site" | "schedule" | "tour" | "comms" | "settings">("home")
  const [sosOpen, setSosOpen] = useState(false)
  const [activeIncident, setActiveIncident] = useState<{type: string, time: string} | null>(null)
  const [supervisorAlert, setSupervisorAlert] = useState<{type: string, time: string, officer: string} | null>(null)

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        background: "var(--navy-950)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        flexDirection: "column",
      }}
    >
      {screen === "splash" && (
        <SplashScreen onFinish={() => setScreen("login")} />
      )}
      {screen === "login" && (
        <LoginScreen onLogin={() => {
          setScreen("main")
          setActiveTab("home")
        }} />
      )}
      {screen === "welcome" && (
        <WelcomeScreen
          onStartPatrol={() => {
            setScreen("main")
            setActiveTab("home")
          }}
          onNavigateReports={() => setScreen("reports")}
          onNavigateProfile={() => setScreen("profile")}
          onNavigateTasks={() => setScreen("tasks")}
          onNavigateTours={() => {
            setScreen("main")
            setActiveTab("site")
          }}
          onNavigateHome={() => setScreen("welcome")}
          onNavigateOps={() => setScreen("tasks")}
          onNavigateSearch={() => setScreen("sitestatus")}
        />
      )}
      {screen === "kb" && (
        <KnowledgeBase onBack={() => setScreen("main")} />
      )}
      {screen === "radio" && (
        <RadioScreen onBack={() => setScreen("main")} />
      )}
      {screen === "sitestatus" && (
        <SiteStatusScreen onBack={() => setScreen("main")} />
      )}
      {screen === "map" && <MapScreen onBack={() => setScreen("main")} />}
      {screen === "profile" && (
        <ProfileScreen onBack={() => setScreen("main")} />
      )}
      {screen === "reports" && (
        <ReportsScreen onBack={() => setScreen("main")} />
      )}
      {screen === "tasks" && (
        <TasksScreen onBack={() => setScreen("main")} />
      )}
      {screen === "main" && (
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "100dvh",
            position: "relative",
            overflow: "hidden",
            background: "var(--navy-700)",
          }}
        >
          {/* ── Canvas background (Layers 1-3) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              /* Layer 1: Screen Gradient */
              background: `radial-gradient(ellipse 90% 60% at 50% 15%, #0D1E3A 0%, #07101E 45%, #020408 100%)`,
            }}
          />
          {/* Layer 2: Tactical Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              opacity: 0.8,
            }}
          />
          {/* Layer 3: Ambient Glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 30%, rgba(14,165,233,0.12) 0%, transparent 60%)`,
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
              {/* Signal */}
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
                        i < 3
                          ? "rgba(255,255,255,0.88)"
                          : "rgba(255,255,255,0.22)",
                    }}
                  />
                ))}
              </div>
              {/* WiFi */}
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
              {/* Battery */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "1px" }}
              >
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
              /* leave room for nav bar (~80px) + home indicator (~24px) */
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
            {activeTab === "home" && (
              <DashboardScreen 
                onSOS={() => setSosOpen(true)}
                onNavigateSite={() => setActiveTab("site")}
                onNavigateTour={() => setActiveTab("tour")}
                onNavigateComms={() => setActiveTab("comms")}
                onNavigateKB={() => setScreen("kb")}
                onNavigateRadio={() => setScreen("radio")}
                onNavigateSiteStatus={() => setScreen("sitestatus")}
                onNavigateTasks={() => setActiveTab("tasks")}
                onNavigateMap={() => setScreen("map")}
                onNavigateSchedule={() => setActiveTab("schedule")}
                onNavigateReports={() => setScreen("reports")}
              />
            )}
            {activeTab === "tour" && (
              <ToursScreen onBack={() => setActiveTab("home")} />
            )}
            {activeTab === "site" && (
              <SiteScreen onBack={() => setActiveTab("home")} />
            )}
            {activeTab === "schedule" && (
              <ScheduleScreen onBack={() => setActiveTab("home")} onNavigateTour={() => setActiveTab("tour")} />
            )}
            {activeTab === "tasks" && (
              <TasksScreen onBack={() => setActiveTab("home")} />
            )}
            {activeTab === "comms" && (
              <CommsScreen onBack={() => setActiveTab("home")} />
            )}
            {activeTab === "settings" && (
              <MoreScreen 
                onNavigateReports={() => setScreen("reports")}
                onNavigateProfile={() => setScreen("profile")}
              />
            )}
          </div>

          {/* ── SOS Overlay ── */}
          {sosOpen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 100,
                background: "rgba(6,2,2,0.97)",
                display: "flex",
                flexDirection: "column",
                animation: "sos-drop 0.22s ease-out",
              }}
            >
              {/* Status bar spacer */}
              <div style={{ height: "64px", flexShrink: 0 }} />

              {activeIncident ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                  <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,48,48,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", animation: "pulse-dot 1.5s infinite" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,48,48,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#FF3030", boxShadow: "0 0 20px #FF3030" }} />
                    </div>
                  </div>
                  <h2 style={{ color: "white", fontSize: "28px", fontWeight: 700, marginBottom: "12px", textAlign: "center", lineHeight: 1.2 }}>{activeIncident.type}</h2>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
                    <span style={{ color: "rgba(255,120,120,0.9)", fontFamily: "DM Mono, monospace", fontSize: "14px", fontWeight: 600 }}>DISPATCH NOTIFIED</span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Mono, monospace", fontSize: "12px" }}>Time of Alert: {activeIncident.time}</span>
                  </div>
                  
                  <button onClick={() => { setActiveIncident(null); setSosOpen(false); setSupervisorAlert(null); }} style={{ width: "100%", padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontWeight: 600, fontSize: "16px", cursor: "pointer", transition: "all 0.2s" }}>
                    Resolve & Stand Down
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
              <div style={{ padding: "0 24px 28px", flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
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
                      letterSpacing: "0.14em",
                    }}
                  >
                    SOS ACTIVATED
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.2,
                  }}
                >
                  Select your situation
                </div>
                <div
                  style={{
                    marginTop: "6px",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "11px",
                    color: "rgba(255,120,120,0.7)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Your supervisor will be notified immediately
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  flex: 1,
                  padding: "0 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  {
                    icon: (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M11 3v8M11 14v1"
                          stroke="#FF3030"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="9.5"
                          stroke="#FF3030"
                          strokeWidth="1.5"
                        />
                      </svg>
                    ),
                    label: "Responding to Incident",
                    sub: "Signal active response",
                  },
                  {
                    icon: (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M11 4C7.13 4 4 7.13 4 11s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7Z"
                          stroke="#FF3030"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 11h6M11 8v6"
                          stroke="#FF3030"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    label: "Need Immediate Backup",
                    sub: "Request officer support",
                  },
                  {
                    icon: (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M3 11h2M17 11h2M11 3v2M11 17v2"
                          stroke="#FF3030"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="5"
                          stroke="#FF3030"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M7 7l1.5 1.5M13.5 13.5L15 15M7 15l1.5-1.5M13.5 8.5L15 7"
                          stroke="#FF3030"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    label: "Need Law Enforcement",
                    sub: "Dispatch police / EMS",
                  },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      setActiveIncident({ type: btn.label, time })
                      setSupervisorAlert({ type: btn.label, time, officer: "Officer Michael" })
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "20px 18px",
                      borderRadius: "14px",
                      cursor: "pointer",
                      background: "rgba(255,40,40,0.07)",
                      border: "1px solid rgba(255,40,40,0.32)",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        flexShrink: 0,
                        background: "rgba(255,40,40,0.1)",
                        border: "1px solid rgba(255,40,40,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {btn.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#FF3030",
                          letterSpacing: "-0.1px",
                        }}
                      >
                        {btn.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "10.5px",
                          color: "rgba(255,120,120,0.65)",
                          marginTop: "3px",
                        }}
                      >
                        {btn.sub}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Close button */}
              <div style={{ padding: "24px 20px 36px", flexShrink: 0 }}>
                <button
                  onClick={() => setSosOpen(false)}
                  style={{
                    width: "100%",
                    padding: "18px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    background: "rgba(85,153,255,0.08)",
                    border: "1px solid rgba(85,153,255,0.3)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#5599FF",
                    letterSpacing: "-0.1px",
                  }}
                >
                  Cancel — Close SOS
                </button>
              </div>
                </>
              )}
            </div>
          )}



          {/* ── Global Floating SOS Button ── */}
          <div 
            onClick={() => setSosOpen(true)}
            style={{
              position: "absolute",
              bottom: "86px", // Tightened to sit right above the nav bar
              right: "20px",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF3030, #CC0000)",
              boxShadow: "0 4px 20px rgba(255,48,48,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 90,
              border: "none"
            }}
          >
            <span style={{ color: "white", fontWeight: 800, fontSize: "14px", letterSpacing: "1px" }}>SOS</span>
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
            <NavBar
              activeTab={activeTab}
              onNavigate={(tab) => setActiveTab(tab)}
            />
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
          
          {/* ── Supervisor Portal Alert Simulation ── */}
          {supervisorAlert && (
            <div style={{
              position: "absolute",
              top: "70px",
              left: "16px",
              right: "16px",
              background: "rgba(20, 0, 0, 0.95)",
              border: "1px solid #FF3030",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(255, 48, 48, 0.2), inset 0 0 40px rgba(255, 48, 48, 0.05)",
              padding: "24px",
              zIndex: 1000,
              animation: "sos-drop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backdropFilter: "blur(20px)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF3030", animation: "pulse-dot 1s infinite", boxShadow: "0 0 10px #FF3030" }} />
                  <span style={{ color: "#FF3030", fontWeight: 800, letterSpacing: "1.5px", fontSize: "12px", fontFamily: "DM Mono, monospace" }}>CRITICAL SOS ALERT</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "DM Mono, monospace", fontSize: "11px", letterSpacing: "0.5px" }}>SUPERVISOR PORTAL</span>
              </div>
              <div style={{ background: "rgba(255,48,48,0.05)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,48,48,0.1)" }}>
                <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "-0.5px" }}>{supervisorAlert.type}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Officer:</span>
                    <span style={{ color: "white", fontWeight: 600 }}>{supervisorAlert.officer}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Location:</span>
                    <span style={{ color: "white", fontWeight: 600 }}>Tower B (Loading Dock)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Time triggered:</span>
                    <span style={{ color: "white", fontWeight: 600, fontFamily: "DM Mono, monospace" }}>{supervisorAlert.time}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSupervisorAlert(null)} 
                style={{ 
                  padding: "16px", 
                  borderRadius: "12px", 
                  background: "#FF3030", 
                  color: "white", 
                  fontWeight: 700, 
                  fontSize: "15px",
                  border: "none", 
                  cursor: "pointer", 
                  marginTop: "4px",
                  boxShadow: "0 4px 15px rgba(255,48,48,0.3)"
                }}
              >
                Acknowledge & Deploy Support
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
