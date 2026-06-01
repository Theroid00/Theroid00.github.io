/* ═══════════════════════════════════════════════════════════
   CANVAS — particle + orb background animation AND
   interactive force-directed physics engine for Apiro.
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

/* All active Apiro canvas instances — keyed by canvas element */
const apiroInstances = new WeakMap();

function initApiroCanvas(canvas) {
  if (apiroInstances.has(canvas)) return; // already running
  const ctx = canvas.getContext('2d');

  /* ── resolve CSS variables once ── */
  const cs = getComputedStyle(document.documentElement);
  const ACCENT  = cs.getPropertyValue('--accent').trim()  || '#e8884a';
  const ACCENT2 = cs.getPropertyValue('--accent2').trim() || '#f5c278';
  const CREAM   = cs.getPropertyValue('--cream').trim()   || '#f0e6d3';
  const MUTED   = cs.getPropertyValue('--muted').trim()   || '#8a7f74';

  /* ── biomedical popup phrases ── */
  const PHRASES = [
    'BRCA1 mutation', 'CRISPR-Cas9', 'mRNA expression',
    'Shannon entropy H(g)', 'pathway discovery', 'target validated',
    'protein folding', 'folding free energy ΔG', 'binding affinity Kd',
    'chemogenomics', 'p-value < 0.001', 'HER2 receptor',
    'semantic molecular graph', 'gene ontology', 'interleukin signaling',
    'protein-protein interactome', 'therapeutic index', 'small molecule lead',
    'Granite AI Target Finder', 'deep sequence analysis', 'non-custodial genomic audit',
  ];

  /* ── node pool ── */
  const MAX_NODES = 28;
  const nodes = [];
  let W = 0, H = 0;
  let raf = null;
  let tick = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width  || 520;
    H = canvas.height = rect.height || 300;
    if (nodes.length === 0) spawnRoot();
  }

  function spawnRoot() {
    nodes.push({
      x: W / 2, y: H / 2,
      vx: 0, vy: 0,
      r: 7, born: tick, parent: null,
      pulse: 0, pulseDir: 1,
      edgeProgress: 1,       // root edge is already drawn
      label: 'Apiro',
      labelAlpha: 1,
      isRoot: true,
      color: ACCENT,
    });
  }

  /* spawn a child from a random existing node */
  function spawnChild() {
    if (nodes.length >= MAX_NODES) return;

    const parentIndex = Math.floor(Math.random() * nodes.length);
    const parent = nodes[parentIndex];

    const layer = parent.layer !== undefined ? parent.layer + 1 : 1;
    const angle = Math.random() * Math.PI * 2;
    const radius = 70 + layer * 45;

    const targetX = parent.x + Math.cos(angle) * radius;
    const targetY = parent.y + Math.sin(angle) * radius;
    const isHigh = Math.random() < 0.35;

    nodes.push({
      x: parent.x, y: parent.y,
      targetX, targetY,
      angle, layer,
      parent: parentIndex,
      r: isHigh ? 6 + Math.random() * 3 : 4 + Math.random() * 2,
      edgeProgress: 0,
      pulse: Math.random() * Math.PI * 2,
      showLabel: isHigh,
      label: isHigh ? PHRASES[Math.floor(Math.random() * PHRASES.length)] : null,
      labelAlpha: 0,
      labelTimer: 0,
      color: isHigh ? ACCENT2 : ACCENT,
      alpha: 0
    });
  }

  /* ── popup text objects ── */
  const popups = [];
  function spawnPopup() {
    const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    const margin = 100;
    popups.push({
      text: phrase,
      x: margin + Math.random() * (W - margin * 2),
      y: margin + Math.random() * (H - margin * 2),
      alpha: 0,
      life: 0,
      maxLife: 140 + Math.random() * 80,
      color: Math.random() < 0.5 ? ACCENT2 : CREAM
    });
  }

  /* ── drawing helpers ── */
  function drawEdge(nx, ny, px, py, progress, alpha) {
    const ex = px + (nx - px) * progress;
    const ey = py + (ny - py) * progress;
    ctx.save();
    ctx.globalAlpha = alpha * 0.55;
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1.1;
    ctx.setLineDash([5, 4]);
    ctx.lineDashOffset = -(tick * 0.35);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.restore();
  }

  function drawNode(n, alpha) {
    const pulse = Math.sin(tick * 0.04 + n.pulse) * 0.5 + 0.5;
    if (n.r > 5) {
      ctx.save();
      ctx.globalAlpha = alpha * 0.18 * pulse;
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 8 + pulse * 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = n.color;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    if (n.isRoot) {
      ctx.save();
      ctx.globalAlpha = alpha * 0.85;
      ctx.fillStyle = CREAM;
      ctx.font = `bold 9px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('Apiro', n.x, n.y - n.r - 5);
      ctx.restore();
    }
    if (n.showLabel && n.labelAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = n.labelAlpha * alpha;
      ctx.fillStyle = ACCENT2;
      ctx.font = `8.5px monospace`;
      ctx.textAlign = 'center';
      const ly = n.y - n.r - 7 < 10 ? n.y + n.r + 14 : n.y - n.r - 7;
      ctx.fillText(n.label, n.x, ly);
      ctx.restore();
    }
  }

  let active = false;
  function startLoop() {
    if (active) return;
    active = true;
    loop();
  }
  function stopLoop() {
    active = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  function loop() {
    if (!active) return;
    raf = requestAnimationFrame(loop);
    tick++;
    ctx.clearRect(0, 0, W, H);
    /* ------------------------------
       FORCE DIRECTED LAYOUT
    --------------------------------*/

    /* stable radial layout */
    if (tick % 5 === 0) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 38;
          if (dist < minDist) {
            const push = (minDist - dist) * 0.15;
            const nx = dx / dist;
            const ny = dy / dist;
            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
          }
        }
      }
    }

    for (const n of nodes) {
      if (n.isRoot) continue;
      if (n.targetX !== undefined) {
        n.x += (n.targetX - n.x) * 0.03;
        n.y += (n.targetY - n.y) * 0.03;
        n.x += Math.sin(tick * 0.01 + n.pulse) * 0.1;
        n.y += Math.cos(tick * 0.01 + n.pulse) * 0.1;
      }
      n.x = Math.max(24, Math.min(W - 24, n.x));
      n.y = Math.max(24, Math.min(H - 24, n.y));
    }

    /* spawn new child every ~90 frames */
    if (tick % 90 === 0) spawnChild();
    /* spawn popup every ~130 frames */
    if (tick % 130 === 0) spawnPopup();

    /* update & draw edges */
    for (let i = 1; i < nodes.length; i++) {
      const n = nodes[i];
      const p = nodes[n.parent];
      if (!p) continue;
      n.edgeProgress = Math.min(1, n.edgeProgress + 0.018);
      n.alpha = Math.min(1, (n.alpha || 0) + 0.02);
      drawEdge(n.x, n.y, p.x, p.y, n.edgeProgress, n.alpha);
    }

    /* update & draw nodes */
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (!n.isRoot && n.edgeProgress < 0.25) continue;
      /* label fade cycle */
      if (n.showLabel) {
        n.labelTimer = (n.labelTimer || 0) + 1;
        const cycle = 200;
        const t = n.labelTimer % cycle;
        n.labelAlpha = t < 40 ? t / 40 : t < 130 ? 1 : Math.max(0, 1 - (t - 130) / 70);
      }
      const alpha = n.isRoot ? 1 : (n.alpha || 0);
      drawNode(n, alpha);
    }

    /* update & draw popups */
    for (let i = popups.length - 1; i >= 0; i--) {
      const p = popups[i];
      p.life++;
      if (p.life < 20) p.alpha = p.life / 20;
      else if (p.life > p.maxLife - 30) p.alpha = Math.max(0, (p.maxLife - p.life) / 30);
      else p.alpha = 1;
      if (p.life >= p.maxLife) { popups.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = p.alpha * 0.55;
      ctx.fillStyle = p.color;
      ctx.font = `italic 9px monospace`;
      ctx.textAlign = 'left';
      const width = ctx.measureText(p.text).width;

      let px = p.x;
      let py = p.y;

      if (px + width > W - 15)
        px = W - width - 15;

      if (px < 15)
        px = 15;

      if (py > H - 15)
        py = H - 15;

      if (py < 15)
        py = 15;

      ctx.fillText(p.text, px, py);
      ctx.restore();
    }
  }

  resize();
  // watch for parent resize
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement);

  // Watch visibility to pause loops off-screen (major CPU/GPU optimization)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    });
  }, { threshold: 0.02 });
  io.observe(canvas);

  /* store cleanup so we can stop it if the element is removed */
  apiroInstances.set(canvas, { stop: () => { stopLoop(); ro.disconnect(); io.disconnect(); } });
}

/* called after any innerHTML injection to boot canvas instances */
export function bootApiroCanvases(root) {
  (root || document).querySelectorAll('.apiro-canvas').forEach(c => initApiroCanvas(c));
}

/* cleanly stop all active canvas physics loops under parent elements (for modal close etc) */
export function stopApiroCanvases(parent) {
  if (!parent) return;
  parent.querySelectorAll('.apiro-canvas').forEach(c => {
    const inst = apiroInstances.get(c);
    if (inst) {
      inst.stop();
      apiroInstances.delete(c);
    }
  });
}
