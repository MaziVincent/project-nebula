import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  )
}

export default AdminHome
