import { graphql } from 'gatsby';
import React from 'react';

// import styled from 'styled-components';
import SEO from '../SEO';
import TF2ServerQuery from '../TF2ServerQuery';
import Layout from './Layout';

const TF2ServerQueryTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout activeMenu="TF2ServerQuery" location={location} title={siteTitle}>
      <SEO title="TF2 Server Info" />
      <TF2ServerQuery />
    </Layout>
  );
};

export default TF2ServerQueryTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
