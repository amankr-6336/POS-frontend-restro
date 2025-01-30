import {axiosClient} from '../utils/axiosCLient'
import endpoints from '../constant/Endpoints'

export const handleLogin= async () =>{
    const response=await axiosClient.post(endpoints.auth.login);
    return response;
}