# uconnquantum.org

Static site for UConn Quantum Computing, served by GitHub Pages from this repo.
No build step, no dependencies.

```
index.html                  the club landing page  ->  uconnquantum.org
styles.css                  its stylesheet
CNAME                       the custom domain
.nojekyll                   stops Pages running Jekyll over the tree
qiskit-fall-fest-2026/      ->  uconnquantum.org/qiskit-fall-fest-2026/
```

## How the paths work

This repo is named `UConn-Quantum-Computing.github.io`, which GitHub treats as the
organization site: it serves the whole directory tree from the domain root. A folder is a
path, so each event gets its own folder and its own stylesheet, and one event can never
break another. Next year is just another folder.

Every path inside each page is relative. Never add a link or asset starting with `/`.

## Setup checklist

- [ ] Repo visibility **public** (free orgs cannot serve Pages from private repos)
- [ ] Settings > Pages > Source: `main` / `(root)`
- [ ] Settings > Pages > Custom domain: `uconnquantum.org`
- [ ] DNS: four apex `A` records at `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
- [ ] DNS: `CNAME` record, host `www` -> `uconn-quantum-computing.github.io`
- [ ] Settings > Pages > Enforce HTTPS, once the certificate provisions

Before the domain is live you can check the build at
`https://uconn-quantum-computing.github.io/`.

## PR previews

Every pull request gets a live preview at:

```
https://uconnquantum.org/pr-preview/pr-<number>/
https://uconnquantum.org/pr-preview/pr-<number>/qiskit-fall-fest-2026/
```

A bot comments the link on the PR, and it is removed when the PR closes.

**How it works.** Pages allows one source per repo, so previews have to live inside the
published site. `.github/workflows/deploy.yml` copies `main` to a `gh-pages` branch, which
is what Pages actually serves; `.github/workflows/pr-preview.yml` writes each PR into
`gh-pages:/pr-preview/pr-<number>/`. The `clean-exclude: pr-preview/` line in deploy.yml is
what stops a push to main from deleting the previews of every open PR.

**This only works because every path in the site is relative.** A preview is served from a
subdirectory, so a single leading `/` on any href, src or url() would escape the preview and
load production instead. Keep it that way.

**One-time setup** — do this *after* the 8 September IBM submission, not before, because it
changes where the live site is served from:

1. Merge these workflows to `main`. `deploy.yml` runs and creates the `gh-pages` branch.
2. Confirm `gh-pages` contains `CNAME`, `.nojekyll`, `index.html` and `qiskit-fall-fest-2026/`.
3. **Settings > Pages > Source: Deploy from a branch > `gh-pages` / `(root)`**.
4. Load `https://uconnquantum.org/` and confirm the site is unchanged.

To roll back, set the source to `main` / `(root)` again. Nothing else changes.

**Fork PRs get no preview.** The workflow uses `pull_request`, which hands forks a read-only
token, so the deploy step is skipped. That is deliberate: building a fork's branch with a
write token would let anyone who opens a PR publish to the live domain.

## Placeholders on this page

The three `#` links. The contact address is live (`parth.danve@uconn.edu`); swap it for a
club-owned alias if one is ever set up, so it survives a change of president. The event page
has its own list in `qiskit-fall-fest-2026/README.md`.

Preview locally: `python3 -m http.server 8000`
