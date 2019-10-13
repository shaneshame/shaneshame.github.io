const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { paginate } = require(`gatsby-awesome-pagination`);

const siteConfig = {
  postsPerPage: 5,
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const BlogPost = path.resolve(`./src/components/templates/BlogPost.jsx`);

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                category
                date(formatString: "YYYY-MM-DD")
                cover {
                  childImageSharp {
                    fixed(width: 1000) {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allMarkdownRemark.edges;
    let tags = [];
    let category = [];
    let recentCategoryPosts = {};

    // Create blog posts pages.
    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      const cat = post.node.frontmatter.category;

      // Create tag & category list
      if (post.node.frontmatter.tags) {
        tags = Array.from(new Set([...tags, ...post.node.frontmatter.tags]));
      }

      if (cat) {
        category = Array.from(new Set([...category, ...[cat]]));
      }

      // Create recent category posts
      if (!recentCategoryPosts[cat]) {
        let list = [];

        for (let i = 0; i < posts.length; i++) {
          if (cat === posts[i].node.frontmatter.category) {
            list.push(posts[i]);
            if (list.length === 4) {
              break;
            }
          }
        }

        recentCategoryPosts = {
          ...recentCategoryPosts,
          [cat]: list,
        };
      }

      const recent = recentCategoryPosts[cat];

      createPage({
        component: BlogPost,
        context: {
          next,
          previous,
          recent,
          slug: post.node.fields.slug,
        },
        path: post.node.fields.slug,
      });
    });

    paginate({
      component: path.resolve('./src/components/templates/BlogIndex.jsx'),
      createPage,
      items: posts,
      itemsPerPage: siteConfig.postsPerPage,
      pathPrefix: '/',
    });

    category.forEach(cat => {
      const catEdges = posts.filter(
        ({ node }) =>
          node.frontmatter.category && node.frontmatter.category.includes(cat)
      );
      paginate({
        component: path.resolve('./src/components/templates/CategoryList.jsx'),
        context: {
          category: `${cat}`,
        },
        createPage,
        items: catEdges,
        itemsPerPage: siteConfig.postsPerPage,
        pathPrefix: `/${cat}`,
      });
    });

    tags.forEach(tag => {
      const tagEdges = posts.filter(
        ({ node }) =>
          node.frontmatter.tags && node.frontmatter.tags.includes(tag)
      );
      paginate({
        component: path.resolve('./src/components/templates/TagsTemplate.jsx'),
        context: {
          tag: `${tag}`,
        },
        createPage,
        items: tagEdges,
        itemsPerPage: siteConfig.postsPerPage,
        pathPrefix: `/tags/${tag}`,
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ getNode, node });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

// Replacing '/' would result in empty string which is invalid
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``));

exports.onCreatePage = ({ actions, page }) => {
  const { createPage, deletePage } = actions;
  const oldPage = Object.assign({}, page);
  // Remove trailing slash unless page is /
  page.path = replacePath(page.path);
  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage);
    createPage(page);
  }
};
