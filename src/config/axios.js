import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const methods = ['POST', 'PUT'];
axios.interceptors.request.use((reqConfig) => {
  if (!reqConfig.url.startsWith('auth') && methods.includes(reqConfig.method.toUpperCase()) && !reqConfig.headers.Authorization) {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiresIn');
    if (token && expiry && parseInt(expiry) < Date.now() - 5000) {
      const auth_header = 'Bearer ' + token;
      reqConfig.headers.Authorization = auth_header;
    }
  }
  return reqConfig;
});
axios.interceptors.response.use(
  (axiosRes) => {
    toast.success(axiosRes.data?.message);
    return axiosRes;
  },
  (error) => {
    const msg = error.response ? error.response.data.message : error.message;
    toast.error(msg);
    return Promise.reject(error);
  }
);
