/* ===========================
   F1 STUDY TIMER — script.js
   Version 4
=========================== */

// ── TEAM DATA ──
const TEAMS = {
  mercedes:    { name: 'MERCEDES',     color: '#00D2BE', color2: '#FFFFFF' },
  redbull:     { name: 'RED BULL',     color: '#3671C6', color2: '#CC1E4A' },
  mclaren:     { name: 'McLAREN',      color: '#FF8000', color2: '#000000' },
  ferrari:     { name: 'FERRARI',      color: '#E8002D', color2: '#FFED00' },
  racingbulls: { name: 'RACING BULLS', color: '#6692FF', color2: '#FFFFFF' },
  astonmartin: { name: 'ASTON MARTIN', color: '#358C75', color2: '#CEDC00' },
  cadillac:    { name: 'CADILLAC',     color: '#C8C8C8', color2: '#1A1A2E' },
  saharaindia: { name: 'SAHARA INDIA', color: '#FF6B00', color2: '#138808' },
};

// ── TYRE COMPOUNDS ──
const TYRES = {
  soft:   { label: 'SOFT',   color: '#E8002D', focusMin: 15, breakMin: 3,  desc: 'High grip, burns fast' },
  medium: { label: 'MEDIUM', color: '#FFF200', focusMin: 25, breakMin: 5,  desc: 'Balanced performance' },
  hard:   { label: 'HARD',   color: '#EEEEEE', focusMin: 45, breakMin: 10, desc: 'Built for the long race' },
};

// ── RADIO MESSAGES ──
const RADIO = {
  sessionStart: [
    "Lights out and away we go!",
    "Let's build from lap one, nice and clean.",
    "Full concentration. You know what to do.",
    "Green light driver, let's get to work.",
    "Helmet on, visor down. Time to focus.",
  ],
  halfWay: [
    "Halfway there. Maintain the rhythm.",
    "Looking strong. Keep the pace consistent.",
    "You're in the zone right now, don't break it.",
    "Sector two complete. Clean stuff.",
    "Good pace driver, just keep doing what you're doing.",
  ],
  drsZone: [
    "Final sector. Give absolutely everything.",
    "Push push push — nearly there!",
    "DRS open. This is your flying lap.",
    "Come on, drag it over the line!",
    "Last two minutes. Empty the tank.",
  ],
  lapComplete: [
    "Fastest lap! Outstanding work driver.",
    "Lap complete. That's points on the board.",
    "P1 in the study championship. Well done.",
    "Brilliant lap. The team is very happy.",
    "That's a purple sector. Keep it up!",
    "Copy that, great lap. Box next.",
  ],
  pitStop: [
    "Good stop — 2.4 seconds. Take the rest.",
    "Clean stop. Breathe, hydrate, recover.",
    "The crew's done their job. Now you rest.",
    "Use this time well driver. We need you fresh.",
    "Pit stop complete. Recharge and come back stronger.",
  ],
  streak: [
    "Incredible consistency — hat trick of laps!",
    "Three in a row. You're on a streak driver.",
    "Unbelievable. The engineers are impressed.",
    "That's championship-level focus right there.",
  ],
  teamSpecific: {
    mercedes:    ["Calm and calculated. You are in control driver.", "We win and lose together. Focused minds only.", "Silver arrows don't slow down. Keep pushing."],
    redbull:     ["This is Jos speaking. Destroy them all.", "Max wouldn't take a break. Neither should you.", "Wings don't just give Red Bull energy — they give you focus."],
    mclaren:     ["Smooth, clean laps. You've got this.", "Papaya power. Let's go.", "McLaren DNA is about never giving up. Keep going driver."],
    ferrari:     ["Per favore, push now! The team believes in you!", "Forza Ferrari! You are doing magnifico!", "This is Maranello. We expect nothing less than perfection."],
    racingbulls: ["Young driver, prove yourself. Now.", "You're the future of this team. Show it.", "VCARB believes in you. Don't waste it."],
    astonmartin: ["Measured pace. Trust the strategy.", "Aston Martin — built for performance and endurance.", "Stay composed. The results will come."],
    cadillac:    ["New team, new energy. Let's go!", "Cadillac is here to win. Are you?", "Making history together driver. Don't stop now."],
    saharaindia: ["Represent with pride. India is watching.", "One billion people behind you. Focus.", "From Mumbai to Monaco — this lap is for everyone."],
  }
};

