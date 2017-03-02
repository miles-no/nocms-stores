'use strict';

var events = require('nocms-events');

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
//# sourceMappingURL=index.js.map