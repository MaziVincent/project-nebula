import { useEffect, useState } from "react";
import React from "react";
import useFetch from "../src/hooks/useFetch";
// import useAuth from "../../hooks/useAuth";
// import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import baseURL from "../src/shared/baseURL";
//import { CircularProgress, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import Bedrooms from "../src/assets/images/demo-real-estate-icon-bed.svg";
import Bathrooms from "../src/assets/images/demo-real-estate-icon-bath.svg";
//import PropertyDtl from "../../assets/images/demo-real-estate-property-details-09.svg";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShareIcon from "@mui/icons-material/Share";
import { Swiper, SwiperSlide } from "../src/shared/Swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
//import usePageSEO from "../../hooks/usePageSEO";
const PropertyDtls = () => {
  //const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}properties`;
  const {
    id
  } = useParams();
  //const imageUrl = `${baseURL}`;

  //const serverlessUrl = `https://www.megatechrealestate.ng/api/property/${id}`;
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

  // const [showPhone, setShowPhone] = useState(false);
  // const [showEmail, setShowEmail] = useState(false);

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    getProperty();
  }, [id]);
  console.log(property);

  // const toggleShow = (value) => {
  //   if (value == "phone") {
  //     setShowPhone(!showPhone);
  //     setShowEmail(false);
  //   } else if (value == "email") {
  //     setShowPhone(false);
  //     setShowEmail(!showEmail);
  //   }
  // };

  function isWhatsAppLink(url) {
    const regex = /^(https?:\/\/)?(www\.)?(wa\.me\/|api\.whatsapp\.com\/send\?phone=|wa\.link\/)\S+$/;
    return regex.test(url);
  }

  // function formatPhoneNumber(phoneNumber) {
  //   // Ensure the phone number starts with 09
  //   if (!phoneNumber.startsWith("0")) {
  //     return phoneNumber; // Return the original number if it doesn't start with 09
  //   }

  // Remove the leading 0
  //   const cleanedPhoneNumber = phoneNumber.slice(1);

  //   // Add the country code +234
  //   const formattedPhoneNumber = "+234" + cleanedPhoneNumber;

  //   return formattedPhoneNumber;
  // }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this property ",
          url: window.location.href
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser");
    }
  };
  // const ogUrl = `${baseURL}render?url=${encodeURIComponent(window.location.href)}`;
  // usePageSEO({
  //   title: property?.title,
  //   description: property?.description,
  //   keywords: ['property, real estate, megatech, abakaliki, house, apartment, land, sale, rent'],
  //   ogTitle: property?.title,
  //   ogDescription: property?.description,
  //   ogImage: property?.imageUrls[0],
  //   ogUrl: ogUrl
  // });

  //   console.log(property.leaseDuration)
  return /*#__PURE__*/React.createElement("div", {
    className: ""
  }, property ? /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("section", {
    className: "cover-background page-title-big-typography ipad-top-space-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row align-items-center align-items-lg-end justify-content-center extra-very-small-screen g-0"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "34px",
    viewBox: "0 -960 960 960",
    width: "34px",
    className: " text-gray-800",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m297.92-442.12 235.7 235.69L480-153.3 153.3-480 480-806.86l53.62 53.29-235.7 235.69h508.94v75.76H297.92Z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-7 col-lg-8 position-relative page-title-extra-small md-mb-30px md-mt-auto"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "alt-font fw-700 text-dark-gray mb-15px ls-minus-1px uppercase"
  }, property.title), /*#__PURE__*/React.createElement("h1", {
    className: "mb-0 d-flex"
  }, /*#__PURE__*/React.createElement("i", {
    className: "feather icon-feather-map-pin icon-extra-medium text-base-color me-5px"
  }), property.location)), /*#__PURE__*/React.createElement("div", {
    className: "col-lg-3 offset-xl-2 offset-lg-1 border-start ps-40px sm-ps-25px md-mb-auto"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-dark-gray fw-700 alt-font mb-5px text-nowrap "
  }, "\u20A6", parseFloat(property.price.$numberDecimal).toLocaleString("en-US"), " ", "/", property.paymentType ? property.paymentType : "")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-green-600 cursor-pointer",
    onClick: handleShare
  }, /*#__PURE__*/React.createElement(ShareIcon, {
    fontSize: "medium"
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "p-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid p-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row row-cols-1 justify-content-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swiper slider-four-slide swiper-dark-pagination swiper-pagination-style-3",
    "data-slider-options": "{ \"slidesPerView\": 1, \"spaceBetween\": 20, \"loop\": true, \"pagination\": { \"el\": \".slider-four-slide-pagination\", \"clickable\": true }, \"autoplay\": { \"delay\": 3000, \"disableOnInteraction\": false }, \"navigation\": { \"nextEl\": \".slider-one-slide-next-1\", \"prevEl\": \".slider-one-slide-prev-1\" }, \"keyboard\": { \"enabled\": true, \"onlyInViewport\": true }, \"breakpoints\": { \"1200\": { \"slidesPerView\": 3 }, \"992\": { \"slidesPerView\": 3 }, \"768\": { \"slidesPerView\": 2 } }, \"effect\": \"slide\" }"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swiper-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: " grid grid-cols-3 gap-4 "
  }, property.imageUrls.map((imageUrl, index) => /*#__PURE__*/React.createElement("img", {
    key: index,
    src: imageUrl,
    alt: property.title,
    className: " w-[626px] h-[313px] max-md:h-[200px] duration-300 delay-300 ease-in-out  hover:scale-105"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "slider-one-slide-prev-1 icon-very-small bg-white h-40px w-40px swiper-button-prev slider-navigation-style-01"
  }, /*#__PURE__*/React.createElement("i", {
    className: "feather icon-feather-arrow-left fs-20 text-light-gray"
  }))))))), /*#__PURE__*/React.createElement("section", {
    className: "pt-30px pb-30px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row row-cols-1 row-cols-lg-4 row-cols-sm-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col text-center border-end xs-border-end-0 border-color-extra-medium-gray alt-font md-mb-15px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fs-19 text-dark-gray fw-600"
  }, "Property Owner:"), " ", property.owner.firstname, " ", property.owner.lastname), property?.yearBuilt && /*#__PURE__*/React.createElement("div", {
    className: "col text-center border-end md-border-end-0 border-color-extra-medium-gray alt-font md-mb-15px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fs-19 text-dark-gray fw-600"
  }, "Year built:"), " ", property?.yearBuilt ? property.yearBuilt : "N/A"), property?.type === "Apartment" && /*#__PURE__*/React.createElement("div", {
    className: "col text-center border-end xs-border-end-0 border-color-extra-medium-gray alt-font sm-mb-15px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fs-19 text-dark-gray fw-600"
  }, "Accommodation:"), " ", "Furnished"), /*#__PURE__*/React.createElement("div", {
    className: "col text-center alt-font border-end"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fs-19 text-dark-gray fw-600"
  }, "Price:"), " ", "\u20A6", parseFloat(property.price.$numberDecimal).toLocaleString("en-US"), " ", "/", property.paymentType ? property.paymentType : "")))), /*#__PURE__*/React.createElement("section", {
    className: "position-relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-lg-7 md-mb-50px"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row mb-15px"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray fs-24 fw-600 alt-font mb-15px d-block"
  }, "Property description"), /*#__PURE__*/React.createElement("p", null, property.description))), property?.type === "House" || property?.type === "Apartment" && /*#__PURE__*/React.createElement("div", {
    className: "row g-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col bg-very-light-gray p-35px lg-ps-15px lg-pe-15px border-radius-6px fs-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row row-cols-2 row-cols-md-4 row-cols-sm-2"
  }, property?.bedrooms && /*#__PURE__*/React.createElement("div", {
    className: "col text-center border-end border-color-extra-medium-gray sm-mb-30px flex justify-center flex-col items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: Bedrooms,
    className: "w-50px mb-15px",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray d-block lh-20"
  }, property.bedrooms, " Bedrooms")), property?.bathrooms && /*#__PURE__*/React.createElement("div", {
    className: "col text-center border-end sm-border-end-0 border-color-extra-medium-gray sm-mb-30px flex flex-col justify-center items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: Bathrooms,
    className: "w-50px mb-15px",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray d-block lh-20"
  }, property.bathrooms, " Bathrooms"))))), /*#__PURE__*/React.createElement("div", {
    className: "row mt-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray fs-24 fw-600 alt-font mb-25px d-block"
  }, "Specification")), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-08.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Property ID:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property._id.substring(0, 10), "..")), property?.lotSize && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Number of Plots:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.lotSize, " plots")), property?.squareFootage && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-12.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Property size:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.squareFootage, " Sq Ft")), /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-11.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Date Created:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.createdAt.slice(0, 10))), /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-10.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Price:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, "\u20A6", parseFloat(property.price.$numberDecimal).toLocaleString("en-US"), " ", "/", property.paymentType ? property.paymentType : ""))), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-6"
  }, property?.floorArea && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-06.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "floor Area:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.floorArea, " floor")), property?.yearBuilt && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-14.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Year built:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property?.yearBuilt ? property.yearBuilt : "N/A")), property?.stories && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-09.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Total floors:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, "0", property.stories)), property?.ownershipType && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-13.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "OwnerShip:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.ownershipType)), property?.docType && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-13.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Document:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.docType)), property?.plots && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-13.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Plots:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.plots)), property?.shopCategory && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-13.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "shop Category:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.shopCategory)), property?.securityDeposit && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center mb-15px pb-15px border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-13.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Secutity Dep:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, "\u20A6", property.securityDeposit)), property?.leaseDuration && /*#__PURE__*/React.createElement("div", {
    className: "row g-0 align-items-center lg-mb-15px lg-pb-15px lg-border-bottom border-color-extra-medium-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box feature-box-left-icon-middle last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon me-10px"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/demo-real-estate-property-details-13.svg",
    className: "w-25px",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray"
  }, "Lease Duration:")))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, property.leaseDuration, " ", property?.paymentType)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: " grid grid-cols-1"
  }, property?.exteriorFeatures && /*#__PURE__*/React.createElement("div", {
    className: " my-5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "alt-font text-xl uppercase text-gray-900 font-bold mb-2"
  }, "Exterior\xA0\xA0\xA0Features"), /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8"
  }, property.exteriorFeatures.map((feature, index) => /*#__PURE__*/React.createElement("li", {
    key: index,
    className: "w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0 mx-"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ext-ft text-gray-800 flex ",
    dangerouslySetInnerHTML: {
      __html: feature
    }
  }))))), property?.interiorFeatures && /*#__PURE__*/React.createElement("div", {
    className: " mb-5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "alt-font text-xl uppercase text-gray-900 font-bold mb-2"
  }, "Interior\xA0\xA0\xA0Features"), /*#__PURE__*/React.createElement("ul", {
    className: " grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8"
  }, property.interiorFeatures.map((interior, index) => /*#__PURE__*/React.createElement("li", {
    key: index,
    className: " w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ext-ft text-gray-800",
    dangerouslySetInnerHTML: {
      __html: interior
    }
  }))))), property?.kitchenFeatures && /*#__PURE__*/React.createElement("div", {
    className: " mb-5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "alt-font text-xl uppercase text-gray-900 font-bold mb-2"
  }, "Kitchen\xA0\xA0\xA0Features"), /*#__PURE__*/React.createElement("ul", {
    className: " grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8"
  }, property.kitchenFeatures.map((kitchen, index) => /*#__PURE__*/React.createElement("li", {
    key: index,
    className: " w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ext-ft",
    dangerouslySetInnerHTML: {
      __html: kitchen
    }
  }))))), property?.livingRoomFeatures && /*#__PURE__*/React.createElement("div", {
    className: " mb-5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "alt-font text-xl uppercase text-gray-900 font-bold mb-2"
  }, "LivingRoom\xA0\xA0\xA0Features"), /*#__PURE__*/React.createElement("ul", {
    className: " grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8"
  }, property.livingRoomFeatures.map((livingRoom, index) => /*#__PURE__*/React.createElement("li", {
    key: index,
    className: "w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ext-ft",
    dangerouslySetInnerHTML: {
      __html: livingRoom
    }
  }))))), property?.landFeatures && /*#__PURE__*/React.createElement("div", {
    className: " mb-5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "alt-font text-xl uppercase text-gray-900 font-bold mb-2"
  }, "Land\xA0\xA0\xA0Features"), /*#__PURE__*/React.createElement("ul", {
    className: " grid grid-cols-1 md:gridcols2 lg:grid-cols-4 gap-4 max-md:space-x-0 max-md:space-y-8"
  }, property.landFeatures.map((land, index) => /*#__PURE__*/React.createElement("li", {
    key: index,
    className: "w-full text-gray-800 border-b-2 border-gray-400 py-2 px-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ext-ft",
    dangerouslySetInnerHTML: {
      __html: land
    }
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "row mt-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray fs-24 fw-600 alt-font mb-25px d-block"
  }), /*#__PURE__*/React.createElement("img", {
    src: property.imageUrls[0],
    className: "border-radius-6px w-[682px]",
    alt: ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row mt-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray fs-24 fw-600 alt-font mb-25px d-block"
  }), /*#__PURE__*/React.createElement("img", {
    src: property.imageUrls[2],
    className: "border-radius-6px w-[682px]",
    alt: ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row mt-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-dark-gray fs-24 fw-600 alt-font mb-25px d-block"
  }, "Location")), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-4 offset-xl-1 col-lg-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-base-color-light border-radius-6px position-sticky top-120px"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-base-color border-radius-6px feature-box feature-box-left-icon-middle overflow-hidden icon-with-text-style-08 ps-35px pe-35px pt-25px pb-20px xs-p-25px"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-box-icon feature-box-icon-rounded w-90px h-90px overflow-visible me-20px position-relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: property.owner.profile,
    className: "w-full h-full rounded-circle",
    alt: "148x148"
  }), /*#__PURE__*/React.createElement("span", {
    className: `animation-zoom d-inline-block ${property?.owner?.status === "Active" ? "bg-base-color" : "bg-orange"} border-2 border-color-white h-20px w-20px border-radius-100 position-absolute right-0px top-5px`
  })), /*#__PURE__*/React.createElement("div", {
    className: "feature-box-content last-paragraph-no-margin"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white alt-font fw-600 fs-20 d-block"
  }, property.owner.firstname, " ", property.owner.lastname), /*#__PURE__*/React.createElement("div", {
    className: "lh-24 d-block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "me-5px text-white opacity-8"
  }, property?.owner?.properties.length, " property"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-radius-2px text-uppercase alt-font fw-700 text-dark-gray fs-12 lh-24 ps-10px pe-10px d-inline-block align-middle"
  }, property?.owner?.verified ? /*#__PURE__*/React.createElement("span", {
    className: "text-green-400"
  }, " ", /*#__PURE__*/React.createElement(VerifiedIcon, null), " Verified") : /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, " ", /*#__PURE__*/React.createElement(GppMaybeIcon, null), " Not Verfied")))), /*#__PURE__*/React.createElement("div", {
    className: "elements-social social-icon-style-02 mt-5px w-100 text-start text-lg-center gap-3 rounded-xl flex justify-center items-center p-1 "
  }, /*#__PURE__*/React.createElement("ul", {
    className: "medium-icon"
  }, /*#__PURE__*/React.createElement("li", {
    className: "cursor-pointer bg-gray-50 flex justify-center items-center rounded-xl shadow-lg"
    // onClick={() => toggleShow("phone")}
  }, /*#__PURE__*/React.createElement("a", {
    className: "phone text-base-color",
    href: `tel:${property?.owner?.phone}`,
    target: "_blank"
  }, /*#__PURE__*/React.createElement("i", {
    className: "feather icon-feather-phone-call icon-medium text-base-color "
  }))), /*#__PURE__*/React.createElement("li", {
    className: "cursor-pointer bg-gray-50 flex justify-center items-center rounded-xl shadow-lg"
    // onClick={() => toggleShow("email")}
  }, /*#__PURE__*/React.createElement("a", {
    className: "email text-white",
    href: `mailto:${property?.owner?.email}`
  }, " ", /*#__PURE__*/React.createElement("i", {
    className: "feather icon-feather-mail icon-medium text-base-color "
  }))), isWhatsAppLink(property?.owner?.whatsappLink) && /*#__PURE__*/React.createElement("li", {
    className: "cursor-pointer bg-gray-50 flex justify-center items-center rounded-xl shadow-lg"
  }, /*#__PURE__*/React.createElement("a", {
    className: "whatsapp text-white",
    href: property?.owner?.whatsappLink
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-whatsapp icon-medium text-base-color"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "ps-45px pe-45px pt-35px pb-45px xs-p-25px contact-form-style-01 mt-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-20px last-paragraph-no-margin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "alt-font fs-20 fw-600 text-dark-gray d-block mb-25px"
  }, "Leave your message here"), /*#__PURE__*/React.createElement("form", {
    action: "email-templates/contact-form.php",
    method: "post"
  }, /*#__PURE__*/React.createElement("div", {
    className: "position-relative form-group mb-15px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "form-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-emoji-smile"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "name",
    className: "form-control border-color-white box-shadow-large required",
    placeholder: "Your name*"
  })), /*#__PURE__*/React.createElement("div", {
    className: "position-relative form-group mb-15px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "form-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-envelope"
  })), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    className: "form-control border-color-white box-shadow-large required",
    placeholder: "Your email address*"
  })), /*#__PURE__*/React.createElement("div", {
    className: "position-relative form-group mb-15px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "form-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-telephone-outbound"
  })), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    name: "phone",
    className: "form-control border-color-white box-shadow-large",
    placeholder: "Your phone"
  })), /*#__PURE__*/React.createElement("div", {
    className: "position-relative form-group form-textarea"
  }, /*#__PURE__*/React.createElement("span", {
    className: "form-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-chat-square-dots"
  })), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Your message",
    name: "comment",
    className: "form-control border-color-white box-shadow-large",
    rows: "3"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "redirect",
    value: ""
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-small btn-round-edge btn-base-color mt-20px submit ",
    type: "submit"
  }, "Send message"), /*#__PURE__*/React.createElement("div", {
    className: "form-results mt-20px d-none"
  }))))))))), /*#__PURE__*/React.createElement("section", {
    className: "pt-0 pb-30px position-relative overlap-height overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid overlap-gap-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row justify-content-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "alt-font text-dark-gray fw-500 ls-minus-1px shadow-none",
    "data-shadow-animation": "true",
    "data-animation-delay": "700"
  }, "Best review by", " ", /*#__PURE__*/React.createElement("span", {
    className: "fw-700 text-highlight d-inline-block"
  }, "happy customer", /*#__PURE__*/React.createElement("span", {
    className: "bg-base-color h-10px bottom-5px opacity-3 separator-animation"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12 p-0 review-style-09"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swiper slider-shadow-left-right lg-slider-shadow-none lg-ps-15px lg-pe-15px",
    "data-slider-options": "{\"slidesPerView\": 1, \"spaceBetween\": 30, \"loop\": true,  \"autoplay\": { \"delay\": 2000, \"disableOnInteraction\": false },  \"pagination\": { \"el\": \".slider-three-slide-pagination\", \"clickable\": true, \"dynamicBullets\": true }, \"navigation\": { \"nextEl\": \".slider-three-slide-next\", \"prevEl\": \".slider-three-slide-prev\" }, \"keyboard\": { \"enabled\": true, \"onlyInViewport\": true }, \"breakpoints\": { \"1400\": { \"slidesPerView\": 4 }, \"1200\": { \"slidesPerView\": 3 }, \"768\": { \"slidesPerView\": 2 } }, \"effect\": \"slide\" }"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Swiper, {
    className: "swiper-wrapper pt-30px pb-30px",
    modules: [Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    spaceBetween: 30,
    breakpoints: {
      1200: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    },
    pagination: {
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  }, /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/148x148",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Outstanding Service"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Incredible service, very professional, and found my dream home quickly!"), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star-half-stroke"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fw-600 alt-font text-dark-gray d-inline-block"
  }, "Matthew taylor")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/148x148",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Highly professional team"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Smooth process from start to finish\u2014couldn\u2019t have asked for more."), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fs-18 fw-600 alt-font text-dark-gray d-inline-block"
  }, "Herman miller")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/148x148",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Efficient and Transparent"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Knowledgeable agents, honest advice, and always available for my questions."), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star-half-stroke"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fs-18 fw-600 alt-font text-dark-gray d-inline-block"
  }, "Jacob kalling")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/200x200",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Highly Responsive"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Exceptional experience! They handled everything, making it stress-free."), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fs-18 fw-600 alt-font text-dark-gray d-inline-block"
  }, "Alexa harvard")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/200x200",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Seamless Process"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Responsive team with great attention to detail. Highly recommend them!"), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fs-18 fw-600 alt-font text-dark-gray d-inline-block"
  }, "Jhon smith")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/148x148",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Trusted Advisors"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Found exactly what I wanted. Professional and easy to work with."), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star-half-stroke"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fw-600 alt-font text-dark-gray d-inline-block"
  }, "Matthew taylor")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/148x148",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-nowrap"
  }, "Smooth Transaction"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Trustworthy and reliable. They made the buying process super simple"), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fs-18 fw-600 alt-font text-dark-gray d-inline-block"
  }, "Herman miller")))))), /*#__PURE__*/React.createElement(SwiperSlide, null, /*#__PURE__*/React.createElement("div", {
    className: "swiper-slide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-radius-10px bg-white box-shadow-double-large"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center p-40px md-p-25px"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rounded-circle w-110px h-110px md-w-80px md-h-80px me-25px md-me-20px",
    src: "https://via.placeholder.com/148x148",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: " font-bold text-nowrap"
  }, "Friendly and Professional"), /*#__PURE__*/React.createElement("p", {
    className: "mb-10px lh-32"
  }, "Great communication, professional insights, and an enjoyable buying process!"), /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block bg-orange text-white border-radius-3px ps-10px pe-10px fs-13 ls-minus-2px lh-28 me-10px md-me-5px sm-me-10px align-middle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-star-half-stroke"
  })), /*#__PURE__*/React.createElement("span", {
    className: "fs-18 fw-600 alt-font text-dark-gray d-inline-block"
  }, "Jacob kalling")))))))))))))) : /*#__PURE__*/React.createElement("p", null, "No data available"));
};
export default PropertyDtls;
