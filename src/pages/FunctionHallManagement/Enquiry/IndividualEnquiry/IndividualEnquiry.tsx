import React from "react";
import "./IndividualEnquiry.css";
import Enquiry from "../../../../types/FunctionHall/Enquiry";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  ArrowUturnUpIcon,
  BuildingLibraryIcon,
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  InformationCircleIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddEnquiryModal from "../../../../components/modals/AddEnquiryModal";
import { EnquiryToEnquiryCreateWrapper } from "../../../../helper/Helper";
import EstimatesModal from "../../../../components/modals/EstimatesModal";
import { Estimate } from "../../../../types/FunctionHall/Estimate";
import AcceptBookingModal from "../../../../components/modals/AcceptBookingModal";
import AcceptPaymentModal from "../../../../components/modals/AcceptPaymentModal";
import CheckInModal from "../../../../components/modals/CheckInModal";
import CheckOutModal from "../../../../components/modals/CheckOutModal";
import FollowUpModal from "../../../../components/modals/FollowUpModal";
import {
  closeEnquiry,
  restoreEnquiry,
} from "../../../../adapters/EnquiryAdapter";
import { useStoreActions } from "../../../../store/hooks";
import CloseEnquiryModal from "../../../../components/modals/CloseEnquiryModal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Avvvatars from "avvvatars-react";
import {
  CalendarIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  SewingPinIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
  const [closeEnquiry, setCloseEnquiry] = React.useState<boolean>(false);
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );
  // Functions

  // Hook Functions

  return (
    <>
      <Card
        className="cursor-pointer hover:bg-primary-foreground flex flex-col select-none focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          if (enquiry.isBooking) {
            if (!enquiry.isCheckedOut && !enquiry.isClosedEnquiry) {
              setBookingClicked(!bookingClicked);
            }
          } else {
            if (!enquiry.isClosedEnquiry) {
              setEnquiryClicked(!enquiryClicked);
            }
          }
        }}
      >
        <div className="flex flex-row">
          <CardHeader className="pr-0 flex-grow">
            <div className="text-[16px] font-bold">{enquiry.name}</div>
            <CardDescription className={"flex gap-[4px]"}>
              <CalendarIcon className="mt-[2px]" />
              {`${new Date(enquiry.fromDate).toDateString()} ${
                enquiry.fromDate !== enquiry.toDate
                  ? `- ${new Date(enquiry.toDate).toDateString()}`
                  : ""
              }`}
            </CardDescription>
            <CardDescription className={"flex gap-[4px]"}>
              <Badge variant="secondary" className={"mr-[4px] bg-yellow-700"}>
                {enquiry.enquiryType.name}
              </Badge>
              {isDesktop && (
                <Badge variant="secondary" className={"mr-[4px] bg-low-bg"}>
                  {enquiry.functionHall.name}
                </Badge>
              )}
            </CardDescription>
            {!isDesktop && (
              <CardDescription>
                <Badge variant="secondary" className={"mr-[4px] bg-low-bg"}>
                  {enquiry.functionHall.name}
                </Badge>
              </CardDescription>
            )}
          </CardHeader>
          <CardHeader className="pl-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <MixerHorizontalIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[1605]">
                <DropdownMenuLabel>Enquiry Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {enquiry.isBooking && !enquiry.isCheckedOut && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckIn(true);
                      setUpdateStatus(true);
                    }}
                  >
                    <UpdateIcon
                      color={"white"}
                      width={"16px"}
                      className="mr-[8px]"
                    />
                    Update Status
                  </DropdownMenuItem>
                )}
                {!enquiry.isCheckedOut && (
                  <DropdownMenuItem
                    onClick={() => {
                      setEditEnquiry(enquiry);
                    }}
                  >
                    <Pencil2Icon
                      color={"white"}
                      width={"16px"}
                      className="mr-[8px]"
                    />
                    Edit Enquiry
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setEstimates(enquiry.estimates);
                  }}
                >
                  <CurrencyRupeeIcon
                    color={"white"}
                    width={"16px"}
                    className="mr-[8px]"
                  />
                  View Estimates
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setFollowUp(true);
                  }}
                >
                  <PhoneIcon
                    color={"white"}
                    width={"16px"}
                    className="mr-[8px]"
                  />
                  Follow up
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!enquiry.isCheckedOut && (
              <Button
                variant="destructive"
                size="icon"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!closed) {
                    setCloseEnquiry(true);
                  } else {
                    await restoreEnquiry(enquiry._id);
                    fetchEnquiries();
                  }
                }}
              >
                {!closed ? (
                  <TrashIcon color={"white"} width={"14px"} />
                ) : (
                  <ArrowUturnUpIcon color={"white"} width={"14px"} />
                )}
              </Button>
            )}
          </CardHeader>
        </div>
        {enquiryClicked && (
          <CardFooter className="flex justify-between">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setAddEstimate(true);
              }}
              variant="secondary"
            >
              Update Estimate
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setAcceptBooking(true);
              }}
              variant="outline"
              className="bg-main-bg-success"
            >
              Accept Booking
            </Button>
          </CardFooter>
        )}
        {bookingClicked && (
          <CardFooter className="flex justify-between">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setAcceptPayment(true);
              }}
              variant="secondary"
            >
              Accept Payment
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                enquiry.isCheckedIn ? setCheckOut(true) : setCheckIn(true);
              }}
              variant="outline"
              className="bg-main-bg-success"
            >
              {enquiry.isCheckedIn ? "Check Out" : "Check In"}
            </Button>
          </CardFooter>
        )}
      </Card>
      {acceptPayment && (
        <AcceptPaymentModal
          zIndex={1500}
          closeCallback={() => {
            setAcceptPayment(false);
          }}
          open={acceptPayment}
          enquiryId={enquiry._id}
        />
      )}
      {checkOut && (
        <CheckOutModal
          zIndex={1500}
          closeCallback={() => {
            setCheckOut(false);
          }}
          open={checkOut}
          enquiry={enquiry}
        />
      )}
      {addEstimate && (
        <AddEnquiryModal
          zIndex={1500}
          closeCallback={() => {
            setAddEstimate(false);
          }}
          open={addEstimate}
          addEstimate={addEstimate}
          latestEstimate={enquiry.estimates[0]}
          enquiryId={enquiry._id}
        />
      )}
      {acceptBooking && (
        <AcceptBookingModal
          zIndex={1500}
          closeCallback={() => {
            setAcceptBooking(false);
          }}
          open={acceptBooking}
          enquiryId={enquiry._id}
        />
      )}
      {checkIn && (
        <CheckInModal
          closeCallback={() => {
            setCheckIn(false);
            setUpdateStatus(false);
          }}
          zIndex={1500}
          open={checkIn}
          enquiry={enquiry}
          functionHall={enquiry.functionHall}
          isUpdateStatus={updateStatus}
        />
      )}
      {closeEnquiry && (
        <CloseEnquiryModal
          zIndex={1500}
          open={closeEnquiry}
          closeCallback={() => {
            setCloseEnquiry(false);
            fetchEnquiries();
          }}
          enquiryId={enquiry._id}
        />
      )}
      {!!editEnquiry?._id && (
        <AddEnquiryModal
          zIndex={1500}
          closeCallback={() => {
            setEditEnquiry(undefined);
          }}
          open={!!editEnquiry?._id}
          editEnquiry={
            editEnquiry ? EnquiryToEnquiryCreateWrapper(editEnquiry) : undefined
          }
        />
      )}
      {estimates.length > 0 && (
        <EstimatesModal
          zIndex={1500}
          closeCallback={() => {
            setEstimates([]);
          }}
          enquiry={enquiry}
          open={estimates.length > 0}
          estimates={estimates}
        />
      )}
      {followUp && (
        <FollowUpModal
          zIndex={1500}
          open={followUp}
          closeCallback={() => {
            setFollowUp(false);
          }}
          enquiryId={enquiry._id}
          followups={enquiry.followUps}
          contactNumber={enquiry.primaryContactNumber}
        />
      )}
    </>
  );
};

export default IndividualEnquiry;
