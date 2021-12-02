import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", displayName: "", num: 0 },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
      console.log(state.user);
    },
    logout: (state) => {
      state.user = { uid: "", displayName: "" };
    },
    updateUserProfile: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
    },
  },
});

export const { login, logout, updateUserProfile } = usersSlice.actions;
export const selectUser = (state) => state.users.user;
export default usersSlice.reducer;
