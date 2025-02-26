import { createSlice } from "@reduxjs/toolkit";

const notificationSlice=createSlice({
    name:"notificationSlice",
    initialState:{
        notification:[]
    },


    reducers: {
    addNotification: (state, action) => {
        if (Array.isArray(action.payload)) {
            state.notification.unshift(...action.payload); // ✅ Modifies existing array
        } else {
            state.notification.unshift(action.payload); // ✅ Adds single notification
        }
    },
    markAllAsRead: (state) => {
        state.notification.forEach(notification => {
            notification.isRead = true;
        });
        console.log(state.notification);
    } 
    
  
}
})


export default notificationSlice.reducer;
export const{addNotification,markAllAsRead}=notificationSlice.actions;