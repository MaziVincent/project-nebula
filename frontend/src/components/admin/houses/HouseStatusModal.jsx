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

const HouseStatusModal = ({openStatus, handleCloseStatus, house}) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const fetch = useFetch();
  const update = useUpdate();
  const url = `${baseURL}house/status`;
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register,
    setValue,
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    if (house) {
      Object.entries(house).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [house, setValue]);

  const updateHouseStatus = async (status) => {
    setIsLoading(false)
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    console.log(status)
     const formData = new FormData();
     formData.append("status", status);
    try {
      const response = await update(`${url}/${house._id}`, formData, auth?.accessToken);
      console.log(response.data);
        setTimeout(() => {
          toast.success("House status updated successfully");
          handleCloseStatus(); 
        }, 2000);
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message);
    }
  };

  const { mutate } = useMutation(updateHouseStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('houses');
      setIsLoading(false)
    }
  });

  const handleStatusUpdate = (data) => {
    mutate(data.status);
    
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
      Update Apartment Status
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
            <option value="Pending">Pending</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
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

export default HouseStatusModal
