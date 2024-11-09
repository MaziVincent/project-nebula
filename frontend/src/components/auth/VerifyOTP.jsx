
import React, { useState, useRef, useEffect } from "react";
import { CircularProgress, Modal } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "react-query";
import baseUrl from "../../shared/baseURL";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usePost from "../../hooks/usePost";

const VerifyOTP = ({ otpLength = 4,  }) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [codeError, setCodeError] = useState("")
  const [resend, setResend] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputsRef = useRef([]);
  const post = usePost();
  const {
    verifyOTP,
    setVerifyOTP,
    code,
    setCode,
    setChangePassword
  } = useAuth();


  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input
      if (value && index < otpLength - 1) {
        inputsRef.current[index + 1].focus();
      }

      // If backspace is pressed and input is empty, focus on previous input
      if (value === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const pin = otp.join("");

    if(pin === code.pin){
      setChangePassword(true)
      setVerifyOTP(false)
      setIsLoading(false)
    }

    setIsLoading(false)
  
  };



  useEffect(()=> {
    setTimeout(()=>{
      setResend(true)
    }, 60000)
  },[])

  const resendOtp = async () => {

    try{

    const formData = new FormData()
    formData.append("email", code.email)
    const response = await post(`${baseUrl}email/pin`, formData ," ")
   // console.log(response)

      if(response.status == 200 || response.data.status == "200"){
        setCode((prev)=> {
          return {...prev, code: response.data?.pin}
        })
         
      }else{
        setCodeError("Error Sending OTP");
        
      }

    }catch(error){

      console.error(error)
      setCodeError("Error Sending  OTP");
    }

  };


  return (
    <Modal
      open={verifyOTP}
      onClose={() => {
        setVerifyOTP(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-14 md:top-0  z-50 justify-center items-center  w-full  h-auto "
      >
        <ToastContainer />
        <div className="relative p-4 w-full h-auto  ">
          <section className=" h-screen flex justify-center items-center ">
            <div className="flex flex-col items-center bg-white text-gray-700 w-3/4 md:w-2/4 pb-4 rounded-xl">
              <div className="flex justify-end items-center p-4 w-full ">
                <button
                  type="button"
                  onClick={() => {
                    setVerifyOTP(false);
                  }}
                  className="text-gray-700 bg-transparent hover:bg-gray-800 hover:text-gray-900 rounded-full border-2 border-gray text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Verify Email </h2>
              <p className="text-darkHover dark:text-gray">Please Enter the code sent to your Email Address </p>
              <div className="flex justify-center items-center space-x-2 m-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-10 h-12 text-xl text-center border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-background bg-gray-100 text-gray-900"
                  />
                ))}
              </div>
              { codeError && <p className="text-redborder text-sm"> {`${codeError}, `}</p> }
             
              {
                resend && <p className="text-gray-800 dark:text-primary pb-6"> You no see the code ? <button onClick={() => resendOtp(regData.PhoneNumber)} className="text-background">Oya Resend am!</button> </p>
              }
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white dark:text-accent font-semibold rounded-lg shadow hover:bg-background transition duration-200"
              > {
                isLoading ? <CircularProgress /> : 'Proceed '
              }
                
              </button>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyOTP;
