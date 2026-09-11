// 번호 생성기 몬테카를로 편향 검증 스크립트
// 실행: npm run bias  (내부적으로 bun 사용)
//
// 각 검정의 귀무가설은 "생성기가 이론 분포를 정확히 따른다"이다.
// p-value가 유의수준보다 작으면 편향 의심으로 표시한다.
// 검정을 여러 개 동시에 하므로 Bonferroni 보정(α / 검정 수)을 적용한다.
//
// 한계: 백만 회로는 rejection sampling이 없애는 수준(상대 1e-4 이하)의 modulo bias는
// 검출할 수 없다. 그 부분은 src/__tests__의 결정적 로직 테스트가 담당하고,
// 이 스크립트는 범위 오류·잘못된 셔플 같은 큰 결함을 잡는 용도다.
import { generateLottoNumbers } from '../src/utils/lotto';
import { generatePensionNumber } from '../src/utils/pension';
import { getUnbiasedRandom, unbiasedShuffle } from '../src/utils/random';

const TRIALS = 10_000_000;
const ALPHA = 0.01;

// ─── 통계 헬퍼 ────────────────────────────────────────────────

// Lanczos 근사 (g=7, n=9)
function logGamma(x: number): number {
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  x -= 1;
  let a = c[0];
  const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

// 정규화 상부 불완전 감마 함수 Q(a, x) — Numerical Recipes 방식
function gammaQ(a: number, x: number): number {
  if (x <= 0) return 1;
  const logPrefix = -x + a * Math.log(x) - logGamma(a);
  if (x < a + 1) {
    // 급수 전개로 P를 구한 뒤 1 - P
    let ap = a;
    let term = 1 / a;
    let sum = term;
    for (let n = 0; n < 10_000; n++) {
      ap += 1;
      term *= x / ap;
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-15) break;
    }
    return 1 - sum * Math.exp(logPrefix);
  }
  // 연분수 전개 (modified Lentz)
  const tiny = 1e-300;
  let b = x + 1 - a;
  let c = 1 / tiny;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 10_000; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < tiny) d = tiny;
    c = b + an / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-15) break;
  }
  return Math.exp(logPrefix) * h;
}

function chiSquarePValue(stat: number, df: number): number {
  return gammaQ(df / 2, stat / 2);
}

function chiSquareStat(observed: number[], expected: number[]): number {
  let stat = 0;
  for (let i = 0; i < observed.length; i++) {
    const diff = observed[i] - expected[i];
    stat += (diff * diff) / expected[i];
  }
  return stat;
}

function binomial(n: number, k: number): number {
  let result = 1;
  for (let i = 1; i <= k; i++) result = (result * (n - k + i)) / i;
  return result;
}

interface TestResult {
  name: string;
  stat: number;
  df: number;
  pValue: number;
}

function makeResult(name: string, stat: number, df: number): TestResult {
  return { name, stat, df, pValue: chiSquarePValue(stat, df) };
}

// scale: 표본 간 상관 때문에 χ² 통계량이 늘거나 줄어드는 만큼 되돌리는 보정 계수
function chiSquareTest(
  name: string,
  observed: number[],
  expected: number[],
  scale = 1,
  df = observed.length - 1,
): TestResult {
  return makeResult(name, chiSquareStat(observed, expected) * scale, df);
}

// 표본 평균의 z-검정. z² ~ χ²(1) 이므로 같은 p-value 함수를 재사용한다.
function meanTest(name: string, sum: number, n: number, mu: number, variance: number): TestResult {
  const z = (sum / n - mu) / Math.sqrt(variance / n);
  return makeResult(name, z * z, 1);
}

// ─── 로또 6/45 실험 ───────────────────────────────────────────

const POOL = 45;
const PICK = 6;
const ODD_IN_POOL = 23;

interface LottoReport {
  tests: TestResult[];
  numberCounts: number[];
  invalid: number;
}

