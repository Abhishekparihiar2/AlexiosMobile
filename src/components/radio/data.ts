export type ChannelId = "dispatch" | "supervisor" | "tactical" | "sos"

export interface Channel {
  id: ChannelId
  label: string
  shortLabel: string
  color: string
  emergency?: boolean
}

export interface DispatchEntry {
  id: string
  timestamp: string
  channelId: ChannelId
  sender: string
  text: string
  type: "dispatch" | "unit" | "alert" | "system"
}

export const channels: Channel[] = [
  {
    id: "dispatch",
    label: "Dispatch Main",
    shortLabel: "DISPATCH",
    color: "#4DD9E8",
  },
  {
    id: "supervisor",
    label: "Supervisor Direct",
    shortLabel: "SUP. DIR.",
    color: "#4A8FFF",
  },
  {
    id: "tactical",
    label: "Tactical / Event",
    shortLabel: "TACTICAL",
    color: "#B8A4FF",
  },
  {
    id: "sos",
    label: "Emergency / SOS",
    shortLabel: "SOS",
    color: "#FF4444",
    emergency: true,
  },
]

export const mockFeed: DispatchEntry[] = [
  {
    id: "1",
    timestamp: "09:41",
    channelId: "dispatch",
    sender: "Dispatch Center",
    text: "Unit 4, report to Gate B for vehicle check. Unidentified vehicle, license unknown.",
    type: "dispatch",
  },
  {
    id: "2",
    timestamp: "09:38",
    channelId: "supervisor",
    sender: "SGT. Williams",
    text: "Supervisor en route to north perimeter. ETA 4 minutes. Stand by.",
    type: "unit",
  },
  {
    id: "3",
    timestamp: "09:35",
    channelId: "dispatch",
    sender: "Dispatch Center",
    text: "All units: loading dock access code updated. Check post orders for new code.",
    type: "alert",
  },
  {
    id: "4",
    timestamp: "09:29",
    channelId: "tactical",
    sender: "OFC. Davis",
    text: "Tactical sweep of Level 3 complete. No anomalies. Returning to post.",
    type: "unit",
  },
  {
    id: "5",
    timestamp: "09:22",
    channelId: "dispatch",
    sender: "Dispatch Center",
    text: "Shift change briefing begins at 10:00. All supervisors report to command post.",
    type: "system",
  },
  {
    id: "6",
    timestamp: "09:14",
    channelId: "supervisor",
    sender: "SGT. Williams",
    text: "Visitor escort required at main lobby. Guest badge processing in progress.",
    type: "dispatch",
  },
  {
    id: "7",
    timestamp: "09:07",
    channelId: "dispatch",
    sender: "Dispatch Center",
    text: "Weather advisory: high winds expected 14:00–18:00. Secure exterior equipment.",
    type: "system",
  },
  {
    id: "8",
    timestamp: "08:58",
    channelId: "tactical",
    sender: "SGT. Miller",
    text: "Morning patrol complete. All checkpoints verified and logged. Status: Clear.",
    type: "unit",
  },
]
