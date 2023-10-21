import React from "react";
import "./EstimatesModal.css";
import ChakraModal from "../ChakraModal";
import { Estimate } from "../../../types/FunctionHall/Estimate";
import IndividualEstimate from "../../../pages/FunctionHallManagement/Enquiry/IndividualEstimate";
import { Accordion } from "@chakra-ui/react";
import EstimateField from "../../../pages/FunctionHallManagement/Enquiry/IndividualEstimate/EstimateField";
import Enquiry from "../../../types/FunctionHall/Enquiry";

interface EstimatesProps {
  closeCallback: Function;
  open: boolean;
  enquiry: Enquiry;
  estimates: Estimate[];
}

const EstimatesModal: React.FC<EstimatesProps> = ({
  open,
  closeCallback,
  enquiry,
  estimates,
}) => {
  // Objects
  const estimatesSorted = estimates.sort((a, b) =>
    new Date(a.createdAt!) > new Date(b.createdAt!) ? -1 : 1,
  );

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
      title={"All Estimates"}
      action={() => {}}
    >
      <Accordion
        defaultIndex={enquiry.isBooking ? [] : [0]}
        allowMultiple
        className="w-full"
      >
        {estimatesSorted.map((estimate, index) => (
          <IndividualEstimate
            estimate={estimate}
            index={estimates.length - 1 - index}
          />
        ))}
      </Accordion>
      {estimatesSorted.length > 0 && enquiry.isBooking && (
        <div className="flex w-full flex-col p-[24px]">
          <EstimateField
            key={"total"}
            title={"total"}
            tariff={
              Number(estimatesSorted[0].hallTariff) +
              Number(estimatesSorted[0].furnitureUtilityCharges) +
              Number(estimatesSorted[0].maintenanceCharges) +
              Number(estimatesSorted[0].applicableTaxes)
            }
            isRight
            isFullWidth
            fontSize={18}
          />
          <EstimateField
            key={"booking advance"}
            title={"booking advance"}
            tariff={enquiry.bookingAmount}
            isRight
            isFullWidth
            fontSize={18}
          />
          {enquiry.payments.length > 0 &&
            enquiry.payments
              .sort((a, b) =>
                new Date(a.createdAt!) < new Date(b.createdAt!) ? -1 : 1,
              )
              .map((payment, index) => (
                <EstimateField
                  key={new Date(payment.createdAt).toISOString()}
                  title={"payment " + (index + 1)}
                  tariff={payment.payment}
                  isRight
                  isFullWidth
                  fontSize={18}
                />
              ))}
        </div>
      )}
    </ChakraModal>
  );
};

export default EstimatesModal;
