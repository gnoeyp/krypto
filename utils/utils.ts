import { lastConsonantMap, KOR_COMB_MAX, KOR_COMB_MIN } from './constants';

const divide = (c: number) => {
  /*
   * Args:
   *   c: an integer representing a hangul character
   */

  const subtractBase = (c: number) => {
    return c - KOR_COMB_MIN;
  };

  const getLastLetter = (c: number) => {
    return subtractBase(c) % 28;
  };

  const getMiddleLetter = (c: number) => {
    return Math.floor(subtractBase(c) / 28) % 21;
  };

  const getFirstLetter = (c: number) => {
    return Math.floor(subtractBase(c) / (21 * 28));
  };

  return [getFirstLetter(c), getMiddleLetter(c), getLastLetter(c)];
};

const encodeCharacter = (
  encryptKey: number[],
  [first, middle, last]: number[],
): number | number[] => {
  const encodeFirstConsonant = (consonant: number) => {
    // XXX: exception handling
    if (encryptKey) return encryptKey[consonant];
    return consonant;
  };

  const encodeLastConsonant = (consonant: number): number => {
    if (consonant < 0) return consonant;
    const c = lastConsonantMap[consonant];
    const encoded = [
      c[0] === -1 ? -1 : encodeFirstConsonant(c[0]),
      c[1] === -1 ? -1 : encodeFirstConsonant(c[1]),
    ];
    for (let i = 0; i < lastConsonantMap.length; i++) {
      if (
        lastConsonantMap[i][0] === encoded[0] &&
        lastConsonantMap[i][1] === encoded[1]
      ) {
        return i;
      }
    }
    return 0;
  };

  return [encodeFirstConsonant(first), middle, encodeLastConsonant(last)];
};

const combine = ([first, middle, last]: number[]) => {
  return KOR_COMB_MIN + first * 21 * 28 + middle * 28 + last;
};

export const encodeText = (text: string, encryptKey: number[]) => {
  const isKor = (c: number) => {
    return c >= KOR_COMB_MIN && c <= KOR_COMB_MAX;
  };
  const toArray = (s: string) => s.split('');

  const textInCode = toArray(text).map(c => c.charCodeAt(0));
  const textDivided = textInCode.map(c => (isKor(c) ? divide(c) : c));
  const textEncoded = textDivided.map(c => {
    if (Array.isArray(c)) {
      return encodeCharacter(encryptKey, c);
    }
    return c;
  });
  const textCombined = textEncoded.map(c => {
    if (Array.isArray(c)) return combine(c);
    return c;
  });
  return textCombined.map(c => String.fromCharCode(c));
};
