import React, { useEffect } from 'react'
import baseURL from '../../../shared/baseURL'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import {set, useForm} from 'react-hook-form'
import axios from 'axios'
import { CircularProgress, Modal } from '@mui/material'
import { useParams } from 'react-router-dom'


const UploadPropertyImage = ({propertyId, openUpload, handleUploadClose}) => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { auth } = useAuth()
    const url = `${baseURL}properties/upload`
    const {id} = useParams()
    const [isLoading, setIsLoading] =useState(false)

    // console.log(propertyId)
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
     // console.log(key)
        formData.append(key.name, key);
      
    }

   

      try {
        const response = await axios.put(`${url}/${propertyId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${auth.accessToken}`
          }
        })
        return response.data
      } catch (error) {
        throw error
      }
      
    }
    const {mutate} = useMutation(uploadImage, {
      onSuccess: () => {
        queryClient.invalidateQueries('property')
        setTimeout(() => {
          toast.success('Image uploaded successfully')
          handleUploadClose()
          setIsLoading(false)
        }, 1000)
        
      },
      onError: (error) => {
        setError(error.response?.data?.error || error.message)
      }
    })
    const onSubmit = (data) => {
      console.log(data)
      mutate(data)
    }
  return (
    <Modal
    open={openUpload}
    onClose={handleUploadClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <div 
       id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-3/6 right-1/4 z-50 justify-center items-center w-2/4  h-modal md:h-full"
      >
        <div className=" bg-gray-100 mt-24 p-10 rounded">
          <div className=" flex justify-between items-start">
            <h5 className="pb-2" id="">
                Upload Property Image
            </h5>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleUploadClose}
            ></button>
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              method="post"
          >
              <div className="mb-3">
                  <label htmlFor="image" className="">
                      Image
                  </label>
                  <input
                      type="file"
                      className=""
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
                      onClick={handleUploadClose}
                  >
                      Close
                  </button>
                  <button type="submit" className="bg-blue-600 px-6 py-1 rounded-lg text-white">
                      {isLoading ? <CircularProgress color='white' /> : 'Upload'}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>

  )
}

export default UploadPropertyImage
