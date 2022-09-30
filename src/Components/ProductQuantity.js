import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProductQuantity(props) {
  const { quantity, increment, decrement, update } = props;
  return (
    <div className="flex items-center border border-spacing-2 border-black">
      <div
        className="border-r border-black leading-4 hover:cursor-pointer hover:text-white hover:bg-black"
        onClick={() => {
          if (quantity <= 1) {
            alert("Sản phẩm ít nhất là 1");
          } else {
            decrement(quantity);
          }
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-minus " className="p-2.5 text-xs" />
      </div>
      <div className="text-center">
        <input
          className="w-full outline-none text-center"
          type="text"
          value={quantity}
          onChange={(e) => update(e.target.value)}
        />
      </div>
      <div
        className="border-l border-black leading-4 hover:cursor-pointer hover:text-white hover:bg-black"
        onClick={() => increment(quantity)}
      >
        <FontAwesomeIcon icon="fa-solid fa-plus " className="p-2.5 text-xs" />
      </div>
    </div>
  );
}
