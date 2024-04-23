import React from "react";
import "./Sites.css";
import TailwindButton from "../../../components/TailwindButton";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualSite from "./IndividualSite";
import AddOrUpdateSiteModal from "../../../components/modals/AddOrUpdateSiteModal";
import { Site } from "../../../types/SiteManagement/Site";
import { addSite, updateSite } from "../../../adapters/SiteManagementAdapter";

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
    <div className="h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="flex flex-row px-[24px] py-[16px] justify-between">
        <div className="flex font-airbnb font-black text-[24px]">Sites</div>
        <TailwindButton
          onClick={() => {
            setOpen(true);
          }}
          text="Add +"
        />
      </div>
      <div className="flex flex-col p-[8px]">
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
