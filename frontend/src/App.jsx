//import { useState, useEffect} from 'react'
import { lazy, Suspense } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CircularProgress } from "@mui/material";

// Eager loaded components (needed immediately)
import PersistLogin from "./shared/persistLogin";
import RequireAuth from "./components/auth/RequireAuth";
import RequireAuthAdmin from "./components/auth/RequireAuthAdmin";

// Lazy loaded components (split into separate chunks)
// Auth
const Login = lazy(() => import("./components/auth/Login"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));

// Public Pages
const Home = lazy(() => import("./components/Home/Home"));
const Page = lazy(() => import("./components/Home/Page"));
const About = lazy(() => import("./components/Home/About"));
const Contact = lazy(() => import("./components/Home/Contact"));
const Sell = lazy(() => import("./components/Home/Sell"));
const Rent = lazy(() => import("./components/Home/Rent"));
const PropertyDtls = lazy(() => import("./components/Home/PropertyDtls"));
const TermsAndConditions = lazy(() =>
	import("./components/Home/TermsAndConditions")
);
const AllProperties = lazy(() => import("./components/Home/AllProperties"));
const PropertyPage = lazy(() => import("./components/Home/PropertyPage"));

// Admin Dashboard
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const Overview = lazy(() => import("./components/admin/Overview"));
const AdminProfile = lazy(() => import("./components/admin/AdminProfile"));
const Properties = lazy(() => import("./components/admin/property/Properties"));

// Admin - Shops
const AdminShops = lazy(() => import("./components/admin/shops/AdminShops"));
const ShopDetails = lazy(() => import("./components/admin/shops/ShopDetails"));

// Admin - Apartments
const AdminApartments = lazy(() =>
	import("./components/admin/apartment/AdminApartments")
);
const ApartmentDetails = lazy(() =>
	import("./components/admin/apartment/ApartmentDetails")
);

// Admin - Houses
const AdminHouses = lazy(() => import("./components/admin/houses/AdminHouses"));
const HouseDetails = lazy(() =>
	import("./components/admin/houses/HouseDetails")
);

// Admin - Lands
const AdminLands = lazy(() => import("./components/admin/land/AdminLands"));
const LandDetails = lazy(() => import("./components/admin/land/LandDetails"));

// Admin - Agents
const AdminAgents = lazy(() => import("./components/admin/agents/AdminAgents"));
const AgentDetails = lazy(() =>
	import("./components/admin/agents/AgentDetails")
);

// Admin - Owners
const AdminOwners = lazy(() => import("./components/admin/owners/AdminOwners"));
const AdminOwnerDetails = lazy(() =>
	import("./components/admin/owners/AdminOwnerDetails")
);

// Admin - Customers
const AdminCustomers = lazy(() =>
	import("./components/admin/customer/AdminCustomers")
);
const CustomerDetails = lazy(() =>
	import("./components/admin/customer/CustomerDetails")
);

// Admin - Users
const AdminUsers = lazy(() => import("./components/admin/users/AdminUsers"));

// Customer Dashboard
const CustomerDashboard = lazy(() =>
	import("./components/client/customers/CustomerDashboard")
);
const CustomerOverview = lazy(() =>
	import("./components/client/customers/CustomerOverview")
);
const Profile = lazy(() => import("./components/client/customers/Profile"));
const AllProperty = lazy(() =>
	import("./components/client/customers/AllProperty")
);
const PropertyForRent = lazy(() =>
	import("./components/client/customers/PropertyForRent")
);
const PropertyForSell = lazy(() =>
	import("./components/client/customers/PropertyForSell")
);
const CustomerPropertyDetails = lazy(() =>
	import("./components/client/customers/PropertyDetails")
);
const Messages = lazy(() => import("./components/client/customers/Messages"));
const ReceivedMessages = lazy(() =>
	import("./components/client/customers/ReceivedMessages")
);

// Agent Dashboard
const AgentDashboard = lazy(() =>
	import("./components/client/agent/AgentDashboard")
);
const AgentOverview = lazy(() =>
	import("./components/client/agent/AgentOverview")
);
const PropertyDetails = lazy(() =>
	import("./components/client/agent/agentComponent/PropertyDetails")
);
const AgentProfile = lazy(() =>
	import("./components/client/agent/AgentProfile")
);
const AgentMessage = lazy(() =>
	import("./components/client/agent/agentComponent/AgentMessage")
);

// Owner Dashboard
const OwnerDashboard = lazy(() =>
	import("./components/client/owner/OwnerDashboard")
);
const OwnerOverview = lazy(() =>
	import("./components/client/owner/OwnerOverview")
);
const Property = lazy(() =>
	import("./components/client/owner/ownerComponent/Property")
);
const OwnerProfile = lazy(() =>
	import("./components/client/owner/OwnerProfile")
);
const OwnerMessages = lazy(() =>
	import("./components/client/owner/ownerComponent/OwnerMessages")
);

// Shared
const MessageDetails = lazy(() =>
	import("./components/subcomponents/MessageDetails")
);

// Error Pages
const Page404 = lazy(() => import("./components/views/Page404"));
const UnAuthorized = lazy(() => import("./components/views/UnAuthorized"));

