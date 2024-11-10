import React, { useState, useReducer } from "react";
import logo5 from "../../assets/images/megalogo5.svg"
import { Link, Navigate } from "react-router-dom";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import { useLocation } from "react-router-dom";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const reducer = (state, action) => {
  switch (action.type) {
    case "openLogin":
      return { login: !state.login };
    case "register":
      return { register: !state.register };
    default:
      state;
  }
};

const Header = () => {
  const { auth } = useContext(AuthContext);  // Accessing auth state
  const navigate = useNavigate();
  const location = useLocation();

  const [state, dispatch] = useReducer(reducer, {
    login: false,
    register: false,
  });

  const [showNav, setShowNav] = useState(false);

  // handle show nav
  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  const [propType, setPropType] = useState(false);
  const togglePropType = () => {
    setPropType(!propType);
  };
  
  const isSmallScreen = window.innerWidth <= 1024;
  console.log(auth)
  return (
    <div className="fixed z-50 w-full bg-white top-0">
      <header className="md:px-14 max-lg:px-10">
        <nav className="py-3">
          <div className="flex items-center justify-between">
            <div className=" w-[30rem] p-1 ">
              <Link to='/' className=" flex justify-center items-center">
                <img src={logo5} alt="" className=" w-full z-20 " />
              </Link>
            </div>
            <div className=" h-5 border-r border-gray-400 max-lg:hidden">

            </div>
            <div 
              className={`lg:flex ${isSmallScreen && showNav ? 'flex flex-col absolute top-28 md:top-24 left-0 w-full bg-white pl-10 py-5 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100' : 'hidden'} gap-10 lg:gap-5 transition-all duration-500 ease-in-out transform opacity-100`}>
              <Link
                to='/'
                onClick={handleShowNav}
                className={location.pathname === '/' ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'}
              >
                Home
              </Link>
              <Link to='/about' onClick={handleShowNav} className={location.pathname === '/about' ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'}>About</Link>
              <div >
                <button onClick={togglePropType} className={['/allproperties', '/rent', '/sell'].includes(location.pathname) ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'}>
                  Properties
                  <span>
                    <ExpandMore />
                  </span>
                </button>
                {
                  propType && (
                    <div className="flex gap-4 bg-white px-4 py-4 rounded-lg shadow-md absolute w-full right-0 max-md:flex-col max-md:relative max-md:shadow-none">
                  <Link to='/allproperties' onClick={() => { handleShowNav(); togglePropType(); }}  className={` ${location.pathname === '/allproperties' ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'} relative inline-flex items-center gap-1 group`}>
                    All Properties
                  </Link>
                  <Link to={`/rent`} onClick={() => { handleShowNav(); togglePropType(); }} className={location.pathname === '/rent' ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'}>Rent</Link>
                  <Link 
                    to={`/sell`} 
                    onClick={() => { handleShowNav(); togglePropType(); }} 
                    className={` ${location.pathname === '/sell' ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'} inline-flex items-center gap-1 group`}>
                    Sell
                    <span className=" block rounded-full bg-red-200 px-2 text-sm text-red-600 group-hover:bg-red-100 group-hover:text-red-400">Hot</span>
                  </Link>
                </div>
                  )
                }
              </div>
              <Link to='/contact' onClick={handleShowNav} className={location.pathname === '/contact' ? 'text-gray-500 font-medium text-lg hover:text-gray-800' : 'font-medium text-lg text-gray-800 hover:text-gray-500'}>
                Contact
              </Link>
              {
                auth.user ? (
                  <button onClick={() => navigate( auth.user.type === 'Customer' ? '/dashboard': auth.user.type === 'Agent' ? '/agent' : auth.user.type === 'Owner' ? '/owner' : '/')} className="md:hidden text-start rounded w-20 bg-green-500 shadow border-2 p-1">
                    <span className=" font-medium text-gray-800 hover:text-gray-500">Dashboard</span>
                    
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      dispatch({ type: "openLogin" });
                      handleShowNav();
                    }}
                    className="md:hidden text-start">
                    <span className=" font-medium text-gray-800 hover:text-gray-500">Get Started</span>
                  </button>
                )
              }
            </div>
            <div className=" flex justify-between items-center gap-8">
              <div className="d-none d-xl-flex me-25px">
                <div className="d-flex align-items-center widget-text fw-600 alt-font">
                  <a
                    href="tel:+2347046047536"
                    className="d-inline-block"
                  >
                    <span className="d-inline-block align-middle me-10px bg-base-color-transparent h-45px w-45px text-center rounded-circle fs-16 lh-46 text-base-color">
                      <i className="feather icon-feather-phone-outgoing"></i>
                    </span>
                    <span className="d-none d-xxl-inline-block">
                      +2347046047536
                    </span>
                  </a>
                </div>
              </div>
              <div className="header-button max-md:hidden">
              {!auth.user ? (
                            <button
                            onClick={() => {
                              dispatch({ type: "openLogin" });
                            }}
                            className="btn btn-base-color btn-small btn-round-edge btn-hover-animation-switch"
                          >
                            <span>
                              <span className="btn-text">Get Started</span>
                              <span className="btn-icon">
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </span>
                              <span className="btn-icon">
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </span>
                            </span>
                          </button>
                ) : (
                  <button onClick={() => navigate(auth.user.type === 'Customer' ? '/dashboard': auth.user.type === 'Agent' ? '/agent' : auth.user.type === 'Owner' ? '/owner' : '/')} className="btn btn-base-color btn-small rounded-lg">Dashboard</button>
                )}
              </div>
              { !showNav ? 
              <button
                onClick={handleShowNav} 
                className="lg:hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
               >
                <span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="34px" 
                    viewBox="0 -960 960 960" 
                    width="34px"
                    className=" text-gray-800"
                    fill="currentColor"
                    >
                    <path d="M360-240v-60h480v60H360Zm0-210v-60h480v60H360ZM120-660v-60h720v60H120Z" 
                    />
                  </svg>
                </span>
              </button> : 
              <button
                onClick={handleShowNav} 
                className="lg:hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
               >
                <span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="34px" 
                    viewBox="0 -960 960 960" 
                    width="34px"
                    className=" text-gray-800"
                    fill="currentColor"
                    >
                    <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
                    />
                  </svg>
                </span>
                {showNav}
              </button>
            }
            </div>
          </div>
        </nav>
        <SignUp
          open={state.register}
          handleClose={dispatch}
        />{" "}
        
        <SignIn
          open={state.login}
          handleCloseLogin={dispatch}
        />
      </header>
    </div>
  );
};

export default Header;
