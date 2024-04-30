import React from "react";
import "./Home.css";
import TailwindButton from "../../../components/TailwindButton";
import CashAccountOverview from "./CashAccountOverview";
import Radio from "../../../components/Radio";
import { AssetTypeEnum } from "../../../enums/AssetTypeEnum";
import TabSelect from "@/components/TabSelect";
import IndividualVehicle from "@/pages/SiteManagement/Assets/IndividualVehicle";
import { useStoreState } from "@/store/hooks";
import IndividualCard from "@/pages/SiteManagement/Assets/IndividualCard";
import IndividualPhone from "@/pages/SiteManagement/Assets/IndividualPhone";
import AssetOverview from "@/pages/SiteManagement/Assets/AssetOverview";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Objects
  const quickActions = [
    {
      text: "Manage Assets",
      onClick: () => {},
    },
    {
      text: "Manage Employees",
      onClick: () => {},
    },
    {
      text: "Mark Attendance",
      onClick: () => {},
    },
  ];

  // Functions

  const { user } = useStoreState((state) => state.userStore);

  // Hook Functions
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col p-[8px] pb-0 pt-[16px] justify-between">
        <CashAccountOverview />
      </div>
      <div className="flex flex-col flex-grow flex-1 p-[8px]">
        <div className="flex px-[16px] font-bold">Assets</div>
        <AssetOverview user={user} />
      </div>
    </div>
  );
};

export default Home;
