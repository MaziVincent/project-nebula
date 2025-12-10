import React, { useState, useEffect } from "react";
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseURL from "../../../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import landFeatures from "../../../subcomponents/LandFeatures";

const NewLandModal = ({ open, handleCloseLandModal }) => {
	const queryClient = useQueryClient();
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseURL}land`;
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		reset,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "all" });

	const createLand = async (data) => {
		setIsLoading(true);
		if (!auth || !auth?.accessToken) {
			navigate("/login");
			return;
		}
		const formData = new FormData();

		// Append form fields
		for (const key in data) {
			if (key === "landFeatures") {
				data.landFeatures.forEach((feature) => {
					formData.append("landFeatures[]", feature);
				});
			} else {
				formData.append(key, data[key]);
			}
		}

		try {
			const response = await post(url, formData, auth?.accessToken);
			setTimeout(() => {
				reset();
				handleCloseLandModal();
			}, 3000);
		} catch (err) {
			setIsLoading(false);
			setError(err.response?.data?.error || err.message);
		}
	};

	const { mutate } = useMutation(createLand, {
		onSuccess: () => {
			queryClient.invalidateQueries("properties");
			toast.success("New Land Created Successfully");
			setIsLoading(false);
		},
	});

	const handleCreateLand = (data) => {
		mutate(data);
		setTimeout(() => {
			handleCloseLandModal();
		}, 3000);
	};

	const [payType, setPayType] = useState(false);

	const propType = watch("propertyType");

	useEffect(() => {
		if (propType == "Rent") {
			setPayType(true);
		} else {
			setPayType(false);
		}
	}, [propType]);

	return (
		<Modal
			open={open}
			onClose={handleCloseLandModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex items-center justify-center p-4">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none">
				<ToastContainer />
				{/* Modal content */}
				<div className="relative bg-white rounded-2xl shadow-2xl">
					{/* Modal header with gradient */}
					<div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 rounded-t-2xl sticky top-0 z-10">
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
									d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Create New Land Listing
						</h3>
						<button
							type="button"
							onClick={handleCloseLandModal}
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
							onSubmit={handleSubmit(handleCreateLand)}
							method="post"
							encType="multipart/form-data"
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
										placeholder="Type Land name"
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
										Description:
									</label>
									<textarea
										rows="8"
										type="text"
										name="description"
										id="description"
										{...register("description", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter the Description"
										required=""></textarea>
									{errors.description && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="description"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Price:
									</label>
									<input
										id="price"
										// rows="4"
										type="number"
										{...register("price", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Price here"
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
										Location:
									</label>
									<input
										id="location"
										name="location"
										type="text"
										{...register("location", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Location here"
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
										htmlFor="plots"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Plots:
									</label>
									<input
										id="plots"
										name="plots"
										type="number"
										{...register("plots", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter plots here"
									/>
									{errors.plots && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="Document Type"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Document Type:
									</label>

									<select
										name="docType"
										id="docType"
										{...register("docType", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
										<option value="Select Document Type" selected disabled>
											Select Document Type
										</option>
										<option value="Power of Attorney">Power of Attorney</option>
										<option value="Certificate of Occupancy (C of O)">
											Certificate of Occupancy (C of O)
										</option>
										<option value="Deeds of Conveyance">
											Deeds of Conveyance
										</option>
										<option value="Deeds of Lease">Deeds of Lease</option>
										<option value="Deeds of Sub-Lease">
											Deeds of Sub-Lease
										</option>
									</select>
									{errors.docType && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="ownershipType"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Ownership Type
									</label>

									<select
										name="ownershipType"
										id="ownershipType"
										{...register("ownershipType", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
										<option value="Select Ownership Type" selected disabled>
											Select Ownership Type
										</option>
										<option value="Virgin">Virgin</option>
										<option value="Resell">Resell</option>
									</select>
									{errors.ownershipType && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<fieldset>
										<legend className="text-base text-gray-900">
											{" "}
											Land Features :{" "}
										</legend>

										<div className="space-y-2 grid grid-cols-2 border p-2 rounded-lg">
											{landFeatures.map((land, index) => (
												<label
													key={index}
													htmlFor={`ldfeature-${index}`}
													className=" text-sm flex items-center gap-1">
													<Controller
														name="landFeatures"
														control={control}
														render={({ field: { onChange, value } }) => (
															<input
																type="checkbox"
																id={`ldfeature-${index}`}
																name="landFeatures"
																value={`${land.value}`}
																checked={value?.includes(land.value) || false}
																onChange={(e) => {
																	const isChecked = e.target.checked;
																	onChange(
																		isChecked
																			? [...(value || []), land.value]
																			: value.filter(
																					(item) => item !== land.value
																			  )
																	);
																}}
																className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
															/>
														)}
													/>

													{land.name}
												</label>
											))}
											{errors.landFeatures && (
												<span className="text-red-500 text-sm">
													This field is required
												</span>
											)}
										</div>
									</fieldset>
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
										<option value="Lease">Lease</option>
										<option value="Sell">Sell</option>
									</select>
									{errors.propertyType && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								{payType && (
									<div className="sm:col-span-2">
										<label
											htmlFor="payment"
											className="block mb-2 text-sm font-medium text-gray-900 ">
											Payment Type
										</label>
										<select
											name="paymentType"
											id="payment"
											{...register("paymentType", { required: true })}
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
											<option value="select payment type" disabled selected>
												Select Payment Type
											</option>
											<option value="Day">Daily</option>
											<option value="Week">Weekly</option>
											<option value="Month">Monthly</option>
											<option value="6 Months">6 Months</option>
											<option value="Year">Yearly</option>
											<option value="2 Years">2 Years</option>
										</select>
										{errors.paymentType && (
											<span className="text-red-500 text-sm">
												This field is required
											</span>
										)}
									</div>
								)}
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
								className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
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
										<span>Create Land Listing</span>
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

export default React.memo(NewLandModal);
