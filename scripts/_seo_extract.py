import os, re, csv, json, glob
from bs4 import BeautifulSoup

ROOT = os.getcwd()

def url_for(path):
    rel = os.path.relpath(path, ROOT)
    if rel == 'index.html': return '/'
    m = re.match(r'^(tools|blog|competitors|furniture-erp)/(.+/)?index\.html$', rel)
    if rel == 'tools/index.html': return '/tools/'
    if rel == 'furniture-erp/index.html': return '/furniture-erp/'
    m2 = re.match(r'^(tools|blog|competitors)/([^/]+)/index\.html$', rel)
    if m2: return '/%s/%s/' % (m2.group(1), m2.group(2))
    return '/' + rel  # root html

def page_type(rel, url):
    if rel.startswith('tools/'): return 'tool' if rel != 'tools/index.html' else 'tool-index'
    if rel.startswith('blog/'): return 'blog'
    if rel.startswith('competitors/'): return 'competitor'
    if rel == 'competitors.html': return 'competitor-hub'
    if rel == 'blog.html': return 'blog-hub'
    if rel == 'furniture-erp/index.html': return 'vertical-landing'
    if rel.startswith('case-'): return 'case-study'
    if rel in ('privacy.html','terms.html','security.html','accessibility.html','404.html','hiring.html'): return 'legal-utility'
    if rel in ('about.html','pricing.html','product.html','sg-schema.html','index.html'): return 'marketing'
    return 'other'

# Build shipped page list (exclude error/redirect/fragments/node)
files = []
for p in glob.glob(ROOT+'/**/*.html', recursive=True):
    rel = os.path.relpath(p, ROOT)
    if rel.startswith(('node_modules/','.node/','.git/','assets/')): continue
    if rel in ('post.html',): continue  # redirect router
    files.append(p)
files.sort()

def textlen(soup):
    for t in soup(['script','style','noscript']): t.extract()
    txt = soup.get_text(' ', strip=True)
    return len(re.findall(r"[A-Za-z0-9']+", txt))

rows=[]
schema_rows=[]
img_rows=[]
for p in files:
    rel = os.path.relpath(p, ROOT)
    html = open(p, encoding='utf-8', errors='replace').read()
    soup = BeautifulSoup(html, 'html.parser')
    url = url_for(p)
    ptype = page_type(rel, url)
    def meta(name=None, prop=None):
        if name:
            m=soup.find('meta', attrs={'name':name})
        else:
            m=soup.find('meta', attrs={'property':prop})
        return m.get('content','').strip() if m and m.get('content') else ''
    title = soup.title.get_text().strip() if soup.title else ''
    desc = meta(name='description')
    canon = ''
    cl = soup.find('link', rel='canonical')
    if cl: canon = cl.get('href','')
    htmllang = soup.html.get('lang','') if soup.html else ''
    h1s=[h.get_text(' ',strip=True) for h in soup.find_all('h1')]
    h2=len(soup.find_all('h2')); h3=len(soup.find_all('h3'))
    h4=len(soup.find_all('h4')); h5=len(soup.find_all('h5')); h6=len(soup.find_all('h6'))
    # hierarchy valid: no skipped levels in document order
    order=[int(t.name[1]) for t in soup.find_all(re.compile('^h[1-6]$'))]
    valid='yes'; prev=0
    for lv in order:
        if prev and lv>prev+1: valid='no'
        prev=lv
    if order and order[0]!=1: valid='no(start h%d)'%order[0]
    robots = meta(name='robots')
    # word count from main visible body
    soup2 = BeautifulSoup(html,'html.parser')
    wc = textlen(soup2)
    # schema
    types=[]
    for s in soup.find_all('script', type='application/ld+json'):
        try:
            data=json.loads(s.string or '{}')
        except Exception as e:
            types.append('PARSE_ERROR'); continue
        def collect(d):
            if isinstance(d,dict):
                if '@graph' in d:
                    for g in d['@graph']: collect(g)
                if '@type' in d:
                    t=d['@type']
                    if isinstance(t,list):
                        for x in t: types.append(x)
                    else: types.append(t)
                # nested
            elif isinstance(d,list):
                for x in d: collect(x)
        collect(data)
    schema_rows.append({'url':url,'types':'|'.join(types) if types else 'NONE','n_blocks':len(soup.find_all('script',type='application/ld+json'))})
    # images
    imgs=soup.find_all('img')
    n_img=len(imgs); n_alt=sum(1 for i in imgs if i.get('alt') is not None and i.get('alt','').strip()!=''); n_lazy=sum(1 for i in imgs if i.get('loading')=='lazy')
    img_rows.append({'url':url,'n_img':n_img,'n_with_alt':n_alt,'n_lazy':n_lazy})
    # dates from schema / meta
    dpub = re.search(r'"datePublished"\s*:\s*"([^"]+)"', html)
    dmod = re.search(r'"dateModified"\s*:\s*"([^"]+)"', html)
    rows.append({
        'url':url,'type':ptype,'repo_path':rel,
        'title':title,'title_len':len(title),
        'meta_desc':desc,'meta_len':len(desc),
        'h1':' || '.join(h1s),'n_h1':len(h1s),'n_h2':h2,'n_h3':h3,'n_h4':h4,'n_h5':h5,'n_h6':h6,
        'hierarchy_valid':valid,'canonical':canon,
        'og_title':'y' if meta(prop='og:title') else 'n',
        'og_desc':'y' if meta(prop='og:description') else 'n',
        'og_image':'y' if meta(prop='og:image') else 'n',
        'twitter_card':meta(name='twitter:card') or 'n',
        'html_lang':htmllang,'word_count':wc,'robots':robots or '(none)',
        'datePublished':dpub.group(1) if dpub else '','dateModified':dmod.group(1) if dmod else '',
        'schema_types':schema_rows[-1]['types'],
    })

# Write CSVs
with open('seo-audit-data/onpage_signals.csv','w',newline='') as f:
    w=csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
with open('seo-audit-data/schema_coverage.csv','w',newline='') as f:
    w=csv.DictWriter(f, fieldnames=['url','types','n_blocks']); w.writeheader(); w.writerows(schema_rows)
with open('seo-audit-data/image_alt.csv','w',newline='') as f:
    w=csv.DictWriter(f, fieldnames=['url','n_img','n_with_alt','n_lazy']); w.writeheader(); w.writerows(img_rows)

print('PAGES PARSED:', len(rows))
from collections import Counter
print('BY TYPE:', dict(Counter(r['type'] for r in rows)))
print('CSV written: onpage_signals.csv, schema_coverage.csv, image_alt.csv')
