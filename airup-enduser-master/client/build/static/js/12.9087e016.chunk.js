(this["webpackJsonpaircraft-upgrade-www"]=this["webpackJsonpaircraft-upgrade-www"]||[]).push([[12],{342:function(e,t,a){"use strict";a.d(t,"a",(function(){return S}));var n=a(10),r=a(11),c=a(45),i=a(33),s=a(32),l=a(37),u=a.n(l),o=a(23),d=a.n(o),f=a(20),h=a.n(f),m=a(94),p=a.n(m),v=a(1),b=a.n(v),k=a(44),g=a(12),y=a(46),E=a(34),O=(a(343),a(52)),j=a(92),S=function(e){Object(i.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return e=t.call.apply(t,[this].concat(i)),Object(g.a)(Object(c.a)(e),["hide","onSelect","show","toggle"]),e.overlay=b.a.createRef(),e.selected=b.a.createRef(),e.state={active:!1},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.busy,n=t.children,r=t.className,c=t.data,i=void 0===c?{}:c,s=t.disabled,l=t.item,o=t.selected,d=t.title,f=this.state.active,m=this.hide,p=this.show,v=this.toggle;return b.a.createElement("span",{className:Object(k.a)("Selector",r,{active:f,disabled:s}),onClick:Object(g.e)(p)},u()(n)?n({hide:m,show:p,toggle:v}):b.a.createElement(O.a,{value:"fas-caret-down"}),b.a.createElement("div",{className:"selector-overlay",ref:this.overlay},a?b.a.createElement(j.a,null):b.a.createElement("ul",null,h()(i).map((function(t){var a=t===o,n=u()(l)?l(i[t],t):i[t];return b.a.createElement("li",Object.assign({key:t,className:Object(k.a)({active:a}),title:u()(d)?d(i[t]):n},a?{ref:e.selected}:{},{onClick:Object(g.e)(e.onSelect,t)}),n)})))))}},{key:"componentDidMount",value:function(){this.click=Object(y.g)([E.a],this.hide),d()(this.props.reference)||(this.props.reference.current=this.getReference())}},{key:"componentDidUpdate",value:function(e,t){this.props.reference!==e.reference&&(this.props.reference.current=this.getReference()),this.state.active&&(this.props.selected&&this.selected.current?this.overlay.current.scrollTop=this.selected.current.offsetTop-10:this.state.active!==t.active&&(this.overlay.current.scrollTop=0))}},{key:"componentWillUnmount",value:function(){this.click.cancel(),d()(this.props.reference)||(this.props.reference.current=null)}},{key:"getReference",value:function(){return p()(this,["hide","show"])}},{key:"hide",value:function(){this.setState({active:!1}),u()(this.props.onHide)&&this.props.onHide()}},{key:"onSelect",value:function(e){u()(this.props.onSelect)&&this.props.onSelect(this.props.data[e],e),this.hide()}},{key:"show",value:function(){this.props.disabled||(this.setState({active:!0}),u()(this.props.onShow)&&this.props.onShow())}},{key:"toggle",value:function(){return this[this.state.active?"hide":"show"]()}}]),a}(v.Component)},343:function(e,t,a){},345:function(e,t){e.exports=function(e){for(var t=-1,a=null==e?0:e.length,n={};++t<a;){var r=e[t];n[r[0]]=r[1]}return n}},349:function(e,t,a){"use strict";a.d(t,"a",(function(){return w}));var n=a(3),r=a(0),c=a(10),i=a(11),s=a(33),l=a(32),u=a(37),o=a.n(u),d=a(42),f=a.n(d),h=a(54),m=a.n(h),p=a(20),v=a.n(p),b=a(1),k=a.n(b),g=a(38),y=a(44),E=a(46),O=a(12),j=(a(350),a(52)),S=a(92),_=a(342),w=function(e){Object(s.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={keys:[],selected:[]},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.busy,c=t.children,i=t.data,s=this.state.selected,l=c(),u=l.head,o=l.row;return k.a.createElement("div",{className:Object(y.a)("Table",{busy:a})},a?k.a.createElement(S.a,null):"",k.a.createElement("table",null,k.a.createElement("thead",null,u&&u({selected:s.length&&s.length===this.state.keys.length,sort:function(t,a){if(m()(t))return e.getSortLink(t,a);if(f()(t)){var n=e.props.route.query;return k.a.createElement(_.a,{className:"sort-selector",data:t,item:function(t,a){return e.getSortLink(a,t)},title:function(e){return e}},(function(e){var r=e.toggle;return k.a.createElement("span",{onClick:Object(O.e)(r)},k.a.createElement("span",null,t[n.sort]||a||"Sort by"),k.a.createElement(j.a,{value:"fa-chevron-"+("desc"===n.order?"up":"down")}))}))}},state:this.state,toggle:function(t){e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{selected:t?e.keys.slice(0):[]})}))}})),k.a.createElement("tbody",null,this.state.keys.map((function(t,a){var r=s.indexOf(t),c=a%2;return i[t]?k.a.createElement(b.Fragment,{key:t},o(i[t],{even:c,index:a,odd:!c,selected:r>=0,toggle:function(a){a&&r<0?e.setState({selected:[].concat(Object(n.a)(s),[t])}):!a&&r>=0&&e.setState({selected:[].concat(Object(n.a)(s.slice(0,r)),Object(n.a)(s.slice(r+1)))})}})):k.a.createElement(b.Fragment,{key:t})})))))}},{key:"componentDidMount",value:function(){var e=this;if(this.props.infinite){var t=this.props.infinite.action;this.action=Object(E.g)([Object(E.d)(t,"COMPLETE")],(function(){e.checkEnd()})),this.unscroll=Object(O.j)((function(){e.props.busy||e.checkEnd()}))}}},{key:"componentDidUpdate",value:function(e){if(this.props.data!==e.data||this.props.direct&&!this.state.keys.length){var t={keys:v()(this.props.data)};this.setState(t)}}},{key:"componentWillUnmount",value:function(){this.action&&(this.action.cancel(),this.unscroll())}},{key:"checkEnd",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:50,t=Object(O.g)(),a=t.height,n=t.position;return n>a-e&&(this.props.infinite&&o()(this.props.infinite.onReachEnd)&&this.props.infinite.onReachEnd(),!0)}},{key:"getSortLink",value:function(e,t){var a=Object(O.l)(this.props.route,e),n=a.active,r=a.icon,c=a.url;return k.a.createElement(g.a,{to:c,className:Object(y.a)("sort",{active:n})},k.a.createElement("span",null,t),k.a.createElement(j.a,{value:"fas-"+r}))}}]),a}(b.Component)},350:function(e,t,a){},356:function(e,t,a){"use strict";var n=a(10),r=a(11),c=a(33),i=a(32),s=a(1),l=a.n(s),u=(a(357),function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement("a",{href:this.props.link||"".concat(window.location.origin,"/advertisement"),target:"_blank",className:"Advertisement"},l.a.createElement("img",{src:this.props.url,alt:""}))}}]),a}(s.Component));t.a=u},357:function(e,t,a){},370:function(e,t,a){"use strict";var n=a(10),r=a(11),c=a(45),i=a(33),s=a(32),l=a(53),u=a.n(l),o=a(1),d=a.n(o),f=a(27),h=a(44),m=a(36),p=a(46),v=a(12),b=a(34),k=a(7),g=(a(371),a(326)),y=a(354),E=a(52),O=function(e){Object(i.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).button=Object(o.createRef)(),e.state={busy:!1,overlay:!1},Object(v.a)(Object(c.a)(e),["onClick","onSignUp","toggle","track"]),e}return Object(r.a)(a,[{key:"render",value:function(){var e=this,t=this.props.variant,a=void 0===t?"dark-blue":t,n=this.state,r=n.busy,c=n.overlay,i=this.isActive();return u()(this.props.auth.data)?d.a.createElement(y.a,{message:"Register to start tracking the latest updates!",ok:{exclusive:!0,title:"Sign Up",variant:"red"},onConfirm:this.onSignUp},(function(t){var n=t.show;return d.a.createElement(g.a,{variant:a,size:"sm",className:"Track",disabled:r||e.props.busy,onClick:n},"Track Updates")})):d.a.createElement(g.a,{variant:i?"empty":a,size:"sm",className:Object(h.a)("Track",{active:i,overlay:c}),disabled:r||this.props.busy,onClick:Object(v.b)(this.onClick),ref:this.button},i?d.a.createElement(d.a.Fragment,null,d.a.createElement(E.a,{value:"fa-check"}),d.a.createElement("span",null,"Tracked in Hangar"),d.a.createElement("div",{className:"untrack-overlay",onClick:Object(v.e)(this.track,!1)},"Untrack Updates"),d.a.createElement(E.a,{value:"fas-caret-down"})):d.a.createElement(d.a.Fragment,null,"Track Updates"))}},{key:"componentDidMount",value:function(){var e=this;this.watch=Object(p.g)([b.a],(function(t){var a=t.payload;Object(v.h)(e.button.current,a.target)||e.toggle(!1)}))}},{key:"componentWillUnmount",value:function(){this.watch.cancel()}},{key:"isActive",value:function(){return this.props.product.updates>0}},{key:"onClick",value:function(){this.isActive()?this.toggle(!0):this.track(!0)}},{key:"onSignUp",value:function(){return Promise.resolve((function(){return Object(m.d)("/register")}))}},{key:"toggle",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!this.state.overlay;this.setState({overlay:e})}},{key:"track",value:function(e,t){var a=this,n=[this.props.product._id];this.setState({busy:!0}),Object(p.h)(Object(k.M)({id:n,track:e})).then((function(){return Object(p.h)(Object(k.L)({id:n}))})).catch((function(){return Promise.resolve()})).then((function(){a.setState({busy:!1})})),!e&&t&&(this.toggle(!1),this.props.dispatch(Object(b.c)(t)))}}]),a}(o.Component);t.a=Object(f.c)((function(e){return{auth:e.api.user.auth}}))(O)},371:function(e,t,a){},396:function(e,t,a){var n=a(124),r=a(64),c=a(55),i=a(54),s=a(397);e.exports=function(e){if(null==e)return 0;if(c(e))return i(e)?s(e):e.length;var t=r(e);return"[object Map]"==t||"[object Set]"==t?e.size:n(e).length}},397:function(e,t,a){var n=a(398),r=a(165),c=a(399);e.exports=function(e){return r(e)?c(e):n(e)}},398:function(e,t,a){var n=a(169)("length");e.exports=n},399:function(e,t){var a="[\\ud800-\\udfff]",n="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",r="\\ud83c[\\udffb-\\udfff]",c="[^\\ud800-\\udfff]",i="(?:\\ud83c[\\udde6-\\uddff]){2}",s="[\\ud800-\\udbff][\\udc00-\\udfff]",l="(?:"+n+"|"+r+")"+"?",u="[\\ufe0e\\ufe0f]?"+l+("(?:\\u200d(?:"+[c,i,s].join("|")+")[\\ufe0e\\ufe0f]?"+l+")*"),o="(?:"+[c+n+"?",n,i,s,a].join("|")+")",d=RegExp(r+"(?="+r+")|"+o+u,"g");e.exports=function(e){for(var t=d.lastIndex=0;d.test(e);)++t;return t}},400:function(e,t,a){},401:function(e,t,a){},402:function(e,t,a){e.exports=a.p+"static/media/SERP _header_banner.538d9dcb.png"},422:function(e,t,a){"use strict";a.r(t),a.d(t,"sortFields",(function(){return ee})),a.d(t,"sortKeys",(function(){return te}));var n=a(22),r=a.n(n);function c(e,t,a,n,r,c,i){try{var s=e[c](i),l=s.value}catch(u){return void a(u)}s.done?t(l):Promise.resolve(l).then(n,r)}var i=a(0),s=a(10),l=a(11),u=a(45),o=a(33),d=a(32),f=a(345),h=a.n(f),m=a(122),p=a.n(m),v=a(53),b=a.n(v),k=a(123),g=a.n(k),y=a(37),E=a.n(y),O=a(23),j=a.n(O),S=a(20),_=a.n(S),w=a(396),C=a.n(w),x=a(1),N=a.n(x),T=a(27),M=a(38),R=a(44),F=a(369),A=a.n(F),U=a(12),D=a(36),B=a(46),L=a(13),q=a(7),P=(a(400),a(356)),Y=(a(401),a(52)),z=a(92);function J(e){var t=e.busy,a=e.links,n=e.children;return N.a.createElement("div",{className:"Breadcrumbs"},t?N.a.createElement(z.a,null):N.a.createElement("ul",null,_()(a).map((function(e){return N.a.createElement("li",{key:e},N.a.createElement(M.a,{to:e},N.a.createElement("span",null,a[e]),N.a.createElement(Y.a,{value:"fa-chevron-right"})))}))),n)}var W=a(326);var H=function(e){var t=e.showOnlySTC,a=e.onStcShowChange,n=e.children;return N.a.createElement(x.Fragment,null,N.a.createElement("label",{className:"switch-button"},N.a.createElement("input",{type:"checkbox",checked:t,onChange:a}),N.a.createElement("span",{className:"slider-button round"})),n)},I=a(331),K=a(368),G=a(349),Q=a(370),V=a(363),X=a(34),Z=a(402),$=a.n(Z),ee={name:"Product Name",manufacturer:"Manufacturer",certificates:"FAA-Approvals",stcMatch:"STC Match",updated_at:"Last Approved"},te=_()(ee),ae=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={breadcrumbs:{busy:!0,links:{}},showOnlySTC:!1,tracking:{}},Object(U.a)(Object(u.a)(e),["onReachEnd","reset","track","manageStcOnlySwitchChange"]),e.infinite={action:q.j,onReachEnd:e.onReachEnd},e}return Object(l.a)(a,[{key:"render",value:function(){var e,t,a=this,n=this.props,r=n.search_filters,c=void 0===r?{}:r,i=n.device,s=n.products,l=n.route,u=n.auth,o=(u=void 0===u?{}:u).user.data,d=n.aircraft.model,f=p()(["xs","sm"],i),h=this.getAircraft(),m=JSON.parse(JSON.stringify(s));return Object.values(m.data).forEach((function(e){var t=!1,a=!1;e.certificates&&e.certificates.length&&e.certificates.forEach((function(n){"STC"===n.ctype&&(e.isStc=!0,d.data&&d.data._id&&d.data.aircraft_make&&d.data.aircraft_make._id&&n.aircraft_makes.includes(d.data.aircraft_make._id)&&(t=!0),d.data._id&&n.aircraft_models.includes(d.data._id)&&(a=!0))})),e.includeSTCMake=t,e.includeSTCModel=a})),this.state.showOnlySTC&&Object.values(m.data).forEach((function(e){e.certificates&&e.certificates.length&&e.certificates.some((function(e){return"STC"===e.ctype}))||delete m.data[e._id]})),N.a.createElement("div",{className:"Search"},N.a.createElement("div",{className:"header"},N.a.createElement(P.a,{url:$.a}),N.a.createElement(J,this.state.breadcrumbs,this.props.search_filters&&(null===(e=this.props.search_filters.extend)||void 0===e?void 0:e.certificate)&&(null===(t=this.props.search_filters.extend)||void 0===t?void 0:t.certificate.split(",").map((function(e){return N.a.createElement(x.Fragment,null,N.a.createElement("span",{className:"tag-block"},e," ",N.a.createElement("span",{onClick:function(){return a.onCertificateRemove(e)},className:"close-tag"},"x")))})))),N.a.createElement(K.a,{aircraft:h,loggedOut:!(o&&o._id)},(function(e){var t=e.show;return N.a.createElement("span",{className:Object(R.a)("add-to-hangar",{disabled:!h}),onClick:t},"+ Add aircraft to hangar")}))),N.a.createElement(G.a,Object.assign({},m,{infinite:this.infinite,route:l}),(function(){return{head:function(e){var t=e.selected,n=e.sort,r=e.state,i=e.toggle,l=!r.selected.length||!b()(a.state.tracking);return N.a.createElement(N.a.Fragment,null,N.a.createElement("tr",null,N.a.createElement("th",null,N.a.createElement(I.a,{icon:"fa-minus",value:t,size:"sm",onChange:Object(U.b)(i,!t)},t?"Deselect":"Select"," All (",C()(s.data),")")),f?N.a.createElement(N.a.Fragment,null):N.a.createElement(N.a.Fragment,null,N.a.createElement("th",{style:{display:"flex",alignItems:"center"},colSpan:"2"},N.a.createElement(W.a,{variant:"dark-blue",size:"sm",className:Object(R.a)("track-multiple"),style:{marginRight:"5px"},disabled:l,onClick:Object(U.b)(a.track,r.selected,Object(U.b)(i,!1))},"Track Selected (",r.selected.length,")"),N.a.createElement("div",{className:"custom-switch"},N.a.createElement(H,{showOnlySTC:r.showOnlySTC,onStcShowChange:a.manageStcOnlySwitchChange},N.a.createElement("span",{style:{marginLeft:"5px"}}," STC Matches Only")))),N.a.createElement("th",null),N.a.createElement("th",null),N.a.createElement("th",null),d&&d.data&&d.data._id&&-1==["multiple","hangar"].indexOf(c.aircraft)&&N.a.createElement("th",null)),N.a.createElement("th",null,f?n(ee):N.a.createElement("span",{className:Object(R.a)("untrack-multiple",{disabled:l}),onClick:Object(U.b)(a.track,r.selected,Object(U.b)(i,!1),!1)},"Untrack selected (",r.selected.length,")"))),f?N.a.createElement(N.a.Fragment,null):N.a.createElement("tr",null,N.a.createElement("th",null),te.map((function(e){return"stcMatch"!==e||d.data._id&&-1==["multiple","hangar"].indexOf(c.aircraft)?N.a.createElement("th",{key:e},n(e,ee[e])):null})),N.a.createElement("th",null)))},row:function(e,t){var n=t.odd,r=t.selected,i=t.toggle,s=e.certificates,u=e.manufacturer,o=e.name,h=e.permalink,m=e.updated_at;e.isStc;return N.a.createElement("tr",{className:Object(R.a)({active:!1,odd:n,selected:r})},N.a.createElement("td",null,N.a.createElement(I.a,{value:r,size:"sm",onChange:Object(U.b)(i,!r)})),N.a.createElement("td",null,N.a.createElement(M.a,{className:"link-product",to:"/products/"+h+Object(U.m)(l.query)},o),f?N.a.createElement(N.a.Fragment,null,N.a.createElement("br",null),N.a.createElement(M.a,{className:"link-manufacturer",to:"/"},u.name),N.a.createElement("br",null),N.a.createElement("span",{className:"text-last-approved"},"Last approved on ",A()(m).format("MMM DD, YYYY")),N.a.createElement("br",null),N.a.createElement(Q.a,{product:e})):N.a.createElement(N.a.Fragment,null)),f?N.a.createElement(N.a.Fragment,null):N.a.createElement(N.a.Fragment,null,N.a.createElement("td",null,N.a.createElement(M.a,{to:"/"},u.name)),N.a.createElement("td",null,s&&s.length?s.map((function(e,t){return N.a.createElement(x.Fragment,{key:t},N.a.createElement("a",{href:"/api/v1/certificates/pdf/".concat(e.permalink),key:t,target:"_blank"},e.name),t<s.length-1&&", ")})):"-"),d&&d.data&&d.data._id&&-1==["multiple","hangar"].indexOf(c.aircraft)&&N.a.createElement("td",null,N.a.createElement("span",{className:e.includeSTCMake?"":"stc-no-match"},d.data.aircraft_make.name," \xa0",e.includeSTCMake?N.a.createElement("span",null,"\u2713"):"?"," \xa0 \xa0"),N.a.createElement("span",{className:e.includeSTCModel?"":"stc-no-match"},d.data.name," \xa0",e.includeSTCModel?N.a.createElement("span",null,"\u2713"):"?"," \xa0 \xa0")),N.a.createElement("td",null,A()(m).format("MMM DD, YYYY")),N.a.createElement("td",null,N.a.createElement(Q.a,{busy:a.state.tracking[e._id],product:e}))))}}})))}},{key:"componentDidMount",value:function(){this.manageBreadcrumbs(),this.manageSearch()}},{key:"componentDidUpdate",value:function(e,t){this.manageBreadcrumbs(e,t),this.manageSearch(e,t)}},{key:"componentWillUnmount",value:function(){this.reset()}},{key:"onCertificateRemove",value:function(e){this.props.dispatch(Object(X.h)(e))}},{key:"getAircraft",value:function(){if(!this.props.aircraft.model.count)return null;var e=(this.props.route.query||{}).year;return Object(i.a)({aircraft_model:Object(i.a)({},this.props.aircraft.model.data)},e?{year:e}:{})}},{key:"manageBreadcrumbs",value:function(e,t){var a=j()(e)&&j()(t),n=this.props.dispatch,r=this.props.aircraft,c=r.make,s=r.model,l=this.props.route.query,u=l.year,o={};if(l.aircraft_make&&c&&c.data.permalink&&(o["/search?aircraft_make="+c.data.permalink]=c.data.name),l.aircraft_model&&s&&s.data&&s.data.permalink){var d="/search?aircraft_model="+s.data.permalink;o["/search?aircraft_make="+s.data.aircraft_make.permalink]=s.data.aircraft_make.name,o[d]=s.data.name,l.year&&(o[d+"&year="+u]=l.year)}!a&&e.search_filters&&-1!=["multiple","hangar"].indexOf(this.props.search_filters.aircraft)&&(o={"/search":"Multiple"}),!a&&g()(l,Object(V.pick)(e.route.query,["aircraft_make","aircraft_model"]))||(!l.aircraft_model||s&&(s.busy||s.data&&s.data.permalink)?!l.aircraft_make||c&&(c.busy||c.data&&c.data.permalink)?t&&t.breadcrumbs&&t.breadcrumbs.busy&&this.setState((function(e){var t=e.breadcrumbs;return{breadcrumbs:Object(i.a)(Object(i.a)({},t),{},{busy:!1})}})):(n(Object(L.t)(l.aircraft_make)),this.setBreadcrumbs(),Object(B.f)(L.k)):(n(Object(L.v)(l.aircraft_model)),Object(B.f)(L.f),this.setBreadcrumbs())),a||g()(o,this.state.breadcrumbs.links)&&(c.busy||s.busy||!this.state.breadcrumbs.busy)||this.setState({breadcrumbs:{busy:!1,links:Object(i.a)({},o)}})}},{key:"manageStcOnlySwitchChange",value:function(e){var t=e.target.checked;this.setState({showOnlySTC:t})}},{key:"manageSearch",value:function(e,t){var a=j()(e)&&j()(t),n=this.props.route.query,r=this.props.search_filters,c=[],i=[],s=[];r.manufacturers&&(c=r.manufacturers.filter((function(e){return 1==e.active})).map((function(e){return e.manufacturer.value._id+""})),n.manufacturers=c),r.aircrafts&&(i=r.aircrafts.filter((function(e){return 1==e.active&&e.make.value})).map((function(e){return e.make.value._id+""})),s=r.aircrafts.filter((function(e){return 1==e.active&&e.model.value})).map((function(e){var t=i.indexOf(e.model.value.aircraft_make._id);return-1!=t&&i.splice(t,1),e.model.value._id+""})),n[(Boolean(n.approved)?"approved_":"")+"aircraft_makes"]=i,n[(Boolean(n.approved)?"approved_":"")+"aircraft_models"]=s,-1!=["multiple","hangar"].indexOf(r.aircraft)&&n.aircraft_model&&(i.length||s.length)&&delete n.aircraft_model),r.hangar&&r.hangar.filter((function(e){return e.active})).length&&(s=r.hangar.filter((function(e){return 1==e.active&&e.aircraft.value&&e.aircraft.value.aircraft_model})).map((function(e){return i.push(e.aircraft.value.aircraft_model.aircraft_make._id+""),e.aircraft.value.aircraft_model._id+""})),n.aircraft_models=s),r.extend&&r.extend.certificate&&(n.certificate=r.extend.certificate),r.name&&(n.name=r.name),!a&&g()(n,e.route.query)||(this.props.dispatch(Object(q.E)(n)),this.props.dispatch(Object(q.D)(n)))}},{key:"onReachEnd",value:function(){var e=C()(this.props.products.data);if(e<this.props.products.count){var t=this.props.route.query;this.props.dispatch(Object(q.E)(Object(i.a)(Object(i.a)({},t),{},{limit:e+10})))}}},{key:"reset",value:function(){this.props.dispatch(Object(X.i)([])),Object(B.f)(L.f,L.k,q.j),this.setBreadcrumbs()}},{key:"handleSidebarSearch",value:function(e){}},{key:"setBreadcrumbs",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.setState({breadcrumbs:{busy:b()(e),links:e}})}},{key:"track",value:function(){var e,t=(e=r.a.mark((function e(t,a){var n,c=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!(c.length>2&&void 0!==c[2])||c[2],this.setState({tracking:h()(t.map((function(e){return[e,!0]})))}),e.prev=2,e.next=5,Object(B.h)(Object(q.M)({id:t,track:n}));case 5:return e.next=7,Object(B.h)(Object(q.L)({id:t}));case 7:e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(2),e.next=13,Promise.resolve();case 13:E()(a)&&a(),this.setState({tracking:{}});case 15:case"end":return e.stop()}}),e,this,[[2,9]])})),function(){var t=this,a=arguments;return new Promise((function(n,r){var i=e.apply(t,a);function s(e){c(i,n,r,s,l,"next",e)}function l(e){c(i,n,r,s,l,"throw",e)}s(void 0)}))});return function(e,a){return t.apply(this,arguments)}}()}]),a}(x.Component);t.default=Object(T.c)((function(e){var t=e.api,a=t.aircraft,n=t.product,r=t.user.auth,c=e.app,i=c.device,s=c.search,l=e.router;return{device:i,aircraft:{make:a.make,model:a.model},auth:{user:r},products:n.products,search_filters:s,route:Object(D.e)(l)}}))(ae)}}]);
//# sourceMappingURL=12.9087e016.chunk.js.map