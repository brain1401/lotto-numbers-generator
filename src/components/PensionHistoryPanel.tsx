import { useState } from 'react';
import { GAME_LABELS } from '../utils/lotto';
import type { PensionEntry } from '../types';
import PensionTicket from './PensionTicket';

interface PensionHistoryPanelProps {
  history: PensionEntry[];
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function PensionHistoryPanel({
  history,
  onDeleteEntry,
  onClearAll,
}: PensionHistoryPanelProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ds-ink">생성 기록</h2>
        <div className="flex gap-2">
          {history.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-ds-destructive hover:bg-ds-destructive-tint px-2 py-1 rounded-md transition-colors duration-150 focus-visible-ring"
            >
              전체 삭제
            </button>
          )}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-ds-muted hover:text-ds-ink px-2 py-1 rounded-md hover:bg-ds-surface-raised transition-colors duration-150 focus-visible-ring"
          >
            {expanded ? '접기' : '펼치기'}
          </button>
        </div>
      </div>

      <div hidden={!expanded}>
        {history.length === 0 ? (
          <p className="text-sm text-ds-muted py-10 text-center">
            번호를 생성하면 여기에 기록됩니다
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="bg-ds-surface rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ds-muted tabular-nums">
                    {formatDate(entry.timestamp)}
                  </span>
                  <button
                    aria-label="이 기록 삭제"
                    onClick={() => onDeleteEntry(entry.id)}
                    className="text-xs text-ds-muted hover:text-ds-destructive transition-colors duration-150 px-1 rounded focus-visible-ring"
                  >
                    삭제
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {entry.games.map((game, i) => (
                    <PensionTicket
                      key={i}
                      group={game.group}
                      digits={game.digits}
                      label={`게임 ${GAME_LABELS[i]}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