function runLottoExperiment(generate: () => number[], trials: number, label: string): LottoReport {
  const numberCounts = new Array<number>(POOL + 1).fill(0);
  const oddCountHist = new Array<number>(PICK + 1).fill(0);
  // pairCounts[(a-1)*POOL + (b-1)] = 번호 a<b가 한 게임에 함께 나온 횟수
  const pairCounts = new Array<number>(POOL * POOL).fill(0);
  let sumOfSums = 0;
  let invalid = 0;

  for (let t = 0; t < trials; t++) {
    const game = generate();
    // 형식 검증: 6개, 1~45 범위, 오름차순(= 중복 없음)
    let valid = game.length === PICK;
    let odd = 0;
    let sum = 0;
    for (let i = 0; i < game.length; i++) {
      const n = game[i];
      if (!Number.isInteger(n) || n < 1 || n > POOL || (i > 0 && n <= game[i - 1])) valid = false;
      numberCounts[n]++;
      if (n % 2 === 1) odd++;
      sum += n;
    }
    if (!valid) {
      invalid++;
      continue;
    }
    for (let i = 0; i < PICK; i++) {
      for (let j = i + 1; j < PICK; j++) pairCounts[(game[i] - 1) * POOL + (game[j] - 1)]++;
    }
    oddCountHist[odd]++;
    sumOfSums += sum;
  }
  const valid = trials - invalid;

  // 1) 번호별 출현 빈도. 한 게임 안에서는 비복원 추출이라 번호 간 음의 상관이 있어
  //    일반 χ² 통계량의 기댓값이 44가 아니라 44·(39/44)=39가 된다.
  //    (N-1)/(N-n) = 44/39 를 곱하면 정확히 χ²(44)를 따른다.
  const frequency = chiSquareTest(
    `[${label}] 번호별 빈도 (1~45)`,
    numberCounts.slice(1),
    new Array<number>(POOL).fill((trials * PICK) / POOL),
    (POOL - 1) / (POOL - PICK),
  );

  // 2) 게임당 홀수 개수 — 초기하분포 H(45, 23, 6)와 비교해 조합 단위 편향을 본다
  const totalCombos = binomial(POOL, PICK);
  const oddExpected = oddCountHist.map(
    (_, k) =>
      (valid * binomial(ODD_IN_POOL, k) * binomial(POOL - ODD_IN_POOL, PICK - k)) / totalCombos,
  );
  const oddTest = chiSquareTest(`[${label}] 게임당 홀수 개수`, oddCountHist, oddExpected);

  // 3) 6개 번호 합의 평균 — 비복원 추출 분산 n·σ²·(N-n)/(N-1)
  const popVariance = (POOL * POOL - 1) / 12;
  const sumVariance = (PICK * popVariance * (POOL - PICK)) / (POOL - 1);
  const sumTest = meanTest(
    `[${label}] 번호 합 평균 (기댓값 138)`,
    sumOfSums,
    valid,
    (PICK * (POOL + 1)) / 2,
    sumVariance,
  );

  const pairTest = pairCooccurrenceTest(`[${label}] 번호 쌍 동시 출현 (990쌍)`, pairCounts, valid);

  return { tests: [frequency, oddTest, sumTest, pairTest], numberCounts, invalid };
}

// 4) 번호 쌍 동시 출현 검정
//    990쌍의 편차 D에는 "번호별 빈도 편차"가 섞여 있어서(행 합 r_i가 번호 빈도에 비례)
//    그대로 χ²를 내면 이미 1)에서 본 성분을 크게 중복 반영한다.
//    D를 Johnson scheme J(45,2)의 고유공간으로 분해해 번호 빈도 성분
//    D̂_ij = (r_i + r_j)/(N-2) − S/((N-1)(N-2)) 를 빼고,
//    남은 "순수 쌍 상호작용" 성분만 검정한다. 이 성분의 분산 비(weight)로 나누면
//    정확히 χ²(C(N,2) − N) = χ²(945)를 따른다.
function pairCooccurrenceTest(name: string, pairCounts: number[], games: number): TestResult {
  const N = POOL;
  const q = (PICK * (PICK - 1)) / (N * (N - 1)); // 특정 쌍이 한 게임에 나올 확률 (1/66)
  const p3 = (q * (PICK - 2)) / (N - 2); // 특정 3개가 모두 나올 확률
  const p4 = (p3 * (PICK - 3)) / (N - 3); // 특정 4개가 모두 나올 확률
  const covSame = q - q * q; // 같은 쌍
  const covShareOne = p3 - q * q; // 원소 하나를 공유하는 두 쌍
  const covDisjoint = p4 - q * q; // 서로소인 두 쌍
  // J(N,2)에서 "원소 하나 공유" 인접행렬의 고유값은 -2, "서로소" 인접행렬은 1 (순수 쌍 성분 공간)
  const weight = (covSame - 2 * covShareOne + covDisjoint) / q;
  const expected = games * q;

  const dev = (i: number, j: number) => pairCounts[Math.min(i, j) * N + Math.max(i, j)] - expected;
  const rowSums = new Array<number>(N).fill(0);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) if (i !== j) rowSums[i] += dev(i, j);
  }
  const total = rowSums.reduce((a, b) => a + b, 0);

  let stat = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const numberEffect = (rowSums[i] + rowSums[j]) / (N - 2) - total / ((N - 1) * (N - 2));
      const residual = dev(i, j) - numberEffect;
      stat += residual * residual;
    }
  }
  return makeResult(name, stat / (expected * weight), (N * (N - 1)) / 2 - N);
}

