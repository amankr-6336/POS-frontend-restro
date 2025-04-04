import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"userSlice",
    initialState:{
        owner:{}
    },

    reducers:{
        ownerInfo:(state,action)=>{
            console.log(action.payload);
            state.owner=action.payload
        }
    }
})

export default userSlice.reducer;
export const{ownerInfo}=userSlice.actions;