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

const MakeSuperAgent = ({ open, handleClose, agentId, superStatus }) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const update = useUpdate();
  const url = `${baseURL}agent/makesuperagent`;
  const [isLoading, setIsLoading] = useState(false)

  // console.log(agentId)
  const makeSuperAgent = async () => {
    setIsLoading(true)
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }

    try {
      const response = await update(`${url}/${agentId}`, {}, auth?.accessToken);
      console.log(response); 
    } catch (error) {
      setIsLoading(false)
      throw new Error(error.response?.data?.message || 'Error verifying agent');
    }
  };

  const { mutate } = useMutation(makeSuperAgent, {
    onSuccess: () => {
      queryClient.invalidateQueries('agents');
      handleClose();
      // toast.success('');
      setIsLoading(false)
    },
    onError: (error) => {
        setIsLoading(false)
      toast.error(`Failed to make agent Super: ${error.message}`);
    }
  });

  const handleMakeSuperAgent = () => {
    mutate();
  };


  return (
    <Modal 
    open={open}
    onClose={handleClose}
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
            Make Super Agent
          </h3>
          <p className="text-gray-700 mb-6">
            Are you sure about this change?
          </p>
            <div className="flex justify-center gap-4">
              <button
                className=" bg-green-600 px-2 rounded-lg text-white"
                onClick={handleMakeSuperAgent}
              >
                {isLoading ? <CircularProgress size={20} color='white' /> : 'Yes'}
              </button>
              <button
                className=" bg-gray-300 px-2 rounded-lg text-gray-800"
                onClick={() => {handleClose()}}
              >
                No
              </button>
            </div>
        </div>
      </div>
    </div>
  </Modal>
  );
};

export default MakeSuperAgent;
