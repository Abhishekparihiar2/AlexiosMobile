import { useState } from "react"

// ─── Types ─────────────────────────────────────────────────────────────────────

type AdminSection = "users" | "sites" | "groups" | "automations" | "documents" | "forms" | "quizzes" | "settings"

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const USERS = [
  {
    id: 1,
    name: "James Morrison",
    email: "j.morrison@athena.sec",
    role: "Admin",
    site: "Meridian Tower",
    status: "active",
    avatar: "JM",
    badge: "A-001",
    lastLogin: "08:12 today",
  },
  {
    id: 2,
    name: "J. Rivera",
    email: "j.rivera@athena.sec",
    role: "Lead Guard",
    site: "Meridian Tower",
    status: "active",
    avatar: "JR",
    badge: "S-041",
    lastLogin: "06:00 today",
  },
  {
    id: 3,
    name: "M. Chen",
    email: "m.chen@athena.sec",
    role: "Patrol",
    site: "Meridian Tower",
    status: "active",
    avatar: "MC",
    badge: "S-019",
    lastLogin: "06:02 today",
  },
  {
    id: 4,
    name: "T. Williams",
    email: "t.williams@athena.sec",
    role: "Access Ctrl",
    site: "Meridian Tower",
    status: "inactive",
    avatar: "TW",
    badge: "S-057",
    lastLogin: "Yesterday",
  },
  {
    id: 5,
    name: "A. Okafor",
    email: "a.okafor@athena.sec",
    role: "Patrol",
    site: "Meridian Tower",
    status: "active",
    avatar: "AO",
    badge: "S-033",
    lastLogin: "06:00 today",
  },
  {
    id: 6,
    name: "D. Patel",
    email: "d.patel@athena.sec",
    role: "CCTV Monitor",
    site: "Meridian Tower",
    status: "active",
    avatar: "DP",
    badge: "S-062",
    lastLogin: "06:00 today",
  },
  {
    id: 7,
    name: "L. Santos",
    email: "l.santos@athena.sec",
    role: "Patrol",
    site: "Meridian Tower",
    status: "active",
    avatar: "LS",
    badge: "S-024",
    lastLogin: "05:58 today",
  },
  {
    id: 8,
    name: "K. Park",
    email: "k.park@athena.sec",
    role: "Patrol",
    site: "Harbor View Plaza",
    status: "active",
    avatar: "KP",
    badge: "S-011",
    lastLogin: "Yesterday",
  },
  {
    id: 9,
    name: "R. Gomez",
    email: "r.gomez@athena.sec",
    role: "Lead Guard",
    site: "Harbor View Plaza",
    status: "active",
    avatar: "RG",
    badge: "S-038",
    lastLogin: "Yesterday",
  },
  {
    id: 10,
    name: "N. Foster",
    email: "n.foster@athena.sec",
    role: "Access Ctrl",
    site: "Eastgate Complex",
    status: "pending",
    avatar: "NF",
    badge: "S-049",
    lastLogin: "Never",
  },
]

const SITES = [
  {
    id: 1,
    name: "Meridian Tower",
    address: "1 Financial Plaza, Downtown District, CA 94105",
    officers: 7,
    area: "42,000 sqft",
    floors: 12,
    access: 34,
    cctv: 68,
    contract: "Jan 6, 2025",
    status: "active",
  },
  {
    id: 2,
    name: "Harbor View Plaza",
    address: "200 Harbor Blvd, Waterfront District, CA 94107",
    officers: 4,
    area: "28,500 sqft",
    floors: 6,
    access: 18,
    cctv: 32,
    contract: "Mar 1, 2025",
    status: "active",
  },
  {
    id: 3,
    name: "Eastgate Complex",
    address: "850 East Gate Dr, Industrial Zone, CA 94124",
    officers: 3,
    area: "61,000 sqft",
    floors: 3,
    access: 42,
    cctv: 54,
    contract: "Jun 15, 2025",
    status: "active",
  },
  {
    id: 4,
    name: "Northpark Center",
    address: "400 North Park Ave, Midtown, CA 94103",
    officers: 0,
    area: "19,000 sqft",
    floors: 5,
    access: 12,
    cctv: 20,
    contract: "—",
    status: "pending",
  },
]

const GROUPS = [
  {
    id: 1,
    name: "Lead Guards",
    members: 2,
    sites: "All Sites",
    description: "Senior officers with dispatch authority",
  },
  {
    id: 2,
    name: "Patrol Team A",
    members: 4,
    sites: "Meridian Tower",
    description: "Day shift patrol — 06:00–14:00",
  },
  {
    id: 3,
    name: "Patrol Team B",
    members: 3,
    sites: "All Sites",
    description: "Afternoon shift patrol — 14:00–22:00",
  },
  {
    id: 4,
    name: "CCTV Operators",
    members: 1,
    sites: "Meridian Tower",
    description: "Control room surveillance operators",
  },
  {
    id: 5,
    name: "Access Control",
    members: 2,
    sites: "Meridian Tower",
    description: "Gate and access point management",
  },
  {
    id: 6,
    name: "Supervisors",
    members: 1,
    sites: "All Sites",
    description: "Supervisory and admin-level access",
  },
]

