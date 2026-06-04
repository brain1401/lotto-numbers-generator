interface GameCountSelectorProps {
  count: number;
  onChange: (count: number) => void;
}

export default function GameCountSelector({ count, onChange }: GameCountSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-ds-muted">게임 수</span>
      <div className="flex items-center gap-3">
        <button
          aria-label="게임 수 감소"
          onClick={() => onChange(count - 1)}
          disabled={count <= 1}
          className="w-8 h-8 rounded-full border border-ds-border text-ds-ink font-bold hover:bg-ds-surface-raised hover:border-[oklch(0.30_0.000_0)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 focus-visible-ring flex items-center justify-center"
        >
          -
        </button>
        <span className="w-6 text-center text-lg font-semibold text-ds-ink tabular-nums">
          {count}
        </span>
        <button
          aria-label="게임 수 증가"
          onClick={() => onChange(count + 1)}
          disabled={count >= 10}
          className="w-8 h-8 rounded-full border border-ds-border text-ds-ink font-bold hover:bg-ds-surface-raised hover:border-[oklch(0.30_0.000_0)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 focus-visible-ring flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
