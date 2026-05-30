import glob,re
from bs4 import BeautifulSoup
# clusters of related tools
CLUSTERS={
 'costing':['oee-calculator','burden-rate-calculator','job-cost-calculator','break-even-calculator','scrap-waste-calculator','downtime-cost-calculator','cost-of-poor-quality','capacity-planning-calculator','make-vs-buy-calculator','markup-vs-margin','reorder-point-calculator','manufacturing-kpi-benchmark','automation-roi-estimator','hire-vs-overtime','expansion-roi-calculator'],
 'valuation':['business-valuation-calculator','ebitda-calculator','sde-calculator','exit-readiness-scorecard','customer-concentration-risk','revenue-per-employee','lease-vs-buy-equipment'],
 'erp':['erp-needs-assessment','erp-readiness-scorecard','digital-maturity-assessment','operations-health-score'],
 'compliance':['iso-9001-readiness','osha-compliance-checklist','quality-inspection-checklist','insurance-coverage-checklist'],
 'generators':['invoice-generator','quote-generator','purchase-order-generator','bill-of-materials-template','production-schedule-template'],
}
PILLAR={'valuation':None,'erp':None}  # filled by T5 pillars later
slug2cluster={}
for c,ss in CLUSTERS.items():
    for s in ss: slug2cluster[s]=c
def shortname(slug):
    s=BeautifulSoup(open('tools/%s/index.html'%slug).read(),'html.parser')
    t=s.title.get_text().strip()
    t=re.split(r'\s*\|\s*',t)[0]
    t=re.split(r'\s+[-–]\s+',t)[0]
    return t.strip()
names={s:shortname(s) for s in slug2cluster}
done=0
for slug,cl in slug2cluster.items():
    f='tools/%s/index.html'%slug
    raw=open(f,encoding='utf-8').read()
    if 'related-tools' in raw: continue
    sibs=[s for s in CLUSTERS[cl] if s!=slug][:3]
    if len(sibs)<3:  # top up from any cluster
        extra=[s for s in slug2cluster if s!=slug and s not in sibs]
        sibs=(sibs+extra)[:3]
    links=''.join('<li><a href="../%s/">%s</a></li>'%(s,names[s]) for s in sibs)
    block=('\n<section class="tool-seo related-tools"><div class="container-sm">'
           '<h2>Related free tools for manufacturers</h2>'
           '<ul class="related-tools-list">%s'
           '<li><a href="../">See all 35 manufacturer tools</a></li>'
           '</ul></div></section>\n')%links
    if '</main>' in raw:
        raw=raw.replace('</main>', block+'</main>',1)
        open(f,'w',encoding='utf-8').write(raw); done+=1
print('tool cross-link blocks added:',done)
