import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";

const container = document.getElementById("app");

if (container) {
	const root = createRoot(container);
	root.render(<App />);
} else {
	console.error("Root element with id 'app' not found.");
}
