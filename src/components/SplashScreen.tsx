import { useEffect, useState } from "react"

interface Props {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: Props) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onFinish])

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
        fontFamily: "'Rajdhani', sans-serif",
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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          animation: "spring-pop 0.8s cubic-bezier(0.34, 1.4, 0.64, 1)",
        }}
      >
        {!imgError ? (
          <img
            src={`${import.meta.env.BASE_URL}alexiobg.png`}
            alt="Alexios Logo"
            style={{
              width: "160px",
              height: "160px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 20px rgba(14,165,233,0.5))",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              fontSize: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "160px",
              height: "160px",
              filter: "drop-shadow(0 0 20px rgba(14,165,233,0.5))",
            }}
          >
            🛡️
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            animation: "entrance-fade-rise 0.8s ease-out forwards",
            opacity: 0,
            animationDelay: "0.2s"
          }}
        >
          <h1 style={{ 
            fontFamily: "'Rajdhani', sans-serif", 
            fontWeight: 700, 
            fontSize: "48px", 
            letterSpacing: "0.4em", 
            color: "var(--text-white)", 
            margin: 0,
            marginLeft: "0.4em", /* offset tracking */
            textShadow: "0 0 20px rgba(14,165,233,0.4)"
          }}>
            ALEXIOS
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(14,165,233,0.4)",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "var(--text-50)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            TACTICAL OPS PLATFORM
          </span>
        </div>
        
        {/* Progress Bar Loading */}
        <div style={{
          marginTop: "60px",
          width: "200px",
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "1px",
          overflow: "hidden",
          position: "relative",
          animation: "entrance-fade-rise 0.8s ease-out forwards",
          opacity: 0,
          animationDelay: "0.4s"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "var(--blue-bright)",
            boxShadow: "0 0 10px rgba(56,189,248,0.7)",
            animation: "progress-fill 2s linear forwards"
          }} />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes entrance-fade-rise {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes spring-pop {
              0% { opacity: 0; transform: scale(0.9); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes progress-fill {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `,
        }}
      />
    </div>
  )
}
