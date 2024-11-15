import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { RxDashboard } from "react-icons/rx";
import { dashboard } from "../../assets";
import { IoMdClose } from "react-icons/io";

const SecondSidebar = ({ toggleSidebar, data }) => {
  const itemClasses = {
    base: "py-0 w-full px-0",
    title: "font-normal text-xs text-[#000000] font-medium",
    trigger: "px-0 py-0 h-10 flex items-center rounded-none rounder",
    indicator: "text-medium",
    content: "text-small px-4 py-0 mt-2",
  };

  const location = useLocation();

  return (
    <div className="min-w-[270px] py-4 px-4 bg-white">
      <div className="flex gap-2 flex-col">
        <button
          className="z-[9999] block  p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark md:hidden "
          onClick={toggleSidebar}
        >
          <IoMdClose className="float-right" />
        </button>
        <Link
          to={"/dashboard"}
          className={`${
            location.pathname == "/dashboard"
              ? "bg-themeBtn-0 text-white justify-center "
              : " justify-start "
          }  dash group relative transition-all flex items-center  gap-2.5 text-[#000000] font-medium rounded-md  py-2 mb-2`}
        >
          <RxDashboard className={` ${   location.pathname == "/dashboard"  ? "text-white"  : "text-[#8F8F8F]" }  `} />

          <span className=" ">Dashboard</span>
        </Link>
        <ul className="mb-6 flex flex-col gap-1.5">
          <Accordion
            showDivider={false}
            className="flex flex-col gap-5 w-full max-w-[300px] p-0 border-none px-0"
            itemClasses={itemClasses}
          >
            {data.map((tab) => (
              <AccordionItem
                key={tab.id}
                aria-label={tab.name}
                startContent={tab.icon}
                title={tab.name}
              >
                {tab.subCategories.map((subCategory) => (
                  <Link to={subCategory.link} key={subCategory.name}>
                    <div
                      className={`${
                        location.pathname.includes(subCategory.link)
                          ? "bg-themeBtn-0 text-white justify-center "
                          : "text-xs text-[#8F8F8F] "
                      }  dash group transition-all  relative flex items-center gap-2.5 rounded-md px-2 py-2`}
                    >
                      <span className="rounded-none text-lg">
                        {subCategory.icon}
                      </span>
                      <span className="">{subCategory.name}</span>
                    </div>
                  </Link>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </ul>
      </div>
    </div>
  );
};

export default SecondSidebar;
