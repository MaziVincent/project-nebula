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

const Property = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [propertyId, setPropertyId] = useState("")
  const [openUpload, setOpenUpload] = useState(false)
  const handleOpenUpload = () => setOpenUpload(true)
  const handleUploadClose = () => setOpenUpload(false)
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
        <Link to='/owner' >
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
      <h3 className="text-2xl font-bold">Property Details</h3>
      <div className="mt-5">
      <h4 className="text-xl font-bold">{property.title}</h4>
      <div className=' grid grid-cols-3 gap-2 shadow-md duration-200 delay-100 ease-in-out overflow-hidden'>
        {
          property.imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={property.title} className=' w-full h-full duration-300 delay-300 ease-in-out  hover:scale-105' />
          ))
        }
      </div>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className=' mb-2'><span>Status: </span>{property.status}</p>
        <p className=' mb-5'><span>Price: </span>{property.price}</p>
        <span className=" grid grid-cols-3 gap- w-[350px]">
          <span className=" flex flex-col leading-5 items-center border-r border-gray-600">
            {property.bedrooms}
            <span>{property?.bedrooms ? 'Bedrooms' : '' }</span>
          </span>
          <span className=" flex flex-col leading-5 items-center border-r border-gray-600">
            {property.bathrooms}
            <span>{property?.bathrooms ? 'Bathrooms' : '' }</span>
          </span>
          <span className=' flex flex-col leading-5 items-center'>
          {property.stories}
            <span className=''>{property?.stories ? 'Stories:' : ''} </span>
          </span>
        </span>
        <p className="text-gray-600 mt-4">
          <span className=' block'>Description:</span>
          {property.description}
        </p>
        <div className=' grid lg:grid-cols-4 mt-5 md:grid-cols-2 max-md:gap-y-4 max-sm:grid-cols-1'>
        {
          property?.exteriorFeatures && (
            <div className=''>
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
        <button
              onClick={() => {
                handleOpenUpload();
                setPropertyId(property._id);
              }}
              className=' bg-green-600 max-sm:bg-sky-100 text-green-100 bg-opacity-70 shadow-md shadow-green-300 max-sm:shadow-green-100 rounded-lg px-2 py-2 mt-5'
              >
              <span className=' md:block max-sm:hidden font-medium font-sans'>Upload {property.type} Image</span>
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
    )}
    <UploadPropertyImage openUpload={openUpload} handleUploadClose={handleUploadClose} propertyId={propertyId} />
    </div>
  )
}

export default Property
