import React from "react";
import BestSale from "../Components/BestSale";
import ProductTrending from "../Components/ProductTrending";
import Videobg from "../Components/Videobg";

export default function Home() {
  return (
    <div className="my-16 lg:my-20">
      <Videobg />
      <div className="container px-4 lg:px-8 mx-auto">
        <BestSale />
        <ProductTrending />
      </div>
    </div>
  );
}
