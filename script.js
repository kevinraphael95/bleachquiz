/* ═══════════════════════════════════════════════════
   THAT BLEACH QUIZ — script.js
════════════════════════════════════════════════════ */

'use strict';

const SAVE_KEY = 'bleachquiz_v2';

/* ──────────────────────────────
   AUDIO (Web Audio API)
────────────────────────────── */
let _ctx = null;
function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function playTone(freq, type, duration, vol = 0.18, delay = 0) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch(e) {}
}

function sfxCorrect() {
  playTone(523, 'square', 0.08, 0.15);
  playTone(659, 'square', 0.08, 0.15, 0.09);
  playTone(784, 'square', 0.15, 0.15, 0.18);
}
function sfxWrong() {
  playTone(220, 'sawtooth', 0.12, 0.2);
  playTone(165, 'sawtooth', 0.18, 0.2, 0.1);
}
function sfxSkipGained() {
  playTone(880, 'sine', 0.1, 0.12);
  playTone(1100, 'sine', 0.12, 0.12, 0.12);
}
function sfxSkipUsed() {
  playTone(440, 'sine', 0.08, 0.1);
  playTone(330, 'sine', 0.1, 0.1, 0.09);
}
function sfxGameOver() {
  playTone(440, 'sawtooth', 0.2, 0.25);
  playTone(330, 'sawtooth', 0.2, 0.25, 0.2);
  playTone(220, 'sawtooth', 0.35, 0.25, 0.4);
}
function sfxWin() {
  [0, 0.1, 0.2, 0.35].forEach((t, i) => {
    playTone([523, 659, 784, 1047][i], 'square', 0.15, 0.14, t);
  });
}
function sfxClick() {
  playTone(600, 'sine', 0.04, 0.08);
}

/* ──────────────────────────────
   ÉTAT DU JEU
────────────────────────────── */
const STATE = {
  currentQ: 0,
  lives: 3,
  skips: 0,
  locked: false,
};

/* ──────────────────────────────
   PERSISTANCE
────────────────────────────── */
function saveProgress() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    currentQ: STATE.currentQ,
    lives:    STATE.lives,
    skips:    STATE.skips,
  }));
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (d.currentQ == null || d.currentQ >= QUESTIONS.length) return false;
    if (d.lives <= 0) return false;
    STATE.currentQ = d.currentQ;
    STATE.lives    = d.lives;
    STATE.skips    = d.skips ?? 0;
    STATE.locked   = false;
    return true;
  } catch { return false; }
}

function clearProgress() {
  localStorage.removeItem(SAVE_KEY);
}

/* ──────────────────────────────
   CANVAS BACKGROUND
────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.05,
      color: Math.random() < 0.15 ? '#e83030' : Math.random() < 0.1 ? '#ffffff' : '#7ba4f0'
    };
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) particles.push(makeParticle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ──────────────────────────────
   REFS DOM
────────────────────────────── */
const $ = id => document.getElementById(id);

const screenTitle      = $('screen-title');
const screenGame       = $('screen-game');
const hudLives         = $('hud-lives');
const hudSkips         = $('hud-skips');
const qNum             = $('q-num');
const qText            = $('q-text');
const answersGrid      = $('answers-grid');
const specialZone      = $('special-zone');
const toast            = $('toast');
const toastSkip        = $('toast-skip');
const overlayGO        = $('overlay-gameover');
const overlayWin       = $('overlay-win');
const btnStart         = $('btn-start');
const btnIngameRestart = $('btn-ingame-restart');

/* ──────────────────────────────
   NAVIGATION ÉCRANS
────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showOverlay(el) { el.removeAttribute('hidden'); }
function hideOverlay(el) { el.setAttribute('hidden', ''); }

/* ──────────────────────────────
   TITRE
────────────────────────────── */
function updateTitleScreen() {
  const hasSave = !!localStorage.getItem(SAVE_KEY);
  btnStart.textContent = hasSave ? 'CONTINUER' : 'JOUER !';
}

