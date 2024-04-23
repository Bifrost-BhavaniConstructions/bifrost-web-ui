import React, { useRef } from "react";
import "./Enquiry.css";
import TabSelect from "../../../components/TabSelect";
import { useStoreState } from "../../../store/hooks";
import IndividualEnquiry from "./IndividualEnquiry";
import AddEnquiryModal from "../../../components/modals/AddEnquiryModal";
import { Portal, Tag, TagLabel } from "@chakra-ui/react";
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
import { AdjustmentsVerticalIcon, FunnelIcon } from "@heroicons/react/24/solid";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

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
  const [direction, setDirection] = React.useState("DSC");
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
    <div
      className={cn(
        "h-full w-full md:h-full md:w-full overflow-y-hidden md:overflow-y-auto overflow-x-hidden p-[16px] relative md:block",
      )}
    >
      <div className="flex flex-row px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex font-airbnb font-black text-center text-[24px] ">
          {completed
            ? "Completed Bookings"
            : closed
            ? "Closed Enquiries/Bookings"
            : "Enquiries/Bookings"}
        </div>
        {!(closed || completed || !!date) && (
          <div
            className={cn(
              !isDesktop
                ? "absolute bottom-0 w-full left-auto p-[8px]"
                : "absolute right-0 top-auto",
            )}
          >
            <Button
              size={isDesktop ? "default" : "lg"}
              className="w-full"
              onClick={() => {
                setOpenEnquiry(true);
              }}
            >
              Add Enquiry
            </Button>
          </div>
        )}
      </div>
      {!completed && (
        <div className="flex w-full justify-center items-center">
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
        </div>
      )}
      <div className="w-full flex flex-row md:px-[16px] pb-[8px]">
        <div className="flex flex-grow pr-[8px]">
          <LabelledInput
            name={""}
            value={search}
            setValue={setSearch}
            fullWidth
            inputProps={{ placeholder: "search" }}
          />
        </div>
        <div className="flex flex-col justify-end items-center pb-[2px]">
          <Button
            size={"default"}
            className="md:w-full"
            onClick={() => {
              setOpenDrawer(true);
            }}
            variant={filterApplied ? "secondary" : "outline"}
          >
            <FunnelIcon color="white" width={"14px"} />
            <CaretSortIcon color="white" width={"14px"} />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "w-full flex flex-col gap-[8px] md:h-auto flex-grow overflow-y-auto overflow-x-hidden py-[8px] md:px-[26px]",
          closed
            ? "h-[calc(100%-180px)]"
            : completed
            ? "h-[calc(100%-120px)]"
            : "h-[calc(100%-220px)]",
        )}
      >
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
              ? !enquiry.isCheckedOut && !enquiry.isClosedEnquiry
              : closed
              ? enquiry.isClosedEnquiry
              : completed
              ? enquiry.isCheckedOut && !enquiry.isClosedEnquiry
              : !enquiry.isCheckedOut && !enquiry.isClosedEnquiry,
          )
          .sort((a, b) => {
            if (sortBy === "DB") {
              return (
                (new Date(b.fromDate).getTime() -
                  new Date(a.fromDate).getTime()) *
                (direction === "ASC" ? -1 : 1)
              );
            } else {
              return (
                (new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()) *
                (direction === "ASC" ? -1 : 1)
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
                  enquiry.primaryContactNumber.toString().toLowerCase() +
                  " " +
                  enquiry.name.toLowerCase() +
                  " " +
                  moment(enquiry.fromDate).format("DD/MM/YYYY").toLowerCase()
                ).includes(search.toLowerCase())
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
          <DialogContent className="sm:max-w-[425px] z-[1501]">
            <DialogHeader>
              <DialogTitle>Sort / Filter</DialogTitle>
              <DialogDescription>
                filters are automatically applied
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col w-full z-[200]">
              <div className="flex flex-row justify-start items-start flex-grow w-full gap-[4px]">
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
                <ChakraSelect
                  fullWidth
                  name="direction"
                  value={direction}
                  values={[
                    { name: "Ascending", value: "ASC" },
                    { name: "Descending", value: "DSC" },
                  ]}
                  onValueChange={(value) => {
                    setDirection(value);
                  }}
                />
              </div>
              <div className="flex flex-col justify-start items-start flex-grow w-full">
                <div className="font-light text-[12px] opacity-70 mt-[4px] w-full">
                  function halls
                </div>
                <div className="w-full flex flex-row flex-wrap shrink-0 px-[16px] pb-[8px] gap-[10px]">
                  {filteredFunctionHalls.length > 0 && (
                    <Badge
                      variant="destructive"
                      onClick={() => {
                        setFilteredFunctionHalls([]);
                      }}
                    >
                      clear
                    </Badge>
                  )}
                  {functionHalls.map((fH) => {
                    return (
                      <Badge
                        key={fH._id}
                        variant={
                          filteredFunctionHalls.includes(fH._id!)
                            ? "secondary"
                            : "outline"
                        }
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
                        {fH.name}
                      </Badge>
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
          <DrawerContent className="z-[1500]">
            <DrawerHeader>
              <DrawerTitle>Sort / Filter</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col w-full z-[200] px-[16px]">
              <div className="flex flex-row justify-start items-start flex-grow w-full gap-[4px]">
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
                <ChakraSelect
                  fullWidth
                  name="direction"
                  value={direction}
                  values={[
                    { name: "Ascending", value: "ASC" },
                    { name: "Descending", value: "DSC" },
                  ]}
                  onValueChange={(value) => {
                    setDirection(value);
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
            <DrawerFooter>
              <DrawerClose className="w-full">
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
