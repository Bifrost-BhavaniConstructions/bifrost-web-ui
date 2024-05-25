import React from "react";
import "./CheckOutModal.css";
import ChakraModal from "../ChakraModal";
import IndividualEstimate from "../../../pages/FunctionHallManagement/Enquiry/IndividualEstimate";
import { Accordion } from "@chakra-ui/react";
import EstimateField from "../../../pages/FunctionHallManagement/Enquiry/IndividualEstimate/EstimateField";
import Enquiry from "../../../types/FunctionHall/Enquiry";
import { PowerMeterStatus } from "../../../types/FunctionHall/PowerMeter";
import { GeneratorStatus } from "../../../types/FunctionHall/Generator";
import AcceptPaymentModal from "../AcceptPaymentModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";

export interface InventoryItem {
  [key: string]: any; // Index signature for string keys
  name: string;
  count: number;
  charge: number;
}
interface EstimatesProps {
  closeCallback: Function;
  open: boolean;
  enquiry: Enquiry;
  zIndex?: number;
}

const CheckOutModal: React.FC<EstimatesProps> = ({
  open,
  closeCallback,
  enquiry,
  zIndex = 1500,
}) => {
  // Objects
  const estimatesSorted = enquiry.estimates.sort((a, b) =>
    new Date(a.createdAt!) > new Date(b.createdAt!) ? -1 : 1,
  );

  const [discount, setDiscount] = React.useState(0);
  const inventoryCharges = [];
  const inventoryItems: { [key: string]: InventoryItem } = {};
  if (
    enquiry.statStatus &&
    enquiry.statStatus.inventoryAll &&
    enquiry.statStatus.inventoryAll.length > 0
  ) {
    for (const inventory of enquiry.statStatus.inventoryAll[0]) {
      inventoryItems[inventory.name] = inventory;
    }
  }

  // Step 2: Process each unique inventory item
  for (const inventoryName in inventoryItems) {
    const inventoryItem = inventoryItems[inventoryName];
    const firstCount = inventoryItem.count;
    const charge = inventoryItem.charge;

    const lastInventory =
      enquiry.statStatus.inventoryAll[
        enquiry.statStatus.inventoryAll.length - 1
      ];
    const lastCount =
      lastInventory.find((item) => item.name === inventoryName)?.count ?? 0;
    const lastCharge =
      lastInventory.find((item) => item.name === inventoryName)?.charge ?? 0;

    const countDifference = firstCount - lastCount;
    const result = countDifference * lastCharge;

    inventoryCharges.push({
      name: inventoryName,
      countDifference,
      lastCharge,
      result,
    });
  }

  // Variables
  const rooms =
    enquiry.statStatus && enquiry.statStatus.roomsAll.length > 0
      ? enquiry.statStatus.roomsAll[enquiry.statStatus.roomsAll.length - 1]
          .length
      : 0;

  const securityGuards =
    enquiry.statStatus &&
    enquiry.statStatus.securityGuards &&
    enquiry.statStatus.securityGuards.length > 0
      ? enquiry.statStatus.securityGuards[
          enquiry.statStatus.securityGuards.length - 1
        ]
      : 0;

  const finalReading: PowerMeterStatus[] =
    enquiry.statStatus && enquiry.statStatus.powerMetersAll.length > 0
      ? enquiry.statStatus.powerMetersAll[
          enquiry.statStatus.powerMetersAll.length - 1
        ]
      : [];
  const initialReading: PowerMeterStatus[] =
    enquiry.statStatus && enquiry.statStatus.powerMetersAll.length > 0
      ? enquiry.statStatus.powerMetersAll[0]
      : [];

  const meterDifferences: PowerMeterStatus[] = [];

  // Iterate through the meters and calculate the differences
  for (
    let i = 0;
    i < Math.min(initialReading.length, finalReading.length);
    i++
  ) {
    const initialMeter = initialReading[i];
    const finalMeter = finalReading[i];

    // Calculate the difference
    const difference: PowerMeterStatus = {
      name: initialMeter.name,
      reading: finalMeter.reading - initialMeter.reading,
      markedAt: finalMeter.markedAt, // You can use the finalMeter's timestamp
      initialReading: initialMeter.reading,
      finalReading: finalMeter.reading,
    };

    meterDifferences.push(difference);
  }
  // State Variables - Hooks
  const [payment, setPayment] = React.useState<number | undefined>();

  // Functions
  const getTotalGeneratorHours = (generatorStatuses: GeneratorStatus[]) => {
    let totalHours = 0;
    for (const status of generatorStatuses) {
      for (const session of status.sessions) {
        if (session.from && session.to) {
          const fromTime = new Date(session.from).getTime();
          const toTime = new Date(session.to).getTime();
          const sessionHours = (toTime - fromTime) / (1000 * 60 * 60); // Convert milliseconds to hours directly
          totalHours += sessionHours;
        }
      }
    }
    return parseFloat(totalHours.toFixed(2));
  };
  const generatorHours = getTotalGeneratorHours(
    enquiry.statStatus ? enquiry.statStatus.generatorsAll : [],
  );

  const finalAmount =
    Number(estimatesSorted[0].hallTariff) +
    Number(estimatesSorted[0].furnitureUtilityCharges) +
    Number(estimatesSorted[0].maintenanceCharges) +
    Number(estimatesSorted[0].applicableTaxes) -
    Number(enquiry.bookingAmount) -
    Number(
      enquiry.payments.length > 0
        ? enquiry.payments.reduce((a, b) => ({
            payment: a.payment + b.payment,
            createdAt: new Date(),
            updatedAt: new Date(),
          })).payment
        : 0,
    ) +
    Number(rooms * estimatesSorted[0].additionalGuestRoomTariff) +
    Number(
      meterDifferences.length > 0
        ? meterDifferences.reduce((a, b) => ({
            reading:
              a.reading * estimatesSorted[0].electricityTariff +
              b.reading * estimatesSorted[0].electricityTariff,
            markedAt: new Date(),
            name: "",
          })).reading
        : 0,
    ) +
    Number(securityGuards * estimatesSorted[0].securityTariff) +
    Number(generatorHours * estimatesSorted[0].generatorTariff) -
    Number(discount);

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        closeCallback();
      }}
      zIndex={zIndex}
      open={open}
      title={"Checkout"}
      action={() => {
        setPayment(finalAmount);
      }}
      actionText={"Checkout"}
    >
      <Accordion
        defaultIndex={enquiry.isBooking ? [] : [0]}
        allowMultiple
        className="w-full"
      >
        <IndividualEstimate estimate={estimatesSorted[0]} index={0} />
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
          <EstimateField
            key={"guest rooms"}
            title={"guest rooms - " + rooms}
            tariff={rooms * estimatesSorted[0].additionalGuestRoomTariff}
            isRight
            isFullWidth
            fontSize={18}
          />
          {meterDifferences.map((meter) => {
            return (
              <EstimateField
                key={"electricity consumed - " + meter.name}
                title={"electricity consumed - " + meter.name}
                subtitle={`${meter.reading} units (${meter.finalReading} - ${meter.initialReading})`}
                tariff={meter.reading * estimatesSorted[0].electricityTariff}
                isRight
                isFullWidth
                fontSize={18}
              />
            );
          })}
          {inventoryCharges
            .filter((i) => i.countDifference !== 0)
            .map((inventoryCharge) => {
              return (
                <EstimateField
                  key={"inventory damaged - " + inventoryCharge.name}
                  title={"inventory damaged - " + inventoryCharge.name}
                  subtitle={`${inventoryCharge.countDifference} items * ${inventoryCharge.lastCharge}`}
                  tariff={inventoryCharge.result}
                  isRight
                  isFullWidth
                  fontSize={18}
                />
              );
            })}
          <EstimateField
            key={"security cost "}
            title={"security guards - " + securityGuards}
            tariff={securityGuards * estimatesSorted[0].securityTariff}
            isRight
            isFullWidth
            fontSize={18}
          />
          <EstimateField
            key={"generator cost "}
            title={"generator cost - " + generatorHours + " hrs"}
            tariff={generatorHours * estimatesSorted[0].generatorTariff}
            isRight
            isFullWidth
            fontSize={18}
          />
          <LabelledInput
            name={"discount"}
            value={discount}
            inputProps={{ type: "number" }}
            setValue={(_val: number) => {
              setDiscount(_val);
            }}
          />
          <EstimateField
            key={"finalAmount"}
            title={"total"}
            tariff={finalAmount}
            isRight
            isFullWidth
            fontSize={18}
          />
          <AcceptPaymentModal
            open={!!payment}
            closeCallback={() => {
              setPayment(undefined);
            }}
            enquiryId={enquiry._id}
            amount={payment}
          />
        </div>
      )}
    </ChakraModal>
  );
};

export default CheckOutModal;
