import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import DeletePropertyModal from '../property/DeletepropertyModal';
import UpdateLandModal from './UpdateLandModal';
import UploadPropertyImage from '../property/UploadPropertyImage';

const LandDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}land`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;
  
  //updatemodal
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  

  //deletemodal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")


  //upload image
  const [openUpload, setOpenUpload] = useState(false)
  const handleOpenUpload = () => setOpenUpload(true)
  const handleUploadClose = () => setOpenUpload(false)
  // State for apartment details and other shops
  const [land, setLand] = useState(null);
  
  const handleLandDetails = async () => {
    try {
      // Fetch the specific lands details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setLand(result.data); 
        // console.log("Land details:", result.data);
  
      } else {
        toast.warn("No other land available.");
      }
    } catch (error) {
      toast.error("Error fetching other details");
      console.log("Fetch error:", error);
    }
  };
  
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleLandDetails();
  }, [id]);
  // console.log(land);
  return (
    <div className='mt-4'>
        <ToastContainer />
        <div className=' max-md:pt-10 mt-0 mb-2'>
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
            <p className=' mb-1'>Price: <span>{land.price}</span></p>
            <p className=' mb-1'>Location: <span>{land.location}</span></p>
            <div>
              <p>plots: <span>{land.plots}</span></p>
              <p>docType: <span>{land.docType}</span></p>
              <p>ownershipType: <span>{land.ownershipType}</span></p>
              <div>
                <img src={`${imageUrl}${land.docImage[0]}`} alt="" />
              </div>
            </div>
          </div>
          <p className=' flex flex-col justify-start gap-2'>
            <span>Description:</span>
            <span>{land.description}</span>
          </p>
          {/* Add more shop details as needed */}
          <div className="mt-4 flex gap-2">
            <button
            onClick={() => {
              handleUpdateOpen();
              setLand(land);
            }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded max-sm:bg-blue-100 max-sm:hover:bg-blue-300">
              <span className='md:block max-sm:hidden'>Update Land</span>
              <span className=' md:hidden max-sm:block'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="48px" 
                  viewBox="0 -960 960 960" 
                  width="48px" 
                  fill="currentColor"
                  className=' text-blue-600'
                  >
                  <path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"
                  />
                </svg>
              </span>
            </button>
            <button onClick={() => {handleOpenDelete() 
                setPropertyId(land._id)
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded max-sm:bg-red-100 max-sm:hover:bg-red-300">
              <span className=' max-sm:hidden md:block'>Delete Land 
              </span>
              <span className=' md:hidden max-sm:block'>
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="48px" 
              viewBox="0 -960 960 960" 
              width="48px" 
              fill="currentcolor"
              className=' text-red-600'
              >
              <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
              />
              </svg>
              </span>
            </button>
            <button
            onClick={() => {
              handleOpenUpload();
              setPropertyId(land._id);
            }}
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-2 rounded max-sm:bg-sky-100 max-sm:hover:bg-sky-300">
               <span className=' md:block max-sm:hidden'>Upload Land Image</span>
              <span className=' md:hidden max-sm:block'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="48px" 
                  viewBox="0 -960 960 960" 
                  width="48px" 
                  fill="currentColor"
                  className='text-sky-600'
                  >
                  <path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"
                  />
                </svg>
              </span>
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
    </div>
  )
}

export default LandDetails
