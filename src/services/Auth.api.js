
import { axiosClient } from "../utils/axiosCLient";

export const handleLogin = async ({ email, password }) => {
  return axiosClient.post("/auth/login", { email, password });
};

export const handlesignin= async({userName,email,password,})=>{
   return  axiosClient.post('/auth/signup',{
    userName,
    email,
    password
   })
}

export const handleLogoutUser=async()=>{
  return axiosClient.post('/auth/logout');
}

export const getUserInfo=async()=>{
  return axiosClient.get('/owner/getownerinfo');
}
