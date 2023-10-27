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
import transactionModal from "./index";

interface TransactionModalProps {
  open: boolean;
  closeCallback: Function;
  transactionType?: TransactionTypeEnum;
  platform: PlatformEnum;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  closeCallback,
  open,
  transactionType,
  platform,
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
  const { users } = useStoreState((state) => state.peopleStore);
  const { user } = useStoreState((state) => state.userStore);
  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  const [transaction, setTransaction] =
    React.useState<TransactionCreateWrapper>(emptyTransaction);

  // Functions
  const addTransaction = () => {
    httpClient.post(`/cash-account/transaction`, transaction).then(() => {
      fetchCashAccount(user?._id!);
      fetchUserTransactions(user?._id!);
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
  }, [transactionType, user]);

  React.useEffect(() => {
    if (
      transaction.transactionType === TransactionTypeEnum.VENDOR_TRANSACTION &&
      user
    ) {
      setTransaction({ ...transaction, from: user._id! });
    }
    if (transaction.transactionType === TransactionTypeEnum.TRANSFER && user) {
      setTransaction({ ...transaction, from: user._id! });
    }
    if (
      transaction.transactionType === TransactionTypeEnum.ADD_BALANCE &&
      user
    ) {
      delete transaction.from;
      setTransaction({ ...transaction, to: user._id! });
    }
    if (
      transaction.transactionType ===
        TransactionTypeEnum.MISCELLANEOUS_TRANSACTION &&
      user
    ) {
      delete transaction.to;
      setTransaction({ ...transaction, from: user._id!, toMisc: "" });
    }
  }, [transaction.transactionType, user]);

  React.useEffect(() => {
    console.log(transaction);
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
              values={users
                .filter((user) =>
                  transaction.transactionType ===
                  TransactionTypeEnum.VENDOR_TRANSACTION
                    ? user.role === UserRoleEnum.FH_VENDOR
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
        </>
      )}
    </ChakraModal>
  );
};

export default TransactionModal;
