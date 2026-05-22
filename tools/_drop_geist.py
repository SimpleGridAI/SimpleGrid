#!/usr/bin/env python3
"""Remove Geist Google Fonts links + preconnects from every HTML file.

Geist is only referenced by --font-brand for .sg-brand, which is currently
unused anywhere in the codebase. The font load is a wasted request + parse +
render-block. This script strips:
  - <link rel="preconnect" href="https://fonts.googleapis.com">
  - <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  - <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Geist...">
  - <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist..." ...>
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]

PATTERNS = [
  re.compile(r'\s*<link rel="preconnect" href="https://fonts\.googleapis\.com">'),
  re.compile(r'\s*<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>'),
  re.compile(r'\s*<link rel="preload" as="style" href="https://fonts\.googleapis\.com/css2\?family=Geist[^"]*">'),
  re.compile(r'\s*<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2\?family=Geist[^"]*"[^>]*>'),
]

def main():
  targets = sorted(ROOT.glob('*.html')) + sorted(ROOT.glob('blog/*/index.html'))
  changed = 0
  for t in targets:
    src = t.read_text(encoding='utf-8')
    out = src
    for p in PATTERNS:
      out = p.sub('', out)
    if out != src:
      t.write_text(out, encoding='utf-8')
      changed += 1
      print('cleaned', t.relative_to(ROOT))
  print(f'done. {changed} files.')

if __name__ == '__main__':
  main()
