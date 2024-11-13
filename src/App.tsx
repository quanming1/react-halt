import { Provider } from "react-redux";
import { persist, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router";
import router from "./Router";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (location.pathname === "/") location.pathname = "/test";
  }, [location.pathname]);
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