const AUTOMATIONS = [
  {
    id: 1,
    name: "Late Clock-In Alert",
    trigger: "Clock-in > 5 min late",
    action: "Notify supervisor + log incident",
    active: true,
    runs: 14,
    lastRun: "07:31 today",
  },
  {
    id: 2,
    name: "Checkpoint Overdue",
    trigger: "Tour checkpoint > 15 min late",
    action: "Send alert to officer + supervisor",
    active: true,
    runs: 3,
    lastRun: "07:16 today",
  },
  {
    id: 3,
    name: "End-of-Shift Summary",
    trigger: "Daily at 14:00",
    action: "Email shift report to admin",
    active: true,
    runs: 31,
    lastRun: "Yesterday",
  },
  {
    id: 4,
    name: "Incident Escalation",
    trigger: "Incident open > 30 min",
    action: "Escalate to Lead Guard",
    active: true,
    runs: 7,
    lastRun: "3 days ago",
  },
  {
    id: 5,
    name: "Low Coverage Warning",
    trigger: "Active officers < 3",
    action: "Alert admin + dispatch on-call",
    active: false,
    runs: 2,
    lastRun: "1 week ago",
  },
  {
    id: 6,
    name: "Weekly Timesheet Reminder",
    trigger: "Every Friday at 16:00",
    action: "Push notification to all officers",
    active: true,
    runs: 12,
    lastRun: "4 days ago",
  },
]

const DOCUMENTS = [
  {
    id: 1,
    name: "ATHENA Ops Manual v3.2",
    type: "Policy",
    size: "2.4 MB",
    updated: "Jul 30, 2026",
    author: "J. Morrison",
    access: "All Staff",
  },
  {
    id: 2,
    name: "Emergency Response Protocol",
    type: "Protocol",
    size: "1.1 MB",
    updated: "Jul 15, 2026",
    author: "J. Morrison",
    access: "All Staff",
  },
  {
    id: 3,
    name: "Meridian Tower Site Map",
    type: "Map",
    size: "4.7 MB",
    updated: "Jun 20, 2026",
    author: "J. Morrison",
    access: "Site Staff",
  },
  {
    id: 4,
    name: "Use of Force Policy 2026",
    type: "Policy",
    size: "890 KB",
    updated: "Jan 5, 2026",
    author: "HR Dept",
    access: "All Staff",
  },
  {
    id: 5,
    name: "CCTV Operating Guide",
    type: "Training",
    size: "3.3 MB",
    updated: "May 12, 2026",
    author: "D. Patel",
    access: "CCTV Team",
  },
  {
    id: 6,
    name: "Access Control SOP",
    type: "SOP",
    size: "1.8 MB",
    updated: "Apr 28, 2026",
    author: "J. Rivera",
    access: "All Staff",
  },
  {
    id: 7,
    name: "Incident Report Template",
    type: "Template",
    size: "224 KB",
    updated: "Mar 3, 2026",
    author: "J. Morrison",
    access: "All Staff",
  },
  {
    id: 8,
    name: "Vehicle Inspection Form",
    type: "Template",
    size: "180 KB",
    updated: "Feb 14, 2026",
    author: "J. Morrison",
    access: "All Staff",
  },
]

const FORMS = [
  {
    id: 1,
    name: "Incident Report",
    fields: 12,
    submissions: 34,
    status: "active",
    updated: "Aug 1, 2026",
  },
  {
    id: 2,
    name: "Vehicle Inspection",
    fields: 18,
    submissions: 21,
    status: "active",
    updated: "Jul 15, 2026",
  },
  {
    id: 3,
    name: "Visitor Log",
    fields: 8,
    submissions: 87,
    status: "active",
    updated: "Jul 28, 2026",
  },
  {
    id: 4,
    name: "Shift Handover",
    fields: 10,
    submissions: 19,
    status: "active",
    updated: "Jun 30, 2026",
  },
  {
    id: 5,
    name: "Equipment Check",
    fields: 15,
    submissions: 11,
    status: "active",
    updated: "May 20, 2026",
  },
  {
    id: 6,
    name: "Maintenance Request",
    fields: 9,
    submissions: 7,
    status: "draft",
    updated: "Aug 3, 2026",
  },
]

const QUIZZES = [
  {
    id: 1,
    name: "Emergency Response Basics",
    questions: 15,
    passing: 80,
    assigned: 10,
    completed: 8,
    status: "active",
    updated: "Jul 1, 2026",
  },
  {
    id: 2,
    name: "Use of Force — Annual Cert",
    questions: 25,
    passing: 85,
    assigned: 10,
    completed: 6,
    status: "active",
    updated: "Jan 5, 2026",
  },
  {
    id: 3,
    name: "CCTV System Operations",
    questions: 12,
    passing: 75,
    assigned: 3,
    completed: 3,
    status: "active",
    updated: "May 10, 2026",
  },
  {
    id: 4,
    name: "Site-Specific Induction",
    questions: 20,
    passing: 80,
    assigned: 7,
    completed: 5,
    status: "active",
    updated: "Jun 15, 2026",
  },
  {
    id: 5,
    name: "Patrol Procedures v2",
    questions: 18,
    passing: 75,
    assigned: 6,
    completed: 6,
    status: "active",
    updated: "Apr 22, 2026",
  },
  {
    id: 6,
    name: "Customer Service Standards",
    questions: 10,
    passing: 70,
    assigned: 0,
    completed: 0,
    status: "draft",
    updated: "Aug 1, 2026",
  },
]

// ─── Shared UI ─────────────────────────────────────────────────────────────────

const MONO: React.CSSProperties = { fontFamily: "DM Mono, monospace" }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...MONO,
        fontSize: "9px",
        color: "rgba(200,215,245,0.55)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  )
}

