import { useState } from "react";
import styles from "./index.module.scss";
import NoHeightVL from "./NoHeightVL";
import faker from "faker";
function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getData(len: number) {
  const data = [];
  for (let i = 0; i < len; i++) {
    data.push({
      index: i,
      data: (i + "_").repeat(getRand(400, 1000)),
    });
  }

  return data;
}

export default function TestPage() {
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  return (
    <div style={{ padding: "30px" }} className={styles["test-page-container"]}>
      <button
        onClick={() => {
          setData(getData(1000));
        }}
      >
        生成数据
      </button>
      <button disabled={!data.length} onClick={() => setIsShow(!isShow)}>
        {data.length ? `渲染${data.length}条数据` : "无数据"}
      </button>
      {isShow && (
        <NoHeightVL
          style={{
            height: "600px",
            width: 400,
          }}
          presetHeight={100}
          list={getData(200)}
        />
      )}
    </div>
  );
}
