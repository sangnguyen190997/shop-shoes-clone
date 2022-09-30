import React from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import { logoutUser } from "../redux/userSlice";

function AccountInfo() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    firebase.auth().signOut();
    localStorage.removeItem("firebaseRememberAccount");
  };

  return (
    <div>
      <ul>
        <li className="text-sm py-2 px-4 hover:border-l-2 hover:border-amber-300 hover:cursor-pointer hover:font-normal hover:border-l-1 shadow-sm">
          <a href="#">Tài khoản</a>
        </li>
        <li className="text-sm py-2 px-4 hover:border-l-2 hover:border-amber-300 hover:cursor-pointer hover:font-normal shadow-sm">
          <a href="#">Bộ sưu tập</a>
        </li>
        <li
          className="text-sm py-2 px-4 hover:border-l-2 hover:border-amber-300 hover:cursor-pointer hover:font-normal shadow-sm"
          onClick={handleLogout}
        >
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
}

export default AccountInfo;
