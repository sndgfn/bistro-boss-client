import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
   baseURL: 'https://bistro-boss-server-nu-lilac.vercel.app'
});
const useAxiosSecure = () => {
   const navigate = useNavigate();
   const { logOut } = useContext(AuthContext);
   //jwt jamela suru
   axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token');
      // console.log('reqquiest stopped by interceptors', token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
   }, function (error) {
      return Promise.reject(error);
   })
   //intercepts 401 403 status
   axiosSecure.interceptors.response.use(function (response) {
      return response;
   }, async (error) => {
      const status = error.response.status;
      // console.log('status error in the interceptors', status);

      if (status === 401 || status === 403) {
         await logOut();
         navigate('/login');
      }
      return Promise.reject(error);
   })
   //jwt jamela ses
   return axiosSecure;
};

export default useAxiosSecure;