function ActionBtn({
  label,
  icon,
  onClick,
  accent = "rgba(255,255,255,0.07)",
  border = "rgba(255,255,255,0.1)",
  color = "rgba(228,240,255,0.88)",
}: {
  label: string
  icon: React.ReactNode
  onClick?: () => void
  accent?: string
  border?: string
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      style={
        {
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "7px 14px",
          borderRadius: "9px",
          background: accent,
          border: `1px solid ${border}`,
          color,
          ...MONO,
          fontSize: "10px",
          letterSpacing: "0.06em",
          cursor: "pointer",
          flexShrink: 0,
        } as React.CSSProperties
      }
    >
      {icon}
      {label}
    </button>
  )
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, {
    bg: string
    border: string
    color: string
    label: string
  }> = {
    active: {
      bg: "rgba(85,153,255,0.08)",
      border: "rgba(85,153,255,0.25)",
      color: "#5599FF",
      label: "Active",
    },
    inactive: {
      bg: "rgba(180,195,230,0.07)",
      border: "rgba(180,195,230,0.15)",
      color: "rgba(200,215,245,0.65)",
      label: "Inactive",
    },
    pending: {
      bg: "rgba(255,165,0,0.08)",
      border: "rgba(255,165,0,0.25)",
      color: "#FFA500",
      label: "Pending",
    },
    draft: {
      bg: "rgba(180,195,230,0.07)",
      border: "rgba(180,195,230,0.15)",
      color: "rgba(200,215,245,0.65)",
      label: "Draft",
    },
  }
  const m = map[status] || map.inactive
  return (
    <div
      style={{
        display: "inline-flex",
        padding: "2px 9px",
        borderRadius: "20px",
        background: m.bg,
        border: `1px solid ${m.border}`,
      }}
    >
      <span
        style={{
          ...MONO,
          fontSize: "8.5px",
          color: m.color,
          letterSpacing: "0.06em",
        }}
      >
        {m.label}
      </span>
    </div>
  )
}

function Toggle({ active }: { active: boolean }) {
  return (
    <div
      style={{
        width: "34px",
        height: "18px",
        borderRadius: "9px",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        background: active ? "rgba(85,153,255,0.25)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${
          active ? "rgba(85,153,255,0.5)" : "rgba(255,255,255,0.12)"
        }`,
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: active ? "16px" : "2px",
          width: "12px",
          height: "12px",
          borderRadius: "6px",
          background: active ? "#5599FF" : "rgba(200,218,248,0.6)",
          transition: "all 0.2s ease",
        }}
      />
    </div>
  )
}

// ─── Sidebar Nav ───────────────────────────────────────────────────────────────

const NAV_ITEMS: {
  id: AdminSection
  label: string
  icon: React.ReactNode
  count?: number
}[] = [
  {
    id: "users",
    label: "Users",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M1 11.5c0-2.2 1.8-4 4-4s4 1.8 4 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="10" cy="4" r="1.5" stroke="currentColor" strokeWidth="1" />
        <path
          d="M12.5 11c0-1.6-1-3-2.5-3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: USERS.length,
  },
  {
    id: "sites",
    label: "Sites",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x="1"
          y="4"
          width="11"
          height="8"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M4 4V3a2.5 2.5 0 0 1 5 0v1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 7v2.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: SITES.length,
  },
  {
    id: "groups",
    label: "Groups",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M1.5 12c0-2.8 2.2-5 5-5s5 2.2 5 5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: GROUPS.length,
  },
  {
    id: "automations",
    label: "Automations",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M7 1.5L4 7h4.5L5.5 12"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    count: AUTOMATIONS.length,
  },
  {
    id: "documents",
    label: "Documents",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M3 1.5h5l3 3v7A1 1 0 0 1 10 13H3a1 1 0 0 1-1-1.5V2.5A1 1 0 0 1 3 1.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M8 1.5V5h3M4 8h5M4 10h3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: DOCUMENTS.length,
  },
  {
    id: "forms",
    label: "Forms",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x="1.5"
          y="1.5"
          width="10"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M4 5h5M4 7h3.5M4 9h4.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: FORMS.length,
  },
  {
    id: "quizzes",
    label: "Quizzes",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x="1.5"
          y="1.5"
          width="10"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M5 5.5a1.5 1.5 0 1 1 2 1.4V8M7 9.5v1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: QUIZZES.length,
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle
          cx="6.5"
          cy="6.5"
          r="1.8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M6.5 1v1M6.5 11v1M1 6.5h1M11 6.5h1M2.6 2.6l.7.7M9.7 9.7l.7.7M2.6 10.4l.7-.7M9.7 3.3l.7-.7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

// ─── Users Section ─────────────────────────────────────────────────────────────

function UsersSection() {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const roles = [
    "All",
    "Admin",
    "Lead Guard",
    "Patrol",
    "CCTV Monitor",
    "Access Ctrl",
  ]
  const visible = USERS.filter(
    (u) =>
      (filter === "All" || u.role === filter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.badge.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "12px",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 10px",
            height: "32px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "8px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle
              cx="5.5"
              cy="5.5"
              r="4"
              stroke="rgba(200,218,248,0.65)"
              strokeWidth="1.2"
            />
            <path
              d="M9 9l2.5 2.5"
              stroke="rgba(200,218,248,0.65)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            style={
              {
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "12px",
                color: "#FFFFFF",
                fontFamily: "Space Grotesk, sans-serif",
              } as React.CSSProperties
            }
          />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              style={
                {
                  padding: "4px 10px",
                  borderRadius: "7px",
                  background:
                    filter === r
                      ? "rgba(85,153,255,0.12)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    filter === r
                      ? "rgba(85,153,255,0.3)"
                      : "rgba(255,255,255,0.08)"
                  }`,
                  color: filter === r ? "#5599FF" : "rgba(180,195,230,0.5)",
                  ...MONO,
                  fontSize: "9px",
                  cursor: "pointer",
                } as React.CSSProperties
              }
            >
              {r}
            </button>
          ))}
        </div>
        <ActionBtn
          label="Add User"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
      </div>

      {/* Table header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          flexShrink: 0,
        }}
      >
        {[
          ["Officer", "200px"],
          ["Badge", "80px"],
          ["Role", "130px"],
          ["Site", "160px"],
          ["Last Login", "130px"],
          ["Status", "90px"],
          ["", "70px"],
        ].map(([h, w]) => (
          <div
            key={h}
            style={{
              width: w === "200px" ? undefined : w,
              flex: w === "200px" ? 1 : undefined,
              ...MONO,
              fontSize: "8.5px",
              color: "rgba(200,215,245,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {h}
          </div>
        ))}
      </div>
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      />

      {/* Rows */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {visible.map((u) => (
          <div
            key={u.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "9px 12px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid transparent",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "9px",
                  background: "rgba(74,143,255,0.14)",
                  border: "1px solid rgba(74,143,255,0.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...MONO,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#4A8FFF",
                  flexShrink: 0,
                }}
              >
                {u.avatar}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {u.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(200,215,245,0.65)",
                    marginTop: "1px",
                  }}
                >
                  {u.email}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "80px",
                ...MONO,
                fontSize: "11px",
                color: "rgba(200,215,245,0.65)",
              }}
            >
              {u.badge}
            </div>
            <div
              style={{
                width: "130px",
                fontSize: "12px",
                color: "rgba(230,240,255,0.88)",
              }}
            >
              {u.role}
            </div>
            <div
              style={{
                width: "160px",
                fontSize: "11px",
                color: "rgba(200,215,245,0.7)",
              }}
            >
              {u.site}
            </div>
            <div
              style={{
                width: "130px",
                ...MONO,
                fontSize: "10px",
                color: "rgba(200,215,245,0.6)",
              }}
            >
              {u.lastLogin}
            </div>
            <div style={{ width: "90px" }}>
              <StatusPill status={u.status} />
            </div>
            <div style={{ width: "70px", display: "flex", gap: "4px" }}>
              <button
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "7px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1.5 9H4l6-6-2.5-2.5L1.5 7V9Z"
                    stroke="rgba(180,195,230,0.5)"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "7px",
                  background: "rgba(255,68,68,0.07)",
                  border: "1px solid rgba(255,68,68,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 2l6 6M8 2L2 8"
                    stroke="#FF4444"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Sites Section ─────────────────────────────────────────────────────────────

