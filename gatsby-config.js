require('dotenv').config({
  path: `.env`,
});

/* eslint-disable sort-keys */
const siteConfig = {
  url: 'https://shaneshame.gihub.io',
  title: 'Shane Shame',
  lang: 'en',
  description: 'Shane Shame',
  defaultKeywords: [`blog`, `gatsby`, `javascript`, `react`, `tf2`],
  defaultMetaImage: '/defaultmetaimage.png',

  authorNickName: 'ShaneShame',
  authorFullName: 'Shane Schaefer',
  authorDescription: 'Gamezr',
  photo: 'data/assets/shane.jpg',

  social: {
    email: 'tf2shane@gmail.com',
    github: 'https://github.com/shaneshame',
  },

  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,

  pageListSize: 1,
};

module.exports = {
  siteMetadata: {
    authorDescription: siteConfig.authorDescription,
    authorFullName: siteConfig.authorFullName,
    authorNickName: siteConfig.authorNickName,
    copyright: siteConfig.copyright,
    defaultKeywords: siteConfig.defaultKeywords,
    defaultMetaImage: siteConfig.defaultMetaImage,
    description: siteConfig.description,
    lang: siteConfig.lang,
    pageListSize: siteConfig.pageListSize,
    photo: siteConfig.photo,
    siteUrl: siteConfig.url,
    social: siteConfig.social,
    title: siteConfig.title,
  },
  plugins: [
    'gatsby-plugin-lodash',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/assets`,
      },
    },
    `gatsby-remark-copy-linked-files`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- endexcerpt -->`,
        plugins: [
          `gatsby-remark-emoji`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`, // Must come before `gatsby-remark-prismjs`
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        // components: `${__dirname}/src/components`,
        // data: `${__dirname}/data`,
        // pages: `${__dirname}/src/pages`,
        // src: `${__dirname}/src`,
        // themes: `${__dirname}/src/themes`,
        utils: `${__dirname}/src/utils`,
        nodeUtil: `${__dirname}/src/utils/nodeUtil`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: siteConfig.googleAnalyticsId,
        head: true,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
  ],
};
