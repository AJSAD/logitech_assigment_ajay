import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { addChannel, removeChannel } from "../slices/channelsSlice";
import { processUpdate, resetOrderBook } from "../slices/orderBookSlice";

let socket: WebSocket | null = null;
let isConnected = false; // Track WebSocket connection status
let pingInterval: number | null = null; // Ping interval reference

export const websocketApi = createApi({
  reducerPath: "websocketApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    subscribe: builder.mutation<void, string>({
      queryFn: (msg, api) => {
        const getState = api.getState as () => RootState;

        if (!socket || socket.readyState !== WebSocket.OPEN) {
          if (!isConnected) {
            socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

            socket.onopen = () => {
              isConnected = true;
              console.log("WebSocket connected");
              socket?.send(msg);

              // Start sending ping messages every 30 seconds
              pingInterval = window.setInterval(() => {
                if (socket && socket.readyState === WebSocket.OPEN) {
                  socket.send(JSON.stringify({ event: "ping" }));
                  console.log("Ping sent");
                }
              }, 30000);
            };

            socket.onmessage = (event) => {
              const data = JSON.parse(event.data);

              if (data.event === "subscribed") {
                api.dispatch(addChannel(data));
              } else if (data.event === "unsubscribed") {
                api.dispatch(removeChannel(data.chanId));
                api.dispatch(resetOrderBook());
              } else if (Array.isArray(data)) {
                const [chanId, updates] = data;
                const channel = getState().channels[chanId];
                if (channel && channel.channel === "book") {
                  if (Array.isArray(updates)) {
                    if (Array.isArray(updates[0])) {
                      updates.forEach((update) => {
                        if (Array.isArray(update) && update.length === 3) {
                          api.dispatch(processUpdate(update));
                        } else {
                          console.error("Invalid update format:", update);
                        }
                      });
                    } else if (updates.length === 3) {
                      api.dispatch(processUpdate(updates));
                    } else {
                      console.error("Unexpected update format:", updates);
                    }
                  } else {
                    console.error("Expected updates to be an array, but got:", updates);
                  }
                }
              } else {
                console.log("WebSocket message:", data);
              }
            };

            socket.onerror = (error) => {
              console.error("WebSocket error:", error);
            };

            socket.onclose = () => {
              console.log("WebSocket connection closed");
              isConnected = false;

              // Clear the ping interval when socket closes
              if (pingInterval !== null) {
                clearInterval(pingInterval);
                pingInterval = null;
              }
            };
          } else {
            socket.send(msg);
          }
        } else {
          socket.send(msg);
        }

        return { data: "WebSocket connection managed locally" };
      },
    }),
  }),
});

export const { useSubscribeMutation } = websocketApi;
