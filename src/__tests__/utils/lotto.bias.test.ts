import { describe, it, expect } from 'vitest';
import { generateLottoNumbers } from '../../utils/lotto';

const TRIALS = 1_000_000;
const NUMS = 45;
const PICKS = 6;
const EXPECTED = (TRIALS * PICKS) / NUMS;

// 6/45 비복원추출에서 naive Pearson 통계량의 기댓값은 NUMS-PICKS = 39 (≠ 44)
// 각 시행이 정확히 6개를 기여해 음의 공분산이 생기므로, statistic ~ (39/44)·χ²(44)
// 보정: chiSq × (44/39) 로 변환하면 표준 χ²(44)를 따름
const CORRECTION = (NUMS - 1) / (NUMS - PICKS); // 44 / 39
// χ²(44, α=0.001) = scipy.stats.chi2.ppf(0.999, 44) ≈ 78.75
const CRIT_ADJ_001 = 78.75;

function buildFreqTable(): number[] {
  const freq = new Array(NUMS + 1).fill(0);
  for (let t = 0; t < TRIALS; t++) {
    for (const n of generateLottoNumbers()) {
      freq[n]++;
    }
  }
  return freq;
}

describe('generateLottoNumbers 편향 검증', () => {
  // 비복원추출 보정 후 χ²(44) α=0.001 기준
  // 원시 통계량 기댓값 = 39 (standard χ²(44)의 44가 아님)
  it(
    `${TRIALS.toLocaleString()}회 카이제곱 검정 — 비복원추출 보정 후 α=0.001`,
    { timeout: 300_000 },
    () => {
      const freq = buildFreqTable();
      const counts = freq.slice(1);
      const chiSq = counts.reduce(
        (s: number, c: number) => s + (c - EXPECTED) ** 2 / EXPECTED,
        0,
      );
      // 비복원추출 보정: 보정 후 통계량이 χ²(44)를 따름
      const adjustedChiSq = chiSq * CORRECTION;

      const min = Math.min(...counts);
      const max = Math.max(...counts);

      // verbose 모드에서 수치 확인: npm test -- --run --reporter=verbose
      console.log('\n--- 편향 검증 결과 ---');
      console.log(`  기댓값             : ${EXPECTED.toFixed(2)}`);
      console.log(`  범위               : ${min.toLocaleString()} ~ ${max.toLocaleString()}`);
      console.log(`  χ² raw             : ${chiSq.toFixed(4)}  (E[χ²]≈39 under H₀)`);
      console.log(
        `  χ² 보정(×44/39)   : ${adjustedChiSq.toFixed(4)}  vs 임계값 ${CRIT_ADJ_001} (α=0.001)`,
      );
      console.log(`  판정               : ${adjustedChiSq < CRIT_ADJ_001 ? '✓ 편향 미감지' : '✗ 편향 의심'}`);

      // assertion 메시지에 수치 포함 — 실패 시 즉시 확인 가능
      expect(
        adjustedChiSq,
        `보정 χ²=${adjustedChiSq.toFixed(4)} (raw=${chiSq.toFixed(4)}) ≥ 임계값 ${CRIT_ADJ_001}`,
      ).toBeLessThan(CRIT_ADJ_001);
    },
  );

  it(
    '각 번호가 기댓값의 ±1% 이내로 등장',
    { timeout: 300_000 },
    () => {
      const freq = buildFreqTable();

      for (let n = 1; n <= NUMS; n++) {
        const deviation = Math.abs(freq[n] - EXPECTED) / EXPECTED;
        expect(
          deviation,
          `번호 ${n}: ${freq[n]}회  (편차 ${(deviation * 100).toFixed(3)}%)`,
        ).toBeLessThan(0.01);
      }
    },
  );
});
