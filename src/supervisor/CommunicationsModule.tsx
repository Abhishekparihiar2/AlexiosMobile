import React, { useState } from "react"
import { channels as CHANNELS } from "../components/radio/data"
import type { ChannelId } from "../components/radio/data"

// ─── Types ────────────────────────────────────────────────────────────────────

type CommTab = "updates" | "board" | "chat" | "radio"

// ─── Mock Data ────────────────────────────────────────────────────────────────

const UPDATES = [
  {
    id: 1,
    type: "critical",
    title: "Perimeter Breach Alert",
    body: "North gate sensor triggered at 02:14. All units to perimeter protocol B until further notice.",
    sender: "Command",
    initials: "CM",
    time: "02:17",
    unread: true,
  },
  {
    id: 2,
    type: "operational",
    title: "Shift Change — B Team",
    body: "B Team relief scheduled for 06:00. Supervisors confirm roster before handover.",
    sender: "J. Morrison",
    initials: "JM",
    time: "01:30",
    unread: true,
  },
  {
    id: 3,
    type: "operational",
    title: "Visitor Badge System Offline",
    body: "Front desk badge printer is down. Use paper logs until IT resolves the issue.",
    sender: "IT Support",
    initials: "IT",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    type: "training",
    title: "CPR Recertification — Aug 15",
    body: "All Level 2 officers must complete recertification by August 15th. Sign up via the portal.",
    sender: "HR",
    initials: "HR",
    time: "Aug 5",
    unread: false,
  },
  {
    id: 5,
    type: "general",
    title: "Parking Deck B Closed",
    body: "Deck B will be closed Aug 9–11 for maintenance. Use Deck A overflow.",
    sender: "Facilities",
    initials: "FC",
    time: "Aug 4",
    unread: false,
  },
  {
    id: 6,
    type: "training",
    title: "New SOP — Active Threat",
    body: "Updated active threat response SOP is now live in the Documents portal. Review required.",
    sender: "J. Morrison",
    initials: "JM",
    time: "Aug 3",
    unread: false,
  },
]

const UPDATE_TYPES: Record<string, {
  color: string
  bg: string
  border: string
  label: string
}> = {
  critical: {
    color: "#FF4444",
    bg: "rgba(255,68,68,0.1)",
    border: "rgba(255,68,68,0.3)",
    label: "CRITICAL",
  },
  operational: {
    color: "#FFA500",
    bg: "rgba(255,165,0,0.08)",
    border: "rgba(255,165,0,0.25)",
    label: "OPERATIONAL",
  },
  training: {
    color: "#4A8FFF",
    bg: "rgba(74,143,255,0.08)",
    border: "rgba(74,143,255,0.22)",
    label: "TRAINING",
  },
  general: {
    color: "#B8CCEE",
    bg: "rgba(184,204,238,0.06)",
    border: "rgba(184,204,238,0.18)",
    label: "GENERAL",
  },
}

const THREADS = [
  {
    id: 1,
    title: "Nightly Patrol Routes — Aug Revision",
    replies: 8,
    last: "09:41",
    preview: "Agreed, Gate 3 loop needs to shift earlier.",
    pinned: true,
  },
  {
    id: 2,
    title: "Equipment Inventory Q3",
    replies: 4,
    last: "08:12",
    preview: "Flashlight batteries still outstanding.",
    pinned: false,
  },
  {
    id: 3,
    title: "Dress Code Policy Update",
    replies: 11,
    last: "Yesterday",
    preview: "New policy is effective Sept 1st.",
    pinned: false,
  },
  {
    id: 4,
    title: "Holiday Coverage Requests",
    replies: 6,
    last: "Aug 5",
    preview: "I can cover Dec 25 if needed.",
    pinned: false,
  },
  {
    id: 5,
    title: "Incident Report Template v2",
    replies: 2,
    last: "Aug 3",
    preview: "Looks good, approved for rollout.",
    pinned: false,
  },
]

