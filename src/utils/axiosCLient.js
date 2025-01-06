import axios from "axios";

let baseURL='http://localhost:4001/'

export const axiosClient=axios.create({
    baseURL,
    withCredentials:true
})