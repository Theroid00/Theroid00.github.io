/* ═══════════════════════════════════════════════════════════
   NAV — scroll spy (active link highlight) + email clipboard.
═══════════════════════════════════════════════════════════ */

export function initNav() {
  // ── Scroll spy: highlight nav link for visible section ──
  const navLinks = document.querySelectorAll('.nav-links a');

  const spyObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: .2, rootMargin: '-20% 0px -55% 0px' });

  document.querySelectorAll('section').forEach(s => spyObs.observe(s));

  // ── Email clipboard copy ─────────────────────────────────
  const emailLink = document.getElementById('email-link');
  const toast     = document.getElementById('toast');
  if (emailLink && toast) {
    emailLink.addEventListener('click', e => {
      e.preventDefault();
      navigator.clipboard.writeText('kapoorpranay@outlook.com')
        .then(() => {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2500);
        })
        .catch(() => { window.location.href = 'mailto:kapoorpranay@outlook.com'; });
    });
  }
}
