import React from "react";
import ButtonComponent from "./ButtonComponent";
import { DateRangePicker } from "@nextui-org/react";

const Filterbar = ({ setValue, value, setChoice, choice }) => {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-2 ">
      <div className=" grid grid-col-1 gap-2 sm:flex flex-wrap sm:gap-4 cursor-pointer">
        <ButtonComponent
          btnclass="hover:bg-themeBtn-0 hover:text-white"
          text="Overall"
          isActive={choice === 1}
          onClick={() => setChoice(1)}
        />
        <ButtonComponent
          btnclass="hover:bg-themeBtn-0 hover:text-white"
          text="Today"
          isActive={choice === 2}
          onClick={() => setChoice(2)}
        />
        <ButtonComponent
          btnclass="hover:bg-themeBtn-0 hover:text-white"
          text="Weekly"
          isActive={choice === 3}
          onClick={() => setChoice(3)}
        />
        <ButtonComponent
          btnclass="hover:bg-themeBtn-0 hover:text-white"
          text="Monthly"
          isActive={choice === 4}
          onClick={() => setChoice(4)}
        />
      </div>
      <div className="flex justify-start md:justify-end">
        <div className="w-full max-w-2xl grid grid-col-1   ">
          <div className="w-full grid grid-cols-1 md:flex gap-1 items-center ">
            <DateRangePicker
              label="Date range "
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
