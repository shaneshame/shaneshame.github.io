import React from 'react';
import styled from 'styled-components';

import SPImage from '../data/images/SP.png';

const Img = styled.img`
  margin: 0;
  padding: 0;
`;

const SP = () => {
  return <Img alt="Action point icon" src={SPImage} />;
};

export default SP;
