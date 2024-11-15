import React from 'react'

const IngredientsInput = ({ type ,placeholder, value, name, handleInputChangeIngredients, label , index})=> {
  return (
    <div className="w-full flex flex-col gap-3">
    <p>{label}</p>
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => handleInputChangeIngredients(index, name, e.target.value)}
    className=" py-3 border-1 border-black rounded-md px-3"
  />
</div>
  )
}

export default IngredientsInput
