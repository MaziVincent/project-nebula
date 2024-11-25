//import { useState, useEffect} from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from './components/admin/Dashboard'
import Login from './components/auth/Login'
import Home from './components/Home/Home'
import Page from './components/Home/Page'
import About from './components/Home/About'
//import Blog from './components/Home/Blog'
import Contact from './components/Home/Contact'
import Sell from './components/Home/Sell'
import Rent from './components/Home/Rent'
import Overview from './components/admin/Overview'
import PersistLogin from './shared/persistLogin'
import AdminShops from './components/admin/shops/AdminShops';
//import CreateShop from './components/admin/shops/CreateShop';
import Properties from './components/admin/property/Properties';
import ShopDetails from './components/admin/shops/ShopDetails';
import AdminApartments from './components/admin/apartment/AdminApartments';
import ApartmentDetails from './components/admin/apartment/ApartmentDetails';
import AdminHouses from './components/admin/houses/AdminHouses';
import HouseDetails from './components/admin/houses/HouseDetails';
import AdminLands from './components/admin/land/AdminLands';
import LandDetails from './components/admin/land/LandDetails';
import AdminAgents from './components/admin/agents/AdminAgents';
import AgentDetails from './components/admin/agents/AgentDetails';
import AdminOwners from './components/admin/owners/AdminOwners';
import AdminOwnerDetails from './components/admin/owners/AdminOwnerDetails';
import AdminCustomers from './components/admin/customer/AdminCustomers';
import CustomerDetails from './components/admin/customer/CustomerDetails';
import AdminUsers from './components/admin/users/AdminUsers';
import CustomerDashboard from './components/client/customers/CustomerDashboard';
import CustomerOverview from './components/client/customers/CustomerOverview';
import PropertyDetails from './components/client/agent/agentComponent/PropertyDetails';
import Profile from './components/client/customers/Profile';
import AllProperty from './components/client/customers/AllProperty';
import AgentDashboard from './components/client/agent/AgentDashboard';
import AgentOverview from './components/client/agent/AgentOverview';
import RequireAuth from './components/auth/RequireAuth';
import Page404 from './components/views/Page404';
//import { Unarchive } from '@mui/icons-material';
import UnAuthorized from './components/views/UnAuthorized';
import OwnerDashboard from './components/client/owner/OwnerDashboard';
import OwnerOverview from './components/client/owner/OwnerOverview';
import Property from './components/client/owner/ownerComponent/Property';
import AgentProfile from './components/client/agent/AgentProfile';
import OwnerProfile from './components/client/owner/OwnerProfile';
//import SignUp from './components/auth/SignUp';
import PropertyDtls from './components/Home/PropertyDtls';
import RequireAuthAdmin from './components/auth/RequireAuthAdmin';
import AllProperties from './components/Home/AllProperties';
import PropertyForRent from './components/client/customers/PropertyForRent';
import PropertyForSell from './components/client/customers/PropertyForSell';
import AdminProfile from './components/admin/AdminProfile';
import TermsAndConditions from './components/Home/TermsAndConditions';
import ForgotPassword from './components/auth/ForgotPassword';
import CustomerPropertyDetails from './components/client/customers/PropertyDetails';
import PropertyPage from './components/Home/PropertyPage';

function App() {
  const queryClient = new QueryClient();
  const roles = { customer: "Customer", admin: "Admin", agent: "Agent" , owner: "Owner"};
  

  return (
    <QueryClientProvider client={queryClient}>
        <>
          <Routes>
            <Route element={<PersistLogin />}>
            <Route path='/' element={<Home />} >
              <Route index element={<Page />} />
              <Route path='/about' element={<About />} />
              <Route path='/rent' element={<Rent />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/allproperties' element={<AllProperties />} />
              <Route path='/sell' element={<Sell />} />
              <Route path='/property/:id' element={<PropertyDtls />} />
              <Route path='/terms' element={<TermsAndConditions />} />
            </Route>
            </Route>

            {/* login route */}
              <Route path='/login' element={<Login />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              
            {/*  admin route */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuthAdmin allowedRoles={[roles.admin]} />}>
                <Route path='/admin' element={<Dashboard />} >
                  <Route index element={<Overview />} />
                  <Route path='/admin/profile/:id' element={<AdminProfile />} />
                  <Route path='/admin/properties' element={<Properties />} />

                  {/*admin shop route */}
                  <Route path='/admin/shops' element={<AdminShops />} />
                  <Route path='/admin/shop_details/:id' element={<ShopDetails />} />

                  {/*admin apartment route */}
                  <Route path='/admin/apartments' element={<AdminApartments />} />
                  <Route path='/admin/apartment_details/:id' element={<ApartmentDetails />} />

                  {/*admin house route */}
                  <Route path='/admin/houses' element={<AdminHouses />} />
                  <Route path='/admin/house_details/:id' element={< HouseDetails />} />

                  {/*admin land route */}
                  <Route path='/admin/lands' element={<AdminLands /> } />
                  <Route path='/admin/land_details/:id' element={<LandDetails /> } />

                  {/*admin agent route */}
                  <Route path='/admin/agents' element={<AdminAgents />} />
                  <Route path='/admin/agent_details/:id' element={<AgentDetails />} />

                  {/* Admin owner route */}
                  <Route path='/admin/owners' element={<AdminOwners />} />
                  <Route path='/admin/owner_details/:id' element={<AdminOwnerDetails />} />

                  {/* Admin owner route */}
                  <Route path='/admin/customers' element={<AdminCustomers />} />
                  <Route path='/admin/customer_details/:id' element={<CustomerDetails />} />

                  {/* Admin users */}
                  <Route path='/admin/users' element={<AdminUsers />} />
                </Route>
              </Route>
            </Route>

            {/*  customer route */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[roles.customer]} />}>
                  <Route path='/dashboard' element={<CustomerDashboard />} >
                  <Route index element={<CustomerOverview />} />
                  <Route path='/dashboard/profile/:id' element={<Profile />} />
                  <Route path='/dashboard/details/:id' element={<CustomerPropertyDetails />} />
                  <Route path='/dashboard/properties' element={<AllProperty />} />
                  <Route path='/dashboard/rentals' element={<PropertyForRent />} />
                  <Route path='/dashboard/sell' element={<PropertyForSell />} />
                </Route>
              </Route>
            </Route>

            {/*  agent route */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[roles.agent]} />}>
                <Route path='/agent' element={<AgentDashboard />} >
                  <Route index element={<AgentOverview />} />
                  <Route path='/agent/property/:id' element={<PropertyDetails />} />
                  <Route path='/agent/profile/:id' element={<AgentProfile />} />
                </Route>
              </Route>
            </Route>

            {/*  owner route */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[roles.owner]} />}>
                <Route path='/owner' element={<OwnerDashboard />} >
                  <Route index element={<OwnerOverview />} />
                  <Route path='/owner/property/:id' element={<Property />} />
                  <Route path='/owner/profile/:id' element={<OwnerProfile />} />
                </Route>
              </Route>
            </Route>

            {/* catch all */}
            <Route path='*' element={<Page404 />} />
            <Route path='unauthorized' element={<UnAuthorized />} />
          </Routes>
        </>
    </QueryClientProvider>
  )
}

export default App
