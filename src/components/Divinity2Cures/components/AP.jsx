import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import APImage from '../data/images/AP.png';

const Img = styled.img`
  margin: 0;
  padding: 0;
`;

const AP = () => {
  return <Img alt="Action point icon" src={APImage} />;
};

export default AP;
