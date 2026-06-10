import { getUnbiasedRandom } from './random';

export function generatePensionNumber(): { group: number; digits: string } {
  const group = getUnbiasedRandom(5) + 1;
  const num = getUnbiasedRandom(1_000_000);
  return { group, digits: String(num).padStart(6, '0') };
}
