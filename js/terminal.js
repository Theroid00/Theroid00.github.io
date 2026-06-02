/* ═══════════════════════════════════════════════════════════
   TERMINAL — Interactive card controller in the Hero section.
   Supports tab switching between:
     • cli.sh (Interactive shell with shortcut buttons)
     • monitor.sh (Real-time telemetry monitor loop)
     • git_tree.sh (Interactive ASCII commit history)
 ═══════════════════════════════════════════════════════════ */

export function initTerminal() {
  const terminalContent = document.getElementById('terminal-content');
  const tabs = document.querySelectorAll('.t-tab');
  if (!terminalContent) return;

  let activeTab = 'cli';
  let monitorInterval = null;
  let nasSimTimeout = null;

  // Initialize initial tab
  switchTab('cli');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (activeTab === target) return;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      switchTab(target);
    });
  });

  function switchTab(tabName) {
    activeTab = tabName;
    
    // Clean up any running timers
    if (monitorInterval) clearInterval(monitorInterval);
    if (nasSimTimeout) clearTimeout(nasSimTimeout);
    terminalContent.innerHTML = '';

    if (tabName === 'cli') {
      renderCli();
    } else if (tabName === 'monitor') {
      renderMonitor();
    } else if (tabName === 'git') {
      renderGit();
    }
  }

  // ── TAB 1: INTERACTIVE CLI ───────────────────────────────
  function renderCli() {
    terminalContent.innerHTML = `
      <div class="t-line t-dim">// Welcome to Pranay's interactive shell.</div>
      <div class="t-line t-dim">// Type a command or click the shortcut buttons below.</div>
      <div class="t-cli-output"></div>
      <div class="t-cli-input-line">
        <span class="t-cli-prompt">pranay@mit-bengaluru:~$</span>
        <input type="text" class="t-cli-input" autofocus autocomplete="off" spellcheck="false">
      </div>
      <div class="t-cli-shortcuts">
        <button class="btn t-shortcut-btn" data-cmd="about">about</button>
        <button class="btn t-shortcut-btn" data-cmd="projects">projects</button>
        <button class="btn t-shortcut-btn" data-cmd="run-nas">run-nas</button>
        <button class="btn t-shortcut-btn" data-cmd="clear">clear</button>
      </div>
    `;

    const input = terminalContent.querySelector('.t-cli-input');
    const output = terminalContent.querySelector('.t-cli-output');
    const inputLine = terminalContent.querySelector('.t-cli-input-line');

    const handleCommand = (cmdText) => {
      cmdText = cmdText.trim();
      if (!cmdText) return;

      // Echo command
      const echo = document.createElement('div');
      echo.className = 't-line cmd';
      echo.innerHTML = `<span class="t-p">$</span> ${cmdText}`;
      output.appendChild(echo);

      // Process command
      const response = document.createElement('div');
      response.className = 't-line out';

      const lowerCmd = cmdText.toLowerCase();
      if (lowerCmd === 'clear') {
        output.innerHTML = '';
        input.value = '';
        return;
      } else if (lowerCmd === 'help') {
        response.innerHTML = `
          <div class="t-dim" style="margin-bottom:0.15rem">Available commands:</div>
          <div class="t-kv"><span class="t-green">about</span><span>Display academic & research background</span></div>
          <div class="t-kv"><span class="t-green">projects</span><span>List core engineering projects</span></div>
          <div class="t-kv"><span class="t-green">run-nas</span><span>Run Genetic Neural Architecture Search sim</span></div>
          <div class="t-kv"><span class="t-green">clear</span><span>Clear command history</span></div>
        `;
      } else if (lowerCmd === 'about') {
        response.innerHTML = `
          <div>Pranay Kapoor — 3rd Year B.Tech CS, MIT Bengaluru</div>
          <div class="t-dim">CGPA: 8.68 | Scholars Scholarship Recipient</div>
          <div>Interests: Distributed AI systems, LLM inference, Web3 fintech.</div>
        `;
      } else if (lowerCmd === 'projects') {
        response.innerHTML = `
          <div class="t-dim" style="margin-bottom:0.15rem">Core Projects:</div>
          <div>• <span class="t-hi">Apiro</span> — Biomedical Discovery Graph Navigator</div>
          <div>• <span class="t-hi">GA-NAS</span> — Genetic Neural Architecture Search (92.07%)</div>
          <div>• <span class="t-hi">NexaCred</span> — P2P Credit Scoring trained on DeFi Wallet data</div>
          <div>• <span class="t-hi">PersonaD</span> — GPT-2 conversational Instagram DM clone</div>
        `;
      } else if (lowerCmd === 'run-nas') {
        runNasSimulation(output, inputLine);
        input.value = '';
        return;
      } else {
        response.innerHTML = `<span class="t-dim">Command not found: '${cmdText}'. Type 'help' for options.</span>`;
      }

      output.appendChild(response);
      input.value = '';
      
      // Keep terminal scrolled to bottom
      terminalContent.scrollTop = terminalContent.scrollHeight;
    };

    // Keep input focused when clicking inside terminal
    terminalContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('t-shortcut-btn')) return;
      input.focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCommand(input.value);
      }
    });

    // Shortcut button handlers
    terminalContent.querySelectorAll('.t-shortcut-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        handleCommand(cmd);
      });
    });

    // Autofocus command line
    setTimeout(() => input.focus(), 50);
  }

  function runNasSimulation(output, inputLine) {
    inputLine.style.display = 'none';

    const simLines = [
      { text: '<span class="t-green">[GA-NAS]</span> Initializing evolution population (size=48)...', delay: 100 },
      { text: '<span class="t-green">[GA-NAS]</span> Gen 1   | Avg Loss: 2.102 | Best Acc: 54.2% (1-layer CNN)', delay: 600 },
      { text: '<span class="t-green">[GA-NAS]</span> Gen 10  | Avg Loss: 1.450 | Best Acc: 68.9% (Mutating filters...)', delay: 1200 },
      { text: '<span class="t-green">[GA-NAS]</span> Gen 50  | Avg Loss: 0.724 | Best Acc: 81.3% (Crossover: skip connects)', delay: 1800 },
      { text: '<span class="t-green">[GA-NAS]</span> Gen 100 | Avg Loss: 0.312 | Best Acc: 89.9% (Evolving ResNet architecture)', delay: 2400 },
      { text: '<span class="t-green">[GA-NAS]</span> Gen 154 | Evolution converged.', delay: 3000 },
      { text: '<span class="t-green">[GA-NAS]</span> Champion structure achieved: <span class="t-hi">RB → C5 → Skip → GAP</span>', delay: 3200 },
      { text: '<span class="t-green">[GA-NAS]</span> Final Accuracy: <span class="t-green" style="font-weight:bold">92.07%</span> on CIFAR-10 test set.', delay: 3400 }
    ];

    simLines.forEach(line => {
      nasSimTimeout = setTimeout(() => {
        const div = document.createElement('div');
        div.className = 't-line out';
        div.innerHTML = line.text;
        output.appendChild(div);
        terminalContent.scrollTop = terminalContent.scrollHeight;

        if (line.delay === 3400) {
          inputLine.style.display = 'flex';
          const input = inputLine.querySelector('.t-cli-input');
          if (input) input.focus();
        }
      }, line.delay);
    });
  }

  // ── TAB 2: LIVE TELEMETRY MONITOR ────────────────────────
  function renderMonitor() {
    let tick = 0;
    
    const updateStats = () => {
      const gpuLoad = Math.floor(65 + Math.sin(tick / 5) * 15 + Math.random() * 5);
      const gpuTemp = Math.floor(67 + Math.sin(tick / 10) * 3 + Math.random() * 2);
      const vram = (7.2 + Math.sin(tick / 8) * 0.4 + Math.random() * 0.1).toFixed(1);
      const cpuLoad = Math.floor(45 + Math.cos(tick / 4) * 12 + Math.random() * 5);
      const activeTask = tick % 6 < 3
        ? 'Training GA-NAS (Residual Evolution)' 
        : 'Evaluating NexaCred credit risk (DeFi logs)';

      const makeBar = (pct) => {
        const total = 14;
        const filled = Math.round((pct / 100) * total);
        return '[' + '#'.repeat(filled) + '.'.repeat(total - filled) + ']';
      };

      terminalContent.innerHTML = `
        <div class="t-line"><span class="t-green">● SYSTEM MONITOR</span> | uptime=${tick}s</div>
        <div class="t-line t-dim">------------------------------------------</div>
        <div class="t-line t-kv"><span>Active Engine</span><span class="t-hi">${activeTask}</span></div>
        <div class="t-line t-kv"><span>CPU Usage</span><span>${makeBar(cpuLoad)} ${cpuLoad}%</span></div>
        <div class="t-line t-kv"><span>GPU 0 (RTX 4090)</span><span>${makeBar(gpuLoad)} ${gpuLoad}% (${gpuTemp}°C)</span></div>
        <div class="t-line t-kv"><span>VRAM Memory</span><span>${vram} GB / 24.0 GB</span></div>
        <div class="t-line t-dim">------------------------------------------</div>
        <div class="t-line t-dim">Model Training Stream (W&B Log Feed):</div>
        <div class="t-line out t-dim">Epoch ${140 + tick}/300 | loss: ${(0.0894 - tick * 0.0006).toFixed(4)} | val_acc: ${(91.80 + tick * 0.008).toFixed(2)}%</div>
        <div class="t-line out t-dim">Epoch ${141 + tick}/300 | loss: ${(0.0888 - tick * 0.0006).toFixed(4)} | val_acc: ${(91.83 + tick * 0.008).toFixed(2)}%</div>
        <div class="t-line out t-dim">Epoch ${142 + tick}/300 | loss: ${(0.0882 - tick * 0.0006).toFixed(4)} | val_acc: ${(91.89 + tick * 0.008).toFixed(2)}%</div>
      `;
      
      // Auto scroll to bottom
      terminalContent.scrollTop = terminalContent.scrollHeight;
      tick++;
    };

    updateStats();
    monitorInterval = setInterval(updateStats, 1000);
  }

  // ── TAB 3: GIT GRAPH EXPLORER ────────────────────────────
  function renderGit() {
    terminalContent.innerHTML = `
      <div class="t-line t-dim">// Interactive Git history branch mapping.</div>
      <div class="t-line t-dim">// Click on a commit below to view its structural contents.</div>
      <br>
      <div class="t-git-commit-list">
        <div class="t-git-row" data-commit="apiro">
          <span class="t-git-graph">*</span>
          <span class="t-git-hash">d8bb2a1</span>
          <span class="t-git-msg">feat: add drift node physics to Apiro Canvas</span>
          <span class="t-git-branch">[apiro-dev]</span>
        </div>
        <div class="t-git-row" data-commit="nexacred">
          <span class="t-git-graph">*</span>
          <span class="t-git-hash">ec158d5</span>
          <span class="t-git-msg">feat: train LightGBM on DeFi credit wallet data</span>
          <span class="t-git-branch">[main]</span>
        </div>
        <div class="t-git-row" data-commit="personad">
          <span class="t-git-graph">*</span>
          <span class="t-git-hash">77bd33b</span>
          <span class="t-git-msg">feat: fine-tune GPT-2 on Instagram DM logs</span>
          <span class="t-git-branch">[personad-nlp]</span>
        </div>
        <div class="t-git-row" data-commit="ganas">
          <span class="t-git-graph">*</span>
          <span class="t-git-hash">85e5a5a</span>
          <span class="t-git-msg">feat: GA-NAS residual block genetic evaluation</span>
          <span class="t-git-branch">[nas-ga]</span>
        </div>
        <div class="t-git-row" data-commit="init">
          <span class="t-git-graph">*</span>
          <span class="t-git-hash">4ff9307</span>
          <span class="t-git-msg">init: portfolio structure modular framework</span>
        </div>
      </div>
      <div class="t-git-details t-dim" style="margin-top:0.8rem; border-top:1px dashed var(--border); padding-top:0.6rem; font-size:0.68rem; line-height:1.5">
        Click any commit above to inspect changes.
      </div>
    `;

    const details = terminalContent.querySelector('.t-git-details');
    const rows = terminalContent.querySelectorAll('.t-git-row');

    const commitInfo = {
      apiro: `
        <div class="t-hi">Commit d8bb2a1b (apiro-dev):</div>
        <div style="font-size:0.65rem">Author: Pranay Kapoor &lt;kapoorpranay@outlook.com&gt;</div>
        <div style="margin-top:0.25rem">Integrates force-directed repulsion equations and floating drift kinetics to the Apiro interactive biomedicine discovery canvas. Pauses calculations automatically when off-screen.</div>
      `,
      nexacred: `
        <div class="t-hi">Commit ec158d5f (main):</div>
        <div style="font-size:0.65rem">Author: Pranay Kapoor &lt;kapoorpranay@outlook.com&gt;</div>
        <div style="margin-top:0.25rem">Configures LightGBM risk classifier to consume raw smart-contract address signature transaction logs for training DeFi scoring weights.</div>
      `,
      personad: `
        <div class="t-hi">Commit 77bd33b6 (personad-nlp):</div>
        <div style="font-size:0.65rem">Author: Pranay Kapoor &lt;kapoorpranay@outlook.com&gt;</div>
        <div style="margin-top:0.25rem">Configures LoRA tuner to consume personal Instagram direct message history, adapter weight adjustments targeting GPT-2 core transformer layers.</div>
      `,
      ganas: `
        <div class="t-hi">Commit 85e5a5ae (nas-ga):</div>
        <div style="font-size:0.65rem">Author: Pranay Kapoor &lt;kapoorpranay@outlook.com&gt;</div>
        <div style="margin-top:0.25rem">Evolves residual layer channels and crossover configurations across multi-GPU parallel threads. Max test acc reached 92.07% on CIFAR-10.</div>
      `,
      init: `
        <div class="t-hi">Commit 4ff93075 (main):</div>
        <div style="font-size:0.65rem">Author: Pranay Kapoor &lt;kapoorpranay@outlook.com&gt;</div>
        <div style="margin-top:0.25rem">Initial commit outlining structural modularization: index.html, style.css, and independent ES Module components.</div>
      `
    };

    rows.forEach(row => {
      row.addEventListener('click', () => {
        rows.forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
        const key = row.getAttribute('data-commit');
        if (commitInfo[key]) {
          details.innerHTML = commitInfo[key];
          terminalContent.scrollTop = terminalContent.scrollHeight;
        }
      });
    });
  }
}