// ─── 셔플 자리 분포 실험 ──────────────────────────────────────
// generateLottoNumbers는 결과를 정렬해 "어느 값이 어느 자리로 갔는지"가 사라진다.
// 셔플 함수를 직접 돌려 45×45 (값, 자리) 행렬을 세면 더 민감하게 편향을 볼 수 있다.
// 순열 행렬은 행·열 합이 고정이라 χ² 통계량이 N/(N-1)·χ²((N-1)²)를 따르므로
// (N-1)/N을 곱해 χ²(1936)으로 맞춘다.
function runShuffleExperiment(
  shuffle: (arr: number[]) => void,
  trials: number,
  label: string,
): TestResult {
  const counts = new Array<number>(POOL * POOL).fill(0);
  for (let t = 0; t < trials; t++) {
    const arr = Array.from({ length: POOL }, (_, i) => i);
    shuffle(arr);
    for (let pos = 0; pos < POOL; pos++) counts[arr[pos] * POOL + pos]++;
  }
  return chiSquareTest(
    `[${label}] 셔플 값×자리 분포 (45×45)`,
    counts,
    new Array<number>(POOL * POOL).fill(trials / POOL),
    (POOL - 1) / POOL,
    (POOL - 1) * (POOL - 1),
  );
}

// ─── 연금복권 720+ 실험 ───────────────────────────────────────

const GROUPS = 5;
const DIGITS = 6;
const MAX_NUMBER = 1_000_000;
const BUCKETS = 1000;

interface PensionReport {
  tests: TestResult[];
  groupCounts: number[];
  invalid: number;
}

function runPensionExperiment(trials: number): PensionReport {
  const groupCounts = new Array<number>(GROUPS).fill(0);
  const digitCounts = Array.from({ length: DIGITS }, () => new Array<number>(10).fill(0));
  const bucketCounts = new Array<number>(BUCKETS).fill(0);
  let sumOfNumbers = 0;
  let invalid = 0;

  for (let t = 0; t < trials; t++) {
    const { group, digits } = generatePensionNumber();
    if (!Number.isInteger(group) || group < 1 || group > GROUPS || !/^\d{6}$/.test(digits)) {
      invalid++;
      continue;
    }
    groupCounts[group - 1]++;
    for (let i = 0; i < DIGITS; i++) digitCounts[i][digits.charCodeAt(i) - 48]++;
    const num = Number(digits);
    bucketCounts[Math.floor(num / (MAX_NUMBER / BUCKETS))]++;
    sumOfNumbers += num;
  }

  const valid = trials - invalid;
  const tests: TestResult[] = [
    chiSquareTest('[연금] 조 (1~5)', groupCounts, new Array<number>(GROUPS).fill(valid / GROUPS)),
    // 000000~999999가 균등하면 각 자릿수는 서로 독립인 0~9 균등분포다
    ...digitCounts.map((counts, i) =>
      chiSquareTest(
        `[연금] ${i + 1}번째 자리 숫자`,
        counts,
        new Array<number>(10).fill(valid / 10),
      ),
    ),
    // 전체 범위를 1000구간으로 나눠 특정 구간 쏠림(예: 앞쪽 번호 선호)을 본다
    chiSquareTest(
      `[연금] 번호 구간 분포 (${BUCKETS}구간)`,
      bucketCounts,
      new Array<number>(BUCKETS).fill(valid / BUCKETS),
    ),
    meanTest(
      '[연금] 번호 평균 (기댓값 499999.5)',
      sumOfNumbers,
      valid,
      (MAX_NUMBER - 1) / 2,
      (MAX_NUMBER * MAX_NUMBER - 1) / 12,
    ),
  ];
  return { tests, groupCounts, invalid };
}

