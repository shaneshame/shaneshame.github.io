import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const HeadingLink = styled(Link)`
  color: inherit;
`;

const Heading = styled.h3`
  margin: 0 0 0 10px;
  padding: 0 0 1px 0;

  &.subtitle {
    :before {
      border: 0.5px solid ${props => props.theme.main.header.text};
      content: '';
      height: 100%;
      margin-right: 10px;
      position: relative;
    }
  }
`;

const StyledMainHeader = styled.header`
  align-items: center;
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

const MainHeader = ({ onClick, subTitle, title }) => {
  return (
    <StyledMainHeader>
      <MenuButton onClick={onClick}>
        <i className="fas fa-bars fa-lg" />
      </MenuButton>
      <HeadingLink to="/">
        <Heading>{title}</Heading>
      </HeadingLink>
      {subTitle && (
        <div
          css={`
            position: relative;
          `}
        >
          <Heading className="subtitle">{subTitle}</Heading>
        </div>
      )}
    </StyledMainHeader>
  );
};

export default MainHeader;
