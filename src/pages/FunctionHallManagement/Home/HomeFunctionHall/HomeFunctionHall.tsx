import React from "react";
import "./HomeFunctionHall.css";
import { useStoreState } from "../../../../store/hooks";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import FunctionHallDayViewModal from "../../../../components/modals/FunctionHallDayViewModal";
import FunctionHall from "../../../../types/FunctionHall/FunctionHall";
import AddEnquiryModal from "../../../../components/modals/AddEnquiryModal";
import { useNavigate, useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { EyeIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface HomeFunctionHallProps {}

interface EventCounts {
  [date: string]: {
    bookingCount: number;
    nonBookingCount: number;
    floatingCount: number;
  };
}

const HomeFunctionHall: React.FC<HomeFunctionHallProps> = ({}) => {
  // Objects

  const { enquiries, functionHalls } = useStoreState(
    (state) => state.functionHallStore,
  );

  // Variables
  const { fh_id } = useParams();

  // State Variables - Hooks
  const navigate = useNavigate();
  const [functionHall, setFunctionHall] = React.useState<
    FunctionHall | undefined
  >();
  const [openEnquiry, setOpenEnquiry] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedFunctionHall, setSelectedFunctionHall] = React.useState<
    string | undefined
  >();

  // Functions
  const getEvents = (functionHall: FunctionHall) => {
    const eventCounts: EventCounts = {};
    enquiries
      .filter((enquiry) => functionHall._id === enquiry.functionHall._id)
      .forEach((enquiry) => {
        if (
          !enquiry.isCheckedOut &&
          !enquiry.isClosedEnquiry &&
          enquiry.isBooking
        ) {
          // If it's a booking, iterate through each day in the date range
          const fromDate = moment(enquiry.fromDate);
          const toDate = moment(enquiry.toDate);

          while (fromDate.isSameOrBefore(toDate, "day")) {
            const formattedDate = fromDate.format("YYYY-MM-DD");

            // Create an event for each day
            if (!eventCounts[formattedDate]) {
              eventCounts[formattedDate] = {
                bookingCount: 0,
                nonBookingCount: 0,
                floatingCount: 0,
              };
            }

            eventCounts[formattedDate].bookingCount++;
            fromDate.add(1, "day"); // Move to the next day
          }
        } else if (!enquiry.isCheckedOut && !enquiry.isClosedEnquiry) {
          // If it's not a booking, just count it for the 'nonBookingCount'
          const formattedDate = moment(enquiry.fromDate).format("YYYY-MM-DD");
          if (!eventCounts[formattedDate]) {
            eventCounts[formattedDate] = {
              bookingCount: 0,
              nonBookingCount: 0,
              floatingCount: 0,
            };
          }
          if (enquiry.isFloating) {
            eventCounts[formattedDate].floatingCount++;
          } else eventCounts[formattedDate].nonBookingCount++;
        }
      });

    const events = Object.keys(eventCounts).map((date) => {
      const counts = eventCounts[date];
      return {
        date,
        bookingCount: counts.bookingCount,
        nonBookingCount: counts.nonBookingCount,
        floatingCount: counts.floatingCount,
      };
    });
    return events
      .map((item) => {
        const bookingTitle = `${item.bookingCount} Bookings`;
        const floatingTitle = `${item.floatingCount} Floating`;
        const enquiriesTitle = `${
          item.nonBookingCount + item.bookingCount
        } Enquiries`;

        const events = [
          {
            title: bookingTitle,
            date: moment(item.date).format("YYYY-MM-DD"),
            end: moment(item.date).format("YYYY-MM-DD"),
            backgroundColor: "#3688D8",
          },
          {
            title: enquiriesTitle,
            date: moment(item.date).format("YYYY-MM-DD"),
            end: moment(item.date).format("YYYY-MM-DD"),
            backgroundColor: "#3688D8",
          },
        ];

        if (item.floatingCount > 0) {
          events.push({
            title: floatingTitle,
            date: moment(item.date).format("YYYY-MM-DD"),
            end: moment(item.date).format("YYYY-MM-DD"),
            backgroundColor: "#9d904a",
          });
        }
        return events;
      })
      .reduce((acc, val) => acc.concat(val), []);
  };

  // Hook Functions

  React.useEffect(() => {
    if (fh_id) {
      setFunctionHall(functionHalls.filter((f) => f._id === fh_id)[0]);
    }
  }, [fh_id]);

  return (
    <div className="flex h-full md:h-full flex-grow overflow-x-auto overflow-y-hidden">
      {functionHall && (
        <>
          <div
            key={functionHall._id}
            className="flex flex-col min-w-[100vw] md:min-w-full h-[100%] p-[10px] md:justify-between md:items-start"
          >
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-row flex-grow px-[24px] pb-[8px] md:pb-[24px] pt-[8px] justify-center items-center md:relative">
                <div className="flex font-airbnb font-black md:text-center text-[30px] ">
                  {functionHall.name}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex ">
                  <div className="flex flex-grow rounded-[4px] flex-col">
                    <div className="flex flex-1 flex-grow p-[4px] rounded-[4px]">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setOpenEnquiry(true);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                    <div className="flex flex-1 flex-grow p-[4px] rounded-[4px]">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          navigate("/function-hall-management/queries");
                        }}
                      >
                        <EyeIcon width={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-grow w-full md:flex-grow-0 md:h-[100%]">
              <div className="flex flex-grow ">
                <FullCalendar
                  key={functionHall._id}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  dayMaxEventRows={3}
                  fixedWeekCount={false}
                  events={getEvents(functionHall)}
                  dateClick={(info) => {
                    setSelectedDate(new Date(info.dateStr));
                    setSelectedFunctionHall(functionHall._id);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {!!selectedDate && !!selectedFunctionHall && (
        <FunctionHallDayViewModal
          open={!!selectedDate && !!selectedFunctionHall}
          closeCallback={() => {
            setSelectedDate(undefined);
          }}
          date={selectedDate!}
          functionHallId={selectedFunctionHall!}
        />
      )}
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

export default HomeFunctionHall;