// ── GPS-ACCURATE CIRCUIT PATHS ──
// Points encoded as normalised [x,y] pairs (0–1000 range), scaled to canvas
const GP_DATA = [
  { id:'albert_park',      flag:'🇦🇺', name:'Australian Grand Prix',    fact:'Albert Park hosts the season opener. The lap record is held by Charles Leclerc at 1:19.813, set in 2024.' },
  { id:'shanghai',         flag:'🇨🇳', name:'Chinese Grand Prix',        fact:'Shanghai\'s back straight is over 1km long. The circuit hosted its first race in 2004 and is one of the longest on the calendar at 5.451 km.' },
  { id:'suzuka',           flag:'🇯🇵', name:'Japanese Grand Prix',        fact:'Suzuka is the only figure-eight circuit in F1. Ayrton Senna won here six times and called it his favourite track.' },
  { id:'bahrain',          flag:'🇧🇭', name:'Bahrain Grand Prix',         fact:'Bahrain was the first Middle Eastern country to host an F1 race, in 2004. The circuit is lit entirely by floodlights for evening races.' },
  { id:'jeddah',           flag:'🇸🇦', name:'Saudi Arabian Grand Prix',   fact:'The Jeddah Corniche Circuit is the fastest street circuit in F1 history, with average speeds exceeding 250 km/h.' },
  { id:'miami',            flag:'🇺🇸', name:'Miami Grand Prix',           fact:'The Miami International Autodrome is built around Hard Rock Stadium. It debuted on the calendar in 2022 and features a fake marina.' },
  { id:'imola',            flag:'🇮🇹', name:'Emilia Romagna Grand Prix',  fact:'Imola\'s official name is Autodromo Enzo e Dino Ferrari. It is one of only two circuits named after a Formula 1 constructor.' },
  { id:'monaco',           flag:'🇲🇨', name:'Monaco Grand Prix',          fact:'Monaco is the slowest circuit on the calendar with an average speed under 160 km/h, yet it is the most prestigious race in motorsport.' },
  { id:'barcelona',        flag:'🇪🇸', name:'Spanish Grand Prix',         fact:'Barcelona\'s Circuit de Catalunya has hosted the Spanish GP since 1991. Teams use it extensively for pre-season testing due to its varied corner types.' },
  { id:'gilles_villeneuve',flag:'🇨🇦', name:'Canadian Grand Prix',        fact:'The Circuit Gilles Villeneuve is named after the legendary Ferrari driver who died in 1982. The Wall of Champions has claimed Schumacher, Hill, and Villeneuve himself.' },
  { id:'red_bull_ring',    flag:'🇦🇹', name:'Austrian Grand Prix',        fact:'The Red Bull Ring sits 678 metres above sea level in the Styrian mountains. At just 4.318 km it is one of the shortest circuits on the calendar.' },
  { id:'silverstone',      flag:'🇬🇧', name:'British Grand Prix',         fact:'Silverstone hosted the very first Formula 1 World Championship race in 1950. Copse, Maggotts and Becketts remain some of the fastest corners in motorsport.' },
  { id:'spa',              flag:'🇧🇪', name:'Belgian Grand Prix',         fact:'Spa-Francorchamps at 7.004 km is the longest circuit on the 2025 calendar. Eau Rouge and Raidillon form one of the most iconic corners in racing history.' },
  { id:'hungaroring',      flag:'🇭🇺', name:'Hungarian Grand Prix',       fact:'The Hungaroring was the first circuit behind the Iron Curtain when it opened in 1986. It has one of the lowest overtaking rates due to its twisty layout.' },
  { id:'zandvoort',        flag:'🇳🇱', name:'Dutch Grand Prix',           fact:'Zandvoort returned to the calendar in 2021 after a 36-year absence. Its banked final corner allows cars to carry enormous speed without braking.' },
  { id:'monza',            flag:'🇮🇹', name:'Italian Grand Prix',         fact:'Monza is the fastest circuit in Formula 1, with average speeds above 260 km/h. It has hosted the Italian GP every year since 1950 except 1980.' },
  { id:'ifema_madrid',     flag:'🇪🇸', name:'Madrid Grand Prix',          fact:'The Madrid street circuit around IFEMA debuted on the 2026 calendar. It replaces Barcelona as Spain\'s second Grand Prix in modern F1 history.' },
  { id:'baku',             flag:'🇦🇿', name:'Azerbaijan Grand Prix',      fact:'Baku\'s Castle Section is the narrowest part of any street circuit — just 7.6 metres wide. The main straight at 2.2 km is the longest in F1.' },
  { id:'singapore',        flag:'🇸🇬', name:'Singapore Grand Prix',       fact:'Singapore is the only fully floodlit night race on the calendar. The 2008 race was infamously impacted by the Renault team orders scandal.' },
  { id:'cota',             flag:'🇺🇸', name:'United States Grand Prix',   fact:'The Circuit of the Americas opened in 2012. Turn 1 is the highest point of the track at 41 metres above the start/finish straight.' },
  { id:'mexico',           flag:'🇲🇽', name:'Mexico City Grand Prix',     fact:'The Autodromo Hermanos Rodriguez sits at 2,285 metres altitude — the highest circuit on the calendar — reducing engine power and aerodynamic grip.' },
  { id:'interlagos',       flag:'🇧🇷', name:'Brazilian Grand Prix',       fact:'Interlagos runs anti-clockwise, making it one of only four such circuits in F1. Ayrton Senna won here in 1991 in a car with only sixth gear remaining.' },
  { id:'las_vegas',        flag:'🇺🇸', name:'Las Vegas Grand Prix',       fact:'The Las Vegas Strip Circuit debuted in 2023, running along the famous Las Vegas Boulevard. The main straight passes directly in front of the Bellagio fountains.' },
  { id:'lusail',           flag:'🇶🇦', name:'Qatar Grand Prix',           fact:'The Lusail International Circuit is a high-speed flowing track with no real straights. It was originally built for MotoGP before joining the F1 calendar in 2021.' },
  { id:'yas_marina',       flag:'🇦🇪', name:'Abu Dhabi Grand Prix',       fact:'Yas Marina hosts the season finale every year. The circuit passes under and through the iconic Yas Viceroy Hotel, lit up at night in team colours.' },
  { id:'india',            flag:'🇮🇳', name:'Indian Grand Prix',          fact:'The Buddh International Circuit hosted the Indian GP from 2011 to 2013. Sebastian Vettel won all three editions, clinching his 2013 title here.' },
];

