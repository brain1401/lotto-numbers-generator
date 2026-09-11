interface NumberBallProps {
  number: number;
  animate?: boolean;
}

function getBallClass(n: number): string {
  if (n <= 10) return 'ball-yellow';
  if (n <= 20) return 'ball-blue';
  if (n <= 30) return 'ball-red';
  if (n <= 40) return 'ball-gray';
  return 'ball-green';
}

export default function NumberBall({ number, animate = false }: NumberBallProps) {
  return (
    <span
      className={`${animate ? 'ball-animate' : ''} ${getBallClass(number)} inline-flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold tabular-nums`}
    >
      {number}
    </span>
  );
}
