import React from 'react'
import RentPic from '../../assets/images/photos/rent.jpg'
import House from '../../assets/images/photos/house.jpg'
import apartment from '../../assets/images/demo-real-estate-icon-apartment.svg'
import home from '../../assets/images/demo-real-estate-icon-home.svg'
import office from '../../assets/images/demo-real-estate-icon-office.svg'
import bed from '../../assets/images/demo-real-estate-icon-bed-small.svg'
import bath from '../../assets/images/demo-real-estate-icon-bath-small.svg'
import size from '../../assets/images/demo-real-estate-icon-size-small.svg'
import remax from '../../assets/images/logo-remax.svg'
import realtor from '../../assets/images/logo-realtor.svg'
import redfin from '../../assets/images/logo-redfin.svg'
import zillow from '../../assets/images/logo-zillow.svg'
import trulia from '../../assets/images/logo-trulia.svg'
const Rent = () => {
  return (
    <div>
      {/*  start page title  */}
        <section className="cover-background page-title-big-typography ipad-top-space-margin">
            <div className="container">
                <div className="row align-items-center align-items-lg-end justify-content-center extra-very-small-screen g-0">
                    <div className="col-xxl-5 col-xl-6 col-lg-7 position-relative page-title-extra-small md-mb-30px md-mt-auto" >
                        <h1 className="text-base-color">Rent your dream property</h1>
                        <h2 className="alt-font text-dark-gray fw-500 mb-0 ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">Help you find the <span className="fw-700 text-highlight d-inline-block">perfect one.<span className="bg-base-color h-10px bottom-10px opacity-3 separator-animation"></span></span></h2>
                    </div>
                    <div className="col-lg-5 offset-xxl-2 offset-xl-1 border-start border-2 border-color-base-color ps-40px sm-ps-25px md-mb-auto">
                        <span className="d-block w-85 lg-w-100">
                        We are a dedicated team of real estate professionals committed to 
                        helping you find your dream home or ideal investment property.</span>
                    </div>
                </div>
            </div>
        </section>
        {/*  end page title  */}
        {/*  start section  */}
        <section className="overflow-hidden position-relative p-0">
            <div className="opacity-very-light bg-dark-gray z-index-1"></div>
            <div className="container-fluid">
                <div className="row overlap-height">
                    <div className="col-12 p-0 position-relative overlap-gap-section">
                        <img src={RentPic} alt="" className="w-100" />
                        <div className="alt-font fw-600 fs-350 lg-fs-275 md-fs-250 xs-fs-160 position-absolute right-minus-170px lg-right-0px bottom-50px md-bottom-minus-60px xs-bottom-minus-50px text-white text-outline ls-minus-5px lg-right-0px text-outline-width-2px z-index-2" data-bottom-top="transform: translate3d(80px, 0px, 0px);" data-top-bottom="transform: translate3d(-280px, 0px, 0px);">rentals</div>
                    </div>
                </div>
            </div>
        </section>
        {/*  end section  */}
        {/*  start section   */}
        <section className="bg-very-light-gray z-index-3 position-relative">
            <div className="container"> 
                <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 overlap-section md-overlap-disable overlap-section-one-fourth justify-content-center">
                    <div className="col transition-inner-all md-mb-30px">
                        <div className="bg-white h-100 box-shadow-quadruple-large box-shadow-medium-hover border-radius-6px pt-25px pb-25px ps-40px pe-40px lg-p-25px">
                            {/*  start features box item  */}
                            <div className="feature-box feature-box-left-icon-middle text-start">
                                <div className="feature-box-content">
                                    <span className="d-block alt-font fw-600 text-base-color ls-05px">Apartment</span>
                                    <h4 className="d-inline-block text-dark-gray fw-800 ls-minus-1px alt-font mb-0 d-inline-block">8215</h4>
                                </div>
                                <div className="feature-box-icon me-0">
                                    <img src={apartment} alt="" />
                                </div>
                            </div>
                            {/*  end features box item  */}
                            <div className="border-top border-1 border-color-extra-medium-gray pt-10px mt-15px">
                                <a href="#rentals" className="btn btn-extra-large btn-link btn-hover-animation-switch text-dark-gray text-uppercase-inherit section-link">
                                    <span>
                                        <span className="btn-text">View all property</span>
                                        <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                        <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                    </span> 
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col transition-inner-all md-mb-30px">
                        <div className="bg-white h-100 box-shadow-quadruple-large box-shadow-medium-hover border-radius-6px pt-25px pb-25px ps-40px pe-40px lg-p-25px">
                            {/*  start features box item  */}
                            <div className="feature-box feature-box-left-icon-middle text-start">
                                <div className="feature-box-content">
                                    <span className="d-block alt-font fw-600 text-base-color ls-05px">Home</span>
                                    <h4 className="d-inline-block text-dark-gray fw-800 ls-minus-1px me-5px alt-font mb-0 d-inline-block">9235</h4>
                                </div>
                                <div className="feature-box-icon me-0">
                                    <img src={home} alt="" />
                                </div>
                            </div>
                            {/*  end features box item  */}
                            <div className="border-top border-1 border-color-extra-medium-gray pt-10px mt-15px">
                                <a href="#rentals" className="btn btn-extra-large btn-link btn-hover-animation-switch text-dark-gray text-uppercase-inherit section-link">
                                    <span>
                                        <span className="btn-text">View all property</span>
                                        <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                        <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                    </span> 
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col transition-inner-all xs-mb-30px">
                        <div className="bg-base-color h-100 box-shadow-quadruple-large box-shadow-medium-hover border-radius-6px pt-35px pb-35px ps-40px pe-40px lg-ps-25px lg-pe-25px">
                            <span className="fs-24 lh-26 d-inline-block alt-font text-white fw-500 mb-0"><span className="fw-700 d-block fs-45 mb-10px">18,350</span> Newly listed properties</span>
                        </div>
                    </div>
                    <div className="col transition-inner-all">
                        <div className="bg-white h-100 box-shadow-quadruple-large box-shadow-medium-hover border-radius-6px pt-25px pb-25px ps-40px pe-40px lg-p-25px">
                            {/*  start features box item  */}
                            <div className="feature-box feature-box-left-icon-middle text-start">
                                <div className="feature-box-content">
                                    <span className="d-block alt-font fw-600 text-base-color ls-05px">Shop</span>
                                    <h4 className="d-inline-block text-dark-gray fw-800 ls-minus-1px me-5px alt-font mb-0 d-inline-block">4413</h4>
                                </div>
                                <div className="feature-box-icon me-0">
                                    <img src={office} alt="" />
                                </div>
                            </div>
                            {/*  end features box item  */}
                            <div className="border-top border-1 border-color-extra-medium-gray pt-10px mt-15px">
                                <a href="#rentals" className="btn btn-extra-large btn-link btn-hover-animation-switch text-dark-gray text-uppercase-inherit section-link">
                                    <span>
                                        <span className="btn-text">View all property</span>
                                        <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                        <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                    </span> 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4 xs-mb-10 pt-9" id="rentals">
                    <div className="col-12 text-center">
                        <h3 className="alt-font text-dark-gray fw-500 ls-minus-1px shadow-none" data-shadow-animation="true">Latest property for <span className="fw-700 text-highlight">rent<span className="bg-base-color h-10px bottom-10px opacity-3 separator-animation"></span></span></h3>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 justify-content-center"> 
                    {/*  start box item  */}
                    <div className="col mb-30px">
                        <div className="border-radius-6px overflow-hidden box-shadow-large">
                            <div className="image position-relative">
                                <a href="demo-real-estate-property-details.html">
                                    <img src={House} alt="" />
                                </a>
                                <div className="col-auto bg-orange border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px">Rent</div>
                            </div> 
                            <div className="bg-white">
                                <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                                    <div className="d-flex align-items-center">
                                        <a href="demo-real-estate-property-details.html" className="alt-font text-dark-gray fw-700 fs-22 me-10px">Luxury villa in Texas</a>
                                    </div>
                                    <p className="mb-20px">982 Monroe ave, rochester</p>
                                    <div className="row g-0">
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bed} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">04</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bedrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bath} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">05</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bathrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={size} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">360m<sup>2</sup></span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Living area</span> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                                    <div className="col">
                                        <a href="demo-real-estate-property-details.html" className="btn btn-dark-gray btn-very-small btn-round-edge fw-600">View details</a>
                                    </div>
                                    <div className="col text-end">
                                        <span className="fs-24 alt-font text-dark-gray fw-700 mb-0">$6,89,000</span>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    </div> 
                    {/*  end box item  */}
                    {/*  start box item  */}
                    <div className="col mb-30px">
                        <div className="border-radius-6px overflow-hidden box-shadow-large">
                            <div className="image position-relative">
                                <a href="demo-real-estate-property-details.html">
                                    <img src={House} alt="" />
                                </a>
                                <div className="col-auto bg-orange border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px">Rent</div>
                            </div> 
                            <div className="bg-white">
                                <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                                    <div className="d-flex align-items-center">
                                        <a href="demo-real-estate-property-details.html" className="alt-font text-dark-gray fw-700 fs-22 me-10px">Modern villa in Oregon</a>
                                    </div>
                                    <p className="mb-20px">1261 Sampson street senver</p>
                                    <div className="row g-0">
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bed} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">05</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bedrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bath} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">05</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bathrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={size} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">780m<sup>2</sup></span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Living area</span> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                                    <div className="col">
                                        <a href="demo-real-estate-property-details.html" className="btn btn-dark-gray btn-very-small btn-round-edge fw-600">View details</a>
                                    </div>
                                    <div className="col text-end">
                                        <span className="fs-24 alt-font text-dark-gray fw-700 mb-0">$8,50,000</span>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    </div> 
                    {/*  end box item  */}
                    {/*  start box item  */}
                    <div className="col mb-30px">
                        <div className="border-radius-6px overflow-hidden box-shadow-large">
                            <div className="image position-relative">
                                <a href="demo-real-estate-property-details.html">
                                    <img src={House} alt="" />
                                </a>
                                <div className="col-auto bg-orange border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px">Rent</div>
                            </div> 
                            <div className="bg-white">
                                <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                                    <div className="d-flex align-items-center">
                                        <a href="demo-real-estate-property-details.html" className="alt-font text-dark-gray fw-700 fs-22 me-10px">Ranch style in Florida</a>
                                    </div>
                                    <p className="mb-20px">2814 Hampton meadows</p>
                                    <div className="row g-0">
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bed} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">04</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bedrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bath} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">04</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bathrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={size} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">260m<sup>2</sup></span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Living area</span> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                                    <div className="col">
                                        <a href="demo-real-estate-property-details.html" className="btn btn-dark-gray btn-very-small btn-round-edge fw-600">View details</a>
                                    </div>
                                    <div className="col text-end">
                                        <span className="fs-24 alt-font text-dark-gray fw-700 mb-0">$6,50,000</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>  
                    {/*  end box item  */}
                    {/*  start box item  */}
                    <div className="col lg-mb-30px">
                        <div className="border-radius-6px overflow-hidden box-shadow-large">
                            <div className="image position-relative">
                                <a href="demo-real-estate-property-details.html">
                                    <img src={House} alt="" />
                                </a>
                                <div className="col-auto bg-orange border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px">Rent</div>
                            </div> 
                            <div className="bg-white">
                                <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                                    <div className="d-flex align-items-center">
                                        <a href="demo-real-estate-property-details.html" className="alt-font text-dark-gray fw-700 fs-22 me-10px">Ranch style in Illinois</a>
                                    </div>
                                    <p className="mb-20px">4403 Pick street pleasant view</p>
                                    <div className="row g-0">
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bed} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">03</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bedrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bath} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">05</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bathrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={size} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">250m<sup>2</sup></span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Living area</span> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                                    <div className="col">
                                        <a href="demo-real-estate-property-details.html" className="btn btn-dark-gray btn-very-small btn-round-edge fw-600">View details</a>
                                    </div>
                                    <div className="col text-end">
                                        <span className="fs-24 alt-font text-dark-gray fw-700 mb-0">$6,00,000</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>  
                    {/*  end box item  */}
                    {/*  start box item  */}
                    <div className="col sm-mb-30px">
                        <div className="border-radius-6px overflow-hidden box-shadow-large">
                            <div className="image position-relative">
                                <a href="demo-real-estate-property-details.html">
                                    <img src={House} alt="" />
                                </a>
                                <div className="col-auto bg-orange border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px">Rent</div>
                            </div> 
                            <div className="bg-white">
                                <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                                    <div className="d-flex align-items-center">
                                        <a href="demo-real-estate-property-details.html" className="alt-font text-dark-gray fw-700 fs-22 me-10px">Cottage in Oklahoma</a>
                                    </div>
                                    <p className="mb-20px">1151 Bungalow road norfolk</p>
                                    <div className="row g-0">
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bed} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">03</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bedrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bath} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">03</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bathrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={size} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">300m<sup>2</sup></span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Living area</span> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                                    <div className="col">
                                        <a href="demo-real-estate-property-details.html" className="btn btn-dark-gray btn-very-small btn-round-edge fw-600">View details</a>
                                    </div>
                                    <div className="col text-end">
                                        <span className="fs-24 alt-font text-dark-gray fw-700 mb-0">$5,50,000</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div> 
                    {/*  end box item  */}
                    {/*  start box item  */}
                    <div className="col">
                        <div className="border-radius-6px overflow-hidden box-shadow-large">
                            <div className="image position-relative">
                                <a href="demo-real-estate-property-details.html">
                                    <img src={House} alt="" />
                                </a>
                                <div className="col-auto bg-orange border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px">Rent</div>
                            </div> 
                            <div className="bg-white">
                                <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                                    <div className="d-flex align-items-center">
                                        <a href="demo-real-estate-property-details.html" className="alt-font text-dark-gray fw-700 fs-22 me-10px">Modern house in Texas</a>
                                    </div>
                                    <p className="mb-20px">3259 Filbert street bethlehem</p>
                                    <div className="row g-0">
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bed} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">04</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bedrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={bath} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">04</span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Bathrooms</span> 
                                        </div>
                                        <div className="col">
                                            <div className="d-flex align-items-center">
                                                <img src={size} className="me-5px h-20px" alt="" />
                                                <span className="fw-600 alt-font text-dark-gray">620m<sup>2</sup></span>
                                            </div>
                                            <span className="d-block lh-18 fs-15">Living area</span> 
                                        </div>
                                    </div>
                                </div> 
                                <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                                    <div className="col">
                                        <a href="demo-real-estate-property-details.html" className="btn btn-dark-gray btn-very-small btn-round-edge fw-600">View details</a>
                                    </div>
                                    <div className="col text-end">
                                        <span className="fs-24 alt-font text-dark-gray fw-700 mb-0">$6,95,000</span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>  
                    {/*  end box item     */}
                </div> 
                <div className="row">
                    <div className="mt-5 xs-mt-10 d-flex justify-content-center" >
                        {/*  start pagination  */}
                        <ul className="pagination pagination-style-01 fs-13 alt-font fw-600 mb-0">
                            <li className="page-item"><a className="page-link" href="#"><i className="feather icon-feather-arrow-left fs-18 d-xs-none"></i></a></li>
                            <li className="page-item"><a className="page-link" href="#">01</a></li>
                            <li className="page-item active"><a className="page-link" href="#">02</a></li>
                            <li className="page-item"><a className="page-link" href="#">03</a></li>
                            <li className="page-item"><a className="page-link" href="#">04</a></li>
                            <li className="page-item"><a className="page-link" href="#"><i className="feather icon-feather-arrow-right fs-18 d-xs-none"></i></a></li>
                        </ul>
                        {/*  end pagination  */}
                    </div> 
                </div>
            </div>
        </section>
        {/*  end section  */}
        {/*  start section  */}
        <section className="overflow-hidden position-relative overlap-height pb-30px">
            <div className="container overlap-gap-section">
                <div className="row mb-2">
                    <div className="col-12 text-center">
                        <h5 className="alt-font fw-500 text-dark-gray">Our best trading partners with <span className="text-red fs-28 ms-5px me-5px align-middle">&#x2764;</span><strong className="text-decoration-line-bottom-medium">love peoples.</strong></h5>
                    </div>
                </div>
                <div className="row position-relative clients-style-08">
                    <div className="col swiper text-center feather-shadow mb-3" data-slider-options='{ "slidesPerView": 2, "spaceBetween":0, "speed": 4000, "loop": true, "pagination": { "el": ".slider-four-slide-pagination-2", "clickable": false }, "allowTouchMove": false, "autoplay": { "delay":0, "disableOnInteraction": false }, "navigation": { "nextEl": ".slider-four-slide-next-2", "prevEl": ".slider-four-slide-prev-2" }, "keyboard": { "enabled": true, "onlyInViewport": true }, "breakpoints": { "1200": { "slidesPerView": 4 }, "992": { "slidesPerView": 3 }, "768": { "slidesPerView": 2 } }, "effect": "slide" }'>
                        <div className="swiper-wrapper marquee-slide">
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={remax} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={zillow} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={realtor} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={redfin} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={trulia} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={remax} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={zillow} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                            {/*  start client item  */}
                            <div className="swiper-slide">
                                <a href="#"><img src={realtor} alt="" className="h-35px xs-h-30px" /></a>
                            </div>
                            {/*  end client item  */}
                        </div> 
                    </div>  
                </div>
            </div> 
        </section>
        {/*  end section  */}
    </div>
  )
}

export default Rent
