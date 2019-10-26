/* eslint-disable sort-keys */
const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 992,
};

const breakpoint = minWidth => `@media (min-width: ${minWidth / 16}em)`;

const media = Object.entries(breakpoints).reduce((acc, [label, value]) => {
  acc[label] = breakpoint(value);

  return acc;
}, {});

export { breakpoint };
export default media;
