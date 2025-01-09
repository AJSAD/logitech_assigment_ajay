import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBookSubscribeQuery } from "../hooks/webSocketHooks";
import { useSubscribeMutation } from "../services/websocketApi";
import { RootState } from "../store/store";
import { MAX_ORDER_BOOK_ITEMS } from "../utils/appConstants";
import BarGraph from "../components/atoms/BarGraph";
import { OrderLevel } from ".";
import WidgetHeader from "../components/atoms/WidgetHeader";

const OrderBook: React.FC = () => {
	const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();
	const { bids, asks } = useSelector((state: RootState) => state.orderBook);
	console.log("bids: ", bids, "asks: ", asks);
	const [bids_24, setBids24] = useState<OrderLevel[]>([]);
	const [asks_24, setAsks24] = useState<OrderLevel[]>([]);

	const msg = useBookSubscribeQuery("P0");

	useEffect(() => {
		// Subscribe to WebSocket
		subscribe(msg);

		return () => {};
	}, [subscribe, msg]);

	useEffect(() => {
		const workerBlob = new Blob(
			[
				`
				// Format function for numbers
				const formatToFourDigits = (value) => {
				if (value >= 1000) {
					return numeral(value).format("0.000a").toUpperCase();
				}

				return value < 1 ? value.toFixed(4) : value.toPrecision(4);
				};

				// Calculate total function
				function calculateTotal(levels) {
				let cumulative = 0;
				return levels.map((level) => {
					const amount = level.amount;
					const formattedAmount = formatToFourDigits(amount);
					cumulative += amount;
					return { ...level, amount: formattedAmount, total: formatToFourDigits(cumulative) };
				});
				}

				// Web worker message handler
				self.onmessage = (event) => {
				const { bids, asks } = event.data;
				const bidsTotal = calculateTotal(bids);
				const asksTotal = calculateTotal(asks);
				self.postMessage({ bidsTotal, asksTotal });
				};
			`,
			],
			{ type: "application/javascript" }
		);

		const worker = new Worker(URL.createObjectURL(workerBlob));

		worker.onmessage = (event) => {
			const { bidsTotal, asksTotal } = event.data;
			setBids24(bidsTotal);
			setAsks24(asksTotal);
		};

		worker.postMessage({
			bids: bids.slice(0, MAX_ORDER_BOOK_ITEMS),
			asks: asks.slice(0, MAX_ORDER_BOOK_ITEMS),
		});

		return () => {
			worker.terminate(); // Clean up the worker
		};
	}, [bids, asks]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#0e3452",
			}}>
			<WidgetHeader title="ORDER BOOK" />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#0e3452",
				}}>
				<BarGraph
					data={bids_24.map((bid) => Number(bid.total))}
					fill="#01a781"
					mirrored
				/>
				<BarGraph
					data={asks_24.map((ask) => Number(ask.total))}
					fill="#e44b44"
				/>
			</div>
		</div>
	);
};

export default OrderBook;
