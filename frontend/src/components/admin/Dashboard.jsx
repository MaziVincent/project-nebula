import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Aside from "./Aside";
const Dashboard = () => {
  
    const [aside, setAside] = useState(false);

    // console.log(aside);

  return (
    <>
      <div className="antialiased bg-gray-100 h-auto min-h-max relative">
       
       <AdminHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <Aside aside={aside} setAside={setAside} />

        <main className="p-4 md:ml-48 min-h-max pt-7">

            <Outlet />
         
        </main>
        <footer className=" md:ml-64 px-10 py-0 mt-10 text-gray-800 font-thin max-md:text-xs max-md:mt-44">
          © 2024 Real Estate Management System. All rights reserved
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
