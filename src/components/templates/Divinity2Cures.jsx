import { graphql } from 'gatsby';
import React from 'react';

import Divinity2Cures from '../Divinity2Cures';
import SEO from '../SEO';
import Layout from './Layout';

const Divinity2CuresTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout
      activeMenu="Divinity2Cures"
      isApp
      location={location}
      title={siteTitle}
    >
      <SEO title="Divinity 2 Cures" />
      <Divinity2Cures />
    </Layout>
  );
};

export default Divinity2CuresTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
