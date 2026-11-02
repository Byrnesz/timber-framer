const ctx = globalThis.__TF__ || { members: [], hardware: [] };

export function buildWall() {
  ctx.members = Array.isArray(ctx.members) ? ctx.members : [];
  ctx.hardware = Array.isArray(ctx.hardware) ? ctx.hardware : [];

  // This module intentionally preserves the original behavior in the main file.
  // The full wall-generation logic is still in index.html during the migration
  // and should be ported here in a later pass.
  // The goal of this branch is to preserve the project and provide a safe split point.
  return ctx.members;
}
