// Run after editing data.js:  node career-quiz/check.js
// Every role should win its own "best-case" row. If one does not, its topics overlap
// too much with the role that beat it.
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['data.js', 'score.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, f), 'utf8'), ctx);
const data = ctx.window.QUIZ, score = ctx.window.QUIZ_SCORE;
const n = data.questions.length;

const wins = Object.fromEntries(data.roles.map(r => [r.id, 0]));
const N = 20000;
for (let k = 0; k < N; k++) {
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 4));
  wins[score(data, a).ranked[0].role.id]++;
}
console.log('Random answers, share of best matches:');
for (const [id, w] of Object.entries(wins).sort((a, b) => b[1] - a[1])) console.log('  ' + id.padEnd(13) + (100 * w / N).toFixed(1) + '%');

let ok = true;
console.log('\nBest case per role (answers that fit it best), top three:');
for (const role of data.roles) {
  const a = data.questions.map(q => {
    if (q.degree) return q.options.length - 1;
    let best = 0, bw = -1;
    q.options.forEach((o, i) => {
      const w = Object.entries(o.t || {}).reduce((s, [k, v]) => s + v * (role.topics[k] || 0), 0);
      if (w > bw) { bw = w; best = i; }
    });
    return best;
  });
  const top = score(data, a).ranked;
  const wins = top[0].role.id === role.id;
  if (!wins) ok = false;
  console.log((wins ? '  ok   ' : '  FAIL ') + role.id.padEnd(13) + top.slice(0, 3).map(r => r.role.id).join(', '));
}
process.exit(ok ? 0 : 1);
