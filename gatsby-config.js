require('dotenv').config({
  path: `.env`,
});

/* eslint-disable sort-keys */
const siteConfig = {
  url: 'https://shaneshame.gihub.io',
  title: 'Shane',
  lang: 'en',
  description: 'Shane Shame',
  defaultKeywords: [`blog`, `gatsby`, `javascript`, `react`, `tf2`],
  defaultMetaImage: '/defaultmetaimage.png',

  authorNickName: 'ShaneShame',
  authorFullName: 'Shane Schaefer',
  authorDescription: 'Gamezr',
  photo: 'content/assets/shane.jpg',

  // icon : FontAwesome
  category: [
    {
      id: 'notes',
      icon: 'fa-atlas',
    },
    {
      id: 'rants',
      icon: 'fa-toilet-paper',
    },
  ],

  social: {
    email: 'tf2shane@gmail.com',
    github: 'https://github.com/shaneshame',
  },

  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,

  pageListSize: 5,
};

module.exports = {
  siteMetadata: {
    siteUrl: siteConfig.url,
    title: siteConfig.title,
    lang: siteConfig.lang,
    description: siteConfig.description,
    defaultKeywords: siteConfig.defaultKeywords,
    defaultMetaImage: siteConfig.defaultMetaImage,
    copyright: siteConfig.copyright,
    authorNickName: siteConfig.authorNickName,
    authorFullName: siteConfig.authorFullName,
    authorDescription: siteConfig.authorDescription,
    photo: siteConfig.photo,
    social: siteConfig.social,
    category: siteConfig.category,
    pageListSize: siteConfig.pageListSize,
  },
  plugins: [
    'gatsby-plugin-lodash',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
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
        content: `${__dirname}/content`,
        src: `${__dirname}/src`,
        components: `${__dirname}/src/components`,
        pages: `${__dirname}/src/pages`,
        utils: `${__dirname}/src/utils`,
        themes: `${__dirname}/src/themes`,
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
