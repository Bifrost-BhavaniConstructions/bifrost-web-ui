import React from "react";
import "./IndividualPurchaseRequest.css";
import {
  Step,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { CheckBadgeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  CheckIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { PurchaseRequest } from "../../../../types/SiteManagement/PurchaseRequest";
import { PurchaseRequestStatusEnum } from "../../../../enums/PurchaseRequestStatusEnum";
import AddOrUpdatePurchaseRequestModal from "../../../../components/modals/AddOrUpdatePurchaseRequestModal";
import ChakraModal from "../../../../components/modals/ChakraModal";
import {
  approvePurchaseRequest,
  confirmPurchaseRequest,
  deletePurchaseRequest,
} from "../../../../adapters/SiteManagementAdapter";
import { useStoreActions, useStoreState } from "../../../../store/hooks";
import { Button } from "@/components/ui/button";

interface IndividualPurchaseRequestProps {
  purchaseRequest: PurchaseRequest;
  isForApproval: boolean;
}

const IndividualPurchaseRequest: React.FC<IndividualPurchaseRequestProps> = ({
  purchaseRequest,
  isForApproval,
}) => {
  // Objects
  const steps = [
    { title: "1", description: "1" },
    { title: "2", description: "2" },
    { title: "3", description: "3" },
  ];

  const incompleteStates = [
    PurchaseRequestStatusEnum.APPROVED_DENIED,
    PurchaseRequestStatusEnum.CONFIRMED_DENIED,
  ];

  const endStates = [
    PurchaseRequestStatusEnum.APPROVED_DENIED,
    PurchaseRequestStatusEnum.CONFIRMED_DENIED,
    PurchaseRequestStatusEnum.CONFIRMED,
  ];

  // Variables

  // State Variables - Hooks
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openApprovalPopup, setOpenApprovalPopup] = React.useState<
    undefined | boolean
  >();
  const [openConfirmationPopup, setOpenConfirmationPopup] = React.useState<
    undefined | boolean
  >();
  const { fetchPurchaseRequests } = useStoreActions(
    (state) => state.siteManagementStore,
  );
  const { user } = useStoreState((state) => state.userStore);

  // Functions
  const purchaseRequestIndex = (status: PurchaseRequestStatusEnum) => {
    switch (status) {
      case PurchaseRequestStatusEnum.CREATED:
        return 1;
      case PurchaseRequestStatusEnum.APPROVED:
        return 2;
      case PurchaseRequestStatusEnum.APPROVED_DENIED:
        return 2;
      case PurchaseRequestStatusEnum.CONFIRMED:
        return 3;
      case PurchaseRequestStatusEnum.CONFIRMED_DENIED:
        return 3;
    }
  };

  // Hook Functions

  return (
    <div className="flex w-full p-[16px] rounded-xl border bg-card text-card-foreground shadow mb-[16px]">
      <div
        className="flex flex-grow flex-col"
        onClick={() => {
          setOpenSideBar(!openSideBar);
        }}
      >
        <div className="flex w-full flex-row ">
          <div className="flex-[4] flex font-normal justify-center items-start flex-col ">
            <div className="flex text-[18px] ">{purchaseRequest.name}</div>
          </div>
          <div className="flex-1 font-bold text-[24px] justify-center items-end text-right">
            ₹{purchaseRequest.amount}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row text-[16px] mt-[4px] justify-between">
            <Tag size={"sm"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="16px" as={UserCircleIcon} />
              <TagLabel>{purchaseRequest.createdBy.name}</TagLabel>
            </Tag>
            <Tag size={"sm"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="16px" as={CheckBadgeIcon} />
              <TagLabel>{purchaseRequest.approver.name}</TagLabel>
            </Tag>
          </div>
          <div className="flex text-[16px] mt-[8px]">
            <Stepper
              index={purchaseRequestIndex(purchaseRequest.status)}
              gap={0}
              size={"xs"}
              className="flex-grow justify-around"
            >
              {steps.map((step, index) => (
                <Step key={index} className="flex justify-around">
                  <StepIndicator
                    gap={0}
                    className={
                      incompleteStates.includes(purchaseRequest.status) &&
                      index === purchaseRequestIndex(purchaseRequest.status) - 1
                        ? "bg-red-400"
                        : ""
                    }
                  >
                    <StepStatus
                      complete={
                        incompleteStates.includes(purchaseRequest.status) &&
                        index ===
                          purchaseRequestIndex(purchaseRequest.status) - 1 ? (
                          <XMarkIcon width={"14px"} className="text-main-bg" />
                        ) : (
                          <CheckIcon width={"14px"} className="text-main-bg" />
                        )
                      }
                      active={
                        !incompleteStates.includes(purchaseRequest.status) && (
                          <ClockIcon />
                        )
                      }
                    />
                  </StepIndicator>
                  <StepSeparator className="m-0 flex-grow flex-1 " />
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="flex flex-row text-[10px] justify-between">
            <div className="flex flex-1">Creation</div>
            <div className="flex flex-1 justify-center">Approval</div>
            <div className="flex flex-1 justify-end">Confirmation</div>
          </div>
        </div>
      </div>
      {openSideBar &&
        (isForApproval ? (
          <div className="flex flex-col pl-[8px] justify-between items-end">
            <Button
              onClick={() => {
                setOpenView(true);
              }}
              className="flex p-[8px] w-[30px] h-[30px]"
            >
              <EyeIcon width={"14px"} />
            </Button>
            {!endStates.includes(purchaseRequest.status) && (
              <Button
                onClick={() => {
                  purchaseRequest.status === PurchaseRequestStatusEnum.APPROVED
                    ? setOpenConfirmationPopup(true)
                    : setOpenApprovalPopup(true);
                }}
                className="flex p-[8px] w-[30px] h-[30px]"
              >
                <CheckIcon width={"14px"} />
              </Button>
            )}
            {!endStates.includes(purchaseRequest.status) && (
              <Button
                onClick={() => {
                  purchaseRequest.status === PurchaseRequestStatusEnum.APPROVED
                    ? setOpenConfirmationPopup(false)
                    : setOpenApprovalPopup(false);
                }}
                variant={"destructive"}
                className="flex p-[8px] w-[30px] h-[30px]"
              >
                <XMarkIcon width={"14px"} />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col pl-[8px] justify-between items-end">
            <Button
              onClick={() => {
                setOpenView(true);
              }}
              className="flex p-[8px] w-[30px] h-[30px]"
            >
              <EyeIcon width={"14px"} />
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              variant="destructive"
              className="flex p-[8px] w-[30px] h-[30px]"
            >
              <TrashIcon width={"14px"} />
            </Button>
          </div>
        ))}
      {openView && (
        <AddOrUpdatePurchaseRequestModal
          open={openView}
          closeCallback={() => {
            setOpenView(false);
          }}
          cta={() => {}}
          editPurchaseRequest={purchaseRequest}
          viewOnly
          accordioned
        />
      )}
      {openApprovalPopup !== undefined && (
        <AddOrUpdatePurchaseRequestModal
          open={openApprovalPopup !== undefined}
          closeCallback={() => {
            setOpenApprovalPopup(undefined);
            setOpenSideBar(false);
          }}
          cta={() => {}}
          approveCTA={async (approvalRemarks, approved) => {
            await approvePurchaseRequest(purchaseRequest._id!, {
              approvalRemarks: approvalRemarks,
              approved: approved,
            });
            fetchPurchaseRequests(user!._id!);
          }}
          editPurchaseRequest={purchaseRequest}
          viewOnly
          approve={openApprovalPopup}
        />
      )}
      {openConfirmationPopup !== undefined && (
        <AddOrUpdatePurchaseRequestModal
          open={openConfirmationPopup !== undefined}
          closeCallback={() => {
            setOpenConfirmationPopup(undefined);
            setOpenSideBar(false);
          }}
          cta={() => {}}
          confirmCTA={async (
            confirmationRemarks,
            chequeNumber,
            utrNumber,
            confirmed,
          ) => {
            await confirmPurchaseRequest(purchaseRequest._id!, {
              chequeNumber,
              confirmationRemarks,
              utrNumber,
              confirmed,
            });
            fetchPurchaseRequests(user!._id!);
          }}
          editPurchaseRequest={purchaseRequest}
          viewOnly
          confirm={openConfirmationPopup}
        />
      )}
      {openSideBar && (
        <ChakraModal
          open={openDelete}
          closeCallback={() => {
            setOpenDelete(false);
          }}
          title={"Delete"}
          action={async () => {
            await deletePurchaseRequest(purchaseRequest._id!);
            fetchPurchaseRequests(user!._id!);
            setOpenDelete(false);
          }}
          minH={20}
          actionText="Delete"
        >
          Are you sure you want to delete the PR?
        </ChakraModal>
      )}
    </div>
  );
};

export default IndividualPurchaseRequest;
