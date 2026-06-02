/* ═══════════════════════════════════════════════════════════
   TERMINAL — System Monitor Sweep loop in the Hero section.
   Simulates a multi-project hyperparameter optimization sweep (optuna/wandb).
   Features:
     • Project Rotation: GA-NAS, NexaCred, PersonaD, Apiro, FER
     • Project-Specific Log Feeds & Background threads
     • Animated GPU fan speed (faster under load, stops on cooldown)
     • Inline dynamic SVG sparkline charts
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
      <div class="t-line t-kv"><span>GPU 0 (RTX 4090)</span><span>
        <svg class="t-fan-spin" id="t-gpu-fan" viewBox="0 0 24 24" width="12" height="12" style="fill:var(--accent);vertical-align:middle;margin-right:4px;">
          <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C13,4 13.92,4.42 14.5,5.1L12.5,9.1C12.33,9 12.17,9 12,9C11,9 10.1,9.68 9.82,10.6L5.5,8.1C6.71,5.65 9.2,4 12,4M5.1,14.5L9.1,12.5C9,12.33 9,12.17 9,12C9,11 9.68,10.1 10.6,9.82L8.1,5.5C5.65,6.71 4,9.2 4,12C4,13 4.42,13.92 5.1,14.5M18.9,9.5L14.9,11.5C15,11.67 15,11.83 15,12C15,13 14.32,13.9 13.4,14.18L15.9,18.5C18.35,17.29 20,14.8 20,12C20,11 19.58,10.08 18.9,9.5M12,20C11,20 10.08,19.58 9.5,18.9L11.5,14.9C11.67,15 11.83,15 12,15C13,15 13.9,14.32 14.18,13.4L18.5,15.9C17.29,18.35 14.8,20 12,20Z"/>
        </svg><span id="t-gpu-bar">[..............] 0% (0°C)</span>
      </span></div>
      <div class="t-line t-kv"><span>VRAM Memory</span><span id="t-vram-bar">0.0 GB / 24.0 GB</span></div>
      <div class="t-line t-kv">
        <span>Training Curve</span>
        <span>
          <svg id="t-sparkline" width="110" height="15" style="display:inline-block;vertical-align:middle;overflow:visible;margin-left:0.2rem;">
            <path id="t-sparkline-path" d="" fill="none" stroke="var(--accent)" stroke-width="1.5" />
          </svg>
          <span class="t-dim" style="font-size:0.6rem;margin-left:0.3rem;" id="t-sparkline-label">Initializing...</span>
        </span>
      </div>
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
  const fanEl = document.getElementById('t-gpu-fan');
  const sparklinePath = document.getElementById('t-sparkline-path');
  const sparklineLabel = document.getElementById('t-sparkline-label');
  const logStream = document.getElementById('t-log-stream');

  const runs = [
    { 
      id: 1, 
      project: 'GA-NAS', 
      lr: '1e-3', 
      batch: 64, 
      metric: 'val_acc',
      maxVal: 92.07, 
      unit: '%',
      engine: 'Sweep: Run 1/5 [GA-NAS Evolution]',
      taskDesc: 'Evolving ResNet structure on CIFAR-10'
    },
    { 
      id: 2, 
      project: 'NexaCred', 
      lr: '5e-4', 
      batch: 128, 
      metric: 'credit_score',
      maxVal: 785, 
      unit: '',
      engine: 'Sweep: Run 2/5 [NexaCred Scorer]',
      taskDesc: 'Tuning LightGBM risk classifier weights on DeFi wallet logs'
    },
    { 
      id: 3, 
      project: 'PersonaD', 
      lr: '1e-4', 
      batch: 64, 
      metric: 'perplexity',
      maxVal: 1.12, 
      unit: '',
      engine: 'Sweep: Run 3/5 [PersonaD LoRA Tuner]',
      taskDesc: 'Fine-tuning GPT-2 LoRA weights on Instagram DM history'
    },
    { 
      id: 4, 
      project: 'Apiro', 
      lr: '2e-3', 
      batch: 32, 
      metric: 'info_gain',
      maxVal: 0.94, 
      unit: ' bits',
      engine: 'Sweep: Run 4/5 [Apiro Path Explorer]',
      taskDesc: 'Running vector sweeps over biomedical pathway search nodes'
    },
    { 
      id: 5, 
      project: 'FER', 
      lr: '5e-3', 
      batch: 64, 
      metric: 'accuracy',
      maxVal: 88.50, 
      unit: '%',
      engine: 'Sweep: Run 5/5 [FER CPU vs GPU Benchmark]',
      taskDesc: 'Evaluating ResNet-18 vs Random Forest on CPU/GPU latencies'
    }
  ];

  const bgTasks = [
    '<span style="color:var(--accent2)">[API: Apiro]</span> Served gene search request (200 OK — 14ms)',
    '<span style="color:var(--accent2)">[EVM: NexaCred]</span> Contract vault state synced at block 18402',
    '<span style="color:var(--accent2)">[NLP: PersonaD]</span> Generated text response payload for DM thread #104',
    '<span style="color:var(--accent2)">[BENCH: FER]</span> Verified CPU camera frame validation pipelines',
    '<span style="color:var(--accent2)">[VAL: GA-NAS]</span> Checkpoint validation score archived'
  ];

  const sampleDMs = [
    "yeah sure, let's meet tomorrow! 👍",
    "idk about that, let me check the code 😂",
    "wait really? that is awesome! let's do it",
    "honestly, it runs fine on my local machine",
    "let me push the fix and run tests first"
  ];

  const wallets = ['0x71a...f4', '0x88e...a1', '0x2a3...c9', '0xf5b...d2', '0x14d...ea'];
  const genes = ['GENE_IL6', 'GENE_TNF', 'GENE_APOE', 'GENE_BRCA1', 'GENE_TP53'];
  const diseases = ["Alzheimer's", "Asthma", "Breast Cancer", "Rheumatoid Arthritis", "Type 2 Diabetes"];

  let currentRunIndex = 0;
  let uptime = 0;
  let epoch = 0;
  let isTransitioning = false;
  let runTimeout = null;
  let accPoints = [];

  const makeBar = (pct) => {
    const total = 14;
    const filled = Math.round((pct / 100) * total);
    return '[' + '#'.repeat(filled) + '.'.repeat(total - filled) + ']';
  };

  // 1. Sparkline chart generation logic
  function updateSparkline(val, maxVal) {
    if (!sparklinePath) return;

    accPoints.push(val);
    if (accPoints.length > 22) {
      accPoints.shift();
    }

    const w = 110;
    const h = 15;
    
    const minVal = Math.min(...accPoints);
    const currMax = Math.max(...accPoints);
    
    let pathD = '';
    accPoints.forEach((p, idx) => {
      const x = (idx / Math.max(1, accPoints.length - 1)) * w;
      let y = h / 2;
      if (currMax !== minVal) {
        y = 13 - ((p - minVal) / (currMax - minVal)) * 11;
      } else {
        y = 13 - (p / maxVal) * 11;
      }
      
      if (idx === 0) {
        pathD += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      } else {
        pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    });

    sparklinePath.setAttribute('d', pathD);
    if (sparklineLabel) {
      const currentRun = runs[currentRunIndex];
      sparklineLabel.textContent = `${currentRun.metric}: ${val}${currentRun.unit}`;
    }
  }

  // 2. Uptime clock interval
  const uptimeInterval = setInterval(() => {
    uptime++;
    if (uptimeEl) uptimeEl.textContent = `${uptime}s`;
  }, 1000);

  // 3. Main Training Tick Loop
  function runTrainingTick() {
    if (isTransitioning) return;

    epoch++;
    const currentRun = runs[currentRunIndex];

    // Simulated hardware loads
    let cpuLoad = Math.floor(45 + Math.random() * 10);
    let gpuLoad = Math.floor(75 + Math.random() * 10);
    let gpuTemp = Math.floor(66 + Math.random() * 2);
    let vram = (7.1 + Math.sin(epoch / 30) * 0.2 + Math.random() * 0.05).toFixed(1);

    // Validation stage spikes
    if (epoch > 260) {
      cpuLoad = Math.floor(55 + Math.random() * 12);
      gpuLoad = Math.floor(88 + Math.random() * 8);
      gpuTemp = Math.floor(69 + Math.random() * 1.5);
      vram = (8.4 + Math.random() * 0.1).toFixed(1);
    }

    // Adjust Fan speed animation proportional to GPU load
    if (fanEl) {
      const duration = gpuLoad > 85 ? '0.3s' : gpuLoad > 65 ? '0.7s' : '1.5s';
      fanEl.style.animationDuration = duration;
    }

    // Update stats headers
    if (taskEl) taskEl.textContent = currentRun.engine;
    if (cpuBarEl) cpuBarEl.textContent = `${makeBar(cpuLoad)} ${cpuLoad}%`;
    if (gpuBarEl) gpuBarEl.textContent = `${makeBar(gpuLoad)} ${gpuLoad}% (${gpuTemp}°C)`;
    if (vramBarEl) vramBarEl.textContent = `${vram} GB / 24.0 GB`;

    // Compute training telemetry metrics & log lines based on project index
    const maxVal = currentRun.maxVal;
    let logHTML = '';
    let metricValue = 0;

    if (currentRun.project === 'GA-NAS') {
      metricValue = parseFloat((10 + (maxVal - 10) * (1 - Math.exp(-epoch / 60))).toFixed(2));
      const loss = (0.05 + 2.15 * Math.exp(-epoch / 50)).toFixed(4);
      logHTML = `Epoch ${epoch}/300 | loss: ${loss} | val_acc: <span class="t-green">${metricValue}%</span>`;

    } else if (currentRun.project === 'NexaCred') {
      metricValue = Math.floor(350 + (maxVal - 350) * (1 - Math.exp(-epoch / 70)));
      const addr = wallets[epoch % wallets.length];
      const risk = metricValue > 700 ? '<span class="t-green">LOW</span>' : '<span style="color:var(--accent2)">MID</span>';
      logHTML = `Record ${epoch}/300 | Wallet: ${addr} | Credit Score: <span class="t-green">${metricValue}</span> | Risk: ${risk}`;

    } else if (currentRun.project === 'PersonaD') {
      const ppl = (1.0 + 49.0 * Math.exp(-epoch / 50)).toFixed(2);
      const loss = (0.12 + 3.38 * Math.exp(-epoch / 45)).toFixed(4);
      metricValue = parseFloat(ppl);
      logHTML = `Step ${epoch}/300 | loss: ${loss} | perplexity: <span class="t-green">${ppl}</span>`;
      
      // Periodic simulated conversation text generations
      if (epoch % 20 === 0) {
        const sample = sampleDMs[(epoch / 20) % sampleDMs.length];
        logHTML += `<div style="color:var(--accent2);font-size:0.65rem;margin:0.15rem 0 0.15rem 0.2rem">// [LoRA Gen]: "${sample}"</div>`;
      }

    } else if (currentRun.project === 'Apiro') {
      metricValue = parseFloat((0.05 + (maxVal - 0.05) * (1 - Math.exp(-epoch / 80))).toFixed(2));
      const entropy = (0.15 + 0.8 * Math.exp(-epoch / 60)).toFixed(3);
      const gene = genes[epoch % genes.length];
      const disease = diseases[epoch % diseases.length];
      logHTML = `Path ${epoch}/300 | Node: ${gene} -> ${disease} | Entropy: ${entropy} | Info Gain: <span class="t-green">${metricValue} bits</span>`;

    } else if (currentRun.project === 'FER') {
      metricValue = parseFloat((40 + (maxVal - 40) * (1 - Math.exp(-epoch / 60))).toFixed(2));
      const gpuLat = (12.8 + 32.2 * Math.exp(-epoch / 40)).toFixed(1);
      logHTML = `Frame ${epoch}/300 | CPU Latency: 18.5ms | GPU Latency: <span class="t-green">${gpuLat}ms</span> | Acc: ${metricValue}%`;
    }

    // Dynamic scheduler warnings
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

    // ── BACKGROUND THREAD INJECTIONS ──
    if (epoch % 14 === 0) {
      const bgLog = bgTasks[(epoch / 14) % bgTasks.length];
      logHTML += `<div style="font-size:0.65rem;margin:0.15rem 0 0.15rem 0.2rem">// ${bgLog}</div>`;
    }

    updateSparkline(metricValue, maxVal);

    // Append output line
    if (logStream) {
      const logLine = document.createElement('div');
      logLine.className = 't-line out t-dim';
      logLine.innerHTML = logHTML;

      const isAtBottom = logStream.scrollHeight - logStream.clientHeight - logStream.scrollTop < 15;
      
      logStream.appendChild(logLine);
      if (logStream.children.length > 25) {
        logStream.removeChild(logStream.firstChild);
      }
      
      if (isAtBottom) {
        logStream.scrollTop = logStream.scrollHeight;
      }
    }

    // DECELERATING training timer delay schedule
    if (epoch < 300) {
      let delay = 80; 
      if (epoch > 180 && epoch <= 260) delay = 200;
      else if (epoch > 260 && epoch <= 288) delay = 500;
      else if (epoch > 288) delay = 1500;

      runTimeout = setTimeout(runTrainingTick, delay);
    } else {
      isTransitioning = true;
      triggerTransition();
    }
  }

  // 4. Cool-down & Transition sequence
  function triggerTransition() {
    // Clear fan spin and stats load
    if (fanEl) fanEl.style.animationDuration = '0s';
    if (taskEl) taskEl.textContent = `Sweep Scheduler (Cooling down...)`;
    if (cpuBarEl) cpuBarEl.textContent = `${makeBar(2)} 2%`;
    if (gpuBarEl) gpuBarEl.textContent = `${makeBar(0)} 0% (54°C)`;
    if (vramBarEl) vramBarEl.textContent = `0.5 GB / 24.0 GB`;

    const currentRun = runs[currentRunIndex];

    const reportLine = document.createElement('div');
    reportLine.className = 't-line out';
    reportLine.style.marginTop = '0.4rem';
    
    reportLine.innerHTML = `
      <div style="color:var(--accent); font-weight:bold">[SWEEP REPORT] Run ${currentRun.id}/5 (${currentRun.project}) completed.</div>
      <div style="border-top:1px dashed var(--border); margin:0.2rem 0"></div>
      <div class="t-dim">• Project Config: lr=${currentRun.lr} | batch=${currentRun.batch}</div>
      <div class="t-dim">• Target Sweep Met: ${currentRun.metric} = <span class="t-green" style="font-weight:bold">${currentRun.maxVal}${currentRun.unit}</span></div>
      <div class="t-dim" id="t-countdown">• Preparing next sweep task in 5s...</div>
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
        if (countdownEl) countdownEl.textContent = `• Preparing next sweep task in ${countdown}s...`;
        runTimeout = setTimeout(runCountdown, 1000);
      } else {
        // Prepare next run
        currentRunIndex = (currentRunIndex + 1) % runs.length;
        epoch = 0;
        accPoints = [];
        isTransitioning = false;
        if (logStream) logStream.innerHTML = '';
        runTrainingTick();
      }
    };

    runTimeout = setTimeout(runCountdown, 1000);
  }

  // Initial loop launch
  runTrainingTick();

  // 5. Cleanup
  window.addEventListener('beforeunload', () => {
    clearInterval(uptimeInterval);
    if (runTimeout) clearTimeout(runTimeout);
  });
}
