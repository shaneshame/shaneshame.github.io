import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { Circle } from '../common';

const Container = styled.div`
  font-size: ${props => (props.size ? props.size + 'px' : '13px')};

  span {
    vertical-align: middle;
  }

  a {
    color: inherit;
    vertical-align: middle;

    &:hover {
      text-decoration: underline;
    }
  }

  div {
    margin: 0 10px;
  }
`;

const PostInfo = ({ category, date, link, size }) => {
  console.log('PostInfo category', category);
  return (
    <Container size={size}>
      {category && (
        <React.Fragment>
          {link ? (
            <Link to={`/${category}`}>{category}</Link>
          ) : (
            <span>{category}</span>
          )}
          <Circle size={'3'} />
        </React.Fragment>
      )}
      <span>{date}</span>
    </Container>
  );
};

export default PostInfo;
