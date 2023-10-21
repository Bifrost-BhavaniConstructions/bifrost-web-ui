import React from "react";
import "./AcceptPaymentModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  enquiryId: string;
}

const AcceptPaymentModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  enquiryId,
}) => {
  // Objects

  // Variables
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // State Variables - Hooks
  const [paymentAmount, setPaymentAmount] = React.useState(0);

  // Functions
  const acceptPayment = () => {
    httpClient
      .post(`/function-hall/enquiry/payment/${enquiryId}`, {
        paymentAmount,
      })
      .then(() => {
        fetchEnquiries();
        toast(`Enquiry created`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        setPaymentAmount(0);
        closeCallback();
      }}
      open={open}
      title={"Accept Payment"}
      action={() => {
        acceptPayment();
      }}
      actionText={"Submit"}
    >
      <LabelledInput
        name={"payment"}
        value={paymentAmount}
        setValue={(_val: number) => {
          setPaymentAmount(_val);
        }}
        inputProps={{ type: "number" }}
      />
    </ChakraModal>
  );
};

export default AcceptPaymentModal;
