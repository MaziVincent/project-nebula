import useAuth from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { blue, brown, green, grey, purple, yellow } from "@mui/material/colors";
import baseURL from "../../../shared/baseURL";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useState, useCallback } from "react";
import NewApartmentModal from "./agentComponent/NewApartmentModal";
import { useParams } from "react-router-dom";
import NewHouseModal from "./agentComponent/NewHouseModal";
import NewLandModal from "./agentComponent/NewLandModal";
import NewShopModal from "./agentComponent/NewShopModal";
import UpdatePropertyModal from "./agentComponent/UpdatePropertyModal";
import DeletePropertyModal from "../../admin/property/DeletePropertyModal";
import PropertyStatusModal from "./agentComponent/PropertyStatusModal";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";
import useModalManager from "../../../hooks/useModalManager";

const AgentOverview = () => {
	const { auth } = useAuth();
	const fetch = useFetch();
	const url = `${baseURL}properties/owner`;
	const deleteUrl = `${baseURL}properties`;
	const { openModal, closeModal, isOpen, modalData } = useModalManager();
	const [propertyType, setPropertyType] = useState(false);
	const handlePropertyType = useCallback(() => {
		setPropertyType(!propertyType);
	}, [propertyType]);

	// Modal handlers using the new modal manager
	const handleOpenApartment = useCallback(
		() => openModal("apartment"),
		[openModal]
	);
	const handleOpenHouse = useCallback(() => openModal("house"), [openModal]);
	const handleOpenLand = useCallback(() => openModal("land"), [openModal]);
	const handleOpenShop = useCallback(() => openModal("shop"), [openModal]);
	const handleOpenUpdate = useCallback(
		(property) => {
			openModal("update", property);
		},
		[openModal]
	);
	const handleOpenDelete = useCallback(
		(propertyId) => {
			openModal("delete", { propertyId });
		},
		[openModal]
	);
	const handleOpenStatus = useCallback(
		(property) => {
			openModal("status", property);
		},
		[openModal]
	);

	const agentId = auth?.user?._id;

	const [page, setPage] = useState(1);
	const handleChange = useCallback((event, value) => {
		setPage(value);
	}, []);
	const getProperties = async () => {
		const response = await fetch(
			`${url}/${agentId}?page=${page}&limit=10`,
			auth.accessToken
		);
		return response.data;
	};

	const { data, isLoading, isError, error, isSuccess } = useQuery(
		["properties", agentId],
		getProperties,
		{
			keepPreviousData: true,
			staleTime: 5000,
			refetchOnMount: "always",
		}
	);

	//action tools section
	const [tools, setTools] = useState(false);
	const handleTools = (_id) => {
		if (tools === _id) {
			setTools(false);
		} else {
			setTools(_id);
		}
	};

	return (
		<div className=" h-dvh">
			{isLoading && (
				<div className="flex justify-center items-center my-20">
					<CircularProgress />
				</div>
			)}
			{isSuccess && (
				<div className="animate-fadeIn">
					<div className="mb-6">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							Agent Overview
						</h1>
						<p className="text-gray-600">Manage your property listings</p>
					</div>
					<div>
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
							<h2 className="text-2xl font-semibold text-gray-800">
								Properties
							</h2>
							<div className="relative">
								<button
									onClick={handlePropertyType}
									className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 font-medium"
									aria-label="Add new property">
									<span>
										<Add />
									</span>
									Add New Property
								</button>
								{propertyType && (
									<div className="absolute right-0 mt-2 bg-white w-64 rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden">
										<h4 className="text-base font-semibold text-center text-gray-700 py-3 bg-green-50 border-b border-gray-200">
											Select Property Type
										</h4>
										<div className="flex flex-col p-2 gap-1">
											<button
												onClick={() => {
													handleOpenApartment();
													handlePropertyType();
												}}
												className="text-gray-700 font-medium hover:bg-green-500 hover:text-white rounded-lg px-4 py-3 w-full text-left transition-all duration-200 flex items-center gap-2 group"
												aria-label="Add new apartment">
												<span className="text-green-600 group-hover:text-white">
													<Add fontSize="small" />
												</span>
												Apartment
											</button>
											<button
												onClick={() => {
													handleOpenHouse();
													handlePropertyType();
												}}
												className="text-gray-700 font-medium hover:bg-green-500 hover:text-white rounded-lg px-4 py-3 w-full text-left transition-all duration-200 flex items-center gap-2 group"
												aria-label="Add new house">
												<span className="text-green-600 group-hover:text-white">
													<Add fontSize="small" />
												</span>
												House
											</button>
											<button
												onClick={() => {
													handleOpenLand();
													handlePropertyType();
												}}
												className="text-gray-700 font-medium hover:bg-green-500 hover:text-white rounded-lg px-4 py-3 w-full text-left transition-all duration-200 flex items-center gap-2 group"
												aria-label="Add new land">
												<span className="text-green-600 group-hover:text-white">
													<Add fontSize="small" />
												</span>
												Land
											</button>
											<button
												onClick={() => {
													handleOpenShop();
													handlePropertyType();
												}}
												className="text-gray-700 font-medium hover:bg-green-500 hover:text-white rounded-lg px-4 py-3 w-full text-left transition-all duration-200 flex items-center gap-2 group"
												aria-label="Add new shop">
												<span className="text-green-600 group-hover:text-white">
													<Add fontSize="small" />
												</span>
												Shop
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
							<div className="overflow-x-auto">
								<table className="w-full border-collapse text-sm text-gray-700">
									<thead className="bg-gradient-to-r from-green-50 to-green-100 border-b border-gray-200">
										<tr>
											<th
												scope="col"
												className="px-6 py-4 font-semibold text-gray-800 text-left">
												Title
											</th>
											<th
												scope="col"
												className="px-6 py-4 font-semibold text-gray-800 text-left">
												Status
											</th>
											<th
												scope="col"
												className="px-6 py-4 font-semibold text-gray-800 text-left">
												Date Created
											</th>
											<th
												scope="col"
												className="px-6 py-4 font-semibold text-gray-800 text-left">
												Property Type
											</th>
											<th
												scope="col"
												className="px-6 py-4 font-semibold text-gray-800 text-left">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-100 bg-white">
										{data?.properties?.length > 0 ? (
											data?.properties.map((property) => (
												<tr
													key={property._id}
													className="hover:bg-green-50 transition-colors duration-150">
													<td className="px-6 py-4">
														<div className="text-sm">
															<div className="font-medium text-gray-900">
																{property.title}
															</div>
														</div>
													</td>
													<td className="px-6 py-4">
														<span
															className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
																property.status === "Available"
																	? "text-green-600 bg-green-50"
																	: property.status === "Pending"
																	? "text-yellow-600 bg-yellow-50"
																	: "text-red-600 bg-red-50"
															}`}>
															<span
																className={`h-1.5 w-1.5 rounded-full ${
																	property.status === "Available"
																		? "bg-green-600"
																		: property.status === "Pending"
																		? "bg-yellow-600"
																		: "bg-red-600"
																}`}></span>
															{property.status}
														</span>
													</td>
													<td className="px-6 py-4">
														{property.createdAt.substring(0, 10)}
													</td>
													<td className="px-6 py-4">
														<div className="flex gap-2">
															<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
																{property.type}
															</span>
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="">
															<button
																className=""
																onClick={() => handleTools(property._id)}>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	height="24px"
																	viewBox="0 0 24 24"
																	width="24px"
																	fill="#6b7280">
																	<path d="M0 0h24v24H0V0z" fill="none" />
																	<path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14z" />
																	<circle cx="9" cy="12" r="1.5" />
																	<circle cx="14" cy="12" r="1.5" />
																	<circle cx="19" cy="12" r="1.5" />
																</svg>
															</button>
															{tools === property._id && (
																<div className=" flex justify-end gap-4 absolute right-20 bg-gray-0 py-1 px-2 bg-sky-200 rounded-md">
																	<button
																		onClick={() =>
																			handleOpenDelete(property._id)
																		}
																		aria-label="Delete property"
																		title="Delete">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			fill="none"
																			viewBox="0 0 24 24"
																			strokeWidth="1.5"
																			stroke="currentColor"
																			className="h-6 w-6 text-red-600"
																			x-tooltip="tooltip">
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
																			/>
																		</svg>
																	</button>
																	<Link
																		to={`/agent/property/${property._id}`}
																		title="view">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className=" w-6 h-6 text-cyan-600"
																			viewBox="0 0 24 24"
																			fill="currentColor">
																			<path d="M0 0h24v24H0V0z" fill="none" />
																			<path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
																		</svg>
																	</Link>
																	<button
																		onClick={() => handleOpenUpdate(property)}
																		aria-label="Edit property"
																		title="Edit">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			fill="none"
																			viewBox="0 0 24 24"
																			strokeWidth="1.5"
																			stroke="currentColor"
																			className="h-6 w-6 text-yellow-600"
																			x-tooltip="tooltip">
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
																			/>
																		</svg>
																	</button>
																	<button
																		onClick={() => handleOpenStatus(property)}
																		aria-label="Change property status"
																		title="Change status">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-6 w-6 text-green-600"
																			viewBox="0 0 24 24"
																			fill="currentColor">
																			<rect fill="none" />
																			<path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z" />
																		</svg>
																	</button>
																</div>
															)}
														</div>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan="6" className="text-center py-4">
													No data available
												</td>
											</tr>
										)}
									</tbody>
								</table>
								<div className=" flex justify-center mt-4 mb-">
									<Pagination
										count={data?.totalPage}
										page={page}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Modals */}
			<div>
				<UpdatePropertyModal
					openUpdate={isOpen("update")}
					handleCloseUpdate={closeModal}
					property={modalData}
					url={`${baseURL}${modalData?.type || ""}`}
				/>

				<NewApartmentModal
					open={isOpen("apartment")}
					handleClose={closeModal}
				/>

				<NewHouseModal
					open={isOpen("house")}
					handleCloseHouseModal={closeModal}
				/>

				<NewLandModal open={isOpen("land")} handleCloseLandModal={closeModal} />

				<NewShopModal open={isOpen("shop")} handleCloseShopModal={closeModal} />

				<PropertyStatusModal
					openStatus={isOpen("status")}
					handleCloseStatus={closeModal}
					property={modalData}
				/>

				<DeletePropertyModal
					openDelete={isOpen("delete")}
					handleDeleteClose={closeModal}
					propertyId={modalData?.propertyId}
					url={`${deleteUrl}`}
				/>
			</div>
		</div>
	);
};

export default AgentOverview;
