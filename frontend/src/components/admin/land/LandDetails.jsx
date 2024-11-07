import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import DeletePropertyModal from '../property/DeletePropertyModal';
import UpdateLandModal from './UpdateLandModal';
import UploadPropertyImage from '../property/UploadPropertyImage';
import UploadLandDocModal from './UploadLandDocModal';
import { useQuery } from 'react-query';

const LandDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}land`;
  const { id } = useParams();
  
  //updatemodal
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  

  //deletemodal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")
  const [landId, setLandId] = useState("")


  //upload image
  const [openUpload, setOpenUpload] = useState(false)
  const handleOpenUpload = () => setOpenUpload(true)
  const handleUploadClose = () => setOpenUpload(false)

  //document upload
  const [openDocUpload, setOpenDocUpload] = useState(false)
  const handleOpenDocUpload = () => setOpenDocUpload(true)
  const handleDocUploadClose = () => setOpenDocUpload(false)

  const [land, setLand] = useState(null);
  
  const [isUpload, setIsUpload] = useState(false)
  const toggleUpload = () => setIsUpload(!isUpload) 

  const handleLandDetails = async () => {
    try {
      // Fetch the specific lands details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      setLand(result.data); 
     return result.data
    } catch (error) {
      toast.error("Error fetching other details");
      console.log("Fetch error:", error);
    }
  };
  
  const { data, isError, isLoading, isSuccess } = useQuery(
    ["land"],
     handleLandDetails,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always",
        onSuccess: () => {
          setTimeout(() => {
          }, 2000)
        }
    }
  );

  return (
    <div className='mt-4'>
        <ToastContainer />
        <div className='py-5 mt-0 mb-2'>
        <Link to='/admin/lands'>
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 28 28"
          className=' h-7 w-7 text-gray-400 hover:text-green-600'
          fill="currentColor">
          <path d="M0 0h24v24H0V0z" 
          fill="none"/>
          <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"/></svg>
        </Link>
      </div>
      {/* Render shop details */}
      {land ? (
        <div>
          <div className=''>
          <div className=' leading-3 mb-4'>
              <h1 className='text-xl inline-flex gap-2 items-center mb-0 leading-none'>Title: <span className='text-lg font-semi-bold text-gray-800 uppercase'>{land.title}</span></h1>
              <p className='m-0'>Owner: <span className=' text-gray-700 text-sm tracking-wider underline'>{land?.owner?.firstname} {land?.owner?.lastname}</span></p>
             </div>
            <div className=' grid grid-cols-3 gap-2 shadow-md duration-200 delay-100 ease-in-out overflow-hidden'>
              {
                land.imageUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={land.title} className=' w-full h-full duration-300 delay-300 ease-in-out  hover:scale-105' />
                ))
              }
            </div>
            <p>Status: <span>{land.status}</span></p>
            <p className=' mb-1'>Price: <span>{parseFloat(land.price.$numberDecimal).toLocaleString('en-US')}</span></p>
            <p className=' mb-1'>Location: <span>{land.location}</span></p>
            <div>
              <p>plots: <span>{land.plots}</span></p>
              <p>docType: <span>{land.docType}</span></p>
              <p>ownershipType: <span>{land.ownershipType}</span></p>
              <div>
                <img src={''} alt="" />
              </div>
            </div>
          </div>
          <p className=' flex flex-col justify-start gap-2'>
            <span>Description:</span>
            <span>{land.description}</span>
          </p>
          {/* Add more shop details as needed */}
          <div className=' flex justify-start items-start gap-4 my-4 relative'>
            <button
              onClick={() => {
                handleUpdateOpen();
                setLand(land);
              }}
              className=' bg-gray-300 max-sm:bg-blue-100 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 max-sm:shadow-blue-100 rounded-lg py-2 px-2'
              >
              <span className='md:block max-sm:hidden'>Edit Land </span>
              <span className=' md:hidden max-sm:block'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="28px" 
                  viewBox="0 -960 960 960" 
                  width="28px" 
                  fill="currentColor"
                  className=' text-blue-600'
                  >
                  <path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={() => {handleOpenDelete() 
                setPropertyId(land._id)
              }} 
              className=' bg-red-600 max-sm:bg-red-100 bg-opacity-70 text-white py-2 px-2 rounded-lg shadow-md shadow-red-300 max-sm:shadow-red-100'
              >
              <span className=' max-sm:hidden md:block'>Delete Land 
              </span>
              <span className=' md:hidden max-sm:block'>
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="28px" 
              viewBox="0 -960 960 960" 
              width="28px" 
              fill="currentcolor"
              className=' text-red-600'
              >
              <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
              />
              </svg>
              </span>
            </button>
            <button onClick={toggleUpload}>
              <span className='relative flex items-center gap-2 bg-sky-600 hover:bg-sky-700 rounded-lg px-2 py-2'>
                <span className=' max-sm:hidden lg:block text-sky-100'>Upload 
                </span>
                <span className=''>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="28px" 
                    viewBox="0 -960 960 960" 
                    width="28px" 
                    fill="currentColor"
                    className='text-sky-200'
                    >
                    <path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"
                    />
                  </svg>
                </span>
              </span>
              {
                isUpload &&
                  <div className='absolute flex flex-col justify-start items-start  gap-3 w-20 bg-sky-100 rounded-lg bottom-[50px] shadow-xl'>
                    <button
                      onClick={() => {
                        handleOpenUpload();
                        setPropertyId(land._id);
                      }}
                      className=' text-gray-700 hover:bg-sky-300 p-2 text-nowrap w-full rounded-lg'
                      >
                      <span className=' font-semibold px-2'>Land Image</span>
                    
                    </button>

                    <button
                      onClick={() => {
                        handleOpenDocUpload();
                        setLandId(land._id);
                      }}
                      className='  text-gray-700 hover:bg-sky-300 p-2 text-nowrap w-full rounded-lg'
                      >
                      <span className=' font-semibold px-2'>Document</span>
                    </button>
                  </div>
              }
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      

      <UpdateLandModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} land={land} />
      <DeletePropertyModal openDelete={openDelete} handleDeleteClose={handleDeleteClose} propertyId={propertyId} 
      url={`${url}`}
      />
      <UploadPropertyImage openUpload={openUpload} handleUploadClose={handleUploadClose} propertyId={propertyId} />
      <UploadLandDocModal openDocUpload={openDocUpload} handleDocUploadClose={handleDocUploadClose} landId={landId} />
    </div>
  )
}

export default LandDetails
