import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import DeletePropertyModal from '../property/DeletepropertyModal';
import UpdateLandModal from './UpdateLandModal';

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

  // State for apartment details and other shops
  const [land, setLand] = useState(null);
  const [otherLands, setOtherLands] = useState([]);
  
  const handleLandDetails = async () => {
    try {
      // Fetch the specific lands details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setLand(result.data); 
        console.log("Land details:", result.data);
  
        // Fetch other lands
        const otherLandsResult = await fetch(`${url}`, auth.accessToken);
        console.log("Other Lands result:", otherLandsResult.data);
  
        let landsArray = [];
  
        // Determine the correct format of the data
        if (Array.isArray(otherLandsResult.data)) {
          landsArray = otherLandsResult.data;
        } else if (otherLandsResult.data && otherLandsResult.data.lands) {
          landsArray = otherLandsResult.data.lands;
        } else {
          toast.error("No other land found or data format is incorrect.");
          return;
        }
  
        // Filter out the current land
        const filteredLands = landsArray.filter(land => land._id !== id);
  
        if (filteredLands.length > 0) {
          setOtherLands(filteredLands);
          toast.success("Land details fetched successfully");
        } else {
          toast.warn("No other land available.");
        }
        
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
  console.log(otherLands);
  console.log(land);
  return (
    <div className='mt-4'>
        <ToastContainer />
      {/* Render shop details */}
      {land ? (
        <div>
          <div className=' grid grid-cols-2 gap-4'>
            <div className=' h-auto'>
              <img className=' h-full' src={`${imageUrl}${land.image[0]}`} />
            </div>
            <div>
              <h1 className='text-xl inline-flex gap-2 items-center'>Title: <span className='text-lg font-semi-bold text-gray-800 uppercase'>{land.title}</span></h1>
              <p className=' flex flex-col justify-start gap-2'>
                <span>Description:</span>
                <span>{land.description}</span>
              </p>
              <p>Owner: {land.owner.firstname}</p>
              <p>Price: <span>{land.price}</span></p>
              <p>Location: <span>{land.location}</span></p>
              <p>plots: <span>{land.plots}</span></p>
              <p>Status: <span>{land.status}</span></p>
              <p>docType: <span>{land.docType}</span></p>
              <p>ownershipType: <span>{land.ownershipType}</span></p>
              <div>
                <img src={`${imageUrl}${land.docImage[0]}`} alt="" />
              </div>
            </div>
          </div>
          {/* Add more shop details as needed */}
          <div className="mt-4">
                    <button
                    onClick={() => {
                      handleUpdateOpen();
                      setLand(land);
                    }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Update
                    </button>
                    <button onClick={() => {handleOpenDelete() 
                        setPropertyId(land._id)
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* Render other shops */}
      <div>
        <h2>Other Lands</h2>
        {
          otherLands.length > 0 ? (
            <div className=' grid grid-cols-3 gap-4'>
              {otherLands.map((land) => (
                <div key={land._id} className=' border rounded-lg p-2'>
                  <Link to={`/admin/land_details/${land._id}`}>
                    <img className=' h-40 w-full' src={`${imageUrl}${land.images[0]}`} />
                    <p>{land.title}</p>
                    <p>{land.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No other land available</p>
          )
        }
      </div>
      <UpdateLandModal open={openUpdate} handleClose={handleUpdateClose} land={land} />
      <DeletePropertyModal open={openDelete} handleClose={handleDeleteClose} propertyId={propertyId} 
      url={`${url}`}
      />
    </div>
  )
}

export default LandDetails
