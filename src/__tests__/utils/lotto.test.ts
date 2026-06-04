import { getUnbiasedRandom, generateLottoNumbers } from '../../utils/lotto'

describe('getUnbiasedRandom', () => {
  it('returns a number in [0, max)', () => {
    for (let i = 0; i < 1000; i++) {
      const result = getUnbiasedRandom(10)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(10)
    }
  })

  it('returns integer values only', () => {
    for (let i = 0; i < 100; i++) {
      const result = getUnbiasedRandom(45)
      expect(Number.isInteger(result)).toBe(true)
    }
  })
})

describe('generateLottoNumbers', () => {
  it('returns exactly 6 numbers', () => {
    expect(generateLottoNumbers()).toHaveLength(6)
  })

  it('all numbers are between 1 and 45 inclusive', () => {
    const nums = generateLottoNumbers()
    nums.forEach(n => {
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(45)
    })
  })

  it('has no duplicates', () => {
    const nums = generateLottoNumbers()
    expect(new Set(nums).size).toBe(6)
  })

  it('is sorted in ascending order', () => {
    const nums = generateLottoNumbers()
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeLessThan(nums[i + 1])
    }
  })

  it('produces different results across calls (statistical)', () => {
    const results = new Set(
      Array.from({ length: 20 }, () => generateLottoNumbers().join(','))
    )
    expect(results.size).toBeGreaterThan(1)
  })
})
