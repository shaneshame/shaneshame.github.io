const kebabCase = require('lodash/kebabCase');

const identity = v => v;

const fromPairs = pairs => {
  return pairs.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  );
};

const mapKeys = (obj, iteratee = identity) => {
  const newPairs = Object.entries(obj).map(([key, value]) => [
    iteratee(value, key, obj),
    value,
  ]);

  return fromPairs(newPairs);
};

const toLowerCase = str => str.toLowerCase();

const PATH_FORMATTER = kebabCase;
const PATH_NORMALIZER = toLowerCase;

const EXCEPTIONS_MAP = {
  tf2: toLowerCase,
  'tf2-server-info': toLowerCase,
};

const EXCEPTIONS = mapKeys(EXCEPTIONS_MAP, (_, key) => PATH_NORMALIZER(key));

const formatPathName = pathName => {
  const normalizedPathName = PATH_NORMALIZER(pathName);
  return EXCEPTIONS[normalizedPathName]
    ? EXCEPTIONS[normalizedPathName](pathName)
    : PATH_FORMATTER(pathName);
};

const pathCase = slug => {
  return slug
    .split('/')
    .map(formatPathName)
    .join('/');
};

const replaceTrailingSlash = path =>
  path === `/` ? path : path.replace(/\/$/, ``);

module.exports = Object.freeze({
  PATH_FORMATTER,
  PATH_NORMALIZER,
  pathCase,
  replaceTrailingSlash,
});
