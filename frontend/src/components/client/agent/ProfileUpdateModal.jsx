import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import baseURL from "../../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import useUpdate from "../../../hooks/useUpdate"; // Custom hook for fetching data
import { CircularProgress } from "@mui/material";

const ProfileUpdateModal = ({ openUpdate, handleUpdateClose, agent }) => {
	const queryClient = useQueryClient();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const fetch = useFetch();
	const update = useUpdate();
	const [isLoading, setIsLoading] = useState(false);
	const url = `${baseURL}agent`;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ mode: "all" });

	// Set the form fields with the fetched data
	useEffect(() => {
		if (agent) {
			Object.entries(agent).forEach(([key, value]) => {
				setValue(key, value);
			});
		}
	}, [agent, setValue]);

	const updateAgent = async (data) => {
		setIsLoading(true);
		if (!auth || !auth?.accessToken) {
			navigate("/login");
			return;
		}
		const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key]);
		}

		try {
			const response = await update(url, data, auth?.accessToken);
		} catch (err) {
			setIsLoading(false);
			setError(err.response?.data?.error || err.message);
		}
	};

	const { mutate } = useMutation(updateAgent, {
		onSuccess: () => {
			setIsLoading(false);
			queryClient.invalidateQueries("agent");
			setTimeout(() => {
				handleUpdateClose();
			}, 3000);
			toast.success("Profile updated successfully");
		},
	});

	const handleCustomerUpdate = (data) => {
		mutate(data);
	};

	return (
		<Modal
			open={openUpdate}
			onClose={handleUpdateClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex items-center justify-center p-4">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none">
				<ToastContainer />
				{/* Modal content */}
				<div className="relative bg-white rounded-2xl shadow-2xl">
					{/* Modal header with gradient */}
					<div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 rounded-t-2xl">
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
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							Update Profile Information
						</h3>
						<button
							type="button"
							onClick={handleUpdateClose}
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
							onSubmit={handleSubmit(handleCustomerUpdate)}
							method="post"
							className="space-y-4">
							<div className="grid gap-4 mb-4 sm:grid-cols-2">
								<div className=" sm:col-span-2">
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Firstname:
									</label>
									<input
										type="text"
										name="firstname"
										id="firstname"
										{...register("firstname", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Type First name"
									/>
									{errors.firstname && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="lastname"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Lastname:
									</label>
									<input
										id="lastname"
										// rows="4"
										type="text"
										{...register("lastname", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Lastname here"
									/>
									{errors.lastname && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Email:
									</label>
									<input
										id="email"
										name="email"
										type="email"
										{...register("email", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Email here"
									/>
									{errors.email && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="phone"
										className="block mb-2 text-sm font-medium text-gray-900">
										Phone:
									</label>
									<input
										id="phone"
										name="phone"
										type="text"
										{...register("phone", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Phone Number"
									/>
									{errors.phone && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="identityNumber"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										identityNumber:
									</label>
									<input
										id="identityNumber"
										name="identityNumber"
										type="text"
										{...register("identityNumber", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter identityNumber here"
										disabled
									/>
									{errors.identityNumber && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="identityType"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										identityType:
									</label>
									<input
										id="identityType"
										name="identityType"
										type="text"
										{...register("identityType", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter identityType here"
										disabled
									/>
									{errors.identityType && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="contactAddress"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										contactAddress:
									</label>
									<input
										id="contactAddress"
										name="contactAddress"
										type="text"
										{...register("contactAddress", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter contactAddress here"
									/>
									{errors.contactAddress && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="agencyName"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Agency Name:
									</label>
									<input
										id="agencyName"
										name="agencyName"
										type="text"
										{...register("agencyName", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Agency Name here"
									/>
									{errors.agencyName && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="officeAddress"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Office Address:
									</label>
									<input
										id="officeAddress"
										name="officeAddress"
										type="text"
										{...register("officeAddress", { required: true })}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter Office Adress here"
									/>
									{errors.officeAddress && (
										<span className="text-red-500 text-sm">
											This field is required
										</span>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="whatsappLink"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Whatsapp Link:
									</label>
									<input
										id="whatsappLink"
										name="whatsappLink"
										type="text"
										{...register("whatsappLink")}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
										placeholder="Enter whatsapp Link"
									/>
								</div>
							</div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
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
										<span>Update Profile</span>
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

export default ProfileUpdateModal;
