import { useEffect, useRef, useState } from "react";

let preh = 0;
const useResizeObserver = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const ref = useRef<HTMLElement>();
  useEffect(() => {
    if (ref.current) {
      // 创建一个 ResizeObserver 实例
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === ref.current) {
            const { width, height } = entry.contentRect;
            if (height !== preh) {
              console.log("height - preh", height - preh);

              preh = height;
            }

            setSize({ width, height });
          }
        }
      });

      resizeObserver.observe(ref.current);
    }
  }, []);

  return { size, ref };
};

export default useResizeObserver;
