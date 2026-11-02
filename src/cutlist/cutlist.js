const ctx = globalThis.__TF__ || { members: [], hardware: [] };

export function ftin(v) {
  return v;
}

export function cutRows(members) {
  return Array.isArray(members) ? members : [];
}

export function renderCut(members) {
  ctx.members = Array.isArray(members) ? members : [];
  return ctx.members;
}
