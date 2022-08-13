// 가 44032 0xac00
// 44032 + 초성번호 * 21 * 28 + 중성번호 * 28 + 종성번호
// ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ 19 가지

const BASE = 44032;

const devide = (c: number) => {
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
    return (subtractBase(c) / 28) % 21;
  };

  const getFirstLetter = (c: number) => {
    return subtractBase(c) / 21 / 28;
  };

  return [getFirstLetter(c), getMiddleLetter(c), getLastLetter(c)];
};

const encodeCharacter = (
  encryptKey: number[],
  [first, middle, last]: number[],
) => {
  const encodeConsonant = (consonant: number) => {
    // XXX: exception handling
    if (encryptKey) return encryptKey[consonant];
    return consonant;
  };
  return [encodeConsonant(first), middle, last];
};

const combine = ([first, middle, last]: number[]) => {
  return BASE + first * 21 * 28 + middle * 28 + last;
};

export const encodeText = (text: string, encryptKey: number[]) => {
  const textInCode = text.split('').map(c => c.charCodeAt(0));
  const textDevided = textInCode.map(c => devide(c));
  const textEncoded = textDevided.map(c => encodeCharacter(encryptKey, c));
  const textCombined = textEncoded.map(c => combine(c));
  return textCombined.map(c => String.fromCharCode(c));
};
