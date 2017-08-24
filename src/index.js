import React from 'react';
import invariant from 'invariant';
import createHistory from 'history/createHashHistory';
import {
  routerMiddleware,
  ConnectedRouter,
  routerReducer as routing,
} from 'react-router-redux';
import document from 'global/document';
import { Provider } from 'react-redux';
import * as core from 'dva-core';
import { isFunction } from 'dva-core/lib/utils';

export default function (opts = {}) {
  const history = opts.history || createHistory();
  const createOpts = {
    initialReducer: {
      routing,
    },
    setupMiddlewares(middlewares) {
      return [
        routerMiddleware(history),
        ...middlewares,
      ];
    },
    setupApp(app) {
      app._history = history;
    },
  };

  const app = core.create(opts, createOpts);
  const oldAppStart = app.start;
  return { ...app, mount, start };

  function mount(root) {
    invariant(
      isFunction(root),
      `[app.root] root should be function, but got ${typeof root}`,
    );
    app._root = root;
  }

  function start(container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(
        container,
        `[app.start] container ${container} not found`,
      );
    }

    // container 必须有
    invariant(
      container,
      `[app.start] container should be defined`,
    );
    // 并且是 HTMLElement
    invariant(
      isHTMLElement(container),
      `[app.start] container should be HTMLElement`,
    );

    // 路由必须提前注册
    invariant(
      app._root,
      `[app.start] mount must be registered before app.start()`,
    );

    oldAppStart.call(app);
    const store = app._store;

    // export _getProvider for HMR
    // ref: https://github.com/dvajs/dva/issues/469
    app._getProvider = getProvider.bind(null, store, app);

    // If has container, render; else, return react component
    if (container) {
      render(container, store, app);
      app._plugin.apply('onHmr')(render.bind(null, container, store, app));
    } else {
      return getProvider(store, this);
    }
  }
}

function isHTMLElement(node) {
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
}

function isString(str) {
  return typeof str === 'string';
}

function getProvider(store, app) {
  const App = app._root;
  return extraProps => (
    <Provider store={store} >
      <ConnectedRouter history={app._history} >
        <App {...extraProps} />
      </ConnectedRouter >
    </Provider>
  );
}

function render(container, store, app) {
  const ReactDOM = require('react-dom');
  ReactDOM.render(React.createElement(getProvider(store, app)), container);
}
