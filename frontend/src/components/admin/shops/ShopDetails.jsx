import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import UpdateShopModal from "./UpdateShopModal";
import DeletePropertyModal from "../property/DeletePropertyModal";
import { Modal } from "@mui/material";
import UploadPropertyImage from "../property/UploadPropertyImage";
import { useQuery } from "react-query";

const ShopDetails = () => {
	const { auth } = useAuth();
	const fetch = useFetch();
	const url = `${baseURL}shop`;
	const { id } = useParams();
	const imageUrl = `${baseURL}`;

	//updatemodal
	const [openUpdate, setOpenUpdate] = useState(false);
	const handleUpdateOpen = () => setOpenUpdate(true);
	const handleUpdateClose = () => setOpenUpdate(false);
	// const [shop, setShop] = useState({})

	//deletemodal
	const [openDelete, setOpenDelete] = useState(false);
	const handleOpenDelete = () => setOpenDelete(true);
	const handleDeleteClose = () => setOpenDelete(false);
	const [propertyId, setPropertyId] = useState("");

	// State for shop details and other shops
	const [shop, setShop] = useState(null);
	const [otherShops, setOtherShops] = useState([]);

	// upload image
	const [openUpload, setOpenUpload] = useState(false);
	const handleOpenUpload = () => setOpenUpload(true);
	const handleUploadClose = () => setOpenUpload(false);

	// Fetch shop details and other shops
	const handleShopDetail = async () => {
		try {
			const result = await fetch(`${url}/${id}`, auth.accessToken);
			setShop(result.data); // Set shop details
		} catch (error) {
			toast.error("Error fetching shop details");
		}
	};

	const { data, isError, isLoading, isSuccess } = useQuery(
		["shop"],
		handleShopDetail,
		{ keepPreviousData: true, staleTime: 10000, refetchOnMount: "always" }
	);

	return (
		<div className="mt-2">
			<ToastContainer />
			<div className="py-5 mt-0 mb-2">
				<Link to="/admin/shops">
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
			{shop ? (
				<div>
					<div className="">
						<div className=" leading-3 mb-4">
							<h1 className="text-xl inline-flex gap-2 items-center mb-0 leading-none">
								Title:{" "}
								<span className="text-lg font-semi-bold text-gray-800 uppercase">
									{shop.title}
								</span>
							</h1>
							<p className="m-0">
								Owner:{" "}
								<span className=" text-gray-700 text-sm tracking-wider underline">
									{shop?.owner?.firstname} {shop?.owner?.lastname}
								</span>
							</p>
						</div>
						<div className=" grid grid-cols-3 gap-2 shadow-md duration-200 delay-100 ease-in-out overflow-hidden">
							{shop.imageUrls.map((imageUrl, index) => (
								<img
									key={index}
									src={imageUrl}
									alt={shop.title}
									className=" w-full h-full duration-300 delay-300 ease-in-out  hover:scale-105"
								/>
							))}
						</div>
						<p className=" pt-2 mb-1">
							Status:{" "}
							<span
								className={`${
									shop.status === "Available"
										? "text-green-600"
										: shop.status === "Pending"
										? "text-yellow-600"
										: "text-red-600"
								}`}>
								{shop.status}
							</span>
						</p>
						<p className=" clear-start mb-1">
							Price:{" "}
							<span className=" text-gray-600">
								&#8358;
								{parseFloat(shop.price.$numberDecimal).toLocaleString("en-US")}
							</span>
						</p>
						<p className="">
							Location: <span className=" text-gray-700">{shop.location}</span>
						</p>
						<div className=" grid grid-cols-4 gap-y-8 max-sm:grid-cols-2 w-11/12">
							<p className=" border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center">
								ShopType: <span>{shop.shopType}</span>
							</p>
							<p className=" border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center">
								ShopCategory: <span>{shop.shopCategory}</span>
							</p>
							<p className=" border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center">
								LeaseDuration: <span>{shop.leaseDuration}</span>
							</p>
							<p className=" text-gray-600 p-2 m-0 pl-0 flex flex-col items-center">
								SecurityDeposit: <span>{shop.securityDeposit}</span>
							</p>
						</div>
						<div>
							<p className=" flex flex-col justify-start gap-2">
								<span>Description:</span>
								<span>{shop.description}</span>
							</p>
						</div>
					</div>
					{/* Add more shop details as needed */}
					<div className=" flex justify-start items-start gap-4 my-4 ">
						<button
							onClick={() => {
								handleUpdateOpen();
								setShop(shop);
							}}
							className=" bg-gray-300 max-sm:bg-blue-100 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 max-sm:shadow-blue-100 rounded-lg px-2">
							<span className="md:block max-sm:hidden">Edit Shop</span>
							<span className=" md:hidden max-sm:block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="48px"
									viewBox="0 -960 960 960"
									width="48px"
									fill="currentColor"
									className=" text-blue-600">
									<path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z" />
								</svg>
							</span>
						</button>
						<button
							onClick={() => {
								handleOpenDelete();
								setPropertyId(shop._id);
							}}
							className=" bg-red-600 max-sm:bg-red-100 bg-opacity-70 text-white px-2 rounded-lg shadow-md shadow-red-300 max-sm:shadow-red-100">
							<span className=" max-sm:hidden md:block">Delete Shop</span>
							<span className=" md:hidden max-sm:block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="48px"
									viewBox="0 -960 960 960"
									width="48px"
									fill="currentcolor"
									className=" text-red-600">
									<path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
								</svg>
							</span>
						</button>
						<button
							onClick={() => {
								handleOpenUpload();
								setPropertyId(shop._id);
							}}
							className=" bg-gray-300 max-sm:bg-sky-100 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 max-sm:shadow-sky-100 rounded-lg px-2">
							<span className=" md:block max-sm:hidden">Upload Image</span>
							<span className=" md:hidden max-sm:block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="48px"
									viewBox="0 -960 960 960"
									width="48px"
									fill="currentColor"
									className="text-sky-600">
									<path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
								</svg>
							</span>
						</button>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}

			{/* Render other shops */}
			<div>
				<h2>Other Shops</h2>
				{otherShops.map((shop) => (
					<div key={shop._id}>
						<h3>{shop.title}</h3>
						<p>{shop.description}</p>
						<img src={shop.image} alt={shop.title} />
					</div>
				))}
			</div>
			<UpdateShopModal
				openUpdate={openUpdate}
				handleUpdateClose={handleUpdateClose}
				shop={shop}
			/>
			<DeletePropertyModal
				openDelete={openDelete}
				handleDeleteClose={handleDeleteClose}
				propertyId={propertyId}
				url={url}
			/>
			<UploadPropertyImage
				openUpload={openUpload}
				handleUploadClose={handleUploadClose}
				propertyId={propertyId}
			/>
		</div>
	);
};

export default ShopDetails;
