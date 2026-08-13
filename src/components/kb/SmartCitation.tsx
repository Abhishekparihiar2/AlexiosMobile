import { KBDocument } from "./data"

interface Props {
  citations: KBDocument[]
  onOpen: (doc: KBDocument) => void
}

export default function SmartCitation({ citations, onOpen }: Props) {
  if (!citations.length) return null
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          fontWeight: 500,
          color: "rgba(130,155,200,0.5)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Source
      </span>
      {citations.map((doc) => (
        <button
          key={doc.id}
          onClick={() => onOpen(doc)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(180,200,255,0.12)",
            borderRadius: "8px",
            padding: "8px 10px",
            cursor: "pointer",
            textAlign: "left",
            transition: "background 0.15s ease",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <rect
              x="1"
              y="1"
              width="11"
              height="11"
              rx="2"
              stroke="rgba(77,217,232,0.6)"
              strokeWidth="1.2"
            />
            <line
              x1="3.5"
              y1="4.5"
              x2="9.5"
              y2="4.5"
              stroke="rgba(77,217,232,0.6)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <line
              x1="3.5"
              y1="6.5"
              x2="9.5"
              y2="6.5"
              stroke="rgba(77,217,232,0.4)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <line
              x1="3.5"
              y1="8.5"
              x2="7"
              y2="8.5"
              stroke="rgba(77,217,232,0.4)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              flex: 1,
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(200,220,255,0.85)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {doc.title}
          </span>
          <span style={{ fontSize: "13px", color: "#4DD9E8", flexShrink: 0 }}>
            ›
          </span>
        </button>
      ))}
    </div>
  )
}
