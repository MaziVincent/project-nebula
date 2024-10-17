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
import { CircularProgress } from '@mui/material'

const Login = () => {
  const {auth, setAuth, persist, setPersist} = useContext(AuthContext)
  const url = `${baseURL}login`
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [isLoading, setIsLoading] = useState(false)
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
      console.log(response.data)
      toast.success('Login successful. Redirecting...')

      setTimeout(() => {
        if(response.data?.user?.type === 'Admin') {
          navigate('/admin')
        } else if(response.data?.user?.type === 'Agent'){
          navigate('/agent')
        } else if(response.data?.user?.type === 'Owner'){
          navigate('/owner')
        }else {
          navigate('/dashboard')
        }
        setIsLoading(false)
      }, 5000);
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
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ToastContainer />
      <div className="contaoner mx-auto max-w-7xl py-14 px-4">
        <div className=" sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className=" mt-6 text-center text-3xl font-bold tracking-tight text-gray-700 dark:text-gray-300">
            Sign in to your account
          </h2>
          <p className=" mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            <span>Or </span>
            <Link
              to="/signup"
              className=" font-medium underline hover:no-underline text-gray-700 hover:text-gray-800 dark:text-gray-300"
            >
              sign up for a new account
            </Link>
          </p>
        </div>
        <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" bg-white dark:bg-gray-800 dark:border dark:border-gray-700 shadow rounded-lg">
            <div className=" p-8">
              <form
                onSubmit={handleSubmit(login)}
                className=""
              >
                <div className=" space-y-6">
                  <div>
                    <label
                      className=" block text-sm font-medium text-gray-700 dark:text-gray-300"
                      htmlFor="user_email"
                    >
                      Email address
                    </label>
                    <div className="input mt-2 relative rounded-md shadow-sm">
                      <input
                        placeholder="Email Address"
                        className=" dark:bg-gray-700 block w-full rounded-md border py-3 px-3 focus:outline-none border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                        required="required"
                        type="email"
                        {...register("email", 
                          {required : true},
                          {pattern: /^\S+@\S+$/i} // Regular expression for email validation
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {" "}
                        email is required{" "}
                      </p>
                    )}
                  </div>

                  <div className="">
                    <label
                      className=" block text-sm font-medium text-gray-700 dark:text-gray-300"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="input mt-2 relative rounded-md shadow-sm">
                      <input
                        placeholder="*********"
                        className=" dark:bg-gray-700 block w-full rounded-md border py-3 px-3 focus:outline-none border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                        required="required"
                        type="password"
                        {...register("password",{required : true },
                          {minLength: 8}, // Minimum length of 8 characters
                          {maxLength: 32}, // Maximum length of 32 characters
                          //{pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/} // Regular expression for password validation
                        )}
                      />
                    </div>

                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {" "}
                        password is required{" "}
                      </p>
                    )}
                  </div>

                  <div className=" flex items-center justify-between">
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
                        className=" ml-2 text-sm block text-gray-900 dark:text-gray-300 mb-0"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className=" text-sm">
                      <Link className=" font-medium text-gray-600 dark:text-gray-300 underline">
                        Forgot your password{" "}
                      </Link>
                    </div>
                  </div>

                  <div className="">
                    <button
                      type='submit'
                      className={`cursor-pointer border rounded-md border-gray-300 bg-teal-800 text-white w-full py-2 px-2 text-sm`}
                    >
                      {isLoading ? <CircularProgress size={20} /> : 'Sign in'}
                    </button>
                  </div>
                </div>
              </form>

              <div className=" mt-6">
                <div className=" relative">
                  <div className=" absolute inset-0 flex items-center">
                    <div className=" w-full border-t border-gray-300"></div>
                  </div>
                  <div className=" relative flex justify-center text-sm">
                    <p className=" bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-300">
                      {" "}
                      Or continue with
                    </p>
                  </div>
                </div>
              </div>

              <div className=" mt-6 grid grid-cols-2 gap-3">
                <div className="">
                  <form action="">
                    <button className=" border rounded-md border-gray-300 w-full py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 focus:ring-0">
                      <span className=" sr-only">Sign in with Facebook</span>
                      <FacebookOutlined />
                    </button>
                   
                  </form>
                </div>

                <div className="">
                  <form action="">
                    <button className=" border rounded-md border-gray-300 w-full py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 focus:ring-0">
                      <span className=" sr-only">SIgn in with Google</span>
                      <Google />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table>
        
      </table>
    </div>
  )
}

export default Login
