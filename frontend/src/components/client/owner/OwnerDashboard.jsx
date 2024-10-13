import { useState } from 'react'
import React from 'react'
import OwnerHeader from './OwnerHeader'
import { Outlet } from 'react-router-dom'
import OwnerAside from './OwnerAside'

const OwnerDashboard = () => {
  const [aside, setAside] = React.useState(false)
  return (
    <div className=' bg-green-50'>
      <OwnerHeader setAside={setAside} />
      <OwnerAside aside={aside} setAside={setAside} />
      <main className='p-4 md:ml-48 min-h-max pt-7'>
        <Outlet />
      </main>
      <footer className=' p-4 md:ml-48  mt-10 mb-0 text-green-900'>
        All Rights Reserved © 2024 Real Estate Management System
      </footer>
    </div>
  )
}

export default OwnerDashboard
