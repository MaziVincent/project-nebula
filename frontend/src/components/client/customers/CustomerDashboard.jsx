import React, {useState} from 'react'
import CustomerHeader from './CustomerHeader'
import CustomerAside from './CustomerAside'
import { Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
const CustomerDashboard = () => {
  const [aside, setAside] = useState(false);
  const auth = useAuth();

  const loggedCustomer = auth?.user;
  return (
    <div>
      <CustomerHeader setAside={setAside} />
      <CustomerAside aside={aside} setAside={setAside} />
      <main className="p-4 md:ml-24 min-h-max pt-7">

            <Outlet />
         
        </main>
    </div>
  )
}

export default CustomerDashboard
