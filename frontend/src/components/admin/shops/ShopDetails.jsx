
import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import UpdateShopModal from './UpdateShopModal';
import DeletePropertyModal from '../property/DeletepropertyModal';
import { Modal } from '@mui/material';

const ShopDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}shop`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;
  
  //updatemodal
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  // const [shop, setShop] = useState({})

  //deletemodal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")

  // State for shop details and other shops
  const [shop, setShop] = useState(null);
  const [otherShops, setOtherShops] = useState([]);
  
  // Fetch shop details and other shops
  const handleShopDetail = async () => {
    try {
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setShop(result.data); // Set shop details
        console.log(result.data);
        const otherShopsResult = await fetch(`${url}`, auth.accessToken);
        if (otherShopsResult && Array.isArray(otherShopsResult.data)) {
          setOtherShops(otherShopsResult.data.filter((shop) => shop._id !== id));
        } else {
          toast.error("No other shops found");
        }
        toast.success("Shop details fetched successfully");

      } else {
        toast.error("Error fetching shop details");
      }
     
      // console.log(otherShopsResult);
      console.log(result);
    } catch (error) {
      toast.error("Error fetching shop details");
      console.log(error);
    }
  };

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleShopDetail();
  }, [id]);
  console.log(shop);
  return (
      <div className='mt-4'>
        <ToastContainer />
      {/* Render shop details */}
      {shop ? (
        <div>
          <div className=' grid grid-cols-2 gap-4'>
            <div className=' h-auto'>
              <img className=' h-full' src={`http://localhost:3500/${shop.image}`} />
            </div>
            <div>
              <h1 className='text-xl inline-flex gap-2 items-center'>Title: <span className='text-lg font-semi-bold text-gray-800 uppercase'>{shop.title}</span></h1>
              <p className=' flex flex-col justify-start gap-2'>
                <span>Description:</span>
                <span>{shop.description}</span>
              </p>
              <p>Owner: {shop.owner.firstname}</p>
              <p>Price: <span>{shop.price}</span></p>
              <p>Location: <span>{shop.location}</span></p>
              <p>ShopType: <span>{shop.shopType}</span></p>
              <p>ShopCategory: <span>{shop.shopCategory}</span></p>
              <p>LeaseDuration: <span>{shop.leaseDuration}</span></p>
              <p>SecurityDeposit: <span>{shop.securityDeposit}</span></p>
              <p>Status: <span>{shop.status}</span></p>
            </div>
          </div>
          {/* Add more shop details as needed */}
          <div className=' flex justify-start items-start gap-4 my-4 '>
            <button
              onClick={() => {
                handleUpdateOpen();
                setShop(shop);
              }}
              className=' bg-gray-300 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 rounded-lg px-2'
              >
              <span>Edit Shop</span>
            </button>
            <button
              onClick={() => {handleOpenDelete() 
                setPropertyId(shop._id)
              }} 
              className=' bg-red-600 bg-opacity-70 text-white px-2 rounded-lg shadow-md shadow-red-300'
              >
              <span>Delete Shop</span>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* Render other shops */}
      <div>
        <h2>Other Shops</h2>
        {otherShops.map(shop => (
          <div key={shop._id}>
            <h3>{shop.title}</h3>
            <p>{shop.description}</p>
            <img src={shop.image} alt={shop.title} />
          </div>
        ))}
      </div>
      <UpdateShopModal open={openUpdate} handleClose={handleUpdateClose} shop={shop} />
      <DeletePropertyModal open={openDelete} handleClose={handleDeleteClose} propertyId={propertyId} />
    </div>
  );
}

export default ShopDetails;
