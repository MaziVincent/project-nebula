import React, { useState, useEffect } from "react";
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseURL from "../../../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const NewShopModal = ({ open, handleCloseShopModal }) => {
	const queryClient = useQueryClient();
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseURL}shop`;
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "all" });

	const createShop = async (data) => {
		setIsLoading(true);
		if (!auth || !auth?.accessToken) {
			navigate("/login");
			return;
		}
		const formData = new FormData();

		// Append form fields
		for (const key in data) {
			if (data[key]) {
				formData.append(key, data[key]);
			}
		}

		// Log the FormData contents
		for (let [key, value] of formData.entries()) {
		}
		try {
			const response = await post(url, formData, auth?.accessToken);
			setTimeout(() => {
				handleCloseShopModal();
			}, 3000);
		} catch (err) {
			setIsLoading(false);
			setError(err.response?.data?.error || err.message);
		}
	};

	const { mutate } = useMutation(createShop, {
		onSuccess: () => {
			setIsLoading(false);
			queryClient.invalidateQueries("shop");
			toast.success("New Shop Created Successfully");
		},
	});

	const handleCreateShop = (data) => {
		// Pass the image and form data to mutate
		const shopData = { ...data, image };
		mutate(shopData); // Pass both form data and image
		setTimeout(() => {
			handleCloseShopModal();
		}, 3000);
	};
	return (
		<Modal
			open={open}
			onClose={handleCloseShopModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex items-center justify-center p-4">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none">
				<ToastContainer />
				{/* Modal content */}
				<div className="relative bg-white rounded-2xl shadow-2xl">
					{/* Modal header with gradient */}
					<div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-2xl sticky top-0 z-10">
						<h3 className="text-xl font-bold text-white flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
							Create New Shop
						</h3>
						<button
							type="button"
							onClick={handleCloseShopModal}
							className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors duration-200"
							aria-label="Close modal">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Modal body */}
					<div className="p-6">
						<form
							onSubmit={handleSubmit(handleCreateShop)}
							method="post"
							className="space-y-4">
							<div className="flex flex-col gap-3 mb-4">
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										{...register("title", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Type Shop name"
										required=""
									/>
									{errors.title && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div>
									<label
										htmlFor="framework"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Description
									</label>
									<textarea
										type="text"
										name="description"
										id="description"
										{...register("description", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter the Description"
										required=""
										rows="8"></textarea>
									{errors.description && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="price"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Price
									</label>
									<input
										id="price"
										rows="4"
										type="number"
										{...register("price", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Shop Price here"
									/>
									{errors.price && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="description"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Location
									</label>
									<input
										id="location"
										name="location"
										type="text"
										{...register("location", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Shop Location here"
									/>
									{errors.location && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<input
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										value={auth?.user?._id}
										{...register("owner")}
										type="hidden"
									/>
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="description"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										shopCategory
									</label>
									<select
										name="shopCategory"
										id="shopCategory"
										{...register("shopCategory", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
										<option value="Select Shop Category" selected disabled>
											Select Shop Category
										</option>
										<option value="Warehouse">Warehouse</option>
										<option value="Retail Store">Retail Store</option>
										<option value="Office Space">Office Space</option>
										<option value="Showroom">Showroom</option>
										<option value="Pharmacy Store">Pharmacy Store</option>
										<option value="Boutique">Boutique</option>
										<option value="General Purpose">General Purpose</option>
									</select>
									{errors.shopCategory && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="description"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										leaseDuration
									</label>
									<input
										id="leaseDuration"
										name="leaseDuration"
										type="number"
										{...register("leaseDuration", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Shop leaseDuration here"
									/>
									{errors.leaseDuration && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="loation"
										className="block mb-2 text-sm font-medium text-gray-900">
										security Deposit
									</label>
									<input
										id="securityDeposit"
										name="securityDeposit"
										type="number"
										{...register("securityDeposit", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Shop security Deposit here"
									/>
									{errors.securityDeposit && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="type"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Type
									</label>
									<select
										name="propertyType"
										id="propertyType"
										{...register("propertyType", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
										<option value="select land type" disabled selected>
											Select Land Type
										</option>
										<option value="Rent">Rent</option>
										<option value="Sell">Sell</option>
									</select>
									{errors.propertyType && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="videoUrl"
										className="block mb-2 text-sm font-medium text-gray-900">
										Video URL
									</label>
									<input
										id="videoUrl"
										type="text"
										{...register("videoUrl")}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
										placeholder="Enter video url here"
									/>
								</div>
							</div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
								{isLoading ? (
									<>
										<CircularProgress size={20} className="text-white" />
										<span>Creating...</span>
									</>
								) : (
									<>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4v16m8-8H4"
											/>
										</svg>
										<span>Create Shop</span>
									</>
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default React.memo(NewShopModal);
