import React, { useState } from "react";
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseURL from "../../../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { set, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import exteriorFeatures from "../../../subcomponents/ExteriorFeatures";
import interiorFeatures from "../../../subcomponents/InteriorFeatures";
import livingRoomFeatures from "../../../subcomponents/LivingRoomFeatures";
import kitchenFeatures from "../../../subcomponents/KitchenFeatures";

const NewHouseModal = ({ open, handleCloseHouseModal }) => {
  const queryClient = useQueryClient();
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseURL}house`;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExteriorFeatures, setExteriorFeatures] = useState([]);
  const [selectedInteriorFeatures, setInteriorFeatures] = useState([]);
  const [selectedKitchenFeatures, setKitchenFeatures] = useState([]);
  const [selectedLivingRoomFeatures, setLivingRoomFeatures] = useState([]);

  const handleExteriorFeatures = (e) => {
    e.preventDefault();
    setExteriorFeatures((prevFeatures) =>
      e.target.checked
        ? [...prevFeatures, e.target.value]
        : prevFeatures.filter((f) => f !== e.target.value)
    );
  };

  const handleInteriorFeatures = (e) => {
    e.preventDefault();
    setInteriorFeatures((prevFeatures) =>
      e.target.checked
        ? [...prevFeatures, e.target.value]
        : prevFeatures.filter((f) => f !== e.target.value)
    );
  };

  const handleKitchenFeatures = (e) => {
    e.preventDefault();
    setKitchenFeatures((prevFeatures) =>
      e.target.checked
        ? [...prevFeatures, e.target.value]
        : prevFeatures.filter((f) => f !== e.target.value)
    );
  };

  const handleLivingRoomFeatures = (e) => {
    e.preventDefault();
    setLivingRoomFeatures((prevFeatures) =>
      e.target.checked
        ? [...prevFeatures, e.target.value]
        : prevFeatures.filter((f) => f !== e.target.value)
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const createHouse = async (data) => {
    setIsLoading(true);
    if (!auth || !auth?.accessToken) {
      navigate("/login");
      return;
    }
    const formData = new FormData();

    // Append form fields
    for (const key in data) {
      if (key === "exteriorFeatures") {
        data.exteriorFeatures.forEach((exterior) => {
          formData.append("exteriorFeatures[]", exterior);
        });
      } else if (key === "interiorFeatures") {
        data.interiorFeatures.forEach((interior) => {
          formData.append("interiorFeatures[]", interior);
        });
      } else if (key === "kitchenFeatures") {
        data.kitchenFeatures.forEach((kitchen) => {
          formData.append("kitchenFeatures[]", kitchen);
        });
      } else if (key === "livingRoomFeatures") {
        data.livingRoomFeatures.forEach((living) => {
          formData.append("livingRoomFeatures[]", living);
        });
      } else {
        formData.append(key, data[key]);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await post(url, formData, auth?.accessToken);
      console.log(response.data);
      setTimeout(() => {
        handleCloseHouseModal();
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || err.message);
    }
    console.log(formData);
  };

  const { mutate } = useMutation(createHouse, {
    onSuccess: () => {
      setIsLoading(false);
      queryClient.invalidateQueries("houses");
      toast.success("New House Created Successfully");
    },
  });

  const handleCreateHouse = (data) => {
    data.exteriorFeatures = selectedExteriorFeatures;
    data.interiorFeatures = selectedInteriorFeatures;
    data.kitchenFeatures = selectedKitchenFeatures;
    data.livingRoomFeatures = selectedLivingRoomFeatures;
    mutate(data);
    setTimeout(() => {
      handleCloseHouseModal();
    }, 3000);
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseHouseModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className="overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-svh">
          {/* <!-- Modal content --> */}
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-5">
            {/* <!-- Modal header --> */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create House
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleCloseHouseModal();
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center absolute border border-gray-800 right-3 top-0"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              {/* <!-- Modal body --> */}
              <form
                onSubmit={handleSubmit(handleCreateHouse)}
                method="post"
                // encType='multipart/form-data'
              >
                <div className="flex flex-col gap-3 mb-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      {...register("title", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Type House name"
                      required=""
                    />
                    {errors.title && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="framework"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Description
                    </label>
                    <textarea
                      rows="8"
                      type="text"
                      name="description"
                      id="description"
                      {...register("description", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter the Description"
                      required=""
                    ></textarea>
                    {errors.description && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      // rows="4"
                      type="number"
                      {...register("price", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter Price here"
                    />
                    {errors.price && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      {...register("location", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter Location here"
                    />
                    {errors.location && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      value={auth?.user?._id}
                      {...register("owner")}
                      type="hidden"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="bedrooms"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Bedrooms
                    </label>
                    <input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      {...register("bedrooms", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter Number of bedrooms"
                    />
                    {errors.bedrooms && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="bathroom"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Bathrooms
                    </label>
                    <input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      {...register("bathrooms", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter Number of bathrooms here"
                    />
                    {errors.bathrooms && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="squareFootage"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Square Footage:
                    </label>
                    <input
                      id="squareFootage"
                      name="squareFootage"
                      type="number"
                      {...register("squareFootage", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter squareFootage here"
                    />
                    {errors.squareFootage && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="yearBuilt"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Year Built:
                    </label>
                    <input
                      id="yearBuilt"
                      name="yearBuilt"
                      type="date"
                      {...register("yearBuilt", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter yearBuilt here"
                    />
                    {errors.yearBuilt && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="lotSize"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Lot Size:
                    </label>
                    <input
                      id="lotSize"
                      name="lotSize"
                      type="number"
                      {...register("lotSize", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter lotSize here"
                    />
                    {errors.lotSize && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="buildingType"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Select Building Type:
                    </label>
                    <select
                      name="buildingType"
                      id="buildingType"
                      {...register("buildingType", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    >
                      <option
                        value="Select"
                        selected
                        disabled
                      >
                        -- Select Type --
                      </option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Duplex">Duplex</option>
                      <option value="One Story">One Storie</option>
                      <option value="Two Stories">Two Storie</option>
                      <option value="Three Stories">Three Storie</option>
                      <option value="Four Stories">Four Storie</option>
                      <option value="Five Stories">SkyScraper</option>
                    </select>
                    {errors.buildingType && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="docType"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Document Type:
                    </label>
                    <select
                      name="docType"
                      id="docType"
                      {...register("docType", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    >
                      <option
                        value="Select Document Type"
                        selected
                        disabled
                      >
                        Select Document Type
                      </option>
                      <option value="Power of Attorney">
                        {" "}
                        Power of Attorney{" "}
                      </option>
                      <option value="Certificate of Occupancy (C of O)">
                        Certificate of Occupancy (C of O)
                      </option>
                      <option value="Deeds of Conveyance">
                        Deeds of Conveyance
                      </option>
                      <option value="Deeds of Lease">Deeds of Lease</option>
                      <option value="Deeds of Sub-Lease">
                        Deeds of Sub-Lease
                      </option>
                    </select>
                    {errors.docType && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="exteriorFeatures"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Exterior Features:
                    </label>
                    <div className="space-y-2 grid grid-cols-3 border p-2 rounded-lg">
                      {exteriorFeatures.map((exterior, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`exfeature-${index}`}
                            name="exteriorFeatures"
                            value={`${exterior.value}`}
                            onChange={(e) => handleExteriorFeatures(e)}
                            className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`exfeature-${index}`}
                            className=" text-sm"
                          >
                            {exterior.name}
                          </label>
                        </div>
                      ))}
                      {errors.exteriorFeatures && (
                        <span className="text-red-500 text-sm">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="interiorFeatures"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Interior Features:
                    </label>
                    <div className="space-y-2 grid grid-cols-3 border p-2 rounded-lg">
                      {interiorFeatures.map((interior, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`infeature-${index}`}
                            name="interiorFeatures"
                            value={`${interior.value}`}
                            onChange={(e) => handleInteriorFeatures(e)}
                            className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`infeature-${index}`}
                            className=" text-sm"
                          >
                            {interior.name}
                          </label>
                        </div>
                      ))}
                      {errors.interiorFeatures && (
                        <span className="text-red-500 text-sm">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="livingRoomFeatures"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Living Room Features:
                    </label>
                    <div className="space-y-2 grid grid-cols-2 border p-2 rounded-lg">
                      {livingRoomFeatures.map((livingRoom, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`lifeature-${index}`}
                            name="livingRoomFeatures"
                            value={`${livingRoom.value}`}
                            onChange={(e) => handleLivingRoomFeatures(e)}
                            className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`lifeature-${index}`}
                            className=" text-sm"
                          >
                            {livingRoom.name}
                          </label>
                        </div>
                      ))}
                      {errors.livingRoomFeatures && (
                        <span className="text-red-500 text-sm">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="kitchenFeatures"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Kitchen Features:
                    </label>
                    <div className="space-y-2 grid grid-cols-2 border p-2 rounded-lg">
                      {kitchenFeatures.map((kitchen, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`ktfeature-${index}`}
                            name="kitchenFeatures"
                            value={`${kitchen.value}`}
                            onChange={(e) => handleKitchenFeatures(e)}
                            className="text-green-500 focus:ring-green-500 h-3 w-3 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`ktfeature-${index}`}
                            className=" text-sm"
                          >
                            {kitchen.name}
                          </label>
                        </div>
                      ))}
                      {errors.kitchenFeatures && (
                        <span className="text-red-500 text-sm">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Type
                    </label>
                    <select
                      name="propertyType"
                      id="propertyType"
                      {...register("propertyType", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    >
                      <option
                        value="select house type"
                        disabled
                        selected
                      >
                        Select House Type
                      </option>
                      <option value="Rent">Rent</option>
                      <option value="Sell">Sell</option>
                    </select>
                    {errors.propertyType && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-green-50 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {isLoading ? <CircularProgress /> : "Add New House"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewHouseModal;
