import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import UpdateApartmentModal from './UpdateApartmentModal';
import DeletePropertyModal from '../property/DeletepropertyModal';
import { Modal } from '@mui/material';

const ApartmentDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}apartment`;
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

  // State for apartment details and other shops
  const [apartment, setApartment] = useState(null);
  const [otherApartments, setOtherApartments] = useState([]);
  
  const handleApartmentDetail = async () => {
    try {
      // Fetch the specific apartment details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setApartment(result.data); 
        console.log("Apartment details:", result.data);
  
        // Fetch other apartments
        const otherApartmentsResult = await fetch(`${url}`, auth.accessToken);
  
        // Log the result to debug what is being returned
        console.log("Other apartments result:", otherApartmentsResult.data);
  
        // If the result contains an array of apartments, handle it
        if (Array.isArray(otherApartmentsResult.data)) {
          const filteredApartments = otherApartmentsResult.data.filter(apartment => apartment._id !== id);
          if (filteredApartments.length > 0) {
            setOtherApartments(filteredApartments);
            toast.success("Apartment details fetched successfully");
          } else {
            toast.warn("No other apartments available.");
          }
        } else if (otherApartmentsResult.data && otherApartmentsResult.data.apartments) {
          // If the data is an object with an 'apartments' array inside
          const filteredApartments = otherApartmentsResult.data.apartments.filter(apartment => apartment._id !== id);
          if (filteredApartments.length > 0) {
            setOtherApartments(filteredApartments);
            toast.success("Apartment details fetched successfully");
          } else {
            toast.warn("No other apartments available.");
          }
        } else {
          toast.error("No other Apartments found or data format is incorrect.");
        }
  
      } else {
        toast.error("Error fetching Apartment details");
      }
    } catch (error) {
      toast.error("Error fetching Apartment details");
      console.log("Fetch error:", error);
    }
  };
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleApartmentDetail();
  }, [id]);
  console.log(otherApartments);
  console.log(apartment);
  return (
    <div className='mt-4'>
        <ToastContainer />
      {/* Render shop details */}
      {apartment ? (
        <div>
          <div className=' grid grid-cols-2 gap-4'>
            <div className=' h-auto'>
              <img className=' h-full' src={`${imageUrl}${apartment.image}`} />
            </div>
            <div>
              <h1 className='text-xl inline-flex gap-2 items-center'>Title: <span className='text-lg font-semi-bold text-gray-800 uppercase'>{apartment.title}</span></h1>
              <p className=' flex flex-col justify-start gap-2'>
                <span>Description:</span>
                <span>{apartment.description}</span>
              </p>
              <p>Owner: {apartment.owner.firstname}</p>
              <p>Price: <span>{apartment.price}</span></p>
              <p>Location: <span>{apartment.location}</span></p>
              <p>Bedrooms: <span>{apartment.bedrooms}</span></p>
              <p>Bathrooms: <span>{apartment.bathrooms}</span></p>
              <p>Floor Area: <span>{apartment.floorArea}</span></p>
              <p>Status: <span>{apartment.status}</span></p>
            </div>
          </div>
          {/* Add more shop details as needed */}
          <div className=' flex justify-start items-start gap-4 my-4 '>
            <button
              onClick={() => {
                handleUpdateOpen();
                setApartment(apartment);
              }}
              className=' bg-gray-300 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 rounded-lg px-2'
              >
              <span>Edit Apartment</span>
            </button>
            <button
              onClick={() => {handleOpenDelete() 
                setPropertyId(apartment._id)
              }} 
              className=' bg-red-600 bg-opacity-70 text-white px-2 rounded-lg shadow-md shadow-red-300'
              >
              <span>Delete Apartment</span>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* Render other shops */}
      <div>
        <h2>Other Apartments</h2>
        {
          otherApartments.length > 0 ? (
            <div className=' grid grid-cols-3 gap-4'>
              {otherApartments.map((apartment) => (
                <div key={apartment._id} className=' border rounded-lg p-2'>
                  <img className=' h-40 w-full' src={`${imageUrl}${apartment.image}`} />
                  <p>{apartment.title}</p>
                  <p>{apartment.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No other apartments available</p>
          )
        }
      </div>
      <UpdateApartmentModal open={openUpdate} handleClose={handleUpdateClose} apartment={apartment} />
      <DeletePropertyModal open={openDelete} handleClose={handleDeleteClose} propertyId={propertyId} 
      url={url}
      />
    </div>
  )
}

export default ApartmentDetails
