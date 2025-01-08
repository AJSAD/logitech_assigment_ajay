import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useBookSubscribeQuery } from "../hooks/webSocketHooks";
import { useSubscribeMutation } from "../services/websocketApi";
import { RootState } from "../store/store";
import { MAX_ORDER_BOOK_ITEMS } from "../utils/appConstants";
import { calculateTotal } from "../utils/orderBookUtils";

const OrderBook: React.FC = () => {
	const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();
	const { bids, asks } = useSelector((state: RootState) => state.orderBook);
	const bids_24 = calculateTotal(bids.slice(0, MAX_ORDER_BOOK_ITEMS));
	const asks_24 = calculateTotal(asks.slice(0, MAX_ORDER_BOOK_ITEMS));

	const msg = useBookSubscribeQuery("P0");

	useEffect(() => {
		// Subscribe to WebSocket
		subscribe(msg);

		return () => {};
	}, [subscribe, msg]);

	return <h1>Welcome Logitech</h1>;
};

export default OrderBook;
