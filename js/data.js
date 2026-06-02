/* ═══════════════════════════════════════════════════════════
   DATA — all content lives here. Edit this file to update
   stats, skills, projects, and contact links.
═══════════════════════════════════════════════════════════ */

export const STATS_DATA = [
  { val: "8.68", desc: "CGPA — Scholars Scholarship recipient" },
  { val: "3rd yr", desc: "B.Tech Computer Science, MIT Bengaluru" },
  { val: "9", desc: "Projects across ML, Web & Systems" }
];

export const SKILLS_DATA = [
  { category: "ML / AI", chips: ["PyTorch","TensorFlow","Keras","Scikit-learn","OpenCV","MediaPipe","Ollama","Transformers"] },
  { category: "Languages", chips: ["Python","Java","JavaScript","C","SQL"] },
  { category: "Web / Full-Stack", chips: ["FastAPI","MySQL","MongoDB","REST APIs"] },
  { category: "Systems & DevOps", chips: ["Docker","Git","CUDA","MPI","Linux"] }
];

/* ── Apiro: canvas-based expanding biomedical graph (works in card AND modal) ── */
const apiroSvg = `<canvas class="apiro-canvas" style="width:100%;height:100%;display:block;"></canvas>`;

/* ── GA-NAS SVG ── */
const ganasSvg = `
<svg class="schematic-svg"
     viewBox="0 0 520 300"
     xmlns="http://www.w3.org/2000/svg">

  <defs>

    <radialGradient id="gaChampionGlow">
      <stop offset="0%" stop-color="var(--accent2)" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="var(--accent2)" stop-opacity="0"/>
    </radialGradient>

    <filter id="gaChampionFilter" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

  </defs>

  <!-- background links -->

  <g stroke="var(--border)"
     stroke-width="1"
     opacity="0.25">

    <line x1="90"  y1="120" x2="160" y2="80"/>
    <line x1="160" y1="80"  x2="230" y2="130"/>
    <line x1="230" y1="130" x2="320" y2="90"/>
    <line x1="320" y1="90"  x2="420" y2="130"/>

    <line x1="120" y1="200" x2="230" y2="130"/>
    <line x1="230" y1="130" x2="300" y2="220"/>
    <line x1="300" y1="220" x2="420" y2="130"/>

    <line x1="160" y1="80" x2="300" y2="220"/>
    <line x1="90" y1="120" x2="120" y2="200"/>

  </g>

  <!-- active paths with animated dashes -->

  <path d="M90 120 L160 80 L230 130 L320 90 L420 130"
        fill="none"
        stroke="var(--accent2)"
        stroke-width="1.2"
        stroke-dasharray="6 6"
        opacity="0.5">
    <animate attributeName="stroke-dashoffset"
             values="24;0"
             dur="4s"
             repeatCount="indefinite"/>
  </path>

  <path d="M120 200 L230 130 L300 220 L420 130"
        fill="none"
        stroke="var(--accent)"
        stroke-width="1.2"
        stroke-dasharray="6 6"
        opacity="0.5">
    <animate attributeName="stroke-dashoffset"
             values="24;0"
             dur="4s"
             repeatCount="indefinite"/>
  </path>

  <!-- fading bad candidates -->

  <g opacity="0.2">

    <circle cx="90" cy="120" r="4"
            fill="var(--muted)"/>

    <circle cx="120" cy="200" r="3"
            fill="var(--muted)"/>

    <circle cx="160" cy="80" r="5"
            fill="var(--muted)"/>

    <text x="90"
          y="140"
          fill="var(--muted)"
          font-size="11"
          font-family="monospace"
          text-anchor="middle">
      84.7%
    </text>

  </g>

  <!-- improving candidates -->

  <circle cx="230"
          cy="130"
          r="6"
          fill="var(--accent)">

    <animate attributeName="r"
             values="6;7.5;6"
             dur="2s"
             repeatCount="indefinite"/>

  </circle>

  <text x="230"
        y="152"
        fill="var(--accent)"
        font-family="monospace"
        font-size="11"
        text-anchor="middle">
    88.3%
  </text>

  <circle cx="320"
          cy="90"
          r="7"
          fill="var(--accent2)">

    <animate attributeName="r"
             values="7;8.5;7"
             dur="1.8s"
             repeatCount="indefinite"/>

  </circle>

  <text x="320"
        y="70"
        fill="var(--accent2)"
        font-family="monospace"
        font-size="11"
        text-anchor="middle">
    90.6%
  </text>

  <circle cx="300"
          cy="220"
          r="6"
          fill="var(--accent)">

    <animate attributeName="r"
             values="6;7.5;6"
             dur="2.5s"
             repeatCount="indefinite"/>

  </circle>

  <text x="300"
        y="242"
        fill="var(--accent)"
        font-family="monospace"
        font-size="11"
        text-anchor="middle">
    91.9%
  </text>

  <!-- champion glow -->

  <circle cx="420"
          cy="130"
          r="35"
          fill="url(#gaChampionGlow)">

    <animate attributeName="r"
             values="35;45;35"
             dur="3s"
             repeatCount="indefinite"/>

  </circle>

  <!-- champion -->

  <circle cx="420"
          cy="130"
          r="10"
          fill="var(--accent2)"
          stroke="var(--accent)"
          stroke-width="2"
          filter="url(#gaChampionFilter)">

    <animate attributeName="r"
             values="10;12;10"
             dur="1.6s"
             repeatCount="indefinite"/>

  </circle>

  <!-- moving inheritance/crossover particles -->

  <circle r="2"
          fill="var(--accent2)">

    <animateMotion
      dur="3.2s"
      repeatCount="indefinite"
      path="M90 120 L160 80 L230 130 L320 90 L420 130"/>

  </circle>

  <circle r="2"
          fill="var(--accent)">

    <animateMotion
      dur="3.2s"
      begin="1.6s"
      repeatCount="indefinite"
      path="M120 200 L230 130 L300 220 L420 130"/>

  </circle>

  <circle r="2"
          fill="var(--accent2)"
          opacity="0.85">

    <animateMotion
      dur="4s"
      begin="0.8s"
      repeatCount="indefinite"
      path="M160 80 L300 220 L420 130"/>

  </circle>

  <!-- labels -->

  <text x="260"
        y="30"
        fill="var(--muted)"
        font-family="monospace"
        font-size="12"
        text-anchor="middle">
    Neural Architecture Search (NAS)
  </text>

  <text x="90"
        y="70"
        fill="var(--muted)"
        font-family="monospace"
        font-size="11"
        text-anchor="middle"
        opacity="0.8">
    Gen 1–3
  </text>

  <text x="420"
        y="108"
        fill="var(--accent2)"
        font-family="monospace"
        font-size="11"
        text-anchor="middle">
    Champion
  </text>

  <text x="420"
        y="155"
        fill="var(--cream)"
        font-family="monospace"
        font-size="12"
        text-anchor="middle">
    92.07%
  </text>

  <text x="420"
        y="172"
        fill="var(--muted)"
        font-family="monospace"
        font-size="10"
        text-anchor="middle">
    RB → C5 → Skip → GAP
  </text>

  <!-- search telemetry -->

  <text x="260"
        y="275"
        fill="var(--muted)"
        font-family="monospace"
        font-size="11"
        text-anchor="middle">
    population=48 · generation=237 · converged=true
  </text>

</svg>`;

