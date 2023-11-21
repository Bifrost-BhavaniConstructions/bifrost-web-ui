import React from "react";
import "./AddOrUpdateSiteModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { Site } from "../../../types/SiteManagement/Site";

interface AddOrUpdateSiteModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (site: Site) => void;
  editSite?: Site;
}

const AddOrUpdateSiteModal: React.FC<AddOrUpdateSiteModalProps> = ({
  closeCallback,
  open,
  cta,
  editSite,
}) => {
  // Objects
  const emptySite: Site = {
    name: "",
    address: "",
  };

  // Variables
  const [site, setSite] = React.useState(emptySite);
  // Functions
  const validateSite: () => boolean = () => {
    return site.name !== "" && site.address !== "";
  };

  // Hook Functions
  React.useEffect(() => {
    if (editSite) {
      setSite(editSite);
    }
  }, [editSite]);

  return (
    <ChakraModal
      closeCallback={() => {
        setSite(emptySite);
        closeCallback();
      }}
      open={open}
      title={"Add Site"}
      action={() => {
        cta(site);
      }}
      actionText={"Submit"}
      isButtonDisabled={!validateSite()}
    >
      <LabelledInput
        required
        name={"name"}
        value={site.name}
        setValue={(_val: string) => {
          setSite({ ...site, name: _val });
        }}
      />
      <LabelledInput
        required
        name={"address"}
        value={site.address}
        setValue={(_val: string) => {
          setSite({ ...site, address: _val });
        }}
      />
    </ChakraModal>
  );
};

export default AddOrUpdateSiteModal;
