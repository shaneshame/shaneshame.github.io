---
title: Hello World
date: '2019-05-01'
tags:
  - helloworld
cover: ./helloworld.png
---

First post.

<!-- endexcerpt -->

Highlight code block.

```css
/* css */
h1 {
  padding: 0;
  margin-bottom: 10px;
  border: none;
}

hr {
  margin: 20px 0 40px 0;
}
```

```js
// javascript
const BlogIndex = ({ data, location, pageContext }) => {
  const { title, pageListSize } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={title}>
      <SEO keywords={[`blog`, `gatsby`, `javascript`, `react`]} title="Main" />
      <PostList
        data={posts}
        pageContext={pageContext}
        pageListSize={pageListSize}
        path="/"
      />
    </Layout>
  );
};
```

![Chinese Salty Egg](./helloworld.png)
