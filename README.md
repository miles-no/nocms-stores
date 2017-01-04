# NoCMS Stores

Stores for NoCMS forms.


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
