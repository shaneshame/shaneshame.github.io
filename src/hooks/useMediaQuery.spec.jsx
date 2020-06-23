import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import useMediaQuery, { MediaQueryProvider } from './useMediaQuery';

const breakpoints = { desktop: 1080, mobile: 0, tablet: 768 };

const resizeWindow = innerWidth => {
  window.innerWidth = innerWidth;
  window.dispatchEvent(new Event('resize'));
};

const renderSubject = innerWidth => {
  const { result } = renderHook(() => useMediaQuery(), {
    wrapper: ({ children }) => (
      <MediaQueryProvider breakpoints={breakpoints}>
        {children}
      </MediaQueryProvider>
    ),
  });

  act(() => {
    resizeWindow(innerWidth);
  });

  return result.current;
};

test.each([
  [breakpoints.tablet - 1, 'tablet', false],
  [breakpoints.tablet, 'tablet', true],
  [breakpoints.tablet + 1, 'tablet', true],
  [breakpoints.desktop - 1, 'tablet', true],
  [breakpoints.desktop, 'tablet', false],
])(
  'with innerWidth at %i, mq.is(%s) returns %o',
  (innerWidth, breakpoint, expected) => {
    const mq = renderSubject(innerWidth);

    expect(mq.is(breakpoint)).toEqual(expected);
  },
);

test.each([
  [breakpoints.tablet - 1, 'tablet', true],
  [breakpoints.tablet, 'tablet', true],
  [breakpoints.tablet + 1, 'tablet', true],
  [breakpoints.desktop - 1, 'tablet', true],
  [breakpoints.desktop, 'tablet', false],
])(
  'with innerWidth at %i, mq.atMost(%s) returns %o',
  (innerWidth, breakpoint, expected) => {
    const mq = renderSubject(innerWidth);

    expect(mq.atMost(breakpoint)).toEqual(expected);
  },
);

test.each([
  [breakpoints.tablet - 1, 'tablet', false],
  [breakpoints.tablet, 'tablet', true],
  [breakpoints.tablet + 1, 'tablet', true],
  [breakpoints.desktop - 1, 'tablet', true],
  [breakpoints.desktop, 'tablet', true],
])(
  'with innerWidth at %i, mq.atLeast(%s) returns %o',
  (innerWidth, breakpoint, expected) => {
    const mq = renderSubject(innerWidth);

    expect(mq.atLeast(breakpoint)).toEqual(expected);
  },
);
