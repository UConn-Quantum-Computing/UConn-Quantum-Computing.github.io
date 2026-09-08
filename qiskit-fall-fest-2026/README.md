# Qiskit Fall Fest Connecticut 2026 — event site

Static site for the UConn Quantum Computing event, 15–17 October 2026. Plain HTML and CSS,
no build step, no dependencies. Deploys to GitHub Pages as-is.

```
index.html      the event page — one page, anchored sections
styles.css      design tokens + layout. Light only, deliberately.
assets/         images, logos, favicons, and team/ for organizer photos
```

---

## Where this sits

This folder is **part of the club site repo**, not a repo of its own. It is served at
`https://uconnquantum.org/qiskit-fall-fest-2026/` purely because of its folder name — the
repo is the organization site, so the directory tree is the URL structure and a folder is a
path. Nothing here needs its own Pages settings, its own domain, or its own deploy.

There is no deploy step for this folder. Merging to `main` publishes the whole site,
this page included. See the repo [README](../README.md) for how that works and
[CONTRIBUTING](../CONTRIBUTING.md) for the workflow.

Preview locally from the **repo root**, not this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/qiskit-fall-fest-2026/>. Serving this folder directly also
works for a quick look, but it puts the page at `/` rather than at a subpath, so it will not
catch the mistake below.

### Why the subpath works, and how to break it

Every local reference in `index.html` is relative (`styles.css`, and the files under
`assets/`), and the club logo is inlined as an SVG `<symbol>` rather than fetched. So the
page does not care what depth it is served from.

Keep it that way: **never add a link or asset path starting with `/`**. It would break this
page the moment it moved, and it breaks PR previews today — those are served from
`/pr-preview/pr-<number>/`, so an absolute path escapes the preview and quietly loads the
production file instead, making a broken branch look fine.

The two absolute URLs are `og:image` and `canonical`, which have to be absolute by spec.
Update those if the path ever changes.

---

## Before the site goes public

Search the source for `REPLACE`, `TODO` and `[` — every placeholder is marked. In order of urgency:

- [ ] **Club facts** — the `#about` section is still marked DRAFT COPY (see the `TODO` comment
      in `index.html`). The meeting day and time placeholder has been filled in, but the list
      items still need checking against what the club actually does. This is what the page
      leads with, so it cannot ship with guesses in it.
- [x] **Organizer photos** — all five cards are complete: name, role, major, class year,
      LinkedIn URL and photo. Photos live in `assets/team/` at 3:4 portrait, 600x800, EXIF
      stripped. The `.ph` grey placeholder rule is still in the stylesheet on purpose: if an
      organizer would rather not have a photo published, delete their `<img>` and restore
      `<div class="ph">PHOTO</div>`. The grid is set to five columns, so changing the number
      of organizers means changing `.people` in the stylesheet too.
      Each card is name, role, major and class year only, deliberately: at five across there
      is not room for more.
- [x] **Registration URL** — live, Google Forms:
      `https://docs.google.com/forms/d/e/1FAIpQLSd5UsDtJWufVUV34c0vvgdPC0G0bPgtnEsLFW40ttpi8cHqow/viewform`
      It is linked from the nav button and the `#register` band; the hero button scrolls to
      that band rather than leaving the page, so the form URL appears in exactly two places.
      The `.btn-soon`, `.nav-soon` and `.btn-waiting` pre-launch rules have been deleted from
      the stylesheet along with the spans that used them.
      The form carries a photo release, an under-18 question, a per-day attendance question
      covering in person and online, and a link to the code of conduct.
- [ ] **Club logo** — `assets/logo-uconn-quantum.svg` is the real lockup, converted from
      `UConn-Quantum Computing.eps` and reversed for light backgrounds. Ask UConn Communications
      for the official reversed version and swap it in; recoloring is technically an alteration.
      `logo-uconn-quantum-original.svg` is the untouched white-on-navy original.
- [ ] **Sponsor logos** — the marquee strip under the hero holds the club logo and the IBM
      Quantum wordmark, nothing else. The placeholder `Sponsor slot` chips were removed along
      with their `.mq-item .slot` rule; re-add a logo as `<svg><use>` or `<img>`, not a
      placeholder, once a sponsor is confirmed.
      Two rules for editing the track: it repeats the same group **three times** and slides by
      exactly one third, so all three groups must stay identical or the loop visibly jumps; and
      each group currently lists the two logos **twice**, because one pair per group is narrower
      than a wide viewport and the loop would show a gap. Once there are four or more distinct
      logos, drop back to listing each once per group.
- [ ] **IBM marks approval** — both IBM marks are live in the strip and **neither is cleared**.
      The kickoff deck allows them only "as long as approved by event staff prior", so this
      needs sign-off from Serena Godwin or the Fall Fest team, ideally alongside the
      September 8 Website Information form. Pull both if they decline.
      - `assets/logo-ibm-quantum.png` — the IBM Quantum wordmark. Extracted unmodified from
        slide 8 of `Qiskit_Fall-Fest_2026_Kickoff.pdf`: the deck's own 1790x296 raster plus its
        alpha mask, recombined into an RGBA PNG and trimmed of fully transparent margin only.
      - `assets/logo-qiskit-mark.svg` — the Qiskit globe pictogram, from the same slide, this
        time as vector paths lifted straight out of the PDF. Inlined as the `#qiskit-mark`
        symbol so it follows `currentColor`. It sits in the **nav**, beside the club lockup
        and separated by the `.nav-rule` hairline. That rule is load-bearing: it is what
        makes the pair read as two adjacent logos rather than one new combined logotype,
        which IBM's rules forbid. Do not close the gap or remove the rule.
      Neither has been redrawn. If IBM supplies official files, prefer them. Never recolor
      either mark, and never put them on the navy band.
      The **IBM 8-bar logo is forbidden outright** — it needs a contract we do not have.
