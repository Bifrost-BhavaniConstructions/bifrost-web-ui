import React from "react";
import "./AddOrUpdatePurchaseRequestModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import {
  PurchaseRequest,
  PurchaseRequestCreateWrapper,
} from "../../../types/SiteManagement/PurchaseRequest";
import ChakraSelect from "../../ChakraSelect";
import { useStoreState } from "../../../store/hooks";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import withAccordionWrapper from "../../../helper/withAccordionWrapper";
import PurchaseRequestAudit from "../../../pages/SiteManagement/PR/IndividualPurchaseRequest/PurchaseRequestAudit";
import { PurchaseRequestStatusEnum } from "../../../enums/PurchaseRequestStatusEnum";

interface AddOrUpdatePurchaseRequestModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (
    purchaseRequestCreateWrapper:
      | PurchaseRequestCreateWrapper
      | PurchaseRequest,
  ) => void;
  approveCTA?: (approvalRemarks: string, approved: boolean) => void;
  confirmCTA?: (
    confirmationRemarks: string,
    chequeNumber: string,
    utrNumber: string,
    confirmed: boolean,
  ) => void;
  editPurchaseRequest?: PurchaseRequest;
  viewOnly?: boolean;
  approve?: boolean;
  confirm?: boolean;
  accordioned?: boolean;
}

const AddOrUpdatePurchaseRequestModal: React.FC<
  AddOrUpdatePurchaseRequestModalProps
