import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoutModal from "../../auth/LogoutModal";
import { useLocation } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';
import { useContext } from 'react';

const OwnerAside = ({aside, setAside}) => {
  const location = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { auth } = useContext(AuthContext);
  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-56 h-screen pb-3 pt-5 transition-transform  bg-green-50 border-r border-green-100 max-sm:w-96 md:translate-x-0 ${
        aside ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px- h-full bg-green-50 max-sm:mt-6">
        <ul className="space-y-4 pl-0 pr-4">
          <li>
            <Link
              to="/owner"
              className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-r-lg border-l-4 border-green-50 hover:border-green-600 ${location.pathname === '/owner' ? 'border-green-600 text-green-600' : ''} hover:bg-gray-100 group`}
            >
              <svg
                aria-hidden="true"
                className={`w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-green-900 ${location.pathname === '/owner' ? 'text-green-900' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Overview</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/owner/profile/${auth?.user?._id}`}
              className={`flex items-center border-l-4 border-green-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === `/owner/profile/${auth?.user?._id}` ? 'border-green-600 text-green-600' : ''} group`}
            >
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-green-900 ${location.pathname === `/owner/profile/${auth?.user?._id}` ? 'text-green-900' : ''}`}
              viewBox="0 -960 960 960"
              fill="currentColor">
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
              />
            </svg>
              <span className="ml-3">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className={`flex items-center border-l-4 border-green-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === '/admin/properties' ? 'border-green-600 text-green-600' : ''} group`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-green-900 ${location.pathname === '/' ? 'text-green-900' : ''}`}
                viewBox="0 -960 960 960"
                fill="currentColor">
                <path d="M320-520q17 0 28.5-11.5T360-560q0-17-11.5-28.5T320-600q-17 0-28.5 11.5T280-560q0 17 11.5 28.5T320-520Zm160 0q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm160 0q17 0 28.5-11.5T680-560q0-17-11.5-28.5T640-600q-17 0-28.5 11.5T600-560q0 17 11.5 28.5T640-520ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
                />
              </svg>
              <span className="ml-3">Mesages</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-5 mt-5 pl-0 pr-4 space-y-4 border-t border-green-100">
          <li>
            <button
              onClick={handleOpenLogoutModal}
              to="#"
              className="flex items-center border-l-4 w-full border-green-50 hover:border-red-600 p-2 text-base font-medium text-red-500 hover:text-red-700 rounded-r-lg transition duration-75 hover:bg-gray-100 group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-7 ml-2 text-red-500 transition duration-75 group-hover:text-red-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                  <path d="M0,0h24v24H0V0z" 
                  fill="none"/>
                  <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/>
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className=" text-xs p-5 text-gray-800">
        &copy;2024 Real Estate Management System
      </div>
      <LogoutModal
        open={openLogoutModal}
        handleClose={handleCloseLogoutModal}
      />
    </aside>
  )
}

export default OwnerAside
