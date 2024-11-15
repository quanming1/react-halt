import { Virtuoso } from "react-virtuoso";
import { getRand } from "./VL";

const arr = Array(1000)
  .fill(1)
  .map(() => getRand(1000, 2000));

const Demo = () => {
  return (
    <Virtuoso
      style={{ height: "400px", width: 500 }}
      totalCount={1000}
      initialTopMostItemIndex={998}
      skipAnimationFrameInResizeObserver={true}
      itemContent={(index) => (
        <div
          style={{ height: arr[index] + "px", backgroundColor: "pink", border: "1px solid black" }}
        >
          Item {index} __ height:{arr[index]}px
        </div>
      )}
    />
  );
};

export default Demo;
