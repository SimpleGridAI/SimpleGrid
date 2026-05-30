import json,glob,re
from bs4 import BeautifulSoup

PERSON_ID="https://simplegrid.ai/#mukund"
PERSON_INLINE={"@type":"Person","name":"Mukund Agarwal","url":"https://simplegrid.ai/about.html","jobTitle":"Founder","worksFor":{"@id":"https://simplegrid.ai/#org"}}

# ---- 1. index.html: expand Organization + add Person node ----
f='index.html'
raw=open(f,encoding='utf-8').read()
soup=BeautifulSoup(raw,'html.parser')
target=None
for b in soup.find_all('script',type='application/ld+json'):
    try: d=json.loads(b.string)
    except: continue
    if isinstance(d,dict) and '@graph' in d:
        types=[n.get('@type') for n in d['@graph'] if isinstance(n,dict)]
        if 'Organization' in types: target=b; data=d; break
changed=False
for n in data['@graph']:
    if n.get('@type')=='Organization':
        n.setdefault('legalName','Valaya AI Technologies Pvt. Ltd.')
        n['founder']={"@id":PERSON_ID}
        sa=n.get('sameAs',[])
        for u in ["https://github.com/SimpleGridAI"]:
            if u not in sa: sa.append(u)
        n['sameAs']=sa
        changed=True
# add Person node if absent
if not any(isinstance(n,dict) and n.get('@id')==PERSON_ID for n in data['@graph']):
    data['@graph'].append({
        "@type":"Person","@id":PERSON_ID,"name":"Mukund Agarwal","jobTitle":"Founder",
        "worksFor":{"@id":"https://simplegrid.ai/#org"},"url":"https://simplegrid.ai/about.html",
        "sameAs":["https://www.linkedin.com/in/mdagarwal/"]
    })
new_json="\n"+json.dumps(data,ensure_ascii=False,indent=1)+"\n"
raw=raw.replace(target.string,new_json,1)
open(f,'w',encoding='utf-8').write(raw)
print('index.html Organization expanded + Person node added:',changed)

# ---- 2. blogs: author Organization -> Person ----
OLD_BLOG='"author": { "@type": "Organization", "@id": "https://simplegrid.ai/#org" }'
NEW_AUTHOR='"author": '+json.dumps(PERSON_INLINE,ensure_ascii=False)
nb=0
for p in glob.glob('blog/*/index.html'):
    r=open(p,encoding='utf-8').read()
    if OLD_BLOG in r:
        open(p,'w',encoding='utf-8').write(r.replace(OLD_BLOG,NEW_AUTHOR)); nb+=1
print('blogs author->Person:',nb)

# ---- 3. cases: author -> Person ----
OLD_CASE='"author": { "@id": "https://simplegrid.ai/#org" }'
nc=0
for p in ['case-apex.html','case-furniture-manufacturer.html']:
    r=open(p,encoding='utf-8').read()
    if OLD_CASE in r:
        open(p,'w',encoding='utf-8').write(r.replace(OLD_CASE,NEW_AUTHOR)); nc+=1
print('cases author->Person:',nc)

# ---- 4. blog template ----
tp='scripts/generate-blog-pages.py'
r=open(tp,encoding='utf-8').read()
old_t='"author": {{ "@type": "Organization", "@id": "https://simplegrid.ai/#org" }}'
new_t='"author": {{ "@type": "Person", "name": "Mukund Agarwal", "url": "https://simplegrid.ai/about.html", "jobTitle": "Founder", "worksFor": {{ "@id": "https://simplegrid.ai/#org" }} }}'
if old_t in r:
    open(tp,'w',encoding='utf-8').write(r.replace(old_t,new_t)); print('blog template updated: yes')
else: print('blog template: pattern not found (manual check)')
