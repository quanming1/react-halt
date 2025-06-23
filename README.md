# React-Stasis

一个用于实现 React 组件"冻结"效果的轻量级库。

## 介绍

React-Stasis 提供了一种优雅的方式来"冻结"React 组件，类似于 Vue 中的 keep-alive 功能。当组件被设置为"冻结"状态时，其内部状态会被保留，但不会进行重新渲染，从而提高应用性能并保持组件状态。

## 安装

```bash
// use npm
npm install react-stasis
// use yarn
yarn add react-stasis
```

## 使用方法

### 基础用法

```tsx
import { ReactStasis } from 'react-stasis';
import { useState } from 'react';

function App() {
  const [stasis, setStasis] = useState(false);

  return (
    <div>
      <button onClick={() => setStasis(!stasis)}>
        {stasis ? '激活组件' : '冻结组件'}
      </button>

      <ReactStasis stasis={stasis}>
        <YourComponent />
      </ReactStasis>
    </div>
  );
}
```

### 使用生命周期钩子

```tsx
import { ReactStasis } from 'react-stasis';
import { useState } from 'react';

function App() {
  const [stasis, setStasis] = useState(false);

  const handleActivate = () => {
    console.log('组件被激活');
  };

  const handleDeactivate = () => {
    console.log('组件被冻结');
  };

  return (
    <div>
      <button onClick={() => setStasis(!stasis)}>
        {stasis ? '激活组件' : '冻结组件'}
      </button>

      <ReactStasis
        stasis={stasis}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
      >
        <YourComponent />
      </ReactStasis>
    </div>
  );
}
```

## API

### ReactStasis

| 属性 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| stasis | boolean | 是 | 控制组件是否处于"冻结"状态 |
| children | React.ReactNode | 是 | 需要被"冻结"管理的子组件 |
| onActivate | () => void | 否 | 当组件从"冻结"状态变为激活状态时的回调函数 |
| onDeactivate | () => void | 否 | 当组件从激活状态变为"冻结"状态时的回调函数 |

## 工作原理

React-Stasis 利用 React 的 Suspense 和一个特殊的无限 Promise 机制来实现组件的"冻结"效果。当 `stasis` 属性设置为 `true` 时，组件会被挂起但不会卸载，从而保持其内部状态。

## 许可证

MIT
