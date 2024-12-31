import React, { useState } from "react";
import usePost from "../../hooks/usePost";
// import useAuth from "../../../hooks/useAuth";
import baseURL from "../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useAuth from "../../hooks/useAuth";
//import SignIn from './SignIn';

const SignUp = ({ open, dispatch }) => {
  const post = usePost();
  const navigate = useNavigate();
  const url = `${baseURL}sms/otp`;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { setVerifyOTP, setCode,  setUserData } =
    useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleVerification = async (data) => {
    setIsLoading(true);
    setError("")
    try {
      const verificationData = { phone: data.phone, email:data.email };
      const response = await post(url, verificationData, "");

      setUserData(data)
      setCode(response.data?.response);
      
      dispatch({ type: "register" });
      dispatch({type:"verify"});


    } catch (error) {
      if (error.status === 409) {
        setError("Phone Number or Email already exist")
      }
      else if (error.status === 400) {
        setError(error.response?.data?.message);
      } else if (error.status === 500) {
        setError(" Error Sending OTP");
      }
    } finally {
      
    setIsLoading(false);
    }

  };
  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch({ type: "register" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-svh ">
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-10">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-scr">
              <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                Sign Up
              </h1>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "register" });
                }}
                className="absolute -top-2 right-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 border border-gray-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
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
              <p>Create account to continue</p>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <form
                onSubmit={handleSubmit(handleVerification)}
                method="post"
                // encType=''
              >
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className=" sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Firstname:
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      {...register("firstname", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Type First Name"
                    />
                    {errors.firstname && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Lastname:
                    </label>
                    <input
                      id="lastname"
                      // rows="4"
                      type="text"
                      {...register("lastname", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="Enter Last Name "
                    />
                    {errors.lastname && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      {...register("email", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="yourmail@gmail.com"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Phone:
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      {...register("phone", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                      placeholder="08033445566"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className=" sm:col-span-2 ">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                        {...register("password", {
                          required: true,
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                          maxLength: {
                            value: 32,
                            message:
                              "Password must be at most 32 characters long",
                          },

                          validate: (value) => {
                            if (value.includes(" ")) {
                              return "Password must not contain spaces";
                            }
                            return true;
                          },
                        })}
                      />

                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-2 flex items-center"
                      >
                        {showPassword ? (
                          <svg
                            className="w-6 h-6 text-gray-800 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-gray-800 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-green-50 inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {isLoading ? <CircularProgress /> : " Sign Up"}
                </button>
              </form>
              <div>
                <p className="text-center mt-4 mb-2">
                  Already have an account? &nbsp;
                  <button
                    onClick={() => {
                      dispatch({ type: "register" });
                      dispatch({ type: "openLogin" });
                    }}
                    className="text-green-600 underline hover:text-green-700"
                  >
                    {" "}
                    Login
                  </button>
                </p>
              </div>
            </div>
            {/* <!-- Modal body --> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
