import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import { CircularProgress } from '@mui/material';
import Avatar from '../../../assets/images/photos/profile.png';
import EditProfileModal from './EditProfileModal';
// import UpdateProfileModal from './UpdateProfileModal';

const OwnerProfile = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const { id } = useParams();
  const url = `${baseURL}owner`;

  const [owner, setOwner] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleProfile = async () => {
    try {
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setOwner(result.data);
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
    <div className="sm:pt-24">
      <ToastContainer />
      <div className="max-md:pt-10 pl-4">
        <Link to="/owner">
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
      ) : owner ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={owner?.profile ? owner.profile : Avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-4">{`${owner.firstname} ${owner.lastname}`}</h1>
          </div>
          <div className="flex flex-col items-start justify-start my-4 border  w-full px-4 py-2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h1>
            <p className="text-gray-600 mb-2"><span>Email: </span>{owner?.email}</p>
            <p className="text-gray-600"><span>Phone: </span>{owner?.phone}</p>
            <p className="text-gray-600"><span>Contact Address: </span>{owner?.address}</p>
            <p className="text-gray-600"><span>Identity Type: </span>{owner?.identityType}</p>
            <p className="text-gray-600"><span>Verification: </span>{owner?.verified ? 'Verified' : 'Not verified'}</p>
          </div>

          <div>
            <button
            onClick={() => {
              handleUpdateOpen();
              setOwner(owner);
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
      <EditProfileModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} owner={owner} />
    </div>
  );
};

export default OwnerProfile;
