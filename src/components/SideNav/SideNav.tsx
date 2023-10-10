import React from "react";
import "./SideNav.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useStoreActions } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { PlatformEnum } from "../../enums/PlatformEnum";

interface SideNavProps {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
  platform: PlatformEnum;
}

const SideNav: React.FC<SideNavProps> = ({ clicked, setClicked, platform }) => {
  // Objects
  const { logoutUser } = useStoreActions((actions) => actions.userStore);
  const siteManagementHeader = [
    {
      label: "Home",
      url: "/site-management/",
    },
    {
      label: "Cash Accounts",
      url: "/site-management/cash-account",
    },
    {
      label: "Attendance",
      url: "/site-management/attendance",
    },
    {
      label: "Assets",
      url: "/site-management/assets",
    },
    {
      label: "Sites",
      url: "/site-management/sites",
    },
    {
      label: "People",
      url: "/site-management/people",
    },
    {
      label: "PRs",
      url: "/site-management/pr",
    },
    {
      label: "Pending Actions",
      url: "/site-management/pending-actions",
    },
    {
      label: "Manage System",
      url: "/site-management/manage-system",
    },
  ];
  const functionHallManagementHeader = [
    {
      label: "Home",
      url: "/function-hall-management/",
    },
    {
      label: "Cash Accounts",
      url: "/function-hall-management/cash-account",
    },
    {
      label: "People",
      url: "/function-hall-management/people",
    },
  ];
  const footer = [
    {
      label: "Logout",
      action: () => {
        logoutUser();
      },
    },
  ];
  const navigate = useNavigate();

  //Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      className={
        clicked
          ? "absolute bg-main-bg right-0 top-0 overflow-x-hidden p-2 flex-col h-[100%] open-nav"
          : "absolute bg-main-bg right-0 top-0 h-[100%] overflow-x-hidden hidden p-2 flex-col close-nav"
      }
    >
      <div className="flex h-[72px] w-[100%] flex-row bg-main-bg rounded-[10px] justify-center items-center">
        <div className="flex flex-grow font-airbnb font-light py-[8px] px-[16px] h-[100%] items-center" />
        <div className="w-[72px] flex justify-center items-center">
          <div
            className="flex w-[40px] h-[40px] bg-low-bg justify-center items-center rounded-[8px]"
            onClick={() => {
              setClicked(false);
            }}
          >
            <XMarkIcon className="w-[24px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-[8px] justify-center items-center">
        {(platform === PlatformEnum.SITE
          ? siteManagementHeader
          : functionHallManagementHeader
        ).map((headerItem) => (
          <div
            key={headerItem.url}
            className="font-airbnb font-medium p-[16px]"
            onClick={() => {
              setClicked(false);
              navigate(headerItem.url);
            }}
          >
            {headerItem.label}
          </div>
        ))}
      </div>
      <div className="flex h-[72px] items-center font-airbnb font-normal text-[16px] justify-center flex-col">
        {footer.map((item) => (
          <div
            key={item.label}
            className="flex justify-center"
            onClick={() => {
              item.action();
            }}
          >
            <div className="flex justify-center px-[32px] py-[8px] bg-low-bg rounded-[4px]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
