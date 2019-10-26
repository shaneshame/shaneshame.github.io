import { graphql } from 'gatsby';
import React from 'react';

import PostList from '../PostList';
import SEO from '../SEO';
import Layout from './Layout';

const BlogIndex = ({ data, location, pageContext }) => {
  const { pageListSize, title } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout isArticle location={location} title={title}>
      <SEO keywords={[`blog`, `gatsby`, `javascript`, `react`]} title="Main" />
      <PostList
        data={posts}
        pageContext={pageContext}
        pageListSize={pageListSize}
        path="/"
      />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        pageListSize
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(format: MARKDOWN)
          fields {
            category
            slug
          }
          frontmatter {
            cover {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`;
