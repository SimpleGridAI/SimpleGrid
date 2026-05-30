TOOL_LEADS={
 'oee-calculator':"OEE (Overall Equipment Effectiveness) = Availability x Performance x Quality. A world-class plant runs about 85%. Most factories that do not track it run 40 to 60%. Enter your shift numbers below to get your OEE and the single biggest loss, in dollars.",
 'job-cost-calculator':"True job cost = direct materials + direct labor + applied overhead (burden). Quote off true cost, not a guess, and you stop taking jobs that lose money. Enter your materials, labor hours, and rates to get cost, margin, and a suggested price.",
 'burden-rate-calculator':"Labor burden rate = total indirect labor cost / total direct labor cost. A worker paid $25 an hour usually costs $35 to $45 fully burdened once payroll taxes, benefits, and overhead are added. Enter your numbers to get your real hourly cost.",
 'break-even-calculator':"Break-even units = fixed costs / (price per unit minus variable cost per unit). Below it you lose money; above it you profit. Enter your costs and price to find the exact unit and dollar break-even point.",
 'reorder-point-calculator':"Reorder point = (average daily usage x lead time in days) + safety stock. Order at this level and you never run out or tie up cash in excess stock. Enter usage and lead time to get your reorder point and economic order quantity (EOQ).",
 'markup-vs-margin':"Markup and margin are not the same number. Margin = (price minus cost) / price. Markup = (price minus cost) / cost. A 50% markup is only a 33% margin. Enter cost and price to see both and stop underpricing by mistake.",
 'ebitda-calculator':"EBITDA = net income + interest + taxes + depreciation + amortization. It is the profit number buyers and lenders use to value a manufacturer. Enter your figures to get EBITDA, SDE, and your add-backs.",
 'scrap-waste-calculator':"Scrap cost = units scrapped x full per-unit cost (the materials, labor, and overhead already spent). Scrap is not just lost material, it is lost capacity. Enter your scrap rate and volumes to see the annual dollar cost.",
 'downtime-cost-calculator':"Downtime cost per hour = lost units per hour x contribution margin per unit + idle labor + restart cost. One hour down is rarely just an hour. Enter your line numbers to get the true hourly and annual cost.",
 'revenue-per-employee':"Revenue per employee = annual revenue / full-time employees. US mid-market manufacturers typically run $150K to $300K per employee; top performers exceed $400K. Enter your numbers to see where you rank.",
}
BLOG_LEADS={
 'the-real-cost-of-running-your-factory-on-spreadsheets':"Key takeaway: the real cost of running a factory on spreadsheets is not the software, it is the margin variance you catch months late, the hours lost to double entry, and decisions made on numbers that were already stale. For a mid-size shop it routinely runs into six figures a year.",
 'how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot':"Key takeaway: true landed cost per SKU = unit price + freight + duties + insurance + handling + brokerage, spread across the units in the shipment. Most manufacturers price off unit price alone and quietly lose margin on every imported SKU.",
 'how-simplegrid-makes-erp-customization-take-minutes-not-months':"Key takeaway: traditional ERP charges for every change because the change touches rigid, shared module code. SimpleGrid models your operation as an SG Schema, so a change is a configuration edit, not a software project, which is why it takes minutes instead of months.",
 'why-your-warehouse-manager-should-be-your-erp-s-first-user':"Key takeaway: your warehouse manager should be your ERP's first user because inventory accuracy is the foundation every other number depends on. If the floor will not use the system, the system is wrong, not the floor.",
 'dynamics-gp-sunset-switch-to-simplegrid':"Key takeaway: Microsoft is sunsetting Dynamics GP, and GP shops need a migration path before support ends. SimpleGrid builds a custom replacement modeled on your operation and deploys it in 7 to 21 days, paid only after it runs on your floor.",
}
import glob
nt=0
for slug,lead in TOOL_LEADS.items():
    f='tools/%s/index.html'%slug
    raw=open(f,encoding='utf-8').read()
    if 'tool-lead' in raw: continue
    blk='</h1>\n    <p class="tool-lead">%s</p>'%lead
    if '</h1>' in raw:
        raw=raw.replace('</h1>',blk,1); open(f,'w').write(raw); nt+=1
nb=0
for slug,lead in BLOG_LEADS.items():
    f='blog/%s/index.html'%slug
    raw=open(f,encoding='utf-8').read()
    if 'post-lead' in raw: continue
    anchor='<section class="post-content">'
    if anchor in raw:
        raw=raw.replace(anchor, anchor+'\n<p class="post-lead"><strong>%s</strong></p>'%lead,1)
        open(f,'w').write(raw); nb+=1
print('tool leads added:',nt,'| blog leads added:',nb)
# guardrail check
for d in list(TOOL_LEADS.values())+list(BLOG_LEADS.values()):
    assert '—' not in d, 'EM DASH'
print('no em dashes: OK')
