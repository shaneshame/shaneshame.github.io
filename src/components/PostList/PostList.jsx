import React from 'react';

import Pagination from '../Pagination';
import PostListItem from './PostListItem';

const PostList = ({ data, page, pageListSize, path }) => {
  return (
    <React.Fragment>
      {data.map(({ node }) => (
        <PostListItem key={node.fields.slug} node={node} />
      ))}
      {page && <Pagination listSize={pageListSize} page={page} path={path} />}
    </React.Fragment>
  );
};

export default PostList;
