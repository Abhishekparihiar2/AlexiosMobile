export interface KBDocument {
  id: string
  title: string
  category: "sop" | "post" | "emergency"
  updatedAt: string
  readStatus: "read" | "unread"
  urgent: boolean
  content: string
  site?: string
}

export interface Message {
  role: "user" | "athena"
  text: string
  citations?: KBDocument[]
}

export const documents: KBDocument[] = [
  {
    id: "1",
    title: "Active Threat Response Protocol",
    category: "emergency",
    updatedAt: "Jul 9",
    readStatus: "unread",
    urgent: true,
    content: `ACTIVE THREAT RESPONSE PROTOCOL\nVersion 2.1 — Effective Jul 9, 2026\n\n1. IMMEDIATE ACTIONS\nUpon confirmation of an active threat, officers shall:\n- Activate personal panic alarm immediately\n- Notify dispatch via radio channel 1 with location and threat description\n- Initiate lockdown of nearest zone per site map\n- Direct civilians to nearest shelter-in-place zone\n\n2. COMMUNICATION\n- Primary: Radio channel 1 (site ops)\n- Secondary: ATHENA push alert\n- Tertiary: Mobile phone to supervisor\n\n3. EVACUATION ROUTES\nRefer to Site Map > Emergency Exits for current route assignments.\n\n4. POST-INCIDENT\n- Secure perimeter until law enforcement arrives\n- Complete incident report within 2 hours\n- Do not disturb evidence`,
  },
  {
    id: "2",
    title: "Site Entry Procedures",
    category: "post",
    updatedAt: "Jul 9",
    readStatus: "read",
    urgent: false,
    site: "Ritz-Carlton Tower B",
    content: `SITE ENTRY PROCEDURES — RITZ-CARLTON TOWER B\nVersion 3.4 — Effective Jul 9, 2026\n\n1. MAIN LOBBY ACCESS\n- All visitors must sign in at the front desk\n- Valid government-issued photo ID required\n- Issue visitor badge from the front desk terminal\n- Escort required for all non-badged personnel\n\n2. LOADING DOCK ACCESS\nGate code: 4821\n- Delivery vehicles must present a valid delivery manifest\n- Verify driver ID against manifest\n- Log all deliveries in the loading dock register\n- No unattended vehicles allowed in dock area\n\n3. RESIDENTIAL FLOORS (4–22)\n- Residents access via key fob only\n- Guest access must be authorized by resident via intercom\n- After 22:00, all guests require officer escort to unit\n\n4. PARKING STRUCTURE\n- Validate parking tickets at lobby terminal\n- Unauthorized vehicles towed after 30-minute warning`,
  },
  {
    id: "3",
    title: "Visitor Management SOP",
    category: "sop",
    updatedAt: "Jul 7",
    readStatus: "unread",
    urgent: false,
    content: `VISITOR MANAGEMENT STANDARD OPERATING PROCEDURE\nVersion 1.8 — Effective Jul 7, 2026\n\n1. PURPOSE\nThis SOP establishes uniform procedures for managing visitors across all RFI Security managed properties.\n\n2. REGISTRATION\n- All visitors must be registered in the ATHENA visitor log\n- Capture: full name, photo ID number, host name, purpose, time in/out\n- Issue color-coded visitor badge based on access level\n\n3. ACCESS LEVELS\n- Green badge: lobby and designated meeting areas only\n- Blue badge: escorted access to specified floors\n- Red badge: restricted — supervisor approval required\n\n4. ESCORT POLICY\n- Blue and red badge visitors require officer escort at all times\n- Officers must remain with visitor for duration of visit\n- Log escort duration in ATHENA\n\n5. DEPARTURE\n- Collect visitor badge upon exit\n- Log departure time in ATHENA\n- Report any badge not returned within 30 minutes`,
  },
  {
    id: "4",
    title: "Emergency Evacuation Plan",
    category: "emergency",
    updatedAt: "Jul 5",
    readStatus: "read",
    urgent: false,
    content: `EMERGENCY EVACUATION PLAN\nVersion 4.0 — Effective Jul 5, 2026\n\n1. EVACUATION ZONES\n- Zone A: Floors 1–7 → Exit via Stairwell C to North Assembly Point\n- Zone B: Floors 8–15 → Exit via Stairwell A to South Assembly Point\n- Zone C: Floors 16–22 → Exit via Stairwell B to East Assembly Point\n\n2. OFFICER DUTIES\n- Floor wardens assigned per floor (see assignment sheet)\n- Sweep assigned floor top-to-bottom before exiting\n- Assist mobility-impaired persons to Areas of Rescue Assistance\n- Report headcount to Incident Commander at assembly point\n\n3. DO NOT USE ELEVATORS\n\n4. ASSEMBLY POINTS\n- North: Corner of 5th Ave and Main St\n- South: Parking lot B entrance\n- East: Fountain plaza\n\n5. ALL-CLEAR\n- Return only when Incident Commander gives all-clear via radio`,
  },
  {
    id: "5",
    title: "Patrol Logging Requirements",
    category: "sop",
    updatedAt: "Jul 3",
    readStatus: "read",
    urgent: false,
    content: `PATROL LOGGING REQUIREMENTS\nVersion 2.2 — Effective Jul 3, 2026\n\n1. CHECKPOINT SCANNING\n- All checkpoints must be scanned via ATHENA BLE beacon\n- Missed scans must be documented with reason within 15 minutes\n- Minimum patrol frequency: every 60 minutes for active tour\n\n2. INCIDENT DOCUMENTATION\n- Log all incidents in ATHENA immediately upon resolution\n- Required fields: location, time, persons involved, action taken\n- Photos required for all property damage incidents\n\n3. TOUR COMPLETION\n- Tour is complete when all checkpoints scanned\n- Submit tour report via ATHENA before shift end\n- Supervisor review within 24 hours`,
  },
  {
    id: "6",
    title: "Radio Communication Standards",
    category: "sop",
    updatedAt: "Jun 28",
    readStatus: "read",
    urgent: false,
    content: `RADIO COMMUNICATION STANDARDS\nVersion 1.5 — Effective Jun 28, 2026\n\n1. CHANNEL ASSIGNMENTS\n- Channel 1: Site operations (primary)\n- Channel 2: Supervisor-to-officer only\n- Channel 3: Emergency (monitored by dispatch)\n\n2. PROTOCOL\n- Identify yourself and location before each transmission\n- Keep transmissions brief and professional\n- Use phonetic alphabet for names and codes\n- Acknowledge all transmissions with "Copy" or "Roger"\n\n3. PROHIBITED\n- Personal conversations on duty channels\n- Profanity or unprofessional language\n- Leaving radio unmonitored during shift`,
  },
]

export const mockAthenaResponses: Record<string, {
  text: string
  citationIds: string[]
}> = {
  default: {
    text: "I found relevant information in your site documents. Please review the cited sources below for full details.",
    citationIds: ["2"],
  },
  gate: {
    text: "The loading dock gate code for Ritz-Carlton Tower B is 4821. Per the Site Entry Procedures, you must verify the driver's ID against the delivery manifest and log all deliveries in the loading dock register before granting access. No unattended vehicles are permitted in the dock area.",
    citationIds: ["2"],
  },
  emergency: {
    text: "In an active threat situation: immediately activate your personal panic alarm, notify dispatch on radio channel 1 with your location and threat description, then initiate lockdown of your nearest zone. Direct civilians to shelter-in-place zones. Do not leave your post until law enforcement arrives.",
    citationIds: ["1", "4"],
  },
  visitor: {
    text: "All visitors must be registered in the ATHENA visitor log with their full name, photo ID number, host name, and purpose. Issue a color-coded badge based on access level — green for lobby only, blue for escorted floor access, red for restricted areas requiring supervisor approval.",
    citationIds: ["3"],
  },
}
