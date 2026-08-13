import { useState } from "react"

const MESSAGES = [
    {
        id: 1,
        sender: "Sgt. Diana Torres",
        role: "Supervisor",
        time: "10:08 PM",
        preview: "Please secure the loading dock before your next checkpoint.",
        unread: true,
        avatar: "DT",
    },
    {
        id: 2,
        sender: "Site Operations",
        role: "Broadcast",
        time: "9:55 PM",
        preview:
            "Reminder: All guards must complete their patrol logs by end of shift.",
        unread: true,
        avatar: "SO",
    },
    {
        id: 3,
        sender: "James Carter",
        role: "Security Guard",
        time: "9:30 PM",
        preview: "Parking structure all clear on my end.",
        unread: false,
        avatar: "JC",
    },
    {
        id: 4,
        sender: "Admin",
        role: "System",
        time: "8:00 PM",
        preview: "Shift started. Welcome back, Michael.",
        unread: false,
        avatar: "A",
    },
]

const TEAM = [
    {
        id: 1,
        name: "James Carter",
        title: "Security Guard",
        position: "Parking Patrol",
        status: "clocked",
        avatar: "JC",
        color: "#3B82F6",
    },
    {
        id: 2,
        name: "Lena Park",
        title: "Security Guard",
        position: "Lobby Post",
        status: "clocked",
        avatar: "LP",
        color: "#8B5CF6",
    },
    {
        id: 3,
        name: "Marcus Webb",
        title: "Officer III",
        position: "Rooftop & Mech.",
        status: "break",
        avatar: "MW",
        color: "#F59E0B",
    },
    {
        id: 4,
        name: "Sgt. Torres",
        title: "Supervisor",
        position: "Command Post",
        status: "clocked",
        avatar: "DT",
        color: "#22C55E",
    },
    {
        id: 5,
        name: "Kai Nakamura",
        title: "Security Guard",
        position: "East Wing",
        status: "offsite",
        avatar: "KN",
        color: "#94A3C8",
    },
]

