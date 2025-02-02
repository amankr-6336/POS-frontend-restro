import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"orderSlice",
    initialState:{
        orders:[]
    },

    reducers:{
        addOrder: (state, action) => {
            state.orders = [action.payload, ...state.orders]; // Add new order at the beginning
          },
        setOrders: (state, action) => {
            console.log(action.payload)
            state.orders = action.payload; // Set initial orders from API
        },
        updateOrderStatus: (state, action) => {
            state.orders = state.orders.map((order) =>
              order._id === action.payload._id
                ? { ...order, status: action.payload.status }
                : order
            );
          },
    }
})
 export default orderSlice.reducer;
 export const{addOrder,setOrders,updateOrderStatus}=orderSlice.actions;

