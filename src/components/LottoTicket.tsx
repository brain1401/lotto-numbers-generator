import NumberBall from './NumberBall'

interface LottoTicketProps {
  numbers: number[]
  label?: string
}

export default function LottoTicket({ numbers, label }: LottoTicketProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
      {label && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {label}
        </p>
      )}
      <div className="flex gap-2 flex-wrap">
        {numbers.map(n => (
          <NumberBall key={n} number={n} />
        ))}
      </div>
    </div>
  )
}
