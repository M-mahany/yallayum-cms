import React, { useState } from "react";
import Dashboardsidebar from "./Dashboardsidebar";
import Bodyarea from "./Bodyarea";
import { GiHamburgerMenu } from "react-icons/gi";

const RootLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="dashboard flex h-screen overflow-hidden relative">
      <button
        onClick={toggleSidebar}
        className="absolute z-[998] right-5 top-2  rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark block lg:hidden"
      >
        <GiHamburgerMenu />
      </button>
      <div
        className={`absolute left-0 top-0 z-10   flex h-screen w-72.5 flex-col overflow-y-hidden  duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Dashboardsidebar toggleSidebar={toggleSidebar} />
      </div>
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100 px-4 py-4">
        {/* <Header /> */}
        <Bodyarea />
      </div>
    </div>
  );
};

export default RootLayout;
