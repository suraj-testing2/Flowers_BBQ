/*! data-layer-helper 18-07-2013 */
function expandKeyValue_(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};return d[e[e.length-1]]=b,c}function isArray_(a){return"array"==type(a)}function merge_(a,b){for(var c in a)if(hasOwn(a,c)){var d=a[c];isArray_(d)?(isArray_(b[c])||(b[c]=[]),merge_(d,b[c])):isPlainObject(d)?(isPlainObject(b[c])||(b[c]={}),merge_(d,b[c])):b[c]=d}}function type(a){if(null===a||void 0===a)return String(a);var b=TYPE_RE_.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"}function hasOwn(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)}function isPlainObject(a){if(!a||"object"!=type(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!hasOwn(a,"constructor")&&!hasOwn(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}var c;for(c in a);return void 0===c||hasOwn(a,c)}var DataLayerHelper=function(a,b,c){this.dataLayer_=a,this.listener_=b||function(){},this.executingListener_=!1,this.model_={},this.unprocessed_=[],this.processStates_(a,!c);var d=this,e=a.push;a.push=function(){var b=[].slice.call(arguments,0),c=e.apply(a,b);return d.processStates_(b),c}};DataLayerHelper.prototype.get=function(a){for(var b=this.model_,c=a.split("."),d=0;d<c.length;d++){if(void 0===b[c[d]])return void 0;b=b[c[d]]}return b},DataLayerHelper.prototype.flatten=function(){this.dataLayer_.splice(0,this.dataLayer_.length),this.dataLayer_[0]={},merge_(this.model_,this.dataLayer_[0])},DataLayerHelper.prototype.processStates_=function(a,b){for(this.unprocessed_.push.apply(this.unprocessed_,a);this.executingListener_===!1&&this.unprocessed_.length>0;){var c=this.unprocessed_.shift();if(isPlainObject(c)){for(var d in c)merge_(expandKeyValue_(d,c[d]),this.model_);b||(this.executingListener_=!0,this.listener_(this.model_,c),this.executingListener_=!1)}}},TYPE_RE_=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/;