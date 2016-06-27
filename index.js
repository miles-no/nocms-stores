const events = require('nocms-events');
const stores = {};

const subscribe = (name, func) => {
  events.listenTo(`store:${name}`, func);
};

const unsubscribe = (name, func) => {
  events.stopListenTo(`store:${name}`, func);
};

const createStore = (name, value, func) => {
  let initialValue = value;
  let cb = func;
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

const remove = (name, func) => {
  delete stores[name];
  if (typeof func === 'function') {
    unsubscribe(name, func);
  }
};

const getStore = (name) => stores[name];

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
  events.trigger(`store:${name}`, stores[name]);
};

module.exports = {
  createStore,
  remove,
  getStore,
  subscribe,
  unsubscribe,
  update,
};
