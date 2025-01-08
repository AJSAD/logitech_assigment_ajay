import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "channels",
  initialState: {
  },
  reducers: {
    addChannel(state, action) {
      const { chanId, ...channelData } = action.payload;
      state[chanId] = channelData;
    },
    removeChannel(state, action) {
      const chanId = action.payload;
      delete state[chanId];
    },
  },
});

export const { addChannel, removeChannel } = channelsSlice.actions;

export const channelsReducer = channelsSlice.reducer;