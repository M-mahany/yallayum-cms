import React from "react";

const OrderItem = ({ item }) => (
  <div className="flex justify-between items-center gap-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl w-full py-4 px-6 shadow-lg mb-4">
    <div className="flex items-center gap-4">
      <img
        src={item?.imageUrl}
        alt={item?.name}
        className="w-16 h-16 object-cover rounded-lg shadow-md"
      />
      <div>
        <p className="text-white text-lg font-semibold">{item?.name}</p>
        {item?.quantity && (
          <p className="text-white text-md font-light">
            Quantity: {item?.quantity}
          </p>
        )}
        {item?.grams && (
          <p className="text-white text-md font-light">
            Total Grams: {item?.grams}g
          </p>
        )}
      </div>
    </div>
    <div>
      <p className="text-white text-lg font-semibold">Price :  AED{item?.price}</p>
      {item?.subTotal && (
        <p className="text-white text-lg font-semibold">
          SubTotal: AED{item?.subTotal}
        </p>
      )}
    </div>
  </div>
);

export default OrderItem;
