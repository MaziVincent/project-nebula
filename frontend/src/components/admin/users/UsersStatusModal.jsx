import React, { useState, useEffect } from 'react';
import useAuth from "../../../hooks/useAuth";
import baseURL from '../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch";  
import useUpdate from "../../../hooks/useUpdate";
import { CircularProgress } from '@mui/material';

const UsersStatusModal = ({openStatus, handleCloseStatus, userId}) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const fetch = useFetch();
  const update = useUpdate();
  const url = `${baseURL}user/status`;
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register,
    setValue,
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    if (userId) {
      Object.entries(userId).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [userId, setValue]);

  const updateUserStatus = async (status) => {
    setIsLoading(true)
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    console.log(status)
     const formData = new FormData();
     formData.append("status", status);
     console.log(formData)
    try {
      const response = await update(`${url}/${userId}`, formData, auth?.accessToken);
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
    }
    console.log(formData)
  };
 console.log(userId)

  const { mutate } = useMutation(updateUserStatus, {
    onSuccess: (data, status) => {
      queryClient.invalidateQueries('users');
      setTimeout(() => {
        if (status === 'Active') {
          toast.success('User Activated successfully');
        } else if (status === 'Inactive') {
          toast.warn('User Deactivated successfully');
        } else {
          toast.error('Failed to update user status');
        }
        handleCloseStatus(); 
      }, 2000);
      setIsLoading(false)
    }
  });

  const handleStatusUpdate = (data) => {
   mutate(data.status);
    console.log(data.status)
  };

  return (
    <Modal
      open={openStatus}
      onClose={handleCloseStatus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex justify-center items-center'
    >
      <div className=' w-64 py-4 px-4 bg-white relative '>
      Update User Status
      <form onSubmit={handleSubmit(handleStatusUpdate)}
        className=' mx-auto'
      >
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            id="status"
            {...register("status", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
        >
          {isLoading ? <CircularProgress size={20} color='white' /> : 'Update Status'}
        </button>
      </form>
      {/* Update Shop Status */}
    </div>
    </Modal>
  )
}

export default UsersStatusModal
