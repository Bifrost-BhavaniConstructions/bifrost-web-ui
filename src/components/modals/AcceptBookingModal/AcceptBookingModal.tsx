import React from "react";
import "./AcceptBookingModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";
import ChakraSelect from "../../ChakraSelect";
import {
  getModeOfPaymentFromString,
  ModeOfPaymentEnum,
} from "../../../enums/ModeOfPaymentEnum";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  enquiryId: string;
}

const AcceptBookingModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  enquiryId,
}) => {
  // Objects

  // Variables
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );
  const [remark, setRemark] = React.useState("");
  const [mode, setMode] = React.useState<ModeOfPaymentEnum | undefined>();

  // State Variables - Hooks
  const [paymentAmount, setPaymentAmount] = React.useState(0);

  // Functions
  const updateBookingPayment = () => {
    httpClient
      .post(`/function-hall/enquiry/booking/${enquiryId}`, {
        paymentAmount,
        remark,
        modeOfPayment: mode,
      })
      .then(() => {
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
      title={"Accept Booking"}
      action={() => {
        updateBookingPayment();
      }}
      actionText={"Submit"}
      isButtonDisabled={!(paymentAmount > 0)}
    >
      <LabelledInput
        required
        name={"booking advance"}
        value={paymentAmount}
        setValue={(_val: number) => {
          setPaymentAmount(_val);
        }}
        inputProps={{ type: "number" }}
      />
      <ChakraSelect
        name="transaction type"
        value={mode!}
        values={[
          ModeOfPaymentEnum.CASH,
          ModeOfPaymentEnum.UPI,
          ModeOfPaymentEnum.RTGS_NEFT,
          ModeOfPaymentEnum.OTHERS,
        ].map((fH) => ({
          name: fH.split("_").join("/").toLowerCase(),
          value: fH.toString(),
        }))}
        onValueChange={(value: string) => {
          setMode(getModeOfPaymentFromString(value)!);
        }}
      />
      {mode === ModeOfPaymentEnum.OTHERS && (
        <LabelledInput
          name={"remark"}
          value={remark}
          setValue={(_val: string) => {
            setRemark(_val);
          }}
        />
      )}
    </ChakraModal>
  );
};

export default AcceptBookingModal;
