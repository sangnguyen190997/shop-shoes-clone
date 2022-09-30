import React from "react";
import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <div>{children}</div>
      <Footer />
    </Fragment>
  );
}

export default DefaultLayout;
