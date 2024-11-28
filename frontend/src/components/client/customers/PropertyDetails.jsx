import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import { CircularProgress, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

const CustomerPropertyDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;

  const getProperty = async () => {
    const result = await fetch(`${url}/${id}`, auth.accessToken);
    return result.data;
  };

  const {
    data: property,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(["property", id], getProperty, {
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  console.log(property);

  return (
    <div className="px-3 lg:px-6 h-svh">

      <div className="py-5">
        <Link to="/dashboard">
        <ArrowBackIosNew />
        </Link>
      </div>
      {
      isLoading  &&
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      }
      {
        isSuccess &&
      
        <div className="">
          <h3 className="text-3xl font-bold">Property Details</h3>
          <div className="mt-5">
            <img
              src={property.imageUrls[0]}
              alt="Featured Property"
              className="w-full h-48 object-cover rounded-lg mb-5"
            />
          </div>
          <div>
            <h4 className="text-2xl font-bold capitalize">{property.title}</h4>
            <h4 className="text-dark-gray fw-600 alt-font mb-5px text-nowrap ">
                    &#8358;
                    {parseFloat(property.price.$numberDecimal).toLocaleString(
                      "en-US"
                    )}{" "}
                    /{property.paymentType ? property.paymentType : ""}
                  </h4>
            <p className="text-gray-600 capitalize">{property.location}</p>
            <p className="text-gray-600 mt-4">{property.description}</p>
            <span className=" flex gap-4 mb-3">
              <span className=" flex flex-col leading-5 items-center">
                {property?.bedrooms
                  ? property.bedrooms.toString()
                  : "0"}
                <span>{property?.bedrooms ? "Bedrooms" : ""}</span>
              </span>
              <span className=" flex flex-col leading-5 items-center">
                {property?.bathrooms
                  ? property.bathrooms.toString()
                  : "0"}
                <span>{property?.bathrooms ? "Bathrooms" : ""}</span>
              </span>
            </span>
            <p>
              <span>Status: </span>
              {property.status}
            </p>
            <p>
              <span>{property?.stories ? "Stories:" : ""} </span>
              {property.stories}
            </p>
            <div>
              <div className=" grid grid-cols-1">
                {property?.exteriorFeatures && (
                  <div className=" my-5">
                    <h4 className="text-xl  text-gray-600 font-bold mb-2">
                      Exterior Features
                    </h4>
                    <ul className="grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                      {property.exteriorFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0 mx-"
                        >
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
                    <h4 className="text-xl text-gray-600 font-bold mb-2">
                      Interior Features
                    </h4>
                    <ul className=" grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                      {property.interiorFeatures.map((interior, index) => (
                        <li
                          key={index}
                          className=" w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
                        >
                          <div
                            className="ext-ft text-gray-800"
                            dangerouslySetInnerHTML={{ __html: interior }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {property?.kitchenFeatures && (
                  <div className=" mb-5">
                    <h4 className="text-xl text-gray-600 font-bold mb-2">
                      Kitchen Features
                    </h4>
                    <ul className=" grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                      {property.kitchenFeatures.map((kitchen, index) => (
                        <li
                          key={index}
                          className=" w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
                        >
                          <div
                            className="ext-ft"
                            dangerouslySetInnerHTML={{ __html: kitchen }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {property?.livingRoomFeatures && (
                  <div className=" mb-5">
                    <h4 className="text-xl text-gray-600 font-bold mb-2">
                      LivingRooom Features
                    </h4>
                    <ul className=" grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8">
                      {property.livingRoomFeatures.map((livingRoom, index) => (
                        <li
                          key={index}
                          className="w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
                        >
                          <div
                            className="ext-ft"
                            dangerouslySetInnerHTML={{ __html: livingRoom }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <Link
              to={property?.owner?.whatsappLink}
              className="mt-5 bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
      }

    </div>
  );
};

export default CustomerPropertyDetails;
