import { DEFAULT_STATE } from './defaultState.js';
import { normalizeState } from './validateState.js';

const STORAGE_KEY = 'timberframer.v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    console.warn('Saved state invalid; using default state.', error);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Could not save state.', error);
  }
}
