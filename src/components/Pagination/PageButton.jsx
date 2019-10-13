import { Link } from 'gatsby';
import React from 'react';
import styled, { css } from 'styled-components';

const StyledLink = styled(Link)`
  color: inherit;
  font-weight: bold;
  padding: 0.5em;
`;

const StyledButton = styled.li`
  border-radius: 3px;
  display: inline-block;
  margin: 10px;

  ${props =>
    props.active
      ? css`
          color: ${props => props.theme.pagination.activeText};
          background-color: ${props => props.theme.pagination.activeBack};
        `
      : css`
          color: ${props => props.theme.pagination.defaultText};
        `};

  &:hover {
    color: ${props => props.theme.pagination.activeText};
    background-color: ${props => props.theme.pagination.activeBack};
  }
`;

const PageButton = ({ active, children, link }) => {
  return (
    <StyledButton active={active}>
      <StyledLink to={link}>{children}</StyledLink>
    </StyledButton>
  );
};

export default PageButton;
