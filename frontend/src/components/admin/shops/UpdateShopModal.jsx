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

const UpdateShopModal = ({ openUpdate, handleUpdateClose, shop }) => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [error, setError] = useState(null);
  const fetch = useFetch();
  const update = useUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const url = `${baseURL}shop`; 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Set the form fields with the fetched data
  useEffect(() => {
    if (shop) {
      Object.entries(shop).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [shop, setValue]);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const updateShop = async (data) => {
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    const formData = new FormData();
    formData.append('_id', shop._id)
    console.log(shop._id)
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('location', data.location);
    if (image) formData.append('image', image);
    formData.append('shopType', data.shopType);
    formData.append('category', data.category);
    formData.append('leaseDuration', data.leaseDuration);
    formData.append('securityDeposit', data.securityDeposit);
    //console.log(data)

    try {
      const response = await update(url, data, auth?.accessToken);
      console.log(response);
      setTimeout(() => {
        handleUpdateClose();
      }, 3000);
      toast.success('Shop updated successfully');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const { mutate } = useMutation(updateShop, {
    onSuccess: () => {
      queryClient.invalidateQueries('shop');
    }
  });

  const handleUpdateShop = (data) => {
    const updatedData = { ...data };
    mutate(updatedData);
    setTimeout(() => {
      handleUpdateClose();
    }, 3000);
    
  };

  if (isLoading) {
    return <p>{CircularProgress}</p>;
  }

  return (
    <Modal
      open={openUpdate}
      onClose={() => { handleUpdateClose(); }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden absolute top-3/6 right-1/4 z-50 justify-center items-center w-2/4 h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Shop
              </h3>
              <button
                type="button"
                onClick={() => { handleUpdateClose(); }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            </div>

            {/* Form */}
            <form 
              onSubmit={handleSubmit(handleUpdateShop)} 
              method="post"
              encType="multipart/form-data"
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    {...register("title", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Type Shop name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    {...register("description", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter the Description"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    {...register("price", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Shop Price here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    {...register("location", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Shop Location here"
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
                    Shop Type
                  </label>
                  <input
                    id="shopType"
                    type="text"
                    {...register("shopType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Shop Type here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="shopCategory"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Shop Category
                  </label>
                  <input
                    id="shopCategory"
                    type="text"
                    {...register("shopCategory", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                    placeholder="Enter Shop Category here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="leaseDuration"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Lease Duration
                  </label>
                  <input
                    id="leaseDuration"
                    type="number"
                    {...register("leaseDuration", { required: true })}
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
                      <option value="select shop type" disabled selected>Select Shop Type</option>
                        <option value="Rent">Rent</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                Update Shop
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateShopModal;
