import {
  getCategoryFailed,
  getCategoryStart,
  getCategorySuccess,
} from "../../redux/categorySlice";
import axiosClient from "./AxiosClient";

export const getListCategory = async (dispatch) => {
  getCategoryStart();
  try {
    const res = await axiosClient.get("/categories");
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    getCategoryFailed(err.response.data);
  }
};
