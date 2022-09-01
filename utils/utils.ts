import { LAST_CONSONANT_MAP, KOR_COMB_MAX, KOR_COMB_MIN } from './constants';

export type Keys = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

type Character = {
  isKor: boolean;
  value: number[];
};

const arraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!arraysEqual(arr1[i], arr2[i])) return false;
    } else {
      if (arr1[i] !== arr2[i]) return false;
    }
  }
  return true;
};

const seperateIntoVowelAndConsonants = (c: number) => {
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
  character: Character,
): Character => {
  if (!character.isKor) return { ...character };

  const encodeFirstConsonant = (consonant: number) => {
    if (consonant === -1) return -1;
    if (encryptKey) return encryptKey[consonant];
    return consonant;
  };
  const encodeLastConsonant = (consonant: number): number => {
    const findIndexOf = (letters: number[]) => {
      for (let i = 0; i < LAST_CONSONANT_MAP.length; i++) {
        if (arraysEqual(LAST_CONSONANT_MAP[i], letters)) return i;
      }
      return -1;
    };
    if (consonant < 0) return consonant;
    const letters = LAST_CONSONANT_MAP[consonant];
    const encoded = [
      encodeFirstConsonant(letters[0]),
      encodeFirstConsonant(letters[1]),
    ];
    return findIndexOf(encoded);
  };
  return {
    ...character,
    value: [
      encodeFirstConsonant(character.value[0]),
      character.value[1],
      encodeLastConsonant(character.value[2]),
    ],
  };
};

const combine = (c: Character) => {
  if (c.isKor)
    return KOR_COMB_MIN + c.value[0] * 21 * 28 + c.value[1] * 28 + c.value[2];
  return c.value[0];
};

export const encodeText = (text: string, encryptKey: Keys[]) => {
  const isKor = (c: number) => {
    return c >= KOR_COMB_MIN && c <= KOR_COMB_MAX;
  };

  /*
    0 -> 0 ㄱ
    1 -> 2 ㄴ
    2 -> 3 ㄷ
    3 -> 5 ㄹ
    4 -> 6 ㅁ
    5 -> 7 ㅂ
    6 -> 9 ㅅ
    7 -> 11 ㅇ
    8 -> 12 ㅈ
    9 -> 14 ㅊ
    10 -> 15 ㅋ
    11 -> 16 ㅌ
    12 -> 17 ㅍ
    13 -> 18 ㅎ
  */
  const maps = {
    0: 0,
    1: 2,
    2: 3,
    3: 5,
    4: 6,
    5: 7,
    6: 9,
    7: 11,
    8: 12,
    9: 14,
    10: 15,
    11: 16,
    12: 17,
    13: 18,
  };
  const _encryptKey = encryptKey.map(k => maps[k]);
  _encryptKey.splice(1, 0, 1);
  _encryptKey.splice(4, 0, 4);
  _encryptKey.splice(8, 0, 8);
  _encryptKey.splice(10, 0, 10);
  _encryptKey.splice(13, 0, 13);

  const toArray = (s: string) => s.split('');
  const toCode = (text: string) => toArray(text).map(c => c.charCodeAt(0));
  const toCharacters = (codes: number[]) =>
    codes.map((code: number) => {
      return {
        isKor: isKor(code),
        value: isKor(code) ? seperateIntoVowelAndConsonants(code) : [code],
      };
    });
  const encodeCharacters = (characters: Character[]) => {
    return characters.map(c => encodeCharacter(_encryptKey, c));
  };

  const textInCode = toCode(text);
  const characters = toCharacters(textInCode);
  const textEncoded = encodeCharacters(characters);
  const textCombined = textEncoded.map(c => combine(c));
  return textCombined.map(c => String.fromCharCode(c)).join('');
};

export const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return [...array];
};
