import csv,collections,re
rows=list(csv.DictReader(open('seo-audit-data/onpage_signals.csv')))
N=len(rows)
print('TOTAL PAGES:',N)
# titles/meta presence + length
def il(x):
    try:return int(x)
    except:return 0
miss_title=[r['url'] for r in rows if not r['title']]
miss_meta=[r['url'] for r in rows if not r['meta_desc']]
print('missing title:',len(miss_title),miss_title)
print('missing meta:',len(miss_meta),miss_meta)
# title len ranges
tl_short=[(r['url'],il(r['title_len'])) for r in rows if il(r['title_len'])<50]
tl_long=[(r['url'],il(r['title_len'])) for r in rows if il(r['title_len'])>60]
ml_short=[(r['url'],il(r['meta_len'])) for r in rows if il(r['meta_len'])<140]
ml_long=[(r['url'],il(r['meta_len'])) for r in rows if il(r['meta_len'])>160]
print('TITLE <50:',len(tl_short),' 50-60:',sum(1 for r in rows if 50<=il(r['title_len'])<=60),' >60:',len(tl_long))
print('META <140:',len(ml_short),' 140-160:',sum(1 for r in rows if 140<=il(r['meta_len'])<=160),' >160:',len(ml_long))
print('TITLE>60 list:',[ '%s(%d)'%(u,l) for u,l in tl_long])
print('META>160 list:',[ '%s(%d)'%(u,l) for u,l in ml_long])
# collisions
def dups(field):
    c=collections.Counter(r[field].strip() for r in rows if r[field].strip())
    return {k:[r['url'] for r in rows if r[field].strip()==k] for k,v in c.items() if v>1}
print('--- DUP TITLES ---')
for k,v in dups('title').items(): print('  "%s" -> %s'%(k[:50],v))
print('--- DUP META ---')
for k,v in dups('meta_desc').items(): print('  "%s..." -> %s'%(k[:40],v))
print('--- DUP H1 ---')
for k,v in dups('h1').items(): print('  "%s" -> %s'%(k[:45],v))
# multiple/zero H1
print('--- H1 issues ---')
for r in rows:
    if il(r['n_h1'])!=1: print('  n_h1=%s %s'%(r['n_h1'],r['url']))
# hierarchy invalid
print('--- hierarchy invalid ---', [r['url'] for r in rows if r['hierarchy_valid']!='yes'])
# html lang / og / twitter
print('html lang != en:',[ (r['url'],r['html_lang']) for r in rows if r['html_lang']!='en'])
print('missing og:image:',[r['url'] for r in rows if r['og_image']!='y'])
print('missing twitter card:',[r['url'] for r in rows if r['twitter_card']=='n'])
print('missing canonical:',[r['url'] for r in rows if not r['canonical']])
print('robots noindex pages:',[ (r['url'],r['robots']) for r in rows if 'noindex' in r['robots'].lower()])
# word count buckets
b=collections.Counter()
for r in rows:
    w=il(r['word_count'])
    b['<300' if w<300 else '300-800' if w<800 else '800-1500' if w<1500 else '1500+']+=1
print('WORDCOUNT buckets:',dict(b))
thin=[(r['url'],il(r['word_count'])) for r in rows if il(r['word_count'])<300]
print('THIN(<300):',len(thin),[ '%s(%d)'%(u,w) for u,w in sorted(thin,key=lambda x:x[1])])
# by type word median
import statistics
for t in ['tool','blog','competitor','marketing','case-study']:
    ws=[il(r['word_count']) for r in rows if r['type']==t]
    if ws: print('  WC %s: n=%d min%d median%d max%d'%(t,len(ws),min(ws),int(statistics.median(ws)),max(ws)))
