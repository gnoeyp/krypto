export const KOR_COMB_MIN = 44032;
export const KOR_COMB_MAX = 55203;
export const CONSONANTS = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

// ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ 28가지
export const LAST_CONSONANT_MAP = [
  [-1, -1], // None
  [0, -1], // ㄱ
  [1, -1], // ㄲ
  [1, 9], // ㄳ
  [2, -1], // ㄴ
  [2, 12], // ㄵ
  [2, 18], // ㄶ
  [3, -1], // ㄷ
  [5, -1], // ㄹ
  [5, 0], // ㄺ
  [5, 6], // ㄻ
  [5, 7], // ㄼ
  [5, 9], // ㄽ
  [5, 16], // ㄾ
  [5, 17], // ㄿ
  [5, 18], // ㅀ
  [6, -1], // ㅁ
  [7, -1], // ㅂ
  [7, 9], // ㅄ
  [9, -1], // ㅅ
  [10, -1], // ㅆ
  [11, -1], // ㅇ
  [12, -1], // ㅈ
  [14, -1], // ㅊ
  [15, -1], // ㅋ
  [16, -1], // ㅌ
  [17, -1], // ㅍ
  [18, -1], // ㅎ
];