export default function CommsScreen({ onBack }: { onBack: () => void }) {
    const [tab, setTab] = useState<"messages" | "team">("messages")
    const [compose, setCompose] = useState("")
    const [msgs, setMsgs] = useState(MESSAGES)
    const [chatTarget, setChatTarget] = useState<{
        name: string
        role: string
        avatar: string
        color: string
    } | null>(null)

    const sendMessage = () => {
        if (!compose.trim()) return
        setMsgs((m) => [
            {
                id: Date.now(),
                sender: "You",
                role: "Guard II",
                time: "now",
                preview: compose.trim(),
                unread: false,
                avatar: "MR",
            },
            ...m,
        ])
        setCompose("")
    }

    if (chatTarget) {
        return (
            <ChatScreen
                name={chatTarget.name}
                role={chatTarget.role}
                avatar={chatTarget.avatar}
                color={chatTarget.color}
                onBack={() => setChatTarget(null)}
            />
        )
    }

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                background: "rgba(10,14,26,0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                zIndex: 200,
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "58px 20px 14px",
                    flexShrink: 0,
                    borderBottom: "1px solid rgba(148,163,200,0.1)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <button
                        onClick={onBack}
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 18l-6-6 6-6"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontWeight: 700,
                            fontSize: "24px",
                            color: "#fff",
                            letterSpacing: "0.01em",
                        }}
                    >
                        Chat
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "12px",
                        padding: "4px",
                        gap: "2px",
                    }}
                >
                    {(["messages", "team"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            style={{
                                flex: 1,
                                height: "34px",
                                borderRadius: "10px",
                                background:
                                    tab === t ? "rgba(59,130,246,0.2)" : "transparent",
                                border:
                                    tab === t
                                        ? "1px solid rgba(59,130,246,0.3)"
                                        : "1px solid transparent",
                                color: tab === t ? "#93C5FD" : "rgba(220,235,255,0.6)",
                                fontSize: "12px",
                                fontFamily: "Space Grotesk, sans-serif",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                cursor: "pointer",
                                transition: "all 0.18s",
                            }}
                        >
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {tab === "messages" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    {/* Feed */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
                        {msgs.map((m) => (
                            <button
                                key={m.id}
                                onClick={() =>
                                    setChatTarget({
                                        name: m.sender,
                                        role: m.role,
                                        avatar: m.avatar,
                                        color: m.unread ? "#60A5FA" : "#94A3C8",
                                    })
                                }
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginBottom: "12px",
                                    width: "100%",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    background: "transparent",
                                    border: "none",
                                    padding: 0,
                                }}
                            >
                                <div
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "50%",
                                        background: m.unread
                                            ? "rgba(59,130,246,0.15)"
                                            : "rgba(255,255,255,0.05)",
                                        border: `1.5px solid ${m.unread ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.1)"
                                            }`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        fontFamily: "Space Grotesk, sans-serif",
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: m.unread ? "#60A5FA" : "rgba(220,235,255,0.8)",
                                    }}
                                >
                                    {m.avatar}
                                </div>
                                <div
                                    style={{
                                        flex: 1,
                                        paddingBottom: "12px",
                                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "2px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "Space Grotesk, sans-serif",
                                                fontWeight: m.unread ? 700 : 600,
                                                fontSize: "15px",
                                                color: m.unread ? "#FFFFFF" : "rgba(220,235,255,0.8)",
                                                letterSpacing: "0.02em",
                                            }}
                                        >
                                            {m.sender}
                                        </span>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            {m.unread && (
                                                <div
                                                    style={{
                                                        width: "7px",
                                                        height: "7px",
                                                        borderRadius: "50%",
                                                        background: "#EF4444",
                                                        boxShadow: "0 0 5px rgba(239,68,68,0.6)",
                                                    }}
                                                />
                                            )}
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    color: "rgba(200,215,255,0.5)",
                                                    fontFamily: "DM Mono, monospace",
                                                }}
                                            >
                                                {m.time}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "11px",
                                            color: "rgba(200,215,255,0.5)",
                                            fontFamily: "DM Mono, monospace",
                                            marginBottom: "4px",
                                            letterSpacing: "0.04em",
                                        }}
                                    >
                                        {m.role}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "13px",
                                            color: m.unread ? "rgba(220,235,255,0.9)" : "rgba(200,215,255,0.6)",
                                            lineHeight: 1.4,
                                            fontWeight: m.unread ? 500 : 400,
                                        }}
                                    >
                                        {m.preview}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Compose bar */}
                    <div
                        style={{
                            padding: "12px 16px 28px",
                            borderTop: "1px solid rgba(255,255,255,0.05)",
                            background: "rgba(10,14,26,0.95)",
                            flexShrink: 0,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <button
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "rgba(220,235,255,0.8)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    flexShrink: 0,
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div style={{ flex: 1, position: "relative" }}>
                                <input
                                    value={compose}
                                    onChange={(e) => setCompose(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    placeholder="Write a message…"
                                    style={{
                                        width: "100%",
                                        height: "42px",
                                        borderRadius: "21px",
                                        padding: "0 44px 0 16px",
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        color: "#fff",
                                        fontSize: "14px",
                                        fontFamily: "Space Grotesk, sans-serif",
                                        outline: "none",
                                    }}
                                />
                                <button
                                    onClick={sendMessage}
                                    style={{
                                        position: "absolute",
                                        right: "6px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        background: compose ? "#3B82F6" : "rgba(255,255,255,0.1)",
                                        border: "none",
                                        color: compose ? "#fff" : "rgba(255,255,255,0.5)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {tab === "team" && (
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                            letterSpacing: "0.1em",
                            marginBottom: "12px",
                        }}
                    >
                        ON SITE · {TEAM.filter((t) => t.status === "clocked").length} ACTIVE
                    </div>
                    {TEAM.map((guard) => (
                        <div
                            key={guard.id}
                            style={{
                                borderRadius: "18px",
                                padding: "14px 16px",
                                marginBottom: "10px",
                                background: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(25px) saturate(140%)",
                                WebkitBackdropFilter: "blur(25px) saturate(140%)",
                                border: "1px solid rgba(255,255,255,0.09)",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                    <div
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            borderRadius: "50%",
                                            background: `rgba(255,255,255,0.05)`,
                                            border: `1.5px solid ${guard.color}60`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: "Space Grotesk, sans-serif",
                                            fontWeight: 700,
                                            fontSize: "14px",
                                            color: guard.color,
                                        }}
                                    >
                                        {guard.avatar}
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "1px",
                                            right: "1px",
                                            width: "11px",
                                            height: "11px",
                                            borderRadius: "50%",
                                            background:
                                                guard.status === "clocked"
                                                    ? "#22C55E"
                                                    : guard.status === "break"
                                                        ? "#F59E0B"
                                                        : "#6B7DA8",
                                            border: "1.5px solid #0a0e1a",
                                            boxShadow:
                                                guard.status === "clocked"
                                                    ? "0 0 6px rgba(34,197,94,0.6)"
                                                    : "none",
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontFamily: "Space Grotesk, sans-serif",
                                            fontWeight: 700,
                                            fontSize: "15px",
                                            color: "#FFFFFF",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        {guard.name}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "rgba(220,235,255,0.6)", marginTop: "1px" }}>
                                        {guard.title}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "8px" }}>
                                        <div
                                            style={{
                                                fontSize: "11px",
                                                color: "rgba(200,215,255,0.6)",
                                                fontFamily: "DM Mono, monospace",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color:
                                                        guard.status === "clocked"
                                                            ? "#22C55E"
                                                            : guard.status === "break"
                                                                ? "#F59E0B"
                                                                : "#6B7DA8",
                                                }}
                                            >
                                                {guard.status === "clocked"
                                                    ? "🟢 On Site"
                                                    : guard.status === "break"
                                                        ? "🟡 On Break"
                                                        : "⚫ Off Site"}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "11px", color: "rgba(200,215,255,0.6)", fontFamily: "DM Mono, monospace" }}>
                                            {guard.position}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function ChatScreen({
    name,
    role,
    avatar,
    color,
    onBack,
}: {
    name: string
    role: string
    avatar: string
    color: string
    onBack: () => void
}) {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([
        {
            id: 1,
            from: "them",
            text: "Please secure the loading dock before your next checkpoint.",
            time: "10:08 PM",
        },
        {
            id: 2,
            from: "them",
            text: "Acknowledge when complete.",
            time: "10:09 PM",
        },
    ])

    const send = () => {
        if (!input.trim()) return
        setMessages((m) => [
            ...m,
            {
                id: Date.now(),
                from: "me",
                text: input.trim(),
                time: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            },
        ])
        setInput("")
    }

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                background: "rgba(10,14,26,0.95)",
                zIndex: 250,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "58px 18px 14px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    flexShrink: 0,
                    background: "rgba(10,14,26,0.9)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <button
                    onClick={onBack}
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18l-6-6 6-6"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: `rgba(255,255,255,0.05)`,
                        border: `1.5px solid ${color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        color,
                        flexShrink: 0,
                    }}
                >
                    {avatar}
                </div>
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontWeight: 700,
                            fontSize: "16px",
                            color: "#FFFFFF",
                            letterSpacing: "0.02em",
                        }}
                    >
                        {name}
                    </div>
                    <div
                        style={{
                            fontSize: "11px",
                            color: "rgba(200,215,255,0.6)",
                            fontFamily: "DM Mono, monospace",
                        }}
                    >
                        {role}
                    </div>
                </div>
                <div
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#22C55E",
                        boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                    }}
                />
            </div>

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px 16px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            display: "flex",
                            flexDirection: msg.from === "me" ? "row-reverse" : "row",
                            gap: "8px",
                            alignItems: "flex-end",
                        }}
                    >
                        {msg.from === "them" && (
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    background: `rgba(255,255,255,0.05)`,
                                    border: `1px solid ${color}80`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "Space Grotesk, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "10px",
                                    color,
                                    flexShrink: 0,
                                    marginBottom: "20px",
                                }}
                            >
                                {avatar}
                            </div>
                        )}
                        <div style={{ maxWidth: "72%" }}>
                            <div
                                style={{
                                    padding: "10px 14px",
                                    borderRadius:
                                        msg.from === "me"
                                            ? "16px 16px 4px 16px"
                                            : "16px 16px 16px 4px",
                                    background:
                                        msg.from === "me"
                                            ? "rgba(59,130,246,0.85)"
                                            : "rgba(255,255,255,0.08)",
                                    border: `1px solid ${msg.from === "me"
                                        ? "rgba(96,165,250,0.3)"
                                        : "rgba(255,255,255,0.15)"
                                        }`,
                                    fontSize: "14px",
                                    color: "#FFFFFF",
                                    fontFamily: "Inter, sans-serif",
                                    lineHeight: 1.5,
                                }}
                            >
                                {msg.text}
                            </div>
                            <div
                                style={{
                                    fontSize: "10px",
                                    color: "rgba(200,215,255,0.5)",
                                    fontFamily: "DM Mono, monospace",
                                    marginTop: "4px",
                                    textAlign: msg.from === "me" ? "right" : "left",
                                    paddingLeft: msg.from === "them" ? "4px" : "0",
                                }}
                            >
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div
                style={{
                    padding: "12px 14px 28px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(10,14,26,0.9)",
                    backdropFilter: "blur(12px)",
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(220,235,255,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div style={{ flex: 1, position: "relative" }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder="Write a message…"
                            style={{
                                width: "100%",
                                height: "42px",
                                borderRadius: "21px",
                                padding: "0 44px 0 16px",
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                color: "#FFFFFF",
                                fontSize: "14px",
                                fontFamily: "Space Grotesk, sans-serif",
                                outline: "none",
                            }}
                        />
                        <button
                            onClick={send}
                            style={{
                                position: "absolute",
                                right: "6px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                background: input ? "#3B82F6" : "rgba(255,255,255,0.1)",
                                border: "none",
                                color: input ? "#fff" : "rgba(255,255,255,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                flexShrink: 0,
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
