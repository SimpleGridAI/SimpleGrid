#!/usr/bin/env python3
"""Bump font-size values site-wide by ~10%, with sane rounding.

Affects:
  - colors_and_type.css  (--fs-* tokens + any font-size: Npx)
  - styles.css           (font-size: Npx in any rule)
  - *.html at root       (inline style="...font-size:Npx...")
  - blog/<slug>/index.html (same inline)

Skips font-size in url() or font-feature-settings etc by anchoring to the
literal `font-size:` keyword.

Mapping is a fixed lookup so values round nicely (no fractional px).
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]

# Bump table: old px -> new px (~5% larger, applied on top of the previous
# ~10% bump). Covers all sizes currently present in the codebase.
BUMP = {
  9:9, 10:11, 11:12, 12:13, 13:14, 14:15, 15:16,
  16:17, 17:18, 18:19, 19:20, 20:21, 21:22, 22:23,
  23:24, 24:25, 25:26, 26:27, 27:28, 28:29, 29:30,
  31:33, 33:35, 35:37, 37:39, 38:40, 40:42, 42:44,
  44:46, 46:48, 48:50, 50:53, 53:56, 56:59, 59:62,
  62:65, 65:68,
}

# 1. font-size:[space]Npx (in CSS rules + inline styles).
FS_PX = re.compile(r'font-size:\s*(\d+)px')

# 2. --fs-*: Npx; lines in colors_and_type.css.
FS_TOKEN = re.compile(r'(--fs-[a-zA-Z0-9_-]+:\s*)(\d+)(px)')

def repl_px(m):
  n = int(m.group(1))
  return f'font-size: {BUMP.get(n, n)}px'

def repl_token(m):
  pre, n, suf = m.group(1), int(m.group(2)), m.group(3)
  return f'{pre}{BUMP.get(n, n)}{suf}'

def bump_file(p: pathlib.Path):
  src = p.read_text(encoding='utf-8')
  out = src
  # Normalise spacing first so FS_PX matches.
  # Apply font-size: Npx replacement (handles both `font-size: 14px` and `font-size:14px`).
  out = re.sub(r'font-size:\s*(\d+)px', lambda m: f'font-size:{" " if (m.group(0).find(": ")>-1) else ""}{BUMP.get(int(m.group(1)), int(m.group(1)))}px', out)
  # CSS-variable tokens (only meaningful in colors_and_type.css but harmless elsewhere).
  out = FS_TOKEN.sub(repl_token, out)
  if out != src:
    p.write_text(out, encoding='utf-8')
    return True
  return False

def main():
  targets = []
  targets.append(ROOT / 'colors_and_type.css')
  targets.append(ROOT / 'styles.css')
  targets += sorted(ROOT.glob('*.html'))
  targets += sorted(ROOT.glob('blog/*/index.html'))
  changed = 0
  for t in targets:
    if not t.is_file():
      continue
    if bump_file(t):
      changed += 1
      print('bumped', t.relative_to(ROOT))
  print(f'done. {changed} files modified.')

if __name__ == '__main__':
  main()
