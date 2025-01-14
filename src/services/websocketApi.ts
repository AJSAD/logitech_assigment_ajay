import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "lodash";
import { addChannel, removeChannel } from "../slices/channelsSlice";
import { resetOrderBook, throttledUpdateAsks, throttledUpdateBids } from "../slices/orderBookSlice";
import { RootState } from "../store/store";

const worker = new Worker(new URL("../workers/websocketWorker.ts", import.meta.url));

let isConnected = false;
let pingInterval: number | null = null;
let socket: WebSocket | null = null;

export const websocketApi = createApi({
  reducerPath: "websocketApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    subscribe: builder.query({
      queryFn: () => ({ data: null }),
      
      async onCacheEntryAdded(
        msg: string,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch, getState }: any
      ) {
        if (!socket) {
          socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

          socket.onopen = () => {
            console.log("WebSocket connected");
            isConnected = true;
            if (msg && socket) {
              socket.send(msg);
              console.log("Message sent:", msg);
            }

            pingInterval = window.setInterval(() => {
              if (socket?.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ event: "ping" }));
                console.log("Ping sent");
              }
            }, 30000);
          };

          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            worker.postMessage({ type: "processMessage", payload: message });
          };

          socket.onerror = (error) => {
            console.error("WebSocket error:", error);
          };

          socket.onclose = () => {
            console.log("WebSocket connection closed");
            if (pingInterval !== null) {
              clearInterval(pingInterval);
              pingInterval = null;
            }
          };
        }

        if (isConnected && msg) {
          socket.send(msg);
        }

        worker.onmessage = (event: MessageEvent) => {
          const { type, payload } = event.data;
          const state: RootState = getState();
          const throttle = get(state, "orderBookSettings.throttleSettings.throttle", 100);

          if (type === "updateBids") {
            throttledUpdateBids(payload, throttle)(dispatch);
          } else if (type === "updateAsks") {
            throttledUpdateAsks(payload, throttle)(dispatch);
          } else if (type === "subscribed") {
            dispatch(addChannel(payload));
            dispatch(resetOrderBook());
          } else if (type === "unsubscribed") {
            dispatch(removeChannel(payload.chanId));
          }
        };

        await cacheDataLoaded;
        await cacheEntryRemoved;

        socket?.close();
        if (pingInterval !== null) {
          clearInterval(pingInterval);
        }
      },
    }),
  }),
});

export const { useSubscribeQuery } = websocketApi;
