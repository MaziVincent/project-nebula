import React, { useState } from "react";
import { Swiper, SwiperSlide } from "../../shared/Swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Condomium from "../../assets/images/demo-real-estate-icon-condominium.svg";
import bed from "../../assets/images/demo-real-estate-icon-bed-small.svg";
import bath from "../../assets/images/demo-real-estate-icon-bath-small.svg";
import size from "../../assets/images/demo-real-estate-icon-size-small.svg";
import seven from "../../assets/images/demo-real-estate-07.png";
import eight from "../../assets/images/demo-real-estate-08.png";
import trustpilot from "../../assets/images/demo-real-estate-trustpilot.svg";
import car from "../../assets/images/demo-real-estate-icon-car.svg";
import Apartment from "../../assets/images/demo-real-estate-icon-apartment.svg";
import Estate from "../../assets/images/demo-real-estate-icon-home.svg";
import Office from "../../assets/images/demo-real-estate-icon-office.svg";
import Shop from "../../assets/images/demo-real-estate-icon-shop.svg";
import Villa from "../../assets/images/photos/estate.jpg";
import Bg1 from "../../assets/images/photos/bg1.jpg";
import Bg4 from "../../assets/images/photos/bg4.jpg";
import Image from "../../assets/images/photos/image.jpg";
import Est_Vid from "../../assets/images/photos/estate-vid.jpeg";
import Home from "../../assets/images/photos/home-in-vancouver.jpeg";
import Rev1 from "../../assets/images/photos/download.jpeg";
import baseURL from "../../shared/baseURL";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import PageSkeleton from "./skeletons/PageSkeleton";
import { motion } from "framer-motion";
import megalogo from "../../assets/images/megalogo.svg";
import megaflier from "../../assets/images/megaflier.jpeg";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      // duration: 0.5,
      when: "beforeChildren",
    },
  },
};

const nextVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      // damping: 20,
      duration: 0.5,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    // transition: {
    //     duration: 0.5,
    //     delay: 0.5
    // }
  },
};

