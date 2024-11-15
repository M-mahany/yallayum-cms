import React, { useState } from 'react';
import { IoColorPalette } from 'react-icons/io5';
import ColorPickerPopup from './ColorPickerPopup';

const ColorPickerBttn = ({ setColor, color }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="colorPickerComponent relative my-4 px-4">
      <p>UI Color</p>

      <span
        className="w-10 h-10 rounded-full z-10 bg-slate-900 flex items-center justify-center  cursor-pointer transform transition duration-200 hover:scale-90"
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        <IoColorPalette className="text-white text-2xl" />
      </span>
      {isPopupOpen && <ColorPickerPopup setColor={setColor} setIsPopupOpen={setIsPopupOpen} color={color} />}
    </div>
  );
};

export default ColorPickerBttn;
