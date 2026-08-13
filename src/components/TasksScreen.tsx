import { useState } from "react"

interface Props {
  onBack: () => void
}

// Mock Data from Admin Side (adjusted for guard view)
const MOCK_GUARD_TASKS = [
  {
    id: "TSK-1001",
    title: "Complete Site Opening Inspection",
    type: "Dispatch Task",
    site: "Tower B",
    subtasks: [
      { id: "st-1", text: "Verify all access points", checked: false },
      { id: "st-2", text: "Review night shift logs", checked: false },
      { id: "st-3", text: "Check exterior cameras", checked: false }
    ],
    time: "08:00 AM",
    due: "Aug 05, 2026, 10:00 AM",
    status: "In Progress",
    author: "James Morrison",
    description: "Perform a full perimeter check and verify all access control systems are armed."
  },
  {
    id: "TSK-1002",
    title: "Respond to Access Control Alert",
    type: "Help Desk Ticket",
    site: "Tower B - Sector A",
    subtasks: [],
    time: "09:12 AM",
    due: "Aug 05, 2026, 09:30 AM",
    status: "Overdue",
    author: "System",
    description: "Door forced open alert triggered at Sector A. Immediate response required."
  },
  {
    id: "TSK-1003",
    title: "Vehicle Fuel & Mileage Log",
    type: "Recurring Task",
    site: "Tower B",
    subtasks: [
      { id: "st-4", text: "Record current mileage", checked: false },
      { id: "st-5", text: "Attach fuel receipt", checked: false }
    ],
    time: "05:00 PM",
    due: "Aug 05, 2026, 6:00 PM",
    status: "New",
    author: "Admin Team",
    description: "Log end of shift mileage and attach the fuel receipt from your patrol vehicle."
  }
]

