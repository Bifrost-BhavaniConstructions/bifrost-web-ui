import React, { useMemo } from "react";
import "./AllTransactions.css";
import IndividualTransaction from "../IndividualTransaction";
import { useStoreActions, useStoreState } from "../../../../store/hooks";
import { Transaction } from "../../../../types/CashAccount/Transaction";

interface AllTransactionsProps {}

export interface TransactionWithFunctionHallName extends Transaction {
  functionHallName: string;
}

const AllTransactions: React.FC<AllTransactionsProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { user } = useStoreState((state) => state.userStore);
  const { userTransactions } = useStoreState((state) => state.cashAccountStore);
  const { functionHalls } = useStoreState((state) => state.functionHallStore);
  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  // Functions

  // Hook Functions
  const functionHallNameMap = useMemo(() => {
    const nameMap: Record<string, string> = {};

    functionHalls.forEach((functionHall) => {
      nameMap[functionHall._id!] = functionHall.name;
    });

    return nameMap;
  }, [functionHalls]);

  // Now you can use this mapping to get the function hall name for each transaction
  const transactionsWithFunctionHallNames = useMemo(() => {
    return userTransactions.map((transaction: Transaction) => {
      const functionHallName = transaction.functionHall
        ? functionHallNameMap[transaction.functionHall]
        : "";

      return {
        ...transaction,
        functionHallName,
      } as TransactionWithFunctionHallName;
    });
  }, [userTransactions, functionHallNameMap]);

  React.useEffect(() => {
    if (user && user._id) {
      fetchCashAccount(user._id);
      fetchUserTransactions(user._id);
    }
  }, [user]);

  return (
    <div className="flex h-full w-[100%] flex-col p-[8px] overflow-y-auto">
      <div className="flex flex-col">
        <h3 className="flex w-full p-[10px] font-semibold text-[14px]">
          All Transactions
        </h3>
        {transactionsWithFunctionHallNames.map((userTransaction) => (
          <IndividualTransaction transaction={userTransaction} />
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
