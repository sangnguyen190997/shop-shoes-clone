import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../services/API/CategoriesApi";

export default function ColorsFilter(props) {
  const { onChange, filters } = props;
  const coLorList = useSelector((state) => state.product.products?.allProduct);
  const [colors, setColors] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getListCategory(dispatch);
  }, []);

  useEffect(() => {
    onChange(colorFilter);
  }, [colorFilter]);

  useEffect(() => {
    setColorFilter([]);
  }, [filters.active]);

  coLorList?.map((item) => {
    if (!colors.includes(item.color)) {
      colors.push(item.color);
    }
  });

  const handleColorChange = (newColor) => {
    setColorFilter((pre) => {
      if (colorFilter.includes(newColor)) {
        return pre.filter((item) => item !== newColor);
      } else {
        return [...pre, newColor];
      }
    });
  };

  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mt-3">MÀU SẮC</h6>
      <div>
        {colors?.map((color) => {
          return (
            <label key={color} className="checkbox-container">
              <input
                type="checkbox"
                onChange={() => handleColorChange(color)}
                checked={colorFilter.includes(color)}
              />
              <span className="checkmark"></span>
              {`Màu ${color}`}
            </label>
          );
        })}
      </div>
    </div>
  );
}
