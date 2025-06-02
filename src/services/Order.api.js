import { axiosClient } from "../utils/axiosCLient"

export const handlegetOrders=async(restaurantId)=>{
    return axiosClient.get('/order/get-order',{
        params:restaurantId
    })
}


export const handleOrderStatusChange=async ({orderId,status,tableId})=>{
    return axiosClient.post('/order/update-order',{
        orderId,
        status,
        tableId
    })
}