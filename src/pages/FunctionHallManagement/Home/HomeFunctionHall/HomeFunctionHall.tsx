import React from "react";
import "./HomeFunctionHall.css";
import useScrollSnap from "../../../../hooks/useScrollSnap";
import { useStoreState } from "../../../../store/hooks";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import FunctionHallDayViewModal from "../../../../components/modals/FunctionHallDayViewModal";

interface HomeFunctionHallProps {}

const HomeFunctionHall: React.FC<HomeFunctionHallProps> = () => {
  // Objects
  const { functionHalls, enquiries } = useStoreState(
    (state) => state.functionHallStore,
  );

  // Variables

  // State Variables - Hooks
  const containerRef = React.createRef<HTMLDivElement>();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedFunctionHall, setSelectedFunctionHall] = React.useState<
    string | undefined
  >();

  useScrollSnap(
    containerRef,
    { snapDestinationX: "100%", snapStop: true },
    (ref) => {
      console.log(ref);
    },
  );

  // Functions

  // Hook Functions

  return (
    <div
      ref={containerRef}
      className="flex h-[90%] overflow-x-auto overflow-y-hidden"
    >
      {functionHalls.map((functionHall) => {
        type EnquiriesByDate = Record<string, number>;
        const enquiriesByDate: EnquiriesByDate = {};

        // Iterate through each Enquiry and update the counts for each date
        enquiries.length &&
          enquiries
            .filter(
              (e) => e.functionHall._id === functionHall._id && !e.isBooking,
            )
            .forEach((enquiry) => {
              const startDate = new Date(enquiry.fromDate);
              const endDate = new Date(enquiry.toDate);
              // console.log("HFH: ", startDate);
              // console.log("HFH: ", endDate);
              // Iterate through the date range of the current enquiry
              for (
                let date = startDate;
                date <= endDate;
                date.setDate(date.getDate() + 1)
              ) {
                const dateStr = moment(
                  date.toLocaleDateString(),
                  "MM/DD/YYYY",
                ).format("YYYY-MM-DD"); // Convert date to string in 'YYYY-MM-DD' format
                // Update the count for the current date
                console.log("HFH: ", dateStr);

                enquiriesByDate[dateStr] = (enquiriesByDate[dateStr] || 0) + 1;
              }
            });
        return (
          <>
            <div
              key={functionHall._id}
              className="flex flex-col min-w-[100vw] h-[100%] p-[10px]"
            >
              <div className="flex justify-center items-center text-[14px] font-bold">
                {functionHall.name}
              </div>
              <div className="flex flex-grow w-full">
                <div className="flex flex-grow ">
                  <FullCalendar
                    key={functionHall._id}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dayMaxEventRows={3}
                    events={enquiries
                      .filter(
                        (enquiry) =>
                          functionHall._id === enquiry.functionHall._id,
                      )
                      .filter((q) => q.isBooking)
                      .map((query) => {
                        console.log(query.fromDate);
                        return {
                          title: query.name,
                          date: moment(query.fromDate).format("yyyy-MM-DD"),
                          end: moment(query.toDate).format("yyyy-MM-DD"),
                        };
                      })}
                    dateClick={(info) => {
                      console.log("Clicked hall: " + functionHall.name);
                      console.log("Clicked on: " + info.dateStr);
                      setSelectedDate(new Date(info.dateStr));
                      setSelectedFunctionHall(functionHall._id);
                    }}
                    dayCellContent={(arg) => {
                      // Get the date for the current day cell
                      const date = moment(
                        arg.date.toLocaleDateString(),
                        "MM/DD/YYYY",
                      ).format("YYYY-MM-DD"); // Format date as 'YYYY-MM-DD'

                      // Use an imaginary function `getEnquiryCount` to fetch the count of enquiries for the date
                      // const enquiryCount = getEnquiryCount(date); // You should implement this function

                      // Create the content to display in the day cell
                      const content = `<div class="fc-daygrid-day-count flex w-full">
                           ${
                             enquiriesByDate[date]
                               ? `<div class="flex bg-accent rounded-[3px] text-[12px] items-center px-[4px]">${enquiriesByDate[date]}</div>`
                               : ""
                           }
                           <div class="flex flex-grow justify-end">${
                             arg.dayNumberText
                           }</div>
                        </div>`;

                      return { html: content };
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      })}
      <FunctionHallDayViewModal
        open={!!selectedDate && !!selectedFunctionHall}
        closeCallback={() => {
          setSelectedDate(undefined);
        }}
        date={selectedDate!}
        functionHallId={selectedFunctionHall!}
      />
    </div>
  );
};

export default HomeFunctionHall;
