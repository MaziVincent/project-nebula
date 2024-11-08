import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import baseURL from "../../../../shared/baseURL";
import { CircularProgress, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import UploadPropertyImage from "../../../admin/property/UploadPropertyImage";
import UploadDocument from "../../UploadDocument";
import { useQuery } from "react-query";

const Property = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [propertyId, setPropertyId] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => setOpenUpload(true);
  const handleUploadClose = () => setOpenUpload(false);

  // const [isUpload, setIsUpload] = useState(false);
  // const toggleUpload = () => setIsUpload(!isUpload);

  const [openDocUpload, setOpenDocUpload] = useState(false);
  const handleOpenDocUpload = () => setOpenDocUpload(true);
  const handleDocUploadClose = () => setOpenDocUpload(false);

  const getProperty = async () => {
    try {
      const result = await fetch(`${url}/${id}`, auth.accessToken);
        setProperty(result.data); 
    } catch (error) {
      toast.error("Error fetching Agent's details");
      console.log("Fetch error:", error);
    }
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["property"],
     getProperty,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always",
        onSuccess: () => {
          setTimeout(() => {
          }, 2000)
        }
    }
  );
  console.log(property)
  return (
    <div>
      <div className="pt-10 pl-4">
        <Link to="/owner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            className=" h-7 w-7 text-gray-400 hover:text-green-600"
            fill="currentColor"
          >
            <path
              d="M0 0h24v24H0V0z"
              fill="none"
            />
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z" />
          </svg>
        </Link>
      </div>
      {!property ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="">
          <h3 className="text-2xl font-bold">Property Details</h3>
          <div className="mt-5">
            <h4 className="text-xl font-bold">{property.title}</h4>
            <div className=" grid grid-cols-3 gap-2 shadow-md duration-200 delay-100 ease-in-out overflow-hidden">
              {property?.imageUrls?.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={property.title}
                  className=" w-full h-full duration-300 delay-300 ease-in-out  hover:scale-105"
                />
              ))}
            </div>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <p className=" mb-2">
              <span>Status: </span>
              {property.status}
            </p>
            <p className=" mb-5">
              <span>Price: </span>
              {parseFloat(property.price.$numberDecimal).toLocaleString('en-US')}
            </p>
            <span className=" grid grid-cols-3 gap- w-[350px]">
              <span className=" flex flex-col leading-5 items-center border-r border-gray-600">
                {property.bedrooms}
                <span>{property?.bedrooms ? "Bedrooms" : ""}</span>
              </span>
              <span className=" flex flex-col leading-5 items-center border-r border-gray-600">
                {property.bathrooms}
                <span>{property?.bathrooms ? "Bathrooms" : ""}</span>
              </span>
              <span className=" flex flex-col leading-5 items-center">
                {property.stories}
                <span className="">{property?.stories ? "Stories:" : ""} </span>
              </span>
            </span>
            <p className="text-gray-600 mt-4">
              <span className=" block text-xl text-gray-600 font-bold">Description:</span>
              {property.description}
            </p>
            <div>
              <div className=" grid grid-cols-1">
              {property?.exteriorFeatures && (
                
                <div className=" my-5">
                  <h4 className="text-xl text-center text-gray-600 font-bold mb-2">Exterior Features</h4>
                  <ul className="grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                  {property.exteriorFeatures
                    .map((feature, index) => (
                      <li key={index} className="w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0 mx-">
                        <div 
                          className="ext-ft text-gray-800 flex "
                          dangerouslySetInnerHTML={{ __html: feature }} 
                          />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {property?.interiorFeatures && (
                <div className=" mb-5">
                  <h4 className="text-xl text-center text-gray-600 font-bold mb-2">Interior Features</h4>
                  <ul className=" grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                    {property.interiorFeatures.map((interior, index) => (
                      <li
                        key={index}
                        className=" w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
                      >
                        <div className="ext-ft text-gray-800" dangerouslySetInnerHTML={{ __html: interior }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {property?.kitchenFeatures && (
                <div className=" mb-5">
                  <h4 className="text-xl text-center text-gray-600 font-bold mb-2">Kitchen Features</h4>
                  <ul className=" grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                    {property.kitchenFeatures.map((kitchen, index) => (
                      <li
                        key={index}
                        className=" w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
                      >
                          <div className="ext-ft" dangerouslySetInnerHTML={{ __html: kitchen }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {property?.livingRoomFeatures && (
                <div className=" mb-5">
                  <h4 className="text-xl text-center text-gray-600 font-bold mb-2">
                    LivingRooom Features
                  </h4>
                  <ul className=" grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                    {property.livingRoomFeatures.map((livingRoom, index) => (
                      <li
                        key={index}
                        className="w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
                      >
                          <div className="ext-ft" dangerouslySetInnerHTML={{ __html: livingRoom }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
              </div>
            <div className="relative flex gap-5 items-center ">
              <button
                onClick={() => {
                  handleOpenUpload();
                  setPropertyId(property._id);
                }}
                className=" bg-green-600 max-sm:bg-sky-100 text-green-100 bg-opacity-70 shadow-md shadow-green-300 max-sm:shadow-green-100 rounded-lg px-2 py-2 "
              >
                <span className=" md:block max-sm:hidden font-medium font-sans">
                  Upload {property.type} Image
                </span>
                <span className=" md:hidden max-sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="currentColor"
                    className="text-sky-600"
                  >
                    <path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
                  </svg>
                </span>
              </button>

              {(property.type === "Land" ||
                property.type === "House") && (
                  <button onClick={handleOpenDocUpload}>
                    <span className="relative flex items-center gap-2 bg-sky-600 hover:bg-sky-700 rounded-lg px-2 py-2">
                      <span className=" max-sm:hidden lg:block text-sky-100">
                        Upload Document
                      </span>
                      <span className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="28px"
                          viewBox="0 -960 960 960"
                          width="28px"
                          fill="currentColor"
                          className="text-sky-200"
                        >
                          <path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
      <UploadPropertyImage
        openUpload={openUpload}
        handleUploadClose={handleUploadClose}
        propertyId={propertyId}
      />

      <UploadDocument
        id={id}
        openDocUpload={openDocUpload}
        handleDocUploadClose={handleDocUploadClose}
        url={`${baseURL}${property?.type}`}
      />
    </div>
  );
};

export default Property;