/* ── PersonaD SVG ── */
const personaDSvg = `
<svg
  class="schematic-svg"
  viewBox="0 0 720 320"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Instagram DM Corpus -->
  <text
    x="105"
    y="42"
    fill="var(--muted)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Instagram DM Logs
  </text>

  <g opacity=".9">
    <rect x="40" y="60" width="95" height="18" rx="9"
      stroke="var(--accent)" stroke-width="1"/>
    <rect x="58" y="90" width="72" height="18" rx="9"
      stroke="var(--accent)" stroke-width="1"/>
    <rect x="40" y="120" width="105" height="18" rx="9"
      stroke="var(--accent)" stroke-width="1"/>
    <rect x="55" y="150" width="80" height="18" rx="9"
      stroke="var(--accent)" stroke-width="1"/>
    <rect x="40" y="180" width="110" height="18" rx="9"
      stroke="var(--accent)" stroke-width="1"/>
  </g>

  <!-- Data Flow -->
  <path
    d="M150 130 L220 130"
    stroke="var(--accent)"
    stroke-width="2"
  />

  <circle r="3" fill="var(--accent)">
    <animateMotion
      path="M150 130 L220 130"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- PersonaD -->
  <rect
    x="220"
    y="80"
    width="130"
    height="100"
    rx="10"
    stroke="var(--accent)"
    stroke-width="1.6"
    fill="rgba(232,136,74,0.05)"
  />

  <text
    x="285"
    y="112"
    fill="var(--accent)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    LoRA Tuner
  </text>

  <text
    x="285"
    y="130"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Instagram Style
  </text>

  <text
    x="285"
    y="148"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="9"
    text-anchor="middle"
  >
    Δ Weights
  </text>

  <!-- Trait Nodes -->
  <g stroke="var(--accent2)" opacity=".9">
    <line x1="285" y1="80" x2="285" y2="48"/>
    <line x1="220" y1="130" x2="190" y2="130"/>
    <line x1="350" y1="130" x2="380" y2="130"/>
    <line x1="285" y1="180" x2="285" y2="212"/>
  </g>

  <circle cx="285" cy="38" r="16"
    stroke="var(--accent2)" stroke-width="1.4"/>
  <circle cx="180" cy="130" r="16"
    stroke="var(--accent2)" stroke-width="1.4"/>
  <circle cx="390" cy="130" r="16"
    stroke="var(--accent2)" stroke-width="1.4"/>
  <circle cx="285" cy="222" r="16"
    stroke="var(--accent2)" stroke-width="1.4"/>

  <text
    x="285"
    y="42"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="8"
    text-anchor="middle"
  >
    Slang
  </text>

  <text
    x="180"
    y="134"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="7.5"
    text-anchor="middle"
  >
    Chat
  </text>

  <text
    x="390"
    y="134"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="6.8"
    text-anchor="middle"
  >
    Response
  </text>

  <text
    x="285"
    y="226"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="6.5"
    text-anchor="middle"
  >
    Emoji
  </text>

  <!-- Adapter to LLM -->
  <path
    d="M350 130 L450 130"
    stroke="var(--accent)"
    stroke-width="2"
  />

  <polygon
    points="450,130 440,124 440,136"
    fill="var(--accent)"
  />

  <circle r="3" fill="var(--accent2)">
    <animateMotion
      path="M350 130 L450 130"
      dur="2.5s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Base LLM -->
  <rect
    x="450"
    y="85"
    width="120"
    height="90"
    rx="10"
    stroke="var(--cream)"
    stroke-width="1.5"
    fill="rgba(255,255,255,0.02)"
  />

  <text
    x="510"
    y="118"
    fill="var(--cream)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Base: GPT-2
  </text>

  <text
    x="510"
    y="140"
    fill="var(--muted)"
    font-family="monospace"
    font-size="9"
    text-anchor="middle"
  >
    Pre-trained
  </text>

  <!-- Persona Distribution -->
  <path
    d="M570 130 L620 130"
    stroke="var(--accent2)"
    stroke-width="2"
  />

  <circle r="3" fill="var(--accent2)">
    <animateMotion
      path="M570 130 L620 130"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>

  <circle
    cx="650"
    cy="130"
    r="42"
    stroke="var(--accent2)"
    stroke-width="1.8"
    stroke-dasharray="6 4"
    filter="url(#glow)"
  >
    <animate
      attributeName="stroke-dashoffset"
      values="0;40"
      dur="6s"
      repeatCount="indefinite"
    />
  </circle>

  <circle
    cx="650"
    cy="130"
    r="58"
    stroke="var(--muted)"
    stroke-width="1"
    opacity=".25"
    stroke-dasharray="3 8"
  >
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 650 130"
      to="360 650 130"
      dur="30s"
      repeatCount="indefinite"
    />
  </circle>

  <circle
    cx="650"
    cy="130"
    r="9"
    fill="var(--accent2)"
  />

  <text
    x="650"
    y="74"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Imitation Model
  </text>

  <text
    x="650"
    y="198"
    fill="var(--cream)"
    font-family="monospace"
    font-size="8.5"
    text-anchor="middle"
  >
    Insta Conversation Clone
  </text>

  <text
    x="650"
    y="230"
    fill="var(--muted)"
    opacity=".55"
    font-family="monospace"
    font-size="8"
    text-anchor="middle"
  >
    Predicting Next Token...
  </text>
</svg>
`;

