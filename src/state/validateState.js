import { DEFAULT_STATE } from './defaultState.js';

export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function deepMerge(target, source) {
  const out = deepClone(target);
  if (!source || typeof source !== 'object') return out;

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = out[key];

    if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) &&
        targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
      out[key] = deepMerge(targetValue, sourceValue);
    } else {
      out[key] = deepClone(sourceValue);
    }
  });

  return out;
}

export function clampNumber(value, fallback, min, max) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

export function normalizeWallOpenings(openings) {
  if (!Array.isArray(openings)) return [];

  return openings
    .map((opening) => {
      if (!opening || typeof opening !== 'object') return null;

      const kind = opening.kind === 'window' ? 'window' : 'door';

      return {
        kind,
        x: clampNumber(opening.x, 0, 9999, 0),
        w: clampNumber(opening.w, 36, 240, 6),
        h: clampNumber(opening.h, 24, 240, 6),
        sill: clampNumber(opening.sill ?? 30, 0, 120, 0),
        header: opening.header || '2x6',
        bearing: opening.bearing !== false
      };
    })
    .filter(Boolean);
}

export function normalizeWallTree(walls) {
  if (!Array.isArray(walls) || !walls.length) {
    return [{ len: 144, from: -1, at: 'end', dir: 'straight', corner: '3stud', openings: [] }];
  }

  return walls.map((wall, i) => {
    const item = wall && typeof wall === 'object' ? wall : {};
    const len = clampNumber(item.len, 96, 600, 12);

    let from = Number(item.from);
    if (!Number.isFinite(from)) from = i === 0 ? -1 : 0;

    return {
      len,
      from: Number.isFinite(from) ? from : -1,
      at: item.at === 'start' || item.at === 'end' || item.at === 'mid' ? item.at : 'end',
      dir: item.dir === 'left' || item.dir === 'right' || item.dir === 'straight' ? item.dir : 'straight',
      corner: item.corner || '3stud',
      openings: normalizeWallOpenings(item.openings)
    };
  });
}

export function normalizeRoof(roof) {
  const fallback = {
    enabled: false,
    type: 'gable',
    pitch: 6,
    overhang: 12,
    rafterSize: '2x6',
    rafterOC: 16,
    shedFlip: false,
    shedShape: 'outline'
  };

  if (!roof || typeof roof !== 'object') return fallback;

  return {
    ...fallback,
    ...roof,
    enabled: !!roof.enabled,
    type: roof.type === 'shed' ? 'shed' : 'gable',
    pitch: clampNumber(roof.pitch, 6, 24, 0),
    overhang: clampNumber(roof.overhang, 0, 36, 0),
    rafterSize: roof.rafterSize || '2x6',
    rafterOC: clampNumber(roof.rafterOC, 8, 24, 8),
    shedFlip: !!roof.shedFlip,
    shedShape: roof.shedShape === 'bbox' ? 'bbox' : 'outline'
  };
}

export function normalizeState(rawState) {
  const base = deepClone(DEFAULT_STATE);
  const merged = deepMerge(base, rawState || {});
  const wall = merged.wall && typeof merged.wall === 'object' ? merged.wall : {};

  merged.mode = 'wall';
  merged.oc = clampNumber(merged.oc, 8, 24, 8);

  merged.wall = {
    height: clampNumber(wall.height, 48, 240, 24),
    oc: clampNumber(wall.oc, 8, 24, 8),
    size: ['2x4', '2x6'].includes(wall.size) ? wall.size : '2x4',
    walls: normalizeWallTree(wall.walls),
    roof: normalizeRoof(wall.roof)
  };

  return merged;
}

export function validateState(state) {
  if (!state || !state.wall || !Array.isArray(state.wall.walls)) {
    throw new Error('Invalid state: missing wall array');
  }
}
