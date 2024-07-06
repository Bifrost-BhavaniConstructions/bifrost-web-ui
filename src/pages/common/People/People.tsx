import React from "react";
import "./People.css";
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

  const user = useStoreState((state) => state.userStore.user)!;

  // Variables
  const functionHallManagementUserRoleData = [
    {
      role: UserRoleEnum.SUPER_ADMIN,
      name: "Super Admins",
      visibleTo: [UserRoleEnum.SUPER_ADMIN],
      addedBy: [UserRoleEnum.SUPER_ADMIN],
      viewSimilar: true,
    },
    {
      role: UserRoleEnum.ADMIN,
      name: "Admins",
      visibleTo: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN],
      addedBy: [UserRoleEnum.SUPER_ADMIN],
      viewSimilar: false,
    },
    {
      role: UserRoleEnum.FH_MANAGER,
      name: "Managers",
      visibleTo: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.FH_MANAGER,
      ],
      addedBy: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN],
      viewSimilar: false,
    },
    {
      role: UserRoleEnum.FH_SECURITY,
      name: "Security Guards",
      visibleTo: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.FH_MANAGER,
      ],
      addedBy: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.FH_MANAGER,
      ],
      viewSimilar: true,
    },
    {
      role: UserRoleEnum.FH_VENDOR,
      name: "Vendors",
      visibleTo: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.FH_MANAGER,
      ],
      addedBy: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.FH_MANAGER,
      ],
      viewSimilar: true,
    },
  ];

  const siteManagementUserRoleData = [
    {
      role: UserRoleEnum.SUPER_ADMIN,
      name: "Super Admins",
      visibleTo: [UserRoleEnum.SUPER_ADMIN],
      addedBy: [UserRoleEnum.SUPER_ADMIN],
      viewSimilar: true,
    },
    {
      role: UserRoleEnum.ADMIN,
      name: "Admins",
      visibleTo: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN],
      addedBy: [UserRoleEnum.SUPER_ADMIN],
      viewSimilar: false,
    },
    {
      role: UserRoleEnum.SUPERVISOR,
      name: "Supervisors",
      visibleTo: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.SUPERVISOR,
      ],
      addedBy: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN],
      viewSimilar: false,
    },
    {
      role: UserRoleEnum.DRIVER,
      name: "Drivers",
      visibleTo: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.SUPERVISOR,
      ],
      addedBy: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.SUPERVISOR,
      ],
      viewSimilar: true,
    },
    {
      role: UserRoleEnum.VENDOR,
      name: "Vendors",
      visibleTo: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.SUPERVISOR,
      ],
      addedBy: [
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.SUPERVISOR,
      ],
      viewSimilar: true,
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
    <div className="flex flex-col h-full w-[100%] overflow-y-auto overflow-x-hidden p-[16px]">
      <div className="flex flex-row px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex font-airbnb font-black text-center text-[24px] ">
          Manage People
        </div>
      </div>
      {(platform === PlatformEnum.FUNCTION_HALL
        ? functionHallManagementUserRoleData
        : siteManagementUserRoleData
      )
        .filter((userRole) => userRole.visibleTo.includes(user.role))
        .map((userRole) => (
          <div
            key={userRole.role}
            className="flex flex-col px-[8px] py-[16px] max-w-full"
          >
            <div className="flex font-airbnb font-bold text-[18px] justify-between">
              <div className="flex justify-center items-center">
                {userRole.name}
              </div>
              {userRole.addedBy.includes(user.role) && (
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
              )}
            </div>
            <div className="md:flex-wrap md:gap-[12px] gap-[4px] overflow-x-auto flex max-w-full w-full flex-row overflow-y-hidden mt-[8px]">
              {users
                .filter((us) => us.role === userRole.role)
                .filter((us) =>
                  userRole.viewSimilar
                    ? true
                    : user.role === userRole.role
                    ? user._id === us._id
                    : true,
                )
                .map((us) => (
                  <div
                    key={us.username}
                    onClick={() => {
                      setAddRoleUser(userRole.role);
                      setEditUser(us);
                    }}
                    className="flex flex-col min-w-[120px] max-w-[120px] h-[160px] rounded-xl border bg-card text-card-foreground shadow justify-center items-center cursor-pointer"
                  >
                    <div className="flex flex-[3] justify-center items-center">
                      <Avatar name={us.name} round size="72" />
                    </div>
                    <div className="flex flex-1 items-center text-[14px] text-center">
                      {us.name}
                    </div>
                    <div className="flex flex-1 text-[12px]">
                      {us.personalMobileNumber}
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
