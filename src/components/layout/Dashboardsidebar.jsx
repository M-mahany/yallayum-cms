import React, { useEffect, useState } from "react";
import FirstSidebar from "../dashboard/FirstSidebar";
import SecondSidebar from "../dashboard/SecondSidebar";
 import { tabsdata } from "../../data/tabsdata";
import { settingData } from "../../data/settingData";
import { ecommerceData } from "../../data/ecommerceData";

const Dashboardsidebar = ({ toggleSidebar }) => {
  const [choice, setChoice] = useState(1);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (choice === 1) {
      setData(tabsdata);
    } else if (choice === 2) {
      setData(settingData);
    } else if (choice === 3) {
      setData(ecommerceData);
    }
  }, [choice]);
  return (
    <>
      <div className="main-sidebar flex flex-wrap h-screen">
        <FirstSidebar setChoice={setChoice} choice={choice} />
        {data && <SecondSidebar data={data} toggleSidebar={toggleSidebar} />}
      </div>
    </>
  );
};

export default Dashboardsidebar;
