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
import exteriorFeatures from "../../../subcomponents/ExteriorFeatures";
import interiorFeatures from "../../../subcomponents/InteriorFeatures";
import livingRoomFeatures from "../../../subcomponents/LivingRoomFeatures";
import kitchenFeatures from "../../../subcomponents/KitchenFeatures";

const NewApartmentModal = ({ open, handleClose }) => {
	const queryClient = useQueryClient();
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseURL}apartment`;
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "all" });

	const createApartment = async (data) => {
		setIsLoading(true);
		if (!auth || !auth?.accessToken) {
			navigate("/login");
			return;
		}
		const formData = new FormData();

		// Append form fields
		for (const key in data) {
			if (key === "exteriorFeatures") {
				data.exteriorFeatures.forEach((exterior) => {
					formData.append("exteriorFeatures[]", exterior);
				});
			} else if (key === "interiorFeatures") {
				data.interiorFeatures.forEach((interior) => {
					formData.append("interiorFeatures[]", interior);
				});
			} else if (key === "kitchenFeatures") {
				data.kitchenFeatures.forEach((kitchen) => {
					formData.append("kitchenFeatures[]", kitchen);
				});
			} else if (key === "livingRoomFeatures") {
				data.livingRoomFeatures.forEach((living) => {
					formData.append("livingRoomFeatures[]", living);
				});
			} else {
				formData.append(key, data[key]);
			}
		}

		try {
			const response = await post(url, formData, auth?.accessToken);
			setTimeout(() => {
				reset();
				handleClose();
				toast.success("New Apartment Created Successfully");
			}, 3000);
		} catch (err) {
			setIsLoading(false);
			setError(err.response?.data?.error || err.message);
		}
	};

	const { mutate } = useMutation(createApartment, {
		onSuccess: () => {
			setIsLoading(false);
			queryClient.invalidateQueries("properties");
			toast.success("New Apartment Created Successfully");
		},
	});

	const handleCreateApartment = (data) => {
		mutate(data);
		setTimeout(() => {
			handleClose();
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
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex items-center justify-center p-4">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none">
				<ToastContainer />
				{/* Modal content */}
				<div className="relative bg-white rounded-2xl shadow-2xl">
					{/* Modal header with gradient */}
					<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl sticky top-0 z-10">
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
							Create New Apartment
						</h3>
						<button
							type="button"
							onClick={handleClose}
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
							onSubmit={handleSubmit(handleCreateApartment)}
							method="post"
							className="space-y-4">
							<div className=" flex flex-col gap-2 mb-4">
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
										placeholder="Type Apartment name"
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
										Price
									</label>
									<input
										id="price"
										// rows="4"
										type="number"
										{...register("price", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Apartment Price here"
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
										placeholder="Enter Apartment Location here"
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
										htmlFor="bedrooms"
										className="block mb-2 text-sm font-medium text-gray-900">
										Bedrooms
									</label>
									<input
										id="bedrooms"
										name="bedrooms"
										type="number"
										{...register("bedrooms", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Number of bedrooms"
									/>
									{errors.bedrooms && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="bathroom"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Bathrooms
									</label>
									<input
										id="bathrooms"
										name="bathrooms"
										type="number"
										{...register("bathrooms", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Number of bathrooms here"
									/>
									{errors.bathrooms && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="floorArea"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										floorArea
									</label>
									<input
										id="floorArea"
										name="floorArea"
										type="number"
										{...register("floorArea", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Floor Area here"
									/>
									{errors.floorArea && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<fieldset>
										<legend className="text-base text-gray-900">
											{" "}
											Exterior Features :{" "}
										</legend>

										<div className="space-y-2 grid grid-cols-3 border p-2 rounded-lg">
											{exteriorFeatures.map((exterior, index) => (
												<label
													key={index}
													htmlFor={`extfeature-${index}`}
													className=" text-sm flex items-center gap-1">
													<Controller
														name="exteriorFeatures"
														control={control}
														render={({ field: { onChange, value } }) => (
															<input
																type="checkbox"
																id={`extfeature-${index}`}
																name="exteriorFeatures"
																value={`${exterior.value}`}
																checked={
																	value?.includes(exterior.value) || false
																}
																onChange={(e) => {
																	const isChecked = e.target.checked;
																	onChange(
																		isChecked
																			? [...(value || []), exterior.value]
																			: value.filter(
																					(item) => item !== exterior.value
																			  )
																	);
																}}
																className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
															/>
														)}
													/>

													{exterior.name}
												</label>
											))}
											{errors.exteriorFeatures && (
												<span className="text-red-500 text-sm">
													This field is required
												</span>
											)}
										</div>
									</fieldset>
								</div>
								<div className="sm:col-span-2">
									<fieldset>
										<legend className="text-base text-gray-900">
											{" "}
											Interior Features :{" "}
										</legend>

										<div className="space-y-2 grid grid-cols-3 border p-2 rounded-lg">
											{interiorFeatures.map((interior, index) => (
												<label
													key={index}
													htmlFor={`intfeature-${index}`}
													className=" text-sm flex items-center gap-1">
													<Controller
														name="interiorFeatures"
														control={control}
														render={({ field: { onChange, value } }) => (
															<input
																type="checkbox"
																id={`intfeature-${index}`}
																name="interiorFeatures"
																value={`${interior.value}`}
																checked={
																	value?.includes(interior.value) || false
																}
																onChange={(e) => {
																	const isChecked = e.target.checked;
																	onChange(
																		isChecked
																			? [...(value || []), interior.value]
																			: value.filter(
																					(item) => item !== interior.value
																			  )
																	);
																}}
																className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
															/>
														)}
													/>

													{interior.name}
												</label>
											))}
											{errors.interiorFeatures && (
												<span className="text-red-500 text-sm">
													This field is required
												</span>
											)}
										</div>
									</fieldset>
								</div>
								<div className="sm:col-span-2">
									<fieldset>
										<legend className="text-base text-gray-900">
											{" "}
											LivingRoom Features :{" "}
										</legend>

										<div className="space-y-2 grid grid-cols-2 border p-2 rounded-lg">
											{livingRoomFeatures.map((livingRoom, index) => (
												<label
													key={index}
													htmlFor={`lvfeature-${index}`}
													className=" text-sm flex items-center gap-1">
													<Controller
														name="livingRoomFeatures"
														control={control}
														render={({ field: { onChange, value } }) => (
															<input
																type="checkbox"
																id={`lvfeature-${index}`}
																name="livingRoomFeatures"
																value={`${livingRoom.value}`}
																checked={
																	value?.includes(livingRoom.value) || false
																}
																onChange={(e) => {
																	const isChecked = e.target.checked;
																	onChange(
																		isChecked
																			? [...(value || []), livingRoom.value]
																			: value.filter(
																					(item) => item !== livingRoom.value
																			  )
																	);
																}}
																className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
															/>
														)}
													/>

													{livingRoom.name}
												</label>
											))}
											{errors.livingRoomFeatures && (
												<span className="text-red-500 text-sm">
													This field is required
												</span>
											)}
										</div>
									</fieldset>
								</div>
								<div className="sm:col-span-2">
									<fieldset>
										<legend className="text-base text-gray-900">
											{" "}
											Kitchen Features :{" "}
										</legend>

										<div className="space-y-2 grid grid-cols-2 border p-2 rounded-lg">
											{kitchenFeatures.map((kitchen, index) => (
												<label
													key={index}
													htmlFor={`ktfeature-${index}`}
													className=" text-sm flex items-center gap-1">
													<Controller
														name="kitchenFeatures"
														control={control}
														render={({ field: { onChange, value } }) => (
															<input
																type="checkbox"
																id={`ktfeature-${index}`}
																name="kitchenFeatures"
																value={`${kitchen.value}`}
																checked={
																	value?.includes(kitchen.value) || false
																}
																onChange={(e) => {
																	const isChecked = e.target.checked;
																	onChange(
																		isChecked
																			? [...(value || []), kitchen.value]
																			: value.filter(
																					(item) => item !== kitchen.value
																			  )
																	);
																}}
																className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
															/>
														)}
													/>

													{kitchen.name}
												</label>
											))}
											{errors.kitchenFeatures && (
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
										<option value="Rent">Rent</option>
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
								className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
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
										<span>Create Apartment</span>
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

export default React.memo(NewApartmentModal);
