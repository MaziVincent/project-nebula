

import { set, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../shared/baseURL";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
//import useCart from "../../hooks/useCart";
import { CircularProgress } from "@mui/material";
import VerifyOTP from "./VerifyOTP";
import useFetch from "../../hooks/useFetch";
import ChangePassword from "./ChangePassword";

const ForgotPassword = () => {
  const {
    setVerifyOTP,
    setCode
  } = useAuth();
  //const {dispatch} = useCart();
  const post = usePost();
  const fetch = useFetch();
  const url = `${baseUrl}email/pin`;
  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const checkEmail = async ( email) => {

    try {

        const formData = new FormData();
        formData.append("email", email);
        const response = await post(`${baseUrl}email/pin`, formData, "");
         //console.log(response.data)

        if(response.error){
          setError(response.message)
          setIsLoading(false);
          return;
        }
          setCode({email: email , pin : response.data?.pin})
          setVerifyOTP(true);
          setIsLoading(false);
          reset();
     
    } catch (error) {
      console.error(error);
      setError("Error Sending  OTP try again ");
      setIsLoading(false);
    }
  };

  const handleVerify = (data) => {
    setIsLoading(true);
    checkEmail(data.email);
    // sendOTP(data.PhoneNumber);
    
  };

 

  return (
    <main className="bg-gray-100 " >
   
        <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-screen ">
          
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  overflow-y-auto max-h-screen pb-10 ">
             
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-primary">
                  Verify Email Address 
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleVerify)}
                >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                   
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Email Address 
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        {...register("email", { required: true })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="email@gmail.com"
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          Email Address is required
                        </p>
                      )}
                      
                    </div>
                   
                  </div>
                 
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full text-white bg-green-700 flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting || isLoading ? <CircularProgress /> : " Proceed "}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full text-white bg-red-300 flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cancel
                  </button>
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                </form>
              </div>
            </div>
         
        </div>
        <VerifyOTP  />
        <ChangePassword />
      
    </main>
  );
};

export default ForgotPassword;
