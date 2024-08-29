import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null, // Initialize with null or an empty object
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
    // update: (state, action) => {
    //   state.value = action.payload;
    // },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
