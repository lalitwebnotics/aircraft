(this["webpackJsonpaircraft-upgrade-www"]=this["webpackJsonpaircraft-upgrade-www"]||[]).push([[18],{342:function(e,t,n){"use strict";n.d(t,"a",(function(){return w}));var a=n(10),r=n(11),c=n(45),i=n(33),s=n(32),o=n(37),l=n.n(o),u=n(23),h=n.n(u),p=n(20),d=n.n(p),f=n(94),v=n.n(f),m=n(1),y=n.n(m),b=n(44),g=n(12),O=n(46),j=n(34),k=(n(343),n(52)),E=n(92),w=function(e){Object(i.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(a.a)(this,n);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return e=t.call.apply(t,[this].concat(i)),Object(g.a)(Object(c.a)(e),["hide","onSelect","show","toggle"]),e.overlay=y.a.createRef(),e.selected=y.a.createRef(),e.state={active:!1},e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.busy,a=t.children,r=t.className,c=t.data,i=void 0===c?{}:c,s=t.disabled,o=t.item,u=t.selected,h=t.title,p=this.state.active,f=this.hide,v=this.show,m=this.toggle;return y.a.createElement("span",{className:Object(b.a)("Selector",r,{active:p,disabled:s}),onClick:Object(g.e)(v)},l()(a)?a({hide:f,show:v,toggle:m}):y.a.createElement(k.a,{value:"fas-caret-down"}),y.a.createElement("div",{className:"selector-overlay",ref:this.overlay},n?y.a.createElement(E.a,null):y.a.createElement("ul",null,d()(i).map((function(t){var n=t===u,a=l()(o)?o(i[t],t):i[t];return y.a.createElement("li",Object.assign({key:t,className:Object(b.a)({active:n}),title:l()(h)?h(i[t]):a},n?{ref:e.selected}:{},{onClick:Object(g.e)(e.onSelect,t)}),a)})))))}},{key:"componentDidMount",value:function(){this.click=Object(O.g)([j.a],this.hide),h()(this.props.reference)||(this.props.reference.current=this.getReference())}},{key:"componentDidUpdate",value:function(e,t){this.props.reference!==e.reference&&(this.props.reference.current=this.getReference()),this.state.active&&(this.props.selected&&this.selected.current?this.overlay.current.scrollTop=this.selected.current.offsetTop-10:this.state.active!==t.active&&(this.overlay.current.scrollTop=0))}},{key:"componentWillUnmount",value:function(){this.click.cancel(),h()(this.props.reference)||(this.props.reference.current=null)}},{key:"getReference",value:function(){return v()(this,["hide","show"])}},{key:"hide",value:function(){this.setState({active:!1}),l()(this.props.onHide)&&this.props.onHide()}},{key:"onSelect",value:function(e){l()(this.props.onSelect)&&this.props.onSelect(this.props.data[e],e),this.hide()}},{key:"show",value:function(){this.props.disabled||(this.setState({active:!0}),l()(this.props.onShow)&&this.props.onShow())}},{key:"toggle",value:function(){return this[this.state.active?"hide":"show"]()}}]),n}(m.Component)},343:function(e,t,n){},349:function(e,t,n){"use strict";n.d(t,"a",(function(){return R}));var a=n(3),r=n(0),c=n(10),i=n(11),s=n(33),o=n(32),l=n(37),u=n.n(l),h=n(42),p=n.n(h),d=n(54),f=n.n(d),v=n(20),m=n.n(v),y=n(1),b=n.n(y),g=n(38),O=n(44),j=n(46),k=n(12),E=(n(350),n(52)),w=n(92),S=n(342),R=function(e){Object(s.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={keys:[],selected:[]},e}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.busy,c=t.children,i=t.data,s=this.state.selected,o=c(),l=o.head,u=o.row;return b.a.createElement("div",{className:Object(O.a)("Table",{busy:n})},n?b.a.createElement(w.a,null):"",b.a.createElement("table",null,b.a.createElement("thead",null,l&&l({selected:s.length&&s.length===this.state.keys.length,sort:function(t,n){if(f()(t))return e.getSortLink(t,n);if(p()(t)){var a=e.props.route.query;return b.a.createElement(S.a,{className:"sort-selector",data:t,item:function(t,n){return e.getSortLink(n,t)},title:function(e){return e}},(function(e){var r=e.toggle;return b.a.createElement("span",{onClick:Object(k.e)(r)},b.a.createElement("span",null,t[a.sort]||n||"Sort by"),b.a.createElement(E.a,{value:"fa-chevron-"+("desc"===a.order?"up":"down")}))}))}},state:this.state,toggle:function(t){e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{selected:t?e.keys.slice(0):[]})}))}})),b.a.createElement("tbody",null,this.state.keys.map((function(t,n){var r=s.indexOf(t),c=n%2;return i[t]?b.a.createElement(y.Fragment,{key:t},u(i[t],{even:c,index:n,odd:!c,selected:r>=0,toggle:function(n){n&&r<0?e.setState({selected:[].concat(Object(a.a)(s),[t])}):!n&&r>=0&&e.setState({selected:[].concat(Object(a.a)(s.slice(0,r)),Object(a.a)(s.slice(r+1)))})}})):b.a.createElement(y.Fragment,{key:t})})))))}},{key:"componentDidMount",value:function(){var e=this;if(this.props.infinite){var t=this.props.infinite.action;this.action=Object(j.g)([Object(j.d)(t,"COMPLETE")],(function(){e.checkEnd()})),this.unscroll=Object(k.j)((function(){e.props.busy||e.checkEnd()}))}}},{key:"componentDidUpdate",value:function(e){if(this.props.data!==e.data||this.props.direct&&!this.state.keys.length){var t={keys:m()(this.props.data)};this.setState(t)}}},{key:"componentWillUnmount",value:function(){this.action&&(this.action.cancel(),this.unscroll())}},{key:"checkEnd",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:50,t=Object(k.g)(),n=t.height,a=t.position;return a>n-e&&(this.props.infinite&&u()(this.props.infinite.onReachEnd)&&this.props.infinite.onReachEnd(),!0)}},{key:"getSortLink",value:function(e,t){var n=Object(k.l)(this.props.route,e),a=n.active,r=n.icon,c=n.url;return b.a.createElement(g.a,{to:c,className:Object(O.a)("sort",{active:a})},b.a.createElement("span",null,t),b.a.createElement(E.a,{value:"fas-"+r}))}}]),n}(y.Component)},350:function(e,t,n){},412:function(e,t,n){},420:function(e,t,n){"use strict";n.r(t),n.d(t,"sortFields",(function(){return w})),n.d(t,"sortKeys",(function(){return S}));var a=n(0),r=n(10),c=n(11),i=n(45),s=n(33),o=n(32),l=n(122),u=n.n(l),h=n(23),p=n.n(h),d=n(20),f=n.n(d),v=n(1),m=n.n(v),y=n(27),b=n(44),g=n(363),O=n(12),j=n(7),k=n(36),E=(n(412),n(349)),w={created_at:"Alert Date"},S=f()(w),R=function(e){Object(s.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={products:{},toRemove:[]},Object(O.a)(Object(i.a)(e),["reload","onReachEnd","updateList"]),e.infinite={action:j.a,onReachEnd:e.onReachEnd},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props,t=e.alertHistory,n=e.device,a=e.route;u()(["xs","sm"],n),this.state.toRemove;return m.a.createElement("div",{className:"AlertHistory"},m.a.createElement("div",{className:"description"},"Below contains alert history of update sent for tracked products."),m.a.createElement(E.a,Object.assign({},t,{infinite:this.infinite,route:a}),(function(){return{head:function(e){e.selected;var t=e.sort;e.toggle;return m.a.createElement("tr",null,m.a.createElement("th",null,"Product Name"),m.a.createElement("th",null,"Change Type"),S.map((function(e){return m.a.createElement("th",{key:e},t(e,w[e]))})))},row:function(e,t){t.index;var n=t.odd,a=t.selected;t.toggle;return m.a.createElement(m.a.Fragment,null,m.a.createElement("tr",{className:Object(b.a)({odd:n,selected:a})},m.a.createElement("td",null,e.newValues.name),m.a.createElement("td",null,e.productChange?"Price Changes":e?"Rebate Changes":"Details Changes"),m.a.createElement("td",null,new Date(e.created_at).toLocaleString())))}}})))}},{key:"componentDidMount",value:function(){this.reload()}},{key:"componentDidUpdate",value:function(e,t){this.updateList(e,t)}},{key:"updateList",value:function(e,t){var n=p()(e)&&p()(t),a=this.props.route.query;!n&&Object(g.isEqual)(a,e.route.query)||this.props.dispatch(Object(j.z)(a))}},{key:"reload",value:function(){this.props.dispatch(Object(j.z)())}},{key:"onReachEnd",value:function(){var e=Object(g.size)(this.props.alertHistory.data);if(e<this.props.alertHistory.count){var t=this.props.route.query;this.props.dispatch(Object(j.z)(Object(a.a)(Object(a.a)({},t),{},{limit:e+10})))}}}]),n}(v.Component);t.default=Object(y.c)((function(e){var t=e.api.product,n=e.app,a=e.router;return{alertHistory:t.alertHistory,device:n.device,route:Object(k.e)(a)}}))(R)}}]);
//# sourceMappingURL=18.46c608e6.chunk.js.map