(this["webpackJsonpaircraft-upgrade-www"]=this["webpackJsonpaircraft-upgrade-www"]||[]).push([[7],{327:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var r=a(164),n=a.n(r),c=a(14),i=a.n(c),l=a(54),s=a.n(l),u=a(1),o=a.n(u),f=a(44),m=a(12),h=(a(332),a(52));function d(e){var t=e.children,a=e.className,r=e.icon,c=void 0===r?"fas-exclamation-circle":r,l=e.position,u=void 0===l?"bottom-left":l,d=e.variant,p=void 0===d?"red":d,v=e.wrap,b=void 0===v?[]:v;if(!t||i()(t)&&!t.length)return o.a.createElement(o.a.Fragment,null);var g=s()(t)?t:t[0]||t,O=n()(g,"response.data.error.message")||n()(g,"message")||g;return s()(O)||(O=Object(m.d)(O)),O?o.a.createElement("span",{className:Object(f.a)("Alert",a,"alert-"+u,"alert-"+p)},o.a.createElement(h.a,{value:c}),o.a.createElement("span",null,b[0]?b[0]:o.a.createElement(o.a.Fragment,null),O,b[1]?b[1]:o.a.createElement(o.a.Fragment,null))):o.a.createElement(o.a.Fragment,null)}},329:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var r=a(53),n=a.n(r),c=a(41),i=a.n(c),l=a(1),s=a.n(l),u=a(44),o=(a(330),a(327)),f=a(52);function m(e){var t=e.children,a=e.className,r=e.errors,c=e.icon,l=e.type,m=void 0===l?"text":l,h=e.placeholderLabel,d=e.value,p=n()(d),v=h?e.placeholder:e.label,b=i()(e,["children","className","errors","placeholderLabel","reference"]);return s.a.createElement("label",{className:Object(u.a)("Text",a,"type-"+m,{empty:p,"placeholder-label":h})},v?s.a.createElement("span",{className:"label"},v):"",c?s.a.createElement(f.a,{value:c}):"",s.a.createElement("input",Object.assign({type:m},b,{onChange:e.onChange,ref:e.reference})),t,s.a.createElement(o.a,{wrap:["(",")"]},r))}},330:function(e,t,a){},331:function(e,t,a){"use strict";var r=a(10),n=a(11),c=a(45),i=a(33),l=a(32),s=a(37),u=a.n(s),o=a(1),f=a.n(o),m=a(44),h=a(12),d=(a(351),a(52)),p=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i)),Object(h.a)(Object(c.a)(e),["toggle"]),e}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,r=e.disabled,n=e.icon,c=void 0===n?"fa-check":n,i=e.size,l=e.value;return f.a.createElement("label",{className:Object(m.a)("Checkbox",a,{active:l,disabled:r},i?"checkbox-"+i:""),onClick:this.toggle},f.a.createElement("span",{className:"tick"},f.a.createElement(d.a,{value:c})),t?f.a.createElement("span",{className:"caption"},t):"")}},{key:"toggle",value:function(){var e=this.props,t=e.onToggle,a=e.productId;u()(this.props.onChange)&&this.props.onChange({target:{name:this.props.name,type:"checkbox",value:!this.props.value}}),void 0!==t&&u()(t)&&this.props.onToggle(a)}}]),a}(o.Component);t.a=p},332:function(e,t,a){},333:function(e,t,a){var r=a(334),n=a(335),c=a(338),i=RegExp("['\u2019]","g");e.exports=function(e){return function(t){return r(c(n(t).replace(i,"")),e,"")}}},334:function(e,t){e.exports=function(e,t,a,r){var n=-1,c=null==e?0:e.length;for(r&&c&&(a=e[++n]);++n<c;)a=t(a,e[n],n,e);return a}},335:function(e,t,a){var r=a(336),n=a(93),c=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,i=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=n(e))&&e.replace(c,r).replace(i,"")}},336:function(e,t,a){var r=a(337)({"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i","\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S","\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n","\u017f":"s"});e.exports=r},337:function(e,t){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},338:function(e,t,a){var r=a(339),n=a(340),c=a(93),i=a(341);e.exports=function(e,t,a){return e=c(e),void 0===(t=a?void 0:t)?n(e)?i(e):r(e):e.match(t)||[]}},339:function(e,t){var a=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(a)||[]}},340:function(e,t){var a=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return a.test(e)}},341:function(e,t){var a="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",r="["+a+"]",n="\\d+",c="[\\u2700-\\u27bf]",i="[a-z\\xdf-\\xf6\\xf8-\\xff]",l="[^\\ud800-\\udfff"+a+n+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",s="(?:\\ud83c[\\udde6-\\uddff]){2}",u="[\\ud800-\\udbff][\\udc00-\\udfff]",o="[A-Z\\xc0-\\xd6\\xd8-\\xde]",f="(?:"+i+"|"+l+")",m="(?:"+o+"|"+l+")",h="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",d="[\\ufe0e\\ufe0f]?"+h+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",s,u].join("|")+")[\\ufe0e\\ufe0f]?"+h+")*"),p="(?:"+[c,s,u].join("|")+")"+d,v=RegExp([o+"?"+i+"+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?="+[r,o,"$"].join("|")+")",m+"+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?="+[r,o+f,"$"].join("|")+")",o+"?"+f+"+(?:['\u2019](?:d|ll|m|re|s|t|ve))?",o+"+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?","\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",n,p].join("|"),"g");e.exports=function(e){return e.match(v)||[]}},342:function(e,t,a){"use strict";a.d(t,"a",(function(){return S}));var r=a(10),n=a(11),c=a(45),i=a(33),l=a(32),s=a(37),u=a.n(s),o=a(23),f=a.n(o),m=a(20),h=a.n(m),d=a(94),p=a.n(d),v=a(1),b=a.n(v),g=a(44),O=a(12),j=a(46),y=a(34),E=(a(343),a(52)),k=a(92),S=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i)),Object(O.a)(Object(c.a)(e),["hide","onSelect","show","toggle"]),e.overlay=b.a.createRef(),e.selected=b.a.createRef(),e.state={active:!1},e}return Object(n.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.busy,r=t.children,n=t.className,c=t.data,i=void 0===c?{}:c,l=t.disabled,s=t.item,o=t.selected,f=t.title,m=this.state.active,d=this.hide,p=this.show,v=this.toggle;return b.a.createElement("span",{className:Object(g.a)("Selector",n,{active:m,disabled:l}),onClick:Object(O.e)(p)},u()(r)?r({hide:d,show:p,toggle:v}):b.a.createElement(E.a,{value:"fas-caret-down"}),b.a.createElement("div",{className:"selector-overlay",ref:this.overlay},a?b.a.createElement(k.a,null):b.a.createElement("ul",null,h()(i).map((function(t){var a=t===o,r=u()(s)?s(i[t],t):i[t];return b.a.createElement("li",Object.assign({key:t,className:Object(g.a)({active:a}),title:u()(f)?f(i[t]):r},a?{ref:e.selected}:{},{onClick:Object(O.e)(e.onSelect,t)}),r)})))))}},{key:"componentDidMount",value:function(){this.click=Object(j.g)([y.a],this.hide),f()(this.props.reference)||(this.props.reference.current=this.getReference())}},{key:"componentDidUpdate",value:function(e,t){this.props.reference!==e.reference&&(this.props.reference.current=this.getReference()),this.state.active&&(this.props.selected&&this.selected.current?this.overlay.current.scrollTop=this.selected.current.offsetTop-10:this.state.active!==t.active&&(this.overlay.current.scrollTop=0))}},{key:"componentWillUnmount",value:function(){this.click.cancel(),f()(this.props.reference)||(this.props.reference.current=null)}},{key:"getReference",value:function(){return p()(this,["hide","show"])}},{key:"hide",value:function(){this.setState({active:!1}),u()(this.props.onHide)&&this.props.onHide()}},{key:"onSelect",value:function(e){u()(this.props.onSelect)&&this.props.onSelect(this.props.data[e],e),this.hide()}},{key:"show",value:function(){this.props.disabled||(this.setState({active:!0}),u()(this.props.onShow)&&this.props.onShow())}},{key:"toggle",value:function(){return this[this.state.active?"hide":"show"]()}}]),a}(v.Component)},343:function(e,t,a){},345:function(e,t){e.exports=function(e){for(var t=-1,a=null==e?0:e.length,r={};++t<a;){var n=e[t];r[n[0]]=n[1]}return r}},351:function(e,t,a){},356:function(e,t,a){"use strict";var r=a(10),n=a(11),c=a(33),i=a(32),l=a(1),s=a.n(l),u=(a(357),function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return s.a.createElement("a",{href:this.props.link||"".concat(window.location.origin,"/advertisement"),target:"_blank",className:"Advertisement"},s.a.createElement("img",{src:this.props.url,alt:""}))}}]),a}(l.Component));t.a=u},357:function(e,t,a){},358:function(e,t,a){"use strict";var r=a(10),n=a(11),c=a(45),i=a(33),l=a(32),s=a(123),u=a.n(s),o=a(37),f=a.n(o),m=a(23),h=a.n(m),d=a(20),p=a.n(d),v=a(1),b=a.n(v),g=a(44),O=a(12),j=a(46),y=a(34),E=(a(365),a(52)),k=a(92),S=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i)),Object(O.a)(Object(c.a)(e),["selectItem","toggleDropdown"]),e.ref=Object(v.createRef)(),e.list=Object(v.createRef)(),e.state={active:!1,ref:null,value:null,values:[]},e}return Object(n.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.busy,r=t.id,n=this.items,c=this.state,i=c.active,l=c.values,s=!l.length,u=null===this.state.value;return b.a.createElement("div",{className:Object(g.a)("Dropdown",{active:i,empty:s,"no-value":u},this.props.className),id:r,ref:this.ref},b.a.createElement("div",{className:"dropdown-select",onClick:Object(O.e)(this.toggleDropdown)},a?b.a.createElement(k.a,null):b.a.createElement(b.a.Fragment,null,b.a.createElement("span",null,this.label),b.a.createElement(E.a,{className:"arrow",value:"fas-caret-down"}))),b.a.createElement("div",{className:Object(g.a)("dropdown-items","position-"+this.position)},b.a.createElement("ul",{ref:this.list},s?b.a.createElement("li",{className:"disabled italic"},b.a.createElement("span",null,this.props.empty||"No items available...")):l.map((function(t){return b.a.createElement("li",{key:t,className:Object(g.a)({active:t===e.state.value}),onClick:Object(O.b)(e.selectItem,t)},b.a.createElement("span",null,n[t]))})))))}},{key:"componentDidMount",value:function(){var e=this;this.setState({values:p()(this.items)}),this.click=Object(j.g)([y.a],(function(){e.toggleDropdown(!1)})),f()(this.props.onInit)&&this.props.onInit({id:this.props.id,toggle:this.toggleDropdown})}},{key:"componentDidUpdate",value:function(e){var t=e.items;u()(this.props.items,t)||this.setState({values:p()(this.items)}),this.props.value!==this.state.value&&this.setState({value:this.props.value}),null!==this.state.value&&h()(this.items[this.state.value])&&this.selectItem(null),this.state.active&&this.scrollSelected()}},{key:"componentWillUnmount",value:function(){this.click.cancel()}},{key:"toggleDropdown",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!this.state.active;e!==this.state.active&&(this.setState({active:e}),e&&f()(this.props.onOpen)&&this.props.onOpen(this.props.id))}},{key:"scrollSelected",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-16;if(this.state.value){var t=this.state.values.indexOf(this.state.value),a=this.list.current.childNodes[t];a&&(this.list.current.scrollTop=a.offsetTop+e)}else this.list.current.scrollTop=0}},{key:"selectItem",value:function(e){this.setState({active:!1,value:e}),e!==this.state.value&&f()(this.props.onChange)&&this.props.onChange({target:{name:this.props.name,type:"dropdown",value:e}})}},{key:"items",get:function(){return this.props.items||{}}},{key:"label",get:function(){var e=this.items[this.state.value];return h()(e)?this.props.placeholder||"Select item":e}},{key:"position",get:function(){return this.props.position||"center"}}]),a}(v.Component);t.a=S},364:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(71);function n(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(r.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,c,i=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,c=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw c}}}}},365:function(e,t,a){},384:function(e,t,a){},385:function(e,t,a){},386:function(e,t,a){var r=a(333)((function(e,t,a){return e+(a?"-":"")+t.toLowerCase()}));e.exports=r},387:function(e,t,a){},388:function(e,t,a){},389:function(e,t,a){e.exports=a.p+"static/media/SERP_ad_1.e28d21dd.png"},390:function(e,t,a){e.exports=a.p+"static/media/SERP_ad_2.3ef0fcd5.png"},421:function(e,t,a){"use strict";a.r(t);var r=a(10),n=a(11),c=a(45),i=a(33),l=a(32),s=a(1),u=a.n(s),o=a(27),f=a(44),m=a(12),h=a(36),d=a(34),p=(a(384),a(3)),v=a(18),b=a(0),g=a(69),O=a(345),j=a.n(O),y=a(53),E=a.n(y),k=a(37),S=a.n(k),w=a(20),x=a.n(w),N=a(94),C=a.n(N),A=a(87),F=a.n(A),R=a(38),M=a(364),T=a(331),I=(a(358),a(125)),D=["STC","TSO","PMA","TCCA","EASA","No-STC"],_=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state={selected:!1,selectedCode:[]},Object(m.a)(Object(c.a)(e),["toggleSelect","getDerivedStateFromProps"]),e}return Object(n.a)(a,[{key:"componentDidUpdate",value:function(e,t,a){this.props.certificateRemove&&e.certificateRemove!==this.props.certificateRemove&&(this.toggleSelect({target:{value:null}},this.props.certificateRemove),this.props.dispatch(Object(d.d)()))}},{key:"render",value:function(){var e,t=this.props,a=(t.label,t.sectionClass),r=t.counts,n=void 0===r?{}:r,c=this.state,i=(c.selected,c.selectedCode),l=[],s=Object(M.a)(D.entries());try{for(s.s();!(e=s.n()).done;){var o=Object(g.a)(e.value,2),m=o[0],h=o[1];l.push(u.a.createElement(T.a,{key:m,name:h,className:"certificateCheckbox",icon:"fa-check",value:-1!=i.indexOf(h),size:"md",onChange:this.toggleSelect},h,"(",n[h]||0,")"))}}catch(d){s.e(d)}finally{s.f()}return u.a.createElement("div",{className:Object(f.a)(a,"home-categories-filters")},l)}},{key:"toggleSelect",value:function(e,t){var a=this.state.selectedCode,r=t||e.target.name;e.target.value?a.push(r):a&&a.includes(r)&&a.splice(a.indexOf(r),1),this.setState({selectedCode:a}),S()(this.props.onSelectCertificate)&&this.props.onSelectCertificate(a.length?a.join(","):"")}}]),a}(s.Component),U=Object(I.a)((function(e){return{certificateRemove:e.app.certificateRemove}}))(_),H=a(13),z=a(43),L=(a(385),a(386)),Z=a.n(L),G=(a(387),a(52)),J=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state={active:[]},Object(m.a)(Object(c.a)(e),["toggle"]),e}return Object(n.a)(a,[{key:"render",value:function(){var e=this,t=this.props.children,a=this.state.active,r=t(),n=x()(r);return u.a.createElement("div",{className:"Accordion"},u.a.createElement("ul",null,n.map((function(t){return u.a.createElement("li",{key:t,className:Object(f.a)("accordion-item",Z()("item-"+t),{active:a.indexOf(t)>=0})},u.a.createElement("div",{className:"accordion-title",onClick:Object(m.b)(e.toggle,t)},u.a.createElement("span",null,r[t].title),u.a.createElement(G.a,{value:"fa-chevron-down"})),u.a.createElement("div",{className:"accordion-content"},e.getItem(r[t])))}))))}},{key:"getItem",value:function(e){var t=e.render;return S()(t)?t():t}},{key:"toggle",value:function(e){var t=this.state.active.indexOf(e),a=t<0;a&&t<0?this.setState({active:[].concat(Object(p.a)(this.state.active),[e])}):!a&&t>=0&&this.setState({active:[].concat(Object(p.a)(this.state.active.slice(0,t)),Object(p.a)(this.state.active.slice(t+1)))})}}]),a}(s.Component),P=a(356),B=(a(388),function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).radio=Object(s.createRef)(),e.state={checked:!1,ready:!1},Object(m.a)(Object(c.a)(e),["onChange"]),e}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.name,r=e.value,n=this.state.checked,c=this.onChange;return u.a.createElement("label",{className:Object(f.a)("Radio",{checked:n})},u.a.createElement("span",{className:"tick"}),t?u.a.createElement("span",{className:"caption"},t):"",u.a.createElement("span",{className:"wrap"},u.a.createElement("input",{name:a,onChange:c,type:"radio",value:r,ref:this.radio})))}},{key:"componentDidUpdate",value:function(){var e=this.state.ready;if(!e&&this.radio.current&&this.setState({ready:!0}),e){var t=this.props,a=t.selected===t.value;a!==this.state.checked&&this.setState({checked:a})}}},{key:"onChange",value:function(e){e.target.checked&&S()(this.props.onSelect)&&this.props.onSelect(e)}}]),a}(s.Component)),W=a(342),Y=a(329),V=(a(4),a(363),a(389)),$=a.n(V),K=a(390),q=a.n(K);function Q(){return{active:!1,make:{value:null,ref:Object(s.createRef)()},model:{value:null,ref:Object(s.createRef)()},year:{value:"",ref:Object(s.createRef)()}}}function X(){return{active:!1,aircraft:{value:null,ref:Object(s.createRef)()}}}function ee(){return{active:!1,manufacturer:{value:null,ref:Object(s.createRef)()}}}var te=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state={filters:{keyword:"",aircraft:"all",aircrafts:[Q()],hangar:[X()],manufacturers:[ee()]},years:{}},Object(m.a)(Object(c.a)(e),["getAircraftMenu","getManufacturerMenu","loadAircraftHangar","loadAircraftMakes","loadAircraftModels","loadManufacturers","onChangeFilter","showSelector","toggleFilters","onSelectCertificate"]),e}return Object(n.a)(a,[{key:"render",value:function(){var e=this,t=this.props.active,a=this.state.filters,r=a.keyword,n=F()(this.props.router.location.pathname,"/").split("/")[0].toLowerCase(),c=["search"].indexOf(n)>=0;return u.a.createElement("div",{className:Object(f.a)("Sidebar",{active:t})},c?u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"keyword"},u.a.createElement(Y.a,{className:"with-border",icon:"fa-search",name:"keyword",placeholder:"Search for a product",value:r,onChange:this.onChangeFilter}),u.a.createElement("span",{className:"toggle",onClick:this.toggleFilters},u.a.createElement(G.a,{value:"fas-sliders-v"}))),u.a.createElement("div",{className:"filters"},u.a.createElement(J,null,(function(){return{aircraft:{title:"Aircraft".concat("multiple"===a.aircraft?"(".concat(a.aircrafts.length-1,")"):""),render:e.getAircraftMenu},manufacturer:{title:"Manufacturer".concat("multiple"===a.manufacturer?"(".concat(a.manufacturers.length-1,")"):""),render:e.getManufacturerMenu},advancedSearch:{title:"Certification".concat(a.certificate?"(".concat(a.certificate.split(",").length,")"):""),render:e.getAdvancedSearchMenu(e)}}})))):"",u.a.createElement("div",{className:Object(f.a)("advertisements",{grow:!c})},c?"":u.a.createElement(P.a,{url:$.a,link:"https://www.aircraftspruce.com/"}),u.a.createElement(P.a,{url:$.a,link:"https://www.aircraftspruce.com/"}),u.a.createElement(P.a,{url:q.a,link:"https://www.aircraftspruce.com/menus/st/manu_gar.html"})))}},{key:"getAdvancedSearchMenu",value:function(e){var t=e.props.productCounts,a=(t=void 0===t?{}:t).data,r=void 0===a?{}:a;return u.a.createElement(U,{onSelectCertificate:e.onSelectCertificate,label:"STC",counts:r})}},{key:"getAircraftMenu",value:function(){var e=this,t=this.props.aircraft,a=t.makes,r=t.models,n=this.state,c=n.filters,i=n.years,l=this.props.auth.user.data,s=this.getRadios("aircraft",["all","multiple","hangar"]),o=Object(g.a)(s,3),f=o[0],h=o[1],d=o[2];return u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement(B,f,"All aircrafts")),u.a.createElement("li",null,u.a.createElement(B,h,"By specific aircrafts"),u.a.createElement("div",{className:"subcontent"},c.aircrafts.map((function(t,n){return u.a.createElement("div",{className:"subcontent-item",key:n},u.a.createElement("div",{className:"item-header"},u.a.createElement(T.a,{value:t.active,className:"fit",onChange:function(a){var r=a.target.value;r&&!t.make.value?e.showSelector(t,"make"):e.setAircraftFilter(n,(function(){return r?{active:r}:null}))}},(t.make.value||{}).name||"Select a brand"),u.a.createElement(W.a,Object.assign({},a,{reference:t.make.ref,item:function(e){return e.name},selected:t.make.value?t.make.value._id:null,onShow:e.loadAircraftMakes,onSelect:function(t){e.setAircraftFilter(n,(function(e){return{active:!0,make:Object(b.a)(Object(b.a)({},e.make),{},{value:t}),model:Object(b.a)(Object(b.a)({},e.model),{},{value:null}),year:Object(b.a)(Object(b.a)({},e.year),{},{value:""})}}))}}))),t.active?u.a.createElement("div",{className:"item-content"},u.a.createElement("div",{className:"sub-item"},u.a.createElement("span",{onClick:Object(m.b)(e.showSelector,t,"model")},(t.model.value||{}).name||"Select a model"),u.a.createElement(W.a,Object.assign({},r,{reference:t.model.ref,item:function(e){return e.name},selected:t.model.value?t.model.value._id:null,onShow:Object(m.b)(e.loadAircraftModels,t.make.value._id),onSelect:function(t){e.setAircraftFilter(n,(function(e){return{model:Object(b.a)(Object(b.a)({},e.model),{},{value:t}),year:Object(b.a)(Object(b.a)({},e.year),{},{value:""})}})),e.setState({years:j()(t.years.map((function(e){return[e,e]})))})}}))),t.model.value?u.a.createElement("div",{className:"sub-item"},u.a.createElement("span",{onClick:Object(m.b)(e.showSelector,t,"year")},t.year.value||"Select a year"),u.a.createElement(W.a,{data:i,reference:t.year.ref,selected:t.year.value,onSelect:function(t){e.setAircraftFilter(n,(function(e){return{year:Object(b.a)(Object(b.a)({},e.year),{},{value:t})}}))}})):u.a.createElement(u.a.Fragment,null)):u.a.createElement(u.a.Fragment,null))})))),l&&l._id&&u.a.createElement("li",null,u.a.createElement(B,d,"By hangar aircraft"),u.a.createElement("div",{className:"subcontent"},c.hangar.map((function(t,a){return u.a.createElement("div",{className:"subcontent-item",key:a},u.a.createElement("div",{className:"item-header"},u.a.createElement(T.a,{value:t.active,className:"fit",onChange:function(r){var n=r.target.value;n&&!t.aircraft.value?e.showSelector(t,"aircraft"):e.setHangarFilter(a,(function(){return n?{active:n}:null}))}},t.aircraft.value?e.getHangarAircraftFullName(t.aircraft.value):"Select aircraft"),u.a.createElement(W.a,Object.assign({},e.props.aircraft.hangar,{reference:t.aircraft.ref,item:e.getHangarAircraftFullName,selected:t.aircraft.value?t.aircraft.value._id:null,onShow:e.loadAircraftHangar,onSelect:function(t){e.setHangarFilter(a,(function(e){return{active:!0,aircraft:Object(b.a)(Object(b.a)({},e.aircraft),{},{value:t})}}))}}))))})),u.a.createElement("div",{className:"subcontent-item"},u.a.createElement(R.a,{to:"/hangar"},"+ Add aircraft to hangar")))))}},{key:"getFunctionMenu",value:function(){return u.a.createElement(u.a.Fragment,null)}},{key:"onSelectCertificate",value:function(e){var t=this;this.setState((function(a){var r={certificate:e};return t.props.dispatch(Object(d.i)(Object(b.a)(Object(b.a)({},a.filters),{},{extend:r}))),{filters:Object(b.a)(Object(b.a)({},a.filters),{},{certificate:e})}}))}},{key:"getHangarAircraftFullName",value:function(e){var t=e.aircraft_model;return t.aircraft_make.name+" "+t.name}},{key:"getManufacturerMenu",value:function(){var e=this,t=this.props.manufacturer.manufacturers,a=this.state.filters,r=this.getRadios("manufacturer",["all","multiple"]),n=Object(g.a)(r,3),c=n[0],i=n[1];n[2];return u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement(B,c,"All manufacturers")),u.a.createElement("li",null,u.a.createElement(B,i,"By specific manufacturer"),u.a.createElement("div",{className:"subcontent"},a.manufacturers.map((function(a,r){return u.a.createElement("div",{className:"subcontent-item",key:r},u.a.createElement("div",{className:"item-header"},u.a.createElement(T.a,{value:a.active,className:"fit",onChange:function(t){var n=t.target.value;n&&!a.value?e.showSelector(a,"manufacturer"):e.setManufacturerFilter(r,(function(){return n?{active:n}:null}))}},(a.manufacturer.value||{}).name||"Select a brand"),u.a.createElement(W.a,Object.assign({},t,{reference:a.ref,item:function(e){return e.name},selected:a.manufacturer.value?a.manufacturer.value._id:null,onShow:e.loadManufacturers,onSelect:function(t){e.setManufacturerFilter(r,(function(e){return{active:!0,manufacturer:Object(b.a)(Object(b.a)({},e.manufacturer),{},{value:t})}}))}}))))})))))}},{key:"getRadios",value:function(e,t){var a=this;return t.map((function(t){return{name:e,onSelect:a.onChangeFilter,selected:a.state.filters[e],value:t}}))}},{key:"loadAircraftHangar",value:function(){!this.props.aircraft.hangar.busy&&E()(this.props.aircraft.hangar.data)&&this.props.dispatch(Object(H.r)({limit:1e3}))}},{key:"loadAircraftMakes",value:function(){!this.props.aircraft.makes.busy&&E()(this.props.aircraft.makes.data)&&this.props.dispatch(Object(H.u)({limit:1e3}))}},{key:"loadManufacturers",value:function(){!this.props.manufacturer.busy&&E()(this.props.manufacturer.data)&&this.props.dispatch(Object(z.f)({limit:1e3}))}},{key:"loadAircraftModels",value:function(e){var t=this.props.aircraft.models.data;(E()(t)||t[x()(t)[0]].aircraft_make._id!==e)&&this.props.dispatch(Object(H.w)({aircraft_make:e,limit:1e3}))}},{key:"onChangeFilter",value:function(e){var t=this,a=e.target,r=a.name,n=a.value;this.setState((function(e){var a,c=Object(v.a)({},r,n);return"keyword"===r&&(a=n),"aircraft"===r&&"all"===n?(e.filters.aircrafts=e.filters.aircrafts.filter((function(e){return!e.active})),e.filters.hangar=e.filters.hangar.filter((function(e){return!e.active}))):"aircraft"===r&&"multiple"===n?e.filters.hangar=e.filters.hangar.filter((function(e){return!e.active})):"aircraft"===r&&"hangar"===n&&(e.filters.aircrafts=e.filters.aircrafts.filter((function(e){return!e.active}))),"manufacturer"===r&&"all"===n&&(e.filters.manufacturers=e.filters.manufacturers.filter((function(e){return!e.active}))),t.props.dispatch(Object(d.i)(Object(b.a)(Object(b.a)(Object(b.a)({},e.filters),c),{},{name:a}))),{filters:Object(b.a)(Object(b.a)({},e.filters),c)}}))}},{key:"setFilter",value:function(e,t,a,r,n){var c=this;this.setState((function(i){var l=S()(t)?t(i.filters[a][e]):t,s=[].concat(Object(p.a)(i.filters[a].slice(0,e)),Object(p.a)(null!==l?[Object(b.a)(Object(b.a)({},i.filters[a][e]),l)]:[]),Object(p.a)(i.filters[a].slice(e+1)));return null!==s[s.length-1][r].value&&s.push(n()),c.props.dispatch(Object(d.i)(Object(b.a)(Object(b.a)({},i.filters),{},Object(v.a)({},a,s)))),{filters:Object(b.a)(Object(b.a)({},i.filters),{},Object(v.a)({},a,s))}}))}},{key:"setAircraftFilter",value:function(e,t){return this.setFilter(e,t,"aircrafts","make",Q)}},{key:"setHangarFilter",value:function(e,t){return this.setFilter(e,t,"hangar","aircraft",X)}},{key:"setManufacturerFilter",value:function(e,t){return this.setFilter(e,t,"manufacturers","manufacturer",ee)}},{key:"showSelector",value:function(e,t){e[t].ref.current&&setTimeout(e[t].ref.current.show)}},{key:"toggleFilters",value:function(){this.props.dispatch(Object(d.j)())}}]),a}(s.Component),ae=Object(o.c)((function(e){var t=e.api,a=t.aircraft,r=t.manufacturer,n=t.product,c=t.user.auth,i=e.app,l=e.router;return{active:i.sidebar.filters,auth:{user:c},productCounts:n.productCountForCertificates,aircraft:C()(a,["hangar","makes","models"]),manufacturer:C()(r,["manufacturers"]),router:l}}))(te),re=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i)),Object(m.a)(Object(c.a)(e),["toggleFilters"]),e}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.disabled;return u.a.createElement("div",{className:"Overview"},u.a.createElement(ae,null),u.a.createElement("div",{className:Object(f.a)("main",{disabled:e})},u.a.createElement("div",{className:"overlay",onClick:this.toggleFilters}),Object(h.f)(this.props.routes)))}},{key:"toggleFilters",value:function(){this.props.dispatch(Object(d.j)())}}]),a}(s.Component);t.default=Object(o.c)((function(e){return{disabled:e.app.sidebar.filters}}))(re)}}]);
//# sourceMappingURL=7.198f36c4.chunk.js.map