
import axios from 'axios';
import { API_ENDPOINT } from '../../data/page';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response if successful
    return response;
  },
  (error) => {
    // Check if the error response indicates an expired token
    if (error.response && error.response.data && error.response.data.message === "Expired token, please login again..") {
      // Redirect to the login page
      localStorage.removeItem('authUser')
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

