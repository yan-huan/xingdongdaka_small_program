(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/pages.json ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!********************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/common/xdConfig.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 系统配置
var appConfig = {
  // 关于
  contractWebsite: "www.xxx.cn", // 联系网址
  contractTel: "010-xxxxxxxx", //  联系电话
  contractAddress: "xxxxxxxx", // 联系地址
  contractName: "北京xxxxxxxx公司", // 公司名称
  // 基本配置
  appName: "xingdongdaka", // 项目名字
  appLogTag: "xingdongdaka-log", // log tag
  enableDebug: true, // 设置是否打开调试开关。此开关对正式版也能生效。
  // server 配置
  serverName: 'xingdongdaka', // server项目名称

  serverProtocal: 'https', // server 协议
  serverIp: 'xingdongdaka.zhidashixun.com', // server IP

  serverProtocaltest: 'http', // server 协议
  serverIptest: 'testxingdongdaka.zhidashixun.com' };var _default =

{
  appConfig: appConfig };exports.default = _default;

/***/ }),
/* 9 */
/*!************************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/common/xdServerUrls.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _xdConfig = _interopRequireDefault(__webpack_require__(/*! ./xdConfig.js */ 8));var _serverUrls;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var config = _xdConfig.default.appConfig; // 配置

var serverBaseUrl = config.serverProtocaltest + '://' + config.serverIptest; //测试
// const serverBaseUrl=config.serverProtocal+'://'+config.serverIp;
var serverUrls = (_serverUrls = { //根据接口具体配置
  xd_register: serverBaseUrl + '/xxx', // 注册
  xd_login: serverBaseUrl + '/xxx', // 登录
  xd_logout: serverBaseUrl + '/xxx',
  xd_change_pass: serverBaseUrl + '/xxxxx', // 修改密码

  xd_bannerList: serverBaseUrl + '/banner/bannerList', // banner广告
  xd_label: serverBaseUrl + '/label/getLabels', //标签
  xd_tacitlyPushPng: serverBaseUrl + '/publishTarget/tacitlyPushPng', //标签

  xd_saveCardReplayComment: serverBaseUrl + '/cardReplayComment/saveCardReplayComment', //保存打卡回复评论
  xd_saveCardComment: serverBaseUrl + '/cardComment/saveCardComment', //保存打卡评论
  xd_showCardComment: serverBaseUrl + '/cardComment/showCardCommentAndReplayCommtent', //评论和回复的展现
  xd_showUserCardCommentAndReplayCommtent: serverBaseUrl + '/cardComment/showUserCardCommentAndReplayCommtent', //通过用户id查询所有打卡详情、评论及评论回复

  xd_saveGiveLikeByPush: serverBaseUrl + '/giveLike/saveGiveLikeByPush', //给行动项或打卡记录点赞
  xd_getAttentionList: serverBaseUrl + '/attention/getAttentionList', //获取关注列表
  xd_saveAttention: serverBaseUrl + '/attention/saveAttention', //保存关注

  xd_lookerPushListByUserId: serverBaseUrl + '/publishTarget/lookerPushListByUserId', //当前用户围观的行动项计划
  xd_pushByCreateTimeList: serverBaseUrl + '/publishTarget/pushByCreateTimeList', //根据创建时间获取目标列表
  xd_pushByHighGradeList: serverBaseUrl + '/publishTarget/pushByHighGradeList', //根据点赞数获取目标列表
  xd_pushByUserIdList: serverBaseUrl + '/publishTarget/pushByUserIdList', //根据用户id获取目标列表
  xd_savePush: serverBaseUrl + '/publishTarget/savePush', //保存发起的目标
  xd_pushByLabel: serverBaseUrl + '/publishTarget/pushByLabel', //根据标签获取行动项列表

  xd_uploadFile: serverBaseUrl + '/uploadFile/saveFiles', //上传图片

  xd_getLookerByPushId: serverBaseUrl + '/looker/getLookerByPushId', //根据行动项id查看围观人
  xd_saveLooker: serverBaseUrl + '/looker/saveLooker', //保存围观信息
  xd_getLookerByUserId: serverBaseUrl + '/looker/getLookerByUserId', //根据用户id获取围观数据

  xd_wechatCommercialTenant: serverBaseUrl + '/wechatCommercialTenant/pay', //微信商户给用户付款pay
  xd_decodeUserInfo: serverBaseUrl + '/wechat/decodeUserInfo', //获取微信的openid和unionid
  xd_pay: serverBaseUrl + '/wechat/pay', //pay
  xd_resultCallBack: serverBaseUrl + '/wechat/resultCallBack', //decodeUserInfo

  xd_getImgIsNormal: serverBaseUrl + '/login/getImgIsNormal', //图片是否正常
  xd_modifyUserInfo: serverBaseUrl + '/login/modifyUserInfo', //修改用户的基础信息
  xd_weiXinLogin: serverBaseUrl + '/login/weiXinLogin', //微信登陆接口
  xd_getUserInfoByUserId: serverBaseUrl + '/login/getUserInfoByUserId', //根据用户id获取用户信息
  // GET /login/getAccessToken 获取token
  // GET /login/getContentIsNormal 内容是否正常

  xd_saveReplayComment: serverBaseUrl + '/replayPushComment/saveReplayComment', //行动项回复评论
  xd_saveComment: serverBaseUrl + '/pushComment/saveComment', //保存行动项评论
  xd_showCommentAndReplayCommtent: serverBaseUrl + '/pushComment/showCommentAndReplayCommtent', //评论和回复的展现

  xd_savePushCard: serverBaseUrl + '/publishCard/savePushCard', //保存打卡记录
  xd_pushCardListByPushId: serverBaseUrl + '/publishCard/pushCardListByPushId', //根据行动项id获取打卡列表

  xd_pushDataByPushId: serverBaseUrl + '/publishTarget/pushDataByPushId' }, _defineProperty(_serverUrls, "xd_getUserInfoByUserId",
serverBaseUrl + '/login/getUserInfoByUserId'), _defineProperty(_serverUrls, "xd_updatePushDataByPushId",
serverBaseUrl + '/publishTarget/updatePushDataByPushId'), _defineProperty(_serverUrls, "xd_getContentIsNormal",

serverBaseUrl + '/login/getContentIsNormal'), _defineProperty(_serverUrls, "xd_getImgIsNormal",
serverBaseUrl + '/login/getImgIsNormal'), _defineProperty(_serverUrls, "xd_searchPushData",
serverBaseUrl + '/publishTarget/searchPushData'), _defineProperty(_serverUrls, "xd_onOff",

serverBaseUrl + '/config/onOff'), _defineProperty(_serverUrls, "xd_delPushDataByPushId",
serverBaseUrl + '/publishTarget/delPushDataByPushId'), _defineProperty(_serverUrls, "xd_saveShareInfo",
serverBaseUrl + '/share/saveShareInfo'), _defineProperty(_serverUrls, "xd_getLookerByPushId",
serverBaseUrl + '/looker/getLookerByPushId'), _serverUrls);var _default =





{
  serverUrls: serverUrls,
  serverBaseUrl: serverBaseUrl };exports.default = _default;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 13 */
/*!****************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/store/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
// 国际化相关代码
try {
  // 1. 分析用户已经选择的语言 
  var userLang = uni.getStorageSync("userLang");
  // 2. 如果用户没有选择过获取用户手机的语言
  if (!userLang) {
    var sys = uni.getSystemInfoSync();
    userLang = sys.language;
  }
  // 以中英文切换为例, 其他语言请使用 getSystemInfoSync 获取语言对应的字符串
  // 然后扩展语言包即可
  if (userLang.substring(0, 2) == 'zh') {
    var lang = __webpack_require__(/*! ../language/zh.js */ 15);
  } else {
    var lang = __webpack_require__(/*! ../language/en.js */ 16);
  }
} catch (e) {
  // error
}
var store = new _vuex.default.Store({
  state: {
    lang: lang,
    hasLogin: false,
    real: false,
    infoRes: {},
    userInfo: {} },



  mutations: {
    changeLang: function changeLang(state) {
      uni.showActionSheet({
        itemList: ['简体中文', 'English'],
        success: function success(e) {
          if (e.tapIndex == 0) {
            lang = __webpack_require__(/*! ../language/zh.js */ 15);
          } else {
            lang = __webpack_require__(/*! ../language/en.js */ 16);
          }
          state.lang = lang;
        } });

    },
    logIn: function logIn(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorageSync('userInfo', state.userInfo);

    },
    IndexlogIn: function IndexlogIn(state) {
      state.hasLogin = true;
    },
    logOut: function logOut(state) {
      state.hasLogin = false;
      uni.setStorageSync('userInfo', '');
      uni.setStorageSync('token', '');
    } } });var _default =


store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 15 */
/*!****************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/language/zh.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// version:20190625
module.exports = {
  langType: 'zh-CN', // langType 属性为语言包标识，请勿删除
  // 以下为示例内容，请根据项目需求自行更改
  compName: "行动打卡" };

/***/ }),
/* 16 */
/*!****************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/language/en.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  langType: 'en', // langType 属性为语言包标识，请勿删除
  // 以下为示例内容，请根据项目需求自行更改
  compName: "xingdongdaka" };

/***/ }),
/* 17 */
/*!**********************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/common/xdUniUtils.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 保存数据
function xd_setStorage(keyParm, dataParm) {
  uni.setStorage({
    key: keyParm,
    data: dataParm });

}
// 保存数据，同步
function xd_setStorageSync(keyParm, dataParm) {
  try {
    uni.setStorageSync(keyParm, dataParm);
  } catch (e) {
    console.log('setStorageSync error');
  }
}
// 获取数据，同步
function xd_getStorageSync(keyParm) {
  try {
    var value = uni.getStorageSync(keyParm);
    return value;
  } catch (e) {
    console.log('getStorageSync error');
  }
}
/*** 设置token */
function xd_setAccessToken(token) {
  xd_setStorageSync('access_token', token);
}
/*** 获取token */
function xd_getAccessToken() {
  return xd_getStorageSync('access_token');
}
/** *************** alert 相关 *********************** */
// 弹出框
function xd_showToast(title, icon, callbackFun) {
  uni.showToast({
    title: title,
    icon: icon ? icon : "none",
    success: function success() {
      if (typeof callbackFun != "undefined" && callbackFun != null) {
        callbackFun(); // 回调函数
      }
    } });

}
// 弹出框:操作成功
function xd_showToast_success(title, callbackFun) {
  uni.showToast({
    icon: "success",
    success: function success() {
      if (typeof callbackFun != "undefined" && callbackFun != null) {
        callbackFun(); // 回调函数
      }
    } });

}
// 弹出框:操作成功并跳转
function xd_showToast_success_redirectTo(pageUrl) {
  xd_showToast_success(null, function () {
    uni.redirectTo({
      url: pageUrl // 跳转到页面
    });
  });
}
// 弹出框:操作成功并返回上一级
function xd_showToast_success_navigateBack() {
  xd_showToast_success(null, function () {
    uni.navigateBack({
      delta: 1 });

  });
}
// 弹窗，操作完成后返回上一级
function xd_showToast_navigateBack(toastTitle) {
  uni.showToast({
    title: toastTitle,
    success: function success() {
      uni.navigateBack({
        delta: 1 });

    } });

}
// 确认操作
function xd_showModal_confirm(title, message, showCancelBut, okCallbackFun, cancelCallbackFun) {
  uni.showModal({
    title: title || '操作确认',
    content: message || '您确定要执行该操作吗？！',
    showCancel: !showCancelBut ? showCancelBut : true,
    success: function success(res) {
      if (res.confirm) {
        if (typeof okCallbackFun != "undefined" && okCallbackFun != null) {
          okCallbackFun();
        }
      } else if (res.cancel) {
        if (typeof cancelCallbackFun != "undefined" && cancelCallbackFun != null) {
          cancelCallbackFun();
        }
      }
    } });

}

/** ***************request 相关*********************** */
// 请求 url：请求路径，params请求参数，method：方法,请求header，
function xd_request(url, method, params, headers) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: url,
      method: method || 'GET', // 默认get请求
      data: params || {},
      header: headers || {},
      dataType: "json",
      success: function success(res) {
        var d = res;
        if (d.data.resultCode == 10002) {
          // 清除登录相关内容
          try {
            uni.removeStorageSync('userInfo');
            uni.removeStorageSync('id');
            uni.removeStorageSync('token');
          } catch (e) {
          }
          // 切换到登录页面
          uni.reLaunch({
            url: '../login/login' });


        } else if (d.data.resultCode == 0 || d.data.status == 1) {
          resolve(d.data);
        } else {
          resolve(d.data);
        }
      },
      fail: function fail(err) {
        uni.showToast({
          title: err });

        console.log(err);
        reject(err);
      } });

  });
}
// 简单request get
function xd_request_get(url, params, withToken) {
  var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  if (withToken !== false) {
    var accessToken = xd_getAccessToken(); // token
    headers = { // application/json
      'access_token': accessToken // accessToken
    };
  }
  return xd_request(url, 'GET', params, headers);
}
// post请求 url：请求路径，请求header，params请求参数
function xd_request_post(url, params, withToken) {
  var headers = {
    'content-type': 'application/x-www-form-urlencoded' };

  if (withToken !== false) {
    var token = uni.getStorageSync('token'); // token
    if (token == undefined) {
      uni.reLaunch({
        url: '../login/login' });

    }
    headers.token = token; // accessToken
  }
  return xd_request(url, 'POST', params, headers);
}
// 上传
function xd_request_upload(url, params, withToken) {
  var headers = {
    'content-type': "multipart/form-data" };

  if (withToken !== false) {

    var token = uni.getStorageSync('token'); // token
    if (token == undefined) {
      uni.reLaunch({
        url: '../login/login' });

    }
    headers.session_token = token; // accessToken
  }
  return xd_request(url, 'POST', params, headers);
}
//图片检查
function xd_request_img(data) {
  return new Promise(function (resolve, reject) {
    uni.uploadFile({
      url: 'https://xingdongdaka.zhidashixun.com/login/getImgIsNormal',
      filePath: data,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data" //记得设置
      },
      formData: {

        'token': uni.getStorageSync('token') },

      success: function success(uploadFileRes) {
        var jsonObj = JSON.parse(uploadFileRes.data);
        var jsonObj1 = JSON.parse(jsonObj.obj);
        if (jsonObj1.errcode == 0)
        {
          resolve(true);
        } else {
          uni.showToast({
            title: '图片不符规定',
            duration: 2000 });

          resolve(false);
        }
        ;

      } });

  });
}
// 类容检查
function xd_request_text(params) {
  var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  var url = 'https://xingdongdaka.zhidashixun.com/login/getContentIsNormal';
  headers.token = uni.getStorageSync('token');
  return xd_request(url, 'GET', params, headers);
}
// 简单操作
function xd_request_simpleOperate(url, message) {
  var okCallbackFun = function okCallbackFun() {
    xd_request_post(url, null, true);
  };
  xd_showModal_confirm(null, message, true, okCallbackFun);
}
// 删除
function xd_request_delete(url) {
  xd_request_simpleOperate(url, "确定要删除该条数据吗？");
}
// 返回上一级。delta：返回的页面数，如果 delta 大于现有页面数，则返回到首页
function xd_navigateBack(delta) {
  uni.navigateBack({
    delta: delta });

}
//时间处理
function xd_timestampToTime(timestamp, times, times1, times2) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  if (times) {
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    // var m = date.getMinutes() ;
    var s = date.getSeconds();
    return M + D + h + m + s;
  }
  if (times1) {
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    // var m = date.getMinutes() ;
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }
  if (times2) {
    var h = date.getHours() + ':';
    var m = date.getMinutes();

    return Y + M + D + h + m;
  }
  return Y + M + D;
}
//获取今天只后日期

function xd_daysAddSub(date, num) {
  var d = new Date(date);
  var newD = new Date(d.setDate(d.getDate() + num)); //设置天数 +1 天
  var Y = newD.getFullYear() + '-';
  var M = (newD.getMonth() + 1 < 10 ? '0' + (newD.getMonth() + 1) : newD.getMonth() + 1) + '-';
  var D = newD.getDate() + ' ';
  var h = newD.getHours() + ':';
  var m = newD.getMinutes();

  return Y + M + D + h + m;
}

//数据校验
//电话
function xd_isValidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}var _default =

{
  xd_setStorage: xd_setStorage,
  xd_setStorageSync: xd_setStorageSync,
  xd_getStorageSync: xd_getStorageSync,
  xd_setAccessToken: xd_setAccessToken,
  xd_getAccessToken: xd_getAccessToken,
  xd_showToast: xd_showToast,
  xd_showToast_success: xd_showToast_success,
  xd_showToast_success_redirectTo: xd_showToast_success_redirectTo,
  xd_showToast_success_navigateBack: xd_showToast_success_navigateBack,
  xd_showToast_navigateBack: xd_showToast_navigateBack,
  xd_showModal_confirm: xd_showModal_confirm,
  xd_request: xd_request,
  xd_request_get: xd_request_get,
  xd_request_post: xd_request_post,
  xd_request_upload: xd_request_upload,
  xd_request_simpleOperate: xd_request_simpleOperate,
  xd_request_delete: xd_request_delete,
  xd_navigateBack: xd_navigateBack,
  xd_timestampToTime: xd_timestampToTime,
  xd_daysAddSub: xd_daysAddSub,
  xd_request_img: xd_request_img,
  xd_request_text: xd_request_text };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 18 */
/*!******************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/common/moment.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
//! version : 2.24.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (e, a) { true ? module.exports = a() : undefined;}(this, function () {"use strict";var e, n;function l() {return e.apply(null, arguments);}function _(e) {return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e);}function i(e) {return null != e && "[object Object]" === Object.prototype.toString.call(e);}function o(e) {return void 0 === e;}function m(e) {return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e);}function u(e) {return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e);}function M(e, a) {var t,s = [];for (t = 0; t < e.length; ++t) {s.push(a(e[t], t));}return s;}function h(e, a) {return Object.prototype.hasOwnProperty.call(e, a);}function L(e, a) {for (var t in a) {h(a, t) && (e[t] = a[t]);}return h(a, "toString") && (e.toString = a.toString), h(a, "valueOf") && (e.valueOf = a.valueOf), e;}function c(e, a, t, s) {return Sa(e, a, t, s, !0).utc();}function Y(e) {return null == e._pf && (e._pf = { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 }), e._pf;}function y(e) {if (null == e._isValid) {var a = Y(e),t = n.call(a.parsedDateParts, function (e) {return null != e;}),s = !isNaN(e._d.getTime()) && a.overflow < 0 && !a.empty && !a.invalidMonth && !a.invalidWeekday && !a.weekdayMismatch && !a.nullInput && !a.invalidFormat && !a.userInvalidated && (!a.meridiem || a.meridiem && t);if (e._strict && (s = s && 0 === a.charsLeftOver && 0 === a.unusedTokens.length && void 0 === a.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return s;e._isValid = s;}return e._isValid;}function f(e) {var a = c(NaN);return null != e ? L(Y(a), e) : Y(a).userInvalidated = !0, a;}n = Array.prototype.some ? Array.prototype.some : function (e) {for (var a = Object(this), t = a.length >>> 0, s = 0; s < t; s++) {if (s in a && e.call(this, a[s], s, a)) return !0;}return !1;};var d = l.momentProperties = [];function k(e, a) {var t, s, n;if (o(a._isAMomentObject) || (e._isAMomentObject = a._isAMomentObject), o(a._i) || (e._i = a._i), o(a._f) || (e._f = a._f), o(a._l) || (e._l = a._l), o(a._strict) || (e._strict = a._strict), o(a._tzm) || (e._tzm = a._tzm), o(a._isUTC) || (e._isUTC = a._isUTC), o(a._offset) || (e._offset = a._offset), o(a._pf) || (e._pf = Y(a)), o(a._locale) || (e._locale = a._locale), 0 < d.length) for (t = 0; t < d.length; t++) {o(n = a[s = d[t]]) || (e[s] = n);}return e;}var a = !1;function p(e) {k(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === a && (a = !0, l.updateOffset(this), a = !1);}function D(e) {return e instanceof p || null != e && null != e._isAMomentObject;}function T(e) {return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);}function g(e) {var a = +e,t = 0;return 0 !== a && isFinite(a) && (t = T(a)), t;}function r(e, a, t) {var s,n = Math.min(e.length, a.length),d = Math.abs(e.length - a.length),r = 0;for (s = 0; s < n; s++) {(t && e[s] !== a[s] || !t && g(e[s]) !== g(a[s])) && r++;}return r + d;}function w(e) {!1 === l.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);}function t(n, d) {var r = !0;return L(function () {if (null != l.deprecationHandler && l.deprecationHandler(null, n), r) {for (var e, a = [], t = 0; t < arguments.length; t++) {if (e = "", "object" == typeof arguments[t]) {for (var s in e += "\n[" + t + "] ", arguments[0]) {e += s + ": " + arguments[0][s] + ", ";}e = e.slice(0, -2);} else e = arguments[t];a.push(e);}w(n + "\nArguments: " + Array.prototype.slice.call(a).join("") + "\n" + new Error().stack), r = !1;}return d.apply(this, arguments);}, d);}var s,v = {};function S(e, a) {null != l.deprecationHandler && l.deprecationHandler(e, a), v[e] || (w(a), v[e] = !0);}function H(e) {return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e);}function b(e, a) {var t,s = L({}, e);for (t in a) {h(a, t) && (i(e[t]) && i(a[t]) ? (s[t] = {}, L(s[t], e[t]), L(s[t], a[t])) : null != a[t] ? s[t] = a[t] : delete s[t]);}for (t in e) {h(e, t) && !h(a, t) && i(e[t]) && (s[t] = L({}, s[t]));}return s;}function j(e) {null != e && this.set(e);}l.suppressDeprecationWarnings = !1, l.deprecationHandler = null, s = Object.keys ? Object.keys : function (e) {var a,t = [];for (a in e) {h(e, a) && t.push(a);}return t;};var x = {};function O(e, a) {var t = e.toLowerCase();x[t] = x[t + "s"] = x[a] = e;}function P(e) {return "string" == typeof e ? x[e] || x[e.toLowerCase()] : void 0;}function W(e) {var a,t,s = {};for (t in e) {h(e, t) && (a = P(t)) && (s[a] = e[t]);}return s;}var A = {};function E(e, a) {A[e] = a;}function F(e, a, t) {var s = "" + Math.abs(e),n = a - s.length;return (0 <= e ? t ? "+" : "" : "-") + Math.pow(10, Math.max(0, n)).toString().substr(1) + s;}var z = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,J = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,N = {},R = {};function C(e, a, t, s) {var n = s;"string" == typeof s && (n = function n() {return this[s]();}), e && (R[e] = n), a && (R[a[0]] = function () {return F(n.apply(this, arguments), a[1], a[2]);}), t && (R[t] = function () {return this.localeData().ordinal(n.apply(this, arguments), e);});}function I(e, a) {return e.isValid() ? (a = U(a, e.localeData()), N[a] = N[a] || function (s) {var e,n,a,d = s.match(z);for (e = 0, n = d.length; e < n; e++) {R[d[e]] ? d[e] = R[d[e]] : d[e] = (a = d[e]).match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");}return function (e) {var a,t = "";for (a = 0; a < n; a++) {t += H(d[a]) ? d[a].call(e, s) : d[a];}return t;};}(a), N[a](e)) : e.localeData().invalidDate();}function U(e, a) {var t = 5;function s(e) {return a.longDateFormat(e) || e;}for (J.lastIndex = 0; 0 <= t && J.test(e);) {e = e.replace(J, s), J.lastIndex = 0, t -= 1;}return e;}var G = /\d/,V = /\d\d/,K = /\d{3}/,Z = /\d{4}/,$ = /[+-]?\d{6}/,B = /\d\d?/,q = /\d\d\d\d?/,Q = /\d\d\d\d\d\d?/,X = /\d{1,3}/,ee = /\d{1,4}/,ae = /[+-]?\d{1,6}/,te = /\d+/,se = /[+-]?\d+/,ne = /Z|[+-]\d\d:?\d\d/gi,de = /Z|[+-]\d\d(?::?\d\d)?/gi,re = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,_e = {};function ie(e, t, s) {_e[e] = H(t) ? t : function (e, a) {return e && s ? s : t;};}function oe(e, a) {return h(_e, e) ? _e[e](a._strict, a._locale) : new RegExp(me(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, a, t, s, n) {return a || t || s || n;})));}function me(e) {return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");}var ue = {};function le(e, t) {var a,s = t;for ("string" == typeof e && (e = [e]), m(t) && (s = function s(e, a) {a[t] = g(e);}), a = 0; a < e.length; a++) {ue[e[a]] = s;}}function Me(e, n) {le(e, function (e, a, t, s) {t._w = t._w || {}, n(e, t._w, t, s);});}var he = 0,Le = 1,ce = 2,Ye = 3,ye = 4,fe = 5,ke = 6,pe = 7,De = 8;function Te(e) {return ge(e) ? 366 : 365;}function ge(e) {return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;}C("Y", 0, 0, function () {var e = this.year();return e <= 9999 ? "" + e : "+" + e;}), C(0, ["YY", 2], 0, function () {return this.year() % 100;}), C(0, ["YYYY", 4], 0, "year"), C(0, ["YYYYY", 5], 0, "year"), C(0, ["YYYYYY", 6, !0], 0, "year"), O("year", "y"), E("year", 1), ie("Y", se), ie("YY", B, V), ie("YYYY", ee, Z), ie("YYYYY", ae, $), ie("YYYYYY", ae, $), le(["YYYYY", "YYYYYY"], he), le("YYYY", function (e, a) {a[he] = 2 === e.length ? l.parseTwoDigitYear(e) : g(e);}), le("YY", function (e, a) {a[he] = l.parseTwoDigitYear(e);}), le("Y", function (e, a) {a[he] = parseInt(e, 10);}), l.parseTwoDigitYear = function (e) {return g(e) + (68 < g(e) ? 1900 : 2e3);};var we,ve = Se("FullYear", !0);function Se(a, t) {return function (e) {return null != e ? (be(this, a, e), l.updateOffset(this, t), this) : He(this, a);};}function He(e, a) {return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + a]() : NaN;}function be(e, a, t) {e.isValid() && !isNaN(t) && ("FullYear" === a && ge(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + a](t, e.month(), je(t, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + a](t));}function je(e, a) {if (isNaN(e) || isNaN(a)) return NaN;var t,s = (a % (t = 12) + t) % t;return e += (a - s) / 12, 1 === s ? ge(e) ? 29 : 28 : 31 - s % 7 % 2;}we = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) {var a;for (a = 0; a < this.length; ++a) {if (this[a] === e) return a;}return -1;}, C("M", ["MM", 2], "Mo", function () {return this.month() + 1;}), C("MMM", 0, 0, function (e) {return this.localeData().monthsShort(this, e);}), C("MMMM", 0, 0, function (e) {return this.localeData().months(this, e);}), O("month", "M"), E("month", 8), ie("M", B), ie("MM", B, V), ie("MMM", function (e, a) {return a.monthsShortRegex(e);}), ie("MMMM", function (e, a) {return a.monthsRegex(e);}), le(["M", "MM"], function (e, a) {a[Le] = g(e) - 1;}), le(["MMM", "MMMM"], function (e, a, t, s) {var n = t._locale.monthsParse(e, s, t._strict);null != n ? a[Le] = n : Y(t).invalidMonth = e;});var xe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Oe = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");var Pe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function We(e, a) {var t;if (!e.isValid()) return e;if ("string" == typeof a) if (/^\d+$/.test(a)) a = g(a);else if (!m(a = e.localeData().monthsParse(a))) return e;return t = Math.min(e.date(), je(e.year(), a)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](a, t), e;}function Ae(e) {return null != e ? (We(this, e), l.updateOffset(this, !0), this) : He(this, "Month");}var Ee = re;var Fe = re;function ze() {function e(e, a) {return a.length - e.length;}var a,t,s = [],n = [],d = [];for (a = 0; a < 12; a++) {t = c([2e3, a]), s.push(this.monthsShort(t, "")), n.push(this.months(t, "")), d.push(this.months(t, "")), d.push(this.monthsShort(t, ""));}for (s.sort(e), n.sort(e), d.sort(e), a = 0; a < 12; a++) {s[a] = me(s[a]), n[a] = me(n[a]);}for (a = 0; a < 24; a++) {d[a] = me(d[a]);}this._monthsRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i");}function Je(e) {var a;if (e < 100 && 0 <= e) {var t = Array.prototype.slice.call(arguments);t[0] = e + 400, a = new Date(Date.UTC.apply(null, t)), isFinite(a.getUTCFullYear()) && a.setUTCFullYear(e);} else a = new Date(Date.UTC.apply(null, arguments));return a;}function Ne(e, a, t) {var s = 7 + a - t;return -((7 + Je(e, 0, s).getUTCDay() - a) % 7) + s - 1;}function Re(e, a, t, s, n) {var d,r,_ = 1 + 7 * (a - 1) + (7 + t - s) % 7 + Ne(e, s, n);return r = _ <= 0 ? Te(d = e - 1) + _ : _ > Te(e) ? (d = e + 1, _ - Te(e)) : (d = e, _), { year: d, dayOfYear: r };}function Ce(e, a, t) {var s,n,d = Ne(e.year(), a, t),r = Math.floor((e.dayOfYear() - d - 1) / 7) + 1;return r < 1 ? s = r + Ie(n = e.year() - 1, a, t) : r > Ie(e.year(), a, t) ? (s = r - Ie(e.year(), a, t), n = e.year() + 1) : (n = e.year(), s = r), { week: s, year: n };}function Ie(e, a, t) {var s = Ne(e, a, t),n = Ne(e + 1, a, t);return (Te(e) - s + n) / 7;}C("w", ["ww", 2], "wo", "week"), C("W", ["WW", 2], "Wo", "isoWeek"), O("week", "w"), O("isoWeek", "W"), E("week", 5), E("isoWeek", 5), ie("w", B), ie("ww", B, V), ie("W", B), ie("WW", B, V), Me(["w", "ww", "W", "WW"], function (e, a, t, s) {a[s.substr(0, 1)] = g(e);});function Ue(e, a) {return e.slice(a, 7).concat(e.slice(0, a));}C("d", 0, "do", "day"), C("dd", 0, 0, function (e) {return this.localeData().weekdaysMin(this, e);}), C("ddd", 0, 0, function (e) {return this.localeData().weekdaysShort(this, e);}), C("dddd", 0, 0, function (e) {return this.localeData().weekdays(this, e);}), C("e", 0, 0, "weekday"), C("E", 0, 0, "isoWeekday"), O("day", "d"), O("weekday", "e"), O("isoWeekday", "E"), E("day", 11), E("weekday", 11), E("isoWeekday", 11), ie("d", B), ie("e", B), ie("E", B), ie("dd", function (e, a) {return a.weekdaysMinRegex(e);}), ie("ddd", function (e, a) {return a.weekdaysShortRegex(e);}), ie("dddd", function (e, a) {return a.weekdaysRegex(e);}), Me(["dd", "ddd", "dddd"], function (e, a, t, s) {var n = t._locale.weekdaysParse(e, s, t._strict);null != n ? a.d = n : Y(t).invalidWeekday = e;}), Me(["d", "e", "E"], function (e, a, t, s) {a[s] = g(e);});var Ge = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var Ve = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var Ke = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");var Ze = re;var $e = re;var Be = re;function qe() {function e(e, a) {return a.length - e.length;}var a,t,s,n,d,r = [],_ = [],i = [],o = [];for (a = 0; a < 7; a++) {t = c([2e3, 1]).day(a), s = this.weekdaysMin(t, ""), n = this.weekdaysShort(t, ""), d = this.weekdays(t, ""), r.push(s), _.push(n), i.push(d), o.push(s), o.push(n), o.push(d);}for (r.sort(e), _.sort(e), i.sort(e), o.sort(e), a = 0; a < 7; a++) {_[a] = me(_[a]), i[a] = me(i[a]), o[a] = me(o[a]);}this._weekdaysRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + _.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + r.join("|") + ")", "i");}function Qe() {return this.hours() % 12 || 12;}function Xe(e, a) {C(e, 0, 0, function () {return this.localeData().meridiem(this.hours(), this.minutes(), a);});}function ea(e, a) {return a._meridiemParse;}C("H", ["HH", 2], 0, "hour"), C("h", ["hh", 2], 0, Qe), C("k", ["kk", 2], 0, function () {return this.hours() || 24;}), C("hmm", 0, 0, function () {return "" + Qe.apply(this) + F(this.minutes(), 2);}), C("hmmss", 0, 0, function () {return "" + Qe.apply(this) + F(this.minutes(), 2) + F(this.seconds(), 2);}), C("Hmm", 0, 0, function () {return "" + this.hours() + F(this.minutes(), 2);}), C("Hmmss", 0, 0, function () {return "" + this.hours() + F(this.minutes(), 2) + F(this.seconds(), 2);}), Xe("a", !0), Xe("A", !1), O("hour", "h"), E("hour", 13), ie("a", ea), ie("A", ea), ie("H", B), ie("h", B), ie("k", B), ie("HH", B, V), ie("hh", B, V), ie("kk", B, V), ie("hmm", q), ie("hmmss", Q), ie("Hmm", q), ie("Hmmss", Q), le(["H", "HH"], Ye), le(["k", "kk"], function (e, a, t) {var s = g(e);a[Ye] = 24 === s ? 0 : s;}), le(["a", "A"], function (e, a, t) {t._isPm = t._locale.isPM(e), t._meridiem = e;}), le(["h", "hh"], function (e, a, t) {a[Ye] = g(e), Y(t).bigHour = !0;}), le("hmm", function (e, a, t) {var s = e.length - 2;a[Ye] = g(e.substr(0, s)), a[ye] = g(e.substr(s)), Y(t).bigHour = !0;}), le("hmmss", function (e, a, t) {var s = e.length - 4,n = e.length - 2;a[Ye] = g(e.substr(0, s)), a[ye] = g(e.substr(s, 2)), a[fe] = g(e.substr(n)), Y(t).bigHour = !0;}), le("Hmm", function (e, a, t) {var s = e.length - 2;a[Ye] = g(e.substr(0, s)), a[ye] = g(e.substr(s));}), le("Hmmss", function (e, a, t) {var s = e.length - 4,n = e.length - 2;a[Ye] = g(e.substr(0, s)), a[ye] = g(e.substr(s, 2)), a[fe] = g(e.substr(n));});var aa,ta = Se("Hours", !0),sa = { calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, longDateFormat: { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, invalidDate: "Invalid date", ordinal: "%d", dayOfMonthOrdinalParse: /\d{1,2}/, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, months: Oe, monthsShort: Pe, week: { dow: 0, doy: 6 }, weekdays: Ge, weekdaysMin: Ke, weekdaysShort: Ve, meridiemParse: /[ap]\.?m?\.?/i },na = {},da = {};function ra(e) {return e ? e.toLowerCase().replace("_", "-") : e;}function _a(e) {var a = null;if (!na[e] && "undefined" != typeof module && module && module.exports) try {a = aa._abbr, !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), ia(a);} catch (e) {}return na[e];}function ia(e, a) {var t;return e && ((t = o(a) ? ma(e) : oa(e, a)) ? aa = t : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), aa._abbr;}function oa(e, a) {if (null === a) return delete na[e], null;var t,s = sa;if (a.abbr = e, null != na[e]) S("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s = na[e]._config;else if (null != a.parentLocale) if (null != na[a.parentLocale]) s = na[a.parentLocale]._config;else {if (null == (t = _a(a.parentLocale))) return da[a.parentLocale] || (da[a.parentLocale] = []), da[a.parentLocale].push({ name: e, config: a }), null;s = t._config;}return na[e] = new j(b(s, a)), da[e] && da[e].forEach(function (e) {oa(e.name, e.config);}), ia(e), na[e];}function ma(e) {var a;if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return aa;if (!_(e)) {if (a = _a(e)) return a;e = [e];}return function (e) {for (var a, t, s, n, d = 0; d < e.length;) {for (a = (n = ra(e[d]).split("-")).length, t = (t = ra(e[d + 1])) ? t.split("-") : null; 0 < a;) {if (s = _a(n.slice(0, a).join("-"))) return s;if (t && t.length >= a && r(n, t, !0) >= a - 1) break;a--;}d++;}return aa;}(e);}function ua(e) {var a,t = e._a;return t && -2 === Y(e).overflow && (a = t[Le] < 0 || 11 < t[Le] ? Le : t[ce] < 1 || t[ce] > je(t[he], t[Le]) ? ce : t[Ye] < 0 || 24 < t[Ye] || 24 === t[Ye] && (0 !== t[ye] || 0 !== t[fe] || 0 !== t[ke]) ? Ye : t[ye] < 0 || 59 < t[ye] ? ye : t[fe] < 0 || 59 < t[fe] ? fe : t[ke] < 0 || 999 < t[ke] ? ke : -1, Y(e)._overflowDayOfYear && (a < he || ce < a) && (a = ce), Y(e)._overflowWeeks && -1 === a && (a = pe), Y(e)._overflowWeekday && -1 === a && (a = De), Y(e).overflow = a), e;}function la(e, a, t) {return null != e ? e : null != a ? a : t;}function Ma(e) {var a,t,s,n,d,r = [];if (!e._d) {var _, i;for (_ = e, i = new Date(l.now()), s = _._useUTC ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()] : [i.getFullYear(), i.getMonth(), i.getDate()], e._w && null == e._a[ce] && null == e._a[Le] && function (e) {var a, t, s, n, d, r, _, i;if (null != (a = e._w).GG || null != a.W || null != a.E) d = 1, r = 4, t = la(a.GG, e._a[he], Ce(Ha(), 1, 4).year), s = la(a.W, 1), ((n = la(a.E, 1)) < 1 || 7 < n) && (i = !0);else {d = e._locale._week.dow, r = e._locale._week.doy;var o = Ce(Ha(), d, r);t = la(a.gg, e._a[he], o.year), s = la(a.w, o.week), null != a.d ? ((n = a.d) < 0 || 6 < n) && (i = !0) : null != a.e ? (n = a.e + d, (a.e < 0 || 6 < a.e) && (i = !0)) : n = d;}s < 1 || s > Ie(t, d, r) ? Y(e)._overflowWeeks = !0 : null != i ? Y(e)._overflowWeekday = !0 : (_ = Re(t, s, n, d, r), e._a[he] = _.year, e._dayOfYear = _.dayOfYear);}(e), null != e._dayOfYear && (d = la(e._a[he], s[he]), (e._dayOfYear > Te(d) || 0 === e._dayOfYear) && (Y(e)._overflowDayOfYear = !0), t = Je(d, 0, e._dayOfYear), e._a[Le] = t.getUTCMonth(), e._a[ce] = t.getUTCDate()), a = 0; a < 3 && null == e._a[a]; ++a) {e._a[a] = r[a] = s[a];}for (; a < 7; a++) {e._a[a] = r[a] = null == e._a[a] ? 2 === a ? 1 : 0 : e._a[a];}24 === e._a[Ye] && 0 === e._a[ye] && 0 === e._a[fe] && 0 === e._a[ke] && (e._nextDay = !0, e._a[Ye] = 0), e._d = (e._useUTC ? Je : function (e, a, t, s, n, d, r) {var _;return e < 100 && 0 <= e ? (_ = new Date(e + 400, a, t, s, n, d, r), isFinite(_.getFullYear()) && _.setFullYear(e)) : _ = new Date(e, a, t, s, n, d, r), _;}).apply(null, r), n = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Ye] = 24), e._w && void 0 !== e._w.d && e._w.d !== n && (Y(e).weekdayMismatch = !0);}}var ha = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,La = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ca = /Z|[+-]\d\d(?::?\d\d)?/,Ya = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],ya = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],fa = /^\/?Date\((\-?\d+)/i;function ka(e) {var a,t,s,n,d,r,_ = e._i,i = ha.exec(_) || La.exec(_);if (i) {for (Y(e).iso = !0, a = 0, t = Ya.length; a < t; a++) {if (Ya[a][1].exec(i[1])) {n = Ya[a][0], s = !1 !== Ya[a][2];break;}}if (null == n) return void (e._isValid = !1);if (i[3]) {for (a = 0, t = ya.length; a < t; a++) {if (ya[a][1].exec(i[3])) {d = (i[2] || " ") + ya[a][0];break;}}if (null == d) return void (e._isValid = !1);}if (!s && null != d) return void (e._isValid = !1);if (i[4]) {if (!ca.exec(i[4])) return void (e._isValid = !1);r = "Z";}e._f = n + (d || "") + (r || ""), wa(e);} else e._isValid = !1;}var pa = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function Da(e, a, t, s, n, d) {var r = [function (e) {var a = parseInt(e, 10);{if (a <= 49) return 2e3 + a;if (a <= 999) return 1900 + a;}return a;}(e), Pe.indexOf(a), parseInt(t, 10), parseInt(s, 10), parseInt(n, 10)];return d && r.push(parseInt(d, 10)), r;}var Ta = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };function ga(e) {var a,t,s,n = pa.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));if (n) {var d = Da(n[4], n[3], n[2], n[5], n[6], n[7]);if (a = n[1], t = d, s = e, a && Ve.indexOf(a) !== new Date(t[0], t[1], t[2]).getDay() && (Y(s).weekdayMismatch = !0, !(s._isValid = !1))) return;e._a = d, e._tzm = function (e, a, t) {if (e) return Ta[e];if (a) return 0;var s = parseInt(t, 10),n = s % 100;return (s - n) / 100 * 60 + n;}(n[8], n[9], n[10]), e._d = Je.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), Y(e).rfc2822 = !0;} else e._isValid = !1;}function wa(e) {if (e._f !== l.ISO_8601) {if (e._f !== l.RFC_2822) {e._a = [], Y(e).empty = !0;var a,t,s,n,d,r,_,i,o = "" + e._i,m = o.length,u = 0;for (s = U(e._f, e._locale).match(z) || [], a = 0; a < s.length; a++) {n = s[a], (t = (o.match(oe(n, e)) || [])[0]) && (0 < (d = o.substr(0, o.indexOf(t))).length && Y(e).unusedInput.push(d), o = o.slice(o.indexOf(t) + t.length), u += t.length), R[n] ? (t ? Y(e).empty = !1 : Y(e).unusedTokens.push(n), r = n, i = e, null != (_ = t) && h(ue, r) && ue[r](_, i._a, i, r)) : e._strict && !t && Y(e).unusedTokens.push(n);}Y(e).charsLeftOver = m - u, 0 < o.length && Y(e).unusedInput.push(o), e._a[Ye] <= 12 && !0 === Y(e).bigHour && 0 < e._a[Ye] && (Y(e).bigHour = void 0), Y(e).parsedDateParts = e._a.slice(0), Y(e).meridiem = e._meridiem, e._a[Ye] = function (e, a, t) {var s;if (null == t) return a;return null != e.meridiemHour ? e.meridiemHour(a, t) : (null != e.isPM && ((s = e.isPM(t)) && a < 12 && (a += 12), s || 12 !== a || (a = 0)), a);}(e._locale, e._a[Ye], e._meridiem), Ma(e), ua(e);} else ga(e);} else ka(e);}function va(e) {var a,t,s,n,d = e._i,r = e._f;return e._locale = e._locale || ma(e._l), null === d || void 0 === r && "" === d ? f({ nullInput: !0 }) : ("string" == typeof d && (e._i = d = e._locale.preparse(d)), D(d) ? new p(ua(d)) : (u(d) ? e._d = d : _(r) ? function (e) {var a, t, s, n, d;if (0 === e._f.length) return Y(e).invalidFormat = !0, e._d = new Date(NaN);for (n = 0; n < e._f.length; n++) {d = 0, a = k({}, e), null != e._useUTC && (a._useUTC = e._useUTC), a._f = e._f[n], wa(a), y(a) && (d += Y(a).charsLeftOver, d += 10 * Y(a).unusedTokens.length, Y(a).score = d, (null == s || d < s) && (s = d, t = a));}L(e, t || a);}(e) : r ? wa(e) : o(t = (a = e)._i) ? a._d = new Date(l.now()) : u(t) ? a._d = new Date(t.valueOf()) : "string" == typeof t ? (s = a, null === (n = fa.exec(s._i)) ? (ka(s), !1 === s._isValid && (delete s._isValid, ga(s), !1 === s._isValid && (delete s._isValid, l.createFromInputFallback(s)))) : s._d = new Date(+n[1])) : _(t) ? (a._a = M(t.slice(0), function (e) {return parseInt(e, 10);}), Ma(a)) : i(t) ? function (e) {if (!e._d) {var a = W(e._i);e._a = M([a.year, a.month, a.day || a.date, a.hour, a.minute, a.second, a.millisecond], function (e) {return e && parseInt(e, 10);}), Ma(e);}}(a) : m(t) ? a._d = new Date(t) : l.createFromInputFallback(a), y(e) || (e._d = null), e));}function Sa(e, a, t, s, n) {var d,r = {};return !0 !== t && !1 !== t || (s = t, t = void 0), (i(e) && function (e) {if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;var a;for (a in e) {if (e.hasOwnProperty(a)) return !1;}return !0;}(e) || _(e) && 0 === e.length) && (e = void 0), r._isAMomentObject = !0, r._useUTC = r._isUTC = n, r._l = t, r._i = e, r._f = a, r._strict = s, (d = new p(ua(va(r))))._nextDay && (d.add(1, "d"), d._nextDay = void 0), d;}function Ha(e, a, t, s) {return Sa(e, a, t, s, !1);}l.createFromInputFallback = t("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) {e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));}), l.ISO_8601 = function () {}, l.RFC_2822 = function () {};var ba = t("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {var e = Ha.apply(null, arguments);return this.isValid() && e.isValid() ? e < this ? this : e : f();}),ja = t("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {var e = Ha.apply(null, arguments);return this.isValid() && e.isValid() ? this < e ? this : e : f();});function xa(e, a) {var t, s;if (1 === a.length && _(a[0]) && (a = a[0]), !a.length) return Ha();for (t = a[0], s = 1; s < a.length; ++s) {a[s].isValid() && !a[s][e](t) || (t = a[s]);}return t;}var Oa = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];function Pa(e) {var a = W(e),t = a.year || 0,s = a.quarter || 0,n = a.month || 0,d = a.week || a.isoWeek || 0,r = a.day || 0,_ = a.hour || 0,i = a.minute || 0,o = a.second || 0,m = a.millisecond || 0;this._isValid = function (e) {for (var a in e) {if (-1 === we.call(Oa, a) || null != e[a] && isNaN(e[a])) return !1;}for (var t = !1, s = 0; s < Oa.length; ++s) {if (e[Oa[s]]) {if (t) return !1;parseFloat(e[Oa[s]]) !== g(e[Oa[s]]) && (t = !0);}}return !0;}(a), this._milliseconds = +m + 1e3 * o + 6e4 * i + 1e3 * _ * 60 * 60, this._days = +r + 7 * d, this._months = +n + 3 * s + 12 * t, this._data = {}, this._locale = ma(), this._bubble();}function Wa(e) {return e instanceof Pa;}function Aa(e) {return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);}function Ea(e, t) {C(e, 0, 0, function () {var e = this.utcOffset(),a = "+";return e < 0 && (e = -e, a = "-"), a + F(~~(e / 60), 2) + t + F(~~e % 60, 2);});}Ea("Z", ":"), Ea("ZZ", ""), ie("Z", de), ie("ZZ", de), le(["Z", "ZZ"], function (e, a, t) {t._useUTC = !0, t._tzm = za(de, e);});var Fa = /([\+\-]|\d\d)/gi;function za(e, a) {var t = (a || "").match(e);if (null === t) return null;var s = ((t[t.length - 1] || []) + "").match(Fa) || ["-", 0, 0],n = 60 * s[1] + g(s[2]);return 0 === n ? 0 : "+" === s[0] ? n : -n;}function Ja(e, a) {var t, s;return a._isUTC ? (t = a.clone(), s = (D(e) || u(e) ? e.valueOf() : Ha(e).valueOf()) - t.valueOf(), t._d.setTime(t._d.valueOf() + s), l.updateOffset(t, !1), t) : Ha(e).local();}function Na(e) {return 15 * -Math.round(e._d.getTimezoneOffset() / 15);}function Ra() {return !!this.isValid() && this._isUTC && 0 === this._offset;}l.updateOffset = function () {};var Ca = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Ia = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function Ua(e, a) {var t,s,n,d = e,r = null;return Wa(e) ? d = { ms: e._milliseconds, d: e._days, M: e._months } : m(e) ? (d = {}, a ? d[a] = e : d.milliseconds = e) : (r = Ca.exec(e)) ? (t = "-" === r[1] ? -1 : 1, d = { y: 0, d: g(r[ce]) * t, h: g(r[Ye]) * t, m: g(r[ye]) * t, s: g(r[fe]) * t, ms: g(Aa(1e3 * r[ke])) * t }) : (r = Ia.exec(e)) ? (t = "-" === r[1] ? -1 : 1, d = { y: Ga(r[2], t), M: Ga(r[3], t), w: Ga(r[4], t), d: Ga(r[5], t), h: Ga(r[6], t), m: Ga(r[7], t), s: Ga(r[8], t) }) : null == d ? d = {} : "object" == typeof d && ("from" in d || "to" in d) && (n = function (e, a) {var t;if (!e.isValid() || !a.isValid()) return { milliseconds: 0, months: 0 };a = Ja(a, e), e.isBefore(a) ? t = Va(e, a) : ((t = Va(a, e)).milliseconds = -t.milliseconds, t.months = -t.months);return t;}(Ha(d.from), Ha(d.to)), (d = {}).ms = n.milliseconds, d.M = n.months), s = new Pa(d), Wa(e) && h(e, "_locale") && (s._locale = e._locale), s;}function Ga(e, a) {var t = e && parseFloat(e.replace(",", "."));return (isNaN(t) ? 0 : t) * a;}function Va(e, a) {var t = {};return t.months = a.month() - e.month() + 12 * (a.year() - e.year()), e.clone().add(t.months, "M").isAfter(a) && --t.months, t.milliseconds = +a - +e.clone().add(t.months, "M"), t;}function Ka(s, n) {return function (e, a) {var t;return null === a || isNaN(+a) || (S(n, "moment()." + n + "(period, number) is deprecated. Please use moment()." + n + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), t = e, e = a, a = t), Za(this, Ua(e = "string" == typeof e ? +e : e, a), s), this;};}function Za(e, a, t, s) {var n = a._milliseconds,d = Aa(a._days),r = Aa(a._months);e.isValid() && (s = null == s || s, r && We(e, He(e, "Month") + r * t), d && be(e, "Date", He(e, "Date") + d * t), n && e._d.setTime(e._d.valueOf() + n * t), s && l.updateOffset(e, d || r));}Ua.fn = Pa.prototype, Ua.invalid = function () {return Ua(NaN);};var $a = Ka(1, "add"),Ba = Ka(-1, "subtract");function qa(e, a) {var t = 12 * (a.year() - e.year()) + (a.month() - e.month()),s = e.clone().add(t, "months");return -(t + (a - s < 0 ? (a - s) / (s - e.clone().add(t - 1, "months")) : (a - s) / (e.clone().add(t + 1, "months") - s))) || 0;}function Qa(e) {var a;return void 0 === e ? this._locale._abbr : (null != (a = ma(e)) && (this._locale = a), this);}l.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", l.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";var Xa = t("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {return void 0 === e ? this.localeData() : this.locale(e);});function et() {return this._locale;}var at = 126227808e5;function tt(e, a) {return (e % a + a) % a;}function st(e, a, t) {return e < 100 && 0 <= e ? new Date(e + 400, a, t) - at : new Date(e, a, t).valueOf();}function nt(e, a, t) {return e < 100 && 0 <= e ? Date.UTC(e + 400, a, t) - at : Date.UTC(e, a, t);}function dt(e, a) {C(0, [e, e.length], 0, a);}function rt(e, a, t, s, n) {var d;return null == e ? Ce(this, s, n).year : ((d = Ie(e, s, n)) < a && (a = d), function (e, a, t, s, n) {var d = Re(e, a, t, s, n),r = Je(d.year, 0, d.dayOfYear);return this.year(r.getUTCFullYear()), this.month(r.getUTCMonth()), this.date(r.getUTCDate()), this;}.call(this, e, a, t, s, n));}C(0, ["gg", 2], 0, function () {return this.weekYear() % 100;}), C(0, ["GG", 2], 0, function () {return this.isoWeekYear() % 100;}), dt("gggg", "weekYear"), dt("ggggg", "weekYear"), dt("GGGG", "isoWeekYear"), dt("GGGGG", "isoWeekYear"), O("weekYear", "gg"), O("isoWeekYear", "GG"), E("weekYear", 1), E("isoWeekYear", 1), ie("G", se), ie("g", se), ie("GG", B, V), ie("gg", B, V), ie("GGGG", ee, Z), ie("gggg", ee, Z), ie("GGGGG", ae, $), ie("ggggg", ae, $), Me(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, a, t, s) {a[s.substr(0, 2)] = g(e);}), Me(["gg", "GG"], function (e, a, t, s) {a[s] = l.parseTwoDigitYear(e);}), C("Q", 0, "Qo", "quarter"), O("quarter", "Q"), E("quarter", 7), ie("Q", G), le("Q", function (e, a) {a[Le] = 3 * (g(e) - 1);}), C("D", ["DD", 2], "Do", "date"), O("date", "D"), E("date", 9), ie("D", B), ie("DD", B, V), ie("Do", function (e, a) {return e ? a._dayOfMonthOrdinalParse || a._ordinalParse : a._dayOfMonthOrdinalParseLenient;}), le(["D", "DD"], ce), le("Do", function (e, a) {a[ce] = g(e.match(B)[0]);});var _t = Se("Date", !0);C("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), O("dayOfYear", "DDD"), E("dayOfYear", 4), ie("DDD", X), ie("DDDD", K), le(["DDD", "DDDD"], function (e, a, t) {t._dayOfYear = g(e);}), C("m", ["mm", 2], 0, "minute"), O("minute", "m"), E("minute", 14), ie("m", B), ie("mm", B, V), le(["m", "mm"], ye);var it = Se("Minutes", !1);C("s", ["ss", 2], 0, "second"), O("second", "s"), E("second", 15), ie("s", B), ie("ss", B, V), le(["s", "ss"], fe);var ot,mt = Se("Seconds", !1);for (C("S", 0, 0, function () {return ~~(this.millisecond() / 100);}), C(0, ["SS", 2], 0, function () {return ~~(this.millisecond() / 10);}), C(0, ["SSS", 3], 0, "millisecond"), C(0, ["SSSS", 4], 0, function () {return 10 * this.millisecond();}), C(0, ["SSSSS", 5], 0, function () {return 100 * this.millisecond();}), C(0, ["SSSSSS", 6], 0, function () {return 1e3 * this.millisecond();}), C(0, ["SSSSSSS", 7], 0, function () {return 1e4 * this.millisecond();}), C(0, ["SSSSSSSS", 8], 0, function () {return 1e5 * this.millisecond();}), C(0, ["SSSSSSSSS", 9], 0, function () {return 1e6 * this.millisecond();}), O("millisecond", "ms"), E("millisecond", 16), ie("S", X, G), ie("SS", X, V), ie("SSS", X, K), ot = "SSSS"; ot.length <= 9; ot += "S") {ie(ot, te);}function ut(e, a) {a[ke] = g(1e3 * ("0." + e));}for (ot = "S"; ot.length <= 9; ot += "S") {le(ot, ut);}var lt = Se("Milliseconds", !1);C("z", 0, 0, "zoneAbbr"), C("zz", 0, 0, "zoneName");var Mt = p.prototype;function ht(e) {return e;}Mt.add = $a, Mt.calendar = function (e, a) {var t = e || Ha(),s = Ja(t, this).startOf("day"),n = l.calendarFormat(this, s) || "sameElse",d = a && (H(a[n]) ? a[n].call(this, t) : a[n]);return this.format(d || this.localeData().calendar(n, this, Ha(t)));}, Mt.clone = function () {return new p(this);}, Mt.diff = function (e, a, t) {var s, n, d;if (!this.isValid()) return NaN;if (!(s = Ja(e, this)).isValid()) return NaN;switch (n = 6e4 * (s.utcOffset() - this.utcOffset()), a = P(a)) {case "year":d = qa(this, s) / 12;break;case "month":d = qa(this, s);break;case "quarter":d = qa(this, s) / 3;break;case "second":d = (this - s) / 1e3;break;case "minute":d = (this - s) / 6e4;break;case "hour":d = (this - s) / 36e5;break;case "day":d = (this - s - n) / 864e5;break;case "week":d = (this - s - n) / 6048e5;break;default:d = this - s;}return t ? d : T(d);}, Mt.endOf = function (e) {var a;if (void 0 === (e = P(e)) || "millisecond" === e || !this.isValid()) return this;var t = this._isUTC ? nt : st;switch (e) {case "year":a = t(this.year() + 1, 0, 1) - 1;break;case "quarter":a = t(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;break;case "month":a = t(this.year(), this.month() + 1, 1) - 1;break;case "week":a = t(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;break;case "isoWeek":a = t(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;break;case "day":case "date":a = t(this.year(), this.month(), this.date() + 1) - 1;break;case "hour":a = this._d.valueOf(), a += 36e5 - tt(a + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;break;case "minute":a = this._d.valueOf(), a += 6e4 - tt(a, 6e4) - 1;break;case "second":a = this._d.valueOf(), a += 1e3 - tt(a, 1e3) - 1;break;}return this._d.setTime(a), l.updateOffset(this, !0), this;}, Mt.format = function (e) {e || (e = this.isUtc() ? l.defaultFormatUtc : l.defaultFormat);var a = I(this, e);return this.localeData().postformat(a);}, Mt.from = function (e, a) {return this.isValid() && (D(e) && e.isValid() || Ha(e).isValid()) ? Ua({ to: this, from: e }).locale(this.locale()).humanize(!a) : this.localeData().invalidDate();}, Mt.fromNow = function (e) {return this.from(Ha(), e);}, Mt.to = function (e, a) {return this.isValid() && (D(e) && e.isValid() || Ha(e).isValid()) ? Ua({ from: this, to: e }).locale(this.locale()).humanize(!a) : this.localeData().invalidDate();}, Mt.toNow = function (e) {return this.to(Ha(), e);}, Mt.get = function (e) {return H(this[e = P(e)]) ? this[e]() : this;}, Mt.invalidAt = function () {return Y(this).overflow;}, Mt.isAfter = function (e, a) {var t = D(e) ? e : Ha(e);return !(!this.isValid() || !t.isValid()) && ("millisecond" === (a = P(a) || "millisecond") ? this.valueOf() > t.valueOf() : t.valueOf() < this.clone().startOf(a).valueOf());}, Mt.isBefore = function (e, a) {var t = D(e) ? e : Ha(e);return !(!this.isValid() || !t.isValid()) && ("millisecond" === (a = P(a) || "millisecond") ? this.valueOf() < t.valueOf() : this.clone().endOf(a).valueOf() < t.valueOf());}, Mt.isBetween = function (e, a, t, s) {var n = D(e) ? e : Ha(e),d = D(a) ? a : Ha(a);return !!(this.isValid() && n.isValid() && d.isValid()) && ("(" === (s = s || "()")[0] ? this.isAfter(n, t) : !this.isBefore(n, t)) && (")" === s[1] ? this.isBefore(d, t) : !this.isAfter(d, t));}, Mt.isSame = function (e, a) {var t,s = D(e) ? e : Ha(e);return !(!this.isValid() || !s.isValid()) && ("millisecond" === (a = P(a) || "millisecond") ? this.valueOf() === s.valueOf() : (t = s.valueOf(), this.clone().startOf(a).valueOf() <= t && t <= this.clone().endOf(a).valueOf()));}, Mt.isSameOrAfter = function (e, a) {return this.isSame(e, a) || this.isAfter(e, a);}, Mt.isSameOrBefore = function (e, a) {return this.isSame(e, a) || this.isBefore(e, a);}, Mt.isValid = function () {return y(this);}, Mt.lang = Xa, Mt.locale = Qa, Mt.localeData = et, Mt.max = ja, Mt.min = ba, Mt.parsingFlags = function () {return L({}, Y(this));}, Mt.set = function (e, a) {if ("object" == typeof e) for (var t = function (e) {var a = [];for (var t in e) {a.push({ unit: t, priority: A[t] });}return a.sort(function (e, a) {return e.priority - a.priority;}), a;}(e = W(e)), s = 0; s < t.length; s++) {this[t[s].unit](e[t[s].unit]);} else if (H(this[e = P(e)])) return this[e](a);return this;}, Mt.startOf = function (e) {var a;if (void 0 === (e = P(e)) || "millisecond" === e || !this.isValid()) return this;var t = this._isUTC ? nt : st;switch (e) {case "year":a = t(this.year(), 0, 1);break;case "quarter":a = t(this.year(), this.month() - this.month() % 3, 1);break;case "month":a = t(this.year(), this.month(), 1);break;case "week":a = t(this.year(), this.month(), this.date() - this.weekday());break;case "isoWeek":a = t(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));break;case "day":case "date":a = t(this.year(), this.month(), this.date());break;case "hour":a = this._d.valueOf(), a -= tt(a + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);break;case "minute":a = this._d.valueOf(), a -= tt(a, 6e4);break;case "second":a = this._d.valueOf(), a -= tt(a, 1e3);break;}return this._d.setTime(a), l.updateOffset(this, !0), this;}, Mt.subtract = Ba, Mt.toArray = function () {var e = this;return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];}, Mt.toObject = function () {var e = this;return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() };}, Mt.toDate = function () {return new Date(this.valueOf());}, Mt.toISOString = function (e) {if (!this.isValid()) return null;var a = !0 !== e,t = a ? this.clone().utc() : this;return t.year() < 0 || 9999 < t.year() ? I(t, a ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : H(Date.prototype.toISOString) ? a ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", I(t, "Z")) : I(t, a ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");}, Mt.inspect = function () {if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";var e = "moment",a = "";this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", a = "Z");var t = "[" + e + '("]',s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",n = a + '[")]';return this.format(t + s + "-MM-DD[T]HH:mm:ss.SSS" + n);}, Mt.toJSON = function () {return this.isValid() ? this.toISOString() : null;}, Mt.toString = function () {return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");}, Mt.unix = function () {return Math.floor(this.valueOf() / 1e3);}, Mt.valueOf = function () {return this._d.valueOf() - 6e4 * (this._offset || 0);}, Mt.creationData = function () {return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };}, Mt.year = ve, Mt.isLeapYear = function () {return ge(this.year());}, Mt.weekYear = function (e) {return rt.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);}, Mt.isoWeekYear = function (e) {return rt.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);}, Mt.quarter = Mt.quarters = function (e) {return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);}, Mt.month = Ae, Mt.daysInMonth = function () {return je(this.year(), this.month());}, Mt.week = Mt.weeks = function (e) {var a = this.localeData().week(this);return null == e ? a : this.add(7 * (e - a), "d");}, Mt.isoWeek = Mt.isoWeeks = function (e) {var a = Ce(this, 1, 4).week;return null == e ? a : this.add(7 * (e - a), "d");}, Mt.weeksInYear = function () {var e = this.localeData()._week;return Ie(this.year(), e.dow, e.doy);}, Mt.isoWeeksInYear = function () {return Ie(this.year(), 1, 4);}, Mt.date = _t, Mt.day = Mt.days = function (e) {if (!this.isValid()) return null != e ? this : NaN;var a,t,s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();return null != e ? (a = e, t = this.localeData(), e = "string" != typeof a ? a : isNaN(a) ? "number" == typeof (a = t.weekdaysParse(a)) ? a : null : parseInt(a, 10), this.add(e - s, "d")) : s;}, Mt.weekday = function (e) {if (!this.isValid()) return null != e ? this : NaN;var a = (this.day() + 7 - this.localeData()._week.dow) % 7;return null == e ? a : this.add(e - a, "d");}, Mt.isoWeekday = function (e) {if (!this.isValid()) return null != e ? this : NaN;if (null == e) return this.day() || 7;var a,t,s = (a = e, t = this.localeData(), "string" == typeof a ? t.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a);return this.day(this.day() % 7 ? s : s - 7);}, Mt.dayOfYear = function (e) {var a = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;return null == e ? a : this.add(e - a, "d");}, Mt.hour = Mt.hours = ta, Mt.minute = Mt.minutes = it, Mt.second = Mt.seconds = mt, Mt.millisecond = Mt.milliseconds = lt, Mt.utcOffset = function (e, a, t) {var s,n = this._offset || 0;if (!this.isValid()) return null != e ? this : NaN;if (null == e) return this._isUTC ? n : Na(this);if ("string" == typeof e) {if (null === (e = za(de, e))) return this;} else Math.abs(e) < 16 && !t && (e *= 60);return !this._isUTC && a && (s = Na(this)), this._offset = e, this._isUTC = !0, null != s && this.add(s, "m"), n !== e && (!a || this._changeInProgress ? Za(this, Ua(e - n, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, l.updateOffset(this, !0), this._changeInProgress = null)), this;}, Mt.utc = function (e) {return this.utcOffset(0, e);}, Mt.local = function (e) {return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Na(this), "m")), this;}, Mt.parseZone = function () {if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);else if ("string" == typeof this._i) {var e = za(ne, this._i);null != e ? this.utcOffset(e) : this.utcOffset(0, !0);}return this;}, Mt.hasAlignedHourOffset = function (e) {return !!this.isValid() && (e = e ? Ha(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0);}, Mt.isDST = function () {return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();}, Mt.isLocal = function () {return !!this.isValid() && !this._isUTC;}, Mt.isUtcOffset = function () {return !!this.isValid() && this._isUTC;}, Mt.isUtc = Ra, Mt.isUTC = Ra, Mt.zoneAbbr = function () {return this._isUTC ? "UTC" : "";}, Mt.zoneName = function () {return this._isUTC ? "Coordinated Universal Time" : "";}, Mt.dates = t("dates accessor is deprecated. Use date instead.", _t), Mt.months = t("months accessor is deprecated. Use month instead", Ae), Mt.years = t("years accessor is deprecated. Use year instead", ve), Mt.zone = t("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function (e, a) {return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, a), this) : -this.utcOffset();}), Mt.isDSTShifted = t("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function () {if (!o(this._isDSTShifted)) return this._isDSTShifted;var e = {};if (k(e, this), (e = va(e))._a) {var a = e._isUTC ? c(e._a) : Ha(e._a);this._isDSTShifted = this.isValid() && 0 < r(e._a, a.toArray());} else this._isDSTShifted = !1;return this._isDSTShifted;});var Lt = j.prototype;function ct(e, a, t, s) {var n = ma(),d = c().set(s, a);return n[t](d, e);}function Yt(e, a, t) {if (m(e) && (a = e, e = void 0), e = e || "", null != a) return ct(e, a, t, "month");var s,n = [];for (s = 0; s < 12; s++) {n[s] = ct(e, s, t, "month");}return n;}function yt(e, a, t, s) {a = ("boolean" == typeof e ? m(a) && (t = a, a = void 0) : (a = e, e = !1, m(t = a) && (t = a, a = void 0)), a || "");var n,d = ma(),r = e ? d._week.dow : 0;if (null != t) return ct(a, (t + r) % 7, s, "day");var _ = [];for (n = 0; n < 7; n++) {_[n] = ct(a, (n + r) % 7, s, "day");}return _;}Lt.calendar = function (e, a, t) {var s = this._calendar[e] || this._calendar.sameElse;return H(s) ? s.call(a, t) : s;}, Lt.longDateFormat = function (e) {var a = this._longDateFormat[e],t = this._longDateFormat[e.toUpperCase()];return a || !t ? a : (this._longDateFormat[e] = t.replace(/MMMM|MM|DD|dddd/g, function (e) {return e.slice(1);}), this._longDateFormat[e]);}, Lt.invalidDate = function () {return this._invalidDate;}, Lt.ordinal = function (e) {return this._ordinal.replace("%d", e);}, Lt.preparse = ht, Lt.postformat = ht, Lt.relativeTime = function (e, a, t, s) {var n = this._relativeTime[t];return H(n) ? n(e, a, t, s) : n.replace(/%d/i, e);}, Lt.pastFuture = function (e, a) {var t = this._relativeTime[0 < e ? "future" : "past"];return H(t) ? t(a) : t.replace(/%s/i, a);}, Lt.set = function (e) {var a, t;for (t in e) {H(a = e[t]) ? this[t] = a : this["_" + t] = a;}this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);}, Lt.months = function (e, a) {return e ? _(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || xe).test(a) ? "format" : "standalone"][e.month()] : _(this._months) ? this._months : this._months.standalone;}, Lt.monthsShort = function (e, a) {return e ? _(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[xe.test(a) ? "format" : "standalone"][e.month()] : _(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;}, Lt.monthsParse = function (e, a, t) {var s, n, d;if (this._monthsParseExact) return function (e, a, t) {var s,n,d,r = e.toLocaleLowerCase();if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) {d = c([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(d, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(d, "").toLocaleLowerCase();}return t ? "MMM" === a ? -1 !== (n = we.call(this._shortMonthsParse, r)) ? n : null : -1 !== (n = we.call(this._longMonthsParse, r)) ? n : null : "MMM" === a ? -1 !== (n = we.call(this._shortMonthsParse, r)) ? n : -1 !== (n = we.call(this._longMonthsParse, r)) ? n : null : -1 !== (n = we.call(this._longMonthsParse, r)) ? n : -1 !== (n = we.call(this._shortMonthsParse, r)) ? n : null;}.call(this, e, a, t);for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {if (n = c([2e3, s]), t && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(n, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(n, "").replace(".", "") + "$", "i")), t || this._monthsParse[s] || (d = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[s] = new RegExp(d.replace(".", ""), "i")), t && "MMMM" === a && this._longMonthsParse[s].test(e)) return s;if (t && "MMM" === a && this._shortMonthsParse[s].test(e)) return s;if (!t && this._monthsParse[s].test(e)) return s;}}, Lt.monthsRegex = function (e) {return this._monthsParseExact ? (h(this, "_monthsRegex") || ze.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = Fe), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);}, Lt.monthsShortRegex = function (e) {return this._monthsParseExact ? (h(this, "_monthsRegex") || ze.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = Ee), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);}, Lt.week = function (e) {return Ce(e, this._week.dow, this._week.doy).week;}, Lt.firstDayOfYear = function () {return this._week.doy;}, Lt.firstDayOfWeek = function () {return this._week.dow;}, Lt.weekdays = function (e, a) {var t = _(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(a) ? "format" : "standalone"];return !0 === e ? Ue(t, this._week.dow) : e ? t[e.day()] : t;}, Lt.weekdaysMin = function (e) {return !0 === e ? Ue(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;}, Lt.weekdaysShort = function (e) {return !0 === e ? Ue(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;}, Lt.weekdaysParse = function (e, a, t) {var s, n, d;if (this._weekdaysParseExact) return function (e, a, t) {var s,n,d,r = e.toLocaleLowerCase();if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) {d = c([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(d, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(d, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(d, "").toLocaleLowerCase();}return t ? "dddd" === a ? -1 !== (n = we.call(this._weekdaysParse, r)) ? n : null : "ddd" === a ? -1 !== (n = we.call(this._shortWeekdaysParse, r)) ? n : null : -1 !== (n = we.call(this._minWeekdaysParse, r)) ? n : null : "dddd" === a ? -1 !== (n = we.call(this._weekdaysParse, r)) ? n : -1 !== (n = we.call(this._shortWeekdaysParse, r)) ? n : -1 !== (n = we.call(this._minWeekdaysParse, r)) ? n : null : "ddd" === a ? -1 !== (n = we.call(this._shortWeekdaysParse, r)) ? n : -1 !== (n = we.call(this._weekdaysParse, r)) ? n : -1 !== (n = we.call(this._minWeekdaysParse, r)) ? n : null : -1 !== (n = we.call(this._minWeekdaysParse, r)) ? n : -1 !== (n = we.call(this._weekdaysParse, r)) ? n : -1 !== (n = we.call(this._shortWeekdaysParse, r)) ? n : null;}.call(this, e, a, t);for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {if (n = c([2e3, 1]).day(s), t && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(n, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(n, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(n, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s] || (d = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[s] = new RegExp(d.replace(".", ""), "i")), t && "dddd" === a && this._fullWeekdaysParse[s].test(e)) return s;if (t && "ddd" === a && this._shortWeekdaysParse[s].test(e)) return s;if (t && "dd" === a && this._minWeekdaysParse[s].test(e)) return s;if (!t && this._weekdaysParse[s].test(e)) return s;}}, Lt.weekdaysRegex = function (e) {return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || qe.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = Ze), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);}, Lt.weekdaysShortRegex = function (e) {return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || qe.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = $e), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);}, Lt.weekdaysMinRegex = function (e) {return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || qe.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Be), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);}, Lt.isPM = function (e) {return "p" === (e + "").toLowerCase().charAt(0);}, Lt.meridiem = function (e, a, t) {return 11 < e ? t ? "pm" : "PM" : t ? "am" : "AM";}, ia("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 === g(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");} }), l.lang = t("moment.lang is deprecated. Use moment.locale instead.", ia), l.langData = t("moment.langData is deprecated. Use moment.localeData instead.", ma);var ft = Math.abs;function kt(e, a, t, s) {var n = Ua(a, t);return e._milliseconds += s * n._milliseconds, e._days += s * n._days, e._months += s * n._months, e._bubble();}function pt(e) {return e < 0 ? Math.floor(e) : Math.ceil(e);}function Dt(e) {return 4800 * e / 146097;}function Tt(e) {return 146097 * e / 4800;}function gt(e) {return function () {return this.as(e);};}var wt = gt("ms"),vt = gt("s"),St = gt("m"),Ht = gt("h"),bt = gt("d"),jt = gt("w"),xt = gt("M"),Ot = gt("Q"),Pt = gt("y");function Wt(e) {return function () {return this.isValid() ? this._data[e] : NaN;};}var At = Wt("milliseconds"),Et = Wt("seconds"),Ft = Wt("minutes"),zt = Wt("hours"),Jt = Wt("days"),Nt = Wt("months"),Rt = Wt("years");var Ct = Math.round,It = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 };var Ut = Math.abs;function Gt(e) {return (0 < e) - (e < 0) || +e;}function Vt() {if (!this.isValid()) return this.localeData().invalidDate();var e,a,t = Ut(this._milliseconds) / 1e3,s = Ut(this._days),n = Ut(this._months);a = T((e = T(t / 60)) / 60), t %= 60, e %= 60;var d = T(n / 12),r = n %= 12,_ = s,i = a,o = e,m = t ? t.toFixed(3).replace(/\.?0+$/, "") : "",u = this.asSeconds();if (!u) return "P0D";var l = u < 0 ? "-" : "",M = Gt(this._months) !== Gt(u) ? "-" : "",h = Gt(this._days) !== Gt(u) ? "-" : "",L = Gt(this._milliseconds) !== Gt(u) ? "-" : "";return l + "P" + (d ? M + d + "Y" : "") + (r ? M + r + "M" : "") + (_ ? h + _ + "D" : "") + (i || o || m ? "T" : "") + (i ? L + i + "H" : "") + (o ? L + o + "M" : "") + (m ? L + m + "S" : "");}var Kt = Pa.prototype;Kt.isValid = function () {return this._isValid;}, Kt.abs = function () {var e = this._data;return this._milliseconds = ft(this._milliseconds), this._days = ft(this._days), this._months = ft(this._months), e.milliseconds = ft(e.milliseconds), e.seconds = ft(e.seconds), e.minutes = ft(e.minutes), e.hours = ft(e.hours), e.months = ft(e.months), e.years = ft(e.years), this;}, Kt.add = function (e, a) {return kt(this, e, a, 1);}, Kt.subtract = function (e, a) {return kt(this, e, a, -1);}, Kt.as = function (e) {if (!this.isValid()) return NaN;var a,t,s = this._milliseconds;if ("month" === (e = P(e)) || "quarter" === e || "year" === e) switch (a = this._days + s / 864e5, t = this._months + Dt(a), e) {case "month":return t;case "quarter":return t / 3;case "year":return t / 12;} else switch (a = this._days + Math.round(Tt(this._months)), e) {case "week":return a / 7 + s / 6048e5;case "day":return a + s / 864e5;case "hour":return 24 * a + s / 36e5;case "minute":return 1440 * a + s / 6e4;case "second":return 86400 * a + s / 1e3;case "millisecond":return Math.floor(864e5 * a) + s;default:throw new Error("Unknown unit " + e);}}, Kt.asMilliseconds = wt, Kt.asSeconds = vt, Kt.asMinutes = St, Kt.asHours = Ht, Kt.asDays = bt, Kt.asWeeks = jt, Kt.asMonths = xt, Kt.asQuarters = Ot, Kt.asYears = Pt, Kt.valueOf = function () {return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12) : NaN;}, Kt._bubble = function () {var e,a,t,s,n,d = this._milliseconds,r = this._days,_ = this._months,i = this._data;return 0 <= d && 0 <= r && 0 <= _ || d <= 0 && r <= 0 && _ <= 0 || (d += 864e5 * pt(Tt(_) + r), _ = r = 0), i.milliseconds = d % 1e3, e = T(d / 1e3), i.seconds = e % 60, a = T(e / 60), i.minutes = a % 60, t = T(a / 60), i.hours = t % 24, _ += n = T(Dt(r += T(t / 24))), r -= pt(Tt(n)), s = T(_ / 12), _ %= 12, i.days = r, i.months = _, i.years = s, this;}, Kt.clone = function () {return Ua(this);}, Kt.get = function (e) {return e = P(e), this.isValid() ? this[e + "s"]() : NaN;}, Kt.milliseconds = At, Kt.seconds = Et, Kt.minutes = Ft, Kt.hours = zt, Kt.days = Jt, Kt.weeks = function () {return T(this.days() / 7);}, Kt.months = Nt, Kt.years = Rt, Kt.humanize = function (e) {if (!this.isValid()) return this.localeData().invalidDate();var a,t,s,n,d,r,_,i,o,m,u,l = this.localeData(),M = (t = !e, s = l, n = Ua(a = this).abs(), d = Ct(n.as("s")), r = Ct(n.as("m")), _ = Ct(n.as("h")), i = Ct(n.as("d")), o = Ct(n.as("M")), m = Ct(n.as("y")), (u = d <= It.ss && ["s", d] || d < It.s && ["ss", d] || r <= 1 && ["m"] || r < It.m && ["mm", r] || _ <= 1 && ["h"] || _ < It.h && ["hh", _] || i <= 1 && ["d"] || i < It.d && ["dd", i] || o <= 1 && ["M"] || o < It.M && ["MM", o] || m <= 1 && ["y"] || ["yy", m])[2] = t, u[3] = 0 < +a, u[4] = s, function (e, a, t, s, n) {return n.relativeTime(a || 1, !!t, e, s);}.apply(null, u));return e && (M = l.pastFuture(+this, M)), l.postformat(M);}, Kt.toISOString = Vt, Kt.toString = Vt, Kt.toJSON = Vt, Kt.locale = Qa, Kt.localeData = et, Kt.toIsoString = t("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Vt), Kt.lang = Xa, C("X", 0, 0, "unix"), C("x", 0, 0, "valueOf"), ie("x", se), ie("X", /[+-]?\d+(\.\d{1,3})?/), le("X", function (e, a, t) {t._d = new Date(1e3 * parseFloat(e, 10));}), le("x", function (e, a, t) {t._d = new Date(g(e));}), l.version = "2.24.0", e = Ha, l.fn = Mt, l.min = function () {return xa("isBefore", [].slice.call(arguments, 0));}, l.max = function () {return xa("isAfter", [].slice.call(arguments, 0));}, l.now = function () {return Date.now ? Date.now() : +new Date();}, l.utc = c, l.unix = function (e) {return Ha(1e3 * e);}, l.months = function (e, a) {return Yt(e, a, "months");}, l.isDate = u, l.locale = ia, l.invalid = f, l.duration = Ua, l.isMoment = D, l.weekdays = function (e, a, t) {return yt(e, a, t, "weekdays");}, l.parseZone = function () {return Ha.apply(null, arguments).parseZone();}, l.localeData = ma, l.isDuration = Wa, l.monthsShort = function (e, a) {return Yt(e, a, "monthsShort");}, l.weekdaysMin = function (e, a, t) {return yt(e, a, t, "weekdaysMin");}, l.defineLocale = oa, l.updateLocale = function (e, a) {if (null != a) {var t,s,n = sa;null != (s = _a(e)) && (n = s._config), (t = new j(a = b(n, a))).parentLocale = na[e], na[e] = t, ia(e);} else null != na[e] && (null != na[e].parentLocale ? na[e] = na[e].parentLocale : null != na[e] && delete na[e]);return na[e];}, l.locales = function () {return s(na);}, l.weekdaysShort = function (e, a, t) {return yt(e, a, t, "weekdaysShort");}, l.normalizeUnits = P, l.relativeTimeRounding = function (e) {return void 0 === e ? Ct : "function" == typeof e && (Ct = e, !0);}, l.relativeTimeThreshold = function (e, a) {return void 0 !== It[e] && (void 0 === a ? It[e] : (It[e] = a, "s" === e && (It.ss = a - 1), !0));}, l.calendarFormat = function (e, a) {var t = e.diff(a, "days", !0);return t < -6 ? "sameElse" : t < -1 ? "lastWeek" : t < 0 ? "lastDay" : t < 1 ? "sameDay" : t < 2 ? "nextDay" : t < 7 ? "nextWeek" : "sameElse";}, l.prototype = Mt, l.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" }, l.defineLocale("af", { months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"), meridiemParse: /vm|nm/i, isPM: function isPM(e) {return /^nm$/i.test(e);}, meridiem: function meridiem(e, a, t) {return e < 12 ? t ? "vm" : "VM" : t ? "nm" : "NM";}, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Vandag om] LT", nextDay: "[M\xf4re om] LT", nextWeek: "dddd [om] LT", lastDay: "[Gister om] LT", lastWeek: "[Laas] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oor %s", past: "%s gelede", s: "'n paar sekondes", ss: "%d sekondes", m: "'n minuut", mm: "%d minute", h: "'n uur", hh: "%d ure", d: "'n dag", dd: "%d dae", M: "'n maand", MM: "%d maande", y: "'n jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function ordinal(e) {return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de");}, week: { dow: 1, doy: 4 } }), l.defineLocale("ar-dz", { months: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"), monthsShort: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"), weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0627\u062D\u062F_\u0627\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u0623\u062D_\u0625\u062B_\u062B\u0644\u0627_\u0623\u0631_\u062E\u0645_\u062C\u0645_\u0633\u0628".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0641\u064A %s", past: "\u0645\u0646\u0630 %s", s: "\u062B\u0648\u0627\u0646", ss: "%d \u062B\u0627\u0646\u064A\u0629", m: "\u062F\u0642\u064A\u0642\u0629", mm: "%d \u062F\u0642\u0627\u0626\u0642", h: "\u0633\u0627\u0639\u0629", hh: "%d \u0633\u0627\u0639\u0627\u062A", d: "\u064A\u0648\u0645", dd: "%d \u0623\u064A\u0627\u0645", M: "\u0634\u0647\u0631", MM: "%d \u0623\u0634\u0647\u0631", y: "\u0633\u0646\u0629", yy: "%d \u0633\u0646\u0648\u0627\u062A" }, week: { dow: 0, doy: 4 } }), l.defineLocale("ar-kw", { months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"), monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"), weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062A\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0627\u062D\u062F_\u0627\u062A\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0641\u064A %s", past: "\u0645\u0646\u0630 %s", s: "\u062B\u0648\u0627\u0646", ss: "%d \u062B\u0627\u0646\u064A\u0629", m: "\u062F\u0642\u064A\u0642\u0629", mm: "%d \u062F\u0642\u0627\u0626\u0642", h: "\u0633\u0627\u0639\u0629", hh: "%d \u0633\u0627\u0639\u0627\u062A", d: "\u064A\u0648\u0645", dd: "%d \u0623\u064A\u0627\u0645", M: "\u0634\u0647\u0631", MM: "%d \u0623\u0634\u0647\u0631", y: "\u0633\u0646\u0629", yy: "%d \u0633\u0646\u0648\u0627\u062A" }, week: { dow: 0, doy: 12 } });var Zt = { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 0: "0" },$t = function $t(e) {return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 <= e % 100 && e % 100 <= 10 ? 3 : 11 <= e % 100 ? 4 : 5;},Bt = { s: ["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629", "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062B\u0627\u0646\u064A\u062A\u0627\u0646", "\u062B\u0627\u0646\u064A\u062A\u064A\u0646"], "%d \u062B\u0648\u0627\u0646", "%d \u062B\u0627\u0646\u064A\u0629", "%d \u062B\u0627\u0646\u064A\u0629"], m: ["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629", "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062F\u0642\u064A\u0642\u062A\u0627\u0646", "\u062F\u0642\u064A\u0642\u062A\u064A\u0646"], "%d \u062F\u0642\u0627\u0626\u0642", "%d \u062F\u0642\u064A\u0642\u0629", "%d \u062F\u0642\u064A\u0642\u0629"], h: ["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u0633\u0627\u0639\u062A\u0627\u0646", "\u0633\u0627\u0639\u062A\u064A\u0646"], "%d \u0633\u0627\u0639\u0627\u062A", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"], d: ["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645", "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F", ["\u064A\u0648\u0645\u0627\u0646", "\u064A\u0648\u0645\u064A\u0646"], "%d \u0623\u064A\u0627\u0645", "%d \u064A\u0648\u0645\u064B\u0627", "%d \u064A\u0648\u0645"], M: ["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064A\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"], y: ["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064A\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064B\u0627", "%d \u0639\u0627\u0645"] },qt = function qt(r) {return function (e, a, t, s) {var n = $t(e),d = Bt[r][$t(e)];return 2 === n && (d = d[a ? 0 : 1]), d.replace(/%d/i, e);};},Qt = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"];l.defineLocale("ar-ly", { months: Qt, monthsShort: Qt, weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/\u200FM/\u200FYYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /\u0635|\u0645/, isPM: function isPM(e) {return "\u0645" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0635" : "\u0645";}, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0628\u0639\u062F %s", past: "\u0645\u0646\u0630 %s", s: qt("s"), ss: qt("s"), m: qt("m"), mm: qt("m"), h: qt("h"), hh: qt("h"), d: qt("d"), dd: qt("d"), M: qt("M"), MM: qt("M"), y: qt("y"), yy: qt("y") }, preparse: function preparse(e) {return e.replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return Zt[e];}).replace(/,/g, "\u060C");}, week: { dow: 6, doy: 12 } }), l.defineLocale("ar-ma", { months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"), monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648\u0632_\u063A\u0634\u062A_\u0634\u062A\u0646\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062F\u062C\u0646\u0628\u0631".split("_"), weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062A\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0627\u062D\u062F_\u0627\u062A\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0641\u064A %s", past: "\u0645\u0646\u0630 %s", s: "\u062B\u0648\u0627\u0646", ss: "%d \u062B\u0627\u0646\u064A\u0629", m: "\u062F\u0642\u064A\u0642\u0629", mm: "%d \u062F\u0642\u0627\u0626\u0642", h: "\u0633\u0627\u0639\u0629", hh: "%d \u0633\u0627\u0639\u0627\u062A", d: "\u064A\u0648\u0645", dd: "%d \u0623\u064A\u0627\u0645", M: "\u0634\u0647\u0631", MM: "%d \u0623\u0634\u0647\u0631", y: "\u0633\u0646\u0629", yy: "%d \u0633\u0646\u0648\u0627\u062A" }, week: { dow: 6, doy: 12 } });var Xt = { 1: "\u0661", 2: "\u0662", 3: "\u0663", 4: "\u0664", 5: "\u0665", 6: "\u0666", 7: "\u0667", 8: "\u0668", 9: "\u0669", 0: "\u0660" },es = { "\u0661": "1", "\u0662": "2", "\u0663": "3", "\u0664": "4", "\u0665": "5", "\u0666": "6", "\u0667": "7", "\u0668": "8", "\u0669": "9", "\u0660": "0" };l.defineLocale("ar-sa", { months: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"), monthsShort: "\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"), weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /\u0635|\u0645/, isPM: function isPM(e) {return "\u0645" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0635" : "\u0645";}, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0641\u064A %s", past: "\u0645\u0646\u0630 %s", s: "\u062B\u0648\u0627\u0646", ss: "%d \u062B\u0627\u0646\u064A\u0629", m: "\u062F\u0642\u064A\u0642\u0629", mm: "%d \u062F\u0642\u0627\u0626\u0642", h: "\u0633\u0627\u0639\u0629", hh: "%d \u0633\u0627\u0639\u0627\u062A", d: "\u064A\u0648\u0645", dd: "%d \u0623\u064A\u0627\u0645", M: "\u0634\u0647\u0631", MM: "%d \u0623\u0634\u0647\u0631", y: "\u0633\u0646\u0629", yy: "%d \u0633\u0646\u0648\u0627\u062A" }, preparse: function preparse(e) {return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function (e) {return es[e];}).replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return Xt[e];}).replace(/,/g, "\u060C");}, week: { dow: 0, doy: 6 } }), l.defineLocale("ar-tn", { months: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"), monthsShort: "\u062C\u0627\u0646\u0641\u064A_\u0641\u064A\u0641\u0631\u064A_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064A\u0644_\u0645\u0627\u064A_\u062C\u0648\u0627\u0646_\u062C\u0648\u064A\u0644\u064A\u0629_\u0623\u0648\u062A_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631".split("_"), weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0641\u064A %s", past: "\u0645\u0646\u0630 %s", s: "\u062B\u0648\u0627\u0646", ss: "%d \u062B\u0627\u0646\u064A\u0629", m: "\u062F\u0642\u064A\u0642\u0629", mm: "%d \u062F\u0642\u0627\u0626\u0642", h: "\u0633\u0627\u0639\u0629", hh: "%d \u0633\u0627\u0639\u0627\u062A", d: "\u064A\u0648\u0645", dd: "%d \u0623\u064A\u0627\u0645", M: "\u0634\u0647\u0631", MM: "%d \u0623\u0634\u0647\u0631", y: "\u0633\u0646\u0629", yy: "%d \u0633\u0646\u0648\u0627\u062A" }, week: { dow: 1, doy: 4 } });var as = { 1: "\u0661", 2: "\u0662", 3: "\u0663", 4: "\u0664", 5: "\u0665", 6: "\u0666", 7: "\u0667", 8: "\u0668", 9: "\u0669", 0: "\u0660" },ts = { "\u0661": "1", "\u0662": "2", "\u0663": "3", "\u0664": "4", "\u0665": "5", "\u0666": "6", "\u0667": "7", "\u0668": "8", "\u0669": "9", "\u0660": "0" },ss = function ss(e) {return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 <= e % 100 && e % 100 <= 10 ? 3 : 11 <= e % 100 ? 4 : 5;},ns = { s: ["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629", "\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062B\u0627\u0646\u064A\u062A\u0627\u0646", "\u062B\u0627\u0646\u064A\u062A\u064A\u0646"], "%d \u062B\u0648\u0627\u0646", "%d \u062B\u0627\u0646\u064A\u0629", "%d \u062B\u0627\u0646\u064A\u0629"], m: ["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629", "\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u062F\u0642\u064A\u0642\u062A\u0627\u0646", "\u062F\u0642\u064A\u0642\u062A\u064A\u0646"], "%d \u062F\u0642\u0627\u0626\u0642", "%d \u062F\u0642\u064A\u0642\u0629", "%d \u062F\u0642\u064A\u0642\u0629"], h: ["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", ["\u0633\u0627\u0639\u062A\u0627\u0646", "\u0633\u0627\u0639\u062A\u064A\u0646"], "%d \u0633\u0627\u0639\u0627\u062A", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"], d: ["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645", "\u064A\u0648\u0645 \u0648\u0627\u062D\u062F", ["\u064A\u0648\u0645\u0627\u0646", "\u064A\u0648\u0645\u064A\u0646"], "%d \u0623\u064A\u0627\u0645", "%d \u064A\u0648\u0645\u064B\u0627", "%d \u064A\u0648\u0645"], M: ["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064A\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"], y: ["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", "\u0639\u0627\u0645 \u0648\u0627\u062D\u062F", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064A\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064B\u0627", "%d \u0639\u0627\u0645"] },ds = function ds(r) {return function (e, a, t, s) {var n = ss(e),d = ns[r][ss(e)];return 2 === n && (d = d[a ? 0 : 1]), d.replace(/%d/i, e);};},rs = ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"];l.defineLocale("ar", { months: rs, monthsShort: rs, weekdays: "\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A".split("_"), weekdaysShort: "\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A".split("_"), weekdaysMin: "\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/\u200FM/\u200FYYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /\u0635|\u0645/, isPM: function isPM(e) {return "\u0645" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0635" : "\u0645";}, calendar: { sameDay: "[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay: "[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay: "[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek: "dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse: "L" }, relativeTime: { future: "\u0628\u0639\u062F %s", past: "\u0645\u0646\u0630 %s", s: ds("s"), ss: ds("s"), m: ds("m"), mm: ds("m"), h: ds("h"), hh: ds("h"), d: ds("d"), dd: ds("d"), M: ds("M"), MM: ds("M"), y: ds("y"), yy: ds("y") }, preparse: function preparse(e) {return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function (e) {return ts[e];}).replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return as[e];}).replace(/,/g, "\u060C");}, week: { dow: 6, doy: 12 } });var _s = { 1: "-inci", 5: "-inci", 8: "-inci", 70: "-inci", 80: "-inci", 2: "-nci", 7: "-nci", 20: "-nci", 50: "-nci", 3: "-\xfcnc\xfc", 4: "-\xfcnc\xfc", 100: "-\xfcnc\xfc", 6: "-nc\u0131", 9: "-uncu", 10: "-uncu", 30: "-uncu", 60: "-\u0131nc\u0131", 90: "-\u0131nc\u0131" };function is(e, a, t) {var s, n;return "m" === t ? a ? "\u0445\u0432\u0456\u043B\u0456\u043D\u0430" : "\u0445\u0432\u0456\u043B\u0456\u043D\u0443" : "h" === t ? a ? "\u0433\u0430\u0434\u0437\u0456\u043D\u0430" : "\u0433\u0430\u0434\u0437\u0456\u043D\u0443" : e + " " + (s = +e, n = { ss: a ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434", mm: a ? "\u0445\u0432\u0456\u043B\u0456\u043D\u0430_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D" : "\u0445\u0432\u0456\u043B\u0456\u043D\u0443_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D", hh: a ? "\u0433\u0430\u0434\u0437\u0456\u043D\u0430_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D" : "\u0433\u0430\u0434\u0437\u0456\u043D\u0443_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D", dd: "\u0434\u0437\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u0437\u0451\u043D", MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u044B_\u043C\u0435\u0441\u044F\u0446\u0430\u045E", yy: "\u0433\u043E\u0434_\u0433\u0430\u0434\u044B_\u0433\u0430\u0434\u043E\u045E" }[t].split("_"), s % 10 == 1 && s % 100 != 11 ? n[0] : 2 <= s % 10 && s % 10 <= 4 && (s % 100 < 10 || 20 <= s % 100) ? n[1] : n[2]);}l.defineLocale("az", { months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"), monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"), weekdays: "Bazar_Bazar ert\u0259si_\xC7\u0259r\u015F\u0259nb\u0259 ax\u015Fam\u0131_\xC7\u0259r\u015F\u0259nb\u0259_C\xFCm\u0259 ax\u015Fam\u0131_C\xFCm\u0259_\u015E\u0259nb\u0259".split("_"), weekdaysShort: "Baz_BzE_\xC7Ax_\xC7\u0259r_CAx_C\xFCm_\u015E\u0259n".split("_"), weekdaysMin: "Bz_BE_\xC7A_\xC7\u0259_CA_C\xFC_\u015E\u0259".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bug\xfcn saat] LT", nextDay: "[sabah saat] LT", nextWeek: "[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT", lastDay: "[d\xFCn\u0259n] LT", lastWeek: "[ke\xE7\u0259n h\u0259ft\u0259] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s sonra", past: "%s \u0259vv\u0259l", s: "birne\xE7\u0259 saniy\u0259", ss: "%d saniy\u0259", m: "bir d\u0259qiq\u0259", mm: "%d d\u0259qiq\u0259", h: "bir saat", hh: "%d saat", d: "bir g\xfcn", dd: "%d g\xfcn", M: "bir ay", MM: "%d ay", y: "bir il", yy: "%d il" }, meridiemParse: /gec\u0259|s\u0259h\u0259r|g\xfcnd\xfcz|ax\u015fam/, isPM: function isPM(e) {return /^(g\xfcnd\xfcz|ax\u015fam)$/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 4 ? "gec\u0259" : e < 12 ? "s\u0259h\u0259r" : e < 17 ? "g\xfcnd\xfcz" : "ax\u015Fam";}, dayOfMonthOrdinalParse: /\d{1,2}-(\u0131nc\u0131|inci|nci|\xfcnc\xfc|nc\u0131|uncu)/, ordinal: function ordinal(e) {if (0 === e) return e + "-\u0131nc\u0131";var a = e % 10;return e + (_s[a] || _s[e % 100 - a] || _s[100 <= e ? 100 : null]);}, week: { dow: 1, doy: 7 } }), l.defineLocale("be", { months: { format: "\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044F_\u043B\u044E\u0442\u0430\u0433\u0430_\u0441\u0430\u043A\u0430\u0432\u0456\u043A\u0430_\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A\u0430_\u0442\u0440\u0430\u045E\u043D\u044F_\u0447\u044D\u0440\u0432\u0435\u043D\u044F_\u043B\u0456\u043F\u0435\u043D\u044F_\u0436\u043D\u0456\u045E\u043D\u044F_\u0432\u0435\u0440\u0430\u0441\u043D\u044F_\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A\u0430_\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434\u0430_\u0441\u043D\u0435\u0436\u043D\u044F".split("_"), standalone: "\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044C_\u043B\u044E\u0442\u044B_\u0441\u0430\u043A\u0430\u0432\u0456\u043A_\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u044D\u0440\u0432\u0435\u043D\u044C_\u043B\u0456\u043F\u0435\u043D\u044C_\u0436\u043D\u0456\u0432\u0435\u043D\u044C_\u0432\u0435\u0440\u0430\u0441\u0435\u043D\u044C_\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A_\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434_\u0441\u043D\u0435\u0436\u0430\u043D\u044C".split("_") }, monthsShort: "\u0441\u0442\u0443\u0434_\u043B\u044E\u0442_\u0441\u0430\u043A_\u043A\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044D\u0440\u0432_\u043B\u0456\u043F_\u0436\u043D\u0456\u0432_\u0432\u0435\u0440_\u043A\u0430\u0441\u0442_\u043B\u0456\u0441\u0442_\u0441\u043D\u0435\u0436".split("_"), weekdays: { format: "\u043D\u044F\u0434\u0437\u0435\u043B\u044E_\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A_\u0430\u045E\u0442\u043E\u0440\u0430\u043A_\u0441\u0435\u0440\u0430\u0434\u0443_\u0447\u0430\u0446\u0432\u0435\u0440_\u043F\u044F\u0442\u043D\u0456\u0446\u0443_\u0441\u0443\u0431\u043E\u0442\u0443".split("_"), standalone: "\u043D\u044F\u0434\u0437\u0435\u043B\u044F_\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A_\u0430\u045E\u0442\u043E\u0440\u0430\u043A_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043F\u044F\u0442\u043D\u0456\u0446\u0430_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"), isFormat: /\[ ?[\u0423\u0443\u045e] ?(?:\u043c\u0456\u043d\u0443\u043b\u0443\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443\u044e)? ?\] ?dddd/ }, weekdaysShort: "\u043D\u0434_\u043F\u043D_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043F\u0442_\u0441\u0431".split("_"), weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043F\u0442_\u0441\u0431".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY \u0433.", LLL: "D MMMM YYYY \u0433., HH:mm", LLLL: "dddd, D MMMM YYYY \u0433., HH:mm" }, calendar: { sameDay: "[\u0421\u0451\u043D\u043D\u044F \u045E] LT", nextDay: "[\u0417\u0430\u045E\u0442\u0440\u0430 \u045E] LT", lastDay: "[\u0423\u0447\u043E\u0440\u0430 \u045E] LT", nextWeek: function nextWeek() {return "[\u0423] dddd [\u045E] LT";}, lastWeek: function lastWeek() {switch (this.day()) {case 0:case 3:case 5:case 6:return "[\u0423 \u043C\u0456\u043D\u0443\u043B\u0443\u044E] dddd [\u045E] LT";case 1:case 2:case 4:return "[\u0423 \u043C\u0456\u043D\u0443\u043B\u044B] dddd [\u045E] LT";}}, sameElse: "L" }, relativeTime: { future: "\u043F\u0440\u0430\u0437 %s", past: "%s \u0442\u0430\u043C\u0443", s: "\u043D\u0435\u043A\u0430\u043B\u044C\u043A\u0456 \u0441\u0435\u043A\u0443\u043D\u0434", m: is, mm: is, h: is, hh: is, d: "\u0434\u0437\u0435\u043D\u044C", dd: is, M: "\u043C\u0435\u0441\u044F\u0446", MM: is, y: "\u0433\u043E\u0434", yy: is }, meridiemParse: /\u043d\u043e\u0447\u044b|\u0440\u0430\u043d\u0456\u0446\u044b|\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430/, isPM: function isPM(e) {return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430)$/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u043D\u043E\u0447\u044B" : e < 12 ? "\u0440\u0430\u043D\u0456\u0446\u044B" : e < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u0430\u0440\u0430";}, dayOfMonthOrdinalParse: /\d{1,2}-(\u0456|\u044b|\u0433\u0430)/, ordinal: function ordinal(e, a) {switch (a) {case "M":case "d":case "DDD":case "w":case "W":return e % 10 != 2 && e % 10 != 3 || e % 100 == 12 || e % 100 == 13 ? e + "-\u044B" : e + "-\u0456";case "D":return e + "-\u0433\u0430";default:return e;}}, week: { dow: 1, doy: 7 } }), l.defineLocale("bg", { months: "\u044F\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"), monthsShort: "\u044F\u043D\u0440_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u044E\u043D\u0438_\u044E\u043B\u0438_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"), weekdays: "\u043D\u0435\u0434\u0435\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u044F\u0434\u0430_\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A_\u043F\u0435\u0442\u044A\u043A_\u0441\u044A\u0431\u043E\u0442\u0430".split("_"), weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u044F_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u044A\u0431".split("_"), weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[\u0414\u043D\u0435\u0441 \u0432] LT", nextDay: "[\u0423\u0442\u0440\u0435 \u0432] LT", nextWeek: "dddd [\u0432] LT", lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:case 3:case 6:return "[\u0412 \u0438\u0437\u043C\u0438\u043D\u0430\u043B\u0430\u0442\u0430] dddd [\u0432] LT";case 1:case 2:case 4:case 5:return "[\u0412 \u0438\u0437\u043C\u0438\u043D\u0430\u043B\u0438\u044F] dddd [\u0432] LT";}}, sameElse: "L" }, relativeTime: { future: "\u0441\u043B\u0435\u0434 %s", past: "\u043F\u0440\u0435\u0434\u0438 %s", s: "\u043D\u044F\u043A\u043E\u043B\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438", ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434\u0438", m: "\u043C\u0438\u043D\u0443\u0442\u0430", mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438", h: "\u0447\u0430\u0441", hh: "%d \u0447\u0430\u0441\u0430", d: "\u0434\u0435\u043D", dd: "%d \u0434\u043D\u0438", M: "\u043C\u0435\u0441\u0435\u0446", MM: "%d \u043C\u0435\u0441\u0435\u0446\u0430", y: "\u0433\u043E\u0434\u0438\u043D\u0430", yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438" }, dayOfMonthOrdinalParse: /\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/, ordinal: function ordinal(e) {var a = e % 10,t = e % 100;return 0 === e ? e + "-\u0435\u0432" : 0 === t ? e + "-\u0435\u043D" : 10 < t && t < 20 ? e + "-\u0442\u0438" : 1 === a ? e + "-\u0432\u0438" : 2 === a ? e + "-\u0440\u0438" : 7 === a || 8 === a ? e + "-\u043C\u0438" : e + "-\u0442\u0438";}, week: { dow: 1, doy: 7 } }), l.defineLocale("bm", { months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M\u025Bkalo_Zuw\u025Bnkalo_Zuluyekalo_Utikalo_S\u025Btanburukalo_\u0254kut\u0254burukalo_Nowanburukalo_Desanburukalo".split("_"), monthsShort: "Zan_Few_Mar_Awi_M\u025B_Zuw_Zul_Uti_S\u025Bt_\u0254ku_Now_Des".split("_"), weekdays: "Kari_Nt\u025Bn\u025Bn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"), weekdaysShort: "Kar_Nt\u025B_Tar_Ara_Ala_Jum_Sib".split("_"), weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "MMMM [tile] D [san] YYYY", LLL: "MMMM [tile] D [san] YYYY [l\u025Br\u025B] HH:mm", LLLL: "dddd MMMM [tile] D [san] YYYY [l\u025Br\u025B] HH:mm" }, calendar: { sameDay: "[Bi l\u025Br\u025B] LT", nextDay: "[Sini l\u025Br\u025B] LT", nextWeek: "dddd [don l\u025Br\u025B] LT", lastDay: "[Kunu l\u025Br\u025B] LT", lastWeek: "dddd [t\u025Bm\u025Bnen l\u025Br\u025B] LT", sameElse: "L" }, relativeTime: { future: "%s k\u0254n\u0254", past: "a b\u025B %s b\u0254", s: "sanga dama dama", ss: "sekondi %d", m: "miniti kelen", mm: "miniti %d", h: "l\u025Br\u025B kelen", hh: "l\u025Br\u025B %d", d: "tile kelen", dd: "tile %d", M: "kalo kelen", MM: "kalo %d", y: "san kelen", yy: "san %d" }, week: { dow: 1, doy: 4 } });var os = { 1: "\u09E7", 2: "\u09E8", 3: "\u09E9", 4: "\u09EA", 5: "\u09EB", 6: "\u09EC", 7: "\u09ED", 8: "\u09EE", 9: "\u09EF", 0: "\u09E6" },ms = { "\u09E7": "1", "\u09E8": "2", "\u09E9": "3", "\u09EA": "4", "\u09EB": "5", "\u09EC": "6", "\u09ED": "7", "\u09EE": "8", "\u09EF": "9", "\u09E6": "0" };l.defineLocale("bn", { months: "\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09C0_\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0\u09BF\u09B2_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2\u09BE\u0987_\u0986\u0997\u09B8\u09CD\u099F_\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0_\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0_\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0_\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0".split("_"), monthsShort: "\u099C\u09BE\u09A8\u09C1_\u09AB\u09C7\u09AC_\u09AE\u09BE\u09B0\u09CD\u099A_\u098F\u09AA\u09CD\u09B0_\u09AE\u09C7_\u099C\u09C1\u09A8_\u099C\u09C1\u09B2_\u0986\u0997_\u09B8\u09C7\u09AA\u09CD\u099F_\u0985\u0995\u09CD\u099F\u09CB_\u09A8\u09AD\u09C7_\u09A1\u09BF\u09B8\u09C7".split("_"), weekdays: "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0_\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0_\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0_\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0_\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0_\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0".split("_"), weekdaysShort: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997\u09B2_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"), weekdaysMin: "\u09B0\u09AC\u09BF_\u09B8\u09CB\u09AE_\u09AE\u0999\u09CD\u0997_\u09AC\u09C1\u09A7_\u09AC\u09C3\u09B9\u0983_\u09B6\u09C1\u0995\u09CD\u09B0_\u09B6\u09A8\u09BF".split("_"), longDateFormat: { LT: "A h:mm \u09B8\u09AE\u09DF", LTS: "A h:mm:ss \u09B8\u09AE\u09DF", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF", LLLL: "dddd, D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF" }, calendar: { sameDay: "[\u0986\u099C] LT", nextDay: "[\u0986\u0997\u09BE\u09AE\u09C0\u0995\u09BE\u09B2] LT", nextWeek: "dddd, LT", lastDay: "[\u0997\u09A4\u0995\u09BE\u09B2] LT", lastWeek: "[\u0997\u09A4] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u09AA\u09B0\u09C7", past: "%s \u0986\u0997\u09C7", s: "\u0995\u09DF\u09C7\u0995 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1", ss: "%d \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1", m: "\u098F\u0995 \u09AE\u09BF\u09A8\u09BF\u099F", mm: "%d \u09AE\u09BF\u09A8\u09BF\u099F", h: "\u098F\u0995 \u0998\u09A8\u09CD\u099F\u09BE", hh: "%d \u0998\u09A8\u09CD\u099F\u09BE", d: "\u098F\u0995 \u09A6\u09BF\u09A8", dd: "%d \u09A6\u09BF\u09A8", M: "\u098F\u0995 \u09AE\u09BE\u09B8", MM: "%d \u09AE\u09BE\u09B8", y: "\u098F\u0995 \u09AC\u099B\u09B0", yy: "%d \u09AC\u099B\u09B0" }, preparse: function preparse(e) {return e.replace(/[\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef\u09e6]/g, function (e) {return ms[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return os[e];});}, meridiemParse: /\u09b0\u09be\u09a4|\u09b8\u0995\u09be\u09b2|\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09be\u09b2|\u09b0\u09be\u09a4/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u09B0\u09BE\u09A4" === a && 4 <= e || "\u09A6\u09C1\u09AA\u09C1\u09B0" === a && e < 5 || "\u09AC\u09BF\u0995\u09BE\u09B2" === a ? e + 12 : e;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u09B0\u09BE\u09A4" : e < 10 ? "\u09B8\u0995\u09BE\u09B2" : e < 17 ? "\u09A6\u09C1\u09AA\u09C1\u09B0" : e < 20 ? "\u09AC\u09BF\u0995\u09BE\u09B2" : "\u09B0\u09BE\u09A4";}, week: { dow: 0, doy: 6 } });var us = { 1: "\u0F21", 2: "\u0F22", 3: "\u0F23", 4: "\u0F24", 5: "\u0F25", 6: "\u0F26", 7: "\u0F27", 8: "\u0F28", 9: "\u0F29", 0: "\u0F20" },ls = { "\u0F21": "1", "\u0F22": "2", "\u0F23": "3", "\u0F24": "4", "\u0F25": "5", "\u0F26": "6", "\u0F27": "7", "\u0F28": "8", "\u0F29": "9", "\u0F20": "0" };function Ms(e, a, t) {var s, n, d;return e + " " + (s = { mm: "munutenn", MM: "miz", dd: "devezh" }[t], 2 !== e ? s : void 0 !== (d = { m: "v", b: "v", d: "z" })[(n = s).charAt(0)] ? d[n.charAt(0)] + n.substring(1) : n);}function hs(e, a, t) {var s = e + " ";switch (t) {case "ss":return s += 1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi";case "m":return a ? "jedna minuta" : "jedne minute";case "mm":return s += 1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta";case "h":return a ? "jedan sat" : "jednog sata";case "hh":return s += 1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati";case "dd":return s += 1 === e ? "dan" : "dana";case "MM":return s += 1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci";case "yy":return s += 1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina";}}l.defineLocale("bo", { months: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54".split("_"), monthsShort: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54".split("_"), weekdays: "\u0F42\u0F5F\u0F60\u0F0B\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F42\u0F5F\u0F60\u0F0B\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"), weekdaysShort: "\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"), weekdaysMin: "\u0F49\u0F72\u0F0B\u0F58\u0F0B_\u0F5F\u0FB3\u0F0B\u0F56\u0F0B_\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B_\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B_\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74_\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B_\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[\u0F51\u0F72\u0F0B\u0F62\u0F72\u0F44] LT", nextDay: "[\u0F66\u0F44\u0F0B\u0F49\u0F72\u0F53] LT", nextWeek: "[\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F55\u0FB2\u0F42\u0F0B\u0F62\u0F97\u0F7A\u0F66\u0F0B\u0F58], LT", lastDay: "[\u0F41\u0F0B\u0F66\u0F44] LT", lastWeek: "[\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F55\u0FB2\u0F42\u0F0B\u0F58\u0F50\u0F60\u0F0B\u0F58] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0F63\u0F0B", past: "%s \u0F66\u0F94\u0F53\u0F0B\u0F63", s: "\u0F63\u0F58\u0F0B\u0F66\u0F44", ss: "%d \u0F66\u0F90\u0F62\u0F0B\u0F46\u0F0D", m: "\u0F66\u0F90\u0F62\u0F0B\u0F58\u0F0B\u0F42\u0F45\u0F72\u0F42", mm: "%d \u0F66\u0F90\u0F62\u0F0B\u0F58", h: "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51\u0F0B\u0F42\u0F45\u0F72\u0F42", hh: "%d \u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51", d: "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F45\u0F72\u0F42", dd: "%d \u0F49\u0F72\u0F53\u0F0B", M: "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F45\u0F72\u0F42", MM: "%d \u0F5F\u0FB3\u0F0B\u0F56", y: "\u0F63\u0F7C\u0F0B\u0F42\u0F45\u0F72\u0F42", yy: "%d \u0F63\u0F7C" }, preparse: function preparse(e) {return e.replace(/[\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29\u0f20]/g, function (e) {return ls[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return us[e];});}, meridiemParse: /\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c|\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66|\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C" === a && 4 <= e || "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F74\u0F44" === a && e < 5 || "\u0F51\u0F42\u0F7C\u0F44\u0F0B\u0F51\u0F42" === a ? e + 12 : e;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C" : e < 10 ? "\u0F5E\u0F7C\u0F42\u0F66\u0F0B\u0F40\u0F66" : e < 17 ? "\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F74\u0F44" : e < 20 ? "\u0F51\u0F42\u0F7C\u0F44\u0F0B\u0F51\u0F42" : "\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C";}, week: { dow: 0, doy: 6 } }), l.defineLocale("br", { months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"), weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "h[e]mm A", LTS: "h[e]mm:ss A", L: "DD/MM/YYYY", LL: "D [a viz] MMMM YYYY", LLL: "D [a viz] MMMM YYYY h[e]mm A", LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A" }, calendar: { sameDay: "[Hiziv da] LT", nextDay: "[Warc'hoazh da] LT", nextWeek: "dddd [da] LT", lastDay: "[Dec'h da] LT", lastWeek: "dddd [paset da] LT", sameElse: "L" }, relativeTime: { future: "a-benn %s", past: "%s 'zo", s: "un nebeud segondenno\xf9", ss: "%d eilenn", m: "ur vunutenn", mm: Ms, h: "un eur", hh: "%d eur", d: "un devezh", dd: Ms, M: "ur miz", MM: Ms, y: "ur bloaz", yy: function yy(e) {switch (function e(a) {return 9 < a ? e(a % 10) : a;}(e)) {case 1:case 3:case 4:case 5:case 9:return e + " bloaz";default:return e + " vloaz";}} }, dayOfMonthOrdinalParse: /\d{1,2}(a\xf1|vet)/, ordinal: function ordinal(e) {return e + (1 === e ? "a\xf1" : "vet");}, week: { dow: 1, doy: 4 } }), l.defineLocale("bs", { months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"), monthsParseExact: !0, weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sutra u] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[u] [nedjelju] [u] LT";case 3:return "[u] [srijedu] [u] LT";case 6:return "[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return "[u] dddd [u] LT";}}, lastDay: "[ju\u010Der u] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:case 3:return "[pro\u0161lu] dddd [u] LT";case 6:return "[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return "[pro\u0161li] dddd [u] LT";}}, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", ss: hs, m: hs, mm: hs, h: hs, hh: hs, d: "dan", dd: hs, M: "mjesec", MM: hs, y: "godinu", yy: hs }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } }), l.defineLocale("ca", { months: { standalone: "gener_febrer_mar\xe7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"), format: "de gener_de febrer_de mar\xe7_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"), isFormat: /D[oD]?(\s)+MMMM/ }, monthsShort: "gen._febr._mar\xe7_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"), monthsParseExact: !0, weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"), weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"), weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", ll: "D MMM YYYY", LLL: "D MMMM [de] YYYY [a les] H:mm", lll: "D MMM YYYY, H:mm", LLLL: "dddd D MMMM [de] YYYY [a les] H:mm", llll: "ddd D MMM YYYY, H:mm" }, calendar: { sameDay: function sameDay() {return "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT";}, nextDay: function nextDay() {return "[dem\xe0 a " + (1 !== this.hours() ? "les" : "la") + "] LT";}, nextWeek: function nextWeek() {return "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT";}, lastDay: function lastDay() {return "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT";}, lastWeek: function lastWeek() {return "[el] dddd [passat a " + (1 !== this.hours() ? "les" : "la") + "] LT";}, sameElse: "L" }, relativeTime: { future: "d'aqu\xed %s", past: "fa %s", s: "uns segons", ss: "%d segons", m: "un minut", mm: "%d minuts", h: "una hora", hh: "%d hores", d: "un dia", dd: "%d dies", M: "un mes", MM: "%d mesos", y: "un any", yy: "%d anys" }, dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|\xe8|a)/, ordinal: function ordinal(e, a) {var t = 1 === e ? "r" : 2 === e ? "n" : 3 === e ? "r" : 4 === e ? "t" : "\xe8";return "w" !== a && "W" !== a || (t = "a"), e + t;}, week: { dow: 1, doy: 4 } });var Ls = "leden_\xFAnor_b\u0159ezen_duben_kv\u011Bten_\u010Derven_\u010Dervenec_srpen_z\xE1\u0159\xED_\u0159\xEDjen_listopad_prosinec".split("_"),cs = "led_\xFAno_b\u0159e_dub_kv\u011B_\u010Dvn_\u010Dvc_srp_z\xE1\u0159_\u0159\xEDj_lis_pro".split("_"),Ys = [/^led/i, /^\xfano/i, /^b\u0159e/i, /^dub/i, /^kv\u011b/i, /^(\u010dvn|\u010derven$|\u010dervna)/i, /^(\u010dvc|\u010dervenec|\u010dervence)/i, /^srp/i, /^z\xe1\u0159/i, /^\u0159\xedj/i, /^lis/i, /^pro/i],ys = /^(leden|\xfanor|b\u0159ezen|duben|kv\u011bten|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|z\xe1\u0159\xed|\u0159\xedjen|listopad|prosinec|led|\xfano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\xe1\u0159|\u0159\xedj|lis|pro)/i;function fs(e) {return 1 < e && e < 5 && 1 != ~~(e / 10);}function ks(e, a, t, s) {var n = e + " ";switch (t) {case "s":return a || s ? "p\xe1r sekund" : "p\xe1r sekundami";case "ss":return a || s ? n + (fs(e) ? "sekundy" : "sekund") : n + "sekundami";break;case "m":return a ? "minuta" : s ? "minutu" : "minutou";case "mm":return a || s ? n + (fs(e) ? "minuty" : "minut") : n + "minutami";break;case "h":return a ? "hodina" : s ? "hodinu" : "hodinou";case "hh":return a || s ? n + (fs(e) ? "hodiny" : "hodin") : n + "hodinami";break;case "d":return a || s ? "den" : "dnem";case "dd":return a || s ? n + (fs(e) ? "dny" : "dn\xed") : n + "dny";break;case "M":return a || s ? "m\u011Bs\xEDc" : "m\u011Bs\xEDcem";case "MM":return a || s ? n + (fs(e) ? "m\u011Bs\xEDce" : "m\u011Bs\xEDc\u016F") : n + "m\u011Bs\xEDci";break;case "y":return a || s ? "rok" : "rokem";case "yy":return a || s ? n + (fs(e) ? "roky" : "let") : n + "lety";break;}}function ps(e, a, t, s) {var n = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };return a ? n[t][0] : n[t][1];}function Ds(e, a, t, s) {var n = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };return a ? n[t][0] : n[t][1];}function Ts(e, a, t, s) {var n = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [e + " Tage", e + " Tagen"], M: ["ein Monat", "einem Monat"], MM: [e + " Monate", e + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [e + " Jahre", e + " Jahren"] };return a ? n[t][0] : n[t][1];}l.defineLocale("cs", { months: Ls, monthsShort: cs, monthsRegex: ys, monthsShortRegex: ys, monthsStrictRegex: /^(leden|ledna|\xfanora|\xfanor|b\u0159ezen|b\u0159ezna|duben|dubna|kv\u011bten|kv\u011btna|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|srpna|z\xe1\u0159\xed|\u0159\xedjen|\u0159\xedjna|listopadu|listopad|prosinec|prosince)/i, monthsShortStrictRegex: /^(led|\xfano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\xe1\u0159|\u0159\xedj|lis|pro)/i, monthsParse: Ys, longMonthsParse: Ys, shortMonthsParse: Ys, weekdays: "ned\u011Ble_pond\u011Bl\xED_\xFAter\xFD_st\u0159eda_\u010Dtvrtek_p\xE1tek_sobota".split("_"), weekdaysShort: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"), weekdaysMin: "ne_po_\xFAt_st_\u010Dt_p\xE1_so".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, calendar: { sameDay: "[dnes v] LT", nextDay: "[z\xedtra v] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[v ned\u011Bli v] LT";case 1:case 2:return "[v] dddd [v] LT";case 3:return "[ve st\u0159edu v] LT";case 4:return "[ve \u010Dtvrtek v] LT";case 5:return "[v p\xe1tek v] LT";case 6:return "[v sobotu v] LT";}}, lastDay: "[v\u010Dera v] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:return "[minulou ned\u011Bli v] LT";case 1:case 2:return "[minul\xe9] dddd [v] LT";case 3:return "[minulou st\u0159edu v] LT";case 4:case 5:return "[minul\xfd] dddd [v] LT";case 6:return "[minulou sobotu v] LT";}}, sameElse: "L" }, relativeTime: { future: "za %s", past: "p\u0159ed %s", s: ks, ss: ks, m: ks, mm: ks, h: ks, hh: ks, d: ks, dd: ks, M: ks, MM: ks, y: ks, yy: ks }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("cv", { months: "\u043A\u04D1\u0440\u043B\u0430\u0447_\u043D\u0430\u0440\u04D1\u0441_\u043F\u0443\u0448_\u0430\u043A\u0430_\u043C\u0430\u0439_\u04AB\u04D7\u0440\u0442\u043C\u0435_\u0443\u0442\u04D1_\u04AB\u0443\u0440\u043B\u0430_\u0430\u0432\u04D1\u043D_\u044E\u043F\u0430_\u0447\u04F3\u043A_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"), monthsShort: "\u043A\u04D1\u0440_\u043D\u0430\u0440_\u043F\u0443\u0448_\u0430\u043A\u0430_\u043C\u0430\u0439_\u04AB\u04D7\u0440_\u0443\u0442\u04D1_\u04AB\u0443\u0440_\u0430\u0432\u043D_\u044E\u043F\u0430_\u0447\u04F3\u043A_\u0440\u0430\u0448".split("_"), weekdays: "\u0432\u044B\u0440\u0441\u0430\u0440\u043D\u0438\u043A\u0443\u043D_\u0442\u0443\u043D\u0442\u0438\u043A\u0443\u043D_\u044B\u0442\u043B\u0430\u0440\u0438\u043A\u0443\u043D_\u044E\u043D\u043A\u0443\u043D_\u043A\u04D7\u04AB\u043D\u0435\u0440\u043D\u0438\u043A\u0443\u043D_\u044D\u0440\u043D\u0435\u043A\u0443\u043D_\u0448\u04D1\u043C\u0430\u0442\u043A\u0443\u043D".split("_"), weekdaysShort: "\u0432\u044B\u0440_\u0442\u0443\u043D_\u044B\u0442\u043B_\u044E\u043D_\u043A\u04D7\u04AB_\u044D\u0440\u043D_\u0448\u04D1\u043C".split("_"), weekdaysMin: "\u0432\u0440_\u0442\u043D_\u044B\u0442_\u044E\u043D_\u043A\u04AB_\u044D\u0440_\u0448\u043C".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7]", LLL: "YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm", LLLL: "dddd, YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm" }, calendar: { sameDay: "[\u041F\u0430\u044F\u043D] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", nextDay: "[\u042B\u0440\u0430\u043D] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", lastDay: "[\u04D6\u043D\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", nextWeek: "[\u04AA\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", lastWeek: "[\u0418\u0440\u0442\u043D\u04D7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", sameElse: "L" }, relativeTime: { future: function future(e) {return e + (/\u0441\u0435\u0445\u0435\u0442$/i.exec(e) ? "\u0440\u0435\u043D" : /\u04ab\u0443\u043b$/i.exec(e) ? "\u0442\u0430\u043D" : "\u0440\u0430\u043D");}, past: "%s \u043A\u0430\u044F\u043B\u043B\u0430", s: "\u043F\u04D7\u0440-\u0438\u043A \u04AB\u0435\u043A\u043A\u0443\u043D\u0442", ss: "%d \u04AB\u0435\u043A\u043A\u0443\u043D\u0442", m: "\u043F\u04D7\u0440 \u043C\u0438\u043D\u0443\u0442", mm: "%d \u043C\u0438\u043D\u0443\u0442", h: "\u043F\u04D7\u0440 \u0441\u0435\u0445\u0435\u0442", hh: "%d \u0441\u0435\u0445\u0435\u0442", d: "\u043F\u04D7\u0440 \u043A\u0443\u043D", dd: "%d \u043A\u0443\u043D", M: "\u043F\u04D7\u0440 \u0443\u0439\u04D1\u0445", MM: "%d \u0443\u0439\u04D1\u0445", y: "\u043F\u04D7\u0440 \u04AB\u0443\u043B", yy: "%d \u04AB\u0443\u043B" }, dayOfMonthOrdinalParse: /\d{1,2}-\u043c\u04d7\u0448/, ordinal: "%d-\u043C\u04D7\u0448", week: { dow: 1, doy: 7 } }), l.defineLocale("cy", { months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"), monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"), weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"), weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"), weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Heddiw am] LT", nextDay: "[Yfory am] LT", nextWeek: "dddd [am] LT", lastDay: "[Ddoe am] LT", lastWeek: "dddd [diwethaf am] LT", sameElse: "L" }, relativeTime: { future: "mewn %s", past: "%s yn \xf4l", s: "ychydig eiliadau", ss: "%d eiliad", m: "munud", mm: "%d munud", h: "awr", hh: "%d awr", d: "diwrnod", dd: "%d diwrnod", M: "mis", MM: "%d mis", y: "blwyddyn", yy: "%d flynedd" }, dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/, ordinal: function ordinal(e) {var a = "";return 20 < e ? a = 40 === e || 50 === e || 60 === e || 80 === e || 100 === e ? "fed" : "ain" : 0 < e && (a = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"][e]), e + a;}, week: { dow: 1, doy: 4 } }), l.defineLocale("da", { months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays: "s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"), weekdaysShort: "s\xf8n_man_tir_ons_tor_fre_l\xf8r".split("_"), weekdaysMin: "s\xf8_ma_ti_on_to_fr_l\xf8".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "p\xe5 dddd [kl.] LT", lastDay: "[i g\xe5r kl.] LT", lastWeek: "[i] dddd[s kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "f\xe5 sekunder", ss: "%d sekunder", m: "et minut", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dage", M: "en m\xe5ned", MM: "%d m\xe5neder", y: "et \xe5r", yy: "%d \xe5r" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("de-at", { months: "J\xe4nner_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "J\xe4n._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: !0, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: ps, mm: "%d Minuten", h: ps, hh: "%d Stunden", d: ps, dd: ps, M: ps, MM: ps, y: ps, yy: ps }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("de-ch", { months: "Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: !0, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: Ds, mm: "%d Minuten", h: Ds, hh: "%d Stunden", d: Ds, dd: Ds, M: Ds, MM: Ds, y: Ds, yy: Ds }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("de", { months: "Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact: !0, weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", ss: "%d Sekunden", m: Ts, mm: "%d Minuten", h: Ts, hh: "%d Stunden", d: Ts, dd: Ts, M: Ts, MM: Ts, y: Ts, yy: Ts }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });var gs = ["\u0796\u07AC\u0782\u07AA\u0787\u07A6\u0783\u07A9", "\u078A\u07AC\u0784\u07B0\u0783\u07AA\u0787\u07A6\u0783\u07A9", "\u0789\u07A7\u0783\u07A8\u0797\u07AA", "\u0787\u07AD\u0795\u07B0\u0783\u07A9\u078D\u07AA", "\u0789\u07AD", "\u0796\u07AB\u0782\u07B0", "\u0796\u07AA\u078D\u07A6\u0787\u07A8", "\u0787\u07AF\u078E\u07A6\u0790\u07B0\u0793\u07AA", "\u0790\u07AC\u0795\u07B0\u0793\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA", "\u0787\u07AE\u0786\u07B0\u0793\u07AF\u0784\u07A6\u0783\u07AA", "\u0782\u07AE\u0788\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA", "\u0791\u07A8\u0790\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA"],ws = ["\u0787\u07A7\u078B\u07A8\u0787\u07B0\u078C\u07A6", "\u0780\u07AF\u0789\u07A6", "\u0787\u07A6\u0782\u07B0\u078E\u07A7\u0783\u07A6", "\u0784\u07AA\u078B\u07A6", "\u0784\u07AA\u0783\u07A7\u0790\u07B0\u078A\u07A6\u078C\u07A8", "\u0780\u07AA\u0786\u07AA\u0783\u07AA", "\u0780\u07AE\u0782\u07A8\u0780\u07A8\u0783\u07AA"];l.defineLocale("dv", { months: gs, monthsShort: gs, weekdays: ws, weekdaysShort: ws, weekdaysMin: "\u0787\u07A7\u078B\u07A8_\u0780\u07AF\u0789\u07A6_\u0787\u07A6\u0782\u07B0_\u0784\u07AA\u078B\u07A6_\u0784\u07AA\u0783\u07A7_\u0780\u07AA\u0786\u07AA_\u0780\u07AE\u0782\u07A8".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/M/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /\u0789\u0786|\u0789\u078a/, isPM: function isPM(e) {return "\u0789\u078A" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0789\u0786" : "\u0789\u078A";}, calendar: { sameDay: "[\u0789\u07A8\u0787\u07A6\u078B\u07AA] LT", nextDay: "[\u0789\u07A7\u078B\u07A6\u0789\u07A7] LT", nextWeek: "dddd LT", lastDay: "[\u0787\u07A8\u0787\u07B0\u0794\u07AC] LT", lastWeek: "[\u078A\u07A7\u0787\u07A8\u078C\u07AA\u0788\u07A8] dddd LT", sameElse: "L" }, relativeTime: { future: "\u078C\u07AC\u0783\u07AD\u078E\u07A6\u0787\u07A8 %s", past: "\u0786\u07AA\u0783\u07A8\u0782\u07B0 %s", s: "\u0790\u07A8\u0786\u07AA\u0782\u07B0\u078C\u07AA\u0786\u07AE\u0785\u07AC\u0787\u07B0", ss: "d% \u0790\u07A8\u0786\u07AA\u0782\u07B0\u078C\u07AA", m: "\u0789\u07A8\u0782\u07A8\u0793\u07AC\u0787\u07B0", mm: "\u0789\u07A8\u0782\u07A8\u0793\u07AA %d", h: "\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AC\u0787\u07B0", hh: "\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AA %d", d: "\u078B\u07AA\u0788\u07A6\u0780\u07AC\u0787\u07B0", dd: "\u078B\u07AA\u0788\u07A6\u0790\u07B0 %d", M: "\u0789\u07A6\u0780\u07AC\u0787\u07B0", MM: "\u0789\u07A6\u0790\u07B0 %d", y: "\u0787\u07A6\u0780\u07A6\u0783\u07AC\u0787\u07B0", yy: "\u0787\u07A6\u0780\u07A6\u0783\u07AA %d" }, preparse: function preparse(e) {return e.replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/,/g, "\u060C");}, week: { dow: 7, doy: 12 } }), l.defineLocale("el", { monthsNominativeEl: "\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2_\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2_\u039C\u03AC\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2_\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2_\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2_\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2".split("_"), monthsGenitiveEl: "\u0399\u03B1\u03BD\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5_\u039C\u03B1\u03C1\u03C4\u03AF\u03BF\u03C5_\u0391\u03C0\u03C1\u03B9\u03BB\u03AF\u03BF\u03C5_\u039C\u03B1\u0390\u03BF\u03C5_\u0399\u03BF\u03C5\u03BD\u03AF\u03BF\u03C5_\u0399\u03BF\u03C5\u03BB\u03AF\u03BF\u03C5_\u0391\u03C5\u03B3\u03BF\u03CD\u03C3\u03C4\u03BF\u03C5_\u03A3\u03B5\u03C0\u03C4\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5_\u039F\u03BA\u03C4\u03C9\u03B2\u03C1\u03AF\u03BF\u03C5_\u039D\u03BF\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5_\u0394\u03B5\u03BA\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5".split("_"), months: function months(e, a) {return e ? "string" == typeof a && /D/.test(a.substring(0, a.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] : this._monthsNominativeEl[e.month()] : this._monthsNominativeEl;}, monthsShort: "\u0399\u03B1\u03BD_\u03A6\u03B5\u03B2_\u039C\u03B1\u03C1_\u0391\u03C0\u03C1_\u039C\u03B1\u03CA_\u0399\u03BF\u03C5\u03BD_\u0399\u03BF\u03C5\u03BB_\u0391\u03C5\u03B3_\u03A3\u03B5\u03C0_\u039F\u03BA\u03C4_\u039D\u03BF\u03B5_\u0394\u03B5\u03BA".split("_"), weekdays: "\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE_\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1_\u03A4\u03C1\u03AF\u03C4\u03B7_\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7_\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7_\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE_\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF".split("_"), weekdaysShort: "\u039A\u03C5\u03C1_\u0394\u03B5\u03C5_\u03A4\u03C1\u03B9_\u03A4\u03B5\u03C4_\u03A0\u03B5\u03BC_\u03A0\u03B1\u03C1_\u03A3\u03B1\u03B2".split("_"), weekdaysMin: "\u039A\u03C5_\u0394\u03B5_\u03A4\u03C1_\u03A4\u03B5_\u03A0\u03B5_\u03A0\u03B1_\u03A3\u03B1".split("_"), meridiem: function meridiem(e, a, t) {return 11 < e ? t ? "\u03BC\u03BC" : "\u039C\u039C" : t ? "\u03C0\u03BC" : "\u03A0\u039C";}, isPM: function isPM(e) {return "\u03BC" === (e + "").toLowerCase()[0];}, meridiemParse: /[\u03a0\u039c]\.?\u039c?\.?/i, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendarEl: { sameDay: "[\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1 {}] LT", nextDay: "[\u0391\u03CD\u03C1\u03B9\u03BF {}] LT", nextWeek: "dddd [{}] LT", lastDay: "[\u03A7\u03B8\u03B5\u03C2 {}] LT", lastWeek: function lastWeek() {switch (this.day()) {case 6:return "[\u03C4\u03BF \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03BF] dddd [{}] LT";default:return "[\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7] dddd [{}] LT";}}, sameElse: "L" }, calendar: function calendar(e, a) {var t = this._calendarEl[e],s = a && a.hours();return H(t) && (t = t.apply(a)), t.replace("{}", s % 12 == 1 ? "\u03C3\u03C4\u03B7" : "\u03C3\u03C4\u03B9\u03C2");}, relativeTime: { future: "\u03C3\u03B5 %s", past: "%s \u03C0\u03C1\u03B9\u03BD", s: "\u03BB\u03AF\u03B3\u03B1 \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1", ss: "%d \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1", m: "\u03AD\u03BD\u03B1 \u03BB\u03B5\u03C0\u03C4\u03CC", mm: "%d \u03BB\u03B5\u03C0\u03C4\u03AC", h: "\u03BC\u03AF\u03B1 \u03CE\u03C1\u03B1", hh: "%d \u03CE\u03C1\u03B5\u03C2", d: "\u03BC\u03AF\u03B1 \u03BC\u03AD\u03C1\u03B1", dd: "%d \u03BC\u03AD\u03C1\u03B5\u03C2", M: "\u03AD\u03BD\u03B1\u03C2 \u03BC\u03AE\u03BD\u03B1\u03C2", MM: "%d \u03BC\u03AE\u03BD\u03B5\u03C2", y: "\u03AD\u03BD\u03B1\u03C2 \u03C7\u03C1\u03CC\u03BD\u03BF\u03C2", yy: "%d \u03C7\u03C1\u03CC\u03BD\u03B9\u03B1" }, dayOfMonthOrdinalParse: /\d{1,2}\u03b7/, ordinal: "%d\u03B7", week: { dow: 1, doy: 4 } }), l.defineLocale("en-SG", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } }), l.defineLocale("en-au", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } }), l.defineLocale("en-ca", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "YYYY-MM-DD", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");} }), l.defineLocale("en-gb", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } }), l.defineLocale("en-ie", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } }), l.defineLocale("en-il", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");} }), l.defineLocale("en-nz", { months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } }), l.defineLocale("eo", { months: "januaro_februaro_marto_aprilo_majo_junio_julio_a\u016Dgusto_septembro_oktobro_novembro_decembro".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_a\u016Dg_sep_okt_nov_dec".split("_"), weekdays: "diman\u0109o_lundo_mardo_merkredo_\u0135a\u016Ddo_vendredo_sabato".split("_"), weekdaysShort: "dim_lun_mard_merk_\u0135a\u016D_ven_sab".split("_"), weekdaysMin: "di_lu_ma_me_\u0135a_ve_sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D[-a de] MMMM, YYYY", LLL: "D[-a de] MMMM, YYYY HH:mm", LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm" }, meridiemParse: /[ap]\.t\.m/i, isPM: function isPM(e) {return "p" === e.charAt(0).toLowerCase();}, meridiem: function meridiem(e, a, t) {return 11 < e ? t ? "p.t.m." : "P.T.M." : t ? "a.t.m." : "A.T.M.";}, calendar: { sameDay: "[Hodia\u016D je] LT", nextDay: "[Morga\u016D je] LT", nextWeek: "dddd [je] LT", lastDay: "[Hiera\u016D je] LT", lastWeek: "[pasinta] dddd [je] LT", sameElse: "L" }, relativeTime: { future: "post %s", past: "anta\u016D %s", s: "sekundoj", ss: "%d sekundoj", m: "minuto", mm: "%d minutoj", h: "horo", hh: "%d horoj", d: "tago", dd: "%d tagoj", M: "monato", MM: "%d monatoj", y: "jaro", yy: "%d jaroj" }, dayOfMonthOrdinalParse: /\d{1,2}a/, ordinal: "%da", week: { dow: 1, doy: 7 } });var vs = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),Ss = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Hs = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],bs = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;l.defineLocale("es-do", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function monthsShort(e, a) {return e ? /-MMM-/.test(a) ? Ss[e.month()] : vs[e.month()] : vs;}, monthsRegex: bs, monthsShortRegex: bs, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Hs, longMonthsParse: Hs, shortMonthsParse: Hs, weekdays: "domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"), weekdaysShort: "dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_s\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, calendar: { sameDay: function sameDay() {return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, nextDay: function nextDay() {return "[ma\xf1ana a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, nextWeek: function nextWeek() {return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, lastDay: function lastDay() {return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, lastWeek: function lastWeek() {return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un d\xeda", dd: "%d d\xedas", M: "un mes", MM: "%d meses", y: "un a\xf1o", yy: "%d a\xf1os" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } });var js = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),xs = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Os = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],Ps = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;l.defineLocale("es-us", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function monthsShort(e, a) {return e ? /-MMM-/.test(a) ? xs[e.month()] : js[e.month()] : js;}, monthsRegex: Ps, monthsShortRegex: Ps, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Os, longMonthsParse: Os, shortMonthsParse: Os, weekdays: "domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"), weekdaysShort: "dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_s\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, calendar: { sameDay: function sameDay() {return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, nextDay: function nextDay() {return "[ma\xf1ana a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, nextWeek: function nextWeek() {return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, lastDay: function lastDay() {return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, lastWeek: function lastWeek() {return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un d\xeda", dd: "%d d\xedas", M: "un mes", MM: "%d meses", y: "un a\xf1o", yy: "%d a\xf1os" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 0, doy: 6 } });var Ws = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),As = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Es = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],Fs = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;function zs(e, a, t, s) {var n = { s: ["m\xf5ne sekundi", "m\xf5ni sekund", "paar sekundit"], ss: [e + "sekundi", e + "sekundit"], m: ["\xfche minuti", "\xfcks minut"], mm: [e + " minuti", e + " minutit"], h: ["\xfche tunni", "tund aega", "\xfcks tund"], hh: [e + " tunni", e + " tundi"], d: ["\xfche p\xe4eva", "\xfcks p\xe4ev"], M: ["kuu aja", "kuu aega", "\xfcks kuu"], MM: [e + " kuu", e + " kuud"], y: ["\xfche aasta", "aasta", "\xfcks aasta"], yy: [e + " aasta", e + " aastat"] };return a ? n[t][2] ? n[t][2] : n[t][1] : s ? n[t][0] : n[t][1];}l.defineLocale("es", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function monthsShort(e, a) {return e ? /-MMM-/.test(a) ? As[e.month()] : Ws[e.month()] : Ws;}, monthsRegex: Fs, monthsShortRegex: Fs, monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse: Es, longMonthsParse: Es, shortMonthsParse: Es, weekdays: "domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"), weekdaysShort: "dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_s\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function sameDay() {return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, nextDay: function nextDay() {return "[ma\xf1ana a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, nextWeek: function nextWeek() {return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, lastDay: function lastDay() {return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, lastWeek: function lastWeek() {return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";}, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un d\xeda", dd: "%d d\xedas", M: "un mes", MM: "%d meses", y: "un a\xf1o", yy: "%d a\xf1os" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } }), l.defineLocale("et", { months: "jaanuar_veebruar_m\xe4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort: "jaan_veebr_m\xe4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), weekdays: "p\xfchap\xe4ev_esmasp\xe4ev_teisip\xe4ev_kolmap\xe4ev_neljap\xe4ev_reede_laup\xe4ev".split("_"), weekdaysShort: "P_E_T_K_N_R_L".split("_"), weekdaysMin: "P_E_T_K_N_R_L".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[T\xe4na,] LT", nextDay: "[Homme,] LT", nextWeek: "[J\xe4rgmine] dddd LT", lastDay: "[Eile,] LT", lastWeek: "[Eelmine] dddd LT", sameElse: "L" }, relativeTime: { future: "%s p\xe4rast", past: "%s tagasi", s: zs, ss: zs, m: zs, mm: zs, h: zs, hh: zs, d: zs, dd: "%d p\xe4eva", M: zs, MM: zs, y: zs, yy: zs }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("eu", { months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), monthsParseExact: !0, weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"), weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY[ko] MMMM[ren] D[a]", LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l: "YYYY-M-D", ll: "YYYY[ko] MMM D[a]", lll: "YYYY[ko] MMM D[a] HH:mm", llll: "ddd, YYYY[ko] MMM D[a] HH:mm" }, calendar: { sameDay: "[gaur] LT[etan]", nextDay: "[bihar] LT[etan]", nextWeek: "dddd LT[etan]", lastDay: "[atzo] LT[etan]", lastWeek: "[aurreko] dddd LT[etan]", sameElse: "L" }, relativeTime: { future: "%s barru", past: "duela %s", s: "segundo batzuk", ss: "%d segundo", m: "minutu bat", mm: "%d minutu", h: "ordu bat", hh: "%d ordu", d: "egun bat", dd: "%d egun", M: "hilabete bat", MM: "%d hilabete", y: "urte bat", yy: "%d urte" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });var Js = { 1: "\u06F1", 2: "\u06F2", 3: "\u06F3", 4: "\u06F4", 5: "\u06F5", 6: "\u06F6", 7: "\u06F7", 8: "\u06F8", 9: "\u06F9", 0: "\u06F0" },Ns = { "\u06F1": "1", "\u06F2": "2", "\u06F3": "3", "\u06F4": "4", "\u06F5": "5", "\u06F6": "6", "\u06F7": "7", "\u06F8": "8", "\u06F9": "9", "\u06F0": "0" };l.defineLocale("fa", { months: "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split("_"), monthsShort: "\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631".split("_"), weekdays: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"), weekdaysShort: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"), weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u062C_\u0634".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631|\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/, isPM: function isPM(e) {return /\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631" : "\u0628\u0639\u062F \u0627\u0632 \u0638\u0647\u0631";}, calendar: { sameDay: "[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062A] LT", nextDay: "[\u0641\u0631\u062F\u0627 \u0633\u0627\u0639\u062A] LT", nextWeek: "dddd [\u0633\u0627\u0639\u062A] LT", lastDay: "[\u062F\u06CC\u0631\u0648\u0632 \u0633\u0627\u0639\u062A] LT", lastWeek: "dddd [\u067E\u06CC\u0634] [\u0633\u0627\u0639\u062A] LT", sameElse: "L" }, relativeTime: { future: "\u062F\u0631 %s", past: "%s \u067E\u06CC\u0634", s: "\u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647", ss: "\u062B\u0627\u0646\u06CC\u0647 d%", m: "\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647", mm: "%d \u062F\u0642\u06CC\u0642\u0647", h: "\u06CC\u06A9 \u0633\u0627\u0639\u062A", hh: "%d \u0633\u0627\u0639\u062A", d: "\u06CC\u06A9 \u0631\u0648\u0632", dd: "%d \u0631\u0648\u0632", M: "\u06CC\u06A9 \u0645\u0627\u0647", MM: "%d \u0645\u0627\u0647", y: "\u06CC\u06A9 \u0633\u0627\u0644", yy: "%d \u0633\u0627\u0644" }, preparse: function preparse(e) {return e.replace(/[\u06f0-\u06f9]/g, function (e) {return Ns[e];}).replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return Js[e];}).replace(/,/g, "\u060C");}, dayOfMonthOrdinalParse: /\d{1,2}\u0645/, ordinal: "%d\u0645", week: { dow: 6, doy: 12 } });var Rs = "nolla yksi kaksi kolme nelj\xe4 viisi kuusi seitsem\xe4n kahdeksan yhdeks\xe4n".split(" "),Cs = ["nolla", "yhden", "kahden", "kolmen", "nelj\xe4n", "viiden", "kuuden", Rs[7], Rs[8], Rs[9]];function Is(e, a, t, s) {var n,d,r = "";switch (t) {case "s":return s ? "muutaman sekunnin" : "muutama sekunti";case "ss":return s ? "sekunnin" : "sekuntia";case "m":return s ? "minuutin" : "minuutti";case "mm":r = s ? "minuutin" : "minuuttia";break;case "h":return s ? "tunnin" : "tunti";case "hh":r = s ? "tunnin" : "tuntia";break;case "d":return s ? "p\xe4iv\xe4n" : "p\xe4iv\xe4";case "dd":r = s ? "p\xe4iv\xe4n" : "p\xe4iv\xe4\xe4";break;case "M":return s ? "kuukauden" : "kuukausi";case "MM":r = s ? "kuukauden" : "kuukautta";break;case "y":return s ? "vuoden" : "vuosi";case "yy":r = s ? "vuoden" : "vuotta";break;}return d = s, r = ((n = e) < 10 ? d ? Cs[n] : Rs[n] : n) + " " + r;}l.defineLocale("fi", { months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xe4kuu_hein\xe4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"), monthsShort: "tammi_helmi_maalis_huhti_touko_kes\xe4_hein\xe4_elo_syys_loka_marras_joulu".split("_"), weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"), weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"), weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "Do MMMM[ta] YYYY", LLL: "Do MMMM[ta] YYYY, [klo] HH.mm", LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm", l: "D.M.YYYY", ll: "Do MMM YYYY", lll: "Do MMM YYYY, [klo] HH.mm", llll: "ddd, Do MMM YYYY, [klo] HH.mm" }, calendar: { sameDay: "[t\xe4n\xe4\xe4n] [klo] LT", nextDay: "[huomenna] [klo] LT", nextWeek: "dddd [klo] LT", lastDay: "[eilen] [klo] LT", lastWeek: "[viime] dddd[na] [klo] LT", sameElse: "L" }, relativeTime: { future: "%s p\xe4\xe4st\xe4", past: "%s sitten", s: Is, ss: Is, m: Is, mm: Is, h: Is, hh: Is, d: Is, dd: Is, M: Is, MM: Is, y: Is, yy: Is }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("fo", { months: "januar_februar_mars_apr\xedl_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays: "sunnudagur_m\xe1nadagur_t\xfdsdagur_mikudagur_h\xf3sdagur_fr\xedggjadagur_leygardagur".split("_"), weekdaysShort: "sun_m\xe1n_t\xfds_mik_h\xf3s_fr\xed_ley".split("_"), weekdaysMin: "su_m\xe1_t\xfd_mi_h\xf3_fr_le".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D. MMMM, YYYY HH:mm" }, calendar: { sameDay: "[\xcd dag kl.] LT", nextDay: "[\xcd morgin kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[\xcd gj\xe1r kl.] LT", lastWeek: "[s\xed\xf0stu] dddd [kl] LT", sameElse: "L" }, relativeTime: { future: "um %s", past: "%s s\xed\xf0ani", s: "f\xe1 sekund", ss: "%d sekundir", m: "ein minuttur", mm: "%d minuttir", h: "ein t\xedmi", hh: "%d t\xedmar", d: "ein dagur", dd: "%d dagar", M: "ein m\xe1na\xf0ur", MM: "%d m\xe1na\xf0ir", y: "eitt \xe1r", yy: "%d \xe1r" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("fr-ca", { months: "janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"), monthsShort: "janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"), monthsParseExact: !0, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd\u2019hui \xE0] LT", nextDay: "[Demain \xe0] LT", nextWeek: "dddd [\xe0] LT", lastDay: "[Hier \xe0] LT", lastWeek: "dddd [dernier \xe0] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|e)/, ordinal: function ordinal(e, a) {switch (a) {default:case "M":case "Q":case "D":case "DDD":case "d":return e + (1 === e ? "er" : "e");case "w":case "W":return e + (1 === e ? "re" : "e");}} }), l.defineLocale("fr-ch", { months: "janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"), monthsShort: "janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"), monthsParseExact: !0, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd\u2019hui \xE0] LT", nextDay: "[Demain \xe0] LT", nextWeek: "dddd [\xe0] LT", lastDay: "[Hier \xe0] LT", lastWeek: "dddd [dernier \xe0] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|e)/, ordinal: function ordinal(e, a) {switch (a) {default:case "M":case "Q":case "D":case "DDD":case "d":return e + (1 === e ? "er" : "e");case "w":case "W":return e + (1 === e ? "re" : "e");}}, week: { dow: 1, doy: 4 } }), l.defineLocale("fr", { months: "janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"), monthsShort: "janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"), monthsParseExact: !0, weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd\u2019hui \xE0] LT", nextDay: "[Demain \xe0] LT", nextWeek: "dddd [\xe0] LT", lastDay: "[Hier \xe0] LT", lastWeek: "dddd [dernier \xe0] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", ss: "%d secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, dayOfMonthOrdinalParse: /\d{1,2}(er|)/, ordinal: function ordinal(e, a) {switch (a) {case "D":return e + (1 === e ? "er" : "");default:case "M":case "Q":case "DDD":case "d":return e + (1 === e ? "er" : "e");case "w":case "W":return e + (1 === e ? "re" : "e");}}, week: { dow: 1, doy: 4 } });var Us = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),Gs = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");l.defineLocale("fy", { months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort: function monthsShort(e, a) {return e ? /-MMM-/.test(a) ? Gs[e.month()] : Us[e.month()] : Us;}, monthsParseExact: !0, weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[hjoed om] LT", nextDay: "[moarn om] LT", nextWeek: "dddd [om] LT", lastDay: "[juster om] LT", lastWeek: "[\xf4fr\xfbne] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oer %s", past: "%s lyn", s: "in pear sekonden", ss: "%d sekonden", m: "ien min\xfat", mm: "%d minuten", h: "ien oere", hh: "%d oeren", d: "ien dei", dd: "%d dagen", M: "ien moanne", MM: "%d moannen", y: "ien jier", yy: "%d jierren" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function ordinal(e) {return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de");}, week: { dow: 1, doy: 4 } });l.defineLocale("ga", { months: ["Ean\xe1ir", "Feabhra", "M\xe1rta", "Aibre\xe1n", "Bealtaine", "M\xe9itheamh", "I\xfail", "L\xfanasa", "Me\xe1n F\xf3mhair", "Deaireadh F\xf3mhair", "Samhain", "Nollaig"], monthsShort: ["Ean\xe1", "Feab", "M\xe1rt", "Aibr", "Beal", "M\xe9it", "I\xfail", "L\xfana", "Me\xe1n", "Deai", "Samh", "Noll"], monthsParseExact: !0, weekdays: ["D\xe9 Domhnaigh", "D\xe9 Luain", "D\xe9 M\xe1irt", "D\xe9 C\xe9adaoin", "D\xe9ardaoin", "D\xe9 hAoine", "D\xe9 Satharn"], weekdaysShort: ["Dom", "Lua", "M\xe1i", "C\xe9a", "D\xe9a", "hAo", "Sat"], weekdaysMin: ["Do", "Lu", "M\xe1", "Ce", "D\xe9", "hA", "Sa"], longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Inniu ag] LT", nextDay: "[Am\xe1rach ag] LT", nextWeek: "dddd [ag] LT", lastDay: "[Inn\xe9 aig] LT", lastWeek: "dddd [seo caite] [ag] LT", sameElse: "L" }, relativeTime: { future: "i %s", past: "%s \xf3 shin", s: "c\xfapla soicind", ss: "%d soicind", m: "n\xf3im\xe9ad", mm: "%d n\xf3im\xe9ad", h: "uair an chloig", hh: "%d uair an chloig", d: "l\xe1", dd: "%d l\xe1", M: "m\xed", MM: "%d m\xed", y: "bliain", yy: "%d bliain" }, dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/, ordinal: function ordinal(e) {return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");}, week: { dow: 1, doy: 4 } });function Vs(e, a, t, s) {var n = { s: ["thodde secondanim", "thodde second"], ss: [e + " secondanim", e + " second"], m: ["eka mintan", "ek minute"], mm: [e + " mintanim", e + " mintam"], h: ["eka voran", "ek vor"], hh: [e + " voranim", e + " voram"], d: ["eka disan", "ek dis"], dd: [e + " disanim", e + " dis"], M: ["eka mhoinean", "ek mhoino"], MM: [e + " mhoineanim", e + " mhoine"], y: ["eka vorsan", "ek voros"], yy: [e + " vorsanim", e + " vorsam"] };return a ? n[t][0] : n[t][1];}l.defineLocale("gd", { months: ["Am Faoilleach", "An Gearran", "Am M\xe0rt", "An Giblean", "An C\xe8itean", "An t-\xd2gmhios", "An t-Iuchar", "An L\xf9nastal", "An t-Sultain", "An D\xe0mhair", "An t-Samhain", "An D\xf9bhlachd"], monthsShort: ["Faoi", "Gear", "M\xe0rt", "Gibl", "C\xe8it", "\xd2gmh", "Iuch", "L\xf9n", "Sult", "D\xe0mh", "Samh", "D\xf9bh"], monthsParseExact: !0, weekdays: ["Did\xf2mhnaich", "Diluain", "Dim\xe0irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"], weekdaysShort: ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"], weekdaysMin: ["D\xf2", "Lu", "M\xe0", "Ci", "Ar", "Ha", "Sa"], longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[An-diugh aig] LT", nextDay: "[A-m\xe0ireach aig] LT", nextWeek: "dddd [aig] LT", lastDay: "[An-d\xe8 aig] LT", lastWeek: "dddd [seo chaidh] [aig] LT", sameElse: "L" }, relativeTime: { future: "ann an %s", past: "bho chionn %s", s: "beagan diogan", ss: "%d diogan", m: "mionaid", mm: "%d mionaidean", h: "uair", hh: "%d uairean", d: "latha", dd: "%d latha", M: "m\xecos", MM: "%d m\xecosan", y: "bliadhna", yy: "%d bliadhna" }, dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/, ordinal: function ordinal(e) {return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");}, week: { dow: 1, doy: 4 } }), l.defineLocale("gl", { months: "xaneiro_febreiro_marzo_abril_maio_xu\xf1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"), monthsShort: "xan._feb._mar._abr._mai._xu\xf1._xul._ago._set._out._nov._dec.".split("_"), monthsParseExact: !0, weekdays: "domingo_luns_martes_m\xe9rcores_xoves_venres_s\xe1bado".split("_"), weekdaysShort: "dom._lun._mar._m\xe9r._xov._ven._s\xe1b.".split("_"), weekdaysMin: "do_lu_ma_m\xe9_xo_ve_s\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function sameDay() {return "[hoxe " + (1 !== this.hours() ? "\xe1s" : "\xe1") + "] LT";}, nextDay: function nextDay() {return "[ma\xf1\xe1 " + (1 !== this.hours() ? "\xe1s" : "\xe1") + "] LT";}, nextWeek: function nextWeek() {return "dddd [" + (1 !== this.hours() ? "\xe1s" : "a") + "] LT";}, lastDay: function lastDay() {return "[onte " + (1 !== this.hours() ? "\xe1" : "a") + "] LT";}, lastWeek: function lastWeek() {return "[o] dddd [pasado " + (1 !== this.hours() ? "\xe1s" : "a") + "] LT";}, sameElse: "L" }, relativeTime: { future: function future(e) {return 0 === e.indexOf("un") ? "n" + e : "en " + e;}, past: "hai %s", s: "uns segundos", ss: "%d segundos", m: "un minuto", mm: "%d minutos", h: "unha hora", hh: "%d horas", d: "un d\xeda", dd: "%d d\xedas", M: "un mes", MM: "%d meses", y: "un ano", yy: "%d anos" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } }), l.defineLocale("gom-latn", { months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"), monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"), monthsParseExact: !0, weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"), weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"), weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "A h:mm [vazta]", LTS: "A h:mm:ss [vazta]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [vazta]", LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]", llll: "ddd, D MMM YYYY, A h:mm [vazta]" }, calendar: { sameDay: "[Aiz] LT", nextDay: "[Faleam] LT", nextWeek: "[Ieta to] dddd[,] LT", lastDay: "[Kal] LT", lastWeek: "[Fatlo] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%s", past: "%s adim", s: Vs, ss: Vs, m: Vs, mm: Vs, h: Vs, hh: Vs, d: Vs, dd: Vs, M: Vs, MM: Vs, y: Vs, yy: Vs }, dayOfMonthOrdinalParse: /\d{1,2}(er)/, ordinal: function ordinal(e, a) {switch (a) {case "D":return e + "er";default:case "M":case "Q":case "DDD":case "d":case "w":case "W":return e;}}, week: { dow: 1, doy: 4 }, meridiemParse: /rati|sokalli|donparam|sanje/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "rati" === a ? e < 4 ? e : e + 12 : "sokalli" === a ? e : "donparam" === a ? 12 < e ? e : e + 12 : "sanje" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "rati" : e < 12 ? "sokalli" : e < 16 ? "donparam" : e < 20 ? "sanje" : "rati";} });var Ks = { 1: "\u0AE7", 2: "\u0AE8", 3: "\u0AE9", 4: "\u0AEA", 5: "\u0AEB", 6: "\u0AEC", 7: "\u0AED", 8: "\u0AEE", 9: "\u0AEF", 0: "\u0AE6" },Zs = { "\u0AE7": "1", "\u0AE8": "2", "\u0AE9": "3", "\u0AEA": "4", "\u0AEB": "5", "\u0AEC": "6", "\u0AED": "7", "\u0AEE": "8", "\u0AEF": "9", "\u0AE6": "0" };l.defineLocale("gu", { months: "\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1\u0A86\u0AB0\u0AC0_\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1\u0A86\u0AB0\u0AC0_\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A_\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF\u0AB2_\u0AAE\u0AC7_\u0A9C\u0AC2\u0AA8_\u0A9C\u0AC1\u0AB2\u0ABE\u0A88_\u0A91\u0A97\u0AB8\u0ACD\u0A9F_\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0_\u0A91\u0A95\u0ACD\u0A9F\u0ACD\u0AAC\u0AB0_\u0AA8\u0AB5\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0_\u0AA1\u0ABF\u0AB8\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0".split("_"), monthsShort: "\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1._\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1._\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A_\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF._\u0AAE\u0AC7_\u0A9C\u0AC2\u0AA8_\u0A9C\u0AC1\u0AB2\u0ABE._\u0A91\u0A97._\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7._\u0A91\u0A95\u0ACD\u0A9F\u0ACD._\u0AA8\u0AB5\u0AC7._\u0AA1\u0ABF\u0AB8\u0AC7.".split("_"), monthsParseExact: !0, weekdays: "\u0AB0\u0AB5\u0ABF\u0AB5\u0ABE\u0AB0_\u0AB8\u0ACB\u0AAE\u0AB5\u0ABE\u0AB0_\u0AAE\u0A82\u0A97\u0AB3\u0AB5\u0ABE\u0AB0_\u0AAC\u0AC1\u0AA7\u0ACD\u0AB5\u0ABE\u0AB0_\u0A97\u0AC1\u0AB0\u0AC1\u0AB5\u0ABE\u0AB0_\u0AB6\u0AC1\u0A95\u0ACD\u0AB0\u0AB5\u0ABE\u0AB0_\u0AB6\u0AA8\u0ABF\u0AB5\u0ABE\u0AB0".split("_"), weekdaysShort: "\u0AB0\u0AB5\u0ABF_\u0AB8\u0ACB\u0AAE_\u0AAE\u0A82\u0A97\u0AB3_\u0AAC\u0AC1\u0AA7\u0ACD_\u0A97\u0AC1\u0AB0\u0AC1_\u0AB6\u0AC1\u0A95\u0ACD\u0AB0_\u0AB6\u0AA8\u0ABF".split("_"), weekdaysMin: "\u0AB0_\u0AB8\u0ACB_\u0AAE\u0A82_\u0AAC\u0AC1_\u0A97\u0AC1_\u0AB6\u0AC1_\u0AB6".split("_"), longDateFormat: { LT: "A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7", LTS: "A h:mm:ss \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7", LLLL: "dddd, D MMMM YYYY, A h:mm \u0AB5\u0ABE\u0A97\u0ACD\u0AAF\u0AC7" }, calendar: { sameDay: "[\u0A86\u0A9C] LT", nextDay: "[\u0A95\u0ABE\u0AB2\u0AC7] LT", nextWeek: "dddd, LT", lastDay: "[\u0A97\u0A87\u0A95\u0ABE\u0AB2\u0AC7] LT", lastWeek: "[\u0AAA\u0ABE\u0A9B\u0AB2\u0ABE] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0AAE\u0ABE", past: "%s \u0AAA\u0AC7\u0AB9\u0AB2\u0ABE", s: "\u0A85\u0AAE\u0AC1\u0A95 \u0AAA\u0AB3\u0ACB", ss: "%d \u0AB8\u0AC7\u0A95\u0A82\u0AA1", m: "\u0A8F\u0A95 \u0AAE\u0ABF\u0AA8\u0ABF\u0A9F", mm: "%d \u0AAE\u0ABF\u0AA8\u0ABF\u0A9F", h: "\u0A8F\u0A95 \u0A95\u0AB2\u0ABE\u0A95", hh: "%d \u0A95\u0AB2\u0ABE\u0A95", d: "\u0A8F\u0A95 \u0AA6\u0ABF\u0AB5\u0AB8", dd: "%d \u0AA6\u0ABF\u0AB5\u0AB8", M: "\u0A8F\u0A95 \u0AAE\u0AB9\u0ABF\u0AA8\u0ACB", MM: "%d \u0AAE\u0AB9\u0ABF\u0AA8\u0ACB", y: "\u0A8F\u0A95 \u0AB5\u0AB0\u0ACD\u0AB7", yy: "%d \u0AB5\u0AB0\u0ACD\u0AB7" }, preparse: function preparse(e) {return e.replace(/[\u0ae7\u0ae8\u0ae9\u0aea\u0aeb\u0aec\u0aed\u0aee\u0aef\u0ae6]/g, function (e) {return Zs[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return Ks[e];});}, meridiemParse: /\u0ab0\u0abe\u0aa4|\u0aac\u0aaa\u0acb\u0ab0|\u0ab8\u0ab5\u0abe\u0ab0|\u0ab8\u0abe\u0a82\u0a9c/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0AB0\u0ABE\u0AA4" === a ? e < 4 ? e : e + 12 : "\u0AB8\u0AB5\u0ABE\u0AB0" === a ? e : "\u0AAC\u0AAA\u0ACB\u0AB0" === a ? 10 <= e ? e : e + 12 : "\u0AB8\u0ABE\u0A82\u0A9C" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0AB0\u0ABE\u0AA4" : e < 10 ? "\u0AB8\u0AB5\u0ABE\u0AB0" : e < 17 ? "\u0AAC\u0AAA\u0ACB\u0AB0" : e < 20 ? "\u0AB8\u0ABE\u0A82\u0A9C" : "\u0AB0\u0ABE\u0AA4";}, week: { dow: 0, doy: 6 } }), l.defineLocale("he", { months: "\u05D9\u05E0\u05D5\u05D0\u05E8_\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05D9\u05DC_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8_\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8_\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8_\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8_\u05D3\u05E6\u05DE\u05D1\u05E8".split("_"), monthsShort: "\u05D9\u05E0\u05D5\u05F3_\u05E4\u05D1\u05E8\u05F3_\u05DE\u05E8\u05E5_\u05D0\u05E4\u05E8\u05F3_\u05DE\u05D0\u05D9_\u05D9\u05D5\u05E0\u05D9_\u05D9\u05D5\u05DC\u05D9_\u05D0\u05D5\u05D2\u05F3_\u05E1\u05E4\u05D8\u05F3_\u05D0\u05D5\u05E7\u05F3_\u05E0\u05D5\u05D1\u05F3_\u05D3\u05E6\u05DE\u05F3".split("_"), weekdays: "\u05E8\u05D0\u05E9\u05D5\u05DF_\u05E9\u05E0\u05D9_\u05E9\u05DC\u05D9\u05E9\u05D9_\u05E8\u05D1\u05D9\u05E2\u05D9_\u05D7\u05DE\u05D9\u05E9\u05D9_\u05E9\u05D9\u05E9\u05D9_\u05E9\u05D1\u05EA".split("_"), weekdaysShort: "\u05D0\u05F3_\u05D1\u05F3_\u05D2\u05F3_\u05D3\u05F3_\u05D4\u05F3_\u05D5\u05F3_\u05E9\u05F3".split("_"), weekdaysMin: "\u05D0_\u05D1_\u05D2_\u05D3_\u05D4_\u05D5_\u05E9".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [\u05D1]MMMM YYYY", LLL: "D [\u05D1]MMMM YYYY HH:mm", LLLL: "dddd, D [\u05D1]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, calendar: { sameDay: "[\u05D4\u05D9\u05D5\u05DD \u05D1\u05BE]LT", nextDay: "[\u05DE\u05D7\u05E8 \u05D1\u05BE]LT", nextWeek: "dddd [\u05D1\u05E9\u05E2\u05D4] LT", lastDay: "[\u05D0\u05EA\u05DE\u05D5\u05DC \u05D1\u05BE]LT", lastWeek: "[\u05D1\u05D9\u05D5\u05DD] dddd [\u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05D1\u05E9\u05E2\u05D4] LT", sameElse: "L" }, relativeTime: { future: "\u05D1\u05E2\u05D5\u05D3 %s", past: "\u05DC\u05E4\u05E0\u05D9 %s", s: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05E0\u05D9\u05D5\u05EA", ss: "%d \u05E9\u05E0\u05D9\u05D5\u05EA", m: "\u05D3\u05E7\u05D4", mm: "%d \u05D3\u05E7\u05D5\u05EA", h: "\u05E9\u05E2\u05D4", hh: function hh(e) {return 2 === e ? "\u05E9\u05E2\u05EA\u05D9\u05D9\u05DD" : e + " \u05E9\u05E2\u05D5\u05EA";}, d: "\u05D9\u05D5\u05DD", dd: function dd(e) {return 2 === e ? "\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD" : e + " \u05D9\u05DE\u05D9\u05DD";}, M: "\u05D7\u05D5\u05D3\u05E9", MM: function MM(e) {return 2 === e ? "\u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD" : e + " \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD";}, y: "\u05E9\u05E0\u05D4", yy: function yy(e) {return 2 === e ? "\u05E9\u05E0\u05EA\u05D9\u05D9\u05DD" : e % 10 == 0 && 10 !== e ? e + " \u05E9\u05E0\u05D4" : e + " \u05E9\u05E0\u05D9\u05DD";} }, meridiemParse: /\u05d0\u05d7\u05d4"\u05e6|\u05dc\u05e4\u05e0\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8|\u05d1\u05d1\u05d5\u05e7\u05e8|\u05d1\u05e2\u05e8\u05d1/i, isPM: function isPM(e) {return /^(\u05d0\u05d7\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05d1\u05e2\u05e8\u05d1)$/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 5 ? "\u05DC\u05E4\u05E0\u05D5\u05EA \u05D1\u05D5\u05E7\u05E8" : e < 10 ? "\u05D1\u05D1\u05D5\u05E7\u05E8" : e < 12 ? t ? "\u05DC\u05E4\u05E0\u05D4\"\u05E6" : "\u05DC\u05E4\u05E0\u05D9 \u05D4\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD" : e < 18 ? t ? "\u05D0\u05D7\u05D4\"\u05E6" : "\u05D0\u05D7\u05E8\u05D9 \u05D4\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD" : "\u05D1\u05E2\u05E8\u05D1";} });var $s = { 1: "\u0967", 2: "\u0968", 3: "\u0969", 4: "\u096A", 5: "\u096B", 6: "\u096C", 7: "\u096D", 8: "\u096E", 9: "\u096F", 0: "\u0966" },Bs = { "\u0967": "1", "\u0968": "2", "\u0969": "3", "\u096A": "4", "\u096B": "5", "\u096C": "6", "\u096D": "7", "\u096E": "8", "\u096F": "9", "\u0966": "0" };function qs(e, a, t) {var s = e + " ";switch (t) {case "ss":return s += 1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi";case "m":return a ? "jedna minuta" : "jedne minute";case "mm":return s += 1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta";case "h":return a ? "jedan sat" : "jednog sata";case "hh":return s += 1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati";case "dd":return s += 1 === e ? "dan" : "dana";case "MM":return s += 1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci";case "yy":return s += 1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina";}}l.defineLocale("hi", { months: "\u091C\u0928\u0935\u0930\u0940_\u092B\u093C\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u092E\u094D\u092C\u0930_\u0926\u093F\u0938\u092E\u094D\u092C\u0930".split("_"), monthsShort: "\u091C\u0928._\u092B\u093C\u0930._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948._\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0905\u0917._\u0938\u093F\u0924._\u0905\u0915\u094D\u091F\u0942._\u0928\u0935._\u0926\u093F\u0938.".split("_"), monthsParseExact: !0, weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0932\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"), weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0932_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"), weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"), longDateFormat: { LT: "A h:mm \u092C\u091C\u0947", LTS: "A h:mm:ss \u092C\u091C\u0947", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm \u092C\u091C\u0947", LLLL: "dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947" }, calendar: { sameDay: "[\u0906\u091C] LT", nextDay: "[\u0915\u0932] LT", nextWeek: "dddd, LT", lastDay: "[\u0915\u0932] LT", lastWeek: "[\u092A\u093F\u091B\u0932\u0947] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u092E\u0947\u0902", past: "%s \u092A\u0939\u0932\u0947", s: "\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923", ss: "%d \u0938\u0947\u0915\u0902\u0921", m: "\u090F\u0915 \u092E\u093F\u0928\u091F", mm: "%d \u092E\u093F\u0928\u091F", h: "\u090F\u0915 \u0918\u0902\u091F\u093E", hh: "%d \u0918\u0902\u091F\u0947", d: "\u090F\u0915 \u0926\u093F\u0928", dd: "%d \u0926\u093F\u0928", M: "\u090F\u0915 \u092E\u0939\u0940\u0928\u0947", MM: "%d \u092E\u0939\u0940\u0928\u0947", y: "\u090F\u0915 \u0935\u0930\u094D\u0937", yy: "%d \u0935\u0930\u094D\u0937" }, preparse: function preparse(e) {return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function (e) {return Bs[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return $s[e];});}, meridiemParse: /\u0930\u093e\u0924|\u0938\u0941\u092c\u0939|\u0926\u094b\u092a\u0939\u0930|\u0936\u093e\u092e/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0930\u093E\u0924" === a ? e < 4 ? e : e + 12 : "\u0938\u0941\u092C\u0939" === a ? e : "\u0926\u094B\u092A\u0939\u0930" === a ? 10 <= e ? e : e + 12 : "\u0936\u093E\u092E" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0930\u093E\u0924" : e < 10 ? "\u0938\u0941\u092C\u0939" : e < 17 ? "\u0926\u094B\u092A\u0939\u0930" : e < 20 ? "\u0936\u093E\u092E" : "\u0930\u093E\u0924";}, week: { dow: 0, doy: 6 } }), l.defineLocale("hr", { months: { format: "sije\u010Dnja_velja\u010De_o\u017Eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), standalone: "sije\u010Danj_velja\u010Da_o\u017Eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_") }, monthsShort: "sij._velj._o\u017Eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"), monthsParseExact: !0, weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sutra u] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[u] [nedjelju] [u] LT";case 3:return "[u] [srijedu] [u] LT";case 6:return "[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return "[u] dddd [u] LT";}}, lastDay: "[ju\u010Der u] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:case 3:return "[pro\u0161lu] dddd [u] LT";case 6:return "[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return "[pro\u0161li] dddd [u] LT";}}, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", ss: qs, m: qs, mm: qs, h: qs, hh: qs, d: "dan", dd: qs, M: "mjesec", MM: qs, y: "godinu", yy: qs }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });var Qs = "vas\xE1rnap h\xE9tf\u0151n kedden szerd\xE1n cs\xFCt\xF6rt\xF6k\xF6n p\xE9nteken szombaton".split(" ");function Xs(e, a, t, s) {var n = e;switch (t) {case "s":return s || a ? "n\xe9h\xe1ny m\xe1sodperc" : "n\xe9h\xe1ny m\xe1sodperce";case "ss":return n + (s || a) ? " m\xe1sodperc" : " m\xe1sodperce";case "m":return "egy" + (s || a ? " perc" : " perce");case "mm":return n + (s || a ? " perc" : " perce");case "h":return "egy" + (s || a ? " \xf3ra" : " \xf3r\xe1ja");case "hh":return n + (s || a ? " \xf3ra" : " \xf3r\xe1ja");case "d":return "egy" + (s || a ? " nap" : " napja");case "dd":return n + (s || a ? " nap" : " napja");case "M":return "egy" + (s || a ? " h\xf3nap" : " h\xf3napja");case "MM":return n + (s || a ? " h\xf3nap" : " h\xf3napja");case "y":return "egy" + (s || a ? " \xe9v" : " \xe9ve");case "yy":return n + (s || a ? " \xe9v" : " \xe9ve");}return "";}function en(e) {return (e ? "" : "[m\xfalt] ") + "[" + Qs[this.day()] + "] LT[-kor]";}function an(e) {return e % 100 == 11 || e % 10 != 1;}function tn(e, a, t, s) {var n = e + " ";switch (t) {case "s":return a || s ? "nokkrar sek\xfandur" : "nokkrum sek\xfandum";case "ss":return an(e) ? n + (a || s ? "sek\xfandur" : "sek\xfandum") : n + "sek\xfanda";case "m":return a ? "m\xedn\xfata" : "m\xedn\xfatu";case "mm":return an(e) ? n + (a || s ? "m\xedn\xfatur" : "m\xedn\xfatum") : a ? n + "m\xedn\xfata" : n + "m\xedn\xfatu";case "hh":return an(e) ? n + (a || s ? "klukkustundir" : "klukkustundum") : n + "klukkustund";case "d":return a ? "dagur" : s ? "dag" : "degi";case "dd":return an(e) ? a ? n + "dagar" : n + (s ? "daga" : "d\xf6gum") : a ? n + "dagur" : n + (s ? "dag" : "degi");case "M":return a ? "m\xe1nu\xf0ur" : s ? "m\xe1nu\xf0" : "m\xe1nu\xf0i";case "MM":return an(e) ? a ? n + "m\xe1nu\xf0ir" : n + (s ? "m\xe1nu\xf0i" : "m\xe1nu\xf0um") : a ? n + "m\xe1nu\xf0ur" : n + (s ? "m\xe1nu\xf0" : "m\xe1nu\xf0i");case "y":return a || s ? "\xe1r" : "\xe1ri";case "yy":return an(e) ? n + (a || s ? "\xe1r" : "\xe1rum") : n + (a || s ? "\xe1r" : "\xe1ri");}}l.defineLocale("hu", { months: "janu\xe1r_febru\xe1r_m\xe1rcius_\xe1prilis_m\xe1jus_j\xfanius_j\xfalius_augusztus_szeptember_okt\xf3ber_november_december".split("_"), monthsShort: "jan_feb_m\xe1rc_\xe1pr_m\xe1j_j\xfan_j\xfal_aug_szept_okt_nov_dec".split("_"), weekdays: "vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat".split("_"), weekdaysShort: "vas_h\xe9t_kedd_sze_cs\xfct_p\xe9n_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" }, meridiemParse: /de|du/i, isPM: function isPM(e) {return "u" === e.charAt(1).toLowerCase();}, meridiem: function meridiem(e, a, t) {return e < 12 ? !0 === t ? "de" : "DE" : !0 === t ? "du" : "DU";}, calendar: { sameDay: "[ma] LT[-kor]", nextDay: "[holnap] LT[-kor]", nextWeek: function nextWeek() {return en.call(this, !0);}, lastDay: "[tegnap] LT[-kor]", lastWeek: function lastWeek() {return en.call(this, !1);}, sameElse: "L" }, relativeTime: { future: "%s m\xfalva", past: "%s", s: Xs, ss: Xs, m: Xs, mm: Xs, h: Xs, hh: Xs, d: Xs, dd: Xs, M: Xs, MM: Xs, y: Xs, yy: Xs }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("hy-am", { months: { format: "\u0570\u0578\u0582\u0576\u057E\u0561\u0580\u056B_\u0583\u0565\u057F\u0580\u057E\u0561\u0580\u056B_\u0574\u0561\u0580\u057F\u056B_\u0561\u057A\u0580\u056B\u056C\u056B_\u0574\u0561\u0575\u056B\u057D\u056B_\u0570\u0578\u0582\u0576\u056B\u057D\u056B_\u0570\u0578\u0582\u056C\u056B\u057D\u056B_\u0585\u0563\u0578\u057D\u057F\u0578\u057D\u056B_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B".split("_"), standalone: "\u0570\u0578\u0582\u0576\u057E\u0561\u0580_\u0583\u0565\u057F\u0580\u057E\u0561\u0580_\u0574\u0561\u0580\u057F_\u0561\u057A\u0580\u056B\u056C_\u0574\u0561\u0575\u056B\u057D_\u0570\u0578\u0582\u0576\u056B\u057D_\u0570\u0578\u0582\u056C\u056B\u057D_\u0585\u0563\u0578\u057D\u057F\u0578\u057D_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580".split("_") }, monthsShort: "\u0570\u0576\u057E_\u0583\u057F\u0580_\u0574\u0580\u057F_\u0561\u057A\u0580_\u0574\u0575\u057D_\u0570\u0576\u057D_\u0570\u056C\u057D_\u0585\u0563\u057D_\u057D\u057A\u057F_\u0570\u056F\u057F_\u0576\u0574\u0562_\u0564\u056F\u057F".split("_"), weekdays: "\u056F\u056B\u0580\u0561\u056F\u056B_\u0565\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0570\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_"), weekdaysShort: "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"), weekdaysMin: "\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY \u0569.", LLL: "D MMMM YYYY \u0569., HH:mm", LLLL: "dddd, D MMMM YYYY \u0569., HH:mm" }, calendar: { sameDay: "[\u0561\u0575\u057D\u0585\u0580] LT", nextDay: "[\u057E\u0561\u0572\u0568] LT", lastDay: "[\u0565\u0580\u0565\u056F] LT", nextWeek: function nextWeek() {return "dddd [\u0585\u0580\u0568 \u056A\u0561\u0574\u0568] LT";}, lastWeek: function lastWeek() {return "[\u0561\u0576\u0581\u0561\u056E] dddd [\u0585\u0580\u0568 \u056A\u0561\u0574\u0568] LT";}, sameElse: "L" }, relativeTime: { future: "%s \u0570\u0565\u057F\u0578", past: "%s \u0561\u057C\u0561\u057B", s: "\u0574\u056B \u0584\u0561\u0576\u056B \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576", ss: "%d \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576", m: "\u0580\u0578\u057A\u0565", mm: "%d \u0580\u0578\u057A\u0565", h: "\u056A\u0561\u0574", hh: "%d \u056A\u0561\u0574", d: "\u0585\u0580", dd: "%d \u0585\u0580", M: "\u0561\u0574\u056B\u057D", MM: "%d \u0561\u0574\u056B\u057D", y: "\u057F\u0561\u0580\u056B", yy: "%d \u057F\u0561\u0580\u056B" }, meridiemParse: /\u0563\u056b\u0577\u0565\u0580\u057e\u0561|\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561|\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576/, isPM: function isPM(e) {return /^(\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576)$/.test(e);}, meridiem: function meridiem(e) {return e < 4 ? "\u0563\u056B\u0577\u0565\u0580\u057E\u0561" : e < 12 ? "\u0561\u057C\u0561\u057E\u0578\u057F\u057E\u0561" : e < 17 ? "\u0581\u0565\u0580\u0565\u056F\u057E\u0561" : "\u0565\u0580\u0565\u056F\u0578\u0575\u0561\u0576";}, dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(\u056b\u0576|\u0580\u0564)/, ordinal: function ordinal(e, a) {switch (a) {case "DDD":case "w":case "W":case "DDDo":return 1 === e ? e + "-\u056B\u0576" : e + "-\u0580\u0564";default:return e;}}, week: { dow: 1, doy: 7 } }), l.defineLocale("id", { months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"), weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|siang|sore|malam/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "pagi" === a ? e : "siang" === a ? 11 <= e ? e : e + 12 : "sore" === a || "malam" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam";}, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Besok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kemarin pukul] LT", lastWeek: "dddd [lalu pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lalu", s: "beberapa detik", ss: "%d detik", m: "semenit", mm: "%d menit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } }), l.defineLocale("is", { months: "jan\xfaar_febr\xfaar_mars_apr\xedl_ma\xed_j\xfan\xed_j\xfal\xed_\xe1g\xfast_september_okt\xf3ber_n\xf3vember_desember".split("_"), monthsShort: "jan_feb_mar_apr_ma\xed_j\xfan_j\xfal_\xe1g\xfa_sep_okt_n\xf3v_des".split("_"), weekdays: "sunnudagur_m\xe1nudagur_\xferi\xf0judagur_mi\xf0vikudagur_fimmtudagur_f\xf6studagur_laugardagur".split("_"), weekdaysShort: "sun_m\xe1n_\xferi_mi\xf0_fim_f\xf6s_lau".split("_"), weekdaysMin: "Su_M\xe1_\xder_Mi_Fi_F\xf6_La".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd, D. MMMM YYYY [kl.] H:mm" }, calendar: { sameDay: "[\xed dag kl.] LT", nextDay: "[\xe1 morgun kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[\xed g\xe6r kl.] LT", lastWeek: "[s\xed\xf0asta] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "eftir %s", past: "fyrir %s s\xed\xf0an", s: tn, ss: tn, m: tn, mm: tn, h: "klukkustund", hh: tn, d: tn, dd: tn, M: tn, MM: tn, y: tn, yy: tn }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("it-ch", { months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdays: "domenica_luned\xec_marted\xec_mercoled\xec_gioved\xec_venerd\xec_sabato".split("_"), weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Oggi alle] LT", nextDay: "[Domani alle] LT", nextWeek: "dddd [alle] LT", lastDay: "[Ieri alle] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:return "[la scorsa] dddd [alle] LT";default:return "[lo scorso] dddd [alle] LT";}}, sameElse: "L" }, relativeTime: { future: function future(e) {return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e;}, past: "%s fa", s: "alcuni secondi", ss: "%d secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } }), l.defineLocale("it", { months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdays: "domenica_luned\xec_marted\xec_mercoled\xec_gioved\xec_venerd\xec_sabato".split("_"), weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Oggi alle] LT", nextDay: "[Domani alle] LT", nextWeek: "dddd [alle] LT", lastDay: "[Ieri alle] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:return "[la scorsa] dddd [alle] LT";default:return "[lo scorso] dddd [alle] LT";}}, sameElse: "L" }, relativeTime: { future: function future(e) {return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e;}, past: "%s fa", s: "alcuni secondi", ss: "%d secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } }), l.defineLocale("ja", { months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays: "\u65E5\u66DC\u65E5_\u6708\u66DC\u65E5_\u706B\u66DC\u65E5_\u6C34\u66DC\u65E5_\u6728\u66DC\u65E5_\u91D1\u66DC\u65E5_\u571F\u66DC\u65E5".split("_"), weekdaysShort: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"), weekdaysMin: "\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm", LLLL: "YYYY\u5E74M\u6708D\u65E5 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5(ddd) HH:mm" }, meridiemParse: /\u5348\u524d|\u5348\u5f8c/i, isPM: function isPM(e) {return "\u5348\u5F8C" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u5348\u524D" : "\u5348\u5F8C";}, calendar: { sameDay: "[\u4ECA\u65E5] LT", nextDay: "[\u660E\u65E5] LT", nextWeek: function nextWeek(e) {return e.week() < this.week() ? "[\u6765\u9031]dddd LT" : "dddd LT";}, lastDay: "[\u6628\u65E5] LT", lastWeek: function lastWeek(e) {return this.week() < e.week() ? "[\u5148\u9031]dddd LT" : "dddd LT";}, sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}\u65e5/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + "\u65E5";default:return e;}}, relativeTime: { future: "%s\u5F8C", past: "%s\u524D", s: "\u6570\u79D2", ss: "%d\u79D2", m: "1\u5206", mm: "%d\u5206", h: "1\u6642\u9593", hh: "%d\u6642\u9593", d: "1\u65E5", dd: "%d\u65E5", M: "1\u30F6\u6708", MM: "%d\u30F6\u6708", y: "1\u5E74", yy: "%d\u5E74" } }), l.defineLocale("jv", { months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"), weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"), weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /enjing|siyang|sonten|ndalu/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "enjing" === a ? e : "siyang" === a ? 11 <= e ? e : e + 12 : "sonten" === a || "ndalu" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 11 ? "enjing" : e < 15 ? "siyang" : e < 19 ? "sonten" : "ndalu";}, calendar: { sameDay: "[Dinten puniko pukul] LT", nextDay: "[Mbenjang pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kala wingi pukul] LT", lastWeek: "dddd [kepengker pukul] LT", sameElse: "L" }, relativeTime: { future: "wonten ing %s", past: "%s ingkang kepengker", s: "sawetawis detik", ss: "%d detik", m: "setunggal menit", mm: "%d menit", h: "setunggal jam", hh: "%d jam", d: "sedinten", dd: "%d dinten", M: "sewulan", MM: "%d wulan", y: "setaun", yy: "%d taun" }, week: { dow: 1, doy: 7 } }), l.defineLocale("ka", { months: { standalone: "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8_\u10DB\u10D0\u10E0\u10E2\u10D8_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8_\u10DB\u10D0\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8".split("_"), format: "\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10E1_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10E1_\u10DB\u10D0\u10E0\u10E2\u10E1_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8\u10E1_\u10DB\u10D0\u10D8\u10E1\u10E1_\u10D8\u10D5\u10DC\u10D8\u10E1\u10E1_\u10D8\u10D5\u10DA\u10D8\u10E1\u10E1_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10E1_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10E1_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1".split("_") }, monthsShort: "\u10D8\u10D0\u10DC_\u10D7\u10D4\u10D1_\u10DB\u10D0\u10E0_\u10D0\u10DE\u10E0_\u10DB\u10D0\u10D8_\u10D8\u10D5\u10DC_\u10D8\u10D5\u10DA_\u10D0\u10D2\u10D5_\u10E1\u10D4\u10E5_\u10DD\u10E5\u10E2_\u10DC\u10DD\u10D4_\u10D3\u10D4\u10D9".split("_"), weekdays: { standalone: "\u10D9\u10D5\u10D8\u10E0\u10D0_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8_\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8".split("_"), format: "\u10D9\u10D5\u10D8\u10E0\u10D0\u10E1_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10E1_\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1".split("_"), isFormat: /(\u10ec\u10d8\u10dc\u10d0|\u10e8\u10d4\u10db\u10d3\u10d4\u10d2)/ }, weekdaysShort: "\u10D9\u10D5\u10D8_\u10DD\u10E0\u10E8_\u10E1\u10D0\u10DB_\u10DD\u10D7\u10EE_\u10EE\u10E3\u10D7_\u10DE\u10D0\u10E0_\u10E8\u10D0\u10D1".split("_"), weekdaysMin: "\u10D9\u10D5_\u10DD\u10E0_\u10E1\u10D0_\u10DD\u10D7_\u10EE\u10E3_\u10DE\u10D0_\u10E8\u10D0".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[\u10D3\u10E6\u10D4\u10E1] LT[-\u10D6\u10D4]", nextDay: "[\u10EE\u10D5\u10D0\u10DA] LT[-\u10D6\u10D4]", lastDay: "[\u10D2\u10E3\u10E8\u10D8\u10DC] LT[-\u10D6\u10D4]", nextWeek: "[\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2] dddd LT[-\u10D6\u10D4]", lastWeek: "[\u10EC\u10D8\u10DC\u10D0] dddd LT-\u10D6\u10D4", sameElse: "L" }, relativeTime: { future: function future(e) {return /(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10ec\u10d4\u10da\u10d8)/.test(e) ? e.replace(/\u10d8$/, "\u10E8\u10D8") : e + "\u10E8\u10D8";}, past: function past(e) {return /(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10d3\u10e6\u10d4|\u10d7\u10d5\u10d4)/.test(e) ? e.replace(/(\u10d8|\u10d4)$/, "\u10D8\u10E1 \u10EC\u10D8\u10DC") : /\u10ec\u10d4\u10da\u10d8/.test(e) ? e.replace(/\u10ec\u10d4\u10da\u10d8$/, "\u10EC\u10DA\u10D8\u10E1 \u10EC\u10D8\u10DC") : void 0;}, s: "\u10E0\u10D0\u10DB\u10D3\u10D4\u10DC\u10D8\u10DB\u10D4 \u10EC\u10D0\u10DB\u10D8", ss: "%d \u10EC\u10D0\u10DB\u10D8", m: "\u10EC\u10E3\u10D7\u10D8", mm: "%d \u10EC\u10E3\u10D7\u10D8", h: "\u10E1\u10D0\u10D0\u10D7\u10D8", hh: "%d \u10E1\u10D0\u10D0\u10D7\u10D8", d: "\u10D3\u10E6\u10D4", dd: "%d \u10D3\u10E6\u10D4", M: "\u10D7\u10D5\u10D4", MM: "%d \u10D7\u10D5\u10D4", y: "\u10EC\u10D4\u10DA\u10D8", yy: "%d \u10EC\u10D4\u10DA\u10D8" }, dayOfMonthOrdinalParse: /0|1-\u10da\u10d8|\u10db\u10d4-\d{1,2}|\d{1,2}-\u10d4/, ordinal: function ordinal(e) {return 0 === e ? e : 1 === e ? e + "-\u10DA\u10D8" : e < 20 || e <= 100 && e % 20 == 0 || e % 100 == 0 ? "\u10DB\u10D4-" + e : e + "-\u10D4";}, week: { dow: 1, doy: 7 } });var sn = { 0: "-\u0448\u0456", 1: "-\u0448\u0456", 2: "-\u0448\u0456", 3: "-\u0448\u0456", 4: "-\u0448\u0456", 5: "-\u0448\u0456", 6: "-\u0448\u044B", 7: "-\u0448\u0456", 8: "-\u0448\u0456", 9: "-\u0448\u044B", 10: "-\u0448\u044B", 20: "-\u0448\u044B", 30: "-\u0448\u044B", 40: "-\u0448\u044B", 50: "-\u0448\u0456", 60: "-\u0448\u044B", 70: "-\u0448\u0456", 80: "-\u0448\u0456", 90: "-\u0448\u044B", 100: "-\u0448\u0456" };l.defineLocale("kk", { months: "\u049B\u0430\u04A3\u0442\u0430\u0440_\u0430\u049B\u043F\u0430\u043D_\u043D\u0430\u0443\u0440\u044B\u0437_\u0441\u04D9\u0443\u0456\u0440_\u043C\u0430\u043C\u044B\u0440_\u043C\u0430\u0443\u0441\u044B\u043C_\u0448\u0456\u043B\u0434\u0435_\u0442\u0430\u043C\u044B\u0437_\u049B\u044B\u0440\u043A\u04AF\u0439\u0435\u043A_\u049B\u0430\u0437\u0430\u043D_\u049B\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D".split("_"), monthsShort: "\u049B\u0430\u04A3_\u0430\u049B\u043F_\u043D\u0430\u0443_\u0441\u04D9\u0443_\u043C\u0430\u043C_\u043C\u0430\u0443_\u0448\u0456\u043B_\u0442\u0430\u043C_\u049B\u044B\u0440_\u049B\u0430\u0437_\u049B\u0430\u0440_\u0436\u0435\u043B".split("_"), weekdays: "\u0436\u0435\u043A\u0441\u0435\u043D\u0431\u0456_\u0434\u04AF\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0441\u04D9\u0440\u0441\u0435\u043D\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043D\u0431\u0456_\u0436\u04B1\u043C\u0430_\u0441\u0435\u043D\u0431\u0456".split("_"), weekdaysShort: "\u0436\u0435\u043A_\u0434\u04AF\u0439_\u0441\u0435\u0439_\u0441\u04D9\u0440_\u0431\u0435\u0439_\u0436\u04B1\u043C_\u0441\u0435\u043D".split("_"), weekdaysMin: "\u0436\u043A_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043C_\u0441\u043D".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0411\u04AF\u0433\u0456\u043D \u0441\u0430\u0493\u0430\u0442] LT", nextDay: "[\u0415\u0440\u0442\u0435\u04A3 \u0441\u0430\u0493\u0430\u0442] LT", nextWeek: "dddd [\u0441\u0430\u0493\u0430\u0442] LT", lastDay: "[\u041A\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT", lastWeek: "[\u04E8\u0442\u043A\u0435\u043D \u0430\u043F\u0442\u0430\u043D\u044B\u04A3] dddd [\u0441\u0430\u0493\u0430\u0442] LT", sameElse: "L" }, relativeTime: { future: "%s \u0456\u0448\u0456\u043D\u0434\u0435", past: "%s \u0431\u04B1\u0440\u044B\u043D", s: "\u0431\u0456\u0440\u043D\u0435\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434", ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434", m: "\u0431\u0456\u0440 \u043C\u0438\u043D\u0443\u0442", mm: "%d \u043C\u0438\u043D\u0443\u0442", h: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442", hh: "%d \u0441\u0430\u0493\u0430\u0442", d: "\u0431\u0456\u0440 \u043A\u04AF\u043D", dd: "%d \u043A\u04AF\u043D", M: "\u0431\u0456\u0440 \u0430\u0439", MM: "%d \u0430\u0439", y: "\u0431\u0456\u0440 \u0436\u044B\u043B", yy: "%d \u0436\u044B\u043B" }, dayOfMonthOrdinalParse: /\d{1,2}-(\u0448\u0456|\u0448\u044b)/, ordinal: function ordinal(e) {return e + (sn[e] || sn[e % 10] || sn[100 <= e ? 100 : null]);}, week: { dow: 1, doy: 7 } });var nn = { 1: "\u17E1", 2: "\u17E2", 3: "\u17E3", 4: "\u17E4", 5: "\u17E5", 6: "\u17E6", 7: "\u17E7", 8: "\u17E8", 9: "\u17E9", 0: "\u17E0" },dn = { "\u17E1": "1", "\u17E2": "2", "\u17E3": "3", "\u17E4": "4", "\u17E5": "5", "\u17E6": "6", "\u17E7": "7", "\u17E8": "8", "\u17E9": "9", "\u17E0": "0" };l.defineLocale("km", { months: "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split("_"), monthsShort: "\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC".split("_"), weekdays: "\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799_\u1785\u17D0\u1793\u17D2\u1791_\u17A2\u1784\u17D2\u1782\u17B6\u179A_\u1796\u17BB\u1792_\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD_\u179F\u17BB\u1780\u17D2\u179A_\u179F\u17C5\u179A\u17CD".split("_"), weekdaysShort: "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split("_"), weekdaysMin: "\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /\u1796\u17d2\u179a\u17b9\u1780|\u179b\u17d2\u1784\u17b6\u1785/, isPM: function isPM(e) {return "\u179B\u17D2\u1784\u17B6\u1785" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u1796\u17D2\u179A\u17B9\u1780" : "\u179B\u17D2\u1784\u17B6\u1785";}, calendar: { sameDay: "[\u1790\u17D2\u1784\u17C3\u1793\u17C1\u17C7 \u1798\u17C9\u17C4\u1784] LT", nextDay: "[\u179F\u17D2\u17A2\u17C2\u1780 \u1798\u17C9\u17C4\u1784] LT", nextWeek: "dddd [\u1798\u17C9\u17C4\u1784] LT", lastDay: "[\u1798\u17D2\u179F\u17B7\u179B\u1798\u17B7\u1789 \u1798\u17C9\u17C4\u1784] LT", lastWeek: "dddd [\u179F\u1794\u17D2\u178F\u17B6\u17A0\u17CD\u1798\u17BB\u1793] [\u1798\u17C9\u17C4\u1784] LT", sameElse: "L" }, relativeTime: { future: "%s\u1791\u17C0\u178F", past: "%s\u1798\u17BB\u1793", s: "\u1794\u17C9\u17BB\u1793\u17D2\u1798\u17B6\u1793\u179C\u17B7\u1793\u17B6\u1791\u17B8", ss: "%d \u179C\u17B7\u1793\u17B6\u1791\u17B8", m: "\u1798\u17BD\u1799\u1793\u17B6\u1791\u17B8", mm: "%d \u1793\u17B6\u1791\u17B8", h: "\u1798\u17BD\u1799\u1798\u17C9\u17C4\u1784", hh: "%d \u1798\u17C9\u17C4\u1784", d: "\u1798\u17BD\u1799\u1790\u17D2\u1784\u17C3", dd: "%d \u1790\u17D2\u1784\u17C3", M: "\u1798\u17BD\u1799\u1781\u17C2", MM: "%d \u1781\u17C2", y: "\u1798\u17BD\u1799\u1786\u17D2\u1793\u17B6\u17C6", yy: "%d \u1786\u17D2\u1793\u17B6\u17C6" }, dayOfMonthOrdinalParse: /\u1791\u17b8\d{1,2}/, ordinal: "\u1791\u17B8%d", preparse: function preparse(e) {return e.replace(/[\u17e1\u17e2\u17e3\u17e4\u17e5\u17e6\u17e7\u17e8\u17e9\u17e0]/g, function (e) {return dn[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return nn[e];});}, week: { dow: 1, doy: 4 } });var rn = { 1: "\u0CE7", 2: "\u0CE8", 3: "\u0CE9", 4: "\u0CEA", 5: "\u0CEB", 6: "\u0CEC", 7: "\u0CED", 8: "\u0CEE", 9: "\u0CEF", 0: "\u0CE6" },_n = { "\u0CE7": "1", "\u0CE8": "2", "\u0CE9": "3", "\u0CEA": "4", "\u0CEB": "5", "\u0CEC": "6", "\u0CED": "7", "\u0CEE": "8", "\u0CEF": "9", "\u0CE6": "0" };l.defineLocale("kn", { months: "\u0C9C\u0CA8\u0CB5\u0CB0\u0CBF_\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0\u0CB5\u0CB0\u0CBF_\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A\u0CCD_\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD_\u0CAE\u0CC6\u0CD5_\u0C9C\u0CC2\u0CA8\u0CCD_\u0C9C\u0CC1\u0CB2\u0CC6\u0CD6_\u0C86\u0C97\u0CB8\u0CCD\u0C9F\u0CCD_\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82\u0CAC\u0CB0\u0CCD_\u0C85\u0C95\u0CCD\u0C9F\u0CC6\u0CC2\u0CD5\u0CAC\u0CB0\u0CCD_\u0CA8\u0CB5\u0CC6\u0C82\u0CAC\u0CB0\u0CCD_\u0CA1\u0CBF\u0CB8\u0CC6\u0C82\u0CAC\u0CB0\u0CCD".split("_"), monthsShort: "\u0C9C\u0CA8_\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0_\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A\u0CCD_\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD_\u0CAE\u0CC6\u0CD5_\u0C9C\u0CC2\u0CA8\u0CCD_\u0C9C\u0CC1\u0CB2\u0CC6\u0CD6_\u0C86\u0C97\u0CB8\u0CCD\u0C9F\u0CCD_\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82_\u0C85\u0C95\u0CCD\u0C9F\u0CC6\u0CC2\u0CD5_\u0CA8\u0CB5\u0CC6\u0C82_\u0CA1\u0CBF\u0CB8\u0CC6\u0C82".split("_"), monthsParseExact: !0, weekdays: "\u0CAD\u0CBE\u0CA8\u0CC1\u0CB5\u0CBE\u0CB0_\u0CB8\u0CC6\u0CC2\u0CD5\u0CAE\u0CB5\u0CBE\u0CB0_\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0_\u0CAC\u0CC1\u0CA7\u0CB5\u0CBE\u0CB0_\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0_\u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CB5\u0CBE\u0CB0_\u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0".split("_"), weekdaysShort: "\u0CAD\u0CBE\u0CA8\u0CC1_\u0CB8\u0CC6\u0CC2\u0CD5\u0CAE_\u0CAE\u0C82\u0C97\u0CB3_\u0CAC\u0CC1\u0CA7_\u0C97\u0CC1\u0CB0\u0CC1_\u0CB6\u0CC1\u0C95\u0CCD\u0CB0_\u0CB6\u0CA8\u0CBF".split("_"), weekdaysMin: "\u0CAD\u0CBE_\u0CB8\u0CC6\u0CC2\u0CD5_\u0CAE\u0C82_\u0CAC\u0CC1_\u0C97\u0CC1_\u0CB6\u0CC1_\u0CB6".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[\u0C87\u0C82\u0CA6\u0CC1] LT", nextDay: "[\u0CA8\u0CBE\u0CB3\u0CC6] LT", nextWeek: "dddd, LT", lastDay: "[\u0CA8\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6] LT", lastWeek: "[\u0C95\u0CC6\u0CC2\u0CA8\u0CC6\u0CAF] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0CA8\u0C82\u0CA4\u0CB0", past: "%s \u0CB9\u0CBF\u0C82\u0CA6\u0CC6", s: "\u0C95\u0CC6\u0CB2\u0CB5\u0CC1 \u0C95\u0CCD\u0CB7\u0CA3\u0C97\u0CB3\u0CC1", ss: "%d \u0CB8\u0CC6\u0C95\u0CC6\u0C82\u0CA1\u0CC1\u0C97\u0CB3\u0CC1", m: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7", mm: "%d \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7", h: "\u0C92\u0C82\u0CA6\u0CC1 \u0C97\u0C82\u0C9F\u0CC6", hh: "%d \u0C97\u0C82\u0C9F\u0CC6", d: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA6\u0CBF\u0CA8", dd: "%d \u0CA6\u0CBF\u0CA8", M: "\u0C92\u0C82\u0CA6\u0CC1 \u0CA4\u0CBF\u0C82\u0C97\u0CB3\u0CC1", MM: "%d \u0CA4\u0CBF\u0C82\u0C97\u0CB3\u0CC1", y: "\u0C92\u0C82\u0CA6\u0CC1 \u0CB5\u0CB0\u0CCD\u0CB7", yy: "%d \u0CB5\u0CB0\u0CCD\u0CB7" }, preparse: function preparse(e) {return e.replace(/[\u0ce7\u0ce8\u0ce9\u0cea\u0ceb\u0cec\u0ced\u0cee\u0cef\u0ce6]/g, function (e) {return _n[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return rn[e];});}, meridiemParse: /\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf|\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6|\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8|\u0cb8\u0c82\u0c9c\u0cc6/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF" === a ? e < 4 ? e : e + 12 : "\u0CAC\u0CC6\u0CB3\u0CBF\u0C97\u0CCD\u0C97\u0CC6" === a ? e : "\u0CAE\u0CA7\u0CCD\u0CAF\u0CBE\u0CB9\u0CCD\u0CA8" === a ? 10 <= e ? e : e + 12 : "\u0CB8\u0C82\u0C9C\u0CC6" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF" : e < 10 ? "\u0CAC\u0CC6\u0CB3\u0CBF\u0C97\u0CCD\u0C97\u0CC6" : e < 17 ? "\u0CAE\u0CA7\u0CCD\u0CAF\u0CBE\u0CB9\u0CCD\u0CA8" : e < 20 ? "\u0CB8\u0C82\u0C9C\u0CC6" : "\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF";}, dayOfMonthOrdinalParse: /\d{1,2}(\u0ca8\u0cc6\u0cd5)/, ordinal: function ordinal(e) {return e + "\u0CA8\u0CC6\u0CD5";}, week: { dow: 0, doy: 6 } }), l.defineLocale("ko", { months: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"), monthsShort: "1\uC6D4_2\uC6D4_3\uC6D4_4\uC6D4_5\uC6D4_6\uC6D4_7\uC6D4_8\uC6D4_9\uC6D4_10\uC6D4_11\uC6D4_12\uC6D4".split("_"), weekdays: "\uC77C\uC694\uC77C_\uC6D4\uC694\uC77C_\uD654\uC694\uC77C_\uC218\uC694\uC77C_\uBAA9\uC694\uC77C_\uAE08\uC694\uC77C_\uD1A0\uC694\uC77C".split("_"), weekdaysShort: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"), weekdaysMin: "\uC77C_\uC6D4_\uD654_\uC218_\uBAA9_\uAE08_\uD1A0".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY\uB144 MMMM D\uC77C", LLL: "YYYY\uB144 MMMM D\uC77C A h:mm", LLLL: "YYYY\uB144 MMMM D\uC77C dddd A h:mm", l: "YYYY.MM.DD.", ll: "YYYY\uB144 MMMM D\uC77C", lll: "YYYY\uB144 MMMM D\uC77C A h:mm", llll: "YYYY\uB144 MMMM D\uC77C dddd A h:mm" }, calendar: { sameDay: "\uC624\uB298 LT", nextDay: "\uB0B4\uC77C LT", nextWeek: "dddd LT", lastDay: "\uC5B4\uC81C LT", lastWeek: "\uC9C0\uB09C\uC8FC dddd LT", sameElse: "L" }, relativeTime: { future: "%s \uD6C4", past: "%s \uC804", s: "\uBA87 \uCD08", ss: "%d\uCD08", m: "1\uBD84", mm: "%d\uBD84", h: "\uD55C \uC2DC\uAC04", hh: "%d\uC2DC\uAC04", d: "\uD558\uB8E8", dd: "%d\uC77C", M: "\uD55C \uB2EC", MM: "%d\uB2EC", y: "\uC77C \uB144", yy: "%d\uB144" }, dayOfMonthOrdinalParse: /\d{1,2}(\uc77c|\uc6d4|\uc8fc)/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + "\uC77C";case "M":return e + "\uC6D4";case "w":case "W":return e + "\uC8FC";default:return e;}}, meridiemParse: /\uc624\uc804|\uc624\ud6c4/, isPM: function isPM(e) {return "\uC624\uD6C4" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\uC624\uC804" : "\uC624\uD6C4";} });var on = { 1: "\u0661", 2: "\u0662", 3: "\u0663", 4: "\u0664", 5: "\u0665", 6: "\u0666", 7: "\u0667", 8: "\u0668", 9: "\u0669", 0: "\u0660" },mn = { "\u0661": "1", "\u0662": "2", "\u0663": "3", "\u0664": "4", "\u0665": "5", "\u0666": "6", "\u0667": "7", "\u0668": "8", "\u0669": "9", "\u0660": "0" },un = ["\u06A9\u0627\u0646\u0648\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645", "\u0634\u0648\u0628\u0627\u062A", "\u0626\u0627\u0632\u0627\u0631", "\u0646\u06CC\u0633\u0627\u0646", "\u0626\u0627\u06CC\u0627\u0631", "\u062D\u0648\u0632\u06D5\u06CC\u0631\u0627\u0646", "\u062A\u06D5\u0645\u0645\u0648\u0632", "\u0626\u0627\u0628", "\u0626\u06D5\u06CC\u0644\u0648\u0648\u0644", "\u062A\u0634\u0631\u06CC\u0646\u06CC \u06CC\u06D5\u0643\u06D5\u0645", "\u062A\u0634\u0631\u06CC\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645", "\u0643\u0627\u0646\u0648\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645"];l.defineLocale("ku", { months: un, monthsShort: un, weekdays: "\u06CC\u0647\u200C\u0643\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u062F\u0648\u0648\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u0633\u06CE\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u0686\u0648\u0627\u0631\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u067E\u06CE\u0646\u062C\u0634\u0647\u200C\u0645\u0645\u0647\u200C_\u0647\u0647\u200C\u06CC\u0646\u06CC_\u0634\u0647\u200C\u0645\u0645\u0647\u200C".split("_"), weekdaysShort: "\u06CC\u0647\u200C\u0643\u0634\u0647\u200C\u0645_\u062F\u0648\u0648\u0634\u0647\u200C\u0645_\u0633\u06CE\u0634\u0647\u200C\u0645_\u0686\u0648\u0627\u0631\u0634\u0647\u200C\u0645_\u067E\u06CE\u0646\u062C\u0634\u0647\u200C\u0645_\u0647\u0647\u200C\u06CC\u0646\u06CC_\u0634\u0647\u200C\u0645\u0645\u0647\u200C".split("_"), weekdaysMin: "\u06CC_\u062F_\u0633_\u0686_\u067E_\u0647_\u0634".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /\u0626\u06ce\u0648\u0627\u0631\u0647\u200c|\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc/, isPM: function isPM(e) {return /\u0626\u06ce\u0648\u0627\u0631\u0647\u200c/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0628\u0647\u200C\u06CC\u0627\u0646\u06CC" : "\u0626\u06CE\u0648\u0627\u0631\u0647\u200C";}, calendar: { sameDay: "[\u0626\u0647\u200C\u0645\u0631\u06C6 \u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT", nextDay: "[\u0628\u0647\u200C\u06CC\u0627\u0646\u06CC \u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT", nextWeek: "dddd [\u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT", lastDay: "[\u062F\u0648\u06CE\u0646\u06CE \u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT", lastWeek: "dddd [\u0643\u0627\u062A\u0698\u0645\u06CE\u0631] LT", sameElse: "L" }, relativeTime: { future: "\u0644\u0647\u200C %s", past: "%s", s: "\u0686\u0647\u200C\u0646\u062F \u0686\u0631\u0643\u0647\u200C\u06CC\u0647\u200C\u0643", ss: "\u0686\u0631\u0643\u0647\u200C %d", m: "\u06CC\u0647\u200C\u0643 \u062E\u0648\u0644\u0647\u200C\u0643", mm: "%d \u062E\u0648\u0644\u0647\u200C\u0643", h: "\u06CC\u0647\u200C\u0643 \u0643\u0627\u062A\u0698\u0645\u06CE\u0631", hh: "%d \u0643\u0627\u062A\u0698\u0645\u06CE\u0631", d: "\u06CC\u0647\u200C\u0643 \u0695\u06C6\u0698", dd: "%d \u0695\u06C6\u0698", M: "\u06CC\u0647\u200C\u0643 \u0645\u0627\u0646\u06AF", MM: "%d \u0645\u0627\u0646\u06AF", y: "\u06CC\u0647\u200C\u0643 \u0633\u0627\u06B5", yy: "%d \u0633\u0627\u06B5" }, preparse: function preparse(e) {return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function (e) {return mn[e];}).replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return on[e];}).replace(/,/g, "\u060C");}, week: { dow: 6, doy: 12 } });var ln = { 0: "-\u0447\u04AF", 1: "-\u0447\u0438", 2: "-\u0447\u0438", 3: "-\u0447\u04AF", 4: "-\u0447\u04AF", 5: "-\u0447\u0438", 6: "-\u0447\u044B", 7: "-\u0447\u0438", 8: "-\u0447\u0438", 9: "-\u0447\u0443", 10: "-\u0447\u0443", 20: "-\u0447\u044B", 30: "-\u0447\u0443", 40: "-\u0447\u044B", 50: "-\u0447\u04AF", 60: "-\u0447\u044B", 70: "-\u0447\u0438", 80: "-\u0447\u0438", 90: "-\u0447\u0443", 100: "-\u0447\u04AF" };function Mn(e, a, t, s) {var n = { m: ["eng Minutt", "enger Minutt"], h: ["eng Stonn", "enger Stonn"], d: ["een Dag", "engem Dag"], M: ["ee Mount", "engem Mount"], y: ["ee Joer", "engem Joer"] };return a ? n[t][0] : n[t][1];}function hn(e) {if (e = parseInt(e, 10), isNaN(e)) return !1;if (e < 0) return !0;if (e < 10) return 4 <= e && e <= 7;if (e < 100) {var a = e % 10;return hn(0 === a ? e / 10 : a);}if (e < 1e4) {for (; 10 <= e;) {e /= 10;}return hn(e);}return hn(e /= 1e3);}l.defineLocale("ky", { months: "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_"), monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"), weekdays: "\u0416\u0435\u043A\u0448\u0435\u043C\u0431\u0438_\u0414\u04AF\u0439\u0448\u04E9\u043C\u0431\u04AF_\u0428\u0435\u0439\u0448\u0435\u043C\u0431\u0438_\u0428\u0430\u0440\u0448\u0435\u043C\u0431\u0438_\u0411\u0435\u0439\u0448\u0435\u043C\u0431\u0438_\u0416\u0443\u043C\u0430_\u0418\u0448\u0435\u043C\u0431\u0438".split("_"), weekdaysShort: "\u0416\u0435\u043A_\u0414\u04AF\u0439_\u0428\u0435\u0439_\u0428\u0430\u0440_\u0411\u0435\u0439_\u0416\u0443\u043C_\u0418\u0448\u0435".split("_"), weekdaysMin: "\u0416\u043A_\u0414\u0439_\u0428\u0439_\u0428\u0440_\u0411\u0439_\u0416\u043C_\u0418\u0448".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0411\u04AF\u0433\u04AF\u043D \u0441\u0430\u0430\u0442] LT", nextDay: "[\u042D\u0440\u0442\u0435\u04A3 \u0441\u0430\u0430\u0442] LT", nextWeek: "dddd [\u0441\u0430\u0430\u0442] LT", lastDay: "[\u041A\u0435\u0447\u044D\u044D \u0441\u0430\u0430\u0442] LT", lastWeek: "[\u04E8\u0442\u043A\u04E9\u043D \u0430\u043F\u0442\u0430\u043D\u044B\u043D] dddd [\u043A\u04AF\u043D\u04AF] [\u0441\u0430\u0430\u0442] LT", sameElse: "L" }, relativeTime: { future: "%s \u0438\u0447\u0438\u043D\u0434\u0435", past: "%s \u043C\u0443\u0440\u0443\u043D", s: "\u0431\u0438\u0440\u043D\u0435\u0447\u0435 \u0441\u0435\u043A\u0443\u043D\u0434", ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434", m: "\u0431\u0438\u0440 \u043C\u04AF\u043D\u04E9\u0442", mm: "%d \u043C\u04AF\u043D\u04E9\u0442", h: "\u0431\u0438\u0440 \u0441\u0430\u0430\u0442", hh: "%d \u0441\u0430\u0430\u0442", d: "\u0431\u0438\u0440 \u043A\u04AF\u043D", dd: "%d \u043A\u04AF\u043D", M: "\u0431\u0438\u0440 \u0430\u0439", MM: "%d \u0430\u0439", y: "\u0431\u0438\u0440 \u0436\u044B\u043B", yy: "%d \u0436\u044B\u043B" }, dayOfMonthOrdinalParse: /\d{1,2}-(\u0447\u0438|\u0447\u044b|\u0447\u04af|\u0447\u0443)/, ordinal: function ordinal(e) {return e + (ln[e] || ln[e % 10] || ln[100 <= e ? 100 : null]);}, week: { dow: 1, doy: 7 } }), l.defineLocale("lb", { months: "Januar_Februar_M\xe4erz_Abr\xebll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), monthsParseExact: !0, weekdays: "Sonndeg_M\xe9indeg_D\xebnschdeg_M\xebttwoch_Donneschdeg_Freideg_Samschdeg".split("_"), weekdaysShort: "So._M\xe9._D\xeb._M\xeb._Do._Fr._Sa.".split("_"), weekdaysMin: "So_M\xe9_D\xeb_M\xeb_Do_Fr_Sa".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm [Auer]", LTS: "H:mm:ss [Auer]", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm [Auer]", LLLL: "dddd, D. MMMM YYYY H:mm [Auer]" }, calendar: { sameDay: "[Haut um] LT", sameElse: "L", nextDay: "[Muer um] LT", nextWeek: "dddd [um] LT", lastDay: "[G\xebschter um] LT", lastWeek: function lastWeek() {switch (this.day()) {case 2:case 4:return "[Leschten] dddd [um] LT";default:return "[Leschte] dddd [um] LT";}} }, relativeTime: { future: function future(e) {return hn(e.substr(0, e.indexOf(" "))) ? "a " + e : "an " + e;}, past: function past(e) {return hn(e.substr(0, e.indexOf(" "))) ? "viru " + e : "virun " + e;}, s: "e puer Sekonnen", ss: "%d Sekonnen", m: Mn, mm: "%d Minutten", h: Mn, hh: "%d Stonnen", d: Mn, dd: "%d Deeg", M: Mn, MM: "%d M\xe9int", y: Mn, yy: "%d Joer" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("lo", { months: "\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99_\u0E81\u0EB8\u0EA1\u0E9E\u0EB2_\u0EA1\u0EB5\u0E99\u0EB2_\u0EC0\u0EA1\u0EAA\u0EB2_\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2_\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2_\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94_\u0EAA\u0EB4\u0E87\u0EAB\u0EB2_\u0E81\u0EB1\u0E99\u0E8D\u0EB2_\u0E95\u0EB8\u0EA5\u0EB2_\u0E9E\u0EB0\u0E88\u0EB4\u0E81_\u0E97\u0EB1\u0E99\u0EA7\u0EB2".split("_"), monthsShort: "\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99_\u0E81\u0EB8\u0EA1\u0E9E\u0EB2_\u0EA1\u0EB5\u0E99\u0EB2_\u0EC0\u0EA1\u0EAA\u0EB2_\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2_\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2_\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94_\u0EAA\u0EB4\u0E87\u0EAB\u0EB2_\u0E81\u0EB1\u0E99\u0E8D\u0EB2_\u0E95\u0EB8\u0EA5\u0EB2_\u0E9E\u0EB0\u0E88\u0EB4\u0E81_\u0E97\u0EB1\u0E99\u0EA7\u0EB2".split("_"), weekdays: "\u0EAD\u0EB2\u0E97\u0EB4\u0E94_\u0E88\u0EB1\u0E99_\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99_\u0E9E\u0EB8\u0E94_\u0E9E\u0EB0\u0EAB\u0EB1\u0E94_\u0EAA\u0EB8\u0E81_\u0EC0\u0EAA\u0EBB\u0EB2".split("_"), weekdaysShort: "\u0E97\u0EB4\u0E94_\u0E88\u0EB1\u0E99_\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99_\u0E9E\u0EB8\u0E94_\u0E9E\u0EB0\u0EAB\u0EB1\u0E94_\u0EAA\u0EB8\u0E81_\u0EC0\u0EAA\u0EBB\u0EB2".split("_"), weekdaysMin: "\u0E97_\u0E88_\u0EAD\u0E84_\u0E9E_\u0E9E\u0EAB_\u0EAA\u0E81_\u0EAA".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "\u0EA7\u0EB1\u0E99dddd D MMMM YYYY HH:mm" }, meridiemParse: /\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2|\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87/, isPM: function isPM(e) {return "\u0E95\u0EAD\u0E99\u0EC1\u0EA5\u0E87" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0E95\u0EAD\u0E99\u0EC0\u0E8A\u0EBB\u0EC9\u0EB2" : "\u0E95\u0EAD\u0E99\u0EC1\u0EA5\u0E87";}, calendar: { sameDay: "[\u0EA1\u0EB7\u0EC9\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT", nextDay: "[\u0EA1\u0EB7\u0EC9\u0EAD\u0EB7\u0EC8\u0E99\u0EC0\u0EA7\u0EA5\u0EB2] LT", nextWeek: "[\u0EA7\u0EB1\u0E99]dddd[\u0EDC\u0EC9\u0EB2\u0EC0\u0EA7\u0EA5\u0EB2] LT", lastDay: "[\u0EA1\u0EB7\u0EC9\u0EA7\u0EB2\u0E99\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT", lastWeek: "[\u0EA7\u0EB1\u0E99]dddd[\u0EC1\u0EA5\u0EC9\u0EA7\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT", sameElse: "L" }, relativeTime: { future: "\u0EAD\u0EB5\u0E81 %s", past: "%s\u0E9C\u0EC8\u0EB2\u0E99\u0EA1\u0EB2", s: "\u0E9A\u0ECD\u0EC8\u0EC0\u0E97\u0EBB\u0EC8\u0EB2\u0EC3\u0E94\u0EA7\u0EB4\u0E99\u0EB2\u0E97\u0EB5", ss: "%d \u0EA7\u0EB4\u0E99\u0EB2\u0E97\u0EB5", m: "1 \u0E99\u0EB2\u0E97\u0EB5", mm: "%d \u0E99\u0EB2\u0E97\u0EB5", h: "1 \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87", hh: "%d \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87", d: "1 \u0EA1\u0EB7\u0EC9", dd: "%d \u0EA1\u0EB7\u0EC9", M: "1 \u0EC0\u0E94\u0EB7\u0EAD\u0E99", MM: "%d \u0EC0\u0E94\u0EB7\u0EAD\u0E99", y: "1 \u0E9B\u0EB5", yy: "%d \u0E9B\u0EB5" }, dayOfMonthOrdinalParse: /(\u0e97\u0eb5\u0ec8)\d{1,2}/, ordinal: function ordinal(e) {return "\u0E97\u0EB5\u0EC8" + e;} });var Ln = { ss: "sekund\u0117_sekund\u017Ei\u0173_sekundes", m: "minut\u0117_minut\u0117s_minut\u0119", mm: "minut\u0117s_minu\u010Di\u0173_minutes", h: "valanda_valandos_valand\u0105", hh: "valandos_valand\u0173_valandas", d: "diena_dienos_dien\u0105", dd: "dienos_dien\u0173_dienas", M: "m\u0117nuo_m\u0117nesio_m\u0117nes\u012F", MM: "m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius", y: "metai_met\u0173_metus", yy: "metai_met\u0173_metus" };function cn(e, a, t, s) {return a ? yn(t)[0] : s ? yn(t)[1] : yn(t)[2];}function Yn(e) {return e % 10 == 0 || 10 < e && e < 20;}function yn(e) {return Ln[e].split("_");}function fn(e, a, t, s) {var n = e + " ";return 1 === e ? n + cn(0, a, t[0], s) : a ? n + (Yn(e) ? yn(t)[1] : yn(t)[0]) : s ? n + yn(t)[1] : n + (Yn(e) ? yn(t)[1] : yn(t)[2]);}l.defineLocale("lt", { months: { format: "sausio_vasario_kovo_baland\u017Eio_gegu\u017E\u0117s_bir\u017Eelio_liepos_rugpj\u016B\u010Dio_rugs\u0117jo_spalio_lapkri\u010Dio_gruod\u017Eio".split("_"), standalone: "sausis_vasaris_kovas_balandis_gegu\u017E\u0117_bir\u017Eelis_liepa_rugpj\u016Btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"), isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/ }, monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), weekdays: { format: "sekmadien\u012F_pirmadien\u012F_antradien\u012F_tre\u010Diadien\u012F_ketvirtadien\u012F_penktadien\u012F_\u0161e\u0161tadien\u012F".split("_"), standalone: "sekmadienis_pirmadienis_antradienis_tre\u010Diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"), isFormat: /dddd HH:mm/ }, weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"), weekdaysMin: "S_P_A_T_K_Pn_\u0160".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" }, calendar: { sameDay: "[\u0160iandien] LT", nextDay: "[Rytoj] LT", nextWeek: "dddd LT", lastDay: "[Vakar] LT", lastWeek: "[Pra\u0117jus\u012F] dddd LT", sameElse: "L" }, relativeTime: { future: "po %s", past: "prie\u0161 %s", s: function s(e, a, t, _s2) {return a ? "kelios sekund\u0117s" : _s2 ? "keli\u0173 sekund\u017Ei\u0173" : "kelias sekundes";}, ss: fn, m: cn, mm: fn, h: cn, hh: fn, d: cn, dd: fn, M: cn, MM: fn, y: cn, yy: fn }, dayOfMonthOrdinalParse: /\d{1,2}-oji/, ordinal: function ordinal(e) {return e + "-oji";}, week: { dow: 1, doy: 4 } });var kn = { ss: "sekundes_sekund\u0113m_sekunde_sekundes".split("_"), m: "min\u016Btes_min\u016Bt\u0113m_min\u016Bte_min\u016Btes".split("_"), mm: "min\u016Btes_min\u016Bt\u0113m_min\u016Bte_min\u016Btes".split("_"), h: "stundas_stund\u0101m_stunda_stundas".split("_"), hh: "stundas_stund\u0101m_stunda_stundas".split("_"), d: "dienas_dien\u0101m_diena_dienas".split("_"), dd: "dienas_dien\u0101m_diena_dienas".split("_"), M: "m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"), MM: "m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"), y: "gada_gadiem_gads_gadi".split("_"), yy: "gada_gadiem_gads_gadi".split("_") };function pn(e, a, t) {return t ? a % 10 == 1 && a % 100 != 11 ? e[2] : e[3] : a % 10 == 1 && a % 100 != 11 ? e[0] : e[1];}function Dn(e, a, t) {return e + " " + pn(kn[t], e, a);}function Tn(e, a, t) {return pn(kn[t], e, a);}l.defineLocale("lv", { months: "janv\u0101ris_febru\u0101ris_marts_apr\u012Blis_maijs_j\u016Bnijs_j\u016Blijs_augusts_septembris_oktobris_novembris_decembris".split("_"), monthsShort: "jan_feb_mar_apr_mai_j\u016Bn_j\u016Bl_aug_sep_okt_nov_dec".split("_"), weekdays: "sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"), weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY.", LL: "YYYY. [gada] D. MMMM", LLL: "YYYY. [gada] D. MMMM, HH:mm", LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm" }, calendar: { sameDay: "[\u0160odien pulksten] LT", nextDay: "[R\u012Bt pulksten] LT", nextWeek: "dddd [pulksten] LT", lastDay: "[Vakar pulksten] LT", lastWeek: "[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT", sameElse: "L" }, relativeTime: { future: "p\u0113c %s", past: "pirms %s", s: function s(e, a) {return a ? "da\u017Eas sekundes" : "da\u017E\u0101m sekund\u0113m";}, ss: Dn, m: Tn, mm: Dn, h: Tn, hh: Dn, d: Tn, dd: Dn, M: Tn, MM: Dn, y: Tn, yy: Dn }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });var gn = { words: { ss: ["sekund", "sekunda", "sekundi"], m: ["jedan minut", "jednog minuta"], mm: ["minut", "minuta", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], dd: ["dan", "dana", "dana"], MM: ["mjesec", "mjeseca", "mjeseci"], yy: ["godina", "godine", "godina"] }, correctGrammaticalCase: function correctGrammaticalCase(e, a) {return 1 === e ? a[0] : 2 <= e && e <= 4 ? a[1] : a[2];}, translate: function translate(e, a, t) {var s = gn.words[t];return 1 === t.length ? a ? s[0] : s[1] : e + " " + gn.correctGrammaticalCase(e, s);} };function wn(e, a, t, s) {switch (t) {case "s":return a ? "\u0445\u044D\u0434\u0445\u044D\u043D \u0441\u0435\u043A\u0443\u043D\u0434" : "\u0445\u044D\u0434\u0445\u044D\u043D \u0441\u0435\u043A\u0443\u043D\u0434\u044B\u043D";case "ss":return e + (a ? " \u0441\u0435\u043A\u0443\u043D\u0434" : " \u0441\u0435\u043A\u0443\u043D\u0434\u044B\u043D");case "m":case "mm":return e + (a ? " \u043C\u0438\u043D\u0443\u0442" : " \u043C\u0438\u043D\u0443\u0442\u044B\u043D");case "h":case "hh":return e + (a ? " \u0446\u0430\u0433" : " \u0446\u0430\u0433\u0438\u0439\u043D");case "d":case "dd":return e + (a ? " \u04E9\u0434\u04E9\u0440" : " \u04E9\u0434\u0440\u0438\u0439\u043D");case "M":case "MM":return e + (a ? " \u0441\u0430\u0440" : " \u0441\u0430\u0440\u044B\u043D");case "y":case "yy":return e + (a ? " \u0436\u0438\u043B" : " \u0436\u0438\u043B\u0438\u0439\u043D");default:return e;}}l.defineLocale("me", { months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), monthsParseExact: !0, weekdays: "nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._\u010Det._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sjutra u] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[u] [nedjelju] [u] LT";case 3:return "[u] [srijedu] [u] LT";case 6:return "[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return "[u] dddd [u] LT";}}, lastDay: "[ju\u010De u] LT", lastWeek: function lastWeek() {return ["[pro\u0161le] [nedjelje] [u] LT", "[pro\u0161log] [ponedjeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srijede] [u] LT", "[pro\u0161log] [\u010Detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"][this.day()];}, sameElse: "L" }, relativeTime: { future: "za %s", past: "prije %s", s: "nekoliko sekundi", ss: gn.translate, m: gn.translate, mm: gn.translate, h: gn.translate, hh: gn.translate, d: "dan", dd: gn.translate, M: "mjesec", MM: gn.translate, y: "godinu", yy: gn.translate }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } }), l.defineLocale("mi", { months: "Kohi-t\u0101te_Hui-tanguru_Pout\u016B-te-rangi_Paenga-wh\u0101wh\u0101_Haratua_Pipiri_H\u014Dngoingoi_Here-turi-k\u014Dk\u0101_Mahuru_Whiringa-\u0101-nuku_Whiringa-\u0101-rangi_Hakihea".split("_"), monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_H\u014Dngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"), monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i, weekdays: "R\u0101tapu_Mane_T\u016Brei_Wenerei_T\u0101ite_Paraire_H\u0101tarei".split("_"), weekdaysShort: "Ta_Ma_T\u016B_We_T\u0101i_Pa_H\u0101".split("_"), weekdaysMin: "Ta_Ma_T\u016B_We_T\u0101i_Pa_H\u0101".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [i] HH:mm", LLLL: "dddd, D MMMM YYYY [i] HH:mm" }, calendar: { sameDay: "[i teie mahana, i] LT", nextDay: "[apopo i] LT", nextWeek: "dddd [i] LT", lastDay: "[inanahi i] LT", lastWeek: "dddd [whakamutunga i] LT", sameElse: "L" }, relativeTime: { future: "i roto i %s", past: "%s i mua", s: "te h\u0113kona ruarua", ss: "%d h\u0113kona", m: "he meneti", mm: "%d meneti", h: "te haora", hh: "%d haora", d: "he ra", dd: "%d ra", M: "he marama", MM: "%d marama", y: "he tau", yy: "%d tau" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } }), l.defineLocale("mk", { months: "\u0458\u0430\u043D\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0458_\u0458\u0443\u043D\u0438_\u0458\u0443\u043B\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438_\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438_\u043D\u043E\u0435\u043C\u0432\u0440\u0438_\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438".split("_"), monthsShort: "\u0458\u0430\u043D_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433_\u0441\u0435\u043F_\u043E\u043A\u0442_\u043D\u043E\u0435_\u0434\u0435\u043A".split("_"), weekdays: "\u043D\u0435\u0434\u0435\u043B\u0430_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043E\u043A_\u043F\u0435\u0442\u043E\u043A_\u0441\u0430\u0431\u043E\u0442\u0430".split("_"), weekdaysShort: "\u043D\u0435\u0434_\u043F\u043E\u043D_\u0432\u0442\u043E_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043F\u0435\u0442_\u0441\u0430\u0431".split("_"), weekdaysMin: "\u043De_\u043Fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043F\u0435_\u0441a".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[\u0414\u0435\u043D\u0435\u0441 \u0432\u043E] LT", nextDay: "[\u0423\u0442\u0440\u0435 \u0432\u043E] LT", nextWeek: "[\u0412\u043E] dddd [\u0432\u043E] LT", lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432\u043E] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:case 3:case 6:return "[\u0418\u0437\u043C\u0438\u043D\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043E] LT";case 1:case 2:case 4:case 5:return "[\u0418\u0437\u043C\u0438\u043D\u0430\u0442\u0438\u043E\u0442] dddd [\u0432\u043E] LT";}}, sameElse: "L" }, relativeTime: { future: "\u043F\u043E\u0441\u043B\u0435 %s", past: "\u043F\u0440\u0435\u0434 %s", s: "\u043D\u0435\u043A\u043E\u043B\u043A\u0443 \u0441\u0435\u043A\u0443\u043D\u0434\u0438", ss: "%d \u0441\u0435\u043A\u0443\u043D\u0434\u0438", m: "\u043C\u0438\u043D\u0443\u0442\u0430", mm: "%d \u043C\u0438\u043D\u0443\u0442\u0438", h: "\u0447\u0430\u0441", hh: "%d \u0447\u0430\u0441\u0430", d: "\u0434\u0435\u043D", dd: "%d \u0434\u0435\u043D\u0430", M: "\u043C\u0435\u0441\u0435\u0446", MM: "%d \u043C\u0435\u0441\u0435\u0446\u0438", y: "\u0433\u043E\u0434\u0438\u043D\u0430", yy: "%d \u0433\u043E\u0434\u0438\u043D\u0438" }, dayOfMonthOrdinalParse: /\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/, ordinal: function ordinal(e) {var a = e % 10,t = e % 100;return 0 === e ? e + "-\u0435\u0432" : 0 === t ? e + "-\u0435\u043D" : 10 < t && t < 20 ? e + "-\u0442\u0438" : 1 === a ? e + "-\u0432\u0438" : 2 === a ? e + "-\u0440\u0438" : 7 === a || 8 === a ? e + "-\u043C\u0438" : e + "-\u0442\u0438";}, week: { dow: 1, doy: 7 } }), l.defineLocale("ml", { months: "\u0D1C\u0D28\u0D41\u0D35\u0D30\u0D3F_\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41\u0D35\u0D30\u0D3F_\u0D2E\u0D3E\u0D7C\u0D1A\u0D4D\u0D1A\u0D4D_\u0D0F\u0D2A\u0D4D\u0D30\u0D3F\u0D7D_\u0D2E\u0D47\u0D2F\u0D4D_\u0D1C\u0D42\u0D7A_\u0D1C\u0D42\u0D32\u0D48_\u0D13\u0D17\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D_\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31\u0D02\u0D2C\u0D7C_\u0D12\u0D15\u0D4D\u0D1F\u0D4B\u0D2C\u0D7C_\u0D28\u0D35\u0D02\u0D2C\u0D7C_\u0D21\u0D3F\u0D38\u0D02\u0D2C\u0D7C".split("_"), monthsShort: "\u0D1C\u0D28\u0D41._\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41._\u0D2E\u0D3E\u0D7C._\u0D0F\u0D2A\u0D4D\u0D30\u0D3F._\u0D2E\u0D47\u0D2F\u0D4D_\u0D1C\u0D42\u0D7A_\u0D1C\u0D42\u0D32\u0D48._\u0D13\u0D17._\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31._\u0D12\u0D15\u0D4D\u0D1F\u0D4B._\u0D28\u0D35\u0D02._\u0D21\u0D3F\u0D38\u0D02.".split("_"), monthsParseExact: !0, weekdays: "\u0D1E\u0D3E\u0D2F\u0D31\u0D3E\u0D34\u0D4D\u0D1A_\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D33\u0D3E\u0D34\u0D4D\u0D1A_\u0D1A\u0D4A\u0D35\u0D4D\u0D35\u0D3E\u0D34\u0D4D\u0D1A_\u0D2C\u0D41\u0D27\u0D28\u0D3E\u0D34\u0D4D\u0D1A_\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D3E\u0D34\u0D4D\u0D1A_\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A_\u0D36\u0D28\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A".split("_"), weekdaysShort: "\u0D1E\u0D3E\u0D2F\u0D7C_\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D7E_\u0D1A\u0D4A\u0D35\u0D4D\u0D35_\u0D2C\u0D41\u0D27\u0D7B_\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D02_\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F_\u0D36\u0D28\u0D3F".split("_"), weekdaysMin: "\u0D1E\u0D3E_\u0D24\u0D3F_\u0D1A\u0D4A_\u0D2C\u0D41_\u0D35\u0D4D\u0D2F\u0D3E_\u0D35\u0D46_\u0D36".split("_"), longDateFormat: { LT: "A h:mm -\u0D28\u0D41", LTS: "A h:mm:ss -\u0D28\u0D41", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm -\u0D28\u0D41", LLLL: "dddd, D MMMM YYYY, A h:mm -\u0D28\u0D41" }, calendar: { sameDay: "[\u0D07\u0D28\u0D4D\u0D28\u0D4D] LT", nextDay: "[\u0D28\u0D3E\u0D33\u0D46] LT", nextWeek: "dddd, LT", lastDay: "[\u0D07\u0D28\u0D4D\u0D28\u0D32\u0D46] LT", lastWeek: "[\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D", past: "%s \u0D2E\u0D41\u0D7B\u0D2A\u0D4D", s: "\u0D05\u0D7D\u0D2A \u0D28\u0D3F\u0D2E\u0D3F\u0D37\u0D19\u0D4D\u0D19\u0D7E", ss: "%d \u0D38\u0D46\u0D15\u0D4D\u0D15\u0D7B\u0D21\u0D4D", m: "\u0D12\u0D30\u0D41 \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D", mm: "%d \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D", h: "\u0D12\u0D30\u0D41 \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C", hh: "%d \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C", d: "\u0D12\u0D30\u0D41 \u0D26\u0D3F\u0D35\u0D38\u0D02", dd: "%d \u0D26\u0D3F\u0D35\u0D38\u0D02", M: "\u0D12\u0D30\u0D41 \u0D2E\u0D3E\u0D38\u0D02", MM: "%d \u0D2E\u0D3E\u0D38\u0D02", y: "\u0D12\u0D30\u0D41 \u0D35\u0D7C\u0D37\u0D02", yy: "%d \u0D35\u0D7C\u0D37\u0D02" }, meridiemParse: /\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f|\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46|\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f/i, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F" === a && 4 <= e || "\u0D09\u0D1A\u0D4D\u0D1A \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D" === a || "\u0D35\u0D48\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D30\u0D02" === a ? e + 12 : e;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F" : e < 12 ? "\u0D30\u0D3E\u0D35\u0D3F\u0D32\u0D46" : e < 17 ? "\u0D09\u0D1A\u0D4D\u0D1A \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D" : e < 20 ? "\u0D35\u0D48\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D30\u0D02" : "\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F";} }), l.defineLocale("mn", { months: "\u041D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0425\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0413\u0443\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u04E9\u0440\u04E9\u0432\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0422\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0417\u0443\u0440\u0433\u0430\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u043E\u043B\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u041D\u0430\u0439\u043C\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0415\u0441\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u043D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043D \u0445\u043E\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440".split("_"), monthsShort: "1 \u0441\u0430\u0440_2 \u0441\u0430\u0440_3 \u0441\u0430\u0440_4 \u0441\u0430\u0440_5 \u0441\u0430\u0440_6 \u0441\u0430\u0440_7 \u0441\u0430\u0440_8 \u0441\u0430\u0440_9 \u0441\u0430\u0440_10 \u0441\u0430\u0440_11 \u0441\u0430\u0440_12 \u0441\u0430\u0440".split("_"), monthsParseExact: !0, weekdays: "\u041D\u044F\u043C_\u0414\u0430\u0432\u0430\u0430_\u041C\u044F\u0433\u043C\u0430\u0440_\u041B\u0445\u0430\u0433\u0432\u0430_\u041F\u04AF\u0440\u044D\u0432_\u0411\u0430\u0430\u0441\u0430\u043D_\u0411\u044F\u043C\u0431\u0430".split("_"), weekdaysShort: "\u041D\u044F\u043C_\u0414\u0430\u0432_\u041C\u044F\u0433_\u041B\u0445\u0430_\u041F\u04AF\u0440_\u0411\u0430\u0430_\u0411\u044F\u043C".split("_"), weekdaysMin: "\u041D\u044F_\u0414\u0430_\u041C\u044F_\u041B\u0445_\u041F\u04AF_\u0411\u0430_\u0411\u044F".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D", LLL: "YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm", LLLL: "dddd, YYYY \u043E\u043D\u044B MMMM\u044B\u043D D HH:mm" }, meridiemParse: /\u04ae\u04e8|\u04ae\u0425/i, isPM: function isPM(e) {return "\u04AE\u0425" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u04AE\u04E8" : "\u04AE\u0425";}, calendar: { sameDay: "[\u04E8\u043D\u04E9\u04E9\u0434\u04E9\u0440] LT", nextDay: "[\u041C\u0430\u0440\u0433\u0430\u0430\u0448] LT", nextWeek: "[\u0418\u0440\u044D\u0445] dddd LT", lastDay: "[\u04E8\u0447\u0438\u0433\u0434\u04E9\u0440] LT", lastWeek: "[\u04E8\u043D\u0433\u04E9\u0440\u0441\u04E9\u043D] dddd LT", sameElse: "L" }, relativeTime: { future: "%s \u0434\u0430\u0440\u0430\u0430", past: "%s \u04E9\u043C\u043D\u04E9", s: wn, ss: wn, m: wn, mm: wn, h: wn, hh: wn, d: wn, dd: wn, M: wn, MM: wn, y: wn, yy: wn }, dayOfMonthOrdinalParse: /\d{1,2} \u04e9\u0434\u04e9\u0440/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + " \u04E9\u0434\u04E9\u0440";default:return e;}} });var vn = { 1: "\u0967", 2: "\u0968", 3: "\u0969", 4: "\u096A", 5: "\u096B", 6: "\u096C", 7: "\u096D", 8: "\u096E", 9: "\u096F", 0: "\u0966" },Sn = { "\u0967": "1", "\u0968": "2", "\u0969": "3", "\u096A": "4", "\u096B": "5", "\u096C": "6", "\u096D": "7", "\u096E": "8", "\u096F": "9", "\u0966": "0" };function Hn(e, a, t, s) {var n = "";if (a) switch (t) {case "s":n = "\u0915\u093E\u0939\u0940 \u0938\u0947\u0915\u0902\u0926";break;case "ss":n = "%d \u0938\u0947\u0915\u0902\u0926";break;case "m":n = "\u090F\u0915 \u092E\u093F\u0928\u093F\u091F";break;case "mm":n = "%d \u092E\u093F\u0928\u093F\u091F\u0947";break;case "h":n = "\u090F\u0915 \u0924\u093E\u0938";break;case "hh":n = "%d \u0924\u093E\u0938";break;case "d":n = "\u090F\u0915 \u0926\u093F\u0935\u0938";break;case "dd":n = "%d \u0926\u093F\u0935\u0938";break;case "M":n = "\u090F\u0915 \u092E\u0939\u093F\u0928\u093E";break;case "MM":n = "%d \u092E\u0939\u093F\u0928\u0947";break;case "y":n = "\u090F\u0915 \u0935\u0930\u094D\u0937";break;case "yy":n = "%d \u0935\u0930\u094D\u0937\u0947";break;} else switch (t) {case "s":n = "\u0915\u093E\u0939\u0940 \u0938\u0947\u0915\u0902\u0926\u093E\u0902";break;case "ss":n = "%d \u0938\u0947\u0915\u0902\u0926\u093E\u0902";break;case "m":n = "\u090F\u0915\u093E \u092E\u093F\u0928\u093F\u091F\u093E";break;case "mm":n = "%d \u092E\u093F\u0928\u093F\u091F\u093E\u0902";break;case "h":n = "\u090F\u0915\u093E \u0924\u093E\u0938\u093E";break;case "hh":n = "%d \u0924\u093E\u0938\u093E\u0902";break;case "d":n = "\u090F\u0915\u093E \u0926\u093F\u0935\u0938\u093E";break;case "dd":n = "%d \u0926\u093F\u0935\u0938\u093E\u0902";break;case "M":n = "\u090F\u0915\u093E \u092E\u0939\u093F\u0928\u094D\u092F\u093E";break;case "MM":n = "%d \u092E\u0939\u093F\u0928\u094D\u092F\u093E\u0902";break;case "y":n = "\u090F\u0915\u093E \u0935\u0930\u094D\u0937\u093E";break;case "yy":n = "%d \u0935\u0930\u094D\u0937\u093E\u0902";break;}return n.replace(/%d/i, e);}l.defineLocale("mr", { months: "\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u093E\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u090F\u092A\u094D\u0930\u093F\u0932_\u092E\u0947_\u091C\u0942\u0928_\u091C\u0941\u0932\u0948_\u0911\u0917\u0938\u094D\u091F_\u0938\u092A\u094D\u091F\u0947\u0902\u092C\u0930_\u0911\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930_\u0921\u093F\u0938\u0947\u0902\u092C\u0930".split("_"), monthsShort: "\u091C\u093E\u0928\u0947._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A._\u090F\u092A\u094D\u0930\u093F._\u092E\u0947._\u091C\u0942\u0928._\u091C\u0941\u0932\u0948._\u0911\u0917._\u0938\u092A\u094D\u091F\u0947\u0902._\u0911\u0915\u094D\u091F\u094B._\u0928\u094B\u0935\u094D\u0939\u0947\u0902._\u0921\u093F\u0938\u0947\u0902.".split("_"), monthsParseExact: !0, weekdays: "\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0933\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930".split("_"), weekdaysShort: "\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0933_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F".split("_"), weekdaysMin: "\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"), longDateFormat: { LT: "A h:mm \u0935\u093E\u091C\u0924\u093E", LTS: "A h:mm:ss \u0935\u093E\u091C\u0924\u093E", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E", LLLL: "dddd, D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E" }, calendar: { sameDay: "[\u0906\u091C] LT", nextDay: "[\u0909\u0926\u094D\u092F\u093E] LT", nextWeek: "dddd, LT", lastDay: "[\u0915\u093E\u0932] LT", lastWeek: "[\u092E\u093E\u0917\u0940\u0932] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s\u092E\u0927\u094D\u092F\u0947", past: "%s\u092A\u0942\u0930\u094D\u0935\u0940", s: Hn, ss: Hn, m: Hn, mm: Hn, h: Hn, hh: Hn, d: Hn, dd: Hn, M: Hn, MM: Hn, y: Hn, yy: Hn }, preparse: function preparse(e) {return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function (e) {return Sn[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return vn[e];});}, meridiemParse: /\u0930\u093e\u0924\u094d\u0930\u0940|\u0938\u0915\u093e\u0933\u0940|\u0926\u0941\u092a\u093e\u0930\u0940|\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0930\u093E\u0924\u094D\u0930\u0940" === a ? e < 4 ? e : e + 12 : "\u0938\u0915\u093E\u0933\u0940" === a ? e : "\u0926\u0941\u092A\u093E\u0930\u0940" === a ? 10 <= e ? e : e + 12 : "\u0938\u093E\u092F\u0902\u0915\u093E\u0933\u0940" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0930\u093E\u0924\u094D\u0930\u0940" : e < 10 ? "\u0938\u0915\u093E\u0933\u0940" : e < 17 ? "\u0926\u0941\u092A\u093E\u0930\u0940" : e < 20 ? "\u0938\u093E\u092F\u0902\u0915\u093E\u0933\u0940" : "\u0930\u093E\u0924\u094D\u0930\u0940";}, week: { dow: 0, doy: 6 } }), l.defineLocale("ms-my", { months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|tengahari|petang|malam/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "pagi" === a ? e : "tengahari" === a ? 11 <= e ? e : e + 12 : "petang" === a || "malam" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam";}, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Esok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kelmarin pukul] LT", lastWeek: "dddd [lepas pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", ss: "%d saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } }), l.defineLocale("ms", { months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|tengahari|petang|malam/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "pagi" === a ? e : "tengahari" === a ? 11 <= e ? e : e + 12 : "petang" === a || "malam" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam";}, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Esok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kelmarin pukul] LT", lastWeek: "dddd [lepas pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", ss: "%d saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } }), l.defineLocale("mt", { months: "Jannar_Frar_Marzu_April_Mejju_\u0120unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di\u010Bembru".split("_"), monthsShort: "Jan_Fra_Mar_Apr_Mej_\u0120un_Lul_Aww_Set_Ott_Nov_Di\u010B".split("_"), weekdays: "Il-\u0126add_It-Tnejn_It-Tlieta_L-Erbg\u0127a_Il-\u0126amis_Il-\u0120img\u0127a_Is-Sibt".split("_"), weekdaysShort: "\u0126ad_Tne_Tli_Erb_\u0126am_\u0120im_Sib".split("_"), weekdaysMin: "\u0126a_Tn_Tl_Er_\u0126a_\u0120i_Si".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Illum fil-]LT", nextDay: "[G\u0127ada fil-]LT", nextWeek: "dddd [fil-]LT", lastDay: "[Il-biera\u0127 fil-]LT", lastWeek: "dddd [li g\u0127adda] [fil-]LT", sameElse: "L" }, relativeTime: { future: "f\u2019 %s", past: "%s ilu", s: "ftit sekondi", ss: "%d sekondi", m: "minuta", mm: "%d minuti", h: "sieg\u0127a", hh: "%d sieg\u0127at", d: "\u0121urnata", dd: "%d \u0121ranet", M: "xahar", MM: "%d xhur", y: "sena", yy: "%d sni" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } });var bn = { 1: "\u1041", 2: "\u1042", 3: "\u1043", 4: "\u1044", 5: "\u1045", 6: "\u1046", 7: "\u1047", 8: "\u1048", 9: "\u1049", 0: "\u1040" },jn = { "\u1041": "1", "\u1042": "2", "\u1043": "3", "\u1044": "4", "\u1045": "5", "\u1046": "6", "\u1047": "7", "\u1048": "8", "\u1049": "9", "\u1040": "0" };l.defineLocale("my", { months: "\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E_\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E_\u1019\u1010\u103A_\u1027\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u1007\u1030\u101C\u102D\u102F\u1004\u103A_\u101E\u103C\u1002\u102F\u1010\u103A_\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C_\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C_\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C_\u1012\u102E\u1007\u1004\u103A\u1018\u102C".split("_"), monthsShort: "\u1007\u1014\u103A_\u1016\u1031_\u1019\u1010\u103A_\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u101C\u102D\u102F\u1004\u103A_\u101E\u103C_\u1005\u1000\u103A_\u1021\u1031\u102C\u1000\u103A_\u1014\u102D\u102F_\u1012\u102E".split("_"), weekdays: "\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031_\u1010\u1014\u1004\u103A\u1039\u101C\u102C_\u1021\u1004\u103A\u1039\u1002\u102B_\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038_\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038_\u101E\u1031\u102C\u1000\u103C\u102C_\u1005\u1014\u1031".split("_"), weekdaysShort: "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split("_"), weekdaysMin: "\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u101A\u1014\u1031.] LT [\u1019\u103E\u102C]", nextDay: "[\u1019\u1014\u1000\u103A\u1016\u103C\u1014\u103A] LT [\u1019\u103E\u102C]", nextWeek: "dddd LT [\u1019\u103E\u102C]", lastDay: "[\u1019\u1014\u1031.\u1000] LT [\u1019\u103E\u102C]", lastWeek: "[\u1015\u103C\u102E\u1038\u1001\u1032\u1037\u101E\u1031\u102C] dddd LT [\u1019\u103E\u102C]", sameElse: "L" }, relativeTime: { future: "\u101C\u102C\u1019\u100A\u103A\u1037 %s \u1019\u103E\u102C", past: "\u101C\u103D\u1014\u103A\u1001\u1032\u1037\u101E\u1031\u102C %s \u1000", s: "\u1005\u1000\u1039\u1000\u1014\u103A.\u1021\u1014\u100A\u103A\u1038\u1004\u101A\u103A", ss: "%d \u1005\u1000\u1039\u1000\u1014\u1037\u103A", m: "\u1010\u1005\u103A\u1019\u102D\u1014\u1005\u103A", mm: "%d \u1019\u102D\u1014\u1005\u103A", h: "\u1010\u1005\u103A\u1014\u102C\u101B\u102E", hh: "%d \u1014\u102C\u101B\u102E", d: "\u1010\u1005\u103A\u101B\u1000\u103A", dd: "%d \u101B\u1000\u103A", M: "\u1010\u1005\u103A\u101C", MM: "%d \u101C", y: "\u1010\u1005\u103A\u1014\u103E\u1005\u103A", yy: "%d \u1014\u103E\u1005\u103A" }, preparse: function preparse(e) {return e.replace(/[\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040]/g, function (e) {return jn[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return bn[e];});}, week: { dow: 1, doy: 4 } }), l.defineLocale("nb", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"), monthsParseExact: !0, weekdays: "s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"), weekdaysShort: "s\xf8._ma._ti._on._to._fr._l\xf8.".split("_"), weekdaysMin: "s\xf8_ma_ti_on_to_fr_l\xf8".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] HH:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[i g\xe5r kl.] LT", lastWeek: "[forrige] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "noen sekunder", ss: "%d sekunder", m: "ett minutt", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dager", M: "en m\xe5ned", MM: "%d m\xe5neder", y: "ett \xe5r", yy: "%d \xe5r" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });var xn = { 1: "\u0967", 2: "\u0968", 3: "\u0969", 4: "\u096A", 5: "\u096B", 6: "\u096C", 7: "\u096D", 8: "\u096E", 9: "\u096F", 0: "\u0966" },On = { "\u0967": "1", "\u0968": "2", "\u0969": "3", "\u096A": "4", "\u096B": "5", "\u096C": "6", "\u096D": "7", "\u096E": "8", "\u096F": "9", "\u0966": "0" };l.defineLocale("ne", { months: "\u091C\u0928\u0935\u0930\u0940_\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u093F\u0932_\u092E\u0908_\u091C\u0941\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0937\u094D\u091F_\u0938\u0947\u092A\u094D\u091F\u0947\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u094B\u092C\u0930_\u0928\u094B\u092D\u0947\u092E\u094D\u092C\u0930_\u0921\u093F\u0938\u0947\u092E\u094D\u092C\u0930".split("_"), monthsShort: "\u091C\u0928._\u092B\u0947\u092C\u094D\u0930\u0941._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u093F._\u092E\u0908_\u091C\u0941\u0928_\u091C\u0941\u0932\u093E\u0908._\u0905\u0917._\u0938\u0947\u092A\u094D\u091F._\u0905\u0915\u094D\u091F\u094B._\u0928\u094B\u092D\u0947._\u0921\u093F\u0938\u0947.".split("_"), monthsParseExact: !0, weekdays: "\u0906\u0907\u0924\u092C\u093E\u0930_\u0938\u094B\u092E\u092C\u093E\u0930_\u092E\u0919\u094D\u0917\u0932\u092C\u093E\u0930_\u092C\u0941\u0927\u092C\u093E\u0930_\u092C\u093F\u0939\u093F\u092C\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930_\u0936\u0928\u093F\u092C\u093E\u0930".split("_"), weekdaysShort: "\u0906\u0907\u0924._\u0938\u094B\u092E._\u092E\u0919\u094D\u0917\u0932._\u092C\u0941\u0927._\u092C\u093F\u0939\u093F._\u0936\u0941\u0915\u094D\u0930._\u0936\u0928\u093F.".split("_"), weekdaysMin: "\u0906._\u0938\u094B._\u092E\u0902._\u092C\u0941._\u092C\u093F._\u0936\u0941._\u0936.".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "A\u0915\u094B h:mm \u092C\u091C\u0947", LTS: "A\u0915\u094B h:mm:ss \u092C\u091C\u0947", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947", LLLL: "dddd, D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947" }, preparse: function preparse(e) {return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function (e) {return On[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return xn[e];});}, meridiemParse: /\u0930\u093e\u0924\u093f|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u0938\u093e\u0901\u091d/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0930\u093E\u0924\u093F" === a ? e < 4 ? e : e + 12 : "\u092C\u093F\u0939\u093E\u0928" === a ? e : "\u0926\u093F\u0909\u0901\u0938\u094B" === a ? 10 <= e ? e : e + 12 : "\u0938\u093E\u0901\u091D" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 3 ? "\u0930\u093E\u0924\u093F" : e < 12 ? "\u092C\u093F\u0939\u093E\u0928" : e < 16 ? "\u0926\u093F\u0909\u0901\u0938\u094B" : e < 20 ? "\u0938\u093E\u0901\u091D" : "\u0930\u093E\u0924\u093F";}, calendar: { sameDay: "[\u0906\u091C] LT", nextDay: "[\u092D\u094B\u0932\u093F] LT", nextWeek: "[\u0906\u0909\u0901\u0926\u094B] dddd[,] LT", lastDay: "[\u0939\u093F\u091C\u094B] LT", lastWeek: "[\u0917\u090F\u0915\u094B] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%s\u092E\u093E", past: "%s \u0905\u0917\u093E\u0921\u093F", s: "\u0915\u0947\u0939\u0940 \u0915\u094D\u0937\u0923", ss: "%d \u0938\u0947\u0915\u0947\u0923\u094D\u0921", m: "\u090F\u0915 \u092E\u093F\u0928\u0947\u091F", mm: "%d \u092E\u093F\u0928\u0947\u091F", h: "\u090F\u0915 \u0918\u0923\u094D\u091F\u093E", hh: "%d \u0918\u0923\u094D\u091F\u093E", d: "\u090F\u0915 \u0926\u093F\u0928", dd: "%d \u0926\u093F\u0928", M: "\u090F\u0915 \u092E\u0939\u093F\u0928\u093E", MM: "%d \u092E\u0939\u093F\u0928\u093E", y: "\u090F\u0915 \u092C\u0930\u094D\u0937", yy: "%d \u092C\u0930\u094D\u0937" }, week: { dow: 0, doy: 6 } });var Pn = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),Wn = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),An = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],En = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;l.defineLocale("nl-be", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function monthsShort(e, a) {return e ? /-MMM-/.test(a) ? Wn[e.month()] : Pn[e.month()] : Pn;}, monthsRegex: En, monthsShortRegex: En, monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse: An, longMonthsParse: An, shortMonthsParse: An, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", ss: "%d seconden", m: "\xe9\xe9n minuut", mm: "%d minuten", h: "\xe9\xe9n uur", hh: "%d uur", d: "\xe9\xe9n dag", dd: "%d dagen", M: "\xe9\xe9n maand", MM: "%d maanden", y: "\xe9\xe9n jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function ordinal(e) {return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de");}, week: { dow: 1, doy: 4 } });var Fn = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),zn = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),Jn = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],Nn = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;l.defineLocale("nl", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function monthsShort(e, a) {return e ? /-MMM-/.test(a) ? zn[e.month()] : Fn[e.month()] : Fn;}, monthsRegex: Nn, monthsShortRegex: Nn, monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse: Jn, longMonthsParse: Jn, shortMonthsParse: Jn, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", ss: "%d seconden", m: "\xe9\xe9n minuut", mm: "%d minuten", h: "\xe9\xe9n uur", hh: "%d uur", d: "\xe9\xe9n dag", dd: "%d dagen", M: "\xe9\xe9n maand", MM: "%d maanden", y: "\xe9\xe9n jaar", yy: "%d jaar" }, dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/, ordinal: function ordinal(e) {return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de");}, week: { dow: 1, doy: 4 } }), l.defineLocale("nn", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays: "sundag_m\xe5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort: "sun_m\xe5n_tys_ons_tor_fre_lau".split("_"), weekdaysMin: "su_m\xe5_ty_on_to_fr_l\xf8".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[I dag klokka] LT", nextDay: "[I morgon klokka] LT", nextWeek: "dddd [klokka] LT", lastDay: "[I g\xe5r klokka] LT", lastWeek: "[F\xf8reg\xe5ande] dddd [klokka] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s sidan", s: "nokre sekund", ss: "%d sekund", m: "eit minutt", mm: "%d minutt", h: "ein time", hh: "%d timar", d: "ein dag", dd: "%d dagar", M: "ein m\xe5nad", MM: "%d m\xe5nader", y: "eit \xe5r", yy: "%d \xe5r" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });var Rn = { 1: "\u0A67", 2: "\u0A68", 3: "\u0A69", 4: "\u0A6A", 5: "\u0A6B", 6: "\u0A6C", 7: "\u0A6D", 8: "\u0A6E", 9: "\u0A6F", 0: "\u0A66" },Cn = { "\u0A67": "1", "\u0A68": "2", "\u0A69": "3", "\u0A6A": "4", "\u0A6B": "5", "\u0A6C": "6", "\u0A6D": "7", "\u0A6E": "8", "\u0A6F": "9", "\u0A66": "0" };l.defineLocale("pa-in", { months: "\u0A1C\u0A28\u0A35\u0A30\u0A40_\u0A2B\u0A3C\u0A30\u0A35\u0A30\u0A40_\u0A2E\u0A3E\u0A30\u0A1A_\u0A05\u0A2A\u0A4D\u0A30\u0A48\u0A32_\u0A2E\u0A08_\u0A1C\u0A42\u0A28_\u0A1C\u0A41\u0A32\u0A3E\u0A08_\u0A05\u0A17\u0A38\u0A24_\u0A38\u0A24\u0A70\u0A2C\u0A30_\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30_\u0A28\u0A35\u0A70\u0A2C\u0A30_\u0A26\u0A38\u0A70\u0A2C\u0A30".split("_"), monthsShort: "\u0A1C\u0A28\u0A35\u0A30\u0A40_\u0A2B\u0A3C\u0A30\u0A35\u0A30\u0A40_\u0A2E\u0A3E\u0A30\u0A1A_\u0A05\u0A2A\u0A4D\u0A30\u0A48\u0A32_\u0A2E\u0A08_\u0A1C\u0A42\u0A28_\u0A1C\u0A41\u0A32\u0A3E\u0A08_\u0A05\u0A17\u0A38\u0A24_\u0A38\u0A24\u0A70\u0A2C\u0A30_\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30_\u0A28\u0A35\u0A70\u0A2C\u0A30_\u0A26\u0A38\u0A70\u0A2C\u0A30".split("_"), weekdays: "\u0A10\u0A24\u0A35\u0A3E\u0A30_\u0A38\u0A4B\u0A2E\u0A35\u0A3E\u0A30_\u0A2E\u0A70\u0A17\u0A32\u0A35\u0A3E\u0A30_\u0A2C\u0A41\u0A27\u0A35\u0A3E\u0A30_\u0A35\u0A40\u0A30\u0A35\u0A3E\u0A30_\u0A38\u0A3C\u0A41\u0A71\u0A15\u0A30\u0A35\u0A3E\u0A30_\u0A38\u0A3C\u0A28\u0A40\u0A1A\u0A30\u0A35\u0A3E\u0A30".split("_"), weekdaysShort: "\u0A10\u0A24_\u0A38\u0A4B\u0A2E_\u0A2E\u0A70\u0A17\u0A32_\u0A2C\u0A41\u0A27_\u0A35\u0A40\u0A30_\u0A38\u0A3C\u0A41\u0A15\u0A30_\u0A38\u0A3C\u0A28\u0A40".split("_"), weekdaysMin: "\u0A10\u0A24_\u0A38\u0A4B\u0A2E_\u0A2E\u0A70\u0A17\u0A32_\u0A2C\u0A41\u0A27_\u0A35\u0A40\u0A30_\u0A38\u0A3C\u0A41\u0A15\u0A30_\u0A38\u0A3C\u0A28\u0A40".split("_"), longDateFormat: { LT: "A h:mm \u0A35\u0A1C\u0A47", LTS: "A h:mm:ss \u0A35\u0A1C\u0A47", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm \u0A35\u0A1C\u0A47", LLLL: "dddd, D MMMM YYYY, A h:mm \u0A35\u0A1C\u0A47" }, calendar: { sameDay: "[\u0A05\u0A1C] LT", nextDay: "[\u0A15\u0A32] LT", nextWeek: "[\u0A05\u0A17\u0A32\u0A3E] dddd, LT", lastDay: "[\u0A15\u0A32] LT", lastWeek: "[\u0A2A\u0A3F\u0A1B\u0A32\u0A47] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0A35\u0A3F\u0A71\u0A1A", past: "%s \u0A2A\u0A3F\u0A1B\u0A32\u0A47", s: "\u0A15\u0A41\u0A1D \u0A38\u0A15\u0A3F\u0A70\u0A1F", ss: "%d \u0A38\u0A15\u0A3F\u0A70\u0A1F", m: "\u0A07\u0A15 \u0A2E\u0A3F\u0A70\u0A1F", mm: "%d \u0A2E\u0A3F\u0A70\u0A1F", h: "\u0A07\u0A71\u0A15 \u0A18\u0A70\u0A1F\u0A3E", hh: "%d \u0A18\u0A70\u0A1F\u0A47", d: "\u0A07\u0A71\u0A15 \u0A26\u0A3F\u0A28", dd: "%d \u0A26\u0A3F\u0A28", M: "\u0A07\u0A71\u0A15 \u0A2E\u0A39\u0A40\u0A28\u0A3E", MM: "%d \u0A2E\u0A39\u0A40\u0A28\u0A47", y: "\u0A07\u0A71\u0A15 \u0A38\u0A3E\u0A32", yy: "%d \u0A38\u0A3E\u0A32" }, preparse: function preparse(e) {return e.replace(/[\u0a67\u0a68\u0a69\u0a6a\u0a6b\u0a6c\u0a6d\u0a6e\u0a6f\u0a66]/g, function (e) {return Cn[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return Rn[e];});}, meridiemParse: /\u0a30\u0a3e\u0a24|\u0a38\u0a35\u0a47\u0a30|\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30|\u0a38\u0a3c\u0a3e\u0a2e/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0A30\u0A3E\u0A24" === a ? e < 4 ? e : e + 12 : "\u0A38\u0A35\u0A47\u0A30" === a ? e : "\u0A26\u0A41\u0A2A\u0A39\u0A3F\u0A30" === a ? 10 <= e ? e : e + 12 : "\u0A38\u0A3C\u0A3E\u0A2E" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0A30\u0A3E\u0A24" : e < 10 ? "\u0A38\u0A35\u0A47\u0A30" : e < 17 ? "\u0A26\u0A41\u0A2A\u0A39\u0A3F\u0A30" : e < 20 ? "\u0A38\u0A3C\u0A3E\u0A2E" : "\u0A30\u0A3E\u0A24";}, week: { dow: 0, doy: 6 } });var In = "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017Adziernik_listopad_grudzie\u0144".split("_"),Un = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015Bnia_pa\u017Adziernika_listopada_grudnia".split("_");function Gn(e) {return e % 10 < 5 && 1 < e % 10 && ~~(e / 10) % 10 != 1;}function Vn(e, a, t) {var s = e + " ";switch (t) {case "ss":return s + (Gn(e) ? "sekundy" : "sekund");case "m":return a ? "minuta" : "minut\u0119";case "mm":return s + (Gn(e) ? "minuty" : "minut");case "h":return a ? "godzina" : "godzin\u0119";case "hh":return s + (Gn(e) ? "godziny" : "godzin");case "MM":return s + (Gn(e) ? "miesi\u0105ce" : "miesi\u0119cy");case "yy":return s + (Gn(e) ? "lata" : "lat");}}function Kn(e, a, t) {var s = " ";return (20 <= e % 100 || 100 <= e && e % 100 == 0) && (s = " de "), e + s + { ss: "secunde", mm: "minute", hh: "ore", dd: "zile", MM: "luni", yy: "ani" }[t];}function Zn(e, a, t) {var s, n;return "m" === t ? a ? "\u043C\u0438\u043D\u0443\u0442\u0430" : "\u043C\u0438\u043D\u0443\u0442\u0443" : e + " " + (s = +e, n = { ss: a ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u044B_\u0441\u0435\u043A\u0443\u043D\u0434", mm: a ? "\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442" : "\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442", hh: "\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432", dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439", MM: "\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432", yy: "\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442" }[t].split("_"), s % 10 == 1 && s % 100 != 11 ? n[0] : 2 <= s % 10 && s % 10 <= 4 && (s % 100 < 10 || 20 <= s % 100) ? n[1] : n[2]);}l.defineLocale("pl", { months: function months(e, a) {return e ? "" === a ? "(" + Un[e.month()] + "|" + In[e.month()] + ")" : /D MMMM/.test(a) ? Un[e.month()] : In[e.month()] : In;}, monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017A_lis_gru".split("_"), weekdays: "niedziela_poniedzia\u0142ek_wtorek_\u015Broda_czwartek_pi\u0105tek_sobota".split("_"), weekdaysShort: "ndz_pon_wt_\u015Br_czw_pt_sob".split("_"), weekdaysMin: "Nd_Pn_Wt_\u015Ar_Cz_Pt_So".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Dzi\u015B o] LT", nextDay: "[Jutro o] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[W niedziel\u0119 o] LT";case 2:return "[We wtorek o] LT";case 3:return "[W \u015Brod\u0119 o] LT";case 6:return "[W sobot\u0119 o] LT";default:return "[W] dddd [o] LT";}}, lastDay: "[Wczoraj o] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:return "[W zesz\u0142\u0105 niedziel\u0119 o] LT";case 3:return "[W zesz\u0142\u0105 \u015Brod\u0119 o] LT";case 6:return "[W zesz\u0142\u0105 sobot\u0119 o] LT";default:return "[W zesz\u0142y] dddd [o] LT";}}, sameElse: "L" }, relativeTime: { future: "za %s", past: "%s temu", s: "kilka sekund", ss: Vn, m: Vn, mm: Vn, h: Vn, hh: Vn, d: "1 dzie\u0144", dd: "%d dni", M: "miesi\u0105c", MM: Vn, y: "rok", yy: Vn }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("pt-br", { months: "Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays: "Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"), weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"), weekdaysMin: "Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [\xe0s] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [\xe0s] HH:mm" }, calendar: { sameDay: "[Hoje \xe0s] LT", nextDay: "[Amanh\xe3 \xe0s] LT", nextWeek: "dddd [\xe0s] LT", lastDay: "[Ontem \xe0s] LT", lastWeek: function lastWeek() {return 0 === this.day() || 6 === this.day() ? "[\xdaltimo] dddd [\xe0s] LT" : "[\xdaltima] dddd [\xe0s] LT";}, sameElse: "L" }, relativeTime: { future: "em %s", past: "h\xe1 %s", s: "poucos segundos", ss: "%d segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um m\xeas", MM: "%d meses", y: "um ano", yy: "%d anos" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba" }), l.defineLocale("pt", { months: "Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays: "Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"), weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"), weekdaysMin: "Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm" }, calendar: { sameDay: "[Hoje \xe0s] LT", nextDay: "[Amanh\xe3 \xe0s] LT", nextWeek: "dddd [\xe0s] LT", lastDay: "[Ontem \xe0s] LT", lastWeek: function lastWeek() {return 0 === this.day() || 6 === this.day() ? "[\xdaltimo] dddd [\xe0s] LT" : "[\xdaltima] dddd [\xe0s] LT";}, sameElse: "L" }, relativeTime: { future: "em %s", past: "h\xe1 %s", s: "segundos", ss: "%d segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um m\xeas", MM: "%d meses", y: "um ano", yy: "%d anos" }, dayOfMonthOrdinalParse: /\d{1,2}\xba/, ordinal: "%d\xba", week: { dow: 1, doy: 4 } }), l.defineLocale("ro", { months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"), monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"), monthsParseExact: !0, weekdays: "duminic\u0103_luni_mar\u021Bi_miercuri_joi_vineri_s\xE2mb\u0103t\u0103".split("_"), weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_S\xe2m".split("_"), weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_S\xe2".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[azi la] LT", nextDay: "[m\xe2ine la] LT", nextWeek: "dddd [la] LT", lastDay: "[ieri la] LT", lastWeek: "[fosta] dddd [la] LT", sameElse: "L" }, relativeTime: { future: "peste %s", past: "%s \xEEn urm\u0103", s: "c\xe2teva secunde", ss: Kn, m: "un minut", mm: Kn, h: "o or\u0103", hh: Kn, d: "o zi", dd: Kn, M: "o lun\u0103", MM: Kn, y: "un an", yy: Kn }, week: { dow: 1, doy: 7 } });var $n = [/^\u044f\u043d\u0432/i, /^\u0444\u0435\u0432/i, /^\u043c\u0430\u0440/i, /^\u0430\u043f\u0440/i, /^\u043c\u0430[\u0439\u044f]/i, /^\u0438\u044e\u043d/i, /^\u0438\u044e\u043b/i, /^\u0430\u0432\u0433/i, /^\u0441\u0435\u043d/i, /^\u043e\u043a\u0442/i, /^\u043d\u043e\u044f/i, /^\u0434\u0435\u043a/i];l.defineLocale("ru", { months: { format: "\u044F\u043D\u0432\u0430\u0440\u044F_\u0444\u0435\u0432\u0440\u0430\u043B\u044F_\u043C\u0430\u0440\u0442\u0430_\u0430\u043F\u0440\u0435\u043B\u044F_\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F_\u043E\u043A\u0442\u044F\u0431\u0440\u044F_\u043D\u043E\u044F\u0431\u0440\u044F_\u0434\u0435\u043A\u0430\u0431\u0440\u044F".split("_"), standalone: "\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C".split("_") }, monthsShort: { format: "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_"), standalone: "\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440\u0442_\u0430\u043F\u0440._\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.".split("_") }, weekdays: { standalone: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043E\u0442\u0430".split("_"), format: "\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043E\u0442\u0443".split("_"), isFormat: /\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e|\u044d\u0442\u0443)? ?\] ?dddd/ }, weekdaysShort: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"), weekdaysMin: "\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"), monthsParse: $n, longMonthsParse: $n, shortMonthsParse: $n, monthsRegex: /^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i, monthsShortRegex: /^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i, monthsStrictRegex: /^(\u044f\u043d\u0432\u0430\u0440[\u044f\u044c]|\u0444\u0435\u0432\u0440\u0430\u043b[\u044f\u044c]|\u043c\u0430\u0440\u0442\u0430?|\u0430\u043f\u0440\u0435\u043b[\u044f\u044c]|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044f\u044c]|\u0438\u044e\u043b[\u044f\u044c]|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043e\u043a\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043d\u043e\u044f\u0431\u0440[\u044f\u044c]|\u0434\u0435\u043a\u0430\u0431\u0440[\u044f\u044c])/i, monthsShortStrictRegex: /^(\u044f\u043d\u0432\.|\u0444\u0435\u0432\u0440?\.|\u043c\u0430\u0440[\u0442.]|\u0430\u043f\u0440\.|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044c\u044f.]|\u0438\u044e\u043b[\u044c\u044f.]|\u0430\u0432\u0433\.|\u0441\u0435\u043d\u0442?\.|\u043e\u043a\u0442\.|\u043d\u043e\u044f\u0431?\.|\u0434\u0435\u043a\.)/i, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY \u0433.", LLL: "D MMMM YYYY \u0433., H:mm", LLLL: "dddd, D MMMM YYYY \u0433., H:mm" }, calendar: { sameDay: "[\u0421\u0435\u0433\u043E\u0434\u043D\u044F, \u0432] LT", nextDay: "[\u0417\u0430\u0432\u0442\u0440\u0430, \u0432] LT", lastDay: "[\u0412\u0447\u0435\u0440\u0430, \u0432] LT", nextWeek: function nextWeek(e) {if (e.week() === this.week()) return 2 === this.day() ? "[\u0412\u043E] dddd, [\u0432] LT" : "[\u0412] dddd, [\u0432] LT";switch (this.day()) {case 0:return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435] dddd, [\u0432] LT";case 1:case 2:case 4:return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439] dddd, [\u0432] LT";case 3:case 5:case 6:return "[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E] dddd, [\u0432] LT";}}, lastWeek: function lastWeek(e) {if (e.week() === this.week()) return 2 === this.day() ? "[\u0412\u043E] dddd, [\u0432] LT" : "[\u0412] dddd, [\u0432] LT";switch (this.day()) {case 0:return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u043E\u0435] dddd, [\u0432] LT";case 1:case 2:case 4:return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u044B\u0439] dddd, [\u0432] LT";case 3:case 5:case 6:return "[\u0412 \u043F\u0440\u043E\u0448\u043B\u0443\u044E] dddd, [\u0432] LT";}}, sameElse: "L" }, relativeTime: { future: "\u0447\u0435\u0440\u0435\u0437 %s", past: "%s \u043D\u0430\u0437\u0430\u0434", s: "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434", ss: Zn, m: Zn, mm: Zn, h: "\u0447\u0430\u0441", hh: Zn, d: "\u0434\u0435\u043D\u044C", dd: Zn, M: "\u043C\u0435\u0441\u044F\u0446", MM: Zn, y: "\u0433\u043E\u0434", yy: Zn }, meridiemParse: /\u043d\u043e\u0447\u0438|\u0443\u0442\u0440\u0430|\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430/i, isPM: function isPM(e) {return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430)$/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u043D\u043E\u0447\u0438" : e < 12 ? "\u0443\u0442\u0440\u0430" : e < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u0435\u0440\u0430";}, dayOfMonthOrdinalParse: /\d{1,2}-(\u0439|\u0433\u043e|\u044f)/, ordinal: function ordinal(e, a) {switch (a) {case "M":case "d":case "DDD":return e + "-\u0439";case "D":return e + "-\u0433\u043E";case "w":case "W":return e + "-\u044F";default:return e;}}, week: { dow: 1, doy: 4 } });var Bn = ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u064A\u0628\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0626\u064A", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u0621\u0650", "\u0622\u06AF\u0633\u067D", "\u0633\u064A\u067E\u067D\u0645\u0628\u0631", "\u0622\u06AA\u067D\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u068A\u0633\u0645\u0628\u0631"],qn = ["\u0622\u0686\u0631", "\u0633\u0648\u0645\u0631", "\u0627\u06B1\u0627\u0631\u0648", "\u0627\u0631\u0628\u0639", "\u062E\u0645\u064A\u0633", "\u062C\u0645\u0639", "\u0687\u0646\u0687\u0631"];l.defineLocale("sd", { months: Bn, monthsShort: Bn, weekdays: qn, weekdaysShort: qn, weekdaysMin: qn, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd\u060C D MMMM YYYY HH:mm" }, meridiemParse: /\u0635\u0628\u062d|\u0634\u0627\u0645/, isPM: function isPM(e) {return "\u0634\u0627\u0645" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0635\u0628\u062D" : "\u0634\u0627\u0645";}, calendar: { sameDay: "[\u0627\u0684] LT", nextDay: "[\u0633\u0680\u0627\u06BB\u064A] LT", nextWeek: "dddd [\u0627\u06B3\u064A\u0646 \u0647\u0641\u062A\u064A \u062A\u064A] LT", lastDay: "[\u06AA\u0627\u0644\u0647\u0647] LT", lastWeek: "[\u06AF\u0632\u0631\u064A\u0644 \u0647\u0641\u062A\u064A] dddd [\u062A\u064A] LT", sameElse: "L" }, relativeTime: { future: "%s \u067E\u0648\u0621", past: "%s \u0627\u06B3", s: "\u0686\u0646\u062F \u0633\u064A\u06AA\u0646\u068A", ss: "%d \u0633\u064A\u06AA\u0646\u068A", m: "\u0647\u06AA \u0645\u0646\u067D", mm: "%d \u0645\u0646\u067D", h: "\u0647\u06AA \u06AA\u0644\u0627\u06AA", hh: "%d \u06AA\u0644\u0627\u06AA", d: "\u0647\u06AA \u068F\u064A\u0646\u0647\u0646", dd: "%d \u068F\u064A\u0646\u0647\u0646", M: "\u0647\u06AA \u0645\u0647\u064A\u0646\u0648", MM: "%d \u0645\u0647\u064A\u0646\u0627", y: "\u0647\u06AA \u0633\u0627\u0644", yy: "%d \u0633\u0627\u0644" }, preparse: function preparse(e) {return e.replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/,/g, "\u060C");}, week: { dow: 1, doy: 4 } }), l.defineLocale("se", { months: "o\u0111\u0111ajagem\xE1nnu_guovvam\xE1nnu_njuk\u010Dam\xE1nnu_cuo\u014Bom\xE1nnu_miessem\xE1nnu_geassem\xE1nnu_suoidnem\xE1nnu_borgem\xE1nnu_\u010Dak\u010Dam\xE1nnu_golggotm\xE1nnu_sk\xE1bmam\xE1nnu_juovlam\xE1nnu".split("_"), monthsShort: "o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010Dak\u010D_golg_sk\xE1b_juov".split("_"), weekdays: "sotnabeaivi_vuoss\xE1rga_ma\u014B\u014Beb\xE1rga_gaskavahkku_duorastat_bearjadat_l\xE1vvardat".split("_"), weekdaysShort: "sotn_vuos_ma\u014B_gask_duor_bear_l\xE1v".split("_"), weekdaysMin: "s_v_m_g_d_b_L".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "MMMM D. [b.] YYYY", LLL: "MMMM D. [b.] YYYY [ti.] HH:mm", LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm" }, calendar: { sameDay: "[otne ti] LT", nextDay: "[ihttin ti] LT", nextWeek: "dddd [ti] LT", lastDay: "[ikte ti] LT", lastWeek: "[ovddit] dddd [ti] LT", sameElse: "L" }, relativeTime: { future: "%s gea\u017Ees", past: "ma\u014Bit %s", s: "moadde sekunddat", ss: "%d sekunddat", m: "okta minuhta", mm: "%d minuhtat", h: "okta diimmu", hh: "%d diimmut", d: "okta beaivi", dd: "%d beaivvit", M: "okta m\xe1nnu", MM: "%d m\xe1nut", y: "okta jahki", yy: "%d jagit" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("si", { months: "\u0DA2\u0DB1\u0DC0\u0DCF\u0DBB\u0DD2_\u0DB4\u0DD9\u0DB6\u0DBB\u0DC0\u0DCF\u0DBB\u0DD2_\u0DB8\u0DCF\u0DBB\u0DCA\u0DAD\u0DD4_\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DDA\u0DBD\u0DCA_\u0DB8\u0DD0\u0DBA\u0DD2_\u0DA2\u0DD6\u0DB1\u0DD2_\u0DA2\u0DD6\u0DBD\u0DD2_\u0D85\u0D9C\u0DDD\u0DC3\u0DCA\u0DAD\u0DD4_\u0DC3\u0DD0\u0DB4\u0DCA\u0DAD\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA_\u0D94\u0D9A\u0DCA\u0DAD\u0DDD\u0DB6\u0DBB\u0DCA_\u0DB1\u0DDC\u0DC0\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA_\u0DAF\u0DD9\u0DC3\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA".split("_"), monthsShort: "\u0DA2\u0DB1_\u0DB4\u0DD9\u0DB6_\u0DB8\u0DCF\u0DBB\u0DCA_\u0D85\u0DB4\u0DCA_\u0DB8\u0DD0\u0DBA\u0DD2_\u0DA2\u0DD6\u0DB1\u0DD2_\u0DA2\u0DD6\u0DBD\u0DD2_\u0D85\u0D9C\u0DDD_\u0DC3\u0DD0\u0DB4\u0DCA_\u0D94\u0D9A\u0DCA_\u0DB1\u0DDC\u0DC0\u0DD0_\u0DAF\u0DD9\u0DC3\u0DD0".split("_"), weekdays: "\u0D89\u0DBB\u0DD2\u0DAF\u0DCF_\u0DC3\u0DB3\u0DD4\u0DAF\u0DCF_\u0D85\u0D9F\u0DC4\u0DBB\u0DD4\u0DC0\u0DCF\u0DAF\u0DCF_\u0DB6\u0DAF\u0DCF\u0DAF\u0DCF_\u0DB6\u0DCA\u200D\u0DBB\u0DC4\u0DC3\u0DCA\u0DB4\u0DAD\u0DD2\u0DB1\u0DCA\u0DAF\u0DCF_\u0DC3\u0DD2\u0D9A\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF_\u0DC3\u0DD9\u0DB1\u0DC3\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF".split("_"), weekdaysShort: "\u0D89\u0DBB\u0DD2_\u0DC3\u0DB3\u0DD4_\u0D85\u0D9F_\u0DB6\u0DAF\u0DCF_\u0DB6\u0DCA\u200D\u0DBB\u0DC4_\u0DC3\u0DD2\u0D9A\u0DD4_\u0DC3\u0DD9\u0DB1".split("_"), weekdaysMin: "\u0D89_\u0DC3_\u0D85_\u0DB6_\u0DB6\u0DCA\u200D\u0DBB_\u0DC3\u0DD2_\u0DC3\u0DD9".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "a h:mm", LTS: "a h:mm:ss", L: "YYYY/MM/DD", LL: "YYYY MMMM D", LLL: "YYYY MMMM D, a h:mm", LLLL: "YYYY MMMM D [\u0DC0\u0DD0\u0DB1\u0DD2] dddd, a h:mm:ss" }, calendar: { sameDay: "[\u0D85\u0DAF] LT[\u0DA7]", nextDay: "[\u0DC4\u0DD9\u0DA7] LT[\u0DA7]", nextWeek: "dddd LT[\u0DA7]", lastDay: "[\u0D8A\u0DBA\u0DDA] LT[\u0DA7]", lastWeek: "[\u0DB4\u0DC3\u0DD4\u0D9C\u0DD2\u0DBA] dddd LT[\u0DA7]", sameElse: "L" }, relativeTime: { future: "%s\u0D9A\u0DD2\u0DB1\u0DCA", past: "%s\u0D9A\u0DA7 \u0DB4\u0DD9\u0DBB", s: "\u0DAD\u0DAD\u0DCA\u0DB4\u0DBB \u0D9A\u0DD2\u0DC4\u0DD2\u0DB4\u0DBA", ss: "\u0DAD\u0DAD\u0DCA\u0DB4\u0DBB %d", m: "\u0DB8\u0DD2\u0DB1\u0DD2\u0DAD\u0DCA\u0DAD\u0DD4\u0DC0", mm: "\u0DB8\u0DD2\u0DB1\u0DD2\u0DAD\u0DCA\u0DAD\u0DD4 %d", h: "\u0DB4\u0DD0\u0DBA", hh: "\u0DB4\u0DD0\u0DBA %d", d: "\u0DAF\u0DD2\u0DB1\u0DBA", dd: "\u0DAF\u0DD2\u0DB1 %d", M: "\u0DB8\u0DCF\u0DC3\u0DBA", MM: "\u0DB8\u0DCF\u0DC3 %d", y: "\u0DC0\u0DC3\u0DBB", yy: "\u0DC0\u0DC3\u0DBB %d" }, dayOfMonthOrdinalParse: /\d{1,2} \u0dc0\u0dd0\u0db1\u0dd2/, ordinal: function ordinal(e) {return e + " \u0DC0\u0DD0\u0DB1\u0DD2";}, meridiemParse: /\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4|\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4|\u0db4\u0dd9.\u0dc0|\u0db4.\u0dc0./, isPM: function isPM(e) {return "\u0DB4.\u0DC0." === e || "\u0DB4\u0DC3\u0DCA \u0DC0\u0DBB\u0DD4" === e;}, meridiem: function meridiem(e, a, t) {return 11 < e ? t ? "\u0DB4.\u0DC0." : "\u0DB4\u0DC3\u0DCA \u0DC0\u0DBB\u0DD4" : t ? "\u0DB4\u0DD9.\u0DC0." : "\u0DB4\u0DD9\u0DBB \u0DC0\u0DBB\u0DD4";} });var Qn = "janu\xe1r_febru\xe1r_marec_apr\xedl_m\xe1j_j\xfan_j\xfal_august_september_okt\xf3ber_november_december".split("_"),Xn = "jan_feb_mar_apr_m\xe1j_j\xfan_j\xfal_aug_sep_okt_nov_dec".split("_");function ed(e) {return 1 < e && e < 5;}function ad(e, a, t, s) {var n = e + " ";switch (t) {case "s":return a || s ? "p\xe1r sek\xfand" : "p\xe1r sekundami";case "ss":return a || s ? n + (ed(e) ? "sekundy" : "sek\xfand") : n + "sekundami";break;case "m":return a ? "min\xfata" : s ? "min\xfatu" : "min\xfatou";case "mm":return a || s ? n + (ed(e) ? "min\xfaty" : "min\xfat") : n + "min\xfatami";break;case "h":return a ? "hodina" : s ? "hodinu" : "hodinou";case "hh":return a || s ? n + (ed(e) ? "hodiny" : "hod\xedn") : n + "hodinami";break;case "d":return a || s ? "de\u0148" : "d\u0148om";case "dd":return a || s ? n + (ed(e) ? "dni" : "dn\xed") : n + "d\u0148ami";break;case "M":return a || s ? "mesiac" : "mesiacom";case "MM":return a || s ? n + (ed(e) ? "mesiace" : "mesiacov") : n + "mesiacmi";break;case "y":return a || s ? "rok" : "rokom";case "yy":return a || s ? n + (ed(e) ? "roky" : "rokov") : n + "rokmi";break;}}function td(e, a, t, s) {var n = e + " ";switch (t) {case "s":return a || s ? "nekaj sekund" : "nekaj sekundami";case "ss":return n += 1 === e ? a ? "sekundo" : "sekundi" : 2 === e ? a || s ? "sekundi" : "sekundah" : e < 5 ? a || s ? "sekunde" : "sekundah" : "sekund";case "m":return a ? "ena minuta" : "eno minuto";case "mm":return n += 1 === e ? a ? "minuta" : "minuto" : 2 === e ? a || s ? "minuti" : "minutama" : e < 5 ? a || s ? "minute" : "minutami" : a || s ? "minut" : "minutami";case "h":return a ? "ena ura" : "eno uro";case "hh":return n += 1 === e ? a ? "ura" : "uro" : 2 === e ? a || s ? "uri" : "urama" : e < 5 ? a || s ? "ure" : "urami" : a || s ? "ur" : "urami";case "d":return a || s ? "en dan" : "enim dnem";case "dd":return n += 1 === e ? a || s ? "dan" : "dnem" : 2 === e ? a || s ? "dni" : "dnevoma" : a || s ? "dni" : "dnevi";case "M":return a || s ? "en mesec" : "enim mesecem";case "MM":return n += 1 === e ? a || s ? "mesec" : "mesecem" : 2 === e ? a || s ? "meseca" : "mesecema" : e < 5 ? a || s ? "mesece" : "meseci" : a || s ? "mesecev" : "meseci";case "y":return a || s ? "eno leto" : "enim letom";case "yy":return n += 1 === e ? a || s ? "leto" : "letom" : 2 === e ? a || s ? "leti" : "letoma" : e < 5 ? a || s ? "leta" : "leti" : a || s ? "let" : "leti";}}l.defineLocale("sk", { months: Qn, monthsShort: Xn, weekdays: "nede\u013Ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"), weekdaysShort: "ne_po_ut_st_\u0161t_pi_so".split("_"), weekdaysMin: "ne_po_ut_st_\u0161t_pi_so".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm" }, calendar: { sameDay: "[dnes o] LT", nextDay: "[zajtra o] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[v nede\u013Eu o] LT";case 1:case 2:return "[v] dddd [o] LT";case 3:return "[v stredu o] LT";case 4:return "[vo \u0161tvrtok o] LT";case 5:return "[v piatok o] LT";case 6:return "[v sobotu o] LT";}}, lastDay: "[v\u010Dera o] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:return "[minul\xFA nede\u013Eu o] LT";case 1:case 2:return "[minul\xfd] dddd [o] LT";case 3:return "[minul\xfa stredu o] LT";case 4:case 5:return "[minul\xfd] dddd [o] LT";case 6:return "[minul\xfa sobotu o] LT";}}, sameElse: "L" }, relativeTime: { future: "za %s", past: "pred %s", s: ad, ss: ad, m: ad, mm: ad, h: ad, hh: ad, d: ad, dd: ad, M: ad, MM: ad, y: ad, yy: ad }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("sl", { months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"), monthsParseExact: !0, weekdays: "nedelja_ponedeljek_torek_sreda_\u010Detrtek_petek_sobota".split("_"), weekdaysShort: "ned._pon._tor._sre._\u010Det._pet._sob.".split("_"), weekdaysMin: "ne_po_to_sr_\u010De_pe_so".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danes ob] LT", nextDay: "[jutri ob] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[v] [nedeljo] [ob] LT";case 3:return "[v] [sredo] [ob] LT";case 6:return "[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return "[v] dddd [ob] LT";}}, lastDay: "[v\u010Deraj ob] LT", lastWeek: function lastWeek() {switch (this.day()) {case 0:return "[prej\u0161njo] [nedeljo] [ob] LT";case 3:return "[prej\u0161njo] [sredo] [ob] LT";case 6:return "[prej\u0161njo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return "[prej\u0161nji] dddd [ob] LT";}}, sameElse: "L" }, relativeTime: { future: "\u010Dez %s", past: "pred %s", s: td, ss: td, m: td, mm: td, h: td, hh: td, d: td, dd: td, M: td, MM: td, y: td, yy: td }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } }), l.defineLocale("sq", { months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xebntor_Dhjetor".split("_"), monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xebn_Dhj".split("_"), weekdays: "E Diel_E H\xebn\xeb_E Mart\xeb_E M\xebrkur\xeb_E Enjte_E Premte_E Shtun\xeb".split("_"), weekdaysShort: "Die_H\xebn_Mar_M\xebr_Enj_Pre_Sht".split("_"), weekdaysMin: "D_H_Ma_M\xeb_E_P_Sh".split("_"), weekdaysParseExact: !0, meridiemParse: /PD|MD/, isPM: function isPM(e) {return "M" === e.charAt(0);}, meridiem: function meridiem(e, a, t) {return e < 12 ? "PD" : "MD";}, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Sot n\xeb] LT", nextDay: "[Nes\xebr n\xeb] LT", nextWeek: "dddd [n\xeb] LT", lastDay: "[Dje n\xeb] LT", lastWeek: "dddd [e kaluar n\xeb] LT", sameElse: "L" }, relativeTime: { future: "n\xeb %s", past: "%s m\xeb par\xeb", s: "disa sekonda", ss: "%d sekonda", m: "nj\xeb minut\xeb", mm: "%d minuta", h: "nj\xeb or\xeb", hh: "%d or\xeb", d: "nj\xeb dit\xeb", dd: "%d dit\xeb", M: "nj\xeb muaj", MM: "%d muaj", y: "nj\xeb vit", yy: "%d vite" }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });var sd = { words: { ss: ["\u0441\u0435\u043A\u0443\u043D\u0434\u0430", "\u0441\u0435\u043A\u0443\u043D\u0434\u0435", "\u0441\u0435\u043A\u0443\u043D\u0434\u0438"], m: ["\u0458\u0435\u0434\u0430\u043D \u043C\u0438\u043D\u0443\u0442", "\u0458\u0435\u0434\u043D\u0435 \u043C\u0438\u043D\u0443\u0442\u0435"], mm: ["\u043C\u0438\u043D\u0443\u0442", "\u043C\u0438\u043D\u0443\u0442\u0435", "\u043C\u0438\u043D\u0443\u0442\u0430"], h: ["\u0458\u0435\u0434\u0430\u043D \u0441\u0430\u0442", "\u0458\u0435\u0434\u043D\u043E\u0433 \u0441\u0430\u0442\u0430"], hh: ["\u0441\u0430\u0442", "\u0441\u0430\u0442\u0430", "\u0441\u0430\u0442\u0438"], dd: ["\u0434\u0430\u043D", "\u0434\u0430\u043D\u0430", "\u0434\u0430\u043D\u0430"], MM: ["\u043C\u0435\u0441\u0435\u0446", "\u043C\u0435\u0441\u0435\u0446\u0430", "\u043C\u0435\u0441\u0435\u0446\u0438"], yy: ["\u0433\u043E\u0434\u0438\u043D\u0430", "\u0433\u043E\u0434\u0438\u043D\u0435", "\u0433\u043E\u0434\u0438\u043D\u0430"] }, correctGrammaticalCase: function correctGrammaticalCase(e, a) {return 1 === e ? a[0] : 2 <= e && e <= 4 ? a[1] : a[2];}, translate: function translate(e, a, t) {var s = sd.words[t];return 1 === t.length ? a ? s[0] : s[1] : e + " " + sd.correctGrammaticalCase(e, s);} };l.defineLocale("sr-cyrl", { months: "\u0458\u0430\u043D\u0443\u0430\u0440_\u0444\u0435\u0431\u0440\u0443\u0430\u0440_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0438\u043B_\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440_\u043E\u043A\u0442\u043E\u0431\u0430\u0440_\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440_\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440".split("_"), monthsShort: "\u0458\u0430\u043D._\u0444\u0435\u0431._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u0458_\u0458\u0443\u043D_\u0458\u0443\u043B_\u0430\u0432\u0433._\u0441\u0435\u043F._\u043E\u043A\u0442._\u043D\u043E\u0432._\u0434\u0435\u0446.".split("_"), monthsParseExact: !0, weekdays: "\u043D\u0435\u0434\u0435\u0459\u0430_\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A_\u0443\u0442\u043E\u0440\u0430\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A_\u043F\u0435\u0442\u0430\u043A_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"), weekdaysShort: "\u043D\u0435\u0434._\u043F\u043E\u043D._\u0443\u0442\u043E._\u0441\u0440\u0435._\u0447\u0435\u0442._\u043F\u0435\u0442._\u0441\u0443\u0431.".split("_"), weekdaysMin: "\u043D\u0435_\u043F\u043E_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043F\u0435_\u0441\u0443".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[\u0434\u0430\u043D\u0430\u0441 \u0443] LT", nextDay: "[\u0441\u0443\u0442\u0440\u0430 \u0443] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[\u0443] [\u043D\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";case 3:return "[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";case 6:return "[\u0443] [\u0441\u0443\u0431\u043E\u0442\u0443] [\u0443] LT";case 1:case 2:case 4:case 5:return "[\u0443] dddd [\u0443] LT";}}, lastDay: "[\u0458\u0443\u0447\u0435 \u0443] LT", lastWeek: function lastWeek() {return ["[\u043F\u0440\u043E\u0448\u043B\u0435] [\u043D\u0435\u0434\u0435\u0459\u0435] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u0443\u0442\u043E\u0440\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u043F\u0435\u0442\u043A\u0430] [\u0443] LT", "[\u043F\u0440\u043E\u0448\u043B\u0435] [\u0441\u0443\u0431\u043E\u0442\u0435] [\u0443] LT"][this.day()];}, sameElse: "L" }, relativeTime: { future: "\u0437\u0430 %s", past: "\u043F\u0440\u0435 %s", s: "\u043D\u0435\u043A\u043E\u043B\u0438\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438", ss: sd.translate, m: sd.translate, mm: sd.translate, h: sd.translate, hh: sd.translate, d: "\u0434\u0430\u043D", dd: sd.translate, M: "\u043C\u0435\u0441\u0435\u0446", MM: sd.translate, y: "\u0433\u043E\u0434\u0438\u043D\u0443", yy: sd.translate }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });var nd = { words: { ss: ["sekunda", "sekunde", "sekundi"], m: ["jedan minut", "jedne minute"], mm: ["minut", "minute", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], dd: ["dan", "dana", "dana"], MM: ["mesec", "meseca", "meseci"], yy: ["godina", "godine", "godina"] }, correctGrammaticalCase: function correctGrammaticalCase(e, a) {return 1 === e ? a[0] : 2 <= e && e <= 4 ? a[1] : a[2];}, translate: function translate(e, a, t) {var s = nd.words[t];return 1 === t.length ? a ? s[0] : s[1] : e + " " + nd.correctGrammaticalCase(e, s);} };l.defineLocale("sr", { months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), monthsParseExact: !0, weekdays: "nedelja_ponedeljak_utorak_sreda_\u010Detvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sre._\u010Det._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_\u010De_pe_su".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[danas u] LT", nextDay: "[sutra u] LT", nextWeek: function nextWeek() {switch (this.day()) {case 0:return "[u] [nedelju] [u] LT";case 3:return "[u] [sredu] [u] LT";case 6:return "[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return "[u] dddd [u] LT";}}, lastDay: "[ju\u010De u] LT", lastWeek: function lastWeek() {return ["[pro\u0161le] [nedelje] [u] LT", "[pro\u0161log] [ponedeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srede] [u] LT", "[pro\u0161log] [\u010Detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"][this.day()];}, sameElse: "L" }, relativeTime: { future: "za %s", past: "pre %s", s: "nekoliko sekundi", ss: nd.translate, m: nd.translate, mm: nd.translate, h: nd.translate, hh: nd.translate, d: "dan", dd: nd.translate, M: "mesec", MM: nd.translate, y: "godinu", yy: nd.translate }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } }), l.defineLocale("ss", { months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"), monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"), weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"), weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"), weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[Namuhla nga] LT", nextDay: "[Kusasa nga] LT", nextWeek: "dddd [nga] LT", lastDay: "[Itolo nga] LT", lastWeek: "dddd [leliphelile] [nga] LT", sameElse: "L" }, relativeTime: { future: "nga %s", past: "wenteka nga %s", s: "emizuzwana lomcane", ss: "%d mzuzwana", m: "umzuzu", mm: "%d emizuzu", h: "lihora", hh: "%d emahora", d: "lilanga", dd: "%d emalanga", M: "inyanga", MM: "%d tinyanga", y: "umnyaka", yy: "%d iminyaka" }, meridiemParse: /ekuseni|emini|entsambama|ebusuku/, meridiem: function meridiem(e, a, t) {return e < 11 ? "ekuseni" : e < 15 ? "emini" : e < 19 ? "entsambama" : "ebusuku";}, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "ekuseni" === a ? e : "emini" === a ? 11 <= e ? e : e + 12 : "entsambama" === a || "ebusuku" === a ? 0 === e ? 0 : e + 12 : void 0;}, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: "%d", week: { dow: 1, doy: 4 } }), l.defineLocale("sv", { months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays: "s\xf6ndag_m\xe5ndag_tisdag_onsdag_torsdag_fredag_l\xf6rdag".split("_"), weekdaysShort: "s\xf6n_m\xe5n_tis_ons_tor_fre_l\xf6r".split("_"), weekdaysMin: "s\xf6_m\xe5_ti_on_to_fr_l\xf6".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [kl.] HH:mm", LLLL: "dddd D MMMM YYYY [kl.] HH:mm", lll: "D MMM YYYY HH:mm", llll: "ddd D MMM YYYY HH:mm" }, calendar: { sameDay: "[Idag] LT", nextDay: "[Imorgon] LT", lastDay: "[Ig\xe5r] LT", nextWeek: "[P\xe5] dddd LT", lastWeek: "[I] dddd[s] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "f\xf6r %s sedan", s: "n\xe5gra sekunder", ss: "%d sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en m\xe5nad", MM: "%d m\xe5nader", y: "ett \xe5r", yy: "%d \xe5r" }, dayOfMonthOrdinalParse: /\d{1,2}(e|a)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "e" : 1 === a ? "a" : 2 === a ? "a" : "e");}, week: { dow: 1, doy: 4 } }), l.defineLocale("sw", { months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"), weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"), weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"), weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[leo saa] LT", nextDay: "[kesho saa] LT", nextWeek: "[wiki ijayo] dddd [saat] LT", lastDay: "[jana] LT", lastWeek: "[wiki iliyopita] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s baadaye", past: "tokea %s", s: "hivi punde", ss: "sekunde %d", m: "dakika moja", mm: "dakika %d", h: "saa limoja", hh: "masaa %d", d: "siku moja", dd: "masiku %d", M: "mwezi mmoja", MM: "miezi %d", y: "mwaka mmoja", yy: "miaka %d" }, week: { dow: 1, doy: 7 } });var dd = { 1: "\u0BE7", 2: "\u0BE8", 3: "\u0BE9", 4: "\u0BEA", 5: "\u0BEB", 6: "\u0BEC", 7: "\u0BED", 8: "\u0BEE", 9: "\u0BEF", 0: "\u0BE6" },rd = { "\u0BE7": "1", "\u0BE8": "2", "\u0BE9": "3", "\u0BEA": "4", "\u0BEB": "5", "\u0BEC": "6", "\u0BED": "7", "\u0BEE": "8", "\u0BEF": "9", "\u0BE6": "0" };l.defineLocale("ta", { months: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF_\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF_\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD_\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD_\u0BAE\u0BC7_\u0B9C\u0BC2\u0BA9\u0BCD_\u0B9C\u0BC2\u0BB2\u0BC8_\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD_\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD_\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD".split("_"), monthsShort: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF_\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF_\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD_\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD_\u0BAE\u0BC7_\u0B9C\u0BC2\u0BA9\u0BCD_\u0B9C\u0BC2\u0BB2\u0BC8_\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD_\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD_\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD_\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD".split("_"), weekdays: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8_\u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8".split("_"), weekdaysShort: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1_\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD_\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD_\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD_\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD_\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF_\u0B9A\u0BA9\u0BBF".split("_"), weekdaysMin: "\u0B9E\u0BBE_\u0BA4\u0BBF_\u0B9A\u0BC6_\u0BAA\u0BC1_\u0BB5\u0BBF_\u0BB5\u0BC6_\u0B9A".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, HH:mm", LLLL: "dddd, D MMMM YYYY, HH:mm" }, calendar: { sameDay: "[\u0B87\u0BA9\u0BCD\u0BB1\u0BC1] LT", nextDay: "[\u0BA8\u0BBE\u0BB3\u0BC8] LT", nextWeek: "dddd, LT", lastDay: "[\u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1] LT", lastWeek: "[\u0B95\u0B9F\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0BB0\u0BAE\u0BCD] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0B87\u0BB2\u0BCD", past: "%s \u0BAE\u0BC1\u0BA9\u0BCD", s: "\u0B92\u0BB0\u0BC1 \u0B9A\u0BBF\u0BB2 \u0BB5\u0BBF\u0BA8\u0BBE\u0B9F\u0BBF\u0B95\u0BB3\u0BCD", ss: "%d \u0BB5\u0BBF\u0BA8\u0BBE\u0B9F\u0BBF\u0B95\u0BB3\u0BCD", m: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0BAE\u0BCD", mm: "%d \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD", h: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", hh: "%d \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", d: "\u0B92\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BCD", dd: "%d \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD", M: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", MM: "%d \u0BAE\u0BBE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BCD", y: "\u0B92\u0BB0\u0BC1 \u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD", yy: "%d \u0B86\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD" }, dayOfMonthOrdinalParse: /\d{1,2}\u0bb5\u0ba4\u0bc1/, ordinal: function ordinal(e) {return e + "\u0BB5\u0BA4\u0BC1";}, preparse: function preparse(e) {return e.replace(/[\u0be7\u0be8\u0be9\u0bea\u0beb\u0bec\u0bed\u0bee\u0bef\u0be6]/g, function (e) {return rd[e];});}, postformat: function postformat(e) {return e.replace(/\d/g, function (e) {return dd[e];});}, meridiemParse: /\u0baf\u0bbe\u0bae\u0bae\u0bcd|\u0bb5\u0bc8\u0b95\u0bb1\u0bc8|\u0b95\u0bbe\u0bb2\u0bc8|\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd|\u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1|\u0bae\u0bbe\u0bb2\u0bc8/, meridiem: function meridiem(e, a, t) {return e < 2 ? " \u0BAF\u0BBE\u0BAE\u0BAE\u0BCD" : e < 6 ? " \u0BB5\u0BC8\u0B95\u0BB1\u0BC8" : e < 10 ? " \u0B95\u0BBE\u0BB2\u0BC8" : e < 14 ? " \u0BA8\u0BA3\u0BCD\u0BAA\u0B95\u0BB2\u0BCD" : e < 18 ? " \u0B8E\u0BB1\u0BCD\u0BAA\u0BBE\u0B9F\u0BC1" : e < 22 ? " \u0BAE\u0BBE\u0BB2\u0BC8" : " \u0BAF\u0BBE\u0BAE\u0BAE\u0BCD";}, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0BAF\u0BBE\u0BAE\u0BAE\u0BCD" === a ? e < 2 ? e : e + 12 : "\u0BB5\u0BC8\u0B95\u0BB1\u0BC8" === a || "\u0B95\u0BBE\u0BB2\u0BC8" === a ? e : "\u0BA8\u0BA3\u0BCD\u0BAA\u0B95\u0BB2\u0BCD" === a && 10 <= e ? e : e + 12;}, week: { dow: 0, doy: 6 } }), l.defineLocale("te", { months: "\u0C1C\u0C28\u0C35\u0C30\u0C3F_\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F_\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F_\u0C0F\u0C2A\u0C4D\u0C30\u0C3F\u0C32\u0C4D_\u0C2E\u0C47_\u0C1C\u0C42\u0C28\u0C4D_\u0C1C\u0C41\u0C32\u0C48_\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41_\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C4D_\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C4D_\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C4D_\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C4D".split("_"), monthsShort: "\u0C1C\u0C28._\u0C2B\u0C3F\u0C2C\u0C4D\u0C30._\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F_\u0C0F\u0C2A\u0C4D\u0C30\u0C3F._\u0C2E\u0C47_\u0C1C\u0C42\u0C28\u0C4D_\u0C1C\u0C41\u0C32\u0C48_\u0C06\u0C17._\u0C38\u0C46\u0C2A\u0C4D._\u0C05\u0C15\u0C4D\u0C1F\u0C4B._\u0C28\u0C35._\u0C21\u0C3F\u0C38\u0C46.".split("_"), monthsParseExact: !0, weekdays: "\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02_\u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C02_\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02_\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02_\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02_\u0C36\u0C41\u0C15\u0C4D\u0C30\u0C35\u0C3E\u0C30\u0C02_\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02".split("_"), weekdaysShort: "\u0C06\u0C26\u0C3F_\u0C38\u0C4B\u0C2E_\u0C2E\u0C02\u0C17\u0C33_\u0C2C\u0C41\u0C27_\u0C17\u0C41\u0C30\u0C41_\u0C36\u0C41\u0C15\u0C4D\u0C30_\u0C36\u0C28\u0C3F".split("_"), weekdaysMin: "\u0C06_\u0C38\u0C4B_\u0C2E\u0C02_\u0C2C\u0C41_\u0C17\u0C41_\u0C36\u0C41_\u0C36".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[\u0C28\u0C47\u0C21\u0C41] LT", nextDay: "[\u0C30\u0C47\u0C2A\u0C41] LT", nextWeek: "dddd, LT", lastDay: "[\u0C28\u0C3F\u0C28\u0C4D\u0C28] LT", lastWeek: "[\u0C17\u0C24] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s \u0C32\u0C4B", past: "%s \u0C15\u0C4D\u0C30\u0C3F\u0C24\u0C02", s: "\u0C15\u0C4A\u0C28\u0C4D\u0C28\u0C3F \u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C41", ss: "%d \u0C38\u0C46\u0C15\u0C28\u0C4D\u0C32\u0C41", m: "\u0C12\u0C15 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C02", mm: "%d \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C3E\u0C32\u0C41", h: "\u0C12\u0C15 \u0C17\u0C02\u0C1F", hh: "%d \u0C17\u0C02\u0C1F\u0C32\u0C41", d: "\u0C12\u0C15 \u0C30\u0C4B\u0C1C\u0C41", dd: "%d \u0C30\u0C4B\u0C1C\u0C41\u0C32\u0C41", M: "\u0C12\u0C15 \u0C28\u0C46\u0C32", MM: "%d \u0C28\u0C46\u0C32\u0C32\u0C41", y: "\u0C12\u0C15 \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C02", yy: "%d \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C3E\u0C32\u0C41" }, dayOfMonthOrdinalParse: /\d{1,2}\u0c35/, ordinal: "%d\u0C35", meridiemParse: /\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f|\u0c09\u0c26\u0c2f\u0c02|\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02|\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F" === a ? e < 4 ? e : e + 12 : "\u0C09\u0C26\u0C2F\u0C02" === a ? e : "\u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02" === a ? 10 <= e ? e : e + 12 : "\u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F" : e < 10 ? "\u0C09\u0C26\u0C2F\u0C02" : e < 17 ? "\u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02" : e < 20 ? "\u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02" : "\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F";}, week: { dow: 0, doy: 6 } }), l.defineLocale("tet", { months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju\xf1u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"), weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"), weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Ohin iha] LT", nextDay: "[Aban iha] LT", nextWeek: "dddd [iha] LT", lastDay: "[Horiseik iha] LT", lastWeek: "dddd [semana kotuk] [iha] LT", sameElse: "L" }, relativeTime: { future: "iha %s", past: "%s liuba", s: "minutu balun", ss: "minutu %d", m: "minutu ida", mm: "minutu %d", h: "oras ida", hh: "oras %d", d: "loron ida", dd: "loron %d", M: "fulan ida", MM: "fulan %d", y: "tinan ida", yy: "tinan %d" }, dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } });var _d = { 0: "-\u0443\u043C", 1: "-\u0443\u043C", 2: "-\u044E\u043C", 3: "-\u044E\u043C", 4: "-\u0443\u043C", 5: "-\u0443\u043C", 6: "-\u0443\u043C", 7: "-\u0443\u043C", 8: "-\u0443\u043C", 9: "-\u0443\u043C", 10: "-\u0443\u043C", 12: "-\u0443\u043C", 13: "-\u0443\u043C", 20: "-\u0443\u043C", 30: "-\u044E\u043C", 40: "-\u0443\u043C", 50: "-\u0443\u043C", 60: "-\u0443\u043C", 70: "-\u0443\u043C", 80: "-\u0443\u043C", 90: "-\u0443\u043C", 100: "-\u0443\u043C" };l.defineLocale("tg", { months: "\u044F\u043D\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043B_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440_\u043E\u043A\u0442\u044F\u0431\u0440_\u043D\u043E\u044F\u0431\u0440_\u0434\u0435\u043A\u0430\u0431\u0440".split("_"), monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"), weekdays: "\u044F\u043A\u0448\u0430\u043D\u0431\u0435_\u0434\u0443\u0448\u0430\u043D\u0431\u0435_\u0441\u0435\u0448\u0430\u043D\u0431\u0435_\u0447\u043E\u0440\u0448\u0430\u043D\u0431\u0435_\u043F\u0430\u043D\u04B7\u0448\u0430\u043D\u0431\u0435_\u04B7\u0443\u043C\u044A\u0430_\u0448\u0430\u043D\u0431\u0435".split("_"), weekdaysShort: "\u044F\u0448\u0431_\u0434\u0448\u0431_\u0441\u0448\u0431_\u0447\u0448\u0431_\u043F\u0448\u0431_\u04B7\u0443\u043C_\u0448\u043D\u0431".split("_"), weekdaysMin: "\u044F\u0448_\u0434\u0448_\u0441\u0448_\u0447\u0448_\u043F\u0448_\u04B7\u043C_\u0448\u0431".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u0418\u043C\u0440\u04EF\u0437 \u0441\u043E\u0430\u0442\u0438] LT", nextDay: "[\u041F\u0430\u0433\u043E\u04B3 \u0441\u043E\u0430\u0442\u0438] LT", lastDay: "[\u0414\u0438\u0440\u04EF\u0437 \u0441\u043E\u0430\u0442\u0438] LT", nextWeek: "dddd[\u0438] [\u04B3\u0430\u0444\u0442\u0430\u0438 \u043E\u044F\u043D\u0434\u0430 \u0441\u043E\u0430\u0442\u0438] LT", lastWeek: "dddd[\u0438] [\u04B3\u0430\u0444\u0442\u0430\u0438 \u0433\u0443\u0437\u0430\u0448\u0442\u0430 \u0441\u043E\u0430\u0442\u0438] LT", sameElse: "L" }, relativeTime: { future: "\u0431\u0430\u044A\u0434\u0438 %s", past: "%s \u043F\u0435\u0448", s: "\u044F\u043A\u0447\u0430\u043D\u0434 \u0441\u043E\u043D\u0438\u044F", m: "\u044F\u043A \u0434\u0430\u049B\u0438\u049B\u0430", mm: "%d \u0434\u0430\u049B\u0438\u049B\u0430", h: "\u044F\u043A \u0441\u043E\u0430\u0442", hh: "%d \u0441\u043E\u0430\u0442", d: "\u044F\u043A \u0440\u04EF\u0437", dd: "%d \u0440\u04EF\u0437", M: "\u044F\u043A \u043C\u043E\u04B3", MM: "%d \u043C\u043E\u04B3", y: "\u044F\u043A \u0441\u043E\u043B", yy: "%d \u0441\u043E\u043B" }, meridiemParse: /\u0448\u0430\u0431|\u0441\u0443\u0431\u04b3|\u0440\u04ef\u0437|\u0431\u0435\u0433\u043e\u04b3/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u0448\u0430\u0431" === a ? e < 4 ? e : e + 12 : "\u0441\u0443\u0431\u04B3" === a ? e : "\u0440\u04EF\u0437" === a ? 11 <= e ? e : e + 12 : "\u0431\u0435\u0433\u043E\u04B3" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u0448\u0430\u0431" : e < 11 ? "\u0441\u0443\u0431\u04B3" : e < 16 ? "\u0440\u04EF\u0437" : e < 19 ? "\u0431\u0435\u0433\u043E\u04B3" : "\u0448\u0430\u0431";}, dayOfMonthOrdinalParse: /\d{1,2}-(\u0443\u043c|\u044e\u043c)/, ordinal: function ordinal(e) {return e + (_d[e] || _d[e % 10] || _d[100 <= e ? 100 : null]);}, week: { dow: 1, doy: 7 } }), l.defineLocale("th", { months: "\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21_\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C_\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21_\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19_\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21_\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19_\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21_\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21_\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19_\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21_\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19_\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21".split("_"), monthsShort: "\u0E21.\u0E04._\u0E01.\u0E1E._\u0E21\u0E35.\u0E04._\u0E40\u0E21.\u0E22._\u0E1E.\u0E04._\u0E21\u0E34.\u0E22._\u0E01.\u0E04._\u0E2A.\u0E04._\u0E01.\u0E22._\u0E15.\u0E04._\u0E1E.\u0E22._\u0E18.\u0E04.".split("_"), monthsParseExact: !0, weekdays: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"), weekdaysShort: "\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C".split("_"), weekdaysMin: "\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm", LLLL: "\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm" }, meridiemParse: /\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07|\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07/, isPM: function isPM(e) {return "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07" : "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07";}, calendar: { sameDay: "[\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT", nextDay: "[\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT", nextWeek: "dddd[\u0E2B\u0E19\u0E49\u0E32 \u0E40\u0E27\u0E25\u0E32] LT", lastDay: "[\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT", lastWeek: "[\u0E27\u0E31\u0E19]dddd[\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E27\u0E25\u0E32] LT", sameElse: "L" }, relativeTime: { future: "\u0E2D\u0E35\u0E01 %s", past: "%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27", s: "\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35", ss: "%d \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35", m: "1 \u0E19\u0E32\u0E17\u0E35", mm: "%d \u0E19\u0E32\u0E17\u0E35", h: "1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07", hh: "%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07", d: "1 \u0E27\u0E31\u0E19", dd: "%d \u0E27\u0E31\u0E19", M: "1 \u0E40\u0E14\u0E37\u0E2D\u0E19", MM: "%d \u0E40\u0E14\u0E37\u0E2D\u0E19", y: "1 \u0E1B\u0E35", yy: "%d \u0E1B\u0E35" } }), l.defineLocale("tl-ph", { months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, calendar: { sameDay: "LT [ngayong araw]", nextDay: "[Bukas ng] LT", nextWeek: "LT [sa susunod na] dddd", lastDay: "LT [kahapon]", lastWeek: "LT [noong nakaraang] dddd", sameElse: "L" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", ss: "%d segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: function ordinal(e) {return e;}, week: { dow: 1, doy: 4 } });var id = "pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");function od(e, a, t, s) {var n = function (e) {var a = Math.floor(e % 1e3 / 100),t = Math.floor(e % 100 / 10),s = e % 10,n = "";0 < a && (n += id[a] + "vatlh");0 < t && (n += ("" !== n ? " " : "") + id[t] + "maH");0 < s && (n += ("" !== n ? " " : "") + id[s]);return "" === n ? "pagh" : n;}(e);switch (t) {case "ss":return n + " lup";case "mm":return n + " tup";case "hh":return n + " rep";case "dd":return n + " jaj";case "MM":return n + " jar";case "yy":return n + " DIS";}}l.defineLocale("tlh", { months: "tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019".split("_"), monthsShort: "jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019".split("_"), monthsParseExact: !0, weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[DaHjaj] LT", nextDay: "[wa\u2019leS] LT", nextWeek: "LLL", lastDay: "[wa\u2019Hu\u2019] LT", lastWeek: "LLL", sameElse: "L" }, relativeTime: { future: function future(e) {var a = e;return a = -1 !== e.indexOf("jaj") ? a.slice(0, -3) + "leS" : -1 !== e.indexOf("jar") ? a.slice(0, -3) + "waQ" : -1 !== e.indexOf("DIS") ? a.slice(0, -3) + "nem" : a + " pIq";}, past: function past(e) {var a = e;return a = -1 !== e.indexOf("jaj") ? a.slice(0, -3) + "Hu\u2019" : -1 !== e.indexOf("jar") ? a.slice(0, -3) + "wen" : -1 !== e.indexOf("DIS") ? a.slice(0, -3) + "ben" : a + " ret";}, s: "puS lup", ss: od, m: "wa\u2019 tup", mm: od, h: "wa\u2019 rep", hh: od, d: "wa\u2019 jaj", dd: od, M: "wa\u2019 jar", MM: od, y: "wa\u2019 DIS", yy: od }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });var md = { 1: "'inci", 5: "'inci", 8: "'inci", 70: "'inci", 80: "'inci", 2: "'nci", 7: "'nci", 20: "'nci", 50: "'nci", 3: "'\xfcnc\xfc", 4: "'\xfcnc\xfc", 100: "'\xfcnc\xfc", 6: "'nc\u0131", 9: "'uncu", 10: "'uncu", 30: "'uncu", 60: "'\u0131nc\u0131", 90: "'\u0131nc\u0131" };function ud(e, a, t, s) {var n = { s: ["viensas secunds", "'iensas secunds"], ss: [e + " secunds", e + " secunds"], m: ["'n m\xedut", "'iens m\xedut"], mm: [e + " m\xeduts", e + " m\xeduts"], h: ["'n \xfeora", "'iensa \xfeora"], hh: [e + " \xfeoras", e + " \xfeoras"], d: ["'n ziua", "'iensa ziua"], dd: [e + " ziuas", e + " ziuas"], M: ["'n mes", "'iens mes"], MM: [e + " mesen", e + " mesen"], y: ["'n ar", "'iens ar"], yy: [e + " ars", e + " ars"] };return s ? n[t][0] : a ? n[t][0] : n[t][1];}function ld(e, a, t) {var s, n;return "m" === t ? a ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443" : "h" === t ? a ? "\u0433\u043E\u0434\u0438\u043D\u0430" : "\u0433\u043E\u0434\u0438\u043D\u0443" : e + " " + (s = +e, n = { ss: a ? "\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434" : "\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434", mm: a ? "\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D" : "\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D", hh: a ? "\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D" : "\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D", dd: "\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432", MM: "\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432", yy: "\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432" }[t].split("_"), s % 10 == 1 && s % 100 != 11 ? n[0] : 2 <= s % 10 && s % 10 <= 4 && (s % 100 < 10 || 20 <= s % 100) ? n[1] : n[2]);}function Md(e) {return function () {return e + "\u043E" + (11 === this.hours() ? "\u0431" : "") + "] LT";};}l.defineLocale("tr", { months: "Ocak_\u015Eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011Fustos_Eyl\xFCl_Ekim_Kas\u0131m_Aral\u0131k".split("_"), monthsShort: "Oca_\u015Eub_Mar_Nis_May_Haz_Tem_A\u011Fu_Eyl_Eki_Kas_Ara".split("_"), weekdays: "Pazar_Pazartesi_Sal\u0131_\xC7ar\u015Famba_Per\u015Fembe_Cuma_Cumartesi".split("_"), weekdaysShort: "Paz_Pts_Sal_\xc7ar_Per_Cum_Cts".split("_"), weekdaysMin: "Pz_Pt_Sa_\xc7a_Pe_Cu_Ct".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[bug\xfcn saat] LT", nextDay: "[yar\u0131n saat] LT", nextWeek: "[gelecek] dddd [saat] LT", lastDay: "[d\xfcn] LT", lastWeek: "[ge\xe7en] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s sonra", past: "%s \xf6nce", s: "birka\xe7 saniye", ss: "%d saniye", m: "bir dakika", mm: "%d dakika", h: "bir saat", hh: "%d saat", d: "bir g\xfcn", dd: "%d g\xfcn", M: "bir ay", MM: "%d ay", y: "bir y\u0131l", yy: "%d y\u0131l" }, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "Do":case "DD":return e;default:if (0 === e) return e + "'\u0131nc\u0131";var t = e % 10;return e + (md[t] || md[e % 100 - t] || md[100 <= e ? 100 : null]);}}, week: { dow: 1, doy: 7 } }), l.defineLocale("tzl", { months: "Januar_Fevraglh_Mar\xe7_Avr\xefu_Mai_G\xfcn_Julia_Guscht_Setemvar_Listop\xe4ts_Noemvar_Zecemvar".split("_"), monthsShort: "Jan_Fev_Mar_Avr_Mai_G\xfcn_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdays: "S\xfaladi_L\xfane\xe7i_Maitzi_M\xe1rcuri_Xh\xfaadi_Vi\xe9ner\xe7i_S\xe1turi".split("_"), weekdaysShort: "S\xfal_L\xfan_Mai_M\xe1r_Xh\xfa_Vi\xe9_S\xe1t".split("_"), weekdaysMin: "S\xfa_L\xfa_Ma_M\xe1_Xh_Vi_S\xe1".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM [dallas] YYYY", LLL: "D. MMMM [dallas] YYYY HH.mm", LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm" }, meridiemParse: /d\'o|d\'a/i, isPM: function isPM(e) {return "d'o" === e.toLowerCase();}, meridiem: function meridiem(e, a, t) {return 11 < e ? t ? "d'o" : "D'O" : t ? "d'a" : "D'A";}, calendar: { sameDay: "[oxhi \xe0] LT", nextDay: "[dem\xe0 \xe0] LT", nextWeek: "dddd [\xe0] LT", lastDay: "[ieiri \xe0] LT", lastWeek: "[s\xfcr el] dddd [lasteu \xe0] LT", sameElse: "L" }, relativeTime: { future: "osprei %s", past: "ja%s", s: ud, ss: ud, m: ud, mm: ud, h: ud, hh: ud, d: ud, dd: ud, M: ud, MM: ud, y: ud, yy: ud }, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } }), l.defineLocale("tzm-latn", { months: "innayr_br\u02E4ayr\u02E4_mar\u02E4s\u02E4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02E4wbr\u02E4_nwwanbir_dwjnbir".split("_"), monthsShort: "innayr_br\u02E4ayr\u02E4_mar\u02E4s\u02E4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02E4wbr\u02E4_nwwanbir_dwjnbir".split("_"), weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"), weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"), weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1E0Dyas".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[asdkh g] LT", nextDay: "[aska g] LT", nextWeek: "dddd [g] LT", lastDay: "[assant g] LT", lastWeek: "dddd [g] LT", sameElse: "L" }, relativeTime: { future: "dadkh s yan %s", past: "yan %s", s: "imik", ss: "%d imik", m: "minu\u1E0D", mm: "%d minu\u1E0D", h: "sa\u025Ba", hh: "%d tassa\u025Bin", d: "ass", dd: "%d ossan", M: "ayowr", MM: "%d iyyirn", y: "asgas", yy: "%d isgasn" }, week: { dow: 6, doy: 12 } }), l.defineLocale("tzm", { months: "\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54_\u2D31\u2D55\u2D30\u2D62\u2D55_\u2D4E\u2D30\u2D55\u2D5A_\u2D49\u2D31\u2D54\u2D49\u2D54_\u2D4E\u2D30\u2D62\u2D62\u2D53_\u2D62\u2D53\u2D4F\u2D62\u2D53_\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63_\u2D56\u2D53\u2D5B\u2D5C_\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D3D\u2D5F\u2D53\u2D31\u2D55_\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54".split("_"), monthsShort: "\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54_\u2D31\u2D55\u2D30\u2D62\u2D55_\u2D4E\u2D30\u2D55\u2D5A_\u2D49\u2D31\u2D54\u2D49\u2D54_\u2D4E\u2D30\u2D62\u2D62\u2D53_\u2D62\u2D53\u2D4F\u2D62\u2D53_\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63_\u2D56\u2D53\u2D5B\u2D5C_\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D3D\u2D5F\u2D53\u2D31\u2D55_\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54_\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54".split("_"), weekdays: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"), weekdaysShort: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"), weekdaysMin: "\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59_\u2D30\u2D62\u2D4F\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59_\u2D30\u2D3D\u2D54\u2D30\u2D59_\u2D30\u2D3D\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59_\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[\u2D30\u2D59\u2D37\u2D45 \u2D34] LT", nextDay: "[\u2D30\u2D59\u2D3D\u2D30 \u2D34] LT", nextWeek: "dddd [\u2D34] LT", lastDay: "[\u2D30\u2D5A\u2D30\u2D4F\u2D5C \u2D34] LT", lastWeek: "dddd [\u2D34] LT", sameElse: "L" }, relativeTime: { future: "\u2D37\u2D30\u2D37\u2D45 \u2D59 \u2D62\u2D30\u2D4F %s", past: "\u2D62\u2D30\u2D4F %s", s: "\u2D49\u2D4E\u2D49\u2D3D", ss: "%d \u2D49\u2D4E\u2D49\u2D3D", m: "\u2D4E\u2D49\u2D4F\u2D53\u2D3A", mm: "%d \u2D4E\u2D49\u2D4F\u2D53\u2D3A", h: "\u2D59\u2D30\u2D44\u2D30", hh: "%d \u2D5C\u2D30\u2D59\u2D59\u2D30\u2D44\u2D49\u2D4F", d: "\u2D30\u2D59\u2D59", dd: "%d o\u2D59\u2D59\u2D30\u2D4F", M: "\u2D30\u2D62o\u2D53\u2D54", MM: "%d \u2D49\u2D62\u2D62\u2D49\u2D54\u2D4F", y: "\u2D30\u2D59\u2D33\u2D30\u2D59", yy: "%d \u2D49\u2D59\u2D33\u2D30\u2D59\u2D4F" }, week: { dow: 6, doy: 12 } }), l.defineLocale("ug-cn", { months: "\u064A\u0627\u0646\u06CB\u0627\u0631_\u0641\u06D0\u06CB\u0631\u0627\u0644_\u0645\u0627\u0631\u062A_\u0626\u0627\u067E\u0631\u06D0\u0644_\u0645\u0627\u064A_\u0626\u0649\u064A\u06C7\u0646_\u0626\u0649\u064A\u06C7\u0644_\u0626\u0627\u06CB\u063A\u06C7\u0633\u062A_\u0633\u06D0\u0646\u062A\u06D5\u0628\u0649\u0631_\u0626\u06C6\u0643\u062A\u06D5\u0628\u0649\u0631_\u0646\u0648\u064A\u0627\u0628\u0649\u0631_\u062F\u06D0\u0643\u0627\u0628\u0649\u0631".split("_"), monthsShort: "\u064A\u0627\u0646\u06CB\u0627\u0631_\u0641\u06D0\u06CB\u0631\u0627\u0644_\u0645\u0627\u0631\u062A_\u0626\u0627\u067E\u0631\u06D0\u0644_\u0645\u0627\u064A_\u0626\u0649\u064A\u06C7\u0646_\u0626\u0649\u064A\u06C7\u0644_\u0626\u0627\u06CB\u063A\u06C7\u0633\u062A_\u0633\u06D0\u0646\u062A\u06D5\u0628\u0649\u0631_\u0626\u06C6\u0643\u062A\u06D5\u0628\u0649\u0631_\u0646\u0648\u064A\u0627\u0628\u0649\u0631_\u062F\u06D0\u0643\u0627\u0628\u0649\u0631".split("_"), weekdays: "\u064A\u06D5\u0643\u0634\u06D5\u0646\u0628\u06D5_\u062F\u06C8\u0634\u06D5\u0646\u0628\u06D5_\u0633\u06D5\u064A\u0634\u06D5\u0646\u0628\u06D5_\u0686\u0627\u0631\u0634\u06D5\u0646\u0628\u06D5_\u067E\u06D5\u064A\u0634\u06D5\u0646\u0628\u06D5_\u062C\u06C8\u0645\u06D5_\u0634\u06D5\u0646\u0628\u06D5".split("_"), weekdaysShort: "\u064A\u06D5_\u062F\u06C8_\u0633\u06D5_\u0686\u0627_\u067E\u06D5_\u062C\u06C8_\u0634\u06D5".split("_"), weekdaysMin: "\u064A\u06D5_\u062F\u06C8_\u0633\u06D5_\u0686\u0627_\u067E\u06D5_\u062C\u06C8_\u0634\u06D5".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649", LLL: "YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649\u060C HH:mm", LLLL: "dddd\u060C YYYY-\u064A\u0649\u0644\u0649M-\u0626\u0627\u064A\u0646\u0649\u06ADD-\u0643\u06C8\u0646\u0649\u060C HH:mm" }, meridiemParse: /\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5|\u0633\u06d5\u06be\u06d5\u0631|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646|\u0686\u06c8\u0634|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646|\u0643\u06d5\u0686/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u064A\u06D0\u0631\u0649\u0645 \u0643\u06D0\u0686\u06D5" === a || "\u0633\u06D5\u06BE\u06D5\u0631" === a || "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0628\u06C7\u0631\u06C7\u0646" === a ? e : "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0643\u06D0\u064A\u0649\u0646" === a || "\u0643\u06D5\u0686" === a ? e + 12 : 11 <= e ? e : e + 12;}, meridiem: function meridiem(e, a, t) {var s = 100 * e + a;return s < 600 ? "\u064A\u06D0\u0631\u0649\u0645 \u0643\u06D0\u0686\u06D5" : s < 900 ? "\u0633\u06D5\u06BE\u06D5\u0631" : s < 1130 ? "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0628\u06C7\u0631\u06C7\u0646" : s < 1230 ? "\u0686\u06C8\u0634" : s < 1800 ? "\u0686\u06C8\u0634\u062A\u0649\u0646 \u0643\u06D0\u064A\u0649\u0646" : "\u0643\u06D5\u0686";}, calendar: { sameDay: "[\u0628\u06C8\u06AF\u06C8\u0646 \u0633\u0627\u0626\u06D5\u062A] LT", nextDay: "[\u0626\u06D5\u062A\u06D5 \u0633\u0627\u0626\u06D5\u062A] LT", nextWeek: "[\u0643\u06D0\u0644\u06D5\u0631\u0643\u0649] dddd [\u0633\u0627\u0626\u06D5\u062A] LT", lastDay: "[\u062A\u06C6\u0646\u06C8\u06AF\u06C8\u0646] LT", lastWeek: "[\u0626\u0627\u0644\u062F\u0649\u0646\u0642\u0649] dddd [\u0633\u0627\u0626\u06D5\u062A] LT", sameElse: "L" }, relativeTime: { future: "%s \u0643\u06D0\u064A\u0649\u0646", past: "%s \u0628\u06C7\u0631\u06C7\u0646", s: "\u0646\u06D5\u0686\u0686\u06D5 \u0633\u06D0\u0643\u0648\u0646\u062A", ss: "%d \u0633\u06D0\u0643\u0648\u0646\u062A", m: "\u0628\u0649\u0631 \u0645\u0649\u0646\u06C7\u062A", mm: "%d \u0645\u0649\u0646\u06C7\u062A", h: "\u0628\u0649\u0631 \u0633\u0627\u0626\u06D5\u062A", hh: "%d \u0633\u0627\u0626\u06D5\u062A", d: "\u0628\u0649\u0631 \u0643\u06C8\u0646", dd: "%d \u0643\u06C8\u0646", M: "\u0628\u0649\u0631 \u0626\u0627\u064A", MM: "%d \u0626\u0627\u064A", y: "\u0628\u0649\u0631 \u064A\u0649\u0644", yy: "%d \u064A\u0649\u0644" }, dayOfMonthOrdinalParse: /\d{1,2}(-\u0643\u06c8\u0646\u0649|-\u0626\u0627\u064a|-\u06be\u06d5\u067e\u062a\u06d5)/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + "-\u0643\u06C8\u0646\u0649";case "w":case "W":return e + "-\u06BE\u06D5\u067E\u062A\u06D5";default:return e;}}, preparse: function preparse(e) {return e.replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/,/g, "\u060C");}, week: { dow: 1, doy: 7 } }), l.defineLocale("uk", { months: { format: "\u0441\u0456\u0447\u043D\u044F_\u043B\u044E\u0442\u043E\u0433\u043E_\u0431\u0435\u0440\u0435\u0437\u043D\u044F_\u043A\u0432\u0456\u0442\u043D\u044F_\u0442\u0440\u0430\u0432\u043D\u044F_\u0447\u0435\u0440\u0432\u043D\u044F_\u043B\u0438\u043F\u043D\u044F_\u0441\u0435\u0440\u043F\u043D\u044F_\u0432\u0435\u0440\u0435\u0441\u043D\u044F_\u0436\u043E\u0432\u0442\u043D\u044F_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043D\u044F".split("_"), standalone: "\u0441\u0456\u0447\u0435\u043D\u044C_\u043B\u044E\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C_\u043A\u0432\u0456\u0442\u0435\u043D\u044C_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u0435\u0440\u0432\u0435\u043D\u044C_\u043B\u0438\u043F\u0435\u043D\u044C_\u0441\u0435\u0440\u043F\u0435\u043D\u044C_\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C_\u0436\u043E\u0432\u0442\u0435\u043D\u044C_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043D\u044C".split("_") }, monthsShort: "\u0441\u0456\u0447_\u043B\u044E\u0442_\u0431\u0435\u0440_\u043A\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043B\u0438\u043F_\u0441\u0435\u0440\u043F_\u0432\u0435\u0440_\u0436\u043E\u0432\u0442_\u043B\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"), weekdays: function weekdays(e, a) {var t = { nominative: "\u043D\u0435\u0434\u0456\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F_\u0441\u0443\u0431\u043E\u0442\u0430".split("_"), accusative: "\u043D\u0435\u0434\u0456\u043B\u044E_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044E_\u0441\u0443\u0431\u043E\u0442\u0443".split("_"), genitive: "\u043D\u0435\u0434\u0456\u043B\u0456_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043A\u0430_\u0432\u0456\u0432\u0442\u043E\u0440\u043A\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u0456_\u0441\u0443\u0431\u043E\u0442\u0438".split("_") };return !0 === e ? t.nominative.slice(1, 7).concat(t.nominative.slice(0, 1)) : e ? t[/(\[[\u0412\u0432\u0423\u0443]\]) ?dddd/.test(a) ? "accusative" : /\[?(?:\u043c\u0438\u043d\u0443\u043b\u043e\u0457|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0457)? ?\] ?dddd/.test(a) ? "genitive" : "nominative"][e.day()] : t.nominative;}, weekdaysShort: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"), weekdaysMin: "\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY \u0440.", LLL: "D MMMM YYYY \u0440., HH:mm", LLLL: "dddd, D MMMM YYYY \u0440., HH:mm" }, calendar: { sameDay: Md("[\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456 "), nextDay: Md("[\u0417\u0430\u0432\u0442\u0440\u0430 "), lastDay: Md("[\u0412\u0447\u043E\u0440\u0430 "), nextWeek: Md("[\u0423] dddd ["), lastWeek: function lastWeek() {switch (this.day()) {case 0:case 3:case 5:case 6:return Md("[\u041C\u0438\u043D\u0443\u043B\u043E\u0457] dddd [").call(this);case 1:case 2:case 4:return Md("[\u041C\u0438\u043D\u0443\u043B\u043E\u0433\u043E] dddd [").call(this);}}, sameElse: "L" }, relativeTime: { future: "\u0437\u0430 %s", past: "%s \u0442\u043E\u043C\u0443", s: "\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434", ss: ld, m: ld, mm: ld, h: "\u0433\u043E\u0434\u0438\u043D\u0443", hh: ld, d: "\u0434\u0435\u043D\u044C", dd: ld, M: "\u043C\u0456\u0441\u044F\u0446\u044C", MM: ld, y: "\u0440\u0456\u043A", yy: ld }, meridiemParse: /\u043d\u043e\u0447\u0456|\u0440\u0430\u043d\u043a\u0443|\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430/, isPM: function isPM(e) {return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430)$/.test(e);}, meridiem: function meridiem(e, a, t) {return e < 4 ? "\u043D\u043E\u0447\u0456" : e < 12 ? "\u0440\u0430\u043D\u043A\u0443" : e < 17 ? "\u0434\u043D\u044F" : "\u0432\u0435\u0447\u043E\u0440\u0430";}, dayOfMonthOrdinalParse: /\d{1,2}-(\u0439|\u0433\u043e)/, ordinal: function ordinal(e, a) {switch (a) {case "M":case "d":case "DDD":case "w":case "W":return e + "-\u0439";case "D":return e + "-\u0433\u043E";default:return e;}}, week: { dow: 1, doy: 7 } });var hd = ["\u062C\u0646\u0648\u0631\u06CC", "\u0641\u0631\u0648\u0631\u06CC", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u06CC\u0644", "\u0645\u0626\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u0626\u06CC", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u06A9\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"],Ld = ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u06CC\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u06C1", "\u06C1\u0641\u062A\u06C1"];return l.defineLocale("ur", { months: hd, monthsShort: hd, weekdays: Ld, weekdaysShort: Ld, weekdaysMin: Ld, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd\u060C D MMMM YYYY HH:mm" }, meridiemParse: /\u0635\u0628\u062d|\u0634\u0627\u0645/, isPM: function isPM(e) {return "\u0634\u0627\u0645" === e;}, meridiem: function meridiem(e, a, t) {return e < 12 ? "\u0635\u0628\u062D" : "\u0634\u0627\u0645";}, calendar: { sameDay: "[\u0622\u062C \u0628\u0648\u0642\u062A] LT", nextDay: "[\u06A9\u0644 \u0628\u0648\u0642\u062A] LT", nextWeek: "dddd [\u0628\u0648\u0642\u062A] LT", lastDay: "[\u06AF\u0630\u0634\u062A\u06C1 \u0631\u0648\u0632 \u0628\u0648\u0642\u062A] LT", lastWeek: "[\u06AF\u0630\u0634\u062A\u06C1] dddd [\u0628\u0648\u0642\u062A] LT", sameElse: "L" }, relativeTime: { future: "%s \u0628\u0639\u062F", past: "%s \u0642\u0628\u0644", s: "\u0686\u0646\u062F \u0633\u06CC\u06A9\u0646\u0688", ss: "%d \u0633\u06CC\u06A9\u0646\u0688", m: "\u0627\u06CC\u06A9 \u0645\u0646\u0679", mm: "%d \u0645\u0646\u0679", h: "\u0627\u06CC\u06A9 \u06AF\u06BE\u0646\u0679\u06C1", hh: "%d \u06AF\u06BE\u0646\u0679\u06D2", d: "\u0627\u06CC\u06A9 \u062F\u0646", dd: "%d \u062F\u0646", M: "\u0627\u06CC\u06A9 \u0645\u0627\u06C1", MM: "%d \u0645\u0627\u06C1", y: "\u0627\u06CC\u06A9 \u0633\u0627\u0644", yy: "%d \u0633\u0627\u0644" }, preparse: function preparse(e) {return e.replace(/\u060c/g, ",");}, postformat: function postformat(e) {return e.replace(/,/g, "\u060C");}, week: { dow: 1, doy: 4 } }), l.defineLocale("uz-latn", { months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"), monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"), weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"), weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"), weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, calendar: { sameDay: "[Bugun soat] LT [da]", nextDay: "[Ertaga] LT [da]", nextWeek: "dddd [kuni soat] LT [da]", lastDay: "[Kecha soat] LT [da]", lastWeek: "[O'tgan] dddd [kuni soat] LT [da]", sameElse: "L" }, relativeTime: { future: "Yaqin %s ichida", past: "Bir necha %s oldin", s: "soniya", ss: "%d soniya", m: "bir daqiqa", mm: "%d daqiqa", h: "bir soat", hh: "%d soat", d: "bir kun", dd: "%d kun", M: "bir oy", MM: "%d oy", y: "bir yil", yy: "%d yil" }, week: { dow: 1, doy: 7 } }), l.defineLocale("uz", { months: "\u044F\u043D\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043B_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440_\u043E\u043A\u0442\u044F\u0431\u0440_\u043D\u043E\u044F\u0431\u0440_\u0434\u0435\u043A\u0430\u0431\u0440".split("_"), monthsShort: "\u044F\u043D\u0432_\u0444\u0435\u0432_\u043C\u0430\u0440_\u0430\u043F\u0440_\u043C\u0430\u0439_\u0438\u044E\u043D_\u0438\u044E\u043B_\u0430\u0432\u0433_\u0441\u0435\u043D_\u043E\u043A\u0442_\u043D\u043E\u044F_\u0434\u0435\u043A".split("_"), weekdays: "\u042F\u043A\u0448\u0430\u043D\u0431\u0430_\u0414\u0443\u0448\u0430\u043D\u0431\u0430_\u0421\u0435\u0448\u0430\u043D\u0431\u0430_\u0427\u043E\u0440\u0448\u0430\u043D\u0431\u0430_\u041F\u0430\u0439\u0448\u0430\u043D\u0431\u0430_\u0416\u0443\u043C\u0430_\u0428\u0430\u043D\u0431\u0430".split("_"), weekdaysShort: "\u042F\u043A\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043E\u0440_\u041F\u0430\u0439_\u0416\u0443\u043C_\u0428\u0430\u043D".split("_"), weekdaysMin: "\u042F\u043A_\u0414\u0443_\u0421\u0435_\u0427\u043E_\u041F\u0430_\u0416\u0443_\u0428\u0430".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, calendar: { sameDay: "[\u0411\u0443\u0433\u0443\u043D \u0441\u043E\u0430\u0442] LT [\u0434\u0430]", nextDay: "[\u042D\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]", nextWeek: "dddd [\u043A\u0443\u043D\u0438 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]", lastDay: "[\u041A\u0435\u0447\u0430 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]", lastWeek: "[\u0423\u0442\u0433\u0430\u043D] dddd [\u043A\u0443\u043D\u0438 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]", sameElse: "L" }, relativeTime: { future: "\u042F\u043A\u0438\u043D %s \u0438\u0447\u0438\u0434\u0430", past: "\u0411\u0438\u0440 \u043D\u0435\u0447\u0430 %s \u043E\u043B\u0434\u0438\u043D", s: "\u0444\u0443\u0440\u0441\u0430\u0442", ss: "%d \u0444\u0443\u0440\u0441\u0430\u0442", m: "\u0431\u0438\u0440 \u0434\u0430\u043A\u0438\u043A\u0430", mm: "%d \u0434\u0430\u043A\u0438\u043A\u0430", h: "\u0431\u0438\u0440 \u0441\u043E\u0430\u0442", hh: "%d \u0441\u043E\u0430\u0442", d: "\u0431\u0438\u0440 \u043A\u0443\u043D", dd: "%d \u043A\u0443\u043D", M: "\u0431\u0438\u0440 \u043E\u0439", MM: "%d \u043E\u0439", y: "\u0431\u0438\u0440 \u0439\u0438\u043B", yy: "%d \u0439\u0438\u043B" }, week: { dow: 1, doy: 7 } }), l.defineLocale("vi", { months: "th\xe1ng 1_th\xe1ng 2_th\xe1ng 3_th\xe1ng 4_th\xe1ng 5_th\xe1ng 6_th\xe1ng 7_th\xe1ng 8_th\xe1ng 9_th\xe1ng 10_th\xe1ng 11_th\xe1ng 12".split("_"), monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"), monthsParseExact: !0, weekdays: "ch\u1EE7 nh\u1EADt_th\u1EE9 hai_th\u1EE9 ba_th\u1EE9 t\u01B0_th\u1EE9 n\u0103m_th\u1EE9 s\xE1u_th\u1EE9 b\u1EA3y".split("_"), weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"), weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"), weekdaysParseExact: !0, meridiemParse: /sa|ch/i, isPM: function isPM(e) {return /^ch$/i.test(e);}, meridiem: function meridiem(e, a, t) {return e < 12 ? t ? "sa" : "SA" : t ? "ch" : "CH";}, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [n\u0103m] YYYY", LLL: "D MMMM [n\u0103m] YYYY HH:mm", LLLL: "dddd, D MMMM [n\u0103m] YYYY HH:mm", l: "DD/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, calendar: { sameDay: "[H\xf4m nay l\xfac] LT", nextDay: "[Ng\xe0y mai l\xfac] LT", nextWeek: "dddd [tu\u1EA7n t\u1EDBi l\xFAc] LT", lastDay: "[H\xf4m qua l\xfac] LT", lastWeek: "dddd [tu\u1EA7n r\u1ED3i l\xFAc] LT", sameElse: "L" }, relativeTime: { future: "%s t\u1EDBi", past: "%s tr\u01B0\u1EDBc", s: "v\xe0i gi\xe2y", ss: "%d gi\xe2y", m: "m\u1ED9t ph\xFAt", mm: "%d ph\xfat", h: "m\u1ED9t gi\u1EDD", hh: "%d gi\u1EDD", d: "m\u1ED9t ng\xE0y", dd: "%d ng\xe0y", M: "m\u1ED9t th\xE1ng", MM: "%d th\xe1ng", y: "m\u1ED9t n\u0103m", yy: "%d n\u0103m" }, dayOfMonthOrdinalParse: /\d{1,2}/, ordinal: function ordinal(e) {return e;}, week: { dow: 1, doy: 4 } }), l.defineLocale("x-pseudo", { months: "J~\xe1\xf1\xfa\xe1~r\xfd_F~\xe9br\xfa~\xe1r\xfd_~M\xe1rc~h_\xc1p~r\xedl_~M\xe1\xfd_~J\xfa\xf1\xe9~_J\xfal~\xfd_\xc1\xfa~g\xfast~_S\xe9p~t\xe9mb~\xe9r_\xd3~ct\xf3b~\xe9r_\xd1~\xf3v\xe9m~b\xe9r_~D\xe9c\xe9~mb\xe9r".split("_"), monthsShort: "J~\xe1\xf1_~F\xe9b_~M\xe1r_~\xc1pr_~M\xe1\xfd_~J\xfa\xf1_~J\xfal_~\xc1\xfag_~S\xe9p_~\xd3ct_~\xd1\xf3v_~D\xe9c".split("_"), monthsParseExact: !0, weekdays: "S~\xfa\xf1d\xe1~\xfd_M\xf3~\xf1d\xe1\xfd~_T\xfa\xe9~sd\xe1\xfd~_W\xe9d~\xf1\xe9sd~\xe1\xfd_T~h\xfars~d\xe1\xfd_~Fr\xedd~\xe1\xfd_S~\xe1t\xfar~d\xe1\xfd".split("_"), weekdaysShort: "S~\xfa\xf1_~M\xf3\xf1_~T\xfa\xe9_~W\xe9d_~Th\xfa_~Fr\xed_~S\xe1t".split("_"), weekdaysMin: "S~\xfa_M\xf3~_T\xfa_~W\xe9_T~h_Fr~_S\xe1".split("_"), weekdaysParseExact: !0, longDateFormat: { LT: "HH:mm", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[T~\xf3d\xe1~\xfd \xe1t] LT", nextDay: "[T~\xf3m\xf3~rr\xf3~w \xe1t] LT", nextWeek: "dddd [\xe1t] LT", lastDay: "[\xdd~\xe9st~\xe9rd\xe1~\xfd \xe1t] LT", lastWeek: "[L~\xe1st] dddd [\xe1t] LT", sameElse: "L" }, relativeTime: { future: "\xed~\xf1 %s", past: "%s \xe1~g\xf3", s: "\xe1 ~f\xe9w ~s\xe9c\xf3~\xf1ds", ss: "%d s~\xe9c\xf3\xf1~ds", m: "\xe1 ~m\xed\xf1~\xfat\xe9", mm: "%d m~\xed\xf1\xfa~t\xe9s", h: "\xe1~\xf1 h\xf3~\xfar", hh: "%d h~\xf3\xfars", d: "\xe1 ~d\xe1\xfd", dd: "%d d~\xe1\xfds", M: "\xe1 ~m\xf3\xf1~th", MM: "%d m~\xf3\xf1t~hs", y: "\xe1 ~\xfd\xe9\xe1r", yy: "%d \xfd~\xe9\xe1rs" }, dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function ordinal(e) {var a = e % 10;return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th");}, week: { dow: 1, doy: 4 } }), l.defineLocale("yo", { months: "S\u1EB9\u0301r\u1EB9\u0301_E\u0300re\u0300le\u0300_\u1EB8r\u1EB9\u0300na\u0300_I\u0300gbe\u0301_E\u0300bibi_O\u0300ku\u0300du_Ag\u1EB9mo_O\u0300gu\u0301n_Owewe_\u1ECC\u0300wa\u0300ra\u0300_Be\u0301lu\u0301_\u1ECC\u0300p\u1EB9\u0300\u0300".split("_"), monthsShort: "S\u1EB9\u0301r_E\u0300rl_\u1EB8rn_I\u0300gb_E\u0300bi_O\u0300ku\u0300_Ag\u1EB9_O\u0300gu\u0301_Owe_\u1ECC\u0300wa\u0300_Be\u0301l_\u1ECC\u0300p\u1EB9\u0300\u0300".split("_"), weekdays: "A\u0300i\u0300ku\u0301_Aje\u0301_I\u0300s\u1EB9\u0301gun_\u1ECCj\u1ECD\u0301ru\u0301_\u1ECCj\u1ECD\u0301b\u1ECD_\u1EB8ti\u0300_A\u0300ba\u0301m\u1EB9\u0301ta".split("_"), weekdaysShort: "A\u0300i\u0300k_Aje\u0301_I\u0300s\u1EB9\u0301_\u1ECCjr_\u1ECCjb_\u1EB8ti\u0300_A\u0300ba\u0301".split("_"), weekdaysMin: "A\u0300i\u0300_Aj_I\u0300s_\u1ECCr_\u1ECCb_\u1EB8t_A\u0300b".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[O\u0300ni\u0300 ni] LT", nextDay: "[\u1ECC\u0300la ni] LT", nextWeek: "dddd [\u1ECCs\u1EB9\u0300 to\u0301n'b\u1ECD] [ni] LT", lastDay: "[A\u0300na ni] LT", lastWeek: "dddd [\u1ECCs\u1EB9\u0300 to\u0301l\u1ECD\u0301] [ni] LT", sameElse: "L" }, relativeTime: { future: "ni\u0301 %s", past: "%s k\u1ECDja\u0301", s: "i\u0300s\u1EB9ju\u0301 aaya\u0301 die", ss: "aaya\u0301 %d", m: "i\u0300s\u1EB9ju\u0301 kan", mm: "i\u0300s\u1EB9ju\u0301 %d", h: "wa\u0301kati kan", hh: "wa\u0301kati %d", d: "\u1ECDj\u1ECD\u0301 kan", dd: "\u1ECDj\u1ECD\u0301 %d", M: "osu\u0300 kan", MM: "osu\u0300 %d", y: "\u1ECDdu\u0301n kan", yy: "\u1ECDdu\u0301n %d" }, dayOfMonthOrdinalParse: /\u1ecdj\u1ecd\u0301\s\d{1,2}/, ordinal: "\u1ECDj\u1ECD\u0301 %d", week: { dow: 1, doy: 4 } }), l.defineLocale("zh-cn", { months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206", LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, meridiemParse: /\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u51CC\u6668" === a || "\u65E9\u4E0A" === a || "\u4E0A\u5348" === a ? e : "\u4E0B\u5348" === a || "\u665A\u4E0A" === a ? e + 12 : 11 <= e ? e : e + 12;}, meridiem: function meridiem(e, a, t) {var s = 100 * e + a;return s < 600 ? "\u51CC\u6668" : s < 900 ? "\u65E9\u4E0A" : s < 1130 ? "\u4E0A\u5348" : s < 1230 ? "\u4E2D\u5348" : s < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";}, calendar: { sameDay: "[\u4ECA\u5929]LT", nextDay: "[\u660E\u5929]LT", nextWeek: "[\u4E0B]ddddLT", lastDay: "[\u6628\u5929]LT", lastWeek: "[\u4E0A]ddddLT", sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(\u65e5|\u6708|\u5468)/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + "\u65E5";case "M":return e + "\u6708";case "w":case "W":return e + "\u5468";default:return e;}}, relativeTime: { future: "%s\u5185", past: "%s\u524D", s: "\u51E0\u79D2", ss: "%d \u79D2", m: "1 \u5206\u949F", mm: "%d \u5206\u949F", h: "1 \u5C0F\u65F6", hh: "%d \u5C0F\u65F6", d: "1 \u5929", dd: "%d \u5929", M: "1 \u4E2A\u6708", MM: "%d \u4E2A\u6708", y: "1 \u5E74", yy: "%d \u5E74" }, week: { dow: 1, doy: 4 } }), l.defineLocale("zh-hk", { months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm", LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, meridiemParse: /\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u51CC\u6668" === a || "\u65E9\u4E0A" === a || "\u4E0A\u5348" === a ? e : "\u4E2D\u5348" === a ? 11 <= e ? e : e + 12 : "\u4E0B\u5348" === a || "\u665A\u4E0A" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {var s = 100 * e + a;return s < 600 ? "\u51CC\u6668" : s < 900 ? "\u65E9\u4E0A" : s < 1130 ? "\u4E0A\u5348" : s < 1230 ? "\u4E2D\u5348" : s < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";}, calendar: { sameDay: "[\u4ECA\u5929]LT", nextDay: "[\u660E\u5929]LT", nextWeek: "[\u4E0B]ddddLT", lastDay: "[\u6628\u5929]LT", lastWeek: "[\u4E0A]ddddLT", sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(\u65e5|\u6708|\u9031)/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + "\u65E5";case "M":return e + "\u6708";case "w":case "W":return e + "\u9031";default:return e;}}, relativeTime: { future: "%s\u5167", past: "%s\u524D", s: "\u5E7E\u79D2", ss: "%d \u79D2", m: "1 \u5206\u9418", mm: "%d \u5206\u9418", h: "1 \u5C0F\u6642", hh: "%d \u5C0F\u6642", d: "1 \u5929", dd: "%d \u5929", M: "1 \u500B\u6708", MM: "%d \u500B\u6708", y: "1 \u5E74", yy: "%d \u5E74" } }), l.defineLocale("zh-tw", { months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm", LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, meridiemParse: /\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/, meridiemHour: function meridiemHour(e, a) {return 12 === e && (e = 0), "\u51CC\u6668" === a || "\u65E9\u4E0A" === a || "\u4E0A\u5348" === a ? e : "\u4E2D\u5348" === a ? 11 <= e ? e : e + 12 : "\u4E0B\u5348" === a || "\u665A\u4E0A" === a ? e + 12 : void 0;}, meridiem: function meridiem(e, a, t) {var s = 100 * e + a;return s < 600 ? "\u51CC\u6668" : s < 900 ? "\u65E9\u4E0A" : s < 1130 ? "\u4E0A\u5348" : s < 1230 ? "\u4E2D\u5348" : s < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";}, calendar: { sameDay: "[\u4ECA\u5929] LT", nextDay: "[\u660E\u5929] LT", nextWeek: "[\u4E0B]dddd LT", lastDay: "[\u6628\u5929] LT", lastWeek: "[\u4E0A]dddd LT", sameElse: "L" }, dayOfMonthOrdinalParse: /\d{1,2}(\u65e5|\u6708|\u9031)/, ordinal: function ordinal(e, a) {switch (a) {case "d":case "D":case "DDD":return e + "\u65E5";case "M":return e + "\u6708";case "w":case "W":return e + "\u9031";default:return e;}}, relativeTime: { future: "%s\u5167", past: "%s\u524D", s: "\u5E7E\u79D2", ss: "%d \u79D2", m: "1 \u5206\u9418", mm: "%d \u5206\u9418", h: "1 \u5C0F\u6642", hh: "%d \u5C0F\u6642", d: "1 \u5929", dd: "%d \u5929", M: "1 \u500B\u6708", MM: "%d \u500B\u6708", y: "1 \u5E74", yy: "%d \u5E74" } }), l.locale("en"), l;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/module.js */ 19)(module)))

/***/ }),
/* 19 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!********************************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/static/images/icon/love-on.png ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAVJUlEQVR4Xu2de5gddXnHv++ck2xIAoQQsrvzG2B3TrAiFrTcaSlCAMFiBCxXUcpNKFiEUrSIrdIKRaEIRYRHuQgYK7dyp1EJl2qBAj7lXsCc2YXMzGYhEJKwIdnsmbfP7IbnQUxyzvzmes68++95r5/3992ZOTPnNwT5EwJCYIMESNgIASGwYQIiEFkdQmAjBEQgsjyEgAhE1oAQ0CMgRxA9buJVEgIikJIMWtrUIyAC0eMmXiUhIAIpyaClTT0CIhA9buJVEgIikJIMWtrUIyAC0eMmXiUhIAIpyaClTT0CIhA9buJVEgIikJIMWtrUIyAC0eMmXiUhIAIpyaClTT0CIhA9buJVEgIikJIMWtrUIyAC0eMmXiUh0NECGeqZs0OjEvQYhBkB06ZE2JQ42DQAyCB6l8EjCIx3gWDEMHjFGMae39p13y7J7Nfbpm+as8iYvEMQ0GYATYfB0wg0LWCebgDMZKxkxkqDeGXAeKfSGBvqXfL6S53KrCMEMtTT18dVY2cOsCsIOzDRRwmYozU05mEAz4Hwv8T8QmXt2GPdbyyua8UquNNQzzYfa1QquxAZHwfzJwHsCKLZOmUz8+8IeBmE/6MGPcGEp5VfX6wTq0g+bSmQxZY1s8KTv8SgfQHeHUTdaUJloE5BcD8T/YppdOHWrvtemvnSir2ku3taUJl+ABu8P5jmgbB1WrnCuAweIuAJAj0yZYRvnLnMWZ5mvjRit5VAXFXbj8CngOjoNGBEiLmAma+yPOe+CD65mbqq/0gCnQyiA3IrAgAxbmTGj5Vf/+8864iSuy0E4ir7NBCdo33aFIVIFFvmV8G4IjBGbyjaUSU8WoxVp50KojMIsKO0lYHtSwj4UuU7N2SQK1aKwgpkYsBTTyPQ13TPi2ORieDM4HcowDWBMXpJ3hf5S7prs4Mqf51BXwZheoQ2sjdlLAYH31P+wA+yT95axkIKxFX22QQ6H4QtW2ujIFbMIwT6ftd7dMmWby9akWVV4XWZga7zGPwVAk3JMnf8XLyEGRdYnnNN/FjJRiiUQFxlH0LAv4LoI8m2mW00Bi8zmC8Fr7nc9P1VaWZfNqNvxsi0yrkEnFn4I0YTEMz8LDGdrvz6Y2kyixK7EALxzNrWIL4eRPtHKb7otuG3OBXg5F7XeSCNWn2r/7gAdCWBZqQRP7eYjFsCWnN63qerYf+5C8Qz+w9gg24j0Oa5DSTlxMy4edpI48wt3hl8J4lUQz1ztgqqwU8BOjCJeEWMwYAHHjvC8l57PM/6chMIA9UhZX+Xif42TwCZ5Q5vQDKfovyBe+Pk9Ez7BDZwWccdNdYHhTFGxP9gus7FcZjF8c1FIOMXlNx1Lwh7xSm+HX2Z+QrLc87Sqd2z7PkAHavj29Y+jHtMr3EUYXB11n1kLhDftLcJDHqIgFrWzRYmH/ODlbGRQ3uGh0daqSk8pWpUg/sJtGsr9p1pw09PWzl24Izlry/Lsr9MBeKq/p0Ixq9A2CrLJguZi/llCvggc2jgtY3VN/7AZZV/SYBZyD4yLCp85McIeD/Td17PKm1mAvF77V3YoIfb/avIRAfDeMto8MG9S5yn1hfX7+37NBvGHSCalmjedg7GPGw0gj16lwwOZtFGJgIJT6uY6LcgzMqiqXbKweDlVWDvHtd5/oN1u2rbPUGVh9rvpl/69MMnh7vWrNh5q6VLV6adLXWBjN/Iml55qnDPUaVNNkJ8Br89GbT7bLe+KHQbtvp3HGPjNyBsGiFMqUwZeFS59f0JGEuz8dQF4qnaYyDsmWYTnRGbl1TWNvZaO6lSNZgeb7vHbHIZAs9XrnNcmqlTFYir7KuJ6LQ0G+io2MyDTDSJANVRfaXYDDGfbXrO5WmlSE0gnmkfA4N+llbhElcIjBNgjDEae1ve4BNpEElFIEu6ax8fm4SnCehKo2iJKQR+jwDzcGWMduwZrr+RNJlUBOJatUWlvhGY9JQkXnMCzA8qz0n8F5OJC8RVtW8S4Z+bdyQWQiBZAtTA4eZQ/c4koyYqEFcpCzQlPHrIqVWSU5JYrRFgft30nO0IGG3NoblVwgKxbyeizzdPKxZCIC0C/G3lOhckFT0xgbiqbw+iSq7P7icFReK0LwEGr66upW2TumBPTCCesu8F0SHti1Yq7xQCzLjI8urnJ9FPIgJZbNnbGYxXQJRIvCQakxglJsBYaXqN2Un8fiSRBe2q2k1E+GKJRyKtF4wAM59jec5lccuKLZCllqXWoMuNW4j4C4EkCYS/abfcuhU3ZmyB+Kr/G0zGhXELEX8hkDQBajQOMocGfxEnbmyBeJbtANQfpwjxFQKpEGD+ufKcY+LEjiUQz6ztBQNtsxFxHFDi234EJr7yHZnV6m//19dhLIG4yr6GiE5tP3RScWkIBMHJyh+4TrffWALxLHsIoB7d5OInBNImwMy3W55zhG4ebYGEb3UKqpUB3cTiJwQyIcB4S3l17b0QtAXiqtrxRPhJJk1KEiEQgwAFje1Nf/BlnRDaAvGUHW42fYJOUvERAlkSIMapplf/kU5ObYG4yn6ViLbTSSo+QiBLAsy4yfLqx+vk1BIIA5N9q7ZGJ6H4CIGsCTD4Kct1dtPJqyWQcDvMoMov6CQUHyGQA4EVyq1rvV5DSyC+ZR/OoDtyaFRSCgEtApW16Nb5jYiuQP6eQf+iVak4CYEcCFDAe5u+85uoqbUE4in7KhCdHjWZ2AuBvAgQ+DjTdeZHza8nEMu+FqCToiYTeyGQI4EzlVu/Mmp+LYHID6SiYhb73AkE/C3lO/8UtQ4tgXiq9nMQjoqaTOyFQF4EmPlyy3POjppfSyCuZd9BoMOjJhN7IZAXAWLcaHr1v4qaX08gyr6NiP4yajKxFwK5EWDcorz60VHzawnEs+zrADoxajKxFwI5ErhWufVToubXEoir7O8TkdarjKMWKPZCIAkCxHyZ6TnnRI2lJRDPsi8A6B+jJhN7IZAbgSy/xXJV/zlExqW5NSuJhUBEAgQ+y3SdKyK6QesI4lv9pzAMrefroxYo9kIgEQIBn6h854aosbQE4pn982AYd0dNJvZCIC8CBvCZXrf+n1HzawlkfC9e0KtRk4m9EMiLADWCPnNo4LWo+bUEwoDhWbVV8qKcqLjFPhcCzCPKc6br5NYSSJjIVfYzRLSTTlLxEQJZEmDwk5br7K6TU1sgnmXPB+hYnaTiIwSyJcDXK9fRevpcWyCu6j+fyPhOto1KNiEQnUCcVyFoC8Tv7fs0VyoLopcrHkIgWwLUCPYxhwb+SyertkDCnU08q7ZCLtR1sItPZgSYR0zP2YyAQCentkDCZJ6yHwTRXJ3E4iMEMiHAuEd59c/p5oonELN2Lgx8Tze5+AmB1AkEfIbynR/q5oklkGGrf8cxGM/qJhc/IZA2gS6ssWa5rqebJ5ZA1p1mDYNotm4B4icE0iLAwCLLrcfaHje2QFxlX01Ep6XVpMQVAjEIXKLc+tdi+Os9zfvBhH6vvQtX6Kk4RYivEEiDQHV0dE73G4vrcWLHPoKEyV3Lfo5AfxynEPEVAkkSYOARy63vGzdmMgJR9mlEdHXcYsRfCCRGIOBjle/8e9x4iQjEN82pgbHJ23LTMO44xD8hAitMtz6TgEbceIkIZPzbLNnpJO4sxD8hArobNKwvfWIC8Xu33Z6NyosgSixmQrwkTJkIMDcYa/osz3OTaDvRxewq+1Yi0n7lbhINSYxyE2DmayzP+eukKCQqEDmKJDUWiaNDgIHRSaPBNt1vDAzr+Kd6ivV+cNnYOqnRSJzIBJh/qDznjMh+G3FI9AgS5ll3FHkBREaShUosIbAxAmkcPcJ8iQtk3TdaPwXoCzJSIZAVAWa+wvKcxLfDTUUgrlIWoesVEE3NCpDkKS8BBr8zdQR9M5c5y5OmkIpAxk+1LFte9Jn0tCTe+gkEfJLynevTwJOaQBioelbtFQLsNAqXmEJgggA/rVxn17RopCaQsGBX1fYjwsK0ipe4JSfA3KiM0Sd6husvpEUiVYGMX7Cr2i0gHJlWAxK3xASC4N+UP/DVNAmkLpA3Z21tjnZN+p1csKc5xvLFZsDvWr38o1stXboyze5TF8j4UcTsPwmGcW2ajUjschEw0PhUrzv4aNpdZyKQiesReyER7Zd2QxK/DAT4OuU6J2fRaWYCeXPWtr2jU6ovA9gsi8YkR2cSYPCQEayeY/r+qiw6zEwg677VOp4IP8miMcnRmQSyOrV6n16mAhkXiVV7gICDO3N80lWaBIj5atNzTk8zx4djZy6Q8FRrzZTKiwTaIstGJVd7Ewj3uKquffcTPcPDI1l2krlAwub83v692aCHQVTJslnJ1aYEGO8yeGfLczJ/7V8uAhkXiWV/lUGXt+nIpOwMCVCjcbA5NJjLqzZyE0jIV95SleEqa9NUzLjQ8urfzKv8XAUy8Y4R+2nZdC6v8Rc8L/NC5Tn751llrgIZP4qYta3Z4GcINDNPEJK7WAQYcDZZRZ/c8u1FK/KsLHeBhM0PWX37BKg8kicIyV0gAoyVxI3dTH8wvLGc618hBDJxJLGPgUE/y5WGJM+fAHODAt5P952CSTdQGIGsE8nFMOjrSTcp8dqHADNOsLx6YZ62KJRAxkWi7HtBdEj7jFQqTZDApcqtn5tgvNihCicQRt8U3zJ+DdAusbuTAO1DgPk+5TmfLVrBhRNICMhVaktgyjNEsIoGTOpJngAzP6e8YHfC4Orko8eLWEiBhC0N9czZIajwEyBMj9eieBeaAPNgdS3vkeR2oUn2W1iBTFy01/6UDTxEwOQkm5ZYBSHAeKuydu1uPW+87hSkoj8oo9ACmRBJ/2dBdJdsZVrUJaRXF4NXg4M9LW/wGb0I2XgVXiATIrFPhEHXZYNEsqROYPxeR/AX5tDgL1LPFTNBWwhk4sLdvoiIzovZr7gXgACBjzNdZ34BSmlaQtsIZJ1Ibiai45p2JQaFJUDg80zXubiwBX6osLYSyLhI5Ce77bK21lfnlcqtn9lODbSdQBiY5Cv7ARDl+hh0Ow25GLXy9cp1TipGLa1X0XYCCVtjzOnyreCXAP15662KZX4EeL5ynbY8NW5LgYSDXmxZmxB3PUSEPfIbvGRuToDnm67zRQr/r7XhX9sKJGS9pLt72lh1+oMikmKuPGa+XXnOke0qjpBqWwvkfZE0qtMfBWHnYi6TklbFuMf06ocRELQzgbYXSAh/2Yy+GSPTjEeJaMd2HkYH1X6XcuuHdUI/HSGQcBBvb2Fv/t5UWihHknyXJTPfpjznGAIa+VaSTPaOEUiIwzfNqWxMWQDQ3sngkSjRCLTvt1Ub6rOjBDLxFTAmr7tPMjfacMU6DoE89s2NU2+rvh0nkHUiqfpW7XYAn2sVhNjFIBDwxcp3OvI5uY4UyDqRkKfsW4joiBijF9cmBAh8luk6V3QqqI4VyPsD8yz7OoBO7NQB5tYXMzNwuuU51+RWQwaJO14gIUPPql0J4CsZ8CxHCmYmxnGm73T8PmalEMg6kVwC4O/KsYJT7JI5MMBH9XoD4TVex/+VRiATIrG/DdC3On6qaTXIGAMHn1f+wD1ppSha3FIJJITvqv5ziIxLizaIotfDwFqj0ZiX13s68uJTOoGMH0nM/jNgGD/IC3q75WXwe2A6xPLqD7Vb7XHrLaVAJk63+k8G049AVFoGLS0e5pEKBXN73MH/acm+w4xKvThcVZPXUm9kQTN4eQV8YK878GSHrfuW2ym1QNadbs0DGXeAUG2ZWhkMw03diPftcZ3ny9DuhnosvUBCMH5v30FBpXIXAV1lXgzv986APxnYZ7ZbX1R2HiKQdSvAN+0/Y8ICEE0r96LgAQS0j/Lri8vNYaJ7EcgHVoHXu+2fcKWykEAzSro4XjLG6FO9Sxa9WdL+/6BtEciHkPi9227PRuUREM0u1SJh/HaTVTx35jJnean6btKsCGQ9gIZ6+vqCivEoiLYpx2LhX1Ow+iDT91eVo9/WuxSBbICVq5QFhNsK0Xat42xLywWm2zisiC+vKQJNEchGpvDO5ttsMbJpNdygrkNfBze+Z9WX2n3nkTSFJAJpQnd8F0cV3NdpW50y4yLLq5+f5uLqhNgikBamyIDhW/ZNAH2hBfNimzAHYJysfOeGYhdajOpEIBHm4Krad4jQtv91GVhjNBqHlu2J3Agjlq9548AKfT3TPgGE69rtIcfwuSpwcJDlDT4Rl0GZ/OUIojFtz+yfx4Zxa7s8msIMF+C5lue8qtFuqV1EIJrjn3gDL99PoM01Q2TixuAXulY3Dtxq6WtDmSTssCQikBgDHerZ5mNBtboQoJ4YYVJzZfCTU0dwoNwd10csAtFnN+651LLUGp68EER/FDNUou7MeFh5jc/IDcB4WEUg8fiNe781c85mq6cG4ZGkEDcUGfwfynWOImAsgfZKHUIEktD4wxuKnsV3EnBwQiH1wgT4sfLrX9ZzFq8PExCBJLgmGCDfsm/O7YZiB++Rm+CYIoUSgUTC1Zpx5jcUw11Amf9G+QNXtVahWLVKQATSKqmIdpndUBx/dISOVX79loglinkLBEQgLUDSNfHN2qFs4E5d/5b8gsahyh+8uyVbMYpMQAQSGVk0B1f17QEyFiR9Q1EeHYk2B11rEYguuQh+rrI/AtBCIlgR3DZoKo+OJEGxtRgikNY4xbYant3fPTaJwp/xxr2h+GJ1NJjb/cbAcOyiJEBTAiKQpoiSMxi/obgJLwBhT62ojMcnja44cPabb76r5S9OkQmIQCIji+cw/pJRq3arxvsT7zbd+pEEjMarQLyjEBCBRKGVoG2UV8N16htkE8SZWigRSGpomwf2Vf83mIwLN3I1ziCcp1znu82jiUUaBEQgaVCNENM37WOZcBOIKr/nxtwwwEeX5VVnEZBlaioCyRT3+pO5yp5LwD0gmjpuwbyKgXmW5ywsQHmlLkEEUpDxu6p/JxA9REwNRnCA5Q08W5DSSl2GCKRA419s2dtNWtsY6xl+baBAZZW6FBFIqccvzTcjIAJpRkg+LzUBEUipxy/NNyMgAmlGSD4vNQERSKnHL803IyACaUZIPi81ARFIqccvzTcjIAJpRkg+LzUBEUipxy/NNyMgAmlGSD4vNQERSKnHL803IyACaUZIPi81ARFIqccvzTcjIAJpRkg+LzUBEUipxy/NNyMgAmlGSD4vNQERSKnHL803IyACaUZIPi81ARFIqccvzTcjIAJpRkg+LzWB/wcJcyQjvpxangAAAABJRU5ErkJggg=="

/***/ }),
/* 33 */
/*!*****************************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/static/images/icon/left.png ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABdklEQVRoQ9XYPUrEQBTA8TdVMK2VzWLrBTxDupkU5gCeQC+iR7CPkK8qd9hLWAk2y4IgjM3IFEJYFPZN3sck9SPz/yUQeDGw8ctsvB+yAPR9f13X9VvKw1QHjON4BwAtAOyttbdYhCpgER+7jwCws9Z+YhBqgJP42NxYa18x8XFWBUAVrwKgjBcHUMeLAjjixQBc8SIAznh2AHc8K0Aing0gFc8CkIwnB0jHkwI04skAWvEkAM341QDt+FWAHOKTAbnEJwHmeb7y3r8vNqekTQq7ef03j97I2ra9KIri6/eGIYR759wLVRD2PmhAPGAYhkdjzFMOiCRATohkQC6IVYAcEKsB2ggSgCaCDBAR0zQ9hBCeJb9OpAANBDlAGsECkESwAaQQrAAJBDuAGyEC4ESIAbgQogAOhDiAGqECoESoAf5CeO+Lpmm+MWulKmCJCCEcnHOXmPikvxLYA86Z77rupizLj6qqDufML2fU3wA2+HR+84AfKQ5IQBdVHA4AAAAASUVORK5CYII="

/***/ }),
/* 34 */
/*!******************************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/static/images/icon/right.png ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAELUlEQVRoQ9WZSYicRRSA3+txpgfSFxdQcBmGdNdiH4wEIkJA9OJyiEzPgBoDJqCJgmZQiFFwieAeFUlE1LghGDUb6MElp3gzMgdnwtB/1d+MJxUGYl9EAmPXkzdUN3Xsv7v+v5N36Ut1ve+rV++vf0HIGMaYexBxHxEdlFJ+n/Hv0Ydj1hmTJDmPiFcAgCOiGaXUd1nniDk+s4C1doGINjMEIv6LiDO1Wu10TKgsc2UWMMbcBAAnAWAjJyKiNldCa/1zlsSxxmYW4MTW2luIiCWu9SB/cSWEEGdjgfU7z0ACPHmaprc551jiSp/sdwCYkVIu9ps8xriBBTh5s9m8ExFPIuIGD5N4Cf4tJIYSYMIkSe5lCQAY88S/EVFDKcUVyT2GFmBCY8x9APB1QPsLEc0qpf7M2yCKgJd4CAA+7wIj4plOpzOntT6fp0Q0Ad8Te0ql0gddYCL6iSXq9fo/eUlEFfA9MY+I7wbA3woh5hDxvzwkogt4if2I+HoA/I2U8v5LRsD3xIsAcCCA/kJKyX0SNXKpQJfQGPMqADwbEH8kpdwT0yBXAV+JdwDgyQD6sJRybyyJ3AUY1Fr7PhE9Flyd3lJK7YshUYiAl/iUiHYFEq8opZ4bVqIwAS9xlIgeCA6754UQLw8jUagAEV1mrT3GN3yBxNNCiIODShQqwJCrq6uVdrvNEncHEvNCiEODSBQu4K9MVwEAS9weSDwqhPgwq8RIBBgyTdPriOgYEd3ahXbO7dJa924I+5EZmQDDtVqtqnOOJW4OJLZrrb/qB57HjFTAb6cXAOClQOBBrfXRS0LAGPMMALwWnA0PK6U+6Rd+pBUwxjwFAG8HsE9IKd/LAj8yAWPM4wBwOMZZUHgPWGt3E1F4uTwgpez1wEVdAWvtTiL6LFj5N4QQ3AcDR2EVsNZuJ6Ivg4Y9pJSaH5jc/7EQgTRN55xzxwPYI1LK3cPCF9LEaZpu8/ATnJCroJTaEQM+d4EkSe4CgOOIWPHAp6SUs7HgcxVIkuQOD88fQzh+mJiYaExPT1+46AWMMVuJiFf+mvVVQjxTLpcbU1NT7ZjwuVTAGLPFw9/g4c/ye1Ip5R+x4aMLWGs3MTwAVH3Dnut0Oo16vd7KAz6qgLVWE9EJALjRw7accw2t9bm84KMJpGm60TnH8Js8LG+XhpTy1zzhowi0Wq3rO50Ow2/xsH+XSqVGrVYr5KPfUCfxysrK1Wtrawy/1cNfGBsbm6lWqz/mvfLd+QcWWFpaurxcLjM8X+/Xwzk3q7U+VRT8wFtocXFxw+TkJMPzSbseRLRDKdW7WStKInMFFhYWxiuVyglE3BZAPiKl/Lgo6DBPZoEkSfiEnevtQcS9Qoje01XREpkEms3mzlKpFD6Q7BdCvFk09MAVWF5eroyPj/ML2s3OuSNa6/ALzEg8/gewF5ZA7hIE8AAAAABJRU5ErkJggg=="

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/*!******************************************************************************************!*\
  !*** D:/Users/somg/Documents/HBuilderProjects/xingdongdaka/static/images/icon/clock.png ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAfr0lEQVR4Xu2dC7xcVXX/v2smAZIIyEMNpaK2IBIFNJFXwQcgRt7vmzmTEAjUYuVRFQxQaMW/WAwPXygVMbGBZM7k8jRYQCPIUwQFhTbYAq0UtFWhFFBCIPfe9f/sfScxCbmz95k5z5mzP5/53OQza6+912+f35z9WHstoSwlAiUCYyIgJTYlAiUCYyNQEqR8OkoE2iBQEqR8PEoESoKUz0CJQGcIlG+QznAra/UJAiVB+mSgSzM7Q6AkSGe4lbX6BIGSIH0y0KWZnSFQEqQz3MpafYJASZA+GejSzM4QKAnSGW5lrT5BoOcJoiFvBd6K8gzwLON4VgYY7pPxjc1MHaTKEFsDWyO8AXhSAp6MrYGcKuoZguggU1jFABXeYgnxx8+GoH/OkkV4BmUhyg1S59mcjlHq3dJBJjPECVQ4BLVkMMTYcoyOGJKMfkb4L8azSAZ4IvVOJ9RgoQmyFikOA97TBUbLqTIgAzzahY6eqGoxHWYQeGcXBv0IoUmFW4pOlkISRJvMQQmAA7oYxPWr/kQCdo9RXyFVaZMHUHaLsfO3IFwjNb4do87UVBWKILqYaQjnIBydCELKrlLnkUR0F0CpNggQGol0VbkO5UKZyYOJ6E9IaSEIolcwns04GzgHmJAQFkbtvhJwR4L6c61aF3M+FT6TYCdfBi7kRb4gJ7MqwXZiU517gmiTw4GzUfaMzeqxFZUESZYgo8gLPwa+IDW+k8KYdtVErgmiIccBV3VloX/l5yRgK3/x3pPUQbZlmF+lZpnwCanxldTa66Ch3BJEQ/4KuKIDmzqrMsJnZSbnd1a5d2qlMM1aH6xLJODTeUUwlwTRpp1SXZgSaGb/fmFJjj+irSGfQZiLMjGlMVgiAbWU2orUTO4Iog0WIcyMZMW6wg8iXIvylP2M4ykZ4CldxGZMYDOG2YwhNkfY2E6H+3hR3g5jHWQCw+zRWjOsBF5AeYFVvMDWDLGC7VjFdgjboWwHHNvl2cmtEnBgF+OeSNVcEUQbDCIW6KjlMYSbGCbM8zaiDrIlw+yCMAFlk9aO3AT7/xHM301QhoCXEVbYv6s/ysus4gk5nqeigpOWvC5mdyocARwJvKODdhdIwEkd1EusSm4IoiGfBL4Y0dJnUS6WOhdFrJe4uDbYhQo7M2IJsTOwC7Bt1w0Lz6P8C9jzmkfsv4d4RGbzUte6Y1SgDeYidm1h3FT8i3CQ1LjFv0KykrkgiDbYC+FHEU1dQJWLZIB/j1gvEXFrA+yHsJ/9m3ZRewC3DOUOlPtkFi+m3YX129NBdmSYucCJkfpSZYe8uKjkgyAh/xpp/qocI3WuiwR6zMJ6NdtTZX/gAwjvj+XtEFcflREqLGPYnjfcJzP5XlyqO9GjTY5FrX+XXxF+ILVY3Yj82t2AVOYE0ZBvQaR5554ScH/HFndRsXVOcDDKIQgHA5Uu1KVZdTmwFGGp1CxpUi+RSaJcJnVOT72j6zWYKUHsKblyozcIw7xZZqV4kAXoQrZiYwwpDCEOgdS2Pr1hiSh4N2o3NJbKcelOT1uewoasfkU4IuvT9mwJEtpX/4d90BLjRpdi0UHexhAnIXb+vE2KTafZ1HzA7BxFXf911UcNUU8F35eA6Z6yiYil+tCtbYE2qaGEnladLAHf9JTtSkyb7GSnfCOWHK/vSllxKjdQ5kud29PosoZ8EPihV1tCIDWaXrIJCGVJkDtRu7htX5TFUmeWS6zb7zW0F67MHrz5mDOKfizXM8J8mcnNSRvv7dIi3CU1PpB0f8bSnwlBtMEchAUeRt8vQbJevLqYLahwFthPmsUcBJqPOb9Y/W/zdzzKJMSudSat9e9qip0LEeZJjYeTbFND+xYxbxPXj+SJUs/mwlU2BAl5ADxurSW8SGt5CxtidHO91DW8y1EetZ8qy6mwvJOrvTb4RIUpKO9EmdLqs/k7ydWBjr4Xfg/M403Mk33t6X7sJcImTWa3PVMniDbsYdptHmjfJgEf8pCLLNK6mXhWh24t7dozp9sPIzyI8uM0tqO1ydsZYRoVpqH2xqX5u2lkUMauYLbU50nADTHqXKNKQ34A9jzJ9Rb5oNS50yUW9/dZEOQChHOdhgizpMZip1xEgdbc15zuxnEz8RWEJfYQbGN+Ikfxu4jdiV1cb2Zj/sBUhjgaYQB4c0yNLGAV58jseG3UJjNRFnn08e8l4HMecrGKpE+QkJ8C0xxWxL720MW8hQqXAMfEgKDxgRpkHEvy4hKxIZusB3OVGWA/7l9pFzDKz4Ez4t7t0tAeXo56Do9dEptRtGs0VYLYLVQzF3eXv5GAr7rF/CQ0tId8hhydeJiu3chS4GoJuNav5fxIaYMPUCFA7bnO+C56ZtYjZ8Q8Pj6OqkNU2UwGrIdzaiVdgjT4BMKXnNYJU6TGL5xyHgIa2t2pL3iIji2idh9+gdRZ1pWeHFTWJu9qkcQQZfMuunQlEzlDDreL+a6KNtkNtRs37cswh8osvusSi/P7dAkSchfwPocBd0jAvt0aqT9kHL+xW4PdnKEsoMICmcG93fYnb/V1MX9GlRNbZOnUU+A+qpwmA92H8tEmj6Ns78DpSxLwqTSxTJsgPi4G50rAP3QDgs5nUybahZ+JuNhJWUqFi3qRGOuDoaFdxJtNi1M7AQr4H+BjEmCmnx0XDfkn4Pg0fjyjdDKPBNlNAruQ76joVbyR8XawXIu+1+pX/h3hIgm8DjE76l9eK2mDA1oXnDqLVqmcIHUWdmqfhnwUnO5EscwuovQxXYI0WYpyaJsOdrV7pYNsx7C9bbdZFBCsrHARI/Z2Yl8HsdYmp6L2jRJ9e1g4TWp8LTL2xmv6OrbhVfvD+Cdj1le+JXVLpNRKugQZ3U0ae5HVRegdHeTdDPOzDpD7GcpZvbAA78D2DVax6xPzg9FJiFflb6XeWUQap39WhYNlRvJ+YmuDkipBTMOtizNfXueXwgQoGObiTkPv6CL2pMp9HTwgC1rk6Ou3xli4aYNzES7oANdTJeDrHdRjjJBDT5owRFLjmk50dlMndYJYknybTdiEExhhMhUeA34hQUe//kS+hDM6nTJOgWd1Oh3oBvCi1dXFHESFecC7IvW9wkdkRmdXfa1ntXGZGeZPqfAkzxDK6bwSqf2YhDMhSEx9N782b0ZsZI8o9zZ+RoXT+mGHKjacr2Ybqnwlsu+akon/VFx2j/6WFrToDbyeldwT0RPXRG6fLQFPF9TsTLvdUdyyEfaQmR6HgJlaNnbjhSSIzZc3bGMnRdmSvIOVHChzMFECy9IhAh2Q5HGqHC0DdnexcKWYBGnwDYSTI6Cd+v55hL4VTlRD66FwQoSO38dEpsfhlhKhzVhEC0eQ1j79ZRGsv0cCp3tLBHWlqEHAuSX7WpiulMBG7C9UKRRB7GV/4VZ0NPC0R1kuQcTdFw+lpcgoAh2QJFYv7TTGoTAE0YbNz32rx12S1bjlnhytK7/mV3XHVqdNGNVvSsDVaQx+HG1EJMkQyvS475PEYcdYOopDED9ntjXkYHSLMbcHgG0jDQoDWRyKdfqgaYOvIpzmVd9cuhpietw3E73a7kCoEASJuO7Ifc5zXcTOVB3ZdIfZRWYVZ+dHG5hIKL5JcHKX5qCwbxAbzQPuBv7U6wegixNcL/0xCGlod4BcecPnSGBdwAtR1BwmjuP7EU7cj0oqEEScgOX+DaIh/2juG3gZLZwjtS5vD3o11J2Q17y9C8fN7nrXee2WW8o/e2q4n8nsk1RIIc8+OMVyTRBdwkGM4Av4oAQ2OEHuS68SxAAfycFROE9qfD7PA5ZvgjTxC08Kj5sg2BLwZJ7BXt23XiZIiyTXernKjwane1/SERy7eSZySxBt8mnUO7VaIeazfUMQc5+kgvF787l0FUpAvZuHOMm6uSSINniTjU7ol9OvMDsi/UIQ+xYZvZno5/EwwsFpBMzuhEh5Jcg5iFfghmepsk9e8hT6DkCvT7HW/BCEdlfLx6H0egk42he/NOVyR5BWNMCHgD93AjF6VTZ3GW5d/e4bgowGgjAkcRdl/zyesOePIP7poO+VgH3cyOdPol8IYqdaoZ1m+YQUakjAzLyNVq4IooNsxDDm7eGTjuDwbmMxZTUYfUYQs1A3EeJ9gtPtnXY6ONczkC+CNPlrlMtdnUb5ntT5iFMupwL9RJDWgv0C1COiP8yXgL/M07DliyCh/aXZ3QmQMkPqEfJuOxWmK9B3BBnd9jUzA3cs4CHekXb23XajnxuC2OjjYvfOXeVuCTxyG7q0ZPh9vxGktRb5ImCiuLcvylypc7FLLK3v80OQJpegnOFheKGc+DZkT18SZDSqvHmLuFIv5OoHMBcE0fOpsCP/BuzQliDKg1LnvR4kyrVIPxKktRb5BuoRS0DYS2o2qU7mJR8EaXAE4pEDTzlP6vl2bvMZ0b4liP+5yIUS8Lc+WCYtkxeCLECY4zRW2Flq/KtTLucC/UqQ1lrETLNMTvp2JTfXpTMniD05r/CfCFu1hUy4WWo2+HXhS18TZDFmQv0Z5yDm5OJb9gRZzHQqNhhD+6J8TOpc4RIrwvd9TRATdxe7WHeN9+elznkusaS/zwNBfH5RXmCIneQ4m82o8KWfCdKaZvk4Md4pAR/MerCzJ0jIbcB+DiAKc1vQZ0C9CALnS8BnffQVTUabfArlUke/R1jJVjKH57O0L1OCtDx3X/AAoHABx9rZ1PcEWcLejNjA465p1pFS50aXWJLfZ0uQJUxnxGP9UeW9cWRSTRLIKLq9CFLAoA2RMAj5DfCmtnWEL0vN4/Q9SsMRZbMliN/p+W8lYHJEu3ItXhLEBndYirTNV2mSc/xcas4t4UTHOluChPa01JWN9loJODZRFFJWXhLE3hM5Ezx8rqpMlAFeTnmI1jSXNUH+F9jSYXxPrT/sLo7PWUCvT7GaTEVt3AHXOmRXqTuiULp0dPF9ZgTRQbZkGEOQ9kXYXWr8xCVWpO9LgoyOlob8AZjkWIccLTWuz2p8syNIaKdWboe0VbxOZvNSVgAl0W5JkDUEeQDYrS3GFc6SGdnFHciOIE1moixyPIBPSsDbknhIs9RZEmQNQdyZqpRvSZ2PZjVe2REktP4457c1XLlZ6r3hf7W2nSVBWgTxCw6Yafq87AjSYBHiiGKhXCx15mb165FUuyVBWgTxi738awk8I/snMGDZESS0J6l7O2wq/O3BDdlXEmTNFMuktvil87l+kY3kZFY55RIQyJIgjwI7OWx6vwQ2N0hPlZIgfxxODRkCqo6p9mSp89ssHoIsCeLjajBNah6u0Vkg10WbJUHWIkiDFxE2bQunMEVq/KILyDuumiVBXnVe4Fd2krq9q95TpSTIOm8Qc4WhvStRhX1kBvdm8RBkQpAIXrzbScDTWQCTZJslQdYhyBPOOMwVDpMZ3JTkmIylOxuCjOYddC/OXmVrOd7jtD0L5Lpo04sgo1vgd3bRTNdVJfCKU9ZVO9rgEYSdHUoy26zJhiC+fjgrmSBzWNnVCOSwsidB8tDzZ4AbJPAI1dNhbzXkPmBPxxrkDKlhAs+lXrIhiO+FmSrjZIDh1FFJuMECEWQNEhKQyLOiIXeZNGwOgmSWyzARo13Ply5iClWWu+RYwWZyks1j11OliARBuUbqDMQ9EBryU2BaW73KKVL3CGoed+cwV1IyKDrIZIY9AjAome1/JwlLIQkCT0vAdnHjoiHu8zAhkBrNuNv20ZcNQb7KxrzBY21R5c9kwGMx72NpjmR0CXMZYV6OuuTTlZclYKKPYBQZDW1m4rc4pljTpeaZqSpK4x6ymRDE9MvrLoDyLql7TMU8DM2TiIY2n3smv4hd4PCIBOzaRf0NVtUQsxGwtYMgmd0JypIgTznTBI+wh8zE3BnoqaImeJpwDxr/L3KCQH1NAk6LW7+G9q5P+zeTsL3U+I+42/bRlyVBHgZ2cXRy3zT24n2AiltGQxsU7Ydx601EX0IL9NZMQp19rrKVDPCcUy4BgSwJYh6O9pHzhFOkls3uRQJYv0alDrI5Q3wO4UBg+zTajNjGLcAiCWhErOclroNMYdg9hU5qi9mnk9kRpMGViCMfnXK51DnFx5BSpngIaJNjUWcqvSckcOSNSdD07Ajit5OT6W2yBHEvVY9u1LhvlcItEnBQVoBlR5AmR6Fc5zD8GQl4Y1bglO0mi4A2GEQcMc+Uy6TO6cn2ZGzt2RGkwS4IZqHevlR5owzYrcCy9BgCGtpkSO9sa5ZwutS4LCvTsyPIIBMYZoWH4T27k+Vhe0+LaIh7B0s4SGqYzYJMSmYEMdZqyK+AbR2W/70EfC4TdMpGE0NAQ/YHfuBsoMoOMoC5M5JJyZog7q1eWCYBH84EnbLRxBDQ0CZjdSbqzHKL1xifLUEanI1woWMUVrI5r5eDeCWx0SoVp46AhvaQ1JVB6nYJ7Jsms5ItQUKb89wdd1fZX+rcnhlKZcOxIqBXMYnxduNlQlvFOUj7nSlBWusQd3QTKNchsT6i2SrTJgei3OzshfIXUrc3DjMr2ROkwUKE2Y5fku9JnY9khlLZcKwIeN6HyTSi4mqDsydIyF+BR3pnYWep2X3zshQcAQ1trDOTDnrsooRSp561qdkTpMm7UP7FCUQO5qPOPpYCTgS0wQGIx+Un5WNS9/jhdLbYnUDmBGmtQ9yRLeABCZzp2rpDo6ydOAIa2lPxUx0NjTDEjnJcducfuZliWYI0ORflAo/RKU/VPUDKq4hewUQ2s5Ey3+yYXt0kdQ7Lgx35eIMs5t1U+JkHIF+SgE95yJUiOURAm9RQQo+unSwB3/SQS1wkFwRpvUVuR9nXYfGvWcVUmc3vEkembCB2BDTkO+B8M6ygyttlgF/H3oEOFOaHIA3OQLjEaYNwjtT4glOuFMgVAt6LcxiUwAa1yEXJE0HegXiFuH+cKlNlwGZILUtBENAGIULN2V3heKlxlVMuJYHcEKQ1zVqKcqiH7T2XO93D5sKKqG+oWfhvXmWXPAUszxtBDkG9wtw/TI2pIowU9qnpo45ryHzgRKfJI3xWZjoSuzqVxCuQK4JEeosIp0mNr8ULR6ktbgQivT024r1ytEdI2rg72UZfHgni+xYxiXX27sUEOymOf+JNee5cQQ7fHgac3BEk0lsEEon2l/hT0ycNaGinVWZ65Sr/TQ7fHnkmiO9bBJQPS51lrhEov08XAW3YeLv3IOzobDmnb4/cEqT1FrkR5XAnuOWVXA+I0hfRJvNQ5jpbFp5iPHvmbe2xut+5nGJZggyyF8PcA1ScICtnSp1LnXKlQCoIRDgUNJP8XIeXzS1BLElC/gE4xzmqard7Dyiv5TqRSlzATq1G3dnb3/cY7cmtEti4xLkt+SaICe48wt2oMwuqWYs8iHKAzOT/cot2H3TM+8xjFIvce2fnmiCttchMlEWez9aVEtgbimXJAAFtcirqGQVRuFRqnJlBNyM1mXuCtKZaJhuTnwOb8HGp8Y+RUCiFu0bAHggq3/dMCvQYVfYpQkjZYhCkya6o3cp9g9dICgNS4xov2VKoawQ0tBegjCu7z7rDtDdbAq7uuuEUFBSCIK23iO+h0yhsypFS58YUMOzrJvTbbMImNnauKwjcKE7CV6TGJ4oCWmEIYp/5Bl9H+Lg3uCO8R2byc2/5UjAyAp4RElfrvYfJHCD7emQ4jtyTZCoUiyDz2ZSJdqq1hzccK9lC5vC8t3wp6I1ARHK8TIUDZAb3ejeQA8FCEaQ11TKvckOScd74vY5JcqhXqgVvlf0uqCF3A/tEwKGQd3gKR5DWVMvveu7aozfCW2Um/xVhQEvRMRDwSnyzdl3hKqlxfBEBLSRBWm8ScxckaoLP3STgp0UcqDz0uXVKfoczK9S6nV3KZI6WfRnKgw1R+1BYgrRIcj1wZCSjM85YFKmvORJupWwejEiO+1nBAXISv8+RKZG6UmiCtEhyP7B7RKvLw8QIgOkSpjNinUHb5xNcV+eLrGKHoodoKjxBWiTxSeW2/iNxJSOcVfputWeKNjkbdSY5eq2SKm+RAZ6KwMNcivYEQVokcSeEXH8IjIMjzC29gF/7bGrIW4F5wEDkJ7fKe2SgN86feoYgLZI8CuwUaUBHXeUNScr7JC3gNLTrOkOOHSJhaYSH2Utm8ePI9XJaoacIYknS5FqUozvAexnKxf18fVcH2ZFhewvQHaJnfYCF56mwtwxgfqR6pvQcQSxJGnwJ6djfx2wfX9Rv0VK0wVyET4O9Sx61LAcO7EXMepIgremW323EDT8KTyNcxAwu7/XgdBraYNLmrbF3VFa05JexCQNyZG+68/QsQVpvkk/bB73z8jCwgCoLei0WsDbs4vtEhOkdw6NcwThOkQGGO9aR84o9TZDWmsTceb4EZUoXY/E4wgJeZUHR9/U15ITWGuN9HeMhNmf9mf0Q2bLnCdKabpkLPSa1QvQty3WfIpOzwpwmL5UA43JRiKImD+SIDaF0JMK0LjtttsbPLJL93djbFwRZDZCG/B3w/7oBbK26D6AspcJ38ph9V69mG6ocRoXDUA6KyeaFjIZYejYmfblX01cEsW+TxRyOcBbCXrGNjvA9lAeA+1nJbTInmwtBOsg0hu1i23zM2mLzmGz8FcK8fphSrY9X3xHEkuR8KrzdkuSsGB+iUWzN/HyULGYKdjtVlicRnECvYhIbMQW1RDfrCfN5U0yEWFvNN8yhoQQ8mYDu3KvsS4KsmXItYmcqligzEx6pZ4DlKI9Saf0dYQXCS4xjBUOs4GVWsCkreInxVOzDPxFlEpXWX/jz1kbDOxG74WBcQZIrwl32rTGDm5NrJP+a+5oga61NZqCYLeFuF7D5H3F3D3/dCqxwsVu09yVKgqw1xtpgDmLdLKJcJe2Vp+Q/UJuqYIHU+W2vGNWtHSVBNoCgzecNJ6F8qFuAC1DfuInMZ5j5MosXC9DfVLtYEqQN3LqEIxjhJOCQVEclncYeQPgnKsyXAV5Np8nitVISxGPMtME7gIOpcDDKvh5V8ipiPAKWMsJNUufOvHYyT/3qC4JoaOP6HgO8ADzAMM1OpxO6mHdTtUQxb5U98zSYG+yL8r/m5N9+HmOpnB89M7A2ORZ4P/AnDHOXzOQrubc7pg72NEH0erbiFRbaX/91ywpzutztr6iOxgz+AML77d/OXMVjGsp11Nxu00bAfSj3dfxjsJCt2IjbgV3W0T561rOfBPwoic7nSWdvE6TB/cjYAR0kiDeJaSvl8X6A+ZjbeNumMNjPAWbqZPIBLmNV54RYv68asmRM/zXh91TYVQb4ZQo2ZtZEzxLEM0deotH+dJAJDLEDFbZH2J5hdrB/YUtgi9bfSW1GfxVgCDD6UZ5ELBmeQHmCKo/LgP0u9qJN9jRvH4fi3GeI6haYniRI6061iZnVvihNqRO4xJL8Xr/KxkxmC15lS8azBcrLKM8xzHOdTo3i6K+GNiifuV3pKp+VgPNdQkX9vucIYr1Yx/EQMNk5KMLFUvPIxOpU1HsCupijqHCdl2XKgVLnVi/Zggn1HkGa3IByhOc4HCIB/+wp21dirTCjxofMp/ySTZjai9due4og2uBsxDvI2UMSlL5X7Z5+Dfkm8FEfhgChBNQ9ZQsj1jME0dBmOPqhN/LCNKnZqVhZxkBAB6kybDFad5t3bMQS3fTIYqB6giCtNGBmIP2CximnSJ3LswC8aG22tq7vidDvPSXAxEvuidIbBGmyAGWO54hcLQGzPWVLsdE4Y1HysfTU1LXwBNHQ5kW/wvNJfoxVTJXZvOQpX4q1ENDQZg027jruIlwutci5W9x6M5AoNEGsq8cIDyFUPLH7kATc5ilbiq2FQGtXy0xjTYQYn1KYVM/tjCk2QUKbEPIvfEYL4Typ8Xkv2VJogwhok0NQbvKE5w+MZ6ocw+Oe8rkUKyxBtMGlCJ/yRPW7EnCop2wp1gYBbXABwrmeIN0mQbEvnRWSINb9Wm0AN59iYjhN7cXAyj7GJyGjIT8A9vfSrXxe6pznJZtDocIRRBeyHRvZxDe+UciPlYBrc4h9YbukTd6O2vORdo6Wf7RPOFRqfLeIBhePIKEFev37HRvGXrhUapxZxIHJe5815DjgKs9+Po0ytYgRGQtFEA3tq/pznoNyrwR9GZ3EE57uxbTJ11E+7qVJuEZqXcdG9moqTqHCEESX8CFGWOZp/HDrF+sRT/lSrEMENLTT3ale1Ufj+hYq1V0hCKKDvK7lE+SXM2+Ek2WmdbQrS8IIaMgeECEnYYV9ZIbdni9EKQZBQq4GZnkiukACG6qnLCkhoIv5Gyp82bO5X0jQVa4Wz2biEcs9QXSQbRnG5EF3F+FRNmOqHGQTvJQlRQQ0pAGetzOVY6TueRkrRRs21FT+CdLAhFYw4LuL8sFuI5W4GyklNoSA3sDreYWHUN7mREi5TOqc7pTLgUD+CRLySeCLHlidLYHN7V2WjBDQBh9BuMWj+esl6ChVt4fqeEXyT5BF7E2V9vcRlBulzpHxQlNq6wQBDW0Ah8+0rSt8Umrea5ZOuhFbndwTxFiqDQYRG91vQ+V3VG18pt/EhkqpqCsEtMGdNpjehssINcaJoF01klLlYhBkNMKfcVPfdT1cTLC0v85jjsCUxi+XzejNbMzzfAtZb+fRBJsb4dAirRMLQZDVT4GOLthNWudXEW6WGu7YV7l8hPqjUxryPpSjELYB7qbKIhmw8ZELUwpFkMKgWna0ZxAoCdIzQ1kakgQCJUGSQLXU2TMIlATpmaEsDUkCgZIgSaBa6uwZBEqC9MxQloYkgUBJkCRQLXX2DAIlQXpmKEtDkkCgJEgSqJY6ewaBkiA9M5SlIUkgUBIkCVRLnT2DQEmQnhnK0pAkEPj//W0jUIfhcV0AAAAASUVORK5CYII="

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map