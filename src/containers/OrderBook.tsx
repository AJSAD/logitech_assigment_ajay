import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetFooter from "../components/atoms/WidgetFooter";
import WidgetHeader from "../components/atoms/WidgetHeader";
import BookSection from "../components/molecules/BookSection";
import {
	decrementPrecision,
	incrementPrecision,
	toggleThrottle,
	toggleZoom,
} from "../slices/orderBookSettings";
import { RootState } from "../store/store";
import "../styles/orderBook.scss";

const OrderBook: React.FC = () => {
	const dispatch = useDispatch();
	const { bids, asks } = useSelector((state: RootState) => state.orderBook);
	const { precision, throttleSettings } = useSelector(
		(state: RootState) => state.orderBookSettings
	);

	const memoizedBids = useMemo(() => {
		if (bids.length === 0) {
			return [];
		}
		return bids.map((bid) => Number(bid.total));
	}, [bids]);

	const memoizedAsks = useMemo(() => {
		if (asks.length === 0) {
			return [];
		}
		return asks.map((ask) => Number(ask.total));
	}, [asks]);

	const handleZoomIn = () => {
		dispatch(toggleZoom(false));
	};

	const handleZoomOut = () => {
		dispatch(toggleZoom(true));
	};

	const handleIncreasePrecision = () => {
		dispatch(incrementPrecision());
	};

	const handleDecreasePrecision = () => {
		dispatch(decrementPrecision());
	};

	const handleRealTimeButtonClick = () => {
		dispatch(toggleThrottle());
	};

	return (
		<div className="order-book">
			<WidgetHeader
				title="Order Book"
				subTitle="BTC/USD"
				precision={precision}
				onDecreasePrecision={handleDecreasePrecision}
				onIncreasePrecision={handleIncreasePrecision}
				onZoomIn={handleZoomIn}
				onZoomOut={handleZoomOut}
			/>
			<div className="order-book-container">
				<BookSection
					data={memoizedBids}
					rows={bids}
					fill="rgba(1, 167, 129, 0.2)"
					mirrored
				/>
				<BookSection
					data={memoizedAsks}
					rows={asks}
					fill="rgba(228, 75, 68, 0.2)"
					flexDirection="row-reverse"
				/>
			</div>
			<WidgetFooter
				buttonName={
					throttleSettings.isRealTime ? "real-time" : "Throttled 5s"
				}
				onButtonClick={handleRealTimeButtonClick}
			/>
		</div>
	);
};

export default React.memo(OrderBook);
