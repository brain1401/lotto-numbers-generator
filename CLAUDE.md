# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server
npm run build        # tsc + Vite bundle
npm run preview      # preview production build locally
npm run lint         # ESLint
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
npm test             # Vitest watch mode
npm test -- --run    # single run
npm test -- src/__tests__/utils/lotto.test.ts  # single file
npm run bias         # 1M-trial Monte Carlo bias check (scripts/bias-check.ts, requires bun)
```

## Architecture

Single-page React 19 + Vite SPA. No routing, no external state management.

### State & Data

**State flow**: `App.tsx` owns root state — `currentGames` (latest generated numbers) and the `useHistory` hook (history list). `GeneratorPanel` calls `onGenerate` after generating; `App` updates both state and `useHistory.addEntry` together.

**`useHistory` hook** (`src/hooks/useHistory.ts`): persists up to 50 `LottoEntry` records to localStorage under key `lotto-history`. Lazy-initializes from `loadFromStorage`; silently ignores QuotaExceededError on writes.

**Core type** (`src/types.ts`): `LottoEntry { id: string; timestamp: number; games: number[][] }` — `games` is an array of 6-number arrays, one per game.

### Number Generation

**`lotto.ts`** (`src/utils/lotto.ts`): bias-free Fisher-Yates shuffle using `crypto.getRandomValues`. `getUnbiasedRandom` retries until the value is below the rejection threshold to eliminate modulo bias.

**`GAME_LABELS`**: `['A', 'B', ..., 'J']` constant shared by `GeneratorPanel` and `HistoryPanel` to label each game slot.

### Components

**`GameCountSelector`**: constrains game count to 1–10 (enforced via `disabled` props on ± buttons).

**`generationKey` in `GeneratorPanel`**: incremented on each generate call and used as part of the `LottoTicket` `key` prop — forces React to remount tickets so the ball entrance animation replays.

### Design System

**CSS variables**: oklch-based `--color-*` tokens defined in `src/index.css`, mapped to Tailwind as `ds-*` prefix in `tailwind.config.js` (e.g. `bg-ds-surface`, `text-ds-ink`). Font is Pretendard Variable.

**Ball colors**: fixed by number range — 1-10 yellow, 11-20 blue, 21-30 red, 31-40 gray, 41-45 green. Implemented via `getBallClass` in `NumberBall.tsx` and `.ball-*` classes in `index.css`.

**Ball animation**: `ball-enter` keyframe with per-ball delay stagger via `.ball-animate:nth-child(n)` in `index.css`. Respects `prefers-reduced-motion`. Only applied when `animate` prop is passed to `LottoTicket`.

**`focus-visible-ring`**: custom `@layer utilities` class in `index.css` that applies a 2px oklch blue ring on `:focus-visible`. Used on all interactive buttons; do not replace with Tailwind `ring-*`.

### Testing

**`src/__tests__/`** splits components from hooks/utils. Vitest globals enabled, jsdom environment. `@testing-library/jest-dom` imported in `src/test-setup.ts`. Vitest is configured inside `vite.config.ts` (no separate vitest config file).
