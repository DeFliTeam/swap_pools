import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";
import metamasktoken from "./Reducers/metamasktoken";
import swapReducer from "./Reducers/swapReducer"
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["token", "swap"],
  blacklist: [],
};
const reducers = combineReducers({ token: metamasktoken, swap: swapReducer });
const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
}).concat(ReduxThunk);
let enhancedCompose = compose;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancedCompose(middleware),
});
export const persistor = persistStore(store);
