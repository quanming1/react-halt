import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

interface NoHeightVLProps {
  presetHeight: number;
  list: any[];
  bufferSize?: number;
  style?: React.CSSProperties;
}

const config = {
  showBottom: true,
} as const;

export default function NoHeightVL({
  style = {},
  list,
  presetHeight,
  bufferSize = 3,
}: NoHeightVLProps) {
  const containerRef = useRef<HTMLDivElement>();
  const phantomRef = useRef<HTMLDivElement>();
  const listRef = useRef<HTMLDivElement>();
  const state = useReactive({
    startIndex: 0,
    endIndex: 0,
    cacheItems: [],
    aboveCount: 0,
    startOffset: 0,
    phantomHeight: 0,
  });
  const getVisibleCount = () =>
    containerRef.current ? Math.ceil(containerRef.current.clientHeight / presetHeight) : 0;

  const visibleList = list.slice(state.startIndex, state.endIndex);

  const findStartIndex = (scrollTop: number) => {
    return state.cacheItems.findIndex((item) => item.bottom >= scrollTop);
  };

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const startIdx = findStartIndex(scrollTop);
    state.startIndex = Math.max(startIdx - bufferSize, 0);
    state.endIndex = Math.min(startIdx + getVisibleCount() + bufferSize * 2, list.length);

    updateCacheItems();
    state.phantomHeight = state.cacheItems[state.cacheItems.length - 1].bottom;

    const startOffset = state.startIndex >= 1 ? state.cacheItems[state.startIndex - 1].bottom : 0;
    listRef.current.style.transform = `translate3d(0,${startOffset ? startOffset : 0}px,0)`;
  };
  const updateCacheItems = () => {
    const nodes = [...document.querySelectorAll("." + styles["item"])] as HTMLDivElement[];
    nodes.forEach((node) => {
      let rect = node.getBoundingClientRect();
      let height = rect.height;
      let index = +node.id;

      let oldHeight = state.cacheItems[index].height;
      let dValue = oldHeight - height;
      //存在差值
      if (dValue) {
        state.cacheItems[index].bottom = state.cacheItems[index].bottom - dValue;
        state.cacheItems[index].height = height;
        for (let k = index + 1; k < state.cacheItems.length; k++) {
          state.cacheItems[k].top = state.cacheItems[k - 1].bottom;
          state.cacheItems[k].bottom = state.cacheItems[k].bottom - dValue;
        }
      }
    });
  };
  useLayoutEffect(() => {
    state.cacheItems = list.map((_, index) => ({
      index,
      top: index * presetHeight,
      height: presetHeight,
      bottom: (index + 1) * presetHeight,
    }));

    state.phantomHeight = state.cacheItems[state.cacheItems.length - 1].bottom;

    if (config.showBottom) {
      setTimeout(() => {
        containerRef.current.scrollTop = list.length * presetHeight;
        state.startIndex = list.length - getVisibleCount() - bufferSize;
        state.endIndex = state.startIndex + getVisibleCount() + bufferSize;
      }, 0);
    } else {
      state.endIndex = state.startIndex + getVisibleCount() + bufferSize;
      bufferSize = 100;
    }
  }, [presetHeight]);

  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      style={style}
      className={styles["no-height-VL-container"]}
    >
      <div ref={phantomRef} style={{ height: state.phantomHeight }} className={styles["phantom"]} />
      <div ref={listRef} className={styles["list"]}>
        {visibleList.map((item) => (
          <div
            id={item.index}
            key={item.index}
            style={{
              wordBreak: "break-word",
            }}
            className={styles["item"]}
          >
            {JSON.stringify(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
