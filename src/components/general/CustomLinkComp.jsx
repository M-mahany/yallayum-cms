import React from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const CustomLinkComp = ({ btntext, btnlink }) => {
  return (
    <div className="CustomLinkComp">
      <Link
        to={btnlink}
        className="bg-themeBtn-0 py-4 px-2 rounded-lg min-w-[170px] flex items-center justify-center text-center text-white font-medium capitalize gap-1"
      >
        <GoPlus className="text-xl" />
        {btntext}
      </Link>
    </div>
  );
};

export default CustomLinkComp;
