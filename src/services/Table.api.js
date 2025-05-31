import endpoints from "../constant/Endpoints"
import { axiosClient } from "../utils/axiosCLient"


export const getTables= async (data)=>{
    const response=await axiosClient.get(endpoints.table.getTables,{
        params:data
    });
    return response;
}

export const handleAddTable=async({restroId,tableNumber,tableCapacity})=>{
    return axiosClient.post('/table/create-table',{
         restroId,
         tableNumber,
         tableCapacity
    })
}



    