const THREAD_POSTS: Record<number, Array<{
  id: number
  name: string
  initials: string
  time: string
  body: string
  mine?: boolean
}>> = {
  1: [
    {
      id: 1,
      name: "J. Morrison",
      initials: "JM",
      time: "08:15",
      body: "Patrol team — I've attached the revised Aug route map. Gate 3 loop now starts 30 min earlier to cover the morning handover gap.",
    },
    {
      id: 2,
      name: "R. Torres",
      initials: "RT",
      time: "08:52",
      body: "Confirmed. Gate 3 coverage was thin between 05:30 and 06:00. The new timing should close that.",
    },
    {
      id: 3,
      name: "A. Chen",
      initials: "AC",
      time: "09:11",
      body: "Do we need to update the K9 sweep schedule too? Currently it overlaps with the early Gate 3 loop.",
    },
    {
      id: 4,
      name: "J. Morrison",
      initials: "JM",
      time: "09:41",
      body: "Agreed, Gate 3 loop needs to shift earlier. K9 sweep will be adjusted — Chen, can you coordinate with Williams?",
    },
  ],
  2: [
    {
      id: 1,
      name: "D. Reyes",
      initials: "DR",
      time: "07:55",
      body: "Q3 inventory check shows 6 flashlight units with dead batteries. Replacements were ordered July 20 — still waiting.",
    },
    {
      id: 2,
      name: "J. Morrison",
      initials: "JM",
      time: "08:05",
      body: "I've followed up with supply. ETA was given as this week.",
    },
    {
      id: 3,
      name: "D. Reyes",
      initials: "DR",
      time: "08:12",
      body: "Flashlight batteries still outstanding. Units have been using personal lights in the meantime.",
    },
  ],
  3: [
    {
      id: 1,
      name: "HR Dept",
      initials: "HR",
      time: "Yesterday 14:30",
      body: "The updated dress code policy is attached for review. Changes include: updated boot spec, revised badge placement, and updated high-vis vest requirement for after-dark patrols.",
    },
    {
      id: 2,
      name: "S. Park",
      initials: "SP",
      time: "Yesterday 15:02",
      body: "Do the after-dark vest rules apply to lobby officers as well, or only exterior patrol?",
    },
    {
      id: 3,
      name: "HR Dept",
      initials: "HR",
      time: "Yesterday 15:20",
      body: "Lobby officers are exempt from the high-vis requirement indoors. Exterior assignments only.",
    },
    {
      id: 4,
      name: "J. Morrison",
      initials: "JM",
      time: "Yesterday 15:45",
      body: "New policy is effective Sept 1st. Supervisors please brief your teams before month end.",
    },
  ],
  4: [
    {
      id: 1,
      name: "J. Morrison",
      initials: "JM",
      time: "Aug 4 09:00",
      body: "Holiday coverage sign-up is open. We need volunteers for Dec 24 eve, Dec 25, Dec 31, and Jan 1. Shift premiums apply.",
    },
    {
      id: 2,
      name: "A. Chen",
      initials: "AC",
      time: "Aug 4 10:15",
      body: "I can cover Dec 25 if needed.",
    },
    {
      id: 3,
      name: "R. Torres",
      initials: "RT",
      time: "Aug 5 08:00",
      body: "I'll take Dec 31 overnight.",
    },
  ],
  5: [
    {
      id: 1,
      name: "J. Morrison",
      initials: "JM",
      time: "Aug 3 11:00",
      body: 'Updated the Incident Report template — main change is a new "Witness Contact" field and a required photo attachment for property damage incidents.',
    },
    {
      id: 2,
      name: "D. Reyes",
      initials: "DR",
      time: "Aug 3 13:30",
      body: "Looks good, approved for rollout. Should we update the training guide too?",
    },
  ],
}

const CONTACTS = [
  {
    id: 1,
    name: "R. Torres",
    position: "Security Officer",
    status: "active",
    unread: 2,
    lastMsg: "Copy that. Heading to Sector 4 now.",
    lastTime: "09:38",
  },
  {
    id: 2,
    name: "A. Chen",
    position: "Security Officer",
    status: "active",
    unread: 0,
    lastMsg: "K9 sweep complete. All clear.",
    lastTime: "08:55",
  },
  {
    id: 3,
    name: "D. Reyes",
    position: "Field Supervisor",
    status: "late",
    unread: 1,
    lastMsg: "Running 10 min late — car trouble.",
    lastTime: "07:20",
  },
  {
    id: 4,
    name: "S. Park",
    position: "Security Officer",
    status: "off-duty",
    unread: 0,
    lastMsg: "See you tomorrow, sir.",
    lastTime: "Yesterday",
  },
]

