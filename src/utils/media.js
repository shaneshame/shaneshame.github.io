import theme from './theme';

const breakpoint = minWidth => `@media (min-width: ${minWidth / 16}em)`;

const media = Object.entries(theme.breakpoints).reduce(
  (acc, [label, value]) => {
    acc[label] = breakpoint(value);

    return acc;
  },
  {}
);

export { breakpoint };
export default media;
