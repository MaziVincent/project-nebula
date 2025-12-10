import React from 'react'
import useAuth from "../../../hooks/useAuth";
import { QueryClient, useQuery } from "react-query";
import { useState } from 'react';
import { blue, brown, green, grey, purple, yellow } from "@mui/material/colors";
import baseUrl from "../../../shared/baseURL";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import CreateApartmentModal from './CreateApartmentModal';
import { ToastContainer, toast } from 'react-toastify';
import UpdateApartmentModal from './UpdateApartmentModal';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import ApartmentStatusModal from './ApartmentStatusModal';
import DeletePropertyModal from '../property/DeletePropertyModal';
import baseURL from '../../../shared/baseURL';
import { Add } from '@mui/icons-material';


const AdminApartments = () => {
  const queryClient = new QueryClient();
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}apartment`
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  //modal handler
  // const handleOpen = () => setOpenModal(true)
  // const handleClose = () => setOpenModal(false)

  //update apartment details
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [apartment, setApartment] = useState({})

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
  const getApartments = async () => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["apartments"],
    getApartments,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );

  // const handleDelete = async(_id) => {
  //   try {
  //     const result = await axios.delete(`${url}/${_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${auth.accessToken}`,
  //       },
  //     })
  //     if (result?.status === 200) {
  //       toast.success("Shop deleted successfully");
  //       QueryClient.invalidateQueries("shop");
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };
  return (
    <div className=' pt-10 max-sm:mt-10 h-auto min-h-max'>
      <ToastContainer />
      <h3 className=' text-gray-700 font-semibold text-4xl text-center'>Apartments</h3>
      <div className=' mb-4 max-md:w-full'>
        {/* <button onClick={handleOpen} className=''>
          <span className=' '>
            <Add />
            Add Apartment  
          </span>
        </button> */}
        <span className=' text-2xl text-gray-500'>Total Apartments </span>
        <span className='block w-[100px] text-2xl font-bold bg-cyan-600 min-w-max py-1 px-2 rounded-xl text-cyan-50 text-center'>
        {data?.apartments.length ? data.apartments.length.toString().padStart(2, '0') : '00' }
        </span>
      </div>
      <div className=" border-dashed border rounded-md border-red-900 h-auto">
        <div className="overflow-auto w-full rounded-lg border border-gray-200 shadow-md p-2">
          <table className="w-full min-w-max border-collapse rounded-lg shadow-xl bg-white text-left text-sm text-gray-500 max-lg:w-full">
            <thead className="bg-gray-200 rounded-lg">
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
                  Owner / Agent
                </th>
                <th
                
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              { Array.isArray(data?.apartments) && data?.apartments.length > 0 ?(
                 data.apartments.map((apartment) => (
                  <tr key={apartment._id} className="hover:bg-gray-50">
                
                <th className=" gap-3 items-center px-6 py-4 font-normal text-gray-900">
                  <div className="relative max-h-10 max-w-10">
                    
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{apartment.title}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${apartment.status === "Available" ? 'text-green-600 bg-green-50' : apartment.status === "Pending" ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${apartment.status === "Available" ? 'bg-green-600' : apartment.status === "Pending" ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                    {apartment.status}
                  </span>
                </td>
                <td className="px-6 py-4">{apartment.createdAt.substring(0,10)}</td>
                <td className="px-6 py-4 flex items-center">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {apartment.owner.firstname} {apartment.owner.lastname}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {apartment.owner.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="">
                    <button onClick={() => handleTools(apartment._id)}>
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
                      tools === apartment._id && (
                        <div className=' flex justify-end items-center gap-4 absolute right-20 bg-gray-0 px-2 py-2 bg-sky-100 rounded-lg'>
                    <button
                      onClick={() => {handleOpenDelete() 
                        setPropertyId(apartment._id)
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
                    to={`/admin/apartment_details/${apartment._id}`}
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
                        setApartment(apartment);
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
                          setApartment(apartment);
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
      {/* <CreateApartmentModal open={openModal} handleClose={handleClose} /> */}
      <UpdateApartmentModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} apartment={apartment} />
      <ApartmentStatusModal openStatus={openStatus} handleCloseStatus={handleCloseStatus} apartment={apartment} />
      <DeletePropertyModal 
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose}
        propertyId={propertyId}
        url={`${url}`} />
    </div>
  )
}

export default AdminApartments
