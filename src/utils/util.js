import { camelCase, get, identity } from 'lodash';
import { PATH_NORMALIZER } from 'nodeUtil';

import { CATEGORY_PRIORITIES } from './config';

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
