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
- [ ] **Organizer names, roles and photos** — `#people`, four placeholder cards. Photos go in
      `assets/team/` at 3:4 portrait, roughly 600x800. Anyone who would rather not have a photo
      published keeps the grey `PHOTO` block; that is a supported state, not a broken one.
- [ ] **Registration URL** — one edit, in the `#register` band: delete the
      `<span class="btn btn-waiting">` and uncomment the `<a>` above it. The nav and hero
      buttons are jump links to that section, so they need no change at launch.
- [ ] **Club logo** — `assets/logo-uconn-quantum.svg` is the real lockup, converted from
      `UConn-Quantum Computing.eps` and reversed for light backgrounds. Ask UConn Communications
      for the official reversed version and swap it in; recoloring is technically an alteration.
      `logo-uconn-quantum-original.svg` is the untouched white-on-navy original.
- [ ] **Sponsor logos** — the marquee strip under the hero currently holds the club logo plus
      four `Sponsor slot` placeholders. Replace a slot with `<svg><use>` or `<img>` as each
      sponsor is confirmed. The track repeats the same set **three times** and slides by exactly
      one third, so all three copies must stay identical or the loop will visibly jump.
      IBM Quantum's mark needs Fall Fest event-staff approval before it goes up.
- [ ] **Contact email** — `REPLACE@uconn.edu`, appears 5 times
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

Worth also collecting, because these are the numbers we report afterwards: university, major,
whether this is their first quantum event, dietary requirements, and which days they're coming to.

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
