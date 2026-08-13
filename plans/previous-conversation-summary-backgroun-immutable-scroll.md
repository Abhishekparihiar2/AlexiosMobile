# Guard App — SOS Full-Screen Overlay

## Context

The guard app's `Header.tsx` has an SOS button (40px red circle, top-right) that is currently inert — no `onClick`, no state. The user wants pressing it to trigger a full-screen overlay covering the entire phone frame with 3 red action buttons and a close button, styled to match the supervisor app's incident response overlay.

---

## Files to Change

### 1. `src/App.tsx`
- Add `const [sosOpen, setSosOpen] = useState(false)` alongside the existing `screen` state
- Pass `onSOS={() => setSosOpen(true)}` prop to `<Header />`
- Render the SOS overlay inside the phone frame `div` (the 393×852px container), **above everything** (`zIndex: 100`), conditionally on `sosOpen`

### 2. `src/components/Header.tsx`
- Accept `onSOS?: () => void` prop
- Wire it to the existing SOS button's `onClick`

---

## SOS Overlay Design

Placed inside the 393×852 phone div as:
```jsx
{sosOpen && (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 100,
    background: 'rgba(6,2,2,0.96)',
    display: 'flex', flexDirection: 'column',
    padding: '0 20px',
    gap: '16px',
  }}>
```

### Header area (top, ~140px)
- Status bar area spacer (58px) so it clears the Dynamic Island
- Pulsing red dot + **"SOS ACTIVATED"** in DM Mono 10px 700, `#FF3030`, `letterSpacing: 0.12em`
- Large red glow circle behind the word "SOS" — or just a clean label row matching the supervisor style

### Three action buttons (stacked, full-width)
Each button:
- `padding: '20px 20px'`, `borderRadius: '14px'`
- `background: 'rgba(255,40,40,0.07)'`
- `border: '1px solid rgba(255,40,40,0.32)'`
- `color: '#FF3030'`
- Left: icon (SVG) + label + sub-description right-aligned or stacked
- Space Grotesk 14px 600 weight for label, 11px muted for sub-text
- On press: highlights briefly (can be purely UI, no action required beyond styling)

Button copy:
1. **Responding to Incident** — sub: "Signal active response"
2. **Need Immediate Backup** — sub: "Request officer support"
3. **Need Law Enforcement** — sub: "Dispatch police / EMS"

### Close button (bottom)
- `padding: '16px'`, `borderRadius: '14px'`
- `background: 'rgba(85,153,255,0.08)'`
- `border: '1px solid rgba(85,153,255,0.3)'`
- `color: '#5599FF'`
- Label: "Cancel — Close SOS"
- `onClick: () => setSosOpen(false)`

### Animation
Add a quick slide-in from top using a CSS `@keyframes sos-drop` in `src/index.css`:
```css
@keyframes sos-drop {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Apply to the overlay: `animation: 'sos-drop 0.22s ease-out'`

---

## Verification

1. SOS button in guard app header is clickable — overlay appears with animation
2. Overlay covers the full phone frame (all screens, status bar area, nav bar)
3. All 3 red buttons are visible and styled correctly
4. Close button dismisses the overlay (returns to whatever was beneath)
5. Overlay appearance matches supervisor incident overlay aesthetic (dark red-tinted bg, pulsing dot, red bordered cards)
