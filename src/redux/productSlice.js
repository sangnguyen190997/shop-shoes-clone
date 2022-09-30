import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      allProduct: null,
      isFetching: false,
      error: false,
    },
    productsPagination: {
      allProductPagination: null,
      isFetching: false,
      error: false,
    },
    productsFilter: {
      allProductFilter: null,
      isFetching: false,
      error: false,
    },
    productDetail: {
      productById: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getProductsStart: (state) => {
      state.products.isFetching = true;
    },
    getProductsSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.allProduct = action.payload;
    },
    getProductsFailed: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
    getProductsPaginationStart: (state) => {
      state.productsPagination.isFetching = true;
    },
    getProductsPaginationSuccess: (state, action) => {
      state.productsPagination.isFetching = false;
      state.productsPagination.allProductPagination = action.payload;
    },
    getProductsPaginationFailed: (state) => {
      state.productsPagination.isFetching = false;
      state.productsPagination.error = true;
    },
    getProductsFilterStart: (state) => {
      state.productsFilter.isFetching = true;
    },
    getProductsFilterSuccess: (state, action) => {
      state.productsFilter.isFetching = false;
      state.productsFilter.allProductFilter = action.payload;
    },
    getProductsFilterFailed: (state) => {
      state.productsFilter.isFetching = false;
      state.productsFilter.error = true;
    },
    getProductDetailStart: (state) => {
      state.productDetail.isFetching = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.productDetail.isFetching = false;
      state.productDetail.productById = action.payload;
    },
    getProductDetailFailed: (state) => {
      state.productDetail.isFetching = false;
      state.productDetail.error = true;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  getProductsPaginationStart,
  getProductsPaginationSuccess,
  getProductsPaginationFailed,
  getProductsFilterStart,
  getProductsFilterSuccess,
  getProductsFilterFailed,
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
} = productSlice.actions;

export default productSlice.reducer;
