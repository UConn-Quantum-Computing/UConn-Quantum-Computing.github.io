# Qiskit Fall Fest Connecticut 2026 — event site

Static site for the UConn Quantum Computing event, 15–17 October 2026. Plain HTML and CSS,
no build step, no dependencies. Deploys to GitHub Pages as-is.

```
index.html      the whole site — one page, anchored sections
styles.css      design tokens + layout. Light and dark themes.
assets/         put og-image.png and any partner logos here
.nojekyll       stops GitHub Pages running Jekyll over the files
```

---

## Deploy to uconnquantum.org/qiskit-fall-fest-2026

The page lives at a **subpath**, which on GitHub Pages means two repos. There is no way to put a
project at a subpath without a site at the root of the domain, so the root repo has to exist even
if it only holds a placeholder for now.

### 1. The root repo (once)

Create a repo named exactly `<username>.github.io`, where `<username>` is the GitHub account or
organization that will own this. Put something at the root, even a one-page club landing.
Then **Settings > Pages > Custom domain**: enter `uconnquantum.org` and save. That writes a
`CNAME` file into that repo.

### 2. DNS (once)

At the registrar for uconnquantum.org, add four `A` records for the apex, all host `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Plus a `CNAME` record: host `www` -> `<username>.github.io`.
Back in Settings > Pages, tick **Enforce HTTPS** once the certificate provisions (can take an
hour or so). Propagation is usually minutes but allow up to 24 hours.

### 3. This repo

```bash
cd QFF-26-Website
git init && git branch -M main
git add . && git commit -m "Fall Fest CT 2026 site"
git remote add origin git@github.com:<username>/qiskit-fall-fest-2026.git
git push -u origin main
```

**The repo name is the URL path**, so it must be exactly `qiskit-fall-fest-2026`.
Then **Settings > Pages > Source: Deploy from a branch > `main` / `(root)`**.

**Do not set a custom domain on this repo.** Project repos inherit the root repo's domain
automatically and serve at `/<repo-name>`. Setting one here would move the site off the subpath.

Live at `https://uconnquantum.org/qiskit-fall-fest-2026/`.

Preview locally with `python3 -m http.server 8000` and open `http://localhost:8000`.

### Why the subpath works

Every local reference in `index.html` is relative (`styles.css`, and nothing else), and the logo
is inlined as an SVG `<symbol>` rather than fetched. So the page does not care what depth it is
served from. Keep it that way: never add a link or asset path starting with `/`, or it will break
the moment it moves.

The two absolute URLs are `og:image` and `canonical`, which have to be absolute by spec. Update
those if the path ever changes.

### If you would rather use a subdomain

`fallfest.uconnquantum.org` needs only one repo and no root site: set that as the custom domain
on this repo and add a `CNAME` DNS record pointing it at `<username>.github.io`. Simpler, but a
subpath keeps everything under one domain as the club site grows.

---

## Before the site goes public

Search the source for `REPLACE`, `TODO` and `[` — every placeholder is marked. In order of urgency:

- [ ] **Club facts** — the `#about` section is DRAFT COPY. The one `[Day and time]` placeholder
      needs a real answer, and the four list items should be checked against what the club
      actually does. This is what the page leads with, so it cannot ship with guesses in it.
- [x] **Organizer photos** — all five cards are complete: name, role, major, class year,
      LinkedIn URL and photo. Photos live in `assets/team/` at 3:4 portrait, 600x800, EXIF
      stripped. The `.ph` grey placeholder rule is still in the stylesheet on purpose: if an
      organizer would rather not have a photo published, delete their `<img>` and restore
      `<div class="ph">PHOTO</div>`. The grid is set to five columns, so changing the number
      of organizers means changing `.people` in the stylesheet too.
      Each card is name, role, major and class year only, deliberately: at five across there
      is not room for more.
- [ ] **Registration URL** — three edits, because all three buttons are inert spans
      until the form exists:
      1. `#register` band: delete the `<span class="btn btn-waiting">` and uncomment the
         `<a class="btn btn-primary">` above it, pointing at the form.
      2. Hero: swap `<span class="btn btn-soon">Register<small>Starting soon</small></span>`
         back to `<a class="btn btn-primary" href="#register">Register</a>`.
      3. Nav: swap `<span class="nav-cta nav-soon">Register</span>` back to
         `<a class="nav-cta" href="#register">Register</a>`.
      Then delete the `.btn-soon` and `.nav-soon` rules and bump the `?v=` number.
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
        symbol so it follows `currentColor`.
      Neither has been redrawn. If IBM supplies official files, prefer them. Never recolor
      either mark, and never put them on the navy band.
      The **IBM 8-bar logo is forbidden outright** — it needs a contract we do not have.
- [x] **Contact email** — `parth.danve@uconn.edu`, in the footer here and on the root page.
      Worth replacing with a club-owned alias if UConn will issue one, so the address outlives
      any one organizer.
- [ ] **Social and join links** — Instagram, LinkedIn and UConntact, in two places: the three
      link cards in `#about` and the footer list. UConntact URLs look like
      `https://uconntact.uconn.edu/organization/<club-slug>`. All six are currently `#`.
- [ ] **Venue** — currently "announced with registration"
- [ ] **`assets/og-image.png`** at 1200x630, for link previews. `og:url`, `og:image` and
      `canonical` are already set to the uconnquantum.org path.
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

The palette comes from the two organizations the event belongs to. UConn navy `#000E2F` is the
ink and "Husky Eyes" `#A4C8E1` frames the partner strip. IBM Carbon Purple 70 `#6929C4` and
Blue 70 `#0043CE` are the accents, each with a fixed job: purple is the event (CTAs, headline),
blue is interactive and informational (links, the Builder track). Solid fills, no gradients.

Both light and dark themes are defined via CSS custom properties in `:root`. Every color is a
token; don't hardcode hex values in component rules or dark mode will break.

The day cards carry gate glyphs: **CX** entangle (meet people), **H** superposition (learn),
**M** measure (build and show a result).

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
