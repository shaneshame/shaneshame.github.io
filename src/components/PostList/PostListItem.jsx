import { Link } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import { PostInfo, TextEllipsis } from '../common';

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TextContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  h2 {
    border-bottom: none;
    color: ${props => props.theme.postlistitem.title};
    margin: 0;
    margin-bottom: 5px;
    padding-bottom: 0;

    span {
      height: 100%;
    }
  }

  span:nth-child(2) {
    color: ${props => props.theme.postlistitem.content};
  }

  div {
    color: ${props => props.theme.postlistitem.info};

    #circle {
      background-color: ${props => props.theme.postlistitem.info};
    }
  }
`;

const Thumbnail = styled(Image)`
  border-radius: 10px;
  height: 120px;
  width: 120px;
`;

const PostListItem = ({ category, node }) => {
  const { cover, date, title } = node.frontmatter;
  const { slug } = node.fields;

  return (
    <PostContainer to={slug}>
      <TextContents>
        <Link to={slug}>
          <h2>
            <TextEllipsis line={1} text={title} />
          </h2>
          <TextEllipsis line={2} text={node.excerpt} />
        </Link>
        <PostInfo category={category} date={date} link />
      </TextContents>
      {!!cover && (
        <div>
          <Link to={slug}>
            <Thumbnail fixed={cover.childImageSharp.fixed} />
          </Link>
        </div>
      )}
    </PostContainer>
  );
};

export default PostListItem;
