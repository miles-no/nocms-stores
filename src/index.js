const { listenToGlobal, stopListenToGlobal, triggerGlobal, clearEventGlobal } = require('nocms-events');

const stores = {};

const subscribe = (name, func) => {
  listenToGlobal(`store:${name}`, func);
};

const unsubscribe = (name, func) => {
  stopListenToGlobal(`store:${name}`, func);
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

const deleteStore = (name) => {
  delete stores[name];
  clearEventGlobal(`store:${name}`);
};

const remove = (name) => {
  if (name.substr(-1) === '*') {
    const prefix = name.substr(0, name.length - 1);
    Object.keys(stores).filter((store) => {
      return store.indexOf(prefix) === 0;
    }).forEach((store) => {
      deleteStore(store);
    });
  } else {
    deleteStore(name);
  }
};

const getStore = (name) => { return stores[name]; };

const patch = (name, obj) => {
  if (!stores[name] || obj === null) {
    return;
  }
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] !== 'object') {
      return;
    }
    if (typeof stores[name][prop] === 'undefined') {
      stores[name][prop] = {};
    }
    Object.keys(obj[prop]).forEach((field) => {
      stores[name][prop][field] = obj[prop][field];
    });
  });
  triggerGlobal(`store:${name}`, stores[name], obj);
};

const update = (name, obj) => {
  if (!stores[name] || obj === null) {
    return;
  }
  Object.keys(obj).forEach((prop) => {
    stores[name][prop] = obj[prop];
  });
  triggerGlobal(`store:${name}`, stores[name], obj);
};

const clearStore = (store) => {
  delete stores[store];
  triggerGlobal(`store:${store}`, {}, {});
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
  patch,
};
