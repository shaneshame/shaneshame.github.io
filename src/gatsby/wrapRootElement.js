import React from 'react';

import 'github-markdown-css';

const wrapRootElement = ({ element }) => {
  return <div>{element}</div>;
};

export default wrapRootElement;
