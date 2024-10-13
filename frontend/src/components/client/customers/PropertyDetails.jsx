import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import { CircularProgress, Modal } from '@mui/material';
import { Link } from 'react-router-dom';

const PropertyDetails = ({property, closeModal}) => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;

  const getProperty = async () => {
    try {
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        // setProperty(result.data); 
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
      {!property ? (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    ) : (
      <div className="">
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center lg:hidden"
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
      <h3 className="text-2xl font-bold">Property Details</h3>
      <div className="mt-5">
        <img
          src="https://via.placeholder.com/200"
          alt="Featured Property"
          className="w-full h-48 object-cover rounded-lg mb-5"
        />
        <h4 className="text-xl font-bold">{property.title}</h4>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-gray-600 mt-4">
          {property.description}
        </p>
        <span className=" flex justify-between mb-3">
          <span className=" flex flex-col leading-5 items-center">
            {property.bedrooms}
            <span>{property?.bedrooms ? 'Bedrooms' : '' }</span>
          </span>
          <span className=" flex flex-col leading-5 items-center">
            {property.bathrooms}
            <span>{property?.bathrooms ? 'Bathrooms' : '' }</span>
          </span>
        </span>
        <p><span>Status: </span>{property.status}</p>
        <p><span>{property?.stories ? 'Stories:' : ''} </span>{property.stories}</p>
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
        <button className="mt-5 bg-green-500 text-white px-6 py-2 rounded-lg">Buy Now</button>
      </div>
    </div>
    )}
    </div>
  )
}

export default PropertyDetails
