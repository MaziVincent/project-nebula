import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import { CircularProgress } from "@mui/material";
import Avatar from "../../../assets/images/photos/profile.png";
import EditProfileModal from "./EditProfileModal";
import UploadProfile from "../../subcomponents/UploadProfile";
import UploadIdImage from "../UploadIdImage";
import { useQuery } from "react-query";

const OwnerProfile = () => {
	const { auth } = useAuth();
	const fetch = useFetch();
	const { id } = useParams();
	const url = `${baseURL}owner`;

	const [owner, setOwner] = useState(null);
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
			if (result.data) {
				setOwner(result.data);
			}
		} catch (error) {
			toast.error("Error fetching your profile details");
		} finally {
		}
	};
	const { data, isError, isLoading, isSuccess } = useQuery(
		["owner"],
		handleProfile,
		{ keepPreviousData: true, staleTime: 10000, refetchOnMount: "always" }
	);
	return (
		<div className="sm:pt-24">
			<ToastContainer />
			<div className="max-md:pt-10 pl-4">
				<Link to="/owner">
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
			) : owner ? (
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center relative">
						<img
							src={owner?.profile ? owner.profile : Avatar}
							alt="Profile"
							className="w-32 h-32 rounded-full object-cover relative"
						/>
						{!owner?.profile && (
							<div className=" absolute z-20 bg-black opacity-60 w-32 h-32 flex justify-center items-center rounded-full top-0">
								<button className="" onClick={handleOpenUpload}>
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="34px"
											viewBox="0 -960 960 960"
											width="34px"
											fill="currentColor"
											className=" text-white">
											<path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
										</svg>
									</span>
								</button>
							</div>
						)}
						<h1 className="text-2xl font-bold text-gray-800 mt-3 mb-4">{`${owner.firstname} ${owner.lastname}`}</h1>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2  mt-3 border w-full">
						<div className="flex flex-col items-start justify-start my-5 px-4 py-2">
							<h1 className="text-2xl font-bold text-gray-800 mb-2">
								Personal Information
							</h1>
							<p className="text-gray-600 mb-2">
								<span>Email: </span>
								{owner?.email}
							</p>
							<p className="text-gray-600">
								<span>Phone: </span>
								{owner?.phone}
							</p>
							<p className="text-gray-600">
								<span>Contact Address: </span>
								{owner?.address}
							</p>
							<p className="text-gray-600">
								<span>Identity Type: </span>
								{owner?.identityType}
							</p>
							<p className="text-gray-600">
								<span>Verification: </span>
								{owner?.verified ? "Verified" : "Not verified"}
							</p>
						</div>
						<div className=" flex flex-col my-5 px-4">
							<p className="text-2xl font-semibold text-start lg:text-center text-gray-700">
								Identity Image
							</p>
							{owner?.identityImage ? (
								<div className="flex justify-start items-center">
									<img
										src={owner?.identityImage}
										alt=""
										className="w-32 h-32 object-cover"
									/>
								</div>
							) : (
								<div className="flex justify-start items-center">
									<button
										onClick={handleOpenDocUpload}
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">
										Upload Id
									</button>
								</div>
							)}
						</div>
					</div>
					<div>
						<button
							onClick={() => {
								handleUpdateOpen();
								setOwner(owner);
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2 mt-10">
							Update
						</button>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-screen">
					<p>No customer details found.</p>
				</div>
			)}
			<EditProfileModal
				openUpdate={openUpdate}
				handleUpdateClose={handleUpdateClose}
				owner={owner}
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
	);
};

export default OwnerProfile;
