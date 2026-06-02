/* ═══════════════════════════════════════════════════════════
   OBSERVERS — scroll-reveal (IntersectionObserver) for:
     • .reveal, .reveal-left, .reveal-right  →  fade + slide in
     • .stagger  →  staggered children entries
     • .reveal-scale (.proj-card)  →  staggered entry with delay
   Bidirectional scroll-reveal: re-triggers animation on scroll up.
   Stagger delay is reset when off-screen to avoid sluggish re-entry.
═══════════════════════════════════════════════════════════ */

export function initObservers() {
  const makeObs = (threshold = 0.1, rootMargin = '0px 0px -40px 0px') =>
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        } else {
          // Remove class so re-entering re-triggers animation
          e.target.classList.remove('in');
        }
      });
    }, { threshold, rootMargin });

  /* proj-scale cards get a batch-based stagger delay so they render
     immediately on scroll instead of waiting for a high index delay. */
  const makeProjObs = (threshold = 0.07, rootMargin = '0px 0px -30px 0px') =>
    new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting);
      intersecting.forEach((e, idx) => {
        e.target.style.transitionDelay = `${idx * 0.06}s`;
        e.target.classList.add('in');
      });

      entries.filter(e => !e.isIntersecting).forEach(e => {
        e.target.classList.remove('in');
        e.target.style.transitionDelay = '0s';
      });
    }, { threshold, rootMargin });

  const revealObs  = makeObs(0.12);
  const staggerObs = makeObs(0.08);
  const projObs    = makeProjObs();

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));
  document.querySelectorAll('.stagger').forEach(el => staggerObs.observe(el));
  document.querySelectorAll('.reveal-scale').forEach(el => {
    projObs.observe(el);
  });
}
