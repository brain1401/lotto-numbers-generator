import { getUnbiasedRandom } from '../../utils/random';

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
});
