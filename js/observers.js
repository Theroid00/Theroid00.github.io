/* ═══════════════════════════════════════════════════════════
   OBSERVERS — scroll-reveal (IntersectionObserver) for:
     • .reveal  elements  →  fade + slide up once
     • .stagger elements  →  staggered children
     • .proj-card         →  staggered entry with custom delay
   IMPORTANT: call initObservers() AFTER renderProjects() so
   that .proj-card elements already exist in the DOM.
═══════════════════════════════════════════════════════════ */

export function initObservers() {
  // ── Reveal + stagger ────────────────────────────────────
  const revealObs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger').forEach(el => revealObs.observe(el));

  // ── Project cards (staggered per-card delay) ────────────
  const cardObs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), 0);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.proj-card').forEach((c, i) => {
    c.style.transitionDuration = '.65s';
    c.style.transitionDelay   = `${i * 0.07}s`;
    cardObs.observe(c);
  });
}
