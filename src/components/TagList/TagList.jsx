import React from 'react';
import styled from 'styled-components';

import TagButton from './TagButton';

const Container = styled.div``;

const TagList = ({ data }) => {
  return (
    <Container>
      {data &&
        data.map(node => (
          <TagButton key={node} link={`tags/${node}`}>
            #{node}
          </TagButton>
        ))}
    </Container>
  );
};

export default TagList;
