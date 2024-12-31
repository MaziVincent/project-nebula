

import { set, useForm } from "react-hook-form";
import { useState, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../shared/baseURL";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import { CircularProgress } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import VerifyCode from "./VerifyCode";
import ChangePassword from "./ChangePassword";

const reducer = (state, action) => {
  switch (action.type) {
    case "openLogin":
      return { login: !state.login };
    case "register":
      return { register: !state.register };
    case "verify":
      return { verify: !state.verify };
    case "changePassword":
      return { verify: !state.changePassword };
    default:
      state;
  }
};

const ForgotPassword = () => {
  const {
    setCode,
    setUserData,
  } = useAuth();
  const post = usePost();
  const url = `${baseUrl}sms/code`;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    login: false,
    register: false,
    verify: false,
    changePassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const handleVerification = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const verificationData = { phone: data.phone };
      const response = await post(url, verificationData, "");

      setCode(response.data?.response);
      setUserData(data);
      dispatch({ type: "verify" });
    } catch (error) {
      if (error.status === 409) {
        setError("Phone Number or Email already exist");
      } else if (error.status === 400) {
        setError(error.response?.data?.message);
      } else if (error.status === 500) {
        setError(" Error Sending OTP");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = (data) => {
    setIsLoading(true);
    handleVerification(data);
   // console.log(data);
    
  };

 

  return (
    <main className="bg-gray-100 pt-5 ">
      <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-screen ">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  overflow-y-auto max-h-screen pb-10 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-primary">
              Verify Phone Number
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
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    {...register("phone", { required: true })}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="08012312312"
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      Phone Number is required
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
              {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <VerifyCode
        open={state.verify}
        dispatch={dispatch}
      />
      <ChangePassword open={state.changePassword} dispatch={dispatch} />
    </main>
  );
};

export default ForgotPassword;
