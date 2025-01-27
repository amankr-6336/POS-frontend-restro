import axios from "axios";

let baseURL='http://localhost:4001/'

export const axiosClient=axios.create({
    baseURL,
    withCredentials:true
})


axiosClient.interceptors.request.use(
    (request)=>{
        const accessToken=localStorage.getItem("accessToken");
         request.headers['Authorization']=`Bearer ${accessToken}`;
         return request;
    }
);

axiosClient.interceptors.response.use(
   async (response) => {
      console.log(response);
     const data = response.data;
 
     if (data.status === 'ok') {
       return data;
     }
 
     const originalRequest = response.config;
     const statusCode = data.statusCode;
     const error = data.message;
 
     if (statusCode === 401 && !originalRequest._retry) {
       originalRequest._retry = true;
 
       try {
         // Use the same axiosClient instance for the refresh request
         const refreshResponse = await axiosClient.get('auth/refresh');
 
         if (refreshResponse.data.status === 'ok') {
           const newAccessToken = refreshResponse.data.result.accessToken;
           localStorage.setItem('accessToken', newAccessToken);
 
           // Update the original request with the new access token
           originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
 
           // Retry the original request
           return axios(originalRequest);
         }
       } catch (refreshError) {
         console.error('Refresh token request failed:', refreshError);
         localStorage.removeItem('accessToken');
         window.location.replace('/login');
         return Promise.reject(refreshError);
       }
     }
 
     // Reject the promise for any other errors
     return Promise.reject(error);
   },
   (error) => {
     // Handle errors that occur during the request or response
     console.error('Axios interceptor error:', error);
     return Promise.reject(error);
   }
 );
 