import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../services/API/UserApi";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const currentUser = await userApi.getUser();
  return currentUser;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isLogin: false,
    loading: false,
    error: "",
  },
  reducers: {
    logoutUser: (state) => {
      state.isLogin = false;
      state.currentUser = {};
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.currentUser = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isLogin = false;
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
