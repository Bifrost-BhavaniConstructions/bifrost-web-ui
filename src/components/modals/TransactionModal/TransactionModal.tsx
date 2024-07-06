import React from "react";
import "./TransactionModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { TransactionCreateWrapper } from "../../../wrappers/TransactionCreateWrapper";
import {
  getTransactionTypeFromString,
  TransactionTypeEnum,
} from "../../../enums/TransactionTypeEnum";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import ChakraSelect from "../../ChakraSelect";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import { CashAccount } from "@/types/CashAccount/CashAccount";

interface TransactionModalProps {
  open: boolean;
  closeCallback: Function;
  transactionType?: TransactionTypeEnum;
  platform: PlatformEnum;
  cashAccount: CashAccount;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  closeCallback,
  open,
  transactionType,
  platform,
  cashAccount,
}) => {
  // Objects
  const emptyTransaction: TransactionCreateWrapper = {
    amount: 0,
    transactionType: transactionType!,
    remarks: "",
    to: "",
    platform: platform,
  };

  // Variables

  // State Variables - Hooks
  const { functionHallUsers, siteUsers } = useStoreState(
    (state) => state.peopleStore,
  );
  const { sites } = useStoreState((state) => state.siteManagementStore);

  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  const { functionHalls } = useStoreState((state) => state.functionHallStore);
  const { transactionPurposes } = useStoreState(
    (state) => state.cashAccountStore,
  );
  const [transaction, setTransaction] =
    React.useState<TransactionCreateWrapper>(emptyTransaction);

  // Functions
  const addTransaction = () => {
    if (platform === PlatformEnum.SITE) {
      delete transaction.functionHall;
    } else {
      delete transaction.site;
    }
    httpClient.post(`/cash-account/transaction`, transaction).then(() => {
      fetchCashAccount(cashAccount.user?._id!);
      fetchUserTransactions(cashAccount.user?._id!);
      toast(`Transaction Added`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      closeCallback();
    });
  };

  // Hook Functions
  React.useEffect(() => {
    if (transactionType)
      setTransaction({ ...transaction, transactionType: transactionType });
  }, [transactionType, cashAccount.user]);

  React.useEffect(() => {
    if (
      transaction.transactionType === TransactionTypeEnum.VENDOR_TRANSACTION &&
      cashAccount.user
    ) {
      setTransaction({ ...transaction, from: cashAccount.user._id! });
    }
    if (
      transaction.transactionType === TransactionTypeEnum.TRANSFER &&
      cashAccount.user
    ) {
      setTransaction({ ...transaction, from: cashAccount.user._id! });
    }
    if (
      transaction.transactionType === TransactionTypeEnum.ADD_BALANCE &&
      cashAccount.user
    ) {
      delete transaction.from;
      setTransaction({ ...transaction, to: cashAccount.user._id! });
    }
    if (
      transaction.transactionType ===
        TransactionTypeEnum.MISCELLANEOUS_TRANSACTION &&
      cashAccount.user
    ) {
      delete transaction.to;
      setTransaction({
        ...transaction,
        from: cashAccount.user._id!,
        toMisc: "",
      });
    }
  }, [transaction.transactionType, cashAccount.user]);

  React.useEffect(() => {
    //console.log(transaction);
  }, [transaction]);

  return (
    <ChakraModal
      closeCallback={() => {
        setTransaction(emptyTransaction);
        closeCallback();
      }}
      open={open}
      title={
        transactionType
          ? transactionType
              .toString()
              .split("_")
              .map((s) => s.toLowerCase())
              .join(" ")
          : "Add Transaction"
      }
      action={() => {
        addTransaction();
      }}
      actionText={"Submit"}
    >
      {!transactionType && (
        <ChakraSelect
          name="transaction type"
          value={transaction.transactionType}
          values={[
            TransactionTypeEnum.VENDOR_TRANSACTION,
            TransactionTypeEnum.MISCELLANEOUS_TRANSACTION,
          ].map((fH) => ({
            name: fH.split("_").join(" ").toLowerCase(),
            value: fH.toString(),
          }))}
          onValueChange={(value: string) => {
            setTransaction({
              ...transaction,
              transactionType: getTransactionTypeFromString(value)!,
            });
          }}
        />
      )}
      {!!transaction.transactionType && (
        <>
          {[
            TransactionTypeEnum.VENDOR_TRANSACTION,
            TransactionTypeEnum.TRANSFER,
          ].includes(transaction.transactionType) && (
            <ChakraSelect
              name="target account"
              value={transaction.to!}
              values={(platform === PlatformEnum.FUNCTION_HALL
                ? functionHallUsers
                : siteUsers
              )
                .filter((user) =>
                  transaction.transactionType ===
                  TransactionTypeEnum.VENDOR_TRANSACTION
                    ? platform === PlatformEnum.FUNCTION_HALL
                      ? user.role === UserRoleEnum.FH_VENDOR
                      : user.role === UserRoleEnum.VENDOR
                    : true,
                )
                .map((fH) => ({
                  name: fH.name,
                  value: fH._id!,
                }))}
              onValueChange={(value) => {
                setTransaction({ ...transaction, to: value });
              }}
            />
          )}
          {transaction.transactionType ===
            TransactionTypeEnum.MISCELLANEOUS_TRANSACTION && (
            <LabelledInput
              name={"to"}
              value={transaction.toMisc!}
              setValue={(_val: string) => {
                setTransaction({ ...transaction, toMisc: _val });
              }}
            />
          )}
          <LabelledInput
            name={"payment"}
            value={transaction.amount}
            setValue={(_val: number) => {
              setTransaction({ ...transaction, amount: _val });
            }}
            inputProps={{ type: "number" }}
          />
          <LabelledInput
            name={"remarks"}
            value={transaction.remarks}
            setValue={(_val: string) => {
              setTransaction({ ...transaction, remarks: _val });
            }}
          />
          {platform === PlatformEnum.FUNCTION_HALL && (
            <ChakraSelect
              required
              name="function hall"
              value={transaction.functionHall!}
              values={functionHalls.map((fH) => ({
                name: fH.name,
                value: fH._id!,
              }))}
              onValueChange={(value) => {
                setTransaction({ ...transaction, functionHall: value });
              }}
            />
          )}
          {platform === PlatformEnum.SITE && (
            <ChakraSelect
              required
              name="site"
              value={transaction.site!}
              values={sites.map((site) => ({
                name: site.name,
                value: site._id!,
              }))}
              onValueChange={(value) => {
                setTransaction({ ...transaction, site: value });
              }}
            />
          )}
          {transaction.transactionType ===
            TransactionTypeEnum.MISCELLANEOUS_TRANSACTION && (
            <ChakraSelect
              required
              name="transaction purpose"
              value={transaction.transactionPurpose!}
              values={transactionPurposes.map((fH) => ({
                name: fH.name,
                value: fH._id!,
              }))}
              onValueChange={(value) => {
                setTransaction({ ...transaction, transactionPurpose: value });
              }}
            />
          )}
        </>
      )}
    </ChakraModal>
  );
};

export default TransactionModal;
