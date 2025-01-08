import { configureStore } from "@reduxjs/toolkit";
import { websocketApi } from "../services/websocketApi";
import { channelsReducer } from "../slices/channelsSlice";
import { orderBookReducer } from "../slices/orderBookSlice";

const store = configureStore({
  reducer: {
    [websocketApi.reducerPath]: websocketApi.reducer,
    channels: channelsReducer,
    orderBook: orderBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store
export default store;