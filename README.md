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

## Placeholders on this page

`REPLACE@uconn.edu` and the three `#` links. The event page has its own list in
`qiskit-fall-fest-2026/README.md`.

Preview locally: `python3 -m http.server 8000`
