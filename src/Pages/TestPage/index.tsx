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
      data: faker.lorem.sentences(getRand(40, 100)),
    });
  }

  return data;
}

export default function TestPage() {
  return (
    <div style={{ padding: "30px" }} className={styles["test-page-container"]}>
      <NoHeightVL
        style={{
          height: "600px",
          width: 400,
        }}
        presetHeight={500}
        list={getData(200)}
      />
    </div>
  );
}
