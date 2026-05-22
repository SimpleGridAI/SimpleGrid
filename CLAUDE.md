# SimpleGrid Website - Claude Instructions

This file tells Claude Code how to work on this project. The user is **non-technical** - keep everything simple, never assume terminal/git knowledge, and explain actions in plain English.

---

## What this project is

A **plain static website** (HTML + CSS + images). No build step. No frameworks. No npm.

- Source files live at the project root: `index.html`, `hiring.html`, `privacy.html`, `terms.html`, `blog.html`, `product.html`, `build.html`, `case-*.html`, `post.html`, `colors_and_type.css`, `styles.css`, plus `assets/`, `components/`, `data/`, `uploads/`.
- **Deployed to GitHub Pages** from this repo: `git@github.com:SimpleGridAI/SimpleGrid.git` (branch: `main`).
- Whatever is on `main` is what's live. There is no separate "build" or "deploy" step - push to `main` and GitHub Pages publishes it within ~1 minute.

---

## How the user previews changes locally (the "Live Server" workflow)

The user runs the site through the **VS Code Live Server extension** (`ritwickdey.LiveServer`). This is the *only* preview method we use - do not start `python -m http.server`, `npx live-server`, or any other server. They cause confusion.

**First-time setup (only once, ever):**
1. Open VS Code → Extensions sidebar (square icon on the left, or `Cmd+Shift+X`).
2. VS Code will already show a popup recommending **Live Server** because `.vscode/extensions.json` lists it. Click **Install**.
3. Done forever.

**Daily workflow:**
1. Open the project folder in VS Code.
2. Click the **"Go Live"** button at the bottom-right of the VS Code status bar.
3. Browser opens automatically. Edit any `.html` or `.css` file → **save** (`Cmd+S`) → browser auto-refreshes. No manual reload needed.
4. To stop: click the **"Port: 5500"** button in the status bar.

**If the user says "run it" / "start the site" / "preview":** tell them to click **Go Live** in the VS Code status bar. Do not start a server from the terminal.

---

## GitHub Pages constraints - read before editing

Anything that breaks on GitHub Pages will break the live site. When making changes:

1. **Static files only.** No server-side code (no PHP, no Node, no Python). HTML/CSS/JS/images only.
2. **Use relative paths**, not absolute paths starting with `/`.
   - ✅ `<link href="styles.css">` or `<img src="assets/logo.png">`
   - ❌ `<link href="/styles.css">` (breaks if served from a sub-path)
3. **File names are case-sensitive on GitHub Pages** even though they're not on macOS. `Logo.png` and `logo.png` are different. Match the case exactly.
4. **No build step.** Don't add Webpack, Vite, Tailwind CLI, SCSS compilation, etc. If a feature needs a build step, find a CDN/inline alternative.
5. **External resources must be HTTPS** (the site is HTTPS - mixed content gets blocked).
6. **The `CNAME` file** (if present) sets the custom domain. Don't delete it unless the user explicitly asks.

---

## Pushing changes live (deploy)

The user does NOT know git. When they say *"push it,"* *"make it live,"* *"deploy,"* or *"update the site"*:

1. Show them the changed files (`git status`).
2. Stage the specific changed files by name (never `git add .` - it can sweep up junk).
3. Make a clear commit message describing what changed in plain English (e.g. `Update hero headline on homepage`).
4. Push to `origin main`.
5. Tell them: *"Pushed. The live site will update in about 1 minute at [whatever the URL is]."*

**Always confirm before pushing.** Pushing is visible to the world. Show what you're about to commit and ask "Push this live?" before running `git push`.

---

## Editing rules

- **Never delete files** the user didn't ask about. The git status often shows lots of `D` (deleted) entries from prior sessions - leave those alone unless asked.
- **Don't add frameworks or dependencies.** No React, no Tailwind build, no npm. If the user asks for something that seems to need one, suggest a plain HTML/CSS solution first.
- **Test in Live Server before claiming done.** If you change CSS or HTML, ask the user to refresh and confirm it looks right.
- **Image paths:** images live in `assets/` and `uploads/`. Use those folders.
- **When in doubt, ask in plain English.** Better than guessing and breaking the live site.

---

## Quick reference for Claude

| User says… | Claude does… |
|---|---|
| "run it" / "preview" / "start the site" | Tell them to click **Go Live** in VS Code status bar |
| "stop the server" | Tell them to click the port number in VS Code status bar |
| "push it live" / "deploy" | `git status` → stage specific files → commit with clear message → confirm → `git push origin main` |
| "it's not updating" | Hard refresh (`Cmd+Shift+R`); if still stale, GitHub Pages takes ~1 min |
| "add a new page" | Create `newpage.html` at project root, copy structure from `index.html`, link it from nav |
