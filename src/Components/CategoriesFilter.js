import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../services/API/CategoriesApi";

export default function CategoriesFilter(props) {
  const { onChange, filters } = props;
  const [categoryId, setCategoryId] = useState([]);
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.category.categories.allCategory
  );

  useEffect(() => {
    getListCategory(dispatch);
  }, []);

  useEffect(() => {
    onChange(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setCategoryId([]);
  }, [filters.active]);

  const handleChangeCategory = (id) => {
    setCategoryId((prev) => {
      if (categoryId.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium">DANH MỤC</h6>
      {categories?.map((item) => {
        return (
          <label key={item.id} className="checkbox-container">
            <input
              type="checkbox"
              onChange={() => handleChangeCategory(item.id)}
              checked={categoryId.includes(item.id)}
            />
            <span className="checkmark"></span>
            {item.name}
          </label>
        );
      })}
    </div>
  );
}
