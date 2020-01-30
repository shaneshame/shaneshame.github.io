import { graphql } from 'gatsby';
import React from 'react';

// import styled from 'styled-components';
import SEO from '../SEO';
import TF2ServerInfo from '../TF2ServerInfo';
import Layout from './Layout';

const TF2ServerInfoTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout activeMenu="TF2ServerInfo" location={location} title={siteTitle}>
      <SEO title="TF2 Server Info" />
      <TF2ServerInfo />
    </Layout>
  );
};

export default TF2ServerInfoTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
