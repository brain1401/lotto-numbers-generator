import NumberBall from './NumberBall';

interface LottoTicketProps {
  numbers: number[];
  label?: string;
  animate?: boolean;
}

export default function LottoTicket({ numbers, label, animate = false }: LottoTicketProps) {
  return (
    <div className="bg-ds-surface rounded-xl p-4 space-y-2.5">
      {label && <p className="text-xs font-medium text-ds-muted">{label}</p>}
      <div className="flex gap-2 flex-wrap">
        {numbers.map((n) => (
          <NumberBall key={n} number={n} animate={animate} />
        ))}
      </div>
    </div>
  );
}
