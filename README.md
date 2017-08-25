# dva-react2

[![NPM version](https://img.shields.io/npm/v/dva-react2.svg?style=flat)](https://npmjs.org/package/dva-react2)
[![Build Status](https://img.shields.io/travis/dvajs/dva-react2.svg?style=flat)](https://travis-ci.org/dvajs/dva-react2)
[![NPM downloads](http://img.shields.io/npm/dm/dva-react2.svg?style=flat)](https://npmjs.org/package/dva-react2)
[![Dependencies](https://david-dm.org/dvajs/dva-react2/status.svg)](https://david-dm.org/dvajs/dva-react2)

Unofficial React bindings for dva, with react-router4

# Getting Started

## 安装

```bash
$ npm i dva-react2 --save
```

## 使用

[参考示例](https://github.com/sandwich99/dva-react2/blob/master/examples/basic/src/index.js)

```javascript

import dva from 'dva-react2';
import IndexPage from './routes/IndexPage';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example'));

app.mount(IndexPage); // !!! 此处 api 与官方相比略有改动，将 Root 组件挂载到 dva 实例上。

// 5. Start
app.start('#root');

```

## LICENSE

MIT
