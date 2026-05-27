/* Shared helpers for every /tools/* page.
   No framework. jsPDF loaded via <script> tag in each page's <head>. */

// ----- localStorage namespacing -----
const SG_NS = 'sg_tools_';
function sgSave(key, value) {
  try { localStorage.setItem(SG_NS + key, JSON.stringify(value)); }
  catch (e) { /* localStorage full or disabled - silently ignore */ }
}
function sgLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(SG_NS + key);
    return raw ? JSON.parse(raw) : (fallback ?? null);
  } catch (e) { return fallback ?? null; }
}
// Like sgLoad, but each loaded item is run through validate(item). Items that
// fail validation are dropped; if the loaded value is not an array, fallback
// is returned. Defends against localStorage poisoning (CWE-915 / stored XSS
// vectors) by enforcing a schema at read time.
function sgLoadArray(key, validate, fallback) {
  const fb = Array.isArray(fallback) ? fallback : [];
  let raw;
  try { raw = localStorage.getItem(SG_NS + key); } catch (e) { return fb; }
  if (!raw) return fb;
  let parsed;
  try { parsed = JSON.parse(raw); } catch (e) { return fb; }
  if (!Array.isArray(parsed)) return fb;
  const fn = typeof validate === 'function' ? validate : () => true;
  const out = [];
  for (let i = 0; i < parsed.length && i < 1000; i++) {
    try { if (fn(parsed[i])) out.push(parsed[i]); } catch (e) { /* drop */ }
  }
  return out;
}
// Schema-validator factories used by tools that persist row arrays.
const sgIsStr = v => typeof v === 'string' && v.length <= 5000;
const sgIsISODate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(new Date(v).getTime());
const sgIsEnum = (allowed) => v => typeof v === 'string' && allowed.indexOf(v) !== -1;

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
// Supported optional spec keys: brandColor (#hex), logoDataUrl (data: URL of logo).
function _hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  hex = hex.replace('#','').trim();
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length !== 6) return null;
  const n = parseInt(hex, 16);
  if (isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function sgBuildPdf(spec) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    sgToast('PDF library is still loading - wait a moment and try again.', { type: 'error', duration: 6000 });
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' }); // US Letter
  const W = doc.internal.pageSize.getWidth();
  const M = 48; // margin

  // Brand color: defaults to SimpleGrid blue if not provided
  const brandRgb = _hexToRgb(spec.brandColor) || [52, 97, 224];

  // Header band
  doc.setFillColor(brandRgb[0], brandRgb[1], brandRgb[2]);
  doc.rect(0, 0, W, 6, 'F');

  // Optional logo at top-right of header area. Auto-fits to 130×55pt box.
  let titleX = M;
  if (spec.logoDataUrl) {
    try {
      const props = doc.getImageProperties(spec.logoDataUrl);
      const maxW = 130, maxH = 55;
      const ratio = Math.min(maxW / props.width, maxH / props.height);
      const w = props.width * ratio, h = props.height * ratio;
      doc.addImage(spec.logoDataUrl, props.fileType || 'PNG', W - M - w, 24, w, h);
    } catch (e) {
      console.warn('Logo embed failed:', e);
    }
  }

  // Document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(20, 22, 28);
  doc.text(spec.title || 'Document', titleX, 50);

  // Doc number + date (wrap the terms line in case it's long, e.g. payment-terms +
  // ship-via concatenation on quotes)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(110, 116, 128);
  let metaY = 70;
  const metaMaxWidth = W - 2 * M; // full content width for meta lines
  function metaLine(text) {
    const wrapped = doc.splitTextToSize(String(text), metaMaxWidth);
    doc.text(wrapped, M, metaY);
    metaY += 14 * wrapped.length;
  }
  if (spec.docNumber) metaLine(spec.docNumberLabel + ': ' + spec.docNumber);
  if (spec.date)      metaLine('Date: ' + fmtDateUS(spec.date));
  if (spec.dueDate)   metaLine(spec.dueDateLabel + ': ' + fmtDateUS(spec.dueDate));
  if (spec.terms)     metaLine('Terms: ' + spec.terms);

  // Two-column "From / To" block. Each column gets equal width with a 20pt gap so
  // long address lines wrap inside their column instead of spilling into the other.
  const COL_GAP = 20;
  const colWidth = (W - 2 * M - COL_GAP) / 2; // ~248pt on US Letter
  const leftX  = M;
  const rightX = M + colWidth + COL_GAP;
  let topBlockY = metaY + 10;
  function partyBlock(x, title, lines, maxWidth) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(110, 116, 128);
    doc.text(title.toUpperCase(), x, topBlockY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(20, 22, 28);
    let y = topBlockY + 14;
    lines.filter(Boolean).forEach(line => {
      const wrapped = doc.splitTextToSize(String(line), maxWidth);
      doc.text(wrapped, x, y);
      y += 12 * wrapped.length;
    });
    return y;
  }
  let y1 = partyBlock(leftX,  spec.fromLabel || 'From', spec.from || [], colWidth);
  let y2 = partyBlock(rightX, spec.toLabel   || 'To',   spec.to   || [], colWidth);
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
      headStyles: { fillColor: brandRgb, textColor: 255, fontSize: 9, halign: 'left' },
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
  doc.text('Generated with SimpleGrid productive tools - simplegrid.ai/tools/', M, footY);

  doc.save(spec.filename || 'document.pdf');
}

