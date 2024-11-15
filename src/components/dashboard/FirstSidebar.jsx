import {  Tooltip } from "@nextui-org/react";
import React from "react";
import { blackLogo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
 import { RiShutDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { deleteCookie } from "../../hooks/useCookies";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";


const FirstSidebar = ({ setChoice, choice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    deleteCookie("token");
    navigate("/");
  };
  return (
    <div className="setting-side-bar shadow-lg z-20 min-w-[60px] py-4 px-3   bg-white flex flex-col justify-between">
      <div>
        <div className="logo pb-3">
          <img
            src={blackLogo}
            alt={"dashboardlogo"}
            width={70}
            height={70}
            className="max-w-[70px] w-full"
          />
        </div>
        <div className="btn-list">
          <ul className="flex flex-col mt-5 gap-3 px-1">
            <Tooltip
              placement="right-start"
              content="Management "
              className="bg-themeBtn-0 text-white"
            >
              <li onClick={() => setChoice(1)}>
                <Link to="#">
                  <RiHomeLine
                    className={`w-full max-w-[80px] h-[40px]   text-[2.50rem] ${
                      choice === 1
                        ? "bg-themeBtn-0 text-white hover:text-themeSecondry-0 rounded-lg "
                        : ""
                    }   py-1 px-1`}
                  />
                </Link>
              </li>
            </Tooltip>
            <Tooltip
              placement="right-start"
              content="Store"
              className="bg-themeBtn-0 text-white"
            >
              <li onClick={() => setChoice(3)}>
                <Link to="#">
                  <HiOutlineBuildingStorefront   
                    className={`w-full max-w-[80px] h-[40px]  text-[2.50rem] ${
                      choice === 3
                        ? "bg-themeBtn-0 text-white hover:white rounded-lg "
                        : ""
                    }   py-1 px-1`}
                  />
                </Link>
              </li>
            </Tooltip>
            <Tooltip
              placement="right-start"
              content="Account setting"
              className="bg-themeBtn-0 text-white"
            >
              <li onClick={() => setChoice(2)}>
                <Link to="#">
                  <FaRegUser 
                    className={`w-full font-bold max-w-[80px] h-[40px]  text-[2.50rem] ${
                      choice === 2
                        ? "bg-themeBtn-0 text-white hover:hover:white rounded-lg "
                        : ""
                    }   py-1 px-1`}
                  />
                </Link>
              </li>
            </Tooltip>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Tooltip placement="right-start" content="Log Out" color="warning" className="text-white">
          <button onClick={handleLogout} className="h-full ">
            <RiShutDownLine 
              className={`w-full h-full text-themeBtn-0 mx-auto   max-w-[60px] text-[2rem]    py-1 px-1`}
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default FirstSidebar;
