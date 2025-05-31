import { axiosClient } from "../utils/axiosCLient"

export const handleCreateRestaurant=async({name,address,phone})=>{
    return axiosClient.post('/restaurant/create-restro',{
        name,
        address,
        phone
    })
}