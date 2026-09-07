# Contributing

This covers the whole site — the club landing page and every page folder under it. It is
plain HTML and CSS with no build step and no dependencies, so the barrier is low: if you can
edit a text file you can contribute.

Read [README.md](README.md) first for how the repo is laid out and how it deploys.

## Access

The repo is public, so anyone can read it, clone it, and fork it. Pushing a branch into the
repo needs **write access**, which is granted per person and is not automatic with membership
of the UConn Quantum Computing organization — the org default is read.

If you are on the team and need write access, ask Parth Danve (parth.danve@uconn.edu).

If you do not have write access you can still contribute: fork the repo, push to your fork,
and open a pull request from it. Fork pull requests do not get an automatic preview (see
[README.md](README.md#previews-are-public-and-that-is-deliberate) for why), so say in the PR
what you changed and a maintainer will check it.

## Get set up

```bash
git clone https://github.com/UConn-Quantum-Computing/UConn-Quantum-Computing.github.io.git
cd UConn-Quantum-Computing.github.io
python3 -m http.server 8000
```

Then open <http://localhost:8000/> for the landing page. Every other page is a folder under
it, at `http://localhost:8000/<folder-name>/`.

There is no `npm install`, no bundler, no framework, and no generated output. What is in the
repo is exactly what ships. Editing a file and reloading the browser is the whole loop.

Use the local server rather than opening `index.html` from the file system — `file://` URLs
resolve relative paths differently and will hide problems that only appear once deployed.

## Make a change

```bash
git checkout -b short-descriptive-name
# edit files, then
git commit -am "Say what changed, in the imperative"
git push -u origin short-descriptive-name
```

Open a pull request against `main`. Within a minute or two the PR grows a deployment panel
with a **View deployment** button pointing at a live copy of the whole site as your branch
builds it. Check your change there, not only on localhost.

Merging the PR into `main` publishes the site. There is no separate deploy step and no
button to press afterwards.

Delete your branch after merging — GitHub does this for you when you use the merge button.

### What `main` requires

`main` is protected. A pull request needs:

- **one approving review**, which cannot be your own
- **a review from a code owner** (see [.github/CODEOWNERS](.github/CODEOWNERS))
- **the `preview` check passing** — the preview must build before the PR can merge
- **all conversations resolved**

Stale approvals are dismissed when you push new commits, so re-request review after
addressing feedback. Force pushes to `main` and deleting `main` are blocked outright.

Organization owners can bypass the review requirement. That exists so a one-person team is
not deadlocked waiting for an approval it can never get, not as a normal route — use a PR
whenever there is anyone available to review it.

## Rules that matter

**1. Every path in the site is relative. Never start an `href`, `src` or `url()` with `/`.**

This is the one rule that silently breaks things. Previews are served from
`/pr-preview/pr-<number>/`, so a single leading slash escapes the preview folder and loads
the production file instead. The preview then looks correct while testing nothing. Write
`styles.css` and `assets/logo.svg`, never `/styles.css` or `/assets/logo.svg`.

**2. Never commit to `gh-pages`.**

It is generated output, rebuilt from `main` on every merge. A commit made there by hand is
overwritten and lost on the next deploy.

**3. Bump the stylesheet version when you change CSS.**

Each page links its stylesheet as `styles.css?v=N`. Increment `N` in that page's
`index.html` in the same commit as the CSS change, otherwise returning visitors keep the
cached old file and your change appears not to have worked.

**4. One folder per page, with its own stylesheet.**

Pages do not share CSS. A page's `styles.css` belongs to that page alone, so restyling one
can never break another or the landing page. Editing a page means editing files inside its
folder and nowhere else.

**5. Only commit what the site serves.**

Source files and full-resolution originals do not belong in the repo — crop, resize and
export first, then commit the result. Check what you are adding, too: `git add -A` will
happily sweep in a file you have not looked at.

Photographs of people need that person's agreement before they are committed, because the
repo is public and git history keeps a copy even after a later deletion.

**6. American English throughout, in copy and in comments.**

Headings are short titles, not full sentences.

**7. No build step and no dependencies.**

If a change seems to need a framework, a preprocessor, or a package, raise it as an issue
first. The site's whole maintenance story is that a future club officer can open it in any
editor and understand it.

**8. Check narrow widths before opening the PR.**

Most visitors arrive on a phone. Resize the browser to about 380px wide and read the page
top to bottom.

## Adding a new page

**A new page is a new folder.** Name the folder exactly what you want the URL to be.

1. Create the folder, for example `open-house/` for `uconnquantum.org/open-house/`.
2. Put `index.html`, `styles.css` and an `assets/` folder in it.
3. Use relative paths throughout, and link the stylesheet as `styles.css?v=1`.
4. Link the new page from the landing page at [index.html](index.html).

It is live as soon as the PR merges. Nothing needs registering and no workflow needs
changing — previews and deploys copy the entire tree, so a new folder is picked up on its
own.

Keep each page self-contained: its own stylesheet, its own assets. That is what stops a
change to one page breaking another. It is also the simplest arrangement that works while
there are only a few pages, and worth revisiting once there are more.

## Reviewing a pull request

Open the preview from the deployment panel and look at the actual pages rather than reading
the diff alone. Check the change on a narrow window as well as a wide one, follow any link
the PR touches, and confirm no path in the diff starts with `/`.

Approve when the preview looks right. The author cannot merge without it.

## Troubleshooting

**The preview link 404s.** The build may still be running; check the Actions tab. Previews
for pull requests opened from a fork are not built at all, by design.

**My CSS change does not show up.** The `?v=` number was probably not bumped. Hard-reload
with Cmd-Shift-R to confirm that is the cause, then bump it properly so everyone else sees
the change too.

**The preview looks right but production is broken.** Almost always an absolute path — rule
1. The preview loaded the production file through the leading slash, so it never tested your
copy.

**I committed something I should not have.** Say so immediately rather than pushing a
deletion. Deleting a file in a later commit leaves it fully readable in history, and the
history of a public repo is public. Removing it properly means rewriting history, which has
to be coordinated.
