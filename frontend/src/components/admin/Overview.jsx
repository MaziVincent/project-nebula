import useAuth from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { blue, brown, green, grey, purple, yellow } from "@mui/material/colors";
import baseUrl from "../../shared/baseURL";
// import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Apartment, ArrowRightAlt, Group, Groups, House, Landscape, Store } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import DeletePropertyModal from "./property/DeletePropertyModal";


const Overview = () => {

  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}recentProps`

  //delete property modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")

  const getProperties = async () => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["recentProps"],
     getProperties,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always",
        onSuccess: () => {
          setTimeout(() => {
          }, 2000)
        }
    }
  );

  // console.log(data)

  const propertyCounts = data && Array.isArray(data)
  ? data.reduce(
      (counts, property) => {
        // console.log('Property:', property)
        switch (property.type) {
          case "Apartment":
            counts.apartments += 1;
            break;
          case "Shop":
            counts.shops += 1;
            break;
          case "House":
            counts.houses += 1;
            break;
          case "Land":
            counts.lands += 1;
            break;
          default:
            break;
        }
        return counts;
      },
      { apartments: 0, shops: 0, houses: 0, lands: 0 } // Initial counts
    )
  : { apartments: 0, shops: 0, houses: 0, lands: 0 };

  //console.log(userCount)
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-full mt-40">
            <CircularProgress />
          </div>
        );
      }
  return (
    <div className="w-full h-auto max-md:pt-12">
       <div className=" bg-gray-50 w-full ">
        <h1 className=" text-2xl p-1 text-gray-700">
          Dashboard
          <span className=" text-xl"><sub>Control panel</sub></span>
        </h1>
       </div>
      <div className="flex justify-center gap-4 items-center flex-wrap">
        
        <div className="shadow-lg rounded-lg bg-emerald-500 text-gray-100 w-28 max-sm:w-56">
          <div className=" flex justify-between flex-col items-center p-2">
            <span>
              {" "}
              <Apartment
                sx={{ color: grey[100] }}
                fontSize="large"
              />{" "}
            </span>
            <span className=" text-2xl font-bold flex flex-col-reverse items-center"> {propertyCounts.apartments} 
              <span className="text-xs font-normal">Apartments</span>
            </span>
          </div>
          {/* <hr className=" border-2 border-gray-900" /> */}
          <Link to='/admin/apartments' className="text-sm text-center font-lifght bg-gray-100 block rounded-b-lg hover:text-emerald-500"> View Details 
            <span>
              <ArrowRightAlt fontSize=""/>
            </span>
          </Link>
        </div>
        <div className="shadow-lg rounded-lg bg-sky-500 text-gray-100 w-28 max-sm:w-56">
          <div className=" flex justify-between flex-col items-center p-2">
            <span>
              {" "}
              <Store
                sx={{ color: grey[100] }}
                fontSize="large"
              />{" "}
            </span>
            <span className=" text-2xl font-bold flex flex-col-reverse items-center"> {propertyCounts.shops} 
              <span className="text-xs font-normal">Shops</span>
            </span>
          </div>
          {/* <hr className=" border-2 border-gray-900" /> */}
          <Link to='/admin/shops' className="text-sm text-center font-lifght bg-gray-100 block rounded-b-lg hover:text-sky-500"> View Details 
            <span>
              <ArrowRightAlt fontSize=""/>
            </span>
          </Link>
        </div>
        <div className="shadow-lg rounded-lg bg-orange-500 text-gray-100 w-28 max-sm:w-56">
          <div className=" flex justify-between flex-col items-center p-2">
            <span>
              {" "}
              <House
                sx={{ color: grey[100] }}
                fontSize="large"
              />{" "}
            </span>
            <span className="text-2xl font-bold flex flex-col-reverse items-center"> {propertyCounts.houses} 
              <span className="text-xs font-normal">Houses</span>
            </span>
          </div>
          {/* <hr className=" border-2 border-gray-900" /> */}
          <Link to='/admin/houses' className="text-sm text-center font-lifght bg-gray-100 block rounded-b-lg hover:text-orange-500"> View Details 
            <span>
              <ArrowRightAlt fontSize=""/>
            </span>
          </Link>
        </div>
        <div className="shadow-lg rounded-lg bg-yellow-500 text-gray-100 w-28 max-sm:w-56">
          <div className=" flex justify-between flex-col items-center p-2">
            <span>
              {" "}
              <Landscape
                sx={{ color: grey[100] }}
                fontSize="large"
              />{" "}
            </span>
            <span className=" text-2xl font-bold flex flex-col-reverse items-center"> {propertyCounts.lands}
              <span className="text-xs font-normal">Lands</span>
            </span>
          </div>
          {/* <hr className=" border-2 border-gray-900" /> */}
          <Link to='/admin/lands' className="text-sm text-center font-lifght bg-gray-100 block rounded-b-lg hover:text-yellow-500"> View Details 
            <span>
              <ArrowRightAlt fontSize=""/>
            </span>
          </Link>
        </div>
      </div>
      <div className=" pt-4 pb-2 ">
        <h2 className=" text-2xl text-center text-gradient">Recent Properties</h2>
      </div>
      <div className=" border-dashed border rounded-md border-red-900 h-auto">
        <div className="overflow-auto w-full rounded-lg border border-gray-200 shadow-md p-2">
          <table className="w-full min-w-max border-collapse bg-white text-left text-sm text-gray-500 max-lg:w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Date Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Owner
                </th>
                <th
                
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >...</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              { Array.isArray(data) && data?.length > 0 ?(
                 data.map((props) => (
                  <tr key={props._id} className="hover:bg-gray-50">
                <th className=" gap-3 items-center px-6 py-4 font-normal text-gray-900">
                  <div className="relative max-h-10 max-w-10">
                   </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{props.title}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${props.status === "Available" ? 'text-green-600 bg-green-50' : props.status === "Pending" ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${props.status === "Available" ? 'bg-green-600' : props.status === "Pending" ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                    {props.status}
                  </span>
                </td>
                <td className="px-6 py-4">{props.createdAt.substring(0,10)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {props.owner.firstname}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-start gap-">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => {handleOpenDelete()
                        setPropertyId(props._id)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-red-600 hover:text-red-700"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    {/* <a
                      x-data="{ tooltip: 'Edite' }"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </a> */}
                  </div>
                </td>
              </tr>
                ))
            ): (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" flex justify-center mt-4">
        <Link to='/admin/properties' className=" block  text-gradient">
            <span className=" inline-flex gap-2">View All Properties
              <span>
                <ArrowRightAlt fontSize="small"/>
              </span>
            </span>
        </Link>
      </div>
      <DeletePropertyModal
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose}
        propertyId={propertyId}
        url={`${baseUrl}properties`} />
    </div>
  );
};

export default Overview;
