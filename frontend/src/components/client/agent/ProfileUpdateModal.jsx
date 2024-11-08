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

const ProfileUpdateModal = ({openUpdate, handleUpdateClose, agent}) => {
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
    setIsLoading(true)
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    //console.log(data)

    try {
      const response = await update(url, data, auth?.accessToken);
      console.log(response);
    } catch (err) {
      setIsLoading(false)
      setError(err.response?.data?.error || err.message);
    }
  };

  const { mutate } = useMutation(updateAgent, {
    onSuccess: () => {
      setIsLoading(false);
      queryClient.invalidateQueries('agent');
      setTimeout(() => {
        handleUpdateClose();
      }, 3000);
      toast.success('Profile updated successfully');
    }
  });

  const handleCustomerUpdate = (data) => {
    mutate(data);
    
  };

  return (
    <Modal
      open={openUpdate}
      onClose={() => {handleUpdateClose()}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-8  z-50 justify-center items-center w-full outline-none"
      >
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-dvh">
          {/* <!-- Modal content --> */}
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-5">
            {/* <!-- Modal header --> */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Update your Profile Information
              </h3>
              <button
                type="button"
                onClick={() => {handleUpdateClose()}}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center absolute border border-gray-800 right-3 top-0"
                data-modal-toggle="defaultModal"
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
                <span className="sr-only">Close modal</span>
              </button>
            <form 
              onSubmit={handleSubmit(handleCustomerUpdate)} 
              method='post'
              // encType=''
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className=' sm:col-span-2'>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Lastname:
                  </label>
                  <input
                    id="lastname"
                    // rows="4"
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name='email'
                    type='email'
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
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone:
                  </label>
                  <input
                    id="phone"
                    name='phone'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    identityNumber:
                  </label>
                  <input
                    id="identityNumber"
                    name='identityNumber'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    identityType:
                  </label>
                  <input
                    id="identityType"
                    name='identityType'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    contactAddress:
                  </label>
                  <input
                    id="contactAddress"
                    name='contactAddress'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Agency Name:
                  </label>
                  <input
                    id="agencyName"
                    name='agencyName'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Office Address:
                  </label>
                  <input
                    id="officeAddress"
                    name='officeAddress'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Whatsapp Link:
                  </label>
                  <input
                    id="whatsappLink"
                    name='whatsappLink'
                    type='text'
                    {...register("whatsappLink")}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter whatsapp Link"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-green-50 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {isLoading ? <CircularProgress size={20} color='white' /> : 'Update Profile'}
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileUpdateModal
