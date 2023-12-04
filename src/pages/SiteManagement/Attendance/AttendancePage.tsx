import React from "react";
import "./Attendance.css";
import TailwindButton from "../../../components/TailwindButton";
import AddOrUpdateAttendanceModal from "../../../components/modals/AddOrUpdateAttendanceModal";
import { Attendance } from "../../../types/SiteManagement/Attendance";
import { createAttendance } from "../../../adapters/SiteManagementAdapter";

interface AttendanceProps {}

const AttendancePage: React.FC<AttendanceProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [open, setOpen] = React.useState<boolean>(false);

  // Functions
  const markAttendance = async (a: Attendance) => {
    console.log("SS");
    await createAttendance(a);
  };

  // Hook Functions

  return (
    <div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
      <div className="flex flex-row px-[24px] py-[16px] justify-between">
        <div className="flex font-airbnb font-black text-[24px]">
          Attendance
        </div>
        <TailwindButton
          onClick={() => {
            setOpen(true);
          }}
          text="Mark Attendance"
        />
      </div>
      <AddOrUpdateAttendanceModal
        open={open}
        closeCallback={() => {
          setOpen(false);
        }}
        cta={(e) => {
          console.log("SGSU");
          markAttendance(e);
        }}
      />
    </div>
  );
};

export default AttendancePage;
