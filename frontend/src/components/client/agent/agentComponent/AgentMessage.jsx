import React, { useState } from 'react'
import useFetch from '../../../../hooks/useFetch'
import AuthContext from '../../../../context/AuthProvider'
import { useContext } from 'react'
import baseURL from '../../../../shared/baseURL'
import { useQuery } from 'react-query'
import MessageSkeleton from '../../../Home/skeletons/MessageSkeleton'
import { Link } from 'react-router-dom'
const AgentMessage = () => {
  const { auth } = useContext(AuthContext)
  const fetch = useFetch()
  const url = `${baseURL}message/receiver`
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const receiverId = auth?.user?._id
  console.log(receiverId)
  const fetchMessages = async () => {
    const result = await fetch(`${url}/${receiverId}`, auth.accessToken);
    console.log(result)
    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["messages"],
    fetchMessages,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );
  console.log(data)
  
  return (
    <div className='min-h-dvh'>
      <div>
        <div className='px-4'>
          <h1 className='text-center text-2xl py-4 font-bold text-gray-700'>Messages</h1>
          <button onClick={handleOpenModal} className='bg-green-600 text-white px-3 py-2 rounded-md'>
            Send a Message
          </button>
        </div>
        <div>
          {isLoading && <MessageSkeleton />}
          {isSuccess && 
            <div className=''>
              
            {
              data?.messages?.map((message) => (
                <Link to={`/agent/message/${message._id}`} key={message._id} className='flex justify-start gap-2 items-start shadow-md mt-4 p-2'>
                  <div className=''>
                    <img src={message?.sender?.profile} alt="" className='w-8 h-8 object-cover rounded-full' />
                    {/* <span className='text-xs font-semibold text-gray-700'>r</span> */}
                  </div>
                  <div>
                    <h2 className='text-xl font-semibold mb-0 text-gray-500'>Name: <span className='text-gray-700'>{message.name}</span></h2>
                    <p className='mb-0 text-gray-500'>Email: <span className='text-gray-700'>{message.email}</span></p>
                    <p className='mb-0 text-gray-500'>Message: <span className='text-gray-700'>{message.message.slice(0,20)}...</span></p>
                  </div>
                </Link>
              )) || <p className='text-center text-gray-700'>No messages</p>
            }
            </div>
          }
          {isError && <p className='text-center text-red-500'>Error fetching messages</p>}
        </div>
      </div>
    </div>
  )
}

export default AgentMessage
