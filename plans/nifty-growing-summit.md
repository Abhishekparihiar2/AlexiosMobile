# Tactical Task Log Screen — Architecture Plan

## Context

A `TasksScreen` (393×852px) mounts when an officer taps the "Tasks" tile in the 2×2 dashboard grid (`FeatureRows.tsx`). Currently the Tasks tile has no `onClick` handler — this plan adds navigation. The screen provides a real-time duty assignment feed with severity-coded task cards (red/amber/cyan left-border panels) and a filter pill bar above the feed. Visual language is identical to all existing screens: same deep canvas gradient, `22px` grid overlay, bezel/status-bar/Dynamic Island, glass tile patterns, DM Mono + Inter typography, inline styles only, no new CSS classes.

---

## Files Modified

| File | Change |
|------|--------|
| `src/App.tsx` | Add `'tasks'` to state union; add render block; pass `onNavigateTasks` to `FeatureRows` |
| `src/components/FeatureRows.tsx` | Add `onNavigateTasks?: () => void` to Props; wire Tasks tile `onClick` |

## New Files

| File | Role |
|------|------|
| `src/components/TasksScreen.tsx` | Full 393×852px shell with filter bar, task feed, and NavBar — all inline |

No sub-component files — scope is contained enough to live in one file, matching the pattern of `SiteStatusScreen.tsx` and `ProfileScreen.tsx`.

---

## Screen Layout (393×852px)

```
┌─────────────────────────────┐
│  ●●● Dynamic Island ●●●     │
│  9:41            ▲▲▲ 🔋     │  Status bar
│─────────────────────────────│
│  [←]   TACTICAL TASK LOG   │  Header: back btn + title + spacer
│    REAL-TIME DUTY ASSIGNMENTS│  DM Mono subtitle
│─────────────────────────────│
│ [All Tasks][AI Gen][Routine][Supervisor][Client] │  Filter pill row
│─────────────────────────────│
│ ┃RED  CRITICAL IMMEDIATE NEED         │  Task card — red left border
│ ┃     Secure East Perimeter Gate 2... │
│ ┃     ⏰ OVERDUE (14m)  Origin: Athena│
│─────────────────────────────│
│ ┃AMBER IMMINENT COMPLIANCE DEADLINE   │  Task card — amber left border
│ ┃     Verify backup generator fuel... │
│ ┃     ⏰ Due within 30m  Supervisor  │
│─────────────────────────────│
│ ┃CYAN  ROUTINE COMPLIANCE TASK        │  Task card — cyan left border
│ ┃     Visual inspection main lobby... │
│ ┃     ⏰ Due by 23:00  Daily Recurring│
│─────────────────────────────│
│ [Home][Reports][Ops][Search][Profile] │  NavBar — Ops tab active
└─────────────────────────────┘
```

---

## Aesthetic Conventions (matching all existing screens exactly)

- **Shell**: `393×852px`, `borderRadius: '54px'`, `outline: '9px solid rgba(30,40,60,0.95)'`
- **boxShadow** (single-line): `'0 0 0 1px rgba(180,200,255,0.08), 0 0 0 10px rgba(180,200,255,0.06), 0 50px 100px rgba(0,0,0,0.9), 0 0 80px rgba(0,100,255,0.07)'`
- **Background**: 3-radial + `linear-gradient(175deg, #0D1525 0%, #0B111E 40%, #090E1A 100%)`
- **Grid overlay**: `rgba(180,200,255,0.022)` at `22px 22px`
- **Scrollable area**: `position: absolute, top: 58px, bottom: 104px`
- **Header pattern**: 38×38px glass back button (`borderRadius: '12px'`) + centered Inter 800 15px + DM Mono 9px muted subtitle + 38px spacer right
- **NavBar capsule**: `background: 'rgba(14,22,40,0.82)'`, `backdropFilter: 'blur(20px) saturate(140%)'`, `borderRadius: '22px'`, `margin: '0 12px'`, boxShadow single-line
- **No lucide-react** — all icons inline SVGs
- **All inline styles** — no new CSS classes

---

## Component Details

### Filter Pill Bar

`display: 'flex', gap: '8px', padding: '0 16px', overflowX: 'auto'` — horizontally scrollable.

Each pill: `height: '32px'`, `borderRadius: '99px'`, `padding: '0 12px'`, `flexShrink: 0`, flex row with optional icon + label.

Active pill (`All Tasks`): `background: 'rgba(77,217,232,0.1)'`, `border: '1px solid rgba(77,217,232,0.35)'`, `boxShadow: '0 0 10px rgba(77,217,232,0.15)'`, label color `#4DD9E8`.
Inactive pills: `background: 'rgba(255,255,255,0.04)'`, `border: '1px solid rgba(180,200,255,0.1)'`, label `rgba(130,155,200,0.55)` DM Mono 9px.

