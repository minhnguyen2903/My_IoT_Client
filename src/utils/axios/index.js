// THIRD-PARTY
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const axiosServices = axios.create({
  baseURL: BASE_URL
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    //alertRequestError(error.response);
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);
export default axiosServices;
