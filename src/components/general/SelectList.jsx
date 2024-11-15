import React from "react";

const SelectList = ({ value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="orderStatus"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Order Status
      </label>
      <div className="relative  max-w-[350px] w-full">
        <select
          id="orderStatus"
          name="orderStatus"
          value={value}
          onChange={onChange}
          className="mt-1  w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md py-4 pl-3 pr-10 appearance-none"
        >
          {options?.map((status) => (
            <option key={status.id} value={status.id}>
              {status.key}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectList;
