import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decrementItem,
  getTotal,
  removeItem,
  showQuantity,
} from "../redux/cartSlice";
import CartEmpty from "./CartEmpty";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  console.log({ user });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const handleRemoveItem = (id) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm?")) {
      dispatch(removeItem(id));
    } else {
      return;
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrementItem = (product) => {
    dispatch(decrementItem(product));
  };

  const handleShowQuantity = (product, quantity) => {
    dispatch(showQuantity({ product, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="my-28">
      <div className="container px-4 lg:px-8 mx-auto">
        {cart.cartTotalQuantity === 0 ? (
          <CartEmpty />
        ) : (
          <div className="mt-6 flex flex-col lg:flex-row justify-center lg:justify-between">
            <div className="w-full lg:w-3/4 mr-6 flex flex-col">
              <div className="flex items-center text-xl font-medium">
                <div className="flex w-full md:w-1/3 items-center">
                  Sản Phẩm
                </div>
                <div className="w-2/3 hidden md:flex justify-between items-center">
                  <div className="w-4/5 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 mb-1 pl-4">Đơn Giá</div>
                    <div className="w-full md:w-1/3 mb-1 pl-4">Số lượng</div>
                    <div className="w-full md:w-1/3 mb-1 pl-4">Thành tiền</div>
                  </div>
                  <div className="w-1/5"></div>
                </div>
              </div>
              {cart.products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="mb-3 flex items-center text-base  font-normal bg-slate-50"
                  >
                    <div className="flex flex-col md:flex-row w-1/3 items-center">
                      <div>
                        <img
                          src={product.image}
                          width={140}
                          height={140}
                          alt={product.title}
                        />
                      </div>
                      <div className="md:pl-4 w-full truncate">
                        <NavLink to={`/products/${product.id}`}>
                          {product.title}
                        </NavLink>
                      </div>
                    </div>
                    <div className="w-2/3 flex justify-between items-center">
                      <div className="w-4/5 flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.salePrice)}
                        </div>
                        <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4">
                          <div className="w-18 flex items-center border border-spacing-2 border-black">
                            <div
                              className="w-1/3 flex justify-center text-center border-r border-black leading-4 hover:cursor-pointer hover:text-white hover:bg-black"
                              onClick={() => handleDecrementItem(product)}
                            >
                              <FontAwesomeIcon
                                icon="fa-solid fa-minus "
                                className="block p-2 text-xs "
                              />
                            </div>
                            <div className="w-1/3 text-center">
                              <input
                                type="text"
                                className="w-full outline-none text-center"
                                value={product.quantity}
                                onChange={(e) => {
                                  const quantity = Number(e.target.value);
                                  handleShowQuantity(product, quantity);
                                }}
                              />
                            </div>
                            <div
                              className="w-1/3 flex justify-center text-center border-l border-black leading-4 hover:cursor-pointer hover:text-white hover:bg-black"
                              onClick={() => handleAddToCart(product)}
                            >
                              <FontAwesomeIcon
                                icon="fa-solid fa-plus "
                                className="block p-2  text-xs"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.salePrice * product.quantity)}
                        </div>
                      </div>
                      <div className="w-1/5 text-right lg:text-left">
                        <FontAwesomeIcon
                          icon="fa-solid fa-trash-can "
                          className="p-2.5 text-xs hover:opacity-70 hover:cursor-pointer"
                          onClick={() => handleRemoveItem(product.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full lg:w-1/4 p-3 shadow-md">
              <div className="flex justify-between lg:flex-wrap xl:flex-nowrap text-base font-nomal">
                <div className="lg:w-full">Tổng sản phẩm</div>
                <div className="font-bold">{cart.cartTotalQuantity}</div>
              </div>
              <div className="flex justify-between lg:flex-wrap xl:flex-nowrap text-base font-nomal">
                <div className="lg:w-full">Thành tiền</div>
                <div className="font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(cart.cartTotalPrice)}
                </div>
              </div>
              <div className="mt-5 flex flex-col">
                {user.isLogin === false ? (
                  <NavLink
                    to="/login"
                    className="text-base font-normal text-center  py-1  border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                  >
                    ĐẶT HÀNG
                  </NavLink>
                ) : (
                  <NavLink
                    to="/checkout"
                    className="text-base font-normal text-center  py-1  border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                  >
                    ĐẶT HÀNG
                  </NavLink>
                )}
                <NavLink
                  to="/products"
                  className="mt-3 text-base font-normal text-center py-1  border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                >
                  TIẾP TỤC MUA SẮM
                </NavLink>
                <NavLink
                  className="mt-3 text-base font-normal text-center py-1  border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                  onClick={() => handleClearCart()}
                >
                  XÓA GIỎ HÀNG
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
