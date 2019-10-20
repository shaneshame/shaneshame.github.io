import React, { useState } from 'react';
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from 'styled-components';

import darkTheme from '../../themes/dark';
import lightTheme from '../../themes/light';
import { MainContent, MainHeader } from '../Main';
import { SideContent, SideHeader } from '../SideBar';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    a {
      text-decoration: none;

      &:hover {
          text-decoration: none;
      }
    }
  }

  html, body {
      background-color: ${props => props.theme.main.defaultBack};
      overflow: auto;

      ${props =>
        props.mobileOpen &&
        css`
          height: 100%;
          overflow: hidden;
          position: fixed;
          width: 100%;
        `}
          
      div[role='group'] {
          -webkit-overflow-scrolling: touch;
      }
  }
`;

const SideBar = styled.div`
  background-color: ${props => props.theme.side.defaultBack};
  color: ${props => props.theme.side.defaultText} !important;
  height: 100%;
  left: 0;
  margin-left: ${props => (props.mobileOpen ? 0 : '-280px')};
  min-width: 280px;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  transition: margin 0.5s;
  z-index: 3;

  @media all and (min-width: 992px) {
    min-width: 280px;
    margin-left: 0 !important;
  }
`;

const Main = styled.div`
  color: ${props => props.theme.main.defaultText} !important;
  margin-left: 0;
  margin-top: 50px;

  @media all and (min-width: 992px) {
    margin-left: 280px !important;
    margin-top: 0;
  }
`;

const MainOverlay = styled.div`
  background-color: ${props => props.theme.main.overlayBack};
  height: 100%;
  left: 0;
  opacity: 0.8;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  @media all and (min-width: 992px) {
    display: none;
  }
`;

const Layout = ({ activeMenu, children, title }) => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const isDarkMode = false;

  const handleToggleSide = () => {
    setMobileOpen(!isMobileOpen);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle mobileOpen={isMobileOpen} />
      <SideBar mobileOpen={isMobileOpen}>
        <SideHeader />
        <SideContent activeMenu={activeMenu} />
      </SideBar>
      <Main>
        {isMobileOpen && <MainOverlay onClick={handleToggleSide} />}
        <MainHeader onClick={handleToggleSide} title={title} />
        <MainContent>{children}</MainContent>
      </Main>
    </ThemeProvider>
  );
};

export default Layout;
