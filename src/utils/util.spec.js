import { chunk, chunkIndices, chunkString, range, times } from './util';

describe('range', () => {
  it('should create Array with only `stop`', () => {
    const actual = range(4);
    const expected = [0, 1, 2, 3];

    expect(actual).toEqual(expected);
  });

  it('should create Array with `start` and `stop`', () => {
    const actual = range(1, 5);
    const expected = [1, 2, 3, 4];

    expect(actual).toEqual(expected);
  });

  it('should create Array with `start` and `stop` and `step` even', () => {
    const actual = range(0, 20, 5);
    const expected = [0, 5, 10, 15];

    expect(actual).toEqual(expected);
  });

  it('should create Array with `start` and `stop` and `step` uneven', () => {
    const actual = range(0, 4, 2);
    const expected = [0, 2];

    expect(actual).toEqual(expected);
  });

  it('should infer negative step when start > stop', () => {
    const actual = range(6, 3);
    const expected = [6, 5, 4];

    expect(actual).toEqual(expected);
  });

  it('should create Array with one element', () => {
    const actual = range(3, 4);
    const expected = [3];

    expect(actual).toEqual(expected);
  });

  it('should handle negative start', () => {
    const actual = range(-4);
    const expected = [0, -1, -2, -3];

    expect(actual).toEqual(expected);
  });

  it('should handle negative start with negative step', () => {
    const actual = range(0, -4, -1);
    const expected = [0, -1, -2, -3];

    expect(actual).toEqual(expected);
  });

  it('should handle a step of 0', () => {
    const actual = range(1, 4, 0);
    const expected = [1, 1, 1];

    expect(actual).toEqual(expected);
  });

  it('should handle a range of 0', () => {
    const actual = range(0);
    const expected = [];

    expect(actual).toEqual(expected);
  });
});

describe('times', () => {
  it('should match lodash 1', () => {
    const actual = times(3, String);
    const expected = ['0', '1', '2'];

    expect(actual).toEqual(expected);
  });
});

describe('chunk', () => {
  it('should split evenly', () => {
    const actual = chunk(['a', 'b', 'c', 'd'], 2);
    const expected = [['a', 'b'], ['c', 'd']];

    expect(actual).toEqual(expected);
  });

  it('should split unevenly', () => {
    const actual = chunk(['a', 'b', 'c', 'd'], 3);
    const expected = [['a', 'b', 'c'], ['d']];

    expect(actual).toEqual(expected);
  });

  it('should handle size 0', () => {
    const actual = chunk(['a', 'b'], 0);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should handle empty array', () => {
    const actual = chunk([]);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should handle size greater than max', () => {
    const actual = chunk([], 5);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should handle null size', () => {
    const actual = chunk([], null);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should handle non-iterable input', () => {
    const actual = chunk(3, 3);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should handle strings', () => {
    const actual = chunk('123456789', 3);
    const expected = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];

    expect(actual).toEqual(expected);
  });
});

describe('chunkIndices', () => {
  it('should split evenly', () => {
    const actual = chunkIndices(['a', 'b', 'c', 'd'], 2);
    const expected = [[0, 1], [2, 3]];
    expect(actual).toEqual(expected);
  });

  it('should split unevenly', () => {
    const actual = chunkIndices(['a', 'b', 'c', 'd'], 3);
    const expected = [[0, 1, 2], [3]];
    expect(actual).toEqual(expected);
  });

  it('should handle strings', () => {
    const actual = chunkIndices('abcd', 2);
    const expected = [[0, 1], [2, 3]];
    expect(actual).toEqual(expected);
  });

  it('should handle invalid size', () => {
    let actual = chunkIndices('abcd', 0);
    const expected = [];
    expect(actual).toEqual(expected);

    actual = chunkIndices('abcd', -1);
    expect(actual).toEqual(expected);

    actual = chunkIndices('abcd', null);
    expect(actual).toEqual(expected);
  });

  it('should handle no size', () => {
    let actual = chunkIndices('abcd');
    const expected = [[0], [1], [2], [3]];
    expect(actual).toEqual(expected);
  });
});

describe('chunkString', () => {
  it('should split evenly', () => {
    const actual = chunkString('abcd', 2);
    const expected = ['ab', 'cd'];

    expect(actual).toEqual(expected);
  });

  it('should split unevenly', () => {
    const actual = chunkString('abcd', 3);
    const expected = ['abc', 'd'];

    expect(actual).toEqual(expected);
  });

  it('should handle invalid size', () => {
    let actual = chunkString('abcd', 0);
    const expected = [''];
    expect(actual).toEqual(expected);

    actual = chunkString('abcd', -1);
    expect(actual).toEqual(expected);

    actual = chunkString('abcd', null);
    expect(actual).toEqual(expected);
  });

  it('should handle no size', () => {
    let actual = chunkString('abcd');
    const expected = ['a', 'b', 'c', 'd'];
    expect(actual).toEqual(expected);
  });
});
