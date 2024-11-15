import Demo from "./Demo";
import Message from "./Message";
import TestPage from "./VL";

const showVL = true;
export default function Index() {
  return <Message />;
  return showVL ? <TestPage /> : <Demo />;
}
