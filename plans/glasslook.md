ALEXIOS Guard App — Style Guidelines
Color Palette
Token	Hex	Usage
Navy 950	#020408	Page background, deepest blacks
Navy 900	#030609	App shell background
Navy 800	#070E1C	Screen background base
Navy 700	#0A0E1A	Phone frame, root background
Navy 600	#0D1E3A	Radial gradient top (screens)
Navy 500	#07101E	Card inner backgrounds
Glass Surface	rgba(10,16,28,0.75–0.85)	All glass cards
Glass Border	rgba(14,165,233,0.14–0.28)	Blue glass card borders
Muted Border	rgba(255,255,255,0.06–0.08)	Subtle action card borders
Blue Primary	#0EA5E9	Active states, progress fills, glows
Blue Bright	#38BDF8	Text accents, labels, tagline
Green Active	#10B981	Clock-in status, success states
Amber Alert	#FB923C	Dispatch alerts, warnings
Red Danger	#DC2626	SOS button, panic states
Red Deep	#7F1D1D	SOS gradient bottom
White Primary	#ffffff	Headings, primary text
White 75%	rgba(255,255,255,0.75)	Secondary text, card body
White 50%	rgba(255,255,255,0.5)	Captions, meta labels
White 25%	rgba(255,255,255,0.25)	Inactive nav icons
White 35%	rgba(255,255,255,0.35)	Subdued card sub-labels
Typography
Role	Family	Weight	Size	Tracking
Wordmark / Screen titles	Rajdhani	700	48px	0.4em
Section headers	Rajdhani	700	18–22px	0.1–0.15em
Button labels	Rajdhani	700	13–14px	0.1–0.15em
Status labels / badges	Rajdhani	600	11–13px	0.12–0.2em
Body text	Inter	400	11–13px	0.04em
Captions / meta	Inter	400	9–11px	0.12–0.18em
Live data (elapsed timer)	Rajdhani	600	13px	0em
Version / system labels	Inter	400	10px	0.15em

All text rendered uppercase for Rajdhani labels. All caps spaced with letter-spacing. Google Fonts loaded via CSS @import at top of index.css.
Glassmorphism System

background:    rgba(10–13, 16–20, 28–40, 0.7–0.9)
backdrop-filter: blur(12–20px)
border:        1px solid rgba(14,165,233, 0.14–0.35)
border-radius: 14–24px
box-shadow:    0 4–8px 24–40px rgba(0,0,0,0.4),
               inset 0 1px 0 rgba(255,255,255,0.04)

Card Type	Blur	Border Alpha	Radius
Active Tour (hero)	16px	0.28	18px
Login form card	20px	0.14	24px
Clock-in banner	12px	green 0.3	10px
Dispatch alert	10px	amber 0.2	10px
Quick action tiles	12px	white 0.06	14px
CoPilot pill	12px	blue 0.35	26px
Bottom nav	20px	blue 0.10	0
Bottom sheet	—	blue 0.15	20px top
Backgrounds & Depth

All screens use a 3-layer depth system:

    Layer 0 — Base: #020408 solid on html/body
    Layer 1 — Screen gradient: Radial ellipse, dark navy core fading to near-black

    radial-gradient(ellipse 90–100% 50–70% at 50% 0–25%,
      #0D1E3A 0%, #07101E 40–50%, #020408 100%)

    Layer 2 — Tactical grid: Subtle 40×40px grid

    backgroundImage: linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)
    backgroundSize: 40px 40px

    Layer 3 — Ambient glow: Radial rgba(14,165,233,0.10–0.14) blob behind focal content

Elevation / Glow System
State	Effect
Inactive surface	No shadow
Resting card	0 2–4px 8–24px rgba(0,0,0,0.3–0.4)
Blue glow (active/focus)	0 0 16–32px rgba(14,165,233,0.3–0.5)
SOS pulse	0 0 20–60px rgba(220,38,38,0.55–0.85) animated
Green status dot	0 0 6px rgba(16,185,129,0.8)
Progress bar	0 0 8–10px rgba(56,189,248,0.6–0.7)
Logo drop shadow	drop-shadow(0 0 20px rgba(14,165,233,0.5))
Iconography

    All icons: SVG inline, 1.8px stroke, strokeLinecap="round", strokeLinejoin="round"
    Default icon color: rgba(56,189,248,0.8) (blue-bright)
    Inactive nav icons: rgba(255,255,255,0.25)
    Active nav icon: #0EA5E9
    Warning icons: #FB923C stroke
    Danger icons: #EF4444
    Icon container: 36×36px, border-radius: 9px, rgba(14,165,233,0.10) bg + rgba(14,165,233,0.18) border

Spacing Scale
Token	Value	Used for
xs	4px	Internal gaps, dot spacing
sm	8–10px	Badge padding, tight gaps
md	12–14px	Card padding internals
lg	16px	Screen horizontal padding
xl	20–24px	Section gaps
2xl	28–32px	Card padding, logo spacing
3xl	48–52px	Major section separation

Screen horizontal padding: 16px on all screens.
Corner Brackets (HUD motif)

size:   18–24px × 18–24px
stroke: 1.5px solid rgba(14,165,233,0.35–0.40)
placed: 18–24px from each corner

Present on: Splash, Login. Removed on Home (replaced by card structure).
Animation Tokens
Animation	Duration	Easing
Entrance fade + rise	0.6–0.8s	ease-out
Spring pop (logo)	0.8s	cubic-bezier(0.34,1.4,0.64,1)
Progress bar fill	42ms tick	linear
Screen fade-out	0.6s	ease
SOS pulse ring	2.5s	ease-in-out infinite
PIN dot fill	0.15s	ease
PIN button press	0.12s	ease scale 0.93
Tab switch color	0.2s	ease
Interactive States
Component	Default	Pressed	Active
PIN key	rgba(255,255,255,0.05) bg	rgba(14,165,233,0.22) + scale 0.93	—
PIN dot	transparent + rgba(56,189,248,0.3) border	—	#0EA5E9 fill + glow
Nav tab	rgba(255,255,255,0.25)	—	#0EA5E9
Quick action card	rgba(10,16,28,0.75)	border-color brightens	—
SOS button	red glow 55%	—	pulsing 85% glow
Phone Frame (Figma Make preview wrapper)

width:         390px
height:        844px
border-radius: 44px
background:    #0A0E1A
box-shadow:    0 0 0 1px rgba(56,189,248,0.12),
               0 32px 80px rgba(0,0,0,0.8),
               0 0 60px rgba(14,165,233,0.06)

Outer canvas: #020408 — makes the frame read as a physical device on a dark surface.