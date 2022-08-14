// 가 44032 0xac00
// 44032 + 초성번호 * 21 * 28 + 중성번호 * 28 + 종성번호
// ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ 19 가지

import { lastConsonantMap } from './constants';

const BASE = 44032;

const divide = (c: number) => {
  /*
   * Args:
   *   c: an integer representing a hangul character
   */

  const subtractBase = (c: number) => {
    return c - BASE;
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
  return BASE + first * 21 * 28 + middle * 28 + last;
};

export const encodeText = (text: string, encryptKey: number[]) => {
  const isKor = (c: number) => {
    return c >= 44032 && c <= 44032 + 18 * 21 * 28 + 20 * 28 + 27;
  };
  const textInCode = text.split('').map(c => c.charCodeAt(0));
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
