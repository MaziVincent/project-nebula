import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import useAuth from '../../../hooks/useAuth';
import useUpdate from '../../../hooks/useUpdate';
import CircularProgress from '@mui/material/CircularProgress';
import baseURL from '../../../shared/baseURL';

const UnverifyAgentModal = ({ openUnverify, handleUnverifyClose, agentId }) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const update = useUpdate();
  const url = `${baseURL}agent/unverify`;

  const unVerifyAgent = async () => {
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
      throw new Error(error.response?.data?.message || 'Error verifying agent');
    }
  };

  const { mutate, isLoading } = useMutation(unVerifyAgent, {
    onSuccess: () => {
      queryClient.invalidateQueries('agent');
      handleUnverifyClose();
      toast.success('Agent unverified successfully');
    },
    onError: (error) => {
      toast.error(`Failed to verify agent: ${error.message}`);
    }
  });

  const handleUnVerifyAgent = () => {
    mutate();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Modal 
    open={openUnverify}
    onClose={handleUnverifyClose}
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
            Unverify Agent
          </h3>
          <p className="text-gray-700 mb-6">
            Are you sure you want to Unverify this agent?
          </p>
            <div className="flex justify-center gap-4">
              <button
                className=" bg-red-600 px-2 rounded-lg text-white"
                onClick={handleUnVerifyAgent}
              >
                Unverify
              </button>
              <button
                className=" bg-gray-300 px-2 rounded-lg text-gray-800"
                onClick={handleUnverifyClose}
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

export default UnverifyAgentModal;
