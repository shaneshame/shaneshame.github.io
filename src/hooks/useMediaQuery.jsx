import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const DEFAULT_WIDTH = 411;

const MediaQueryContext = createContext(null);

const MediaQueryProvider = ({ breakpoints, ...props }) => {
  const [isSSR, setSSR] = useState(true);

  useEffect(() => {
    setSSR(false);
  }, []);

  const innerWidth = useCallback(
    () => (isSSR ? DEFAULT_WIDTH : window.innerWidth),
    [isSSR],
  );

  const { getBreakpointName, upperBounds } = useMemo(() => {
    const descendingBreakpointPairs = Object.entries(breakpoints).sort(
      ([, valueA], [, valueB]) => valueB - valueA,
    );

    const upperBounds = descendingBreakpointPairs.reduce(
      (accumulator, [name], index) => {
        const maxWidth =
          index === 0
            ? Number.POSITIVE_INFINITY
            : descendingBreakpointPairs[index - 1][1] - 1;

        accumulator[name] = maxWidth;

        return accumulator;
      },
      {},
    );

    const getBreakpointName = width => {
      const [breakpointName] = descendingBreakpointPairs.find(
        ([_, minWidth]) => width >= minWidth,
      );

      return breakpointName;
    };

    return {
      getBreakpointName,
      upperBounds,
    };
  }, [breakpoints]);

  const initialBreakpoint = useMemo(
    () => getBreakpointName(innerWidth()),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const [currentBreakpoint, setBreakpoint] = useState(initialBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpointName(window.innerWidth));
    };

    setBreakpoint(getBreakpointName(window.innerWidth));

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize, { passive: true });
    };
  }, [getBreakpointName]);

  const value = useMemo(() => {
    return {
      atLeast(breakpoint) {
        return innerWidth() >= breakpoints[breakpoint];
      },
      atMost(breakpoint) {
        return innerWidth() <= upperBounds[breakpoint];
      },
      breakpoint: currentBreakpoint,
      is(breakpoint) {
        return breakpoint === currentBreakpoint;
      },
    };
  }, [breakpoints, currentBreakpoint, innerWidth, upperBounds]);

  return <MediaQueryContext.Provider {...props} value={value} />;
};

function useMediaQuery() {
  return useContext(MediaQueryContext);
}

export { MediaQueryProvider, useMediaQuery as default };
