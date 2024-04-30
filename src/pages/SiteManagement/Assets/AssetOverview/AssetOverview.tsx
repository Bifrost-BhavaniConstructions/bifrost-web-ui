import TabSelect from "@/components/TabSelect";
import { AssetTypeEnum } from "@/enums/AssetTypeEnum";
import IndividualVehicle from "@/pages/SiteManagement/Assets/IndividualVehicle";
import IndividualCard from "@/pages/SiteManagement/Assets/IndividualCard";
import IndividualPhone from "@/pages/SiteManagement/Assets/IndividualPhone";
import React from "react";
import { useStoreState } from "@/store/hooks";
import { User } from "@/types/User";

const AssetOverview = ({ user }: { user: User | null }) => {
  // Variables
  const { vehicles, phones, cards } = useStoreState(
    (state) => state.siteManagementStore,
  );

  // State Variables - Hooks
  const [currentAsset, setCurrentAsset] = React.useState<AssetTypeEnum>(
    AssetTypeEnum.VEHICLE,
  );
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className="flex w-full justify-center items-center flex-col">
      <TabSelect
        options={[
          {
            text: <div className="flex">Vehicles</div>,
            onClick: () => {
              setCurrentAsset(AssetTypeEnum.VEHICLE);
              setTabIndex(0);
            },
            index: 0,
          },
          {
            text: <div className="flex">Cards</div>,
            onClick: () => {
              setCurrentAsset(AssetTypeEnum.CARD);
              setTabIndex(1);
            },
            index: 1,
          },
          {
            text: <div className="flex">Phones</div>,
            onClick: () => {
              setCurrentAsset(AssetTypeEnum.PHONE);
              setTabIndex(2);
            },
            index: 2,
          },
        ]}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        handleClick
      />
      <div className="flex flex-col w-full p-[8px]">
        {currentAsset === AssetTypeEnum.VEHICLE && (
          <div className="flex flex-col p-[8px]">
            {vehicles
              .filter((v) => v.assignedTo?._id === user!._id)
              .map((vehicle) => (
                <IndividualVehicle
                  key={vehicle._id}
                  vehicle={vehicle}
                  readonly
                  onClick={() => {}}
                  reassignFunction={() => {}}
                />
              ))}
          </div>
        )}
        {currentAsset === AssetTypeEnum.CARD && (
          <div className="flex flex-col p-[8px]">
            {cards
              .filter((v) => v.assignedTo?._id === user!._id)
              .map((card) => (
                <IndividualCard
                  key={card._id}
                  card={card}
                  readonly
                  onClick={() => {}}
                  reassignFunction={() => {}}
                />
              ))}
          </div>
        )}
        {currentAsset === AssetTypeEnum.PHONE && (
          <div className="flex flex-col p-[8px]">
            {phones
              .filter((v) => v.assignedTo?._id === user!._id)
              .map((phone) => (
                <IndividualPhone
                  key={phone._id}
                  phone={phone}
                  readonly
                  onClick={() => {}}
                  reassignFunction={() => {}}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetOverview;