const CONVERSATIONS: Record<number, Array<{
  id: number
  text: string
  mine: boolean
  time: string
}>> = {
  1: [
    {
      id: 1,
      text: "Torres, confirm your position at Gate 3.",
      mine: true,
      time: "09:31",
    },
    { id: 2, text: "Gate 3 confirmed. All quiet.", mine: false, time: "09:32" },
    {
      id: 3,
      text: "Perimeter alert triggered north side. Move to sector 4.",
      mine: true,
      time: "09:36",
    },
    {
      id: 4,
      text: "Copy that. Heading to Sector 4 now.",
      mine: false,
      time: "09:38",
    },
  ],
  2: [
    { id: 1, text: "Chen — K9 sweep status?", mine: true, time: "08:50" },
    {
      id: 2,
      text: "K9 sweep complete. All clear.",
      mine: false,
      time: "08:55",
    },
    {
      id: 3,
      text: "Good work. Log it and standby.",
      mine: true,
      time: "08:56",
    },
  ],
  3: [
    {
      id: 1,
      text: "Reyes — you were due at 07:00.",
      mine: true,
      time: "07:15",
    },
    {
      id: 2,
      text: "Running 10 min late — car trouble.",
      mine: false,
      time: "07:20",
    },
    {
      id: 3,
      text: "Understood. Check in when you arrive.",
      mine: true,
      time: "07:21",
    },
  ],
  4: [
    {
      id: 1,
      text: "Park — great work this week. Shifts confirmed next week.",
      mine: true,
      time: "Yesterday",
    },
    { id: 2, text: "See you tomorrow, sir.", mine: false, time: "Yesterday" },
  ],
}

const DISPATCH_FEED = [
  {
    id: "d1",
    timestamp: "09:41",
    channelId: "dispatch" as ChannelId,
    sender: "Dispatch Center",
    text: "All units — routine patrol sweep complete. No anomalies reported. Maintain standard watch.",
    type: "dispatch" as const,
  },
  {
    id: "d2",
    timestamp: "09:38",
    channelId: "supervisor" as ChannelId,
    sender: "SGT. Morrison",
    text: "Torres has been redirected to Sector 4. Perimeter north remains active.",
    type: "unit" as const,
  },
  {
    id: "d3",
    timestamp: "09:22",
    channelId: "tactical" as ChannelId,
    sender: "Tactical Ops",
    text: "Staging complete at Entry B. Two-man hold until further instruction.",
    type: "unit" as const,
  },
  {
    id: "d4",
    timestamp: "09:14",
    channelId: "dispatch" as ChannelId,
    sender: "Dispatch Center",
    text: "System alert: North perimeter sensor 4A registered motion event. Investigation dispatched.",
    type: "alert" as const,
  },
  {
    id: "d5",
    timestamp: "08:55",
    channelId: "supervisor" as ChannelId,
    sender: "SGT. Chen",
    text: "K9 sweep floors 1–4 complete. Proceeding to garage level.",
    type: "unit" as const,
  },
  {
    id: "d6",
    timestamp: "08:30",
    channelId: "dispatch" as ChannelId,
    sender: "System",
    text: "Shift log auto-saved. Next scheduled save: 10:30.",
    type: "system" as const,
  },
]

const FEED_BADGE: Record<string, { color: string bg: string label: string }> = {
  dispatch: {
    color: "#5599FF",
    bg: "rgba(85,153,255,0.12)",
    label: "DISPATCH",
  },
  unit: {
    color: "rgba(210,225,250,0.7)",
    bg: "rgba(255,255,255,0.06)",
    label: "UNIT",
  },
  alert: { color: "#FFA500", bg: "rgba(255,165,0,0.12)", label: "ALERT" },
  system: {
    color: "rgba(180,200,240,0.5)",
    bg: "rgba(255,255,255,0.04)",
    label: "SYSTEM",
  },
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  active: "#5599FF",
  late: "#FFA500",
  "off-duty": "rgba(255,255,255,0.2)",
}