// ── OVAL TRACK GENERATOR ──
function buildOvalTrack(w, h) {
  const cx = w / 2, cy = h / 2;
  const rx = w * 0.38, ry = h * 0.30;
  const steps = 120;
  const points = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
    points.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) });
  }
  const dists = [0];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i-1].x;
    const dy = points[i].y - points[i-1].y;
    total += Math.sqrt(dx*dx + dy*dy);
    dists.push(total);
  }
  // close the loop
  const dx = points[0].x - points[points.length-1].x;
  const dy = points[0].y - points[points.length-1].y;
  total += Math.sqrt(dx*dx + dy*dy);
  return { points, dists, totalLen: total };
}

// ── STATE ──
let state = {
  team: null, circuit: null, tyre: null,
  mode: 'pomodoro',
  focusTime: 25*60, breakTime: 5*60,
  totalLaps: 8, pitEvery: 2,
  currentLap: 1, completedLaps: 0, pitStops: 0,
  totalFocusSeconds: 0,
  isRunning: false, isBreak: false, timeLeft: 0,
  timer: null, track: null, carPos: 0,
  animFrame: null, lastTimestamp: null,
  bestLap: null, currentLapStart: 0,
  drsActive: false, halfwayFired: false,
  consecutiveLaps: 0, radioTimeout: null,
};