// ─── 양성 대조군 ──────────────────────────────────────────────
// 검정이 실제로 편향을 잡아낼 수 있는지 확인하기 위해, 흔한 실수인
// "naive 셔플"(모든 i에 대해 j를 전체 범위에서 뽑음)을 같은 검정에 돌린다.
// 이 쪽은 반드시 편향 의심으로 나와야 정상이다.
function naiveShuffle<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    const j = getUnbiasedRandom(arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function generateWithNaiveShuffle(): number[] {
  const pool = Array.from({ length: POOL }, (_, i) => i + 1);
  naiveShuffle(pool);
  return pool.slice(0, PICK).sort((a, b) => a - b);
}

// ─── 출력 ─────────────────────────────────────────────────────

function printTests(title: string, tests: TestResult[], threshold: number): number {
  console.log(`\n${title}`);
  let failures = 0;
  console.table(
    tests.map((t) => {
      const failed = t.pValue < threshold;
      if (failed) failures++;
      return {
        검정: t.name,
        'χ²': t.stat.toFixed(2),
        자유도: t.df,
        'p-value': t.pValue < 1e-6 ? t.pValue.toExponential(2) : t.pValue.toFixed(4),
        판정: failed ? '❌ 편향 의심' : '✅ 통과',
      };
    }),
  );
  return failures;
}

function timed<T>(label: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  console.log(`${label}: ${((performance.now() - start) / 1000).toFixed(1)}초`);
  return result;
}

const fmt = (n: number) => n.toLocaleString('en-US');

console.log(`시행 횟수: ${fmt(TRIALS)}회, 유의수준 α = ${ALPHA}`);

const lotto = timed('로또 생성', () => runLottoExperiment(generateLottoNumbers, TRIALS, '로또'));
const shuffle = timed('셔플 실행', () => runShuffleExperiment(unbiasedShuffle, TRIALS, '셔플'));
const pension = timed('연금복권 생성', () => runPensionExperiment(TRIALS));
const control = timed('대조군 실행', () => [
  ...runLottoExperiment(generateWithNaiveShuffle, TRIALS, '대조군').tests,
  runShuffleExperiment(naiveShuffle, TRIALS, '대조군'),
]);

// 번호별 빈도 상세
const expectedPerNumber = (TRIALS * PICK) / POOL;
console.log(`\n로또 번호별 출현 횟수 (기댓값 ${expectedPerNumber.toFixed(1)})`);
console.table(
  lotto.numberCounts.slice(1).map((count, i) => ({
    번호: i + 1,
    횟수: count,
    '편차(%)': (((count - expectedPerNumber) / expectedPerNumber) * 100).toFixed(3),
  })),
);
const counts = lotto.numberCounts.slice(1);
const min = Math.min(...counts);
const max = Math.max(...counts);
console.log(
  `최소 ${fmt(min)}회 (${counts.indexOf(min) + 1}번) / 최대 ${fmt(max)}회 (${counts.indexOf(max) + 1}번)`,
);

console.log('\n연금복권 조별 출현 횟수');
console.table(pension.groupCounts.map((count, i) => ({ 조: `${i + 1}조`, 횟수: count })));

const mainTests = [...lotto.tests, shuffle, ...pension.tests];
const threshold = ALPHA / mainTests.length;
console.log(
  `\nBonferroni 보정 유의수준: ${ALPHA} / ${mainTests.length} = ${threshold.toExponential(2)}`,
);

const failures = printTests('검정 결과 (실제 생성기)', mainTests, threshold);
const controlFailures = printTests('검정 결과 (양성 대조군: naive 셔플)', control, threshold);

console.log('\n요약');
console.log(`- 형식 오류: 로또 ${lotto.invalid}건, 연금 ${pension.invalid}건`);
console.log(
  failures === 0
    ? '- 실제 생성기: 모든 검정 통과 — 편향 증거 없음'
    : `- 실제 생성기: ${failures}개 검정에서 편향 의심`,
);
console.log(
  controlFailures === control.length
    ? '- 대조군: 모든 검정에서 편향 검출 — 검정에 편향을 잡아낼 검출력이 있음'
    : `- 대조군: ${control.length}개 중 ${controlFailures}개 검정만 편향 검출`,
);
