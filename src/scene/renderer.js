const ctx = globalThis.__TF__ || { scene: null };

export function initThree() {
  ctx.scene = ctx.scene || { ready: true };
  return ctx.scene;
}

export function renderScene(members, hardware) {
  ctx.members = Array.isArray(members) ? members : [];
  ctx.hardware = Array.isArray(hardware) ? hardware : [];
  return { members: ctx.members, hardware: ctx.hardware };
}
