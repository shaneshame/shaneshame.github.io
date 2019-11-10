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

const getSign = n => {
  const sign = Math.sign(n);
  return sign === 0 ? 1 : sign === -0 ? -1 : sign;
};

export const range = (_start, _stop, _step) => {
  const start = _stop ? _start : 0;
  const stop = _stop ? _stop : _start;
  const step = _step !== undefined ? _step : start > stop ? -1 : 1;

  const length =
    step === 0
      ? Math.abs(stop - start)
      : Math.abs(Math.ceil((stop - start) / step));

  return [...Array(length).keys()].map(n =>
    step === 0 ? start : (start + n * getSign(step)) * Math.abs(step)
  );
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

const chunkBase = (iterable, size = 1, customizer = identity) => {
  if (!iterable.length || Math.floor(size) < 1) return [];

  return range(0, iterable.length, size).map(
    (startIndex, i, startingIndices) => {
      const nextStartIndex = startingIndices[i + 1];
      const endIndex = nextStartIndex || iterable.length;
      return customizer(
        iterable.slice(startIndex, endIndex),
        startIndex,
        endIndex
      );
    }
  );
};

export const chunk = (iterable, size = 1, customizer) => {
  return chunkBase(Array.from(iterable), size, customizer);
};

export const chunkIndices = (iterable, size = 1) => {
  return chunkBase(iterable, size, (_, start, end) => range(start, end));
};

export const chunkString = (str, size = 1) => {
  if (!str.length || Math.floor(size) < 1) return [''];
  return chunkBase(str, size);
};

export const splitAt = (arr, index) => [arr.slice(0, index), arr.slice(index)];
