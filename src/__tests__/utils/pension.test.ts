import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generatePensionNumber } from '../../utils/pension';
import { getUnbiasedRandom } from '../../utils/random';

// 기본 동작은 실제 구현 그대로 두고 호출 인자만 관찰 (아래 통계성 테스트 보존)
vi.mock('../../utils/random', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils/random')>();
  return { ...actual, getUnbiasedRandom: vi.fn(actual.getUnbiasedRandom) };
});

const mockedRandom = vi.mocked(getUnbiasedRandom);

describe('generatePensionNumber', () => {
  it('조는 1~5 범위여야 한다', () => {
    for (let i = 0; i < 1000; i++) {
      const { group } = generatePensionNumber();
      expect(group).toBeGreaterThanOrEqual(1);
      expect(group).toBeLessThanOrEqual(5);
    }
  });

  it('digits는 정확히 6자리 문자열이어야 한다', () => {
    for (let i = 0; i < 100; i++) {
      const { digits } = generatePensionNumber();
      expect(digits).toHaveLength(6);
      expect(/^\d{6}$/.test(digits)).toBe(true);
    }
  });

  it('000000~999999 범위 내여야 한다', () => {
    for (let i = 0; i < 100; i++) {
      const { digits } = generatePensionNumber();
      const n = parseInt(digits, 10);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(999999);
    }
  });

  it('앞자리 0이 zero-pad로 보존되어야 한다', () => {
    let foundLeadingZero = false;
    for (let i = 0; i < 2000; i++) {
      const { digits } = generatePensionNumber();
      if (digits.startsWith('0')) {
        foundLeadingZero = true;
        expect(digits).toHaveLength(6);
        break;
      }
    }
    expect(foundLeadingZero).toBe(true);
  });
});

describe('generatePensionNumber 무편향 계약 (결정적)', () => {
  beforeEach(() => {
    mockedRandom.mockClear();
  });

  it('무편향 난수원을 조는 max=5, 번호는 max=1_000_000으로 호출한다', () => {
    // 표본 빈도 테스트가 못 잡는 사각지대:
    // Math.random()으로 교체되면 호출 자체가 사라지고,
    // max가 6이나 999999로 틀어져도 범위 테스트는 그대로 통과함
    generatePensionNumber();

    expect(mockedRandom.mock.calls).toEqual([[5], [1_000_000]]);
  });

  it('난수 최솟값(0, 0)이 1조 000000으로 매핑된다', () => {
    // +1 오프셋 누락이면 group이 0이 되어 실패
    mockedRandom.mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(generatePensionNumber()).toEqual({ group: 1, digits: '000000' });
  });

  it('난수 최댓값(4, 999999)이 5조 999999로 매핑된다', () => {
    // 오프셋이 한 칸 밀리면 group이 6이 되어 실패
    mockedRandom.mockReturnValueOnce(4).mockReturnValueOnce(999999);

    expect(generatePensionNumber()).toEqual({ group: 5, digits: '999999' });
  });

  it('난수 0~4가 조 1~5로 빠짐없이 일대일 대응된다', () => {
    const groups = [0, 1, 2, 3, 4].map((r) => {
      mockedRandom.mockReturnValueOnce(r).mockReturnValueOnce(0);
      return generatePensionNumber().group;
    });

    expect(groups).toEqual([1, 2, 3, 4, 5]);
  });

  it('한 자리 난수가 앞자리 0으로 채워진 6자리가 된다', () => {
    mockedRandom.mockReturnValueOnce(0).mockReturnValueOnce(7);

    expect(generatePensionNumber().digits).toBe('000007');
  });
});
