/* ═══════════════════════════════════════════════════════════
   TERMINAL — System Monitor Sweep loop in the Hero section.
   Simulates a multi-run hyperparameter optimization sweep (optuna/wandb).
   Features dynamic decelerating epochs, validation checkpoints,
   and cool-down countdown transitions.
 ═══════════════════════════════════════════════════════════ */

export function initTerminal() {
  const terminalContent = document.getElementById('terminal-content');
  if (!terminalContent) return;

  // Initialize layout structure
  terminalContent.innerHTML = `
    <div class="t-stats-panel">
      <div class="t-line"><span class="t-green">● SYSTEM MONITOR</span> | uptime: <span id="t-uptime">0s</span></div>
      <div class="t-line t-dim">------------------------------------------</div>
      <div class="t-line t-kv"><span>Active Engine</span><span class="t-hi" id="t-active-task">Initializing...</span></div>
      <div class="t-line t-kv"><span>CPU Usage</span><span id="t-cpu-bar">[..............] 0%</span></div>
      <div class="t-line t-kv"><span>GPU 0 (RTX 4090)</span><span id="t-gpu-bar">[..............] 0% (0°C)</span></div>
      <div class="t-line t-kv"><span>VRAM Memory</span><span id="t-vram-bar">0.0 GB / 24.0 GB</span></div>
    </div>
    <div class="t-line t-dim" style="margin-top:0.4rem">------------------------------------------</div>
    <div class="t-line t-dim" style="margin-bottom:0.15rem">Model Training Log Feed (W&B Log Stream):</div>
    <div class="t-log-stream" id="t-log-stream"></div>
  `;

  const uptimeEl = document.getElementById('t-uptime');
  const taskEl = document.getElementById('t-active-task');
  const cpuBarEl = document.getElementById('t-cpu-bar');
  const gpuBarEl = document.getElementById('t-gpu-bar');
  const vramBarEl = document.getElementById('t-vram-bar');
  const logStream = document.getElementById('t-log-stream');

  const runs = [
    { id: 1, lr: '1e-3', batch: 64,  maxAcc: 92.07 },
    { id: 2, lr: '5e-4', batch: 128, maxAcc: 92.84 },
    { id: 3, lr: '1e-4', batch: 64,  maxAcc: 91.15 },
    { id: 4, lr: '2e-3', batch: 32,  maxAcc: 90.42 },
    { id: 5, lr: '5e-3', batch: 64,  maxAcc: 88.90 }
  ];

  let currentRunIndex = 0;
  let uptime = 0;
  let epoch = 0;
  let isTransitioning = false;
  let runTimeout = null;

  const makeBar = (pct) => {
    const total = 14;
    const filled = Math.round((pct / 100) * total);
    return '[' + '#'.repeat(filled) + '.'.repeat(total - filled) + ']';
  };

  // 1. Uptime clock interval (always counts linearly in seconds)
  const uptimeInterval = setInterval(() => {
    uptime++;
    if (uptimeEl) uptimeEl.textContent = `${uptime}s`;
  }, 1000);

  // 2. Training loop simulation
  function runTrainingTick() {
    if (isTransitioning) return;

    epoch++;
    const currentRun = runs[currentRunIndex];

    // Compute hardware load with fluctuation
    let cpuLoad = Math.floor(45 + Math.random() * 10);
    let gpuLoad = Math.floor(75 + Math.random() * 10);
    let gpuTemp = Math.floor(66 + Math.random() * 2);
    let vram = (7.1 + Math.sin(epoch / 30) * 0.2 + Math.random() * 0.05).toFixed(1);

    // Dynamic metrics scaling during validation checkpoints (epochs > 260)
    if (epoch > 260) {
      cpuLoad = Math.floor(55 + Math.random() * 12);
      gpuLoad = Math.floor(88 + Math.random() * 8);
      gpuTemp = Math.floor(69 + Math.random() * 1.5);
      vram = (8.4 + Math.random() * 0.1).toFixed(1);
    }

    // Update stats widgets in top panel
    if (taskEl) taskEl.textContent = `Sweep: Run ${currentRun.id}/5 (lr=${currentRun.lr}, batch=${currentRun.batch})`;
    if (cpuBarEl) cpuBarEl.textContent = `${makeBar(cpuLoad)} ${cpuLoad}%`;
    if (gpuBarEl) gpuBarEl.textContent = `${makeBar(gpuLoad)} ${gpuLoad}% (${gpuTemp}°C)`;
    if (vramBarEl) vramBarEl.textContent = `${vram} GB / 24.0 GB`;

    // Compute training mathematical metrics
    const maxValAcc = currentRun.maxAcc;
    const currentAcc = (10 + (maxValAcc - 10) * (1 - Math.exp(-epoch / 60))).toFixed(2);
    const currentLoss = (0.05 + 2.15 * Math.exp(-epoch / 50)).toFixed(4);

    // Render log line
    const logLine = document.createElement('div');
    logLine.className = 't-line out t-dim';

    let logHTML = `Epoch ${epoch}/300 | loss: ${currentLoss} | val_acc: <span class="t-green">${currentAcc}%</span>`;
    
    // Inject realistic execution logs at specific phases
    if (epoch === 180) {
      const decayedLr = (parseFloat(currentRun.lr) * 0.1).toExponential(0);
      logHTML += `<div style="color:var(--accent2);font-size:0.65rem;margin:0.15rem 0 0.15rem 0.2rem">// [Scheduler] Learning rate decayed: ${currentRun.lr} -> ${decayedLr}</div>`;
    }
    if (epoch === 260) {
      logHTML += `<div style="color:var(--accent2);font-size:0.65rem;margin:0.15rem 0 0.15rem 0.2rem">// [VAL] Running validation partition check...</div>`;
    }
    if (epoch === 288) {
      logHTML += `<div style="color:var(--accent2);font-size:0.65rem;margin:0.15rem 0 0.15rem 0.2rem">// [CHECKPOINT] Saving best weights to run${currentRun.id}_best.pt...</div>`;
    }

    logLine.innerHTML = logHTML;

    if (logStream) {
      const isAtBottom = logStream.scrollHeight - logStream.clientHeight - logStream.scrollTop < 15;
      
      logStream.appendChild(logLine);
      if (logStream.children.length > 25) {
        logStream.removeChild(logStream.firstChild);
      }
      
      if (isAtBottom) {
        logStream.scrollTop = logStream.scrollHeight;
      }
    }

    if (epoch < 300) {
      // DECELERATION SCHEDULE: Epoch time slows down near completion
      let delay = 80; // Epochs 1-180 (fast training)
      if (epoch > 180 && epoch <= 260) delay = 200; // Epochs 181-260 (slower training)
      else if (epoch > 260 && epoch <= 288) delay = 500; // Epochs 261-288 (validation load)
      else if (epoch > 288) delay = 1500; // Epochs 289-300 (saving & testing)

      runTimeout = setTimeout(runTrainingTick, delay);
    } else {
      isTransitioning = true;
      triggerTransition();
    }
  }

  // 3. Cool-down and report phase between runs
  function triggerTransition() {
    // Clear hardware values (cool down)
    if (taskEl) taskEl.textContent = `Sweep Scheduler (Cooling down...)`;
    if (cpuBarEl) cpuBarEl.textContent = `${makeBar(2)} 2%`;
    if (gpuBarEl) gpuBarEl.textContent = `${makeBar(0)} 0% (54°C)`;
    if (vramBarEl) vramBarEl.textContent = `0.5 GB / 24.0 GB`;

    const currentRun = runs[currentRunIndex];

    const reportLine = document.createElement('div');
    reportLine.className = 't-line out';
    reportLine.style.marginTop = '0.4rem';
    
    reportLine.innerHTML = `
      <div style="color:var(--accent); font-weight:bold">[SWEEP REPORT] Run ${currentRun.id}/5 completed.</div>
      <div style="border-top:1px dashed var(--border); margin:0.2rem 0"></div>
      <div class="t-dim">• Configuration: lr=${currentRun.lr} | batch=${currentRun.batch}</div>
      <div class="t-dim">• Best Validation Accuracy: <span class="t-green" style="font-weight:bold">${currentRun.maxAcc}%</span></div>
      <div class="t-dim" id="t-countdown">• Initializing next run in 5s...</div>
    `;

    if (logStream) {
      const isAtBottom = logStream.scrollHeight - logStream.clientHeight - logStream.scrollTop < 25;
      logStream.appendChild(reportLine);
      if (isAtBottom) {
        logStream.scrollTop = logStream.scrollHeight;
      }
    }

    let countdown = 5;
    const countdownEl = document.getElementById('t-countdown');

    const runCountdown = () => {
      countdown--;
      if (countdown > 0) {
        if (countdownEl) countdownEl.textContent = `• Initializing next run in ${countdown}s...`;
        runTimeout = setTimeout(runCountdown, 1000);
      } else {
        // Increment sweep and reset
        currentRunIndex = (currentRunIndex + 1) % runs.length;
        epoch = 0;
        isTransitioning = false;
        if (logStream) logStream.innerHTML = '';
        runTrainingTick();
      }
    };

    runTimeout = setTimeout(runCountdown, 1000);
  }

  // Start initial sweep run
  runTrainingTick();

  // 4. Garbage collection cleanup
  window.addEventListener('beforeunload', () => {
    clearInterval(uptimeInterval);
    if (runTimeout) clearTimeout(runTimeout);
  });
}
