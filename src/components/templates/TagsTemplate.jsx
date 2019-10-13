import { graphql } from 'gatsby';
import React from 'react';

import PostList from '../PostList';
import SEO from '../SEO';
import Layout from './Layout';

const TagsTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext;

  return (
    <Layout location={location} title={`Tag: ${tag}`}>
      <div>
        <SEO keywords={[tag]} title={`Tag: ${tag}`} />
        <PostList
          data={data.allMarkdownRemark.edges}
          page={pageContext}
          pageListSize={data.site.siteMetadata.pageListSize}
          path={`/tags/${tag}`}
        />
      </div>
    </Layout>
  );
};

export default TagsTemplate;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $tag: String) {
    site {
      siteMetadata {
        pageListSize
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(format: MARKDOWN)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            category
            tags
            cover {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
