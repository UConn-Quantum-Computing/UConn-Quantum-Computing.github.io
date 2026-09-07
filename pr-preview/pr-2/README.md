# uconnquantum.org

Static site for UConn Quantum Computing, served by GitHub Pages from this repo.
No build step, no dependencies.

```
index.html                  the club landing page  ->  uconnquantum.org
styles.css                  its stylesheet
assets/                     its favicons
qiskit-fall-fest-2026/      ->  uconnquantum.org/qiskit-fall-fest-2026/

CNAME                       the custom domain. Pages reads this at the root only
.nojekyll                   stops Pages running Jekyll over the tree
robots.txt                  keeps /pr-preview/ out of search
.github/workflows/          deploy + PR previews
```

Every file above is required. Nothing here is build output or scratch: originals that are
not served (the untouched club logo, source EPS, photo originals) live outside the repo in
`QFF-26/`, and `.DS_Store` is gitignored.

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

Every pull request gets a live preview of the **whole site**:

```
https://uconnquantum.org/pr-preview/pr-<number>/                      club landing page
https://uconnquantum.org/pr-preview/pr-<number>/qiskit-fall-fest-2026/  event page
```

The PR shows a native deployment panel with a **View deployment** button. The preview is
deleted when the PR closes.

### Working with it

```bash
git checkout -b my-change
# edit, commit
git push -u origin my-change
# open a PR, click View deployment, then Merge
```

**Merging to `main` is the deploy.** No extra step. Pushing straight to `main` still works
and still publishes; you just get no preview for it, which is fine for a typo.

### How it works

Pages allows one source per repo, so previews have to live inside the published site.
`deploy.yml` copies `main` to a `gh-pages` branch, which is what Pages serves;
`pr-preview.yml` writes each PR into `gh-pages:/pr-preview/pr-<number>/`. The
`clean-exclude: pr-preview/` line in deploy.yml is what stops a push to main from deleting
the previews of every open PR.

Because a preview copies the entire tree, any page added later is covered with no change to
the workflow.

**This only works because every path in the site is relative.** A preview is served from a
subdirectory, so one leading `/` on any href, src or url() would escape the preview and load
production instead. Keep it that way.

### Previews are public, and that is deliberate

GitHub Pages has no access control outside GitHub Enterprise Cloud: *"To publish a GitHub
Pages site privately, your organization must use GitHub Enterprise Cloud."* A client-side
login would not help either, since the files stay fetchable at their URLs.

Nothing in a preview is private — it is the same copy as the live public site. The real risk
is search engines indexing previews and competing with the real pages, so two things guard
against that: `robots.txt` disallows `/pr-preview/`, and the workflow stamps
`<meta name="robots" content="noindex, nofollow">` into every previewed HTML file. The meta
tag is the one that actually works; robots.txt only asks.

If previews ever do need real sign-in, that means moving them off GitHub Pages — Cloudflare
Pages with Cloudflare Access (free tier, GitHub as the identity provider) is the usual answer.

**Fork PRs get no preview**, by design: building a fork's branch would hand code from outside
the org a write-scoped token pointed at the live domain.

### One-time setup

Do this **after** the 8 September IBM submission, not before — step 3 changes where the live
site is served from, and IBM fetches the URL:

1. Merge these workflows to `main`. `deploy.yml` runs and creates `gh-pages`.
2. Confirm `gh-pages` has `CNAME`, `.nojekyll`, `robots.txt`, `index.html` and
   `qiskit-fall-fest-2026/`.
3. **Settings > Pages > Source: Deploy from a branch > `gh-pages` / `(root)`**.
4. Load `https://uconnquantum.org/` and confirm nothing changed.
5. Open a throwaway PR and check the preview link works, then close it and check it 404s.

To roll back, set the source to `main` / `(root)` again. Nothing else changes.

## Placeholders on this page

The three `#` links. The contact address is live (`parth.danve@uconn.edu`); swap it for a
club-owned alias if one is ever set up, so it survives a change of president. The event page
has its own list in `qiskit-fall-fest-2026/README.md`.

Preview locally: `python3 -m http.server 8000`
