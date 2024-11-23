import { useEffect } from "react";
import { useParams } from "react-router-dom";
const PropertyPage = () => {
    const { id } = useParams();

    // Redirect to the serverless function
    const serverlessUrl = `https://www.megatechrealestate.ng/api/property/${id}`

    // Use `window.location` to navigate to the serverless-rendered page
    useEffect(() => {
        window.location.href = serverlessUrl;
    }, [serverlessUrl]);

    return <div>Loading...</div>; // Show a loading indicator until the redirect happens
};

export default PropertyPage;