// ── BUILD CIRCUIT GRID ──
function buildCircuitGrid() {
  const grid = document.getElementById('circuit-grid');
  grid.innerHTML = '';
  GP_DATA.forEach(c => {
    const shortName = c.name
      .replace(' Grand Prix','').replace(' City','').replace(' Strip','')
      .replace(' International','').replace('Circuit of the Americas','COTA')
      .replace('Autodromo Nazionale','').replace('Autodromo','');
    const card = document.createElement('div');
    card.className = 'circuit-card';
    card.dataset.id = c.id;
    card.innerHTML = `<span class="circuit-flag">${c.flag}</span><span class="circuit-name">${shortName}</span>`;
    card.addEventListener('click', () => {
      document.querySelectorAll('.circuit-card').forEach(x => x.classList.remove('selected'));
      card.classList.add('selected');
      state.circuit = c.id;
    });
    grid.appendChild(card);
  });
}

// ── SETUP UI ──
function selectMode(mode) {
  state.mode = mode;
  document.getElementById('pomodoro-btn').classList.toggle('active', mode === 'pomodoro');
  document.getElementById('custom-btn').classList.toggle('active', mode === 'custom');
  document.getElementById('pomodoro-settings').classList.toggle('hidden', mode !== 'pomodoro');
  document.getElementById('custom-settings').classList.toggle('hidden', mode !== 'custom');
}

function selectTyre(tyre) {
  state.tyre = tyre;
  document.querySelectorAll('.tyre-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.tyre-card[data-tyre="${tyre}"]`).classList.add('selected');
}

document.querySelectorAll('.tyre-card').forEach(card => {
  card.addEventListener('click', () => selectTyre(card.dataset.tyre));
});

document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.team = card.dataset.team;
    applyTeamTheme(state.team);
  });
});

function applyTeamTheme(teamKey) {
  const t = TEAMS[teamKey];
  document.documentElement.style.setProperty('--team-color', t.color);
  document.documentElement.style.setProperty('--team-color2', t.color2);
}

// ── START RACE ──
function startRace() {
  if (!state.team)    { alert('Pick your team! 🏎️'); return; }
  if (!state.circuit) { alert('Pick a circuit! 🏁'); return; }

  const circuitData = GP_DATA.find(c => c.id === state.circuit);

  if (state.mode === 'pomodoro') {
    if (!state.tyre) { alert('Pick your tyre compound! 🔴'); return; }
    const t = TYRES[state.tyre];
    state.focusTime = t.focusMin * 60;
    state.breakTime = t.breakMin * 60;
  } else {
    state.focusTime = (parseInt(document.getElementById('custom-focus').value)||45)*60;
    state.breakTime  = (parseInt(document.getElementById('custom-break').value)||10)*60;
  }

  state.totalLaps = parseInt(document.getElementById('total-laps').value)||8;
  state.pitEvery  = parseInt(document.getElementById('pit-every').value)||2;
  Object.assign(state,{
    currentLap:1, completedLaps:0, pitStops:0, totalFocusSeconds:0,
    isRunning:false, isBreak:false, timeLeft:state.focusTime,
    carPos:0, lastTimestamp:null, bestLap:null, currentLapStart:Date.now(),
    drsActive:false, halfwayFired:false, consecutiveLaps:0,
  });

  document.getElementById('setup-screen').classList.remove('active');
  document.getElementById('race-screen').classList.add('active');
  document.getElementById('race-name-display').textContent = circuitData.name.toUpperCase();
  document.getElementById('race-fact-display').textContent = circuitData.fact;
  document.getElementById('race-fact-mobile').textContent = circuitData.fact;
  document.getElementById('team-name-display').textContent  = TEAMS[state.team].name;
  document.getElementById('lap-current').textContent = '1';
  document.getElementById('lap-total').textContent   = state.totalLaps;

  applyTeamTheme(state.team);
  buildLapDots();
  updateTimerDisplay();
  updateStats();
  updatePitBoard();
  resetPlayButton();

  // Wait one frame so race-screen is visible and has dimensions
  requestAnimationFrame(() => {
    initTrack();
    startCarAnimation();
  });
}

// ── TRACK ──
function initTrack() {
  const canvas = document.getElementById('track-canvas');
  const container = canvas.parentElement;
  const w = container.clientWidth || 800;
  const h = container.clientHeight || 300;
  canvas.width = w; canvas.height = h;
  state.track = buildOvalTrack(w, h);
  drawTrack(canvas, state.track);
}

