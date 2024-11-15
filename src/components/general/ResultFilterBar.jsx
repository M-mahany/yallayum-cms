import React, { useState } from "react";
import Searchdata from "./Searchdata";
import PaginationDropDown from "./Tableactions";
import { bulkactionsids } from "../../data/bulkactionsids";
import { itemcount } from "../../data/itemcount";

const ResultFilterBar = ({
   
  setitemPerPage,
  setfilterdata,
  filterdata,
  setSearchFilter
}) => {

 
  return (
    <div className="ResultFilterBar">
      <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-2 ">
        <div className="  flex justify-start">
          <Searchdata filterdata={filterdata} setSearchFilter={setSearchFilter} />
        </div>
        <div className=" flex justify-start md:justify-end gap-2">
          <PaginationDropDown
            current={"10"}
            isicon={false}
            options={itemcount}
            label={"Result Per Page"}
            setitemPerPage={setitemPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultFilterBar;
