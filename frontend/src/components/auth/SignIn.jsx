import React, {useEffect, useState} from 'react'
import baseURL from '../../shared/baseURL'
import AuthContext from '../../context/AuthProvider'
import axios from 'axios'
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FacebookOutlined, Google } from '@mui/icons-material'
import { CircularProgress, Modal } from '@mui/material'
import SignUp from './SignUp'


const SignIn = ({open, handleCloseLogin}) => {
  const {auth, setAuth, persist, setPersist} = useContext(AuthContext)
  const url = `${baseURL}login`
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [isLoading, setIsLoading] = useState(false)

  // const [openModal, setOpenModal] = useState(false)
  // const handleOpen = () => setOpenModal(true)
  // const handleClose = () => setOpenModal(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const login = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (response.status !== 200) {
        throw new Error('Network response was not ok')
        setIsLoading(false)
      }
      setAuth(response.data)
      toast.success('Login successful. Redirecting...')
      setTimeout(() => {
        if(response.data?.user?.type === 'Customer') {
          navigate('/dashboard')
         // console.log(response.data)
          toast.success('Login successful. Redirecting...')
    
        } else if(response.data?.user?.type === 'Agent'){
          navigate('/agent')
          toast.success('Login successful. Redirecting...')
        } else if(response.data?.user?.type === 'Owner'){
          navigate('/owner')
          toast.success('Login successful. Redirecting...')
        }   
        else{
          navigate('/unauthorized')
        }
        setIsLoading(false)
      }, 2000);
    } catch (error) {
      setIsLoading(false)
      switch (error.response.status) {
        case 400:
          toast.error('Invalid email or password')
          break;
        case 401:
          toast.error('Invalid credentials')
          break;
        default:
          toast.error('Something went wrong, try again later')
          break;
      }
      console.log(error)
    }
  };
  const togglePersist = () => {
    setPersist((prev) => !prev)
  }
  useEffect(() => {
    localStorage.setItem('persist', persist)
  }, [persist])
  console.log(auth)
  return (
    <Modal
      open={open}
      onClose={() => {handleCloseLogin({type:"openLogin"})}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-8  z-50 justify-center items-center w-full outline-none "
      >
      <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 ">
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-5">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-scr">
              <h1 className=' text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl'>Sign In</h1>
              <button
                type="button"
                onClick={() => {handleCloseLogin({type:"openLogin"})}}
                className="absolute -top-2 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 border border-gray-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
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
              <p>Sign in to continue</p>
            <form
              onSubmit={handleSubmit(login)}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
              <div className=" flex items-center justify-between py-2">
                    <div className=" flex items-center">
                      
                      <input
                        className=" form-checkbox text-teal-700 focus:ring-teal-800 h-4 w-4 border-gray-300 rounded"
                        type="checkbox"
                        name=""
                        id="remember me"
                        onChange={togglePersist}
                        checked={persist}
                      />
                      <label
                        className=" ml-2 text-sm block text-gray-900 mb-0"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className=" text-sm">
                      <Link className=" font-medium text-gray-600 underline hover:text-blue-600">
                        Forgot your password{" "}
                      </Link>
                    </div>
                  </div>
              <button
                type="submit"
                className="w-full text-green-50 inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {
                  isLoading ? (
                    <CircularProgress size={20} color="white" /> 
                  ) : (
                    " Sign In"
                  )
                }
              </button>
            </form>
            <div>
              <p className='text-center mt-4 mb-2'>Don't have na account yet? 
                <button 
                  onClick={() => {
                    handleCloseLogin({type:"openLogin"});
                    handleCloseLogin({type:"register"});
                    
                  }}
                  className='text-blue-600 underline hover:text-blue-700'> Sign Up</button>
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

export default SignIn