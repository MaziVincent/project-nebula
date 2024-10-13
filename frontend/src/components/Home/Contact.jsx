import React from 'react'

const Contact = () => {
  return (
    <div>
       {/* start page title  */}
        <section className="cover-background page-title-big-typography ipad-top-space-margin">
            <div className="container">
                <div className="row align-items-center align-items-lg-end justify-content-center extra-very-small-screen g-0">
                    <div className="col-xxl-5 col-xl-6 col-lg-7 position-relative page-title-extra-small md-mb-30px md-mt-auto">
                        <h1 className="text-base-color">Build relationships</h1>
                        <h2 className="alt-font text-dark-gray fw-500 mb-0 ls-minus-1px shadow-none" data-shadow-animation="true" data-animation-delay="700">Have questions? <span className="fw-700 text-highlight d-inline-block">Ready to help!<span className="bg-base-color h-10px bottom-10px opacity-3 separator-animation"></span></span></h2>
                    </div>
                    <div className="col-lg-5 offset-xxl-2 offset-xl-1 border-start border-2 border-color-base-color ps-40px sm-ps-25px md-mb-auto">
                        <span className="d-block w-85 lg-w-100" >Online property marketplace to buy, sell, and rent residential and commercial properties. Used by millions of renters to find property.</span>
                    </div>
                </div>
            </div>
        </section>
        {/* end page title  */}
        {/* start section  */}
        <section className="overflow-hidden p-0">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 position-relative">
                        <img src="https://via.placeholder.com/1920x600" alt="" className="w-100" />
                        <div className="alt-font fw-600 fs-350 lg-fs-275 md-fs-250 sm-fs-200 xs-fs-140 ls-minus-5px xs-ls-minus-2px position-absolute right-minus-50px lg-right-minus-0px bottom-minus-80px md-bottom-minus-60px xs-bottom-minus-40px text-white text-outline text-outline-width-3px" data-bottom-top="transform: translate3d(80px, 0px, 0px);" data-top-bottom="transform: translate3d(-280px, 0px, 0px);">contact</div>
                    </div>
                </div>
            </div>
        </section>
        {/* end section  */}
        {/* start section    */}
        <section className="pt-0">
            <div className="container">
                <div className="row justify-content-center align-items-center" > 
                    <div className="col-lg-6 pt-8 pb-8 text-center text-sm-start"> 
                        <h6 className="alt-font fw-700 text-dark-gray mb-15px">London</h6>
                        <div className="row row-cols-1 row-cols-sm-2 mb-10">
                            <div className="col last-paragraph-no-margin xs-mb-20px">
                                <span className="fs-18 alt-font fw-600 d-block text-dark-gray mb-5px">Crafto - UK</span>
                                <p className="w-80 lg-w-100">401 Broadway, 24th Floor,<br /> Orchard View, London, UK</p>
                            </div>
                            <div className="col">
                                <span className="fs-18 alt-font fw-600 d-block text-dark-gray mb-5px">Get in touch</span>
                                <a href="tel:12345678910">+1 234 567 8910</a><br />
                                <a href="mailto:info@domain.com" className="text-decoration-line-bottom text-dark-gray">info@domain.com</a>
                            </div>
                        </div>
                        <h6 className="alt-font fw-700 text-dark-gray mb-15px">New york</h6>
                        <div className="row row-cols-1 row-cols-sm-2">
                            <div className="col last-paragraph-no-margin xs-mb-20px">
                                <span className="fs-18 alt-font fw-600 d-block text-dark-gray mb-5px">Crafto - USA</span>
                                <p className="w-80 lg-w-100">27 Eden Walk Eden Centre,<br /> Orchard, New York, USA</p>
                            </div>
                            <div className="col">
                                <span className="fs-18 alt-font fw-600 d-block text-dark-gray mb-5px"> Get in touch</span>
                                <a href="tel:12345678910">+1 234 567 8910</a><br />
                                <a href="mailto:info@domain.com" className="text-decoration-line-bottom text-dark-gray">info@domain.com</a>
                            </div>
                        </div>
                    </div> 
                    <div className="col-lg-6 align-self-start contact-form-style-03 position-relative"> 
                        <div className="bg-white box-shadow-double-large p-12 lg-p-9 border-radius-10px">
                            <h3 className="fw-700 alt-font text-dark-gray mb-30px sm-mb-20px">How can help you?</h3>
                            {/* start contact form  */}
                            <form action="email-templates/contact-form.php" method="post">
                                <div className="position-relative form-group mb-20px">
                                    <span className="form-icon text-medium-gray opacity-6"><i className="bi bi-emoji-smile"></i></span>
                                    <input className="ps-0 border-radius-0px bg-transparent border-color-extra-medium-gray form-control required" type="text" name="name" placeholder="Your name*" />
                                </div>
                                <div className="position-relative form-group mb-20px">
                                    <span className="form-icon medium-gray opacity-6"><i className="bi bi-envelope"></i></span>
                                    <input className="ps-0 border-radius-0px bg-transparent border-color-extra-medium-gray form-control required" type="email" name="email" placeholder="Your email address*" />
                                </div>
                                <div className="position-relative form-group mb-20px">
                                    <span className="form-icon text-medium-gray opacity-6"><i className="bi bi-telephone"></i></span>
                                    <input className="ps-0 border-radius-0px bg-transparent border-color-extra-medium-gray form-control" type="tel" name="phone" placeholder="Your phone" />
                                </div>
                                <div className="position-relative form-group form-textarea mt-15px mb-0"> 
                                    <textarea className="ps-0 border-radius-0px bg-transparent border-color-extra-medium-gray form-control" name="comment" placeholder="Your message" rows="3"></textarea>
                                    <span className="form-icon medium-gray opacity-6"><i className="bi bi-chat-square-dots"></i></span>
                                    <input type="hidden" name="redirect" value="" />
                                    <button className="btn btn-medium btn-base-color btn-round-edge mt-35px submit fw-600" type="submit">Send message</button>
                                    <div className="form-results mt-20px d-none"></div>
                                </div>
                            </form>
                            {/* end contact form  */}
                        </div>
                    </div> 
                </div> 
            </div>
        </section>
        {/* end section   */}
        {/* start section  */}
        <section className="bg-very-light-gray p-0">
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-12 p-0">
                        <div id="map" className="map" data-map-options='{ "lat": -37.805688, "lng": 144.962312, "style": "Silver", "marker": { "type": "HTML", "className": "marker02", "color": "#06af47" }, "popup": { "defaultOpen": true, "html": "<div className=infowindow><strong className=\"mb-3 d-inline-block\">Crafto Real Estate</strong><p>16122 Collins street, Melbourne, Australia</p></div><div className=\"google-maps-link\"> <a aria-label=\"View larger map\" target=\"_blank\" jstcache=\"31\" href=\"https://maps.google.com/maps?ll=-37.805688,144.962312&amp;z=17&amp;t=m&amp;hl=en-US&amp;gl=IN&amp;mapclient=embed&amp;cid=13153204942596594449\" jsaction=\"mouseup:placeCard.largerMap\">VIEW LARGER MAP</a></div>" } }'></div>
                    </div>
                </div> 
            </div>
        </section>
        {/* end section    */}
        {/* start section  */}
        <section className="overlap-height half-section">
            <div className="container overlap-gap-section"> 
                <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-content-center" >
                    {/* start features box item  */}
                    <div className="col icon-with-text-style-01 md-mb-40px">
                        <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                            <div className="feature-box-icon me-25px">
                                <img src="https://via.placeholder.com/150x150" className="h-85px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="d-inline-block fs-19 lh-26 alt-font text-dark-gray fw-600 w-75 lg-w-100">Take pride in your work.</span>
                            </div>
                        </div>
                    </div>
                    {/* end features box item  */}
                    {/* start features box item  */}
                    <div className="col icon-with-text-style-01 md-mb-40px">
                        <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                            <div className="feature-box-icon me-25px">
                                <img src="https://via.placeholder.com/150x150" className="h-85px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="d-inline-block fs-19 lh-26 alt-font text-dark-gray fw-600 w-75 lg-w-100">Deliver on your promises.</span>
                            </div>
                        </div>
                    </div>
                    {/* end features box item  */}
                    {/* start features box item  */}
                    <div className="col icon-with-text-style-01 xs-mb-40px">
                        <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                            <div className="feature-box-icon me-25px">
                                <img src="https://via.placeholder.com/150x150" className="h-85px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="d-inline-block fs-19 lh-26 alt-font text-dark-gray fw-600 w-75 lg-w-100">Work with the supreme.</span>
                            </div>
                        </div>
                    </div>
                    {/* end features box item  */}
                    {/* start features box item  */}
                    <div className="col icon-with-text-style-01">
                        <div className="feature-box feature-box-left-icon-middle last-paragraph-no-margin">
                            <div className="feature-box-icon me-25px">
                                <img src="https://via.placeholder.com/150x150" className="h-85px" alt="" />
                            </div>
                            <div className="feature-box-content">
                                <span className="d-inline-block fs-19 lh-26 alt-font text-dark-gray fw-600 w-75 lg-w-100">Transparency in dealings.</span>
                            </div>
                        </div>
                    </div>
                    {/* end features box item  */}
                </div>  
            </div>
        </section>
        {/* end section  */}
    </div>
  )
}

export default Contact