function SitesSection() {
  const [selected, setSelected] = useState<number | null>(null)
  const site = SITES.find((s) => s.id === selected)

  return (
    <div style={{ display: "flex", height: "100%", gap: "12px" }}>
      {/* List */}
      <div
        style={{
          width: "300px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <ActionBtn
          label="Add Site"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            overflowY: "auto",
          }}
        >
          {SITES.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                cursor: "pointer",
                background:
                  selected === s.id
                    ? "rgba(74,143,255,0.1)"
                    : "rgba(22,22,22,0.9)",
                border: `1px solid ${
                  selected === s.id
                    ? "rgba(74,143,255,0.35)"
                    : "rgba(255,255,255,0.07)"
                }`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {s.name}
                </span>
                <StatusPill status={s.status} />
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(200,215,245,0.6)",
                  marginBottom: "8px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.address}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <span
                  style={{
                    ...MONO,
                    fontSize: "9px",
                    color: "rgba(200,215,245,0.6)",
                  }}
                >
                  {s.officers} officers
                </span>
                <span
                  style={{
                    ...MONO,
                    fontSize: "9px",
                    color: "rgba(200,215,245,0.6)",
                  }}
                >
                  {s.floors} floors
                </span>
                <span
                  style={{
                    ...MONO,
                    fontSize: "9px",
                    color: "rgba(200,215,245,0.6)",
                  }}
                >
                  {s.cctv} cams
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div
        style={{
          flex: 1,
          borderRadius: "12px",
          background: "rgba(18,18,18,0.95)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "16px",
          overflow: "auto",
        }}
      >
        {site ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {site.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(200,215,245,0.65)",
                    marginTop: "3px",
                  }}
                >
                  {site.address}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <ActionBtn
                  label="Edit Site"
                  icon={
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path
                        d="M1.5 9H4l6-6-2.5-2.5L1.5 7V9Z"
                        stroke="rgba(180,195,230,0.6)"
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
            <div
              style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
              }}
            >
              {[
                { label: "Officers Assigned", value: String(site.officers) },
                { label: "Site Area", value: site.area },
                { label: "Floors", value: `${site.floors} Levels` },
                { label: "Access Points", value: `${site.access} Active` },
                { label: "CCTV Feeds", value: `${site.cctv} Online` },
                { label: "Contract Start", value: site.contract },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "9px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      ...MONO,
                      fontSize: "8px",
                      color: "rgba(200,215,245,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "4px",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "rgba(220,235,255,0.9)",
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <SectionLabel>Checkpoints & Zones</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {[
                  "Lobby",
                  "Gate A",
                  "Gate B",
                  "Parking P1",
                  "Control Room",
                  "Roof Access",
                  "Server Room",
                  "Loading Dock",
                ].map((z) => (
                  <div
                    key={z}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "7px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "11px",
                      color: "rgba(225,238,255,0.8)",
                    }}
                  >
                    {z}
                  </div>
                ))}
                <button
                  style={{
                    padding: "4px 10px",
                    borderRadius: "7px",
                    background: "rgba(85,153,255,0.08)",
                    border: "1px solid rgba(85,153,255,0.2)",
                    fontSize: "11px",
                    color: "#5599FF",
                    cursor: "pointer",
                  }}
                >
                  + Add Zone
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect
                x="3"
                y="10"
                width="30"
                height="22"
                rx="3"
                stroke="rgba(180,195,230,0.15)"
                strokeWidth="1.5"
              />
              <path
                d="M10 10V8a8 8 0 0 1 16 0v2"
                stroke="rgba(180,195,230,0.15)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                ...MONO,
                fontSize: "10px",
                color: "rgba(200,218,248,0.48)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Select a site to view details
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Groups Section ────────────────────────────────────────────────────────────

function GroupsSection() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: "9px",
            color: "rgba(200,215,245,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {GROUPS.length} groups
        </span>
        <ActionBtn
          label="New Group"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          overflowY: "auto",
          alignContent: "start",
        }}
      >
        {GROUPS.map((g) => (
          <div
            key={g.id}
            style={{
              padding: "14px",
              borderRadius: "12px",
              background: "rgba(22,22,22,0.9)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}
              >
                {g.name}
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 8.5H4l5.5-5.5L7 .5 1.5 6v2.5Z"
                      stroke="rgba(180,195,230,0.5)"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(200,215,245,0.65)",
                marginBottom: "10px",
              }}
            >
              {g.description}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(74,143,255,0.08)",
                  border: "1px solid rgba(74,143,255,0.2)",
                }}
              >
                <span style={{ ...MONO, fontSize: "9px", color: "#4A8FFF" }}>
                  {g.members} members
                </span>
              </div>
              <div
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    ...MONO,
                    fontSize: "9px",
                    color: "rgba(200,215,245,0.65)",
                  }}
                >
                  {g.sites}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Automations Section ───────────────────────────────────────────────────────

