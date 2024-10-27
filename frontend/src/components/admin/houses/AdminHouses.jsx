import React, { useEffect } from 'react'
import useAuth from "../../../hooks/useAuth";
import { QueryClient, useQuery } from "react-query";
import { useState } from 'react';
import baseUrl from "../../../shared/baseURL";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import DeletePropertyModal from '../property/DeletePropertyModal';
// import { Add } from '@mui/icons-material';
// import CreateHouseModal from './CreateHouseModal';
import UpdateHouseModal from './UpdateHouseModal';
import HouseStatusModal from './HouseStatusModal';
import { CircularProgress } from '@mui/material';

const AdminHouses = () => {
  const queryClient = new QueryClient();
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}house`
  const [loading, setLoading] = useState(false)
  
  //modal handler
  // const [openModal, setOpenModal] = useState(false)
  // const handleOpen = () => setOpenModal(true)
  // const handleClose = () => setOpenModal(false)

  //update house details
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [house, setHouse] = useState({})

  //update status
  const [openStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);

  //delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")


  const [tools, setTools] = useState(false)
  const handleTools = (_id) => {
    if (tools === _id) {
      setTools(false)
    } else {
      setTools(_id)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);  // Cleanup timeout
  }, []);
  const getHouses = async () => {
    const result = await fetch(url, auth.accessToken);
    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["houses"],
    getHouses,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );
  //console.log(data);
  return (
    <div className=' pt-10 max-sm:mt-10 h-screen'>
      <ToastContainer />
      <h3 className=' text-gray-700 font-semibold text-3xl text-center'>Houses</h3>
      <div className=' mb-4 max-md:w-full'>
        {
          loading || isLoading ? <div className=' flex justify-center'><CircularProgress /></div> : null
        }
        {/* <button onClick={handleOpen} className=' block bg-cyan-500 w-20 min-w-max p-1 rounded-xl'>
          <span className=' text-cyan-50'>
            <Add />
            Add House
          </span>
        </button> */}
        <span className=' text-2xl text-gray-500'>Total House</span>
        <span className='block w-[100px] bg-cyan-600 min-w-max py-1 px-2 rounded-xl text-white text-2xl font-bold text-center'>
          {data?.houses.length ? data.houses.length: 0 }
        </span>
      </div>
      <div className=" border-dashed border rounded-md border-red-900 h-auto">
        <div className="overflow-auto w-full rounded-lg border border-gray-200 shadow-md p-2">
          <table className="w-full min-w-max border-collapse bg-white text-left text-sm text-gray-500 max-lg:w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Date Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Owner
                </th>
                <th
                
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              { Array.isArray(data?.houses) && data?.houses.length > 0 ?(
                 data.houses.map((house) => (
                  <tr key={house._id} className="hover:bg-gray-50">
                
                <th className=" gap-3 items-center px-6 py-4 font-normal text-gray-900">
                  <div className="relative max-h-10 max-w-10">
                    
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{house.title}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${house.status === "Available" ? 'text-green-600 bg-green-50' : house.status === "Pending" ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${house.status === "Available" ? 'bg-green-600' : house.status === "Pending" ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                    {house.status}
                  </span>
                </td>
                <td className="px-6 py-4">{house.createdAt.substring(0,10)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {house.owner.firstname}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="">
                    <button onClick={() => handleTools(house._id)}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 0 24 24" 
                      width="24px" 
                      fill="#6b7280"
                      >
                        <path d="M0 0h24v24H0V0z" 
                        fill="none"
                      />
                      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14z"/><circle cx="9" cy="12" r="1.5"/><circle cx="14" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </button>
                    {
                      tools === house._id && (
                        <div className=' flex justify-end gap-4 absolute right-16 bg-gray-0 p-1'>
                    <button
                      onClick={() => {handleOpenDelete() 
                        setPropertyId(house._id)
                      }}
                      x-data="{ tooltip: 'Delete' }"
                      
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-red-600"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link
                    to={`/admin/house_details/${house._id}`}
                      title='view'
                      className=' text-cyan-600'
                    >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className=' w-6 h-6 text-gray-500'
                      viewBox="0 0 24 24"
                      fill='#0891b2'
                      >
                        <path d="M0 0h24v24H0V0z" 
                        fill="none"
                        />
                        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
                    </svg>
                    </Link>
                    <button
                      onClick={() => {
                        handleUpdateOpen();
                        setHouse(house);
                      }}
                      x-data="{ tooltip: 'Edite' }"
                      className=' text-blue-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button
                        onClick={() => {
                          handleOpenStatus();
                          setHouse(house);
                        }}
                        className=' text-green-700'
                      >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 0 24 24" 
                        width="24px" 
                        fill="#15803d">
                        <rect fill="none" 
                        height="24" 
                        width="24"/>
                        <path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>
                    </button>
                    </div>
                      )
                    }
                  </div>
                </td>
              </tr>
                ))
            ): (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <CreateHouseModal open={openModal} handleClose={handleClose} /> */}
      <UpdateHouseModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} house={house} />
      <HouseStatusModal openStatus={openStatus} handleCloseStatus={handleCloseStatus} house={house} />
      <DeletePropertyModal 
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose}
        propertyId={propertyId}
        url={`${url}`} />
    </div>
  )
}

export default AdminHouses
