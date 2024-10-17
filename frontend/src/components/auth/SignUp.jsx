import React, { useState } from 'react'
import usePost from "../../hooks/usePost";
// import useAuth from "../../../hooks/useAuth";
import baseURL from '../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import SignIn from './SignIn';


const SignUp = ({open, handleClose}) => {
  const post = usePost();
  const navigate = useNavigate();
  const url = `${baseURL}customer`;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // const [openLogin, setOpenLogin] = useState(false)
  // const handleOpenLogin = () => setOpenLogin(true)
  // const handleCloseLogin = () => setOpenLogin(false)

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createAccount = async(data) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await post(url, formData);

      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  const {mutate} = useMutation(createAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("customer");
      toast.success("Account created successfully");
      setTimeout(() => {
        handleClose({type:"register"});
        handleClose({type:"openLogin"});
      }, 5000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateAccount = (data) => {
   mutate(data);
  }
  return (
    <Modal
      open={open}
      onClose={() => {handleClose({type:"register"})}}
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
              <h1 className=' text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl'>Sign Up</h1>
              <button
                type="button"
                onClick={() => {handleClose({type:"register"})}}
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
            <form 
              onSubmit={handleSubmit(handleCreateAccount)} 
              method='post'
              // encType=''
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className=' sm:col-span-2'>
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
                    placeholder="Type First name"

                  />
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
                    type='text'
                    {...register("lastname", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Lastname here"
                  />
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
                    name='email'
                    type='email'
                    {...register("email", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Email here"
                  />
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
                    name='phone'
                    type='text'
                    {...register("phone", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password:
                  </label>
                  <input
                    id="password"
                    name='password'
                    type='password'
                    {...register("password", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="********"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-green-50 inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {
                  isLoading ? (
                    <CircularProgress /> 
                  ) : (
                    " Sign Up"
                  )
                }
              </button>
            </form>
            <div>
              <p className='text-center mt-4 mb-2'>Already have an account? 
                <button 
                  onClick={() => {
                    handleClose({type:"register"});
                    handleClose({type:"openLogin"});
                    
                  }}
                  className='text-blue-600 underline hover:text-blue-700'> login</button>
              </p>
            </div>
            </div>
            {/* <!-- Modal body --> */}
            
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SignUp
