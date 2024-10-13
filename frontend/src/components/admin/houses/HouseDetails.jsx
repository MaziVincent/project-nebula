import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import DeletePropertyModal from '../property/DeletepropertyModal';
import UpdateHouseModal from './UpdateHouseModal';
import UploadPropertyImage from '../property/UploadPropertyImage';


const HouseDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}house`;
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

  //upload modal
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => setOpenUpload(true);
  const handleUploadClose = () => setOpenUpload(false);

  // State for apartment details and other shops
  const [house, setHouse] = useState(null);
  const [otherHouses, setOtherHouses] = useState([]);
  
  const handleHouseDetails = async () => {
    try {
      // Fetch the specific house details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setHouse(result.data); 
        console.log("House details:", result.data);
  
        // Fetch other houses
        // const otherHousesResult = await fetch(`${url}`, auth.accessToken);
        // console.log("Other Houses result:", otherHousesResult.data);
  
        // let housesArray = [];
  
        // // Determine the correct format of the data
        // if (Array.isArray(otherHousesResult.data)) {
        //   housesArray = otherHousesResult.data;
        // } else if (otherHousesResult.data && otherHousesResult.data.houses) {
        //   housesArray = otherHousesResult.data.houses;
        // } else {
        //   toast.error("No other houses found or data format is incorrect.");
        //   return;
        // }
  
        // // Filter out the current house
        // const filteredHouses = housesArray.filter(house => house._id !== id);
  
        // if (filteredHouses.length > 0) {
        //   setOtherHouses(filteredHouses);
        //   toast.success("House details fetched successfully");
        // } else {
        //   toast.warn("No other houses available.");
        // }
        
      }
    } catch (error) {
      toast.error("Error fetching other details");
      console.log("Fetch error:", error);
    }
  };
  
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleHouseDetails();
  }, [id]);
  console.log(house);
  return (
    <div className='mt-2'>
        <ToastContainer />
        <div className=' max-md:pt-10 mt-0 mb-2'>
        <Link to='/admin/houses' >
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
      {house ? (
        <div>
          <div className=' relative'>
             <div className=' leading-3 mb-4'>
              <h1 className='text-xl inline-flex gap-2 items-center mb-0 leading-none'>Title: <span className='text-lg font-semi-bold text-gray-800 uppercase'>{house.title}</span></h1>
              <p className='m-0'>Owner: <span className=' text-gray-700 text-sm tracking-wider underline'>{house?.owner?.firstname} {house?.owner?.lastname}</span></p>
             </div>
            <div className=' grid grid-cols-3 gap-2 shadow-md duration-200 delay-100 ease-in-out overflow-hidden'>
              {
                house.imageUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={house.title} className=' w-full h-full duration-300 delay-300 ease-in-out  hover:scale-105' />
                ))
              }
            </div>
            <div>
              <p className=' pt-2 mb-1'>Status: <span className={`${house.status === "Available" ? 'text-green-600' : house.status === "Pending" ? 'text-yellow-600' : 'text-red-600'}`}>{house.status}</span></p>
                <p className=' clear-start mb-1'>Price: <span className=' text-gray-600'>&#8358;{house.price}</span></p>
                <p className=''>Location: <span className=' text-gray-700'>{house.location}</span></p>
              <div className=' grid grid-cols-6 max-md:grid-cols-4 gap-y-8 max-sm:grid-cols-2 w-11/12'>
                <p className=' border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center'>Bedrooms: <span>{house.bedrooms}</span></p>
                <p className=' border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center max-sm:border-r-0'>Bathrooms: <span>{house.bathrooms}</span></p>
                <p className=' border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center'>squareFootage: <span>{house.squareFootage}ft</span></p>
                <p className=' border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center max-sm:border-r-0'>yearBuilt: <span>{house.yearBuilt}</span></p>
                <p className=' border-r-2 border-gray-500 text-gray-600 p-2 m-0 pl-0 flex flex-col items-center'>lotSize: <span>{house.lotSize}</span></p>
                <p className='text-gray-600 p-2 m-0 pl-0 flex flex-col items-center'>Stories: <span>{house.stories}</span></p>
              </div>
              <p className=' my-4'>Document Type: <span>{house.docType}</span></p>
              <div>
                <h3 className=' text-3xl text-center text-gray-600'>Features:</h3>
                <div className=' grid grid-cols-4 gap-2 max-md:grid-cols-3 max-sm:grid-cols-2     '>
                  <div>
                  <p className=' mb-0'>Exterior Features:</p>
                  <ul className=' pl-0 flex flex-col leading-'>
                    {house.exteriorFeatures.map((feature, index) => (
                      <li key={index} className=' inline-flex items-center gap-1 text-gray-700'>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='mb-0'>interiorFeatures:</p>
                  <ul className=' flex flex-col leading- ml-0 pl-0'>
                    {house.interiorFeatures.map((interior, index) => (
                      <li key={index} className=' inline-flex text-gray-700 items-center gap-1'>{interior}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='mb-0'>Living Room Features:</p>
                  <ul className=' flex flex-col leading- ml-0 pl-0'>
                    {house.livingRoomFeatures.map((living, index) => (
                      <li key={index} className=' inline-flex text-gray-700 items-center gap-1'>{living}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='mb-0'>Kitchen Features:</p>
                  <ul className=' flex flex-col leading- ml-0 pl-0'>
                    {house.kitchenFeatures.map((kitchen, index) => (
                      <li key={index} className=' inline-flex text-gray-700 items-center gap-1'>{kitchen}</li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
              <p className=' flex flex-col justify-start gap-2'>
                <span>Description:</span>
                <span>{house.description}</span>
              </p>
            </div>
          </div>
          {/* Add more shop details as needed */}
          <div className=' flex justify-start items-start gap-4 my-4 '>
            <button
              onClick={() => {
                handleUpdateOpen();
                setHouse(house);
              }}
              className=' bg-gray-300 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 rounded-lg px-2'
              >
              <span>Edit House</span>
            </button>
            <button
              onClick={() => {handleOpenDelete() 
                setPropertyId(house._id)
              }} 
              className=' bg-red-600 bg-opacity-70 text-white px-2 rounded-lg shadow-md shadow-red-300'
              >
              <span>Delete House</span>
            </button>
            <button
              onClick={() => {
                handleOpenUpload();
                setPropertyId(house._id);
              }}
              className=' bg-gray-300 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 rounded-lg px-2'
              >
              <span>Upload Image</span>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <UpdateHouseModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} house={house} />
      <DeletePropertyModal openDelete={openDelete} handleDeleteClose={handleDeleteClose} propertyId={propertyId} 
      url={url}
      />
      <UploadPropertyImage openUpload={openUpload} handleUploadClose={handleUploadClose} propertyId={propertyId} />
    </div>
  )
}

export default HouseDetails
