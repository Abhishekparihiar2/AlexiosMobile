interface Props {
  onClose: () => void
}

export default function SupervisorPanel({ onClose }: Props) {
  const actions = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect
            x="1"
            y="2"
            width="16"
            height="14"
            rx="2.5"
            stroke="rgba(77,217,232,0.7)"
            strokeWidth="1.4"
          />
          <line
            x1="9"
            y1="6"
            x2="9"
            y2="12"
            stroke="rgba(77,217,232,0.7)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="6"
            y1="9"
            x2="12"
            y2="9"
            stroke="rgba(77,217,232,0.7)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: "Add New Document",
      color: "#4DD9E8",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3 12.5V15H5.5L13.5 7L11 4.5L3 12.5Z"
            stroke="rgba(180,200,255,0.7)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M11 4.5L13.5 7"
            stroke="rgba(180,200,255,0.7)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: "Edit Existing Document",
      color: "rgba(180,200,255,0.8)",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2L10.4 6.4H15L11.3 9L12.7 13.5L9 11L5.3 13.5L6.7 9L3 6.4H7.6L9 2Z"
            stroke="#FF8C00"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Push Urgent Read Alert",
      color: "#FF8C00",
    },
  ]

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 70,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(10,17,32,0.96)",
          backdropFilter: "blur(30px)",
          borderTop: "1px solid rgba(180,200,255,0.12)",
          borderRadius: "20px 20px 0 0",
          padding: "20px 20px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Handle bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(180,200,255,0.2)",
            }}
          />
        </div>

        {/* Title */}
        <div style={{ marginBottom: "4px" }}>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              fontWeight: 500,
              color: "rgba(130,155,200,0.5)",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            Supervisor Controls
          </span>
        </div>

        {/* Actions */}
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(180,200,255,0.1)",
              borderRadius: "14px",
              padding: "15px 16px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "11px",
                flexShrink: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(180,200,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {action.icon}
            </div>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: action.color,
                flex: 1,
              }}
            >
              {action.label}
            </span>
            <span style={{ fontSize: "16px", color: "rgba(180,200,255,0.3)" }}>
              ›
            </span>
          </button>
        ))}

        {/* Cancel */}
        <button
          onClick={onClose}
          style={{
            padding: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(180,200,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            cursor: "pointer",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "rgba(180,200,255,0.5)",
            marginTop: "2px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
