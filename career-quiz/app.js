(function () {
  'use strict';

  var data = window.QUIZ;
  var score = window.QUIZ_SCORE;
  var app = document.getElementById('app');
  var LETTERS = ['A', 'B', 'C', 'D'];
  var TOTAL = data.questions.length;
  var LEAVE_MS = 180;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Where the player is: 'home', a question index, or 'result'.
  var at = 'home';
  var answers = [];
  var busy = false;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function pad(n) { return n < 10 ? '0' + n : String(n); }

  // Move to a new place. The current content lifts away, then the new content rises
  // in from below (or drops in from above when going back).
  function go(next, back) {
    if (busy) return;
    var old = app.querySelector('.stepin');
    if (old && !calm) {
      busy = true;
      old.classList.add(back ? 'leave-down' : 'leave-up');
      setTimeout(function () { busy = false; show(next, back); }, LEAVE_MS);
    } else {
      show(next, back);
    }
  }

  function show(next, back) {
    at = next;
    if (at === 'home') renderHome();
    else if (at === 'result') renderResult();
    else renderQuestion(at, back);
    window.scrollTo(0, 0);
  }

  function restart() {
    answers = [];
    go('home');
  }

  function next() {
    if (typeof at !== 'number' || answers[at] === undefined) return;
    go(at + 1 < TOTAL ? at + 1 : 'result');
  }

  function prev() {
    if (typeof at !== 'number') return;
    go(at === 0 ? 'home' : at - 1, true);
  }

  function choose(oi) {
    if (typeof at !== 'number') return;
    answers[at] = oi;
    app.querySelectorAll('.opt').forEach(function (b, i) {
      b.classList.toggle('on', i === oi);
      b.setAttribute('aria-pressed', i === oi ? 'true' : 'false');
    });
    app.querySelector('.next').disabled = false;
  }

  function bar(right) {
    return '<header class="bar"><div class="wrap barin">' +
      '<a class="logo" href="../" aria-label="UConn Quantum Computing home"></a>' +
      '<div class="barright">' + right + '</div>' +
      '</div><div class="progress"><span></span></div></header>';
  }

  function renderHome() {
    app.innerHTML = '<div class="home">' +
      '<div class="wrap stepin rise">' +
        '<div class="lockup" role="img" aria-label="UConn Quantum Computing"></div>' +
        '<div class="eyebrow">Career match &middot; No quantum knowledge needed</div>' +
        '<h1>Which quantum career fits you?</h1>' +
        '<div class="sub">' + TOTAL + ' quick questions about what you enjoy. We match your answers to real jobs from a survey of 57 quantum companies.</div>' +
        '<button class="btn start">Start</button>' +
        '<div class="hint">Press <kbd>Enter</kbd> to start, <kbd>F</kbd> for full screen</div>' +
      '</div></div>';
    app.querySelector('.start').addEventListener('click', function () { go(0); });
  }

  function renderQuestion(qi, back) {
    var q = data.questions[qi];
    // The header and the Back / Next bar stay put between questions; only the question
    // itself is swapped, so it can rise in while the frame around it holds still.
    if (!app.querySelector('.qpage')) {
      app.innerHTML = '<div class="qpage">' + bar('<span class="count"></span>') +
        '<main class="wrap qmain"></main>' +
        '<footer class="qnavbar"><div class="wrap qnav">' +
          '<button class="linkbtn backbtn">&larr; Back</button>' +
          '<span class="hint">Press <kbd>A</kbd>&ndash;<kbd>D</kbd> to choose, <kbd>Enter</kbd> for next</span>' +
          '<button class="btn ink next"></button>' +
        '</div></footer></div>';
      app.querySelector('.next').addEventListener('click', next);
      app.querySelector('.backbtn').addEventListener('click', prev);
    }
    app.querySelector('.count').textContent = 'Question ' + pad(qi + 1) + ' of ' + TOTAL;
    app.querySelector('.progress span').style.width = (100 * qi / TOTAL) + '%';

    var picked = answers[qi];
    var nextBtn = app.querySelector('.next');
    nextBtn.disabled = picked === undefined;
    nextBtn.innerHTML = (qi === TOTAL - 1 ? 'See my results' : 'Next') + ' &rarr;';

    var opts = q.options.map(function (o, i) {
      return '<button class="opt' + (picked === i ? ' on' : '') + '" aria-pressed="' + (picked === i) + '" style="--i:' + i + '">' +
        '<span class="letter">' + LETTERS[i] + '</span><span>' + esc(o.label) + '</span></button>';
    }).join('');

    app.querySelector('.qmain').innerHTML = '<div class="stepin ' + (back ? 'drop' : 'rise') + '">' +
      '<h2>' + esc(q.q) + '</h2>' +
      '<div class="opts">' + opts + '</div>' +
      '</div>';

    app.querySelectorAll('.opt').forEach(function (el, i) { el.addEventListener('click', function () { choose(i); }); });
  }

  function renderResult() {
    var result = score(data, answers);
    var best = result.ranked[0], role = best.role;

    var rows = result.ranked.map(function (r, i) {
      var s = Math.round(r.score * 100);
      return '<li class="rrow' + (i === 0 ? ' top' : '') + '" style="--i:' + i + '">' +
        '<span class="rn">' + pad(i + 1) + '</span>' +
        '<div class="rinfo"><div class="rt">' + esc(r.role.name) + '</div>' +
          '<div class="rd">' + esc(r.role.oneLine) + '</div>' +
          (r.degreeTag ? '<div class="rnote">' + esc(r.degreeTag) + '</div>' : '') +
        '</div>' +
        // A ring filled in proportion to the score, with the number in the middle.
        // pathLength 100 makes the stroke's dash lengths read directly as percent.
        '<div class="ring" role="img" aria-label="Match score ' + s + ' out of 100">' +
          '<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="rtrack" cx="22" cy="22" r="19"/>' +
          '<circle class="rfill" cx="22" cy="22" r="19" pathLength="100" data-s="' + s + '"/></svg>' +
          '<span class="rs">' + s + '</span></div>' +
        '</li>';
    }).join('');

    app.innerHTML = '<div class="rpage">' +
      bar('<button class="btn ink small again">Play again</button>') +
      '<div class="stepin rise">' +
        '<section class="hero"><div class="wrap">' +
          '<div class="eyebrow">Your best match &middot; ' + Math.round(best.score * 100) + ' / 100</div>' +
          '<h1>' + esc(role.name) + '</h1>' +
          '<div class="sub">' + esc(role.oneLine) + '</div>' +
          '<button class="linkbtn tolist">See all ' + result.ranked.length + ' roles, ranked &darr;</button>' +
        '</div></section>' +
        '<main class="wrap">' +
          '<section class="block detail">' +
            '<div class="rows">' +
              row('You would work on', esc(role.workOn)) +
              row('Companies ask for', esc(role.ask) + '<span class="from">' + esc(role.askFrom) + '</span>' +
                (best.degreeNote ? '<span class="note">' + esc(best.degreeNote) + '</span>' : '')) +
              row('Your first step', esc(role.firstStep)) +
            '</div>' +
            '<div class="side"><div class="lab">Where you lean</div>' + triangle(result.lean) + '</div>' +
          '</section>' +
          '<section class="block ranking" id="ranking">' +
            '<div class="lab">All ' + result.ranked.length + ' roles, ranked</div>' +
            '<div class="rhelp">Match score: how closely your answers line up with each role, out of 100. It is not a probability.</div>' +
            '<ol class="rank">' + rows + '</ol>' +
          '</section>' +
          '<footer class="foot">A starting point, not a prediction. Roles and degrees: Hughes et al., <em>Assessing the Needs of the Quantum Industry</em>, IEEE Trans. Educ. 2022. ' +
            'Interest profiles: O*NET 30.0 by USDOL/ETA, used under CC BY 4.0. Find us at <strong>uconnquantum.org</strong>. Press <kbd>R</kbd> to play again.</footer>' +
        '</main>' +
      '</div></div>';

    app.querySelector('.progress span').style.width = '100%';
    app.querySelector('.again').addEventListener('click', restart);
    app.querySelector('.tolist').addEventListener('click', function () {
      document.getElementById('ranking').scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
    });
    // Fill the rings after first paint, so they animate from empty.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        app.querySelectorAll('.rfill').forEach(function (el) { el.style.strokeDashoffset = 100 - Number(el.getAttribute('data-s')); });
      });
    });
  }

  function row(k, v) {
    return '<div class="row"><div class="rk">' + k + '</div><div class="rv">' + v + '</div></div>';
  }

  // Understand it / Build it / Use it, after the three proficiency areas of the
  // European Competence Framework for Quantum Technologies. The dot is a weighted
  // average of the corners, weighted by the player's lean.
  function triangle(lean) {
    var U = [210, 48], B = [44, 262], S = [376, 262];
    var x = lean[0] * U[0] + lean[1] * B[0] + lean[2] * S[0];
    var y = lean[0] * U[1] + lean[1] * B[1] + lean[2] * S[1];
    // Pull the dot a little toward the center so it never sits on a corner label.
    var cx = (U[0] + B[0] + S[0]) / 3, cy = (U[1] + B[1] + S[1]) / 3;
    x = cx + 0.86 * (x - cx);
    y = cy + 0.86 * (y - cy);
    function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
    function line(a, b) { return '<line class="tri-grid" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>'; }
    return '<svg viewBox="-20 0 460 322" role="img" aria-label="Where you lean between understanding, building and using quantum technology">' +
      '<polygon class="tri" points="' + [U, B, S].map(function (p) { return p.join(','); }).join(' ') + '"/>' +
      line(U, mid(B, S)) + line(B, mid(U, S)) + line(S, mid(U, B)) +
      '<text class="tri-lab" x="210" y="20">Understand it</text><text class="tri-sub" x="210" y="36">the physics and math</text>' +
      '<text class="tri-lab" x="64" y="294">Build it</text><text class="tri-sub" x="64" y="311">hardware and software</text>' +
      '<text class="tri-lab" x="356" y="294">Use it</text><text class="tri-sub" x="356" y="311">applications and business</text>' +
      '<circle class="tri-ring" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="15"/>' +
      '<circle class="tri-dot" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="7"/>' +
      '</svg>';
  }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key.toLowerCase();
    // On a question, Enter always means Next, even when the answer just clicked still
    // has focus. Without this the browser re-clicks that answer and nothing advances.
    // The Back button keeps its own Enter.
    if (k === 'enter' && typeof at === 'number' && !(e.target.classList && e.target.classList.contains('backbtn'))) {
      e.preventDefault();
      next();
      return;
    }

    // A focused button already acts on Enter and Space; do not act twice.
    if ((k === 'enter' || k === ' ') && e.target.tagName === 'BUTTON') return;

    if (k === 'f') {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
      return;
    }

    if (at === 'home') {
      if (k === 'enter' || k === 'arrowright') { e.preventDefault(); go(0); }
      return;
    }
    if (at === 'result') {
      if (k === 'r') restart();
      return;
    }
    var oi = LETTERS.indexOf(e.key.toUpperCase());
    if (oi < 0 && k >= '1' && k <= '4') oi = Number(k) - 1;
    if (oi >= 0) { choose(oi); return; }
    if (k === 'enter' || k === 'arrowright') { e.preventDefault(); next(); return; }
    if (k === 'arrowleft' || k === 'backspace') { e.preventDefault(); prev(); }
  });

  show('home');
})();
