import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import baseURL from "../../../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import useUpdate from "../../../../hooks/useUpdate";
import { CircularProgress } from "@mui/material";

const PropertyStatusModal = ({ openStatus, handleCloseStatus, property }) => {
	const { auth } = useAuth();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const fetch = useFetch();
	const update = useUpdate();
	const url = `${baseURL}properties/status`;
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (property) {
			Object.entries(property).forEach(([key, value]) => {
				setValue(key, value);
			});
		}
	}, [property, setValue]);

	const updateStatus = async (status) => {
		if (!auth || !auth?.accessToken) {
			navigate("/login");
			return;
		}
		const formData = new FormData();
		formData.append("status", status);
		try {
			const response = await update(
				`${url}/${property._id}`,
				formData,
				auth?.accessToken
			);
			setTimeout(() => {
				toast.success("Property status updated successfully");
				handleCloseStatus();
			}, 2000);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const { mutate } = useMutation(updateStatus, {
		onSuccess: () => {
			queryClient.invalidateQueries("properties");
		},
	});

	const handleStatusUpdate = (data) => {
		mutate(data.status);
		setTimeout(() => {
			handleCloseStatus();
		}, 3000);
	};

	// Render the component
	return (
		<Modal
			open={openStatus}
			onClose={handleCloseStatus}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex justify-center items-center p-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-2xl outline-none">
				{/* Header */}
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
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Update Property Status
					</h3>
					<button
						type="button"
						onClick={handleCloseStatus}
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

				{/* Body */}
				<div className="p-6">
					<form
						onSubmit={handleSubmit(handleStatusUpdate)}
						className="space-y-4">
						<div>
							<label
								htmlFor="status"
								className="block text-sm font-semibold text-gray-700 mb-2">
								Select New Status
							</label>
							<select
								id="status"
								{...register("status", { required: true })}
								className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200">
								<option value="Available">✓ Available</option>
								<option value="Pending">⏳ Pending</option>
								<option value="Sold">🏠 Sold</option>
								<option value="Rented">🔑 Rented</option>
							</select>
						</div>
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
							Update Status
						</button>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default React.memo(PropertyStatusModal);
