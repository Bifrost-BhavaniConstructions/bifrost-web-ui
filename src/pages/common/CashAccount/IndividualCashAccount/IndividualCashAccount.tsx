import React, { useMemo } from "react";
import "./IndividualCashAccount.css";
import { CashAccount } from "../../../../types/CashAccount/CashAccount";
import Radio from "../../../../components/Radio";
import { TransactionTypeEnum } from "../../../../enums/TransactionTypeEnum";
import TransactionModal from "../../../../components/modals/TransactionModal";
import { useStoreState } from "../../../../store/hooks";
import IndividualTransaction from "../IndividualTransaction";
import { PlatformEnum } from "../../../../enums/PlatformEnum";
import { useNavigate } from "react-router-dom";
import { Transaction } from "../../../../types/CashAccount/Transaction";
import { TransactionWithFunctionHallName } from "../AllTransactions/AllTransactions";
import TabSelect from "@/components/TabSelect";

interface IndividualCashAccountProps {
  cashAccount: CashAccount;
  platform: PlatformEnum;
}

const IndividualCashAccount: React.FC<IndividualCashAccountProps> = ({
  cashAccount,
  platform,
}) => {
  // Objects

  // Variables

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

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex flex-col px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex font-airbnb font-black text-center text-[24px] ">
          {cashAccount.user.name}'s Cash Account
        </div>
        <div className="flex font-airbnb font-black text-center text-[18px] ">
          ₹{cashAccount.balance}
        </div>
      </div>
      <div className="flex flex-col py-[8px] justify-center items-center md:relative">
        <TabSelect
          options={[
            {
              text: "Add Balance",
              onClick: () => {
                setTransactionPopup(TransactionTypeEnum.ADD_BALANCE);
              },
            },
            {
              text: "Transfer",
              onClick: () => {
                setTransactionPopup(TransactionTypeEnum.TRANSFER);
              },
            },
            {
              text: "Add Transaction",
              onClick: () => {
                setOpenGeneralTransactionPopup(true);
              },
            },
          ]}
          tabIndex={-1}
          setTabIndex={() => {}}
          isJustSelector
        />
      </div>
      <div className="flex flex-col">
        <h3 className="flex w-full p-[10px] font-semibold text-[14px]">
          Recent Transactions
        </h3>
        {transactionsWithFunctionHallNames
          .slice(0, 10)
          .map((userTransaction) => (
            <IndividualTransaction transaction={userTransaction} />
          ))}
        {userTransactions.length > 10 && (
          <h3
            onClick={() => {
              navigate("/function-hall-management/all-transactions");
            }}
            className="flex w-full p-[10px] justify-end font-semibold text-[14px] mb-[20px]"
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
          platform={platform}
        />
      )}
    </div>
  );
};

export default IndividualCashAccount;
