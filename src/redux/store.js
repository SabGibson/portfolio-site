import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./user";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfiguration = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: accountReducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

export default configureStore({
  reducer: {
    reducer: persistedReducer,
  },
});
