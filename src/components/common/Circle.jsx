import React from 'react';
import styled from 'styled-components';

const StyledCircle = styled.div`
  background-color: inherit;
  border-radius: 50%;
  display: ${props => props.display || 'inline-block'};
  height: ${props => props.size + 'px'};
  margin: 0px 10px;
  vertical-align: middle;
  width: ${props => props.size + 'px'};
`;

const Circle = ({ display, size }) => {
  return <StyledCircle display={display} id="circle" size={size} />;
};

export default Circle;
