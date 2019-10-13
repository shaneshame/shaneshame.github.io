import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

const SEO = ({ description, lang, meta, keywords, title, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            lang
            description
            defaultKeywords
            defaultMetaImage
            authorNickName
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaImage =
    site.siteMetadata.siteUrl + (image || site.siteMetadata.defaultMetaImage);
  const metaLang = site.siteMetadata.lang || 'en';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        // HTML
        {
          content: metaDescription,
          name: `description`,
        },
        // Google
        {
          content: title,
          itemprop: `name`,
        },
        {
          content: metaDescription,
          itemprop: `description`,
        },
        {
          content: metaImage,
          itemprop: `image`,
        },
        // Facebook
        {
          content: `website`,
          property: `og:type`,
        },
        {
          content: title,
          property: `og:title`,
        },
        {
          content: metaDescription,
          property: `og:description`,
        },
        {
          content: metaImage,
          property: `og:image`,
        },
        // Twitter
        {
          content: `summary`,
          name: `twitter:card`,
        },
        {
          content: title,
          name: `twitter:title`,
        },
        {
          content: metaDescription,
          name: `twitter:description`,
        },
        {
          content: metaImage,
          name: `twitter:image`,
        },
        {
          content: site.siteMetadata.authorNickName,
          name: `twitter:creator`,
        },
        {
          content:
            keywords.length > 0
              ? site.siteMetadata.defaultKeywords.concat(keywords.join(`, `))
              : site.siteMetadata.defaultKeywords,
          name: `keywords`,
        },
      ].concat(meta)}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <html lang={metaLang} />
    </Helmet>
  );
};

SEO.defaultProps = {
  description: ``,
  keywords: [],
  lang: `en`,
  meta: [],
};

export default SEO;
