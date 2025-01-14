import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "channels",
  initialState: {
  },
  reducers: {
    addChannel(state, action) {
      const { channel, ...channelData } = action.payload;
      state[channel] = channelData;
    },
    removeChannel(state, action) {
      const chanId = action.payload;
      let channelKey;

      Object.entries(state).forEach(([key, item]) => {
        if (item.chanId === chanId) {
          channelKey = key;
        }
      });

      if (channelKey) {
        delete state[channelKey];
      }
    },
  },
});

export const { addChannel, removeChannel } = channelsSlice.actions;

export const channelsReducer = channelsSlice.reducer;