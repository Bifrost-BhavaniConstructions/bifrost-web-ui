import React from "react";
import "./PR.css";
import TailwindButton from "../../../components/TailwindButton";
import AddOrUpdatePurchaseRequestModal from "../../../components/modals/AddOrUpdatePurchaseRequestModal";
import { createPurchaseRequest } from "../../../adapters/SiteManagementAdapter";
import { PurchaseRequestCreateWrapper } from "../../../types/SiteManagement/PurchaseRequest";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualPurchaseRequest from "./IndividualPurchaseRequest";
import Radio from "../../../components/Radio";

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
    <div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
      <div className="flex flex-row px-[24px] py-[16px] justify-between">
        <div className="flex font-airbnb font-black text-[24px]">PRs</div>
        <TailwindButton
          onClick={() => {
            setOpen(true);
          }}
          text="Add +"
        />
      </div>
      <div className="flex flex-col p-[8px]">
        <Radio
          isWrapped={false}
          isHighlighted={true}
          noPadding
          options={[
            {
              text: <div className="flex">Your PRs</div>,
              onClick: () => {
                setCurrentTab(0);
              },
            },
            {
              text: <div className="flex">Approval List</div>,
              onClick: () => {
                setCurrentTab(1);
              },
            },
          ]}
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
