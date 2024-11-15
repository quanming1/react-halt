import Demo from "./Demo";
import TestPage from "./VL";

const showVL = true;
export default function Index() {
  return showVL ? <TestPage /> : <Demo />;
}
