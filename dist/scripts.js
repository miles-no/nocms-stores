(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var events = __webpack_require__(1);
	var stores = {};

	var subscribe = function subscribe(name, func) {
	  events.listenTo('store:' + name, func);
	};

	var unsubscribe = function unsubscribe(name, func) {
	  events.stopListenTo('store:' + name, func);
	};

	var createStore = function createStore(name, value, func) {
	  var initialValue = value;
	  var cb = func;
	  if (typeof initialValue === 'function') {
	    cb = initialValue;
	    initialValue = {};
	  }
	  if (!stores[name]) {
	    stores[name] = initialValue || {};
	  }
	  if (typeof cb === 'function') {
	    subscribe(name, cb);
	  }
	};

	var remove = function remove(name, func) {
	  delete stores[name];
	  if (typeof func === 'function') {
	    unsubscribe(name, func);
	  }
	};

	var getStore = function getStore(name) {
	  return stores[name];
	};

	var update = function update(name, obj) {
	  if (!stores[name]) {
	    return;
	  }
	  if (obj === null) {
	    return;
	  }
	  Object.keys(obj).forEach(function (prop) {
	    stores[name][prop] = obj[prop];
	  });
	  events.trigger('store:' + name, stores[name], obj);
	};

	module.exports = {
	  createStore: createStore,
	  remove: remove,
	  getStore: getStore,
	  subscribe: subscribe,
	  unsubscribe: unsubscribe,
	  update: update
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else {
			var a = factory();
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {

		'use strict';

		var eventListeners = {};

		var listenTo = function listenTo(eventName, func) {
		  if (typeof func !== 'function') {
		    console.error('Listener to ' + eventName + '  is not a function');
		    return;
		  }
		  if (!eventListeners[eventName]) {
		    eventListeners[eventName] = [];
		  }
		  eventListeners[eventName].push(func);
		};

		var stopListenTo = function stopListenTo(eventName, func) {
		  var index = eventListeners[eventName].indexOf(func);
		  if (index !== -1) {
		    eventListeners[eventName].splice(index, 1);
		  }
		};

		var trigger = function trigger(eventName) {
		  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		    args[_key - 1] = arguments[_key];
		  }

		  if (!eventListeners[eventName]) {
		    return;
		  }
		  eventListeners[eventName].forEach(function (f) {
		    f.apply(this, args);
		  });
		};

		module.exports = {
		  listenTo: listenTo,
		  stopListenTo: stopListenTo,
		  trigger: trigger
		};

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ])
});
;