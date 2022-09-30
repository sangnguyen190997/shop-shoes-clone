import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function Login() {
  const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <div className="mt-14 w-full ">
      <div className="container px-4 lg:px-8 mx-auto flex items-center justify-center ">
        <div className="max-w-xs w-full space-y-6 my-8 md:px-6 py-8 md:shadow-md md:shadow-gray-300">
          <div className="text-center text-xl font-medium">
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </div>
          <form className="mt-8 space-y-4">
            <div className="mt-2">
              <label>Email</label>
              <input
                id="email"
                name="email"
                placeholder="Vui lòng nhập email của bạn"
                className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 placeholder:font-light text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-2xs text-red-600 font-light"></p>
            </div>
            <div className="mt-2">
              <label>Mật Khẩu</label>
              <input
                id="password"
                name="password"
                placeholder="Vui lòng nhập mật khẩu của bạn"
                className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-gray-500 placeholder:font-light text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <p className="text-2xs text-red-600 font-light"></p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-normal text-gray-900"
                >
                  Nhớ tài khoản
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-normal text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
              >
                Đăng nhập
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                Bạn chưa có tài khoản?
                <NavLink
                  to="/register"
                  className="font-normal ml-1 text-indigo-600 hover:text-indigo-500"
                >
                  Đăng ký
                </NavLink>
              </div>
            </div>
            <hr />
            <div className="flex justify-center">
              <div className="text-sm">
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
