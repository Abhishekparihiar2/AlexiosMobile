import { KBDocument } from "./data"

interface Props {
  doc: KBDocument
  isSupervisor: boolean
  onClose: () => void
  onMarkRead: (id: string) => void
}

export default function DocumentModal({
  doc,
  isSupervisor,
  onClose,
  onMarkRead,
}: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(175deg, #0D1525 0%, #0B111E 40%, #090E1A 100%)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(180,200,255,0.08)",
          background: "rgba(8,14,28,0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(130,155,200,0.5)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {doc.category === "sop"
              ? "General SOP"
              : doc.category === "post"
                ? "Post Order"
                : "Emergency"}
          </span>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#FFFFFF",
              marginTop: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {doc.title}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid rgba(180,200,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="rgba(180,200,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="11"
              y1="1"
              x2="1"
              y2="11"
              stroke="rgba(180,200,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <pre
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(200,220,255,0.82)",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            margin: 0,
            letterSpacing: "0.2px",
          }}
        >
          {doc.content}
        </pre>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid rgba(180,200,255,0.08)",
          display: "flex",
          gap: "10px",
          background: "rgba(8,14,28,0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        {doc.readStatus === "unread" && (
          <button
            onClick={() => {
              onMarkRead(doc.id)
              onClose()
            }}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid rgba(77,217,232,0.3)",
              background: "rgba(77,217,232,0.1)",
              cursor: "pointer",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              color: "#4DD9E8",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Mark as Read
          </button>
        )}
        {isSupervisor && (
          <button
            style={{
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(180,200,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              color: "rgba(180,200,255,0.7)",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Edit
          </button>
        )}
        {doc.readStatus === "read" && !isSupervisor && (
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid rgba(180,200,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              color: "rgba(180,200,255,0.7)",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
