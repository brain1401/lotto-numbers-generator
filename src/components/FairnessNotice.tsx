import { ChevronDownIcon, ShieldCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { TabType } from './Header';

interface Point {
  title: string;
  body: string;
}

const NO_PAST_DRAWS: Point = {
  title: '지난 당첨 번호와 상관없이 뽑습니다',
  body: '자주 나온 번호를 더 넣지도, 이미 당첨된 번호를 빼지도 않습니다. 추첨은 회차마다 독립이라 지난 결과가 다음 회차에 영향을 주지 않고, 지난 당첨 번호도 다른 번호와 똑같은 확률로 나옵니다.',
};

// 문구의 수치는 scripts/bias-check.ts(TRIALS, 검정 항목)와 맞춰야 한다
const CONTENT: Record<TabType, { summary: string; points: Point[] }> = {
  lotto: {
    summary: '모든 번호 조합이 똑같은 확률로 나옵니다',
    points: [
      {
        title: '치우침 없이 뽑습니다',
        body: '보안용 암호학적 난수로 1~45를 골고루 섞은 뒤 6개를 고릅니다. 난수를 범위에 맞출 때 생기는 미세한 쏠림까지 걸러내서, 특정 번호가 더 자주 나오지 않습니다.',
      },
      {
        title: '통계로 확인했습니다',
        body: '1,000만 게임을 만들어 번호별 빈도, 게임당 홀수 개수, 번호 합, 번호 쌍의 동시 출현을 검정했고 쏠림은 나타나지 않았습니다.',
      },
      NO_PAST_DRAWS,
      {
        title: '당첨 확률을 높여주지는 않습니다',
        body: '어떤 조합이든 1등 확률은 8,145,060분의 1로 같습니다. 다만 사람이 고른 번호는 생일(1~31)이나 줄 맞춘 모양에 몰리기 쉬워서, 당첨되면 당첨금을 여러 명과 나눌 가능성이 커집니다. 무작위 번호에는 그런 쏠림이 없습니다.',
      },
    ],
  },
  pension: {
    summary: '모든 번호가 똑같은 확률로 나옵니다',
    points: [
      {
        title: '치우침 없이 뽑습니다',
        body: '보안용 암호학적 난수로 조(1~5)와 여섯 자리 번호(000000~999999)를 따로 뽑습니다. 난수를 범위에 맞출 때 생기는 미세한 쏠림까지 걸러냈습니다.',
      },
      {
        title: '통계로 확인했습니다',
        body: '1,000만 개를 만들어 조별 빈도, 자리별 숫자, 번호 구간 분포를 검정했고 쏠림은 나타나지 않았습니다.',
      },
      NO_PAST_DRAWS,
      {
        title: '당첨 확률을 높여주지는 않습니다',
        body: '어떤 번호든 1등 확률은 5,000,000분의 1로 같습니다. 번호 고르는 수고를 덜어줄 뿐, 당첨을 약속하지는 않습니다.',
      },
    ],
  },
};

interface FairnessNoticeProps {
  lottery: TabType;
}

export default function FairnessNotice({ lottery }: FairnessNoticeProps) {
  const { summary, points } = CONTENT[lottery];

  return (
    <section aria-label="번호 생성 방식 안내">
      <Collapsible className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5 text-ds-ink">
            <ShieldCheckIcon aria-hidden className="size-4 shrink-0 text-ds-primary" />
            {summary}
          </span>
          <CollapsibleTrigger
            render={<Button variant="ghost" size="sm" className="text-ds-muted" />}
          >
            어떻게 뽑나요?
            <ChevronDownIcon
              aria-hidden
              className="transition-transform duration-200 group-aria-expanded/button:rotate-180 motion-reduce:transition-none"
            />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 duration-200 motion-reduce:animate-none">
          <div className="rounded-lg border border-ds-border bg-ds-surface p-4 text-sm">
            <dl className="space-y-3">
              {points.map(({ title, body }) => (
                <div key={title} className="space-y-0.5">
                  <dt className="font-medium text-ds-ink">{title}</dt>
                  <dd className="text-ds-muted leading-relaxed">{body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 pt-3 border-t border-ds-border text-xs text-ds-muted">
              번호는 이 브라우저 안에서 만들어지고, 생성 기록도 이 기기에만 저장됩니다.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
