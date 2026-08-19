import { ReactNode, useState } from "react"

interface Props {
  onBack: () => void
  onNavigateProfile: () => void
}

function SettingInput({ type, placeholder }: { type?: string, placeholder: string }) {
  return <input type={type || "text"} placeholder={placeholder} style={{ width: "100%", boxSizing: "border-box", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", marginBottom: "12px", outline: "none", fontSize: "15px", fontFamily: "Inter, sans-serif" }} />
}
function SettingButton({ label, primary = false }: { label: string, primary?: boolean }) {
  return <button style={{ width: "100%", padding: "18px", background: primary ? "rgba(77,217,232,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${primary ? "rgba(77,217,232,0.3)" : "rgba(255,255,255,0.1)"}`, color: primary ? "#4DD9E8" : "white", borderRadius: "14px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", marginTop: "8px", fontFamily: "Inter, sans-serif" }}>{label}</button>
}
function SettingToggle({ label, defaultActive = true }: { label: string, defaultActive?: boolean }) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div onClick={() => setActive(!active)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "14px", marginBottom: "12px", cursor: "pointer" }}>
      <span style={{ color: "white", fontSize: "15px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{label}</span>
      <div style={{ width: "44px", height: "24px", borderRadius: "12px", background: active ? "#4DD9E8" : "rgba(255,255,255,0.2)", position: "relative", transition: "0.2s" }}>
        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "white", position: "absolute", top: "2px", left: active ? "22px" : "2px", transition: "0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
      </div>
    </div>
  )
}
function SettingText({ children }: { children: ReactNode }) {
  return <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px", fontFamily: "Inter, sans-serif" }}>{children}</div>
}

function SettingDetailScreen({ id, title, onBack }: { id: string, title: string, onBack: () => void }) {
  let content = null;
  switch (id) {
    case "password":
      content = (
        <>
          <SettingText>Your password must be at least 8 characters and include a special character.</SettingText>
          <SettingInput type="password" placeholder="Current Password" />
          <SettingInput type="password" placeholder="New Password" />
          <SettingInput type="password" placeholder="Confirm New Password" />
          <SettingButton label="Update Password" primary />
        </>
      ); break;
    case "barcode":
      content = (
        <>
          <SettingText>Configure the built-in barcode scanner engine for patrols.</SettingText>
          <SettingToggle label="Enable Scanner Mode" defaultActive />
          <SettingToggle label="Vibrate on Scan" defaultActive />
          <SettingToggle label="Audible Beep" defaultActive={false} />
          <SettingToggle label="Auto-Submit on Scan" defaultActive />
        </>
      ); break;
    case "location":
      content = (
        <>
          <SettingText>Location services allow the dispatch center to see your position on the operations map in real time. Required for emergency SOS.</SettingText>
          <SettingToggle label="Background Tracking" defaultActive />
          <SettingToggle label="High Accuracy GPS" defaultActive />
          <SettingButton label="Refresh Coordinates" />
        </>
      ); break;
    case "notifications":
      content = (
        <>
          <SettingText>Adjust what alerts trigger system notifications on your device.</SettingText>
          <SettingToggle label="Push Notifications" defaultActive />
          <SettingToggle label="Supervisor Announcements" defaultActive />
          <SettingToggle label="Critical Emergency Overrides" defaultActive />
          <SettingToggle label="Shift Reminders" defaultActive={false} />
        </>
      ); break;
    case "last-sync":
      content = (
        <>
          <div style={{ textAlign: "center", marginBottom: "32px", marginTop: "16px" }}>
            <div style={{ color: "#4DD9E8", fontSize: "36px", fontWeight: 800, fontFamily: "DM Mono, monospace" }}>09:41 AM</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "4px" }}>Today, August 19th</div>
          </div>
          <SettingText>The application automatically syncs patrol data in the background. If you missed a sync due to poor network, you can force it here.</SettingText>
          <SettingButton label="Force Sync Now" primary />
        </>
      ); break;
    case "reload":
      content = (
        <>
          <SettingText>If the interface is unresponsive or displaying cached data, reload the configuration files from the master server.</SettingText>
          <SettingButton label="Reload Configuration" primary />
        </>
      ); break;
    case "offline-data":
      content = (
        <>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "16px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "white", fontSize: "14px", fontWeight: 600 }}><span>Storage Used</span><span>45.2 MB</span></div>
            <div style={{ background: "rgba(255,255,255,0.1)", height: "8px", borderRadius: "4px", overflow: "hidden" }}><div style={{ background: "#4DD9E8", width: "45%", height: "100%" }} /></div>
          </div>
          <SettingToggle label="Cache Images Offline" defaultActive />
          <SettingToggle label="Keep Tour Records (7 Days)" defaultActive />
          <SettingButton label="Clear Local Data" />
        </>
      ); break;
    case "clear-cache":
      content = (
        <>
          <SettingText>Temporary files including map tiles, thumbnails, and logs use about 12.5 MB of space on this device.</SettingText>
          <SettingButton label="Empty Cache" primary />
        </>
      ); break;
    case "session":
      content = (
        <>
          <SettingText>Session timeout determines how long the app stays unlocked after inactivity.</SettingText>
          <SettingToggle label="Keep Me Logged In" defaultActive={false} />
          <SettingToggle label="Biometric Unlock App" defaultActive />
          <SettingButton label="Sign Out All Other Devices" />
        </>
      ); break;
    case "local-settings":
      content = (
        <>
          <SettingText>Adjust local device preferences independently of your account.</SettingText>
          <SettingToggle label="Tactical Dark Theme" defaultActive />
          <SettingToggle label="24-Hour Time Format" defaultActive={false} />
          <SettingToggle label="Reduced Animations" defaultActive={false} />
        </>
      ); break;
    case "help-center":
      content = (
        <>
          <SettingText>Access FAQs, read the security guard manual, and learn about the application.</SettingText>
          <SettingButton label="Open Knowledge Base" primary />
          <SettingButton label="Contact Supervisor" />
        </>
      ); break;
    case "report-issue":
      content = (
        <>
          <SettingText>Describe the bug you encountered. Device logs will be attached automatically.</SettingText>
          <SettingInput placeholder="Issue Title" />
          <textarea placeholder="Please provide steps to reproduce..." style={{ width: "100%", height: "120px", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", marginBottom: "16px", outline: "none", fontSize: "15px", fontFamily: "Inter, sans-serif", resize: "none", boxSizing: "border-box" }} />
          <SettingButton label="Submit Report" primary />
        </>
      ); break;
    default:
      content = <SettingText>Not implemented.</SettingText>
  }

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(10,14,26,0.95)", backdropFilter: "blur(20px)", zIndex: 300, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "58px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={onBack} style={{ width: "38px", height: "38px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "white", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {title}
          </div>
        </div>
        <div style={{ width: "38px" }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
        {content}
      </div>
    </div>
  )
}

function SettingsItem({ label, icon, onClick }: { label: string; icon?: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "14px", color: "white", cursor: "pointer", backdropFilter: "blur(20px)",
        marginBottom: "8px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(180,200,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(180,200,255,0.8)" }}>
          {icon || (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          )}
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.3px", color: "rgba(255,255,255,0.9)" }}>{label.toUpperCase()}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
    </button>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ color: "rgba(180,200,255,0.6)", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", marginTop: "16px", marginBottom: "8px", fontFamily: "DM Mono, monospace", paddingLeft: "4px" }}>
      {title.toUpperCase()}
    </div>
  )
}

export default function MoreScreen({
  onBack,
  onNavigateProfile,
}: Props) {
  const [activeScreen, setActiveScreen] = useState<{ id: string, title: string } | null>(null);

  if (activeScreen) {
    return <SettingDetailScreen id={activeScreen.id} title={activeScreen.title} onBack={() => setActiveScreen(null)} />
  }

  const navigate = (id: string, title: string) => setActiveScreen({ id, title })

  return (
    <div style={{ flex: 1, padding: "8px 16px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0px 16px" }}>
        <button
          onClick={onBack}
          style={{ width: "38px", height: "38px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "white", letterSpacing: "0.2em", textTransform: "uppercase" }}>SETTINGS</div>
        </div>
        <div style={{ width: "38px" }} />
      </div>

      {/* Profile Button */}
      <button
        onClick={onNavigateProfile}
        style={{
          width: "100%", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(77,217,232,0.2)",
          borderRadius: "16px", color: "white", cursor: "pointer", backdropFilter: "blur(20px)",
          marginBottom: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(77,217,232,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4DD9E8" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <div style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.5px" }}>OFFICER PROFILE</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      <SectionHeader title="Account" />
      <SettingsItem label="Change Password" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>} onClick={() => navigate("password", "Change Password")} />

      <SectionHeader title="Device" />
      <SettingsItem label="Barcode Scanner" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5v14M8 5v14M12 5v14M16 5v14M20 5v14" /></svg>} onClick={() => navigate("barcode", "Barcode Scanner")} />
      <SettingsItem label="Location" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>} onClick={() => navigate("location", "Location")} />

      <SectionHeader title="Notifications" />
      <SettingsItem label="Notifications" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>} onClick={() => navigate("notifications", "Notifications")} />

      <SectionHeader title="Synchronization" />
      <SettingsItem label="Last Sync" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12A10 10 0 0 1 12 2a10 10 0 0 1 8 4" /><path d="M20 2v4h-4" /><path d="M22 12A10 10 0 0 1 12 22a10 10 0 0 1-8-4" /><path d="M4 22v-4h4" /></svg>} onClick={() => navigate("last-sync", "Last Sync")} />
      <SettingsItem label="Reload Settings" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 3.84-11.23l2.87 5.17" /></svg>} onClick={() => navigate("reload", "Reload Settings")} />

      <SectionHeader title="Storage" />
      <SettingsItem label="Offline Data" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>} onClick={() => navigate("offline-data", "Offline Data")} />
      <SettingsItem label="Clear Cache" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>} onClick={() => navigate("clear-cache", "Clear Cache")} />

      <SectionHeader title="Session" />
      <SettingsItem label="Session Timeout" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} onClick={() => navigate("session", "Session Timeout")} />
      <SettingsItem label="Local Settings" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>} onClick={() => navigate("local-settings", "Local Settings")} />

      <SectionHeader title="Support" />
      <SettingsItem label="ALEXIOS Help Center" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>} onClick={() => navigate("help-center", "Help Center")} />
      <SettingsItem label="Report App Issue" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>} onClick={() => navigate("report-issue", "Report Issue")} />

      <div style={{ height: "40px" }} /> {/* Bottom padding */}
    </div>
  )
}
