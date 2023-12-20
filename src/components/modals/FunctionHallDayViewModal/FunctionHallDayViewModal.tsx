import React from "react";
import "./FunctionHallDayViewModal.css";
import ChakraModal from "../ChakraModal";
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
