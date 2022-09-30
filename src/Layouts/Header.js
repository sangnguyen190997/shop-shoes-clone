import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotal } from "../redux/cartSlice";
import AccountInfo from "../Components/AccountInfo";

export default function Header() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { currentUser, isLogin } = user;

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const handleLogo = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full h-16 lg:h-20 bg-white shadow-sm shadow-gray-200 fixed top-0 z-20">
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="hidden lg:flex">
          <div
            onClick={handleLogo}
            className="leading-[5rem] text-4xl text-amber-300 font-bold text-shadow-xl shadow-yellow-400 cursor-pointer transition-all duration-200"
          >
            YOLOSTORE
          </div>
          <div className="flex-1 text-center space-x-6">
            <NavLink
              to="/"
              className="leading-[5rem] text-base font-semibold pb-1"
            >
              TRANG CHỦ
            </NavLink>
            <NavLink
              to="/products"
              className="leading-[5rem] text-base font-semibold pb-1"
            >
              SẢN PHẨM
            </NavLink>
            <NavLink
              to="/contact"
              className="leading-[5rem] text-base font-semibold pb-1"
            >
              LIÊN HỆ
            </NavLink>
          </div>
          <div>
            {isLogin ? (
              <div className="inline py-8 text-base font-light leading-[5rem] m-2 group relative">
                Hi <span className="font-medium">{currentUser.name}</span>
                <div className="absolute z-10 w-full right-0 left-0 bg-white invisible group-hover:visible shadow-md">
                  <AccountInfo />
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-base font-semibold leading-[5rem] m-2 hover:cursor-pointer"
              >
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </NavLink>
            )}

            <p className="inline text-base leading-[5rem] m-2">
              <FontAwesomeIcon
                className="text-base leading-[5rem]"
                icon="fa-solid fa-magnifying-glass"
              />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="text-base py-1 pl-1 w-2 focus:w-fit font-light placeholder:pl-1 placeholder:text-2xs outline-none"
              />
            </p>
            <Link to="/cart">
              <p className="relative inline">
                <FontAwesomeIcon
                  className="text-base leading-[5rem]"
                  icon="fa-solid fa-cart-plus"
                />
                <span className="absolute px-1 text-xs font-medium text-white bg-red-600 -top-3 -right-1.5 rounded-full">
                  {cart.cartTotalQuantity}
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
