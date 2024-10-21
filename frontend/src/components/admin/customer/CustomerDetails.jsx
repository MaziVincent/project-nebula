import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import UpdateCustomerModal from './UpdateCustomerModal';
import DeleteUserModal from '../users/DeleteUserModal';

const CustomerDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}customer`;
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
  const [userId, setUserId] = useState("")

  // State for apartment details and other shops
  const [customer, setCustomer] = useState(null);

  //verify or unverify agent
  const [openVerify, setOpenVerify] = useState(false);
  const handleOpenverify = () => setOpenVerify(true);
  const handleVerifyClose = () => setOpenVerify(false);
  const [ownerId, setOwnerId] = useState("")

  //verify or unverify agent
  const [openUnverify, setOpenUnverify] = useState(false);
  const handleOpenUnverify = () => setOpenUnverify(true);
  const handleUnverifyClose = () => setOpenUnverify(false);

  const handleCustomerDetails = async () => {
    try {
      // Fetch the specific apartment details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setCustomer(result.data); 
      }
    } catch (error) {
      toast.error("Error fetching Customer's details");
      console.log("Fetch error:", error);
    }
  };
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleCustomerDetails();
  }, [id]);
  return (
    <div className=' max-md:pt-24'>
      <ToastContainer />
      <div className=' max-md:pt-10 pl-4'>
        <Link to='/admin/customers' >
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
      {
        customer ? (
          <div className="container mx-auto p-2 max-sm:h-screen">
            <div className="bg-white rounded-lg shadow-md p-2">
              <div className="flex flex-col md:flex-row items-center">
                <div className=' w-1/4'>
                <div className="md:w-full">
                  <h4 className=' text-xl mb-0 pb-2'>Profile Image:</h4>
                  <div className=' border'>
                    <img src={`${imageUrl}${customer.profile}`} alt={customer.firstname} className="w-full h-auto" />
                  </div>
                </div>
                </div>
                <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                  <h2 className=" text-xl font-light inline-flex gap-2 mb-2">Name: <span className=' text-2xl font-semibold'> {`${customer.firstname} ${customer.lastname}`}</span></h2>
                  <p className="mb-4 text-gray-600">Email: <span>{customer.email}</span></p>
                  <p className="mb-4 text-gray-600">Phone: <span>{customer.phone}</span></p>
                  <p className='mb-4 text-gray-600'>Status: <span className={`${customer.status? 'text-green-600' : ' text-red-600'}`}>{customer.status}</span></p>
                  <p className='mb-4 text-gray-600'>Wishlist: <span>{customer.wishlist}</span></p>
                  {/* Update and Delete buttons */}
                  <div className=' flex items-center gap-4 mt-4'>
                    <div className="">
                      <button
                      onClick={() => {
                        handleUpdateOpen();
                        setCustomer(customer);
                      }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                        Update
                      </button>
                      <button onClick={() => {handleOpenDelete() 
                          setUserId(customer._id)
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=' w-full flex justify-center'><CircularProgress /></div>
        )
      }
      <UpdateCustomerModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} customer={customer} />
      <DeleteUserModal
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose} 
        // shop={shop}
        userId={userId}
        // propertyType="shop" 
        url={`${url}`} />
    </div>
  )
}

export default CustomerDetails
