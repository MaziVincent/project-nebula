import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const createApartment = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const url = "http://localhost:3500/apartment"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const handleFileUpload = async (e) => {
    setImage(e.target.files[0]);
  }
  const createApartment = async (data) => {
    setLoading(true)
    setError(null)
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', data.title);
    formData.append('subTitle', data.subTitle);
    formData.append('content', data.content);
    formData.append('author', auth.user?._id);
    try{
      const res = await axios.post(url, formData,)
      console.log(res.data);
      // setTimeout(() => {
      //   navigate('/admin_dashboard/blogs')
      // }, 5000);
    }catch(err){
      setError(err.response?.data?.error || err.message)
    }
    setLoading(false)
    console.log(data)
    console.log(formData)
  }
  return (
    <div className=' m-auto w-96'>
      <h1 className=' text-2xl font-bold text-gray-600 mt-5'>Create Blog</h1>
      <form 
        className=' flex flex-col gap-3 pt-10' 
        onSubmit={handleSubmit(createApartment)} 
        method='post'
        encType='multipart/form-data'
        >
        <input 
         className='border border-gray-500 text-gray-700 font-medium focus:outline-gray-300 rounded-md px-2 py-2'
         type="file"
         name="image"
         id="image"
         title='image'
         onChange={handleFileUpload} 
        />
        <input 
          className=' border border-gray-500 text-gray-700 font-medium focus:outline-gray-300 rounded-md px-2 py-2'
          {...register("title", {required : true})}
          type="text"
          placeholder='Title' 
        />
        {errors.title && <span className=' text-red-500'>This field is required</span>}
        <input 
          className=' border border-gray-500 text-gray-700 font-medium focus:outline-gray-300 rounded-md px-2 py-2' 
          {...register("subTitle", {required : true})}
          type="text"
          placeholder='subTitle' 
        />
        {errors.subTitle && <span className=' text-red-500'>This field is required</span>}
        <textarea 
          className=' border border-gray-500 text-gray-700 font-medium focus:outline-gray-300 rounded-md px-2 py-2' 
          {...register("content", {required : true})}  
          cols="5" rows="2" 
          placeholder='Content'>
        </textarea>
        {errors.content && <span className=' text-red-500'>This field is required</span>}
        <input 
          className=' border border-gray-500 text-gray-700 font-medium focus:outline-gray-300 rounded-md px-2 py-2' 
          value={auth?.user?._id}
          {...register("author")}
          type="hidden" 
        />
        <button 
          className='bg-green-500 py-2 font-semibold text-gray-100 rounded-md' 
          type="submit"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {loading && <p className='text-gray-500 mt-4'>Processing...</p>}
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default createApartment

// const convertToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader()
//     fileReader.readAsDataURL(file)
//     fileReader.onload = () => {
//       resolve(fileReader.result)
//     }
//     fileReader.onerror = (error) => {
//       reject(error)
//     }
//   })
// }