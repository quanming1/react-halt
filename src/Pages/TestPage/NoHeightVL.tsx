import React, { useEffect, useMemo, useRef } from "react";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

interface NoHeightVLProps {
  presetHeight: number;
  list: any[];
  bufferSize?: number;
  style?: React.CSSProperties;
}

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
  const getAboveCount = () => Math.min(state.startIndex, bufferSize * getVisibleCount());
  const getBelowCount = () =>
    Math.min(list.length - state.endIndex, bufferSize * getVisibleCount());

  const visibleList = useMemo(
    () => list.slice(state.startIndex - getAboveCount(), state.endIndex + getBelowCount()),
    [state.startIndex, state.endIndex],
  );

  const startOffset = useMemo(() => {
    if (state.startIndex >= 1) {
      let size =
        state.cacheItems[state.startIndex].top -
        (state.cacheItems[state.startIndex - state.aboveCount]
          ? state.cacheItems[state.startIndex - state.aboveCount].top
          : 0);
      return state.cacheItems[state.startIndex - 1].bottom - size;
    }

    return 0;
  }, [state.startIndex, state.endIndex]);

  const findStartIndex = (scrollTop: number) => {
    let start = 0;
    let end = state.cacheItems.length - 1;
    let tempIndex = start;

    //二分法查找
    while (start <= end) {
      let midIndex = Math.floor((start + end) / 2);
      let midValue = state.cacheItems[midIndex].top;

      if (midValue === scrollTop) {
        return midIndex;
      } else if (midValue < scrollTop) {
        start = midIndex + 1;
        tempIndex = start;
      } else {
        end = midIndex - 1;
      }
    }
    return tempIndex;
  };

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const startIdx = findStartIndex(scrollTop);
    state.startIndex = startIdx;
    state.endIndex = startIdx + getVisibleCount();
  };

  const updateCacheItems = () => {
    const nodes = [...document.querySelectorAll("." + styles["item"])] as HTMLDivElement[];
    nodes.forEach((node) => {
      let rect = node.getBoundingClientRect();
      let height = rect.height;
      let index = +node.id.slice(1);

      console.log("index", index);
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

  useEffect(() => {
    state.endIndex = state.startIndex + getVisibleCount();
    state.cacheItems = list.map((_, index) => ({
      index,
      top: index * presetHeight,
      height: presetHeight,
      bottom: (index + 1) * presetHeight,
    }));
  }, [presetHeight]);

  useEffect(() => {
    updateCacheItems();
    state.phantomHeight = state.cacheItems[state.cacheItems.length - 1].bottom;
  }, [state.startIndex]);
  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      style={style}
      className={styles["no-height-VL-container"]}
    >
      <div ref={phantomRef} style={{ height: state.phantomHeight }} className={styles["phantom"]} />
      <div
        style={{
          transform: `translate3d(0,${startOffset}px,0)`,
        }}
        ref={listRef}
        className={styles["list"]}
      >
        {visibleList.map((item) => (
          <div id={item.index} key={item.index} className={styles["item"]}>
            {JSON.stringify(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
