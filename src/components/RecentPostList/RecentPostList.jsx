import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import RecentPostItem from './RecentPostItem';

const PostList = styled.div`
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
    <PostList>
      <div id="title">
        Recent "<Link to={`/${category}`}>{category}</Link>" Posts
      </div>
      {data.map((node, index) => (
        <RecentPostItem data={node} key={index} />
      ))}
    </PostList>
  );
};

export default RecentPostList;
