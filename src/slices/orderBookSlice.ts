import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderBookState, UpdatePayload } from ".";

const initialState: OrderBookState = {
  bids: [],
  asks: [],
};

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    processUpdate(state, action: PayloadAction<UpdatePayload>) {
      const [price, count, amount] = action.payload;

      if (count === 0) {
        // Remove price level
        state.bids = state.bids.filter((bid) => bid.price !== price);
        state.asks = state.asks.filter((ask) => ask.price !== price);
      } else if (amount > 0) {
        // Update or add to bids
        const bidIndex = state.bids.findIndex((bid) => bid.price === price);
        if (bidIndex > -1) {
          state.bids[bidIndex] = { ...state.bids[bidIndex], amount, count };
        } else {
          state.bids.push({ price, amount, count });
        }
        // Sort bids in descending order
        state.bids.sort((a, b) => b.price - a.price);
      } else {
        // Update or add to asks
        const askIndex = state.asks.findIndex((ask) => ask.price === price);
        if (askIndex > -1) {
          state.asks[askIndex] = { ...state.asks[askIndex], amount: Math.abs(amount), count };
        } else {
          state.asks.push({ price, amount: Math.abs(amount), count });
        }
        // Sort asks in ascending order
        state.asks.sort((a, b) => a.price - b.price);
      }
    },
    resetOrderBook(state) {
      // Clear the order book
      state.bids = [];
      state.asks = [];
    },
  },
});

export const { processUpdate, resetOrderBook } = orderBookSlice.actions;
export const orderBookReducer = orderBookSlice.reducer;