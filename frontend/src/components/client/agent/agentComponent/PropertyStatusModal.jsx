import React, { useState, useEffect } from 'react';
import useAuth from "../../../../hooks/useAuth";
import baseURL from '../../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../../hooks/useFetch";  
import useUpdate from "../../../../hooks/useUpdate";
import { CircularProgress } from '@mui/material';

const PropertyStatusModal = ({openStatus, handleCloseStatus, property}) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const fetch = useFetch();
  const update = useUpdate();
  const url = `${baseURL}properties/status`;
  const { 
    register,
    setValue,
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    if (property) {
      Object.entries(property).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [property, setValue]);

  const updateStatus = async (status) => {
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    console.log(status)
     const formData = new FormData();
     formData.append("status", status);
    try {
      const response = await update(`${url}/${property._id}`, formData, auth?.accessToken);
      console.log(response.data);
        setTimeout(() => {
          toast.success("Property status updated successfully");
          handleCloseStatus(); 
        }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { mutate } = useMutation(updateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('properties');
    }
  });

  const handleStatusUpdate = (data) => {
    mutate(data.status);
    setTimeout(() => {
      handleCloseStatus();
    }, 3000);
    
  };

 // console.log(property.status)

  // Render the component
  return (
    <Modal
      open={openStatus}
      onClose={handleCloseStatus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex justify-center items-center'
    >
      <div className=' w-64 py-4 px-4 bg-white relative '>
        Update Status
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
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
        >
          Update Status
        </button>
      </form>
      {/* Update Shop Status */}
    </div>
    </Modal>
  )
}

export default PropertyStatusModal
