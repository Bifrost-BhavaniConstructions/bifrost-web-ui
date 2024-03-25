import React from "react";
import "./Enquiry.css";
import TabSelect from "../../../components/TabSelect";
import { useStoreState } from "../../../store/hooks";
import IndividualEnquiry from "./IndividualEnquiry";
import AddEnquiryModal from "../../../components/modals/AddEnquiryModal";
import { Tag, TagLabel } from "@chakra-ui/react";

interface QueriesProps {
  date?: Date;
  functionHall?: string;
  closed?: boolean;
  completed?: boolean;
}

const Enquiry: React.FC<QueriesProps> = ({
  date,
  functionHall,
  closed,
  completed,
}) => {
  // Objects
  const { enquiries, functionHalls } = useStoreState(
    (state) => state.functionHallStore,
  );

  // Variables
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [openEnquiry, setOpenEnquiry] = React.useState(false);
  const [filteredFunctionHalls, setFilteredFunctionHalls] = React.useState<
    string[]
  >([]);
  // State Variables - Hooks

  // Functions
  const isDateInRange = (
    dateToCheck: string,
    fromDate: string,
    toDate: string,
  ) => {
    // Check if the dateToCheck is equal to or greater than fromDate
    // and equal to or less than toDate
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const checkDate = new Date(dateToCheck);

    // Set the time portion to midnight (00:00:00) for all dates
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    // Compare the dates
    return checkDate >= from && checkDate <= to;
  };

  // Hook Functions
  React.useEffect(() => {
    console.log(
      enquiries
        .filter((enquiry) =>
          completed
            ? enquiry.isBooking
            : selectedTab === 0
            ? !enquiry.isBooking
            : enquiry.isBooking,
        )
        .filter((enquiry) =>
          !!date
            ? true
            : !closed
            ? !enquiry.isCheckedOut && !enquiry.isClosedEnquiry
            : !completed
            ? enquiry.isClosedEnquiry
            : enquiry.isCheckedOut,
        ),
    );
    console.log(completed);
  }, [completed]);

  return (
    <div className="flex flex-col h-[calc(100%-88px)]">
      {!(closed || completed) && (
        <div className="flex w-full p-[8px]">
          <div
            className="flex px-[20px] py-[12px] justify-center bg-low-bg rounded-[8px] w-full h-full"
            onClick={() => {
              setOpenEnquiry(true);
            }}
          >
            Add Enquiry
          </div>
        </div>
      )}
      {!completed && (
        <TabSelect
          options={[
            {
              text: !closed ? "Enquiry" : "Closed Enquiries",
            },
            {
              text: !closed ? "Bookings" : "Closed Bookings",
            },
          ]}
          tabIndex={selectedTab}
          setTabIndex={setSelectedTab}
        />
      )}
      {completed && (
        <div className="flex flex-row px-[24px] py-[16px] justify-between">
          <div className="flex font-airbnb font-black text-[24px]">
            Completed Bookings
          </div>
        </div>
      )}
      <div className="w-full flex flex-row overflow-x-auto shrink-0 px-[16px] pb-[8px] no-scrollbar">
        {filteredFunctionHalls.length > 0 && (
          <Tag
            size={"md"}
            variant={"subtle"}
            className="flex shrink-0 mr-[4px]"
            colorScheme="red"
            onClick={() => {
              setFilteredFunctionHalls([]);
            }}
          >
            <TagLabel>clear</TagLabel>
          </Tag>
        )}
        {functionHalls.map((fH) => {
          return (
            <Tag
              key={fH._id}
              size={"md"}
              variant={
                filteredFunctionHalls.includes(fH._id!) ? "subtle" : "outline"
              }
              className="flex shrink-0 mr-[4px]"
              colorScheme="cyan"
              onClick={() => {
                if (filteredFunctionHalls.includes(fH._id!)) {
                  setFilteredFunctionHalls(
                    filteredFunctionHalls.filter((f) => f !== fH._id!),
                  );
                } else {
                  setFilteredFunctionHalls([...filteredFunctionHalls, fH._id!]);
                }
              }}
            >
              <TagLabel>{fH.name}</TagLabel>
            </Tag>
          );
        })}
      </div>
      <div className="w-full h-[calc(100%-72px)] overflow-y-auto overflow-x-hidden p-[8px]">
        {enquiries
          .filter((enquiry) =>
            functionHall ? enquiry.functionHall._id === functionHall : true,
          )
          .filter((enquiry) =>
            filteredFunctionHalls.length > 0
              ? filteredFunctionHalls.includes(enquiry.functionHall._id!)
              : true,
          )
          .filter((enquiry) =>
            date
              ? isDateInRange(
                  new Date(date).toLocaleDateString("en-US"),
                  new Date(enquiry.fromDate).toLocaleDateString("en-US"),
                  new Date(enquiry.toDate).toLocaleDateString("en-US"),
                )
              : true,
          )
          .filter((enquiry) =>
            completed
              ? enquiry.isBooking
              : selectedTab === 0
              ? !enquiry.isBooking
              : enquiry.isBooking,
          )
          .filter((enquiry) =>
            !!date
              ? true
              : closed
              ? enquiry.isClosedEnquiry
              : completed
              ? enquiry.isCheckedOut && !enquiry.isClosedEnquiry
              : !enquiry.isCheckedOut && !enquiry.isClosedEnquiry,
          )
          .map((enquiry) => (
            <IndividualEnquiry
              key={enquiry._id}
              enquiry={enquiry}
              closed={closed!}
            />
          ))}
      </div>
      {openEnquiry && (
        <AddEnquiryModal
          closeCallback={() => {
            setOpenEnquiry(false);
          }}
          open={openEnquiry}
        />
      )}
    </div>
  );
};

export default Enquiry;
