// src/components/Header.tsx
export type TabType = 'lotto' | 'pension';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-ds-surface-raised border-b border-ds-border">
      <div className="max-w-4xl mx-auto px-4 pt-5 pb-0">
        <h1 className="text-2xl font-bold text-ds-ink tracking-[-0.01em]">복권 번호 생성기</h1>
        <nav className="flex gap-1 mt-4" aria-label="복권 종류 선택">
          {(
            [
              { tab: 'lotto', label: '로또 6/45' },
              { tab: 'pension', label: '연금복권 720+' },
            ] as const
          ).map(({ tab, label }) => (
            <button
              key={tab}
              aria-current={activeTab === tab ? 'page' : undefined}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-150 focus-visible-ring ${
                activeTab === tab
                  ? 'bg-ds-bg text-ds-ink border-t border-x border-ds-border -mb-px pb-[calc(0.5rem+1px)]'
                  : 'text-ds-muted hover:text-ds-ink hover:bg-ds-surface'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