/* ──────────────────────────────
   RESET & START
────────────────────────────── */
function resetState() {
  STATE.currentQ = 0;
  STATE.lives    = 3;
  STATE.skips    = 0;
  STATE.locked   = false;
}

function startGame(fresh = false) {
  if (fresh) {
    resetState();
    clearProgress();
  } else {
    if (!loadProgress()) resetState();
  }
  showScreen('screen-game');
  loadQuestion();
}

/* ──────────────────────────────
   HUD
────────────────────────────── */
function updateHUD() {
  hudLives.innerHTML = `<span class="hud-lives-count">${STATE.lives}</span>`;

  const MAX_SKIPS = 5;
  const displayCount = Math.min(STATE.skips, MAX_SKIPS);
  const pct = Math.round((displayCount / MAX_SKIPS) * 100);

  hudSkips.innerHTML = `
    <div class="skip-bar-wrap">
      <div class="skip-pips" id="skip-pips-inner"></div>
      <div class="skip-bar-track" style="width:${Math.max(60, MAX_SKIPS * 22)}px">
        <div class="skip-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>
    ${STATE.skips > MAX_SKIPS ? `<span class="skip-extra">x${STATE.skips}</span>` : ''}
  `;

  const pipsEl = document.getElementById('skip-pips-inner');
  for (let i = 0; i < MAX_SKIPS; i++) {
    const pip = document.createElement('div');
    const active = i < displayCount;
    pip.className = 'skip-pip' + (active ? ' on' : '');
    pip.title = active ? 'Utiliser un skip' : 'Skip épuisé';
    if (active) pip.addEventListener('click', useSkip);
    pipsEl.appendChild(pip);
  }
}

/* ──────────────────────────────
   CHARGEMENT D'UNE QUESTION
────────────────────────────── */
function loadQuestion() {
  STATE.locked = false;
  answersGrid.innerHTML = '';
  specialZone.innerHTML = '';
  specialZone.setAttribute('hidden', '');

  const q = QUESTIONS[STATE.currentQ];
  updateHUD();
  saveProgress();

  qNum.textContent = STATE.currentQ + 1;

  if (q.type === 'secret_word') {
    renderSecretWordQuestion(q);
  } else {
    qText.textContent = q.text;
  }

  switch (q.type) {
    case 'classic':      renderClassic(q);      break;
    case 'slider':       renderSlider(q);        break;
    case 'colors':       renderColors(q);        break;
    case 'drag':         renderDrag(q);          break;
    case 'hidden':       renderHidden(q);        break;
    case 'avoid':        renderAvoid(q);         break;
    case 'word_cluster': renderWordCluster(q);   break;
    case 'secret_word':                          break;
  }

  const card = $('question-card');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'screen-enter 0.35s var(--ease-snap) both';
}

/* ──────────────────────────────
   BONUS SKIP — toast centré
────────────────────────────── */
function grantBonusSkip() {
  STATE.skips++;
  updateHUD();
  saveProgress();
  sfxSkipGained();

  // Positionner le toast au centre de la zone de réponses
  const midEl = document.querySelector('.iq-mid');
  if (midEl) {
    const rect = midEl.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const pct = (centerY / window.innerHeight) * 100;
    toastSkip.style.top = pct + '%';
  } else {
    toastSkip.style.top = '50%';
  }

  toastSkip.classList.add('show');
  setTimeout(() => toastSkip.classList.remove('show'), 1200);
}

/* ──────────────────────────────
   RÉPONSE CORRECTE
────────────────────────────── */
function onCorrect() {
  if (STATE.locked) return;
  STATE.locked = true;
  sfxCorrect();

  const q = QUESTIONS[STATE.currentQ];
  const giveSkip = !!q.bonusSkip;

  setTimeout(() => {
    if (giveSkip) grantBonusSkip();

    setTimeout(() => {
      STATE.currentQ++;
      if (STATE.currentQ >= QUESTIONS.length) {
        clearProgress();
        showWin();
      } else {
        loadQuestion();
      }
    }, giveSkip ? 1300 : 0);
  }, 700);
}

