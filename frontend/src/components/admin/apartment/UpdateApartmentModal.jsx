import React, { useState, useEffect } from 'react';
import useAuth from "../../../hooks/useAuth";
import baseURL from '../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch"; 
import useUpdate from "../../../hooks/useUpdate" // Custom hook for fetching data
import { CircularProgress } from '@mui/material';

const UpdateApartmentModal = ({ openUpdate, handleUpdateClose, apartment }) => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const update = useUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const url = `${baseURL}apartment`; 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Set the form fields with the fetched data
  useEffect(() => {
    if (apartment) {
      Object.entries(apartment).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [apartment, setValue]);


  const updateApartment = async (data) => {
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    const formData = new FormData();
    for (const key in data) {
      if (data[key]){
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await update(url, data, auth?.accessToken);
      console.log(response);
      setTimeout(() => {
        handleUpdateClose();
      }, 3000);
      toast.success('Apartment updated successfully');
    } catch (err) {
      setIsLoading(false)
      setError(err.response?.data?.error || err.message);
    }
  };

  const { mutate } = useMutation(updateApartment, {
    onSuccess: () => {
      queryClient.invalidateQueries('shops');
      setIsLoading(false)
    }
  });

  const handleApartmentUpdate = (data) => {
    mutate(data);
  };

  return (
    <Modal
      open={openUpdate}
      onClose={() => { handleUpdateClose(); }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-dvh">
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-3">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Apartment
              </h3>
              <button
                type="button"
                onClick={() => { handleUpdateClose(); }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center absolute border border-gray-800 right-3 top-0"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            {/* Form */}
            <form 
              onSubmit={handleSubmit(handleApartmentUpdate)} 
              method="post"
              // encType="multipart/form-data"
            >
              <div className="flex flex-col gap-2 mb-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    {...register("title", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Type Apartment name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description:
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    {...register("description", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter the Description"
                    required
                    rows='8'
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Price:
                  </label>
                  <input
                    id="price"
                    type="text"
                    {...register("price", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Apartment Price here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Location:
                  </label>
                  <input
                    id="location"
                    type="text"
                    {...register("location", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Apartment Location here"
                  />
                </div>

                <div className="sm:col-span-2">
                  <input 
                    value={auth?.user?._id}
                    {...register("owner")}
                    type="hidden" 
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="shopType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Bedrooms:
                  </label>
                  <input
                    id="bedrooms"
                    type="text"
                    {...register("bedrooms", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Number of bedrooms here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="bathrooms"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Bathrooms:
                  </label>
                  <input
                    id="bathrooms"
                    type="text"
                    {...register("bathrooms", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Number Bathroom here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="floorArea"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Floor Area
                  </label>
                  <input
                    id="floorArea"
                    type="text"
                    {...register("floorArea", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Lease Duration here"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Type
                  </label>
                    <select name="propertyType" id="propertyType"
                      {...register("propertyType", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    >
                      <option value="select apartment type" disabled selected>Select Apartment Type</option>
                        <option value="Rent">Rent</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                {isLoading ? <CircularProgress size={20} color='white' /> : 'Update Apartment'}
              </button>
            </form>
            <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateApartmentModal
