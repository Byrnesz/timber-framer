# Timber Framer refactor branch

This branch keeps the original single-file app intact and adds a safe, incremental refactor scaffold.

## Purpose

The goal is to preserve the working codebase while creating a migration path toward a modular architecture.

## Current branch status

- Original `index.html` remains untouched in the main app branch worktree.
- This branch introduces modular files under `src/` as a safe extraction scaffold.
- The app is not yet wired to load these modules from the browser, so this branch is intentionally non-breaking.

## Planned extraction order

1. state/defaultState.js
2. state/storage.js
3. state/validateState.js
4. state/migrations.js
5. lumber/sizes.js
6. lumber/colors.js
7. lumber/stock.js
8. geometry/wallBuilder.js
9. geometry/roofBuilder.js
10. cutlist/cutlist.js
11. scene/renderer.js
12. ui/controls.js
13. presets/presets.js
14. changelog/changelog.js

## Notes

The first pass keeps the runtime safe and isolated. Once the application is stable, the browser shell can point to the new modular runtime in `src/app.js` without disrupting the current user-facing behavior.
