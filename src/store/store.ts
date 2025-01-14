import { configureStore } from "@reduxjs/toolkit";
import { websocketApi } from "../services/websocketApi";
import { channelsReducer } from "../slices/channelsSlice";
import { orderBookSettingsReducer } from "../slices/orderBookSettings";
import { orderBookReducer } from "../slices/orderBookSlice";

const store = configureStore({
  reducer: {
    [websocketApi.reducerPath]: websocketApi.reducer,
    channels: channelsReducer,
    orderBook: orderBookReducer,
    orderBookSettings: orderBookSettingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;