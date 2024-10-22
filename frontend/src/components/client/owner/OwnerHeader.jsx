import { useState } from "react";
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Profile from '../../../assets/images/photos/profile.png'

const OwnerHeader = ({ setAside }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 16) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };  
  const location = useLocation()
  const {auth, setAuth, persist, setPersist} = useContext(AuthContext)
  // console.log(auth)
  return (
    <nav className="bg-green-50 border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center gap-16">
          <ClickAwayListener
            onClickAway={() => {
              setAside(false);
            }}
          >
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
              onClick={() => setAside((aside) => !aside)}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
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

              <span className="sr-only">Toggle sidebar</span>
            </button>
          </ClickAwayListener>
          <Link
            to="/owner"
            className="flex items-center justify-between mr-4"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
              Dashboard
            </span>
          </Link>
          <div className="text-emerald-600 flex justify-between items-center mt-4 max-md:hidden">
            {auth ? (
              <div>
                <div className="flex items-center">
                  <h2 className="text-3xl mb-0 inline-flex items-center gap-1">
                    {getGreeting()}, {auth?.user?.firstname} 🎉
                    <span className={`w-3 h-3 rounded-full block mt-4`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px"
                        className={`h-3 w-3 ${auth?.user?.verified ? 'text-blue-600' : 'text-gray-400'}`}
                        fill="currentColor"
                        >
                        <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"
                        />
                      </svg>
                    </span>
                  </h2>
                  
                </div>
              </div>
            ) : (
              <h2>Loading user information...</h2> 
            )}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
        
          <div className=" h-14 w-14 rounded-full self-end relative">
            <img src={auth?.user?.profile ? auth.user.profile : Profile} alt="" className="w-full h-full rounded-full relative" />
            <span className=" w-4 h-4 rounded-full bg-green-600 border-2 border-white block absolute top-9 right-0"></span>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

export default OwnerHeader