// ----- CSV export helper -----
// Defends against CSV / formula injection (OWASP / CWE-1236): any cell whose
// raw value starts with =, +, -, @, tab, or CR could be interpreted as a
// formula by Excel/Sheets/Numbers. Prefix those cells with a leading apostrophe
// so the spreadsheet treats them as literal text.
function sgDownloadCSV(filename, rows) {
  const FORMULA_PREFIX = /^[=+\-@\t\r]/;
  const escape = v => {
    let s = String(v == null ? '' : v);
    if (FORMULA_PREFIX.test(s)) s = "'" + s;
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

// ===== Shared validation helpers (sg* prefix) =====
// Use across every tool so behavior is consistent.

// Render an inline warning banner inside a result panel. The panel must have a
// <div data-sg-warn></div> placeholder (or pass a custom selector). Pass an
// empty array (or empty string) to clear the panel.
function sgWarnPanel(panelEl, warnings) {
  if (!panelEl) return;
  let host = panelEl.querySelector('[data-sg-warn]');
  if (!host) {
    host = document.createElement('div');
    host.setAttribute('data-sg-warn', '');
    panelEl.insertBefore(host, panelEl.firstChild);
  }
  const list = Array.isArray(warnings) ? warnings.filter(Boolean) : (warnings ? [warnings] : []);
  if (list.length === 0) { host.innerHTML = ''; return; }
  host.innerHTML = '<div class="sg-warn-box">' +
    '<div class="sg-warn-title">Heads up - these inputs need a second look:</div>' +
    '<ul class="sg-warn-list">' +
    list.map(w => '<li>' + sgEscapeHtml(w) + '</li>').join('') +
    '</ul></div>';
}

// Pure numeric clamp helper. No DOM. Returns [clamped, wasChanged].
function sgClampNum(n, min, max) {
  let v = Number(n);
  if (!Number.isFinite(v)) return [min != null ? min : 0, true];
  let changed = false;
  if (typeof min === 'number' && v < min) { v = min; changed = true; }
  if (typeof max === 'number' && v > max) { v = max; changed = true; }
  return [v, changed];
}

// Safe-divide: returns 0 if denominator is 0/NaN/Infinity instead of producing
// Infinity or NaN. Math math.
function sgSafeDiv(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return 0;
  const r = a / b;
  return Number.isFinite(r) ? r : 0;
}

// Escape a string for safe insertion into an HTML attribute or text node.
// Prevents stored-XSS when prefill values are interpolated into innerHTML.
function sgEscapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Non-blocking toast notification. Replaces alert() for tool feedback so the
// renderer never freezes on a modal dialog (browsers + automation hang on
// alerts). opts.type: 'error' | 'info' | 'success'. opts.duration: ms.
function sgToast(message, opts) {
  opts = opts || {};
  const type = opts.type || 'info';
  const dur = typeof opts.duration === 'number' ? opts.duration : 4000;
  let host = document.getElementById('sg-toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'sg-toast-host';
    host.setAttribute('aria-live', 'polite');
    host.setAttribute('role', 'status');
    document.body.appendChild(host);
  }
  const t = document.createElement('div');
  t.className = 'sg-toast sg-toast-' + type;
  t.textContent = message;
  host.appendChild(t);
  requestAnimationFrame(() => t.classList.add('sg-toast-in'));
  setTimeout(() => {
    t.classList.remove('sg-toast-in');
    setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 250);
  }, dur);
}

// Validate that an input contains a plausible email. Empty values pass (use
// data-required for required-ness). Returns true on pass.
function sgValidateEmail(el) {
  if (!el) return true;
  const v = (el.value || '').trim();
  if (!v) return true;
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if (!ok) {
    sgFlashField(el);
    el.focus();
    sgToast('That email address does not look right: ' + v, { type: 'error' });
    return false;
  }
  return true;
}

// Clamp a numeric input to [min, max]. Returns the clamped number.
// Pass {silent:true} to suppress the visual nudge.
function sgClampInput(el, min, max, opts) {
  if (!el) return 0;
  opts = opts || {};
  let v = parseFloat(el.value);
  if (isNaN(v)) v = 0;
  let clamped = v;
  if (typeof min === 'number' && clamped < min) clamped = min;
  if (typeof max === 'number' && clamped > max) clamped = max;
  if (clamped !== v) {
    el.value = clamped;
    if (!opts.silent) {
      sgFlashField(el);
      const rangeLo = typeof min === 'number' ? min : '−∞';
      const rangeHi = typeof max === 'number' ? max : '∞';
      const label = (el.labels && el.labels[0] ? el.labels[0].textContent.trim() : (el.placeholder || el.name || 'value'));
      sgToast(label + ': adjusted to ' + clamped + ' (allowed range ' + rangeLo + '–' + rangeHi + ')', { type: 'info' });
    }
  }
  return clamped;
}

// Briefly highlight a field that just had its value corrected/rejected.
function sgFlashField(el) {
  if (!el) return;
  const prev = el.style.boxShadow;
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.30)';
  setTimeout(() => { el.style.boxShadow = prev; }, 700);
}