function AutomationsSection() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: "9px",
            color: "rgba(200,215,245,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {AUTOMATIONS.filter((a) => a.active).length} active ·{" "}
          {AUTOMATIONS.filter((a) => !a.active).length} paused
        </span>
        <ActionBtn
          label="New Automation"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          overflowY: "auto",
        }}
      >
        {AUTOMATIONS.map((a) => (
          <div
            key={a.id}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(22,22,22,0.9)",
              border: `1px solid ${
                a.active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"
              }`,
              opacity: a.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Toggle active={a.active} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {a.name}
                  </span>
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: "rgba(200,215,245,0.5)",
                    }}
                  >
                    {a.runs} runs
                  </span>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path
                        d="M1 4.5a3.5 3.5 0 1 1 7 0"
                        stroke="rgba(255,165,0,0.6)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4.5 1v1"
                        stroke="rgba(255,165,0,0.6)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(180,195,230,0.6)",
                      }}
                    >
                      When:{" "}
                      <span style={{ color: "rgba(255,165,0,0.8)" }}>
                        {a.trigger}
                      </span>
                    </span>
                  </div>
                  <span style={{ color: "rgba(180,195,230,0.2)" }}>→</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path
                        d="M4.5 1v5M2 4l2.5 2.5L7 4"
                        stroke="rgba(85,153,255,0.6)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(180,195,230,0.6)",
                      }}
                    >
                      Then:{" "}
                      <span style={{ color: "rgba(85,153,255,0.8)" }}>
                        {a.action}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    ...MONO,
                    fontSize: "8.5px",
                    color: "rgba(200,215,245,0.45)",
                    marginBottom: "2px",
                  }}
                >
                  Last Run
                </div>
                <div
                  style={{
                    ...MONO,
                    fontSize: "10px",
                    color: "rgba(200,215,245,0.65)",
                  }}
                >
                  {a.lastRun}
                </div>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M1.5 9H4l6-6-2.5-2.5L1.5 7V9Z"
                      stroke="rgba(180,195,230,0.5)"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Documents Section ─────────────────────────────────────────────────────────

const DOC_TYPE_COLOR: Record<string, string> = {
  Policy: "#4A8FFF",
  Protocol: "#FF4444",
  Map: "#5599FF",
  Training: "#FFA500",
  SOP: "#5599FF",
  Template: "rgba(180,195,230,0.5)",
}

function DocumentsSection() {
  const [filter, setFilter] = useState("All")
  const types = ["All", ...Array.from(new Set(DOCUMENTS.map((d) => d.type)))]
  const visible =
    filter === "All" ? DOCUMENTS : DOCUMENTS.filter((d) => d.type === filter)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "12px",
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
        <div style={{ display: "flex", gap: "4px", flex: 1, flexWrap: "wrap" }}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={
                {
                  padding: "4px 10px",
                  borderRadius: "7px",
                  background:
                    filter === t
                      ? "rgba(85,153,255,0.1)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    filter === t
                      ? "rgba(85,153,255,0.3)"
                      : "rgba(255,255,255,0.08)"
                  }`,
                  color: filter === t ? "#5599FF" : "rgba(180,195,230,0.5)",
                  ...MONO,
                  fontSize: "9px",
                  cursor: "pointer",
                } as React.CSSProperties
              }
            >
              {t}
            </button>
          ))}
        </div>
        <ActionBtn
          label="Upload Document"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 7V1M3 3.5L5.5 1 8 3.5M2 8.5h7A1.5 1.5 0 0 1 10.5 10H.5A1.5 1.5 0 0 1 2 8.5Z"
                stroke="#5599FF"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
        <ActionBtn
          label="New Document"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="rgba(228,240,255,0.82)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          overflowY: "auto",
        }}
      >
        {visible.map((d) => {
          const tc = DOC_TYPE_COLOR[d.type] || "rgba(180,195,230,0.5)"
          return (
            <div
              key={d.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(22,22,22,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: `${tc}14`,
                  border: `1px solid ${tc}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M3 1.5h6l4 4v8A1 1 0 0 1 12 15H3a1 1 0 0 1-1-1.5V2.5A1 1 0 0 1 3 1.5Z"
                    stroke={tc}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 1.5V6h4"
                    stroke={tc}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {d.name}
                  </span>
                  <div
                    style={{
                      padding: "1px 7px",
                      borderRadius: "5px",
                      background: `${tc}14`,
                      border: `1px solid ${tc}28`,
                    }}
                  >
                    <span style={{ ...MONO, fontSize: "8px", color: tc }}>
                      {d.type}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "14px" }}>
                  <span
                    style={{ fontSize: "11px", color: "rgba(200,215,245,0.6)" }}
                  >
                    By {d.author}
                  </span>
                  <span
                    style={{
                      ...MONO,
                      fontSize: "10px",
                      color: "rgba(200,215,245,0.5)",
                    }}
                  >
                    Updated {d.updated}
                  </span>
                  <span
                    style={{ fontSize: "11px", color: "rgba(200,215,245,0.5)" }}
                  >
                    Access: {d.access}
                  </span>
                </div>
              </div>
              <span
                style={{
                  ...MONO,
                  fontSize: "10px",
                  color: "rgba(200,215,245,0.6)",
                  flexShrink: 0,
                }}
              >
                {d.size}
              </span>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M1.5 9H4l6-6-2.5-2.5L1.5 7V9Z"
                      stroke="rgba(180,195,230,0.5)"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M5.5 7V1M3 3.5L5.5 1 8 3.5M2 8.5h7A1.5 1.5 0 0 1 10.5 10H.5A1.5 1.5 0 0 1 2 8.5Z"
                      stroke="rgba(180,195,230,0.5)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Forms Section ────────────────────────────────────────────────────────────

