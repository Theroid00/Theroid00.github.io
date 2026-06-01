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

  /* proj-scale cards get a small exit-only delay reset so stagger
     transition-delays don't interfere on re-entry */
  const makeProjObs = (threshold = 0.07, rootMargin = '0px 0px -30px 0px') =>
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        } else {
          e.target.classList.remove('in');
          /* clear transition-delay when off-screen so re-entry
             animates from its original staggered delay */
          void e.target.offsetWidth; // force reflow
        }
      });
    }, { threshold, rootMargin });

  const revealObs  = makeObs(0.12);
  const staggerObs = makeObs(0.08);
  const projObs    = makeProjObs();

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));
  document.querySelectorAll('.stagger').forEach(el => staggerObs.observe(el));
  document.querySelectorAll('.reveal-scale').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.09}s`;
    projObs.observe(el);
  });
}
