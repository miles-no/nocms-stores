# NoCMS Stores

Stores for NoCMS forms.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-stores.svg)](https://david-dm.org/miles-no/nocms-stores)
[![devDependencies](https://david-dm.org/miles-no/nocms-stores/dev-status.svg)](https://david-dm.org/miles-no/nocms-stores?type=dev)

## Installation

Install nocms-stores from NPM and include it in your own React build and minification process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install nocms-stores --save
```

## Usage

```js
import stores from 'nocms-stores';
const initialValue = { name: 'Jørgen' };

const handleStoreChange = (store, changes) => {
  // do something
};

stores.createStore('my-store', initialValue, handleStoreChange);
```

### `createStore(name[, initialValue, func])`
```js 
createStore('my-store', { name: 'Jørgen' }, handleChangeFunc);
```
This creates the store assiciated with the given name, `my-store` in the example.
You can optionally pass an object containing values that the store will be initialized with.
Use the final argument, `func` for your convenience to subscribe to store chsnges.

### The callback function
```js
const handleStoreChange = (store, changes) => {
  // do something
};
```
The callback functions are invoked when a store is updated, using the `update` function.
The store argument contains the entire store and all it's values, whereas the changes argument
contains the values invoking the change.

### `subscribe(name, func)`
Listen to changes on the given store, meaning that the callback function, `func` is invoked
for every update.

### `remove(name)`
Delete store and unsubscribe all associated subscribers.

### `getStore(name)`
Returns the store with the given name.

### `unsubscribe(name, func)`
Detatch a subscriber function from a given store. The store itself is not changed.

### `update(name, obj)`
Update one or more fields in the store with the values from `obj`.
```js
let store = stores.getStore('my-store'); // { name: 'Jørgen' }
stores.update('my-store', { role: 'developer' });
let store = stores.getStore('my-store'); // { name: 'Jørgen', role: 'developer' }
```

### `clearStore(name)`
Delete the values in a store. The store is reinitiated with an empty object and subscibers
are notified with the change.
```js
store.subscribe('my-store', (store, change) => {
  // store = {}, change = {}
});
store.clearStore('my-store');
```
### `clearAll()`
Delete the values of all stores. Can be useful if a user changes her context by logging out, etc.

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).
