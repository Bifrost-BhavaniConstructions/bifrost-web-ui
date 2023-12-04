import React from "react";
import "./IndividualEnquiry.css";
import Enquiry from "../../../../types/FunctionHall/Enquiry";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  ArrowUturnUpIcon,
  BuildingLibraryIcon,
  ClipboardDocumentListIcon,
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
import CheckOutModal from "../../../../components/modals/CheckOutModal";
import FollowUpModal from "../../../../components/modals/FollowUpModal";
import {
  closeEnquiry,
  restoreEnquiry,
} from "../../../../adapters/EnquiryAdapter";
import { useStoreActions } from "../../../../store/hooks";

interface IndividualEnquiryProps {
  enquiry: Enquiry;
  closed: boolean;
}

const IndividualEnquiry: React.FC<IndividualEnquiryProps> = ({
  enquiry,
  closed,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [editEnquiry, setEditEnquiry] = React.useState<Enquiry | undefined>();
  const [updateStatus, setUpdateStatus] = React.useState<boolean>(false);
  const [estimates, setEstimates] = React.useState<Estimate[]>([]);
  const [enquiryClicked, setEnquiryClicked] = React.useState(false);
  const [bookingClicked, setBookingClicked] = React.useState(false);
  const [addEstimate, setAddEstimate] = React.useState<boolean>(false);
  const [acceptBooking, setAcceptBooking] = React.useState<boolean>(false);
  const [acceptPayment, setAcceptPayment] = React.useState<boolean>(false);
  const [checkIn, setCheckIn] = React.useState<boolean>(false);
  const [checkOut, setCheckOut] = React.useState<boolean>(false);
  const [followUp, setFollowUp] = React.useState<boolean>(false);
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );
  // Functions

  // Hook Functions

  return (
    <div className="flex flex-col p-[8px] rounded-[8px] bg-low-bg mb-[8px]">
      <div className="flex">
        <div
          className="flex flex-col flex-grow"
          onClick={() => {
            if (enquiry.isBooking) {
              if (!enquiry.isCheckedOut) {
                setBookingClicked(!bookingClicked);
              }
            } else {
              if (!enquiry.isClosedEnquiry) {
                setEnquiryClicked(!enquiryClicked);
              }
            }
          }}
        >
          <div className="text-[16px] font-bold">{enquiry.name}</div>
          <div className="text-[12px] font-light">
            {`${new Date(enquiry.fromDate).toDateString()} [${new Date(
              enquiry.fromDate,
            ).toLocaleTimeString("en-US")}]`}
          </div>
          <div className="text-[12px] font-light">
            {`${new Date(enquiry.toDate).toDateString()} [${new Date(
              enquiry.toDate,
            ).toLocaleTimeString("en-US")}]`}
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
        {enquiry.isBooking && !enquiry.isCheckedOut && (
          <div className="flex justify-between flex-col items-end mx-[11px]">
            <div
              onClick={() => {
                setCheckIn(true);
                setUpdateStatus(true);
              }}
              className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
            >
              <ClipboardDocumentListIcon width={"14px"} />
            </div>
          </div>
        )}
        {!enquiry.isBooking && (
          <div className="flex justify-between flex-col items-end mx-[11px]">
            <div
              onClick={async () => {
                !closed
                  ? await closeEnquiry(enquiry._id)
                  : await restoreEnquiry(enquiry._id);
                fetchEnquiries();
              }}
              className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
            >
              {!closed ? (
                <DeleteIcon width={"14px"} />
              ) : (
                <ArrowUturnUpIcon width={"14px"} />
              )}
            </div>
          </div>
        )}
        <div className="flex justify-between flex-col items-end">
          {!enquiry.isCheckedOut && (
            <div
              onClick={() => {
                setEditEnquiry(enquiry);
              }}
              className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
            >
              <EditIcon width={"14px"} />
            </div>
          )}
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
              setFollowUp(true);
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
        {followUp && (
          <FollowUpModal
            open={followUp}
            closeCallback={() => {
              setFollowUp(false);
            }}
            enquiryId={enquiry._id}
            followups={enquiry.followUps}
            contactNumber={enquiry.primaryContactNumber}
          />
        )}
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
            latestEstimate={enquiry.estimates[0]}
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
      <CheckInModal
        closeCallback={() => {
          setCheckIn(false);
          setUpdateStatus(false);
        }}
        open={checkIn}
        enquiry={enquiry}
        functionHall={enquiry.functionHall}
        isUpdateStatus={updateStatus}
      />
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
              enquiry.isCheckedIn ? setCheckOut(true) : setCheckIn(true);
            }}
            className="flex flex-1 justify-center items-center border-l-2"
          >
            {enquiry.isCheckedIn ? "Check Out" : "Check In"}
          </div>
          <AcceptPaymentModal
            closeCallback={() => {
              setAcceptPayment(false);
            }}
            open={acceptPayment}
            enquiryId={enquiry._id}
          />
          <CheckOutModal
            closeCallback={() => {
              setCheckOut(false);
            }}
            open={checkOut}
            enquiry={enquiry}
          />
        </div>
      )}
    </div>
  );
};

export default IndividualEnquiry;
