import React, { useRef } from "react";
import { VirtuosoMessageList, VirtuosoMessageListLicense } from "./mes";
// import "@virtuoso.dev/message-list/dist/index.css";

// 定义消息类型
interface Message {
  key: string;
  text: string;
  user: "me" | "other";
}

// 生成随机消息
function randomMessage(user: Message["user"]): Message {
  const idCounter = Math.random().toString(36).substring(7);
  return { user, key: idCounter, text: `Message from ${user} ${idCounter}` };
}

// 消息内容组件
const ItemContent = ({ data }: { data: Message }) => {
  const ownMessage = data.user === "me";
  if (ownMessage) return <></>;
  return (
    <div style={{ paddingBottom: "2rem", display: "flex" }}>
      <div
        style={{
          maxWidth: "60%",
          marginLeft: data.user === "me" ? "auto" : undefined,
          background: ownMessage ? "var(--ifm-color-primary-lightest)" : "#F0F0F3",
          color: ownMessage ? "white" : "black",
          borderRadius: "1rem",
          padding: "1rem",
          height: 900,
        }}
      >
        {data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text +
          data.text}
      </div>
    </div>
  );
};

// 主应用组件
function Message() {
  const virtuoso = useRef<any>();

  // 随机生成初始消息数据
  const initialData = Array.from({ length: 10 }, (_, index) =>
    randomMessage(index % 2 === 0 ? "me" : "other"),
  );

  const handleSendMessage = () => {
    const myMessage = randomMessage("me");
    virtuoso.current?.data.append([myMessage], ({ scrollInProgress, atBottom }) => ({
      index: "LAST",
      align: "start",
      behavior: atBottom || scrollInProgress ? "smooth" : "auto",
    }));

    setTimeout(() => {
      const botMessage = randomMessage("other");
      virtuoso.current?.data.append([botMessage]);
    }, 1000);
  };

  return (
    <div
      className="wide-example"
      style={{
        height: 500,
        display: "flex",
        flexDirection: "column",
        fontSize: "70%",
        width: 600,
      }}
    >
      <VirtuosoMessageListLicense licenseKey="">
        <VirtuosoMessageList
          ref={virtuoso}
          // @ts-ignore
          initialData={initialData as any}
          style={{ flex: 1 }}
          computeItemKey={({ data }) => data.key}
          initialLocation={{ index: "LAST", align: "end" }}
          ItemContent={ItemContent}
        />
      </VirtuosoMessageListLicense>

      <button
        style={{ marginTop: "1rem", fontSize: "1.1rem", padding: "1rem" }}
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </div>
  );
}

export default Message;
