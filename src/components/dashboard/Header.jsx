import React from "react";
import CustomLinkComp from "../general/CustomLinkComp";

const Header = ({ pagetitle, previous, currentpage, btntext, btnlink }) => {
   
  return (
    <header className=" top-0 z-999 flex w-full bg-transparent shadow-1 dark:bg-boxdark dark:drop-shadow-none z-[9999]">
      <div className="flex flex-grow items-center justify-between shadow-2 flex-row">
        <div className="flex items-center gap-3 2xsm:gap-7">
          <h4 className="capitalize text-2xl">
            {pagetitle}{" "}
            {previous && (
              <>
                <span className="text-[#B8B8B8] text-sm capitalize md:ml-4">
                  {previous} /{" "}
                </span>
                <span className="text-sm capitalize text-black">
                  {currentpage}
                </span>
              </>
            )}
          </h4>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {btntext && <CustomLinkComp btntext={btntext} btnlink={btnlink} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
