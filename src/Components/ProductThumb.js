import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useSnackbar } from "notistack";

export default function ProductThumb(props) {
  const product = props.product;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
    addProductSuccess("sucess");
  };

  const addProductSuccess = (variant) => {
    enqueueSnackbar("Thêm sản phẩm thành công", {
      variant: "success",
    });
  };

  return (
    <div className="px-2 shadow-sm shadow-gray-200 group">
      <div className="relative">
        <img className="w-full" src={product.image} alt={product.title} />
        <div className="text-sm flex justify-between absolute bottom-0 w-full p-2 leading-[1rem] bg-slate-200 divide-x divide-gray-700 invisible group-hover:visible animate-bounce">
          <p
            className="text-xs cursor-pointer hover:opacity-70"
            onClick={() => handleAddItem(product)}
          >
            Thêm vào giỏ hàng
            <FontAwesomeIcon
              className="pl-1 cursor-pointer hover:opacity-70"
              icon="fa-solid fa-cart-plus"
            />
          </p>
          <Link to={`/products/${product.id}`}>
            <FontAwesomeIcon
              className="pl-2 cursor-pointer hover:opacity-70"
              icon="fa-solid fa-eye"
            />
          </Link>
        </div>
      </div>
      <div className="my-2">
        <p className="text-sm font-medium truncate">{product.title}</p>
        <div className="pb-2">
          <span className="text-sm font-medium">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.originalPrice)}
          </span>
          {product.promotionPercent === 0 ? null : (
            <span className="text-xs mx-2 bg-yellow-200 font-medium">
              -{product.promotionPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
