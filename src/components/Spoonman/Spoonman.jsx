import React, { useState } from 'react';
import styled from 'styled-components';

import { theme } from './common';
import Helmet from './Helmet';
import ServerCommands from './ServerCommands';
import SpoonmanLanding from './SpoonmanLanding';

const FullBrowserWindow = styled.div`
  background-color: ${theme.colors.lightGray};
  font-size: 16px;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow-y: hidden;
  position: relative;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const Spoonman = () => {
  const [isSideBoxOpen, setSideBoxOpen] = useState(true);

  return (
    <FullBrowserWindow>
      <Helmet />
      <SpoonmanLanding />
      <ServerCommands isOpen={isSideBoxOpen} />
    </FullBrowserWindow>
  );
};

export default Spoonman;
