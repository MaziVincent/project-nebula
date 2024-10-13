import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../../hooks/useFetch';
import useAuth from '../../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../../shared/baseURL';
import { CircularProgress, Modal } from '@mui/material';
import { Link } from 'react-router-dom';

const Property = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;

  const [property, setProperty] = useState(null);

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
      {!property ? (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    ) : (
      <div className="">
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
        </div>
    </div>
    )}
    </div>
  )
}

export default Property
