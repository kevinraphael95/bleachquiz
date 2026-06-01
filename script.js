/* ═══════════════════════════════════════════════════
   THE IMPOSSIBLEACH QUIZ — script.js
   Logique du jeu — ne pas modifier pour ajouter des questions,
   éditer questions.js à la place.
   Dépend de : questions.js (chargé avant dans le HTML)
════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────
   ÉTAT DU JEU
────────────────────────────── */
const STATE = {
  currentQ: 0,
  lives: 3,
  skips: 5,
  score: 0,
  answeredCorrectly: 0,
  locked: false,
  skipsUsed: 0,
  wrongAnswers: 0,
};

/* ──────────────────────────────
   CANVAS BACKGROUND — particules manga
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
      color: Math.random() < 0.15 ? '#c8000a' : Math.random() < 0.1 ? '#d4a017' : '#f5f0e8'
    };
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) particles.push(makeParticle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
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

const screenTitle  = $('screen-title');
const screenGame   = $('screen-game');
const hudLives     = $('hud-lives');
const hudQnum      = $('hud-qnum');
const hudProg      = $('hud-prog');
const hudScore     = $('hud-score');
const hudSkips     = $('hud-skips');
const qNum         = $('q-num');
const qText        = $('q-text');
const answersGrid  = $('answers-grid');
const commentBar   = $('comment-bar');
const commentText  = $('comment-text');
const specialZone  = $('special-zone');
const toast        = $('toast');
const overlayGO    = $('overlay-gameover');
const overlayWin   = $('overlay-win');

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
   RESET & START
────────────────────────────── */
function resetState() {
  STATE.currentQ        = 0;
  STATE.lives           = 3;
  STATE.skips           = 5;
  STATE.score           = 0;
  STATE.answeredCorrectly = 0;
  STATE.locked          = false;
  STATE.skipsUsed       = 0;
  STATE.wrongAnswers    = 0;
}

function startGame() {
  resetState();
  showScreen('screen-game');
  loadQuestion();
}

