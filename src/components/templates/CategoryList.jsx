import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { get } from 'lodash';
import { pathCase } from 'nodeUtil';
import React from 'react';
import styled from 'styled-components';

import PostList from '../PostList';
import SEO from '../SEO';
import Layout from './Layout';

const HeaderImage = styled(Image)`
  margin: 0 auto;
  width: 240px;
`;

const CategoryList = ({ location, pageContext, data }) => {
  const { category } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const headerImagePath = get(data, 'file.childImageSharp.fluid');

  return (
    <Layout
      activeMenu={category}
      isArticle
      location={location}
      subTitle={category}
      title={siteTitle}
    >
      <div>
        <SEO keywords={[category]} title={category} />
        {headerImagePath && <HeaderImage fluid={headerImagePath} />}
        <PostList
          data={data.allMarkdownRemark.edges}
          pageContext={pageContext}
          pageListSize={data.site.siteMetadata.pageListSize}
          path={`/${pathCase(category)}`}
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
        title
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
