/* ═══════════════════════════════════════════════════════════
   MAIN — entry point. Imports all modules and initialises
   everything in the correct order:
     1. Render data into DOM  (stats, skills, projects, contact)
     2. Wire up modal         (needs .proj-card in DOM)
     3. Wire up observers     (needs .proj-card + .reveal in DOM)
     4. Start canvas          (independent, runs last)
     5. Init nav              (independent)
═══════════════════════════════════════════════════════════ */

import {
  renderStats,
  renderSkills,
  renderProjects,
  renderContactLinks,
  setupDynamicCopyright
} from './render.js';

import { initModal }     from './modal.js';
import { initCanvas }    from './canvas.js';
import { initObservers } from './observers.js';
import { initNav }       from './nav.js';
import { initTerminal }  from './terminal.js';

// 1. Populate DOM with data
renderStats();
renderSkills();
renderProjects();
renderContactLinks();
setupDynamicCopyright();

// 2. Wire interactions (depend on rendered DOM)
initModal();      // needs .proj-card elements
initObservers();  // needs .proj-card + .reveal + .stagger elements

// 3. Independent systems
initCanvas();
initNav();
initTerminal();
