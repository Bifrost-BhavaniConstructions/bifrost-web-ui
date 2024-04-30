import React from "react";
import "./PR.css";
import TailwindButton from "../../../components/TailwindButton";
import AddOrUpdatePurchaseRequestModal from "../../../components/modals/AddOrUpdatePurchaseRequestModal";
import { createPurchaseRequest } from "../../../adapters/SiteManagementAdapter";
import { PurchaseRequestCreateWrapper } from "../../../types/SiteManagement/PurchaseRequest";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualPurchaseRequest from "./IndividualPurchaseRequest";
import Radio from "../../../components/Radio";
import TabSelect from "@/components/TabSelect";
import { Button } from "@/components/ui/button";

interface PRProps {}

const PR: React.FC<PRProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [open, setOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);
  const { user } = useStoreState((state) => state.userStore);
  const { myPurchaseRequests, myPendingPurchaseRequests } = useStoreState(
    (state) => state.siteManagementStore,
  );
  const { fetchPurchaseRequests } = useStoreActions(
    (state) => state.siteManagementStore,
  );

  // Functions

  const addPurchaseRequest = async (
    purchaseRequest: PurchaseRequestCreateWrapper,
  ) => {
    await createPurchaseRequest({ ...purchaseRequest, createdBy: user!._id! });
    fetchPurchaseRequests(user!._id!);
    setOpen(false);
  };

  // Hook Functions

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden p-[16px]">
      <div className="flex px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex flex-grow font-airbnb font-black justify-center items-center text-center text-[24px] ">
          PRs
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
      <div className="flex flex-col p-[8px]">
        <TabSelect
          options={[
            {
              text: <div className="flex">Your PRs</div>,
            },
            {
              text: <div className="flex">Approval List</div>,
            },
          ]}
          tabIndex={currentTab}
          setTabIndex={setCurrentTab}
        />
      </div>
      <div className="flex flex-col p-[8px]">
        {(currentTab === 0
          ? myPurchaseRequests
          : myPendingPurchaseRequests
        ).map((pR) => (
          <IndividualPurchaseRequest
            key={pR._id}
            purchaseRequest={pR}
            isForApproval={currentTab === 1}
          />
        ))}
      </div>

      <AddOrUpdatePurchaseRequestModal
        open={open}
        closeCallback={() => {
          setOpen(false);
        }}
        cta={(pR) => addPurchaseRequest(pR as PurchaseRequestCreateWrapper)}
      />
    </div>
  );
};

export default PR;
