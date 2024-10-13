import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import { CircularProgress } from '@mui/material';
import Avatar from '../../../assets/images/photos/profile.png';
import UpdateProfileModal from './UpdateProfileModal';

const Profile = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const { id } = useParams();
  const url = `${baseURL}customer`;

  const [customer, setCustomer] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleProfile = async () => {
    try {
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setCustomer(result.data);
      }
    } catch (error) {
      toast.error("Error fetching your profile details");
      console.log("Fetch error:", error);
    } finally {
      setIsLoading(false); // Stop loading after the request finishes
    }
  };

  useEffect(() => {
    handleProfile();
  }, [id]);

  return (
    <div className="max-md:pt-24">
      <ToastContainer />
      <div className="max-md:pt-10 pl-4">
        <Link to="/dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            className="h-7 w-7 text-gray-400 hover:text-green-600"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" />
          </svg>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : customer ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={customer?.profile ? customer.profile : Avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-4">{`${customer.firstname} ${customer.lastname}`}</h1>
            <p className="text-gray-600 mb-2"><span>Email: </span>{customer?.email}</p>
          </div>
          <div className="flex flex-col items-center justify-center mt-3">
            <h1 className="text-2xl font-bold text-gray-800">Contact Information</h1>
            <p className="text-gray-600">{customer?.phone}</p>
            <p className="text-gray-600">{customer?.address}</p>
          </div>

          <div>
            <button
            onClick={() => {
              handleUpdateOpen();
              setCustomer(customer);
            }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
              Update
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>No customer details found.</p>
        </div>
      )}
      <UpdateProfileModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} customer={customer} />
    </div>
  );
};

export default Profile;
