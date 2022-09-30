import React from "react";
import CategoriesFilter from "./CategoriesFilter";
import ColorsFilter from "./ColorsFilter";
import SizeFilter from "./SizeFilter";

export default function ProductsFilter(props) {
  const { onChange, filters } = props;

  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      categoryIds: newCategoryId,
      active: true,
    };
    onChange(newFilters);
  };

  const handleColorChange = (newColor) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      colors: newColor,
      active: true,
    };
    onChange(newFilters);
  };

  const handleSizeChange = (newSize) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      size: newSize,
      active: true,
    };
    onChange(newFilters);
  };

  const handleRemoveFilters = () => {
    const newFilters = {
      categoryIds: [],
      size: [],
      colors: [],
      active: false,
    };
    onChange(newFilters);
  };

  return (
    <div>
      <CategoriesFilter onChange={handleCategoryChange} filters={filters} />
      <SizeFilter onChange={handleSizeChange} filters={filters} />
      <ColorsFilter onChange={handleColorChange} filters={filters} />
      <button
        onClick={handleRemoveFilters}
        className="text-sm hover:cursor-pointer hover:opacity-70 bg-amber-300 hover:bg-amber-700 text-white font-bold mt-5 py-2 px-4 rounded "
      >
        Xóa Tất Cả
      </button>
    </div>
  );
}
