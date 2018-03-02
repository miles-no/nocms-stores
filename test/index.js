const test = require('tape');

let sut;

test('create empty store', (t) => {
  t.plan(1);

  sut = require('../lib');
  sut.createStore('foo');
  t.equals(typeof sut.getStore('foo'), 'object');
});

test('create store with initial value', (t) => {
  t.plan(1);

  sut = require('../lib');
  const initialValue = { bar: 1 };
  sut.createStore('foo', initialValue);
  t.equals(sut.getStore('foo'), initialValue);
});

test('store subscription upon creation', (t) => {
  t.plan(1);
  sut = require('../lib');
  const updateValue = { bar: 1 };
  const callback = (store, update) => {
    t.deepEquals(updateValue, update);
  };
  sut.createStore('foo', callback);
  sut.update('foo', updateValue);
  sut.remove('foo', callback);
});

test('store subscription with additonal subscriber, should both be called', (t) => {
  t.plan(2);
  sut = require('../lib');

  const updateValue = { bar: 1 };
  const callback = (store, update) => {
    t.equals(updateValue, update, 'initial subscriber called with correct value');
  };
  const callback2 = (store, update) => {
    t.equals(updateValue, update, 'subscriber called with correct value');
  };

  sut.createStore('foo', callback);
  sut.subscribe('foo', callback2);
  sut.update('foo', updateValue);

  sut.unsubscribe('foo', callback2);
  sut.remove('foo', callback);
});

test('patch store should not change existing data', (t) => {
  t.plan(1);
  sut = require('../lib');
  const value = { field: { foo: 2, bar: 1, baz: 3 } };
  sut.createStore('foo', value);
  sut.patch('foo', { field: { foo: 1 } });
  const store = sut.getStore('foo');
  t.deepEquals(store.field, { foo: 1, bar: 1, baz: 3 });
  sut.remove('foo');
});

test('clear store should update with empty object before removing event listener', (t) => {
  t.plan(1);
  sut = require('../lib');
  const value = { bar: 1 };
  const callback = (store, update) => {
    t.deepEquals({}, update);
  };
  sut.createStore('foo', value, callback);
  sut.clearStore('foo');
  sut.update('foo', value);
});

test('clear all should update and remove all stores', (t) => {
  t.plan(3);
  sut = require('../lib');
  const value = { bar: 1 };
  const callback = (store, update) => {
    t.deepEquals({}, update, 'Store updated with cleared value');
  };
  sut.createStore('foo1', value, callback);
  sut.createStore('foo2', value, callback);
  sut.createStore('foo3', value, callback);

  sut.clearAll();

  sut.update('foo1', value);
  sut.update('foo2', value);
  sut.update('foo3', value);
});

test('patch store should trigger event with the whole field value and the changes', (t) => {
  t.plan(2);
  sut = require('../lib');
  const value = { bar: 1 };
  let hasBeenCalledOnce = false;
  const callback = (store, changes) => {
    if (!hasBeenCalledOnce) {
      t.deepEquals(store, { foo: { value: 1 }, bar: 1 }, 'Store patched');
      t.deepEquals(changes, { foo: { value: 1 }}, 'Store patched with changes');
      hasBeenCalledOnce = true;
    }
  };
  sut.createStore('foo4', value, callback);
  sut.patch('foo4', { foo: { value: 1 }});
  sut.clearStore('foo4');
});


test('removing store identified by wildcard should remove all matching stores', (t) => {
  t.plan(2);

  sut = require('../src');
  const callback1 = (store, update) => { if(update.patched) { t.fail('cleared callback 1 called');} };
  const callback2 = (store, update) => { if(update.patched) { t.pass('cleared callback 1 called');} };

  sut.createStore('foo-1-1', { foo: '1-1', patched: false }, callback1);
  sut.createStore('foo-1-2', { foo: '1-2', patched: false }, callback1);
  sut.createStore('foo-2-1', { foo: '2-1', patched: false }, callback2);

  const result = sut.remove('foo-1*');

  sut.patch('foo-1-1', { patched: true });
  sut.patch('foo-1-2', { patched: true });
  sut.patch('foo-2-1', { patched: true });
  t.pass();
});
