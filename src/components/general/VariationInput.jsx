import React from "react";

const VariationInput = ({ type ,placeholder, value, name, handleInputChange, label , index}) => {
  return (
    <div className="w-full flex flex-col gap-3">
        <p>{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(index, name, e.target.value)}
        className=" py-3 border-1 border-black rounded-md px-3"
      />
    </div>
  );
};

export default VariationInput;
