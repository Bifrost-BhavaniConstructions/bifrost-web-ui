import React from "react";
import "./Attendance.css";
import AddOrUpdateAttendanceModal from "../../../components/modals/AddOrUpdateAttendanceModal";
import { Attendance } from "../../../types/SiteManagement/Attendance";
import {
  createAttendance,
  getAttendance,
} from "../../../adapters/SiteManagementAdapter";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import ChakraSelect from "../../../components/ChakraSelect";
import { useStoreState } from "../../../store/hooks";
import { User } from "../../../types/User";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ChakraModal from "../../../components/modals/ChakraModal";
import { Button } from "@/components/ui/button";

interface AttendanceProps {}

const AttendancePage: React.FC<AttendanceProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { siteUsers } = useStoreState((state) => state.peopleStore);
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>(
    undefined,
  );
  const [remark, setRemark] = React.useState<string | undefined>();
  const [events, setEvents] = React.useState<{ title: string; date: string }[]>(
    [],
  );
  // Functions
  const markAttendance = async (a: Attendance) => {
    await createAttendance(a);
    getAttendance(selectedUser?._id!).then((res) => {
      setEvents(res);
    });
  };

  // Hook Functions
  React.useEffect(() => {
    if (selectedUser) {
      getAttendance(selectedUser._id!).then((res) => {
        setEvents(res);
      });
    }
  }, [selectedUser]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col min-w-[100vw] md:min-w-full h-[100%] p-[10px] md:justify-between md:items-start">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-row flex-grow px-[24px] pb-[8px] md:pb-[24px] pt-[8px] justify-center items-center md:relative">
            <div className="flex font-airbnb font-black md:text-center text-[30px] ">
              Attendance
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center items-center">
              <div className="flex flex-grow rounded-[4px] flex-col mr-[10px]">
                <ChakraSelect
                  name=""
                  placeholder={"select user"}
                  value={selectedUser?._id!}
                  values={siteUsers
                    .filter((fH) =>
                      [UserRoleEnum.DRIVER, UserRoleEnum.VENDOR].includes(
                        fH.role,
                      ),
                    )
                    .map((fH) => ({
                      name: fH.name,
                      value: fH._id!,
                    }))}
                  onValueChange={(value) => {
                    setSelectedUser(
                      siteUsers.filter((f) => f._id === value)[0],
                    );
                  }}
                />
              </div>
              <div className="flex flex-grow rounded-[4px] flex-col justify-center items-center">
                {selectedUser && (
                  <div>
                    <Button
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Mark Attendance
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-grow w-full md:flex-grow-0 md:h-[calc(100%-88px)]">
          <div className="flex flex-grow ">
            {selectedUser && events.length > 0 && (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dayMaxEventRows={3}
                fixedWeekCount={false}
                events={events.map((e) => ({ title: "P", date: e.date }))}
                dateClick={(info) => {
                  const event = events.filter(
                    (e) => e.date === info.dateStr,
                  )[0];
                  if (event) setRemark(event.title);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {selectedUser && open && (
        <AddOrUpdateAttendanceModal
          open={open}
          closeCallback={() => {
            setOpen(false);
          }}
          cta={(e) => {
            markAttendance(e);
          }}
          selectedUserParent={selectedUser}
          existingDates={events.map((event) => event.date)}
        />
      )}
      {!!remark && (
        <ChakraModal
          closeCallback={() => {
            setRemark(undefined);
          }}
          open={!!remark}
          title={"attendance"}
          action={() => {}}
          minH={200}
        >
          {remark.split(";").map((r) => {
            return <div>{r}</div>;
          })}
        </ChakraModal>
      )}
    </div>
  );
};

export default AttendancePage;
