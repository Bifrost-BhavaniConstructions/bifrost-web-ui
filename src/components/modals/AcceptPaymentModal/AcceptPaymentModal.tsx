import React from "react";
import "./AcceptPaymentModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import ChakraSelect from "../../ChakraSelect";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { TransactionTypeEnum } from "../../../enums/TransactionTypeEnum";
import { PlatformEnum } from "../../../enums/PlatformEnum";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  enquiryId: string;
  amount?: number;
}

const AcceptPaymentModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  enquiryId,
  amount,
}) => {
  // Objects

  // Variables
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // State Variables - Hooks
  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const [from, setFrom] = React.useState("");
  const [type, setType] = React.useState("CASH_ACCOUNT");
  const { user } = useStoreState((state) => state.userStore);
  const { users } = useStoreState((state) => state.peopleStore);
  const { fetchCashAccount, fetchUserTransactions } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  React.useEffect(() => {
    setPaymentAmount(!!amount ? amount : 0);
  }, [amount]);
  // Functions
  const acceptPayment = () => {
    httpClient
      .post(`/function-hall/enquiry/payment/${enquiryId}`, {
        paymentAmount,
        isCheckedOut: !!amount,
      })
      .then(() => {
        if (!!amount && amount < 0 && type === "CASH_ACCOUNT") {
          httpClient
            .post(`/cash-account/transaction`, {
              from: from,
              amount: paymentAmount,
              remarks: "Refund",
              transactionType: TransactionTypeEnum.REFUND,
              platform: PlatformEnum.FUNCTION_HALL,
              toMisc: "REFUND",
            })
            .then(() => {
              fetchCashAccount(user?._id!);
              fetchUserTransactions(user?._id!);
              toast(`Transaction Added`, {
                position: toast.POSITION.BOTTOM_CENTER,
              });
              closeCallback();
            });
        }
        fetchEnquiries();
        toast(`Enquiry created`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        setPaymentAmount(0);
        closeCallback();
      }}
      open={open}
      title={!!amount ? "checkout" : "accept payment"}
      action={() => {
        acceptPayment();
      }}
      actionText={"Submit"}
      isButtonDisabled={
        !!amount
          ? type === "CASH_ACCOUNT"
            ? !(from !== "")
            : !amount
          : !(paymentAmount > 0)
      }
    >
      <LabelledInput
        name={"payment"}
        value={paymentAmount}
        setValue={(_val: number) => {
          setPaymentAmount(_val);
        }}
        inputProps={{ type: "number", isDisabled: !!amount }}
      />
      {!!amount && amount < 0 && (
        <RadioGroup
          value={type}
          onChange={(e) => {
            setType(e);
          }}
          className="p-[8px] my-[4px]"
          defaultValue="1"
        >
          <Stack spacing={4} direction="row">
            <Radio value="CASH_ACCOUNT">From Cash Account</Radio>
            <Radio value="PR">PR</Radio>
          </Stack>
        </RadioGroup>
      )}
      {!!amount && type === "CASH_ACCOUNT" && (
        <ChakraSelect
          name="refund from"
          value={from}
          values={users
            .filter((user) => user.role === UserRoleEnum.SUPER_ADMIN)
            .map((fH) => ({
              name: fH.name,
              value: fH._id!,
            }))}
          onValueChange={(value) => {
            setFrom(value);
          }}
        />
      )}
    </ChakraModal>
  );
};

export default AcceptPaymentModal;
