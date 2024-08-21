import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { setNameAction } from "../../Store/modules/MainModule/Actions";
export default function TestPage() {
  const { name } = useSelector((store: any) => {
    return {
      name: store.mainReducer.name,
    };
  });

  const dispath = useDispatch();
  const handleClick = () => {
    dispath(setNameAction(name + " test"));
  };

  return (
    <div className={styles["test-page-container"]}>
      <h1>name is :{name}</h1>
      <button onClick={handleClick}>name += test</button>
    </div>
  );
}
