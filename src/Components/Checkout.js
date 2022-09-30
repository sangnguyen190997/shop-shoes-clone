import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotal } from "../redux/cartSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, []);

  const formik = useFormik({
    initialValues: {
      hoTen: "",
      email: "",
      soDt: "",
      diaChi: "",
    },
    validationSchema: Yup.object({
      hoTen: Yup.string()
        .required("Required")
        .matches(
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Họ tên không hợp lệ"
        )
        .min(10)
        .max(20),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ")
        .min(10),
      soDt: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .min(10)
        .max(10),
      diaChi: Yup.string()
        .required("Required")
        .matches(
          "^[/0-9a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Địa chỉ không hợp lệ"
        )
        .max(30),
    }),
    onSubmit: (values) => {
      window.alert("Đặt Hàng Thành Công");
      console.log(values);
    },
  });
  const methods = [
    {
      id: 1,
      title: "Thanh toán thẻ (ATM, Visa , MasterCard)",
      icon: "fa-solid fa-credit-card",
    },
    {
      id: 2,
      title: "Thanh toán bằng ví ShopeePay",
      icon: "fa-solid fa-wallet",
    },
    {
      id: 3,
      title: "Thanh toán khi giao hàng (COD)",
      icon: "fa-solid fa-truck-moving",
    },
  ];

  return (
    <div className="my-28">
      <div className="container px-4 lg:px-8 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:grid-flow-col grid-flow-row xl:grid-rows-3 gap-4">
            <div className="col-span-1 xl:row-span-2  border border-solid border-spacing-2 border-gray-400 shadow-sm">
              <div className="p-4">
                <p className="mb-6 text-base font-medium">
                  THÔNG TIN NGƯỜI DÙNG
                </p>
                <div className="mt-2">
                  <label>Họ Tên</label>
                  <input
                    id="hoTen"
                    name="hoTen"
                    placeholder="Vui lòng nhập họ tên của bạn"
                    className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 placeholder:font-light text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formik.values.hoTen}
                    onChange={formik.handleChange}
                  />
                  <p className="text-2xs text-red-600 font-light">
                    {formik.errors.hoTen}
                  </p>
                </div>
                <div className="mt-2">
                  <label>Email</label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Vui lòng nhập email của bạn"
                    className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 placeholder:font-light text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <p className="text-2xs text-red-600 font-light">
                    {formik.errors.email}
                  </p>
                </div>
                <div className="mt-2">
                  <label>Số điện thoại</label>
                  <input
                    id="soDt"
                    name="soDt"
                    placeholder="Vui lòng nhập số điện thoại của bạn"
                    className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 placeholder:font-light text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formik.values.soDt}
                    onChange={formik.handleChange}
                  />
                  <p className="text-2xs text-red-600 font-light">
                    {formik.errors.soDt}
                  </p>
                </div>
                <div className="mt-2">
                  <label>Địa Chỉ</label>
                  <textarea
                    id="diaChi"
                    name="diaChi"
                    placeholder="Vui lòng nhập địa chỉ của bạn"
                    className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 placeholder:font-light text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formik.values.diaChi}
                    onChange={formik.handleChange}
                  />
                  <p className="text-2xs text-red-600 font-light">
                    {formik.errors.diaChi}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 xl:row-span-1 border border-solid border-spacing-2 border-gray-400 shadow-sm">
              <div className="p-4 space-y-2">
                <p className="mb-6 text-base font-medium">
                  HÌNH THỨC THANH TOÁN
                </p>
                <div>
                  {methods.map((item, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="radio"
                          value={item.title}
                          id={item.id}
                          name="method"
                        />
                        <label
                          className="text-sm font-normal pl-2"
                          htmlFor={item.id}
                        >
                          <FontAwesomeIcon
                            className="text-2xs pr-1"
                            icon={item.icon}
                          />
                          {item.title}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-span-1 xl:row-span-3 xl:col-span-2 border border-solid border-spacing-2 border-gray-400 shadow-sm">
              <div className="p-4">
                <p className="mb-6 text-base font-medium">THÔNG TIN ĐƠN HÀNG</p>
                <div>
                  <div className="flex items-center text-base font-medium ">
                    <div className="flex w-full md:w-1/2 items-center ">
                      Sản phẩm
                    </div>
                    <div className="w-1/2 hidden md:flex justify-between items-center">
                      <div className="w-full md:w-1/3 mb-1 pl-4">Đơn giá</div>
                      <div className="w-full md:w-1/3 mb-1 pl-4">Số lượng</div>
                      <div className="w-full md:w-1/3 mb-1 pl-4">
                        Thành tiền
                      </div>
                    </div>
                  </div>
                  {cart.products.map((product, index) => {
                    return (
                      <div
                        key={index}
                        className="mb-3 flex items-center text-sm font-nomal bg-slate-50"
                      >
                        <div className="flex flex-col md:flex-row w-1/2 items-center">
                          <div>
                            <img
                              src={product.image}
                              width={140}
                              height={140}
                              alt={product.title}
                            />
                          </div>
                          <div className="pr-4 w-full truncate">
                            <p>{product.title}</p>
                          </div>
                        </div>
                        <div className="w-1/2 flex flex-col md:flex-row justify-between items-center">
                          <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.salePrice)}
                          </div>
                          <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4">
                            <div className="w-8 flex items-center ">
                              <span className="px-2 border border-spacing-2 border-black">
                                {product.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="w-full md:w-1/3 mb-1 md:mb-0 pl-4 ">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.salePrice * product.quantity)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div className="flex justify-between  text-base font-nomal">
                    <div className="lg:w-full">Tổng:</div>
                    <div>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(cart.cartTotalPrice)}
                    </div>
                  </div>
                  <div className="flex justify-between  text-base font-nomal">
                    <div className="lg:w-full">Ưu đãi:</div>
                    <div>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(cart.orderInfo.discount)}
                    </div>
                  </div>
                  <div className="flex justify-between  text-base font-nomal">
                    <div className="lg:w-full">Phí ship:</div>
                    <div>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(cart.orderInfo.shipping)}
                    </div>
                  </div>
                  <div className="flex justify-between  text-base font-nomal">
                    <div className="lg:w-full">Thành tiền:</div>
                    <div>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(cart.cartTotal)}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-3 text-sm font-normal text-center py-1  border border-spacing-2 border-black hover:cursor-pointer text-black bg-white hover:text-white hover:bg-black"
                  >
                    HOÀN TẤT ĐƠN HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
