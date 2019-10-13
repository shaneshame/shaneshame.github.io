import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  bottom: 0;
  padding: 15px;
  position: absolute;
`;

const SideFooter = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SideFooter;
