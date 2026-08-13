interface Props {
  active: number
  onChange: (n: number) => void
}

const floors = [5, 4, 3, 2, 1]

export default function FloorSelector({ active, onChange }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        zIndex: 10,
      }}
    >
      {floors.map((f) => {
        const isActive = f === active
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            style={
              {
                width: "36px",
                height: "32px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive
                  ? "rgba(77,217,232,0.18)"
                  : "rgba(255,255,255,0.05)",
                border: isActive
                  ? "1px solid rgba(77,217,232,0.5)"
                  : "1px solid rgba(180,200,255,0.12)",
                boxShadow: isActive ? "0 0 12px rgba(77,217,232,0.35)" : "none",
                transition: "all 0.18s ease",
              } as React.CSSProperties
            }
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                letterSpacing: "0.5px",
                fontWeight: isActive ? 700 : 400,
                color: isActive ? "#4DD9E8" : "rgba(130,155,200,0.5)",
              }}
            >
              {f}F
            </span>
          </button>
        )
      })}
    </div>
  )
}
