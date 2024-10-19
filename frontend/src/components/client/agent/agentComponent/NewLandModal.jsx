import React, { useState } from 'react'
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseURL from '../../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';

const NewLandModal = ({open, handleCloseLandModal}) => {
  const queryClient = useQueryClient();
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseURL}land`;
  const navigate = useNavigate()
  const [image, setImage] = useState()
  const [docImage, setDocImage] = useState()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([]);
  const handleFileUpload = (e) => {
    setFiles(e.target.files);
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

    const createLand = async (data) => {
      if (!auth || !auth?.accessToken) {
        navigate('/login')
        return;
      }
      const formData = new FormData();
    
    // Append form fields
    for (const key in data) {
      if (data[key] && key !== 'image' && key !== 'docImage') {
        formData.append(key, data[key]);
      }
    }
    // Append the image file if it exists
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
  }
  for (let i = 0; i < files.length; i++) {
    formData.append('docImages', files[i]);
}
    // Log the FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
      try{
        const response = await post(url, formData, auth?.accessToken);
        console.log(response.data);
        setTimeout(() => {
          handleCloseLandModal();
        }, 3000);
      } catch (err) {
        setError(err.response?.data?.error || err.message)
      }
      console.log(formData)
    };

    const {mutate} = useMutation(createLand, {
      
      onSuccess : ()=>{
        queryClient.invalidateQueries('lands')
        toast.success('New Land Created Successfully')
        setLoading(false)
      }
    })

    const handleCreateLand = (data) => {
    // Pass the image and form data to mutate
    setLoading(true)
    const landData = { ...data, image, docImage }; 
    mutate(landData);  // Pass both form data and image
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
        className=" overflow-y-auto overflow-x-hidden absolute top-3/6   right-1/4 z-50 justify-center items-center w-2/4  h-modal md:h-full"
      >
        <ToastContainer />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create Land
              </h3>
              <button
                type="button"
                onClick={() => {handleCloseLandModal()}}
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
              onSubmit={handleSubmit(handleCreateLand)} 
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
                    rows='4'
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
                    type='text'
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
                    type='text'
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
                  <input
                    id="docType"
                    name='docType'
                    type='text'
                    {...register("docType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter docType here"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="ownershipType"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Ownership Type
                  </label>
                  <input
                    id="ownershipType"
                    name='ownershipType'
                    type='text'
                    {...register("ownershipType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter ownershipType here"
                  />
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
                Add New Land
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewLandModal
