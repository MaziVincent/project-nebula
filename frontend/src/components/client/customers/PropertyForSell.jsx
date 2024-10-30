import useAuth from "../../../hooks/useAuth";
import { useQuery } from "react-query"
import baseUrl from "../../../shared/baseURL";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import PropertyDetails from "./PropertyDetails";
import { useState } from "react";
import { Modal, Pagination } from "@mui/material";
import PageSkeleton from "../../Home/skeletons/PageSkeleton";

const PropertyForSell = () => {
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}properties`

  const [page, setPage] = useState(1)
  const handleChange = (event, value) =>{
    setPage(value)
  }

  const [openModal, setOpenModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const handleProperty = (property) => {
    setSelectedProperty(property); // Set the entire property object
    setOpenModal(true)
  };
  
  const closeModal = () => {
    setOpenModal(false); // Close modal
  };
  const getProperties = async () => {
    const result = await fetch(`${url}/type?page=${page}&limit=6&type=Sell`, auth.accessToken);
    console.log(result);
    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["properties", page],
    getProperties,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );

  const isSmallScreen = window.innerWidth <= 1024;
  return (
    <div className="flex overflow-y-auto max-md:pt-10">
    {/* Main Content */}
    <div className="flex-1 bg-gray-50 px-4 py-4">
      {/* Greeting Section */}

      {/* Subheading before Search */}
      <h2 className="text-2xl font-bold mb-4 pt-5">Find Your Best Property For Sell 🏠🌆</h2>

      {/* Search Section */}
      <div className="flex items-center space-x-4 gap-2 mb-5 max-sm:flex-col">
        <div className=" w-1/3 relative m-0 max-sm:w-full">
        <h3 className=" text-base mb-0">Location</h3>
          <select className="border px-3 py-2 rounded-lg relative">
            <option>California</option>
            <option>New York</option>
            <option>Texas</option>
          </select>
          <span className=" absolute left-0 bottom-3">
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 text-gray-600"
              viewBox="0 -960 960 960"
              fill="currentColor">
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
              />
              </svg>
            </span>
        </div>
        <div className=" w-1/3 relative m-0 max-sm:w-full">
          <h3 className=" text-base m-0">Type</h3>
          <select className="border px-3 py-2 rounded-lg relative">
            <option>Industrial Homes</option>
            <option>Commercial Properties</option>
            <option>Luxury Homes</option>
          </select>
          <span className=" absolute left-0 bottom-2">
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            viewBox="0 -960 960 960" 
            fill="currentColor">
            <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"
            />
            </svg>
          </span>
        </div>
        <button className="bg-green-500 text-white px-6 py-1 rounded-lg mt-3">Search</button>
      </div>

      {/* Property Listings */}
      {isLoading && <div><PageSkeleton /></div>}
      {isSuccess && (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        { data?.properties?.length > 0 ?(
          data?.properties.map((props) => (
          <div key={props._id} className="bg-white p-5 rounded-lg shadow-md">
            <img
              src={props.imageUrls[0]}
              alt={props.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h4 className="text-gray-500 text-base uppercase font-semibold mb-2">{props.title}</h4>
            <h3 className="text-xl font-bold mb-3">${props.price}</h3>
              <span className=" flex justify-between mb-3">
                <span className=" flex flex-col leading-5 items-center">
                  {props.bedrooms}
                  <span>{props?.bedrooms ? 'Bedrooms' : '' }</span>
                </span>
                <span className=" flex flex-col leading-5 items-center">
                  {props.bathrooms}
                  <span>{props?.bathrooms ? 'Bathrooms' : '' }</span>
                </span>
              </span>
            <p className="text-gray-600 inline-flex items-center gap-1">
              <span>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6 text-green-600"
                viewBox="0 -960 960 960"
                fill="currentColor">
                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
                />
                </svg>
              </span>
              {props.location}</p>
            <button onClick={() => handleProperty(props)} className="mt-4 w-full bg-emerald-500 text-white px-4 py-1 rounded-lg">View</button>
          </div>
         ))
        ): (
          <div>
            <span>
              No data available
            </span>
          </div>
        )}
      </div>
      )}
    <div className=" flex justify-center mt-4 mb-">
            <Pagination count={data?.totalPage} page={page} onChange={handleChange} />
          </div>
    </div>
      
    {/* Property Details Sidebar */}
    {selectedProperty && ( // Render only if a property is selected
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
          <div className="p-5">
            <PropertyDetails property={selectedProperty} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* Property Details Modal for Small Screens */}
      {
        isSmallScreen && (
          <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="property-details-modal"
        className="sm:block lg:hidden" // Modal only for small screens
      >
        <div className="fixed inset-0 z-50 bg-white p-5 overflow-auto">
          <PropertyDetails property={selectedProperty} closeModal={closeModal} />
        </div>
      </Modal>
        )
      }
  </div>
  )
}

export default PropertyForSell
