import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { media } from 'utils';

const HeadingLink = styled(Link)`
  color: inherit;
  display: inline-block;
`;

const Heading = styled.h3`
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 0 10px;
  padding: 0 0 1px 0;

  &.subtitle {
    font-weight: 300;
    margin: 0 0 0 20px;

    :before {
      border: 0.5px solid ${props => props.theme.main.header.text};
      content: '';
      height: 30px;
      left: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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

  ${media.desktop} {
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

const HeadingContainer = styled.div`
  display: inline-block;
  line-height: 0;
`;

const MainHeader = ({ onClick, subTitle, title }) => {
  return (
    <StyledMainHeader>
      <MenuButton onClick={onClick}>
        <i className="fas fa-bars fa-lg" />
      </MenuButton>
      <HeadingContainer>
        <HeadingLink to="/">
          <Heading>{title}</Heading>
        </HeadingLink>
        {subTitle && (
          <div
            css={`
              display: inline-block;
              position: relative;
            `}
          >
            <Heading className="subtitle">{subTitle}</Heading>
          </div>
        )}
      </HeadingContainer>
    </StyledMainHeader>
  );
};

export default MainHeader;
