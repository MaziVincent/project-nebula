import React, { useState, useEffect } from 'react'
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseURL from '../../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import exteriorFeatures from '../../../subcomponents/ExteriorFeatures';
import interiorFeatures from '../../../subcomponents/InteriorFeatures';
import livingRoomFeatures from '../../../subcomponents/LivingRoomFeatures';
import kitchenFeatures from '../../../subcomponents/KitchenFeatures';

const NewApartmentModal = ({open, handleClose}) => {
  const queryClient = useQueryClient();
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseURL}apartment`;
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  
 

  const {
    register,
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const createApartment = async (data) => {
    setIsLoading(true)
    if (!auth || !auth?.accessToken) {
      navigate('/login')
      return;
    }
    const formData = new FormData();
  
  // Append form fields
  for (const key in data) {

    if(key === 'exteriorFeatures'){
      data.exteriorFeatures.forEach((exterior) => {
        formData.append('exteriorFeatures[]', exterior);
      })
    }else if(key === 'interiorFeatures' ){
      data.interiorFeatures.forEach((interior) => {
        formData.append('interiorFeatures[]', interior);
      })
      
    }else if(key === 'kitchenFeatures'){
      data.kitchenFeatures.forEach((kitchen) => {
        formData.append('kitchenFeatures[]', kitchen);
      })
      
    }else if(key === 'livingRoomFeatures'){
      data.livingRoomFeatures.forEach((living) => {
        formData.append('livingRoomFeatures[]', living);
      })
      
    }else{
      formData.append(key, data[key]);
    }
  
      
    
  }

    try{
      const response = await post(url, formData, auth?.accessToken);
     // console.log(response.data);
      setTimeout(() => {
        reset()
        handleClose();
        toast.success("New Apartment Created Successfully");
      }, 3000);
    } catch (err) {
      setIsLoading(false)
      setError(err.response?.data?.error || err.message)
    }
    //console.log(formData)
  };

  const {mutate} = useMutation(createApartment, {
    
    onSuccess : ()=>{
      setIsLoading(false)
      queryClient.invalidateQueries("properties");
      toast.success('New Apartment Created Successfully')

    }
  })

  const handleCreateApartment = (data) => {
    mutate(data); 
    setTimeout(() => {
      handleClose();
    }, 3000);
};

const[payType, setPayType] = useState(false)

const propType = watch('propertyType')

useEffect(() => {
  if(propType == 'Rent'){
    setPayType(true)
  }else{
    setPayType(false)
  }
}, [propType])

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-dvh">
          {/* <!-- Modal content --> */}
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-3">
            {/* <!-- Modal header --> */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create Apartment
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                }}
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
              {/* <!-- Modal body --> */}
              <form
                onSubmit={handleSubmit(handleCreateApartment)}
                method="post"
              >
                <div className=" flex flex-col gap-2 mb-4">
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
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
                      required=""
                    ></textarea>
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
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
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
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
                            className=" text-sm flex items-center gap-1"
                          >
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
                            className=" text-sm flex items-center gap-1"
                          >
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
                            className=" text-sm flex items-center gap-1"
                          >
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
                            className=" text-sm flex items-center gap-1"
                          >
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Type
                    </label>
                    <select
                      name="propertyType"
                      id="propertyType"
                      {...register("propertyType", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    >
                      <option
                        value="select land type"
                        disabled
                        selected
                      >
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
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Payment Type
                      </label>
                      <select
                        name="paymentType"
                        id="payment"
                        {...register("paymentType", { required: true })}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      >
                        <option
                          value="select payment type"
                          disabled
                          selected
                        >
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
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
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
                  className="text-green-50 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {isLoading ? <CircularProgress /> : "Add new Aparrtment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewApartmentModal;