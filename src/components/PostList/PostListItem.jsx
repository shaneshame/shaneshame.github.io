import { Link } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import { PostInfo, TextEllipsis } from '../common';

const PostLink = styled(Link)`
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
  }

  p:nth-child(2) {
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
  const isCover = !!node.frontmatter.cover;
  const { slug } = node.fields;

  return (
    <PostLink to={slug}>
      <TextContents>
        <h2>
          <TextEllipsis line={1} text={node.frontmatter.title} />
        </h2>
        <TextEllipsis line={2} text={node.excerpt} />
        <PostInfo category={category} date={node.frontmatter.date} />
      </TextContents>
      {isCover && (
        <div>
          <Thumbnail fixed={node.frontmatter.cover.childImageSharp.fixed} />
        </div>
      )}
    </PostLink>
  );
};

export default PostListItem;
