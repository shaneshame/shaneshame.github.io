(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"+YR0":function(t,e,n){"use strict";var a=n("q1tI"),i=n.n(a),o=n("WjpJ"),r=n.n(o),c=n("vOnD"),l=n("Wbzz"),u=Object(c.d)(l.a).withConfig({displayName:"PageButton__StyledLink",componentId:"sc-1pookvs-0"})(["color:inherit;font-weight:bold;padding:0.5em;"]),s=c.d.li.withConfig({displayName:"PageButton__StyledButton",componentId:"sc-1pookvs-1"})(["border-radius:3px;display:inline-block;margin:10px;",";&:hover{color:",";background-color:",";}"],(function(t){return t.active?Object(c.c)(["color:",";background-color:",";"],(function(t){return t.theme.pagination.activeText}),(function(t){return t.theme.pagination.activeBack})):Object(c.c)(["color:",";"],(function(t){return t.theme.pagination.defaultText}))}),(function(t){return t.theme.pagination.activeText}),(function(t){return t.theme.pagination.activeBack})),m=function(t){var e=t.active,n=t.children,a=t.className,o=t.link;return i.a.createElement(s,{active:e,className:a},i.a.createElement(u,{to:o},n))},p=Object(c.d)(m).withConfig({displayName:"Pagination__PageButton",componentId:"sc-1ac5fmy-0"})(["visibility:",";"],(function(t){return!1===t.visible?"hidden":"visible"})),f=c.d.nav.withConfig({displayName:"Pagination__StyledPagination",componentId:"sc-1ac5fmy-1"})(["margin:1em auto;text-align:center;ul{list-style-type:none;margin:0;padding:0.5em;}"]),d=function(t,e){return e>1?"".concat(t).concat(e):t},g=function(t){var e=t.listSize,n=t.pageContext,a=t.path,o=n.humanPageNumber,c=n.numberOfPages,l=Math.max(1,Math.min(o,c-(e-1))),u=Math.min(l+e-1,c),s=n.previousPagePath||"/",m=n.nextPagePath||"/".concat(n.numberOfPages);return i.a.createElement(f,null,i.a.createElement("ul",null,i.a.createElement(p,{link:s,visible:1!==o},i.a.createElement("i",{className:"fas fa-chevron-left"})),r()(l,u+1).map((function(t){return i.a.createElement(p,{active:t===o,key:t,link:d(a,t)},t)})),i.a.createElement(p,{link:m,visible:o!==c},i.a.createElement("i",{className:"fas fa-chevron-right"}))))},h=n("9eSz"),v=n.n(h),y=n("1Qp6"),b=c.d.div.withConfig({displayName:"PostListItem__PostContainer",componentId:"qckuns-0"})(["display:flex;justify-content:space-between;margin-bottom:40px;"]),x=c.d.div.withConfig({displayName:"PostListItem__TextContents",componentId:"qckuns-1"})(["display:flex;flex-direction:column;margin-right:20px;h2{border-bottom:none;color:",";margin:0;margin-bottom:5px;padding-bottom:0;span{height:100%;}}span:nth-child(2){color:",";}div{color:",";#circle{background-color:",";}}"],(function(t){return t.theme.postlistitem.title}),(function(t){return t.theme.postlistitem.content}),(function(t){return t.theme.postlistitem.info}),(function(t){return t.theme.postlistitem.info})),E=Object(c.d)(v.a).withConfig({displayName:"PostListItem__Thumbnail",componentId:"qckuns-2"})(["border-radius:10px;height:120px;width:120px;"]),k=c.d.p.withConfig({displayName:"PostListItem__Excerpt",componentId:"qckuns-3"})(["color:",";margin:0;"],(function(t){return t.theme.postlistitem.content})),w=function(t){var e=t.category,n=t.node,a=n.frontmatter,o=a.cover,r=a.date,c=a.title,u=n.fields.slug;return i.a.createElement(b,{to:u},i.a.createElement(x,null,i.a.createElement(l.a,{to:u},i.a.createElement("h2",null,c),i.a.createElement(k,null,n.excerpt)),i.a.createElement(y.j,{category:e,date:r,link:!0})),!!o&&i.a.createElement("div",null,i.a.createElement(l.a,{to:u},i.a.createElement(E,{fixed:o.childImageSharp.fixed}))))},C=function(t){var e=t.data,n=t.pageContext,a=t.pageListSize,o=t.path;return i.a.createElement(i.a.Fragment,null,e.map((function(t){var e=t.node;return i.a.createElement(w,{category:e.fields.category,key:e.fields.slug,node:e})})),n&&i.a.createElement(g,{listSize:a,pageContext:n,path:o}))};e.a=C},BAQI:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",(function(){return l}));var a=n("q1tI"),i=n.n(a),o=n("+YR0"),r=n("hYuR"),c=n("OFdL");e.default=function(t){var e=t.location,n=t.pageContext,a=t.data,l=n.tag,u=a.site.siteMetadata,s=u.pageListSize,m=u.title;return i.a.createElement(c.a,{isArticle:!0,location:e,subTitle:"#".concat(l),title:m},i.a.createElement("div",null,i.a.createElement(r.a,{keywords:[l],title:"Tag: ".concat(l)}),i.a.createElement(o.a,{data:a.allMarkdownRemark.edges,pageContext:n,pageListSize:s,path:"/tags/".concat(l)})))};var l="1130339359"},HLqC:function(t,e,n){var a=n("R5Y4"),i=n("mv/X"),o=n("ZCgT");t.exports=function(t){return function(e,n,r){return r&&"number"!=typeof r&&i(e,n,r)&&(n=r=void 0),e=o(e),void 0===n?(n=e,e=0):n=o(n),r=void 0===r?e<n?1:-1:o(r),a(e,n,r,t)}}},MMmD:function(t,e,n){var a=n("lSCD"),i=n("shjB");t.exports=function(t){return null!=t&&i(t.length)&&!a(t)}},R5Y4:function(t,e){var n=Math.ceil,a=Math.max;t.exports=function(t,e,i,o){for(var r=-1,c=a(n((e-t)/(i||1)),0),l=Array(c);c--;)l[o?c:++r]=t,t+=i;return l}},WjpJ:function(t,e,n){var a=n("HLqC")();t.exports=a},ZCgT:function(t,e,n){var a=n("tLB3");t.exports=function(t){return t?(t=a(t))===1/0||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0}},"mv/X":function(t,e,n){var a=n("ljhN"),i=n("MMmD"),o=n("wJg7"),r=n("GoyQ");t.exports=function(t,e,n){if(!r(n))return!1;var c=typeof e;return!!("number"==c?i(n)&&o(e,n.length):"string"==c&&e in n)&&a(n[e],t)}},shjB:function(t,e){t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},tLB3:function(t,e,n){n("pIFo");var a=n("GoyQ"),i=n("/9aa"),o=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(i(t))return NaN;if(a(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=a(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(o,"");var n=c.test(t);return n||l.test(t)?u(t.slice(2),n?2:8):r.test(t)?NaN:+t}},wJg7:function(t,e){var n=/^(?:0|[1-9]\d*)$/;t.exports=function(t,e){var a=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==a||"symbol"!=a&&n.test(t))&&t>-1&&t%1==0&&t<e}}}]);
//# sourceMappingURL=component---src-components-templates-tags-template-jsx-a5c45eee3bb52becde84.js.map