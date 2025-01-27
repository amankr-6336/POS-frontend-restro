import { configureStore } from "@reduxjs/toolkit";

import UserReducer from './UserSlice/UserReducer';

export default configureStore({
    reducer:{
        UserReducer
    }
})