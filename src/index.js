const events = require('nocms-events');

const stores = {};

const subscribe = (name, func) => {
  events.listenTo(`store:${name}`, func);
};

const unsubscribe = (name, func) => {
  events.stopListenTo(`store:${name}`, func);
};

const createStore = (name, value, func) => {
  let initialValue = value || {};
  let cb = func;
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

const remove = (name, func) => {
  delete stores[name];
  if (typeof func === 'function') {
    unsubscribe(name, func);
  }
};

const getStore = name => stores[name];

const update = (name, obj) => {
  if (!stores[name]) {
    return;
  }
  if (obj === null) {
    return;
  }
  Object.keys(obj).forEach((prop) => {
    stores[name][prop] = obj[prop];
  });
  events.trigger(`store:${name}`, stores[name], obj);
};

const clearStore = (store) => {
  delete stores[store];
  events.trigger(`store:${store}`, {}, {});
};

const clearAll = () => {
  Object.keys(stores).forEach(clearStore);
};

module.exports = {
  createStore,
  remove,
  getStore,
  subscribe,
  unsubscribe,
  update,
  clearAll,
  clearStore,
};
