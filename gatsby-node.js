const { pathCase, replaceTrailingSlash } = require('./src/utils/nodeUtil');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { paginate } = require(`gatsby-awesome-pagination`);

const CATEGORY_COVER = 'icon.png';

const getSlugParent = slug => {
  const slugParentString = slug.substring(1, slug.length - 1);
  const parentArray = slugParentString.split('/');

  return parentArray[Math.max(parentArray.length - 2, 0)]; // One above slug content
};

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ getNode, node });
    const category = getSlugParent(slug);

    createNodeField({
      name: `slug`,
      node,
      value: pathCase(slug),
    });

    createNodeField({
      name: `category`,
      node,
      value: category,
    });
  }
};

const siteConfig = {
  postsPerPage: 3,
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const markdownNodes = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              category
              slug
            }
            frontmatter {
              title
              tags
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
  `);

  const posts = markdownNodes.data.allMarkdownRemark.edges;
  let tags = [];
  let category = [];
  let recentCategoryPosts = {};

  // Create blog posts pages.
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const cat = post.node.fields.category;

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
        if (cat === posts[i].node.fields.category) {
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
      component: path.resolve(`./src/components/templates/BlogPost.jsx`),
      context: {
        category: `${cat}`,
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
    const catEdges = posts.filter(({ node }) => node.fields.category === cat);
    const catPath = pathCase(cat);
    paginate({
      component: path.resolve('./src/components/templates/CategoryList.jsx'),
      context: {
        category: `${cat}`,
        categoryCover: `${catPath}/${CATEGORY_COVER}`,
      },
      createPage,
      items: catEdges,
      itemsPerPage: siteConfig.postsPerPage,
      pathPrefix: `/${catPath}`,
    });
  });

  tags.forEach(tag => {
    const tagEdges = posts.filter(
      ({ node }) => node.frontmatter.tags && node.frontmatter.tags.includes(tag)
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
};

// Replacing '/' would result in empty string which is invalid

exports.onCreatePage = ({ actions, page }) => {
  const { createPage, deletePage } = actions;
  const oldPage = Object.assign({}, page);
  // Remove trailing slash unless page is /
  page.path = replaceTrailingSlash(page.path);
  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage);
    createPage(page);
  }
};
