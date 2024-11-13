import React, { useState, useEffect } from 'react';
import useAuth from "../../../hooks/useAuth";
import baseURL from '../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch"; 
import useUpdate from "../../../hooks/useUpdate" // Custom hook for fetching data
import { CircularProgress } from '@mui/material';
import landFeatures from '../../subcomponents/LandFeatures'

const UpdateLandModal = ({ openUpdate, handleUpdateClose, land }) => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const fetch = useFetch();
  const update = useUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const url = `${baseURL}land`; 

  
  const {
    register,
    reset,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Set the form fields with the fetched data
  useEffect(() => {
    if (land) {
      Object.entries(land).forEach(([key, value]) => {
        if(key === 'price'){
          setValue(key, parseInt(value.$numberDecimal))
        }else{

        setValue(key, value);
        }
      });
    }
  }, [land, setValue]);


  const updateLand = async (data) => {
    setIsLoading(true);
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    const formData = new FormData();

   // Append form fields
   for (const key in data) {

    if(key === 'landFeatures'){
      data.landFeatures.forEach((exterior) => {
        formData.append('landFeatures[]', exterior);
      })
    }
      else{
      formData.append(key, data[key]);
    }
  
    
  }
    //console.log(data)

    try {
      const response = await update(url, data, auth?.accessToken);
      console.log(response);
      setTimeout(() => {
        reset()
        handleUpdateClose();
      }, 3000);
      toast.success('Land updated successfully');
    } catch (err) {
      setIsLoading(false)
      setError(err.response?.data?.error || err.message);
    }
  };

  const { mutate } = useMutation(updateLand, {
    onSuccess: () => {
      queryClient.invalidateQueries('lands');
      setIsLoading(false);
    }
  });

  const handleLandUpdate = (data) => {
    data.landFeatures = selectedLandFeatures
    mutate(data)
    
  };

  const[payType, setPayType] = useState(false)

const propType = watch('propertyType')

useEffect(() => {
  if(propType == 'Lease'){
    setPayType(true)
  }else{
    setPayType(false)
  }
}, [propType])

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
        className=" overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-dvh">
          {/* <!-- Modal content --> */}
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-3">
            {/* <!-- Modal header --> */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Update Land
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
              onSubmit={handleSubmit(handleLandUpdate)} 
              method='post'
              encType='multipart/form-data'
            >
              <div className="flex flex-col gap-2 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description:
                  </label>
                  <textarea
                    rows='8'
                    type="text"
                    name="description"
                    id="description"
                    {...register("description", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter the Description"
                    required=""
                    >
                  </textarea>
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      
                      This field is required
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price:
                  </label>
                  <input
                    id="price"
                    // rows="4"
                    type='number'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Location:
                  </label>
                  <input
                    id="location"
                    name='location'
                    type='text'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Plots:
                  </label>
                  <input
                    id="plots"
                    name='plots'
                    type='number'
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Document Type:
                  </label>
                 
                  <select name="docType" id="docType"
                    {...register("docType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                  >
                    <option value="Select Document Type" selected disabled>Select Document Type</option>
                    <option value="Certificate of OwnerShip (C of O)">Certificate of OwnerShip (C of O)</option>
                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                    <option value="Deeds of Conveyance">Deeds of Conveyance</option>
                  </select>
                  {errors.docType && (
                    <span className="text-red-500 text-sm">
                      
                      This field is required
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <fieldset
                  >
                   <legend className='text-base text-gray-900'> Land Features : </legend>
                 
                  <div className='space-y-2 grid grid-cols-2 border p-2 rounded-lg'>
                 {landFeatures.map((land, index) => (
                   <label htmlFor={`ldfeature-${index}`} className=' text-sm flex items-center gap-1'>
                      <Controller 
                      name='landFeatures'
                      control={control}
                      render={({field:{onChange, value}}) => (
                        <input
                        type="checkbox"
                        id={`ldfeature-${index}`}
                        name="landFeatures"
                        value={`${land.value}`}
                        checked={value?.includes(land.value) || false}
                        onChange={(e) =>{
                           const isChecked = e.target.checked;
                          onChange(
                            isChecked
                              ? [...(value || []), land.value]
                              : value.filter((item) => item !== land.value)
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
                    htmlFor="ownershipType"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Ownership Type
                  </label>
         
                  <select name="ownershipType" id="ownershipType"
                    {...register("ownershipType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                  >
                    <option value="Select Ownership Type" selected disabled>Select Ownership Type</option>
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
                      <option value="select land type" disabled selected>Selected Land Type</option>
                        <option value="Lease">Lease</option>
                        <option value="Sell">Sell</option>
                    </select>
                    {errors.propertyType && (
                      <span className="text-red-500 text-sm">
                        
                        This field is required
                      </span>
                    )}
                </div>
                {
                  payType &&  <div className="sm:col-span-2">
                  <label
                    htmlFor="payment"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                   Payment Type
                  </label>
                    <select name="paymentType" id="payment"
                      {...register("paymentType", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    >
                      <option value="select payment type" disabled selected>Select Payment Type</option>
                        {/* <option value="Day">Daily</option>
                        <option value="Week">Weekly</option> */}
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
                }
               
              </div>
              <button
                type="submit"
                className="text-green-50 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {isLoading ? <CircularProgress size={20} color='white' /> : 'Update Land'}
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateLandModal
