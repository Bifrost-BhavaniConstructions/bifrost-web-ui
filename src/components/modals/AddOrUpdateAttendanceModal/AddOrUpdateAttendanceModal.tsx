import React from "react";
import "./AddOrUpdateAttendanceModal.css";
import ChakraModal from "../ChakraModal";
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
import { toast } from "sonner";

interface AddOrUpdateAttendanceModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (attendance: Attendance) => void;
  selectedUserParent?: User;
  existingDates: string[];
}

const AddOrUpdateAttendanceModal: React.FC<AddOrUpdateAttendanceModalProps> = ({
  closeCallback,
  open,
  cta,
  selectedUserParent,
  existingDates,
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
    vendorItems: [],
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
    } else if (selectedUser && selectedUser.role === UserRoleEnum.VENDOR) {
      setAttendance({
        ...attendance,
        vendorItems: selectedUser.vendorData?.items.map((i) => {
          return {
            name: i.name,
            cost: 0,
            charge: i.charge,
            amount: 0,
          };
        }),
      });
    }
  }, [selectedUser, attendance.shift, attendance.dutyType]);

  React.useEffect(() => {
    if (selectedUserParent) {
      setSelectedUser(selectedUserParent);
      setAttendance({
        ...attendance,
        of: selectedUserParent._id!,
        role: selectedUserParent.role,
      });
    }
  }, [selectedUserParent]);

  return (
    <ChakraModal
      closeCallback={() => {
        closeCallback();
      }}
      open={open}
      title={"Mark Attendance"}
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
      <LabelledInput
        name="date"
        value={moment(attendance.on).format("yyyy-MM-DD")}
        setValue={(_val: string) => {
          const selectedDate = new Date(_val);
          const currentDate = new Date();

          if (existingDates.includes(_val)) {
            toast.error("Attendance already marked for that day.");
          } else if (selectedDate > currentDate) {
            toast.error("You cannot mark attendance for a future date.");
          } else {
            setAttendance({ ...attendance, on: selectedDate });
          }
        }}
        inputProps={{ type: "date" }}
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
        </>
      )}
      {selectedUser && selectedUser.role === UserRoleEnum.VENDOR && (
        <>
          <div className="font-light text-[12px] opacity-70">vendor items</div>
          {attendance.vendorItems &&
            attendance.vendorItems.map((item, index) => {
              return (
                <LabelledInput
                  key={item.name}
                  name={item.name}
                  value={item.cost / item.charge!}
                  setValue={(_val: number) => {
                    setAttendance({
                      ...attendance,
                      vendorItems: attendance.vendorItems?.map((vI, i) =>
                        i === index
                          ? {
                              ...vI,
                              cost: vI.charge! * _val,
                              amount: Number(_val),
                            }
                          : vI,
                      ),
                    });
                  }}
                  inputProps={{ type: "number" }}
                />
              );
            })}
        </>
      )}
    </ChakraModal>
  );
};

export default AddOrUpdateAttendanceModal;
