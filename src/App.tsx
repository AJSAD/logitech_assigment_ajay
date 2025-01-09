import React from "react";
import { Provider } from "react-redux";
import OrderBook from "./containers/OrderBook";
import store from "./store/store";
import "./styles/index.scss";

function App() {
	return (
		<Provider store={store}>
			<OrderBook />
		</Provider>
	);
}

export default App;
