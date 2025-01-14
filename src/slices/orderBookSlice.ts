import { createSlice } from "@reduxjs/toolkit";
import { throttle } from "lodash";
import { Dispatch } from "redux";
import { OrderBookState } from ".";

const initialState: OrderBookState = {
  bids: [],
  asks: [],
};

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    updateBids(state, action) {
      const newBids = action.payload;

      newBids.forEach((newBid) => {
        const existingBid = state.bids.find((bid) => bid.price === newBid.price);
        if (!existingBid) {
          newBid.isNew = true;
        }
      });

      state.bids = newBids;
      
    },
    updateAsks(state, action) {
      const newAsks = action.payload;

      newAsks.forEach((newAsk) => {
        const existingBid = state.asks.find((ask) => ask.price === newAsk.price);
        if (!existingBid) {
          newAsk.isNew = true;
        }
      });

      state.asks = newAsks;
    },
    resetOrderBook(state) {
      // Clear the order book
      state.bids = [];
      state.asks = [];
    },
  },
});

export const { updateBids, updateAsks, resetOrderBook } = orderBookSlice.actions;

export const orderBookReducer = orderBookSlice.reducer;

// Define types for the throttle functions
type ThrottleFunction = {
  fn: (dispatch: Dispatch, payload: any) => void;
  throttleTime: number;
};

// Objects to hold the throttled functions
const throttles: {
  bids: ThrottleFunction | null;
  asks: ThrottleFunction | null;
} = {
  bids: null,
  asks: null,
};

export const throttledUpdateBids =
  (payload: any, throttleTime: number = 100) => (dispatch: Dispatch) => {
    if (!throttles.bids || throttles.bids.throttleTime !== throttleTime) {
      throttles.bids = {
        fn: throttle((dispatch: Dispatch, payload: any) => {
          dispatch(updateBids(payload));
        }, throttleTime),
        throttleTime,
      };
    }
    throttles.bids.fn(dispatch, payload);
  };

export const throttledUpdateAsks =
  (payload: any, throttleTime: number = 100) => (dispatch: Dispatch) => {
    if (!throttles.asks || throttles.asks.throttleTime !== throttleTime) {
      throttles.asks = {
        fn: throttle((dispatch: Dispatch, payload: any) => {
          dispatch(updateAsks(payload));
        }, throttleTime),
        throttleTime,
      };
    }
    throttles.asks.fn(dispatch, payload);
  };