// ─── Tab sections ─────────────────────────────────────────────────────────────

function UpdatesSection() {
  const [filter, setFilter] =
    useState<"all" | "critical" | "operational" | "training">("all")
  const filters: Array<{ id: typeof filter label: string }> = [
    { id: "all", label: "All" },
    { id: "critical", label: "Critical" },
    { id: "operational", label: "Operational" },
    { id: "training", label: "Training" },
  ]
  const visible =
    filter === "all" ? UPDATES : UPDATES.filter((u) => u.type === filter)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "6px", flex: 1 }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "5px 12px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 500,
                background:
                  filter === f.id
                    ? "rgba(85,153,255,0.12)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  filter === f.id
                    ? "rgba(85,153,255,0.35)"
                    : "rgba(255,255,255,0.08)"
                }`,
                color: filter === f.id ? "#5599FF" : "rgba(210,225,250,0.7)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 13px",
            borderRadius: "8px",
            cursor: "pointer",
            background: "rgba(85,153,255,0.1)",
            border: "1px solid rgba(85,153,255,0.3)",
            color: "#5599FF",
            fontSize: "11px",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 1v9M1 5.5h9"
              stroke="#5599FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          New Update
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {visible.map((u) => {
          const ts = UPDATE_TYPES[u.type]
          return (
            <div
              key={u.id}
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: u.unread ? `${ts.bg}` : "rgba(18,20,26,0.98)",
                border: `1px solid ${
                  u.unread ? ts.border : "rgba(255,255,255,0.06)"
                }`,
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  flexShrink: 0,
                  background: ts.bg,
                  border: `1px solid ${ts.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: ts.color,
                }}
              >
                {u.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      fontWeight: 600,
                      color: ts.color,
                      letterSpacing: "0.07em",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: ts.bg,
                      border: `1px solid ${ts.border}`,
                    }}
                  >
                    {ts.label}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: u.unread ? "#FFFFFF" : "rgba(225,238,255,0.88)",
                    }}
                  >
                    {u.title}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(185,205,235,0.7)",
                    lineHeight: 1.4,
                  }}
                >
                  {u.body}
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(185,205,235,0.55)",
                    }}
                  >
                    {u.sender}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(185,205,235,0.4)",
                    }}
                  >
                    ·
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(185,205,235,0.55)",
                    }}
                  >
                    {u.time}
                  </span>
                </div>
              </div>
              {u.unread && (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: ts.color,
                    flexShrink: 0,
                    marginTop: "4px",
                    boxShadow: `0 0 6px ${ts.color}`,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BoardSection() {
  const [activeThread, setActiveThread] = useState(1)
  const [replyVal, setReplyVal] = useState("")
  const posts = THREAD_POSTS[activeThread] ?? []
  const thread = THREADS.find((t) => t.id === activeThread)!

  return (
    <div style={{ display: "flex", height: "100%", gap: "10px" }}>
      {/* Thread list */}
      <div
        style={{
          width: "280px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2px 0 6px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(185,205,235,0.55)",
              letterSpacing: "0.1em",
            }}
          >
            THREADS
          </span>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 10px",
              borderRadius: "6px",
              cursor: "pointer",
              background: "rgba(85,153,255,0.08)",
              border: "1px solid rgba(85,153,255,0.25)",
              color: "#5599FF",
              fontSize: "10px",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M4.5 1v7M1 4.5h7"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            New
          </button>
        </div>
        {THREADS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveThread(t.id)}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background:
                activeThread === t.id
                  ? "rgba(85,153,255,0.08)"
                  : "rgba(18,20,26,0.95)",
              border: `1px solid ${
                activeThread === t.id
                  ? "rgba(85,153,255,0.25)"
                  : "rgba(255,255,255,0.06)"
              }`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "4px",
              }}
            >
              {t.pinned && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M4.5 1v6M2 4l2.5-3L7 4"
                    stroke="#5599FF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color:
                    activeThread === t.id
                      ? "#FFFFFF"
                      : "rgba(225,238,255,0.85)",
                }}
              >
                {t.title}
              </span>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(185,205,235,0.6)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: "5px",
              }}
            >
              {t.preview}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(210,225,250,0.6)",
                }}
              >
                {t.replies} replies
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(185,205,235,0.4)",
                }}
              >
                {t.last}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Thread detail */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          gap: "8px",
        }}
      >
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "10px",
            background: "rgba(18,20,26,0.95)",
            border: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(235,244,255,0.95)",
            }}
          >
            {thread.title}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {posts.map((p) => (
            <div key={p.id} style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  flexShrink: 0,
                  background: "rgba(85,153,255,0.1)",
                  border: "1px solid rgba(85,153,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#5599FF",
                }}
              >
                {p.initials}
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: "10px",
                  background: "rgba(22,24,32,0.98)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(235,244,255,0.95)",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(185,205,235,0.5)",
                    }}
                  >
                    {p.time}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(210,225,250,0.82)",
                    lineHeight: 1.5,
                  }}
                >
                  {p.body}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <input
            value={replyVal}
            onChange={(e) => setReplyVal(e.target.value)}
            placeholder="Write a reply…"
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: "10px",
              background: "rgba(18,20,26,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(225,238,255,0.92)",
              fontSize: "12px",
              fontFamily: "Space Grotesk, sans-serif",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "9px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              background: "rgba(85,153,255,0.12)",
              border: "1px solid rgba(85,153,255,0.3)",
              color: "#5599FF",
              fontSize: "12px",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

