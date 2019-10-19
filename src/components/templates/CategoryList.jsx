import { graphql } from 'gatsby';
import React from 'react';

import { sentenceCase } from '../../utils';
import PostList from '../PostList';
import SEO from '../SEO';
import Layout from './Layout';

const CategoryList = ({ location, pageContext, data }) => {
  console.log('CategoryList');
  console.log('pageContext', pageContext);
  console.log('data', data);
  const category = 'Test';

  return (
    <Layout
      activeMenu={category}
      location={location}
      title={`Category: ${category}`}
    >
      <div>
        <SEO keywords={[category]} title={sentenceCase(category)} />
        <PostList
          data={data.allMarkdownRemark.edges}
          page={pageContext}
          pageListSize={data.site.siteMetadata.pageListSize}
          path={`/${category}`}
        />
      </div>
    </Layout>
  );
};

export default CategoryList;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $category: String!) {
    site {
      siteMetadata {
        pageListSize
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: $category } } }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          fields {
            category
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
