import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import AuthContext from '../../context/AuthProvider'
import { useContext } from 'react'
import baseURL from '../../shared/baseURL'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import ReplyMessage from '../client/owner/ownerComponent/ReplyMessage'
import Avatar from '../../assets/images/photos/avatar.png'
const MessageDetails = () => {
  const { auth } = useContext(AuthContext)
  const fetch = useFetch()
  const url = `${baseURL}message`
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const {id} = useParams()


  const [message, setMessage] = useState(null)
  const fetchMessages = async () => {
    const result = await fetch(`${url}/${id}`, auth.accessToken);
    console.log(result)
    setMessage(result.data)
    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["message"],
    fetchMessages,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );
  // console.log(data)
  const [receiverId, setReceiverId] = useState(null)
  return (
    <div className='min-h-dvh px-4'>
      <div>
        <div className='px-4'>
          <h1 className='text-center text-2xl py-4 font-bold text-gray-700'>Message Details</h1>
        </div>
        <div>
          {isLoading && <CircularProgress />}
          {isSuccess && 
            <div className=''>
              
                <div className='flex justify-center flex-col items-center gap-2 shadow-md mt-4 p-2'>
                  <div className=''>
                    <img src={message?.sender?.profile || Avatar} alt="" className='w-16 h-16 object-cover rounded-full' />
                    {/* <span className='text-xs font-semibold text-gray-700'>r</span> */}
                  </div>
                  <div>
                    <h2 className='text-xl text-center font-semibold mb-0'><span className='text-gray-700'>{message.name || `${message.sender.firstname} ${message.sender.lastname}`}</span></h2>
                    <p className='mb-0'>Email: <span className='text-gray-700'>{message.email || message.sender.email}</span></p>
                    <p className='mb-0'>Message: <span className='text-gray-700'>{message.message}</span></p>
                  </div>
                </div>
                {
                  auth?.user?.type === "Agent" || auth?.user?.type === "Owner" && (
                    <div className='flex justify-center mt-4'>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => {
                        handleOpenModal()
                        setReceiverId(message.sender._id)
                      }}>Reply</button>
                    </div>
                  )
                }
            </div>
          }
          {isError && <p className='text-center text-red-500'>Error fetching messages</p>}
        </div>
      </div>
      <ReplyMessage open={openModal} handleClose={handleCloseModal} receiverId={receiverId} />
    </div>
  )
}

export default MessageDetails
