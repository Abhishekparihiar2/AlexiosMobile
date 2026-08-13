type Filter = "all" | "access" | "fire"

interface Props {
  active: Filter
  onChange: (f: Filter) => void
}

function IconGrid() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect
        x="1"
        y="1"
        width="4"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="7"
        y="1"
        width="4"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="1"
        y="7"
        width="4"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="7"
        y="7"
        width="4"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  )
}

function IconDoor() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <rect
        x="1"
        y="1"
        width="9"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="8" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function IconFlame() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <circle
        cx="5.5"
        cy="9"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M5.5 5.5C5.5 3.5 7.5 2 7.5 2C7.5 4 6.5 5 5.5 5.5Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}

const filters: {
  id: Filter
  label: string
  icon: React.ReactNode
  accentCyan: boolean
}[] = [
  { id: "all", label: "All Categories", icon: <IconGrid />, accentCyan: true },
  {
    id: "access",
    label: "Access Points",
    icon: <IconDoor />,
    accentCyan: true,
  },
  { id: "fire", label: "Fire Control", icon: <IconFlame />, accentCyan: false },
]

export default function AssetLegend({ active, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "8px", padding: "0 16px" }}>
      {filters.map(({ id, label, icon, accentCyan }) => {
        const isActive = active === id
        const activeColor = accentCyan ? "#4DD9E8" : "#FFA500"
        const activeBg = accentCyan
          ? "rgba(77,217,232,0.1)"
          : "rgba(255,165,0,0.1)"
        const activeBorder = accentCyan
          ? "rgba(77,217,232,0.35)"
          : "rgba(255,165,0,0.35)"
        const activeShadow = accentCyan
          ? "0 0 14px rgba(77,217,232,0.2)"
          : "0 0 14px rgba(255,165,0,0.15)"

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={
              {
                flex: 1,
                height: "36px",
                borderRadius: "99px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "0 10px",
                background: isActive ? activeBg : "rgba(255,255,255,0.04)",
                border: isActive
                  ? `1px solid ${activeBorder}`
                  : "1px solid rgba(180,200,255,0.1)",
                boxShadow: isActive ? activeShadow : "none",
                color: isActive ? activeColor : "rgba(130,155,200,0.5)",
                transition: "all 0.18s ease",
              } as React.CSSProperties
            }
          >
            {icon}
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "8px",
                fontWeight: isActive ? 700 : 400,
                letterSpacing: "0.6px",
                whiteSpace: "nowrap",
                color: isActive ? activeColor : "rgba(130,155,200,0.5)",
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
