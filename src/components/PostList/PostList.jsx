import React from 'react';

import Pagination from '../Pagination';
import PostListItem from './PostListItem';

const PostList = ({ data, pageContext, pageListSize, path }) => {
  return (
    <React.Fragment>
      {data.map(
        ({ node }) =>
          console.log('node', node) || (
            <PostListItem
              category={node.fields.category}
              key={node.fields.slug}
              node={node}
            />
          )
      )}
      {pageContext && (
        <Pagination
          listSize={pageListSize}
          pageContext={pageContext}
          path={path}
        />
      )}
    </React.Fragment>
  );
};

export default PostList;