/* ──────────────────────────────
   MAUVAISE RÉPONSE
────────────────────────────── */
function onWrong(btn) {
  if (STATE.locked) return;
  STATE.locked = true;
  STATE.lives--;
  sfxWrong();

  if (btn) btn.classList.add('is-wrong');

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 900);

  updateHUD();
  saveProgress();

  if (STATE.lives <= 0) {
    clearProgress();
    setTimeout(showGameOver, 1200);
  } else {
    setTimeout(() => {
      STATE.locked = false;
      document.querySelectorAll(
        '.ans-btn, .color-swatch, .wc-btn, .avoid-target, .avoid-trap, .hidden-decoy, .hidden-correct'
      ).forEach(b => { if (b !== btn) b.style.pointerEvents = 'auto'; });
    }, 900);
  }
}

/* ──────────────────────────────
   SKIP
────────────────────────────── */
function useSkip() {
  if (STATE.locked || STATE.skips <= 0) return;
  STATE.skips--;
  sfxSkipUsed();
  STATE.currentQ++;
  if (STATE.currentQ >= QUESTIONS.length) {
    clearProgress();
    showWin();
  } else {
    loadQuestion();
  }
}

/* ──────────────────────────────
   GAME OVER
────────────────────────────── */
function showGameOver() {
  sfxGameOver();
  $('go-qnum').textContent = STATE.currentQ + 1;
  showOverlay(overlayGO);
}

/* ──────────────────────────────
   VICTOIRE
────────────────────────────── */
function showWin() {
  sfxWin();
  const total = QUESTIONS.length;
  let rank = 'HOLLOW EN FORMATION';
  const progress = STATE.currentQ;
  const pct = Math.round((progress / total) * 100);
  if      (pct >= 95) rank = 'CAPITAINE — CLASSE S';
  else if (pct >= 80) rank = 'VICE-CAPITAINE';
  else if (pct >= 65) rank = 'SHINIGAMI CONFIRMÉ';
  else if (pct >= 50) rank = 'ACADÉMIE SHINIGAMI';

  $('win-rank').textContent = rank;
  showOverlay(overlayWin);
}

/* ══════════════════════════════════════════
   RENDERERS PAR TYPE
══════════════════════════════════════════ */

function renderClassic(q) {
  q.answers.map((text, idx) => ({ text, idx })).forEach(({ text, idx }) => {
    const btn = document.createElement('button');
    btn.className = 'ans-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => {
      if (STATE.locked) return;
      sfxClick();
      if (idx === q.correct) { btn.classList.add('is-correct'); onCorrect(); }
      else onWrong(btn);
    });
    answersGrid.appendChild(btn);
  });
}

function renderSlider(q) {
  specialZone.removeAttribute('hidden');
  const mid = Math.round((q.min + q.max) / 2);
  specialZone.innerHTML = `
    <div class="slider-wrap">
      <div class="slider-display" id="slider-val">${mid}</div>
      <input type="range" class="slider-ctrl" id="slider-ctrl"
             min="${q.min}" max="${q.max}" step="${q.step}" value="${mid}">
      <button class="slider-submit" id="slider-submit">VALIDER</button>
    </div>
  `;
  const ctrl = $('slider-ctrl');
  const disp = $('slider-val');
  ctrl.addEventListener('input', () => { disp.textContent = ctrl.value; });
  $('slider-submit').addEventListener('click', () => {
    if (STATE.locked) return;
    sfxClick();
    parseInt(ctrl.value) === q.correct ? onCorrect() : onWrong(null);
  });
}

function renderColors(q) {
  specialZone.removeAttribute('hidden');
  const grid = document.createElement('div');
  grid.className = 'color-grid';
  q.swatches.forEach((sw, i) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.background = sw.color;
    swatch.textContent = sw.label;
    swatch.addEventListener('click', () => {
      if (STATE.locked) return;
      sfxClick();
      i === q.correct ? onCorrect() : onWrong(swatch);
    });
    grid.appendChild(swatch);
  });
  specialZone.appendChild(grid);
}