function drawTrack(canvas, track) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const teamColor = getComputedStyle(document.documentElement).getPropertyValue('--team-color').trim();
  const pts = track.points;

  // Proportional widths based on canvas size
  const base  = Math.min(canvas.width, canvas.height);
  const outer = Math.max(10, base * 0.075);
  const inner = Math.max(7,  base * 0.055);

  function tracePath() {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
  }

  // Glow
  ctx.save();
  ctx.shadowColor=teamColor; ctx.shadowBlur=30;
  ctx.strokeStyle=teamColor; ctx.lineWidth=outer+8;
  ctx.lineCap='round'; ctx.lineJoin='round'; ctx.globalAlpha=0.08;
  tracePath(); ctx.stroke(); ctx.restore();

  // Outer kerb
  ctx.strokeStyle='#2e2e3e'; ctx.lineWidth=outer; ctx.lineCap='round'; ctx.lineJoin='round';
  tracePath(); ctx.stroke();

  // Kerb stripes
  ctx.strokeStyle='#992200'; ctx.lineWidth=outer;
  ctx.setLineDash([22,22]); ctx.globalAlpha=0.18;
  tracePath(); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha=1;

  // White kerb marks
  ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=outer;
  ctx.setLineDash([4,40]);
  tracePath(); ctx.stroke(); ctx.setLineDash([]);

  // Tarmac
  ctx.strokeStyle='#18181f'; ctx.lineWidth=inner;
  tracePath(); ctx.stroke();

  // Tarmac texture
  ctx.strokeStyle='rgba(255,255,255,0.03)'; ctx.lineWidth=inner;
  ctx.setLineDash([60,30]);
  tracePath(); ctx.stroke(); ctx.setLineDash([]);

  // Inner edge highlight
  ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=inner;
  ctx.setLineDash([3,28]);
  tracePath(); ctx.stroke(); ctx.setLineDash([]);

  // Centre line
  ctx.strokeStyle=teamColor; ctx.lineWidth=1.5; ctx.globalAlpha=0.35;
  ctx.setLineDash([12,20]);
  tracePath(); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha=1;

  // Sector markers (S1=25%, S2=50%, S3=75%)
  [0.25, 0.5, 0.75].forEach((frac, i) => {
    const {x, y, angle} = getPosOnTrack(frac);
    ctx.save();
    ctx.translate(x,y); ctx.rotate(angle + Math.PI/2);
    ctx.fillStyle = ['#FF4444','#FFFF44','#44FF44'][i];
    ctx.globalAlpha = 0.7;
    ctx.fillRect(-18, -2, 36, 4);
    ctx.restore();
    // Sector label
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = ['#FF6666','#FFFF66','#66FF66'][i];
    ctx.globalAlpha = 0.9;
    ctx.font = 'bold 10px Orbitron,monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`S${i+1}`, 0, -12);
    ctx.restore();
  });

  // Start/finish line
  const sp = pts[0], sp2 = pts[8]||pts[1];
  const ang = Math.atan2(sp2.y-sp.y, sp2.x-sp.x) + Math.PI/2;
  ctx.save();
  ctx.translate(sp.x, sp.y); ctx.rotate(ang);
  for (let i=0;i<6;i++) {
    ctx.fillStyle = i%2===0 ? '#ffffff' : '#111111';
    ctx.fillRect(-20,-3+i*5,40,5);
  }
  ctx.restore();
}

// ── CAR ANIMATION ──
function startCarAnimation() {
  if (state.animFrame) cancelAnimationFrame(state.animFrame);
  state.lastTimestamp = null;
  rafLoop();
}

function rafLoop(ts) {
  state.animFrame = requestAnimationFrame(rafLoop);
  if (state.isRunning && !state.isBreak && state.lastTimestamp != null) {
    const target = Math.min(1.0, (state.focusTime - state.timeLeft) / state.focusTime);
    state.carPos += (target - state.carPos) * 0.07;
    if (state.carPos > 0.999) state.carPos = 0.999;
  }
  state.lastTimestamp = ts;
  renderCar();
  updateDRS();
}

