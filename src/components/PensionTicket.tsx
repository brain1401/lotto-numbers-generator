interface PensionTicketProps {
  group: number;
  digits: string;
  label?: string;
  animate?: boolean;
}

export default function PensionTicket({ group, digits, label, animate = false }: PensionTicketProps) {
  return (
    <div className="bg-ds-surface rounded-xl p-4 space-y-2.5">
      {label && <p className="text-xs font-medium text-ds-muted">{label}</p>}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-ds-primary text-ds-ink text-sm font-bold min-w-[3rem]">
          {group}조
        </span>
        <div className="flex gap-1.5">
          {digits.split('').map((d, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-8 h-10 rounded-md bg-ds-surface-raised text-ds-ink text-sm font-bold tabular-nums border border-ds-border${animate ? ` pension-digit pension-digit-${i + 1}` : ''}`}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
