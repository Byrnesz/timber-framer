const ctx = globalThis.__TF__ || { members: [], hardware: [] };

export function buildRoof() {
  ctx.members = Array.isArray(ctx.members) ? ctx.members : [];

  // Roof logic remains in the original file until the geometry refactor is complete.
  return ctx.members;
}
