import { configureStore } from "@reduxjs/toolkit";

import UserReducer from './UserSlice/UserReducer';
import OrderReducer from './orderSlice/OrderReducer';
import NotificationReducer from './notificationSlice/NotificationSlice'
export default configureStore({
    reducer:{
        UserReducer,
        OrderReducer,
        NotificationReducer
    }
})