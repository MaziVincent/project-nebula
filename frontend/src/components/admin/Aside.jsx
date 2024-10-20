import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../auth/LogoutModal";


const Aside = ({ aside, setAside }) => {
  const location = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-56 h-screen pb-3 pt-5 transition-transform  bg-white border-r border-gray-100 max-sm:w-96 md:translate-x-0 ${
        aside ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px- h-full bg-white max-sm:mt-6">
        <ul className="space-y-4 pl-0 pr-4">
          <li>
            <Link
              to="/admin"
              className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-r-lg border-l-4 border-gray-50 hover:border-green-600 ${location.pathname === '/admin' ? 'border-green-600 text-green-600' : ''} hover:bg-gray-100 group`}
            >
              <svg
                aria-hidden="true"
                className={`w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-green-900 ${location.pathname === '/admin' ? 'text-green-900' : ''}`}
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
              to="/admin/properties"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === '/admin/properties' ? 'border-green-600 text-green-600' : ''} group`}
            >
              <svg
                className={`w-7 h-7 ml-2 text-gray-500 group-hover:text-green-900 ${location.pathname === '/admin/properties' ? 'text-green-900' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                // viewBox="0 0 16 20"
              >
                <path d="M21,6.5V14h-2V7.5L14,4L9,7.5V9H7V6.5l7-5L21,6.5z M15.5,7h-1v1h1V7z M13.5,7h-1v1h1V7z M15.5,9h-1v1h1V9z M13.5,9h-1v1h1V9 z M19,16h-2c0-1.2-0.75-2.28-1.87-2.7L8.97,11H1v11h6v-1.44l7,1.94l8-2.5v-1C22,17.34,20.66,16,19,16z M3,20v-7h2v7H3z M13.97,20.41 L7,18.48V13h1.61l5.82,2.17C14.77,15.3,15,15.63,15,16c0,0-1.99-0.05-2.3-0.15l-2.38-0.79l-0.63,1.9l2.38,0.79 c0.51,0.17,1.04,0.26,1.58,0.26H19c0.39,0,0.74,0.23,0.9,0.56L13.97,20.41z"/>
              </svg>
              <span className="ml-3">Property</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/apartments"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-500 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === '/admin/apartments' ? 'border-green-500 text-green-500' : ''} hover:text-green-500 group`}
            >
              <svg
                className={`w-7 h-7 ml-2 text-gray-500 group-hover:text-green-500 ${location.pathname === '/admin/apartments' ? 'text-green-500' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                // viewBox="0 0 16 20"
              >
                <path d="M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z"/>
              </svg>
              <span className="ml-3">Apartments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/shops"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-500 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === '/admin/shops' ? 'border-green-500 text-green-500' : ''} hover:text-green-500 group`}
            >
              <svg
                className={`w-7 h-7 ml-2 text-gray-500 group-hover:text-green-500 ${location.pathname === '/admin/shops' ? 'text-green-500' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                // viewBox="0 0 16 20"
              >
                <path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/>
              </svg>
              <span className="ml-3">Shops</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/houses"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-500 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === '/admin/houses' ? 'border-green-500 text-green-500' : ''} hover:text-green-500 group`}
            >
              <svg
                className={`w-7 h-7 ml-2 text-gray-500 group-hover:text-green-500 ${location.pathname === '/admin/houses' ? 'text-green-500' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                // viewBox="0 0 16 20"
              >
                <path d="M19,9.3V4h-3v2.6L12,3L2,12h3v8h6v-6h2v6h6v-8h3L19,9.3z M17,18h-2v-6H9v6H7v-7.81l5-4.5l5,4.5V18z"/><path d="M10,10h4c0-1.1-0.9-2-2-2S10,8.9,10,10z"/>
              </svg>
              <span className="ml-3">Houses</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/lands"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-500 p-2 text-base font-medium text-gray-900 rounded-r-lg  hover:bg-gray-100 ${location.pathname === '/admin/lands' ? 'border-green-500 text-green-500' : ''} hover:text-green-500 group`}
            >
              <svg
                className={`w-7 h-7 ml-2 text-gray-500 group-hover:text-green-500 ${location.pathname === '/admin/lands' ? 'text-green-500' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                // viewBox="0 0 16 20"
              >
                <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6zM5 16l1.52-2.03L8.04 16H5z"/>
              </svg>
              <span className="ml-3">Lands</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-5 mt-5 pl-0 pr-4 space-y-4 border-t border-gray-200">
          <li>
            <Link
              to="/admin/agents"
              className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-r-lg border-l-4 border-gray-50 hover:bg-gray-100 hover:border-green-500 group ${location.pathname === '/admin/agents' ? 'border-green-600 text-green-600' : ''} hover:text-green-600`}
            >
              <svg
                aria-hidden="true"
                className={`w-7 h-7 ml-2 text-gray-500 group-hover:text-green-900 ${location.pathname === '/admin/agents' ? 'text-green-900' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"/>
              </svg>
              <span className="ml-3">Agents</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/customers"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 ${location.pathname === '/admin/customers' ? 'border-green-600' : ''} rounded-r-lg transition duration-75 hover:bg-gray-100 group`}
            >
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 -960 960 960"
              className={`flex-shrink-0 w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-green-800 ${location.pathname === '/admin/customers' ? 'text-green-600' : ''}`}
              fill="currentColor"
              >
              <path d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"/></svg>
              <span className="ml-3">Customers</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/owners"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 rounded-r-lg transition duration-75 ${location.pathname === '/admin/owners' ? 'border-green-600 text-green-600' : ''} hover:bg-gray-100 group`}
            >
              <svg
                aria-hidden="true"
                className={`flex-shrink-0 w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-green-900 ${location.pathname === '/admin/owners' ? 'text-green-600' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z"/>
              </svg>
              <span className="ml-3">Owners</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center border-l-4 border-gray-50 hover:border-green-600 p-2 text-base font-medium text-gray-900 rounded-r-lg ${location.pathname === '/admin/users' ? 'border-green-600 text-green-600' : ''} transition duration-75 hover:bg-gray-100 group`}
            >
              <svg
                aria-hidden="true"
                className={`flex-shrink-0 w-7 h-7 ml-2 text-gray-500 transition duration-75 group-hover:text-gray-900 ${location.pathname === '/admin/users' ? 'text-green-600' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z"/>
              </svg>
              <span className="ml-3">All Users</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleOpenLogoutModal}
              to="#"
              className="flex items-center border-l-4 w-full border-gray-50 hover:border-red-600 p-2 text-base font-medium text-red-500 hover:text-red-700 rounded-r-lg transition duration-75 hover:bg-gray-100 group"
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
  );
};

export default Aside;
