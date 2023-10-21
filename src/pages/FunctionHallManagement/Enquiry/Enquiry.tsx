import React from "react";
import "./Enquiry.css";
import TabSelect from "../../../components/TabSelect";
import { useStoreState } from "../../../store/hooks";
import IndividualEnquiry from "./IndividualEnquiry";
import moment from "moment/moment";

interface QueriesProps {
  date?: Date;
  functionHall?: string;
}

const Enquiry: React.FC<QueriesProps> = ({ date, functionHall }) => {
  // Objects
  const enquiries = useStoreState((state) => state.functionHallStore.enquiries);

  // Variables
  const [selectedTab, setSelectedTab] = React.useState(0);

  // State Variables - Hooks

  // Functions
  const isDateInRange = (dateToCheck: Date, fromDate: Date, toDate: Date) => {
    // Check if the dateToCheck is equal to or greater than fromDate
    // and equal to or less than toDate
    console.log("AAAA", dateToCheck, fromDate, toDate);
    return dateToCheck >= fromDate && dateToCheck <= toDate;
  };

  // Hook Functions
  console.log(date);

  return (
    <div className="flex flex-col h-[calc(100%-88px)]">
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
          .filter((enquiry) =>
            date
              ? isDateInRange(
                  date,
                  moment(
                    new Date(enquiry.fromDate).toLocaleDateString(),
                    "MM/DD/YYYY",
                  ).toDate(),
                  moment(
                    new Date(enquiry.toDate).toLocaleDateString(),
                    "MM/DD/YYYY",
                  ).toDate(),
                )
              : true,
          )
          .filter((enquiry) =>
            selectedTab === 0 ? !enquiry.isBooking : enquiry.isBooking,
          )
          .map((enquiry) => (
            <IndividualEnquiry key={enquiry._id} enquiry={enquiry} />
          ))}
      </div>
    </div>
  );
};

export default Enquiry;
