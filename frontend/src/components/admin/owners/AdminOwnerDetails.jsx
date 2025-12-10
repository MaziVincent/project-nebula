import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteUserModal from "../users/DeleteUserModal";
import UpdateOwnerModal from "./UpdateOwnerModal";
import VerifyOwnerModal from "./VerifyOwnerModal";
import UnverifyOwnerModal from "./UnverifyOwnerModal";
import { useQuery } from "react-query";

const AdminOwnerDetails = () => {
	const { auth } = useAuth();
	const fetch = useFetch();
	const url = `${baseURL}owner`;
	const { id } = useParams();
	const imageUrl = `${baseURL}`;

	//updatemodal
	const [openUpdate, setOpenUpdate] = useState(false);
	const handleUpdateOpen = () => setOpenUpdate(true);
	const handleUpdateClose = () => setOpenUpdate(false);

	//deletemodal
	const [openDelete, setOpenDelete] = useState(false);
	const handleOpenDelete = () => setOpenDelete(true);
	const handleDeleteClose = () => setOpenDelete(false);
	const [userId, setUserId] = useState("");

	// State for apartment details and other shops
	const [owner, setOwner] = useState(null);

	//verify or unverify agent
	const [openVerify, setOpenVerify] = useState(false);
	const handleOpenverify = () => setOpenVerify(true);
	const handleVerifyClose = () => setOpenVerify(false);
	const [ownerId, setOwnerId] = useState("");

	//verify or unverify agent
	const [openUnverify, setOpenUnverify] = useState(false);
	const handleOpenUnverify = () => setOpenUnverify(true);
	const handleUnverifyClose = () => setOpenUnverify(false);

	const handleOwnerDetails = async () => {
		try {
			// Fetch the specific apartment details
			const result = await fetch(`${url}/${id}`, auth.accessToken);
			setOwner(result.data);
			return result.data;
		} catch (error) {
			toast.error("Error fetching Owner's details");
		}
	};

	const { data, isError, isLoading, isSuccess } = useQuery(
		["owner"],
		handleOwnerDetails,
		{ keepPreviousData: true, staleTime: 10000, refetchOnMount: "always" }
	);
	return (
		<div className=" max-md:pt-24 h-auto min-h-max">
			<ToastContainer />
			<div className=" py-5 pl-4">
				<Link to="/admin/owners">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 28 28"
						className=" h-7 w-7 text-gray-400 hover:text-green-600"
						fill="currentColor">
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" />
					</svg>
				</Link>
			</div>
			{owner ? (
				<div className="container mx-auto p-2">
					<div className="bg-white rounded-lg shadow-md p-2">
						<div className="flex flex-col md:flex-row items-center">
							<div className=" flex flex-col max-sm:flex-row max-sm:w-full max-sm:justify-center items-center gap-4 w-1/4">
								<div className="md:w-full">
									<h4 className=" text-xl mb-0 pb-2">Profile Image:</h4>
									<div className=" border">
										<img
											src={owner.profile}
											alt={owner.firstname}
											className="w-full h-auto"
										/>
									</div>
								</div>
								<div className="md:w-full">
									<h4 className=" text-xl mb-0 pb-2">Identity Image:</h4>
									<div className=" border">
										<img
											src={owner.identityImage}
											alt={owner.identityType}
											className="w-full h-auto"
										/>
									</div>
								</div>
							</div>
							<div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
								<h2 className=" text-xl font-light">
									Name:{" "}
									<span className=" text-2xl font-semibold">{`${owner.firstname} ${owner.lastname}`}</span>
								</h2>
								<p className="mb-4 text-gray-600">
									Email: <span>{owner.email}</span>
								</p>
								<p className="mb-4 text-gray-600">
									Phone: <span>{owner.phone}</span>
								</p>
								<p className="mb-4 text-gray-600">
									Status:{" "}
									<span
										className={`${
											owner.status ? "text-green-600" : " text-red-600"
										}`}>
										{owner.status}
									</span>
								</p>
								<p className="mb-4 font-medium text-lg text-gray-600">
									Verification Status:{" "}
									<span
										className={`${
											owner.verified ? "text-blue-600" : " text-red-600"
										}`}>
										{owner.verified ? "Verified" : "Not Verified"}
									</span>
								</p>
								<p className="mb-4 text-gray-600">
									Identity Type: <span>{owner.identityType}</span>
								</p>
								<p className="mb-4 text-gray-600">
									Identity Number: <span>{owner.identityNumber}</span>
								</p>
								<p className="mb-4 text-gray-600">
									Contact Address: <span>{owner.contactAddress}</span>
								</p>
								<p className="mb-4 text-gray-600">
									Properties: <span>{owner.properties.title}</span>
								</p>
								{/* Update and Delete buttons */}
								<div className=" flex items-center gap-4 mt-4">
									<div className="">
										<button
											onClick={() => {
												handleUpdateOpen();
												setOwner(owner);
											}}
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
											Update
										</button>
										<button
											onClick={() => {
												handleOpenDelete();
												setUserId(owner._id);
											}}
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
											Delete
										</button>
									</div>
									<div className=" flex gap-2">
										<button
											className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
											onClick={() => {
												handleOpenverify();
												setOwnerId(owner._id);
											}}>
											Verify
										</button>
										<button
											className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
											onClick={() => {
												handleOpenUnverify();
												setOwnerId(owner._id);
											}}>
											Unverify
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className=" w-full flex justify-center">
					<CircularProgress />
				</div>
			)}
			<VerifyOwnerModal
				openVerify={openVerify}
				handleVerifyClose={handleVerifyClose}
				ownerId={ownerId}
			/>
			<UnverifyOwnerModal
				openUnverify={openUnverify}
				handleUnverifyClose={handleUnverifyClose}
				ownerId={ownerId}
			/>
			<UpdateOwnerModal
				openUpdate={openUpdate}
				handleUpdateClose={handleUpdateClose}
				owner={owner}
			/>
			<DeleteUserModal
				openDelete={openDelete}
				handleDeleteClose={handleDeleteClose}
				// shop={shop}
				userId={userId}
				// propertyType="shop"
				url={`${url}`}
			/>
		</div>
	);
};

export default AdminOwnerDetails;
