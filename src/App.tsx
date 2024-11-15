import { Provider } from "react-redux";
import { persist, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router";
import router from "./Router";
import { useEffect } from "react";

// import ResizeObserver from "resize-observer-polyfill";
// window.ResizeObserver = ResizeObserver;

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
