import { combineReducers, legacy_createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 默认使用 localStorage
import mainReducer from "./modules/MainModule/Reducer";

const rootReducer = combineReducers({
  mainReducer,
});

export const store = legacy_createStore(
  persistReducer(
    {
      key: "root",
      storage,
      whitelist: ["mainReducer"],
    },
    rootReducer,
  ),
);

export const persist = persistStore(store);
