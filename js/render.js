/* ═══════════════════════════════════════════════════════════
   RENDER — injects data into DOM containers.
   Import order: must run before observers.js (which needs
   .proj-card elements to exist in the DOM).
═══════════════════════════════════════════════════════════ */
import { STATS_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA } from './data.js';

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

export function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = Object.entries(PROJECTS_DATA).map(([key, p]) => {
    const badge = p.status === 'active'
      ? ` <span class="live-badge"><span class="live-dot"></span>Active</span>`
      : '';

    // SVG animations are injected inline so SMIL <animate> elements work
    let visualContent = '';
    if (p.media.type === 'svg') {
      visualContent = p.media.content;
    } else if (p.media.type === 'placeholder-image') {
      visualContent = `
        <div class="img-slot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          <span>${p.media.filename}</span>
          <small>${p.media.dims}</small>
        </div>
      `;
    } else if (p.media.type === 'placeholder-video') {
      visualContent = `
        <div class="vid-slot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          <span>${p.media.filename}</span>
          <small>${p.media.dims}</small>
        </div>
      `;
    } else if (p.media.type === 'image') {
      visualContent = `<img src="${p.media.source}" class="proj-img" alt="${p.title} Preview">`;
    } else if (p.media.type === 'video') {
      visualContent = `<video src="${p.media.source}" class="proj-img" autoplay loop muted playsinline></video>`;
    }

    return `
      <div class="proj-card" data-key="${key}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="View ${p.title} project details">
        <div>
          <div class="proj-num">${p.num}${badge}</div>
          <div class="proj-name">${p.title}</div>
          <div class="proj-brief">${p.brief}</div>
          <div class="proj-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="proj-visual">
          ${visualContent}
        </div>
        <div class="proj-arrow">→</div>
      </div>
    `;
  }).join('');
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
