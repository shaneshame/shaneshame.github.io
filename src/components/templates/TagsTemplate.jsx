import { graphql } from 'gatsby';
import React from 'react';

import PostList from '../PostList';
import SEO from '../SEO';
import Layout from './Layout';

const TagsTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext;
  const { pageListSize, title } = data.site.siteMetadata;

  return (
    <Layout location={location} subTitle={`#${tag}`} title={title}>
      <div>
        <SEO keywords={[tag]} title={`Tag: ${tag}`} />
        <PostList
          data={data.allMarkdownRemark.edges}
          pageContext={pageContext}
          pageListSize={pageListSize}
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
        title
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
