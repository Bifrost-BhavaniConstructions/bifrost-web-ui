import React from "react";
import "./Sites.css";
import TailwindButton from "../../../components/TailwindButton";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualSite from "./IndividualSite";
import AddOrUpdateSiteModal from "../../../components/modals/AddOrUpdateSiteModal";
import { Site } from "../../../types/SiteManagement/Site";
import { addSite, updateSite } from "../../../adapters/SiteManagementAdapter";
import { Button } from "@/components/ui/button";

interface PRProps {}

const Sites: React.FC<PRProps> = () => {
  // Objects
  const { sites } = useStoreState((state) => state.siteManagementStore);
  const { fetchSites } = useStoreActions(
    (actions) => actions.siteManagementStore,
  );
  // Variables

  // State Variables - Hooks
  const [open, setOpen] = React.useState(false);
  const [editSite, setEditSite] = React.useState<Site | undefined>();

  // Functions
  const closeModal = () => {
    setOpen(false);
    setEditSite(undefined);
  };
  const addOrUpdateSite = (site: Site) => {
    if (!site._id) {
      addSite(site).then(() => {
        fetchSites();
        closeModal();
      });
    } else {
      updateSite(site).then(() => {
        fetchSites();
        closeModal();
      });
    }
  };

  return (
    <div className="h-full w-full p-[16px] overflow-y-auto overflow-x-hidden">
      <div className="flex px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex flex-grow font-airbnb font-black justify-center items-center text-center text-[24px] ">
          Sites
        </div>
        <div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Add +
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:p-[24px] gap-[10px]">
        {sites.map((site) => (
          <IndividualSite
            site={site}
            onClick={() => {
              setEditSite(site);
            }}
          />
        ))}
      </div>
      <AddOrUpdateSiteModal
        open={open || !!editSite}
        closeCallback={() => {
          closeModal();
        }}
        cta={addOrUpdateSite}
        editSite={editSite}
      />
    </div>
  );
};

export default Sites;
