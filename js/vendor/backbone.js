//     Backbone.js 0.9.10
//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org
(function(){var e=this,t=e.Backbone,n=[],r=n.push,i=n.slice,s=n.splice,o;typeof exports!="undefined"?o=exports:o=e.Backbone={},o.VERSION="0.9.10";var u=e._;!u&&typeof require!="undefined"&&(u=require("underscore")),o.$=e.jQuery||e.Zepto||e.ender,o.noConflict=function(){return e.Backbone=t,this},o.emulateHTTP=!1,o.emulateJSON=!1;var a=/\s+/,f=function(e,t,n,r){if(!n)return!0;if(typeof n=="object")for(var i in n)e[t].apply(e,[i,n[i]].concat(r));else{if(!a.test(n))return!0;var s=n.split(a);for(var o=0,u=s.length;o<u;o++)e[t].apply(e,[s[o]].concat(r))}},l=function(e,t){var n,r=-1,i=e.length;switch(t.length){case 0:while(++r<i)(n=e[r]).callback.call(n.ctx);return;case 1:while(++r<i)(n=e[r]).callback.call(n.ctx,t[0]);return;case 2:while(++r<i)(n=e[r]).callback.call(n.ctx,t[0],t[1]);return;case 3:while(++r<i)(n=e[r]).callback.call(n.ctx,t[0],t[1],t[2]);return;default:while(++r<i)(n=e[r]).callback.apply(n.ctx,t)}},c=o.Events={on:function(e,t,n){if(!f(this,"on",e,[t,n])||!t)return this;this._events||(this._events={});var r=this._events[e]||(this._events[e]=[]);return r.push({callback:t,context:n,ctx:n||this}),this},once:function(e,t,n){if(!f(this,"once",e,[t,n])||!t)return this;var r=this,i=u.once(function(){r.off(e,i),t.apply(this,arguments)});return i._callback=t,this.on(e,i,n),this},off:function(e,t,n){var r,i,s,o,a,l,c,h;if(!this._events||!f(this,"off",e,[t,n]))return this;if(!e&&!t&&!n)return this._events={},this;o=e?[e]:u.keys(this._events);for(a=0,l=o.length;a<l;a++){e=o[a];if(r=this._events[e]){s=[];if(t||n)for(c=0,h=r.length;c<h;c++)i=r[c],(t&&t!==i.callback&&t!==i.callback._callback||n&&n!==i.context)&&s.push(i);this._events[e]=s}}return this},trigger:function(e){if(!this._events)return this;var t=i.call(arguments,1);if(!f(this,"trigger",e,t))return this;var n=this._events[e],r=this._events.all;return n&&l(n,t),r&&l(r,arguments),this},listenTo:function(e,t,n){var r=this._listeners||(this._listeners={}),i=e._listenerId||(e._listenerId=u.uniqueId("l"));return r[i]=e,e.on(t,typeof t=="object"?this:n,this),this},stopListening:function(e,t,n){var r=this._listeners;if(!r)return;if(e)e.off(t,typeof t=="object"?this:n,this),!t&&!n&&delete r[e._listenerId];else{typeof t=="object"&&(n=this);for(var i in r)r[i].off(t,n,this);this._listeners={}}return this}};c.bind=c.on,c.unbind=c.off,u.extend(o,c);var h=o.Model=function(e,t){var n,r=e||{};this.cid=u.uniqueId("c"),this.attributes={},t&&t.collection&&(this.collection=t.collection),t&&t.parse&&(r=this.parse(r,t)||{});if(n=u.result(this,"defaults"))r=u.defaults({},r,n);this.set(r,t),this.changed={},this.initialize.apply(this,arguments)};u.extend(h.prototype,c,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(e){return u.clone(this.attributes)},sync:function(){return o.sync.apply(this,arguments)},get:function(e){return this.attributes[e]},escape:function(e){return u.escape(this.get(e))},has:function(e){return this.get(e)!=null},set:function(e,t,n){var r,i,s,o,a,f,l,c;if(e==null)return this;typeof e=="object"?(i=e,n=t):(i={})[e]=t,n||(n={});if(!this._validate(i,n))return!1;s=n.unset,a=n.silent,o=[],f=this._changing,this._changing=!0,f||(this._previousAttributes=u.clone(this.attributes),this.changed={}),c=this.attributes,l=this._previousAttributes,this.idAttribute in i&&(this.id=i[this.idAttribute]);for(r in i)t=i[r],u.isEqual(c[r],t)||o.push(r),u.isEqual(l[r],t)?delete this.changed[r]:this.changed[r]=t,s?delete c[r]:c[r]=t;if(!a){o.length&&(this._pending=!0);for(var h=0,p=o.length;h<p;h++)this.trigger("change:"+o[h],this,c[o[h]],n)}if(f)return this;if(!a)while(this._pending)this._pending=!1,this.trigger("change",this,n);return this._pending=!1,this._changing=!1,this},unset:function(e,t){return this.set(e,void 0,u.extend({},t,{unset:!0}))},clear:function(e){var t={};for(var n in this.attributes)t[n]=void 0;return this.set(t,u.extend({},e,{unset:!0}))},hasChanged:function(e){return e==null?!u.isEmpty(this.changed):u.has(this.changed,e)},changedAttributes:function(e){if(!e)return this.hasChanged()?u.clone(this.changed):!1;var t,n=!1,r=this._changing?this._previousAttributes:this.attributes;for(var i in e){if(u.isEqual(r[i],t=e[i]))continue;(n||(n={}))[i]=t}return n},previous:function(e){return e==null||!this._previousAttributes?null:this._previousAttributes[e]},previousAttributes:function(){return u.clone(this._previousAttributes)},fetch:function(e){e=e?u.clone(e):{},e.parse===void 0&&(e.parse=!0);var t=e.success;return e.success=function(e,n,r){if(!e.set(e.parse(n,r),r))return!1;t&&t(e,n,r)},this.sync("read",this,e)},save:function(e,t,n){var r,i,s,o,a=this.attributes;return e==null||typeof e=="object"?(r=e,n=t):(r={})[e]=t,r&&(!n||!n.wait)&&!this.set(r,n)?!1:(n=u.extend({validate:!0},n),this._validate(r,n)?(r&&n.wait&&(this.attributes=u.extend({},a,r)),n.parse===void 0&&(n.parse=!0),i=n.success,n.success=function(e,t,n){e.attributes=a;var s=e.parse(t,n);n.wait&&(s=u.extend(r||{},s));if(u.isObject(s)&&!e.set(s,n))return!1;i&&i(e,t,n)},s=this.isNew()?"create":n.patch?"patch":"update",s==="patch"&&(n.attrs=r),o=this.sync(s,this,n),r&&n.wait&&(this.attributes=a),o):!1)},destroy:function(e){e=e?u.clone(e):{};var t=this,n=e.success,r=function(){t.trigger("destroy",t,t.collection,e)};e.success=function(e,t,i){(i.wait||e.isNew())&&r(),n&&n(e,t,i)};if(this.isNew())return e.success(this,null,e),!1;var i=this.sync("delete",this,e);return e.wait||r(),i},url:function(){var e=u.result(this,"urlRoot")||u.result(this.collection,"url")||M();return this.isNew()?e:e+(e.charAt(e.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(e,t){return e},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(e){return!this.validate||!this.validate(this.attributes,e)},_validate:function(e,t){if(!t.validate||!this.validate)return!0;e=u.extend({},this.attributes,e);var n=this.validationError=this.validate(e,t)||null;return n?(this.trigger("invalid",this,n,t||{}),!1):!0}});var p=o.Collection=function(e,t){t||(t={}),t.model&&(this.model=t.model),t.comparator!==void 0&&(this.comparator=t.comparator),this.models=[],this._reset(),this.initialize.apply(this,arguments),e&&this.reset(e,u.extend({silent:!0},t))};u.extend(p.prototype,c,{model:h,initialize:function(){},toJSON:function(e){return this.map(function(t){return t.toJSON(e)})},sync:function(){return o.sync.apply(this,arguments)},add:function(e,t){e=u.isArray(e)?e.slice():[e],t||(t={});var n,i,o,a,f,l,c,h,p,d;c=[],h=t.at,p=this.comparator&&h==null&&t.sort!=0,d=u.isString(this.comparator)?this.comparator:null;for(n=0,i=e.length;n<i;n++){if(!(o=this._prepareModel(a=e[n],t))){this.trigger("invalid",this,a,t);continue}if(f=this.get(o)){t.merge&&(f.set(a===o?o.attributes:a,t),p&&!l&&f.hasChanged(d)&&(l=!0));continue}c.push(o),o.on("all",this._onModelEvent,this),this._byId[o.cid]=o,o.id!=null&&(this._byId[o.id]=o)}c.length&&(p&&(l=!0),this.length+=c.length,h!=null?s.apply(this.models,[h,0].concat(c)):r.apply(this.models,c)),l&&this.sort({silent:!0});if(t.silent)return this;for(n=0,i=c.length;n<i;n++)(o=c[n]).trigger("add",o,this,t);return l&&this.trigger("sort",this,t),this},remove:function(e,t){e=u.isArray(e)?e.slice():[e],t||(t={});var n,r,i,s;for(n=0,r=e.length;n<r;n++){s=this.get(e[n]);if(!s)continue;delete this._byId[s.id],delete this._byId[s.cid],i=this.indexOf(s),this.models.splice(i,1),this.length--,t.silent||(t.index=i,s.trigger("remove",s,this,t)),this._removeReference(s)}return this},push:function(e,t){return e=this._prepareModel(e,t),this.add(e,u.extend({at:this.length},t)),e},pop:function(e){var t=this.at(this.length-1);return this.remove(t,e),t},unshift:function(e,t){return e=this._prepareModel(e,t),this.add(e,u.extend({at:0},t)),e},shift:function(e){var t=this.at(0);return this.remove(t,e),t},slice:function(e,t){return this.models.slice(e,t)},get:function(e){return e==null?void 0:(this._idAttr||(this._idAttr=this.model.prototype.idAttribute),this._byId[e.id||e.cid||e[this._idAttr]||e])},at:function(e){return this.models[e]},where:function(e){return u.isEmpty(e)?[]:this.filter(function(t){for(var n in e)if(e[n]!==t.get(n))return!1;return!0})},sort:function(e){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return e||(e={}),u.isString(this.comparator)||this.comparator.length===1?this.models=this.sortBy(this.comparator,this):this.models.sort(u.bind(this.comparator,this)),e.silent||this.trigger("sort",this,e),this},pluck:function(e){return u.invoke(this.models,"get",e)},update:function(e,t){t=u.extend({add:!0,merge:!0,remove:!0},t),t.parse&&(e=this.parse(e,t));var n,r,i,s,o=[],a=[],f={};u.isArray(e)||(e=e?[e]:[]);if(t.add&&!t.remove)return this.add(e,t);for(r=0,i=e.length;r<i;r++)n=e[r],s=this.get(n),t.remove&&s&&(f[s.cid]=!0),(t.add&&!s||t.merge&&s)&&o.push(n);if(t.remove)for(r=0,i=this.models.length;r<i;r++)n=this.models[r],f[n.cid]||a.push(n);return a.length&&this.remove(a,t),o.length&&this.add(o,t),this},reset:function(e,t){t||(t={}),t.parse&&(e=this.parse(e,t));for(var n=0,r=this.models.length;n<r;n++)this._removeReference(this.models[n]);return t.previousModels=this.models.slice(),this._reset(),e&&this.add(e,u.extend({silent:!0},t)),t.silent||this.trigger("reset",this,t),this},fetch:function(e){e=e?u.clone(e):{},e.parse===void 0&&(e.parse=!0);var t=e.success;return e.success=function(e,n,r){var i=r.update?"update":"reset";e[i](n,r),t&&t(e,n,r)},this.sync("read",this,e)},create:function(e,t){t=t?u.clone(t):{};if(!(e=this._prepareModel(e,t)))return!1;t.wait||this.add(e,t);var n=this,r=t.success;return t.success=function(e,t,i){i.wait&&n.add(e,i),r&&r(e,t,i)},e.save(null,t),e},parse:function(e,t){return e},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models.length=0,this._byId={}},_prepareModel:function(e,t){if(e instanceof h)return e.collection||(e.collection=this),e;t||(t={}),t.collection=this;var n=new this.model(e,t);return n._validate(e,t)?n:!1},_removeReference:function(e){this===e.collection&&delete e.collection,e.off("all",this._onModelEvent,this)},_onModelEvent:function(e,t,n,r){if((e==="add"||e==="remove")&&n!==this)return;e==="destroy"&&this.remove(t,r),t&&e==="change:"+t.idAttribute&&(delete this._byId[t.previous(t.idAttribute)],t.id!=null&&(this._byId[t.id]=t)),this.trigger.apply(this,arguments)},sortedIndex:function(e,t,n){t||(t=this.comparator);var r=u.isFunction(t)?t:function(e){return e.get(t)};return u.sortedIndex(this.models,e,r,n)}});var d=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];u.each(d,function(e){p.prototype[e]=function(){var t=i.call(arguments);return t.unshift(this.models),u[e].apply(u,t)}});var v=["groupBy","countBy","sortBy"];u.each(v,function(e){p.prototype[e]=function(t,n){var r=u.isFunction(t)?t:function(e){return e.get(t)};return u[e](this.models,r,n)}});var m=o.Router=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},g=/\((.*?)\)/g,y=/(\(\?)?:\w+/g,b=/\*\w+/g,w=/[\-{}\[\]+?.,\\\^$|#\s]/g;u.extend(m.prototype,c,{initialize:function(){},route:function(e,t,n){return u.isRegExp(e)||(e=this._routeToRegExp(e)),n||(n=this[t]),o.history.route(e,u.bind(function(r){var i=this._extractParameters(e,r);n&&n.apply(this,i),this.trigger.apply(this,["route:"+t].concat(i)),this.trigger("route",t,i),o.history.trigger("route",this,t,i)},this)),this},navigate:function(e,t){return o.history.navigate(e,t),this},_bindRoutes:function(){if(!this.routes)return;var e,t=u.keys(this.routes);while((e=t.pop())!=null)this.route(e,this.routes[e])},_routeToRegExp:function(e){return e=e.replace(w,"\\$&").replace(g,"(?:$1)?").replace(y,function(e,t){return t?e:"([^/]+)"}).replace(b,"(.*?)"),new RegExp("^"+e+"$")},_extractParameters:function(e,t){return e.exec(t).slice(1)}});var E=o.History=function(){this.handlers=[],u.bindAll(this,"checkUrl"),typeof window!="undefined"&&(this.location=window.location,this.history=window.history)},S=/^[#\/]|\s+$/g,x=/^\/+|\/+$/g,T=/msie [\w.]+/,N=/\/$/;E.started=!1,u.extend(E.prototype,c,{interval:50,getHash:function(e){var t=(e||this).location.href.match(/#(.*)$/);return t?t[1]:""},getFragment:function(e,t){if(e==null)if(this._hasPushState||!this._wantsHashChange||t){e=this.location.pathname;var n=this.root.replace(N,"");e.indexOf(n)||(e=e.substr(n.length))}else e=this.getHash();return e.replace(S,"")},start:function(e){if(E.started)throw new Error("Backbone.history has already been started");E.started=!0,this.options=u.extend({},{root:"/"},this.options,e),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var t=this.getFragment(),n=document.documentMode,r=T.exec(navigator.userAgent.toLowerCase())&&(!n||n<=7);this.root=("/"+this.root+"/").replace(x,"/"),r&&this._wantsHashChange&&(this.iframe=o.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(t)),this._hasPushState?o.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!r?o.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=t;var i=this.location,s=i.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!s)return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&s&&i.hash&&(this.fragment=this.getHash().replace(S,""),this.history.replaceState({},document.title,this.root+this.fragment+i.search));if(!this.options.silent)return this.loadUrl()},stop:function(){o.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),E.started=!1},route:function(e,t){this.handlers.unshift({route:e,callback:t})},checkUrl:function(e){var t=this.getFragment();t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe)));if(t===this.fragment)return!1;this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(e){var t=this.fragment=this.getFragment(e),n=u.any(this.handlers,function(e){if(e.route.test(t))return e.callback(t),!0});return n},navigate:function(e,t){if(!E.started)return!1;if(!t||t===!0)t={trigger:t};e=this.getFragment(e||"");if(this.fragment===e)return;this.fragment=e;var n=this.root+e;if(this._hasPushState)this.history[t.replace?"replaceState":"pushState"]({},document.title,n);else{if(!this._wantsHashChange)return this.location.assign(n);this._updateHash(this.location,e,t.replace),this.iframe&&e!==this.getFragment(this.getHash(this.iframe))&&(t.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,e,t.replace))}t.trigger&&this.loadUrl(e)},_updateHash:function(e,t,n){if(n){var r=e.href.replace(/(javascript:|#).*$/,"");e.replace(r+"#"+t)}else e.hash="#"+t}}),o.history=new E;var C=o.View=function(e){this.cid=u.uniqueId("view"),this._configure(e||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},k=/^(\S+)\s*(.*)$/,L=["model","collection","el","id","attributes","className","tagName","events"];u.extend(C.prototype,c,{tagName:"div",$:function(e){return this.$el.find(e)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(e,t){return this.$el&&this.undelegateEvents(),this.$el=e instanceof o.$?e:o.$(e),this.el=this.$el[0],t!==!1&&this.delegateEvents(),this},delegateEvents:function(e){if(!e&&!(e=u.result(this,"events")))return;this.undelegateEvents();for(var t in e){var n=e[t];u.isFunction(n)||(n=this[e[t]]);if(!n)throw new Error('Method "'+e[t]+'" does not exist');var r=t.match(k),i=r[1],s=r[2];n=u.bind(n,this),i+=".delegateEvents"+this.cid,s===""?this.$el.on(i,n):this.$el.on(i,s,n)}},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid)},_configure:function(e){this.options&&(e=u.extend({},u.result(this,"options"),e)),u.extend(this,u.pick(e,L)),this.options=e},_ensureElement:function(){if(!this.el){var e=u.extend({},u.result(this,"attributes"));this.id&&(e.id=u.result(this,"id")),this.className&&(e["class"]=u.result(this,"className"));var t=o.$("<"+u.result(this,"tagName")+">").attr(e);this.setElement(t,!1)}else this.setElement(u.result(this,"el"),!1)}});var A={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};o.sync=function(e,t,n){var r=A[e];u.defaults(n||(n={}),{emulateHTTP:o.emulateHTTP,emulateJSON:o.emulateJSON});var i={type:r,dataType:"json"};n.url||(i.url=u.result(t,"url")||M()),n.data==null&&t&&(e==="create"||e==="update"||e==="patch")&&(i.contentType="application/json",i.data=JSON.stringify(n.attrs||t.toJSON(n))),n.emulateJSON&&(i.contentType="application/x-www-form-urlencoded",i.data=i.data?{model:i.data}:{});if(n.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){i.type="POST",n.emulateJSON&&(i.data._method=r);var s=n.beforeSend;n.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",r);if(s)return s.apply(this,arguments)}}i.type!=="GET"&&!n.emulateJSON&&(i.processData=!1);var a=n.success;n.success=function(e){a&&a(t,e,n),t.trigger("sync",t,e,n)};var f=n.error;n.error=function(e){f&&f(t,e,n),t.trigger("error",t,e,n)};var l=n.xhr=o.ajax(u.extend(i,n));return t.trigger("request",t,l,n),l},o.ajax=function(){return o.$.ajax.apply(o.$,arguments)};var O=function(e,t){var n=this,r;e&&u.has(e,"constructor")?r=e.constructor:r=function(){return n.apply(this,arguments)},u.extend(r,n,t);var i=function(){this.constructor=r};return i.prototype=n.prototype,r.prototype=new i,e&&u.extend(r.prototype,e),r.__super__=n.prototype,r};h.extend=p.extend=m.extend=C.extend=E.extend=O;var M=function(){throw new Error('A "url" property or function must be specified')}}).call(this);