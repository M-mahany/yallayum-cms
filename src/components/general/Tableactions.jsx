import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";

const PaginationDropDown = ({
  current,
  options,
  isicon,
  label,
 
  setitemPerPage,
 
}) => {
  const [currentSelection, setCurrentSelection] = useState(current);

  const handleAction = (key, label) => {
    setitemPerPage(key);
    setCurrentSelection(key);
  };

  return (
    <div className="Tableactions text-[#737F8B] text-sm font-medium">
      <p>{label}</p>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button
            className="capitalize min-w-36 flex justify-between"
            variant="bordered"
          >
            {currentSelection}
            <RiArrowDropDownLine className="text-lg" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          aria-label="Dropdown menu with shortcut"
          onAction={(key) => handleAction(key)}
        >
          {options.map((item) => (
            <DropdownItem
              key={item.key}
              startContent={
                isicon && (
                  <GoPlus className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                )
              }
              onClick={() => handleAction(item.key)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PaginationDropDown;
