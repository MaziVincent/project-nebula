import React, { useState } from 'react'
import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseURL from '../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';

const CreateShop = ({open, handleClose}) => {
  const queryClient = useQueryClient();
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseURL}shop`;
  const navigate = useNavigate()
  const [image, setImage] = useState()
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]); // Ensure the file is selected
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const createShop = async (data) => {
    if (!auth || !auth?.accessToken) {
      navigate('/login')
      return;
    }
    const formData = new FormData();
  
  // Append form fields
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('price', data.price);
  formData.append('owner', auth.user?._id);
  formData.append('location', data.location);
  formData.append('shopType', data.shopType);
  formData.append('shopCategory', data.shopCategory);
  formData.append('leaseDuration', data.leaseDuration);
  formData.append('securityDeposit', data.securityDeposit);
  
  // Append the image file if it exists
  if (image) {
    formData.append('image', image);
  }

  // Log the FormData contents
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
    try{
      const response = await post(url, formData, auth?.accessToken);
      console.log(response.data);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    }
    console.log(formData)
  };

  const {mutate} = useMutation(createShop, {
    
    onSuccess : ()=>{
      queryClient.invalidateQueries('shop')
      toast.success('New Shop Created Successfully')

  
    }
  })

  const handleCreateShop = (data) => {
  // Pass the image and form data to mutate
  const shopData = { ...data, image }; 
  mutate(shopData);  // Pass both form data and image
  setTimeout(() => {
    handleClose();
  }, 3000);
};
  // console.log(auth)
  return (
    <Modal
      open={open}
      onClose={() => {handleClose()}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-3/6   right-1/4 z-50 justify-center items-center w-2/4  h-modal md:h-full"
      >
        <ToastContainer />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create Shop
              </h3>
              <button
                type="button"
                onClick={() => {handleClose()}}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            </div>
            {/* <!-- Modal body --> */}
            <form 
              onSubmit={handleSubmit(handleCreateShop)} 
              method='post'
              encType='multipart/form-data'
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                    placeholder="Type Shop name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="framework"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    {...register("description", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter the Description"
                    required=""
                    >
                  </textarea>
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
                    rows="4"
                    type='number'
                    {...register("price", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Shop Price here"
                  />
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
                    name='location'
                    type='text'
                    {...register("location", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Shop Location here"
                  />
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
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    shopType
                  </label>
                  <input
                    id="shoptype"
                    name='shopType'
                    type='text'
                    {...register("shopType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Shop Type here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    shopCategory
                  </label>
                  <input
                    id="shopCategory"
                    name='shopCategory'
                    type='text'
                    {...register("shopCategory", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Shop Category here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    leaseDuration
                  </label>
                  <input
                    id="leaseDuration"
                    name='leaseDuration'
                    type='number'
                    {...register("leaseDuration", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Shop leaseDuration here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="loation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    security Deposit
                  </label>
                  <input
                    id="securityDeposit"
                    name='securityDeposit'
                    type='number'
                    {...register("securityDeposit", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Shop security Deposit here"
                  />
                </div>
                <div className='sm:col-span-2'>
                  <input 
                    className='border border-gray-500 text-gray-300 font-medium focus:outline-gray-300 rounded-md px-2 py-2'
                    type="file"
                    name="image"
                    id="image"
                    title='image'
                    onChange={handleFileUpload} 
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
                Add new Shop
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateShop;