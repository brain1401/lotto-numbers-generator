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

Single-page React 19 + Vite SPA with two tabbed features — Lotto 6/45 and Pension lottery (연금복권 720+). No routing (tab switching via `useState`), no external state management.

### State & Data

**State flow**: `App.tsx` owns all root state — `activeTab` (`'lotto' | 'pension'`, drives which panels render) plus a parallel pair per feature: `currentGames` + `useHistory` (lotto) and `currentPensionGames` + `usePensionHistory` (pension). Each `*GeneratorPanel` calls `onGenerate` after generating; `App` updates the current-games state and the matching `addEntry` together.

**`useHistory` / `usePensionHistory` hooks** (`src/hooks/`): near-identical history stores. Each persists up to 50 entries to localStorage (keys `lotto-history` / `pension-history`), lazy-initializes from `loadFromStorage`, silently ignores QuotaExceededError on writes, and exposes `{ history, addEntry, deleteEntry, clearAll }`.

**Core types** (`src/types.ts`): `LottoEntry { id; timestamp; games: number[][] }` — `games` is an array of 6-number arrays, one per game. `PensionGame { group: number /* 1–5 */; digits: string /* zero-padded 6 digits */ }` and `PensionEntry { id; timestamp; games: PensionGame[] }` mirror this for pension.

### Number Generation

**`random.ts`** (`src/utils/random.ts`): the bias-free primitives. `getUnbiasedRandom(max)` uses `crypto.getRandomValues` with rejection sampling — retries until the value is below the largest multiple of `max` that fits a `Uint32`, eliminating modulo bias. `unbiasedShuffle(arr, rng?)` is an in-place Fisher-Yates shuffle; `rng` is injectable for deterministic tests and defaults to `getUnbiasedRandom`.

**`lotto.ts`** (`src/utils/lotto.ts`): `generateLottoNumbers()` shuffles a 1–45 pool with `unbiasedShuffle`, takes 6, returns them sorted ascending.

**`pension.ts`** (`src/utils/pension.ts`): `generatePensionNumber()` returns `{ group: 1–5, digits: 6-digit zero-padded string }` via `getUnbiasedRandom`.

**`GAME_LABELS`** (in `lotto.ts`): `['A', 'B', ..., 'J']` constant shared by both lotto and pension panels to label each game slot.

### Components

**`Header`**: renders the title and the tab nav (`TabType = 'lotto' | 'pension'`); `App` owns `activeTab` and conditionally renders the matching generator + history panels.

**Pension components** (`PensionGeneratorPanel`, `PensionTicket`, `PensionHistoryPanel`): mirror the lotto components for the pension ticket format (group + 6-digit number).

**`GameCountSelector`**: constrains game count to 1–10 (enforced via `disabled` props on ± buttons); shared by both lotto and pension panels.

**`generationKey`** (in each `*GeneratorPanel`): incremented on each generate call and used as part of the ticket `key` prop — forces React to remount tickets so the entrance animation replays.

### Design System

**CSS variables**: oklch-based `--color-*` tokens defined in `src/index.css`, mapped to Tailwind as `ds-*` prefix in `tailwind.config.js` (e.g. `bg-ds-surface`, `text-ds-ink`). Font is Pretendard Variable.

**Ball colors**: fixed by number range — 1-10 yellow, 11-20 blue, 21-30 red, 31-40 gray, 41-45 green. Implemented via `getBallClass` in `NumberBall.tsx` and `.ball-*` classes in `index.css`.

**Ball animation**: `ball-enter` keyframe with per-ball delay stagger via `.ball-animate:nth-child(n)` in `index.css`. Respects `prefers-reduced-motion`. Only applied when `animate` prop is passed to `LottoTicket`.

**`focus-visible-ring`**: custom `@layer utilities` class in `index.css` that applies a 2px oklch blue ring on `:focus-visible`. Used on all interactive buttons; do not replace with Tailwind `ring-*`.

### Testing

**`src/__tests__/`** splits components from hooks/utils. Vitest globals enabled, jsdom environment. `@testing-library/jest-dom` imported in `src/test-setup.ts`. Vitest is configured inside `vite.config.ts` (no separate vitest config file).
