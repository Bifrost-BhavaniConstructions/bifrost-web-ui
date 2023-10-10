import React from "react";
import "./People.css";
import TailwindButton from "../../../components/TailwindButton";
import Avatar from "react-avatar";
import { useStoreState } from "../../../store/hooks";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import AddPeopleModal from "./AddPeopleModal";

interface PeopleProps {}

const People: React.FC<PeopleProps> = () => {
  // Objects
  const { users } = useStoreState((state) => state.peopleStore);

  // Variables
  const userRoleData = [
    {
      role: UserRoleEnum.SUPER_ADMIN,
      name: "Super Admins",
    },
    {
      role: UserRoleEnum.SUPER_ADMIN,
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
      role: UserRoleEnum.SUPER_ADMIN,
      name: "Vendors",
    },
  ];

  // State Variables - Hooks
  const [addRoleUser, setAddRoleUser] = React.useState<
    UserRoleEnum | undefined
  >();

  // Functions

  // Hook Functions

  return (
    <div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col px-[24px] py-[16px]">
        <div className="flex font-airbnb font-black text-[24px]">People</div>
      </div>
      {userRoleData.map((userRole) => (
        <div key={userRole.role} className="flex flex-col px-[24px] py-[16px]">
          <div className="flex font-airbnb font-bold text-[18px] justify-between">
            <div className="flex justify-center items-center">
              {userRole.name}
            </div>
            <div className="flex">
              <TailwindButton
                onClick={() => {
                  setAddRoleUser(userRole.role);
                }}
                text="Add +"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex flex-row overflow-y-hidden mt-[8px]">
            {users
              .filter((user) => user.role === userRole.role)
              .map((user) => (
                <div
                  key={user.username}
                  className="flex flex-col min-w-[120px] max-w-[120px] h-[160px] bg-low-bg rounded-[12px] justify-center items-center"
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
          }}
          open={addRoleUser !== undefined}
        />
      </div>
    </div>
  );
};

export default People;
