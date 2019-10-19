import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { get } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { sentenceCase } from '../../utils';
import PostList from '../PostList';
import SEO from '../SEO';
import Layout from './Layout';

const HeaderImage = styled(Image)`
  margin: 0 auto;
  width: 240px;
`;

const CategoryList = ({ location, pageContext, data }) => {
  const { category } = pageContext;
  const headerImagePath = get(data, 'file.childImageSharp.fluid');

  return (
    <Layout
      activeMenu={category}
      location={location}
      title={`Category: ${category}`}
    >
      <div>
        <SEO keywords={[category]} title={category} />
        {headerImagePath && <HeaderImage fluid={headerImagePath} />}
        <PostList
          data={data.allMarkdownRemark.edges}
          pageContext={pageContext}
          pageListSize={data.site.siteMetadata.pageListSize}
          path={`/${category}`}
        />
      </div>
    </Layout>
  );
};

export default CategoryList;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $category: String!, $categoryCover: String) {
    file(relativePath: { eq: $categoryCover }) {
      childImageSharp {
        fluid(maxWidth: 240) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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
