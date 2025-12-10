import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import useUpdate from "../../../../hooks/useUpdate"; // Custom hook for fetching data
import { CircularProgress } from "@mui/material";
import exteriorFeatures from "../../../subcomponents/ExteriorFeatures";
import interiorFeatures from "../../../subcomponents/InteriorFeatures";
import livingRoomFeatures from "../../../subcomponents/LivingRoomFeatures";
import kitchenFeatures from "../../../subcomponents/KitchenFeatures";
import landFeatures from "../../../subcomponents/LandFeatures";

const UpdatePropertyModal = ({
	property,
	openUpdate,
	handleCloseUpdate,
	url,
}) => {
	const queryClient = useQueryClient();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const fetch = useFetch();
	const update = useUpdate();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedProperty, setSelectedProperty] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		control,
		watch,
		formState: { errors },
	} = useForm({ mode: "all" });

	// Set the form fields with the fetched data
	useEffect(() => {
		if (property) {
			Object.entries(property).forEach(([key, value]) => {
				if (key === "price") {
					setValue(key, parseInt(value.$numberDecimal));
				} else {
					setValue(key, value);
				}
			});
			setSelectedProperty(property.type);
		}
	}, [property, setValue]);

	const updateProperty = async (data) => {
		setIsLoading(true);
		if (!auth || !auth?.accessToken) {
			navigate("/login");
			return;
		}
		const formData = new FormData();

		//Append form fields
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
			} else if (key === "landFeatures") {
				data.landFeatures.forEach((feature) => {
					formData.append("landFeatures[]", feature);
				});
			} else {
				formData.append(key, data[key]);
			}
		}

		try {
			const response = await update(url, data, auth?.accessToken);
			setTimeout(() => {
				handleCloseUpdate();
			}, 3000);
			toast.success("Property updated successfully");
		} catch (err) {
			setIsLoading(false);
			setError(err.response?.data?.error || err.message);
		}
	};

	const { mutate } = useMutation(updateProperty, {
		onSuccess: () => {
			setIsLoading(false);
			queryClient.invalidateQueries("properties");
		},
	});

	const handlePropertyUpdate = (data) => {
		if (data.propertyType === "Sell") {
			data.paymentType = "";
		}
		mutate(data);
	};

	const [payType, setPayType] = useState(false);

	const propType = watch("propertyType");

	useEffect(() => {
		if (propType == "Rent") {
			setPayType(true);
		} else if (propType == "Lease") {
			setPayType(true);
		} else {
			setPayType(false);
		}
	}, [propType]);
	return (
		<Modal
			open={openUpdate}
			onClose={handleCloseUpdate}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex items-center justify-center p-4">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none">
				<ToastContainer />
				{property ? (
					<div className="relative bg-white rounded-2xl shadow-2xl">
						{/* Modal header with gradient */}
						<div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 rounded-t-2xl sticky top-0 z-10">
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
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
								Update Property
							</h3>
							<button
								type="button"
								onClick={handleCloseUpdate}
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
								onSubmit={handleSubmit(handlePropertyUpdate)}
								method="post"
								className="space-y-4">
								<div className="flex flex-col gap-4 mb-4">
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
											placeholder="Type House name"
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
											Location
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

									{selectedProperty === "House" && (
										<div className="gap-4 mb-4 space-y-4">
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
													htmlFor="squareFootage"
													className="block mb-2 text-sm font-medium text-gray-900 ">
													Square Footage:
												</label>
												<input
													id="squareFootage"
													name="squareFootage"
													type="number"
													{...register("squareFootage", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
													placeholder="Enter squareFootage here"
												/>
												{errors.squareFootage && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="yearBuilt"
													className="block mb-2 text-sm font-medium text-gray-900 ">
													Year Built:
												</label>
												<input
													id="yearBuilt"
													name="yearBuilt"
													type="number"
													min="1900"
													max="2100"
													step="1"
													{...register("yearBuilt", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
													placeholder="Enter year Built here"
												/>
												{errors.yearBuilt && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="lotSize"
													className="block mb-2 text-sm font-medium text-gray-900 ">
													Plot Size:
												</label>
												<input
													id="lotSize"
													name="lotSize"
													type="number"
													{...register("lotSize", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
													placeholder="Enter lotSize here"
												/>
												{errors.lotSize && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="buildingType"
													className="block mb-2 text-sm font-medium text-gray-900 ">
													Select Building Type:
												</label>
												<select
													name="buildingType"
													id="buildingType"
													{...register("buildingType", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
													<option value="Select" selected disabled>
														-- Select Type --
													</option>
													<option value="Bungalow">Bungalow</option>
													<option value="Duplex">Duplex</option>
													<option value="One Story">One Story</option>
													<option value="Two Stories">Two Story</option>
													<option value="Three Stories">Three Story</option>
													<option value="Four Stories">Four Story</option>
													<option value="Five Stories">Skyscraper</option>
												</select>
												{errors.buildingType && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="docType"
													className="block mb-2 text-sm font-medium text-gray-900 ">
													Document Type:
												</label>
												<select
													name="docType"
													id="docType"
													{...register("docType", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
													<option
														value="Select Document Type"
														selected
														disabled>
														Select Document Type
													</option>
													<option value="Power of Attorney">
														Power of Attorney{" "}
													</option>
													<option value="Certificate of Occupancy (C of O)">
														Certificate of Occupancy (C of O)
													</option>
													<option value="Deeds of Conveyance">
														Deeds of Conveyance
													</option>
													<option value="Deeds of Sub-Lease">
														Deeds of Sub-Lease
													</option>
													<option value="Deeds of Lease">Deeds of Lease</option>
												</select>
												{errors.docType && (
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
																								(item) =>
																									item !== exterior.value
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
																								(item) =>
																									item !== interior.value
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
																				value?.includes(livingRoom.value) ||
																				false
																			}
																			onChange={(e) => {
																				const isChecked = e.target.checked;
																				onChange(
																					isChecked
																						? [
																								...(value || []),
																								livingRoom.value,
																						  ]
																						: value.filter(
																								(item) =>
																									item !== livingRoom.value
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
										</div>
									)}
									{selectedProperty === "Apartment" && (
										<div className="gap-4 mb-4 space-y-4">
											<div className="sm:col-span-2">
												<label
													htmlFor="shopType"
													className="block mb-2 text-sm font-medium text-gray-900">
													Bedrooms:
												</label>
												<input
													id="bedrooms"
													type="number"
													{...register("bedrooms", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
													placeholder="Enter Number of bedrooms here"
												/>
												{errors.bedrooms && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="bathrooms"
													className="block mb-2 text-sm font-medium text-gray-900">
													Bathrooms:
												</label>
												<input
													id="bathrooms"
													type="number"
													{...register("bathrooms", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
													placeholder="Enter Number Bathroom here"
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
													className="block mb-2 text-sm font-medium text-gray-900">
													Floor Area
												</label>
												<input
													id="floorArea"
													type="number"
													{...register("floorArea", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
													placeholder="Enter Lease Duration here"
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
																								(item) =>
																									item !== exterior.value
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
																								(item) =>
																									item !== interior.value
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
																				value?.includes(livingRoom.value) ||
																				false
																			}
																			onChange={(e) => {
																				const isChecked = e.target.checked;
																				onChange(
																					isChecked
																						? [
																								...(value || []),
																								livingRoom.value,
																						  ]
																						: value.filter(
																								(item) =>
																									item !== livingRoom.value
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
										</div>
									)}

									{selectedProperty === "Land" && (
										<div className="gap-4 mb-4 space-y-4">
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
													htmlFor="docType"
													className="block mb-2 text-sm font-medium text-gray-900 ">
													Document Type:
												</label>
												<select
													name="docType"
													id="docType"
													{...register("docType", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
													<option
														value="Select Document Type"
														selected
														disabled>
														Select Document Type
													</option>
													<option value="Power of Attorney">
														Power of Attorney{" "}
													</option>
													<option value="Certificate of Occupancy (C of O)">
														Certificate of Occupancy (C of O)
													</option>
													<option value="Deeds of Conveyance">
														Deeds of Conveyance
													</option>
													<option value="Deeds of Sub-Lease">
														Deeds of Sub-Lease
													</option>
													<option value="Deeds of Lease">Deeds of Lease</option>
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
													<option
														value="Select ownership Type"
														selected
														disabled>
														Select ownership Type
													</option>
													<option value="Virgin Land">Virgin Land</option>
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
																			checked={
																				value?.includes(land.value) || false
																			}
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
										</div>
									)}
									{selectedProperty === "Shop" && (
										<div className=" gap-4 mb-4 space-y-4">
											<div className="sm:col-span-2">
												<label
													htmlFor="shopCategory"
													className="block mb-2 text-sm font-medium text-gray-900">
													Shop Category
												</label>
												<select
													name="shopCategory"
													id="shopCategory"
													{...register("shopCategory", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
													<option
														value="Select Shop Category"
														selected
														disabled>
														Select Shop Category
													</option>
													<option value="Warehouse">Warehouse</option>
													<option value="Retail Store">Retail Store</option>
													<option value="Office Space">Office Space</option>
													<option value="Showroom">Showroom</option>
													<option value="Pharmacy Store">Pharmacy Store</option>
													<option value="Boutique">Boutique</option>
													<option value="General Purpose">
														General Purpose
													</option>
												</select>
												{errors.shopCategory && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="leaseDuration"
													className="block mb-2 text-sm font-medium text-gray-900">
													Lease Duration
												</label>
												<input
													id="leaseDuration"
													type="number"
													{...register("leaseDuration", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
													placeholder="Enter Lease Duration here"
												/>
												{errors.leaseDuration && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>

											<div className="sm:col-span-2">
												<label
													htmlFor="securityDeposit"
													className="block mb-2 text-sm font-medium text-gray-900">
													Security Deposit
												</label>
												<input
													id="securityDeposit"
													type="number"
													{...register("securityDeposit", { required: true })}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
													placeholder="Enter Securoty Deposit here"
												/>
												{errors.securityDeposit && (
													<span className="text-red-500 text-sm">
														This field is required
													</span>
												)}
											</div>
										</div>
									)}
									<div className="mb-4">
										<label
											htmlFor="status"
											className="block text-sm font-medium text-gray-700">
											Type:
										</label>
										<select
											id="propertyType"
											{...register("propertyType", { required: true })}
											className="mt-1 p-2 border border-gray-300 rounded-md w-full">
											<option value="Rent">Rent</option>
											<option value="Sell">Sell</option>
											<option value="Lease">Lease</option>
										</select>
										{errors.propertyType && (
											<span className="text-red-500 text-sm">
												This field is required
											</span>
										)}
									</div>
									{payType && (
										<div>
											{property.paymentType && (
												<div className="sm:col-span-2">
													<label
														htmlFor="payment"
														className="block mb-2 text-sm font-medium text-gray-900 ">
														Payment Type
													</label>
													<select
														name="paymentType"
														id="payment"
														defaultValue={property.paymentType}
														{...register("paymentType", { required: true })}
														className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 ">
														<option
															value="select payment type"
															disabled
															selected>
															Select Payment Type
														</option>
														<option value="Day">Daily</option>
														<option value="Week">Weekly</option>
														<option value="Month">Monthly</option>
														<option value="6 Months">6 Months</option>
														<option value="Year">Yearly</option>
														<option value="2 Years">2 Years</option>
													</select>
												</div>
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
									className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
									{isLoading ? (
										<>
											<CircularProgress size={20} className="text-white" />
											<span>Updating...</span>
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
													d="M5 13l4 4L19 7"
												/>
											</svg>
											<span>Update Property</span>
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center p-8">
						<p>Property details loading</p>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default React.memo(UpdatePropertyModal);
