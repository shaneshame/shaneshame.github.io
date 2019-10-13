import React from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  -webkit-box-orient: vertical;
  color: inherit;
  display: -webkit-box;
  height: ${props => props.line * 24 || 24}px;
  -webkit-line-clamp: ${props => props.line || 1};
  line-height: 24px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;

export const TextEllipsis = ({ color, line, text }) => {
  return (
    <StyledText color={color} line={line}>
      {text}
    </StyledText>
  );
};

export default TextEllipsis;
