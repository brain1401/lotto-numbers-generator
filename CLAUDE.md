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
npm run bias         # 10M-trial Monte Carlo bias check (scripts/bias-check.ts, requires bun)
```

## Architecture

Single-page React 19 + Vite SPA with two tabbed features — Lotto 6/45 and Pension lottery (연금복권 720+). No routing (tab switching via `useState`), no external state management.

### State & Data

**State flow**: `App.tsx` owns all root state — `activeTab` (`'lotto' | 'pension'`, drives which panels render) plus a parallel pair per feature: `currentGames` + `useHistory` (lotto) and `currentPensionGames` + `usePensionHistory` (pension). Each `*GeneratorPanel` calls `onGenerate` after generating; `App` updates the current-games state and the matching `addEntry` together, keeping the returned id as `currentEntryId` / `currentPensionEntryId`. The entry with that id is filtered out before the list reaches the `*HistoryPanel`, so the just-generated games appear only in the generator section (`justSaved` tells the panel it exists). The id is session-only — after a reload nothing is excluded.

**`useHistory` / `usePensionHistory` hooks** (`src/hooks/`): near-identical history stores. Each persists up to 50 entries to localStorage (keys `lotto-history` / `pension-history`), lazy-initializes from `loadFromStorage`, silently ignores QuotaExceededError on writes, and exposes `{ history, addEntry, deleteEntry, clearAll }`. `addEntry` returns the new entry's id.

**Core types** (`src/types.ts`): `LottoEntry { id; timestamp; games: number[][] }` — `games` is an array of 6-number arrays, one per game. `PensionGame { group: number /* 1–5 */; digits: string /* zero-padded 6 digits */ }` and `PensionEntry { id; timestamp; games: PensionGame[] }` mirror this for pension.

### Number Generation

**`random.ts`** (`src/utils/random.ts`): the bias-free primitives. `getUnbiasedRandom(max)` uses `crypto.getRandomValues` with rejection sampling — retries until the value is below the largest multiple of `max` that fits a `Uint32`, eliminating modulo bias. `unbiasedShuffle(arr, rng?)` is an in-place Fisher-Yates shuffle; `rng` is injectable for deterministic tests and defaults to `getUnbiasedRandom`.

**`lotto.ts`** (`src/utils/lotto.ts`): `generateLottoNumbers()` shuffles a 1–45 pool with `unbiasedShuffle`, takes 6, returns them sorted ascending.

**`pension.ts`** (`src/utils/pension.ts`): `generatePensionNumber()` returns `{ group: 1–5, digits: 6-digit zero-padded string }` via `getUnbiasedRandom`.

**`GAME_LABELS`** (in `lotto.ts`): `['A', 'B', ..., 'J']` constant shared by both lotto and pension panels to label each game slot.

### Components

**`Header`**: renders the title and the tab nav (`TabType = 'lotto' | 'pension'`); `App` owns `activeTab` and conditionally renders the matching generator + history panels.

**Pension components** (`PensionGeneratorPanel`, `PensionTicket`, `PensionHistoryPanel`): mirror the lotto components for the pension ticket format (group + 6-digit number).

**`HistoryDisclosure`**: shared wrapper for both history panels. History is collapsed by default and only opens on user action — a "기록에 저장됨" notice plus an "이전 기록 N개" trigger (shadcn `Collapsible`) sit right below the generated results; "전체 삭제" shows only while open. Renders nothing when there is no previous history and nothing was just saved.

**`FairnessNotice`**: one-line "every combination is equally likely" claim at the top of `main`, with a collapsed "어떻게 뽑나요?" disclosure explaining the generation method, the bias check, and that odds are not improved. Copy is per lottery (`lottery: TabType`); the trial count and test names it cites must stay in sync with `scripts/bias-check.ts`.

**`GameCountSelector`**: constrains game count to 1–10 (enforced via `disabled` props on ± buttons); shared by both lotto and pension panels.

**`generationKey`** (in each `*GeneratorPanel`): incremented on each generate call and used as part of the ticket `key` prop — forces React to remount tickets so the entrance animation replays.

### Design System

**Tailwind v4, CSS-first**: no `tailwind.config.js` / PostCSS config — Tailwind runs through `@tailwindcss/vite`, and all theme config lives in `src/index.css`.

**CSS variables**: the oklch Midnight palette is defined once as `--ds-*` in `:root` (`src/index.css`) and exposed as `ds-*` utilities via `@theme inline` (e.g. `bg-ds-surface`, `text-ds-ink`). The app is dark-only (`class="dark"` on `<html>`, no light theme). Font is Pretendard Variable (`--font-sans`).

**shadcn/ui**: `components.json` uses the `base-nova` style (Base UI primitives); generated components live in `src/components/ui/` and are imported via the `@/` alias (`@/*` → `src/*` in tsconfig `paths` + Vite `resolve.alias`). shadcn's semantic tokens (`--background`, `--primary`, `--border`, …) all point at `--ds-*`, so components pick up the palette. `shadcn init` injects a Geist font, a light `:root` theme and `--radius-*` overrides — these were removed on purpose; strip them again if the CLI re-adds them. `ui/button.tsx` was edited to use `focus-visible-ring` instead of `ring-*`; re-apply after re-adding it with `--overwrite`.

**Ball colors**: fixed by number range — 1-10 yellow, 11-20 blue, 21-30 red, 31-40 gray, 41-45 green. Implemented via `getBallClass` in `NumberBall.tsx` and `.ball-*` classes in `index.css`.

**Ball animation**: `ball-enter` keyframe with per-ball delay stagger via `.ball-animate:nth-child(n)` in `index.css`. Respects `prefers-reduced-motion`. Only applied when `animate` prop is passed to `LottoTicket`.

**`focus-visible-ring`**: custom `@utility` in `index.css` that applies a 2px `--ds-focus` ring (light cobalt, lighter than `--ds-primary` so it stays visible on the cobalt button; shadcn's `--ring` points at it too) on `:focus-visible`. Used on all interactive buttons; do not replace with Tailwind `ring-*`.

**`ticket-grid`**: `@utility` in `index.css` used by all four ticket grids (generator + history, both lotteries). Column count comes from a 19.5rem minimum column — six 40px balls + gaps + ticket padding — instead of viewport breakpoints, so balls never wrap and pension digits never overflow. Recompute the minimum if ball size, ball gap, or ticket padding changes.

### Testing

**`src/__tests__/`** splits components from hooks/utils. Vitest globals enabled, jsdom environment. `@testing-library/jest-dom` imported in `src/test-setup.ts`. Vitest is configured inside `vite.config.ts` (no separate vitest config file).