function FormsSection() {
  const [filter, setFilter] = useState("All")
  const visible =
    filter === "All"
      ? FORMS
      : FORMS.filter((f) => f.status === filter.toLowerCase())

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "12px",
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
        <div style={{ display: "flex", gap: "4px" }}>
          {["All", "Active", "Draft"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={
                {
                  padding: "4px 12px",
                  borderRadius: "7px",
                  background:
                    filter === f
                      ? "rgba(85,153,255,0.12)"
                      : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    filter === f
                      ? "rgba(85,153,255,0.35)"
                      : "rgba(255,255,255,0.09)"
                  }`,
                  color: filter === f ? "#5599FF" : "rgba(210,225,250,0.65)",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                } as React.CSSProperties
              }
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <ActionBtn
          label="Create Form"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          flexShrink: 0,
        }}
      >
        {[
          ["Form Name", "1"],
          ["Fields", "70px"],
          ["Submissions", "110px"],
          ["Updated", "120px"],
          ["Status", "90px"],
          ["", "60px"],
        ].map(([h, w]) => (
          <div
            key={h}
            style={{
              flex: w === "1" ? 1 : undefined,
              width: w !== "1" ? w : undefined,
              fontFamily: "DM Mono, monospace",
              fontSize: "8.5px",
              color: "rgba(200,215,245,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {h}
          </div>
        ))}
      </div>
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      />

      {/* Rows */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {visible.map((f) => (
          <div
            key={f.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.028)",
              border: "1px solid rgba(255,255,255,0.06)",
              gap: "0",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  background: "rgba(85,153,255,0.1)",
                  border: "1px solid rgba(85,153,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="1.5"
                    y="1.5"
                    width="11"
                    height="11"
                    rx="2.5"
                    stroke="#5599FF"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M4 5h6M4 7.5h4M4 10h5"
                    stroke="#5599FF"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}
              >
                {f.name}
              </span>
            </div>
            <div style={{ width: "70px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "10px",
                    color: "rgba(210,225,250,0.75)",
                    fontWeight: 600,
                  }}
                >
                  {f.fields}
                </span>
              </div>
            </div>
            <div style={{ width: "110px" }}>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "rgba(230,242,255,0.92)",
                }}
              >
                {f.submissions}
              </span>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(200,215,245,0.5)",
                  marginLeft: "4px",
                }}
              >
                total
              </span>
            </div>
            <div
              style={{
                width: "120px",
                fontFamily: "DM Mono, monospace",
                fontSize: "10px",
                color: "rgba(200,215,245,0.62)",
              }}
            >
              {f.updated}
            </div>
            <div style={{ width: "90px" }}>
              <StatusPill status={f.status} />
            </div>
            <div style={{ width: "60px", display: "flex", gap: "4px" }}>
              <button
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "7px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1.5 9H4l6-6-2.5-2.5L1.5 7V9Z"
                    stroke="rgba(210,225,250,0.6)"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "7px",
                  background: "rgba(85,153,255,0.08)",
                  border: "1px solid rgba(85,153,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M5.5 7V1M3 3.5L5.5 1 8 3.5"
                    stroke="#5599FF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quizzes Section ───────────────────────────────────────────────────────────

function QuizzesSection() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: "9px",
            color: "rgba(200,215,245,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {QUIZZES.length} quizzes
        </span>
        <ActionBtn
          label="Create Quiz"
          icon={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v9M1 5.5h9"
                stroke="#5599FF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          }
          accent="rgba(85,153,255,0.1)"
          border="rgba(85,153,255,0.3)"
          color="#5599FF"
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          overflowY: "auto",
          alignContent: "start",
        }}
      >
        {QUIZZES.map((q) => {
          const pct =
            q.assigned > 0 ? Math.round((q.completed / q.assigned) * 100) : 0
          return (
            <div
              key={q.id}
              style={{
                padding: "14px",
                borderRadius: "12px",
                background: "rgba(22,22,22,0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "2px",
                    }}
                  >
                    {q.name}
                  </div>
                  <div
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: "rgba(200,215,245,0.6)",
                    }}
                  >
                    Updated {q.updated}
                  </div>
                </div>
                <StatusPill status={q.status} />
              </div>

              {/* Progress bar */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: "rgba(200,215,245,0.6)",
                    }}
                  >
                    {q.completed}/{q.assigned} completed
                  </span>
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: pct === 100 ? "#5599FF" : "rgba(228,240,255,0.82)",
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: "3px",
                    borderRadius: "99px",
                    background: "rgba(180,200,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      borderRadius: "99px",
                      background:
                        pct === 100
                          ? "#5599FF"
                          : "linear-gradient(90deg, #4A8FFF, #5599FF)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <div
                  style={{
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: "rgba(200,215,245,0.65)",
                    }}
                  >
                    {q.questions} questions
                  </span>
                </div>
                <div
                  style={{
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: "rgba(255,165,0,0.7)",
                    }}
                  >
                    Pass: {q.passing}%
                  </span>
                </div>
                <div
                  style={{ marginLeft: "auto", display: "flex", gap: "4px" }}
                >
                  <button
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "7px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path
                        d="M1.5 9H4l6-6-2.5-2.5L1.5 7V9Z"
                        stroke="rgba(180,195,230,0.5)"
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "7px",
                      background: "rgba(74,143,255,0.08)",
                      border: "1px solid rgba(74,143,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle
                        cx="5.5"
                        cy="5.5"
                        r="4.5"
                        stroke="#4A8FFF"
                        strokeWidth="1.1"
                      />
                      <path
                        d="M4 5.5l1.5 1.5L7.5 4"
                        stroke="#4A8FFF"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Settings Section ──────────────────────────────────────────────────────────

function SettingsSection() {
  const [notif, setNotif] = useState(true)
  const [autoEsc, setAutoEsc] = useState(true)
  const [twoFa, setTwoFa] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [auditLog, setAuditLog] = useState(true)
  const [apiAccess, setApiAccess] = useState(false)

  const settingGroups = [
    {
      title: "Notifications",
      items: [
        {
          label: "Supervisor Alerts",
          sub: "Push & email alerts for incidents and overdue tasks",
          value: notif,
          set: setNotif,
        },
        {
          label: "Auto-Escalation",
          sub: "Automatically escalate unresolved incidents",
          value: autoEsc,
          set: setAutoEsc,
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          label: "Two-Factor Auth",
          sub: "Require 2FA for all admin logins",
          value: twoFa,
          set: setTwoFa,
        },
        {
          label: "Audit Logging",
          sub: "Log all admin actions and changes",
          value: auditLog,
          set: setAuditLog,
        },
        {
          label: "API Access",
          sub: "Allow external API integrations",
          value: apiAccess,
          set: setApiAccess,
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          label: "Dark Mode",
          sub: "Use dark theme across all views",
          value: darkMode,
          set: setDarkMode,
        },
      ],
    },
  ]

  return (
    <div style={{ display: "flex", height: "100%", gap: "14px" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          overflowY: "auto",
        }}
      >
        {settingGroups.map((g) => (
          <div key={g.title}>
            <SectionLabel>{g.title}</SectionLabel>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {g.items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "11px",
                    background: "rgba(22,22,22,0.9)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#FFFFFF",
                        marginBottom: "2px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "rgba(200,215,245,0.6)",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                  <div
                    onClick={() => item.set((v) => !v)}
                    style={{ cursor: "pointer" }}
                  >
                    <Toggle active={item.value} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* System info panel */}
      <div
        style={{
          width: "220px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <SectionLabel>System Info</SectionLabel>
        <div
          style={{
            padding: "14px",
            borderRadius: "11px",
            background: "rgba(22,22,22,0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {[
            { label: "Version", value: "ATHENA 2.4.1" },
            { label: "Environment", value: "Production" },
            { label: "Last Backup", value: "Today 04:00" },
            { label: "Uptime", value: "99.98%" },
            { label: "DB Status", value: "Healthy" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  ...MONO,
                  fontSize: "8.5px",
                  color: "rgba(200,215,245,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "2px",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(230,240,255,0.92)",
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
        <SectionLabel>Danger Zone</SectionLabel>
        <div
          style={{
            padding: "12px 14px",
            borderRadius: "11px",
            background: "rgba(255,68,68,0.06)",
            border: "1px solid rgba(255,68,68,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,160,160,0.8)",
              marginBottom: "8px",
            }}
          >
            Irreversible actions
          </div>
          <button
            style={
              {
                width: "100%",
                padding: "6px",
                borderRadius: "8px",
                background: "rgba(255,68,68,0.1)",
                border: "1px solid rgba(255,68,68,0.3)",
                color: "#FF7070",
                ...MONO,
                fontSize: "10px",
                cursor: "pointer",
              } as React.CSSProperties
            }
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Landing Grid ──────────────────────────────────────────────────────────────

const GRID_ITEMS: {
  id: AdminSection
  label: string
  sub: string
  count: string
  accent: string
  icon: React.ReactNode
}[] = [
  {
    id: "users",
    label: "Users",
    sub: "Manage officers & admins",
    count: `${USERS.length} accounts`,
    accent: "#4A8FFF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="9" r="4" stroke="#4A8FFF" strokeWidth="1.6" />
        <path
          d="M2 24c0-4.4 3.6-8 8-8s8 3.6 8 8"
          stroke="#4A8FFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="21" cy="9" r="3" stroke="#4A8FFF" strokeWidth="1.3" />
        <path
          d="M25.5 22c0-3.2-2-5.8-4.5-5.8"
          stroke="#4A8FFF"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "sites",
    label: "Sites",
    sub: "Create & configure locations",
    count: `${SITES.length} sites`,
    accent: "#5599FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="2"
          y="9"
          width="24"
          height="17"
          rx="3"
          stroke="#5599FF"
          strokeWidth="1.6"
        />
        <path
          d="M9 9V7a5 5 0 0 1 10 0v2"
          stroke="#5599FF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14 15v5"
          stroke="#5599FF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="14" cy="14" r="2" stroke="#5599FF" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: "groups",
    label: "Groups",
    sub: "Team segments & permissions",
    count: `${GROUPS.length} groups`,
    accent: "#5599FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="#5599FF" strokeWidth="1.6" />
        <path
          d="M4 26c0-5.5 4.5-10 10-10s10 4.5 10 10"
          stroke="#5599FF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "automations",
    label: "Automations",
    sub: "Rules & triggered actions",
    count: `${AUTOMATIONS.length} rules`,
    accent: "#FFA500",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M15 3L9 15h9L12 26"
          stroke="#FFA500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "documents",
    label: "Documents",
    sub: "Policies, SOPs & templates",
    count: `${DOCUMENTS.length} files`,
    accent: "#B8CCEE",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M6 3h12l7 7v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="#B8CCEE"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M18 3v8h7M9 17h10M9 21h7"
          stroke="#B8CCEE"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "forms",
    label: "Forms",
    sub: "Custom field forms",
    count: `${FORMS.length} forms`,
    accent: "#5599FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="3"
          y="3"
          width="22"
          height="22"
          rx="4"
          stroke="#5599FF"
          strokeWidth="1.6"
        />
        <path
          d="M8 10h12M8 15h8M8 20h10"
          stroke="#5599FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "quizzes",
    label: "Quizzes",
    sub: "Training assessments",
    count: `${QUIZZES.length} quizzes`,
    accent: "#5599FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="3"
          y="3"
          width="22"
          height="22"
          rx="4"
          stroke="#5599FF"
          strokeWidth="1.6"
        />
        <path
          d="M11 11.5a3 3 0 1 1 4 2.8V17M15 20v2"
          stroke="#5599FF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    sub: "System & account config",
    count: "",
    accent: "#889AAA",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4" stroke="#889AAA" strokeWidth="1.6" />
        <path
          d="M14 2v3M14 23v3M2 14h3M23 14h3M5.6 5.6l2.1 2.1M20.3 20.3l2.1 2.1M5.6 22.4l2.1-2.1M20.3 7.7l2.1-2.1"
          stroke="#889AAA"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function AdminModule({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<AdminSection | null>(null)
  const current = section ? NAV_ITEMS.find((n) => n.id === section)! : null

  const sectionContent: Record<AdminSection, React.ReactNode> = {
    users: <UsersSection />,
    sites: <SitesSection />,
    groups: <GroupsSection />,
    automations: <AutomationsSection />,
    documents: <DocumentsSection />,
    forms: <FormsSection />,
    quizzes: <QuizzesSection />,
    settings: <SettingsSection />,
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        padding: "10px",
        gap: "10px",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 14px",
          background: "rgba(14,14,14,0.96)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "14px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={section ? () => setSection(null) : onClose}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "9px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M8.5 2L3.5 6.5l5 4.5"
              stroke="rgba(210,220,245,0.7)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "rgba(184,204,238,0.14)",
            border: "1px solid rgba(184,204,238,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="1.5"
              y="1.5"
              width="11"
              height="11"
              rx="2.5"
              stroke="#B8CCEE"
              strokeWidth="1.2"
            />
            <path
              d="M4 7h6M4 4.5h6M4 9.5h4"
              stroke="#B8CCEE"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              color: "rgba(184,204,238,0.5)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Module
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.2px",
            }}
          >
            Administration
          </div>
        </div>
        {section && current && (
          <>
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "rgba(180,200,255,0.1)",
                flexShrink: 0,
                marginLeft: "4px",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ color: "rgba(200,215,245,0.55)" }}>
                {current.icon}
              </div>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "11px",
                  color: "rgba(230,240,255,0.92)",
                }}
              >
                {current.label}
              </span>
            </div>
          </>
        )}
        <div style={{ flex: 1 }} />
        <div
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "9px",
            color: "rgba(200,215,245,0.4)",
          }}
        >
          MERIDIAN TOWER
        </div>
      </div>

      {/* ── Landing grid or section view ── */}
      {!section ? (
        /* Landing: large button grid */
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "10px",
              color: "rgba(200,215,245,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              paddingLeft: "2px",
              flexShrink: 0,
            }}
          >
            Select a section
          </div>
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            {GRID_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={
                  {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: "22px 22px 18px",
                    borderRadius: "16px",
                    background: "rgba(18,18,18,0.98)",
                    border: `1px solid rgba(255,255,255,0.09)`,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.15s, background 0.15s",
                    boxShadow: `0 0 0 1px ${item.accent}08`,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = `${item.accent}50`
                  el.style.background = `rgba(24,24,28,0.99)`
                  el.style.boxShadow = `0 0 24px ${item.accent}18`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = "rgba(255,255,255,0.09)"
                  el.style.background = "rgba(18,18,18,0.98)"
                  el.style.boxShadow = `0 0 0 1px ${item.accent}08`
                }}
              >
                {/* Top: icon + count */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `${item.accent}14`,
                      border: `1px solid ${item.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  {item.count && (
                    <div
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background: `${item.accent}12`,
                        border: `1px solid ${item.accent}25`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "10px",
                          color: `${item.accent}`,
                          fontWeight: 600,
                        }}
                      >
                        {item.count}
                      </span>
                    </div>
                  )}
                </div>
                {/* Bottom: label + sub */}
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      letterSpacing: "-0.3px",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(200,215,245,0.55)",
                      fontWeight: 400,
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
                {/* Arrow indicator */}
                <div style={{ alignSelf: "flex-end", marginTop: "14px" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke={item.accent}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.6"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Section view: sidebar + content */
        <div
          style={{ flex: 1, display: "flex", gap: "10px", overflow: "hidden" }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "180px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              background: "rgba(12,12,12,0.98)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "14px",
              padding: "10px 8px",
              overflowY: "auto",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === section
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  style={
                    {
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      padding: "9px 10px",
                      borderRadius: "9px",
                      background: isActive
                        ? "rgba(184,204,238,0.12)"
                        : "transparent",
                      border: `1px solid ${
                        isActive ? "rgba(184,204,238,0.25)" : "transparent"
                      }`,
                      cursor: "pointer",
                      textAlign: "left",
                    } as React.CSSProperties
                  }
                >
                  <span
                    style={{
                      color: isActive ? "#B8CCEE" : "rgba(200,215,245,0.4)",
                      display: "flex",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: "12.5px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#FFFFFF" : "rgba(210,225,250,0.65)",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "9px",
                        color: isActive
                          ? "rgba(184,204,238,0.75)"
                          : "rgba(200,215,245,0.3)",
                      }}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              background: "rgba(14,14,14,0.96)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "14px",
              padding: "14px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {sectionContent[section]}
          </div>
        </div>
      )}
    </div>
  )
}
