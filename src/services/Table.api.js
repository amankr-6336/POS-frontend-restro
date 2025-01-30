import { useSelector } from "react-redux";
import endpoints from "../constant/Endpoints"
import { axiosClient } from "../utils/axiosCLient"


export const getTables= async (data)=>{
    console.log(data);
    const response=await axiosClient.get(endpoints.table.getTables,{
        params:data
    });
    return response;
}