// Apply min/max to every input matching a selector. Selector defaults to
// all number/text inputs with a data-clamp attribute. The data-clamp value is
// "min,max" (either side optional, e.g. "0,100" or "0," or ",100").
// On 'input' the value is clamped silently and the pre-clamp raw is recorded;
// on 'blur' a single toast fires if the raw differed from the clamped value.
function sgWireNumericClamps(scope) {
  scope = scope || document;
  scope.querySelectorAll('[data-clamp]').forEach(el => {
    if (el.dataset.sgClamped) return;
    el.dataset.sgClamped = '1';
    const [minStr, maxStr] = el.getAttribute('data-clamp').split(',');
    const min = minStr === '' ? undefined : parseFloat(minStr);
    const max = maxStr === '' ? undefined : parseFloat(maxStr);
    if (typeof min === 'number') el.setAttribute('min', min);
    if (typeof max === 'number') el.setAttribute('max', max);
    // Cap visible character length so users can't paste numbers that exceed
    // safe-integer math and visually overflow the cell.
    if (typeof max === 'number' && !el.getAttribute('maxlength')) {
      el.setAttribute('maxlength', String(Math.max(10, String(Math.floor(max)).length + 4)));
    }
    // Clamp on input (silent), but record the pre-clamp raw so blur can
    // explain it. Capture phase so the clamp lands BEFORE tool-specific recalc.
    el.addEventListener('input', () => {
      const raw = parseFloat(el.value);
      const clamped = sgClampInput(el, min, max, { silent: true });
      if (Number.isFinite(raw) && raw !== clamped) el.dataset.sgRawOob = String(raw);
      else delete el.dataset.sgRawOob;
    }, true);
    el.addEventListener('blur', () => {
      if (el.dataset.sgRawOob != null) {
        const raw = parseFloat(el.dataset.sgRawOob);
        const clamped = sgClampInput(el, min, max, { silent: true });
        const rangeLo = typeof min === 'number' ? min : '−∞';
        const rangeHi = typeof max === 'number' ? max : '∞';
        const label = (el.labels && el.labels[0] ? el.labels[0].textContent.trim() : (el.placeholder || el.name || 'value'));
        sgFlashField(el);
        sgToast(label + ': "' + raw + '" adjusted to ' + clamped + ' (allowed range ' + rangeLo + '–' + rangeHi + ')', { type: 'info' });
        delete el.dataset.sgRawOob;
      } else {
        sgClampInput(el, min, max, { silent: true });
      }
    });
  });
}

// Check that every element matching [data-required] has a non-empty value.
// Returns true if all required fields are filled; otherwise focuses the first
// empty one, highlights it, and returns false.
function sgValidateRequired(scope) {
  scope = scope || document;
  const empties = [];
  scope.querySelectorAll('[data-required]').forEach(el => {
    const v = (el.value || '').trim();
    if (!v) empties.push(el);
  });
  if (empties.length === 0) return true;
  empties.forEach(sgFlashField);
  empties[0].focus();
  const label = empties[0].labels && empties[0].labels[0] ? empties[0].labels[0].textContent.trim() : (empties[0].placeholder || empties[0].name || 'a required field');
  sgToast('Please fill in ' + label + ' before generating the PDF.', { type: 'error' });
  return false;
}

// Compare two date strings (YYYY-MM-DD). Returns -1/0/1 like compareFn.
function sgDateCmp(a, b) {
  if (!a || !b) return 0;
  return a < b ? -1 : (a > b ? 1 : 0);
}

