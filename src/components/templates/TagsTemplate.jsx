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
          pageContext={pageContext}
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(format: MARKDOWN)
          frontmatter {
            cover {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date(formatString: "YYYY-MM-DD")
            tags
            title
          }
        }
      }
    }
  }
`;
