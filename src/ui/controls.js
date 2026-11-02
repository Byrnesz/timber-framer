const ctx = globalThis.__TF__ || { state: null };

export function bindControls() {
  return ctx.state;
}
