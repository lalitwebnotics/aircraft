(this["webpackJsonpaircraft-upgrade-www"]=this["webpackJsonpaircraft-upgrade-www"]||[]).push([[1],{326:function(e,t,a){"use strict";var n=a(23),i=a.n(n),r=a(41),s=a.n(r),c=a(1),l=a.n(c),o=a(38),u=a(44),h=Object(c.forwardRef)((function(e,t){return l.a.createElement("button",Object.assign({},s()(e,["children"]),{ref:t}),e.children)})),d=Object(c.forwardRef)((function(e,t){var a=e.className,n=e.size,r=e.variant,c=!i()(e.to),d=c?o.a:h,m={};return!c&&i()(e.type)&&(m.type="button"),l.a.createElement(d,Object.assign({},s()(e,["children","className"]),m,{className:Object(u.a)("Button","btn",r?"btn-"+r:"",n?"btn-"+n:"",a),ref:t}),e.children)}));t.a=d},331:function(e,t,a){"use strict";var n=a(10),i=a(11),r=a(45),s=a(33),c=a(32),l=a(37),o=a.n(l),u=a(1),h=a.n(u),d=a(44),m=a(12),p=(a(351),a(52)),f=function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,s=new Array(i),c=0;c<i;c++)s[c]=arguments[c];return e=t.call.apply(t,[this].concat(s)),Object(m.a)(Object(r.a)(e),["toggle"]),e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,n=e.disabled,i=e.icon,r=void 0===i?"fa-check":i,s=e.size,c=e.value;return h.a.createElement("label",{className:Object(d.a)("Checkbox",a,{active:c,disabled:n},s?"checkbox-"+s:""),onClick:this.toggle},h.a.createElement("span",{className:"tick"},h.a.createElement(p.a,{value:r})),t?h.a.createElement("span",{className:"caption"},t):"")}},{key:"toggle",value:function(){var e=this.props,t=e.onToggle,a=e.productId;o()(this.props.onChange)&&this.props.onChange({target:{name:this.props.name,type:"checkbox",value:!this.props.value}}),void 0!==t&&o()(t)&&this.props.onToggle(a)}}]),a}(u.Component);t.a=f},351:function(e,t,a){},354:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var n=a(10),i=a(11),r=a(45),s=a(33),c=a(32),l=a(37),o=a.n(l),u=a(1),h=a.n(u),d=a(44),m=a(12),p=a(23),f=a.n(p),v=a(94),g=a.n(v),b=(a(361),function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,s=new Array(i),c=0;c<i;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).busy=!1,e.popup=Object(u.createRef)(),e.state={active:!1,show:!1},Object(m.a)(Object(r.a)(e),["activate","deactivate","hide","show"]),e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,n=e.disabled,i=e.trigger,r=this.state,s=r.active,c=r.show;return h.a.createElement(h.a.Fragment,null,i(g()(this,["show"])),c?h.a.createElement("div",{className:Object(d.a)("Popup",a,{active:s,disabled:n}),ref:this.popup,onClick:this.hide},h.a.createElement("div",{className:"popup-content",onClick:Object(m.e)(this.props.onClick)},t(g()(this,["hide"])))):"")}},{key:"componentDidMount",value:function(){if(f()(this.props.trigger))throw new Error("Trigger prop must be provided")}},{key:"componentDidUpdate",value:function(e,t){var a=t.show;this.state.show&&this.state.show!==a&&setTimeout(this.activate,50)}},{key:"activate",value:function(){var e=this;this.setState({active:!0}),Object(m.k)(this.popup.current,"transitionend").then((function(){e.busy=!1,o()(e.props.onShow)&&e.props.onShow()}))}},{key:"deactivate",value:function(){this.setState({active:!1})}},{key:"hide",value:function(){for(var e=this,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return this.busy||this.props.disabled?Promise.reject("Popup is busy or disabled"):(this.busy=!0,this.deactivate(),Object(m.k)(this.popup.current,"transitionend").then((function(){var t;(e.busy=!1,e.setState({show:!1}),o()(e.props.onHide))&&(t=e.props).onHide.apply(t,a);return e})))}},{key:"show",value:function(){this.busy||this.props.disabled||(this.busy=!0,this.setState({show:!0}))}}]),a}(u.Component)),y=(a(362),a(326)),k=a(355),O=function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,s=new Array(i),c=0;c<i;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={busy:!1},Object(m.a)(Object(r.a)(e),["onConfirm"]),e}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.cancel,n=void 0===a?{}:a,i=t.children,r=t.className,s=t.cancelClick,c=t.content,l=(t.noClose,t.message),o=t.ok,u=void 0===o?{}:o,p=(t.onTailNumberChange,t.onImageSelect,this.state.busy);return h.a.createElement(b,{className:Object(d.a)("Confirm",r),disabled:p,trigger:i},(function(t){var a=t.hide;return h.a.createElement(h.a.Fragment,null,h.a.createElement(k.a,{tag:"p"},l),c||h.a.createElement(h.a.Fragment,null),h.a.createElement("div",{className:Object(d.a)("buttons",{exclusive:!!u.exclusive})},u.exclusive?h.a.createElement(h.a.Fragment,null):h.a.createElement(y.a,{variant:n.variant||"dark-blue",className:"cancel",disabled:p,onClick:s?s(a):a},n.title||"Cancel"),!u.hide&&h.a.createElement(y.a,{variant:u.variant||"empty",className:"ok",disabled:p,onClick:Object(m.b)(e.onConfirm,a)},u.title||"OK")))}))}},{key:"onConfirm",value:function(e,t){var a=this;o()(this.props.onConfirm)&&(this.setState({busy:!0}),Promise.resolve(this.props.onConfirm(t)).catch((function(){return null})).then((function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];a.setState({busy:!1}),!1!==t&&Promise.resolve(e()).catch((function(){return null})).then((function(){o()(t)&&t()}))})))}}]),a}(u.Component)},355:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(54),i=a.n(n),r=a(23),s=a.n(r),c=a(1),l=a.n(c);function o(e){var t=e.children,a=e.className,n=e.tag;if(s()(t))return l.a.createElement(l.a.Fragment,null);if(!i()(t))throw new Error("Content must be a string");var r=n||"div",c=t.replace(/(?:\r\n|\r|\n)/g,"<br />");return l.a.createElement(r,{className:a,dangerouslySetInnerHTML:{__html:c}})}},358:function(e,t,a){"use strict";var n=a(10),i=a(11),r=a(45),s=a(33),c=a(32),l=a(123),o=a.n(l),u=a(37),h=a.n(u),d=a(23),m=a.n(d),p=a(20),f=a.n(p),v=a(1),g=a.n(v),b=a(44),y=a(12),k=a(46),O=a(34),w=(a(365),a(52)),j=a(92),E=function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,s=new Array(i),c=0;c<i;c++)s[c]=arguments[c];return e=t.call.apply(t,[this].concat(s)),Object(y.a)(Object(r.a)(e),["selectItem","toggleDropdown"]),e.ref=Object(v.createRef)(),e.list=Object(v.createRef)(),e.state={active:!1,ref:null,value:null,values:[]},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.busy,n=t.id,i=this.items,r=this.state,s=r.active,c=r.values,l=!c.length,o=null===this.state.value;return g.a.createElement("div",{className:Object(b.a)("Dropdown",{active:s,empty:l,"no-value":o},this.props.className),id:n,ref:this.ref},g.a.createElement("div",{className:"dropdown-select",onClick:Object(y.e)(this.toggleDropdown)},a?g.a.createElement(j.a,null):g.a.createElement(g.a.Fragment,null,g.a.createElement("span",null,this.label),g.a.createElement(w.a,{className:"arrow",value:"fas-caret-down"}))),g.a.createElement("div",{className:Object(b.a)("dropdown-items","position-"+this.position)},g.a.createElement("ul",{ref:this.list},l?g.a.createElement("li",{className:"disabled italic"},g.a.createElement("span",null,this.props.empty||"No items available...")):c.map((function(t){return g.a.createElement("li",{key:t,className:Object(b.a)({active:t===e.state.value}),onClick:Object(y.b)(e.selectItem,t)},g.a.createElement("span",null,i[t]))})))))}},{key:"componentDidMount",value:function(){var e=this;this.setState({values:f()(this.items)}),this.click=Object(k.g)([O.a],(function(){e.toggleDropdown(!1)})),h()(this.props.onInit)&&this.props.onInit({id:this.props.id,toggle:this.toggleDropdown})}},{key:"componentDidUpdate",value:function(e){var t=e.items;o()(this.props.items,t)||this.setState({values:f()(this.items)}),this.props.value!==this.state.value&&this.setState({value:this.props.value}),null!==this.state.value&&m()(this.items[this.state.value])&&this.selectItem(null),this.state.active&&this.scrollSelected()}},{key:"componentWillUnmount",value:function(){this.click.cancel()}},{key:"toggleDropdown",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!this.state.active;e!==this.state.active&&(this.setState({active:e}),e&&h()(this.props.onOpen)&&this.props.onOpen(this.props.id))}},{key:"scrollSelected",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-16;if(this.state.value){var t=this.state.values.indexOf(this.state.value),a=this.list.current.childNodes[t];a&&(this.list.current.scrollTop=a.offsetTop+e)}else this.list.current.scrollTop=0}},{key:"selectItem",value:function(e){this.setState({active:!1,value:e}),e!==this.state.value&&h()(this.props.onChange)&&this.props.onChange({target:{name:this.props.name,type:"dropdown",value:e}})}},{key:"items",get:function(){return this.props.items||{}}},{key:"label",get:function(){var e=this.items[this.state.value];return m()(e)?this.props.placeholder||"Select item":e}},{key:"position",get:function(){return this.props.position||"center"}}]),a}(v.Component);t.a=E},361:function(e,t,a){},362:function(e,t,a){},365:function(e,t,a){},368:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var n=a(0),i=a(10),r=a(11),s=a(45),c=a(33),l=a(32),o=a(1),u=a.n(o),h=a(44),d=a(36),m=a(46),p=a(12),f=a(13),v=a(4),g=a(354),b=(a(377),a(52)),y=(a(326),a(363)),k=(a(27),a(358)),O=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).cancelClick=function(t){return function(){if(e.state.change)return e.resetAircraft();var a=e.state.added;e.setState({aircraft:null,make:null,model:null,year:null,imageUrl:null,tailNumber:null,newImage:null,added:!1},(function(){"function"===typeof e.props.onCancel&&e.props.onCancel(a),t()}))}},e.dropdowns={},e.state={makeList:{},makes:{},modelList:{},models:{},years:{},tailNumber:null,imageUrl:null,newImage:null,makeBusy:!1,modelBusy:!1,added:!1,change:!1},Object(p.a)(Object(s.a)(e),["onConfirm","onSignUp","fetchMakes","fetchModels","resetAircraft","initDropdown","onOpenDropdown","getCancelButton","getContent","onSelectMake","onSelectModel","onSelectYear","getMessage","getOkButton","onTailNumberChange","onImageSelect","removeImage"]),e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.state.aircraft&&this.state.aircraft.aircraft_model&&this.state.aircraft.aircraft_model._id;return u.a.createElement(o.Fragment,null,this.props.loggedOut&&u.a.createElement(g.a,{message:"Register to start tracking the latest updates!",ok:{exclusive:!0,title:"Sign Up",variant:"red"},onConfirm:this.onSignUp},this.props.children),!this.props.loggedOut&&(this.props.withoutAircraft||e)&&u.a.createElement(g.a,{className:"HangarPopup",cancel:this.getCancelButton(),cancelClick:this.cancelClick,content:this.getContent(),message:this.getMessage(),ok:this.getOkButton(),onConfirm:this.onConfirm},this.props.children))}},{key:"componentDidMount",value:function(){this.fetchMakes()}},{key:"componentDidUpdate",value:function(e){var t=this,a=this.props.aircraft||{},n=a.year,i=a.aircraft_model,r=(i=void 0===i?{}:i)._id;!this.props.aircraft||(!e.aircraft||e.aircraft.year==n&&e.aircraft.aircraft_model._id==r)&&e.aircraft||this.setState({aircraft:this.props.aircraft,tailNumber:this.props.aircraft.tailNumber,imageUrl:this.props.aircraft.imageUrl},(function(){var e=t.props.aircraft.aircraft_model.aircraft_make,a=(e=void 0===e?{}:e)._id;t.onSelectMake({target:{value:a}},!0)}))}},{key:"fetchMakes",value:function(){var e=this;this.setState({makeBusy:!0}),v.a.getMakes({limit:1e3}).then((function(t){var a=Object(y.keyBy)(t.results,"_id");e.setState({makeBusy:!1,makes:Object(y.mapValues)(a,"name"),makeList:a})})).catch((function(t){e.setState({makeBusy:!1}),console.error("error while fetching makes hanger popup",t)}))}},{key:"fetchModels",value:function(e,t){var a=this;this.setState({modelBusy:!0,modelList:{},models:{}}),v.a.getModels(e).then((function(e){var n=Object(y.keyBy)(e.results,"_id");a.setState({modelBusy:!1,models:Object(y.mapValues)(n,"name"),modelList:n},(function(){t&&a.onSelectModel({target:{value:t}},!0)}))})).catch((function(e){a.setState({modelBusy:!1}),console.error("error while fetching models hanger popup",e)}))}},{key:"initDropdown",value:function(e){this.dropdowns[e.id]=e}},{key:"onOpenDropdown",value:function(e){var t=this;Object(y.keys)(this.dropdowns).forEach((function(a){a!==e&&t.dropdowns[a].toggle(!1)}))}},{key:"getCancelButton",value:function(){return{title:this.state.change?"Reset":this.state.added?this.props.isHanger?"Back to Hanger":"Return to Search":"Cancel",variant:this.state.change?"light-blue":"empty"}}},{key:"getContent",value:function(){var e=this;if(!this.state.change&&!this.state.aircraft)return u.a.createElement("div",{className:Object(h.a)("selected-aircraft",{added:this.state.added})},u.a.createElement("span",{className:"link",onClick:function(){return e.setState({change:!0})}},"Select Aircraft"));var t=[];this.state.aircraft&&(t.push(this.state.aircraft.aircraft_model.aircraft_make.name),t.push(this.state.aircraft.aircraft_model.name),this.state.aircraft.year&&t.unshift(this.state.aircraft.year));var a=this.state,n=a.make,i=a.makes,r=a.model,s=a.models,c=a.year,l=a.years,o=a.makeBusy,d=a.modelBusy;return this.state.change?u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"hanger-input-row"},u.a.createElement("div",{className:"input"},u.a.createElement(k.a,{busy:o,className:"dropdown-make",empty:"No makes available...",id:"dropdown-make",items:i,onChange:this.onSelectMake,onInit:Object(p.b)(this.initDropdown),onOpen:Object(p.b)(this.onOpenDropdown),placeholder:"Select a manufacturer",position:"left",value:n})),u.a.createElement("div",{className:"input"},u.a.createElement(k.a,{busy:d,className:"dropdown-model",empty:"No models available...",id:"dropdown-model",items:s,onChange:this.onSelectModel,onInit:Object(p.b)(this.initDropdown),onOpen:Object(p.b)(this.onOpenDropdown),placeholder:"Model",value:r})),u.a.createElement("div",{className:"input"},u.a.createElement(k.a,{className:"dropdown-year",empty:"No years available...",id:"dropdown-year",items:l,onChange:this.onSelectYear,onInit:Object(p.b)(this.initDropdown),onOpen:Object(p.b)(this.onOpenDropdown),placeholder:"Year",position:"right",value:c})))):u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:Object(h.a)("selected-aircraft",{added:this.state.added})},u.a.createElement("span",null,t.join(" ")),this.state.added?u.a.createElement(b.a,{value:"fa-check"}):u.a.createElement("span",{className:"link",onClick:function(){return e.setState({change:!0})}},"Change")),u.a.createElement("div",{className:"hanger-input-col"},u.a.createElement("div",{className:"input"},u.a.createElement("span",{className:"input-label"},"Aircraft Tail Number(Optional)"),u.a.createElement("input",{type:"text",disabled:this.state.added,value:this.state.tailNumber,placeholder:"Please Enter tail Number",onChange:this.onTailNumberChange})),u.a.createElement("div",{className:"input"},u.a.createElement("span",{className:"input-label"},"Upload Picture of Your Aircraft"),(this.state.newImage||this.state.imageUrl)&&u.a.createElement("img",{src:this.state.newImage&&this.state.newImage instanceof File?window.URL.createObjectURL(this.state.newImage):this.state.imageUrl,alt:"aircraft-image"}),u.a.createElement("input",{id:"aircraft-image",type:"file",accept:"image/*",disabled:this.state.added,onChange:this.onImageSelect}),u.a.createElement("div",{className:"file-btns"},u.a.createElement("label",{htmlFor:"aircraft-image"},this.state.newImage||this.state.imageUrl?"Replace":"Add"," Picture"),(this.state.newImage||this.state.imageUrl)&&u.a.createElement("label",{onClick:this.removeImage},"Remove Picture")))))}},{key:"onSelectMake",value:function(e){var t=e.target.value,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.state.aircraft,i=n||{},r=i.year,s=void 0===r?null:r,c=i.aircraft_model,l=(c=void 0===c?{}:c)._id,o=void 0===l?null:l;this.setState({make:t,model:a?o:null,year:a?s:null}),this.fetchModels({aircraft_make:t,limit:1e3},o)}},{key:"onSelectModel",value:function(e){var t=e.target.value,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.state,i=n.aircraft,r=n.modelList,s=void 0===r?{}:r,c=i||{},l=c.year,o=void 0===l?null:l;this.setState({model:t,year:a?o:null,years:Object(y.fromPairs)(((s[t]||{}).years||[]).map((function(e){return[e,e]})))})}},{key:"onSelectYear",value:function(e){var t=e.target.value;this.setState({year:t})}},{key:"onTailNumberChange",value:function(e){var t=e.target.value;this.setState({tailNumber:t})}},{key:"onImageSelect",value:function(e){var t=e.target.files;t.length&&this.setState({newImage:t[0]})}},{key:"removeImage",value:function(){var e=document.getElementById("aircraft-image");e&&(e.value=""),this.setState({newImage:null,imageUrl:null})}},{key:"getMessage",value:function(){return this.state.added?"Your aircraft has been added to the hangar, and will begin populating products compatible products.":"Are you sure you want to add this plane to your hangar to start tracking related FAA-Approved products?"}},{key:"getOkButton",value:function(){return{title:this.state.change?"Update Aircraft":this.state.added?"Go to Hangar":"Add to Hangar",variant:"dark-blue",hide:this.props.isHanger&&this.state.added}}},{key:"resetAircraft",value:function(){var e=this,t=this.props.aircraft,a=t||{},n=a.year,i=void 0===n?null:n,r=a.aircraft_model,s=(r=void 0===r?{}:r)._id,c=void 0===s?null:s,l=r.aircraft_make,o=(l=void 0===l?{}:l)._id,u=void 0===o?null:o;this.setState({aircraft:t,make:u,model:c,year:i,change:!1},(function(){u&&e.onSelectMake({target:{value:u}})}))}},{key:"onConfirm",value:function(){var e=this;if(this.state.change){var t=this.state,a=t.model,i=t.year,r=t.modelList;return this.setState({aircraft:Object(n.a)({aircraft_model:Object(n.a)({_id:a},r[a])},i?{year:i}:{}),change:!1}),!1}return this.state.added?function(){Object(d.d)("/hangar")}:Object(m.h)(Object(f.p)(Object(n.a)(Object(n.a)({aircraft_model:this.state.aircraft.aircraft_model._id},this.state.aircraft.year?{year:this.state.aircraft.year}:{}),{},{tailNumber:this.state.tailNumber,imageUrl:this.state.imageUrl,newImage:this.state.newImage}))).then((function(){return e.setState({added:!0}),!1}))}},{key:"onUpdate",value:function(){var e=this;if(this.state.change){var t=this.state,a=t.model,i=t.year,r=t.modelList;return this.setState({aircraft:Object(n.a)({aircraft_model:Object(n.a)({_id:a},r[a])},i?{year:i}:{}),change:!1}),!1}return this.state.added?function(){Object(d.d)("/hangar")}:Object(m.h)(Object(f.x)(Object(n.a)(Object(n.a)({aircraft_model:this.state.aircraft.aircraft_model._id},this.state.aircraft.year?{year:this.state.aircraft.year}:{}),{},{tailNumber:this.state.tailNumber,imageUrl:this.state.imageUrl,newImage:this.state.newImage}))).then((function(){return e.setState({added:!0}),!1}))}},{key:"onSignUp",value:function(){return function(){Object(d.d)("/register")}}}]),a}(o.Component)},377:function(e,t,a){}}]);
//# sourceMappingURL=1.03b1cb37.chunk.js.map