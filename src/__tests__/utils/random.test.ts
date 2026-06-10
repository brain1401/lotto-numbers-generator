import { vi } from 'vitest';
import { getUnbiasedRandom, unbiasedShuffle } from '../../utils/random';

describe('getUnbiasedRandom', () => {
  it('returns a number in [0, max)', () => {
    for (let i = 0; i < 1000; i++) {
      const result = getUnbiasedRandom(10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  it('returns integer values only', () => {
    for (let i = 0; i < 100; i++) {
      const result = getUnbiasedRandom(45);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('거부 임계값 이상의 난수가 나오면 재추출한다 (모듈로 편향 제거)', () => {
    // max=3에서 limit = floor(2^32 / 3) * 3 = 4294967295
    // 1. 첫 추출값 4294967295 (limit 이상이라 거부 대상, 그대로 쓰면 %3=0 편향)
    // 2. 재추출값 1 채택
    const drawn = [4294967295, 1];
    let call = 0;
    const spy = vi.spyOn(crypto, 'getRandomValues').mockImplementation((buf) => {
      (buf as Uint32Array)[0] = drawn[call++];
      return buf;
    });

    const result = getUnbiasedRandom(3);

    // 거부 로직이 없으면 4294967295 % 3 = 0 이 반환됨
    expect(result).toBe(1);
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });
});

describe('unbiasedShuffle', () => {
  it('원소 집합과 길이를 보존한다', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    unbiasedShuffle(arr);
    expect([...arr].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('Fisher-Yates 정방향으로 i번째 반복에서 rng(i+1)을 호출한다', () => {
    // 호출 인자 시퀀스로 알고리즘 구조를 검증 (marginal 빈도가 못 잡는 사각지대)
    // off-by-one(Sattolo)이면 [3,2,1], naive shuffle이면 [4,4,4]가 되어 실패
    const calls: number[] = [];
    const rng = (max: number) => {
      calls.push(max);
      return 0;
    };
    unbiasedShuffle([10, 20, 30, 40], rng);
    expect(calls).toEqual([4, 3, 2]);
  });

  it('정규 입력 공간(4!)이 모든 순열로 일대일 대응된다', () => {
    // N=4의 정규 Fisher-Yates 입력은 j3∈[0,3], j2∈[0,2], j1∈[0,1]로 4*3*2=24가지
    // 무편향 셔플이면 24개 입력이 24개 서로 다른 순열로 정확히 매핑됨 (swap 정확성 보장)
    const perms = new Set<string>();
    for (let a = 0; a <= 3; a++) {
      for (let b = 0; b <= 2; b++) {
        for (let c = 0; c <= 1; c++) {
          const seq = [a, b, c];
          let k = 0;
          const rng = () => seq[k++];
          const arr = [1, 2, 3, 4];
          unbiasedShuffle(arr, rng);
          perms.add(arr.join(','));
        }
      }
    }
    expect(perms.size).toBe(24);
  });
});
