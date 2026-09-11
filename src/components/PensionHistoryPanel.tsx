import { GAME_LABELS } from '../utils/lotto';
import type { PensionEntry } from '../types';
import HistoryDisclosure from './HistoryDisclosure';
import PensionTicket from './PensionTicket';

interface PensionHistoryPanelProps {
  /** 현재 결과를 제외한 이전 기록 */
  history: PensionEntry[];
  justSaved: boolean;
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
  justSaved,
  onDeleteEntry,
  onClearAll,
}: PensionHistoryPanelProps) {
  return (
    <HistoryDisclosure count={history.length} justSaved={justSaved} onClearAll={onClearAll}>
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
                className="text-xs text-ds-muted hover:text-ds-destructive transition-colors duration-150 px-1 rounded-sm focus-visible-ring"
              >
                삭제
              </button>
            </div>
            <div className="ticket-grid gap-2">
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
    </HistoryDisclosure>
  );
}
