import { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import UpdateAgentModal from './UpdateAgentModal';
import DeleteUserModal from '../users/DeleteUserModal';
import AgentVerifyModal from './AgentVerifyModal';
import UnverifyAgentModal from './UnverifyAgentModal';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
// import UpdateApartmentModal from './UpdateApartmentModal';
// import DeletePropertyModal from '../property/DeletepropertyModal';


function AgentDetails() {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}agent`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;
  
  //updatemodal
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  

  //deletemodal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [userId, setUserId] = useState("")

  // State for apartment details and other shops
  const [agent, setAgent] = useState(null);
  const [otherAgents, setOtherAgents] = useState([]);

  //verify or unverify agent
  const [openVerify, setOpenVerify] = useState(false);
  const handleOpenverify = () => setOpenVerify(true);
  const handleVerifyClose = () => setOpenVerify(false);
  const [agentId, setAgentId] = useState("")

  //verify or unverify agent
  const [openUnverify, setOpenUnverify] = useState(false);
  const handleOpenUnverify = () => setOpenUnverify(true);
  const handleUnverifyClose = () => setOpenUnverify(false);

  const handleAgentDetails = async () => {
    try {
      // Fetch the specific apartment details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setAgent(result.data); 
      }
    } catch (error) {
      toast.error("Error fetching Agent's details");
      console.log("Fetch error:", error);
    }
  };
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleAgentDetails();
  }, [id]);
  //console.log(otherAgents);
  //console.log(agent);
  return (
    <div className=' max-md:pt-24'>
      <ToastContainer />
      <div className=' max-md:pt-10 pl-4'>
        <Link to='/admin/agents' >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 28 28"
          className=' h-7 w-7 text-gray-400 hover:text-green-600'
          fill="currentColor">
          <path d="M0 0h24v24H0V0z" 
          fill="none"/>
          <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"/></svg>
        </Link>
      </div>
      {
        agent ? (
          <div className="container mx-auto p-2">
            <div className="bg-white rounded-lg shadow-md p-2">
              <div className="">
                <div className=' flex justify-center items-center gap-3 max-sm:flex-col'>
                <div className="w-1/3 max-sm:w-4/5">
                  <h4 className=' text-xl mb-0 pb-2'>Profile Image:</h4>
                  <div className=' border'>
                    <img src={`${imageUrl}${agent.profile}`} alt={agent.firstname} className="w-full h-auto" />
                  </div>
                </div>
                <div className="w-1/3 max-sm:w-4/5">
                  <h4 className=' text-xl mb-0 pb-2'>Identity Image:</h4>
                  <div className=' border'>
                    <img src={`${imageUrl}${agent.identityImage}`} alt={agent.identityType} className="w-full h-auto" />

                  </div>
                </div>
                </div>
                <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                  <h2 className=" text-xl font-light">Name: <span className=' text-2xl font-semibold text-gray-600'>{`${agent.firstname} ${agent.lastname}`}</span></h2>
                  <p className="mb-4 text-gray-600">Email: <span>{agent.email}</span></p>
                  <p className="mb-4 text-gray-600">Phone: <span>{agent.phone}</span></p>
                  <p className='mb-4 text-gray-600'>Status: <span className={`${agent.status === "Active" ? 'text-green-600' : ' text-red-600'}`}>{agent.status}</span></p>
                  <p className='mb-4 font-medium text-lg text-gray-600'>Verification Status: <span className={`${agent.verified? 'text-blue-600' : ' text-red-600'}`}>{agent.verified ? 'Verified' : 'Not Verified'}</span></p>
                  <p className='mb-4 text-gray-600'>Identity Type: <span>{agent.identityType}</span></p>
                  <p className='mb-4 text-gray-600'>Identity Number: <span>{agent.identityNumber}</span></p>
                  <p className='mb-4 text-gray-600'>Contact Address: <span>{agent.contactAddress}</span></p>
                  <p className='mb-4 text-gray-600'>Office Address: <span>{agent.officeAddress}</span></p>
                  <p className='mb-4 text-gray-600'>Agency Name: <span>{agent.agencyName}</span></p>
                  <p className='mb-4 text-gray-600'>Properties: <span>{agent.properties.title}</span></p>
                  {/* Update and Delete buttons */}
                  <div className=' flex items-center gap-4 mt-4'>
                    <div className="">
                      <button
                      onClick={() => {
                        handleUpdateOpen();
                        setAgent(agent);
                      }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                        Update
                      </button>
                      <button onClick={() => {handleOpenDelete() 
                          setUserId(agent._id)
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Delete
                      </button>
                    </div>
                    <div className=' flex gap-2'>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                        onClick={() => {handleOpenverify()
                          setAgentId(agent._id)
                        }}
                      >
                        Verify
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                        onClick={() => {handleOpenUnverify()
                          setAgentId(agent._id)
                        }}
                      >
                        Unverify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=' w-full flex justify-center'><CircularProgress /></div>
        )
      }
      <AgentVerifyModal openVerify={openVerify} handleVerifyClose={handleVerifyClose} agentId={agentId} />
      <UnverifyAgentModal openUnverify={openUnverify} handleUnverifyClose={handleUnverifyClose} agentId={agentId} />
      <UpdateAgentModal openUpdate={openUpdate} handleUpdateClose={handleUpdateClose} agent={agent} />
      <DeleteUserModal 
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose} 
        // shop={shop}
        userId={userId}
        // propertyType="shop" 
        url={`${url}`} />
    </div>
  )
}

export default AgentDetails
