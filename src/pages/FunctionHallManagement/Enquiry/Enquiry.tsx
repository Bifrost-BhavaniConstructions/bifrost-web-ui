import React from "react";
import "./Enquiry.css";
import TabSelect from "../../../components/TabSelect";
import { useStoreState } from "../../../store/hooks";
import IndividualEnquiry from "./IndividualEnquiry";
import moment from "moment/moment";
import AddEnquiryModal from "../../../components/modals/AddEnquiryModal";

interface QueriesProps {
  date?: Date;
  functionHall?: string;
}

const Enquiry: React.FC<QueriesProps> = ({ date, functionHall }) => {
  // Objects
  const enquiries = useStoreState((state) => state.functionHallStore.enquiries);

  // Variables
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [openEnquiry, setOpenEnquiry] = React.useState(false);

  // State Variables - Hooks

  // Functions
  const isDateInRange = (dateToCheck: string, fromDate: Date, toDate: Date) => {
    // Check if the dateToCheck is equal to or greater than fromDate
    // and equal to or less than toDate
    const fromTimestamp = moment(fromDate.toISOString());
    const toTimestamp = moment(toDate.toISOString());

    // Create an array to store all dates in MM/DD/YYYY format
    const allDates = [];

    // Start from the "from" date and add each date to the array until we reach the "to" date
    const currentDate = fromTimestamp.clone();
    while (currentDate.isSameOrBefore(toTimestamp)) {
      allDates.push(currentDate.format("MM/DD/YYYY"));
      currentDate.add(1, "days");
    }
    return allDates.includes(dateToCheck);
  };

  // Hook Functions

  return (
    <div className="flex flex-col h-[calc(100%-88px)]">
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
      <TabSelect
        options={[
          {
            text: "Enquiry",
          },
          {
            text: "Bookings",
          },
        ]}
        tabIndex={selectedTab}
        setTabIndex={setSelectedTab}
      />
      <div className="w-full h-[calc(100%-72px)] overflow-y-auto overflow-x-hidden p-[8px]">
        {enquiries
          .filter((enquiry) =>
            functionHall ? enquiry.functionHall._id === functionHall : true,
          )
          // .filter((enquiry) =>
          //   date
          //     ? isDateInRange(
          //         moment(
          //           new Date(date).toLocaleDateString(),
          //           "MM/DD/YYYY",
          //         ).format("MM/DD/YYYY"),
          //         moment(
          //           new Date(enquiry.fromDate).toLocaleDateString(),
          //           "MM/DD/YYYY",
          //         ).toDate(),
          //         moment(
          //           new Date(enquiry.toDate).toLocaleDateString(),
          //           "MM/DD/YYYY",
          //         ).toDate(),
          //       )
          //     : true,
          // )
          .map((e, i) => {
            return (
              <div key={i} className="p-[20px]">
                <>
                  date
                  {moment(
                    new Date(date ? date : "").toLocaleDateString(),
                    "MM/DD/YYYY",
                  ).format("MM/DD/YYYY")}
                  from
                  {moment(
                    new Date(e.fromDate).toLocaleDateString(),
                    "MM/DD/YYYY",
                  )
                    .toDate()
                    .toISOString()}
                  to
                  {moment(new Date(e.toDate).toLocaleDateString(), "MM/DD/YYYY")
                    .toDate()
                    .toISOString()}
                  true
                  {isDateInRange(
                    moment(
                      new Date(date ? date : "").toLocaleDateString(),
                      "MM/DD/YYYY",
                    ).format("MM/DD/YYYY"),
                    moment(
                      new Date(e.fromDate).toLocaleDateString(),
                      "MM/DD/YYYY",
                    ).toDate(),
                    moment(
                      new Date(e.toDate).toLocaleDateString(),
                      "MM/DD/YYYY",
                    ).toDate(),
                  )}
                </>
              </div>
            );
          })}
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
