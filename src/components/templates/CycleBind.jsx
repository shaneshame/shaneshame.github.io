import { graphql } from 'gatsby';
import React from 'react';

// import styled from 'styled-components';
import CycleBind from '../CycleBind';
import SEO from '../SEO';
import Layout from './Layout';

const CycleBindTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout activeMenu="CycleBind" location={location} title={siteTitle}>
      <SEO title="Cycle Bind" />
      <CycleBind />
    </Layout>
  );
};

export default CycleBindTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
