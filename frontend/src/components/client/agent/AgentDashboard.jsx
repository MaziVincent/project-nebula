import React, { useState } from "react";
import AgentHeader from "./AgentHeader";
import AgentAside from "./AgentAside";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../shared/ErrorBoundary";

const AgentDashboard = () => {
	const [aside, setAside] = useState(false);

	return (
		<div className=" bg-green-50">
			<AgentHeader setAside={setAside} />
			<AgentAside aside={aside} setAside={setAside} />
			<ErrorBoundary>
				<main className="p-4 md:ml-48 min-h-max pt-7">
					<Outlet />
				</main>
			</ErrorBoundary>
			<footer className=" p-4 md:ml-48  mt-10 mb-0 text-green-900">
				All rights reserved &copy;2024 MegaTech Group
			</footer>
		</div>
	);
};

export default AgentDashboard;
