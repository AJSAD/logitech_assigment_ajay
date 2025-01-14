import React from "react";
import OrderBook from "./OrderBook";
import { BookSubscriber } from "../hooks/webSocketHooks";

function AppDashboard() {
	BookSubscriber();
	return <OrderBook />;
}

export default AppDashboard;
