(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{271:function(e,t,n){"use strict";n.r(t);n(119);var o=n(70),a=n(0),r=n.n(a),i=n(1),l=n(56),c=n(12),d=(n(91),i.d.div.withConfig({displayName:"RecentPostItem__Container",componentId:"gkgstv-0"})(["padding:0 10px 10px 10px;width:100%;@media all and (min-width:992px){display:",";width:25%;}"],(function(e){return e.display||"inline-block"}))),u=Object(i.d)(c.a).withConfig({displayName:"RecentPostItem__Cover",componentId:"gkgstv-1"})(["background-image:url(",");background-position:50% 50%;background-size:cover;border-radius:10px;display:inline-block;height:100px;margin:0 !important;width:100%;&:hover{text-decoration:underline #fff;}div{background-color:rgba(0,0,0,0.6);border-radius:inherit;color:",";display:flex;flex-direction:column;height:100%;justify-content:flex-end;padding:10px;p{font-weight:bold;}span{font-size:12px;}}@media all and (min-width:992px){height:120px;}"],(function(e){return e.image}),(function(e){return e.theme.recentpostitem.text})),m=function(e){var t=e.data,n=t.node.fields.slug,o=t.node.frontmatter,a=o.cover?o.cover.childImageSharp.fixed.src:"";return r.a.createElement(d,null,r.a.createElement(u,{image:a,to:n},r.a.createElement("div",null,r.a.createElement(l.c,{line:2,text:o.title}),r.a.createElement("span",null,o.date))))},p=i.d.div.withConfig({displayName:"RecentPostList__Container",componentId:"sc-18v43ho-0"})(["#title{color:",";font-weight:bold;margin:0;padding:0 10px 10px 10px;a{color:",";&:hover{text-decoration:underline;}}}"],(function(e){return e.theme.recentpostlist.header}),(function(e){return e.theme.recentpostlist.category})),g=function(e){var t=e.category,n=e.data;return r.a.createElement(p,null,r.a.createElement("div",{id:"title"},'Recent "',r.a.createElement(c.a,{to:"/"+Object(o.pathCase)(t)},t),'" Posts'),n.map((function(e,t){return r.a.createElement(m,{data:e,key:t})})))},s=n(263),h=Object(i.d)(c.a).withConfig({displayName:"TagButton__StyledLink",componentId:"kcaivm-0"})(["margin:5px 10px 5px 0;"]),f=i.d.span.withConfig({displayName:"TagButton__StyledButton",componentId:"kcaivm-1"})(["background-color:",";border-radius:5px;color:",";font-size:15px;padding:5px 10px;&:hover{text-decoration:underline;}"],(function(e){return e.theme.tag.back}),(function(e){return e.theme.tag.text})),x=function(e){var t=e.children,n=e.link;return r.a.createElement(h,{to:"/"+n},r.a.createElement(f,null,t))},b=i.d.div.withConfig({displayName:"TagList__Container",componentId:"sc-11bq4t7-0"})([""]),v=function(e){var t=e.data;return r.a.createElement(b,null,t&&t.map((function(e){return r.a.createElement(x,{key:e,link:"tags/"+e},"#",e)})))},k=n(264);n.d(t,"pageQuery",(function(){return _}));var y=i.d.div.withConfig({displayName:"BlogPost__PostHeader",componentId:"uctslx-0"})(["h1{border:none;color:",";margin-bottom:10px;padding:0;}hr{background-color:",";margin:20px 0 40px 0;}div{color:",";#circle{background-color:",";}}"],(function(e){return e.theme.blogpost.title}),(function(e){return e.theme.blogpost.hr}),(function(e){return e.theme.blogpost.info}),(function(e){return e.theme.blogpost.info})),w=i.d.div.withConfig({displayName:"BlogPost__PostContent",componentId:"uctslx-1"})(["color:",";a{color:",";&:hover{text-decoration:underline;}}.gatsby-highlight{border-radius:10px;margin:24px 0;pre[class*='language-']{padding:10px 15px;}}blockquote{border-left:4px solid ",";color:",";margin-left:0;margin-right:0;padding-left:calc(0.8125rem - 1px);}"],(function(e){return e.theme.blogpost.content.default}),(function(e){return e.theme.blogpost.content.link}),(function(e){return e.theme.blogpost.content.quote}),(function(e){return e.theme.blogpost.content.quote})),E=i.d.div.withConfig({displayName:"BlogPost__PostFooter",componentId:"uctslx-2"})(["margin-top:40px;hr{background-color:",";margin:20px 0;}"],(function(e){return e.theme.blogpost.hr})),_=(t.default=function(e){var t=e.data,n=e.location,a=e.pageContext,i=t.markdownRemark,c=i.frontmatter,d=c.cover,u=c.date,m=c.tags,p=c.title,h=t.site.siteMetadata.title,f=a.category,x=a.recent;return r.a.createElement(k.a,{activeMenu:f,location:n,title:h},r.a.createElement(s.a,{description:i.excerpt,image:!!d&&d.childImageSharp.fluid.src,keywords:m||[],title:p}),r.a.createElement(y,null,r.a.createElement("h1",null,p),r.a.createElement(l.b,{category:f,date:u,link:"/"+Object(o.pathCase)(f)}),r.a.createElement("hr",null)),r.a.createElement(w,null,r.a.createElement("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:i.html}})),r.a.createElement(E,null,r.a.createElement(v,{data:m}),r.a.createElement("hr",null),f&&r.a.createElement(g,{category:f,data:x})))},"2337641143")}}]);
//# sourceMappingURL=component---src-components-templates-blog-post-jsx-cf510cd5b8f9816d3431.js.map