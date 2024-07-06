import React from "react";
import "./CashAccount.css";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualCashAccount from "./IndividualCashAccount";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import { UserRoleEnum } from "@/enums/UserRoleEnum";
import ChakraSelect from "@/components/ChakraSelect";

interface CashAccountProps {
  platform: PlatformEnum;
}

const CashAccount: React.FC<CashAccountProps> = ({ platform }) => {
  // Objects
  const { user } = useStoreState((state) => state.userStore);
  const { users } = useStoreState((state) => state.peopleStore);
  const { cashAccount } = useStoreState((state) => state.cashAccountStore);
  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  const [selectedUser, setSelectedUser] = React.useState<string>("");

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (user && user._id) {
      fetchCashAccount(user._id);
      fetchUserTransactions(user._id);
      setSelectedUser(user._id);
    }
  }, [user]);
  React.useEffect(() => {
    if (selectedUser !== "") {
      fetchCashAccount(selectedUser);
      fetchUserTransactions(selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="flex h-full md:h-full w-[100%] flex-col p-[8px] overflow-y-auto">
      {cashAccount && (
        <>
          <div className="flex flex-col px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
            <div className="flex font-airbnb font-black text-center text-[24px] ">
              <ChakraSelect
                name=""
                fullWidth={false}
                value={selectedUser}
                values={users
                  .filter((us) =>
                    platform === PlatformEnum.SITE
                      ? [
                          UserRoleEnum.SUPER_ADMIN,
                          UserRoleEnum.ADMIN,
                          UserRoleEnum.SUPERVISOR,
                          UserRoleEnum.VENDOR,
                          UserRoleEnum.DRIVER,
                        ].includes(us.role)
                      : [
                          UserRoleEnum.SUPER_ADMIN,
                          UserRoleEnum.ADMIN,
                          UserRoleEnum.FH_MANAGER,
                          UserRoleEnum.FH_VENDOR,
                          UserRoleEnum.FH_SECURITY,
                        ].includes(us.role),
                  )
                  .filter((us) => {
                    if (user!.role === UserRoleEnum.SUPER_ADMIN) {
                      return us.platforms.includes(platform);
                    } else if (user!.role === UserRoleEnum.ADMIN) {
                      if (
                        us.platforms.includes(platform) &&
                        us.role !== UserRoleEnum.SUPER_ADMIN
                      ) {
                        if (us.role === UserRoleEnum.ADMIN) {
                          return us._id === user!._id;
                        }
                        return true;
                      }
                    } else if (user!.role === UserRoleEnum.FH_MANAGER) {
                      if (
                        us.platforms.includes(platform) &&
                        us.role !== UserRoleEnum.SUPER_ADMIN &&
                        us.role !== UserRoleEnum.ADMIN
                      ) {
                        if (us.role === UserRoleEnum.FH_MANAGER) {
                          return us._id === user!._id;
                        }
                        return true;
                      }
                    } else if (user!.role === UserRoleEnum.SUPERVISOR) {
                      if (
                        us.platforms.includes(platform) &&
                        us.role !== UserRoleEnum.SUPER_ADMIN &&
                        us.role !== UserRoleEnum.ADMIN
                      ) {
                        if (us.role === UserRoleEnum.SUPERVISOR) {
                          return us._id === user!._id;
                        }
                        return true;
                      }
                    }
                  })
                  .map((fH) => ({
                    name: fH.name,
                    value: fH._id!,
                  }))}
                onValueChange={(value) => {
                  setSelectedUser(value);
                }}
              />
            </div>
            <div className="flex font-airbnb font-black text-center text-[24px] ">
              {cashAccount.user.name}'s Cash Account
            </div>
            <div className="flex font-airbnb font-black text-center text-[18px] ">
              ₹{cashAccount.balance}
            </div>
          </div>
          <IndividualCashAccount
            cashAccount={cashAccount}
            platform={platform}
          />
        </>
      )}
    </div>
  );
};

export default CashAccount;
