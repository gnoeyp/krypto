// 가 44032 0xac00
// 44032 + 초성번호 * 21 * 28 + 중성번호 * 28 + 종성번호
// ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ 19 가지

const key = [2, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const BASE = 44032;

const devide = (c) => {
  /*
    Args:
        c: an integer representing a hangul character
    */
  // XXX: validate c is a hangul character

  const subtractBase = (c) => {
    return c - BASE;
  };

  const getLastLetter = (c) => {
    return subtractBase(c) % 28;
  };

  const getMiddleLetter = (c) => {
    return (subtractBase(c) / 28) % 21;
  };

  const getFirstLetter = (c) => {
    return subtractBase(c) / 21 / 28;
  };

  return [getFirstLetter(c), getMiddleLetter(c), getLastLetter(c)];
};

const encodeCharacter = (first, middle, last) => {
  const encodeConsonant = (consonant) => {
    // XXX: exception handling
    return key[consonant];
  };
  return [encodeConsonant(first), middle, last];
};

const combine = (first, middle, last) => {
  return BASE + first * 21 * 28 + middle * 28 + last;
};

const encodeText = (text) => {
  textInCode = text.split("").map((c) => c.charCodeAt(0));
  textDevided = textInCode.map((c) => devide(c));
  textEncoded = textDevided.map((c) => encodeCharacter(...c));
  textCombined = textEncoded.map((c) => combine(...c));
  return textCombined.map((c) => String.fromCharCode(c));
};

console.log(encodeText("가나다"));
