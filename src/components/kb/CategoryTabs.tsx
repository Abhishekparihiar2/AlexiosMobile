export type Category = "sop" | "post" | "emergency"

interface Props {
  active: Category
  onChange: (c: Category) => void
  emergencyCount: number
}

const tabs: { id: Category label: string }[] = [
  { id: "sop", label: "General SOPs" },
  { id: "post", label: "Post Orders" },
  { id: "emergency", label: "Emergency" },
]

export default function CategoryTabs({
  active,
  onChange,
  emergencyCount,
}: Props) {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {tabs.map((tab) => {
        const isActive = active === tab.id
        const isEmergency = tab.id === "emergency"
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: "10px",
              border: `1px solid ${
                isActive
                  ? isEmergency
                    ? "rgba(255,80,80,0.5)"
                    : "rgba(77,217,232,0.4)"
                  : "rgba(180,200,255,0.1)"
              }`,
              background: isActive
                ? isEmergency
                  ? "rgba(255,50,50,0.12)"
                  : "rgba(77,217,232,0.1)"
                : "rgba(255,255,255,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            {isEmergency && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1L9 9H1L5 1Z"
                  fill={isActive ? "#FF5050" : "rgba(255,80,80,0.5)"}
                />
              </svg>
            )}
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                fontWeight: 500,
                color: isActive
                  ? isEmergency
                    ? "#FF6060"
                    : "#4DD9E8"
                  : "rgba(180,200,255,0.5)",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </span>
            {isEmergency && emergencyCount > 0 && (
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#D32F2F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 6px rgba(211,47,47,0.7)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#FFF",
                  }}
                >
                  {emergencyCount}
                </span>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
