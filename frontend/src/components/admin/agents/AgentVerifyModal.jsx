import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import useAuth from '../../../hooks/useAuth';
import useUpdate from '../../../hooks/useUpdate';
import CircularProgress from '@mui/material/CircularProgress';
import baseURL from '../../../shared/baseURL';
import { useState } from 'react';

const AgentVerifyModal = ({ openVerify, handleVerifyClose, agentId }) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const update = useUpdate();
  const url = `${baseURL}agent/verify`;
  const [isLoading, setIsLoading] = useState(false)

  const verifyAgent = async () => {
    setIsLoading(true)
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    // const data = { _id: agentId };
    // console.log(data);
    try {
      const response = await update(`${url}/${agentId}`, {}, auth?.accessToken);
      console.log(response); 
    } catch (error) {
      setIsLoading(false)
      throw new Error(error.response?.data?.message || 'Error verifying agent');
    }
  };

  const { mutate } = useMutation(verifyAgent, {
    onSuccess: () => {
      queryClient.invalidateQueries('agent');
      handleVerifyClose();
      toast.success('Agent verified successfully');
      setIsLoading(false)
    },
    onError: (error) => {
      toast.error(`Failed to verify agent: ${error.message}`);
    }
  });

  const handleVerifyAgent = () => {
    mutate();
  };


  return (
    <Modal 
    open={openVerify}
    onClose={handleVerifyClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <div>
      <div
        id="deleteModal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Verify Agent
          </h3>
          <p className="text-gray-700 mb-6">
            Are you sure you want to verify this agent?
          </p>
            <div className="flex justify-center gap-4">
              <button
                className=" bg-green-600 px-2 rounded-lg text-white"
                onClick={handleVerifyAgent}
              >
                {isLoading ? <CircularProgress size={20} color='white' /> : 'Verify'}
              </button>
              <button
                className=" bg-gray-300 px-2 rounded-lg text-gray-800"
                onClick={handleVerifyClose}
              >
                Cancel
              </button>
            </div>
        </div>
      </div>
    </div>
  </Modal>
  );
};

export default AgentVerifyModal;
