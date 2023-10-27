import React from "react";
import "./Dock.css";
import { useStoreActions, useStoreState } from "../../store/hooks";
import {
  ArrowsUpDownIcon,
  Bars3Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import SideNav from "../SideNav";
import httpClient from "../../config/AxiosInterceptors";
import { PlatformEnum } from "../../enums/PlatformEnum";
import { useNavigate } from "react-router-dom";

interface SiteManagementNavBarProps {
  platform: PlatformEnum;
}

const Dock: React.FC<SiteManagementNavBarProps> = ({ platform }) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { user } = useStoreState((state) => state.userStore);
  const [navOpened, setNavOpened] = React.useState(false);
  const navigate = useNavigate();
  const { fetchEnquiries, fetchFunctionHalls, fetchEnquiryTypes } =
    useStoreActions((actions) => actions.functionHallStore);

  const fetchUsers = useStoreActions(
    (actions) => actions.peopleStore.fetchUsers,
  );
  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (navOpened) {
      httpClient.get("/auth/pulse");
    }
  }, [navOpened]);

  return (
    <>
      <div className="flex h-[72px] w-[100%] flex-row bg-low-bg rounded-[10px] justify-center items-center">
        <div className="flex flex-grow font-airbnb font-light py-[8px] px-[16px] h-[100%] items-center">
          <div className="flex flex-col">
            <div className="text-[12px]">Welcome,</div>
            <div className="">{user?.nickname}</div>
          </div>
        </div>
        <div className="w-[50px] flex justify-center items-center">
          <div
            className="flex w-[40px] h-[40px] bg-main-bg justify-center items-center rounded-[8px]"
            onClick={() => {
              if (platform === PlatformEnum.FUNCTION_HALL) {
                fetchEnquiries();
                fetchFunctionHalls();
                fetchUsers();
                fetchEnquiryTypes();
                navigate("/function-hall-management");
              } else {
                navigate("/site-management");
              }
            }}
          >
            <HomeIcon className="w-[16px]" />
          </div>
        </div>
        <div className="w-[50px] flex justify-center items-center">
          <div
            className="flex w-[40px] h-[40px] bg-main-bg justify-center items-center rounded-[8px]"
            onClick={() => {
              if (platform === PlatformEnum.SITE) {
                fetchEnquiries();
                fetchFunctionHalls();
                fetchUsers();
                fetchEnquiryTypes();
                navigate("/function-hall-management");
              } else {
                navigate("/site-management");
              }
            }}
          >
            <ArrowsUpDownIcon className="w-[16px]" />
          </div>
        </div>
        <div className="w-[61px] flex justify-start items-center">
          <div
            className="flex w-[40px] ml-[5px] h-[40px] bg-main-bg justify-center items-center rounded-[8px]"
            onClick={() => {
              setNavOpened(true);
            }}
          >
            <Bars3Icon className="w-[24px]" />
          </div>
        </div>
      </div>
      <SideNav
        clicked={navOpened}
        setClicked={setNavOpened}
        platform={platform}
      />
    </>
  );
};

export default Dock;
