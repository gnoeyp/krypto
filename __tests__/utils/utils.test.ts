import { encodeText } from '../../utils/utils';

describe('EncodeText', () => {
  it('results the same with input', () => {
    const result = encodeText(
      '가나다',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    );
    expect(result).toBe('가나다');
  });
  it('does not encode double consonants', () => {
    const result = encodeText(
      '까나다',
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    );
    expect(result).toBe('까가가');
  });
});
