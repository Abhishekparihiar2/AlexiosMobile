import { useState, useRef, useEffect } from "react"
import { KBDocument, Message, documents, mockAthenaResponses } from "./data"
import SmartCitation from "./SmartCitation"

interface Props {
  onClose: () => void
  onOpenDoc: (doc: KBDocument) => void
}

function getAthenaResponse(
  query: string,
): { text: string citations: KBDocument[] } {
  const q = query.toLowerCase()
  let key = "default"
  if (
    q.includes("gate") ||
    q.includes("code") ||
    q.includes("dock") ||
    q.includes("loading")
  )
    key = "gate"
  else if (
    q.includes("emergency") ||
    q.includes("threat") ||
    q.includes("active") ||
    q.includes("evacuate")
  )
    key = "emergency"
  else if (q.includes("visitor") || q.includes("badge") || q.includes("guest"))
    key = "visitor"

  const resp = mockAthenaResponses[key]
  return {
    text: resp.text,
    citations: resp.citationIds
      .map((id) => documents.find((d) => d.id === id)!)
      .filter(Boolean),
  }
}

export default function CopilotOverlay({ onClose, onOpenDoc }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "athena",
      text: "Hello, Officer. I'm ATHENA Copilot. Ask me anything about your site procedures, SOPs, or post orders.",
    },
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setInput("")
    const userMsg: Message = { role: "user", text }
    const { text: athenaText, citations } = getAthenaResponse(text)
    const athenaMsg: Message = { role: "athena", text: athenaText, citations }
    setMessages((prev) => [...prev, userMsg, athenaMsg])
  }

  const handleOpenDoc = (doc: KBDocument) => {
    onClose()
    setTimeout(() => onOpenDoc(doc), 100)
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(175deg, #080E1C 0%, #070C18 60%, #060A14 100%)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(180,200,255,0.08)",
          background: "rgba(8,14,28,0.8)",
          backdropFilter: "blur(20px)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            background: "rgba(74,143,255,0.12)",
            border: "1px solid rgba(74,143,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(74,143,255,0.25)",
          }}
        >
          <svg width="16" height="18" viewBox="0 0 20 23" fill="none">
            <path
              d="M10 1L1 5V11.5C1 16.85 5 21.6 10 23C15 21.6 19 16.85 19 11.5V5L10 1Z"
              fill="rgba(74,143,255,0.15)"
              stroke="#4A8FFF"
              strokeWidth="1.4"
            />
            <path
              d="M7 11.5L9.2 13.5L13.5 9"
              stroke="#4DD9E8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
              letterSpacing: "1px",
            }}
          >
            ATHENA COPILOT
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(77,217,232,0.7)",
              letterSpacing: "1.5px",
            }}
          >
            TACTICAL AI · ONLINE
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

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "88%",
                padding: "12px 14px",
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                background:
                  msg.role === "user"
                    ? "rgba(74,143,255,0.18)"
                    : "rgba(14,22,40,0.85)",
                border: `1px solid ${
                  msg.role === "user"
                    ? "rgba(74,143,255,0.3)"
                    : "rgba(180,200,255,0.1)"
                }`,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(220,235,255,0.9)",
                  lineHeight: 1.6,
                }}
              >
                {msg.text}
              </span>
              {msg.citations && msg.citations.length > 0 && (
                <SmartCitation
                  citations={msg.citations}
                  onOpen={handleOpenDoc}
                />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px 16px",
          borderTop: "1px solid rgba(180,200,255,0.08)",
          background: "rgba(8,14,28,0.8)",
          backdropFilter: "blur(20px)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(180,200,255,0.14)",
            borderRadius: "14px",
            padding: "12px 16px",
          }}
        >
          <input
            type="text"
            placeholder="Ask anything about your site…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "13px",
              color: "#FFFFFF",
              caretColor: "#4DD9E8",
            }}
          />
          <button
            onClick={send}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              border: "none",
              flexShrink: 0,
              background: input.trim()
                ? "rgba(74,143,255,0.3)"
                : "rgba(74,143,255,0.08)",
              cursor: input.trim() ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7H13M13 7L8 2M13 7L8 12"
                stroke={input.trim() ? "#4DD9E8" : "rgba(180,200,255,0.3)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
