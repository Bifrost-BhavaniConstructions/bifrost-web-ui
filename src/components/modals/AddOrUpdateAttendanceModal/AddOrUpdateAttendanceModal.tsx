import React from "react";
import "./AddOrUpdateAttendanceModal.css";
import ChakraModal from "../ChakraModal";
import { Site } from "../../../types/SiteManagement/Site";
import { Attendance } from "../../../types/SiteManagement/Attendance";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import { User } from "../../../types/User";
import ChakraSelect from "../../ChakraSelect";
import { useStoreState } from "../../../store/hooks";
import Radio from "../../Radio";
import { SiteShiftEnum } from "../../../enums/SiteShiftEnum";
import { Radio as R, RadioGroup, Stack } from "@chakra-ui/react";
import {
  getSiteDutyTypeEnumFromString,
  SiteDutyTypeEnum,
} from "../../../enums/SiteDutyTypeEnum";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import moment from "moment";

interface AddOrUpdateAttendanceModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (attendance: Attendance) => void;
  editAttendance?: Site;
}

const AddOrUpdateAttendanceModal: React.FC<AddOrUpdateAttendanceModalProps> = ({
  closeCallback,
  open,
  cta,
  editAttendance,
}) => {
  // Objects
  const emptyAttendance: Attendance = {
    of: "",
    on: new Date(),
    role: UserRoleEnum.DRIVER,
    site: "",
    shift: SiteShiftEnum.DAY,
    dutyType: SiteDutyTypeEnum.DUTY,
    shiftPay: 0,
  };

  // Variables
  const { siteUsers } = useStoreState((state) => state.peopleStore);
  const { sites } = useStoreState((state) => state.siteManagementStore);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>(
    undefined,
  );
  const [attendance, setAttendance] = React.useState(emptyAttendance);
  // Functions
  const validateAttendance: () => boolean = () => {
    return attendance.of !== "" && attendance.site !== "";
  };

  // Hook Functions
  React.useEffect(() => {
    if (selectedUser && selectedUser.role === UserRoleEnum.DRIVER) {
      if (attendance.dutyType === SiteDutyTypeEnum.DUTY) {
        if (attendance.shift === SiteShiftEnum.DAY) {
          setAttendance({
            ...attendance,
            shiftPay: selectedUser.driverData?.allowance.dayShift,
          });
        } else if (attendance.shift === SiteShiftEnum.NIGHT) {
          setAttendance({
            ...attendance,
            shiftPay: selectedUser.driverData?.allowance.nightShift,
          });
        } else if (attendance.shift === SiteShiftEnum.DN) {
          setAttendance({
            ...attendance,
            shiftPay: selectedUser.driverData?.allowance.doubleShift,
          });
        }
      } else {
        setAttendance({
          ...attendance,
          shiftPay: selectedUser.driverData?.idlePay,
        });
      }
    }
  }, [selectedUser, attendance.shift, attendance.dutyType]);

  return (
    <ChakraModal
      closeCallback={() => {
        closeCallback();
      }}
      open={open}
      title={"Add Site"}
      action={async () => {
        await cta(attendance);
        setAttendance(emptyAttendance);
        setSelectedUser(undefined);
        closeCallback();
      }}
      actionText={"Submit"}
      isButtonDisabled={!validateAttendance()}
    >
      <ChakraSelect
        name="target account"
        value={attendance.of}
        values={siteUsers
          .filter((fH) => fH.role !== UserRoleEnum.SUPER_ADMIN)
          .map((fH) => ({
            name: fH.name,
            value: fH._id!,
          }))}
        onValueChange={(value) => {
          setAttendance({ ...attendance, of: value });
          setSelectedUser(siteUsers.filter((f) => f._id === value)[0]);
        }}
      />
      <ChakraSelect
        name="site"
        value={attendance.site}
        values={sites.map((fH) => ({
          name: fH.name,
          value: fH._id!,
        }))}
        onValueChange={(value) => {
          setAttendance({ ...attendance, site: value });
        }}
      />
      {selectedUser && selectedUser.role === UserRoleEnum.DRIVER && (
        <>
          <div className="font-light text-[12px] opacity-70">shift type</div>
          <RadioGroup
            value={attendance.dutyType}
            onChange={(e) => {
              setAttendance({
                ...attendance,
                dutyType: getSiteDutyTypeEnumFromString(e),
              });
            }}
            className="p-[8px] my-[4px]"
            defaultValue="IDLE"
          >
            <Stack spacing={4} direction="row">
              <R value="IDLE">Idle</R>
              <R value="DUTY">Duty</R>
            </Stack>
          </RadioGroup>
          {attendance.dutyType === SiteDutyTypeEnum.DUTY && (
            <>
              <div className="font-light text-[12px] opacity-70 ">shift</div>
              <Radio
                isWrapped={false}
                isHighlighted={true}
                noPadding
                options={[
                  {
                    text: <div className="flex">D</div>,
                    onClick: () => {
                      setAttendance({
                        ...attendance,
                        shift: SiteShiftEnum.DAY,
                      });
                    },
                  },
                  {
                    text: <div className="flex">N</div>,
                    onClick: () => {
                      setAttendance({
                        ...attendance,
                        shift: SiteShiftEnum.NIGHT,
                      });
                    },
                  },
                  {
                    text: <div className="flex">D/N</div>,
                    onClick: () => {
                      setAttendance({ ...attendance, shift: SiteShiftEnum.DN });
                    },
                  },
                ]}
              />
            </>
          )}
          <LabelledInput
            required
            name="shift pay"
            value={attendance.shiftPay!}
            setValue={(_val: number) => {
              setAttendance({ ...attendance, shiftPay: _val });
            }}
            inputProps={{ type: "number" }}
            inputLeftAddon={"₹"}
          />
          <LabelledInput
            name="date"
            value={moment(attendance.on).format("yyyy-MM-DD")}
            setValue={(_val: string) => {
              setAttendance({ ...attendance, on: new Date(_val) });
            }}
            inputProps={{ type: "date" }}
          />
        </>
      )}
    </ChakraModal>
  );
};

export default AddOrUpdateAttendanceModal;
