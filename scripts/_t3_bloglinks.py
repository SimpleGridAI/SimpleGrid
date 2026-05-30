import re
from bs4 import BeautifulSoup
# blog slug -> [(tool_slug, anchor)]
MAP={
 'the-real-cost-of-running-your-factory-on-spreadsheets':[('job-cost-calculator','Job Cost Calculator'),('oee-calculator','OEE Calculator'),('scrap-waste-calculator','Scrap & Waste Calculator')],
 'how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot':[('job-cost-calculator','Job Cost Calculator'),('markup-vs-margin','Markup vs Margin Calculator'),('break-even-calculator','Break-Even Calculator')],
 'how-simplegrid-makes-erp-customization-take-minutes-not-months':[('erp-needs-assessment','Do I Need an ERP?'),('erp-readiness-scorecard','ERP Readiness Scorecard')],
 'why-your-warehouse-manager-should-be-your-erp-s-first-user':[('reorder-point-calculator','Reorder Point Calculator'),('operations-health-score','Operations Health Score')],
 'dynamics-gp-sunset-switch-to-simplegrid':[('erp-needs-assessment','Do I Need an ERP?'),('erp-readiness-scorecard','ERP Readiness Scorecard')],
 'what-happens-when-your-erp-cannot-keep-up-with-your-business':[('erp-readiness-scorecard','ERP Readiness Scorecard'),('digital-maturity-assessment','Digital Maturity Assessment')],
 'why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software':[('erp-needs-assessment','Do I Need an ERP?'),('manufacturing-kpi-benchmark','Manufacturing KPI Benchmark')],
 'the-myth-of-erp-best-practices-your-operation-is-not-generic':[('erp-readiness-scorecard','ERP Readiness Scorecard'),('erp-needs-assessment','Do I Need an ERP?')],
}
done=0
for slug,tools in MAP.items():
    f='blog/%s/index.html'%slug
    raw=open(f,encoding='utf-8').read()
    if 'related-tools' in raw: continue
    links=''.join('<li><a href="/tools/%s/">%s</a></li>'%(t,a) for t,a in tools)
    block=('\n<section class="tool-seo related-tools"><div class="container-sm">'
           '<h2>Free tools mentioned in this article</h2>'
           '<ul class="related-tools-list">%s'
           '<li><a href="/tools/">See all 35 manufacturer tools</a></li>'
           '</ul></div></section>\n')%links
    raw=raw.replace('</main>', block+'</main>',1)
    open(f,'w',encoding='utf-8').write(raw); done+=1
print('blogs with tool links added:',done)
