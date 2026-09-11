import { useState, type ReactNode } from 'react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface HistoryDisclosureProps {
  /** 현재 결과를 제외한 이전 기록 개수 */
  count: number;
  /** 방금 생성한 결과가 기록에 저장돼 있는지 */
  justSaved: boolean;
  onClearAll: () => void;
  children: ReactNode;
}

export default function HistoryDisclosure({
  count,
  justSaved,
  onClearAll,
  children,
}: HistoryDisclosureProps) {
  const [open, setOpen] = useState(false);

  if (count === 0 && !justSaved) return null;

  const isOpen = open && count > 0;

  return (
    <section aria-label="생성 기록">
      <Collapsible open={isOpen} onOpenChange={setOpen} className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {justSaved && (
            <span className="inline-flex items-center gap-1.5 text-ds-muted">
              <CheckIcon aria-hidden className="size-4" />
              기록에 저장됨
            </span>
          )}
          {justSaved && count > 0 && (
            <span aria-hidden className="text-ds-muted">
              ·
            </span>
          )}
          {count > 0 && (
            <CollapsibleTrigger
              render={<Button variant="ghost" size="sm" className="text-ds-muted" />}
            >
              {/* 버튼의 flex gap이 텍스트 조각 사이에 끼지 않도록 라벨을 한 덩어리로 묶는다 */}
              <span>
                이전 기록 <span className="tabular-nums">{count}</span>개
              </span>
              <ChevronDownIcon
                aria-hidden
                className="transition-transform duration-200 group-aria-expanded/button:rotate-180 motion-reduce:transition-none"
              />
            </CollapsibleTrigger>
          )}
          {isOpen && (
            <button
              onClick={onClearAll}
              className="ml-auto text-xs text-ds-destructive hover:bg-ds-destructive-tint px-2 py-1 rounded-md transition-colors duration-150 focus-visible-ring"
            >
              전체 삭제
            </button>
          )}
        </div>
        <CollapsibleContent className="data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 duration-200 motion-reduce:animate-none">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
