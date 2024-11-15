import { Image } from "@nextui-org/react";
import React from "react";
import { allusericon, revenueicon } from "../../assets";
import { LiaIdCard } from "react-icons/lia";
import { PiUsers } from "react-icons/pi";
import { FaStore } from "react-icons/fa";
import { MdCoffeeMaker } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Overview = ({ dashboardData }) => {
  return (
    <div className="Overview mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <div className="broder rounded-lg border group   hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
              Orders
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              {dashboardData?.totalOrders}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <FaStore className="group-hover:text-white text-[#8F8F8F] text-4xl md:text-5xl" />
          </div>
        </div>
        <div className="broder rounded-lg border group   hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
              Make Your Mix
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              {dashboardData?.totalCustomOrders}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <MdCoffeeMaker className="group-hover:text-white text-[#8F8F8F] text-4xl md:text-5xl" />
          </div>
        </div>
        <div className="broder rounded-lg border group   hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
              Members
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              {dashboardData?.totalUsers}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <FaUser className="group-hover:text-white text-[#8F8F8F] text-4xl md:text-5xl" />
          </div>
        </div>
        <div className="broder rounded-lg border group   hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4"></p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              $ {dashboardData?.revenue}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <FaMoneyBillTrendUp className="group-hover:text-white text-[#8F8F8F] text-4xl md:text-5xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
