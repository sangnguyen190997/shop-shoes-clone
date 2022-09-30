import {
  getProductDetailFailed,
  getProductDetailStart,
  getProductDetailSuccess,
  getProductsFailed,
  getProductsFilterFailed,
  getProductsFilterStart,
  getProductsFilterSuccess,
  getProductsPaginationFailed,
  getProductsPaginationStart,
  getProductsPaginationSuccess,
  getProductsStart,
  getProductsSuccess,
} from "../../redux/productSlice";
import axiosClient from "./AxiosClient";

export const getListProduct = async (dispatch) => {
  getProductsStart();
  try {
    const res = await axiosClient.get("/products");
    dispatch(getProductsSuccess(res.data));
  } catch (err) {
    getProductsFailed(err);
  }
};

export const getListProductPagination = async (dispatch, params) => {
  getProductsPaginationStart();
  try {
    const res = await axiosClient.get("/products", { params });
    dispatch(getProductsPaginationSuccess(res.data));
  } catch (err) {
    getProductsPaginationFailed(err);
    console.log(err);
  }
};

export const getListProductFilter = async (dispatch, params) => {
  getProductsFilterStart();
  try {
    const res = await axiosClient.get("/products", { params });
    dispatch(getProductsFilterSuccess(res.data));
  } catch (err) {
    getProductsFilterFailed(err);
  }
};

export const getListProductDetail = async (dispatch, id) => {
  getProductDetailStart();
  try {
    const res = await axiosClient.get(`/products/${id}`);
    dispatch(getProductDetailSuccess(res.data));
  } catch (err) {
    getProductDetailFailed(err);
  }
};
