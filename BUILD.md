# SimpleGrid build pipeline

The site is now ready to drop Babel-standalone and ship pre-transpiled JS.
Once Node is installed (`brew install node`), run the four commands below
**once** to remove ~3 MB raw / ~620 KB gz from every page on every visitor:

```sh
# 1. install Babel as a dev dep (no runtime deps added)
npm install

# 2. transpile components/*.jsx -> components/*.js
#    transpile app/*.jsx -> app/*.js
#    rewrite all HTML <script> tags
#    drop the Babel-standalone CDN script
#    add `defer` to React + ReactDOM
npm run build

# 3. spot-check
git diff --stat   # should show .jsx -> .js, dozens of HTML edits

# 4. ship
git add -A && git commit -m "Pre-transpile JSX, drop Babel-standalone" && git push
```

## What `npm run build` does

`@babel/cli` compiles **`components/*.jsx`** with `@babel/preset-react`
(`runtime: classic`, `sourceType: script`) so the output JSX-free files
remain plain global-scope scripts that work as `<script src="…">` tags.
The same step runs over **`app/*.jsx`** which contains each page's
inline `App()` block - extracted into one file per page (`app/home.jsx`,
`app/product.jsx`, …, `app/not-found.jsx`).

After Babel, [scripts/swap-jsx-to-js-in-html.js](scripts/swap-jsx-to-js-in-html.js)
walks every HTML file and:

1. Removes the `<script src="…/babel/standalone…">` line entirely.
2. Rewrites `<script type="text/babel" src="components/X.jsx">` →
   `<script src="components/X.js" defer></script>`.
3. Replaces the inline `<script type="text/babel">…App()…</script>` block
   with `<script src="app/{slug}.js" defer></script>`.
4. Adds `defer` to the React + ReactDOM `<script>` tags now that the load
   order can be guaranteed (all-defer scripts execute in document order
   after HTML parsing).

The script is **idempotent** - safe to run repeatedly.

## Daily workflow after migration

You still edit `.jsx` (in `components/` and `app/`). Before each `git push`:

```sh
npm run build
```

That single command transpiles, rewrites HTML, and you're ready to commit.

If you forget, the `.js` files in your working tree go stale and the live
site renders the older code - but the page won't break, because the
`.jsx` files are no longer referenced anywhere in HTML after the first
migration.

## Expected wire-byte impact

- `babel.min.js` - **3,068 KB raw / ~620 KB gz removed** from every page.
- React `.development.js` → `.production.min.js` - already done in
  Fix 3, before this migration. Saves ~245 KB gz.
- Component `.jsx` (text/jsx) → `.js` (application/javascript) means
  GitHub Pages now gzips them. ~154 KB raw → ~35 KB gz on the wire.
- All-defer means React, ReactDOM, components, and the inline App stop
  blocking the HTML parser. FCP improves by ~300–600 ms on slow 4G.

Combined with the in-tree fixes already applied (preconnect to unpkg,
Google Fonts via `<link>`, dead-code removal, off-screen RAF pause,
mobile particle-count drop, image compression, deferred PostHog),
expected Lighthouse scores after `npm run build` ships:

- Mobile: **27 → ~75–85**
- Desktop: **44 → ~88–94**
