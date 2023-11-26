import React from "react";
import "./Home.css";
import TailwindButton from "../../../components/TailwindButton";
import CashAccountOverview from "./CashAccountOverview";
import Radio from "../../../components/Radio";
import { AssetTypeEnum } from "../../../enums/AssetTypeEnum";

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

  // Variables

  // State Variables - Hooks
  const [currentAsset, setCurrentAsset] = React.useState<AssetTypeEnum>(
    AssetTypeEnum.VEHICLE,
  );

  // Functions

  // Hook Functions

  return (
    <div className="flex flex-col h-[calc(100%-88px)] overflow-y-auto overflow-x-hidden">
      <div className="flex flex-row px-[24px] py-[16px] pb-0 pt-0 pr-0 justify-between">
        <div className="w-[40px]"></div>
        <div className="flex w-[calc(100%-40px)] bg-low-bg py-[16px] flex-col rounded-l-[16px]">
          <div className="flex px-[16px] font-bold">Quick Actions</div>
          <div className="flex pl-[16px] flex-row mt-[8px] max-w-[100%] overflow-x-auto shrink-0 no-scrollbar">
            {quickActions.map((qA) => (
              <TailwindButton
                className="min-w-[150px] bg-main-bg py-[8px] mr-[12px] justify-center"
                text={qA.text}
                onClick={qA.onClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-[8px] pb-0 pt-[16px] justify-between">
        {/*  <div>Cash Account Overview</div>*/}
        <CashAccountOverview />
      </div>
      <div className="flex flex-col flex-grow flex-1 p-[8px]">
        <div className="flex px-[16px] font-bold">Assets</div>
        <Radio
          isWrapped={false}
          isHighlighted={true}
          noPadding
          options={[
            {
              text: <div className="flex">Vehicles</div>,
              onClick: () => {
                setCurrentAsset(AssetTypeEnum.VEHICLE);
              },
            },
            {
              text: <div className="flex">Cards</div>,
              onClick: () => {
                setCurrentAsset(AssetTypeEnum.CARD);
              },
            },
            {
              text: <div className="flex">Phones</div>,
              onClick: () => {
                setCurrentAsset(AssetTypeEnum.PHONE);
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
