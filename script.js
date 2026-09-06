'use strict';

/* ═══════════════════════════════════════
   MOTEUR DE JEU
═══════════════════════════════════════ */
const STATE = { questions:[], index:0, lives:3, correctCount:0, locked:false };

const $ = id => document.getElementById(id);
const screenStart = $('screen-start');
const screenQuiz  = $('screen-quiz');
const screenFail  = $('screen-fail');
const screenWin   = $('screen-win');
const livesDisplay = $('lives-display');

function renderLives(){
  livesDisplay.innerHTML = '';
  for(let i=0;i<3;i++){
    const span = document.createElement('span');
    span.className = 'life' + (i < STATE.lives ? '' : ' lost');
    span.textContent = '命';
    livesDisplay.appendChild(span);
  }
}

function showOnly(el){
  [screenStart, screenQuiz, screenFail, screenWin].forEach(s => {
    s.style.display = 'none';
    s.classList.remove('show');
  });
  el.style.display = 'block';
  el.classList.add('show');
}

function startQuiz(){
  STATE.questions = buildQuizSet();
  STATE.index = 0;
  STATE.lives = 3;
  STATE.correctCount = 0;
  renderLives();
  showOnly(screenQuiz);
  loadQuestion();
}

function loadQuestion(){
  STATE.locked = false;
  const q = STATE.questions[STATE.index];
  const total = STATE.questions.length;

  $('q-count').textContent = `QUESTION ${STATE.index+1} / ${total}`;
  $('q-score').textContent = `${STATE.correctCount} CORRECTE${STATE.correctCount>1?'S':''}`;
  $('q-progress').style.width = `${(STATE.index/total)*100}%`;
  $('q-text').textContent = q.text;
  $('q-explain').classList.remove('show');
  $('q-explain').textContent = '';
  $('next-row').classList.remove('show');

  const body = $('q-body');
  body.innerHTML = '';
  $('q-hint').style.display = 'none';

  if(q.type === 'mc'){
    const wrap = document.createElement('div');
    wrap.className = 'answers';
    q.answers.forEach((ans, i) => {
      const btn = document.createElement('button');
      btn.className = 'ans-btn';
      btn.textContent = ans;
      btn.addEventListener('click', () => handleMcAnswer(i, q, btn, wrap));
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
  }

  if(q.type === 'num'){
    $('q-hint').style.display = 'block';
    $('q-hint').textContent = `Choisis un nombre entre ${q.min} et ${q.max}.`;
    const row = document.createElement('div');
    row.className = 'num-row';
    const input = document.createElement('input');
    input.type = 'range'; input.min = q.min; input.max = q.max; input.step = 1; input.value = Math.round((q.min+q.max)/2);
    const val = document.createElement('div');
    val.className = 'num-value';
    val.textContent = input.value;
    input.addEventListener('input', () => val.textContent = input.value);
    row.appendChild(input); row.appendChild(val);
    body.appendChild(row);

    const submitRow = document.createElement('div');
    submitRow.className = 'submit-row';
    const btn = document.createElement('button');
    btn.className = 'btn-submit';
    btn.textContent = 'VALIDER';
    btn.addEventListener('click', () => {
      if(STATE.locked) return;
      handleFinalAnswer(parseInt(input.value) === q.correct, q);
      input.disabled = true; btn.disabled = true;
    });
    submitRow.appendChild(btn);
    body.appendChild(submitRow);
  }

  if(q.type === 'multi'){
    const selected = new Set();
    const wrap = document.createElement('div');
    wrap.className = 'answers';
    shuffle(q.options).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'ans-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if(STATE.locked) return;
        if(selected.has(opt)){ selected.delete(opt); btn.classList.remove('multi-selected'); }
        else { selected.add(opt); btn.classList.add('multi-selected'); }
      });
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);

    const submitRow = document.createElement('div');
    submitRow.className = 'submit-row';
    const btn = document.createElement('button');
    btn.className = 'btn-submit';
    btn.textContent = 'VALIDER MA SÉLECTION';
    btn.addEventListener('click', () => {
      if(STATE.locked) return;
      const ok = JSON.stringify([...selected].sort()) === JSON.stringify([...q.correct].sort());
      handleFinalAnswer(ok, q);
      btn.disabled = true;
      wrap.querySelectorAll('.ans-btn').forEach(b => b.disabled = true);
    });
    submitRow.appendChild(btn);
    body.appendChild(submitRow);
  }
}

function handleMcAnswer(i, q, btn, wrap){
  if(STATE.locked) return;
  STATE.locked = true;
  wrap.querySelectorAll('.ans-btn').forEach((b, idx) => {
    b.disabled = true;
    if(idx === q.correct) b.classList.add('correct');
  });
  if(i !== q.correct) btn.classList.add('wrong');
  finishAnswer(i === q.correct, q);
}

function handleFinalAnswer(isCorrect, q){
  STATE.locked = true;
  finishAnswer(isCorrect, q);
}

function finishAnswer(isCorrect, q){
  if(isCorrect){
    STATE.correctCount++;
  } else {
    STATE.lives--;
    renderLives();
  }
  const explain = $('q-explain');
  explain.textContent = (isCorrect ? '✓ Exact. ' : '✗ Faux. ') + q.explain;
  explain.classList.add('show');

  if(STATE.lives <= 0){
    $('next-row').classList.remove('show');
    setTimeout(endFail, 900);
    return;
  }
  $('next-row').classList.add('show');
}

function endFail(){
  $('fail-qnum').textContent = STATE.index + 1;
  $('fail-score').textContent = STATE.correctCount;
  showOnly(screenFail);
}

function endWin(){
  $('win-total').textContent = STATE.questions.length;
  showOnly(screenWin);
}

$('btn-start').addEventListener('click', startQuiz);
$('btn-next').addEventListener('click', () => {
  STATE.index++;
  if(STATE.index >= STATE.questions.length){
    endWin();
  } else {
    loadQuestion();
  }
});
$('btn-retry-fail').addEventListener('click', startQuiz);
$('btn-retry-win').addEventListener('click', startQuiz);

renderLives();