function renderCar() {
  const track = state.track;
  if (!track || track.points.length < 2) return;
  const {x, y, angle} = getPosOnTrack(state.carPos);
  const carEl = document.getElementById('f1-car');
  carEl.style.left      = (x - 70) + 'px';
  carEl.style.top       = (y - 25) + 'px';
  carEl.style.transform = `rotate(${angle}rad)`;
  const running = state.isRunning && !state.isBreak;
  document.getElementById('exhaust-flame').style.display = running ? 'block' : 'none';
  // DRS makes exhaust bigger
  if (running && state.drsActive) {
    document.getElementById('exhaust-flame').style.transform = 'scaleX(1.6)';
  } else {
    document.getElementById('exhaust-flame').style.transform = '';
  }
}

function getPosOnTrack(t) {
  const track = state.track;
  const targetDist = t * track.totalLen;
  let lo=0, hi=track.dists.length-1;
  while (lo < hi-1) { const mid=(lo+hi)>>1; if(track.dists[mid]<targetDist) lo=mid; else hi=mid; }
  const idx = Math.min(lo, track.points.length-2);
  const segLen = track.dists[idx+1]-track.dists[idx];
  const frac   = segLen>0 ? (targetDist-track.dists[idx])/segLen : 0;
  const p0=track.points[idx], p1=track.points[idx+1];
  return {
    x: p0.x+(p1.x-p0.x)*frac,
    y: p0.y+(p1.y-p0.y)*frac,
    angle: Math.atan2(p1.y-p0.y, p1.x-p0.x),
  };
}

// ── DRS ──
function updateDRS() {
  const pct = (state.focusTime - state.timeLeft) / state.focusTime;
  const shouldDRS = state.isRunning && !state.isBreak && pct >= 0.80;
  if (shouldDRS && !state.drsActive) {
    state.drsActive = true;
    document.getElementById('drs-indicator').classList.add('active');
    showRadio(pick(RADIO.drsZone));
  } else if (!shouldDRS && state.drsActive) {
    state.drsActive = false;
    document.getElementById('drs-indicator').classList.remove('active');
  }
}

// ── TIMER ──
function toggleTimer() { state.isRunning ? pauseTimer() : playTimer(); }

function playTimer() {
  state.isRunning = true;
  document.getElementById('play-icon').style.display  = 'none';
  document.getElementById('pause-icon').style.display = 'block';
  document.getElementById('play-pause-text').textContent = 'PAUSE';
  if (state.timeLeft === state.focusTime) {
    showRadio(pick([...RADIO.sessionStart, ...RADIO.teamSpecific[state.team]||[]]));
    state.currentLapStart = Date.now();
  }
  state.timer = setInterval(timerTick, 1000);
}

function timerTick() {
  state.timeLeft--;
  if (!state.isBreak) state.totalFocusSeconds++;

  // Halfway radio
  const pct = (state.focusTime - state.timeLeft) / state.focusTime;
  if (!state.halfwayFired && pct >= 0.5) {
    state.halfwayFired = true;
    showRadio(pick(RADIO.halfWay));
  }

  updateTimerDisplay(); updateProgress(); updateStats(); updatePitBoard();
  if (state.timeLeft <= 0) { clearInterval(state.timer); onSessionEnd(); }
}

function pauseTimer() {
  state.isRunning = false;
  clearInterval(state.timer);
  document.getElementById('play-icon').style.display  = 'block';
  document.getElementById('pause-icon').style.display = 'none';
  document.getElementById('play-pause-text').textContent = 'RESUME';
}

function resetTimer() {
  clearInterval(state.timer); state.isRunning = false;
  state.timeLeft = state.isBreak ? state.breakTime : state.focusTime;
  state.carPos = 0; state.halfwayFired = false;
  resetPlayButton(); updateTimerDisplay(); updateProgress(); updatePitBoard();
}

function skipSession() { clearInterval(state.timer); state.timeLeft=0; onSessionEnd(); }
function skipPitStop() {
  clearInterval(state.timer); state.isRunning=false;
  document.getElementById('pit-overlay').classList.add('hidden');
  startNextLap(true);
}

function onSessionEnd() {
  if (!state.isBreak) {
    // Save best lap
    const lapTime = Math.round((Date.now() - state.currentLapStart) / 1000);
    if (!state.bestLap || lapTime < state.bestLap) state.bestLap = lapTime;

    state.completedLaps++;
    state.consecutiveLaps++;
    state.currentLap++;
    updateLapDot(state.completedLaps-1, false);
    updateLapDot(state.completedLaps, true);
    document.getElementById('lap-current').textContent = Math.min(state.currentLap, state.totalLaps);

    showRadio(pick(RADIO.lapComplete));

    // Streak radio
    if (state.consecutiveLaps > 0 && state.consecutiveLaps % 3 === 0) {
      setTimeout(()=>showRadio(pick(RADIO.streak)), 3000);
    }

    if (state.completedLaps >= state.totalLaps) { endRace(); return; }
    if (state.completedLaps % state.pitEvery === 0) startPitStop();
    else startNextLap(true);
  } else {
    document.getElementById('pit-overlay').classList.add('hidden');
    startNextLap(true);
  }
  updateStats(); updatePitBoard();
}

function startPitStop() {
  state.isBreak=true; state.isRunning=false;
  state.pitStops++; state.timeLeft=state.breakTime; state.carPos=0;
  document.getElementById('pit-overlay').classList.remove('hidden');
  document.getElementById('phase-badge').className   = 'phase-badge break';
  document.getElementById('phase-badge').textContent = '🔧 PIT STOP';
  updateLapDotPit(state.completedLaps-1);
  updatePitTimerDisplay(); updateStats(); updatePitBoard(); resetPlayButton();
  showRadio(pick(RADIO.pitStop));
  state.timer = setInterval(()=>{
    state.timeLeft--;
    updatePitTimerDisplay();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      document.getElementById('pit-overlay').classList.add('hidden');
      startNextLap(true);
    }
  }, 1000);
}

function startNextLap(autoStart=false) {
  state.isBreak=false; state.isRunning=false;
  state.timeLeft=state.focusTime; state.carPos=0;
  state.drsActive=false; state.halfwayFired=false;
  state.currentLapStart = Date.now();
  document.getElementById('drs-indicator').classList.remove('active');
  document.getElementById('phase-badge').className   = 'phase-badge';
  document.getElementById('phase-badge').textContent = 'FLYING LAP';
  resetPlayButton(); updateTimerDisplay(); updateProgress(); updateStats(); updatePitBoard();
  if (autoStart) playTimer();
}

function resetPlayButton() {
  state.isRunning=false; clearInterval(state.timer);
  document.getElementById('play-icon').style.display  = 'block';
  document.getElementById('pause-icon').style.display = 'none';
  document.getElementById('play-pause-text').textContent = 'START';
}

// ── PIT BOARD ──
function updatePitBoard() {
  const lapTxt = `${Math.min(state.currentLap, state.totalLaps)} / ${state.totalLaps}`;
  const secs = state.timeLeft;
  const m = Math.floor(secs/60), s = secs%60;
  const gapTxt = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const bestTxt = state.bestLap
    ? `${Math.floor(state.bestLap/60)}:${String(state.bestLap%60).padStart(2,'0')}`
    : '--:--';
  const lapsUntilPit = state.pitEvery - (state.completedLaps % state.pitEvery);
  const pitTxt = state.completedLaps >= state.totalLaps
    ? 'DONE' : `${lapsUntilPit} LAP${lapsUntilPit!==1?'S':''}`;

  document.getElementById('pb-lap-d').textContent  = lapTxt;
  document.getElementById('pb-gap-d').textContent  = gapTxt;
  document.getElementById('pb-best-d').textContent = bestTxt;
  document.getElementById('pb-pit-d').textContent  = pitTxt;
}

// Pit board collapse toggle
document.getElementById('pit-board-toggle').addEventListener('click', () => {
  document.getElementById('pit-board-desktop').classList.toggle('collapsed');
});

// ── RADIO MESSAGES ──
function showRadio(msg) {
  if (state.radioTimeout) clearTimeout(state.radioTimeout);
  const el = document.getElementById('radio-message');
  el.textContent = '📻 ' + msg;
  el.classList.add('visible');
  state.radioTimeout = setTimeout(()=> el.classList.remove('visible'), 4500);
}

function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

// ── DISPLAY ──
function updateTimerDisplay() {
  const m=Math.floor(state.timeLeft/60), s=state.timeLeft%60;
  document.getElementById('timer-min').textContent = String(m).padStart(2,'0');
  document.getElementById('timer-sec').textContent = String(s).padStart(2,'0');
  document.getElementById('timer-label').textContent = state.isBreak ? 'BREAK TIMER' : 'SECTOR TIME';
  document.getElementById('timer-sub').textContent   = state.isBreak ? 'PIT STOP SESSION' : 'FOCUS SESSION';
  document.getElementById('timer-display').style.color = state.drsActive ? 'var(--green)' :
    state.isBreak ? 'var(--green)' : 'var(--text-primary)';
}

function updatePitTimerDisplay() {
  const m=Math.floor(state.timeLeft/60),s=state.timeLeft%60;
  document.getElementById('pit-timer-display').textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}

function updateProgress() {
  const total = state.isBreak ? state.breakTime : state.focusTime;
  const pct   = Math.min(100, Math.round(((total-state.timeLeft)/total)*100));
  document.getElementById('progress-fill').style.width = pct+'%';
  document.getElementById('progress-pct').textContent  = pct+'%';
  document.getElementById('progress-car').style.left   = Math.max(0,pct-4)+'%';
  document.getElementById('progress-fill').style.background =
    state.drsActive ? 'linear-gradient(90deg, var(--green), #00ff88)'
    : 'linear-gradient(90deg, var(--team-color), var(--accent))';
}

function updateStats() {
  document.getElementById('stat-completed').textContent  = state.completedLaps;
  document.getElementById('stat-pitstops').textContent   = state.pitStops;
  document.getElementById('stat-focus-time').textContent = Math.floor(state.totalFocusSeconds/60)+'m';
  const lapsUntilPit = state.pitEvery-(state.completedLaps%state.pitEvery);
  document.getElementById('stat-next-pit').textContent   =
    state.completedLaps>=state.totalLaps ? '--' : lapsUntilPit+' lap'+(lapsUntilPit!==1?'s':'');
}

// ── LAP DOTS ──
function buildLapDots() {
  const c = document.getElementById('lap-dots'); c.innerHTML='';
  for (let i=0;i<state.totalLaps;i++) {
    const d=document.createElement('div');
    d.className='lap-dot'+(i===0?' current':'');
    d.textContent=i+1; d.id='lap-dot-'+i; c.appendChild(d);
  }
}
function updateLapDot(index,isCurrent) {
  for (let i=0;i<state.totalLaps;i++) {
    const dot=document.getElementById('lap-dot-'+i); if(!dot) continue;
    if(i<index){if(!dot.classList.contains('pit'))dot.classList.add('completed');}
    else if(i===index&&isCurrent){dot.classList.remove('completed','pit');dot.classList.add('current');}
    else dot.classList.remove('current');
  }
}
function updateLapDotPit(index) {
  const dot=document.getElementById('lap-dot-'+index);
  if(dot){dot.classList.remove('completed','current');dot.classList.add('pit');dot.textContent='🔧';}
}

// ── END RACE ──
function endRace() {
  clearInterval(state.timer); state.isRunning=false;
  const circuitData=GP_DATA.find(c=>c.id===state.circuit);
  document.getElementById('final-laps').textContent  = state.completedLaps;
  document.getElementById('final-focus').textContent = Math.floor(state.totalFocusSeconds/60)+'m';
  document.getElementById('final-pits').textContent  = state.pitStops;
  document.getElementById('race-end-subtitle').textContent = (circuitData?circuitData.name:'RACE')+' · CHECKERED FLAG 🏁';
  document.getElementById('race-end-overlay').classList.remove('hidden');
}

function newRace() {
  clearInterval(state.timer);
  if (state.animFrame) cancelAnimationFrame(state.animFrame);
  document.getElementById('race-end-overlay').classList.add('hidden');
  document.getElementById('pit-overlay').classList.add('hidden');
  document.getElementById('race-screen').classList.remove('active');
  document.getElementById('setup-screen').classList.add('active');
}

window.addEventListener('resize',()=>{
  if(document.getElementById('race-screen').classList.contains('active')){
    initTrack();
  }
});

(function init(){
  buildCircuitGrid();
  const first=document.querySelector('.team-card');
  if(first){first.classList.add('selected');state.team=first.dataset.team;applyTeamTheme(state.team);}
})();
