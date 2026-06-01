/* ═══════════════════════════════════════════════════════════
   MODAL — open/close/focus-trap logic for project detail view.
   Depends on: PROJECTS_DATA from data.js,
               .proj-card elements already in the DOM (render.js).
═══════════════════════════════════════════════════════════ */
import { PROJECTS_DATA } from './data.js';

// overlayEl is resolved lazily inside initModal() — not at module load time
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
  document.getElementById('mlinks').innerHTML     = d.links.map(x => `<a href="${x.h}" class="btn btn-out" target="_blank" rel="noopener">${x.l} ↗</a>`).join('');

  const media = document.getElementById('mmedia');
  if (d.media && d.media.type === 'video') {
    media.innerHTML = `<video src="${d.media.source}" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;display:block"></video>`;
  } else if (d.media && d.media.type === 'image') {
    media.innerHTML = `<img src="${d.media.source}" alt="${d.title} preview" style="width:100%;height:100%;object-fit:cover;display:block">`;
  } else {
    // Clone the card's visual pane (contains inline SVG with SMIL animations)
    const card = document.querySelector(`.proj-card[data-key="${k}"]`);
    const vis  = card && card.querySelector('.proj-visual');
    media.innerHTML = vis
      ? vis.cloneNode(true).innerHTML
      : `<div style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--muted);padding:1rem">No preview available</div>`;
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
  if (prevFocus) prevFocus.focus();
}

export function initModal() {
  // Resolve DOM references here, after the DOM is ready
  overlayEl = document.getElementById('overlay');

  document.getElementById('mclose').addEventListener('click', closeModal);
  overlayEl.addEventListener('click', e => { if (e.target === overlayEl) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Bind click + keyboard on all project cards
  document.querySelectorAll('.proj-card').forEach(c => {
    c.addEventListener('click', () => openModal(c.dataset.key));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(c.dataset.key); }
    });
  });
}
