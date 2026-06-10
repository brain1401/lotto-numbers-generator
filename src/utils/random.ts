export function getUnbiasedRandom(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return value % max;
}

// 무편향 Fisher-Yates 셔플 (제자리 변경)
// rng는 테스트에서 주입 가능, 기본값은 CSPRNG 기반 getUnbiasedRandom
export function unbiasedShuffle<T>(
  arr: T[],
  rng: (max: number) => number = getUnbiasedRandom,
): void {
  // 뒤에서 앞으로 진행하며 i번째 원소를 j∈[0, i]와 교환
  for (let i = arr.length - 1; i > 0; i--) {
    const j = rng(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
