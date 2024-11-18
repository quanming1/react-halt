import React from "react";
import faker from "faker";
import { VirtualList, VirtualListAlign } from "../../components/virtual-list";

interface ItemData {
  id: number;
  content: string;
}
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
  let i = null;
  if ((i = document.querySelector("iframe"))) i.remove();
}, 10);

const Demo = () => {
  const rows: ItemData[] = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    content: `这是第 ${index + 1} 行内容 ${Array(Math.floor(Math.random() * 5) + 1)
      .fill(faker.lorem.paragraph(getRand(10, 50)))
      .join("")}`,
  }));

  const renderRow = (row: ItemData, index: number, dataset: any) => {
    return (
      <div
        {...dataset}
        key={row.id}
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
          wordBreak: "break-all",
          lineHeight: "1.5",
        }}
      >
        {row.content}
      </div>
    );
  };

  const listRef = React.useRef<VirtualList<ItemData>>();

  React.useEffect(() => {
    // 初始滚动到底部
    listRef.current?.scrollToRow(rows.length - 1, VirtualListAlign.end);
    setTimeout(() => {
      // @ts-ignore
      (window.wraper as HTMLElement).scrollTo({ top: 921e21 });
    }, 10);
  }, []);

  return (
    <div
      id="wraper"
      style={{
        height: 700,
        overflow: "auto",
        border: "1px solid #ddd",
        borderRadius: "4px",
        width: 500,
      }}
    >
      <VirtualList
        className="snfwraperg"
        ref={listRef}
        rows={rows}
        renderRow={renderRow}
        estimatedRowHeight={1230} // 设置一个预估高度
        virtualThreshold={50}
      />
    </div>
  );
};

export default Demo;
