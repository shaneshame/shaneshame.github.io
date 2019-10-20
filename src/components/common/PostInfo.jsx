import { Link } from 'gatsby';
import { pathCase } from 'nodeUtil';
import React from 'react';
import styled from 'styled-components';

import { Circle } from '../common';

const Container = styled.div`
  font-size: ${props => (props.size ? props.size : 13)}px;

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
  return (
    <Container size={size}>
      {category && (
        <React.Fragment>
          {link ? (
            <Link to={`/${pathCase(category)}`}>{category}</Link>
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
