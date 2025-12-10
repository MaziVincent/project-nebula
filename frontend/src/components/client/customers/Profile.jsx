import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import { CircularProgress } from "@mui/material";
import Avatar from "../../../assets/images/photos/profile.png";
import UpdateProfileModal from "./UpdateProfileModal";
import { Info } from "@mui/icons-material";
import UploadProfile from "../../subcomponents/UploadProfile";
import { useQuery } from "react-query";

const Profile = () => {
	const { auth } = useAuth();
	const fetch = useFetch();
	const { id } = useParams();
	const url = `${baseURL}customer`;

	const [customer, setCustomer] = useState(null);

	const [openUpdate, setOpenUpdate] = useState(false);
	const handleUpdateOpen = () => setOpenUpdate(true);
	const handleUpdateClose = () => setOpenUpdate(false);

	//upload image
	const [openUpload, setOpenUpload] = useState(false);
	const handleOpenUpload = () => setOpenUpload(true);
	const handleUploadClose = () => setOpenUpload(false);

	const handleProfile = async () => {
		try {
			const result = await fetch(`${url}/${id}`, auth.accessToken);
			setCustomer(result.data);
		} catch (error) {
			toast.error("Error fetching your profile details");
		}
	};

	const { data, isError, isLoading, isSuccess } = useQuery(
		["customer"],
		handleProfile,
		{ keepPreviousData: true, staleTime: 10000, refetchOnMount: "always" }
	);
	return (
		<div className="max-md:pt-24 px-4 pt-5">
			<ToastContainer />
			<div className="py-5 pl-4">
				<Link to="/dashboard">
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
			) : customer ? (
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center relative">
						<img
							src={customer?.profile ? customer.profile : Avatar}
							alt="Profile"
							className="w-32 h-32 rounded-full object-cover relative"
						/>
						{!customer?.profile && (
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
						<h1 className="text-2xl font-bold text-gray-800 mt-3 mb-4">{`${customer.firstname} ${customer.lastname}`}</h1>
					</div>
					<div className=" border-[1px] border-gray-300 rounded-lg mt-4 w-4/5 mb-4 h-auto">
						<h1 className=" text-2xl flex items-center gap-1 py-2 px-2 text-gray-600 font-sans mb-2">
							<span className=" text-gray-600">
								<Info />
							</span>
							<span className=" pt-1">Personal Information</span>
						</h1>
						<p className="text-gray-600 mb-4 flex flex-col items-start leading-5 px-2">
							<span>Email: </span>
							{customer?.email}
						</p>
						<p className="text-gray-600 mb-4 flex flex-col items-start leading-5 px-2">
							<span>Phone:</span>
							{customer?.phone}
						</p>
						<p className="text-gray-600 mb-4 px-2">
							<span>Status:</span> {customer?.status}
						</p>
						<div className="flex flex-col items-center justify-center mt-3">
							{/* <h1 className="text-2xl font-bold text-gray-800">Contact Information</h1> */}
							<p className="text-gray-600">{customer?.address}</p>
						</div>
					</div>
					<div>
						<button
							onClick={() => {
								handleUpdateOpen();
								setCustomer(customer);
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
							Update
						</button>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-screen">
					<p>No customer details found.</p>
				</div>
			)}
			<UpdateProfileModal
				openUpdate={openUpdate}
				handleUpdateClose={handleUpdateClose}
				customer={customer}
			/>
			<UploadProfile
				openUpload={openUpload}
				handleUploadClose={handleUploadClose}
				userId={id}
			/>
		</div>
	);
};

export default Profile;
