import React from 'react';

import { MediaQueryProvider } from '../hooks';
import { theme } from '../utils';

const wrapRootElement = ({ element }) => {
  return (
    <MediaQueryProvider breakpoints={theme.breakpoints}>
      {element}
    </MediaQueryProvider>
  );
};

export default wrapRootElement;
