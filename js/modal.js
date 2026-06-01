/* ═══════════════════════════════════════════════════════════
   MODAL — open/close/focus-trap logic for project detail view.
   Depends on: PROJECTS_DATA from data.js,
               buildVisual from render.js,
               bootApiroCanvases + stopApiroCanvases from canvas.js.
═══════════════════════════════════════════════════════════ */
import { PROJECTS_DATA } from './data.js';
import { buildVisual } from './render.js';
import { bootApiroCanvases, stopApiroCanvases } from './canvas.js';

let overlayEl  = null;
let prevFocus  = null;

function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const focusables = document.querySelector('.modal').querySelectorAll(
    'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last  = focusables[focusables.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
}

function openModal(k) {
  const d = PROJECTS_DATA[k];
  if (!d) return;
  prevFocus = document.activeElement;

  document.getElementById('mtag').textContent     = d.tag;
  document.getElementById('mtitle').textContent   = d.title;
  document.getElementById('mbody').innerHTML      = d.body;
  document.getElementById('mtags').innerHTML      = d.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('mlinks').innerHTML     = d.links.map(x => {
    const cls = x.type === 'live' ? 'btn btn-fill' : 'btn btn-out';
    return `<a href="${x.h}" class="${cls}" target="_blank" rel="noopener">${x.l} ↗</a>`;
  }).join('');

  const media = document.getElementById('mmedia');
  media.innerHTML = buildVisual(d, false);

  // Boot any interactive canvas elements injected into modal (e.g. Apiro canvas)
  bootApiroCanvases(media);

  // Auto-play video inside modal if present
  const mv = media.querySelector('video');
  if (mv) {
    mv.autoplay = true;
    mv.loop     = true;
    mv.muted    = true;
    mv.play().catch(() => {});
  }

  overlayEl.classList.add('open');
  overlayEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('mclose').focus();
  document.addEventListener('keydown', trapFocus);
}

function closeModal() {
  overlayEl.classList.remove('open');
  overlayEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', trapFocus);

  const media = document.getElementById('mmedia');
  // Pause any playing videos inside closed modal
  const mv = media.querySelector('video');
  if (mv) {
    mv.pause();
    mv.currentTime = 0;
  }

  // Terminate any active canvas physics loop under closed modal element
  stopApiroCanvases(media);

  if (prevFocus) prevFocus.focus();
}

export function initModal() {
  overlayEl = document.getElementById('overlay');

  document.getElementById('mclose').addEventListener('click', closeModal);
  overlayEl.addEventListener('click', e => { if (e.target === overlayEl) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Bind click + keyboard triggers on all project cards
  document.querySelectorAll('.proj-card').forEach(c => {
    c.addEventListener('click', () => openModal(c.dataset.key));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(c.dataset.key); }
    });
  });
}