function renderDrag(q) {
  specialZone.removeAttribute('hidden');
  let items = [...q.items].sort(() => Math.random() - 0.5);
  const list = document.createElement('div');
  list.className = 'drag-list';
  let dragged = null;

  function buildItems() {
    list.innerHTML = '';
    items.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'drag-item';
      div.draggable = true;
      div.dataset.idx = i;
      div.innerHTML = `<span class="drag-handle">⠿</span>${item}`;
      div.addEventListener('dragstart', () => { dragged = div; setTimeout(() => div.classList.add('dragging'), 0); });
      div.addEventListener('dragend', () => { div.classList.remove('dragging'); list.querySelectorAll('.drag-item').forEach(d => d.classList.remove('drag-over')); dragged = null; });
      div.addEventListener('dragover', e => { e.preventDefault(); if (div !== dragged) div.classList.add('drag-over'); });
      div.addEventListener('dragleave', () => div.classList.remove('drag-over'));
      div.addEventListener('drop', e => {
        e.preventDefault(); div.classList.remove('drag-over');
        if (dragged && dragged !== div) {
          const fi = parseInt(dragged.dataset.idx), ti = parseInt(div.dataset.idx);
          [items[fi], items[ti]] = [items[ti], items[fi]];
          buildItems();
        }
      });
      list.appendChild(div);
    });
  }

  buildItems();

  const btn = document.createElement('button');
  btn.className = 'drag-submit';
  btn.textContent = "VALIDER L'ORDRE";
  btn.addEventListener('click', () => {
    if (STATE.locked) return;
    sfxClick();
    JSON.stringify(items) === JSON.stringify(q.correctOrder) ? onCorrect() : onWrong(null);
  });

  const wrap = document.createElement('div');
  wrap.appendChild(list);
  wrap.appendChild(btn);
  specialZone.appendChild(wrap);
}

function renderSecretWordQuestion(q) {
  const parts = q.text.split(q.secretWord);
  qText.innerHTML = '';
  parts.forEach((part, i) => {
    qText.appendChild(Object.assign(document.createElement('span'), { textContent: part }));
    if (i < parts.length - 1) {
      const secret = document.createElement('span');
      secret.className = 'q-secret';
      secret.textContent = q.secretWord;
      secret.title = 'Clique ici !';
      secret.addEventListener('click', () => {
        if (STATE.locked) return;
        sfxClick();
        secret.style.color = 'green';
        onCorrect();
      });
      qText.appendChild(secret);
    }
  });
}

function renderHidden(q) {
  specialZone.removeAttribute('hidden');
  const field = document.createElement('div');
  field.className = 'hidden-field';

  const used = new Set();
  function randPos() {
    let x, y;
    do { x = Math.random() * 55 + 5; y = Math.random() * 60 + 10; }
    while (used.has(`${Math.round(x/15)},${Math.round(y/20)}`));
    used.add(`${Math.round(x/15)},${Math.round(y/20)}`);
    return { x, y };
  }

  q.decoys.forEach(d => {
    const pos = randPos();
    const el = document.createElement('div');
    el.className = 'hidden-decoy';
    el.textContent = d;
    el.style.left = pos.x + '%';
    el.style.top  = pos.y + '%';
    el.addEventListener('click', () => { sfxClick(); onWrong(el); });
    field.appendChild(el);
  });

  const cpos = randPos();
  const correct = document.createElement('div');
  correct.className = 'hidden-correct';
  correct.textContent = q.correct_text;
  correct.style.cssText = `left:${cpos.x}%; top:${cpos.y}%; font-size:13px; font-family:var(--font-impact); letter-spacing:2px;`;
  correct.addEventListener('click', () => {
    if (STATE.locked) return;
    sfxClick();
    correct.style.color = 'green';
    onCorrect();
  });
  field.appendChild(correct);
  specialZone.appendChild(field);
}

