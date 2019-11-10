import { camelCase, get, identity } from 'lodash';

import { CATEGORY_PRIORITIES } from './config';
import { PATH_NORMALIZER } from './nodeUtil';

export const upperFirst = (str = '') => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const stringBoolean = value => {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return value;
};

export const pascalCase = str => upperFirst(camelCase(str));

export const sentenceCase = (str = '') => upperFirst(str.toLowerCase());

export const stripSpaces = str => str.replace(/ /g, '');

export const mapPath = (path = '', iteratee = identity) => {
  return path
    .split('/')
    .map(iteratee)
    .join('/');
};

const getRank = item => {
  const lowPriorities = get(CATEGORY_PRIORITIES, 'low', []);
  const highPriorities = get(CATEGORY_PRIORITIES, 'high', []);

  if (lowPriorities.includes(PATH_NORMALIZER(item))) {
    return -10;
  }

  for (let i = 0; i < highPriorities.length; i += 1) {
    let rank = highPriorities.length - i;
    if (PATH_NORMALIZER(highPriorities[i]) === PATH_NORMALIZER(item)) {
      return rank;
    }
  }

  return 0;
};

export const byCategoryPriority = (a, b) => {
  return getRank(b) - getRank(a);
};

export const invokeWhen = (cond, f) => value => {
  const predicate = typeof cond === 'function' ? cond(value) : cond;
  return predicate ? f(value) : value;
};

export const range = (start, stop, step = 1) => {
  if (stop < start) {
    return [];
  }

  const length = stop ? Math.ceil((stop - start) / step) : start;
  const startPad = stop ? start : 0;

  return [...Array(length).keys()].map(n => (n + startPad) * step);
};

export const times = (n, iteratee) => {
  return range(n).map(i => iteratee(i));
};

export const first = (arr = []) => arr[0];
export const last = (arr = []) => arr[arr.length - 1];

export const isIterable = iterable => {
  if (iterable === null || iterable === undefined) {
    return false;
  }
  return typeof iterable[Symbol.iterator] === 'function';
};

const baseChunk = (iterable, size) => {
  if (!iterable.length || size < 1) return [];

  const _baseChunk = (
    iterable,
    size,
    start = 0,
    end = Math.min(size, iterable.length),
    result = []
  ) => {
    const isLastChunk = start >= iterable.length - size;
    return isLastChunk
      ? [...result, iterable.slice(start, iterable.length)]
      : _baseChunk(iterable, size, end, Math.min(end + size, iterable.length), [
          ...result,
          iterable.slice(start, end),
        ]);
  };

  return _baseChunk(iterable, size);
};

export const chunk = (_iterable, size = 1) => {
  if (size < 1) return [];
  const iterable = Array.from(_iterable);
  return baseChunk(iterable, size);
};

export const chunkIndices = (iterable, size = 1) => {
  if (size < 1) return [];

  const indices = Array.from(iterable).map((_, index) => index);
  return baseChunk(indices, size);
};

export const chunkString = (str, size = 1) => {
  if (!str.length || Math.floor(size) < 1) return [''];
  return baseChunk(str, size);
};

export const splitAt = (arr, index) => [arr.slice(0, index), arr.slice(index)];

// export const chunk = (iterable, size = 1) => {
//   if (size < 1) return [];

//   const _chunk = (iterable, size, result = []) => {
//     if (iterable.length < size) return [...result, iterable];
//     const [nextChunk, remainder] = splitAt(iterable, size);
//     return _chunk(remainder, size, [...result, nextChunk]);
//   };

//   return _chunk(iterable, size);
// };

// export const chunkIndices = (iterable, size = 1) => {
//   let curResult = [];
//   if (size < 1) return curResult;

//   times(Math.ceil(iterable.length / size), index => {
//     const start = index > 0 ? curResult[index - 1][1] : 0;
//     const end = Math.min(start + size, iterable.length);
//     curResult = [...curResult, [start, end]];
//   });

//   return curResult;
// };

// export const chunk = (iterable, size = 1) => {
//   const indices = chunkIndices(iterable, size);
//   return size < 1
//     ? []
//     : indices.map(curRange =>
//         iterable.slice(first(curRange), last(curRange) + 1)
//       );
// };
