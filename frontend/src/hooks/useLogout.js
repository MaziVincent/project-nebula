import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});

        try {
            // toast.info('Logging out...');
            await axios.get('/logout', {
                withCredentials: true
            });
            setTimeout(() => {
                navigate('/'); // Redirect after showing the success message
              }, 1000);
        } catch (error) {
            toast.error('Logout failed. Please try again.');
            console.log('Logout failed:', error);
        }
    }

    return logout;
}

export default useLogout;
