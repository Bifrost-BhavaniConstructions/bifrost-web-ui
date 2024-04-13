import React from "react";
import "./CloseEnquiryModal.css";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import ChakraModal from "../ChakraModal";
import { closeEnquiry } from "../../../adapters/EnquiryAdapter";

interface CloseEnquiryModalProps {
  open: boolean;
  closeCallback: Function;
  enquiryId: string;
}

const CloseEnquiryModal: React.FC<CloseEnquiryModalProps> = ({
  closeCallback,
  open,
  enquiryId,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [remark, setRemark] = React.useState<string>("");
  const [refundAmount, setRefundAmount] = React.useState<number>(0);
  // Functions

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        setRemark("");
        setRefundAmount(0);
        closeCallback();
      }}
      open={open}
      title={"Close Enquiry"}
      actionText={"Close Enquiry"}
      action={() => {
        closeEnquiry(enquiryId, remark, refundAmount).then(() => {
          closeCallback();
        });
      }}
    >
      <LabelledInput
        name={"remark"}
        value={remark}
        setValue={(_val: string) => {
          setRemark(_val);
        }}
      />
      <LabelledInput
        name={"refund amount"}
        value={refundAmount}
        setValue={(_val: number) => {
          setRefundAmount(_val);
        }}
        inputProps={{ type: "number" }}
      />
    </ChakraModal>
  );
};

export default CloseEnquiryModal;
