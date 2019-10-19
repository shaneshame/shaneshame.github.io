import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import RecentPostItem from './RecentPostItem';

const Container = styled.div`
  #title {
    color: ${props => props.theme.recentpostlist.header};
    font-weight: bold;
    margin: 0;
    padding: 0 10px 10px 10px;

    a {
      color: ${props => props.theme.recentpostlist.category};

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const RecentPostList = ({ category, data }) => {
  return (
    <Container>
      <div id="title">
        Recent "<Link to={`/${category}`}>{category}</Link>" Posts
      </div>
      {data.map((node, index) => (
        <RecentPostItem data={node} key={index} />
      ))}
    </Container>
  );
};

export default RecentPostList;
