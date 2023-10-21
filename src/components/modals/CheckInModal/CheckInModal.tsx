import React from "react";
import "./CheckInModal.css";
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

const CheckInModal: React.FC<AcceptBookingModalProps> = ({
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
  const updateBookingPayment = () => {
    httpClient
      .post(`/function-hall/enquiry/booking/${enquiryId}`, {
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
      title={"Check In"}
      action={() => {
        updateBookingPayment();
      }}
      actionText={"Submit"}
    >
      <LabelledInput
        name={"booking advance"}
        value={paymentAmount}
        setValue={(_val: number) => {
          setPaymentAmount(_val);
        }}
        inputProps={{ type: "number" }}
      />
    </ChakraModal>
  );
};

export default CheckInModal;
