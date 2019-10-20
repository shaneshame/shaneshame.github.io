import React from 'react';
import styled from 'styled-components';

const StyledMainContent = styled.section`
  max-width: calc(775px - 110px);
  overflow: auto;
  padding: 20px;

  @media (min-width: 620px) {
    max-width: calc(775px - 50px);
    padding: 20px 50px;
  }

  @media all and (min-width: 992px) {
    max-width: 775px;
    padding: 50px 75px;
  }
`;

const MainContent = ({ children }) => {
  return <StyledMainContent>{children}</StyledMainContent>;
};

export default MainContent;
