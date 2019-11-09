import { chunk, chunkIndices, times } from './util';

describe('times', () => {
  test('should match lodash 1', () => {
    const actual = times(3, String);
    const expected = ['0', '1', '2'];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});

describe('chunkIndices', () => {
  test('should split evenly', () => {
    const actual = chunkIndices(['a', 'b', 'c', 'd'], 2);
    const expected = [[0, 2], [2, 4]];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  test('should split unevenly', () => {
    const actual = chunkIndices(['a', 'b', 'c', 'd'], 3);
    const expected = [[0, 3], [3, 4]];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});

describe('chunk', () => {
  test('should split evenly', () => {
    const actual = chunk(['a', 'b', 'c', 'd'], 2);
    const expected = [['a', 'b'], ['c', 'd']];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  test('should split unevenly', () => {
    const actual = chunk(['a', 'b', 'c', 'd'], 3);
    const expected = [['a', 'b', 'c'], ['d']];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  test('should handle size 0', () => {
    const actual = chunk(['a', 'b'], 0);
    const expected = [];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});
