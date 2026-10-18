/*
  Scoring. Pure functions, no DOM, so it can be checked from the command line
  (see README.md).

  A role's match = 0.4 x interest similarity + 0.6 x topic similarity.
  Interest similarity compares the player's Holland profile with the role's O*NET
  profile. Both are centered first: every technical job scores high on Investigative,
  so raw scores would make every role look alike. Topics carry more weight because
  they are what tells a chemist from a physicist, who share an interest profile.
*/
(function () {
  'use strict';

  var TYPES = ['R', 'I', 'A', 'S', 'E', 'C'];
  var TOPICS = ['code', 'math', 'physics', 'chem', 'electronics', 'handson', 'data', 'people', 'business', 'security'];
  var W_INTEREST = 0.4;
  var W_TOPIC = 0.6;
  // Match drops a little when the survey's degrees for a role all sit above the plan.
  var DEGREE_FACTOR = 0.9;
  var RANK = { A: 0, B: 1, M: 2, P: 3 };

  function cosine(a, b) {
    var dot = 0, na = 0, nb = 0;
    for (var i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    return na && nb ? dot / Math.sqrt(na * nb) : 0;
  }

  function center(v) {
    var m = v.reduce(function (s, x) { return s + x; }, 0) / v.length;
    return v.map(function (x) { return x - m; });
  }

  function topicVector(obj) {
    return TOPICS.map(function (k) { return (obj && obj[k]) || 0; });
  }

  // Role interest profiles, each dimension centered on the average across all roles.
  function roleInterests(roles) {
    var mean = TYPES.map(function (_, i) {
      return roles.reduce(function (s, r) { return s + r.onet.v[i]; }, 0) / roles.length;
    });
    return roles.map(function (r) { return r.onet.v.map(function (x, i) { return x - mean[i]; }); });
  }

  // answers: array of option indexes, one per question (undefined if skipped).
  function score(data, answers) {
    var interest = TYPES.map(function () { return 0; });
    var topics = TOPICS.map(function () { return 0; });
    var level = null;

    data.questions.forEach(function (q, qi) {
      var opt = q.options[answers[qi]];
      if (!opt) return;
      if (q.degree) { level = opt.level; return; }
      TYPES.forEach(function (k, i) { interest[i] += (opt.r && opt.r[k]) || 0; });
      topics = topics.map(function (x, i) { return x + topicVector(opt.t)[i]; });
    });

    var player = center(interest);
    var roleInt = roleInterests(data.roles);

    var results = data.roles.map(function (role, ri) {
      var roleTopics = topicVector(role.topics);
      var interestSim = (cosine(player, roleInt[ri]) + 1) / 2;
      var topicSim = cosine(topics, roleTopics);
      var s = W_INTEREST * interestSim + W_TOPIC * topicSim;

      var degreeNote = null, degreeTag = null;
      if (level && role.levels.length) {
        var lowest = Math.min.apply(null, role.levels.map(function (l) { return RANK[l]; }));
        if (lowest > RANK[level]) {
          s *= DEGREE_FACTOR;
          degreeNote = lowest === RANK.P
            ? 'Companies in the survey mostly asked for a PhD for this one.'
            : 'Companies in the survey mostly asked for a Master’s or more for this one.';
          // The same fact, short enough for the ranked list.
          degreeTag = lowest === RANK.P ? 'Usually a PhD' : 'Usually a Master’s or more';
        }
      }

      return { role: role, score: s, degreeNote: degreeNote, degreeTag: degreeTag };
    });

    results.sort(function (a, b) { return b.score - a.score; });

    // Where the player leans, weighted sharply toward their best matches.
    var lean = [0, 0, 0], total = 0;
    results.forEach(function (r) {
      var w = Math.pow(r.score, 8);
      total += w;
      r.role.lean.forEach(function (x, i) { lean[i] += w * x; });
    });
    lean = lean.map(function (x) { return total ? x / total : 1 / 3; });

    return { ranked: results, lean: lean };
  }

  (typeof window !== 'undefined' ? window : globalThis).QUIZ_SCORE = score;
})();
