import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: {
      allCategory: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getCategoryStart: (state) => {
      state.categories.isFetching = true;
    },

    getCategorySuccess: (state, action) => {
      state.categories.isFetching = false;
      state.categories.allCategory = action.payload;
    },

    getCategoryFailed: (state) => {
      state.categories.isFetching = false;
      state.categories.error = true;
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryFailed } =
  categorySlice.actions;
export default categorySlice.reducer;
