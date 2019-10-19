import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { PostInfo } from '../common';
import RecentPostList from '../RecentPostList';
import SEO from '../SEO';
import TagList from '../TagList';
import Layout from './Layout';

const PostHeader = styled.div`
  h1 {
    border: none;
    color: ${props => props.theme.blogpost.title};
    margin-bottom: 10px;
    padding: 0;
  }

  hr {
    background-color: ${props => props.theme.blogpost.hr};
    margin: 20px 0 40px 0;
  }

  div {
    color: ${props => props.theme.blogpost.info};

    #circle {
      background-color: ${props => props.theme.blogpost.info};
    }
  }
`;

const PostContent = styled.div`
  color: ${props => props.theme.blogpost.content.default};

  a {
    color: ${props => props.theme.blogpost.content.link};

    &:hover {
      text-decoration: underline;
    }
  }

  .gatsby-highlight {
    border-radius: 10px;
    margin: 24px 0;

    pre[class*='language-'] {
      padding: 10px 15px;
    }
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.blogpost.content.quote};
    color: ${props => props.theme.blogpost.content.quote};
    margin-left: 0;
    margin-right: 0;
    padding-left: calc(0.8125rem - 1px);
  }
`;

const PostFooter = styled.div`
  margin-top: 40px;

  hr {
    background-color: ${props => props.theme.blogpost.hr};
    margin: 20px 0;
  }
`;

const BlogPost = ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const { title, date, tags, cover } = post.frontmatter;

  const siteTitle = data.site.siteMetadata.title;

  const { category, recent } = pageContext;

  return (
    <Layout activeMenu={category} location={location} title={siteTitle}>
      <SEO
        description={post.excerpt}
        image={!!cover && cover.childImageSharp.fluid.src}
        keywords={tags || []}
        title={title}
      />
      <PostHeader>
        <h1>{title}</h1>
        <PostInfo category={category} date={date} link />
        <hr />
      </PostHeader>
      <PostContent>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </PostContent>
      <PostFooter>
        <TagList data={tags} />
        <hr />
        {category && <RecentPostList category={category} data={recent} />}
      </PostFooter>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($category: String!, $slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      fields: { category: { eq: $category }, slug: { eq: $slug } }
    ) {
      excerpt(format: MARKDOWN)
      fields {
        category
      }
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        cover {
          childImageSharp {
            fluid(maxWidth: 500) {
              src
            }
          }
        }
        tags
        title
      }
      html
      id
    }
  }
`;