/* ──────────────────────────────
   HUD
────────────────────────────── */
function updateHUD() {
  // Vies
  hudLives.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('div');
    heart.className = 'hud-heart' + (i >= STATE.lives ? ' dead' : '');
    heart.innerHTML = `<svg viewBox="0 0 24 24" fill="${i < STATE.lives ? '#c8000a' : '#333'}">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
    hudLives.appendChild(heart);
  }

  // Numéro question
  hudQnum.textContent = `Q.${STATE.currentQ + 1}`;

  // Barre de progression
  const pct = (STATE.currentQ / QUESTIONS.length) * 100;
  hudProg.style.width = pct + '%';
  hudProg.parentElement.setAttribute('aria-valuenow', pct);

  // Score
  hudScore.textContent = STATE.score + ' PTS';

  // Skips
  hudSkips.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const pip = document.createElement('div');
    pip.className = 'skip-pip' + (i < STATE.skips ? ' on' : '');
    pip.textContent = '⚡';
    pip.title = i < STATE.skips ? 'Utiliser un skip' : 'Skip épuisé';
    if (i < STATE.skips) pip.addEventListener('click', useSkip);
    hudSkips.appendChild(pip);
  }
}

/* ──────────────────────────────
   CHARGEMENT D'UNE QUESTION
────────────────────────────── */
function loadQuestion() {
  STATE.locked = false;
  commentBar.setAttribute('hidden', '');
  answersGrid.innerHTML = '';
  specialZone.innerHTML = '';
  specialZone.setAttribute('hidden', '');

  const q = QUESTIONS[STATE.currentQ];
  updateHUD();

  qNum.textContent = String(STATE.currentQ + 1).padStart(2, '0');

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
    case 'secret_word':  /* géré dans qText */   break;
  }

  // Anim entrée carte
  const card = $('question-card');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'screen-enter 0.35s var(--ease-snap) both';
}

/* ──────────────────────────────
   RÉPONSE CORRECTE
────────────────────────────── */
function onCorrect() {
  if (STATE.locked) return;
  STATE.locked = true;
  STATE.score += 100 + STATE.lives * 10;
  STATE.answeredCorrectly++;

  const q = QUESTIONS[STATE.currentQ];
  if (q.comment) {
    commentText.textContent = q.comment;
    commentBar.removeAttribute('hidden');
  }

  setTimeout(() => {
    STATE.currentQ++;
    if (STATE.currentQ >= QUESTIONS.length) showWin();
    else loadQuestion();
  }, q.comment ? 2000 : 900);
}

/* ──────────────────────────────
   MAUVAISE RÉPONSE
────────────────────────────── */
function onWrong(btn) {
  if (STATE.locked) return;
  STATE.locked = true;
  STATE.wrongAnswers++;

  if (btn) btn.classList.add('is-wrong');

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 900);

  STATE.lives--;
  updateHUD();

  if (STATE.lives <= 0) {
    setTimeout(showGameOver, 1100);
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
  STATE.skipsUsed++;
  STATE.currentQ++;
  if (STATE.currentQ >= QUESTIONS.length) showWin();
  else loadQuestion();
}

/* ──────────────────────────────
   GAME OVER
────────────────────────────── */
function showGameOver() {
  $('go-qnum').textContent = STATE.currentQ + 1;
  $('go-stats').innerHTML = `
    <div class="overlay-stat"><span class="overlay-stat-val">${STATE.answeredCorrectly}</span><span class="overlay-stat-lbl">BONNES</span></div>
    <div class="overlay-stat"><span class="overlay-stat-val">${STATE.wrongAnswers}</span><span class="overlay-stat-lbl">FAUTES</span></div>
    <div class="overlay-stat"><span class="overlay-stat-val">${STATE.score}</span><span class="overlay-stat-lbl">POINTS</span></div>
  `;
  showOverlay(overlayGO);
}

/* ──────────────────────────────
   VICTOIRE
────────────────────────────── */
function showWin() {
  const pct = Math.round((STATE.answeredCorrectly / QUESTIONS.length) * 100);
  let rank = 'HOLLOW EN FORMATION';
  if      (pct >= 95) rank = 'CAPITAINE — CLASSE S';
  else if (pct >= 80) rank = 'VICE-CAPITAINE';
  else if (pct >= 65) rank = 'SHINIGAMI CONFIRMÉ';
  else if (pct >= 50) rank = 'ACADÉMIE SHINIGAMI';

  $('win-stats').innerHTML = `
    <div class="overlay-stat"><span class="overlay-stat-val">${STATE.answeredCorrectly}</span><span class="overlay-stat-lbl">BONNES</span></div>
    <div class="overlay-stat"><span class="overlay-stat-val">${STATE.skipsUsed}</span><span class="overlay-stat-lbl">SKIPS</span></div>
    <div class="overlay-stat"><span class="overlay-stat-val">${STATE.score}</span><span class="overlay-stat-lbl">POINTS</span></div>
  `;
  $('win-rank').textContent = rank;
  showOverlay(overlayWin);
}

/* ══════════════════════════════════════════
   RENDERERS PAR TYPE
══════════════════════════════════════════ */

/* ── CLASSIC (4 boutons) ── */
function renderClassic(q) {
  q.answers.map((text, idx) => ({ text, idx })).forEach(({ text, idx }) => {
    const btn = document.createElement('button');
    btn.className = 'ans-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => {
      if (STATE.locked) return;
      if (idx === q.correct) { btn.classList.add('is-correct'); onCorrect(); }
      else onWrong(btn);
    });
    answersGrid.appendChild(btn);
  });
}

/* ── SLIDER ── */
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
    parseInt(ctrl.value) === q.correct ? onCorrect() : onWrong(null);
  });
}

/* ── COULEURS ── */
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
      i === q.correct ? onCorrect() : onWrong(swatch);
    });
    grid.appendChild(swatch);
  });
  specialZone.appendChild(grid);
}

/* ── DRAG & DROP ── */
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
      div.addEventListener('dragstart', () => {
        dragged = div;
        setTimeout(() => div.classList.add('dragging'), 0);
      });
      div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
        list.querySelectorAll('.drag-item').forEach(d => d.classList.remove('drag-over'));
        dragged = null;
      });
      div.addEventListener('dragover', e => {
        e.preventDefault();
        if (div !== dragged) div.classList.add('drag-over');
      });
      div.addEventListener('dragleave', () => div.classList.remove('drag-over'));
      div.addEventListener('drop', e => {
        e.preventDefault();
        div.classList.remove('drag-over');
        if (dragged && dragged !== div) {
          const fi = parseInt(dragged.dataset.idx);
          const ti = parseInt(div.dataset.idx);
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
    JSON.stringify(items) === JSON.stringify(q.correctOrder) ? onCorrect() : onWrong(null);
  });

  const wrap = document.createElement('div');
  wrap.appendChild(list);
  wrap.appendChild(btn);
  specialZone.appendChild(wrap);
}

/* ── MOT CACHÉ cliquable dans la question ── */
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
        secret.style.color = 'var(--green-ok)';
        onCorrect();
      });
      qText.appendChild(secret);
    }
  });
}

/* ── HIDDEN (trouver le bon parmi des faux) ── */
function renderHidden(q) {
  specialZone.removeAttribute('hidden');
  const field = document.createElement('div');
  field.className = 'hidden-field';

  const used = new Set();
  function randPos() {
    let x, y;
    do {
      x = Math.random() * 55 + 5;
      y = Math.random() * 60 + 10;
    } while (used.has(`${Math.round(x/15)},${Math.round(y/20)}`));
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
    el.addEventListener('click', () => onWrong(el));
    field.appendChild(el);
  });

  const cpos = randPos();
  const correct = document.createElement('div');
  correct.className = 'hidden-correct';
  correct.textContent = q.correct_text;
  correct.style.cssText = `left:${cpos.x}%; top:${cpos.y}%; font-size:13px; font-family:var(--font-impact); letter-spacing:2px;`;
  correct.addEventListener('click', () => {
    if (STATE.locked) return;
    correct.style.color = 'var(--green-ok)';
    onCorrect();
  });
  field.appendChild(correct);
  specialZone.appendChild(field);
}

/* ── AVOID (bouton qui fuit la souris) ── */
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
    trap.addEventListener('click', () => onWrong(trap));
    field.appendChild(trap);
  });

  field.addEventListener('mousemove', e => {
    if (STATE.locked) return;
    const rect = field.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
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

  target.addEventListener('click', () => { if (!STATE.locked) onCorrect(); });
  field.appendChild(target);
  specialZone.appendChild(field);
}

/* ── WORD CLUSTER (sélection simple ou multi) ── */
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
      if (!q.multi) {
        q.correct.includes(word) ? onCorrect() : onWrong(btn);
        return;
      }
      if (selected.has(word)) {
        selected.delete(word);
        btn.style.borderColor = '';
        btn.style.background  = '';
      } else {
        selected.add(word);
        btn.style.borderColor = 'var(--blue-reiatsu)';
        btn.style.background  = 'rgba(26,106,255,0.1)';
      }
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
      JSON.stringify([...selected].sort()) === JSON.stringify([...q.correct].sort())
        ? onCorrect() : onWrong(null);
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
$('btn-start').addEventListener('click', startGame);
$('btn-retry-go').addEventListener('click', () => { hideOverlay(overlayGO); startGame(); });
$('btn-retry-win').addEventListener('click', () => { hideOverlay(overlayWin); startGame(); });
