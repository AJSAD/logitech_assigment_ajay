import React from "react";
import { Provider } from "react-redux";
import AppDashboard from "./containers/AppDashboard";
import store from "./store/store";
import "./styles/index.scss";

function App() {
	return (
		<Provider store={store}>
			<AppDashboard />
		</Provider>
	);
}

export default App;
