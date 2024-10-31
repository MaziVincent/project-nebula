import React, { useState } from 'react'
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseURL from '../../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const CreateNewLandModal = ({open, handleCloseLandModal}) => {
  const queryClient = useQueryClient();
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseURL}land`;
  const navigate = useNavigate()
  const [image, setImage] = useState()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

    const createLand = async (data) => {
      setLoading(true)
      if (!auth || !auth?.accessToken) {
        navigate('/login')
        return;
      }
      const formData = new FormData();
    
    // Append form fields
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    
      try{
        const response = await post(url, formData, auth?.accessToken);
        console.log(response.data);
        setTimeout(() => {
          handleCloseLandModal();
        }, 3000);
      } catch (err) {
        setLoading(false)
        setError(err.response?.data?.error || err.message)
      }
      console.log(formData)
    };

    const {mutate} = useMutation(createLand, {
      
      onSuccess : ()=>{
        queryClient.invalidateQueries('properties')
        toast.success('New Land Created Successfully')
        setLoading(false)
      }
    })

    const handleCreateLand = (data) => {
    mutate(data); 
    setTimeout(() => {
      handleCloseLandModal();
    }, 3000);
  };
  return (
    <Modal
      open={open}
      onClose={() => {handleCloseLandModal()}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-svh">
          {/* <!-- Modal content --> */}
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-10">
            {/* <!-- Modal header --> */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create Land
              </h3>
              <button
                type="button"
                onClick={() => {handleCloseLandModal()}}
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
              onSubmit={handleSubmit(handleCreateLand)} 
              method='post'
              encType='multipart/form-data'
            >
              <div className="flex flex-col gap-3 mb-4">
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
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="Document Type"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Document Type:
                  </label>
                  {/* <input
                    id="docType"
                    name='docType'
                    type='text'
                    {...register("docType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter docType here"
                  /> */}
                  <select name="docType" id="docType"
                    {...register("docType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                  >
                    <option value="Select Document Type" selected disabled>Select Document Type</option>
                    <option value="Certificate of OwnerShip (C of O)">Certificate of OwnerShip (C of O)</option>
                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                    <option value="Deeds of Conveyance">Deeds of Conveyance</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="ownershipType"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Ownership Type
                  </label>
                  {/* <input
                    id="ownershipType"
                    name='ownershipType'
                    type='text'
                    {...register("ownershipType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter ownershipType here"
                  /> */}
                  <select name="ownershipType" id="ownershipType"
                    {...register("ownershipType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                  >
                    <option value="Select Ownership Type" selected disabled>Select Ownership Type</option>
                    <option value="Virgin Land">Virgin Land</option>
                    <option value="Resell">Resell</option>
                  </select>
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
                      <option value="select land type" disabled selected>Select Land Type</option>
                        <option value="Lease">Lease</option>
                        <option value="Sell">Sell</option>
                    </select>
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
                {loading ? <CircularProgress color='white' size={20} /> : 'Add New Land'}
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CreateNewLandModal