function renderAvoid(q) {
  specialZone.removeAttribute('hidden');
  const field = document.createElement('div');
  field.className = 'avoid-field';

  const target = document.createElement('div');
  target.className = 'avoid-target';
  target.textContent = q.targetLabel || 'RÉPONSE';
  target.style.left = '20%';
  target.style.top  = '30%';

  [[10, null, 20, null], [8, null, null, 10]].forEach(([l, r, b, ri]) => {
    const trap = document.createElement('div');
    trap.className = 'avoid-trap';
    trap.textContent = q.trapLabel || 'FAUX';
    if (l  != null) trap.style.left   = l  + '%';
    if (ri != null) trap.style.right  = ri + '%';
    if (b  != null) trap.style.bottom = b  + '%';
    trap.addEventListener('click', () => { sfxClick(); onWrong(trap); });
    field.appendChild(trap);
  });

  field.addEventListener('mousemove', e => {
    if (STATE.locked) return;
    const rect = field.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const tx = parseFloat(target.style.left) / 100 * rect.width  + target.offsetWidth  / 2;
    const ty = parseFloat(target.style.top)  / 100 * rect.height + target.offsetHeight / 2;
    const dx = tx - mx, dy = ty - my;
    if (Math.sqrt(dx*dx + dy*dy) < 80) {
      let nx = Math.max(2, Math.min(75, parseFloat(target.style.left)  + (dx < 0 ? -8 : 8)));
      let ny = Math.max(2, Math.min(75, parseFloat(target.style.top)   + (dy < 0 ? -8 : 8)));
      target.style.left = nx + '%';
      target.style.top  = ny + '%';
    }
  });

  target.addEventListener('click', () => { if (!STATE.locked) { sfxClick(); onCorrect(); } });
  field.appendChild(target);
  specialZone.appendChild(field);
}

function renderWordCluster(q) {
  specialZone.removeAttribute('hidden');
  const cluster = document.createElement('div');
  cluster.className = 'word-cluster';
  const selected = new Set();

  [...q.words].sort(() => Math.random() - 0.5).forEach(word => {
    const btn = document.createElement('button');
    btn.className = 'wc-btn';
    btn.textContent = word;
    btn.addEventListener('click', () => {
      if (STATE.locked) return;
      sfxClick();
      if (!q.multi) { q.correct.includes(word) ? onCorrect() : onWrong(btn); return; }
      if (selected.has(word)) { selected.delete(word); btn.classList.remove('selected'); }
      else { selected.add(word); btn.classList.add('selected'); }
    });
    cluster.appendChild(btn);
  });

  if (q.multi) {
    const submitBtn = document.createElement('button');
    submitBtn.className = 'drag-submit';
    submitBtn.style.marginTop = '12px';
    submitBtn.textContent = 'VALIDER MA SÉLECTION';
    submitBtn.addEventListener('click', () => {
      if (STATE.locked) return;
      sfxClick();
      JSON.stringify([...selected].sort()) === JSON.stringify([...q.correct].sort()) ? onCorrect() : onWrong(null);
    });
    const wrap = document.createElement('div');
    wrap.style.width = '100%';
    wrap.appendChild(cluster);
    wrap.appendChild(submitBtn);
    specialZone.appendChild(wrap);
  } else {
    specialZone.appendChild(cluster);
  }
}

/* ──────────────────────────────
   EVENTS GLOBAUX
────────────────────────────── */
btnStart.addEventListener('click', () => {
  const hasSave = !!localStorage.getItem(SAVE_KEY);
  startGame(!hasSave);
});

btnIngameRestart.addEventListener('click', () => {
  clearProgress();
  resetState();
  showScreen('screen-title');
  updateTitleScreen();
});

$('btn-retry-go').addEventListener('click', () => {
  hideOverlay(overlayGO);
  startGame(true);
});

$('btn-retry-win').addEventListener('click', () => {
  hideOverlay(overlayWin);
  clearProgress();
  showScreen('screen-title');
  updateTitleScreen();
});

updateTitleScreen();
