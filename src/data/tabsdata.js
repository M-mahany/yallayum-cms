import { LiaBlogSolid } from "react-icons/lia";
import { IoFastFood } from "react-icons/io5";
import { BiSolidSticker } from "react-icons/bi";

import { CgWebsite } from "react-icons/cg";

const tabsdata = [
  {
    id: 4,
    no: 4,
    icon: <CgWebsite className="text-themeBtn-0  rounded-none text-2xl" />,
    name: "Things To Know",
    link: "/",

    subCategories: [
      {
        icon: <LiaBlogSolid className="" />,
        name: "Blogs",
        link: "/dashboard/management/blogs",
      },
      {
        icon: <IoFastFood className="" />,
        name: "Recipes",
        link: "/dashboard/management/recipes",
      },
      {
        icon: <BiSolidSticker className="" />,
        name: "Ticker",
        link: "/dashboard/management/ticker",
      },
    ],
  },
  
];
export { tabsdata };
