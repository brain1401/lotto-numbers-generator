import { describe, it, expect } from 'vitest';
import { generatePensionNumber } from '../../utils/pension';

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
