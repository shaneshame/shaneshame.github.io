(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{F8Rq:function(o,e,n){"use strict";n.r(e);var t=n("0jh0"),a=n.n(t),r=n("tGry"),i=n.n(r),p=n("iuhU"),s=n("q1tI"),c=n.n(s),d=n("vOnD"),l="#A52A2A",m="##661515",u="#7289DA",f="#677BC4",x="#2F3136",b="#17181a",g="#00B0F4",h="#008000",w="#005900",k="#013301",y="#36393F",C="#FFFFFF",v=d.d.div.withConfig({displayName:"SpoonMOTD__Container",componentId:"s70poe-0"})(["background-color:",";font-family:Tahoma,Geneva,sans-serif;font-size:16px;height:100vh;overflow-y:hidden;position:relative;*,*:before,*:after{box-sizing:border-box;}"],y),_=d.d.div.withConfig({displayName:"SpoonMOTD__InnerBox",componentId:"s70poe-1"})(["background:",";border-radius:10px;box-shadow:20px 20px 47px ",",-20px -20px 47px #474a52;box-sizing:border-box;color:",";height:400px;left:50%;margin:0 auto;padding:1em;position:absolute;width:400px;top:45%;transform:translate(-50%,-50%);*,*:before,*:after{box-sizing:border-box;}"],x,b,h),D=d.d.div.withConfig({displayName:"SpoonMOTD__ContentContainer",componentId:"s70poe-2"})(["position:absolute;text-align:center;left:50%;top:calc(50% - 0.5em);transform:translate(-50%,-50%);"]),O=d.d.h1.withConfig({displayName:"SpoonMOTD__Title",componentId:"s70poe-3"})(["margin:0;padding:0.5em 0 0.5em 0;text-transform:uppercase;span{display:inline-block;transition:transform 0.4s ease;}&:hover{span{filter:FlipH;transform:scaleX(-1);}}"]),T="\n  background-color: ".concat(b,";\n  border: none;\n  color: inherit;\n  font-family: monospace, monospace;\n  font-size: 0.85rem;\n  line-height: 1.625rem;\n  margin-top: .75rem;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  width: 14rem;\n"),F=d.d.input.withConfig({displayName:"SpoonMOTD__CodeInput",componentId:"s70poe-4"})(["",""],T),I=d.d.pre.withConfig({displayName:"SpoonMOTD__Code",componentId:"s70poe-5"})(["",""],T),S=d.d.a.withConfig({displayName:"SpoonMOTD__Link",componentId:"s70poe-6"})(["color:",";display:inline-block;margin:1em 0;text-transform:uppercase;"],g),E=d.d.button.withConfig({displayName:"SpoonMOTD__LinkButton",componentId:"s70poe-7"})(["background-color:",";border:none;border-radius:3px;color:",";cursor:pointer;display:inline-block;font-family:Impact,Charcoal,sans-serif;font-size:23px;letter-spacing:1.5px;margin-top:1em;padding:0.75em 1em;text-decoration:none;text-transform:uppercase;transition:background-color 0.1s ease,box-shadow 0.2s ease;width:8.5em;&:hover{background-color:",";box-shadow:0 12px 12px -6px ",",0 0 6px #474a52;text-decoration:none;}&.success{background-color:",";&:hover{background-color:",";box-shadow:0 12px 12px -6px ",",0 0 6px #474a52;text-decoration:none;}}&.error{background-color:",";&:hover{background-color:",";box-shadow:0 12px 12px -6px ",",0 0 6px #474a52;text-decoration:none;}}"],u,C,f,b,w,k,b,l,m,b),N=function(o){return navigator.permissions.query({name:"clipboard-write"}).then((function(e){if("granted"===e.state||"prompt"===e.state)return function(o){return navigator.clipboard.writeText(o).then((function(){console.log("Text copied to clipboard")}),(function(o){console.error("Could not copy text: ",o)}))}(o)}))};e.default=function(){var o=Object(s.useState)(!0),e=i()(o,2),n=e[0],t=e[1],r=Object(s.useState)(),d=i()(r,2),l=d[0],m=d[1];return Object(s.useEffect)((function(){t(!1)}),[]),c.a.createElement(v,null,c.a.createElement(_,null,c.a.createElement(D,null,c.a.createElement(O,null,"Spoon".split("").map((function(o,e){return c.a.createElement("span",{key:e},o)})),"man"),c.a.createElement(S,{href:"https://paste.ubuntu.com/p/PN94TXyhbw/"},"Don't be an asshole"),c.a.createElement(E,{className:Object(p.a)(a()({},l,!!l)),onClick:function(){N("https://discord.gg/KH866DB").then((function(){m("success")})).catch((function(){m("error")}))}},l?"success"===l?"Link Copied":"Copy Failed":"Join Discord"),n?c.a.createElement(I,null,"https://discord.gg/KH866DB"):c.a.createElement(F,{onClick:function(o){o.target.select()},value:"https://discord.gg/KH866DB"}))))}}}]);
//# sourceMappingURL=component---src-pages-spoon-motd-jsx-5ebf4c6d2f9e9f84e8ee.js.map