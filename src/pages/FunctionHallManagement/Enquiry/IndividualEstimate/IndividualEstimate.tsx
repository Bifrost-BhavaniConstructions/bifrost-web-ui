import React from "react";
import "./IndividualEstimate.css";
import { Estimate } from "../../../../types/FunctionHall/Estimate";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import EstimateField from "./EstimateField";

interface IndividualEstimateProps {
  estimate: Estimate;
  index: number;
}

const IndividualEstimate: React.FC<IndividualEstimateProps> = ({
  estimate,
  index,
}) => {
  // Objects
  const estimateFields = [
    {
      name: "hall tariff",
      tariff: estimate.hallTariff,
    },
    {
      name: "furniture utility charges",
      tariff: estimate.furnitureUtilityCharges,
    },
    {
      name: "maintenance charges",
      tariff: estimate.maintenanceCharges,
    },
    {
      name: "applicable taxes",
      tariff: estimate.applicableTaxes,
    },
    {
      name: "additional guest room tariff",
      tariff: estimate.additionalGuestRoomTariff,
      per: "room",
    },
    {
      name: "electricity tariff",
      tariff: estimate.electricityTariff,
      per: "unit",
    },
    {
      name: "security tariff",
      tariff: estimate.securityTariff,
      per: "guard",
    },
    {
      name: "generator tariff",
      tariff: estimate.generatorTariff,
      per: "generator",
    },
  ];

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <AccordionItem className="bg-low-bg">
      <h2>
        <AccordionButton className="flex w-full">
          <Box
            as="div"
            flex="1"
            className="flex w-full justify-between"
            textAlign="left"
          >
            <div>{`Estimate ${index + 1}`}</div>
            <div className="flex text-[12px] justify-center items-center">
              {new Date(estimate.createdAt!)?.toLocaleDateString("en-US")}-
              {new Date(estimate.createdAt!)?.toLocaleTimeString("en-US")}
            </div>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} className="flex flex-col">
        <div className="flex flex-wrap">
          {estimateFields.map((estimateField, index) => (
            <EstimateField
              key={estimateField.name}
              title={estimateField.name}
              tariff={estimateField.tariff}
              per={estimateField.per}
              isRight={index % 2 === 1}
            />
          ))}
        </div>
        <div className="flex w-full flex-1 justify-end border-t-2 mt-[12px]">
          <EstimateField
            key={"total"}
            title={"total"}
            tariff={
              Number(estimate.hallTariff) +
              Number(estimate.furnitureUtilityCharges) +
              Number(estimate.maintenanceCharges) +
              Number(estimate.applicableTaxes)
            }
            isRight
          />
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default IndividualEstimate;
