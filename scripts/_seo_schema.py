import os,re,json,glob,csv,collections
from bs4 import BeautifulSoup
ROOT=os.getcwd()
def url_for(path):
    rel=os.path.relpath(path,ROOT)
    if rel=='index.html': return '/'
    m=re.match(r'^(tools|blog|competitors)/([^/]+)/index\.html$',rel)
    if m: return '/%s/%s/'%(m.group(1),m.group(2))
    if rel=='tools/index.html': return '/tools/'
    if rel=='furniture-erp/index.html': return '/furniture-erp/'
    return '/'+rel
def ptype(rel):
    if rel.startswith('tools/'): return 'tool' if rel!='tools/index.html' else 'tool-index'
    if rel.startswith('blog/'): return 'blog'
    if rel.startswith('competitors/'): return 'competitor'
    if rel=='competitors.html': return 'competitor-hub'
    if rel=='blog.html': return 'blog-hub'
    if rel=='furniture-erp/index.html': return 'vertical'
    if rel.startswith('case-'): return 'case'
    if rel in('about.html','pricing.html','product.html','sg-schema.html','index.html'): return 'marketing'
    return 'legal-utility'
files=[p for p in glob.glob(ROOT+'/**/*.html',recursive=True)
       if not os.path.relpath(p,ROOT).startswith(('node_modules/','.node/','.git/','assets/')) and os.path.relpath(p,ROOT)!='post.html']
allnodes={}  # url -> list of (type, dict)
parse_err=[]
for p in files:
    rel=os.path.relpath(p,ROOT); url=url_for(p)
    soup=BeautifulSoup(open(p,encoding='utf-8',errors='replace').read(),'html.parser')
    nodes=[]
    for s in soup.find_all('script',type='application/ld+json'):
        try: data=json.loads(s.string or '{}')
        except Exception: parse_err.append(url); continue
        def walk(d):
            if isinstance(d,dict):
                if '@graph' in d:
                    for g in d['@graph']: walk(g)
                t=d.get('@type')
                if t:
                    for tt in (t if isinstance(t,list) else [t]): nodes.append((tt,d))
            elif isinstance(d,list):
                for x in d: walk(x)
        walk(data)
    allnodes[url]=(ptype(rel),nodes)
# type counts per page-type
typmatrix=collections.defaultdict(collections.Counter)
for url,(pt,nodes) in allnodes.items():
    for t,_ in nodes: typmatrix=typmatrix
    for t,_ in nodes: typematrix=0
allurltypes={url:[t for t,_ in nodes] for url,(pt,nodes) in allnodes.items()}
# explicit counts
tools=[u for u,(pt,n) in allnodes.items() if pt=='tool']
blogs=[u for u,(pt,n) in allnodes.items() if pt=='blog']
def has(url,typ): return typ in allurltypes[url]
tools_howto=[u for u in tools if has(u,'HowTo')]
tools_faq=[u for u in tools if has(u,'FAQPage')]
tools_softapp=[u for u in tools if has(u,'SoftwareApplication') or has(u,'WebApplication')]
# blog article completeness
blog_article=[]
blog_full=[]
for u in blogs:
    pt,nodes=allnodes[u]
    arts=[d for t,d in nodes if t in ('Article','BlogPosting','TechArticle','NewsArticle')]
    if arts:
        blog_article.append(u)
        a=arts[0]
        if a.get('author') and a.get('datePublished') and a.get('dateModified'):
            blog_full.append(u)
blog_faq=[u for u in blogs if has(u,'FAQPage')]
# breadcrumb on nested (tools, blog, competitors)
nested=[u for u,(pt,n) in allnodes.items() if pt in('tool','blog','competitor')]
nested_bc=[u for u in nested if has(u,'BreadcrumbList')]
nested_nobc=[u for u in nested if not has(u,'BreadcrumbList')]
print('PARSE ERRORS:',set(parse_err) or 'none')
print('=== TYPE x PAGETYPE matrix ===')
m=collections.defaultdict(collections.Counter)
for url,(pt,nodes) in allnodes.items():
    seen=set(t for t,_ in nodes)
    for t in seen: m[pt][t]+=1
    m[pt]['_PAGES']+=1
for pt in sorted(m):
    print(pt, dict(m[pt]))
print('=== EXPLICIT COUNTS ===')
print('TOOLS total:',len(tools))
print('  tools w/ HowTo:',len(tools_howto), tools_howto[:3],'...' if len(tools_howto)>3 else '')
print('  tools w/ FAQPage:',len(tools_faq))
print('  tools w/ SoftwareApplication/WebApplication:',len(tools_softapp))
print('BLOGS total:',len(blogs))
print('  blogs w/ Article-type:',len(blog_article))
print('  blogs w/ Article+author+datePublished+dateModified:',len(blog_full))
print('  blogs w/ FAQPage:',len(blog_faq))
print('NESTED pages:',len(nested),'| w/ BreadcrumbList:',len(nested_bc),'| WITHOUT:',len(nested_nobc))
print('  nested WITHOUT breadcrumb:',nested_nobc[:50])
# org sameAs / aggregateRating presence
home_org=[d for t,d in allnodes['/'][1] if t=='Organization']
print('=== ORG schema on / ===')
if home_org:
    o=home_org[0]
    print('  name:',o.get('name'),'| sameAs:',o.get('sameAs'))
    print('  keys:',list(o.keys()))
soft=[d for u in allnodes for t,d in allnodes[u][1] if t in('SoftwareApplication','WebApplication')]
print('SoftwareApplication instances total:',len(soft))
if soft:
    print('  sample keys:',list(soft[0].keys()), '| offers?', 'offers' in soft[0],'| aggregateRating?', 'aggregateRating' in soft[0])
