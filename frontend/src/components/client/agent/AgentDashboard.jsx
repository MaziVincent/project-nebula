import React, { useState } from 'react'
import AgentHeader from './AgentHeader'
import AgentAside from './AgentAside'
import { Outlet } from 'react-router-dom'

const AgentDashboard = () => {
  const [aside, setAside] = useState(false);

  return (
    <div className=' bg-green-50'>
      <AgentHeader setAside={setAside} />
      <AgentAside aside={aside} setAside={setAside} />
      <main className='p-4 md:ml-48 min-h-max pt-7'>
        <Outlet />
      </main>
      <footer className=' p-4 md:ml-48  mt-10 mb-0 text-green-900'>
        All rights reserved &copy;2024 Real Estate Management System
      </footer>
    </div>
  )
}

export default AgentDashboard
