import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct } from "../services/API/ProductsApi";

export default function SizeFilter(props) {
  const { onChange, filters } = props;
  const dispatch = useDispatch();
  const [size, setSize] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const sizeList = useSelector((state) => state.product.products?.allProduct);

  useEffect(() => {
    getListProduct(dispatch);
  }, []);

  useEffect(() => {
    onChange(sizeFilter);
  }, [sizeFilter]);

  useEffect(() => {
    setSizeFilter([]);
  }, [filters.active]);

  sizeList?.map((item) => {
    if (!size.includes(item.size)) {
      size.push(item.size);
    }
  });

  const handleChangeSize = (size) => {
    setSizeFilter((pre) => {
      if (sizeFilter.includes(size)) {
        return pre.filter((item) => item !== size);
      } else {
        return [...pre, size];
      }
    });
  };

  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mt-3">KÍCH THƯỚC</h6>
      {size?.map((item, index) => {
        return (
          <label key={index} className="checkbox-container">
            <input
              type="checkbox"
              onChange={() => handleChangeSize(item)}
              checked={sizeFilter.includes(item)}
            />
            <span className="checkmark"></span>
            {item}
          </label>
        );
      })}
    </div>
  );
}
