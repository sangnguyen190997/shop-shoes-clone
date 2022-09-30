import "./App.css";
import { Route, Routes } from "react-router-dom";
import publicRoutes from "./Routes/routes";
import DefaultLayout from "./Layouts";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect } from "react";
import { getUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: "shop-shoes-clone",
  // storageBucket: "shop-shoes-clone.appspot.com",
  // messagingSenderId: "615353839915",
  // appId: "1:615353839915:web:a532cebf8dd52c98fc556e",
  // measurementId: "G-JLR3FXC63R",
};

firebase.initializeApp(firebaseConfig);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          return;
        }

        localStorage.setItem(
          "firebaseRememberAccount",
          JSON.stringify(user.providerData)
        );
        try {
          const actionResult = dispatch(getUser());
          const currentUser = unwrapResult(actionResult);
        } catch (error) {
          console.log(error);
          return;
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Component = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <DefaultLayout>
                <Component />
              </DefaultLayout>
            }
          ></Route>
        );
      })}
    </Routes>
  );
}

export default App;
