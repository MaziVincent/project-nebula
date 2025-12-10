
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import {set, useForm} from 'react-hook-form'
import axios from 'axios'
import { CircularProgress, Modal } from '@mui/material'


const UploadDocument = ({id, openDocUpload, handleDocUploadClose, url}) => {
    const [error, setError] = useState('')
    const queryClient = useQueryClient()
    const { auth } = useAuth()
    const [isLoading, setIsLoading] =useState(false)

    // const propertyId = id
    const { 
      register, 
      handleSubmit,
      setValue,
      formState: { errors } 
    } = useForm()

    const uploadImage = async (data) => {
    setIsLoading(true)
    const files = data.files
    const formData = new FormData()
    for (const key of files) {
        formData.append(key.name, key);
      
    }

      try {
        const response = await axios.put(`${url}/docupload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${auth.accessToken}`
          }
        })
        return response.data
      } catch (error) {
      }
      
    }
    const {mutate} = useMutation(uploadImage, {
      onSuccess: () => {
        queryClient.invalidateQueries('property')
        setTimeout(() => {
          toast.success('Image uploaded successfully')
          handleDocUploadClose()
          setIsLoading(false)
        }, 1000)
        
      },
      onError: (error) => {
        setError(error.response?.data?.error || error.message)
        setIsLoading(false)
      }
    })
    const onSubmit = (data) => {
      mutate(data)
    }
  return (
    <Modal
    open={openDocUpload}
    onClose={handleDocUploadClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <div 
       id="defaultModal"
        className="overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <div className=" flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-svh">
          <div className=" relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-10">
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-scr'>
              <h5 className="pb-2" id="">
                  Upload Document
              </h5>
              <button
                type="button"
                onClick={() => {handleDocUploadClose()}}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center absolute border border-gray-800 right-3 top-0"
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
              <div className="">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                  method="post"
                  className=' mx-auto'
              >
                  <div className="mb-3">
                      <label htmlFor="image" className="">
                          Document Image
                      </label>
                      <input
                          type="file"
                          className=" outline-gray-100"
                          id="files"
                          name="files"
                          accept='image/*'
                          multiple
                          {...register('files', { required: true })}
                      />
                      {errors.files && (
                          <div className="text-red-600">
                              Image is required
                          </div>
                      )}
                  </div>
                  <div className=" mt-4 flex justify-end gap-2">
                      <button
                          type="button"
                          className=" bg-gray-300 px-6 py-1 rounded-lg"
                          data-bs-dismiss="modal"
                          onClick={handleDocUploadClose}
                      >
                          Close
                      </button>
                      <button type="submit" className="bg-blue-600 px-6 py-1 rounded-lg text-white inline-flex items-center justify-center">
                          {isLoading ? <CircularProgress color='white' size={24} /> : 'Upload'}
                      </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

  )
}

export default UploadDocument
