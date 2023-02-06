import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "userAccount",
  initialState: {
    userAccount: null,
  },
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);
      state.userAccount = action.payload;
    },
    logoutUser: (state) => {
      state.userAccount = 0;
    },
  },
});

export const { loginUser, logoutUser } = accountSlice.actions;

export default accountSlice.reducer;
