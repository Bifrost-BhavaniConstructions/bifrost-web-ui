import React from "react";
import "./Attendance.css";
import TailwindButton from "../../../components/TailwindButton";
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
      <div className="flex flex-row px-[24px] py-[16px] justify-between">
        <div className="flex font-airbnb font-black text-[24px]">
          Attendance
        </div>
        <ChakraSelect
          name=""
          placeholder={"select user"}
          value={selectedUser?._id!}
          values={siteUsers
            .filter((fH) => fH.role !== UserRoleEnum.SUPER_ADMIN)
            .map((fH) => ({
              name: fH.name,
              value: fH._id!,
            }))}
          onValueChange={(value) => {
            setSelectedUser(siteUsers.filter((f) => f._id === value)[0]);
          }}
        />
      </div>
      <div className="flex flex-row px-[24px]  justify-between items-end">
        {selectedUser && (
          <div>
            <TailwindButton
              onClick={() => {
                setOpen(true);
              }}
              text="Mark Attendance"
            />
          </div>
        )}
      </div>

      {selectedUser && events.length > 0 && (
        <div className="flex flex-grow w-full flex-1">
          <div className="flex flex-grow ">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dayMaxEventRows={3}
              fixedWeekCount={false}
              events={events.map((e) => ({ title: "P", date: e.date }))}
              dateClick={(info) => {
                const event = events.filter((e) => e.date === info.dateStr)[0];
                if (event) setRemark(event.title);
              }}
            />
          </div>
        </div>
      )}
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