> = ({
  closeCallback,
  open,
  cta,
  editPurchaseRequest,
  viewOnly = false,
  approveCTA,
  confirmCTA,
  approve,
  confirm,
  accordioned,
}) => {
  // Objects
  const emptyPurchaseRequest: PurchaseRequestCreateWrapper = {
    amount: 0,
    name: "",
    approver: "",
    createdBy: "",
    destinationBankAccount: {
      accountNo: "",
      bankName: "",
      accountHolder: "",
      branch: "",
      ifsc: "",
    },
    remarks: "",
  };

  // Variables
  const [purchaseRequest, setPurchaseRequest] =
    React.useState<PurchaseRequestCreateWrapper>(emptyPurchaseRequest);
  const { users } = useStoreState((state) => state.peopleStore);
  const [approvalRemarks, setApprovalRemarks] = React.useState("");
  const [confirmationRemarks, setConfirmationRemarks] = React.useState("");
  const [chequeNumber, setChequeNumber] = React.useState("");
  const [utrNumber, setUTRNumber] = React.useState("");
  // Functions
  const validatePurchaseRequest: () => boolean = () => {
    if (approveCTA !== undefined) return approvalRemarks !== "";
    if (confirmCTA !== undefined)
      return confirm
        ? confirmationRemarks !== "" && chequeNumber !== "" && utrNumber !== ""
        : confirmationRemarks !== "";
    return (
      purchaseRequest.approver !== "" &&
      purchaseRequest.name !== "" &&
      purchaseRequest.remarks !== "" &&
      purchaseRequest.destinationBankAccount.accountHolder !== "" &&
      purchaseRequest.destinationBankAccount.bankName !== "" &&
      purchaseRequest.destinationBankAccount.accountNo !== "" &&
      purchaseRequest.destinationBankAccount.ifsc !== "" &&
      purchaseRequest.destinationBankAccount.branch !== ""
    );
  };

  // Hook Functions
  React.useEffect(() => {
    if (editPurchaseRequest) {
      setPurchaseRequest({
        ...editPurchaseRequest,
        approver: editPurchaseRequest.approver._id,
        createdBy: editPurchaseRequest.createdBy._id,
      });
    }
  }, [editPurchaseRequest]);

  return (
    <ChakraModal
      closeCallback={() => {
        setPurchaseRequest(emptyPurchaseRequest);
        closeCallback();
      }}
      open={open}
      title={viewOnly ? "Purchase Request" : "Add Purchase Request"}
      action={() => {
        approveCTA !== undefined
          ? approveCTA(approvalRemarks, approve!)
          : confirmCTA !== undefined
          ? confirmCTA(confirmationRemarks, chequeNumber, utrNumber, confirm!)
          : cta(purchaseRequest);
        closeCallback();
      }}
      actionText={
        viewOnly
          ? approve !== undefined
            ? approve
              ? "Approve"
              : "Reject"
            : confirm !== undefined
            ? confirm
              ? "Confirm"
              : "Mark as Failed"
            : ""
          : "Submit"
      }
      isButtonDisabled={!validatePurchaseRequest()}
    >
      {withAccordionWrapper(
        accordioned!,
        <>
          {approve !== undefined && (
            <LabelledInput
              required
              name={"remarks"}
              value={approvalRemarks}
              setValue={(_val: string) => {
                setApprovalRemarks(_val);
              }}
            />
          )}
          {confirm !== undefined && (
            <>
              <LabelledInput
                required
                name={"remarks"}
                value={confirmationRemarks}
                setValue={(_val: string) => {
                  setConfirmationRemarks(_val);
                }}
              />
              {confirm && (
                <>
                  <LabelledInput
                    required
                    name={"cheque"}
                    value={chequeNumber}
                    setValue={(_val: string) => {
                      setChequeNumber(_val);
                    }}
                  />
                  <LabelledInput
                    required
                    name={"utr"}
                    value={utrNumber}
                    setValue={(_val: string) => {
                      setUTRNumber(_val);
                    }}
                  />
                </>
              )}
            </>
          )}
          <LabelledInput
            required
            name={"name"}
            value={purchaseRequest.name}
            setValue={(_val: string) => {
              setPurchaseRequest({ ...purchaseRequest, name: _val });
            }}
            inputProps={{ isDisabled: viewOnly }}
          />
          <LabelledInput
            required
            name={"amount"}
            value={purchaseRequest.amount}
            setValue={(_val: number) => {
              setPurchaseRequest({ ...purchaseRequest, amount: _val });
            }}
            inputProps={{ type: "number", isDisabled: viewOnly }}
          />
          <LabelledInput
            required
            name={"remarks"}
            value={purchaseRequest.remarks}
            setValue={(_val: string) => {
              setPurchaseRequest({ ...purchaseRequest, remarks: _val });
            }}
            inputProps={{ isDisabled: viewOnly }}
          />
          <ChakraSelect
            name="approver"
            value={purchaseRequest.approver!}
            values={users
              .filter((user) => user.role === UserRoleEnum.SUPER_ADMIN)
              .map((fH) => ({
                name: fH.name,
                value: fH._id!,
              }))}
            onValueChange={(value) => {
              setPurchaseRequest({ ...purchaseRequest, approver: value });
            }}
            isDisabled={viewOnly}
          />
          <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
            Destination Bank Information
          </h3>
          <LabelledInput
            name="account no."
            value={purchaseRequest.destinationBankAccount.accountNo}
            setValue={(_val: string) => {
              setPurchaseRequest({
                ...purchaseRequest,
                destinationBankAccount: {
                  ...purchaseRequest.destinationBankAccount,
                  accountNo: _val,
                },
              });
            }}
            inputProps={{ type: "number", isDisabled: viewOnly }}
          />
          <LabelledInput
            name="ifsc"
            value={purchaseRequest.destinationBankAccount.ifsc}
            setValue={(_val: string) => {
              setPurchaseRequest({
                ...purchaseRequest,
                destinationBankAccount: {
                  ...purchaseRequest.destinationBankAccount,
                  ifsc: _val,
                },
              });
            }}
            inputProps={{ isDisabled: viewOnly }}
          />
          <LabelledInput
            name="bank name"
            value={purchaseRequest.destinationBankAccount.bankName}
            setValue={(_val: string) => {
              setPurchaseRequest({
                ...purchaseRequest,
                destinationBankAccount: {
                  ...purchaseRequest.destinationBankAccount,
                  bankName: _val,
                },
              });
            }}
            inputProps={{ isDisabled: viewOnly }}
          />
          <LabelledInput
            name="account holder"
            value={purchaseRequest.destinationBankAccount.accountHolder}
            setValue={(_val: string) => {
              setPurchaseRequest({
                ...purchaseRequest,
                destinationBankAccount: {
                  ...purchaseRequest.destinationBankAccount,
                  accountHolder: _val,
                },
              });
            }}
            inputProps={{ isDisabled: viewOnly }}
          />
          <LabelledInput
            name="branch"
            value={purchaseRequest.destinationBankAccount.branch}
            setValue={(_val: string) => {
              setPurchaseRequest({
                ...purchaseRequest,
                destinationBankAccount: {
                  ...purchaseRequest.destinationBankAccount,
                  branch: _val,
                },
              });
            }}
            inputProps={{ isDisabled: viewOnly }}
          />
        </>,
      )}
      {accordioned && (
        <>
          {editPurchaseRequest?.status !==
            PurchaseRequestStatusEnum.CREATED && (
            <div className="flex flex-col">
              <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
                Approval Information
              </h3>
              <div className="flex flex-wrap">
                <PurchaseRequestAudit
                  title={"approver"}
                  text={editPurchaseRequest!.approver.name}
                />
                <PurchaseRequestAudit
                  isRight
                  title={
                    editPurchaseRequest?.status ===
                    PurchaseRequestStatusEnum.APPROVED_DENIED
                      ? "denied on"
                      : "approved on"
                  }
                  text={new Date(
                    editPurchaseRequest!.approvedAt!,
                  ).toLocaleDateString("en-GB")}
                />
                <PurchaseRequestAudit
                  title={
                    editPurchaseRequest?.status ===
                    PurchaseRequestStatusEnum.APPROVED_DENIED
                      ? "denial remarks"
                      : "approval remarks"
                  }
                  text={editPurchaseRequest!.approvalRemarks!}
                />
              </div>
            </div>
          )}
          {[
            PurchaseRequestStatusEnum.CONFIRMED,
            PurchaseRequestStatusEnum.CONFIRMED_DENIED,
          ].includes(editPurchaseRequest!.status) && (
            <div className="flex flex-col">
              <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
                Confirmation Information
              </h3>
              <div className="flex flex-wrap">
                <PurchaseRequestAudit
                  title={
                    editPurchaseRequest?.status ===
                    PurchaseRequestStatusEnum.CONFIRMED_DENIED
                      ? "denied by"
                      : "confirmed by"
                  }
                  text={editPurchaseRequest!.approver.name}
                />
                <PurchaseRequestAudit
                  isRight
                  title={"approved on"}
                  text={new Date(
                    editPurchaseRequest!.confirmedAt!,
                  ).toLocaleDateString("en-GB")}
                />
                <PurchaseRequestAudit
                  title={
                    editPurchaseRequest?.status ===
                    PurchaseRequestStatusEnum.CONFIRMED_DENIED
                      ? "denial marks"
                      : "confirmation remarks"
                  }
                  text={editPurchaseRequest!.confirmationRemarks!}
                />
              </div>
            </div>
          )}
        </>
      )}
    </ChakraModal>
  );
};

export default AddOrUpdatePurchaseRequestModal;
