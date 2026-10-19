# Quantum Career Match

Live at <https://uconnquantum.org/career-quiz/>. A career questionnaire for the
website, club meetings and tabling. The audience is **beginners**: nobody needs to know
any quantum to answer. There are 16 questions about what people enjoy, then a results
page with the best match explained in plain language and **all 11 roles ranked by
match score**.

It started in the club's slides repo, where meeting 2 previewed it. **This folder is
now the copy that is live**, so make changes here.

## Run it

From the repo root, as for every page (see [CONTRIBUTING.md](../CONTRIBUTING.md)):

```bash
python3 -m http.server 8000     # then http://localhost:8000/career-quiz/
```

Press **F** for full screen. Everything runs from the keyboard, so a presenter can
drive it from a laptop:

| Screen | Keys |
|---|---|
| Start | `Enter` to begin |
| Question | `A`–`D` or `1`–`4` to choose, `Enter` or `→` for next, `←` back |
| Results | scroll as normal, `R` to play again |

Picking an answer only highlights it. **Next** stays disabled until something is
picked, so nobody skips a question by accident. Each new question rises in from below,
and going back brings the previous one down from above. Answers are kept when going
back.

The results page scrolls: the best match and its details first, then every role
ranked, each with its match score out of 100 inside a navy ring filled to match. The "See all 11 roles" link in
the header jumps to the list, which on a projector sits below the first screen.

It is a responsive page, not a fixed slide. Sizes are in `rem` and the root size
grows with the window, so it reads on a projector and still fits a phone. Motion is
switched off for anyone who has "reduce motion" set. It uses IBM Plex from Google
Fonts. Offline, it falls back to the system font and still works.

**To play as a room:** one volunteer answers, or the presenter reads each question,
takes a show of hands and presses the most popular letter. Either way, one result
per run.

## Files

| File | What it is |
|---|---|
| `data.js` | Every word on screen: questions and roles. **Edit this one.** |
| `score.js` | The matching math. Pure functions, no DOM. |
| `app.js` | Screens and keyboard handling. Scripts load as `?v=N` too; bump it when one changes. |
| `styles.css` | This page's own stylesheet, in the club's navy-and-white tokens. Bump `?v=` in `index.html` when it changes. |
| `check.js` | `node career-quiz/check.js`. Run after editing `data.js`. |
| `assets/` | The two logo variants and the site favicons, copied so the page stands alone. |

## How the matching works

Each answer quietly adds points to two profiles:

1. **Interests**, on Holland's six types (hands-on, investigative, artistic, social,
   enterprising, organized).
2. **Topics**: code, math, physics, chemistry, electronics, hands-on, data, people,
   business, security.

Each role is compared on both: interests against the **O*NET interest scores of the
nearest ordinary occupation**, and topics against the role's topic weights. The match
is 40% interests and 60% topics. Topics weigh more because a chemist and a physicist
have almost the same interest profile, and only the topics separate them. Both
interest profiles are centered before comparing, since every technical job scores
high on "investigative" and would otherwise look alike.

If someone plans a Bachelor's and every degree the survey lists for a role is higher,
the match drops by 10% and the result says so. It never hides a role.

It uses no machine learning and no training data. Every score can be traced back to
the answers given and the published data behind each role.

## Where each number comes from

| What | Source | Status |
|---|---|---|
| The roles, and "Companies ask for" | Hughes et al., [*Assessing the Needs of the Quantum Industry*](https://arxiv.org/abs/2109.03601), IEEE Trans. Educ. 65(4), 2022. Table I, from a survey of 57 companies. | Sourced |
| Role interest scores (`onet.v`) | [O*NET 30.0](https://www.onetcenter.org/database.html) `Interests.txt`, occupational interest scores (scale 1 to 7), by USDOL/ETA, used under CC BY 4.0. Occupation codes are in `data.js`. | Sourced |
| Understand / Build / Use triangle | The three proficiency areas of the [European Competence Framework for Quantum Technologies](https://qtedu.eu/european-competence-framework-quantum-technologies) v2.5 (concepts, engineering, applications and strategy), relabeled for beginners. | Sourced idea |
| Which quantum role maps to which O*NET job | Club judgment | Check |
| Topic weights, `lean` values, the answer scoring | Club judgment, tuned so every role wins for the player it fits (`check.js`) | Check |
| The 40/60 blend, the 10% degree adjustment | Club judgment | Check |

**It is a conversation starter, not a validated assessment**, and the screen says so.
No published data follows quantum career outcomes, so nothing here can predict one.
To test it properly, have people already working in quantum take it and see whether
they land on their own role.

### Roles not in the survey

- **Post-quantum security engineer** comes from meeting 2's roles slide, not from
  Hughes et al. The result screen says so.
- **Product and business lead**: the survey counted sales and marketing hires but
  lists no preferred degree for them. The result screen says that as well.

### Facts to recheck

- The business role quotes McKinsey's "up to $100 billion within a decade", the figure
  meeting 2 uses. Meeting 2's notes flag its McKinsey figures as unverified.

## Editing

- **A question** needs exactly four options, each with `r` (interest points) and `t`
  (topic points). Keep them free of quantum jargon: the terms belong on the results
  screen, where they are explained.
- **A role** needs every field shown in `data.js`. Take `onet.v` from O*NET's
  `Interests.txt` for the closest occupation, not from memory.
- After any change, run `node career-quiz/check.js`. It exits non-zero if some role
  can no longer win for the player it fits.
