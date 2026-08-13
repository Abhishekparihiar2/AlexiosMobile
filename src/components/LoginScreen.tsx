import { useState } from "react"

interface Props {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: Props) {
  const [officerId, setOfficerId] = useState("")
  const [password, setPassword] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "var(--navy-700)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Canvas background (Layers 1-3) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
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
          background: `radial-gradient(circle at 50% 50%, rgba(14,165,233,0.12) 0%, transparent 50%)`,
        }}
      />

      {/* ── HUD Corner Brackets ── */}
      <div style={{ position: "absolute", top: "24px", left: "24px", width: "24px", height: "24px", borderTop: "1.5px solid rgba(14,165,233,0.4)", borderLeft: "1.5px solid rgba(14,165,233,0.4)" }} />
      <div style={{ position: "absolute", top: "24px", right: "24px", width: "24px", height: "24px", borderTop: "1.5px solid rgba(14,165,233,0.4)", borderRight: "1.5px solid rgba(14,165,233,0.4)" }} />
      <div style={{ position: "absolute", bottom: "24px", left: "24px", width: "24px", height: "24px", borderBottom: "1.5px solid rgba(14,165,233,0.4)", borderLeft: "1.5px solid rgba(14,165,233,0.4)" }} />
      <div style={{ position: "absolute", bottom: "24px", right: "24px", width: "24px", height: "24px", borderBottom: "1.5px solid rgba(14,165,233,0.4)", borderRight: "1.5px solid rgba(14,165,233,0.4)" }} />

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

      {/* ── Login form card ── */}
      <div
        style={{
          position: "relative",
          width: "340px",
          borderRadius: "24px",
          background: "rgba(10,16,28,0.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(14,165,233,0.14)",
          padding: "48px 32px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: `
            0 4px 40px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `,
          zIndex: 1,
        }}
      >
        {/* ── Alexios Logo ── */}
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}alexiobg.png`}
            alt="Alexios"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 20px rgba(14,165,233,0.5))",
            }}
          />
        </div>

        {/* ── Input fields ── */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {/* Officer ID */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${
                focusedField === "id"
                  ? "rgba(14,165,233,0.5)"
                  : "var(--muted-border)"
              }`,
              borderRadius: "14px",
              padding: "16px",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxShadow:
                focusedField === "id"
                  ? "0 0 16px rgba(14,165,233,0.3)"
                  : "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--blue-bright)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, opacity: focusedField === "id" ? 1 : 0.5 }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              placeholder="Officer ID"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              onFocus={() => setFocusedField("id")}
              onBlur={() => setFocusedField(null)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "var(--text-white)",
                caretColor: "var(--blue-bright)",
              }}
            />
          </div>

          {/* Password */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${
                focusedField === "pw"
                  ? "rgba(14,165,233,0.5)"
                  : "var(--muted-border)"
              }`,
              borderRadius: "14px",
              padding: "16px",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxShadow:
                focusedField === "pw"
                  ? "0 0 16px rgba(14,165,233,0.3)"
                  : "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--blue-bright)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, opacity: focusedField === "pw" ? 1 : 0.5 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type="password"
              placeholder="PIN / Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("pw")}
              onBlur={() => setFocusedField(null)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "var(--text-white)",
                caretColor: "var(--blue-bright)",
              }}
            />
          </div>
        </div>

        {/* ── LOG IN button ── */}
        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "14px",
            border: "none",
            background: "var(--blue-primary)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            marginBottom: "20px",
            boxShadow: "0 0 24px rgba(14,165,233,0.4)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Authenticate
          </span>
        </button>

        {/* ── Footer ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "var(--text-50)",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </span>
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--text-35)",
              letterSpacing: "0.15em",
              textAlign: "center",
            }}
          >
            SECURITY STATUS // NODE_CONNECTED
          </span>
        </div>
      </div>
    </div>
  )
}
