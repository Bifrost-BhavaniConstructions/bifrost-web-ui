import React, { useRef } from "react";
import "./Enquiry.css";
import TabSelect from "../../../components/TabSelect";
import { useStoreState } from "../../../store/hooks";
import IndividualEnquiry from "./IndividualEnquiry";
import AddEnquiryModal from "../../../components/modals/AddEnquiryModal";
import { Button, Portal, Tag, TagLabel } from "@chakra-ui/react";
import ChakraSelect from "../../../components/ChakraSelect";
import LabelledInput from "../../../components/LabelledFormInputs/LabelledInput";
import { en } from "@fullcalendar/core/internal-common";
import moment from "moment";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { restoreEnquiry } from "@/adapters/EnquiryAdapter";
import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";
import { ArrowUturnUpIcon } from "@heroicons/react/20/solid";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UserRoleEnum } from "@/enums/UserRoleEnum";

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
  const { users } = useStoreState((state) => state.peopleStore);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [openEnquiry, setOpenEnquiry] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("DB");
  const [search, setSearch] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [filteredFunctionHalls, setFilteredFunctionHalls] = React.useState<
    string[]
  >([]);
  const [filterApplied, setFilterApplied] = React.useState(false);
  const { enquiryTypes } = useStoreState((state) => state.functionHallStore);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [filter, setFilter] = React.useState<{
    month: string | null;
    enquiryType: string | null;
    primaryReference: string | null;
  }>({
    month: null,
    enquiryType: null,
    primaryReference: null,
  });
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
    if (
      filter.month ||
      filter.enquiryType ||
      filter.primaryReference ||
      filteredFunctionHalls.length > 0
    ) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [filter, filteredFunctionHalls]);

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
      <div className="w-full flex flex-row px-[16px] pb-[8px]">
        <div className="flex flex-grow px-[8px]">
          <LabelledInput
            name={""}
            value={search}
            setValue={setSearch}
            fullWidth
            inputProps={{ placeholder: "search" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            onClick={() => {
              setOpenDrawer(true);
            }}
            className={`flex p-[8px] w-[40px] h-[40px] text-accent mt-[4px] justify-center items-center rounded-[4px] bg-low-bg ${
              filterApplied ? "bg-accent-color" : "bg-low-bg"
            }`}
          >
            <AdjustmentsVerticalIcon color="white" width={"14px"} />
          </div>
        </div>
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
          .sort((a, b) => {
            if (sortBy === "DB") {
              return (
                new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime()
              );
            } else {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
          })
          .filter((enquiry) => {
            let month = true;
            let enquiryType = true;
            let primaryReference = true;
            if (filter.month) {
              month =
                moment(enquiry.fromDate).format("YYYY-MM") === filter.month;
            }
            if (filter.enquiryType) {
              enquiryType = enquiry.enquiryType._id === filter.enquiryType;
            }
            if (filter.primaryReference) {
              primaryReference =
                enquiry.primaryReference === filter.primaryReference;
            }
            return month && enquiryType && primaryReference;
          })
          .filter((enquiry) =>
            search.trim() !== ""
              ? (
                  enquiry.primaryContactNumber.toString() +
                  " " +
                  enquiry.name +
                  " " +
                  moment(enquiry.fromDate).format("DD/MM/YYYY")
                ).includes(search)
              : true,
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
      {isDesktop ? (
        <Dialog open={openDrawer} onOpenChange={setOpenDrawer}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sort / Filter</DialogTitle>
              <DialogDescription>
                filters are automatically applied
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col w-full z-[200]">
              <div className="flex flex-col justify-start items-start flex-grow w-full">
                <ChakraSelect
                  fullWidth
                  name="sort by"
                  value={sortBy}
                  values={[
                    { name: "Date Of Booking", value: "DB" },
                    { name: "Date Of Enquiry", value: "DE" },
                  ]}
                  onValueChange={(value) => {
                    setSortBy(value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-start items-start flex-grow w-full">
                <div className="font-light text-[12px] opacity-70 mt-[4px] w-full">
                  function halls
                </div>
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
                          filteredFunctionHalls.includes(fH._id!)
                            ? "subtle"
                            : "outline"
                        }
                        className="flex shrink-0 mr-[4px]"
                        colorScheme="cyan"
                        onClick={() => {
                          if (filteredFunctionHalls.includes(fH._id!)) {
                            setFilteredFunctionHalls(
                              filteredFunctionHalls.filter(
                                (f) => f !== fH._id!,
                              ),
                            );
                          } else {
                            setFilteredFunctionHalls([
                              ...filteredFunctionHalls,
                              fH._id!,
                            ]);
                          }
                        }}
                      >
                        <TagLabel>{fH.name}</TagLabel>
                      </Tag>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start flex-grow w-full z-[200]">
                <LabelledInput
                  name={"month"}
                  value={filter.month!}
                  setValue={(_val: string) => {
                    setFilter({ ...filter, month: _val });
                  }}
                  inputProps={{ type: "month" }}
                />
                <ChakraSelect
                  name="primary reference"
                  value={filter.primaryReference!}
                  values={users
                    .filter((user) => user.role === UserRoleEnum.SUPER_ADMIN)
                    .map((fH) => ({
                      name: fH.name,
                      value: fH._id!,
                    }))}
                  onValueChange={(value) => {
                    setFilter({ ...filter, primaryReference: value });
                  }}
                />
                <ChakraSelect
                  name="enquiry type"
                  value={filter.enquiryType!}
                  values={enquiryTypes.map((fH) => ({
                    name: fH.name,
                    value: fH._id!,
                  }))}
                  onValueChange={(value) => {
                    setFilter({ ...filter, enquiryType: value });
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setSortBy("DB");
                  setFilteredFunctionHalls([]);
                  setOpenDrawer(false);
                  setFilter({
                    primaryReference: null,
                    enquiryType: null,
                    month: null,
                  });
                }}
              >
                Clear All
              </Button>
              <Button variant="outline" onClick={() => setOpenDrawer(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={openDrawer} dismissible onOpenChange={setOpenDrawer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Sort / Filter</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose className="w-full">
                <Button
                  className="w-full"
                  onClick={() => {
                    setSortBy("DB");
                    setFilteredFunctionHalls([]);
                    setOpenDrawer(false);
                  }}
                >
                  Clear All
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Enquiry;