// Validate that endDate >= startDate (both YYYY-MM-DD). Returns true if OK.
// If not OK, flashes both fields and shows a one-time alert.
function sgValidateDateOrder(startEl, endEl, label) {
  if (!startEl || !endEl) return true;
  const s = startEl.value, e = endEl.value;
  if (!s || !e) return true;
  if (sgDateCmp(e, s) < 0) {
    sgFlashField(startEl);
    sgFlashField(endEl);
    sgToast((label || 'End date') + ' must be on or after the start date. (' + s + ' to ' + e + ')', { type: 'error' });
    return false;
  }
  return true;
}

// Apply a sensible maxlength cap to any free-text input that doesn't already
// have one. Defends against pathological pastes (100k-char strings into a
// company-name field) that would bloat localStorage or produce malformed PDFs.
// Number inputs are handled by sgWireNumericClamps; this targets text/textarea.
function sgGuardFreeText(scope) {
  scope = scope || document;
  const TEXT_DEFAULT = 1000;
  scope.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input:not([type])').forEach(el => {
    if (!el.hasAttribute('maxlength')) el.setAttribute('maxlength', String(TEXT_DEFAULT));
    sgEnforceMaxLen(el);
  });
  scope.querySelectorAll('textarea').forEach(el => {
    if (!el.hasAttribute('maxlength')) el.setAttribute('maxlength', '5000');
    sgEnforceMaxLen(el);
  });
}

// Read an uploaded file and verify the bytes actually decode as an image
// before handing the data URL to the caller. Defends against a file that
// lies about its MIME type (e.g. .exe served as image/png). Calls
// onOk(dataUrl) on a successful image decode, onErr(message) otherwise.
function sgReadImageFile(file, onOk, onErr) {
  if (!file) { onErr && onErr('No file selected.'); return; }
  const fr = new FileReader();
  fr.onload = ev => {
    const dataUrl = ev.target.result;
    const probe = new Image();
    probe.onload = () => {
      if (!probe.naturalWidth || !probe.naturalHeight) {
        onErr && onErr('That file does not decode as an image. Use a PNG, JPG, WebP, or SVG.');
      } else {
        onOk && onOk(dataUrl);
      }
    };
    probe.onerror = () => onErr && onErr('That file is not a valid image. Use a PNG, JPG, WebP, or SVG.');
    probe.src = dataUrl;
  };
  fr.onerror = () => onErr && onErr('Could not read the file. Try a different image.');
  fr.readAsDataURL(file);
}

// Hard-truncate on the input event so a paste or programmatic value=... that
// slips past the browser's maxlength enforcement can't bloat downstream PDFs
// or localStorage. The browser usually catches typing but not paste in every
// engine, and never catches el.value = ....
function sgEnforceMaxLen(el) {
  if (!el || el.dataset.sgMaxlenWired) return;
  el.dataset.sgMaxlenWired = '1';
  el.addEventListener('input', () => {
    const max = parseInt(el.getAttribute('maxlength'), 10);
    if (max > 0 && (el.value || '').length > max) {
      el.value = el.value.slice(0, max);
      sgFlashField(el);
    }
  });
}
// Run once at DOM ready so every tool gets the cap without needing per-page
// wiring. Idempotent: if a field already has a maxlength, it's left alone.
document.addEventListener('DOMContentLoaded', () => { try { sgGuardFreeText(document); } catch (e) {} });

// Wire a "X of N answered" progress hint for a scorecard/diagnostic. Pass:
//   - hintId: id of the host element (<span> or <div>) that will receive text
//   - radioNames: array of radio-group names that must each have a selection
//   - btnId: id of the submit/PDF button to enable when all are answered
//   - label: optional noun for the message ("questions", "items"); default "questions"
// Updates on any radio change in the document. Idempotent per page.
function sgScorecardProgress(hintId, radioNames, btnId, label) {
  const host = document.getElementById(hintId);
  const btn = document.getElementById(btnId);
  if (!host || !radioNames || !radioNames.length) return;
  const noun = label || 'questions';
  const total = radioNames.length;
  const update = () => {
    let answered = 0;
    for (const n of radioNames) {
      if (document.querySelector('input[name="' + n + '"]:checked')) answered++;
    }
    const complete = answered >= total;
    host.textContent = answered + ' of ' + total + ' ' + noun + ' answered' +
      (complete ? ' — ready to download.' : ' — answer all to enable the PDF.');
    host.style.color = complete ? '#15803d' : 'var(--fg3, #6b7280)';
    if (btn) btn.disabled = !complete;
  };
  document.addEventListener('change', e => {
    if (e.target && e.target.matches && e.target.matches('input[type="radio"]')) update();
  });
  update();
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
