import { createSlice } from "@reduxjs/toolkit"

export const userAccountSlice = createSlice({
    name: "account",
    initialState:{
        user:null
    },
    reducers:{
        loginUser:(state,action) =>{
            state.user = action.payload
        },
        logoutUser:(state) =>{
            state.user = null
        }
    }
})

export const {loginUser,logoutUser} = userAccountSlice.actions

export default userAccountSlice.reducer