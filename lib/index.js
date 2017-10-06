'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var events = require('nocms-events');

var stores = {};

var subscribe = function subscribe(name, func) {
  events.listenTo('store:' + name, func);
};

var unsubscribe = function unsubscribe(name, func) {
  events.stopListenTo('store:' + name, func);
};

var createStore = function createStore(name, value, func) {
  var initialValue = value || {};
  var cb = func;
  if (typeof initialValue === 'function') {
    cb = initialValue;
    initialValue = {};
  }

  if (!stores[name]) {
    stores[name] = Object.assign({}, initialValue) || {};
  } else {
    stores[name] = Object.assign(initialValue, stores[name]);
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

var patch = function patch(name, obj) {
  if (!stores[name] || obj === null) {
    return;
  }
  Object.keys(obj).forEach(function (prop) {
    if (_typeof(obj[prop]) !== 'object') {
      return;
    }
    if (typeof stores[name][prop] === 'undefined') {
      stores[name][prop] = {};
    }
    Object.keys(obj[prop]).forEach(function (field) {
      stores[name][prop][field] = obj[prop][field];
    });
  });
};

var update = function update(name, obj) {
  if (!stores[name] || obj === null) {
    return;
  }
  Object.keys(obj).forEach(function (prop) {
    stores[name][prop] = obj[prop];
  });
  events.trigger('store:' + name, stores[name], obj);
};

var clearStore = function clearStore(store) {
  delete stores[store];
  events.trigger('store:' + store, {}, {});
};

var clearAll = function clearAll() {
  Object.keys(stores).forEach(clearStore);
};

module.exports = {
  createStore: createStore,
  remove: remove,
  getStore: getStore,
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  update: update,
  clearAll: clearAll,
  clearStore: clearStore,
  patch: patch
};
//# sourceMappingURL=index.js.map