export default function TasksScreen({ onBack }: Props) {
  const [selectedDate, setSelectedDate] = useState(13)
  const [tasks, setTasks] = useState(MOCK_GUARD_TASKS)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const dates = [
    { day: "Mon", date: 10 },
    { day: "Tue", date: 11 },
    { day: "Wed", date: 12 },
    { day: "Thu", date: 13 },
    { day: "Fri", date: 14 },
    { day: "Sat", date: 15 },
    { day: "Sun", date: 16 },
  ]

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.map(st => 
            st.id === subtaskId ? { ...st, checked: !st.checked } : st
          )
        }
      }
      return t;
    }))
    // Also update selected task if modal is open
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({
        ...selectedTask,
        subtasks: selectedTask.subtasks.map((st: any) => 
          st.id === subtaskId ? { ...st, checked: !st.checked } : st
        )
      })
    }
  }

  const markTaskCompleted = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: "Completed" } : t))
    setSelectedTask(null)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New": return "var(--purple-primary, #A78BFA)";
      case "In Progress": return "var(--blue-bright)";
      case "Overdue": return "var(--red-danger)";
      case "Completed": return "var(--green-active)";
      default: return "var(--text-50)";
    }
  }

  return (
    <>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px 16px" }}>
        <button
          onClick={onBack}
          style={{ width: "38px", height: "38px", borderRadius: "12px", border: "1px solid var(--muted-border)", background: "rgba(255,255,255,0.05)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="var(--text-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--text-white)", letterSpacing: "0.2em", textTransform: "uppercase" }}>TASKS</div>
        </div>
        <div style={{ width: "38px" }} />
      </div>

      {/* ── Scrollable Content ── */}
      <div style={{ paddingBottom: "100px", display: "flex", flexDirection: "column" }}>
        
        {/* Date Selector (mirrored from Schedule) */}
        <div style={{ display: "flex", overflowX: "auto", gap: "12px", padding: "0 16px 20px" }}>
          {dates.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDate(d.date)}
              style={{
                minWidth: "60px",
                padding: "12px 0",
                borderRadius: "16px",
                background: selectedDate === d.date ? "var(--blue-primary)" : "var(--glass-surface)",
                backdropFilter: selectedDate === d.date ? "none" : "blur(12px)",
                border: selectedDate === d.date ? "none" : "1px solid var(--muted-border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: selectedDate === d.date ? "0 8px 16px rgba(14,165,233,0.3)" : "none"
              }}
            >
              <span style={{ color: selectedDate === d.date ? "var(--text-white)" : "var(--text-50)", fontSize: "12px", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{d.day}</span>
              <span style={{ color: selectedDate === d.date ? "var(--text-white)" : "var(--text-white)", fontSize: "18px", fontWeight: 800, fontFamily: "'Rajdhani', sans-serif" }}>{d.date}</span>
            </div>
          ))}
        </div>

        {/* Tasks List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "0 16px" }}>
          {tasks.map(task => {
            const completedCount = task.subtasks.filter(st => st.checked).length;
            const totalCount = task.subtasks.length;
            const color = getStatusColor(task.status);
            
            return (
              <div 
                key={task.id} 
                onClick={() => setSelectedTask(task)}
                style={{ 
                  background: "var(--glass-surface)", 
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${task.status === "Overdue" ? "rgba(248,113,113,0.3)" : "var(--muted-border)"}`, 
                  borderRadius: "20px", 
                  padding: "20px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                }}
              >
                {/* Status Indicator Bar */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: color }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <div style={{ color: color, fontSize: "10px", fontWeight: 700, fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{task.status} • {task.type}</div>
                    <div style={{ color: "var(--text-white)", fontSize: "16px", fontWeight: 600, fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>{task.title}</div>
                  </div>
                  <div style={{ color: "var(--text-50)", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {task.time}
                  </div>
                </div>
                
                <div style={{ color: "var(--text-50)", fontSize: "13px", fontFamily: "'Inter', sans-serif", marginBottom: totalCount > 0 ? "16px" : "0" }}>
                  Site: {task.site}
                </div>

                {totalCount > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                       <div style={{ width: `${(completedCount / totalCount) * 100}%`, height: "100%", background: color, transition: "width 0.3s ease", boxShadow: `0 0 8px ${color}` }} />
                    </div>
                    <div style={{ color: "var(--text-35)", fontSize: "11px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                      {completedCount}/{totalCount}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>

      {/* ── Task Details Modal ── */}
      {selectedTask && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, background: "rgba(4,10,20,0.85)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--muted-border)", background: "var(--glass-surface)" }}>
            <button onClick={() => setSelectedTask(null)} style={{ background: "none", border: "none", color: "var(--blue-bright)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer" }}>Close</button>
            <div style={{ color: getStatusColor(selectedTask.status), fontSize: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", padding: "4px 10px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: `1px solid ${getStatusColor(selectedTask.status)}33` }}>
              {selectedTask.status}
            </div>
          </div>
          
          {/* Body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
            <h1 style={{ color: "var(--text-white)", fontSize: "24px", fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px" }}>{selectedTask.title}</h1>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", background: "var(--glass-surface)", borderRadius: "16px", border: "1px solid var(--muted-border)", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-50)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>Task Type</span>
                <span style={{ color: "var(--text-white)", fontSize: "13px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{selectedTask.type}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-50)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>Due Date</span>
                <span style={{ color: "var(--text-white)", fontSize: "13px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{selectedTask.due}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-50)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>Assigned By</span>
                <span style={{ color: "var(--text-white)", fontSize: "13px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{selectedTask.author}</span>
              </div>
            </div>

            {selectedTask.description && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ color: "var(--text-75)", fontSize: "14px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Description</h3>
                <div style={{ color: "var(--text-50)", fontSize: "14px", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{selectedTask.description}</div>
              </div>
            )}

            {selectedTask.subtasks.length > 0 && (
              <>
                <h3 style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-bright)" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  Checklist
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {selectedTask.subtasks.map((st: any) => (
                    <div 
                      key={st.id} 
                      onClick={() => handleSubtaskToggle(selectedTask.id, st.id)}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "16px", 
                        padding: "16px", 
                        background: st.checked ? "rgba(14,165,233,0.1)" : "var(--glass-surface)", 
                        border: `1px solid ${st.checked ? "rgba(14,165,233,0.3)" : "var(--muted-border)"}`, 
                        borderRadius: "16px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ width: "24px", height: "24px", borderRadius: "6px", border: `2px solid ${st.checked ? "var(--blue-bright)" : "var(--muted-border)"}`, background: st.checked ? "var(--blue-bright)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {st.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                      </div>
                      <div style={{ color: st.checked ? "var(--text-white)" : "var(--text-75)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: st.checked ? 600 : 500, textDecoration: st.checked ? "line-through" : "none", flex: 1 }}>
                        {st.text}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Action Footer */}
          <div style={{ padding: "16px 24px 32px", background: "var(--glass-surface)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--muted-border)" }}>
            {(() => {
              const allChecked = selectedTask.subtasks.every((st: any) => st.checked);
              
              if (selectedTask.status === "Completed") {
                return (
                  <button disabled style={{ width: "100%", padding: "16px", borderRadius: "14px", background: "rgba(16,185,129,0.15)", color: "var(--green-active)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, fontSize: "14px", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Task Completed
                  </button>
                )
              }
              
              if (!allChecked) {
                return (
                  <div style={{ width: "100%", padding: "16px", borderRadius: "14px", background: "var(--glass-surface)", color: "var(--text-50)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", border: "1px dashed var(--text-35)", textAlign: "center" }}>
                    Complete all subtasks first
                  </div>
                )
              }

              return (
                <button onClick={() => markTaskCompleted(selectedTask.id)} style={{ width: "100%", padding: "16px", borderRadius: "14px", background: "var(--blue-primary)", color: "var(--text-white)", fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>
                  Mark Task as Completed
                </button>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}
