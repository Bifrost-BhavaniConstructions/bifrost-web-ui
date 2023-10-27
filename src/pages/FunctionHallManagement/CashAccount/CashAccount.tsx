import React from "react";
import "./CashAccount.css";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualCashAccount from "./IndividualCashAccount";
import cashAccountStore from "../../../store/cashAccountStore/cashAccountStore";

interface CashAccountProps {}

const CashAccount: React.FC<CashAccountProps> = () => {
  // Objects
  const { user } = useStoreState((state) => state.userStore);
  const { cashAccount } = useStoreState((state) => state.cashAccountStore);
  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (user && user._id) {
      fetchCashAccount(user._id);
      fetchUserTransactions(user._id);
    }
  }, [user]);

  return (
    <div className="flex h-[calc(100%-88px)] w-[100%] flex-col p-[8px] overflow-y-auto">
      {cashAccount && <IndividualCashAccount cashAccount={cashAccount} />}
    </div>
  );
};

export default CashAccount;
