import { useState } from "react"

interface Props {
  onBack: () => void
  onNavigateTour: () => void
}

interface Shift {
  id: string;
  date: string;
  time: string;
  role: string;
  location: string;
  status: "upcoming" | "in-progress" | "completed";
  notes?: string;
  tasks?: { id: string; text: string; checked: boolean }[];
}

interface Tour {
  id: string;
  name: string;
  time: string;
  status: "pending" | "active" | "completed";
}

export default function ScheduleScreen({ onBack, onNavigateTour }: Props) {
  const [selectedDate, setSelectedDate] = useState("2026-08-13")
  const [swapModalOpen, setSwapModalOpen] = useState(false)
  const [changeModalOpen, setChangeModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)

  const dates = [
    { id: "2026-08-11", day: "Tue", date: "11" },
    { id: "2026-08-12", day: "Wed", date: "12" },
    { id: "2026-08-13", day: "Thu", date: "13" },
    { id: "2026-08-14", day: "Fri", date: "14" },
    { id: "2026-08-15", day: "Sat", date: "15" },
    { id: "2026-08-16", day: "Sun", date: "16" },
  ]

  const shifts: Shift[] = [
    { 
      id: "S1", 
      date: "Aug 13, 2026",
      time: "08:00 AM - 04:00 PM", 
      role: "Security Officer", 
      location: "Westfield Plaza - Main Entrance", 
      status: "upcoming",
      notes: "Please arrive 15 minutes early to pick up the master keys from the overnight supervisor. Ensure you log all incoming delivery trucks.",
      tasks: [
        { id: "st-1", text: "Pick up master keys", checked: false },
        { id: "st-2", text: "Radio check with dispatch", checked: false },
        { id: "st-3", text: "Verify visitor log is fresh", checked: false }
      ]
    },
  ]

  const tours: Tour[] = [
    { id: "T1", name: "Tower B (Floor 4-22)", time: "10:00 AM", status: "pending" },
    { id: "T2", name: "Perimeter Check", time: "02:00 PM", status: "pending" },
  ]

  const handleOpenSwap = (shift: Shift) => {
    setSelectedShift(shift)
    setSwapModalOpen(true)
  }

  const handleOpenChange = (shift: Shift) => {
    setSelectedShift(shift)
    setChangeModalOpen(true)
  }

  return (
    <>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px 16px" }}>
        <button
          onClick={onBack}
          style={{
            width: "38px", height: "38px", borderRadius: "12px", flexShrink: 0,
            border: "1px solid var(--muted-border)", background: "rgba(255,255,255,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke="var(--text-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--text-white)", letterSpacing: "0.2em", textTransform: "uppercase" }}>SCHEDULE</div>
        </div>
        <div style={{ width: "38px" }} />
      </div>

      {/* ── Scrollable Content ── */}
      <div style={{ paddingBottom: "104px" }}>

        {/* ── Date Selector ── */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "0 16px 20px", scrollbarWidth: "none" }}>
          {dates.map((d) => {
            const isActive = d.id === selectedDate
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDate(d.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  minWidth: "60px", height: "76px", borderRadius: "16px",
                  background: isActive ? "var(--blue-primary)" : "var(--glass-surface)",
                  backdropFilter: isActive ? "none" : "blur(12px)",
                  border: isActive ? "none" : "1px solid var(--muted-border)",
                  cursor: "pointer", flexShrink: 0,
                  boxShadow: isActive ? "0 10px 20px rgba(14,165,233,0.3)" : "none"
                }}
              >
                <span style={{ color: isActive ? "var(--text-white)" : "var(--text-50)", fontSize: "12px", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: "4px" }}>{d.day}</span>
                <span style={{ color: isActive ? "var(--text-white)" : "var(--text-white)", fontSize: "18px", fontWeight: 800, fontFamily: "'Rajdhani', sans-serif" }}>{d.date}</span>
              </button>
            )
          })}
        </div>

        {/* ── Today's Tours ── */}
        <div style={{ padding: "0 16px", marginBottom: "24px" }}>
          <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "12px", marginLeft: "4px" }}>TODAY'S TOURS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {tours.map(tour => (
              <div
                key={tour.id}
                onClick={onNavigateTour}
                style={{
                  background: "var(--glass-surface)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(14,165,233,0.2)",
                  borderRadius: "16px", padding: "16px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"
                }}
              >
                <div>
                  <div style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{tour.name}</div>
                  <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Inter', sans-serif", marginTop: "4px" }}>Scheduled: {tour.time}</div>
                </div>
                <div style={{ background: "rgba(14,165,233,0.1)", color: "var(--blue-bright)", padding: "6px 12px", borderRadius: "10px", fontSize: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>View</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scheduled Shifts ── */}
        <div style={{ padding: "0 16px", paddingBottom: "40px" }}>
          <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "12px", marginLeft: "4px" }}>SCHEDULED SHIFTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {shifts.map(shift => (
              <div
                key={shift.id}
                onClick={() => {
                  setSelectedShift(shift)
                  setDetailModalOpen(true)
                }}
                style={{
                  background: "var(--glass-surface)", 
                  backdropFilter: "blur(20px)",
                  border: "1px solid var(--muted-border)",
                  borderRadius: "20px", padding: "20px",
                  display: "flex", flexDirection: "column", gap: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--blue-bright)" }} />
                      <span style={{ color: "var(--blue-bright)", fontSize: "12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>UPCOMING SHIFT</span>
                    </div>
                    <div style={{ color: "var(--text-50)", fontSize: "12px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{shift.date}</div>
                  </div>
                  <div style={{ color: "var(--text-white)", fontSize: "20px", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: "6px" }}>{shift.time}</div>
                  <div style={{ color: "var(--text-75)", fontSize: "14px", fontFamily: "'Inter', sans-serif" }}>{shift.location}</div>
                  <div style={{ color: "var(--text-50)", fontSize: "13px", fontFamily: "'Inter', sans-serif", marginTop: "4px" }}>{shift.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {swapModalOpen && selectedShift && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, background: "rgba(4,10,20,0.85)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ background: "var(--glass-surface)", padding: "24px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", borderTop: "1px solid rgba(14,165,233,0.15)", boxShadow: "0 -8px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ color: "var(--text-white)", fontSize: "20px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Open Swap Request</div>
            <div style={{ color: "var(--text-50)", fontSize: "14px", fontFamily: "'Inter', sans-serif", marginBottom: "24px", lineHeight: 1.5 }}>This creates an open request for any available guard to pick up your shift on {selectedShift.time}.</div>

            <textarea placeholder="Reason for swap (optional)..." style={{ width: "100%", height: "80px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--muted-border)", borderRadius: "14px", padding: "16px", color: "var(--text-white)", marginBottom: "24px", resize: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />

            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setSwapModalOpen(false)} style={{ flex: 1, padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", color: "var(--text-white)", border: "1px solid var(--muted-border)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { setSwapModalOpen(false); alert("Swap Request Submitted!") }} style={{ flex: 2, padding: "16px", borderRadius: "14px", background: "var(--blue-primary)", color: "var(--text-white)", border: "none", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>Submit Request</button>
            </div>
          </div>
        </div>
      )}

      {changeModalOpen && selectedShift && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, background: "rgba(4,10,20,0.85)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ background: "var(--glass-surface)", padding: "24px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", borderTop: "1px solid rgba(14,165,233,0.15)", boxShadow: "0 -8px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ color: "var(--text-white)", fontSize: "20px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Shift Change Request</div>
            <div style={{ color: "var(--text-50)", fontSize: "14px", fontFamily: "'Inter', sans-serif", marginBottom: "24px", lineHeight: 1.5 }}>Request to adjust your hours or report an absence for {selectedShift.time}.</div>

            <select style={{ width: "100%", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--muted-border)", borderRadius: "14px", color: "var(--text-white)", fontFamily: "'Inter', sans-serif", fontSize: "14px", marginBottom: "16px", outline: "none" }}>
              <option value="late">Running Late</option>
              <option value="leave_early">Need to Leave Early</option>
              <option value="sick">Sick / Absence</option>
            </select>

            <textarea placeholder="Additional details..." style={{ width: "100%", height: "80px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--muted-border)", borderRadius: "14px", padding: "16px", color: "var(--text-white)", marginBottom: "24px", resize: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none" }} />

            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setChangeModalOpen(false)} style={{ flex: 1, padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", color: "var(--text-white)", border: "1px solid var(--muted-border)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { setChangeModalOpen(false); alert("Change Request Submitted!") }} style={{ flex: 2, padding: "16px", borderRadius: "14px", background: "var(--red-danger)", color: "var(--text-white)", border: "none", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 8px 24px rgba(244,63,94,0.3)" }}>Submit Request</button>
            </div>
          </div>
        </div>
      )}

      {detailModalOpen && selectedShift && (
        <ShiftDetailModal
          shift={selectedShift}
          onClose={() => setDetailModalOpen(false)}
          onSwap={() => setSwapModalOpen(true)}
          onChange={() => setChangeModalOpen(true)}
        />
      )}
    </>
  )
}

function ShiftDetailModal({ shift, onClose, onSwap, onChange }: { shift: Shift, onClose: () => void, onSwap: () => void, onChange: () => void }) {
  const [tasks, setTasks] = useState(shift.tasks || [])

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, checked: !t.checked } : t))
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--navy-700)", zIndex: 50, display: "flex", flexDirection: "column" }}>
      {/* ── Layered Background ── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 60% at 50% 15%, #0D1E3A 0%, #07101E 45%, #020408 100%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.8 }} />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", zIndex: 1 }}>
        {/* ── Modal Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid var(--muted-border)", background: "var(--glass-surface)", backdropFilter: "blur(20px)" }}>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "var(--blue-bright)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.1)", color: "var(--blue-bright)", padding: "4px 10px", borderRadius: "10px", fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(14,165,233,0.2)" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue-bright)" }} />
            PUBLISHED
          </div>
        </div>

        {/* ── Scrollable Content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Title / Time */}
          <div>
            <h1 style={{ color: "var(--text-white)", fontSize: "28px", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: "8px" }}>{shift.time}</h1>
            <div style={{ color: "var(--text-50)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{shift.date}</div>
          </div>

          {/* Details Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", background: "var(--glass-surface)", backdropFilter: "blur(12px)", borderRadius: "20px", border: "1px solid var(--muted-border)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ color: "var(--blue-bright)", marginTop: "2px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <div style={{ color: "var(--text-50)", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.15em", marginBottom: "2px", textTransform: "uppercase" }}>Job / Role</div>
                <div style={{ color: "var(--text-white)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{shift.role}</div>
              </div>
            </div>
            
            <div style={{ width: "100%", height: "1px", background: "var(--muted-border)" }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ color: "var(--blue-bright)", marginTop: "2px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div style={{ color: "var(--text-50)", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.15em", marginBottom: "2px", textTransform: "uppercase" }}>Site Location</div>
                <div style={{ color: "var(--text-white)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{shift.location}</div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {shift.notes && (
            <div>
              <div style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Shift Notes</div>
              <div style={{ color: "var(--text-50)", fontSize: "14px", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, background: "var(--glass-surface)", backdropFilter: "blur(12px)", padding: "16px", borderRadius: "16px", border: "1px solid var(--muted-border)" }}>
                {shift.notes}
              </div>
            </div>
          )}

          {/* Tasks */}
          {tasks.length > 0 && (
            <div>
              <div style={{ color: "var(--text-white)", fontSize: "16px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Required Tasks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {tasks.map(task => (
                  <label key={task.id} style={{ display: "flex", alignItems: "center", gap: "12px", background: task.checked ? "rgba(14,165,233,0.1)" : "var(--glass-surface)", backdropFilter: "blur(12px)", border: `1px solid ${task.checked ? "rgba(14,165,233,0.3)" : "var(--muted-border)"}`, padding: "16px", borderRadius: "16px", cursor: "pointer", transition: "all 0.2s ease" }}>
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => toggleTask(task.id)}
                      style={{ display: "none" }}
                    />
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "6px",
                      border: task.checked ? "none" : "2px solid var(--muted-border)",
                      background: task.checked ? "var(--green-active)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {task.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span style={{ color: task.checked ? "var(--text-50)" : "var(--text-white)", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, textDecoration: task.checked ? "line-through" : "none" }}>{task.text}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Sticky Action Bar ── */}
        <div style={{ padding: "16px 20px 32px", background: "var(--glass-surface)", backdropFilter: "blur(30px)", borderTop: "1px solid var(--muted-border)", display: "flex", gap: "12px" }}>
          <button onClick={onChange} style={{ flex: 1, padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", color: "var(--text-white)", border: "1px solid var(--muted-border)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Change Request</button>
          <button onClick={onSwap} style={{ flex: 1, padding: "16px", borderRadius: "14px", background: "var(--blue-primary)", color: "var(--text-white)", border: "none", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>Swap Shift</button>
        </div>

      </div>
    </div>
  )
}