/* ── NexaCred SVG ── */
const nexacredSvg = `
<svg
  class="schematic-svg"
  viewBox="0 0 940 400"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <filter id="ferGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Title & Subtitle -->
  <text
    x="470"
    y="28"
    fill="var(--cream)"
    font-family="monospace"
    font-size="14"
    font-weight="bold"
    text-anchor="middle"
  >
    NexaCred: P2P Credit Scoring &amp; Lending Protocol
  </text>

  <text
    x="470"
    y="46"
    fill="var(--muted)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    LightGBM (DeFi Wallet Trained) · IBM Granite RAG · Solidity EVM Contracts
  </text>

  <!-- Connection Links (Main Pipeline) -->
  <g stroke="var(--border)" stroke-width="1.2" opacity="0.35">
    <line x1="170" y1="225" x2="220" y2="225" />
    <line x1="350" y1="225" x2="400" y2="225" />
    <line x1="540" y1="225" x2="590" y2="225" />
    <line x1="720" y1="225" x2="770" y2="225" />

    <!-- Vertical Feed Links -->
    <line x1="470" y1="120" x2="470" y2="150" stroke="var(--accent)" />
    <line x1="470" y1="300" x2="470" y2="330" stroke="var(--accent2)" />
  </g>

  <!-- Active Dashed Flow Paths -->
  <path d="M170 225 L220 225 M350 225 L400 225"
        fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.5">
    <animate attributeName="stroke-dashoffset" values="16;0" dur="2s" repeatCount="indefinite"/>
  </path>
  <path d="M540 225 L590 225 M720 225 L770 225"
        fill="none" stroke="var(--accent2)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.5">
    <animate attributeName="stroke-dashoffset" values="16;0" dur="2s" repeatCount="indefinite"/>
  </path>

  <line x1="470" y1="120" x2="470" y2="150" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.5">
    <animate attributeName="stroke-dashoffset" values="12;0" dur="1.5s" repeatCount="indefinite"/>
  </line>
  <line x1="470" y1="300" x2="470" y2="330" stroke="var(--accent2)" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.5">
    <animate attributeName="stroke-dashoffset" values="0;12" dur="1.5s" repeatCount="indefinite"/>
  </line>

  <!-- ================= NODE 1: React & MetaMask ================= -->
  <rect
    x="40"
    y="150"
    width="130"
    height="150"
    rx="10"
    stroke="var(--accent)"
    fill="#110e0c"
    stroke-width="1.5"
  />
  <g opacity="0.8">
    <rect x="75" y="165" width="60" height="38" rx="4" stroke="var(--accent)" stroke-width="1" fill="none"/>
    <circle cx="87" cy="175" r="4" fill="var(--accent)" opacity="0.9"/>
    <rect x="98" y="172" width="28" height="6" rx="1" fill="var(--cream)" opacity="0.6"/>
    <path d="M85 191 H125" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 2" opacity="0.7"/>
  </g>
  <text x="105" y="225" fill="var(--accent)" font-family="monospace" font-size="11" text-anchor="middle">React 19.1</text>
  <text x="105" y="240" fill="var(--cream)" font-family="monospace" font-size="9.5" text-anchor="middle">MetaMask Web3</text>
  <text x="105" y="255" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">Vite + Tailwind</text>
  <text x="105" y="270" fill="var(--muted)" font-family="monospace" font-size="8" text-anchor="middle">Wallet Signature</text>

  <!-- ================= NODE 2: Express Backend ================= -->
  <rect
    x="220"
    y="150"
    width="130"
    height="150"
    rx="10"
    stroke="var(--accent)"
    fill="#110e0c"
    stroke-width="1.5"
  />
  <g opacity="0.8">
    <rect x="265" y="165" width="40" height="10" rx="2" stroke="var(--accent)" stroke-width="0.8" fill="none"/>
    <rect x="265" y="178" width="40" height="10" rx="2" stroke="var(--accent)" stroke-width="0.8" fill="none"/>
    <rect x="265" y="191" width="40" height="10" rx="2" stroke="var(--accent)" stroke-width="0.8" fill="none"/>
    <circle cx="271" cy="170" r="1.5" fill="var(--accent)"/>
    <circle cx="271" cy="183" r="1.5" fill="var(--accent)"/>
    <circle cx="271" cy="196" r="1.5" fill="var(--accent)"/>
  </g>
  <text x="285" y="225" fill="var(--accent)" font-family="monospace" font-size="11" text-anchor="middle">Express Gateway</text>
  <text x="285" y="240" fill="var(--cream)" font-family="monospace" font-size="9.5" text-anchor="middle">Node.js API</text>
  <text x="285" y="255" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">MongoDB + JWT</text>
  <text x="285" y="270" fill="var(--muted)" font-family="monospace" font-size="8" text-anchor="middle">Secure Escrow Auth</text>

  <!-- ================= NODE 3: FastAPI ML Engine ================= -->
  <rect
    x="400"
    y="150"
    width="140"
    height="150"
    rx="10"
    stroke="var(--accent2)"
    fill="#110e0c"
    stroke-width="1.8"
    filter="url(#ferGlowFilter)"
  />
  <g opacity="0.8">
    <path d="M450 195 A 20 20 0 0 1 490 195" fill="none" stroke="var(--accent2)" stroke-width="2" opacity="0.4"/>
    <line x1="470" y1="195" x2="482" y2="180" stroke="var(--accent2)" stroke-width="1.8"/>
    <circle cx="470" cy="195" r="2.5" fill="var(--accent2)"/>
  </g>
  <text x="470" y="225" fill="var(--accent2)" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">FastAPI Engine</text>
  <text x="470" y="240" fill="var(--cream)" font-family="monospace" font-size="9.5" text-anchor="middle">LightGBM Model</text>
  <text x="470" y="255" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">DeFi Credit Scorer</text>
  <text x="470" y="270" fill="var(--muted)" font-family="monospace" font-size="8" text-anchor="middle">Risk Rating (300-850)</text>

  <!-- ================= NODE 4: Solidity Escrow ================= -->
  <rect
    x="590"
    y="150"
    width="130"
    height="150"
    rx="10"
    stroke="var(--accent2)"
    fill="#110e0c"
    stroke-width="1.5"
  />
  <g opacity="0.8">
    <polygon points="655,163 643,178 655,182" stroke="var(--accent2)" stroke-width="0.8" fill="none"/>
    <polygon points="655,163 667,178 655,182" stroke="var(--accent2)" stroke-width="0.8" fill="none"/>
    <polygon points="655,182 643,178 655,197" stroke="var(--accent2)" stroke-width="0.8" fill="none"/>
    <polygon points="655,182 667,178 655,197" stroke="var(--accent2)" stroke-width="0.8" fill="none"/>
    <line x1="635" y1="202" x2="675" y2="202" stroke="var(--accent2)" stroke-width="1" opacity="0.5"/>
  </g>
  <text x="655" y="225" fill="var(--accent2)" font-family="monospace" font-size="11" text-anchor="middle">Solidity EVM</text>
  <text x="655" y="240" fill="var(--cream)" font-family="monospace" font-size="9.5" text-anchor="middle">P2P Loan Escrow</text>
  <text x="655" y="255" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">Collateral Vaults</text>
  <text x="655" y="270" fill="var(--muted)" font-family="monospace" font-size="8" text-anchor="middle">Smart Contract Yield</text>

  <!-- ================= NODE 5: DeFi Markets ================= -->
  <rect
    x="770"
    y="150"
    width="130"
    height="150"
    rx="10"
    stroke="var(--cream)"
    fill="#110e0c"
    stroke-width="1.2"
    opacity="0.8"
  />
  <g opacity="0.8">
    <circle cx="828" cy="180" r="10" stroke="var(--cream)" stroke-width="1" fill="none"/>
    <circle cx="842" cy="180" r="10" stroke="var(--cream)" stroke-width="1" fill="none"/>
    <path d="M815 195 L855 195" stroke="var(--cream)" stroke-width="0.8" opacity="0.5"/>
  </g>
  <text x="835" y="225" fill="var(--cream)" font-family="monospace" font-size="11" text-anchor="middle">DeFi Markets</text>
  <text x="835" y="240" fill="var(--cream)" font-family="monospace" font-size="9.5" text-anchor="middle">Liquidity Pools</text>
  <text x="835" y="255" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">Repayments / Stable</text>
  <text x="835" y="270" fill="var(--muted)" font-family="monospace" font-size="8" text-anchor="middle">DeFi Liquidity</text>

  <!-- ================= TOP BRANCH: Blockchain Analytics RPC ================= -->
  <rect
    x="400"
    y="70"
    width="140"
    height="50"
    rx="8"
    stroke="var(--accent)"
    fill="#110e0c"
    stroke-width="1.2"
    opacity="0.85"
  />
  <text x="470" y="90" fill="var(--accent)" font-family="monospace" font-size="10.5" font-weight="bold" text-anchor="middle">DeFi Credit Wallet</text>
  <text x="470" y="105" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle">Training Data Ingestion</text>

  <!-- ================= BOTTOM BRANCH: IBM Granite RAG Chatbot ================= -->
  <rect
    x="400"
    y="330"
    width="140"
    height="50"
    rx="8"
    stroke="var(--accent2)"
    fill="#110e0c"
    stroke-width="1.2"
    opacity="0.85"
  />
  <text x="470" y="350" fill="var(--accent2)" font-family="monospace" font-size="10.5" font-weight="bold" text-anchor="middle">IBM Granite RAG</text>
  <text x="470" y="365" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle">AI Risk Chatbot</text>

  <!-- ================= STREAMING PARTICLES ================= -->
  <!-- Packet 1: React Dashboard -> Express -> FastAPI Score Ingress -->
  <circle r="3.2" fill="var(--accent)" opacity="0.9">
    <animateMotion
      path="M105 225 L285 225 L470 225"
      dur="3.2s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Packet 2: On-Chain Ingestion -> FastAPI Scorer Ingress -->
  <circle r="3.2" fill="var(--accent)" opacity="0.85">
    <animateMotion
      path="M470 95 L470 225"
      dur="2s"
      begin="0.6s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Packet 3: FastAPI dynamic score -> Solidity Contract -> Liquidity execution -->
  <circle r="3.2" fill="var(--accent2)" opacity="0.9">
    <animateMotion
      path="M470 225 L655 225 L835 225"
      dur="3.5s"
      begin="1.2s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Packet 4: Granite RAG query round-trip -->
  <circle r="2.5" fill="var(--accent2)" opacity="0.8">
    <animateMotion
      path="M470 225 L470 355 L470 225"
      dur="4s"
      begin="2.2s"
      repeatCount="indefinite"
    />
  </circle>

</svg>`;

