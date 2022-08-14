import { LAST_CONSONANT_MAP, KOR_COMB_MAX, KOR_COMB_MIN } from './constants';

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

export const encodeText = (text: string, encryptKey: number[]) => {
  const isKor = (c: number) => {
    return c >= KOR_COMB_MIN && c <= KOR_COMB_MAX;
  };
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
    return characters.map(c => encodeCharacter(encryptKey, c));
  };

  const textInCode = toCode(text);
  const characters = toCharacters(textInCode);
  const textEncoded = encodeCharacters(characters);
  const textCombined = textEncoded.map(c => combine(c));
  return textCombined.map(c => String.fromCharCode(c));
};
