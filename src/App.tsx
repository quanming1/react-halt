import { Provider } from "react-redux";
import { persist, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router";
import router from "./Router";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}
