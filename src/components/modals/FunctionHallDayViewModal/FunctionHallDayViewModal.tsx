import React from "react";
import "./FunctionHallDayViewModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";
import Enquiry from "../../../pages/FunctionHallManagement/Enquiry";
import moment from "moment";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  date: Date;
  functionHallId: string;
}

const FunctionHallDayViewModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  date,
  functionHallId,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        closeCallback();
        console.log(functionHallId);
      }}
      open={open}
      title={
        "Enquiries & Bookings - " + moment(date).format("DD/MM/YYYY").toString()
      }
      action={() => {}}
    >
      <Enquiry date={date} functionHall={functionHallId} />
    </ChakraModal>
  );
};

export default FunctionHallDayViewModal;
