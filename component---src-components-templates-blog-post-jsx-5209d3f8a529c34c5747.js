(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{340:function(e,t,n){"use strict";n.r(t);n(202);var o=n(0),a=n.n(o),r=n(1),i=n(134),l=n(18),c=n(44),d=(n(133),n(6)),u=r.d.div.withConfig({displayName:"RecentPostItem__Container",componentId:"gkgstv-0"})(["padding:0 10px 10px 10px;width:100%;","{display:",";width:25%;}"],d.media.desktop,(function(e){return e.display||"inline-block"})),m=Object(r.d)(l.a).withConfig({displayName:"RecentPostItem__Cover",componentId:"gkgstv-1"})(["background-image:url(",");background-position:50% 50%;background-size:cover;border-radius:10px;display:inline-block;height:100px;margin:0 !important;width:100%;&:hover{text-decoration:underline #fff;}div{background-color:rgba(0,0,0,0.6);border-radius:inherit;color:",";display:flex;flex-direction:column;height:100%;justify-content:flex-end;padding:10px;p{font-weight:bold;}span{font-size:12px;}}","{height:120px;}"],(function(e){return e.image}),(function(e){return e.theme.recentpostitem.text}),d.media.desktop),p=r.d.p.withConfig({displayName:"RecentPostItem___StyledP",componentId:"gkgstv-2"})(["margin:0;"]),g=function(e){var t=e.data,n=t.node.fields.slug,o=t.node.frontmatter,r=o.cover,i=o.date,l=o.title,c=r?r.childImageSharp.fixed.src:"";return a.a.createElement(u,null,a.a.createElement(m,{image:c,to:n},a.a.createElement("div",null,a.a.createElement(p,null,l),a.a.createElement("span",null,i))))},s=r.d.div.withConfig({displayName:"RecentPostList__Container",componentId:"sc-18v43ho-0"})(["#title{color:",";font-weight:bold;margin:0;padding:0 10px 10px 10px;a{color:",";&:hover{text-decoration:underline;}}}"],(function(e){return e.theme.recentpostlist.header}),(function(e){return e.theme.recentpostlist.category})),h=function(e){var t=e.category,n=e.data;return a.a.createElement(s,null,a.a.createElement("div",{id:"title"},'Recent "',a.a.createElement(l.a,{to:"/"+Object(c.pathCase)(t)},t),'" Posts'),n.map((function(e,t){return a.a.createElement(g,{data:e,key:t})})))},f=n(332),x=Object(r.d)(l.a).withConfig({displayName:"TagButton__StyledLink",componentId:"kcaivm-0"})([""]),b=r.d.span.withConfig({displayName:"TagButton__StyledButton",componentId:"kcaivm-1"})(["background-color:",";border-radius:5px;color:",";display:inline-block;font-size:15px;margin:0 5px 5px 0;padding:5px 10px;&:hover{text-decoration:underline;}"],(function(e){return e.theme.tag.back}),(function(e){return e.theme.tag.text})),k=function(e){var t=e.children,n=e.link;return a.a.createElement(x,{to:"/"+n},a.a.createElement(b,null,t))},v=r.d.div.withConfig({displayName:"TagList__Container",componentId:"sc-11bq4t7-0"})([""]),y=function(e){var t=e.data;return a.a.createElement(v,null,t&&t.map((function(e){return a.a.createElement(k,{key:e,link:"tags/"+e},"#",e)})))},E=n(333);n.d(t,"pageQuery",(function(){return I}));var w=r.d.div.withConfig({displayName:"BlogPost__PostHeader",componentId:"uctslx-0"})(["h1{border:none;color:",";margin-bottom:10px;margin-top:0;padding:0;}hr{background-color:",";margin:20px 0 40px 0;}div{color:",";#circle{background-color:",";}}"],(function(e){return e.theme.blogpost.title}),(function(e){return e.theme.blogpost.hr}),(function(e){return e.theme.blogpost.info}),(function(e){return e.theme.blogpost.info})),_=r.d.div.withConfig({displayName:"BlogPost__PostContent",componentId:"uctslx-1"})(["color:",";a{color:",";&:hover{text-decoration:underline;}}.gatsby-highlight{border-radius:10px;margin:24px 0;pre[class*='language-']{padding:10px 15px;}}blockquote{border-left:4px solid ",";color:",";margin-left:0;margin-right:0;padding-left:calc(0.8125rem - 1px);}"],(function(e){return e.theme.blogpost.content.default}),(function(e){return e.theme.blogpost.content.link}),(function(e){return e.theme.blogpost.content.quote}),(function(e){return e.theme.blogpost.content.quote})),C=r.d.div.withConfig({displayName:"BlogPost__PostFooter",componentId:"uctslx-2"})(["margin-top:40px;hr{background-color:",";margin:20px 0;}"],(function(e){return e.theme.blogpost.hr})),I=(t.default=function(e){var t=e.data,n=e.location,o=e.pageContext,r=t.markdownRemark,l=r.frontmatter,c=l.cover,d=l.date,u=l.tags,m=l.title,p=t.site.siteMetadata.title,g=o.category,s=o.recent;return a.a.createElement(E.a,{activeMenu:g,isArticle:!0,location:n,title:p},a.a.createElement(f.a,{description:r.excerpt,image:!!c&&c.childImageSharp.fluid.src,keywords:u||[],title:m}),a.a.createElement(w,null,a.a.createElement("h1",null,m),a.a.createElement(i.g,{category:g,date:d,link:!0}),a.a.createElement("hr",null)),a.a.createElement(_,null,a.a.createElement("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:r.html}})),a.a.createElement(C,null,a.a.createElement(y,{data:u}),a.a.createElement("hr",null),g&&a.a.createElement(h,{category:g,data:s})))},"2337641143")}}]);
//# sourceMappingURL=component---src-components-templates-blog-post-jsx-5209d3f8a529c34c5747.js.map