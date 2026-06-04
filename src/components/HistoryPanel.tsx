import { useState } from 'react'
import type { LottoEntry } from '../types'
import { GAME_LABELS } from '../utils/lotto'
import LottoTicket from './LottoTicket'

interface HistoryPanelProps {
  history: LottoEntry[]
  onDeleteEntry: (id: string) => void
  onClearAll: () => void
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function HistoryPanel({ history, onDeleteEntry, onClearAll }: HistoryPanelProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">생성 기록</h2>
        <div className="flex gap-2">
          {history.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              전체 삭제
            </button>
          )}
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            {expanded ? '접기' : '펼치기'}
          </button>
        </div>
      </div>

      <div hidden={!expanded}>
        {history.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">기록이 없습니다</p>
        ) : (
          <div className="space-y-4">
            {history.map(entry => (
              <div key={entry.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{formatDate(entry.timestamp)}</span>
                  <button
                    aria-label="삭제"
                    onClick={() => onDeleteEntry(entry.id)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors px-1"
                  >
                    삭제
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {entry.games.map((nums, i) => (
                    <LottoTicket key={i} numbers={nums} label={`게임 ${GAME_LABELS[i]}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
