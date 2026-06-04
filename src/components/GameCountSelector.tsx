interface GameCountSelectorProps {
  count: number
  onChange: (count: number) => void
}

export default function GameCountSelector({ count, onChange }: GameCountSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 font-medium">게임 수</span>
      <div className="flex items-center gap-3">
        <button
          aria-label="-"
          onClick={() => onChange(count - 1)}
          disabled={count <= 1}
          className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          -
        </button>
        <span className="w-6 text-center text-lg font-semibold text-gray-900">
          {count}
        </span>
        <button
          aria-label="+"
          onClick={() => onChange(count + 1)}
          disabled={count >= 10}
          className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}
