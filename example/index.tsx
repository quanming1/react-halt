import React, { useState } from "react";
import { ReactHalt } from "react-halt";

// 模拟屏幕组件
const Screen1 = () => {
  const [count, setCount] = useState(0);

  console.log("Screen1 渲染");

  return (
    <div style={{ padding: 20, backgroundColor: "#f0f8ff", height: 300 }}>
      <h2>屏幕 1</h2>
      <div>计数器: {count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <p>这个组件的状态会被保留，即使它被冻结了</p>
    </div>
  );
};

const Screen2 = ({ text }: { text: string }) => {
  console.log("Screen2 渲染");

  return (
    <div style={{ padding: 20, backgroundColor: "#ffe4e1", height: 300 }}>
      <h2>屏幕 2</h2>
      <p>输入的文字: {text}</p>
    </div>
  );
};

const Screen3 = () => {
  const [items, setItems] = useState([1, 2, 3]);

  console.log("Screen3 渲染");

  return (
    <div style={{ padding: 20, backgroundColor: "#e6e6fa", height: 300 }}>
      <h2>屏幕 3</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>Item {item}</li>
        ))}
      </ul>
      <button onClick={() => setItems([...items, items.length + 1])}>添加项目</button>
    </div>
  );
};

export default function TestOfFreeze() {
  const [activeScreen, setActiveScreen] = useState(1);
  const [freezeInactive, setFreezeInactive] = useState(true);

  const [text, setText] = useState("");

  // 导航栈模拟
  const renderScreens = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

        <ReactHalt stasis={activeScreen !== 1 && freezeInactive}>
          <Screen1 />
        </ReactHalt>

        <ReactHalt stasis={activeScreen !== 2 && freezeInactive}>
          <Screen2 text={text} />
        </ReactHalt>

        <ReactHalt stasis={activeScreen !== 3 && freezeInactive}>
          <Screen3 />
        </ReactHalt>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "Arial" }}>
      <h1>ReactHalt 演示</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          <input type="checkbox" checked={freezeInactive} onChange={() => setFreezeInactive(!freezeInactive)} />
          冻结不活跃的屏幕
        </label>
        <p>当冻结时，不活跃的屏幕不会重新渲染，但它们的状态会被保留</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>当前活跃屏幕: {activeScreen}</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setActiveScreen(1)}>显示屏幕 1</button>
          <button onClick={() => setActiveScreen(2)}>显示屏幕 2</button>
          <button onClick={() => setActiveScreen(3)}>显示屏幕 3</button>
        </div>
      </div>

      {renderScreens()}

      <div style={{ marginTop: 20 }}>
        <p>注意在控制台中的日志输出 - 当组件被冻结时，它们不会重新渲染。</p>
        <p>尝试在一个屏幕上更改状态，然后切换到另一个屏幕，再切换回来 - 状态将被保留！</p>
      </div>
    </div>
  );
}
