// 가 44032 0xac00
// 44032 + 초성번호 * 21 * 28 + 중성번호 * 28 + 종성번호
// ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ 19 가지

import { lastConsonantMap } from './constants';

const BASE = 44032;

const divide = (c: number) => {
  /*
    Args:
        c: an integer representing a hangul character
    */
  // XXX: validate c is a hangul character

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
) => {
  const encodeFirstConsonant = (consonant: number) => {
    // XXX: exception handling
    if (encryptKey) return encryptKey[consonant];
    return consonant;
  };

  const encodeLastConsonant = (consonant: number) => {
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
  };

  return [encodeFirstConsonant(first), middle, encodeLastConsonant(last)];
};

const combine = ([first, middle, last]: number[]) => {
  return BASE + first * 21 * 28 + middle * 28 + last;
};

export const encodeText = (text: string, encryptKey: number[]) => {
  const textInCode = text.split('').map(c => c.charCodeAt(0));
  const textDevided = textInCode.map(c => divide(c));
  const textEncoded = textDevided.map(c => encodeCharacter(encryptKey, c));
  const textCombined = textEncoded.map(c => combine(c));
  return textCombined.map(c => String.fromCharCode(c));
};
