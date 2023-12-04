import React from "react";
import "./AddPeopleModal.css";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { User } from "../../../types/User";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import {
  getPlatformEnumFromString,
  PlatformEnum,
} from "../../../enums/PlatformEnum";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";
import TailwindButton from "../../TailwindButton";
import { DeleteIcon } from "@chakra-ui/icons";

interface AddPeopleModalProps {
  closeCallback: Function;
  open: boolean;
  roleToAdd: UserRoleEnum;
  platform: PlatformEnum;
  isEdit: boolean;
  editUser?: User;
}

const AddPeopleModal: React.FC<AddPeopleModalProps> = ({
  open,
  closeCallback,
  roleToAdd,
  isEdit,
  editUser,
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
      idlePay: 0,
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
    managerData: {
      companyMobileNumber: "",
      salary: 0,
      payOT: 0,
    },
    securityGuardSecondaryData: {
      aadhaar: "",
      bankAccountPersonal: {
        accountNo: "",
        ifsc: "",
        bankName: "",
        accountHolder: "",
        branch: "",
      },
      dob: "",
      name: "",
      nickname: "",
      pan: "",
      personalMobileNumber: "",
    },
    vendorData: {
      items: [],
    },
    username: "", // drivers - vendors - watchman -
  };

  // Variables

  // State Variables - Hooks
  const [user, setUser] = React.useState(emptyUser);
  const fetchUsers = useStoreActions(
    (actions) => actions.peopleStore.fetchUsers,
  );

  // Functions
  const createUser = () => {
    const {
      driverData,
      vendorData,
      managerData,
      supervisorData,
      securityGuardSecondaryData,
      ...basicData
    } = user;
    ////console.log(basicData);
    let data: User;
    switch (roleToAdd) {
      case UserRoleEnum.SUPER_ADMIN:
        data = basicData;
        break;
      case UserRoleEnum.ADMIN:
        data = basicData;
        break;
      case UserRoleEnum.SUPERVISOR:
        data = { ...basicData, supervisorData };
        break;
      case UserRoleEnum.DRIVER:
        data = { ...basicData, driverData };
        break;
      case UserRoleEnum.FH_MANAGER:
        data = { ...basicData, managerData };
        break;
      case UserRoleEnum.FH_SECURITY:
        data = { ...basicData, securityGuardSecondaryData };
        break;
      case UserRoleEnum.VENDOR:
        data = { ...basicData, vendorData };
        break;
      default:
        data = basicData;
    }
    httpClient.post("/users/", data).then(() => {
      fetchUsers();
      toast(`User ${user.username} created`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      closeCallback();
    });
  };

  const updateUser = () => {
    const {
      driverData,
      vendorData,
      managerData,
      supervisorData,
      securityGuardSecondaryData,
      ...basicData
    } = user;
    //console.log(basicData);
    let data: User;
    switch (roleToAdd) {
      case UserRoleEnum.SUPER_ADMIN:
        data = basicData;
        break;
      case UserRoleEnum.ADMIN:
        data = basicData;
        break;
      case UserRoleEnum.SUPERVISOR:
        data = { ...basicData, supervisorData };
        break;
      case UserRoleEnum.DRIVER:
        data = { ...basicData, driverData };
        break;
      case UserRoleEnum.VENDOR:
        data = { ...basicData, vendorData };
        break;
      case UserRoleEnum.FH_MANAGER:
        data = { ...basicData, managerData };
        break;
      case UserRoleEnum.FH_SECURITY:
        data = { ...basicData, securityGuardSecondaryData };
        break;
      default:
        data = basicData;
    }
    httpClient.put("/users/", data).then(() => {
      fetchUsers();
      toast(`User updated`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      closeCallback();
    });
  };

  // Hook Functions
  React.useEffect(() => {
    let platforms: PlatformEnum[];
    switch (roleToAdd) {
      case UserRoleEnum.SUPER_ADMIN:
        platforms = [];
        break;
      case UserRoleEnum.ADMIN:
        platforms = [];
        break;
      case UserRoleEnum.SUPERVISOR:
        platforms = [PlatformEnum.SITE];
        break;
      case UserRoleEnum.DRIVER:
        platforms = [PlatformEnum.SITE];
        break;
      case UserRoleEnum.VENDOR:
        platforms = [PlatformEnum.SITE];
        break;
      case UserRoleEnum.FH_MANAGER:
        platforms = [PlatformEnum.FUNCTION_HALL];
        break;
      case UserRoleEnum.FH_SECURITY:
        platforms = [PlatformEnum.FUNCTION_HALL];
        break;
      case UserRoleEnum.FH_VENDOR:
        platforms = [PlatformEnum.FUNCTION_HALL];
        break;
      default:
        platforms = [];
    }
    setUser({ ...user, role: roleToAdd, platforms: platforms });
  }, [roleToAdd]);

  React.useEffect(() => {
    if (isEdit && editUser) {
      //console.log(editUser);
      setUser(editUser!);
    }
  }, [isEdit]);

  return (
    <ChakraModal
      closeCallback={() => {
        setUser(emptyUser);
        closeCallback();
      }}
      open={open}
      title={isEdit ? "Edit User" : "Add User"}
      action={() => {
        isEdit ? updateUser() : createUser();
      }}
      actionText={"Submit"}
    >
      <Stack spacing={3}>
        {[
          UserRoleEnum.SUPER_ADMIN,
          UserRoleEnum.ADMIN,
          UserRoleEnum.SUPERVISOR,
          UserRoleEnum.FH_MANAGER,
        ].includes(roleToAdd) && (
          <>
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
          </>
        )}
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
          name="dob"
          value={user.dob}
          setValue={(_val: string) => {
            setUser({ ...user, dob: _val });
          }}
          inputProps={{ type: "date" }}
        />
        {[UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN].includes(roleToAdd) && (
          <div>
            <div className="font-light text-[12px] opacity-70">Application</div>
            <Stack spacing={10} direction="row">
              <CheckboxGroup
                value={user.platforms}
                onChange={(_val: string[]) => {
                  setUser({
                    ...user,
                    platforms: _val.map((pE) => getPlatformEnumFromString(pE)!),
                  });
                }}
              >
                <Checkbox value={PlatformEnum.SITE}>Sites</Checkbox>
                <Checkbox value={PlatformEnum.FUNCTION_HALL}>
                  Function Halls
                </Checkbox>
              </CheckboxGroup>
            </Stack>
          </div>
        )}
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
              name="idle pay"
              value={user.driverData?.idlePay!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  driverData: { ...user.driverData!, idlePay: _val },
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
        {roleToAdd === UserRoleEnum.VENDOR && (
          <div className="flex flex-col border-t-4 mt-[10px] border-accent px-[10px]">
            <div className="flex justify-between pt-[10px]">
              <h3 className="flex text-[16px] justify-end items-center text-white">
                Inventory
              </h3>
              <div>
                <TailwindButton
                  text={"Add Item +"}
                  onClick={() => {
                    setUser({
                      ...user,
                      vendorData: {
                        ...(user.vendorData || {}), // Ensure vendorData exists
                        items: [
                          ...(user.vendorData?.items || []), // Ensure items array exists
                          { name: "", charge: 0 }, // Adding a new object with name and charge properties
                        ],
                      },
                    });
                  }}
                />
              </div>
            </div>
            {user.vendorData?.items.map((type, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col mt-[4px] pb-[10px] border-b-2"
                >
                  <LabelledInput
                    required
                    name={"name"}
                    value={type.name}
                    setValue={(_val: string) =>
                      setUser({
                        ...user,
                        vendorData: {
                          items: user.vendorData
                            ? user.vendorData.items.map((iT, i) =>
                                i === index ? { ...iT, name: _val } : iT,
                              )
                            : [],
                        },
                      })
                    }
                  />
                  <div className="flex">
                    <div className="flex  px-[2px]">
                      <LabelledInput
                        required
                        name={"charge"}
                        value={type.charge}
                        setValue={(_val: number) =>
                          setUser({
                            ...user,
                            vendorData: {
                              items: user.vendorData
                                ? user.vendorData.items.map((iT, i) =>
                                    i === index ? { ...iT, charge: _val } : iT,
                                  )
                                : [],
                            },
                          })
                        }
                        inputProps={{ type: "number" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
              name="OT pay"
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
        {roleToAdd === UserRoleEnum.FH_MANAGER && (
          <>
            <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
              Manager Data
            </h3>
            <LabelledInput
              name="company mobile no."
              value={user.managerData?.companyMobileNumber!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  managerData: {
                    ...user.managerData!,
                    companyMobileNumber: _val,
                  },
                });
              }}
            />
            <LabelledInput
              name="salary"
              value={user.managerData?.salary!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  managerData: { ...user.managerData!, salary: _val },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="OT pay"
              value={user.managerData?.payOT!}
              setValue={(_val: number) => {
                setUser({
                  ...user,
                  managerData: { ...user.managerData!, payOT: _val },
                });
              }}
              inputProps={{ type: "number" }}
            />
          </>
        )}
        {roleToAdd === UserRoleEnum.FH_SECURITY && (
          <>
            <h3 className="flex text-[16px] justify-center text-white border-t-2 mt-[10px] pt-[10px]">
              Additional Data for Couple
            </h3>
            <LabelledInput
              name="name"
              value={user.securityGuardSecondaryData?.name!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    name: _val,
                  },
                });
              }}
            />
            <LabelledInput
              name="personal mobile number"
              value={user.securityGuardSecondaryData?.personalMobileNumber!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    personalMobileNumber: _val,
                  },
                });
              }}
              inputLeftAddon={"+91"}
              inputProps={{ type: "number", maxLength: 10 }}
            />
            <LabelledInput
              name="aadhaar"
              value={user.securityGuardSecondaryData?.aadhaar!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    aadhaar: _val,
                  },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="pan"
              value={user.securityGuardSecondaryData?.pan!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    pan: _val,
                  },
                });
              }}
            />
            <LabelledInput
              name="nickname"
              value={user.securityGuardSecondaryData?.nickname!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    nickname: _val,
                  },
                });
              }}
            />
            <LabelledInput
              name="dob"
              value={user.securityGuardSecondaryData?.dob!}
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    dob: _val,
                  },
                });
              }}
              inputProps={{ type: "date" }}
            />
            <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
              Secondary Bank Information
            </h3>
            <LabelledInput
              name="account no."
              value={
                user.securityGuardSecondaryData?.bankAccountPersonal!.accountNo!
              }
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    bankAccountPersonal: {
                      ...user.securityGuardSecondaryData?.bankAccountPersonal!,
                      accountNo: _val,
                    },
                  },
                });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="ifsc"
              value={
                user.securityGuardSecondaryData?.bankAccountPersonal!.ifsc!
              }
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    bankAccountPersonal: {
                      ...user.securityGuardSecondaryData?.bankAccountPersonal!,
                      ifsc: _val,
                    },
                  },
                });
              }}
            />
            <LabelledInput
              name="bank name"
              value={
                user.securityGuardSecondaryData?.bankAccountPersonal!.bankName!
              }
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    bankAccountPersonal: {
                      ...user.securityGuardSecondaryData?.bankAccountPersonal!,
                      bankName: _val,
                    },
                  },
                });
              }}
            />
            <LabelledInput
              name="account holder"
              value={
                user.securityGuardSecondaryData?.bankAccountPersonal!
                  .accountHolder!
              }
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    bankAccountPersonal: {
                      ...user.securityGuardSecondaryData?.bankAccountPersonal!,
                      accountHolder: _val,
                    },
                  },
                });
              }}
            />
            <LabelledInput
              name="branch"
              value={
                user.securityGuardSecondaryData?.bankAccountPersonal!.branch!
              }
              setValue={(_val: string) => {
                setUser({
                  ...user,
                  securityGuardSecondaryData: {
                    ...user.securityGuardSecondaryData,
                    bankAccountPersonal: {
                      ...user.securityGuardSecondaryData?.bankAccountPersonal!,
                      branch: _val,
                    },
                  },
                });
              }}
            />
          </>
        )}
      </Stack>
    </ChakraModal>
  );
};

export default AddPeopleModal;
