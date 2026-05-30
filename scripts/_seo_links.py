import os,re,csv,glob
from bs4 import BeautifulSoup
from urllib.parse import urljoin
ROOT=os.getcwd()
def url_for(path):
    rel=os.path.relpath(path,ROOT)
    if rel=='index.html': return '/'
    m=re.match(r'^(tools|blog|competitors)/([^/]+)/index\.html$',rel)
    if m: return '/%s/%s/'%(m.group(1),m.group(2))
    if rel=='tools/index.html': return '/tools/'
    if rel=='furniture-erp/index.html': return '/furniture-erp/'
    return '/'+rel
def canon(u):
    # canonical internal URL form: ensure dir-style (no extension) ends with '/'
    u=u.split('#')[0].split('?')[0]
    if u=='' : return '/'
    last=u.rstrip('/').split('/')[-1]
    if '.' not in last and not u.endswith('/'):
        u=u+'/'
    if u.endswith('/index.html'): u=u[:-10]
    return u
files=[p for p in glob.glob(ROOT+'/**/*.html',recursive=True)
       if not os.path.relpath(p,ROOT).startswith(('node_modules/','.node/','.git/','assets/')) and os.path.relpath(p,ROOT)!='post.html']
edges=[]; inbound={}; outbound={}
allpages=set(canon(url_for(p)) for p in files)
def resolve(href, src):
    href=href.strip()
    if not href or href.startswith(('mailto:','tel:','javascript:')): return None
    if href.startswith(('http://','https://')):
        if 'simplegrid.ai' in href:
            href=re.sub(r'^https?://simplegrid\.ai','',href) or '/'
        else: return ('EXT',href)
    # resolve relative against src as a URL path
    base = src  # src is like '/tools/' or '/competitors.html' or '/'
    absu = urljoin('http://x'+base, href)
    absu = absu[len('http://x'):]
    return ('INT', canon(absu))
for p in files:
    src=canon(url_for(p))
    soup=BeautifulSoup(open(p,encoding='utf-8',errors='replace').read(),'html.parser')
    for a in soup.find_all('a',href=True):
        r=resolve(a['href'], src)
        if not r: continue
        kind,tgt=r
        if kind=='EXT': continue
        # skip asset links
        if re.search(r'\.(css|js|svg|png|jpg|jpeg|webp|ico|pdf|xml|txt|json)$',tgt): continue
        anchor=a.get_text(' ',strip=True)[:60] or '(img/empty)'
        edges.append({'source':src,'target':tgt,'anchor':anchor})
        outbound[src]=outbound.get(src,0)+1
        inbound[tgt]=inbound.get(tgt,0)+1
with open('seo-audit-data/internal_links_edgelist.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=['source','target','anchor']); w.writeheader(); w.writerows(edges)
orphans=[u for u in sorted(allpages) if inbound.get(u,0)==0 and u!='/']
print('EDGES:',len(edges),'| SHIPPED PAGES:',len(allpages),'| ORPHANS(0 inbound):',len(orphans))
for o in orphans: print('  ORPHAN',o,'(inbound 0)')
tool_orph=[u for u in sorted(allpages) if u.startswith('/tools/') and u!='/tools/' and inbound.get(u,0)==0]
comp_orph=[u for u in sorted(allpages) if u.startswith('/competitors/') and inbound.get(u,0)==0]
print('TOOL orphans:',len(tool_orph),'| COMPETITOR orphans:',len(comp_orph))
# inbound distribution for tools & competitors
import statistics
tool_in=[inbound.get(u,0) for u in allpages if u.startswith('/tools/') and u!='/tools/']
comp_in=[inbound.get(u,0) for u in allpages if u.startswith('/competitors/')]
blog_in=[inbound.get(u,0) for u in allpages if u.startswith('/blog/')]
print('TOOL inbound: min%d max%d median%.1f'%(min(tool_in),max(tool_in),statistics.median(tool_in)))
print('COMP inbound: min%d max%d median%.1f'%(min(comp_in),max(comp_in),statistics.median(comp_in)))
print('BLOG inbound: min%d max%d median%.1f'%(min(blog_in),max(blog_in),statistics.median(blog_in)))
from collections import Counter
gen=Counter()
for e in edges:
    a=e['anchor'].lower().strip()
    if a in ('click here','here','read more','learn more','link','this','more','>','→'): gen[a]+=1
print('generic anchors:',dict(gen),'| total edges',len(edges))
print('--- TOP inbound ---')
for u,c in sorted(inbound.items(),key=lambda x:-x[1])[:12]:
    mark='' if u in allpages else ' [NON-PAGE/asset?]'
    print('  %4d %s%s'%(c,u,mark))