function ChatSection() {
  const [activeContact, setActiveContact] = useState(1)
  const [msgVal, setMsgVal] = useState("")
  const convo = CONVERSATIONS[activeContact] ?? []
  const contact = CONTACTS.find((c) => c.id === activeContact)!

  return (
    <div style={{ display: "flex", height: "100%", gap: "10px" }}>
      {/* Contact list */}
      <div
        style={{
          width: "240px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          overflowY: "auto",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            color: "rgba(185,205,235,0.55)",
            letterSpacing: "0.1em",
            padding: "2px 0 6px",
            flexShrink: 0,
            display: "block",
          }}
        >
          DIRECT MESSAGES
        </span>
        {CONTACTS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveContact(c.id)}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background:
                activeContact === c.id
                  ? "rgba(85,153,255,0.08)"
                  : "rgba(18,20,26,0.95)",
              border: `1px solid ${
                activeContact === c.id
                  ? "rgba(85,153,255,0.25)"
                  : "rgba(255,255,255,0.06)"
              }`,
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  background: "rgba(85,153,255,0.08)",
                  border: `1px solid rgba(85,153,255,0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#5599FF",
                }}
              >
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  right: "-1px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: STATUS_COLOR[c.status],
                  border: "1.5px solid #0A0E16",
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: c.unread ? 700 : 600,
                    color: "rgba(235,244,255,0.92)",
                  }}
                >
                  {c.name}
                </span>
                {c.unread > 0 && (
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: "10px",
                      background: "rgba(85,153,255,0.15)",
                      color: "#5599FF",
                      border: "1px solid rgba(85,153,255,0.3)",
                    }}
                  >
                    {c.unread}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(185,205,235,0.6)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.lastMsg}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Conversation */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            background: "rgba(18,20,26,0.95)",
            border: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: STATUS_COLOR[contact.status],
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(235,244,255,0.95)",
            }}
          >
            {contact.name}
          </span>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              color: "rgba(185,205,235,0.55)",
            }}
          >
            {contact.position}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {convo.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: msg.mine ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "9px 13px",
                  borderRadius: msg.mine
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  background: msg.mine
                    ? "rgba(85,153,255,0.12)"
                    : "rgba(22,24,32,0.98)",
                  border: `1px solid ${
                    msg.mine
                      ? "rgba(85,153,255,0.25)"
                      : "rgba(255,255,255,0.07)"
                  }`,
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: msg.mine
                      ? "rgba(235,248,235,0.95)"
                      : "rgba(210,225,250,0.88)",
                    lineHeight: 1.45,
                  }}
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    color: "rgba(185,205,235,0.4)",
                    marginTop: "4px",
                    textAlign: msg.mine ? "right" : "left",
                  }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <input
            value={msgVal}
            onChange={(e) => setMsgVal(e.target.value)}
            placeholder={`Message ${contact.name}…`}
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: "10px",
              background: "rgba(18,20,26,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(225,238,255,0.92)",
              fontSize: "12px",
              fontFamily: "Space Grotesk, sans-serif",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "9px 16px",
              borderRadius: "10px",
              cursor: "pointer",
              background: "rgba(85,153,255,0.12)",
              border: "1px solid rgba(85,153,255,0.3)",
              color: "#5599FF",
              fontSize: "12px",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

function RadioSection() {
  const [activeChannelId, setActiveChannelId] = useState<ChannelId>("dispatch")
  const [transmitting, setTransmitting] = useState(false)
  const ch = CHANNELS.find((c) => c.id === activeChannelId)!
  const isEmergency = ch.id === "sos"
  const accent = isEmergency ? "#FF4444" : ch.color

  const CHANNEL_CONFIG: Record<ChannelId, {
    icon: React.ReactNode
    title: string
    sub: string
    tag: string
  }> = {
    dispatch: {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle
            cx="9"
            cy="7"
            r="3"
            stroke={ch.id === "dispatch" ? "#5599FF" : "rgba(210,225,250,0.5)"}
            strokeWidth="1.4"
          />
          <path
            d="M4 16c0-2.76 2.24-5 5-5s5 2.24 5 5"
            stroke={ch.id === "dispatch" ? "#5599FF" : "rgba(210,225,250,0.5)"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Call Dispatch",
      sub: "DISPATCH CENTER",
      tag: "PRIORITY LINE",
    },
    supervisor: {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2l7 11H2L9 2Z"
            stroke={
              ch.id === "supervisor" ? "#4A8FFF" : "rgba(210,225,250,0.5)"
            }
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M9 7v4"
            stroke={
              ch.id === "supervisor" ? "#4A8FFF" : "rgba(210,225,250,0.5)"
            }
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle
            cx="9"
            cy="12.5"
            r=".8"
            fill={ch.id === "supervisor" ? "#4A8FFF" : "rgba(210,225,250,0.5)"}
          />
        </svg>
      ),
      title: "Call Supervisor",
      sub: "SGT. MORRISON",
      tag: "ESCALATION",
    },
    tactical: {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect
            x="3"
            y="6"
            width="12"
            height="9"
            rx="2"
            stroke={ch.id === "tactical" ? "#4A8FFF" : "rgba(210,225,250,0.5)"}
            strokeWidth="1.4"
          />
          <path
            d="M6 6V5a3 3 0 016 0v1"
            stroke={ch.id === "tactical" ? "#4A8FFF" : "rgba(210,225,250,0.5)"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Tactical Channel",
      sub: "FIELD OPS",
      tag: "BROADCAST",
    },
    sos: {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2l7.5 13H1.5L9 2Z"
            stroke="#FF4444"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M9 7v4"
            stroke="#FF4444"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="9" cy="13" r=".8" fill="#FF4444" />
        </svg>
      ),
      title: "SOS / Emergency",
      sub: "ALL UNITS",
      tag: "PRIORITY OVERRIDE",
    },
  }

  return (
    <div style={{ display: "flex", height: "100%", gap: "12px", minHeight: 0 }}>
      {/* Far left: vertical channel selector */}
      <div
        style={{
          width: "90px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8px",
            color: "rgba(185,205,235,0.45)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            paddingBottom: "4px",
          }}
        >
          CHANNELS
        </span>
        {CHANNELS.map((c) => {
          const isActive = c.id === activeChannelId
          return (
            <button
              key={c.id}
              onClick={() => setActiveChannelId(c.id)}
              style={{
                flex: 1,
                width: "100%",
                borderRadius: "12px",
                cursor: "pointer",
                background: isActive ? `${c.color}18` : "rgba(18,20,26,0.95)",
                border: `1px solid ${
                  isActive ? c.color + "70" : "rgba(255,255,255,0.08)"
                }`,
                boxShadow: isActive ? `0 0 16px ${c.color}25` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px 6px",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: c.color,
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 8px ${c.color}` : "none",
                  animation:
                    isActive && c.id === "sos"
                      ? "pulse-dot 1.5s ease-in-out infinite"
                      : "none",
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: isActive ? c.color : "rgba(185,205,235,0.55)",
                  letterSpacing: "0.04em",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                }}
              >
                {c.label}
              </span>
              {isActive && (
                <div
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: c.color,
                    animation: "pulse-dot 1.8s ease-in-out infinite",
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1, display: "flex", gap: "12px", minHeight: 0 }}>
        {/* Middle: Transmission hub + channel grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
            flexShrink: 0,
          }}
        >
          {/* Transmission hub */}
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              padding: "2px",
              overflow: "hidden",
              flex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-100%",
                left: "-100%",
                right: "-100%",
                bottom: "-100%",
                background: isEmergency
                  ? "conic-gradient(from 0deg, #FF0000, #FF4444, #FF8888, #FF4444, #FF0000)"
                  : `conic-gradient(from 0deg, ${accent}00, ${accent}CC, ${accent}FF, ${accent}CC, ${accent}00)`,
                animation: "border-spin 4s linear infinite",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "14px",
                height: "100%",
                background: "rgba(10,12,18,0.97)",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: accent,
                    animation: "pulse-dot 1.8s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: accent,
                    letterSpacing: "0.1em",
                  }}
                >
                  {isEmergency ? "⚠ EMERGENCY CHANNEL" : "SESSION ACTIVE"}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "9px",
                    color: `${accent}90`,
                    padding: "1px 7px",
                    borderRadius: "4px",
                    background: `${accent}12`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  {ch.label.toUpperCase()}
                </span>
              </div>
              <div style={{ height: "1px", background: `${accent}20` }} />
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    flexShrink: 0,
                    background: `${accent}12`,
                    border: `1px solid ${accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: accent,
                  }}
                >
                  DC
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "rgba(235,244,255,0.95)",
                    }}
                  >
                    Dispatch Center
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      color: `${accent}90`,
                      letterSpacing: "0.06em",
                    }}
                  >
                    ACTIVE TRANSMITTER
                  </div>
                </div>
                {transmitting && (
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "2px",
                      height: "18px",
                    }}
                  >
                    {[0.3, 0.6, 1, 0.7, 0.4].map((h, i) => (
                      <div
                        key={i}
                        className="audio-bar"
                        style={{
                          width: "3px",
                          borderRadius: "2px",
                          background: accent,
                          transformOrigin: "bottom",
                          height: "100%",
                          transform: `scaleY(${h})`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ height: "1px", background: `${accent}20` }} />
              <button
                onMouseDown={() => setTransmitting(true)}
                onMouseUp={() => setTransmitting(false)}
                onMouseLeave={() => setTransmitting(false)}
                onTouchStart={() => setTransmitting(true)}
                onTouchEnd={() => setTransmitting(false)}
                style={{
                  padding: "11px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: transmitting ? accent : `${accent}14`,
                  border: `1px solid ${accent}${transmitting ? "FF" : "40"}`,
                  color: transmitting ? "#000" : accent,
                  fontFamily: "DM Mono, monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  transition: "all 0.1s ease",
                  boxShadow: transmitting ? `0 0 20px ${accent}60` : "none",
                }}
              >
                {transmitting ? "● TRANSMITTING…" : "HOLD TO TRANSMIT"}
              </button>
            </div>
          </div>

          {/* Channel grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            {CHANNELS.map((c) => {
              const cfg = CHANNEL_CONFIG[c.id]
              const isActive = c.id === activeChannelId
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveChannelId(c.id)}
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: isActive
                      ? `${c.color}12`
                      : "rgba(18,20,26,0.95)",
                    border: `1px solid ${
                      isActive ? c.color + "50" : "rgba(255,255,255,0.07)"
                    }`,
                    boxShadow: isActive ? `0 0 14px ${c.color}20` : "none",
                  }}
                >
                  <div style={{ marginBottom: "5px" }}>{cfg.icon}</div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: isActive ? "#FFFFFF" : "rgba(225,238,255,0.8)",
                      marginBottom: "2px",
                    }}
                  >
                    {cfg.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      color: isActive ? c.color : "rgba(185,205,235,0.5)",
                      marginBottom: "4px",
                    }}
                  >
                    {cfg.sub}
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "8px",
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: "3px",
                      background: `${c.color}14`,
                      border: `1px solid ${c.color}30`,
                      color: c.color,
                    }}
                  >
                    {cfg.tag}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: Dispatch feed */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            overflowY: "auto",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              padding: "0 2px 4px",
            }}
          >
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "9px",
                color: "rgba(185,205,235,0.55)",
                letterSpacing: "0.1em",
              }}
            >
              DISPATCH FEED
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#5599FF",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "#5599FF",
                  letterSpacing: "0.06em",
                }}
              >
                LIVE
              </span>
            </div>
          </div>
          {DISPATCH_FEED.map((entry) => {
            const chInfo = CHANNELS.find((c) => c.id === entry.channelId)!
            const badge = FEED_BADGE[entry.type]
            return (
              <div
                key={entry.id}
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "rgba(18,20,26,0.98)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "5px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      color: "rgba(185,205,235,0.5)",
                    }}
                  >
                    {entry.timestamp}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: `${chInfo.color}18`,
                      border: `1px solid ${chInfo.color}40`,
                      color: chInfo.color,
                    }}
                  >
                    {chInfo.shortLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "9px",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(210,225,250,0.75)",
                      marginLeft: "auto",
                    }}
                  >
                    {entry.sender}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(210,225,250,0.82)",
                    lineHeight: 1.45,
                    fontStyle: "italic",
                  }}
                >
                  "{entry.text}"
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Main module ──────────────────────────────────────────────────────────────

export default function CommunicationsModule({
  onClose,
}: {
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<CommTab>("updates")

  const tabs: Array<{ id: CommTab label: string icon: React.ReactNode }> = [
    {
      id: "updates",
      label: "Updates",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4h12M2 8h9M2 12h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "board",
      label: "Message Board",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="1"
            y="1"
            width="14"
            height="11"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M5 15l3-3h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "chat",
      label: "Chat",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 2.5A1.5 1.5 0 0 1 3.5 1h9A1.5 1.5 0 0 1 14 2.5v8A1.5 1.5 0 0 1 12.5 12H6L3 15v-3H3A1.5 1.5 0 0 1 1.5 10.5v-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "radio",
      label: "Radio",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="10"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 6V3M5 4.5L3 2.5M11 4.5l2-2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="8" cy="10" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
  ]

  const ACCENT = "#5599FF"

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        background: "rgba(9,11,17,0.97)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            flexShrink: 0,
            background: "rgba(85,153,255,0.1)",
            border: "1px solid rgba(85,153,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5.5L3 13V11H3a1 1 0 0 1-1-1V3Z"
              stroke={ACCENT}
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "11px",
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "0.1em",
            }}
          >
            COMMUNICATIONS
          </div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "9px",
              color: "rgba(185,205,235,0.55)",
              letterSpacing: "0.06em",
              marginTop: "1px",
            }}
          >
            ATHENA SUPERVISOR PLATFORM
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            marginLeft: "auto",
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(210,225,250,0.7)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1l10 10M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      >
        {tabs.map((t) => {
          const isActive = activeTab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                padding: "14px 10px",
                borderRadius: "12px",
                cursor: "pointer",
                background: isActive
                  ? "rgba(85,153,255,0.1)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  isActive ? "rgba(85,153,255,0.4)" : "rgba(255,255,255,0.07)"
                }`,
                color: isActive ? ACCENT : "rgba(185,205,235,0.55)",
                boxShadow: isActive ? "0 0 18px rgba(85,153,255,0.1)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: isActive
                    ? "rgba(85,153,255,0.15)"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    isActive ? "rgba(85,153,255,0.3)" : "rgba(255,255,255,0.06)"
                  }`,
                  color: isActive ? ACCENT : "rgba(185,205,235,0.5)",
                }}
              >
                {t.icon}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </span>
            </button>
          )
        })}
      </div>

      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeTab === "updates" && <UpdatesSection />}
        {activeTab === "board" && <BoardSection />}
        {activeTab === "chat" && <ChatSection />}
        {activeTab === "radio" && <RadioSection />}
      </div>
    </div>
  )
}
