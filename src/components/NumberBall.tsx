interface NumberBallProps {
  number: number
}

function getBallColor(n: number): string {
  if (n <= 10) return 'bg-yellow-400 text-gray-900'
  if (n <= 20) return 'bg-blue-500 text-white'
  if (n <= 30) return 'bg-red-500 text-white'
  if (n <= 40) return 'bg-gray-400 text-white'
  return 'bg-green-500 text-white'
}

export default function NumberBall({ number }: NumberBallProps) {
  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${getBallColor(number)}`}
    >
      {number}
    </span>
  )
}
