/* ═══════════════════════════════════════════════════════════
   DATA — all content lives here. Edit this file to update
   stats, skills, projects, and contact links.
═══════════════════════════════════════════════════════════ */

export const STATS_DATA = [
  { val: "8.68",    desc: "CGPA — Scholars Scholarship recipient" },
  { val: "3rd yr",  desc: "B.Tech Computer Science, MIT Bengaluru" },
  { val: "6+",      desc: "Projects across ML, Web & Systems" },
  { val: "RTX ×2",  desc: "Dual GPU setup for local LLM inference" }
];

export const SKILLS_DATA = [
  {
    category: "ML / AI",
    chips: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "LightGBM", "OpenCV", "MediaPipe", "CTGAN", "Ollama", "Transformers"]
  },
  {
    category: "Languages",
    chips: ["Python", "Java", "JavaScript", "C", "Solidity", "SQL"]
  },
  {
    category: "Web / Full-Stack",
    chips: ["Next.js", "React", "FastAPI", "Node.js", "MySQL", "MongoDB", "REST APIs"]
  },
  {
    category: "Systems & DevOps",
    chips: ["Docker", "AWS", "Git", "CUDA", "MPI", "Linux", "Hardhat"]
  }
];

/* ── SVG animations live here as template-literal strings ──
   They use SMIL <animate> elements which only work when the
   SVG is injected inline into the DOM — which is exactly
   what render.js does via innerHTML. Do not move them to
   separate .svg files (those would be silenced by the browser).
─────────────────────────────────────────────────────────── */
export const PROJECTS_DATA = {
  noos: {
    num: "01",
    status: "active",
    tag: "01 — LLM Inference · Active",
    title: "NOOS",
    brief: "A curiosity-driven belief graph engine using temperature-corrected Shannon entropy over LLM logit distributions as a traversal heuristic.",
    media: {
      type: "svg",
      content: `
        <svg class="schematic-svg" viewBox="0 0 400 250" fill="none" stroke="var(--accent)" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="125" r="8" fill="var(--accent)"/>
          <circle cx="200" cy="75" r="8" fill="var(--accent2)"/>
          <circle cx="200" cy="175" r="8" fill="var(--accent2)"/>
          <circle cx="320" cy="125" r="8" fill="var(--accent)"/>
          <path d="M 88 121 L 192 79" stroke-width="1.5" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="30;0" dur="2.5s" repeatCount="indefinite"/></path>
          <path d="M 88 129 L 192 171" stroke-width="1.5" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="30;0" dur="2.5s" repeatCount="indefinite"/></path>
          <path d="M 208 79 L 312 121" stroke-width="1.5" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;30" dur="2.5s" repeatCount="indefinite"/></path>
          <path d="M 208 171 L 312 129" stroke-width="1.5" stroke-dasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;30" dur="2.5s" repeatCount="indefinite"/></path>
          <circle cx="200" cy="75" r="16" stroke="var(--accent2)" stroke-opacity="0.3" stroke-width="1"><animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="200" cy="175" r="16" stroke="var(--accent2)" stroke-opacity="0.3" stroke-width="1"><animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite"/></circle>
          <text x="80" y="102" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle">Input Logits</text>
          <text x="200" y="50" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle">H(X) Entropy</text>
          <text x="200" y="210" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle">Traversal Heuristic</text>
          <text x="320" y="102" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle">Belief Node</text>
        </svg>
      `
    },
    body: `<p>NOOS is a curiosity-driven philosophical belief graph engine. Rather than asking an LLM what it <strong>"knows"</strong>, NOOS measures what the model finds <strong>uncertain</strong>.</p>
<p>It computes <strong>temperature-corrected Shannon entropy</strong> over token probability distributions to identify belief graph nodes that are maximally informative to explore — steering the search toward the edges of the model's understanding.</p>
<p>The whole system runs as <strong>inference-time orchestration</strong> of deepseek-r1:14b via Ollama. No training, no fine-tuning — just creative use of what the model already knows and doesn't know.</p>`,
    tags: ["LLM", "Graph Engine", "Ollama", "Shannon Entropy", "deepseek-r1:14b", "Python", "Inference-time Orchestration"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00" }]
  },

  ganas: {
    num: "02",
    status: "inactive",
    tag: "02 — ML Research",
    title: "GA-NAS",
    brief: "Neural Architecture Search via Genetic Algorithms — evolved a 5-block residual network hitting 92.07% on CIFAR-10 with dual-GPU parallelization.",
    media: {
      type: "svg",
      content: `
        <svg class="schematic-svg" viewBox="0 0 400 250" fill="none" stroke="var(--accent)" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="45" width="100" height="140" rx="8" stroke="var(--border)" fill="rgba(232,136,74,0.01)"/>
          <text x="80" y="32" fill="var(--muted)" font-family="monospace" font-size="9" text-anchor="middle">Gen N (Parent)</text>
          <rect x="45" y="65" width="70" height="20" rx="4" stroke="var(--accent)" fill="rgba(232,136,74,0.05)"/><text x="80" y="78" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">ResBlock A</text>
          <rect x="45" y="100" width="70" height="20" rx="4" stroke="var(--accent2)" fill="rgba(245,192,100,0.05)"/><text x="80" y="113" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">Conv 3x3</text>
          <rect x="45" y="135" width="70" height="20" rx="4" stroke="var(--accent)" fill="rgba(232,136,74,0.05)"/><text x="80" y="148" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">ResBlock B</text>
          <path d="M 140 115 L 230 115" stroke="var(--accent2)" stroke-width="1.8" stroke-dasharray="5 5"><animate attributeName="stroke-dashoffset" values="20;0" dur="2s" repeatCount="indefinite"/></path>
          <text x="185" y="102" fill="var(--accent2)" font-family="monospace" font-size="8" text-anchor="middle">Mutate</text>
          <rect x="240" y="45" width="130" height="140" rx="8" stroke="var(--accent)" fill="rgba(232,136,74,0.03)"/>
          <text x="305" y="32" fill="var(--accent)" font-family="monospace" font-size="9" text-anchor="middle">Gen N+1 (92.07%)</text>
          <rect x="255" y="60" width="100" height="18" rx="4" stroke="var(--accent)" fill="rgba(232,136,74,0.08)"/><text x="305" y="72" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">ResBlock A</text>
          <rect x="255" y="85" width="100" height="18" rx="4" stroke="var(--accent2)" fill="rgba(245,192,100,0.08)"/><text x="305" y="97" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">Res B [Mutated]</text>
          <rect x="255" y="110" width="100" height="18" rx="4" stroke="var(--accent)" fill="rgba(232,136,74,0.08)"/><text x="305" y="122" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">Skip Conn</text>
          <rect x="255" y="135" width="100" height="18" rx="4" stroke="var(--accent2)" fill="rgba(245,192,100,0.08)"/><text x="305" y="147" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">Conv 3x3</text>
        </svg>
      `
    },
    body: `<p>GA-NAS applies <strong>Genetic Algorithms to Neural Architecture Search</strong> — automating the design of deep networks by treating architecture decisions as an evolving gene pool.</p>
<p>The system evolved a <strong>5-block residual architecture</strong> achieving 92.07% test accuracy on CIFAR-10. Genetic operations — selection, crossover, mutation — work directly on architecture gene encodings.</p>
<p>Training was parallelised across a <strong>dual-GPU setup</strong>, significantly reducing generation evaluation time and allowing more generations to be explored within the compute budget.</p>`,
    tags: ["Neural Architecture Search", "Genetic Algorithms", "PyTorch", "CIFAR-10", "Multi-GPU", "Python", "ResNet"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00" }]
  },

  nexacred: {
    num: "03",
    status: "inactive",
    tag: "03 — FinTech · Full-Stack",
    title: "NexaCred",
    brief: "A P2P lending platform — LightGBM credit scoring, Solidity smart contracts for trustless lending, containerised with Docker and deployed on AWS.",
    media: {
      type: "placeholder-image",
      filename: "nexacred-card.png",
      dims: "440 × 280px"
    },
    body: `<p>NexaCred is a full-stack <strong>peer-to-peer lending platform</strong> that removes traditional financial intermediaries using blockchain-based smart contracts.</p>
<p>The ML core uses <strong>LightGBM</strong> to score borrower creditworthiness from financial features, generating dynamic interest rate offers. <strong>Solidity smart contracts</strong> govern the full loan lifecycle — disbursement, repayment, and default — without a central authority.</p>
<p>The stack is containerised with <strong>Docker</strong> and deployed on <strong>AWS</strong>, with a React frontend and a Python/FastAPI backend.</p>`,
    tags: ["LightGBM", "Solidity", "Smart Contracts", "Docker", "AWS", "FastAPI", "React", "Web3"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/-nexacred-metamask-enhanced" }]
  },

  personad: {
    num: "04",
    status: "inactive",
    tag: "04 — NLP · LLM",
    title: "PersonaD",
    brief: "An LLM-based conversational imitation system that learns to replicate a person's communication style, vocabulary, and reasoning patterns.",
    media: {
      type: "svg",
      content: `
        <svg class="schematic-svg" viewBox="0 0 400 250" fill="none" stroke="var(--accent)" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.25"><line x1="40" y1="60" x2="140" y2="60" stroke="var(--muted)" stroke-width="1"/><line x1="40" y1="90" x2="140" y2="90" stroke="var(--muted)" stroke-width="1"/><line x1="40" y1="120" x2="140" y2="120" stroke="var(--muted)" stroke-width="1"/><line x1="40" y1="150" x2="140" y2="150" stroke="var(--muted)" stroke-width="1"/><line x1="40" y1="180" x2="140" y2="180" stroke="var(--muted)" stroke-width="1"/></g>
          <text x="90" y="45" fill="var(--muted)" font-family="monospace" font-size="9" text-anchor="middle">Base Vector Corpus</text>
          <rect x="160" y="70" width="80" height="100" rx="6" stroke="var(--accent)" fill="rgba(232,136,74,0.05)"/>
          <text x="200" y="105" fill="var(--accent)" font-family="monospace" font-size="9" text-anchor="middle">LoRA Adapter</text>
          <text x="200" y="122" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle">Weights</text>
          <text x="200" y="138" fill="var(--accent2)" font-family="monospace" font-size="8" text-anchor="middle">Alignment</text>
          <circle cx="310" cy="120" r="28" stroke="var(--accent2)" stroke-width="1.5" stroke-dasharray="4 2"><animate attributeName="stroke-dashoffset" values="0;20" dur="5s" repeatCount="indefinite"/></circle>
          <circle cx="310" cy="120" r="6" fill="var(--accent2)"/>
          <text x="310" y="75" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle">Imitation Vector</text>
          <text x="310" y="165" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">Vocabulary Target</text>
          <path d="M 120 120 L 160 120" stroke="var(--accent)" stroke-width="1.5"/>
          <path d="M 240 120 L 282 120" stroke="var(--accent2)" stroke-width="1.5"/>
          <polygon points="282,120 274,116 274,124" fill="var(--accent2)"/>
        </svg>
      `
    },
    body: `<p>PersonaD is a system for <strong>conversational persona imitation</strong> — training a language model to replicate how a specific individual communicates.</p>
<p>Given a corpus of conversational data, PersonaD adapts a base LLM to match the target's <strong>vocabulary, reasoning style, tone, and response patterns</strong> using parameter-efficient fine-tuning.</p>
<p>The project probes questions around personality as a learnable distribution over language, and the limits of how much of a person can be captured in text.</p>`,
    tags: ["LLM Fine-tuning", "NLP", "Transformers", "LoRA", "PyTorch", "Python"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/PersonaD" }]
  },

  fer: {
    num: "05",
    status: "inactive",
    tag: "05 — Computer Vision",
    title: "Face Emotion Recognition",
    brief: "Dual-pipeline system combining MediaPipe + Random Forest for real-time inference, and ResNet-18 fine-tuned on FER-2013 for high-accuracy classification.",
    media: {
      type: "placeholder-video",
      filename: "fer-demo.mp4",
      dims: "5–10s · muted · loop"
    },
    body: `<p>A dual-pipeline system for <strong>real-time facial emotion classification</strong>, built to balance speed and accuracy across different hardware constraints.</p>
<p><strong>Pipeline 1 (fast)</strong>: MediaPipe landmark extraction feeding a Random Forest classifier — lightweight, runs in real-time on CPU with &lt;20ms latency.</p>
<p><strong>Pipeline 2 (accurate)</strong>: ResNet-18 fine-tuned on FER-2013 — deeper, captures spatial emotion patterns that landmarks miss. Both pipelines are benchmarked head-to-head on accuracy, latency, and robustness to lighting and pose variation.</p>`,
    tags: ["MediaPipe", "ResNet-18", "FER-2013", "TensorFlow", "Random Forest", "OpenCV", "Computer Vision"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/face" }]
  },

  artgallery: {
    num: "06",
    status: "inactive",
    tag: "06 — Full-Stack Web",
    title: "Art Gallery",
    brief: "Full-stack web app for curating and browsing digital art collections, built with Next.js, React, and MySQL.",
    media: {
      type: "placeholder-image",
      filename: "artgallery-card.png",
      dims: "440 × 280px"
    },
    body: `<p>Art Gallery is a <strong>full-stack web application</strong> for browsing, curating, and managing digital art collections.</p>
<p>Built with <strong>Next.js and React</strong> on the frontend, backed by a MySQL relational database. Features include gallery browsing, artist pages, and a curator dashboard for managing collections.</p>
<p>Delivered as a complete academic project including database design, ER diagrams, normalisation analysis, and a full project report.</p>`,
    tags: ["Next.js", "React", "MySQL", "JavaScript", "Full-Stack", "REST API"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/Art_gallery" }]
  }
};

export const CONTACT_DATA = [
  {
    label: "GitHub",
    val: "github.com/Theroid00",
    url: "https://github.com/Theroid00",
    aria: "GitHub Profile",
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`
  },
  {
    label: "Email",
    val: "kapoorpranay@outlook.com",
    url: "mailto:kapoorpranay@outlook.com",
    id: "email-link",
    aria: "Copy email address",
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
  },
  {
    label: "LinkedIn",
    val: "linkedin.com/in/pranay-kapoor",
    url: "https://www.linkedin.com/in/pranay-kapoor-b57b34291/",
    aria: "LinkedIn Profile",
    icon: `<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
  }
];
