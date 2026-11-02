globalThis.__TF__ = {
  state: null,
  members: [],
  hardware: [],
  scene: null
};

export const app = globalThis.__TF__;

import { DEFAULT_STATE } from './state/defaultState.js';
import { loadState, persistState } from './state/storage.js';
import { normalizeState, validateState } from './state/validateState.js';
import { migrateLegacyJoinery, migrateLegacyWalls } from './state/migrations.js';
import { buildWall } from './geometry/wallBuilder.js';
import { buildRoof } from './geometry/roofBuilder.js';
import { renderCut } from './cutlist/cutlist.js';
import { initThree, renderScene } from './scene/renderer.js';
import { bindControls } from './ui/controls.js';
import { renderWallPanels, renderRoofPanels } from './ui/wallPanel.js';
import { renderChangelog } from './changelog/changelog.js';

export function regen() {
  const ctx = globalThis.__TF__;
  ctx.members = [];
  ctx.hardware = [];

  buildWall();
  buildRoof();

  renderCut(ctx.members);
  renderScene(ctx.members, ctx.hardware);
  persistState(ctx.state);
}

export function initApp() {
  const ctx = globalThis.__TF__;

  let state = loadState();
  if (!state || !state.wall || !Array.isArray(state.wall.walls)) {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  state = normalizeState(state);
  migrateLegacyJoinery(state);
  migrateLegacyWalls(state);
  validateState(state);

  ctx.state = state;

  bindControls();
  renderWallPanels(state);
  renderRoofPanels(state);
  renderChangelog();

  initThree();
  regen();
}

if (typeof window !== 'undefined') {
  window.__TF__ = globalThis.__TF__;
  window.TimberFramerApp = { app, initApp, regen };
}
