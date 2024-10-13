import React, { useState } from 'react'
import DRELB from '../../assets/images/demo-real-estate-logo-black.png'
import DRELBX2 from '../../assets/images/demo-real-estate-logo-black@2x.png'
import Condomium from '../../assets/images/demo-real-estate-icon-condominium.svg'
import Apartment from '../../assets/images/demo-real-estate-icon-apartment.svg'
import Estate from '../../assets/images/demo-real-estate-icon-home.svg'
import Office from '../../assets/images/demo-real-estate-icon-office.svg'
import Shop from '../../assets/images/demo-real-estate-icon-shop.svg'
import { Link } from 'react-router-dom'
import SignUp from '../auth/SignUp'
import SignIn from '../auth/SignIn'

const Header = () => {
  const [showNav, setShowNav] = useState(false)
  const [arrowEast, setArrowEast] = useState(true)
  const [arrowWest, setArrowWest] = useState(false)
  const [showRent, setShowRent] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const handleOpen = () =>{
     setOpenModal(true)}
  const handleClose = () => {
    setOpenModal(false)
    setOpenLogin(true)
  }
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleRent = () => {
    setShowRent(!rent)
  }

  // handle arrow
  const onHover = () => {
    setArrowEast(false)
    setArrowWest(true)
  }
  onmouseleave = () => {
    setArrowEast(true)
    setArrowWest(false)

  }

  // handle show nav
  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  return (
    <div>
      <header>
        {/* start navigation */}
        <nav className="navbar navbar-expand-lg header-light bg-white border-bottom border-color-extra-medium-gray header-reverse" data-header-hover="light">
          <div className="container-fluid"> 
            <div className="col-auto">
              <a className="navbar-brand" href="/">
                <img src={DRELB} data-at2x={DRELBX2} alt="" className="default-logo" />
                <img src={DRELB} data-at2x={DRELBX2} alt="" className="alt-logo" />
                <img src={DRELB} data-at2x={DRELBX2} alt="" className="mobile-logo" />
              </a>
            </div>
            <div className="col-auto menu-order left-nav ps-60px lg-ps-20px">
              <button className="navbar-toggler float-start" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
              </button>
              {/* <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                Hello
              </div> */}
              <div className='navbar-collapse justify-content-center max-md:collapse' id='navbarNav'>
              <ul className="navbar-nav alt-font">
                  <li className="nav-item"><a href="/" className="nav-link">Home</a></li> 
                  <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
                  <li className="nav-item dropdown submenu">
                    <a href="/rent" className="nav-link">Rent</a>
                    {/* <div className=' flex justify-between items-center bg-white absolute top-32 w-full px-4'>
                      <div>
                        <Link>
                          <img src="" alt="" />
                          <span>Condominium</span>
                        </Link>
                      </div>
                      <div>
                        <Link>
                          <img src="" alt="" />
                          <span>Apartment</span>
                        </Link>
                      </div>
                      <div>
                        <Link>
                          <img src="" alt="" />
                          <span>Estate</span>
                        </Link>
                      </div>
                      <div>
                        <Link>
                          <img src="" alt="" />
                          <span>Office</span>
                        </Link>
                      </div>
                    </div> */}
                  </li>
                    <li className="nav-item dropdown submenu">
                        <a href="/sell" className="nav-link">Sell<span className="label bg-light-red text-red border-radius-26px">Hot</span></a>
                     
                    </li>
                  
                    {/* <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li> */}
                    <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
                </ul>
              </div>
            </div>
              <div className="col-auto ms-auto ps-lg-0 d-none d-sm-flex"> 
                  <div className="d-none d-xl-flex me-25px">
                      <div className="d-flex align-items-center widget-text fw-600 alt-font"><a href="tel:+2349161403450" className="d-inline-block"><span className="d-inline-block align-middle me-10px bg-base-color-transparent h-45px w-45px text-center rounded-circle fs-16 lh-46 text-base-color"><i className="feather icon-feather-phone-outgoing"></i></span><span className="d-none d-xxl-inline-block">+234916-140-3450</span></a></div>
                  </div>
                  <div className="header-icon">
                      <div className="header-button">
                          <button onClick={() => {handleOpen()}} className="btn btn-base-color btn-small btn-round-edge btn-hover-animation-switch">
                              <span> 
                                  <span className="btn-text">Buy property</span> 
                                  <span className="btn-icon"><i className="feather icon-feather-arrow-right icon-very-small"></i></span>
                                  <span className="btn-icon"><i className="feather icon-feather-arrow-right icon-very-small"></i></span>
                              </span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </nav>
            {/* end navigation  */}
          
        </header>
        <SignUp open={openModal} handleClose={handleClose} />
        <SignIn open={openLogin} handleCloseLogin={handleCloseLogin} />
    </div>
    
  )
}

export default Header
