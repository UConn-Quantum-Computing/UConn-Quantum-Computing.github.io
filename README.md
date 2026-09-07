# uconnquantum.org

Static site for UConn Quantum Computing, served by GitHub Pages from this repo.
No build step, no dependencies.

```
index.html                  the club landing page  ->  uconnquantum.org
styles.css                  its stylesheet
assets/                     its favicons

<page-name>/                one folder per page  ->  uconnquantum.org/<page-name>/
                            qiskit-fall-fest-2026/ is the one that exists so far

CNAME                       the custom domain. Pages reads this at the root only
.nojekyll                   stops Pages running Jekyll over the tree
robots.txt                  keeps /pr-preview/ out of search
.github/workflows/          deploy + PR previews
.github/CODEOWNERS          who must review a pull request
CONTRIBUTING.md             how to work on the site
```

Everything above is required, and nothing here is build output or scratch. Only files the
site actually serves belong in the repo — keep unused source files and full-resolution
originals out of it, and crop or export before committing. `.DS_Store` is gitignored.

## Run it locally

```bash
git clone https://github.com/UConn-Quantum-Computing/UConn-Quantum-Computing.github.io.git
cd UConn-Quantum-Computing.github.io
python3 -m http.server 8000
```

<http://localhost:8000/> is the landing page, and each page folder sits under it at
`http://localhost:8000/<page-name>/`. There is nothing to install and nothing to build.

**Making a change? Read [CONTRIBUTING.md](CONTRIBUTING.md).** It covers branches, pull
requests, review, and the handful of rules that will bite you otherwise.

## How the paths work

This repo is named `UConn-Quantum-Computing.github.io`, which GitHub treats as the
organization site: it serves the whole directory tree from the domain root. **A folder is a
path.** So a new page means a new folder — name the folder what you want the URL to be, put
an `index.html` in it, and it is live at `uconnquantum.org/<folder-name>/` on the next merge.
Nothing needs registering anywhere.

Each page folder carries its own `styles.css` and its own `assets/`, so restyling one page
can never break another or the landing page.

This is deliberately the simplest thing that works while there are only a couple of pages.
Once there are more, it is worth revisiting how they are grouped and what they share.

Every path inside each page is relative. Never add a link or asset starting with `/`.

## Hosting setup

All of this is done. It is recorded here so it can be rebuilt or handed over, not as a task
list.

- Repo visibility **public** — free organizations cannot serve Pages from a private repo
- Settings > Pages > Source: **`gh-pages` / `(root)`**, written by `deploy.yml`
- Settings > Pages > Custom domain: `uconnquantum.org`, HTTPS enforced
- DNS: four apex `A` records at `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
- DNS: `CNAME` record, host `www` -> `uconn-quantum-computing.github.io`

Because a custom domain is set, every `uconn-quantum-computing.github.io/*` URL now
301-redirects to `uconnquantum.org`. There is no way to reach the raw Pages domain, which is
why previews live under the custom domain rather than on github.io.

### Branch protection

`main` requires a pull request with one approving review, a code-owner review, the `preview`
check passing, and all conversations resolved. Force pushes and deletion are blocked.

`gh-pages` blocks **deletion only**. Force pushes have to stay allowed there: the deploy
action publishes by force-pushing the built tree, so blocking it does not protect the branch,
it stops the site deploying. Nothing else should write to `gh-pages` by hand — it is
regenerated from `main` on every merge, so a manual commit is overwritten and lost anyway.

Organization owners bypass protection on both branches, so an owner can still push directly
when something has to be fixed fast.

Details of what this means day to day are in [CONTRIBUTING.md](CONTRIBUTING.md#what-main-requires).

## PR previews

Every pull request gets a live preview of the **whole site**:

```
https://uconnquantum.org/pr-preview/pr-<number>/               club landing page
https://uconnquantum.org/pr-preview/pr-<number>/<page-name>/   any page folder
```

The PR shows a native deployment panel with a **View deployment** button. The preview is
deleted when the PR closes.

**Merging to `main` is the deploy.** No extra step. The branch-and-PR workflow itself is in
[CONTRIBUTING.md](CONTRIBUTING.md#make-a-change).

### How it works

Pages allows one source per repo, so previews have to live inside the published site.
`deploy.yml` copies `main` to a `gh-pages` branch, which is what Pages serves;
`pr-preview.yml` writes each PR into `gh-pages:/pr-preview/pr-<number>/`. The
`clean-exclude: pr-preview/` line in deploy.yml is what stops a push to main from deleting
the previews of every open PR.

Because a preview copies the entire tree, any page added later is covered with no change to
the workflow.

Closing a PR empties its preview folder but cannot delete it — the deploy action writes a
`.nojekyll` into every directory it touches, including one it is clearing. A final step in
`pr-preview.yml` sweeps `gh-pages` for any `pr-preview/pr-*` folder with no `index.html` in
it and removes those, so closed PRs leave nothing behind.

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

`gh-pages` is generated output. Nothing should ever be committed to it by hand — it is
rebuilt from `main` on every merge, so a manual commit there is overwritten and lost.

**Fork PRs get no preview**, by design: building a fork's branch would hand code from outside
the org a write-scoped token pointed at the live domain.

### If previews ever need to be undone

Set **Settings > Pages > Source** back to `main` / `(root)`. The site serves straight from
`main` again and nothing else changes — `gh-pages` is then ignored and can be deleted. The
workflows can stay in place; they will keep writing to a branch nobody serves.

## Placeholders on the landing page

None left — the Instagram, LinkedIn and UConntact links are all live. The contact address is
`parth.danve@uconn.edu`; swap it for a club-owned alias if UConn will issue one, so it
survives a change of president.

A page folder can keep its own README for notes and open items specific to it, rather than
growing this one. [qiskit-fall-fest-2026/README.md](qiskit-fall-fest-2026/README.md) is the
example, and it still has open items of its own.
