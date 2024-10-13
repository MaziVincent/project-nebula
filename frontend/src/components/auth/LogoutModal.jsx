import React, { useState } from 'react';
import useLogout from '../../hooks/useLogout';
import { Modal, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ open, handleClose }) => {
  const logout = useLogout();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.info('Logging out...');
    setTimeout( async () => {
        await logout()
        toast.success('Logout successful!');
        setIsLoggingOut(false);
      }, 3000);
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose}>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50">
        <ToastContainer />
        <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6">
          <h2 className="text-lg font-semibold mb-4">Logout Confirmation!</h2>
          <p className="mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-4">
            <button
            className=' bg-gray-300 text-gray-800 px-2 rounded-lg shadow-md shadow-gray-300'
              onClick={handleClose}
              disabled={isLoggingOut}
            >
              NO
            </button>
            <button
            className=' bg-red-500 text-white px-2 rounded-lg shadow-md shadow-red-300'
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? <CircularProgress size={24} /> : 'YES'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
