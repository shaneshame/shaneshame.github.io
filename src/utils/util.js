import { identity } from 'lodash';

export const upperFirst = (str = '') => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const sentenceCase = (str = '') => upperFirst(str.toLowerCase());

export const mapPath = (path = '', iteratee = identity) => {
  return path
    .split('/')
    .map(iteratee)
    .join('/');
};