const Page = () => {
  const url = `${baseURL}properties`;

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getProperties = async () => {
    const response = await fetch(`${url}?limit=6&status=Available`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["properties", page],
    getProperties,
    {
      keepPreviousData: true,
      staleTime: 10000,
      refetchOnMount: "always",
      onSuccess: () => {
        setTimeout(() => {
          console.log("Fetch successful");
        }, 2000);
      },
    }
  );

  console.log(data);

  return (
    <div className=" mt-10">
      <section className="p-0 top-space-margin">
        <div
          className="swiper full-screen md-h-600px sm-h-500px swiper-number-pagination-style-01" //</section>data-slider-options='{ "slidesPerView": 1, "loop": true, "pagination": { "el": ".swiper-number", "clickable": true }, "navigation": { "nextEl": ".slider-one-slide-next-1", "prevEl": ".slider-one-slide-prev-1" }, "autoplay": { "delay": 4000, "disableOnInteraction": false },  "keyboard": { "enabled": true, "onlyInViewport": true }, "effect": "slide" }' data-number-pagination="1"//
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={30}
            breakpoints={{
              1200: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              320: { slidesPerView: 1 },
            }}
            className="swiper-wrapper"
          >
            <SwiperSlide>
              <div
                className="swiper-slide cover-background"
                style={{ backgroundImage: `url(${Bg1})` }}
              >
                <motion.div
                  className="container h-100"
                  k
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="row align-items-center h-100">
                    <div className="col-md-8 position-relative text-white">
                      <span className="fs-20 d-block mb-15px">
                        Mile 50 road, Abakaliki, EB, 480301
                      </span>
                      <motion.div
                        className="alt-font fs-110 lg-fs-90 lh-90 lg-lh-80 mb-45px sm-mb-25px w-80 xs-w-100 ls-minus-2px"
                        variants={childVariants}
                      >
                        Luxurious <span className="fw-700">mansion</span>
                      </motion.div>
                      <motion.div variants={childVariants}>
                        <a
                          href="#"
                          className="btn btn-white btn-large border-1 btn-round-edge btn-box-shadow me-15px xs-mt-10px xs-mb-10px"
                        >
                          Schedule visit
                        </a>
                        <a
                          href="#"
                          className="btn btn-transparent-white-light border-1 btn-large btn-round-edge fw-500 xs-mt-10px xs-mb-10px"
                        >
                          View details
                        </a>
                      </motion.div>
                    </div>
                  </div>
                  {}
                </motion.div>
                <motion.div
                  className="position-absolute col-xxl-5 col-lg-6 right-0px bottom-0px pt-50px pb-40px ps-40px pe-40px lg-p-35px d-none d-lg-inline-block bg-white border-radius-left-8px"
                  variants={nextVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="row justify-content-center">
                    <div className="col-xl-7 lg-mb-25px">
                      <div className="row">
                        <div className="col text-center border-end border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={bed}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            4 Beds
                          </span>
                        </div>
                        <div className="col text-center border-end border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={bath}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            3 Baths
                          </span>
                        </div>
                        <div className="col text-center border-end lg-border-end-0 border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={car}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            4 Parking
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 ps-35px lg-ps-15px text-center text-xl-start">
                      <span className="fw-500 mb-5px d-block alt-font">
                        For sell price
                      </span>
                      <h4 className="text-gray-900 text-3xl font-bold">
                        {" "}
                        &#8358; 30,99,000
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="swiper-slide cover-background"
                style={{ backgroundImage: `url(${Villa})` }}
              >
                <motion.div
                  className="container h-100"
                  k
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="row align-items-center h-100">
                    <div className="col-md-8 position-relative text-white">
                      <span className="fs-20 d-block mb-15px">
                        Mile 50 road, Abakaliki, EB, 480301
                      </span>
                      <motion.div
                        className="alt-font fs-110 lg-fs-90 lh-90 lg-lh-80 mb-45px sm-mb-25px w-80 xs-w-100 ls-minus-2px"
                        variants={childVariants}
                      >
                        Luxurious <span className="fw-700">mansion</span>
                      </motion.div>
                      <div variants={childVariants}>
                        <a
                          href="#"
                          className="btn btn-white btn-large border-1 btn-round-edge btn-box-shadow me-15px xs-mt-10px xs-mb-10px"
                        >
                          Schedule visit
                        </a>
                        <a
                          href="#"
                          className="btn btn-transparent-white-light border-1 btn-large btn-round-edge fw-500 xs-mt-10px xs-mb-10px"
                        >
                          View details
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="position-absolute col-xxl-5 col-lg-6 right-0px bottom-0px pt-50px pb-40px ps-40px pe-40px lg-p-35px d-none d-lg-inline-block bg-white border-radius-left-8px"
                  variants={nextVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="row justify-content-center">
                    <div className="col-xl-7 lg-mb-25px">
                      <div className="row">
                        <div className="col text-center border-end border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={bed}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            4 Beds
                          </span>
                        </div>
                        <div className="col text-center border-end border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={bath}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            3 Baths
                          </span>
                        </div>
                        <div className="col text-center border-end lg-border-end-0 border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={car}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            4 Parking
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 ps-35px lg-ps-15px text-center text-xl-start">
                      <span className="fw-500 mb-5px d-block alt-font">
                        For sell price
                      </span>
                      <h4 className="text-dark-gray fw-700 alt-font mb-0 ls-minus-1px">
                        {" "}
                        &#8358; 30,99,000
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="swiper-slide cover-background"
                style={{ backgroundImage: `url(${Bg4})` }}
              >
                <motion.div
                  className="container h-100"
                  k
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="row align-items-center h-100">
                    <div className="col-md-8 position-relative text-white">
                      <span className="fs-20 d-block mb-15px">
                        Mile 50 road, Abakaliki, EB, 480301
                      </span>
                      <motion.div
                        className="alt-font fs-110 lg-fs-90 lh-90 lg-lh-80 mb-45px sm-mb-25px w-80 xs-w-100 ls-minus-2px"
                        variants={childVariants}
                      >
                        Luxurious <span className="fw-700">mansion</span>
                      </motion.div>
                      <motion.div variants={childVariants}>
                        <a
                          href="#"
                          className="btn btn-white btn-large border-1 btn-round-edge btn-box-shadow me-15px xs-mt-10px xs-mb-10px"
                        >
                          Schedule visit
                        </a>
                        <a
                          href="#"
                          className="btn btn-transparent-white-light border-1 btn-large btn-round-edge fw-500 xs-mt-10px xs-mb-10px"
                        >
                          View details
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="position-absolute col-xxl-5 col-lg-6 right-0px bottom-0px pt-50px pb-40px ps-40px pe-40px lg-p-35px d-none d-lg-inline-block bg-white border-radius-left-8px"
                  variants={nextVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="row justify-content-center">
                    <div className="col-xl-7 lg-mb-25px">
                      <div className="row">
                        <div className="col text-center border-end border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={bed}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            4 Beds
                          </span>
                        </div>
                        <div className="col text-center border-end border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={bath}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            3 Baths
                          </span>
                        </div>
                        <div className="col text-center border-end lg-border-end-0 border-color-extra-medium-gray">
                          <img
                            className="mb-5px h-50px"
                            src={car}
                            alt=""
                          />
                          <span className="alt-font fs-16 fw-500 d-block">
                            4 Parking
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 ps-35px lg-ps-15px text-center text-xl-start">
                      <span className="fw-500 mb-5px d-block alt-font">
                        For sell price
                      </span>
                      <h4 className="text-dark-gray fw-700 alt-font mb-0 ls-minus-1px">
                        {" "}
                        &#8358; 30,99,000
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="container">
            <div className="row g-0">
              <div className="col-12 position-relative">
                {/* <!-- start slider pagination  */}
                <div className="swiper-pagination left-0 text-start swiper-pagination-clickable swiper-number fs-14 alt-font ls-05px"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Start section */}
      <section>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 md-mb-50px position-relative">
              <figure className="position-relative mb-0 overflow-hidden border-radius-6px">
                <img
                  src={megaflier}
                  alt=""
                  className="w-100"
                />
                {/* <figcaption className="position-absolute border-radius-left-8px bg-base-color right-0px bottom-0px p-45px last-paragraph-no-margin">
                  <i className="feather icon-feather-home icon-medium text-white mb-15px d-block"></i>
                  <h4 className="alt-font fw-700 text-white mb-0 d-block">
                    258,952+
                  </h4>
                  <p className="text-white">Properties listed for sell</p>
                </figcaption> */}
              </figure>
            </div>
            <div className="col-xl-5 offset-xl-1 col-lg-6">
              <span className="fs-20 d-inline-block mb-15px text-base-color">
                MegaTech RealEstate {" "}
              </span>
              <h2
                className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none sm-w-85"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                We help you find your{" "}
                <span className="fw-700 text-highlight">
                  new place.
                  <span className="bg-base-color h-10px bottom-10px opacity-3 separator-animation"></span>
                </span>
              </h2>
              <p className="w-80 md-w-100">
                Online property marketplace to buy, sell, and rent residential
                and commercial properties. Used by millions of renters to find
                property.
              </p>
              <div className="mb-35px">
                {/* start features box item */}
                <div className="icon-with-text-style-08 mb-10px">
                  <div className="feature-box feature-box-left-icon-middle overflow-hidden">
                    <div className="feature-box-icon feature-box-icon-rounded w-40px h-40px bg-base-color-transparent rounded-circle me-15px">
                      <i className="fa-solid fa-check fs-14 text-base-color"></i>
                    </div>
                    <div className="feature-box-content">
                      <span className="text-dark-gray">
                        More than 10 years of experience.
                      </span>
                    </div>
                  </div>
                </div>
                {/*  end features box item */}
                {/*  start features box item */}
                <div className="icon-with-text-style-08">
                  <div className="feature-box feature-box-left-icon-middle overflow-hidden">
                    <div className="feature-box-icon feature-box-icon-rounded w-40px h-40px bg-base-color-transparent rounded-circle me-15px">
                      <i className="fa-solid fa-check fs-14 text-base-color"></i>
                    </div>
                    <div className="feature-box-content">
                      <span className="text-dark-gray">
                        10,000+ people trusting our agency.
                      </span>
                    </div>
                  </div>
                </div>
                {/* end features box item */}
              </div>
              <div className="d-inline-block">
                <Link
                  to="/about"
                  className="btn btn-dark-gray btn-medium btn-round-edge me-25px"
                >
                  About company
                </Link>
                <Link
                  to="/allproperties"
                  className="btn btn-large btn-link btn-hover-animation-switch text-dark-gray p-0"
                >
                  <span>
                    <span className="btn-text">Find property</span>
                    <span className="btn-icon">
                      <i className="feather icon-feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather icon-feather-arrow-right"></i>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* start section  */}
      <section className="p-0 border-top border-color-extra-medium-gray">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-6 row-cols-md-3 row-cols-sm-2 justify-content-center g-0 bg-white">
            {/* start features box item */}
            <div className="col d-flex align-items-center text-center text-lg-start icon-with-text-style-04 border-end md-border-start md-border-bottom sm-border-start-0 xs-border-end-0 border-color-extra-medium-gray position-relative xs-pt-60px xs-pb-60px">
              <span
                className="fs-26 lh-30 d-inline-block alt-font text-dark-gray fw-600 mb-0 w-100 sm-w-85 mx-auto shadow-none"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                What are you{" "}
                <span className="fw-600 text-highlight">
                  looking
                  <span className="bg-base-color h-6px bottom-3px opacity-3 separator-animation"></span>
                </span>{" "}
                for?
              </span>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-04 border-end md-border-bottom sm-border-end-0 border-color-extra-medium-gray position-relative">
              <div className="feature-box pt-45px pb-25px">
                <div className="feature-box-icon mb-10px">
                  <div className="text-uppercase alt-font fw-700 text-base-color fs-12 lh-22 bg-base-color-transparent border-radius-4px position-absolute left-18px top-18px ps-10px pe-10px">
                    20K
                  </div>
                  <Link
                    to="/allproperties"
                    className="d-block"
                  >
                    <img
                      src={Apartment}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="feature-box-content">
                  <Link
                    to="/allproperties"
                    className="alt-font text-dark-gray text-dark-gray-hover fw-700 fs-15 lh-20 text-uppercase"
                  >
                    Apartment
                  </Link>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-04 border-end md-border-bottom xs-border-end-0 border-color-extra-medium-gray position-relative">
              <div className="feature-box pt-45px pb-25px">
                <div className="feature-box-icon mb-10px">
                  <div className="text-uppercase alt-font fw-700 text-base-color fs-12 lh-22 bg-base-color-transparent border-radius-4px position-absolute left-18px top-18px ps-10px pe-10px">
                    18K
                  </div>
                  <Link
                    href="/allproperties"
                    className="d-block"
                  >
                    <img
                      src={Condomium}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="feature-box-content">
                  <Link
                    to="/allproperties"
                    className="alt-font text-dark-gray text-dark-gray-hover fw-700 fs-15 lh-20 text-uppercase"
                  >
                    Land
                  </Link>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-04 border-end md-border-start sm-border-end-0 sm-border-start-0 sm-border-bottom border-color-extra-medium-gray position-relative">
              <div className="feature-box pt-45px pb-25px">
                <div className="feature-box-icon mb-10px">
                  <div className="text-uppercase alt-font fw-700 text-base-color fs-12 lh-22 bg-base-color-transparent border-radius-4px position-absolute left-18px top-18px ps-10px pe-10px">
                    22K
                  </div>
                  <Link
                    href="/allproperties"
                    className="d-block"
                  >
                    <img
                      src={Estate}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="feature-box-content">
                  <Link
                    href="/allproperties"
                    className="alt-font text-dark-gray text-dark-gray-hover fw-700 fs-15 lh-20 text-uppercase"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-04 border-end xs-border-end-0 xs-border-bottom border-color-extra-medium-gray position-relative">
              <div className="feature-box pt-45px pb-25px">
                <div className="feature-box-icon mb-10px">
                  <div className="text-uppercase alt-font fw-700 text-base-color fs-12 lh-22 bg-base-color-transparent border-radius-4px position-absolute left-18px top-18px ps-10px pe-10px">
                    09K
                  </div>
                  <Link
                    to="/allproperties"
                    className="d-block"
                  >
                    <img
                      src={Office}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="feature-box-content">
                  <Link
                    to="/allproperties"
                    className="alt-font text-dark-gray text-dark-gray-hover fw-700 fs-15 lh-20 text-uppercase"
                  >
                    Office
                  </Link>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-04 border-color-extra-medium-gray md-border-end sm-border-end-0 position-relative">
              <div className="feature-box pt-45px pb-25px">
                <div className="feature-box-icon mb-10px">
                  <div className="text-uppercase alt-font fw-700 text-base-color fs-12 lh-22 bg-base-color-transparent border-radius-4px position-absolute left-18px top-18px ps-10px pe-10px">
                    20K
                  </div>
                  <Link
                    to="/allproperties"
                    className="d-block"
                  >
                    <img
                      src={Shop}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="feature-box-content">
                  <Link
                    to="/allproperties"
                    className="alt-font text-dark-gray text-dark-gray-hover fw-700 fs-15 lh-20 text-uppercase"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            </div>
            {/* end features box item */}
          </div>
        </div>
      </section>
      {/* end section */}
      <section className="bg-very-light-gray">
        <div className="container">
          <div className="row align-items-center mb-6 xs-mb-8">
            <div className="col-md-8 text-center text-md-start sm-mb-20px">
              <h3
                className="alt-font text-dark-gray fw-500 mb-0 ls-minus-1px shadow-none"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                Property for{" "}
                <span className="fw-700 text-highlight d-inline-block">
                  sell and rent
                  <span className="bg-base-color h-10px bottom-1px opacity-3 separator-animation"></span>
                </span>
              </h3>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-center justify-content-md-end">
                <Link
                  to="/allproperties"
                  className="fw-600 alt-font text-dark-gray text-dark-gray-hover d-flex align-items-center"
                >
                  View all property
                  <span className="d-flex align-items-center justify-content-center bg-dark-gray h-40px w-40px text-center rounded-circle fs-16 text-white ms-10px">
                    <i className="feather icon-feather-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {isLoading && (
            <div>
              <PageSkeleton />
            </div>
          )}
          {isSuccess && (
            <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 justify-content-center">
              {data?.properties?.length > 0 ? (
                data.properties.map((prop) => (
                  <div
                    key={prop._id}
                    className="col mb-30px"
                  >
                    <div className="border-radius-6px overflow-hidden box-shadow-large">
                      <div className="image position-relative">
                        <span>
                          <img
                            src={prop.imageUrls[1]}
                            alt={prop.title}
                            className="w-[600px] h-[300px]"
                          />
                        </span>
                        <div
                          className={`col-auto ${
                            prop.propertyType === "Sell"
                              ? "bg-base-color"
                              : "bg-yellow-400"
                          } border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-12 lh-24 position-absolute left-20px top-20px`}
                        >
                          {prop.propertyType}
                        </div>
                      </div>
                      <div className="bg-white">
                        <div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
                          <div className="d-flex align-items-center">
                            <a
                              href="/property_details"
                              className="alt-font text-dark-gray fw-700 fs-22 me-10px"
                            >
                              {prop.title}
                            </a>
                          </div>
                          <p className="mb-20px">{prop.location}</p>
                          <div className="row g-0">
                            {prop?.bedrooms && (
                              <div className="col">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={bed}
                                    className="me-5px h-20px"
                                    alt=""
                                  />
                                  <span className="fw-600 alt-font text-dark-gray">
                                    {prop.bedrooms.toString().padStart(2, "0")}
                                  </span>
                                </div>
                                <span className="d-block lh-18 fs-15">
                                  Bedrooms
                                </span>
                              </div>
                            )}
                            {prop?.bathrooms && (
                              <div className="col">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={bath}
                                    className="me-5px h-20px"
                                    alt=""
                                  />
                                  <span className="fw-600 alt-font text-dark-gray">
                                    {prop.bathrooms.toString().padStart(2, "0")}
                                  </span>
                                </div>
                                <span className="d-block lh-18 fs-15">
                                  Bathrooms
                                </span>
                              </div>
                            )}
                            {(prop?.size || prop?.plots) && (
                              <div className="col">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={size}
                                    className="me-5px h-20px"
                                    alt=""
                                  />
                                  <span className="fw-600 alt-font text-dark-gray">
                                    {prop?.plots
                                      ? prop.plots.toString().padStart(2, "0")
                                      : "00"}
                                  </span>
                                </div>
                                <span className="d-block lh-18 fs-15">
                                  {prop?.plots ? "Plots" : ""}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center">
                          <div className="col">
                            <Link
                              to={`/property_details/${prop._id}`}
                              className="btn btn-dark-gray btn-very-small btn-round-edge fw-600"
                            >
                              View details
                            </Link>
                          </div>
                          <div className="col text-end">
                            <span className="text-[19px] blur-[2.5px] alt-font text-dark-gray fw-700 mb-0">
                              &#8358;{prop.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Available Properties</div>
              )}
            </div>
          )}
          {isError && <p>Error Fetching Data</p>}
        </div>
      </section>
      {/* end section */}
      {/* start section  */}
      <section>
        <div className="container">
          <div className="row align-items-center justify-content-center mb-7">
            <div className="col-lg-5 md-mb-50px">
              <span className="fs-20 d-inline-block mb-15px text-base-color">
                Why choose us our service
              </span>
              <h3
                className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                Accurate to 99% of a{" "}
                <span className="fw-700 text-highlight d-inline-block">
                  property's
                  <span className="bg-base-color h-10px bottom-1px opacity-3 separator-animation"></span>
                </span>{" "}
                details.
              </h3>
              <div className="mt-50px mb-50px sm-mt-40px sm-mb-40px">
                {/* start features box item  */}
                <div className="icon-with-text-style-08 mb-30px">
                  <div className="feature-box feature-box-left-icon overflow-hidden">
                    <div className="feature-box-icon">
                      <img
                        src={Image}
                        className="w-80px"
                        alt=""
                      />
                    </div>
                    <div className="feature-box-content last-paragraph-no-margin">
                      <span className="text-dark-gray fs-19 alt-font mb-5px fw-600 d-block">
                        Most appreciated projects
                      </span>
                      <p className="w-80 lg-w-100">
                        Browse millions of properties in your city save your
                        favorites.
                      </p>
                    </div>
                  </div>
                </div>
                {/* end features box item  */}
                {/* start features box item  */}
                <div className="icon-with-text-style-08">
                  <div className="feature-box feature-box-left-icon overflow-hidden">
                    <div className="feature-box-icon">
                      <img
                        src={Image}
                        className="w-80px"
                        alt=""
                      />
                    </div>
                    <div className="feature-box-content last-paragraph-no-margin">
                      <span className="text-dark-gray fs-19 alt-font mb-5px fw-600 d-block">
                        Highest rental income projects
                      </span>
                      <p className="w-80 lg-w-100">
                        Browse millions of properties in your city save your
                        favorites.
                      </p>
                    </div>
                  </div>
                </div>
                {/* end features box item  */}
              </div>
              <div className="d-inline-block">
                <Link
                  to="/about"
                  className="btn btn-dark-gray btn-medium btn-round-edge me-15px xs-mb-10px"
                >
                  about more
                </Link>
                <a
                  href="#"
                  className="btn btn-medium btn-round-edge btn-transparent-light-gray border-1 fw-700 xs-mb-10px"
                >
                  Trusted agents
                </a>
              </div>
            </div>

            <div className="col-lg-6 offset-lg-1 position-relative">
              {/* start popup video  */}
              <figure className="position-relative mb-0 border-radius-6px overflow-hidden">
                <img
                  src={Est_Vid}
                  className="w-100 border-radius-6px"
                  alt=""
                />
                <a
                  href="#"
                  className="absolute-middle-center text-center rounded-circle video-icon-box video-icon-large popup-vimeo"
                >
                  <span>
                    <span className="video-icon bg-white">
                      <i className="fa-solid fa-play text-dark-gray"></i>
                      <span className="video-icon-sonar">
                        <span className="video-icon-sonar-bfr border border-color-white"></span>
                      </span>
                    </span>
                  </span>
                </a>
                <figcaption className="position-absolute text-center border-radius-5px right-25px bottom-25px ps-30px pe-30px blur-box bg-white-transparent">
                  <h1 className="mx-auto mb-0 fw-700 alt-font text-dark-gray mb-5px mt-25px">
                    4.9
                  </h1>
                  <div className="text-base-color fs-19 ls-2px lh-10">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <span className="text-dark-gray text-uppercase fs-13 fw-700 alt-font mb-15px d-inline-block">
                    TrustScore
                  </span>
                </figcaption>
              </figure>
              {/* end popup video  */}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto icon-with-text-style-08">
              <div className="feature-box feature-box-left-icon-middle">
                <div className="feature-box-icon me-10px">
                  <i className="bi bi-pin-map icon-medium text-base-color"></i>
                </div>
                <div className="feature-box-content alt-font text-dark-gray fs-22 fw-600">
                  Our selection of the best places around the{" "}
                  <span className="text-decoration-line-bottom">
                    world and pick yours.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end section  */}
      <section className="overflow-hidden bg-gradient-very-light-gray">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-5 md-mb-50px sm-mb-35px">
              <span className="fs-20 d-inline-block mb-15px text-base-color">
                Find your dream house
              </span>
              <h3
                className="alt-font fw-500 text-dark-gray ls-minus-1px w-90 xl-w-100 shadow-none"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                Ongoing{" "}
                <span className="fw-700 text-highlight d-inline-block">
                  Projects
                  <span className="bg-base-color h-10px bottom-1px opacity-3 separator-animation"></span>
                </span>
              </h3>
              <p className="mb-30px w-90 md-w-100">
                At this time, we are building a number of modern duplexes in
                various parts of Abakaliki city. We are dedicated to creating
                for our clients contemporary, reliable, and affordable
                structures.
              </p>
              <div className="d-flex">
                {/* start slider navigation  */}
                <div className="slider-one-slide-prev-1 swiper-button-prev slider-navigation-style-04 bg-white box-shadow-large">
                  <i className="fa-solid fa-arrow-left icon-small text-dark-gray"></i>
                </div>
                <div className="slider-one-slide-next-1 swiper-button-next slider-navigation-style-04 bg-white box-shadow-large">
                  <i className="fa-solid fa-arrow-right icon-small text-dark-gray"></i>
                </div>
                {/* end slider navigation  */}
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="outside-box-right-20 sm-outside-box-right-0">
                <div
                  className="swiper slider-one-slide"
                  data-slider-options='{ "slidesPerView": 1, "spaceBetween": 30, "loop": true, "pagination": { "el": ".slider-three-slide-pagination", "clickable": true, "dynamicBullets": true }, "navigation": { "nextEl": ".slider-one-slide-next-1", "prevEl": ".slider-one-slide-prev-1" }, "keyboard": { "enabled": true, "onlyInViewport": true }, "breakpoints": { "1200": { "slidesPerView": 3 }, "768": { "slidesPerView": 2 }, "320": { "slidesPerView": 1 } }, "effect": "slide" }'
                >
                  <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    spaceBetween={30}
                    breakpoints={{
                      1200: { slidesPerView: 2 },
                      768: { slidesPerView: 2 },
                      320: { slidesPerView: 1 },
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    className="swiper-wrapper"
                  >
                    {/* start slider item   */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554542/RealEstate/WhatsApp_Image_2024-11-02_at_14.35.21_ba83i1.jpg"
                                className="w-100 h-[50rem] border-radius-6px "
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-orange border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-orange lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Trusted
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                    {/* end slider item  */}
                    {/* start slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554467/RealEstate/WhatsApp_Image_2024-10-30_at_17.16.45_yakulf.jpg"
                                className="w-100 h-[50rem] border-radius-6px"
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-base-color border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-base-color lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Verified
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                    {/* end slider item  */}
                    {/* start slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554466/RealEstate/WhatsApp_Image_2024-10-30_at_17.16.45_2_wcfnkc.jpg"
                                className="w-100 h-[50rem] border-radius-6px"
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-base-color border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-base-color lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Verified
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                    {/* end slider item   */}
                    {/* start slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554466/RealEstate/WhatsApp_Image_2024-10-30_at_17.16.46_1_nrrc98.jpg"
                                className="w-100 h-[50rem] border-radius-6px"
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-base-color border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-base-color lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Verified
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                    {/* start slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554466/RealEstate/WhatsApp_Image_2024-10-30_at_17.16.45_3_fihijm.jpg"
                                className="w-100 h-[50rem] border-radius-6px"
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-base-color border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-base-color lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Verified
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                    {/* <!-- end slider item --> */}
                    {/* start slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554466/RealEstate/WhatsApp_Image_2024-10-30_at_17.16.45_1_zzdjx9.jpg"
                                className="w-100 h-[50rem] border-radius-6px"
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-base-color border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-base-color lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Verified
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                    {/* end slider item   */}
                    <SwiperSlide>
                      <div className="swiper-slide">
                        {/* start interactive banner item  */}
                        <div className="col interactive-banner-style-05">
                          <figure className="m-0 hover-box overflow-hidden position-relative border-radius-6px">
                            <a href="#">
                              <img
                                src="https://res.cloudinary.com/dbxapeqzu/image/upload/v1730554466/RealEstate/WhatsApp_Image_2024-10-30_at_17.16.46_s3cyuk.jpg"
                                className="w-100 h-[50rem] border-radius-6px"
                                alt=""
                              />
                              <div className="position-absolute top-0px left-0px w-100 h-100 bg-gradient-gray-light-dark-transparent"></div>
                              <div className="position-absolute top-25px right-25px bg-base-color border-radius-50px ps-5px pe-15px lh-28">
                                <div className="w-20px h-20px text-center bg-white rounded-circle d-inline-block align-middle text-base-color lh-18">
                                  <i className="fa-solid fa-check fs-10"></i>
                                </div>
                                <span className="d-inline-block align-middle alt-font fw-600 text-white fs-12 text-uppercase">
                                  Verified
                                </span>
                              </div>
                            </a>
                            <figcaption className="d-flex flex-column align-items-start justify-content-center position-absolute left-0px top-0px w-100 h-100 z-index-1 p-50px xl-p-40px sm-p-30px last-paragraph-no-margin">
                              <img
                                src={megalogo}
                                className="mb-auto h-70px"
                                alt=""
                              />
                              <Link
                                to="/allproperties"
                                className="text-white alt-font fw-600 fs-26"
                              >
                                Abakaliki, Ebonyi State.
                              </Link>
                              <span className="opacity-7 text-white">
                                Vision Estate
                              </span>
                              <Link
                                to="/allproperties"
                                className="btn btn-light-base-color btn-small btn-round-edge btn-box-shadow mt-20px"
                              >
                                All properties
                                <i className="feather icon-feather-arrow-right icon-very-small"></i>
                              </Link>
                            </figcaption>
                          </figure>
                        </div>
                        {/* end interactive banner item  */}
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end section   */}
      {/* start section  */}
      <section className="py-0">
        <div className="container">
          <div className="row justify-content-center align-items-center mb-40px md-mb-30px">
            <div className="col text-center">
              <h3
                className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                Recognized for{" "}
                <span className="fw-700 text-highlight d-inline-block">
                  exceeding client
                  <span className="bg-base-color h-10px bottom-1px opacity-3 separator-animation"></span>
                </span>
              </h3>
            </div>
          </div>
          <div className="row g-0 row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center">
            {/* start features box item  */}
            <div className="col icon-with-text-style-10 transition-inner-all md-mb-50px sm-mb-30px">
              <div className="feature-box text-center border-end xs-border-end-0 border-color-extra-medium-gray">
                <div className="feature-box-icon feature-box-icon-rounded w-100px h-100px rounded-circle mb-15px">
                  <i className="bi bi-house-door icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font fw-600 text-dark-gray fs-19 d-inline-block mb-5px">
                    Sell your home
                  </span>
                  <p className="w-80 md-w-70 mx-auto">
                    Contact us today and sell your home.
                  </p>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-10 transition-inner-all md-mb-50px sm-mb-30px">
              <div className="feature-box text-center border-end md-border-end-0 border-color-extra-medium-gray">
                <div className="feature-box-icon feature-box-icon-rounded w-100px h-100px rounded-circle mb-15px">
                  <i className="bi bi-camera icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font fw-600 text-dark-gray fs-19 d-inline-block mb-5px">
                    Free photoshoot
                  </span>
                  <p className="w-80 md-w-70 mx-auto">
                    We capture and showcase accurate images.
                  </p>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-10 transition-inner-all xs-mb-30px">
              <div className="feature-box text-center border-end xs-border-end-0 border-color-extra-medium-gray">
                <div className="feature-box-icon feature-box-icon-rounded w-100px h-100px rounded-circle mb-15px">
                  <i className="bi bi-key icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="alt-font fw-600 text-dark-gray fs-19 d-inline-block mb-5px">
                    Buy a home
                  </span>
                  <p className="w-80 md-w-70 mx-auto">
                    Reach out to us and buy your dream home.
                  </p>
                </div>
              </div>
            </div>
            {/* end features box item  */}
            {/* start features box item  */}
            <div className="col icon-with-text-style-10 transition-inner-all">
              <div className="feature-box text-center">
                <div className="feature-box-icon feature-box-icon-rounded w-100px h-100px rounded-circle mb-15px">
                  <i className="bi bi-gear icon-large text-dark-gray"></i>
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block alt-font fw-600 text-dark-gray fs-19 d-inline-block mb-5px">
                    Free appraisal
                  </span>
                  <p className="w-80 md-w-70 mx-auto">
                    We can give your free and accurate appraisal.
                  </p>
                </div>
              </div>
            </div>
            {/* end features box item  */}
          </div>
          <div className="row justify-content-center mt-6 sm-mt-50px">
            <div className="col-auto icon-with-text-style-08">
              <div className="feature-box feature-box-left-icon-middle">
                <div className="feature-box-icon me-15px">
                  <i className="bi bi-patch-check icon-medium text-base-color"></i>
                </div>
                <div className="feature-box-content alt-font text-dark-gray fs-22 fw-600">
                  We are growing fast! Today MegaTech RealEstate has{" "}
                  <span className="text-decoration-line-bottom">
                    36k+ active residents.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end section  */}
      {/* start section  */}
      <section className="position-relative overflow-hidden">
        <img
          src={seven}
          alt=""
          className="position-absolute left-100px top-50px z-index-minus-1"
          data-bottom-top="transform: translate3d(80px, 0px, 0px);"
          data-top-bottom="transform: translate3d(-180px, 0px, 0px);"
        />
        <img
          src={eight}
          alt=""
          className="position-absolute right-100px top-100px z-index-minus-1"
          data-bottom-top="transform:scale(1.4, 1.4) translate3d(0px, 0px, 0px);"
          data-top-bottom="transform:scale(1, 1) translate3d(-400px, 0px, 0px);"
        />
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 text-end md-mb-50px">
              <figure className="position-relative m-0">
                <img
                  src={Home}
                  className="w-90 border-radius-6px"
                  alt=""
                />
                <figcaption className="position-absolute bg-dark-gray border-radius-10px box-shadow-quadruple-large bottom-100px xs-bottom-minus-20px left-minus-30px md-left-0px w-230px xs-w-210px text-center last-paragraph-no-margin animation-float">
                  <div className="bg-white pt-35px pb-35px border-radius-8px mb-15px position-relative top-minus-1px">
                    <h1 className="fw-700 ls-minus-3px text-dark-gray mb-0 alt-font">
                      4.8
                    </h1>
                    <div className="text-golden-yellow fs-18 ls-1px">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <span className="text-dark-gray d-block alt-font fw-600">
                      2488 Reviews
                    </span>
                    <div className="d-inline-block fs-12 text-uppercase bg-base-color ps-20px pe-20px lh-30 text-white border-radius-100px box-shadow-large">
                      Excellent score
                    </div>
                  </div>
                  <img
                    src={trustpilot}
                    className="h-30px mb-20px"
                    alt=""
                  />
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-10 text-center text-lg-start">
              <span className="fs-20 d-inline-block mb-15px text-base-color">
                Clients feedback
              </span>
              <h2
                className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                Here is what our{" "}
                <span className="fw-700 text-highlight d-inline-block">
                  client's
                  <span className="bg-base-color h-10px bottom-4px opacity-3 separator-animation"></span>
                </span>{" "}
                have to say
              </h2>
              <div
                className="swiper position-relative"
                data-slider-options='{ "autoHeight": true, "loop": true, "allowTouchMove": true, "autoplay": { "delay": 4000, "disableOnInteraction": false }, "navigation": { "nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev" }, "effect": "fade" }'
              >
                <div>
                  <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    spaceBetween={30}
                    breakpoints={{
                      1200: { slidesPerView: 1 },
                      768: { slidesPerView: 1 },
                      320: { slidesPerView: 1 },
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    className="swiper-wrapper mb-40px"
                  >
                    {/* start text slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide review-style-08">
                        <p className="w-80 xl-w-90 lg-w-100">
                          "Mega Real Estate made my home buying experience so
                          easy! They really listened to my needs and found the
                          perfect home for my family. I couldn't be happier with
                          their service."
                        </p>
                        <div className="mt-20px">
                          <img
                            className="rounded-circle w-95px h-95px me-15px"
                            src={Rev1}
                            alt=""
                          />
                          <div className="d-inline-block align-middle text-start">
                            <div className="text-dark-gray alt-font fs-20">
                              <span className="fw-700">Alexander</span> Okoro
                            </div>
                            <div className="review-star-icon fs-18">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* end text slider item  */}
                    {/* start text slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide review-style-08">
                        <p className="w-80 xl-w-90 lg-w-100">
                        "Mega Real Estate made my home buying experience so
                          easy! They really listened to my needs and found the
                          perfect home for my family. I couldn't be happier with
                          their service."
                        </p>
                        <div className="mt-20px">
                          <img
                            className="rounded-circle w-95px h-95px me-15px"
                            src="https://via.placeholder.com/148x148"
                            alt=""
                          />
                          <div className="d-inline-block align-middle text-start">
                            <div className="text-dark-gray alt-font fs-20">
                              <span className="fw-700">Victor</span> Obi
                            </div>
                            <div className="review-star-icon fs-18">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* end text slider item  */}
                    {/* start text slider item  */}
                    <SwiperSlide>
                      <div className="swiper-slide review-style-08">
                        <p className="w-80 xl-w-90 lg-w-100">
                        "Mega Real Estate made my home buying experience so
                          easy! They really listened to my needs and found the
                          perfect home for my family. I couldn't be happier with
                          their service."
                        </p>
                        <div className="mt-20px">
                          <img
                            className="rounded-circle w-95px h-95px me-15px"
                            src="https://via.placeholder.com/148x148"
                            alt=""
                          />
                          <div className="d-inline-block align-middle text-start">
                            <div className="text-dark-gray alt-font fs-20">
                              <span className="fw-700">Frank</span> Okoye
                            </div>
                            <div className="review-star-icon fs-18">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* end text slider item  */}
                  </Swiper>
                </div>
                <div className="d-flex justify-content-center justify-content-lg-start">
                  {/* start slider navigation  */}
                  <div className="slider-one-slide-prev-1 swiper-button-prev slider-navigation-style-04 border border-color-extra-medium-gray">
                    <i className="fa-solid fa-arrow-left icon-small text-dark-gray"></i>
                  </div>
                  <div className="slider-one-slide-next-1 swiper-button-next slider-navigation-style-04 border border-color-extra-medium-gray">
                    <i className="fa-solid fa-arrow-right icon-small text-dark-gray"></i>
                  </div>
                  {/* end slider navigation   */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end section  */}
      {/* start section  */}

      {/* end section  */}
    </div>
  );
};

export default Page;
