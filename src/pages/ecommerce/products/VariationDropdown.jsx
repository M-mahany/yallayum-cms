import React from "react";

const CategoryDropdown = ({ categories, onChange, defaultValue }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <p>Category</p>
      <select
        id="category"
        name="category"
        className="py-3 border-1 border-black rounded-md px-3"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <option value="">Select a category...</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
