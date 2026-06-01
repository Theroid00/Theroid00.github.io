/* ═══════════════════════════════════════════════════════════
   RENDER — injects data into DOM containers.
   Import order: must run before observers.js (which needs
   .proj-card elements to exist in the DOM).
═══════════════════════════════════════════════════════════ */
import { STATS_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA } from './data.js';
import { bootApiroCanvases } from './canvas.js';

export function renderStats() {
  const container = document.getElementById('stats-grid');
  if (!container) return;
  container.innerHTML = STATS_DATA.map(s => `
    <div class="stat">
      <div class="stat-val">${s.val}</div>
      <div class="stat-desc">${s.desc}</div>
    </div>
  `).join('');
}

export function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;
  container.innerHTML = SKILLS_DATA.map(cat => `
    <div class="skill-col">
      <div class="skill-cat">${cat.category}</div>
      <div class="skill-chips">
        ${cat.chips.map(chip => `<span class="skill-chip">${chip}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* Helper to render the visual pane correctly, shared with modal.js */
export function buildVisual(p, forCard = true) {
  if (p.media.type === 'svg') {
    /* apiro-canvas fills the whole pane — no extra wrapper needed for canvas */
    if (p.media.content.includes('apiro-canvas')) {
      return p.media.content;
    }
    return `<div class="schematic-svg-wrap">${p.media.content}</div>`;
  }
  if (p.media.type === 'video') {
    const v = `<video src="${p.media.source}" ${forCard ? 'muted playsinline' : 'autoplay muted playsinline loop'} style="width:100%;height:100%;object-fit:cover;display:block"></video>`;
    return forCard ? `${v}<button class="vid-play-btn" aria-label="Play demo video">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  </button>` : v;
  }
  if (p.media.type === 'image') {
    return `<img src="${p.media.source}" alt="${p.title} preview" style="width:100%;height:100%;object-fit:cover;display:block">`;
  }
  if (p.media.type === 'placeholder-video') {
    return `<div class="media-placeholder">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
    <span>${p.media.filename}</span>
    <small>${p.media.dims}</small>
    <small style="margin-top:.3rem;opacity:.5">Drop your video file here</small>
  </div>`;
  }
  // placeholder-image
  return `<div class="media-placeholder">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
  <span>${p.media.filename}</span>
  <small>${p.media.dims}</small>
</div>`;
}

export function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = Object.entries(PROJECTS_DATA).map(([key, p]) => {
    const badge = p.status === 'active'
      ? ` <span class="live-badge"><span class="live-dot"></span>Active</span>`
      : '';

    return `
      <div class="proj-card reveal-scale" data-key="${key}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="View ${p.title} project details">
        <div class="proj-card-inner">
          <div class="proj-media-pane" data-key="${key}">
            ${buildVisual(p, true)}
          </div>
          <div class="proj-content-pane">
            <div class="proj-num">${p.num}${badge}</div>
            <div class="proj-name">${p.title}</div>
            <div class="proj-brief">${p.brief}</div>
            <div class="proj-tags">${p.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div class="proj-footer">
              <button class="proj-cta" tabindex="-1" aria-hidden="true">View details <span>→</span></button>
              <div class="proj-links-inline">
                ${p.links.map(x => {
                  const cls = x.type === 'live' ? 'btn btn-fill' : 'btn btn-ghost';
                  const sty = 'padding:.55rem 1.1rem;font-size:.74rem';
                  return `<a href="${x.h}" class="${cls}" style="${sty}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${x.l} ↗</a>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Auto-boot any canvas elements inside projects list cards (e.g. Apiro canvas)
  bootApiroCanvases(container);

  // Wire up video play toggles directly on project cards (if present)
  container.querySelectorAll('.proj-media-pane').forEach(pane => {
    const vid = pane.querySelector('video');
    const btn = pane.querySelector('.vid-play-btn');
    if (!vid || !btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (vid.paused) {
        vid.play();
        pane.classList.add('playing');
      } else {
        vid.pause();
        pane.classList.remove('playing');
      }
    });
    vid.addEventListener('ended', () => pane.classList.remove('playing'));
  });
}

export function renderContactLinks() {
  const container = document.getElementById('contact-links');
  if (!container) return;
  container.innerHTML = CONTACT_DATA.map(c => `
    <a href="${c.url}" class="link-row" ${c.id ? `id="${c.id}"` : ''} ${c.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} aria-label="${c.aria}">
      <div class="link-icon">
        ${c.icon}
      </div>
      <div>
        <div class="link-label">${c.label}</div>
        <div class="link-val">${c.val}</div>
      </div>
    </a>
  `).join('');
}

export function setupDynamicCopyright() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
