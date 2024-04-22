import React from "react";
import "./People.css";
import TailwindButton from "../../../components/TailwindButton";
import Avatar from "react-avatar";
import { useStoreState } from "../../../store/hooks";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import AddPeopleModal from "../../../components/modals/AddPeopleModal";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import { User } from "../../../types/User";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

interface PeopleProps {
  platform: PlatformEnum;
}

const People: React.FC<PeopleProps> = ({ platform }) => {
  // Objects
  const users = useStoreState((state) => state.peopleStore.users).filter(
    (user) => user.platforms.includes(platform),
  );

  // Variables
  const functionHallManagementUserRoleData = [
    {
      role: UserRoleEnum.SUPER_ADMIN,
      name: "Super Admins",
    },
    {
      role: UserRoleEnum.ADMIN,
      name: "Admins",
    },
    {
      role: UserRoleEnum.FH_MANAGER,
      name: "Managers",
    },
    {
      role: UserRoleEnum.FH_SECURITY,
      name: "Security Guards",
    },
    {
      role: UserRoleEnum.FH_VENDOR,
      name: "Vendors",
    },
  ];

  const siteManagementUserRoleData = [
    {
      role: UserRoleEnum.SUPER_ADMIN,
      name: "Super Admins",
    },
    {
      role: UserRoleEnum.ADMIN,
      name: "Admins",
    },
    {
      role: UserRoleEnum.SUPERVISOR,
      name: "Supervisors",
    },
    {
      role: UserRoleEnum.DRIVER,
      name: "Drivers",
    },
    {
      role: UserRoleEnum.VENDOR,
      name: "Vendors",
    },
  ];

  // State Variables - Hooks
  const [addRoleUser, setAddRoleUser] = React.useState<
    UserRoleEnum | undefined
  >();
  const [editUser, setEditUser] = React.useState<User | undefined>();

  // Functions

  // Hook Functions
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden p-[16px]">
      <div className="flex flex-row px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex font-airbnb font-black text-center text-[24px] ">
          Manage People
        </div>
      </div>
      {(platform === PlatformEnum.FUNCTION_HALL
        ? functionHallManagementUserRoleData
        : siteManagementUserRoleData
      ).map((userRole) => (
        <div
          key={userRole.role}
          className="flex flex-col px-[8px] py-[16px] max-w-full"
        >
          <div className="flex font-airbnb font-bold text-[18px] justify-between">
            <div className="flex justify-center items-center">
              {userRole.name}
            </div>
            <div className="flex">
              <Button
                variant="secondary"
                onClick={() => {
                  setAddRoleUser(userRole.role);
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto flex max-w-full w-full flex-row overflow-y-hidden mt-[8px]">
            {users
              .filter((user) => user.role === userRole.role)
              .map((user) => (
                <div
                  key={user.username}
                  onClick={() => {
                    setAddRoleUser(userRole.role);
                    setEditUser(user);
                  }}
                  className="flex flex-col min-w-[120px] max-w-[120px] h-[160px] rounded-xl border bg-card text-card-foreground shadow justify-center items-center mr-[10px] cursor-pointer"
                >
                  <div className="flex flex-[3] justify-center items-center">
                    <Avatar name={user.name} round size="72" />
                  </div>
                  <div className="flex flex-1 items-center text-[14px]">
                    {user.name}
                  </div>
                  <div className="flex flex-1 text-[12px]">
                    {user.personalMobileNumber}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div>
        <AddPeopleModal
          roleToAdd={addRoleUser!}
          closeCallback={() => {
            setAddRoleUser(undefined);
            setEditUser(undefined);
          }}
          open={addRoleUser !== undefined || editUser !== undefined}
          platform={platform}
          isEdit={editUser !== undefined}
          editUser={editUser}
        />
      </div>
    </div>
  );
};

export default People;
