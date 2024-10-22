import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useEffect } from 'react'
import axios from 'axios'
import baseURL from '../../shared/baseURL'

const Home = () => {

  useEffect(() => {
    const ping = async () => {
     const res = await axios.get(`${baseURL}ping`)
     console.log(res.data)
    }

    ping();
  },[])
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
  </div>
  )
}

export default Home
