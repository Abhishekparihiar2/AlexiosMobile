function Badge({
  label,
  color,
  bg,
  border,
}: {
  label: string
  color: string
  bg: string
  border: string
}) {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "3px 8px",
        borderRadius: "6px",
        background: bg,
        border: `1px solid ${border}`,
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          fontWeight: 600,
          color,
          letterSpacing: "0.8px",
        }}
      >
        {label}
      </span>
    </div>
  )
}

const entries = [
  {
    time: "21:41",
    timeColor: "rgba(77,217,232,0.6)",
    title: "Hourly Patrol Check",
    sub: "Tower B",
    subColor: "rgba(130,155,200,0.5)",
    rowBg: "rgba(255,255,255,0.04)",
    rowBorder: "1px solid rgba(255,255,255,0.07)",
    badge: {
      label: "SUBMITTED",
      color: "#4DD9E8",
      bg: "rgba(77,217,232,0.08)",
      border: "rgba(77,217,232,0.22)",
    },
  },
  {
    time: "18:04",
    timeColor: "rgba(255,165,0,0.65)",
    title: "Incident Report #1042",
    sub: "Gate C Maglock",
    subColor: "rgba(255,165,0,0.45)",
    rowBg: "rgba(255,165,0,0.03)",
    rowBorder: "1px solid rgba(255,165,0,0.15)",
    badge: {
      label: "MGR REVIEW",
      color: "#FFA500",
      bg: "rgba(255,165,0,0.08)",
      border: "rgba(255,165,0,0.25)",
    },
  },
]

export default function RecentSubmissionsList({
  onSelect,
}: {
  onSelect: (reportId: string) => void
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "0 16px",
      }}
    >
      {/* Section label */}
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "10px",
          fontWeight: 700,
          color: "rgba(130,155,200,0.45)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Recent Submissions
      </span>

      {entries.map((e, i) => (
        <div
          key={i}
          onClick={() => onSelect(e.title)}
          style={{
            background: e.rowBg,
            border: e.rowBorder,
            borderRadius: "12px",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          {/* Timestamp */}
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "11px",
              fontWeight: 600,
              color: e.timeColor,
              letterSpacing: "0.5px",
              flexShrink: 0,
            }}
          >
            {e.time}
          </span>

          {/* Center info */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                color: "rgba(220,235,255,0.9)",
                letterSpacing: "-0.1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {e.title}
            </span>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: e.subColor,
                letterSpacing: "0.3px",
              }}
            >
              {e.sub}
            </span>
          </div>

          {/* Badge */}
          <Badge {...e.badge} />
        </div>
      ))}
    </div>
  )
}
