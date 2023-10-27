import React from "react";
import "./AllTransactions.css";
import IndividualTransaction from "../CashAccount/IndividualTransaction";
import { useStoreState } from "../../../store/hooks";

interface AllTransactionsProps {}

const AllTransactions: React.FC<AllTransactionsProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { userTransactions } = useStoreState((state) => state.cashAccountStore);

  // Functions

  // Hook Functions

  return (
    <div className="flex h-[calc(100%-88px)] w-[100%] flex-col p-[8px] overflow-y-auto">
      <div className="flex flex-col">
        <h3 className="flex w-full p-[10px] font-semibold text-[14px]">
          All Transactions
        </h3>
        {userTransactions.map((userTransaction) => (
          <IndividualTransaction transaction={userTransaction} />
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
