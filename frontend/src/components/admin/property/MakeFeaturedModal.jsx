import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useState } from "react";
import baseURL from "../../../shared/baseURL";

const MakeFeaturedModal = ({ open, handleClose, propertyId, featuredStatus}) => {
  const { auth } = useAuth();
  const update = useUpdate();
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const url = `${baseURL}properties/featured/${propertyId}`


  const handleFeatured = async () => {
    setIsLoading(true)
    if (!auth || !auth.accessToken) {
      toast.error("You are not authorized to perform this action");
      return;
    }


    try {
      const response = await update(url,{featured:featuredStatus}, auth.accessToken);
      if (response.status === 200 ) {
        toast.success("Property deleted successfully");
        queryClient.invalidateQueries("properties");
        setTimeout(() => {
          handleClose({type:"openFeatured"});
        }, 1000);
        setIsLoading(false)

      } else {
        setIsLoading(false)
        toast.error("Failed to delete property");
      }
      console.log(response);
      
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };
  // console.log(propertyId);
return (
  <Modal 
    open={open}
    onClose={() =>handleClose({type:"openFeatured"})}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <div>
      <div
        id="deleteModal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
           {
            featuredStatus ? 'Add to Featured Properties' :
            ' Remove from Featured Properties'
           } 
          </h3>
          <p className="text-gray-700 mb-6">
            {
                featuredStatus ? 'Are you sure you want to add this property to featured properties?' :
                'Are you sure you want to remove this property from featured properties?'
            }
          </p>
            <div className="flex justify-center gap-4">
              <button
                className=" bg-teal-700 px-2 rounded-lg text-white"
                onClick={handleFeatured}
              >
                {isLoading ? <CircularProgress size={20} color="white" /> : 'Proceed'}
              </button>
              <button
                className=" bg-gray-300 px-2 rounded-lg text-gray-800"
                onClick={() =>handleClose({type:"openFeatured"})}
              >
                Cancel
              </button>
            </div>
        </div>
      </div>
    </div>
  </Modal>
);
};

export default MakeFeaturedModal;