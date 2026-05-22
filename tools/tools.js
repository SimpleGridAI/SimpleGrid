/* Shared helpers for every /tools/* page.
   No framework. jsPDF loaded via <script> tag in each page's <head>. */

// ----- localStorage namespacing -----
const SG_NS = 'sg_tools_';
function sgSave(key, value) {
  try { localStorage.setItem(SG_NS + key, JSON.stringify(value)); }
  catch (e) { /* localStorage full or disabled — silently ignore */ }
}
function sgLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(SG_NS + key);
    return raw ? JSON.parse(raw) : (fallback ?? null);
  } catch (e) { return fallback ?? null; }
}

// ----- formatting -----
const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const NUM = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function money(n) { return USD.format(Number(n) || 0); }
function num(n)   { return NUM.format(Number(n) || 0); }
function todayISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function addDays(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function fmtDateUS(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return m + '/' + d + '/' + y;
}

// ----- sequential doc number generator (per tool, per browser) -----
function nextDocNumber(prefix, key) {
  const last = sgLoad(key + '_last_num', 0);
  const next = last + 1;
  sgSave(key + '_last_num', next);
  const yr = new Date().getFullYear();
  return prefix + '-' + yr + '-' + String(next).padStart(4, '0');
}

// ----- PDF builder helper. Tools call this with their own spec. -----
function sgBuildPdf(spec) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('PDF library is still loading — wait a moment and try again.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' }); // US Letter
  const W = doc.internal.pageSize.getWidth();
  const M = 48; // margin

  // Header band
  doc.setFillColor(52, 97, 224); // sg-blue
  doc.rect(0, 0, W, 6, 'F');

  // Document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(20, 22, 28);
  doc.text(spec.title || 'Document', M, 50);

  // Doc number + date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(110, 116, 128);
  let metaY = 70;
  if (spec.docNumber) { doc.text(spec.docNumberLabel + ': ' + spec.docNumber, M, metaY); metaY += 14; }
  if (spec.date)      { doc.text('Date: ' + fmtDateUS(spec.date), M, metaY); metaY += 14; }
  if (spec.dueDate)   { doc.text(spec.dueDateLabel + ': ' + fmtDateUS(spec.dueDate), M, metaY); metaY += 14; }
  if (spec.terms)     { doc.text('Terms: ' + spec.terms, M, metaY); metaY += 14; }

  // Two-column "From / To" block
  let topBlockY = metaY + 10;
  function partyBlock(x, title, lines) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(110, 116, 128);
    doc.text(title.toUpperCase(), x, topBlockY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(20, 22, 28);
    let y = topBlockY + 14;
    lines.filter(Boolean).forEach(line => { doc.text(String(line), x, y); y += 12; });
    return y;
  }
  let y1 = partyBlock(M, spec.fromLabel || 'From', spec.from || []);
  let y2 = partyBlock(W / 2 + 10, spec.toLabel || 'To', spec.to || []);
  let bodyStartY = Math.max(y1, y2) + 16;

  // Line items table
  if (spec.items && spec.items.length) {
    doc.autoTable({
      startY: bodyStartY,
      margin: { left: M, right: M },
      head: [spec.itemColumns || ['SKU', 'Description', 'Qty', 'Unit Price', 'Amount']],
      body: spec.items.map(spec.itemRowMapper || (it => [
        it.sku || '',
        it.desc || '',
        it.qty != null ? num(it.qty) : '',
        money(it.price),
        money((Number(it.qty) || 0) * (Number(it.price) || 0))
      ])),
      headStyles: { fillColor: [52, 97, 224], textColor: 255, fontSize: 9, halign: 'left' },
      bodyStyles: { fontSize: 10, textColor: [20, 22, 28] },
      columnStyles: spec.itemColumnStyles || {
        0: { cellWidth: 70 },
        2: { halign: 'right', cellWidth: 50 },
        3: { halign: 'right', cellWidth: 80 },
        4: { halign: 'right', cellWidth: 80 }
      },
      styles: { cellPadding: 6 }
    });
    bodyStartY = doc.lastAutoTable.finalY + 10;
  }

  // Totals block
  if (spec.totals && spec.totals.length) {
    doc.setFontSize(10);
    const xLabel = W - M - 200;
    const xValue = W - M;
    spec.totals.forEach((row, i) => {
      const isGrand = row.bold || i === spec.totals.length - 1;
      doc.setFont('helvetica', isGrand ? 'bold' : 'normal');
      doc.setFontSize(isGrand ? 12 : 10);
      doc.setTextColor(isGrand ? 20 : 70, isGrand ? 22 : 80, isGrand ? 28 : 96);
      doc.text(row.label, xLabel, bodyStartY, { align: 'left' });
      doc.text(money(row.value), xValue, bodyStartY, { align: 'right' });
      bodyStartY += isGrand ? 18 : 14;
    });
    bodyStartY += 6;
  }

  // Notes / footer
  if (spec.notes) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(110, 116, 128);
    doc.text('NOTES', M, bodyStartY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(20, 22, 28);
    const split = doc.splitTextToSize(spec.notes, W - 2 * M);
    doc.text(split, M, bodyStartY + 18);
    bodyStartY += 18 + split.length * 12;
  }

  // Footer credit
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 116, 128);
  const footY = doc.internal.pageSize.getHeight() - 28;
  doc.text('Generated with SimpleGrid free tools — simplegrid.ai/tools/', M, footY);

  doc.save(spec.filename || 'document.pdf');
}

// ----- CSV export helper -----
function sgDownloadCSV(filename, rows) {
  const escape = v => {
    const s = String(v == null ? '' : v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const csv = rows.map(r => r.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}

// ----- Reusable: hook up "Save my company" pattern -----
function sgBindFields(fieldIdsToStorageKey) {
  // fieldIdsToStorageKey = { 'company-name': 'mycompany_name', ... }
  // Auto-load + auto-save on blur.
  Object.entries(fieldIdsToStorageKey).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const saved = sgLoad(key);
    if (saved != null && el.value === '') el.value = saved;
    el.addEventListener('blur', () => sgSave(key, el.value));
  });
}
