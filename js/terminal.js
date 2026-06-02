/* ═══════════════════════════════════════════════════════════
   TERMINAL — System Monitor loop in the Hero section.
   Runs a live-updating CPU/GPU and ML training log telemetry stream.
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

  let tick = 0;

  const makeBar = (pct) => {
    const total = 14;
    const filled = Math.round((pct / 100) * total);
    return '[' + '#'.repeat(filled) + '.'.repeat(total - filled) + ']';
  };

  const updateStats = () => {
    // Generate simulated dynamic metrics
    const cpuLoad = Math.floor(40 + Math.cos(tick / 4) * 10 + Math.random() * 5);
    const gpuLoad = Math.floor(68 + Math.sin(tick / 5) * 12 + Math.random() * 4);
    const gpuTemp = Math.floor(66 + Math.sin(tick / 10) * 2 + Math.random() * 1);
    const vram = (7.2 + Math.sin(tick / 8) * 0.3 + Math.random() * 0.05).toFixed(1);
    
    const activeTask = tick % 8 < 4
      ? 'Training GA-NAS (Residual Evolution)' 
      : 'Evaluating NexaCred credit risk (DeFi logs)';

    // Update fixed top stats
    if (uptimeEl) uptimeEl.textContent = `${tick}s`;
    if (taskEl) taskEl.textContent = activeTask;
    if (cpuBarEl) cpuBarEl.textContent = `${makeBar(cpuLoad)} ${cpuLoad}%`;
    if (gpuBarEl) gpuBarEl.textContent = `${makeBar(gpuLoad)} ${gpuLoad}% (${gpuTemp}°C)`;
    if (vramBarEl) vramBarEl.textContent = `${vram} GB / 24.0 GB`;

    // Append new training log line
    if (logStream) {
      const logLine = document.createElement('div');
      logLine.className = 't-line out t-dim';
      
      const loss = (0.0894 - tick * 0.0004).toFixed(4);
      const acc = (91.80 + tick * 0.007).toFixed(2);
      
      logLine.innerHTML = `Epoch ${140 + tick}/300 | loss: ${loss} | val_acc: <span class="t-green">${acc}%</span>`;
      
      // Check if user is scrolled near bottom of log stream before appending
      const isAtBottom = logStream.scrollHeight - logStream.clientHeight - logStream.scrollTop < 12;
      
      logStream.appendChild(logLine);

      // Prune old logs to maintain performance and layout height
      if (logStream.children.length > 25) {
        logStream.removeChild(logStream.firstChild);
      }

      // Auto-scroll log container to bottom if user is already looking at the bottom
      if (isAtBottom) {
        logStream.scrollTop = logStream.scrollHeight;
      }
    }

    tick++;
  };

  // Run immediately and start loop
  updateStats();
  const monitorInterval = setInterval(updateStats, 1000);

  // Clean up interval when window is unloaded or navigation occurs (safeguard)
  window.addEventListener('beforeunload', () => {
    clearInterval(monitorInterval);
  });
}
