import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  margin: 5px 10px 5px 0;
`;

const StyledButton = styled.span`
  background-color: ${props => props.theme.tag.back};
  border-radius: 5px;
  color: ${props => props.theme.tag.text};
  font-size: 15px;
  padding: 5px 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const TagButton = ({ children, link }) => {
  return (
    <StyledLink to={`/${link}`}>
      <StyledButton>{children}</StyledButton>
    </StyledLink>
  );
};

export default TagButton;
