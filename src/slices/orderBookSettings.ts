import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderBookSettingsState {
	zoom: boolean;
	precision: "P0" | "P1" | "P2" | "P3" | "P4";
	throttleSettings: {
		isRealTime: boolean;
		throttle: number;
	};
}

const initialState: OrderBookSettingsState = {
	zoom: false,
	precision: "P0", // Default to p0
	throttleSettings: {
		isRealTime: true,
		throttle: 100,
	},
};

const orderBookSettingsSlice = createSlice({
	name: "orderBookSettings",
	initialState,
	reducers: {
		toggleZoom: (state, action) => {
			const zoom = action.payload;
			if (state.zoom !== zoom) state.zoom = zoom;
		},
		setPrecision: (
			state,
			action: PayloadAction<"P0" | "P1" | "P2" | "P3" | "P4">
		) => {
			state.precision = action.payload;
		},

		incrementPrecision: (state) => {
			const precisionOrder: OrderBookSettingsState["precision"][] = [
				"P0",
				"P1",
				"P2",
				"P3",
				"P4",
			];
			const currentIndex = precisionOrder.indexOf(state.precision);
			if (currentIndex < precisionOrder.length - 1) {
				state.precision = precisionOrder[currentIndex + 1];
			}
		},

		decrementPrecision: (state) => {
			const precisionOrder: OrderBookSettingsState["precision"][] = [
				"P0",
				"P1",
				"P2",
				"P3",
				"P4",
			];
			const currentIndex = precisionOrder.indexOf(state.precision);
			if (currentIndex > 0) {
				state.precision = precisionOrder[currentIndex - 1];
			}
		},

		toggleThrottle: (state) => {
			const isRealTime = state.throttleSettings.isRealTime;
			state.throttleSettings = {
				isRealTime: !isRealTime,
				throttle: isRealTime ? 5000 : 100,
			};
		},
	},
});

export const {
	toggleZoom,
	setPrecision,
	incrementPrecision,
	decrementPrecision,
	toggleThrottle,
} = orderBookSettingsSlice.actions;

export const orderBookSettingsReducer = orderBookSettingsSlice.reducer;
