import React from 'react';
import styled from 'styled-components';

const StyledMainHeader = styled.header`
  background-color: ${props => props.theme.main.header.back};
  color: ${props => props.theme.main.header.text};
  display: flex;
  height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  @media all and (min-width: 992px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;

  i {
    padding: 12px;
    color: ${props => props.theme.main.header.button};
  }
`;

const MainHeader = ({ onClick }) => {
  return (
    <StyledMainHeader>
      <MenuButton onClick={onClick}>
        <i className="fas fa-bars fa-lg" />
      </MenuButton>
    </StyledMainHeader>
  );
};

export default MainHeader;
