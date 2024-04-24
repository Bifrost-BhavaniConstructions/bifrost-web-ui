import React from "react";
import "./IndividualSite.css";
import { Site } from "../../../../types/SiteManagement/Site";

interface IndividualSiteProps {
  site: Site;
  onClick: Function;
}

const IndividualSite: React.FC<IndividualSiteProps> = ({ site, onClick }) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      className="flex w-full flex-col p-[16px] rounded-xl border bg-card text-card-foreground shadow cursor-pointer"
      onClick={() => {
        onClick();
      }}
    >
      <div className="flex font-normal text-[18px]">{site.name}</div>
      <div className="flex font-light text-[14px]">{site.address}</div>
    </div>
  );
};

export default IndividualSite;
