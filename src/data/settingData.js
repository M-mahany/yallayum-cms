import { CgProfile } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";

const settingData = [
  {
    id: 1,
    no: 1,
    icon: <CgProfile className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Profile",
    link: "/profile",

    subCategories: [
      {
        icon: (
          <CgFileDocument className="" />
        ),

        name: "My Details",
        link: "profile/details",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Update Details ",
        link: "profile/update",
      },
      {
        icon: <MdSecurity className="" />,
        name: "Security",
        link: "profile/password",
      },
    ],
  },
];
export { settingData };
