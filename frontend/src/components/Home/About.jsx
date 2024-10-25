import React from 'react'
import {Swiper, SwiperSlide} from '../../shared/Swiper'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import AboutImg from '../../assets/images/photos/about.jpeg'
import AboutImg2 from '../../assets/images/photos/estate-vid.jpeg'
import ServiceImg from '../../assets/images/photos/service.jpg'
import FriendlyPic from '../../assets/images/photos/friendly3.jpg'
import TrustPic from '../../assets/images/photos/OIP.jpg' 
import LegalPic from '../../assets/images/photos/legal.jpg'
import RevPic from '../../assets/images/photos/review.jpg'
import Rev1 from '../../assets/images/photos/download.jpeg'
import seven from '../../assets/images/demo-real-estate-07.png'
import eight from '../../assets/images/demo-real-estate-08.png'
import trustpilot from '../../assets/images/demo-real-estate-trustpilot.svg'
import logo1 from '../../assets/images/demo-real-estate-logo-01.svg'
import logo2 from '../../assets/images/demo-real-estate-logo-02.svg'
import logo3 from '../../assets/images/demo-real-estate-logo-03.svg'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";

const About = () => {
  return (
    <div>
        {/* start page title   */}
        <section className="cover-background page-title-big-typography ipad-top-space-margin">
            <div className="container">
                <div className="row align-items-center align-items-lg-end justify-content-center extra-very-small-screen g-0">
                    <div className="col-xxl-5 col-xl-6 col-lg-7 position-relative page-title-extra-small md-mb-30px md-mt-auto" >
                        <h1 className="text-base-color">About mega real estate</h1>
                        <h2 className="alt-font text-dark-gray fw-500 mb-0 ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">Welcome to Mega <span className="fw-700 text-highlight d-inline-block">real estate<span className="bg-base-color h-10px bottom-3px opacity-3 separator-animation"></span></span> business.</h2>
                    </div>
                    <div className="col-lg-5 offset-xxl-2 offset-xl-1 border-start border-2 border-color-base-color ps-40px sm-ps-25px md-mb-auto">
                        <span className="d-block w-85 lg-w-100">
                        We are a dedicated team of real estate professionals committed to 
                        helping you find your dream home or ideal investment property. 
                        </span>
                    </div>
                </div>
            </div>
        </section>
          {/* end page title   */}
          {/* start section   */}
        <section className="overflow-hidden p-0">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 position-relative">
                        <img src={AboutImg} alt="Logo" className="w-100" />
                        <div className="alt-font fw-600 fs-350 lg-fs-275 md-fs-250 xs-fs-160 ls-minus-5px xs-ls-minus-2px position-absolute right-minus-50px lg-right-0px bottom-minus-80px md-bottom-minus-60px xs-bottom-minus-40px text-white text-outline text-outline-width-3px" data-bottom-top="transform: translate3d(80px, 0px, 0px);" data-top-bottom="transform: translate3d(-280px, 0px, 0px);">about</div>
                    </div>
                </div>
            </div>
        </section>
          {/* end section   */}
          {/* start section   */}
        <section className="pb-0"> 
            <div className="container">
                <div className="row align-items-center">  
                    <div className="col-lg-6 order-2 order-lg-1 position-relative align-self-end" > 
                        <figure className="position-relative m-0">
                            <img src={AboutImg2} className="w-100" alt="card" />
                            <figcaption className="w-180px bg-white p-30px pt-20px border-radius-8px position-absolute top-150px right-minus-30px lg-right-0px overflow-hidden box-shadow-medium animation-float"> 
                                <span className="alt-font fs-100 fw-700 text-white d-block position-relative z-index-1">15</span>
                                <div className="alt-font fw-500 fs-24 d-block text-dark-gray lh-26 ls-minus-05px">Years of <span className="fw-700">experience.</span></div>
                                <div className="h-150px w-150px border-radius-100 bg-base-color position-absolute left-minus-10px top-minus-50px z-index-0"></div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="col-xl-5 offset-xl-1 col-lg-6 mb-8 order-1 order-lg-2 md-mb-40px" > 
                        <span className="fs-20 d-inline-block mb-15px text-base-color">Mega property marketplace</span> 
                        <h2 className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">We help you find your <span className="fw-700 text-highlight d-inline-block">new place.<span className="bg-base-color h-10px bottom-10px opacity-3 separator-animation"></span></span></h2> 
                        <p className="w-80 lg-w-100">
                        Making the process of buying, selling, or renting properties as seamless and 
                        stress-free as possible. We believe in providing exceptional customer service, 
                        complete transparency, and expert guidance every step of the way.</p>
                        <div className="pt-20px pb-20px ps-30px pe-30px xs-p-20px border border-color-extra-medium-gray border-radius-6px mb-15px icon-with-text-style-08 w-80 lg-w-100">
                            <div className="feature-box feature-box-left-icon-middle">
                                <div className="feature-box-icon me-10px">
                                    <i className="bi bi-people icon-very-medium text-base-color"></i>
                                </div>
                                <div className="feature-box-content">
                                    <span className="alt-font fw-600 text-dark-gray d-block fs-18 lh-26">10,000+ people trust us.</span>
                                </div>
                            </div>
                        </div>
                        <p className="fs-13 mb-35px xs-lh-20">Our selection of the best <span className="text-dark-gray text-decoration-line-bottom">places around</span> the world and pick yours.</p>
                        <a href="#" className="btn btn-dark-gray btn-medium btn-round-edge me-25px">Trusted agents</a> 
                        <Link to="/sell" className="btn btn-large btn-link btn-hover-animation-switch text-dark-gray p-0">
                            <span>
                                <span className="btn-text">Find property</span>
                                <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                                <span className="btn-icon"><i className="feather icon-feather-arrow-right"></i></span>
                            </span> 
                        </Link>
                    </div>
                </div>
            </div>
        </section>
         {/* end section */}
         <section className="bg-gradient-very-light-gray">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12 text-center" >
                        <h3 className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">Giving quality with <span className="fw-700 text-highlight d-inline-block">property<span className="bg-base-color h-10px bottom-5px opacity-3 separator-animation"></span></span></h3>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center mb-5 xs-mb-8" >
                      {/* start features box item   */}
                    <div className="col icon-with-text-style-07 transition-inner-all md-mb-30px">
                        <div className="bg-white feature-box box-shadow-quadruple-large box-shadow-quadruple-large-hover text-center p-16 lg-p-14 border-radius-10px last-paragraph-no-margin">
                            <div className="feature-box-icon mb-20px"> 
                                <img src={ServiceImg} className="h-80px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="alt-font fw-600 text-dark-gray fs-20 d-inline-block mb-5px">Best services</span>
                                <p className="">We strive to exceed expectations in every transaction, 
                                    from finding the perfect property to finalizing deals.</p>
                            </div>                        
                        </div>
                    </div>
                    {/*   end features box item  */}
                    {/*   start features box item   */}
                    <div className="col icon-with-text-style-07 transition-inner-all md-mb-30px">
                        <div className="bg-white feature-box box-shadow-quadruple-large box-shadow-quadruple-large-hover text-center p-16 lg-p-14 border-radius-10px last-paragraph-no-margin">
                            <div className="feature-box-icon mb-20px"> 
                                <img src={FriendlyPic} className="h-80px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="alt-font fw-600 text-dark-gray fs-20 d-inline-block mb-5px">User friendly</span>
                                <p>We put our clients' needs at the heart of everything we do, ensuring their satisfaction is our priority.</p>
                            </div>                        
                        </div>
                    </div>
                      {/* end features box item   */}
                     {/* start features box item   */}
                    <div className="col icon-with-text-style-07 transition-inner-all xs-mb-30px">
                        <div className="bg-white feature-box box-shadow-quadruple-large box-shadow-quadruple-large-hover text-center p-16 lg-p-14 border-radius-10px last-paragraph-no-margin">
                            <div className="feature-box-icon mb-20px"> 
                                <img src={TrustPic} className="h-80px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="alt-font fw-600 text-dark-gray fs-20 d-inline-block mb-5px">Trusted property</span>
                                <p>We believe in being honest and upfront with our clients, ensuring trust is built from the first interaction.</p>
                            </div>                        
                        </div>
                    </div>
                      {/* end features box item   */}
                      {/* start features box item   */}
                    <div className="col icon-with-text-style-07 transition-inner-all">
                        <div className="bg-white feature-box box-shadow-quadruple-large box-shadow-quadruple-large-hover text-center p-16 lg-p-14 border-radius-10px last-paragraph-no-margin">
                            <div className="feature-box-icon mb-20px"> 
                                <img src={LegalPic} className="h-80px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="alt-font fw-600 text-dark-gray fs-20 d-inline-block mb-5px">Legal advisor</span>
                                <p> We have a strong legal backing to ensure everything is handled legally and transparently.</p>
                            </div>                        
                        </div>
                    </div>
                      {/* end features box item   */}
                </div>
                <div className="row justify-content-center" >
                    <div className="col-auto icon-with-text-style-08">
                        <div className="feature-box feature-box-left-icon-middle">
                            <div className="feature-box-icon me-10px">
                                <i className="bi bi-patch-check icon-medium text-base-color"></i>
                            </div>
                            <div className="feature-box-content alt-font text-dark-gray fs-22 fw-600">
                                We are growing fast! Today Mega Real Estate has <span className="text-decoration-line-bottom">36k+ active residents.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          {/* end section   */}
          {/* start section   */}
        <section className="position-relative overflow-hidden pt-0">
            <img src={seven} alt="" className="position-absolute left-100px top-50px z-index-minus-1" data-bottom-top="transform: translate3d(80px, 0px, 0px);" data-top-bottom="transform: translate3d(-180px, 0px, 0px);" />
            <img src={eight} alt="" className="position-absolute right-100px top-100px z-index-minus-1" data-bottom-top="transform:scale(1.4, 1.4) translate3d(0px, 0px, 0px);" data-top-bottom="transform:scale(1, 1) translate3d(-400px, 0px, 0px);" />
            <div className="container">  
                <div className="row align-items-center justify-content-center">  
                    <div className="col-lg-6 text-end md-mb-50px" > 
                        <figure className="position-relative m-0">
                            <img src={RevPic} className="w-90 border-radius-6px" alt="" />
                            <figcaption className="position-absolute bg-dark-gray border-radius-10px box-shadow-quadruple-large bottom-100px xs-bottom-minus-20px left-minus-30px md-left-0px w-230px xs-w-210px text-center last-paragraph-no-margin animation-float">
                                <div className="bg-white pt-35px pb-35px border-radius-8px mb-15px position-relative top-minus-1px">
                                    <h1 className="fw-700 ls-minus-3px text-dark-gray mb-0 alt-font">4.8</h1>
                                    <div className="text-golden-yellow fs-18 ls-1px">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill bg-gray-300"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                    </div>
                                    <span className="text-dark-gray d-block alt-font fw-600">2488 Reviews</span>
                                    <div className="d-inline-block fs-12 text-uppercase bg-base-color ps-20px pe-20px lh-30 text-white border-radius-100px box-shadow-large">Excellent score</div>
                                </div>
                                <img src={trustpilot} className="h-30px mb-20px" alt="" />
                            </figcaption>
                        </figure>
                    </div>
                    <div className="col-lg-5 offset-lg-1 col-md-10 text-center text-lg-start" >
                        <span className="fs-20 d-inline-block mb-15px text-base-color">Clients feedback</span>
                        <h2 className="alt-font fw-500 text-dark-gray ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">Here is what our <span className="fw-700 text-highlight d-inline-block">client's<span className="bg-base-color h-10px bottom-10px opacity-3 separator-animation"></span></span> have to say</h2>
                        <div className="swiper position-relative" data-slider-options='{ "autoHeight": true, "loop": true, "allowTouchMove": true, "autoplay": { "delay": 4000, "disableOnInteraction": false }, "navigation": { "nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev" }, "effect": "fade" }'>
                            <div >
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
                                        "Mega Real Estate made my home buying experience so easy! They really listened to my needs and found the perfect home for my family. I couldn't be happier with their service."</p>
                                        <div className="mt-20px">
                                            <img className="rounded-circle w-95px h-95px me-15px" src={Rev1} alt="" />
                                            <div className="d-inline-block align-middle text-start">
                                                <div className="text-dark-gray alt-font fs-20"><span className="fw-700">Alexander</span> Okoro</div>
                                                <div className="review-star-icon fs-18">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                                </div> 
                                            </div>
                                        </div> 
                                    </div>
                                    </SwiperSlide>
                                    {/* end text slider item  */}
                                    {/* start text slider item  */}
                                    <SwiperSlide>
                                    <div className="swiper-slide review-style-08">
                                        <p className="w-80 xl-w-90 lg-w-100">I've purchased several themes over the years and this theme, by far is absolutely amazing. It's built extremely well the back end was well thought out the design options are endless.</p>
                                        <div className="mt-20px">
                                            <img className="rounded-circle w-95px h-95px me-15px" src="https://via.placeholder.com/148x148" alt="" />
                                            <div className="d-inline-block align-middle text-start">
                                                <div className="text-dark-gray alt-font fs-20"><span className="fw-700">Shoko</span> mugikura</div>
                                                <div className="review-star-icon fs-18">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                                </div> 
                                            </div>
                                        </div> 
                                    </div>
                                    </SwiperSlide>
                                    {/* end text slider item  */}
                                    {/* start text slider item  */}
                                    <SwiperSlide>
                                    <div className="swiper-slide review-style-08">
                                        <p className="w-80 xl-w-90 lg-w-100">The theme is very valid and offers many possibilities of customization to adapt it to your needs, but the thing I got the most out of it was the relationship with the support team.</p>
                                        <div className="mt-20px">
                                            <img className="rounded-circle w-95px h-95px me-15px" src="https://via.placeholder.com/148x148" alt="" />
                                            <div className="d-inline-block align-middle text-start">
                                                <div className="text-dark-gray alt-font fs-20"><span className="fw-700">Leonel</span> mooney</div>
                                                <div className="review-star-icon fs-18">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                                </div> 
                                            </div>
                                        </div> 
                                    </div>
                                    </SwiperSlide>
                                    {/* end text slider item  */}
                                </Swiper>
                            </div>
                            <div className="d-flex justify-content-center justify-content-lg-start">
                                  {/* start slider navigation   */}
                                <div className="slider-one-slide-prev-1 swiper-button-prev slider-navigation-style-04 border border-color-extra-medium-gray"><i className="fa-solid fa-arrow-left icon-small text-dark-gray"></i></div>
                                <div className="slider-one-slide-next-1 swiper-button-next slider-navigation-style-04 border border-color-extra-medium-gray"><i className="fa-solid fa-arrow-right icon-small text-dark-gray"></i></div>
                                  {/* end slider navigation    */}
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </section>
          {/* end section       */}
          {/* start section   */}
        <section className="pt-0 pb-30px sm-pb-50px overlap-height">
            <div className="container overlap-gap-section">
                <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 justify-content-center align-items-center">
                <Marquee>
                <div className="col md-mb-30px mr-8">
                        <div className="bg-white border-radius-6px text-center box-shadow-quadruple-large">
                            <div className="pt-10 pb-10">
                                <img src={logo1} className="h-40px" alt="" />
                            </div>
                            <div className="border-top border-1 border-color-extra-medium-gray p-15px last-paragraph-no-margin">
                                <div className="alt-font mx-auto lh-28">Property sell listed - <span className="fw-700 text-dark-gray">275% Growth</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col md-mb-30px mr-8">
                        <div className="bg-white border-radius-6px text-center box-shadow-quadruple-large">
                            <div className="pt-10 pb-10">
                                <img src={logo2} className="h-40px" alt="" />
                            </div>
                            <div className="border-top border-1 border-color-extra-medium-gray p-15px last-paragraph-no-margin">
                                <div className="alt-font mx-auto lh-28">Property selling - <span className="fw-700 text-dark-gray">235% Growth</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col md-mb-30px mr-8">
                        <div className="bg-white border-radius-6px text-center box-shadow-quadruple-large">
                            <div className="pt-10 pb-10">
                                <img src={logo3} className="h-40px" alt="" />
                            </div>
                            <div className="border-top border-1 border-color-extra-medium-gray p-15px last-paragraph-no-margin">
                                <div className="alt-font mx-auto lh-28">Property agents - <span className="fw-700 text-dark-gray">175% Growth</span></div>
                            </div>
                        </div>
                    </div>
                </Marquee>
                </div>
                <div className="row justify-content-center align-items-center mt-5 md-mt-7" >
                    <div className="col-12 text-center align-items-center">
                        <div className="bg-dark-gray alt-font fs-12 fw-700 text-white text-uppercase border-radius-30px ps-20px pe-20px me-10px sm-m-5px d-inline-block align-middle">Fun facts</div>
                        <div className="fs-20 text-dark-gray d-block d-md-inline-block align-middle alt-font fw-600">World's famous ratings companies we worked with us.</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About
