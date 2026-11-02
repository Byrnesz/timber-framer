export function migrateLegacyJoinery(state) {
  if (!['pin', 'bracket', 'lap'].includes(state.joinery)) {
    state.joinery = 'pin';
  }
}

export function migrateLegacyWalls(state) {
  const walls = state.wall && Array.isArray(state.wall.walls) ? state.wall.walls : [];
  if (!walls.length) return;

  const needsMigration = walls.some((w) => w && w.from === undefined && w.turn !== undefined);
  if (!needsMigration) return;

  walls.forEach((wall, i) => {
    if (!wall || typeof wall !== 'object') return;
    if (wall.from !== undefined) return;

    if (i === 0) {
      wall.from = -1;
      wall.at = 'end';
      wall.dir = 'straight';
    } else {
      const previousTurn = walls[i - 1] && walls[i - 1].turn;
      wall.from = i - 1;
      wall.at = 'end';
      wall.dir = (previousTurn === 'left' || previousTurn === 'right') ? previousTurn : 'straight';
    }

    delete wall.turn;
  });
}
