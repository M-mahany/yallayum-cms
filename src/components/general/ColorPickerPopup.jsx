import React, { useEffect, useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';

const tabs = [
  {
    id: 1,
    name: 'Preset',
  },
  {
    id: 2,
    name: 'Custom',
  },
];

const presetColors = ['#e9ddeb', '#faf1dc', '#ffe9e9', '#fff4d4', '#ffdbee'];

const ColorPickerPopup = ({ setColor, setIsPopupOpen, color }) => {
  const [activeTab, setActiveTab] = useState('Preset');
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSubmitColor = () => {
    setColor(selectedColor);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    setSelectedColor(color);
    if (color) {
      if (presetColors.includes(color)) {
        setActiveTab('Preset');
      } else {
        setActiveTab('Custom');
      }
    }
  }, [color]);
  return (
    <div className="absolute top-[100%] bg-slate-900 rounded-xl w-72 min-h-[176px] p-4 mt-2 flex flex-col gap-4">
      <div className="flex">
        {tabs.map((tab) => (
          <span
            onClick={() => setActiveTab(tab.name)}
            className={`py-1 px-4 flex items-center justify-center text-white rounded-lg cursor-pointer ${
              activeTab === tab.name ? 'border-1' : ''
            }`}
          >
            {tab.name}
          </span>
        ))}
      </div>
      {activeTab === 'Preset' && (
        <div className="flex gap-6 flex-col">
          <div className="flex gap-2">
            {presetColors.map((color) => (
              <span
                onClick={() => setSelectedColor(color)}
                className={`flex items-center justify-center rounded-full w-8 h-8 cursor-pointer ${
                  selectedColor === color ? 'border-4 border-blue-500' : ''
                }`}
              >
                <span
                  className="flex w-full h-full rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 justify-center items-center border-1 rounded-lg px-2 py-1 w-fit">
              <p className="text-[#a2a1a1]">Hex:</p>
              <input
                value={selectedColor}
                type="text"
                className="bg-transparent text-white w-16 font-semibold"
                disabled
              />
            </div>
            <span
              className={`rounded-full w-8 h-8 flex justify-center items-center transform transition duration-200 ${
                selectedColor
                  ? 'bg-[#4CAF50] cursor-pointer hover:scale-90'
                  : 'bg-gray-400 opacity-50 pointer-events-none'
              }`}
              onClick={selectedColor ? handleSubmitColor : undefined}
            >
              <IoCheckmarkOutline className="text-white text-2xl" />
            </span>
          </div>
        </div>
      )}
      {activeTab === 'Custom' && (
        <div className="flex gap-6 flex-col justify-between">
          <input type="color" onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor} />
          <div className="flex justify-between items-center">
            <div className="flex gap-2 justify-center items-center border-1 rounded-lg px-2 py-1 w-fit">
              <p className="text-[#a2a1a1]">Hex:</p>
              <input
                value={selectedColor}
                type="text"
                className="bg-transparent text-white w-16 font-semibold"
                disabled
              />
            </div>
            <span
              className={`rounded-full w-8 h-8 flex justify-center items-center transform transition duration-200 ${
                selectedColor
                  ? 'bg-[#4CAF50] cursor-pointer hover:scale-90'
                  : 'bg-gray-400 opacity-50 pointer-events-none'
              }`}
              onClick={selectedColor ? handleSubmitColor : undefined}
            >
              <IoCheckmarkOutline className="text-white text-2xl" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPickerPopup;