| Pill | Label |
|------|-------|
| 0 (active) | All Tasks |
| 1 | AI Generated |
| 2 | Daily Routine |
| 3 | Supervisor |
| 4 | Client Requests |

State: `const [activeFilter, setActiveFilter] = useState(0)` — controls active pill highlight; all three task cards always show (no actual data filtering needed).

### Task Cards

Three cards, `display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 16px'`.

Each card shares the same base container:
```
background: 'rgba(255,255,255,0.04)'
backdropFilter: 'blur(12px)'
WebkitBackdropFilter: 'blur(12px)'
borderRadius: '14px'
padding: '14px 14px 14px 0'
display: 'flex'
overflow: 'hidden'
position: 'relative'
```

**Left border accent strip**: `position: absolute, left: 0, top: 0, bottom: 0, width: '3px'`, with color per severity + matching `boxShadow` glow.

**Inner content** (padded left `17px` to clear the strip):

- **Severity label row**: DM Mono 9px, bold, `letterSpacing: '1.8px'`, colored per severity + a small pulsing dot for High.
- **Title**: Inter 700 13px `rgba(220,235,255,0.92)`, `letterSpacing: '-0.1px'`, `lineHeight: 1.35`
- **Body text**: DM Mono 10px `rgba(130,155,200,0.62)`, `lineHeight: 1.55`
- **Footer row**: `display: 'flex', justifyContent: 'space-between'`
  - Left: clock icon SVG + timestamp text DM Mono 9px colored per severity
  - Right: `Origin:` prefix DM Mono 9px muted + source text

| Card | Strip color | boxShadow | Severity label | Severity dot |
|------|-------------|-----------|----------------|--------------|
| High | `#FF4444` | `0 0 8px rgba(255,68,68,0.5)` (strip shadow) | `CRITICAL IMMEDIATE NEED` red | pulsing `pulse-dot` red dot |
| Medium | `#FFA500` | `0 0 8px rgba(255,165,0,0.45)` | `IMMINENT COMPLIANCE DEADLINE` amber | none |
| Routine | `#4DD9E8` | `0 0 8px rgba(77,217,232,0.4)` | `ROUTINE COMPLIANCE TASK` cyan | none |

Card-level background tints:
- High: `background: 'rgba(255,68,68,0.03)'`, `border: '1px solid rgba(255,68,68,0.15)'`
- Medium: `background: 'rgba(255,165,0,0.03)'`, `border: '1px solid rgba(255,165,0,0.12)'`
- Routine: `background: 'rgba(255,255,255,0.04)'`, `border: '1px solid rgba(77,217,232,0.1)'`

#### Card 1 — High Severity (Red)
- Body: *"Secure and lock East Perimeter Gate 2 immediately. Unscheduled entry attempt logged."*
- Footer left: `⏰ OVERDUE (14m)` in `#FF4444`
- Footer right: `Origin: Athena AI Engine`

#### Card 2 — Medium Severity (Amber)
- Body: *"Verify and log backup generator fuel gauges and ambient room temperature values."*
- Footer left: `⏰ Due within 30m` in `#FFA500`
- Footer right: `Origin: Supervisor Order`

#### Card 3 — Routine (Cyan)
- Body: *"Conduct visual inspection of main lobby fire extinguishers and exit egress paths."*
- Footer left: `⏰ Due by 23:00` in `rgba(77,217,232,0.8)`
- Footer right: `Origin: Daily Recurring`

### NavBar

Uses exact same NAV_ITEMS pattern as `ReportsScreen.tsx` — copy the array verbatim, set `Ops` as `active: true`. `Home` and `Ops` both trigger `onBack`.

---

## Wiring

### `FeatureRows.tsx`
- Add `onNavigateTasks?: () => void` to Props interface
- Destructure it in the function signature
- Update `onClick` on the 2×2 grid map: `title === 'Tasks' ? onNavigateTasks : ...`

### `App.tsx`
- State union: add `| 'tasks'`
- Render: `{screen === 'tasks' && <TasksScreen onBack={() => setScreen('dashboard')} />}`
- Import: `import TasksScreen from './components/TasksScreen'`
- FeatureRows: add `onNavigateTasks={() => setScreen('tasks')}`

---

## Build Order

1. `src/components/TasksScreen.tsx`
2. `src/App.tsx` — state union + render + import + FeatureRows prop
3. `src/components/FeatureRows.tsx` — prop + onClick wiring

---

## Verification

- Dashboard → tap "Tasks" tile in 2×2 grid → `TasksScreen` opens
- Back button → returns to dashboard
- Filter pills: tapping any pill highlights it cyan, all three cards remain visible
- High card has red left-strip glow + `pulse-dot` animation on severity dot
- Medium card has amber left-strip glow
- Routine card has cyan left-strip glow
- NavBar shows Ops tab active (cyan dot + cyan icon/label)
- Ops and Home tabs both fire `onBack`
- No multi-line `boxShadow` template literals anywhere
