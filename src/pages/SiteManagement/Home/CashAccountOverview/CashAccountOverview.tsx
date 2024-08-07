import React, { useMemo } from "react";
import "./CashAccountOverview.css";
import { useStoreActions, useStoreState } from "../../../../store/hooks";
import { PlatformEnum } from "../../../../enums/PlatformEnum";
import { TransactionTypeEnum } from "../../../../enums/TransactionTypeEnum";
import { useNavigate } from "react-router-dom";
import IndividualTransaction from "../../../common/CashAccount/IndividualTransaction";
import TransactionModal from "../../../../components/modals/TransactionModal";
import { Transaction } from "../../../../types/CashAccount/Transaction";
import { TransactionWithFunctionHallName } from "../../../common/CashAccount/AllTransactions/AllTransactions";

interface CashAccountOverviewProps {}

const CashAccountOverview: React.FC<CashAccountOverviewProps> = () => {
  // Objects

  // Variables
  const { user } = useStoreState((state) => state.userStore);
  const { cashAccount } = useStoreState((state) => state.cashAccountStore);
  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );

  // State Variables - Hooks
  const [transactionPopup, setTransactionPopup] = React.useState<
    TransactionTypeEnum | undefined
  >();
  const [openGeneralTransactionPopup, setOpenGeneralTransactionPopup] =
    React.useState<boolean>(false);
  const { functionHalls } = useStoreState((state) => state.functionHallStore);

  const { userTransactions } = useStoreState((state) => state.cashAccountStore);
  const navigate = useNavigate();

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

  return user && cashAccount ? (
    <div className="flex w-full flex-col">
      <div className="flex flex-col px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex font-airbnb font-black text-center text-[24px] ">
          Account Overview
        </div>
        <div className="flex font-airbnb font-black text-center text-[18px] ">
          ₹{cashAccount.balance}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="flex w-full p-[10px] font-semibold text-[14px] ">
          Recent Transactions
        </h3>
        <div className="flex flex-col max-h-[300px] overflow-y-auto">
          {transactionsWithFunctionHallNames
            .slice(0, 5)
            .map((userTransaction) => (
              <IndividualTransaction
                transaction={userTransaction}
                minimal
                cashAccount={cashAccount}
              />
            ))}
        </div>
        {userTransactions.length > 5 && (
          <h3
            onClick={() => {
              navigate("/site-management/all-transactions");
            }}
            className="flex w-full p-[10px] justify-end font-semibold text-[14px]"
          >
            view more
          </h3>
        )}
      </div>
      {(!!transactionPopup || openGeneralTransactionPopup) && (
        <TransactionModal
          open={!!transactionPopup || openGeneralTransactionPopup}
          closeCallback={() => {
            setTransactionPopup(undefined);
            setOpenGeneralTransactionPopup(false);
          }}
          transactionType={transactionPopup}
          platform={PlatformEnum.SITE}
          cashAccount={cashAccount}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default CashAccountOverview;
