import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./assets/css/vendors.min.css";
import "./assets/css/vendors.min.css";
import "./assets/css/icon.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/real-estate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<ErrorBoundary>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</ErrorBoundary>
		</AuthProvider>
	</BrowserRouter>
);
