import useAuth from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { blue, brown, green, grey, purple, yellow } from "@mui/material/colors";
import baseURL from "../../../shared/baseURL";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DeletePropertyModal from "../../admin/property/DeletePropertyModal";
import CreateNewHouseModal from "./ownerComponent/CreateNewHouseModal";
import CreateApartmentModal from "../../admin/apartment/CreateApartmentModal";
import CreateNewLandModal from "./ownerComponent/CreateNewLandModal";
import CreateNewShopModal from "./ownerComponent/CreateNewShopModal";
import UpdatePropertiesModal from "./ownerComponent/UpdatePropertiesModal";
import PropertiesStatusModal from "./ownerComponent/PropertiesStatusModal";
import CreateNewApartmentModal from "./ownerComponent/CreateNewApartmentModal";
import { CircularProgress, ClickAwayListener } from "@mui/material";

const OwnerOverview = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties/owner`;
  const deleteUrl = `${baseURL}properties`;
  // const { agentId } = useParams();

  const [propertyType, setPropertyType] = useState(false)
  const [selectedPropertyType, setSelectedPropertyType] = useState('')
  const handlePropertyType = () => {
    setPropertyType(!propertyType)
  }

  //create property Modal
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const [openHouseModal, setOpenHouseModal] = useState(false)
  const handleOpenHouse = () => setOpenHouseModal(true)
  const handleCloseHouseModal = () => setOpenHouseModal(false)

  const [openLandModal, setOpenLandModal] = useState(false)
  const handleOpenLand = () => setOpenLandModal(true)
  const handleCloseLandModal = () => setOpenLandModal(false)

  const [openShopModal, setOpenShopModal] = useState(false)
  const handleOpenShop = () => setOpenShopModal(true)
  const handleCloseShopModal = () => setOpenShopModal(false)

  //for update property modal
  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const handleOpenUpdate = (property) => {
    setSelectedProperty(property)
    setSelectedPropertyType(property.type)
    setOpenUpdate(true)
  }
  const handleCloseUpdate = () => {
    setSelectedProperty(null)
    setOpenUpdate(false)
  }

  //delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")

  //status modal
  const [openStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);
  const [propertyStatus, setPropertyStatus] = useState(null);

  const ownerId = auth?.user?._id
  // console.log(agentId)
  const getProperties = async () => {
    const response = await fetch(`${url}/${ownerId}`, auth.accessToken);
    return response.data;
  };

  const {data, isLoading, isError, error, isSuccess} = useQuery(
    ['properties', ownerId],
    getProperties,
    {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnMount: 'always'
    }
  )

  //action tools section
  const [tools, setTools] = useState(false)
  const handleTools = (_id) => {
    if (tools === _id) {
      setTools(false)
    } else {
      setTools(_id)
    }
  }
  // console.log(data);
  return (
    <div className=" h-dvh">
          {isLoading && (
            <div className=" flex flex-col justify-center items-center m-52">
              <CircularProgress />
              Loading...
            </div>
          )}
          {isSuccess && 
            <div>
            <h1 className=" text-2xl font-semibold mt-4 text-green-900 text-center"> Overview</h1>
            <div>
              <div className=" flex justify-between items-center mb-4">
              <h2 className=" text-3xl font-normal text-start text-green-900 mb-0">Properties</h2>
              <div className=" relative">
                <button onClick={handlePropertyType} className=" bg-green-600 rounded-lg text-xl font-semibold text-emerald-50 px-2 py-2 inline-flex items-center">
                  <span><Add /></span>
                  Add New Property
                </button>
                {
                  propertyType && (
                    <div className=" absolute bg-green-50 w-full px-2 rounded-lg py-2 z-50 shadow-lg">
                      <h4 className=" text-lg mb-1 text-center text-green-700 tracking-widest">select property type</h4>
                      <div className=" flex flex-col gap-2 w-full items-start overflow-auto h-40">
                        <button 
                          onClick={() => {
                            handleOpenHouse()
                            handlePropertyType()
                          }}
                          className=" text-gray-800 font-medium hover:bg-green-400 rounded-lg px-2 block w-full text-start shadow-2xl">
                          <span><Add fontSize="small" /></span>House
                        </button>
                        <button 
                          onClick={() => {
                            handleOpen()
                            handlePropertyType()
                          }}
                          className=" text-gray-800 font-medium hover:bg-green-400 rounded-lg px-2 block w-full text-start shadow-2xl">
                          <span><Add fontSize="small" /></span>Apartment
                        </button>
                        <button 
                          onClick={() => {
                            handleOpenLand()
                            handlePropertyType()
                          }}
                          className=" text-gray-800 font-medium hover:bg-green-400 rounded-lg px-2 block w-full text-start shadow-2xl">
                          <span><Add fontSize="small" /></span>Land
                        </button>
                        <button 
                          onClick={() => {
                            handleOpenShop()
                            handlePropertyType()
                          }}
                          className=" text-gray-800 font-medium hover:bg-green-400 rounded-lg px-2 block w-full text-start shadow-2xl">
                          <span><Add fontSize="small" /></span>Shop
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
              </div>
              <div className=" border-dashed border rounded-md border-red-900 h-auto">
                <div className="overflow-auto w-full rounded-lg border border-gray-200 shadow-md p-2">
                  <table className="w-full min-w-max border-collapse text-left text-sm text-gray-500 max-lg:w-full">
                    <thead className="bg-gray-100 text-lg font-semibold">
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
                          property Type
                        </th>
                        <th
                        
                          scope="col"
                          className="px-6 py-4 font-medium text-gray-900"
                        >Tools</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-green-200 border-t border-green-100 ">
                      { data?.properties.length  > 0 ?(
                        data?.properties.map((property) => (
                          <tr key={property._id} className="hover:bg-green-50">
                        <th className=" gap-3 items-center px-6 py-4 font-normal text-green-900">
                          <div className="relative max-h-10 max-w-10">
                          
                            {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                          </div>
                          <div className="text-sm">
                            <div className="font-medium text-green-900">{property.title}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${property.status === "Available" ? 'text-green-600 bg-green-50' : property.status === "Pending" ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${property.status === "Available" ? 'bg-green-600' : property.status === "Pending" ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{property.createdAt.substring(0,10)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                              {property.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                        <div className="">
                          <button 
                            className=""
                            onClick={() => handleTools(property._id)}
                            >
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
                              tools === property._id && (
                                <div className=' flex justify-end gap-4 absolute right-20 bg-gray-0 py-1 px-2 bg-sky-200 rounded-md'>
                            <button
                              onClick={() => {handleOpenDelete() 
                                setPropertyId(property._id)
                              }}
                              x-data="{ tooltip: 'Delete' }"
                              href="#"
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
                            to={`/owner/property/${property._id}`}
                              title='view'
                              
                            >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg"
                              className=' w-6 h-6 text-cyan-600'
                              viewBox="0 0 24 24"
                              fill='currentColor'
                              >
                                <path d="M0 0h24v24H0V0z" 
                                fill="none"
                                />
                                <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
                            </svg>
                            </Link>
                            <button
                              onClick={() => {
                                handleOpenUpdate(property);
                                
                              } 
                               
                              }
                              x-data="{ tooltip: 'Edite' }"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-yellow-600"
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
                                  setPropertyStatus(property);
                                }}
                              >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 text-green-600"
                                viewBox="0 0 24 24"
                                fill="currentColor">
                                <rect fill="none"
                                />
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
            </div>
          </div>
          }
          {isError && <div className="text-red-500 text-3xl text-center m-52">{error.message}</div>}
      <div>
      <UpdatePropertiesModal openUpdate={openUpdate} handleCloseUpdate={handleCloseUpdate} property={selectedProperty} url={`${baseURL}${selectedPropertyType}`} />
      <CreateNewApartmentModal open={openModal} handleClose={handleClose} />
      <CreateNewHouseModal open={openHouseModal} handleCloseHouseModal={handleCloseHouseModal} />
      <CreateNewLandModal open={openLandModal} handleCloseLandModal={handleCloseLandModal} />
      <CreateNewShopModal open={openShopModal} handleCloseShopModal={handleCloseShopModal} />
      <PropertiesStatusModal openStatus={openStatus} handleCloseStatus={handleCloseStatus} property={propertyStatus} />
      <DeletePropertyModal
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose} 
        propertyId={propertyId}
        url={`${deleteUrl}`} />
      </div>
    </div>
  )
}

export default OwnerOverview
