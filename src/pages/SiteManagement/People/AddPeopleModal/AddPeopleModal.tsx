import React from "react";
import "./AddPeopleModal.css";
import { Stack } from "@chakra-ui/react";
import ChakraModal from "../../../../components/ChakraModal";
import LabelledInput from "../../../../components/LabelledFormInputs/LabelledInput";
import { User } from "../../../../types/User";
import { UserRoleEnum } from "../../../../enums/UserRoleEnum";

interface AddPeopleModalProps {
  closeCallback: Function;
  open: boolean;
  roleToAdd: UserRoleEnum;
}

const AddPeopleModal: React.FC<AddPeopleModalProps> = ({
  open,
  closeCallback,
  roleToAdd,
}) => {
  // Objects
  const emptyUser: User = {
    aadhaar: "",
    bankAccountPersonal: {
      accountNo: "",
      ifsc: "",
      bankName: "",
      accountHolder: "",
      branch: "",
    },
    dob: "",
    driverData: {
      salary: 0,
      allowance: {
        dayShift: 0,
        nightShift: 0,
        doubleShift: 0,
      },
      license: "",
    },
    name: "",
    nickname: "",
    pan: "",
    password: "",
    personalMobileNumber: "",
    role: roleToAdd,
    platforms: [],
    supervisorData: {
      companyMobileNumber: "",
      salary: 0,
      payOT: 0,
    },
    username: "", // drivers - vendors - watchman -
  };

  // Variables

  // State Variables - Hooks
  const [user, setUser] = React.useState(emptyUser);

  // Functions

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={closeCallback}
      open={open}
      title="Add User"
      action={() => {}}
      actionText={"Submit"}
    >
      <Stack spacing={3}>
        <LabelledInput
          name="username"
          value={user.username}
          setValue={(_val: string) => {
            setUser({ ...user, username: _val });
          }}
        />
        <LabelledInput
          name="password"
          value={user.password!}
          setValue={(_val: string) => {
            setUser({ ...user, password: _val });
          }}
          inputProps={{ type: "password" }}
        />
        <LabelledInput
          name="name"
          value={user.name}
          setValue={(_val: string) => {
            setUser({ ...user, name: _val });
          }}
        />
        <LabelledInput
          name="personal mobile number"
          value={user.personalMobileNumber}
          setValue={(_val: string) => {
            setUser({ ...user, personalMobileNumber: _val });
          }}
          inputLeftAddon={"+91"}
          inputProps={{ type: "number", maxLength: 10 }}
        />
        <LabelledInput
          name="aadhaar"
          value={user.aadhaar}
          setValue={(_val: string) => {
            setUser({ ...user, aadhaar: _val });
          }}
          inputProps={{ type: "number" }}
        />
        <LabelledInput
          name="pan"
          value={user.pan}
          setValue={(_val: string) => {
            setUser({ ...user, pan: _val });
          }}
        />
        <LabelledInput
          name="nickname"
          value={user.nickname}
          setValue={(_val: string) => {
            setUser({ ...user, nickname: _val });
          }}
        />
        <LabelledInput
          name="nickname"
          value={user.dob}
          setValue={(_val: string) => {
            setUser({ ...user, dob: _val });
          }}
          inputProps={{ type: "date" }}
        />
        <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
          Bank Information
        </h3>
        <LabelledInput
          name="account no."
          value={user.bankAccountPersonal.accountNo}
          setValue={(_val: string) => {
            setUser({
              ...user,
              bankAccountPersonal: {
                ...user.bankAccountPersonal,
                accountNo: _val,
              },
            });
          }}
          inputProps={{ type: "number" }}
        />
        <LabelledInput
          name="ifsc"
          value={user.bankAccountPersonal.ifsc}
          setValue={(_val: string) => {
            setUser({
              ...user,
              bankAccountPersonal: { ...user.bankAccountPersonal, ifsc: _val },
            });
          }}
        />
        <LabelledInput
          name="bank name"
          value={user.bankAccountPersonal.bankName}
          setValue={(_val: string) => {
            setUser({
              ...user,
              bankAccountPersonal: {
                ...user.bankAccountPersonal,
                bankName: _val,
              },
            });
          }}
        />
        <LabelledInput
          name="account holder"
          value={user.bankAccountPersonal.accountHolder}
          setValue={(_val: string) => {
            setUser({
              ...user,
              bankAccountPersonal: {
                ...user.bankAccountPersonal,
                accountHolder: _val,
              },
            });
          }}
        />
        <LabelledInput
          name="branch"
          value={user.bankAccountPersonal.branch}
          setValue={(_val: string) => {
            setUser({
              ...user,
              bankAccountPersonal: {
                ...user.bankAccountPersonal,
                branch: _val,
              },
            });
          }}
        />
        {roleToAdd === UserRoleEnum.DRIVER && (
          <>
            <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
              Driver Data
            </h3>
            <LabelledInput
              name="license no."
              value={user.driverData?.license!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  driverData: { ...user.driverData!, license: _val },
                });
              }}
            />
            <LabelledInput
              name="salary"
              value={user.driverData?.salary!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  driverData: { ...user.driverData!, salary: _val },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="allowance - day shift"
              value={user.driverData?.allowance.dayShift!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  driverData: {
                    ...user.driverData!,
                    allowance: {
                      ...user.driverData!.allowance,
                      dayShift: _val,
                    },
                  },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="allowance - night shift"
              value={user.driverData?.allowance.nightShift!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  driverData: {
                    ...user.driverData!,
                    allowance: {
                      ...user.driverData!.allowance,
                      nightShift: _val,
                    },
                  },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="allowance - double shift"
              value={user.driverData?.allowance.doubleShift!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  driverData: {
                    ...user.driverData!,
                    allowance: {
                      ...user.driverData!.allowance,
                      doubleShift: _val,
                    },
                  },
                });
              }}
              inputProps={{ type: "number" }}
            />
          </>
        )}
        {roleToAdd === UserRoleEnum.SUPERVISOR && (
          <>
            <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
              Supervisor Data
            </h3>
            <LabelledInput
              name="company mobile no."
              value={user.supervisorData?.companyMobileNumber!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  supervisorData: {
                    ...user.supervisorData!,
                    companyMobileNumber: _val,
                  },
                });
              }}
            />
            <LabelledInput
              name="salary"
              value={user.supervisorData?.salary!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  supervisorData: { ...user.supervisorData!, salary: _val },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="salary"
              value={user.supervisorData?.payOT!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  supervisorData: { ...user.supervisorData!, payOT: _val },
                });
              }}
              inputProps={{ type: "number" }}
            />
          </>
        )}
      </Stack>
    </ChakraModal>
  );
};

export default AddPeopleModal;
