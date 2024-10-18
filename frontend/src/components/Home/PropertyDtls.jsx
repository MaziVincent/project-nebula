import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../shared/baseURL';
import { CircularProgress, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import Bedrooms from '../../assets/images/demo-real-estate-icon-bed.svg';
import Bathrooms from '../../assets/images/demo-real-estate-icon-bath.svg'
import PropertyDtl from '../../assets/images/demo-real-estate-property-details-09.svg'

const PropertyDtls = () => {
    const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;

  const [property, setProperty] = useState(null);
  const getProperty = async () => {
    try {
      const result = await fetch(`${url}/${id}`);
      if (result.data) {
        setProperty(result.data); 
      }
    } catch (error) {
      toast.error("Error fetching Agent's details");
      console.log("Fetch error:", error);
    }
  };
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    getProperty();
  }, [id]);
  console.log(property);
  
//   console.log(property.leaseDuration)
  return (
    <div className=''>
        
      {/*  start page title  */}

        {
            property ? (
                <div className=''>
                    <section className="cover-background page-title-big-typography ipad-top-space-margin">
                        
                        <div className="container">
                            <div className="row align-items-center align-items-lg-end justify-content-center extra-very-small-screen g-0">
                                <div>
                                    <Link
                                     to='/'
                                    >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        height="34px" 
                                        viewBox="0 -960 960 960" 
                                        width="34px"
                                        className=' text-gray-800'
                                        fill="currentColor"
                                        >
                                        <path d="m297.92-442.12 235.7 235.69L480-153.3 153.3-480 480-806.86l53.62 53.29-235.7 235.69h508.94v75.76H297.92Z"
                                        />
                                    </svg>
                                    </Link>
                                </div>
                                <div className="col-xl-7 col-lg-8 position-relative page-title-extra-small md-mb-30px md-mt-auto" >
                                    <h3 className="alt-font fw-600 text-dark-gray mb-15px ls-minus-1px">{property.title}</h3>
                                    <h1 className="mb-0 d-flex"><i className="feather icon-feather-map-pin icon-extra-medium text-base-color me-5px"></i>{property.location}</h1>
                                </div>
                                <div className="col-lg-3 offset-xl-2 offset-lg-1 border-start border-2 border-color-base-color ps-40px sm-ps-25px md-mb-auto">
                                    <h4 className="text-dark-gray fw-700 alt-font mb-5px">&#8358;{property.price}</h4>
                                    {/* <span className="fw-500 fs-18">$3,700 - Per sq. ft.{property.price / 12}</span> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  end page title  */}
                    {/*  start section  */}
                    <section className="p-0 overflow-hidden">
                        <div className="container-fluid p-0"> 
                            <div className="row row-cols-1 justify-content-center">
                                {/*  start content carousal item  */}
                                <div className="col">
                                    <div className="swiper slider-four-slide swiper-dark-pagination swiper-pagination-style-3" data-slider-options='{ "slidesPerView": 1, "spaceBetween": 20, "loop": true, "pagination": { "el": ".slider-four-slide-pagination", "clickable": true }, "autoplay": { "delay": 3000, "disableOnInteraction": false }, "navigation": { "nextEl": ".slider-one-slide-next-1", "prevEl": ".slider-one-slide-prev-1" }, "keyboard": { "enabled": true, "onlyInViewport": true }, "breakpoints": { "1200": { "slidesPerView": 3 }, "992": { "slidesPerView": 3 }, "768": { "slidesPerView": 2 } }, "effect": "slide" }'>
                                        <div className="swiper-wrapper">
                                            {/*  start content carousal item  */}
                                            <div className=" grid grid-cols-3 gap-4">
                                            {
                                                property.imageUrls.map((imageUrl, index) => (
                                                <img key={index} src={imageUrl} alt={property.title} className=' w-full h-[400px] max-md:h-[200px] duration-300 delay-300 ease-in-out  hover:scale-105' />
                                                ))
                                            }
                                            </div>
                                            {/*  end content carousal item  */}
                                            {/*  start content carousal item  */}
                                            {/* <div className="swiper-slide">
                                                <img src="https://via.placeholder.com/626x600" alt="" className="w-100" /> 
                                            </div> */}
                                            {/*  end content carousal item  */}
                                            {/*  start content carousal item  */}
                                            {/* <div className="swiper-slide">
                                                <img src="https://via.placeholder.com/626x600" alt="" className="w-100" />
                                            </div> */}
                                            {/*  end content carousal item  */}
                                            {/*  start content carousal item  */}
                                            {/* <div className="swiper-slide">
                                                <img src="https://via.placeholder.com/626x600" alt="" className="w-100" />
                                            </div> */}
                                            {/*  end content carousal item   */}
                                            {/*  start content carousal item  */}
                                            {/* <div className="swiper-slide">
                                                <img src="https://via.placeholder.com/626x600" alt="" className="w-100" />
                                            </div> */}
                                            {/*  end content carousal item  */}
                                            {/*  start content carousal item  */}
                                            {/* <div className="swiper-slide">
                                                <img src="https://via.placeholder.com/626x600" alt="" className="w-100" /> 
                                            </div> */}
                                            {/*  end content carousal item  */}
                                        </div>
                                        {/*  start slider navigation  */}
                                        <div className="slider-one-slide-prev-1 icon-very-small bg-white h-40px w-40px swiper-button-prev slider-navigation-style-01"><i className="feather icon-feather-arrow-left fs-20 text-light-gray"></i>
                                                
                                        </div>
                                        {/* <div className="slider-one-slide-next-1 icon-very-small bg-white h-40px w-40px swiper-button-next slider-navigation-style-01"><i className="feather icon-feather-arrow-right fs-20 text-light-gray"></i></div>  */}
                                        {/*  end slider navigation  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  end section   */}
                    {/*  start section   */}
                    <section className="pt-30px pb-30px border-bottom border-color-extra-medium-gray">
                        <div className="container"> 
                            <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2">
                                <div className="col text-center border-end xs-border-end-0 border-color-extra-medium-gray alt-font md-mb-15px">
                                    <span className="fs-19 text-dark-gray fw-600">Property Owner:</span> {property.owner.firstname} {property.owner.lastname}
                                </div>
                                {
                                    property?.yearBuilt && (
                                        <div className="col text-center border-end md-border-end-0 border-color-extra-medium-gray alt-font md-mb-15px">
                                            <span className="fs-19 text-dark-gray fw-600">Year built:</span> {property?.yearBuilt ? property.yearBuilt : 'N/A'}
                                        </div>
                                    )
                                }
                                {property?.type === 'Apartment' && (
                                    <div className="col text-center border-end xs-border-end-0 border-color-extra-medium-gray alt-font sm-mb-15px">
                                        <span className="fs-19 text-dark-gray fw-600">Accommodation:</span> Furnished
                                    </div>
                                )}
                                <div className="col text-center alt-font border-end">
                                    <span className="fs-19 text-dark-gray fw-600">Price:</span> &#8358;{property.price}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  end section  */}
                    {/*  start section    */}
                    <section className="position-relative">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 md-mb-50px">
                                    <div className="row mb-15px">
                                        <div className="col-12">
                                            <span className="text-dark-gray fs-24 fw-600 alt-font mb-15px d-block">Property description</span>
                                            <p>{property.description}</p>
                                        </div>
                                    </div>
                                    {property?.type === "House" || property?.type === "Apartment" ? (
                                        <div className="row g-0">
                                        <div className="col bg-very-light-gray p-35px lg-ps-15px lg-pe-15px border-radius-6px fs-16">
                                            <div className="row row-cols-2 row-cols-md-4 row-cols-sm-2">
                                                {property?.bedrooms && (
                                                    <div className="col text-center border-end border-color-extra-medium-gray sm-mb-30px flex justify-center flex-col items-center">
                                                        <img src={Bedrooms} className="w-50px mb-15px" alt="" />
                                                        <span className="text-dark-gray d-block lh-20">{property.bedrooms} Bedrooms</span>
                                                    </div>
                                                )}
                                                {property?.bathrooms && (
                                                    <div className="col text-center border-end sm-border-end-0 border-color-extra-medium-gray sm-mb-30px flex flex-col justify-center items-center">
                                                        <img src={Bathrooms}className="w-50px mb-15px" alt="" />
                                                        <span className="text-dark-gray d-block lh-20">{property.bathrooms} Bathrooms</span>
                                                    </div>
                                                )}
                                                {/* <div className="col text-center border-end border-color-extra-medium-gray">
                                                    <img src="images/demo-real-estate-icon-car.svg" className="w-50px mb-15px" alt="" />
                                                    <span className="text-dark-gray d-block lh-20">2 Parking</span>
                                                </div>
                                                <div className="col text-center">
                                                    <img src="images/demo-real-estate-icon-swimming.svg" className="w-50px mb-15px" alt="" />
                                                    <span className="text-dark-gray d-block lh-20">Swimming pool</span>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    ) : (
                                        <p className=' bg-neutral-200 px-2 py-5 blur-[1.5px]'>This feature is not availablefor the selected property!!!</p>
                                    )
                                }
                                    <div className="row mt-7">
                                        <div className="col-12">
                                            <span className="text-dark-gray fs-24 fw-600 alt-font mb-25px d-block">Specification</span>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    {/*  start features box item  */}
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-08.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Property ID:</span>
                                                        </div>
                                                    </div>
                                                    {/*  end features box item  */}
                                                </div>
                                                <div className="col">{property._id.substring(0,10)}..</div>
                                            </div>
                                            {property?.lotSize && (
                                            <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    {/*  start features box item  */}
                                                        <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                            <div className="feature-box-icon me-10px">
                                                                <img src='' className="w-25px" alt="" />
                                                            </div>
                                                            <div className="feature-box-content">
                                                                <span className="text-dark-gray">Lot size:</span>
                                                            </div>
                                                        </div>
                                                    {/*  end features box item  */}
                                                </div>
                                                <div className="col">{property.lotSize} plots</div>
                                            </div>
                                            )}
                                            {property?.squareFootage && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    {/*  start features box item  */}
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-12.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Property size:</span>
                                                        </div>
                                                    </div>
                                                    {/*  end features box item  */}
                                                </div>
                                                <div className="col">{property.squareFootage} Sq Ft</div>
                                            </div>
                                            )}
                                            <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-11.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Date Created:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property.createdAt.slice(0, 10)}</div>
                                            </div>
                                            <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-10.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Price:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">&#8358;{property.price}</div>
                                            </div>
                                            {/* <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-15.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Cooling:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">Yes</div>
                                            </div> */}
                                            
                                        </div>
                                        <div className="col-xl-6">
                                            {property?.floorArea && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-06.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">floor Area:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property.floorArea} floor</div>
                                            </div>
                                            )}
                                            
                                            {property?.yearBuilt && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-14.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Year built:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property?.yearBuilt ? property.yearBuilt : 'N/A'}</div>
                                            </div>
                                            )}
                                            {property?.stories && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-09.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Total floors:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">0{property.stories}</div>
                                                </div>
                                            )}
                                            {
                                                property?.ownershipType && (
                                                    <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                    <div className="col">
                                                        <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                            <div className="feature-box-icon me-10px">
                                                                <img src="images/demo-real-estate-property-details-13.svg" className="w-25px" alt="" />
                                                            </div>
                                                            <div className="feature-box-content">
                                                                <span className="text-dark-gray">OwnerShip:</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">{property.ownershipType}</div>
                                                </div>
                                                )
                                            }
                                            {
                                                property?.docType && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-13.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Document:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property.docType}</div>
                                            </div>
                                                )
                                            }
                                            {
                                            property?.plots  && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-13.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Plots:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property.plots}</div>
                                            </div>
                                            )}
                                            {
                                            property?.shopCategory  && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-13.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">shop Category:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property.shopCategory}</div>
                                            </div>
                                            )}
                                            {
                                            property?.securityDeposit  && (
                                                <div className="row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-13.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">Secutity Dep:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">&#8358;{property.securityDeposit}</div>
                                            </div>
                                            )}
                                            {
                                            property?.leaseDuration  && (
                                                <div className="row g-0 align-items-center lg-mb-15px lg-pb-15px lg-border-bottom border-color-extra-medium-gray">
                                                <div className="col">
                                                    <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                                                        <div className="feature-box-icon me-10px">
                                                            <img src="images/demo-real-estate-property-details-13.svg" className="w-25px" alt="" />
                                                        </div>
                                                        <div className="feature-box-content">
                                                            <span className="text-dark-gray">LeaseDuration:</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">{property.leaseDuration} yrs</div>
                                            </div>
                                            )}
                                        </div>
                                    </div> 
                                    <div className="row mt-7">
                                        <div className="col-12">
                                            <span className="text-dark-gray fs-24 fw-600 alt-font mb-25px d-block">Location</span>
                                        </div>
                                        <div className="col-12"> 
                                            <iframe src="https://www.google.com/maps/embed" className=' w-[682px] max-md:w-full h-[400px]' frameborder="0"></iframe>
                                            {/* <div id="map" className="map small-screen border-radius-6px" data-map-options='{ "lat": -37.805688, "lng": 144.962312, "style": "Dark", "marker": { "type": "HTML", "color": "#06af47" }, "popup": { "defaultOpen": true, "html": "<div className=infowindow><strong className=\"mb-3 d-inline-block alt-font\">Crafto Real Estate</strong><p className=\"alt-font\">401 Broadway, 24th Floor, Orchard View, London, UK</p></div><div className=\"google-maps-link alt-font\"> <a aria-label=\"View larger map\" target=\"_blank\" jstcache=\"31\" href=\"https://maps.google.com/maps?ll=-37.805688,144.962312&amp;z=17&amp;t=m&amp;hl=en-US&amp;gl=IN&amp;mapclient=embed&amp;cid=13153204942596594449\" jsaction=\"mouseup:placeCard.largerMap\">VIEW LARGER MAP</a></div>" } }'></div> */}
                                        </div>
                                    </div>
                                    <div className="row mt-7">
                                        <div className="col-12">
                                            <span className="text-dark-gray fs-24 fw-600 alt-font mb-15px d-block">Features</span>
                                        </div>
                                        {
                                            property?.type === "House" ? (
                                                <div className='row'>
                                                    {property?.exteriorFeatures && (
                                            <div className="col-6 col-sm-4">
                                            {/*  start list style  */}
                                            <ul className="list-style-02 ps-0 mb-0">
                                                {property.exteriorFeatures.map((exterior, index) => (
                                                    <li key={index}><i className="bi bi-check-circle icon-small me-10px"></i>{exterior}</li>
                                                ))}
                                            </ul>
                                            {/*  end list style  */}
                                        </div>
                                        )}
                                        {property?.interiorFeatures && (
                                            <div className="col-6 col-sm-4">
                                            {/*  start list style  */}
                                            <ul className="list-style-02 ps-0 mb-0">
                                                {property.interiorFeatures.map((interior, index) => (
                                                    <li key={index}><i className="bi bi-check-circle icon-small me-10px"></i>{interior}</li>
                                                ))}
                                            </ul>
                                            {/*  end list style  */}
                                        </div>
                                        )}
                                        {property?.livingRoomFeatures && (
                                            <div className="col-6 col-sm-4">
                                            {/*  start list style  */}
                                            <ul className="list-style-02 ps-0 mb-0">
                                                {property.livingRoomFeatures.map((livingRoom, index) => (
                                                    <li key={index}><i className="bi bi-check-circle icon-small me-10px"></i>{livingRoom}</li>
                                                ))}
                                            </ul>
                                            {/*  end list style  */}
                                        </div>
                                        )}
                                                </div>
                                            ) : (
                                                <p className=' bg-neutral-200 px-2 py-5 blur-[1.5px]'>This feature is not availablefor the selected property!!!</p>
                                            )
                                        }
                                    </div>
                                    <div className="row mt-7">
                                        <div className="col-12">
                                            <span className="text-dark-gray fs-24 fw-600 alt-font mb-25px d-block"></span>
                                            <img src={property.imageUrls[0]} className="border-radius-6px w-[682px]" alt="" />
                                        </div>
                                    </div>
                                    <div className="row mt-7">
                                        <div className="col-12">
                                            <span className="text-dark-gray fs-24 fw-600 alt-font mb-25px d-block"></span>
                                            <img src={property.imageUrls[2]} className="border-radius-6px w-[682px]" alt="" />
                                        </div>
                                    </div>
                                </div>
                                {/*  start sticky  */}
                                <div className="col-xl-4 offset-xl-1 col-lg-5">
                                    <div className="bg-base-color-light border-radius-6px position-sticky top-120px">
                                        <div className="bg-base-color border-radius-6px feature-box feature-box-left-icon-middle overflow-hidden icon-with-text-style-08 ps-35px pe-35px pt-25px pb-20px xs-p-25px">
                                            {/*  start features box item  */}
                                            <div className="feature-box-icon feature-box-icon-rounded border w-90px h-90px overflow-visible me-20px position-relative">
                                                <img src={property.owner.profile} className="rounded-circle" alt="148x148" />
                                                <span className={`animation-zoom d-inline-block ${property?.owner?.status === 'Active' ? 'bg-green-400' : 'bg-orange'} border-2 border-color-white h-20px w-20px border-radius-100 position-absolute right-0px top-5px`}></span>
                                            </div>
                                            {/*  end features box item  */}
                                            {/*  start features box item  */}
                                            <div className="feature-box-content last-paragraph-no-margin">
                                                <span className="text-white alt-font fw-600 fs-20 d-block">{property.owner.firstname} {property.owner.lastname}</span>
                                                <div className="lh-24 d-block">
                                                    <span className="me-5px text-white opacity-8">{property?.owner?.properties.length} property</span>
                                                    <div className="bg-white border-radius-2px text-uppercase alt-font fw-700 text-dark-gray fs-12 lh-24 ps-10px pe-10px d-inline-block align-middle">{property?.owner?.verified ? 'Verified' : 'N/A'}</div>
                                                </div>
                                            </div>
                                            {/*  end features box item  */}
                                            {/*  start social icon  */}
                                            <div className="elements-social social-icon-style-02 mt-5px w-100 text-start text-lg-center">
                                                <ul className="medium-icon">
                                                    <li className="m-0"><a className="facebook text-white" href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                    <li className="m-0"><a className="dribbble text-white" href="http://www.dribbble.com" target="_blank"><i className="fa-brands fa-dribbble"></i></a></li> 
                                                    <li className="m-0"><a className="twitter text-white" href="http://www.twitter.com" target="_blank"><i className="fa-brands fa-twitter"></i></a></li> 
                                                    <li className="m-0"><a className="instagram text-white" href="http://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></a></li> 
                                                </ul>
                                            </div>
                                            {/*  end social icon  */}
                                        </div>
                                        <div className="ps-45px pe-45px pt-35px pb-45px xs-p-25px contact-form-style-01 mt-0">
                                            <div className="mb-20px last-paragraph-no-margin">
                                                <p className="mb-0 alt-font fw-500 text-dark-gray"><i className="feather icon-feather-phone-call icon-small text-base-color me-10px"></i><span className="fw-600 w-20 sm-w-15 xs-w-20 d-inline-block">Phone:</span><a href={property?.owner?.phone} className="text-dark-gray text-base-color-hover"> {property?.owner?.phone}</a></p>
                                                <p className="alt-font fw-500 text-dark-gray"><i className="feather icon-feather-mail icon-small text-base-color me-10px"></i><span className="fw-600 w-20 sm-w-15 xs-w-20 d-inline-block">Email:</span><a href={property?.owner?.email} className="text-dark-gray text-decoration-line-bottom"> {property?.owner?.email}</a></p>
                                            </div>
                                            <span className="alt-font fs-20 fw-600 text-dark-gray d-block mb-25px">Leave your message here</span>
                                            {/*  start contact form  */}
                                            <form action="email-templates/contact-form.php" method="post">
                                                <div className="position-relative form-group mb-15px">
                                                    <span className="form-icon"><i className="bi bi-emoji-smile"></i></span>
                                                    <input type="text" name="name" className="form-control border-color-white box-shadow-large required" placeholder="Your name*" />
                                                </div>
                                                <div className="position-relative form-group mb-15px">
                                                    <span className="form-icon"><i className="bi bi-envelope"></i></span>
                                                    <input type="email" name="email" className="form-control border-color-white box-shadow-large required" placeholder="Your email address*" />
                                                </div>
                                                <div className="position-relative form-group mb-15px">
                                                    <span className="form-icon"><i className="bi bi-telephone-outbound"></i></span>
                                                    <input type="tel" name="phone" className="form-control border-color-white box-shadow-large" placeholder="Your phone" />
                                                </div>
                                                <div className="position-relative form-group form-textarea">
                                                    <span className="form-icon"><i className="bi bi-chat-square-dots"></i></span>
                                                    <textarea placeholder="Your message" name="comment" className="form-control border-color-white box-shadow-large" rows="3"></textarea>
                                                    <input type="hidden" name="redirect" value="" />
                                                    <button className="btn btn-small btn-round-edge btn-base-color mt-20px submit " type="submit">Send message</button>
                                                    <div className="form-results mt-20px d-none"></div>
                                                </div>
                                            </form>
                                            {/*  end contact form  */}
                                        </div>
                                    </div>
                                </div>
                                {/*  end sticky  */}
                            </div>
                        </div>
                    </section>
                    {/*  end section   */}
                    {/*  start section   */}
                    <section className="pt-0 pb-30px position-relative overlap-height overflow-hidden"> 
                        <div className="container-fluid overlap-gap-section">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <h3 className="alt-font text-dark-gray fw-500 ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">Best review by <span className="fw-700 text-highlight d-inline-block">happy customer<span className="bg-base-color h-10px bottom-5px opacity-3 separator-animation"></span></span></h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 p-0 review-style-09">
                                    <div className="swiper slider-shadow-left-right lg-slider-shadow-none lg-ps-15px lg-pe-15px" data-slider-options='{ "slidesPerView": 1, "spaceBetween": 30, "loop": true, "autoplay": { "delay": 2000, "disableOnInteraction": false },  "pagination": { "el": ".slider-three-slide-pagination", "clickable": true, "dynamicBullets": true }, "navigation": { "nextEl": ".slider-three-slide-next", "prevEl": ".slider-three-slide-prev" }, "keyboard": { "enabled": true, "onlyInViewport": true }, "breakpoints": { "1400": { "slidesPerView": 4 }, "1200": { "slidesPerView": 3 }, "768": { "slidesPerView": 2 } }, "effect": "slide" }'>
                                        <div className="swiper-wrapper pt-30px pb-30px">
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/148x148" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star-half-stroke"></i>
                                                            </div>
                                                            <span className="fw-600 alt-font text-dark-gray d-inline-block">Matthew taylor</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/148x148" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                            </div>
                                                            <span className="fs-18 fw-600 alt-font text-dark-gray d-inline-block">Herman miller</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/148x148" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star-half-stroke"></i>
                                                            </div>
                                                            <span className="fs-18 fw-600 alt-font text-dark-gray d-inline-block">Jacob kalling</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/200x200" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                            </div>
                                                            <span className="fs-18 fw-600 alt-font text-dark-gray d-inline-block">Alexa harvard</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/200x200" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                            </div>
                                                            <span className="fs-18 fw-600 alt-font text-dark-gray d-inline-block">Jhon smith</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/148x148" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star-half-stroke"></i>
                                                            </div>
                                                            <span className="fw-600 alt-font text-dark-gray d-inline-block">Matthew taylor</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/148x148" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                            </div>
                                                            <span className="fs-18 fw-600 alt-font text-dark-gray d-inline-block">Herman miller</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                            {/*  start slider item   */}
                                            <div className="swiper-slide"> 
                                                {/*  start review item  */}
                                                <div className="border-radius-10px bg-white box-shadow-double-large">
                                                    <div className="d-flex align-items-center p-40px md-p-25px">
                                                        <img className="rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px" src="https://via.placeholder.com/148x148" alt="" />
                                                        <div>
                                                            <p className="mb-10px lh-32">Lorem ipsum amet tempor incididunt nostrud dolore.</p>
                                                            <div className="d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star-half-stroke"></i>
                                                            </div>
                                                            <span className="fs-18 fw-600 alt-font text-dark-gray d-inline-block">Jacob kalling</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*  end review item   */}
                                            </div>
                                            {/*  end slider item  */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*  end section  */}
                </div>
            ): (
            <p>
                No data available
            </p>
        )}
    </div>
  )
}

export default PropertyDtls
