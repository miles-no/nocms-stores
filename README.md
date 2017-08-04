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

```
import stores from 'nocms-stores';

stores.createStore(props.store, props.initialState, this.handleStoreChange);
```

## API

### createStore(name, value, func)
Create a store with the given name and/or default value and/or callback function

### remove(name, func)
Delete store and optionally unsubscribe from the given function

### getStore(name)
Returns the store with the given name

### subscribe(name, func)
Listen to events on the given store by calling the function

### unsubscribe(name, func)
Stop listen to events on the given store

### update(name, obj)
Update store

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).