/* ── Face Emotion Recognition SVG ── */
const fersvg = `
<svg
  class="schematic-svg"
  viewBox="0 0 900 340"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <filter id="ferGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Title & Subtitle -->
  <text
    x="450"
    y="28"
    fill="var(--cream)"
    font-family="monospace"
    font-size="14"
    text-anchor="middle"
  >
    Dual-Pipeline Emotion Classification
  </text>

  <text
    x="450"
    y="46"
    fill="var(--muted)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Speed vs Accuracy Across Hardware Constraints
  </text>

  <!-- Video Stream (Camera Frame) -->
  <text
    x="85"
    y="112"
    fill="var(--muted)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Video Stream
  </text>

  <rect
    x="40"
    y="125"
    width="90"
    height="90"
    rx="10"
    stroke="var(--accent)"
    stroke-width="1.5"
    fill="#110e0c"
  />

  <circle cx="85" cy="170" r="18"
    stroke="var(--accent)"
    stroke-width="1.3"/>

  <circle cx="78" cy="165" r="1.5"
    fill="var(--accent)"/>

  <circle cx="92" cy="165" r="1.5"
    fill="var(--accent)"/>

  <path
    d="M76 178 Q85 186 94 178"
    stroke="var(--accent)"
    stroke-width="1.3"
  />

  <!-- Connection Links -->
  <g stroke="var(--border)" stroke-width="1.2" opacity="0.35">
    <!-- Camera to split -->
    <line x1="130" y1="170" x2="180" y2="170" />

    <!-- Split to pipelines -->
    <line x1="180" y1="170" x2="220" y2="130" stroke="var(--accent)" stroke-width="1.5" />
    <line x1="180" y1="170" x2="220" y2="270" stroke="var(--accent2)" stroke-width="1.5" />

    <!-- Top fast pipeline links -->
    <line x1="330" y1="130" x2="380" y2="130" />
    <line x1="490" y1="130" x2="540" y2="130" />
    <line x1="660" y1="130" x2="740" y2="170" />

    <!-- Bottom accurate pipeline links -->
    <line x1="330" y1="270" x2="380" y2="270" />
    <line x1="490" y1="270" x2="540" y2="270" />
    <line x1="660" y1="270" x2="740" y2="170" />

    <!-- Merge to benchmark -->
    <line x1="740" y1="170" x2="790" y2="170" />
  </g>

  <!-- Split node -->
  <circle cx="180" cy="170" r="4" fill="var(--accent)"/>

  <!-- Active flow dashed paths -->
  <path d="M180 170 L220 130 L330 130 L380 130 L490 130 L540 130 L660 130 L740 170"
        fill="none"
        stroke="var(--accent)"
        stroke-width="1.2"
        stroke-dasharray="6 6"
        opacity="0.4">
    <animate attributeName="stroke-dashoffset" values="24;0" dur="4s" repeatCount="indefinite"/>
  </path>

  <path d="M180 170 L220 270 L330 270 L380 270 L490 270 L540 270 L660 270 L740 170"
        fill="none"
        stroke="var(--accent2)"
        stroke-width="1.2"
        stroke-dasharray="6 6"
        opacity="0.4">
    <animate attributeName="stroke-dashoffset" values="24;0" dur="4s" repeatCount="indefinite"/>
  </path>

  <!-- ================= FAST PIPELINE ================= -->
  <text
    x="330"
    y="68"
    fill="var(--accent)"
    font-family="monospace"
    font-size="12"
    font-weight="bold"
    text-anchor="middle"
  >
    FAST PIPELINE
  </text>

  <text
    x="330"
    y="84"
    fill="var(--muted)"
    font-family="monospace"
    font-size="9"
    text-anchor="middle"
  >
    &lt;20ms CPU Inference
  </text>

  <!-- MediaPipe landmarks box -->
  <rect
    x="220"
    y="95"
    width="110"
    height="70"
    rx="8"
    stroke="var(--accent)"
    fill="#110e0c"
  />

  <text
    x="275"
    y="145"
    fill="var(--accent)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    MediaPipe
  </text>

  <text
    x="275"
    y="157"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Landmarks
  </text>

  <!-- Face mesh schematic (centered vertically) -->
  <g opacity="0.8">
    <circle cx="267" cy="112" r="1.5" fill="var(--accent)"/>
    <circle cx="283" cy="112" r="1.5" fill="var(--accent)"/>
    <circle cx="275" cy="120" r="1.5" fill="var(--accent)"/>
    <circle cx="269" cy="129" r="1.5" fill="var(--accent)"/>
    <circle cx="281" cy="129" r="1.5" fill="var(--accent)"/>
    <line x1="267" y1="112" x2="275" y2="120" stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>
    <line x1="283" y1="112" x2="275" y2="120" stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>
    <line x1="267" y1="112" x2="269" y2="129" stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>
    <line x1="283" y1="112" x2="281" y2="129" stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>
    <line x1="269" y1="129" x2="275" y2="120" stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>
    <line x1="281" y1="129" x2="275" y2="120" stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>
  </g>

  <!-- Random Forest box -->
  <rect
    x="380"
    y="95"
    width="110"
    height="70"
    rx="8"
    stroke="var(--accent)"
    fill="#110e0c"
  />

  <text
    x="435"
    y="145"
    fill="var(--accent)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Random Forest
  </text>

  <text
    x="435"
    y="157"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Classifier
  </text>

  <!-- Decision tree schematic (centered vertically) -->
  <g opacity="0.8">
    <circle cx="435" cy="106" r="2" fill="var(--accent)"/>
    <line x1="435" y1="106" x2="425" y2="116" stroke="var(--accent)" stroke-width="0.8"/>
    <circle cx="425" cy="116" r="1.8" fill="var(--accent)"/>
    <line x1="435" y1="106" x2="445" y2="116" stroke="var(--accent)" stroke-width="0.8"/>
    <circle cx="445" cy="116" r="1.8" fill="var(--accent)"/>
    <line x1="425" y1="116" x2="420" y2="126" stroke="var(--accent)" stroke-width="0.6"/>
    <circle cx="420" cy="126" r="1.5" fill="var(--accent)"/>
    <line x1="425" y1="116" x2="430" y2="126" stroke="var(--accent)" stroke-width="0.6"/>
    <circle cx="430" cy="126" r="1.5" fill="var(--accent)"/>
  </g>

  <!-- Emotion Prediction Fast box -->
  <rect
    x="540"
    y="95"
    width="120"
    height="70"
    rx="8"
    stroke="var(--accent)"
    fill="#110e0c"
  />

  <text
    x="600"
    y="120"
    fill="var(--accent)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Emotion
  </text>

  <text
    x="600"
    y="135"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Prediction
  </text>

  <text
    x="600"
    y="150"
    fill="var(--muted)"
    font-family="monospace"
    font-size="9"
    text-anchor="middle"
  >
    Happy / Sad / Angry
  </text>


  <!-- ================= ACCURATE PIPELINE ================= -->
  <text
    x="330"
    y="208"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="12"
    font-weight="bold"
    text-anchor="middle"
  >
    ACCURATE PIPELINE
  </text>

  <text
    x="330"
    y="224"
    fill="var(--muted)"
    font-family="monospace"
    font-size="9"
    text-anchor="middle"
  >
    ResNet-18 + FER-2013
  </text>

  <!-- Face alignment preprocess box -->
  <rect
    x="220"
    y="235"
    width="110"
    height="70"
    rx="8"
    stroke="var(--accent2)"
    fill="#110e0c"
  />

  <text
    x="275"
    y="285"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Face Align
  </text>

  <text
    x="275"
    y="297"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Preprocess
  </text>

  <!-- Preprocess checkmark square (centered vertically) -->
  <g opacity="0.8">
    <rect x="263" y="244" width="24" height="24" rx="3" stroke="var(--accent2)" stroke-dasharray="2 2" stroke-width="0.8" opacity="0.6" fill="none"/>
    <path d="M270 254 L274 258 L281 250" stroke="var(--accent2)" stroke-width="1.2" fill="none" opacity="0.8"/>
  </g>

  <!-- ResNet-18 box -->
  <rect
    x="380"
    y="235"
    width="110"
    height="70"
    rx="8"
    stroke="var(--accent2)"
    fill="#110e0c"
  />

  <text
    x="435"
    y="285"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    ResNet-18
  </text>

  <text
    x="435"
    y="297"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Fine-Tuned
  </text>

  <!-- CNN volumes in perspective (centered vertically) -->
  <g opacity="0.8">
    <rect x="423" y="244" width="6" height="22" rx="1" fill="none" stroke="var(--accent2)" stroke-width="0.8" opacity="0.5"/>
    <rect x="432" y="247" width="6" height="16" rx="1" fill="none" stroke="var(--accent2)" stroke-width="0.8" opacity="0.7"/>
    <rect x="441" y="250" width="6" height="10" rx="1" fill="none" stroke="var(--accent2)" stroke-width="0.8"/>
    <line x1="429" y1="244" x2="432" y2="247" stroke="var(--accent2)" stroke-width="0.4" opacity="0.5"/>
    <line x1="429" y1="266" x2="432" y2="263" stroke="var(--accent2)" stroke-width="0.4" opacity="0.5"/>
    <line x1="438" y1="247" x2="441" y2="250" stroke="var(--accent2)" stroke-width="0.4" opacity="0.5"/>
    <line x1="438" y1="263" x2="441" y2="260" stroke="var(--accent2)" stroke-width="0.4" opacity="0.5"/>
  </g>

  <!-- Emotion Prediction Accurate box -->
  <rect
    x="540"
    y="235"
    width="120"
    height="70"
    rx="8"
    stroke="var(--accent2)"
    fill="#110e0c"
  />

  <text
    x="600"
    y="260"
    fill="var(--accent2)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Emotion
  </text>

  <text
    x="600"
    y="275"
    fill="var(--cream)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Prediction
  </text>

  <text
    x="600"
    y="290"
    fill="var(--muted)"
    font-family="monospace"
    font-size="9"
    text-anchor="middle"
  >
    High-Accuracy CNN
  </text>


  <!-- ================= BENCHMARKING ================= -->
  <circle
    cx="790"
    cy="170"
    r="48"
    stroke="var(--cream)"
    stroke-width="1.5"
    stroke-dasharray="6 4"
    filter="url(#ferGlowFilter)"
  >
    <animate
      attributeName="stroke-dashoffset"
      values="0;40"
      dur="8s"
      repeatCount="indefinite"
    />
  </circle>

  <circle
    cx="790"
    cy="170"
    r="10"
    fill="var(--cream)"
  />

  <text
    x="790"
    y="105"
    fill="var(--cream)"
    font-family="monospace"
    font-size="11"
    text-anchor="middle"
  >
    Benchmarking
  </text>

  <text
    x="790"
    y="232"
    fill="var(--muted)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Accuracy
  </text>

  <text
    x="790"
    y="248"
    fill="var(--muted)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Latency
  </text>

  <text
    x="790"
    y="264"
    fill="var(--muted)"
    font-family="monospace"
    font-size="10"
    text-anchor="middle"
  >
    Robustness
  </text>


  <!-- ================= STREAMING PARTICLES ================= -->
  <!-- Fast pipeline streaming particle 1 -->
  <circle r="3.5" fill="var(--accent)" opacity="0.9">
    <animateMotion
      path="M85 170 L180 170 L220 130 L330 130 L380 130 L490 130 L540 130 L660 130 L740 170 L790 170"
      dur="4s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Fast pipeline streaming particle 2 -->
  <circle r="3.5" fill="var(--accent)" opacity="0.6">
    <animateMotion
      path="M85 170 L180 170 L220 130 L330 130 L380 130 L490 130 L540 130 L660 130 L740 170 L790 170"
      dur="4s"
      begin="2s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Accurate pipeline streaming particle 1 -->
  <circle r="3.5" fill="var(--accent2)" opacity="0.9">
    <animateMotion
      path="M85 170 L180 170 L220 270 L330 270 L380 270 L490 270 L540 270 L660 270 L740 170 L790 170"
      dur="4.5s"
      begin="1.5s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- Accurate pipeline streaming particle 2 -->
  <circle r="3.5" fill="var(--accent2)" opacity="0.6">
    <animateMotion
      path="M85 170 L180 170 L220 270 L330 270 L380 270 L490 270 L540 270 L660 270 L740 170 L790 170"
      dur="4.5s"
      begin="3.75s"
      repeatCount="indefinite"
    />
  </circle>

</svg>`;

