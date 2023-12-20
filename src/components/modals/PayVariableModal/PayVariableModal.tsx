import React from "react";
import "./PayVariableModal.css";
import {
  getVariableAdvanceForSelectedPeriod,
  getVariableForSelectedPeriod,
  payVariableForPeriod,
} from "../../../adapters/SiteManagementAdapter";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import ChakraModal from "../ChakraModal";

interface PayVariableModalProps {
  closeCallback: Function;
  open: boolean;
  userId: string;
  variable: number;
}

const PayVariableModal: React.FC<PayVariableModalProps> = ({
  open,
  userId,
  closeCallback,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");
  const [variable, setVariable] = React.useState<number>(0);
  const [advance, setAdvance] = React.useState<number>(0);

  // Functions
  const resetValues = () => {
    setFrom("");
    setTo("");
    setVariable(0);
    setAdvance(0);
  };
  // Hook Functions
  React.useEffect(() => {
    if (from !== "" && to !== "") {
      getVariableAdvanceForSelectedPeriod(userId, from, to).then((res) => {
        setAdvance(res);
      });
      getVariableForSelectedPeriod(userId, from, to).then((res) => {
        setVariable(res);
      });
    }
  }, [from, to]);

  return (
    <ChakraModal
      closeCallback={() => {
        closeCallback();
        resetValues();
      }}
      open={open}
      title={"Pay Variable"}
      action={async () => {
        await payVariableForPeriod(userId, from, to, variable - advance);
        resetValues();
        closeCallback();
      }}
      actionText={"Submit"}
      isButtonDisabled={false}
    >
      <LabelledInput
        name="from"
        value={from}
        setValue={(_val: string) => {
          setFrom(_val);
        }}
        inputProps={{ type: "date" }}
      />
      <LabelledInput
        name="to"
        value={to}
        setValue={(_val: string) => {
          setTo(_val);
        }}
        inputProps={{ type: "date" }}
      />
      <>
        <div className="font-light text-[12px] opacity-70">salary</div>
        <div className="flex font-airbnb font-black text-[24px]">
          ₹{variable}
        </div>
        <div className="font-light text-[12px] opacity-70">arrears</div>
        <div className="flex font-airbnb font-black text-[24px]">
          {advance > 0 && "-"}₹{advance}
        </div>
        <div className="font-light text-[12px] opacity-70">total</div>
        <div className="flex font-airbnb font-black text-[24px]">
          {variable - advance}
        </div>
      </>
    </ChakraModal>
  );
};

export default PayVariableModal;
