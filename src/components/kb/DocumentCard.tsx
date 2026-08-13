import { KBDocument } from "./data"

interface Props {
  doc: KBDocument
  onOpen: (doc: KBDocument) => void
}

const tile = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  padding: "13px 14px",
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
}

function DocIcon({ category }: { category: KBDocument["category"] }) {
  if (category === "emergency")
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L20 19H2L11 2Z"
          stroke="rgba(255,80,80,0.8)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line
          x1="11"
          y1="9"
          x2="11"
          y2="13"
          stroke="rgba(255,80,80,0.8)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="11" cy="16" r="0.9" fill="rgba(255,80,80,0.8)" />
      </svg>
    )
  if (category === "post")
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="3"
          y="2"
          width="16"
          height="18"
          rx="2.5"
          stroke="rgba(77,217,232,0.7)"
          strokeWidth="1.4"
        />
        <line
          x1="7"
          y1="7"
          x2="15"
          y2="7"
          stroke="rgba(77,217,232,0.7)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="11"
          x2="15"
          y2="11"
          stroke="rgba(77,217,232,0.5)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="15"
          x2="11"
          y2="15"
          stroke="rgba(77,217,232,0.5)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="3"
        y="2"
        width="16"
        height="18"
        rx="2.5"
        stroke="rgba(180,200,255,0.6)"
        strokeWidth="1.4"
      />
      <line
        x1="7"
        y1="7"
        x2="15"
        y2="7"
        stroke="rgba(180,200,255,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="11"
        x2="15"
        y2="11"
        stroke="rgba(180,200,255,0.4)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="15"
        x2="12"
        y2="15"
        stroke="rgba(180,200,255,0.4)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ReadBadge({
  status,
  urgent,
}: {
  status: KBDocument["readStatus"]
  urgent: boolean
}) {
  if (urgent)
    return (
      <div
        style={{
          padding: "2px 7px",
          borderRadius: "5px",
          background: "rgba(211,47,47,0.18)",
          border: "1px solid rgba(211,47,47,0.4)",
          animation: "pulse-dot 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8px",
            fontWeight: 600,
            color: "#FF6060",
            letterSpacing: "1px",
          }}
        >
          URGENT
        </span>
      </div>
    )
  if (status === "unread")
    return (
      <div
        style={{
          padding: "2px 7px",
          borderRadius: "5px",
          background: "rgba(77,217,232,0.1)",
          border: "1px solid rgba(77,217,232,0.25)",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8px",
            fontWeight: 500,
            color: "#4DD9E8",
            letterSpacing: "1px",
          }}
        >
          UNREAD
        </span>
      </div>
    )
  return (
    <div
      style={{
        padding: "2px 7px",
        borderRadius: "5px",
        background: "rgba(61,255,160,0.08)",
        border: "1px solid rgba(61,255,160,0.2)",
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "8px",
          fontWeight: 500,
          color: "rgba(61,255,160,0.8)",
          letterSpacing: "1px",
        }}
      >
        READ
      </span>
    </div>
  )
}

export default function DocumentCard({ doc, onOpen }: Props) {
  return (
    <div
      style={{
        ...tile,
        borderColor: doc.urgent
          ? "rgba(255,80,80,0.2)"
          : "rgba(255,255,255,0.08)",
        background: doc.urgent ? "rgba(255,50,50,0.04)" : tile.background,
      }}
      onClick={() => onOpen(doc)}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "11px",
          flexShrink: 0,
          background:
            doc.category === "emergency"
              ? "rgba(255,50,50,0.1)"
              : doc.category === "post"
                ? "rgba(77,217,232,0.08)"
                : "rgba(74,143,255,0.08)",
          border: `1px solid ${
            doc.category === "emergency"
              ? "rgba(255,80,80,0.2)"
              : "rgba(180,200,255,0.12)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DocIcon category={doc.category} />
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "#FFFFFF",
            letterSpacing: "-0.1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {doc.title}
        </span>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            color: "rgba(130,155,200,0.55)",
            letterSpacing: "0.3px",
          }}
        >
          Updated {doc.updatedAt}
          {doc.site ? ` · ${doc.site}` : ""}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <ReadBadge status={doc.readStatus} urgent={doc.urgent} />
        <span
          style={{
            fontSize: "16px",
            color: "rgba(180,200,255,0.35)",
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </div>
    </div>
  )
}
