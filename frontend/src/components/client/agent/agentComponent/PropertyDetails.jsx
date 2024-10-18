import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../../hooks/useFetch';
import useAuth from '../../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../../shared/baseURL';
import { CircularProgress, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import UploadPropertyImage from '../../../admin/property/UploadPropertyImage';

const PropertyDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;

  //upload image
  const [openUpload, setOpenUpload] = useState(false)
  const handleOpenUpload = () => setOpenUpload(true)
  const handleUploadClose = () => setOpenUpload(false)
  const [property, setProperty] = useState(null);
  const [propertyId, setPropertyId] = useState("");

  const getProperty = async () => {
    try {
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setProperty(result.data); 
      }
    } catch (error) {
      toast.error("Error fetching Agent's details");
      console.log("Fetch error:", error);
    }
  };
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    getProperty();
  }, [id]);
  console.log(property);

  return (
    <div>
      <div className=' max-md:pt-10 pl-4'>
        <Link to='/agent' >
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
      {!property ? (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    ) : (
      <div className="">
      <h3 className="text-2xl font-bold mb-2 text-center">Property Details</h3>
      <div className="mt-2">
      <h4 className="text-xl font-bold">{property.title}</h4>
      <div className=' grid grid-cols-3 gap-2 shadow-md duration-200 delay-100 ease-in-out overflow-hidden'>
        {
          property.imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={property.title} className=' w-full h-full duration-300 delay-300 ease-in-out  hover:scale-105' />
          ))
        }
      </div>
      <p className=' mb-1'><span>Status: </span>{property.status}</p>
      <p className=' mb-1'>Price: <span>&#8358;{property.price}</span></p>
      <p className="text-gray-600">Location: <span>{property.location}</span></p>
      <h4 className=' text-2xl text-gray-600 text-center'>Features:</h4>
        <span className=" grid grid-cols-3 mb-3 w-1/3">
          <span className=" flex flex-col leading-5 items-center border-r-2 border-gray-600">
            <span>{property?.bedrooms ? 'Bedrooms' : '' }</span>
            {property.bedrooms}
          </span>
          <span className=" flex flex-col leading-5 items-center">
            <span>{property?.bathrooms ? 'Bathrooms' : '' }</span>
            {property.bathrooms}
          </span>
          <span className=' flex flex-col leading-5 items-center'><span>{property?.stories ? 'Stories:' : ''} </span>{property.stories}</span>
        </span>
        <p className=' text-2xl text-center text-gray-600 font-medium'>Other Features:</p>
        <div className=' grid grid-cols-4'>
          {
            property?.exteriorFeatures && (
              <div>
                <h4 className="text-xl font-bold mb-2">Exterior Features</h4>
                <ul className=' pl-2 flex flex-col leading-6'>
                  {property.exteriorFeatures.map((feature, index) => (
                    <li key={index} className=' inline-flex items-center gap-1'><span className='block w-2 h-2 rounded-full bg-gray-500'></span>{feature}</li>
                  ))}
                </ul>
              </div>
            )
          }
          
          {
            property?.interiorFeatures && (
              <div>
                <h4 className="text-xl font-bold mb-2">Interior Features</h4>
                <ul className=' pl-2 flex flex-col leading-6'>
                  {property.interiorFeatures.map((interior, index) => (
                    <li key={index} className=' inline-flex items-center gap-1'><span className='block w-2 h-2 rounded-full bg-gray-500'></span>{interior}</li>
                  ))}
                </ul>
              </div>
            )
          }
          {
            property?.kitchenFeatures && (
              <div>
                <h4 className="text-xl font-bold mb-2">Kitchen Features</h4>
                <ul className=' pl-2 flex flex-col leading-6'>
                  {property.kitchenFeatures.map((kitchen, index) => (
                    <li key={index} className=' inline-flex items-center gap-1'><span className='block w-2 h-2 rounded-full bg-gray-500'></span>{kitchen}</li>
                  ))}
                </ul>
              </div>
            )
          }
          {
            property?.livingRoomFeatures && (
              <div>
                <h4 className="text-xl font-bold mb-2">LivingRooom Features</h4>
                <ul className=' pl-2 flex flex-col leading-6'>
                  {property.livingRoomFeatures.map((livingRoom, index) => (
                    <li key={index} className=' inline-flex items-center gap-1'><span className='block w-2 h-2 rounded-full bg-gray-500'></span>{livingRoom}</li>
                  ))}
                </ul>
              </div>
            )
          }
          </div>
         <p className="text-gray-600 mt-4">
           {property.description}
          </p>
        </div>
        <button
          onClick={() => {
            handleOpenUpload();
            setPropertyId(property._id)
          }}
        >
          <span>
          Upload {property.type} Image
          </span>
        </button>
    </div>
    )}
    <UploadPropertyImage openUpload={openUpload} handleUploadClose={handleUploadClose} propertyId={propertyId} />
    </div>
  )
}

export default PropertyDetails