// Loading component
const LoadingFallback = () => (
	<div className="flex items-center justify-center min-h-screen bg-gray-100">
		<div className="text-center">
			<CircularProgress size={50} />
			<p className="mt-4 text-gray-600">Loading...</p>
		</div>
	</div>
);

function App() {
	const queryClient = new QueryClient();
	const roles = {
		customer: "Customer",
		admin: "Admin",
		agent: "Agent",
		owner: "Owner",
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<LoadingFallback />}>
				<Routes>
					<Route element={<PersistLogin />}>
						<Route path="/" element={<Home />}>
							<Route index element={<Page />} />
							<Route path="/about" element={<About />} />
							<Route path="/rent" element={<Rent />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/allproperties" element={<AllProperties />} />
							<Route path="/sell" element={<Sell />} />
							<Route path="/property/:id" element={<PropertyDtls />} />
							<Route path="/terms" element={<TermsAndConditions />} />
							<Route path="/forgotpassword" element={<ForgotPassword />} />
						</Route>
					</Route>

					{/* login route */}
					<Route path="/login" element={<Login />} />

					{/*  admin route */}
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuthAdmin allowedRoles={[roles.admin]} />}>
							<Route path="/admin" element={<Dashboard />}>
								<Route index element={<Overview />} />
								<Route path="/admin/profile/:id" element={<AdminProfile />} />
								<Route path="/admin/properties" element={<Properties />} />

								{/*admin shop route */}
								<Route path="/admin/shops" element={<AdminShops />} />
								<Route
									path="/admin/shop_details/:id"
									element={<ShopDetails />}
								/>

								{/*admin apartment route */}
								<Route path="/admin/apartments" element={<AdminApartments />} />
								<Route
									path="/admin/apartment_details/:id"
									element={<ApartmentDetails />}
								/>

								{/*admin house route */}
								<Route path="/admin/houses" element={<AdminHouses />} />
								<Route
									path="/admin/house_details/:id"
									element={<HouseDetails />}
								/>

								{/*admin land route */}
								<Route path="/admin/lands" element={<AdminLands />} />
								<Route
									path="/admin/land_details/:id"
									element={<LandDetails />}
								/>

								{/*admin agent route */}
								<Route path="/admin/agents" element={<AdminAgents />} />
								<Route
									path="/admin/agent_details/:id"
									element={<AgentDetails />}
								/>

								{/* Admin owner route */}
								<Route path="/admin/owners" element={<AdminOwners />} />
								<Route
									path="/admin/owner_details/:id"
									element={<AdminOwnerDetails />}
								/>

								{/* Admin owner route */}
								<Route path="/admin/customers" element={<AdminCustomers />} />
								<Route
									path="/admin/customer_details/:id"
									element={<CustomerDetails />}
								/>

								{/* Admin users */}
								<Route path="/admin/users" element={<AdminUsers />} />
							</Route>
						</Route>
					</Route>

					{/*  customer route */}
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth allowedRoles={[roles.customer]} />}>
							<Route path="/dashboard" element={<CustomerDashboard />}>
								<Route index element={<CustomerOverview />} />
								<Route path="/dashboard/profile/:id" element={<Profile />} />
								<Route
									path="/dashboard/details/:id"
									element={<CustomerPropertyDetails />}
								/>
								<Route path="/dashboard/properties" element={<AllProperty />} />
								<Route
									path="/dashboard/rentals"
									element={<PropertyForRent />}
								/>
								<Route path="/dashboard/sell" element={<PropertyForSell />} />
								<Route path="/dashboard/messages/sent" element={<Messages />} />
								<Route
									path="/dashboard/messages/received"
									element={<ReceivedMessages />}
								/>
								<Route
									path="/dashboard/message/:id"
									element={<MessageDetails />}
								/>
							</Route>
						</Route>
					</Route>

					{/*  agent route */}
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth allowedRoles={[roles.agent]} />}>
							<Route path="/agent" element={<AgentDashboard />}>
								<Route index element={<AgentOverview />} />
								<Route
									path="/agent/property/:id"
									element={<PropertyDetails />}
								/>
								<Route path="/agent/profile/:id" element={<AgentProfile />} />
								<Route path="/agent/messages" element={<AgentMessage />} />
								<Route path="/agent/message/:id" element={<MessageDetails />} />
							</Route>
						</Route>
					</Route>

					{/*  owner route */}
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth allowedRoles={[roles.owner]} />}>
							<Route path="/owner" element={<OwnerDashboard />}>
								<Route index element={<OwnerOverview />} />
								<Route path="/owner/property/:id" element={<Property />} />
								<Route path="/owner/profile/:id" element={<OwnerProfile />} />
								<Route path="/owner/messages" element={<OwnerMessages />} />
								<Route path="/owner/message/:id" element={<MessageDetails />} />
							</Route>
						</Route>
					</Route>

					{/* catch all */}
					<Route path="*" element={<Page404 />} />
					<Route path="unauthorized" element={<UnAuthorized />} />
				</Routes>
			</Suspense>
		</QueryClientProvider>
	);
}

export default App;