- [x] **Contact email** — `uconnquantum@gmail.com`, in the footer here and on the root page.
      A club inbox rather than an organizer's own address, so it outlives any one person.
      Make sure at least two organizers hold the password.
- [x] **Social and join links** — Instagram, LinkedIn and UConntact are live in all four
      places: the link cards in `#about`, the register band, and the footer here and on the
      root page. No `href="#"` remains on either page.
- [ ] **Venue** — the page says "UConn Storrs and online" and the hero map points at the
      campus, which is all that is promised so far. A building and room still need announcing,
      and the registration confirmation is the natural place for it.
- [x] **`assets/og-image.png`** — in place at 1200x630. `og:url`, `og:image` and `canonical`
      all point at the uconnquantum.org path.
- [ ] **Speakers** — no section yet. Add one once names are confirmed; the `.people` grid is
      the right component to reuse.

### Registration requirements (from IBM)

The registration form is external (Google Forms is fine). IBM requires it to include:

1. **A photo release** — participants agree to be photographed.
2. **A question confirming the person can attend in person** in the Storrs area — required
   because this event is open to the public rather than restricted to UConn students.

Note that requirement 2 was written for a fully in-person event. Ours is hybrid: Thursday and
Friday run in person and online, Saturday's hackathon is in person only. So the question now
applies to Saturday, and the form needs to ask **which days each person is attending and in
which format** — otherwise we cannot size the room, the food, or the stream. Worth confirming
the hybrid format with Fall Fest event staff at the same time as the logo approval.

Worth also collecting, because these are the numbers we report afterwards: university, major,
whether this is their first quantum event, and dietary requirements.


### The map

The hero embeds Google Maps via the Maps Embed API. That API is free with unlimited usage,
but it needs a key, and the key is visible in the page source. That is expected for a
client-side embed and is safe only because the key is restricted two ways in Google Cloud
Console:

- **Application restrictions > Websites:** `uconnquantum.org/*` and `*.uconnquantum.org/*`
- **API restrictions:** Maps Embed API only

Verified: 200 from uconnquantum.org, 403 from any other referrer and from no referrer.

Two consequences worth knowing:

- **The map will not load on `localhost`** unless `localhost:*/*` is added to the referrer
  list. Everything else on the page previews fine without it.
- **If the domain changes, the map goes blank** until the referrer list is updated.

If a billable API (Geocoding, Places, Directions) is ever enabled on that Cloud project,
rotate the key first. It has been shared in plain text.

### Branding rules

**IBM**

- **May use:** the words "Qiskit Fall Fest", and the *IBM Quantum* logotype and Quantum globe
  mark, unmodified, and only with prior approval from Fall Fest event staff.
- **Must not use:** the IBM 8-bar logo. It requires a contract we don't have.
- No stacking, rotating, recoloring, outlining, or adding effects to any IBM mark. Never
  "Quantum" without "IBM", never "IBM Q".

**UConn** ([policy](https://uconn.edu/wp-content/uploads/sites/14/2024/04/Guidelines-for-Use-of-University-Logos-and-Trademarks-by-RSOs-2024.pdf))

- Registered student organizations **may** use UConn trademarks together with the organization's
  name, because that correctly implies a University connection.
- The **Husky Dog logo is not permitted** for student organizations, old or new.
- A custom club logo **may not borrow any element** of current or past UConn marks, including
  Husky Pride designs and the oak leaf, and may not imitate a husky.
- Official marks cannot be altered. A custom RSO wordmark needs **written approval** from Brand
  Partnerships and Trademark Management: licensing@uconn.edu.

Since IBM Quantum will promote this page on their site and LinkedIn, get the logo cleared before
launch rather than after.

The footer disclaimer is there for a reason. Keep it.

---

## Design notes

Visual language deliberately follows **IBM Carbon**, since this is an IBM Quantum program:
sharp corners (there is no `border-radius` anywhere and that is on purpose), IBM Plex, thin
1px rules, lots of whitespace.

The palette comes from UConn's own brand. Navy `#000E2F` is the ink and "Husky Eyes"
`#A4C8E1` frames the partner strip. There is no accent hue: buttons, headline emphasis and
interactive states all use the ink itself, inverting to white on the navy register band.
Links read as links by their underline rather than by color. Solid fills, no gradients.

**Light only, on purpose.** Every image on the page has a light background, so on a dark
ground they read as glowing rectangles. The page paints its own colors and does not follow
the system theme. Every color is a token in `:root`; don't hardcode hex values in component
rules.

Copy is American English throughout. Headings are short titles, never full sentences.
Eyebrow labels are capped at three on the whole page.

## Reference — what other Fall Fest sites do

Reviewed while building this. Common pattern: hero with dates and a registration CTA, about,
day-by-day schedule, tracks, speakers with photos, partners, organizing team, contact.

- [University of Stuttgart 2025](https://qiskit-fall-fest-bw.com/) — closest match to our format;
  three days, and has a useful "software requirements" section we adapted into *What to bring*
- [UTokyo 2025](https://qiskit-fall-fest-ut.github.io/utokyo-qff-2025/en/) — clear eligibility and
  capacity language, states "Qiskit experience: not required" prominently
- [IISc 2025](https://iisc-qiskit-fallfest2025.github.io/qff2025/) — strong schedule and daily
  resources; certificate lookup by email after the event
- [IIIT Srikakulam](https://quantum.rgukt.in/hackathon) — the largest 2025 Fall Fest

Two things ours does that theirs generally don't: leads with beginners rather than the hackathon,
and names a local challenge track. Both are deliberate.
