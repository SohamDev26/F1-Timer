════════════════════════════════════════════════════════════════
  F1 STUDY TIMER
  https://sohamdev26.github.io/F1-Timer/
════════════════════════════════════════════════════════════════

  A Formula 1 themed productivity timer. Race through your
  study sessions — every focus session is a lap, every break
  is a pit stop, and your car drives the track in real time.

────────────────────────────────────────────────────────────────
  HOW TO USE
────────────────────────────────────────────────────────────────

  1.  Open https://sohamdev26.github.io/F1-Timer/ in any browser
      — or clone the repo and open index.html locally

  2.  Pick your TEAM
      8 teams with real F1 livery colours

  3.  Pick your CIRCUIT
      26 GPs from the 2025 F1 calendar + Indian GP bonus
      Each circuit shows a real fact about that Grand Prix

  4.  Pick your TIMER MODE
      Pomodoro  →  pick a tyre compound (sets times for you)
      Custom    →  enter your own focus and break minutes

  5.  TYRE COMPOUNDS  (Pomodoro mode only)
      Soft   🔴  →  15 min focus  /  3 min break
      Medium 🟡  →  25 min focus  /  5 min break
      Hard   ⚪  →  45 min focus  /  10 min break

  6.  Set TOTAL LAPS (race length) and PIT EVERY X LAPS

  7.  Hit START RACE 🚦

  8.  Your F1 car drives the oval in sync with your timer
      — it completes exactly one lap per focus session

  9.  Laps auto-start after each session ends
      — no need to press START between laps

  10. Every X laps a PIT STOP fires automatically
      — break countdown begins, crew animation plays

  11. Complete all laps to finish the race 🏆

────────────────────────────────────────────────────────────────
  CHANGELOG
────────────────────────────────────────────────────────────────

  V1.1  —  Foundation
  ·  Dark cockpit UI — Orbitron + Rajdhani fonts
  ·  7 teams with real livery colours
  ·  Pomodoro mode (25/5) and Custom mode (user-defined)
  ·  Manual circuit name input field
  ·  Abstract randomly-generated circuit shapes
  ·  Basic F1 car SVG driving around the circuit
  ·  Lap dot row — completed / current / pit laps
  ·  Pit stop overlay with animated mechanic crew
  ·  Break countdown timer
  ·  Race end screen with final stats
  ·  Stats row — laps done, pit stops, focus time, next pit
  ·  Session progress bar with sliding car emoji
  ·  Play / Pause / Reset / Skip controls

  V1.2  —  Visual Upgrade
  ·  F1 car SVG completely rebuilt with halo, sidepods and
     vent slats, suspension arms, fat tyres with rim detail,
     nose cone, front wing cascade elements, exhaust flame
     that glows only when the timer is running
  ·  Track canvas height doubled
  ·  Car position tied to timer — completes exactly one lap
     per session, freezes on pause, resumes on play
  ·  Team colours applied via CSS variables directly to SVG

  V1.3  —  Real Circuits + Smooth Car + Auto-Lap
  ·  All 26 circuits from the 2025 F1 calendar added as
     selectable cards with flag and Grand Prix name
  ·  Indian GP (Buddh International Circuit) added as bonus
  ·  Circuit selection grid replaces the manual text input
  ·  Sahara India added as the 8th team (orange / Indian green)
  ·  Car animation switched to requestAnimationFrame —
     smooth 60fps movement instead of 1-second jumps
  ·  Exponential smoothing so car glides between timer ticks
  ·  Laps and pit stops auto-start after each session ends

  V1.4  —  Tyres · DRS · Radio · Pit Board · GP Facts
  ·  Tyre compounds replace Pomodoro number inputs —
     select Soft / Medium / Hard to set focus and break
     times automatically with F1-flavoured context
  ·  DRS zone fires at last 20% of every session —
     timer turns green, exhaust grows, DRS OPEN banner
     flashes in the header
  ·  30+ team radio messages fire at key study moments:
     session start (team-specific), halfway, DRS zone,
     lap complete, pit stop, and 3-lap streaks
  ·  Pit Board added — shows LAP / GAP / BEST / PIT IN
     as a live display updated every second
  ·  All 26 hand-crafted circuit SVG shapes replaced with
     a single clean horizontal oval — each GP now shows
     one verified real fact about that circuit instead
  ·  Fixed JS syntax error (apostrophes in fact strings
     were breaking the entire script file)
  ·  Fixed canvas height returning 0 on load
  ·  Fixed bounding box normalisation for circuit scaling

  V2.1  —  Fully Responsive
  ·  Full mobile and tablet support tested on iPhone SE
  ·  Breakpoints at 1024px / 768px / 480px + landscape
  ·  Tyre compound cards stay in one row of 3 at all widths
     — description text hides, circle and label shrink
  ·  Timer panel (65%) and Pit Board (35%) sit side by side
  ·  Pit Board is collapsible — tap title to toggle open/closed
  ·  Controls are full-width rows with 48px+ tap targets
  ·  Circuit and team grids reflow to 3 / 4 columns on mobile
  ·  GP fact moves to a full-width banner below the header
     on mobile instead of inside the header bar
  ·  Fixed touch event handling on iOS Safari — tyre, team
     and circuit selection all use addEventListener instead
     of inline onclick for reliable mobile tap response
  ·  Track and car scale proportionally with viewport

────────────────────────────────────────────────────────────────
  TECH
────────────────────────────────────────────────────────────────

  Language        Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
                  Zero frameworks, zero dependencies, zero build

  Fonts           Orbitron — display text, timer, labels
                  Rajdhani — body text, descriptions
                  Both loaded via Google Fonts CDN

  Car Graphics    Hand-coded SVG with CSS variable colouring
                  CSS classes .car-body and .car-accent pick up
                  team colours automatically on team change

  Track           HTML5 Canvas 2D API
                  Oval generated mathematically each render —
                  rx = 38% canvas width, ry = 30% canvas height
                  Sector markers drawn at 25% / 50% / 75%
                  Start/finish chequered band at position 0

  Animation       requestAnimationFrame loop for car movement
                  — runs at ~60fps independent of the timer
                  setInterval at 1000ms for the countdown
                  Exponential smoothing (factor 0.08) so car
                  glides toward timer-derived target position

  Responsive      CSS media queries only — no JS breakpoint logic
                  clamp() for fluid font scaling
                  CSS Grid and Flexbox for all layouts

  Storage         None — fully stateless, resets on page refresh

  Files           3 files total
                  index.html  —  structure and SVG markup
                  style.css   —  theme, layout, responsive rules
                  script.js   —  timer, animation, GP data

────────────────────────────────────────────────────────────────
  https://sohamdev26.github.io/F1-Timer/
════════════════════════════════════════════════════════════════