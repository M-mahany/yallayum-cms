import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { LuSearch } from "react-icons/lu";

const Searchdata = ({ filterdata, setSearchFilter }) => {
  const onInputChange = (value) => {
    setSearchFilter(value);
  };

  const removeHtmlTags = (str) => {
    if (!str || typeof str !== "string") return "";
    return str.replace(/<[^>]*>?/gm, "");
  };

  return (
    <div className="text-[#737F8B] text-sm font-medium">
      <p>Search with</p>
      <Autocomplete
        className="max-w-72"
        placeholder="Enter key word"
        aria-label="Single selection example"
        onInputChange={onInputChange}
        disableSelectorIconRotation
        selectorIcon={<LuSearch className="text-2xl" />}
      >
        {filterdata?.map((item) => (
          <AutocompleteItem key={item?.id} onClick={() => null}>
            {removeHtmlTags(item?.name)}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default Searchdata;
