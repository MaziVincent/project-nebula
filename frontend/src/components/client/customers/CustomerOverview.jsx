import useAuth from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { blue, brown, green, grey, purple, yellow } from "@mui/material/colors";
import baseUrl from "../../../shared/baseURL";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSkeleton from "../../Home/skeletons/PageSkeleton";
import { div } from "framer-motion/m";

const CustomerOverview = () => {
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}recentProps`
  const navigate = useNavigate();

  const [page, setPage] = useState(1)
    const handleChange = (event, value) =>{
        setPage(value)
    }
  // const [openModal, setOpenModal] = useState(false)
  // const [selectedProperty, setSelectedProperty] = useState(null)
  // const handleProperty = (property) => {
  //   setSelectedProperty(property); // Set the entire property object
  //   setOpenModal(true)
  // };
  
  // const closeModal = () => {
  //   setOpenModal(false); // Close modal
  // };
  const getProperties = async () => {
    const result = await fetch(`${url}?page=${page}&limit=12`, auth.accessToken);

    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["recentProps"],
    getProperties,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );

  // const isSmallScreen = window.innerWidth <= 1024;
  return (
    <div className="flex overflow-y-auto max-md:pt-10">
    <div className="flex-1 bg-gray-50 px-4 py-4">
      <div className=" mb-2">
        <Link to='/' className="text-gray-600 hover:text-green-600">
          <span title="Back to Home" className=" inline-flex items-center gap-2">
            <span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="34px" 
              viewBox="0 -960 960 960" 
              width="34px" 
              fill="currentColor"
              >
              <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z"
              />
            </svg>
            </span>
            <span className=" md:hidden max-sm:block">Back to Home</span>
          </span>
        </Link>
      </div>
 
      <h2 className="text-2xl font-bold mb-4 pt-2">Find Your Best Property 🏠🌆</h2>
    
      {/* <div className="flex items-center space-x-4 gap-2 mb-5 max-sm:flex-col">
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
      </div> */}
{/* 
<div className="flex bg-gray-200 rounded-3xl border-[1px] border-gray-100">
          <Link to='/dashboard/sell' className="rounded-l-xl pl-1 py-1  text-gray-800 hover:text-gray-600">
            <span className={` ${location.pathname === '/dashboard/sell' ? 'bg-gray-100 text-gray-700' : ''} px-2 py-1 rounded-l-3xl border-r border-gray-100`}>Buy</span>
          </Link>
          <Link to='/dashboard/rentals' className=" rounded-r-xl pr-1 py-1 text-gray-800 hover:text-gray-600">
            <span className={` ${location.pathname === '/dashboard/rentals' ? 'bg-gray-50 text-gray-700' : ''} px-2 py-1 rounded-r-3xl`}>Rent</span>
          </Link>
        </div> */}

      {/* Property Listings */}
      {isLoading && <div><PageSkeleton /></div> }
      {isSuccess && (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        { data?.length > 0 ?(
          data?.map((props) => (
          <div key={props._id} className="bg-white p-5 rounded-lg shadow-md">
            <img
              src={props.imageUrls[0]}
              alt="House 2"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h4 className="text-gray-500 text-xl uppercase font-bold mb-2">{props.title}</h4>
            <h3 className="text-xl alt-font font-bold mb-3">&#8358;{parseFloat(props.price?.$numberDecimal).toLocaleString('en-US')}  /{props.paymentType ? props.paymentType : ""} </h3>
              <span className=" flex justify-between mb-3">
                <span className=" flex flex-col leading-5 items-center">
                  {props?.bedrooms ? props.bedrooms.toString() : '0'}
                  <span>{props?.bedrooms ? 'Bedrooms' : '' }</span>
                </span>
                <span className=" flex flex-col leading-5 items-center">
                  {props?.bathrooms ? props.bathrooms.toString(): '0'}
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
            <button onClick={() => navigate(`/dashboard/details/${props._id}`)} className="mt-4 w-full bg-emerald-500 text-white px-4 py-1 rounded-lg">View</button>
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
    </div>
      

    
  </div>
  )
}

export default CustomerOverview
