import { configureStore } from "@reduxjs/toolkit";

import UserReducer from './UserSlice/UserReducer';
import OrderReducer from './orderSlice/OrderReducer'
export default configureStore({
    reducer:{
        UserReducer,
        OrderReducer
    }
})