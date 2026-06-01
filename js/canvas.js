/* ═══════════════════════════════════════════════════════════
   CANVAS — particle + orb background animation.
   Fully self-contained: no imports needed.
   Sleeps when the tab is hidden to save battery.
═══════════════════════════════════════════════════════════ */

export function initCanvas() {
  const cv = document.getElementById('bg');
  const cx = cv.getContext('2d');
  let W, H, mx, my, scrollT = 0;
  let isVisible = true;

  document.addEventListener('visibilitychange', () => { isVisible = !document.hidden; });

  function resize() {
    W = cv.width  = window.innerWidth;
    H = cv.height = window.innerHeight;
    if (mx === undefined) { mx = W / 2; my = H / 2; }
  }
  resize();

  // 150 ms debounce — prevents battery drain / layout thrashing on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const N   = window.innerWidth < 768 ? 18 : 45;
  const pts = Array.from({ length: N }, () => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - .5) * .00055,
    vy: (Math.random() - .5) * .00055,
    r: Math.random() * 1.2 + 0.4,
    phase: Math.random() * Math.PI * 2,
    spd: Math.random() * .5 + .5
  }));

  function orb(x, y, r, c) {
    if (!isFinite(x) || !isFinite(y) || !isFinite(r) || r <= 0) return;
    const g = cx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, c);
    g.addColorStop(1, 'transparent');
    cx.fillStyle = g;
    cx.fillRect(0, 0, W, H);
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!isVisible) return; // sleep when tab is backgrounded

    const now = performance.now() * .001;
    const max = document.body.scrollHeight - H;
    // Clamp to 0–1 to handle Mac overscroll bounce
    const st  = max > 0 ? Math.max(0, Math.min(window.scrollY / max, 1)) : 0;
    scrollT  += (st - scrollT) * .04;
    const t   = scrollT;

    cx.clearRect(0, 0, W, H);
    orb(W * (.05 + t * .80), H * (.10 + t * .75), W * (.55 - t * .10), `rgba(232,136,74,${(.07 - t * .025).toFixed(3)})`);
    orb(W * (.92 - t * .75), H * (.88 - t * .70), W * (.40 + t * .10), `rgba(245,192,100,${(.04 + t * .03).toFixed(3)})`);
    orb(mx, my, W * .22, 'rgba(232,136,74,0.028)');

    const sm  = 1 + Math.sin(t * Math.PI) * 1.2;
    const cr  = 110 + Math.sin(t * Math.PI) * 70;
    const hue = 28  + Math.sin(t * Math.PI) * 14;

    pts.forEach(p => {
      p.x += p.vx * sm * p.spd + Math.sin(now * .3  + p.phase) * .00007;
      p.y += p.vy * sm * p.spd + Math.cos(now * .25 + p.phase) * .00007;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
    });

    cx.lineWidth = .6;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = (pts[i].x - pts[j].x) * W;
        const dy = (pts[i].y - pts[j].y) * H;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < cr) {
          cx.strokeStyle = `hsla(${hue},68%,62%,${((1 - d / cr) * .14).toFixed(3)})`;
          cx.beginPath();
          cx.moveTo(pts[i].x * W, pts[i].y * H);
          cx.lineTo(pts[j].x * W, pts[j].y * H);
          cx.stroke();
        }
      }
    }

    cx.fillStyle = `hsla(${hue},68%,68%,0.55)`;
    pts.forEach(p => {
      cx.beginPath();
      cx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      cx.fill();
    });
  }

  loop();
}