export const PROJECTS_DATA = {
  apiro: {
    num: "01",
    status: "active",
    tag: "01 — Biomedicine · AI · Active",
    title: "Apiro",
    brief: "A biomedical belief-graph engine that navigates clinical pathways and gene-disease target spaces using LLM token-entropy as a traversal heuristic.",
    media: { type: "svg", content: apiroSvg },
    body: `<p><strong>Think of Apiro as an AI detective for medical research.</strong> By analyzing where advanced medical AI models are most uncertain or "confused" when answering complex clinical questions, Apiro highlights hidden gaps and promising links between genes and diseases that are worth testing in the lab.</p>
<p>Technically, it is a <strong>biomedical discovery engine</strong> and belief-graph navigator that accelerates clinical differential diagnosis and therapeutic target identification.</p>
<p>Instead of relying on static literature, Apiro computes <strong>Shannon entropy</strong> over live LLM logit distributions. By measuring model uncertainty at clinical decision boundaries, it prioritizes exploration of highly generative, under-explored pathway associations.</p>
<p>The system orchestrates real-time, evidence-grounded graph traversal, stopping automatically when epistemic uncertainty saturates and flagging reasoning rabbit holes.</p>`,
    tags: ["Bioinformatics", "LLM Inference", "Target Discovery", "Shannon Entropy", "Gene Ontology", "Pathways", "Python"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/apiro" }]
  },

  ganas: {
    num: "02",
    status: "inactive",
    tag: "02 — ML Research",
    title: "GA-NAS",
    brief: "Neural Architecture Search via Genetic Algorithms — evolved optimal residual block network architectures to gain the best neural network structure.",
    media: { type: "svg", content: ganasSvg },
    body: `<p>GA-NAS applies <strong>Genetic Algorithms to Neural Architecture Search (NAS)</strong> — automating the design of deep networks to discover the optimal network architecture by treating design decisions as an evolving gene pool.</p>
<p>The system evolved a <strong>5-block residual architecture</strong> achieving 92.07% test accuracy on CIFAR-10. Genetic operations — selection, crossover, mutation — dynamically searched the topology space to find the best performing structure.</p>
<p>Training was parallelised across multiple GPUs, significantly reducing generation evaluation time and allowing more generations to be explored within the compute budget.</p>`,
    tags: ["Neural Architecture Search", "Genetic Algorithms", "PyTorch", "CIFAR-10", "Multi-GPU", "Python", "ResNet"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/NAS" }]
  },

  nexacred: {
    num: "03",
    status: "inactive",
    tag: "03 — FinTech · Full-Stack",
    title: "NexaCred",
    brief: "A P2P lending platform — LightGBM credit scoring trained on DeFi credit wallet histories, Solidity smart contracts for trustless lending.",
    media: { type: "svg", content: nexacredSvg },
    body: `<p>NexaCred is a full-stack <strong>peer-to-peer lending platform</strong> that removes traditional financial intermediaries using blockchain-based smart contracts.</p>
<p>The ML core utilizes a <strong>LightGBM</strong> classifier trained on historical <strong>DeFi credit wallet</strong> data to evaluate borrower creditworthiness and compute dynamic risk-adjusted interest rates. <strong>Solidity smart contracts</strong> govern the full loan lifecycle — disbursement, repayment, and default — without a central authority.</p>
<p>The stack is containerised with <strong>Docker</strong> and was deployed on <strong>AWS</strong>, with a React frontend and a Python/FastAPI backend.</p>`,
    tags: ["LightGBM", "Solidity", "Smart Contracts", "Docker", "FastAPI", "React", "Web3"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/-nexacred-metamask-enhanced" }]
  },

  personad: {
    num: "04",
    status: "inactive",
    tag: "04 — NLP · LLM",
    title: "PersonaD",
    brief: "An LLM conversational clone fine-tuning GPT-2 on a personal Instagram DM dataset to replicate specific messaging styles and vocabulary.",
    media: { type: "svg", content: personaDSvg },
    body: `<p>PersonaD is a <strong>conversational imitation model</strong> that learns to replicate a user's unique communication style by fine-tuning <strong>GPT-2</strong> on their personal <strong>Instagram DM history</strong>.</p>
<p>By leveraging parameter-efficient fine-tuning, PersonaD adapts the base model to mirror specific conversational behaviors: colloquial vocabulary, sentence structure, emoji distributions, and response patterns.</p>`,
    tags: ["LLM Fine-tuning", "NLP", "Transformers", "LoRA", "PyTorch", "Python"],
    links: [{ l: "GitHub", h: "https://github.com/Theroid00/PersonaD" }]
  },

  fer: {
    num: "05",
    status: "inactive", // Updated to active as it includes functional Streamlit and OpenCV app scripts
    tag: "05 — Computer Vision",
    title: "Face Emotion Recognition",
    brief: "Dual-pipeline facial emotion classifier featuring a lightweight landmark-based Random Forest model and an end-to-end grayscale ResNet-18 fine-tuned on FER-2013.",
    media: { type: "svg", content: fersvg },
    body: `<p>A dual-pipeline system designed for <strong>real-time facial emotion recognition</strong> that balances execution speed and spatial classification accuracy across varied compute constraints.</p>
<p><strong>Pipeline 1 (Handcrafted Landmarks)</strong>: Leverages MediaPipe Face Mesh to capture facial geometry. It extracts custom distance ratios (mouth width, eye openness, eyebrow height) and runs them through a Scikit-Learn Random Forest. This model is extremely lightweight, running inference in under 15ms directly on host CPU threads.</p>
<p><strong>Pipeline 2 (Deep Neural Network)</strong>: Features a PyTorch-based ResNet-18 architecture modified for 1-channel grayscale inputs. Fine-tuned on the FER-2013 dataset using class-weighted cross-entropy and extensive image augmentations, this pipeline specializes in capturing micro-expressions and high-dimensional spatial details that simple landmarks fail to capture.</p>
<p>Inference is exposed via a desktop OpenCV windowing loop for local testing and an interactive Streamlit web dashboard supportable on hosting platforms like Hugging Face Spaces.</p>`,
    tags: ["PyTorch", "ResNet-18", "MediaPipe", "Random Forest", "OpenCV", "Streamlit", "Scikit-Learn", "Computer Vision"],
    links: [
      { l: "Hugging Face", h: "https://huggingface.co/spaces/Theroid/FER", type: "live" },
      { l: "GitHub", h: "https://github.com/Theroid00/face", type: "github" }
    ]
  },

  artgallery: {
    num: "06",
    status: "inactive",
    tag: "06 — Full-Stack Web",
    title: "Art Gallery",
    brief: "Full-stack web app for curating and browsing digital art collections, built with Next.js, React, and MySQL.",
    media: {
      type: "svg",
      content: `
<svg class="schematic-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="artGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="var(--accent)" />
      <stop offset="100%" stop-color="var(--accent2)" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Title & Frame Outline -->
  <text x="260" y="32" fill="var(--muted)" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="0.1em">Next.js Client ⇄ Relational MySQL</text>

  <!-- Interface / Web Client representation (Left Pane) -->
  <rect x="35" y="70" width="160" height="150" rx="8" stroke="var(--border)" stroke-width="1.2" fill="rgba(232,136,74,0.02)"/>
  <rect x="35" y="70" width="160" height="20" rx="8" fill="rgba(232,136,74,0.06)" stroke="var(--border)" stroke-width="0.8"/>
  <circle cx="48" cy="80" r="3" fill="#ff5f56"/>
  <circle cx="56" cy="80" r="3" fill="#ffbd2e"/>
  <circle cx="64" cy="80" r="3" fill="#27c93f"/>
  <text x="115" y="83" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">ArtGallery App</text>
  
  <!-- Interactive Client UI grid (mimicking art layout cards) -->
  <rect x="47" y="105" width="62" height="42" rx="4" stroke="var(--accent)" stroke-width="1.2" fill="none" opacity="0.8"/>
  <rect x="47" y="157" width="62" height="42" rx="4" stroke="var(--border)" stroke-width="1" fill="none" opacity="0.4"/>
  <rect x="121" y="105" width="62" height="42" rx="4" stroke="var(--border)" stroke-width="1" fill="none" opacity="0.4"/>
  <rect x="121" y="157" width="62" height="42" rx="4" stroke="var(--accent2)" stroke-width="1.2" fill="none" opacity="0.8"/>

  <!-- Glowing interactive "Artwork" inside client view -->
  <circle cx="78" cy="126" r="8" fill="url(#artGrad)" opacity="0.9" filter="url(#glow)">
    <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite"/>
  </circle>
  <polygon points="144,183 158,172 152,183" fill="url(#artGrad)" opacity="0.8">
    <animateTransform attributeName="transform" type="rotate" from="0 152 178" to="360 152 178" dur="8s" repeatCount="indefinite"/>
  </polygon>

  <!-- Database / Schema representation (Right Pane) -->
  <rect x="325" y="70" width="160" height="150" rx="8" stroke="var(--border)" stroke-width="1.2" fill="rgba(245,192,100,0.01)"/>
  
  <!-- Relational Tables (MySQL Schema ER illustration) -->
  <!-- Table 1: Artworks -->
  <rect x="345" y="88" width="120" height="32" rx="4" stroke="var(--accent)" stroke-width="1.2" fill="rgba(14,12,10,0.9)"/>
  <text x="405" y="102" fill="var(--accent)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Table: ARTWORKS</text>
  <line x1="345" y1="108" x2="465" y2="108" stroke="var(--border)" stroke-width="0.8"/>
  <text x="353" y="116" fill="var(--muted)" font-family="monospace" font-size="6.5">id [PK] · title · image_url</text>

  <!-- Table 2: Exhibitions -->
  <rect x="345" y="162" width="120" height="32" rx="4" stroke="var(--accent2)" stroke-width="1.2" fill="rgba(14,12,10,0.9)"/>
  <text x="405" y="176" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Table: CURATORS</text>
  <line x1="345" y1="182" x2="465" y2="182" stroke="var(--border)" stroke-width="0.8"/>
  <text x="353" y="190" fill="var(--muted)" font-family="monospace" font-size="6.5">id [PK] · name · role_type</text>

  <!-- Connecting Schema relation line -->
  <line x1="405" y1="120" x2="405" y2="162" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="405" cy="141" r="3.5" fill="var(--cream)" opacity="0.6"/>

  <!-- Transaction Lines (Data Flows) -->
  <!-- Query flow (Top curve) -->
  <path d="M 195 120 Q 260 90 325 120" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="5 5">
    <animate attributeName="stroke-dashoffset" values="30;0" dur="3s" repeatCount="indefinite"/>
  </path>
  <text x="260" y="93" fill="var(--accent)" font-family="monospace" font-size="8.5" text-anchor="middle">REST HTTP API</text>

  <!-- Response flow (Bottom curve) -->
  <path d="M 325 180 Q 260 210 195 180" fill="none" stroke="var(--accent2)" stroke-width="1.2" stroke-dasharray="5 5">
    <animate attributeName="stroke-dashoffset" values="0;30" dur="3s" repeatCount="indefinite"/>
  </path>
  <text x="260" y="213" fill="var(--accent2)" font-family="monospace" font-size="8.5" text-anchor="middle">MySQL JSON Payload</text>

  <!-- Moving network packet indicators -->
  <circle r="3.5" fill="var(--accent2)">
    <animateMotion dur="3s" repeatCount="indefinite" path="M 195 120 Q 260 90 325 120" />
  </circle>
  <circle r="3.5" fill="var(--accent)">
    <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 325 180 Q 260 210 195 180" />
  </circle>

  <!-- Status Telemetry -->
  <text x="260" y="260" fill="var(--muted)" font-family="monospace" font-size="9" text-anchor="middle">Relational Schema Normalization: 3NF</text>
</svg>
      `
    },
    body: `<p>Art Gallery is a <strong>full-stack web application</strong> for browsing, curating, and managing digital art collections.</p>
<p>Built with <strong>Next.js and React</strong> on the frontend, backed by a MySQL relational database. Features include gallery browsing, artist pages, and a curator dashboard for managing collections.</p>
<p>Delivered as a complete deployed website.</p>`,
    tags: ["Next.js", "React", "MySQL", "JavaScript", "Full-Stack", "REST API"],
    links: [
      { l: "Live Site", h: "https://pranaykapoor.me/Art_gallery", type: "live" },
      { l: "GitHub", h: "https://github.com/Theroid00/Art_gallery", type: "github" }
    ]
  },

  compiler: {
    num: "07",
    status: "inactive",
    tag: "07 — Systems Programming",
    title: "Flux Compiler (fluxc)",
    brief: "A custom handwritten recursive-descent compiler and C-target code generator for Flux (Functional Language for Universal eXpressions) featuring pipe desugaring, pattern matching, TAC IR, and interleaved diagnostics.",
    media: {
      type: "svg",
      content: `
<svg class="schematic-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="compilerGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Title -->
  <text x="260" y="32" fill="var(--muted)" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="0.1em">Handwritten Frontend ⇄ C Code Generator ⇄ GCC</text>

  <!-- Source Code Node (Flux Source) -->
  <rect x="20" y="90" width="80" height="100" rx="6" stroke="var(--border)" stroke-width="1.2" fill="rgba(232,136,74,0.02)"/>
  <text x="60" y="110" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle">source.fx</text>
  <text x="30" y="130" fill="var(--accent)" font-family="monospace" font-size="7.5">x |> func</text>
  <text x="30" y="145" fill="var(--muted)" font-family="monospace" font-size="7.5">match y {</text>
  <text x="30" y="160" fill="var(--accent2)" font-family="monospace" font-size="7.5">  _ => print</text>
  <text x="30" y="175" fill="var(--muted)" font-family="monospace" font-size="7.5">}</text>

  <!-- Connection Links -->
  <g stroke="var(--border)" stroke-width="1" opacity="0.3">
    <line x1="100" y1="140" x2="125" y2="140" />
    <line x1="215" y1="140" x2="240" y2="140" />
    <line x1="330" y1="140" x2="355" y2="140" />
    <path d="M 170 175 v 35 h 20" fill="none" />
  </g>

  <!-- Stage 1: Handwritten Frontend -->
  <rect x="125" y="102" width="90" height="76" rx="6" stroke="var(--accent)" stroke-width="1.2" fill="none"/>
  <text x="170" y="120" fill="var(--accent)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Frontend</text>
  <text x="170" y="135" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">lexer.c (custom)</text>
  <text x="170" y="147" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">parser.c (RD)</text>
  <text x="170" y="162" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">AST Tree</text>

  <!-- Stage 2: Code Gen & IR -->
  <rect x="240" y="102" width="90" height="76" rx="6" stroke="var(--accent2)" stroke-width="1.2" fill="none"/>
  <text x="285" y="120" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Code Gen</text>
  <text x="285" y="133" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">desugar.c (Pipe)</text>
  <text x="285" y="145" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">irgen.c (TAC)</text>
  <text x="285" y="160" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle">Generated C</text>

  <!-- Stage 3: GCC Backend -->
  <rect x="355" y="90" width="85" height="100" rx="6" stroke="var(--border)" stroke-width="1.2" fill="rgba(255,255,255,0.01)"/>
  <text x="397" y="110" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">GCC Compiler</text>
  <text x="367" y="130" fill="var(--muted)" font-family="monospace" font-size="7">target.c</text>
  <text x="367" y="145" fill="var(--accent)" font-family="monospace" font-size="7">gcc -O2</text>
  <rect x="365" y="157" width="65" height="22" rx="3" fill="rgba(232,136,74,0.06)" stroke="var(--accent)" stroke-width="0.8" />
  <text x="397" y="171" fill="var(--accent)" font-family="monospace" font-size="8" text-anchor="middle" font-weight="bold">Exec Binary</text>

  <!-- Diagnostics listing file below -->
  <rect x="190" y="205" width="180" height="55" rx="6" stroke="var(--border)" stroke-width="1" fill="rgba(255,0,0,0.02)"/>
  <text x="280" y="218" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle" font-weight="bold">Diagnostics: output.lst</text>
  <text x="200" y="232" fill="var(--muted)" font-family="monospace" font-size="6.5">Line 4 | x = "unmatched type {x}"</text>
  <text x="200" y="244" fill="var(--accent)" font-family="monospace" font-size="6.5">  [ERROR] ^^^ Expected type Int</text>

  <!-- Flow Paths with animated dash -->
  <path d="M 100 140 L 125 140" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M 215 140 L 240 140" fill="none" stroke="var(--accent2)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M 330 140 L 355 140" fill="none" stroke="var(--cream)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M 170 178 L 170 232 L 190 232" fill="none" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3">
    <animate attributeName="stroke-dashoffset" values="6;0" dur="1.5s" repeatCount="indefinite"/>
  </path>

  <!-- Streaming Data Particles -->
  <circle r="3" fill="var(--accent)" filter="url(#compilerGlow)">
    <animateMotion dur="2.4s" repeatCount="indefinite" path="M 100 140 L 125 140 M 215 140 L 240 140 M 330 140 L 355 140" />
  </circle>

  <!-- Status / Telemetry bottom -->
  <text x="280" y="282" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">Pipeline: Scan ➔ Parse ➔ Desugar ➔ TAC IR ➔ Code Gen ➔ GCC</text>
</svg>
      `
    },
    body: `<p>A complete <strong>compiler</strong> for Flux (Functional Language for Universal eXpressions) — a statically-typed language with functional influences. <code>fluxc</code> compiles source code into optimized C target code, which is then natively compiled using GCC into standalone binary executables.</p>
<p>Unlike standard code-generated frontends, the frontend features a custom <strong>hand-written recursive descent parser</strong> (<code>parser.c</code>) and lexical scanner (<code>lexer.c</code>), giving precise control over error diagnostics and AST formatting. Functional paradigms such as the <strong>pipe operator (<code>|&gt;</code>)</strong>, pattern matching (<code>match</code>), and string interpolation are dynamically desugared into structured C control constructs.</p>
<p>The compiler lowers the AST into a linear <strong>Three-Address Code (TAC)</strong> intermediate representation for analysis. When warnings or errors are raised, a dedicated diagnostics module outputs annotated <strong>interleaved listing files (<code>.lst</code>)</strong> highlighting offending line scopes.</p>`,
    tags: ["C", "GCC","Compiler Design"] ,
    links: [
      { l: "GitHub", h: "https://github.com/Theroid00/compiler-design", type: "github" }
    ]
  },

  arrodes: {
    num: "08",
    status: "inactive",
    tag: "08 — API & Automation",
    title: "Arrodes Discord Bot",
    brief: "An wiki-scraping library and Discord integration that queries character data, mystical pathways, and lore from the Lord of the Mysteries universe.",
    media: {
      type: "svg",
      content: `
<svg class="schematic-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="arrodesGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Title -->
  <text x="260" y="32" fill="var(--muted)" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="0.1em">Discord Gateway ⇄ Disnake Bot ⇄ BeautifulSoup4 Wiki Scraper</text>

  <!-- Discord UI Mockup (Left) -->
  <rect x="20" y="90" width="130" height="110" rx="6" stroke="var(--border)" stroke-width="1.2" fill="rgba(255,255,255,0.01)"/>
  <rect x="20" y="90" width="130" height="18" rx="6" fill="rgba(88,101,242,0.1)" stroke="var(--border)" stroke-width="0.8"/>
  <text x="30" y="102" fill="var(--cream)" font-family="sans-serif" font-size="8" font-weight="bold"># general-chat</text>
  <!-- Discord Chat Bubble -->
  <circle cx="35" cy="125" r="7" fill="var(--accent)"/>
  <text x="35" y="128" fill="#fff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">U</text>
  <text x="48" y="123" fill="var(--cream)" font-family="sans-serif" font-size="7" font-weight="bold">User</text>
  <text x="48" y="133" fill="var(--muted)" font-family="monospace" font-size="6.5">/birth Klein Moretti</text>

  <!-- Bot Response -->
  <circle cx="35" cy="155" r="7" fill="var(--accent2)"/>
  <text x="35" y="158" fill="#fff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">A</text>
  <text x="48" y="153" fill="var(--accent2)" font-family="sans-serif" font-size="7" font-weight="bold">Arrodes BOT</text>
  <text x="48" y="163" fill="var(--cream)" font-family="monospace" font-size="6.5">Born: June 15, 1349</text>

  <!-- Connection Links -->
  <g stroke="var(--border)" stroke-width="1" opacity="0.3">
    <path d="M 150 145 H 200" />
    <path d="M 290 145 H 345" />
    <path d="M 405 175 V 205" opacity="0.5"/>
  </g>

  <!-- Stage 1: Disnake Bot Gateway (Middle) -->
  <rect x="200" y="105" width="90" height="75" rx="6" stroke="var(--accent)" stroke-width="1.2" fill="none"/>
  <text x="245" y="123" fill="var(--accent)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Disnake Bot</text>
  <text x="245" y="138" fill="var(--muted)" font-family="monospace" font-size="7.5" text-anchor="middle">cogs/lotm.py</text>
  <text x="245" y="152" fill="var(--cream)" font-family="monospace" font-size="7.5" text-anchor="middle">Slash Commands</text>
  <text x="245" y="165" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">Event Loop</text>

  <!-- Stage 2: Wiki Scraping Engine (Right) -->
  <rect x="340" y="90" width="160" height="110" rx="6" stroke="var(--accent2)" stroke-width="1.2" fill="none"/>
  <text x="420" y="108" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">mystic API Wrapper</text>
  <text x="350" y="128" fill="var(--cream)" font-family="monospace" font-size="7">BeautifulSoup4 Parser</text>
  <text x="350" y="142" fill="var(--muted)" font-family="monospace" font-size="7">Requests HTML Getter</text>
  <text x="350" y="156" fill="var(--muted)" font-family="monospace" font-size="7">Scraping lotm.fandom</text>
  <rect x="350" y="168" width="140" height="22" rx="3" fill="rgba(232,136,74,0.06)" stroke="var(--border)" stroke-width="0.8"/>
  <text x="420" y="182" fill="var(--accent)" font-family="monospace" font-size="7.5" text-anchor="middle">Character / Pathway Object</text>

  <!-- Flow Paths with animated dash -->
  <path d="M 150 145 L 200 145" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M 290 145 L 340 145" fill="none" stroke="var(--accent2)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>

  <!-- Streaming Data Particles -->
  <circle r="3" fill="var(--accent)" filter="url(#arrodesGlow)">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 150 145 L 200 145 M 290 145 L 340 145" />
  </circle>

  <!-- Status / Telemetry bottom -->
  <text x="260" y="250" fill="var(--muted)" font-family="monospace" font-size="9" text-anchor="middle">Wiki Target: https://lordofthemysteries.fandom.com/wiki/</text>
  <text x="260" y="265" fill="var(--cream)" font-family="monospace" font-size="8.5" text-anchor="middle">Payload: JSON Data Mapping ➔ Cache: MEMORY</text>
</svg>
      `
    },
    body: `<p>A Discord bot and automated scraping interface designed for the <em>Lord of the Mysteries</em> web novel fandom. Named after the omniscient magic mirror <strong>Arrodes</strong>, the system serves as a rich, interactive encyclopedia directly integrated within Discord servers.</p>
<p>The system is split into a modular backend scraping library (<code>mystic</code>) and a Discord interface gateway built using the <strong>Disnake</strong> library. The scraping engine utilizes <strong>BeautifulSoup4</strong> and <strong>Requests</strong> to dynamically fetch and parse unstructured fandom wiki markup. It automatically serializes data regarding character origins, pathways, titles, honorifics, mysticism symbols, and relationship trees into clean object models.</p>
<p>Slash commands wired up inside modular <strong>Cogs</strong> (<code>lotm.py</code>) provide quick, low-latency access to the serialized data, transforming raw fandom pages into structured server interactions.</p>`,
    tags: ["Python", "Disnake", "BeautifulSoup4", "Requests", "NLTK", "API Integration"],
    links: [
      { l: "GitHub", h: "https://github.com/Theroid00/Arrodes", type: "github" }
    ]
  },

  genetic_algorithm: {
    num: "09",
    status: "inactive",
    tag: "09 — Machine Learning",
    title: "Genetic Feature Selection & Hyperparameter Optimizer",
    brief: "A machine learning optimization framework utilizing Genetic Algorithms to perform joint feature selection and hyperparameter tuning dynamically across multiple classifiers.",
    media: {
      type: "svg",
      content: `
<svg class="schematic-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="gaGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Title -->
  <text x="260" y="32" fill="var(--muted)" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="0.1em">Joint Chromosome ➔ Generation Loop ➔ 5-Fold CV Accuracy</text>

  <!-- Chromosome Layout (Top) -->
  <g transform="translate(45, 60)">
    <rect x="0" y="0" width="430" height="30" rx="5" stroke="var(--border)" stroke-width="1.2" fill="rgba(255,255,255,0.01)"/>
    <!-- Feature Genes -->
    <rect x="5" y="5" width="230" height="20" rx="3" fill="rgba(232,136,74,0.06)" stroke="var(--accent)" stroke-width="0.8"/>
    <text x="120" y="18" fill="var(--accent)" font-family="monospace" font-size="8" text-anchor="middle">Feature Selection Bits [1, 0, 1, 1, 0...]</text>
    <!-- Hyperparameter Genes -->
    <rect x="240" y="5" width="185" height="20" rx="3" fill="rgba(255,255,255,0.02)" stroke="var(--accent2)" stroke-width="0.8"/>
    <text x="332" y="18" fill="var(--accent2)" font-family="monospace" font-size="8" text-anchor="middle">Hyperparam Gene Indices [2, 0, 1]</text>
  </g>

  <!-- Flow Diagrams (Bottom) -->
  <!-- Population Node -->
  <rect x="35" y="130" width="90" height="60" rx="6" stroke="var(--border)" stroke-width="1.2" fill="rgba(255,255,255,0.01)"/>
  <text x="80" y="152" fill="var(--cream)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Population</text>
  <text x="80" y="167" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">20 Chromosomes</text>

  <!-- Evaluator Node -->
  <rect x="185" y="130" width="105" height="60" rx="6" stroke="var(--accent)" stroke-width="1.2" fill="none"/>
  <text x="237" y="150" fill="var(--accent)" font-family="monospace" font-size="9.5" text-anchor="middle" font-weight="bold">Fitness (CV)</text>
  <text x="237" y="163" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">0.99*Acc + 0.01*Red</text>
  <text x="237" y="175" fill="var(--cream)" font-family="monospace" font-size="7" text-anchor="middle">5-Fold Classifier</text>

  <!-- Selection / Breeding -->
  <rect x="350" y="130" width="135" height="60" rx="6" stroke="var(--accent2)" stroke-width="1.2" fill="none"/>
  <text x="417" y="150" fill="var(--accent2)" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">Breeding</text>
  <text x="417" y="163" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">2-Point Crossover</text>
  <text x="417" y="175" fill="var(--muted)" font-family="monospace" font-size="7" text-anchor="middle">Uniform Mutation (5%)</text>

  <!-- Loop Connections -->
  <g stroke="var(--border)" stroke-width="1" opacity="0.3" fill="none">
    <path d="M 125 160 H 185" />
    <path d="M 290 160 H 350" />
    <path d="M 417 130 V 110 H 80 V 130" />
  </g>

  <!-- Flow Paths with animated dash -->
  <path d="M 125 160 H 185" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M 290 160 H 350" fill="none" stroke="var(--accent2)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M 417 130 V 110 H 80 V 130" fill="none" stroke="var(--cream)" stroke-width="1.2" stroke-dasharray="4 4">
    <animate attributeName="stroke-dashoffset" values="8;0" dur="1.8s" repeatCount="indefinite"/>
  </path>

  <!-- Fitness progress sparkline at bottom -->
  <rect x="150" y="215" width="220" height="40" rx="5" stroke="var(--border)" stroke-width="1" fill="rgba(255,255,255,0.01)"/>
  <text x="260" y="228" fill="var(--cream)" font-family="monospace" font-size="8" text-anchor="middle" font-weight="bold">Fitness History (10 Generations)</text>
  <path d="M 170 248 L 190 247 L 210 245 L 230 242 L 250 238 L 270 237 L 290 235 L 310 234 L 330 233 L 350 233" fill="none" stroke="var(--accent)" stroke-width="1.5" />
  <circle cx="350" cy="233" r="2.5" fill="var(--accent)" filter="url(#gaGlow)" />

  <text x="260" y="280" fill="var(--muted)" font-family="monospace" font-size="8.5" text-anchor="middle">Optimized: KNN / SVM / RF Accuracies + Feature Subsets</text>
</svg>
      `
    },
    body: `<p>A machine learning utility framework implementing a <strong>Genetic Algorithm</strong> for joint hyperparameter optimization and feature selection across multiple classifier architectures (K-Nearest Neighbors, Support Vector Machines, and Random Forests).</p>
<p>The framework achieves substantial optimization gains by co-optimizing feature sets and model hyperparameters. Below are the empirical benchmark results comparing the <strong>Baseline</strong> (Scikit-Learn defaults using all features) vs. the <strong>GA-Optimized</strong> pipeline across standard benchmark datasets:</p>

<table style="width:100%; border-collapse:collapse; margin:1.2rem 0; font-size:0.8rem; font-family:monospace; border:1.2px solid var(--border)">
  <thead>
    <tr style="border-bottom:1.2px solid var(--border); background:rgba(232,136,74,0.04)">
      <th style="padding:0.5rem; text-align:left; color:var(--cream)">Dataset</th>
      <th style="padding:0.5rem; text-align:left; color:var(--cream)">Classifier</th>
      <th style="padding:0.5rem; text-align:right; color:var(--cream)">Baseline Acc</th>
      <th style="padding:0.5rem; text-align:right; color:var(--cream)">GA Acc</th>
      <th style="padding:0.5rem; text-align:right; color:var(--accent)">Delta</th>
      <th style="padding:0.5rem; text-align:right; color:var(--accent2)">Features Dropped</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:0.5rem; color:var(--cream)">Breast Cancer</td>
      <td style="padding:0.5rem; color:var(--muted)">KNN</td>
      <td style="padding:0.5rem; text-align:right; color:var(--muted)">0.965</td>
      <td style="padding:0.5rem; text-align:right; color:var(--cream)">0.981</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent)">+1.6%</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent2)">↓19 features</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:0.5rem; color:var(--cream)">Breast Cancer</td>
      <td style="padding:0.5rem; color:var(--muted)">SVM</td>
      <td style="padding:0.5rem; text-align:right; color:var(--muted)">0.974</td>
      <td style="padding:0.5rem; text-align:right; color:var(--cream)">0.986</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent)">+1.2%</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent2)">↓15 features</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:0.5rem; color:var(--cream)">Breast Cancer</td>
      <td style="padding:0.5rem; color:var(--muted)">RF</td>
      <td style="padding:0.5rem; text-align:right; color:var(--muted)">0.956</td>
      <td style="padding:0.5rem; text-align:right; color:var(--cream)">0.972</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent)">+1.6%</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent2)">↓18 features</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:0.5rem; color:var(--cream)">Ionosphere</td>
      <td style="padding:0.5rem; color:var(--muted)">KNN</td>
      <td style="padding:0.5rem; text-align:right; color:var(--muted)">0.849</td>
      <td style="padding:0.5rem; text-align:right; color:var(--cream)">0.940</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent)">+9.1%</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent2)">↓22 features</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:0.5rem; color:var(--cream)">Ionosphere</td>
      <td style="padding:0.5rem; color:var(--muted)">SVM</td>
      <td style="padding:0.5rem; text-align:right; color:var(--muted)">0.951</td>
      <td style="padding:0.5rem; text-align:right; color:var(--cream)">0.969</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent)">+1.8%</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent2)">↓13 features</td>
    </tr>
    <tr style="border-bottom:1.2px solid var(--border)">
      <td style="padding:0.5rem; color:var(--cream)">Ionosphere</td>
      <td style="padding:0.5rem; color:var(--muted)">RF</td>
      <td style="padding:0.5rem; text-align:right; color:var(--muted)">0.940</td>
      <td style="padding:0.5rem; text-align:right; color:var(--cream)">0.951</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent)">+1.1%</td>
      <td style="padding:0.5rem; text-align:right; color:var(--accent2)">↓20 features</td>
    </tr>
  </tbody>
</table>

<p>The optimization pipeline evaluates candidates and logs performance using the following primary metrics:</p>
<ul>
  <li><strong>5-Fold Cross-Validation Accuracy (Baseline vs. Optimized)</strong>: Directly compares the default Scikit-Learn classifier configuration on the raw feature space against the GA-optimized model.</li>
  <li><strong>Feature Reduction Ratio</strong>: Quantifies dimensionality reduction efficiency (columns dropped vs. columns kept). The fitness function uses this as a tie-breaker: <code>Fitness = 0.99 × Accuracy + 0.01 × (1 - Selected_Features / Total_Features)</code>.</li>
  <li><strong>Fitness Convergence Telemetry</strong>: Tracks fitness histories over generations to evaluate optimization trajectories.</li>
</ul>
<p>The framework also includes a robust, automated dataset ingestion pipeline that handles dynamic CSV/TSV separators, header parsing, stratified scaling, and target mapping natively.</p>`,
    tags: ["Python", "Numpy", "Pandas", "Scikit-Learn"],
    links: [
      { l: "GitHub", h: "https://github.com/Theroid00/Genetic_Algorithm", type: "github" }
    ]
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
