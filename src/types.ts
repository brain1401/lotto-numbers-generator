export interface LottoEntry {
  id: string;
  timestamp: number;
  games: number[][];
}

export interface PensionGame {
  group: number;   // 1~5
  digits: string;  // '000000'~'999999', zero-padded
}

export interface PensionEntry {
  id: string;
  timestamp: number;
  games: PensionGame[];
}
