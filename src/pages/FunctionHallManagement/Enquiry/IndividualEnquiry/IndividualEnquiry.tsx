import React from "react";
import "./IndividualEnquiry.css";
import Enquiry from "../../../../types/FunctionHall/Enquiry";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
  BuildingLibraryIcon,
  CurrencyRupeeIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import AddEnquiryModal from "../../../../components/modals/AddEnquiryModal";
import { EnquiryToEnquiryCreateWrapper } from "../../../../helper/Helper";
import EstimatesModal from "../../../../components/modals/EstimatesModal";
import { Estimate } from "../../../../types/FunctionHall/Estimate";
import AcceptBookingModal from "../../../../components/modals/AcceptBookingModal";
import AcceptPaymentModal from "../../../../components/modals/AcceptPaymentModal";
import { Inventory } from "../../../../types/FunctionHall/Inventory";
import UpdateInventoryModal from "../../../../components/modals/UpdateInventoryModal";
import CheckInModal from "../../../../components/modals/CheckInModal";

interface IndividualEnquiryProps {
  enquiry: Enquiry;
}

const IndividualEnquiry: React.FC<IndividualEnquiryProps> = ({ enquiry }) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [editEnquiry, setEditEnquiry] = React.useState<Enquiry | undefined>();
  const [updateInventory, setUpdateInventory] = React.useState<
    Inventory[] | undefined
  >();
  const [estimates, setEstimates] = React.useState<Estimate[]>([]);
  const [enquiryClicked, setEnquiryClicked] = React.useState(false);
  const [bookingClicked, setBookingClicked] = React.useState(false);
  const [addEstimate, setAddEstimate] = React.useState<boolean>(false);
  const [acceptBooking, setAcceptBooking] = React.useState<boolean>(false);
  const [acceptPayment, setAcceptPayment] = React.useState<boolean>(false);
  const [checkIn, setCheckIn] = React.useState<boolean>(false);
  // Functions

  // Hook Functions

  return (
    <div className="flex flex-col p-[8px] rounded-[8px] bg-low-bg mb-[8px]">
      <div className="flex">
        <div
          className="flex flex-col flex-grow"
          onClick={() => {
            enquiry.isBooking
              ? setBookingClicked(!bookingClicked)
              : setEnquiryClicked(!enquiryClicked);
          }}
        >
          <div className="text-[16px] font-bold">{enquiry.name}</div>
          <div className="text-[12px] font-light">
            {`${new Date(enquiry.fromDate).toDateString()} [${new Date(
              enquiry.fromDate,
            ).toLocaleTimeString()}]`}
          </div>
          <div className="text-[12px] font-light">
            {`${new Date(enquiry.toDate).toDateString()} [${new Date(
              enquiry.toDate,
            ).toLocaleTimeString()}]`}
          </div>
          <div className="text-[14px] flex font-light mt-[4px]">
            <div className="flex flex-7 flex-col">
              <div className="flex mt-[4px]">
                <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={InformationCircleIcon} />
                  <TagLabel>{enquiry.enquiryType.name}</TagLabel>
                </Tag>
              </div>
              <div className="flex mt-[4px]">
                <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={BuildingLibraryIcon} />
                  <TagLabel>{enquiry.functionHall.name}</TagLabel>
                </Tag>
              </div>
            </div>
          </div>
        </div>
        {enquiry.isBooking && (
          <div className="flex justify-between flex-col items-end mx-[11px]">
            <div
              onClick={() => {
                setUpdateInventory(enquiry.inventory);
              }}
              className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
            >
              <EditIcon width={"14px"} />
            </div>
          </div>
        )}
        <div className="flex justify-between flex-col items-end">
          <div
            onClick={() => {
              setEditEnquiry(enquiry);
            }}
            className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
          >
            <EditIcon width={"14px"} />
          </div>
          <div
            onClick={() => {
              setEstimates(enquiry.estimates);
            }}
            className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
          >
            <CurrencyRupeeIcon width={"14px"} />
          </div>
          <div
            onClick={() => {
              window.open("tel:" + enquiry.primaryContactNumber, "_blank");
            }}
            className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
          >
            <PhoneIcon width={14} />
          </div>
        </div>
        <AddEnquiryModal
          closeCallback={() => {
            setEditEnquiry(undefined);
          }}
          open={!!editEnquiry?._id}
          editEnquiry={
            editEnquiry && EnquiryToEnquiryCreateWrapper(editEnquiry)
          }
        />
        <EstimatesModal
          closeCallback={() => {
            setEstimates([]);
          }}
          enquiry={enquiry}
          open={estimates.length > 0}
          estimates={estimates}
        />
        <UpdateInventoryModal
          closeCallback={() => {
            setUpdateInventory(undefined);
          }}
          open={updateInventory !== undefined}
          inventoryList={updateInventory}
          enquiryId={enquiry._id}
        />
      </div>
      {enquiryClicked && (
        <div className="flex flex-1 p-[8px] mt-[12px] bg-main-bg rounded-[6px] text-[14px] font-normal">
          <div
            onClick={() => {
              setAddEstimate(true);
            }}
            className="flex flex-1 justify-center items-center border-r-2 py-[6px]"
          >
            Update Estimate
          </div>
          <div
            onClick={() => {
              setAcceptBooking(true);
            }}
            className="flex flex-1 justify-center items-center border-l-2"
          >
            Accept Booking
          </div>
          <AddEnquiryModal
            closeCallback={() => {
              setAddEstimate(false);
            }}
            open={addEstimate}
            addEstimate={addEstimate}
            enquiryId={enquiry._id}
          />
          <AcceptBookingModal
            closeCallback={() => {
              setAcceptBooking(false);
            }}
            open={acceptBooking}
            enquiryId={enquiry._id}
          />
        </div>
      )}
      {bookingClicked && (
        <div className="flex flex-1 p-[8px] mt-[12px] bg-main-bg rounded-[6px] text-[14px] font-normal">
          <div
            onClick={() => {
              setAcceptPayment(true);
            }}
            className="flex flex-1 justify-center items-center border-r-2 py-[6px]"
          >
            Accept Payment
          </div>
          <div
            onClick={() => {
              setCheckIn(true);
            }}
            className="flex flex-1 justify-center items-center border-l-2"
          >
            Check In
          </div>
          <AddEnquiryModal
            closeCallback={() => {
              setAddEstimate(false);
            }}
            open={addEstimate}
            addEstimate={addEstimate}
            enquiryId={enquiry._id}
          />
          <AcceptBookingModal
            closeCallback={() => {
              setAcceptBooking(false);
            }}
            open={acceptBooking}
            enquiryId={enquiry._id}
          />
          <AcceptPaymentModal
            closeCallback={() => {
              setAcceptPayment(false);
            }}
            open={acceptPayment}
            enquiryId={enquiry._id}
          />
          <CheckInModal
            closeCallback={() => {
              setCheckIn(false);
            }}
            open={checkIn}
            enquiryId={enquiry._id}
          />
        </div>
      )}
    </div>
  );
};

export default IndividualEnquiry;
