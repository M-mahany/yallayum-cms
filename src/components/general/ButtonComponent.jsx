import { Button } from "@nextui-org/react";
import React from "react";

const ButtonComponent = ({
  loading,
  text,
  isActive,
  onClick,
  btnclass,
  type,
}) => {
  return (
    <div className="btn-com">
      {" "}
      <Button
        type={type}
        className={`w-full text-white text-sm font-medium py-6 border ${
          isActive
            ? "bg-themeBtn-0"
            : "bg-transparent text-[#8F8F8F] border-[#8F8F8F] cursor-pointer"
        } ${btnclass}`}
        onClick={onClick}
        isLoading={loading}
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonComponent;
