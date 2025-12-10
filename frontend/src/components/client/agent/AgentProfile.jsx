import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import { CircularProgress } from "@mui/material";
import Avatar from "../../../assets/images/photos/profile.png";
import ProfileUpdateModal from "./ProfileUpdateModal";
import UploadProfile from "../../subcomponents/UploadProfile";
import UploadIdImage from "../UploadIdImage";
import { useQuery } from "react-query";
const AgentProfile = () => {
	const { auth } = useAuth();
	const fetch = useFetch();
	const { id } = useParams();
	const url = `${baseURL}agent`;

	const [agent, setAgent] = useState(null);
	const [openUpdate, setOpenUpdate] = useState(false);
	const handleUpdateOpen = () => setOpenUpdate(true);
	const handleUpdateClose = () => setOpenUpdate(false);

	const [openUpload, setOpenUpload] = useState(false);
	const handleOpenUpload = () => setOpenUpload(true);
	const handleUploadClose = () => setOpenUpload(false);

	//identity image
	const [openDocUpload, setOpenDocUpload] = useState(false);
	const handleOpenDocUpload = () => setOpenDocUpload(true);
	const handleDocUploadClose = () => setOpenDocUpload(false);

	const handleProfile = async () => {
		try {
			const result = await fetch(`${url}/${id}`, auth.accessToken);
			setAgent(result.data);
		} catch (error) {
			toast.error("Error fetching your profile details");
		}
	};

	const { data, isError, isLoading, isSuccess } = useQuery(
		["agent"],
		handleProfile,
		{
			keepPreviousData: true,
			staleTime: 10000,
			refetchOnMount: "always",
		}
	);

	return (
		<div className="max-md:pt-24">
			<div className="min-h-screen">
				<ToastContainer />
				<div className="sm:pt-10 pl-4">
					<Link to="/agent">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 28 28"
							className="h-7 w-7 text-gray-400 hover:text-green-600"
							fill="currentColor">
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" />
						</svg>
					</Link>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center h-screen">
						<CircularProgress />
					</div>
				) : agent ? (
					<div className="max-w-6xl mx-auto px-4">
						<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
							{/* Profile Header */}
							<div className="bg-gradient-to-r from-green-500 to-green-600 h-32"></div>

							{/* Profile Content */}
							<div className="relative px-6 pb-8">
								{/* Profile Picture */}
								<div className="flex flex-col items-center -mt-16 mb-6">
									<div className="relative">
										<img
											src={agent?.profile ? agent.profile : Avatar}
											alt={
												agent?.agencyName
													? `${agent.agencyName} profile picture`
													: "Agent profile picture"
											}
											className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
										/>
										{!agent?.profile && (
											<div
												className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center rounded-full cursor-pointer hover:bg-opacity-70 transition-all"
												onClick={handleOpenUpload}>
												<span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														height="34px"
														viewBox="0 -960 960 960"
														width="34px"
														fill="currentColor"
														className="text-white"
														aria-label="Upload profile picture">
														<path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
													</svg>
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Name and Edit Button */}
								<div className="text-center mb-8">
									<h1 className="text-3xl font-bold text-gray-800 mb-2">{`${agent.firstname} ${agent.lastname}`}</h1>
									<p className="text-gray-600 mb-4">{agent?.agencyName}</p>
									<button
										onClick={handleUpdateOpen}
										className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
										aria-label="Edit profile">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
										Edit Profile
									</button>
								</div>

								{/* Information Grid */}
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
									{/* Personal Information */}
									<div className="space-y-4">
										<h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
											Personal Information
										</h2>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">Email</p>
											<p className="text-gray-800 font-medium">
												{agent?.email}
											</p>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">Phone</p>
											<p className="text-gray-800 font-medium">
												{agent?.phone}
											</p>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">
												Contact Address
											</p>
											<p className="text-gray-800 font-medium">
												{agent?.contactAddress}
											</p>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">
												Office Address
											</p>
											<p className="text-gray-800 font-medium">
												{agent?.officeAddress}
											</p>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">
												Verification Status
											</p>
											<span
												className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
													agent?.verified
														? "bg-green-100 text-green-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{agent?.verified
													? "✓ Verified"
													: "⏳ Pending Verification"}
											</span>
										</div>
									</div>

									{/* Verification Documents */}
									<div className="space-y-4">
										<h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
											Verification Documents
										</h2>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">
												Identity Type
											</p>
											<p className="text-gray-800 font-medium">
												{agent?.identityType}
											</p>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-500 mb-1">
												Identity Number
											</p>
											<p className="text-gray-800 font-medium">
												{agent?.identityNumber}
											</p>
										</div>
										<div>
											<p className="text-sm text-gray-500 mb-3">
												Identity Document
											</p>
											{agent?.identityImage ? (
												<div className="relative group">
													<img
														src={agent?.identityImage}
														alt={`${
															agent?.identityType || "Identity"
														} document`}
														className="w-full h-64 object-cover rounded-lg shadow-md"
													/>
													<button
														onClick={handleOpenDocUpload}
														className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium hover:bg-gray-100"
														aria-label="Update identity document">
														Update Document
													</button>
												</div>
											) : (
												<button
													onClick={handleOpenDocUpload}
													className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 group"
													aria-label="Upload identity document">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-12 w-12 text-gray-400 group-hover:text-green-600"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
														/>
													</svg>
													<span className="text-gray-600 group-hover:text-green-700 font-medium">
														Upload Identity Document
													</span>
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center h-screen">
						<p className="text-gray-600 text-lg">No agent details found.</p>
					</div>
				)}

				<ProfileUpdateModal
					openUpdate={openUpdate}
					handleUpdateClose={handleUpdateClose}
					agent={agent}
				/>
				<UploadProfile
					openUpload={openUpload}
					handleUploadClose={handleUploadClose}
					userId={id}
				/>
				<UploadIdImage
					id={id}
					openDocUpload={openDocUpload}
					handleDocUploadClose={handleDocUploadClose}
					url={`${url}`}
				/>
			</div>
		</div>
	);
};

export default AgentProfile;
